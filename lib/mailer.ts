import nodemailer from 'nodemailer';

function required(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export function getMailer() {
  return nodemailer.createTransport({
    host: required('SMTP_HOST'),
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: required('SMTP_USER'), pass: required('SMTP_PASS') },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
}

export function mailConfig() {
  return { from: required('EMAIL_FROM'), to: required('RESORT_EMAIL') };
}
