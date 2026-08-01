'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Reveal } from '@/components/motion';
import { RESORT } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!response.ok) {
      toast({ title: 'Message could not be sent', description: 'Please try again later.', variant: 'destructive' });
      return;
    }
    toast({
      title: 'Message sent',
      description: 'Our concierge will respond within 24 hours.',
    });
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="relative bg-white py-24 dark:bg-ocean-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ocean-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700 dark:bg-white/10 dark:text-teal-300">
              Contact
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ocean-800 dark:text-white sm:text-5xl">
              Let&apos;s plan your stay
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Map + info */}
          <Reveal>
            <div className="overflow-hidden rounded-3xl shadow-glass">
              <iframe
                title="Resort location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.0%2C3.0%2C73.4%2C3.4&layer=mapnik&marker=3.2028%2C73.2207"
                className="h-72 w-full border-0 md:h-80"
                loading="lazy"
              />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard icon={Phone} label="Phone" value={RESORT.phone} href={RESORT.phoneHref} />
              <InfoCard
                icon={MessageCircle}
                label="WhatsApp"
                value={RESORT.whatsapp}
                href={RESORT.whatsappHref}
              />
              <InfoCard
                icon={Mail}
                label="Email"
                value={RESORT.email}
                href={`mailto:${RESORT.email}`}
              />
              <InfoCard icon={MapPin} label="Address" value={RESORT.address} />
            </div>
            <div className="mt-6 flex items-center gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-ocean-100 text-ocean-700 transition hover:bg-teal-400 hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-teal-400 dark:hover:text-ocean-900"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="rounded-3xl bg-sand-50 p-6 shadow-glass dark:bg-ocean-800/60 sm:p-8"
            >
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Full name
                  </span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="input"
                    placeholder="Jane Traveller"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="input"
                    placeholder="jane@example.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input resize-none"
                    placeholder="Tell us about your dream stay…"
                  />
                </label>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-ocean-500 px-6 py-3.5 text-base font-semibold text-white shadow-luxe"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
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

function InfoCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-3 rounded-2xl bg-sand-50 p-4 ring-1 ring-ocean-100/60 transition hover:ring-teal-300 dark:bg-ocean-800/60 dark:ring-white/5">
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-teal-400/20 text-teal-600 dark:text-teal-300">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-ocean-800 dark:text-white">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {inner}
    </a>
  ) : (
    inner
  );
}
