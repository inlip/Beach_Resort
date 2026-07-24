'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Users, BedDouble, Baby, Check, Sparkles, Mail, Phone, User } from 'lucide-react';
import { RESORT, ROOMS } from '@/lib/data';
import { Reveal } from '@/components/motion';
import { useToast } from '@/hooks/use-toast';
import {
  formatDualCurrency,
  formatInr,
  formatUsdFromInr,
  USD_TO_INR,
} from '@/lib/currency';

function todayISO(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

function nightsBetween(a: string, b: string) {
  if (!a || !b) return 0;
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.max(0, Math.round(ms / 86400000));
}

const BOOKINGS_STORAGE_KEY = 'azurea-bookings';

export function BookingInner() {
  const { toast } = useToast();
  const [guestName, setGuestName] = React.useState('');
  const [guestPhone, setGuestPhone] = React.useState('');
  const [guestEmail, setGuestEmail] = React.useState('');
  const [checkIn, setCheckIn] = React.useState(todayISO(1));
  const [checkOut, setCheckOut] = React.useState(todayISO(4));
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [roomId, setRoomId] = React.useState(ROOMS[0].id);
  const [requests, setRequests] = React.useState('');
  const [confirmed, setConfirmed] = React.useState(false);

  const room = ROOMS.find((r) => r.id === roomId)!;
  const nights = nightsBetween(checkIn, checkOut);
  const base = room.price * Math.max(nights, 1);
  const service = Math.round(base * 0.1);
  const taxes = Math.round(base * 0.12);
  const total = base + service + taxes;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nights < 1) {
      toast({
        title: 'Please choose valid dates',
        description: 'Check-out must be after check-in.',
        variant: 'destructive',
      });
      return;
    }

    const bookingRequest = {
      guestName,
      guestPhone,
      guestEmail,
      checkIn,
      checkOut,
      adults,
      children,
      room: room.name,
      nights,
      requests,
      total,
    };

    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingRequest),
    });

    if (!response.ok) {
      toast({
        title: 'Could not save booking',
        description: 'Please try again before sending the WhatsApp request.',
        variant: 'destructive',
      });
      return;
    }

    const { booking } = await response.json();

    try {
      const savedBookings = JSON.parse(
        window.localStorage.getItem(BOOKINGS_STORAGE_KEY) || '[]',
      );
      window.localStorage.setItem(
        BOOKINGS_STORAGE_KEY,
        JSON.stringify([booking, ...savedBookings]),
      );
    } catch {
      // The SQLite database remains the source of truth if localStorage is unavailable.
    }

    const message = [
      `New booking request for ${RESORT.fullName}`,
      `Booking ID: ${booking.id}`,
      `Guest: ${guestName}`,
      `Phone: ${guestPhone}`,
      `Email: ${guestEmail}`,
      `Stay: ${checkIn} to ${checkOut} (${nights} ${nights === 1 ? 'night' : 'nights'})`,
      `Guests: ${adults} adult${adults === 1 ? '' : 's'}, ${children} child${children === 1 ? '' : 'ren'}`,
      `Room: ${room.name}`,
      `Estimated total: ${formatDualCurrency(total)}`,
      `Special requests: ${requests || 'None'}`,
    ].join('\n');

    window.open(`${RESORT.whatsappHref}?text=${encodeURIComponent(message)}`, '_blank');

    setConfirmed(true);
    toast({
      title: 'Reservation saved',
      description: 'Your booking details were stored and WhatsApp is ready to send.',
    });
  };

  return (
    <section
      id="booking"
      className="relative overflow-hidden bg-ocean-800 py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-teal-300 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                Book Your Stay
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Reserve your slice of paradise
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-4 text-white/80">
                Best rate guaranteed when you book directly. Instant confirmation, flexible
                cancellation and a welcome cocktail on us.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 space-y-3 text-white/90">
                {[
                  'Best available rate — guaranteed',
                  'Complimentary airport transfer',
                  'Free cancellation up to 14 days',
                  'Daily breakfast & sunset cocktail',
                ].map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-400 text-ocean-900">
                      <Check className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={0.15}>
              <div className="rounded-3xl bg-white p-6 shadow-luxe dark:bg-ocean-900 sm:p-8">
                <AnimatePresence mode="wait">
                  {confirmed ? (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center"
                    >
                      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                        <Check className="h-8 w-8" />
                      </span>
                      <h3 className="mt-5 font-display text-2xl font-semibold text-ocean-800 dark:text-white">
                        Request received!
                      </h3>
                      <p className="mt-2 max-w-sm text-sm text-muted-foreground dark:text-white/70">
                        Thank you. Our concierge team will email a confirmation for your{' '}
                        <strong>{room.name}</strong> within 24 hours.
                      </p>
                      <button
                        onClick={() => setConfirmed(false)}
                        className="mt-6 rounded-full bg-ocean-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-ocean-600"
                      >
                        New reservation
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={submit}
                      className="space-y-5"
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Guest name" icon={User}>
                          <input
                            type="text"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            placeholder="Your full name"
                            className="input"
                            required
                          />
                        </Field>
                        <Field label="Phone number" icon={Phone}>
                          <input
                            type="tel"
                            value={guestPhone}
                            onChange={(e) => setGuestPhone(e.target.value)}
                            placeholder="+1 555 123 4567"
                            className="input"
                            required
                          />
                        </Field>
                      </div>

                      <Field label="Email address" icon={Mail}>
                        <input
                          type="email"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="input"
                          required
                        />
                      </Field>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Check-in" icon={CalendarDays}>
                          <input
                            type="date"
                            value={checkIn}
                            min={todayISO()}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="input"
                            required
                          />
                        </Field>
                        <Field label="Check-out" icon={CalendarDays}>
                          <input
                            type="date"
                            value={checkOut}
                            min={checkIn || todayISO(1)}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="input"
                            required
                          />
                        </Field>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Adults" icon={Users}>
                          <select
                            value={adults}
                            onChange={(e) => setAdults(Number(e.target.value))}
                            className="input"
                          >
                            {[1, 2, 3, 4, 5, 6].map((n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? 'Adult' : 'Adults'}
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field label="Children" icon={Baby}>
                          <select
                            value={children}
                            onChange={(e) => setChildren(Number(e.target.value))}
                            className="input"
                          >
                            {[0, 1, 2, 3, 4].map((n) => (
                              <option key={n} value={n}>
                                {n} {n === 1 ? 'Child' : 'Children'}
                              </option>
                            ))}
                          </select>
                        </Field>
                      </div>

                      <Field label="Room type" icon={BedDouble}>
                        <select
                          value={roomId}
                          onChange={(e) => setRoomId(e.target.value)}
                          className="input"
                        >
                          {ROOMS.map((r) => (
                            <option key={r.id} value={r.id}>
                              {r.name} — {formatInr(r.price)} / {formatUsdFromInr(r.price)}
                            </option>
                          ))}
                        </select>
                      </Field>

                      <Field label="Special requests" icon={Sparkles}>
                        <textarea
                          value={requests}
                          onChange={(e) => setRequests(e.target.value)}
                          rows={3}
                          placeholder="Late check-in, dietary needs, anniversary setup…"
                          className="input resize-none"
                        />
                      </Field>

                      {/* Live price estimate */}
                      <div className="rounded-2xl bg-sand-50 p-5 dark:bg-ocean-800/60">
                        <div className="flex items-center justify-between text-sm text-muted-foreground dark:text-white/70">
                          <span>
                            {room.name} × {nights} {nights === 1 ? 'night' : 'nights'}
                          </span>
                          <span className="text-right">{formatDualCurrency(base)}</span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-sm text-muted-foreground dark:text-white/70">
                          <span>Service charge (10%)</span>
                          <span className="text-right">{formatDualCurrency(service)}</span>
                        </div>
                        <div className="mt-1.5 flex items-center justify-between text-sm text-muted-foreground dark:text-white/70">
                          <span>Taxes (12%)</span>
                          <span className="text-right">{formatDualCurrency(taxes)}</span>
                        </div>
                        <div className="mt-3 flex items-center justify-between border-t border-ocean-100 pt-3 dark:border-white/10">
                          <span className="font-display text-lg font-semibold text-ocean-800 dark:text-white">
                            Estimated total
                          </span>
                          <span className="text-right font-display text-xl font-bold text-teal-600 dark:text-teal-300 sm:text-2xl">
                            <span className="block">{formatInr(total)}</span>
                            <span className="mt-0.5 block text-sm font-semibold text-muted-foreground dark:text-white/65">
                              {formatUsdFromInr(total)}
                            </span>
                          </span>
                        </div>
                        <p className="mt-3 text-right text-[11px] text-muted-foreground dark:text-white/50">
                          USD shown for reference at ₹{USD_TO_INR.toFixed(2)} per US$1.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full rounded-full bg-gradient-to-r from-teal-400 to-ocean-500 px-6 py-4 text-base font-semibold text-white shadow-luxe transition hover:scale-[1.01] hover:brightness-110"
                      >
                        Confirm Reservation
                      </button>
                      <p className="text-center text-xs text-muted-foreground">
                        No payment required now — we&apos;ll hold your reservation.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--muted) / 0.4);
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.input:focus) {
          border-color: hsl(var(--primary));
          box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      {children}
    </label>
  );
}
