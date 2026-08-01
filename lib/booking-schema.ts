import { z } from 'zod';
import { ROOMS } from '@/lib/data';

const ROOM_IDS = ROOMS.map((r) => r.id) as [string, ...string[]];

// Raw input coming from the client. We deliberately do NOT trust
// `total` / `nights` / `room name` from the client — those are
// recomputed on the server in the API route.
export const bookingInputSchema = z
  .object({
    guestName: z
      .string()
      .trim()
      .min(2, 'Please enter your full name')
      .max(100),
    guestPhone: z
      .string()
      .trim()
      .min(6, 'Please enter a valid phone number')
      .max(20)
      .regex(/^[+()\-\s\d]+$/, 'Phone number contains invalid characters'),
    guestEmail: z.string().trim().email('Please enter a valid email address').max(150),
    checkIn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid check-in date'),
    checkOut: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid check-out date'),
    adults: z.number().int().min(1).max(6),
    children: z.number().int().min(0).max(4),
    roomId: z.enum(ROOM_IDS, { errorMap: () => ({ message: 'Invalid room selected' }) }),
    requests: z.string().trim().max(500).optional().default(''),
  })
  .superRefine((data, ctx) => {
    const inDate = new Date(data.checkIn);
    const outDate = new Date(data.checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (Number.isNaN(inDate.getTime()) || Number.isNaN(outDate.getTime())) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Invalid date format' });
      return;
    }
    if (inDate < today) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Check-in cannot be in the past', path: ['checkIn'] });
    }
    if (outDate <= inDate) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Check-out must be after check-in', path: ['checkOut'] });
    }
    const nights = Math.round((outDate.getTime() - inDate.getTime()) / 86400000);
    if (nights > 30) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Stays longer than 30 nights are not supported online', path: ['checkOut'] });
    }
  });

export type BookingInput = z.infer<typeof bookingInputSchema>;
