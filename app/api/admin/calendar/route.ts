import { NextRequest, NextResponse } from 'next/server';
import { ROOMS } from '@/lib/data';
import { ADMIN_COOKIE, isOwnerSession } from '@/lib/admin-auth';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs';

type BookingRow = { id: string; room: string; check_in: string; check_out: string; nights: number; total_inr: number; status: string };

export function GET(request: NextRequest) {
  if (!isOwnerSession(request.cookies.get(ADMIN_COOKIE)?.value)) return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  const month = request.nextUrl.searchParams.get('month') ?? new Date().toISOString().slice(0, 7);
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) return NextResponse.json({ ok: false, error: 'Invalid month.' }, { status: 400 });
  const [year, number] = month.split('-').map(Number);
  const nextMonth = number === 12 ? `${year + 1}-01-01` : `${year}-${String(number + 1).padStart(2, '0')}-01`;
  const response = await supabase().from('bookings').select('id, room, check_in, check_out, nights, total_inr, status').gt('check_out', `${month}-01`).lt('check_in', nextMonth).order('check_in');
  if (response.error) return NextResponse.json({ ok: false, error: 'Could not load occupancy.' }, { status: 500 });
  const bookings = (response.data as BookingRow[]).flatMap((row) => {
    const room = ROOMS.find((item) => item.name === row.room);
    return room ? [{ id: row.id, roomId: room.id, room: row.room, checkIn: row.check_in, checkOut: row.check_out, nights: row.nights, total: row.total_inr, status: row.status }] : [];
  });
  return NextResponse.json({ ok: true, month, bookings });
}
