import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { ROOMS } from '@/lib/data';
import { bookingInputSchema } from '@/lib/booking-schema';

const bookingsFile = path.join(process.cwd(), 'data', 'bookings.json');

// --- very small in-memory rate limiter -------------------------------
// Good enough to stop naive spam/bot abuse on a single serverless
// instance. For real protection at scale, move this to Upstash Redis,
// Vercel KV, or a WAF rule in front of the route.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS,
  );
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

// Escape anything that could be interpreted as HTML if this value is
// ever rendered in an admin dashboard or email template later.
function sanitizeText(value: string) {
  return value.replace(/[<>]/g, '');
}

function nightsBetween(checkIn: string, checkOut: string) {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.round(ms / 86400000);
}

// Atomic write: write to a temp file then rename, so a crash or a
// second concurrent request can never leave bookings.json truncated
// or corrupted halfway through a write.
async function writeBookingsAtomic(bookings: unknown[]) {
  await fs.mkdir(path.dirname(bookingsFile), { recursive: true });
  const tmpFile = `${bookingsFile}.${crypto.randomUUID()}.tmp`;
  await fs.writeFile(tmpFile, JSON.stringify(bookings, null, 2));
  await fs.rename(tmpFile, bookingsFile);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many booking attempts. Please try again in a minute.' },
      { status: 429 },
    );
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const parsed = bookingInputSchema.safeParse(rawBody);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed', issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const room = ROOMS.find((r) => r.id === data.roomId);
  if (!room) {
    return NextResponse.json({ ok: false, error: 'Room not found' }, { status: 400 });
  }

  // Recompute pricing server-side. Never trust a total sent by the client.
  const nights = nightsBetween(data.checkIn, data.checkOut);
  const base = room.price * Math.max(nights, 1);
  const service = Math.round(base * 0.1);
  const taxes = Math.round(base * 0.12);
  const total = base + service + taxes;

  const booking = {
    id: `AZ-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    guestName: sanitizeText(data.guestName),
    guestPhone: sanitizeText(data.guestPhone),
    guestEmail: data.guestEmail,
    checkIn: data.checkIn,
    checkOut: data.checkOut,
    adults: data.adults,
    children: data.children,
    roomId: room.id,
    room: room.name,
    nights,
    requests: sanitizeText(data.requests ?? ''),
    base,
    service,
    taxes,
    total,
    createdAt: new Date().toISOString(),
  };

  let bookings: unknown[] = [];
  try {
    bookings = JSON.parse(await fs.readFile(bookingsFile, 'utf8'));
    if (!Array.isArray(bookings)) bookings = [];
  } catch {
    bookings = [];
  }

  bookings.unshift(booking);

  try {
    await writeBookingsAtomic(bookings);
  } catch (err) {
    console.error('Failed to persist booking', err);
    return NextResponse.json(
      { ok: false, error: 'Could not save booking. Please try again.' },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, booking });
}
