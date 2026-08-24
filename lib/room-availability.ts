import { db } from '@/lib/db';

type ConflictingBooking = { id: string };

const findConflict = db.prepare(`
  SELECT id FROM bookings
  WHERE room = ?
    AND check_in < ?
    AND check_out > ?
  LIMIT 1
`);

export function isRoomAvailable(room: string, checkIn: string, checkOut: string) {
  const conflict = findConflict.get(room, checkOut, checkIn) as ConflictingBooking | undefined;
  return !conflict;
}
