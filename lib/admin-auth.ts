import crypto from 'crypto';

export const ADMIN_COOKIE = 'azurea_admin_session';

function signedToken(password: string) {
  return crypto.createHmac('sha256', password).update('azurea-owner-calendar').digest('base64url');
}

export function isValidPassword(value: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const expected = Buffer.from(password);
  const supplied = Buffer.from(value);
  return expected.length === supplied.length && crypto.timingSafeEqual(expected, supplied);
}

export function isOwnerSession(value?: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password || !value) return false;
  const expected = Buffer.from(signedToken(password));
  const supplied = Buffer.from(value);
  return expected.length === supplied.length && crypto.timingSafeEqual(expected, supplied);
}

export function ownerSessionToken() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('Admin access is not configured.');
  return signedToken(password);
}
