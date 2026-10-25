import { NextRequest, NextResponse } from 'next/server';
import { ROOMS } from '@/lib/data';
import { ADMIN_COOKIE, isOwnerSession } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs';

type BookingRow = { id: string; guest_name: string; guest_email: string; guest_phone: string; room: string; check_in: string; check_out: string; adults: number; children: number; nights: number; requests: string; total_inr: number; status: string };

export async function GET(request: NextRequest) {
  if (!isOwnerSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const month = request.nextUrl.searchParams.get('month') ?? new Date().toISOString().slice(0, 7);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return NextResponse.json({ ok: false, error: 'Invalid month.' }, { status: 400 });
  const [year, number] = month.split('-').map(Number);
  const nextMonth = number === 12 ? `${year + 1}-01-01` : `${year}-${String(number + 1).padStart(2, '0')}-01`;
  const response = await supabase().from('bookings').select('id, guest_name, guest_email, guest_phone, room, check_in, check_out, adults, children, nights, requests, total_inr, status').gt('check_out', `${month}-01`).lt('check_in', nextMonth).order('check_in');
  if (response.error) return NextResponse.json({ ok: false, error: 'Could not load occupancy.' }, { status: 500 });
  const bookings = (response.data as BookingRow[]).flatMap((row) => {
    const room = ROOMS.find((item) => item.name === row.room);
    return room ? [{ id: row.id, guestName: row.guest_name, guestEmail: row.guest_email, guestPhone: row.guest_phone, roomId: room.id, room: row.room, checkIn: row.check_in, checkOut: row.check_out, adults: row.adults, children: row.children, nights: row.nights, requests: row.requests, total: row.total_inr, status: row.status }] : [];
  });
  return NextResponse.json({ ok: true, month, bookings });
}
