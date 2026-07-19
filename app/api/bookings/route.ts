import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

const bookingsFile = path.join(process.cwd(), 'data', 'bookings.json');

export async function POST(request: Request) {
  const booking = await request.json();

  await fs.mkdir(path.dirname(bookingsFile), { recursive: true });

  let bookings: unknown[] = [];
  try {
    bookings = JSON.parse(await fs.readFile(bookingsFile, 'utf8'));
  } catch {
    bookings = [];
  }

  bookings.unshift(booking);
  await fs.writeFile(bookingsFile, JSON.stringify(bookings, null, 2));

  return NextResponse.json({ ok: true, booking });
}
