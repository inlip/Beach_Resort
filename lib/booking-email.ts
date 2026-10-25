export type BookingEmailDetails = {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  checkIn: string;
  checkOut: string;
  adults?: number;
  children?: number;
  room: string;
  nights: number;
  requests?: string;
  total: number;
};

type BookingDecision = 'confirmed' | 'declined';

function emailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const owner = process.env.BOOKING_NOTIFICATION_EMAIL;
  const sender = process.env.BOOKING_FROM_EMAIL;
  return apiKey && owner && sender ? { apiKey, owner, sender } : null;
}

async function sendEmail(
  config: NonNullable<ReturnType<typeof emailConfig>>,
  message: Record<string, unknown>,
) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) throw new Error(`Resend returned ${response.status}`);
}

export async function sendNewBookingEmails(booking: BookingEmailDetails) {
  const config = emailConfig();
  if (!config) return { ownerSent: false, guestSent: false, configured: false };

  await sendEmail(config, {
    from: config.sender,
    to: [config.owner],
    reply_to: booking.guestEmail,
    subject: 'New booking enquiry',
    text: [
      `Booking ID: ${booking.id}`,
      `Guest: ${booking.guestName}`,
      `Phone: ${booking.guestPhone}`,
      `Email: ${booking.guestEmail}`,
      `Stay: ${booking.checkIn} to ${booking.checkOut} (${booking.nights} nights)`,
      `Guests: ${booking.adults} adults, ${booking.children} children`,
      `Room: ${booking.room}`,
      `Estimated total: ₹${booking.total.toLocaleString('en-IN')}`,
      `Special requests: ${booking.requests || 'None'}`,
    ].join('\n'),
  });

  await sendEmail(config, {
    from: config.sender,
    to: [booking.guestEmail],
    subject: 'Booking enquiry received',
    text: [
      `Hello ${booking.guestName},`,
      '',
      'Thank you for your enquiry. We have received your booking request for review. This is not yet a booking confirmation.',
      '',
      `Room: ${booking.room}`,
      `Stay: ${booking.checkIn} to ${booking.checkOut} (${booking.nights} nights)`,
      `Estimated total: ₹${booking.total.toLocaleString('en-IN')}`,
      '',
      'Our reservations team will email you once the request has been approved or declined.',
    ].join('\n'),
  });

  return { ownerSent: true, guestSent: true, configured: true };
}

export async function sendBookingDecisionEmail(
  booking: BookingEmailDetails,
  decision: BookingDecision,
) {
  const config = emailConfig();
  if (!config) return { sent: false, configured: false };

  const confirmed = decision === 'confirmed';
  await sendEmail(config, {
    from: config.sender,
    to: [booking.guestEmail],
    reply_to: config.owner,
    subject: confirmed ? 'Booking confirmed' : 'Booking enquiry update',
    text: confirmed
      ? [
          `Hello ${booking.guestName},`,
          '',
          'Your booking has been confirmed. We look forward to welcoming you to Azurea Oceanfront Resort.',
          '',
          `Booking ID: ${booking.id}`,
          `Room: ${booking.room}`,
          `Check-in: ${booking.checkIn} from 12:00 noon`,
          `Check-out: ${booking.checkOut} by 11:00 am`,
          `Nights: ${booking.nights}`,
          `Total: ₹${booking.total.toLocaleString('en-IN')}`,
        ].join('\n')
      : [
          `Hello ${booking.guestName},`,
          '',
          'Thank you for considering Azurea Oceanfront Resort. Unfortunately, we are unable to confirm your booking request for the selected stay.',
          '',
          `Booking ID: ${booking.id}`,
          `Room: ${booking.room}`,
          `Requested stay: ${booking.checkIn} to ${booking.checkOut}`,
          '',
          'Please reply to this email if you would like help choosing different dates or another room.',
        ].join('\n'),
  });

  return { sent: true, configured: true };
}
