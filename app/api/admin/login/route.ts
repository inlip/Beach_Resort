import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ADMIN_COOKIE, isValidPassword, ownerSessionToken } from '@/lib/admin-auth';

const schema = z.object({ password: z.string().min(1).max(500) });

export async function POST(request: Request) {
  try {
    if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ ok: false, error: 'Admin access is not configured.' }, { status: 503 });
    const { password } = schema.parse(await request.json());
    if (!isValidPassword(password)) return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, ownerSessionToken(), { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 8 });
    return response;
  } catch { return NextResponse.json({ ok: false, error: 'A password is required.' }, { status: 400 }); }
}
