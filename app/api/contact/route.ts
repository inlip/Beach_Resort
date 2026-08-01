import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getMailer, mailConfig } from '@/lib/mailer';

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(150),
  message: z.string().trim().min(1).max(5000),
});

export async function POST(request: Request) {
  try {
    const data = schema.parse(await request.json());
    const config = mailConfig();
    await getMailer().sendMail({
      ...config,
      replyTo: data.email,
      subject: `Website contact message from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Contact email failed', error);
    return NextResponse.json({ ok: false, error: 'Unable to send your message.' }, { status: 400 });
  }
}
