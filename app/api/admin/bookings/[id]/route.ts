import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ADMIN_COOKIE, isOwnerSession } from '@/lib/admin-auth';
import { sendBookingDecisionEmail } from '@/lib/booking-email';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs';

const decisionSchema = z.object({
  status: z.enum(['confirmed', 'declined']),
});

type BookingRow = {
  id: string;
  guest_name: string;
  guest_email: string;
  room: string;
  check_in: string;
  check_out: string;
  nights: number;
  total_inr: number;
  status: string;
};

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isOwnerSession(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const input = decisionSchema.parse(await request.json());
    const client = supabase();
    const existingResponse = await client
      .from('bookings')
      .select('id, guest_name, guest_email, room, check_in, check_out, nights, total_inr, status')
      .eq('id', params.id)
      .maybeSingle();

    if (existingResponse.error) throw existingResponse.error;
    if (!existingResponse.data) {
      return NextResponse.json({ ok: false, error: 'Booking not found.' }, { status: 404 });
    }

    const existing = existingResponse.data as BookingRow;
    if (existing.status !== 'pending') {
      return NextResponse.json(
        { ok: false, error: 'Only pending requests can be approved or declined.' },
        { status: 409 },
      );
    }

    const updateResponse = await client
      .from('bookings')
      .update({ status: input.status })
      .eq('id', params.id)
      .eq('status', 'pending')
      .select('id, guest_name, guest_email, room, check_in, check_out, nights, total_inr, status')
      .maybeSingle();

    if (updateResponse.error) throw updateResponse.error;
    if (!updateResponse.data) {
      return NextResponse.json(
        { ok: false, error: 'This request was already updated.' },
        { status: 409 },
      );
    }

    const booking = updateResponse.data as BookingRow;
    let emailSent = false;
    let emailConfigured = false;
    try {
      const email = await sendBookingDecisionEmail(
        {
          id: booking.id,
          guestName: booking.guest_name,
          guestEmail: booking.guest_email,
          room: booking.room,
          checkIn: booking.check_in,
          checkOut: booking.check_out,
          nights: booking.nights,
          total: booking.total_inr,
        },
        input.status,
      );
      emailSent = email.sent;
      emailConfigured = email.configured;
    } catch (error) {
      console.error('Booking decision email error:', error);
    }

    return NextResponse.json({
      ok: true,
      booking: { id: booking.id, status: booking.status },
      notification: { sent: emailSent, configured: emailConfigured },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: 'Invalid booking decision.' }, { status: 400 });
    }

    console.error('Booking decision error:', error);
    return NextResponse.json(
      { ok: false, error: 'The booking status could not be updated.' },
      { status: 500 },
    );
  }
}
