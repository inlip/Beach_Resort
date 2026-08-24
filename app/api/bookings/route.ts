import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs';

const bookingSchema = z.object({
  guestName: z.string().trim().min(2).max(100),
  guestPhone: z.string().trim().min(7).max(30),
  guestEmail: z.string().trim().email().max(150),
  checkIn: z.string().date(),
  checkOut: z.string().date(),
  adults: z.number().int().min(1).max(6),
  children: z.number().int().min(0).max(4),
  room: z.string().trim().min(2).max(100),
  nights: z.number().int().positive().max(60),
  requests: z.string().trim().max(1000).default(''),
  total: z.number().int().nonnegative(),
});

async function sendBookingNotification(booking: {
  id: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  room: string;
  nights: number;
  requests: string;
  total: number;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.BOOKING_NOTIFICATION_EMAIL;
  const sender = process.env.BOOKING_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    return { ownerSent: false, guestSent: false, configured: false };
  }

  const send = async (message: Record<string, unknown>) => {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    if (!response.ok) throw new Error(`Resend returned ${response.status}`);
  };

  await send({
    from: sender,
    to: [recipient],
    reply_to: booking.guestEmail,
    subject: 'New booking enquiry',
    text: [
      `Booking ID: ${booking.id}`,
      `Guest: ${booking.guestName}`,
      `Phone: ${booking.guestPhone}`,
      `Email: ${booking.guestEmail}`,
      `Stay: ${booking.checkIn} to ${booking.checkOut} (${booking.nights} nights)`,
      `Guests: ${booking.adults} adults, ${booking.children} children`,
      `Room: ${booking.room}`,
      `Estimated total: ₹${booking.total.toLocaleString('en-IN')}`,
      `Special requests: ${booking.requests || 'None'}`,
    ].join('\n'),
  });

  await send({
    from: sender,
    to: [booking.guestEmail],
    subject: 'Booking enquiry received',
    text: [
      `Hello ${booking.guestName},`,
      '',
      'Thank you for your enquiry. We have received your booking request and our concierge team will be in touch shortly.',
      '',
      `Room: ${booking.room}`,
      `Stay: ${booking.checkIn} to ${booking.checkOut} (${booking.nights} nights)`,
      `Estimated total: ₹${booking.total.toLocaleString('en-IN')}`,
    ].join('\n'),
  });

  return { ownerSent: true, guestSent: true, configured: true };
}

export async function GET() { return NextResponse.json({ ok: true, storage: 'supabase' }); }

export async function POST(request: Request) {
  try {
    const input = bookingSchema.parse(await request.json());
    const checkIn = new Date(`${input.checkIn}T00:00:00Z`);
    const checkOut = new Date(`${input.checkOut}T00:00:00Z`);
    const calculatedNights = Math.round(
      (checkOut.getTime() - checkIn.getTime()) / 86_400_000,
    );

    if (calculatedNights !== input.nights || calculatedNights < 1) {
      return NextResponse.json(
        { ok: false, error: 'The selected stay dates are invalid.' },
        { status: 400 },
      );
    }

    const booking = {
      ...input,
      id: `AZ-${crypto.randomUUID()}`,
      createdAt: new Date().toISOString(),
      status: 'pending',
    };

    const { error: saveError } = await supabase().from('bookings').insert({
      id: booking.id, guest_name: booking.guestName, guest_phone: booking.guestPhone, guest_email: booking.guestEmail,
      check_in: booking.checkIn, check_out: booking.checkOut, adults: booking.adults, children: booking.children,
      room: booking.room, nights: booking.nights, requests: booking.requests, total_inr: booking.total,
      status: booking.status, created_at: booking.createdAt,
    });
    if (saveError?.code === '23P01') return NextResponse.json({ ok: false, error: 'This room is no longer available for the selected dates.' }, { status: 409 });
    if (saveError) throw saveError;

    let notification = { ownerSent: false, guestSent: false, configured: false };
    try {
      notification = await sendBookingNotification(booking);
    } catch (error) {
      console.error('Booking email error:', error);
    }

    return NextResponse.json({ ok: true, booking, notification }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Please check the booking details and try again.',
          fields: error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    console.error('Booking database error:', error);
    return NextResponse.json(
      { ok: false, error: 'The booking could not be saved.' },
      { status: 500 },
    );
  }
}
