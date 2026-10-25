'use client';
import * as React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { ROOMS } from '@/lib/data';

type BookingStatus = 'pending' | 'confirmed' | 'declined';
type Booking = { id: string; guestName: string; guestEmail: string; guestPhone: string; roomId: string; room: string; checkIn: string; checkOut: string; adults: number; children: number; nights: number; requests: string; total: number; status: BookingStatus };
const dateKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
const monthKey = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

export function AdminCalendar() {
  const [month, setMonth] = React.useState(() => new Date()); const [roomId, setRoomId] = React.useState(ROOMS[0].id); const [bookings, setBookings] = React.useState<Booking[]>([]); const [selected, setSelected] = React.useState<Booking | null>(null); const [error, setError] = React.useState('');
  const [decisionMessage, setDecisionMessage] = React.useState('');
  const [updating, setUpdating] = React.useState(false);
  const currentYear = new Date().getFullYear();
  React.useEffect(() => { const controller = new AbortController(); setError(''); void fetch(`/api/admin/calendar?month=${monthKey(month)}`, { signal: controller.signal }).then(async (response) => { const data = await response.json() as { ok?: boolean; bookings?: Booking[]; error?: string }; if (!response.ok || !data.ok) throw new Error(data.error || 'Could not load occupancy.'); setBookings(data.bookings ?? []); }).catch((reason) => { if (!controller.signal.aborted) setError(reason instanceof Error ? reason.message : 'Could not load occupancy.'); }); return () => controller.abort(); }, [month]);
  const roomBookings = bookings.filter((booking) => booking.roomId === roomId);
  const activeBookings = roomBookings.filter((booking) => booking.status !== 'declined');
  const daysFor = (booking: Booking) => { const days: Date[] = []; for (let date = booking.checkIn; date < booking.checkOut;) { days.push(new Date(`${date}T00:00:00`)); const next = new Date(`${date}T00:00:00Z`); next.setUTCDate(next.getUTCDate() + 1); date = next.toISOString().slice(0, 10); } return days; };
  const pendingDays = activeBookings.filter((booking) => booking.status === 'pending').flatMap(daysFor);
  const confirmedDays = activeBookings.filter((booking) => booking.status === 'confirmed').flatMap(daysFor);
  const forDate = (date: Date) => activeBookings.find((booking) => dateKey(date) >= booking.checkIn && dateKey(date) < booking.checkOut);
  async function updateStatus(status: 'confirmed' | 'declined') {
    if (!selected || updating) return;
    if (status === 'declined' && !window.confirm('Decline this request and release the selected room dates?')) return;
    setUpdating(true); setError(''); setDecisionMessage('');
    try {
      const response = await fetch(`/api/admin/bookings/${selected.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) });
      const data = await response.json() as { ok?: boolean; error?: string; notification?: { sent?: boolean } };
      if (!response.ok || !data.ok) throw new Error(data.error || 'Could not update the booking request.');
      const updated = { ...selected, status };
      setBookings((current) => current.map((booking) => booking.id === selected.id ? updated : booking));
      setSelected(updated);
      setDecisionMessage(data.notification?.sent ? `Request ${status}. The customer email was sent.` : `Request ${status}, but the customer email could not be sent. Check Resend.`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : 'Could not update the booking request.'); }
    finally { setUpdating(false); }
  }
  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); window.location.reload(); }
  return (
    <main className="min-h-screen bg-sand-50 px-5 py-12 dark:bg-ocean-900">
      <div className="mx-auto max-w-5xl">
        <header className="flex items-center justify-between gap-4">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">Azurea owner</p><h1 className="mt-2 font-display text-4xl font-semibold text-ocean-800 dark:text-white">Occupancy &amp; availability</h1></div>
          <button onClick={() => void logout()} className="rounded-full border border-ocean-200 px-4 py-2 text-sm font-semibold text-ocean-700 dark:border-white/15 dark:text-white">Log out</button>
        </header>
        <section className="mt-8 rounded-3xl bg-white p-6 shadow-luxe dark:bg-ocean-800">
          <div className="flex flex-wrap gap-2">{ROOMS.map((room) => <button key={room.id} onClick={() => { setRoomId(room.id); setSelected(null); setDecisionMessage(''); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${room.id === roomId ? 'bg-ocean-600 text-white' : 'bg-sand-50 text-ocean-700 dark:bg-white/10 dark:text-white/80'}`}>{room.name}</button>)}</div>
          <div className="mt-6 grid gap-8 lg:grid-cols-[auto_1fr]">
            <div>
              <Calendar mode="single" month={month} onMonthChange={setMonth} captionLayout="dropdown" fromYear={currentYear - 2} toYear={currentYear + 20} onDayClick={(date) => { setSelected(forDate(date) ?? null); setDecisionMessage(''); }} modifiers={{ pending: pendingDays, confirmed: confirmedDays }} modifiersClassNames={{ pending: 'bg-amber-200 text-amber-950 font-bold hover:bg-amber-300 dark:bg-amber-400/35 dark:text-white', confirmed: 'bg-teal-300 text-ocean-900 font-bold hover:bg-teal-400 dark:bg-teal-400/35 dark:text-white' }} />
              <div className="mt-3 flex flex-wrap gap-4 px-3 text-xs text-muted-foreground"><span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-amber-300" />Pending review</span><span className="inline-flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-teal-300" />Confirmed</span></div>
            </div>
            <aside className="rounded-2xl bg-sand-50 p-5 dark:bg-ocean-900/60">
              <h2 className="font-display text-2xl font-semibold text-ocean-800 dark:text-white">Stay summary</h2>
              {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
              {selected ? <>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${selected.status === 'pending' ? 'bg-amber-100 text-amber-800' : selected.status === 'confirmed' ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-700'}`}>{selected.status}</span>
                <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                  <div><dt className="text-muted-foreground">Guest</dt><dd className="font-semibold">{selected.guestName}</dd></div>
                  <div><dt className="text-muted-foreground">Phone</dt><dd>{selected.guestPhone}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-muted-foreground">Email</dt><dd className="break-all">{selected.guestEmail}</dd></div>
                  <div><dt className="text-muted-foreground">Room</dt><dd className="font-semibold">{selected.room}</dd></div>
                  <div><dt className="text-muted-foreground">Guests</dt><dd>{selected.adults} adults, {selected.children} children</dd></div>
                  <div className="sm:col-span-2"><dt className="text-muted-foreground">Stay</dt><dd>{selected.checkIn} to {selected.checkOut} ({selected.nights} nights)</dd></div>
                  <div><dt className="text-muted-foreground">Total</dt><dd>₹{selected.total.toLocaleString('en-IN')}</dd></div>
                  <div className="sm:col-span-2"><dt className="text-muted-foreground">Special requests</dt><dd>{selected.requests || 'None'}</dd></div>
                </dl>
                {selected.status === 'pending' ? <div className="mt-6 flex flex-wrap gap-3 border-t border-ocean-100 pt-5 dark:border-white/10"><button disabled={updating} onClick={() => void updateStatus('confirmed')} className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-50">{updating ? 'Updating…' : 'Approve & email guest'}</button><button disabled={updating} onClick={() => void updateStatus('declined')} className="rounded-full border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50">Decline &amp; email guest</button></div> : null}
                {decisionMessage ? <p className="mt-4 text-sm font-medium text-ocean-700 dark:text-white" aria-live="polite">{decisionMessage}</p> : null}
              </> : !error ? <p className="mt-3 text-sm text-muted-foreground">Amber dates are pending review and teal dates are confirmed. Select a date to review the request.</p> : null}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
