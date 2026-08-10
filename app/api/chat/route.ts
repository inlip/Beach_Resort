import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  AMENITIES,
  DINING,
  EXPERIENCES,
  FAQS,
  OFFERS,
  RESORT,
  ROOMS,
} from '@/lib/data';

export const runtime = 'nodejs';

const MAX_HISTORY_MESSAGES = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 10;

const chatSchema = z.object({
  message: z.string().trim().min(1).max(500),
  history: z
    .array(
      z.object({
        role: z.enum(['user', 'assistant']),
        content: z.string().trim().min(1).max(1_000),
      }),
    )
    .default([]),
});

const rateLimits = new Map<string, { count: number; resetAt: number }>();

const resortContext = JSON.stringify({
  resort: {
    name: RESORT.fullName,
    tagline: RESORT.tagline,
    phone: RESORT.phone,
    email: RESORT.email,
    address: RESORT.address,
  },
  rooms: ROOMS.map(({ name, price, capacity, size, amenities, tag }) => ({
    name,
    priceInrPerNight: price,
    capacity,
    size,
    amenities,
    tag,
  })),
  amenities: AMENITIES.map(({ name, desc }) => ({ name, desc })),
  experiences: EXPERIENCES.map(({ title, desc, duration }) => ({
    title,
    desc,
    duration,
  })),
  dining: DINING.map(({ name, cuisine, desc, hours }) => ({
    name,
    cuisine,
    desc,
    hours,
  })),
  offers: OFFERS.map(({ title, desc, badge, cta }) => ({
    title,
    desc,
    badge,
    cta,
  })),
  faqs: FAQS,
});

const systemPrompt = `You are the concierge chatbot for ${RESORT.fullName}.

Answer ONLY questions about this resort using the RESORT CONTEXT below. You may discuss rooms, pricing, dining, amenities, experiences, offers, policies, location, and contact information.

Do not answer general knowledge, coding, other companies, opinions, current events, or anything unrelated to this resort. For unrelated requests, briefly say that you can only help with ${RESORT.fullName} and invite a resort question instead.

Never invent resort details or infer unavailable information. If the guest needs help not covered by the context, ask them to call ${RESORT.phone} or email ${RESORT.email}. Keep every answer concise and friendly for a chat widget.

RESORT CONTEXT:
${resortContext}`;

function getClientIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) return true;

  entry.count += 1;
  return false;
}

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { ok: false, error: 'Chat is not configured yet.' },
      { status: 503 },
    );
  }

  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { ok: false, error: 'Too many messages. Please try again in a minute.' },
      { status: 429 },
    );
  }

  try {
    const input = chatSchema.parse(await request.json());
    const history = input.history.slice(-MAX_HISTORY_MESSAGES);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.3,
        max_tokens: 250,
        messages: [
          { role: 'system', content: systemPrompt },
          ...history,
          { role: 'user', content: input.message },
        ],
      }),
    });

    if (!response.ok) {
      console.error('OpenAI chat error:', response.status, await response.text());
      return NextResponse.json(
        { ok: false, error: 'Our concierge is temporarily unavailable.' },
        { status: 502 },
      );
    }

    const result = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };
    const reply = result.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { ok: false, error: 'Our concierge could not prepare a reply.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, reply });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a message of up to 500 characters.' },
        { status: 400 },
      );
    }

    console.error('Chat request error:', error);
    return NextResponse.json(
      { ok: false, error: 'Our concierge is temporarily unavailable.' },
      { status: 500 },
    );
  }
}
