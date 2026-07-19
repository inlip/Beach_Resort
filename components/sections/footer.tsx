'use client';

import * as React from 'react';
import { Waves, Instagram, Facebook, Twitter, Youtube, Send, ArrowRight } from 'lucide-react';
import { NAV_LINKS, RESORT } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Reveal } from '@/components/motion';

const INSTA_FEED = [
  'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/2467558/pexels-photo-2467558.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/802024/pexels-photo-802024.jpeg?auto=compress&cs=tinysrgb&w=400',
];

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = React.useState('');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast({ title: 'Subscribed!', description: 'Welcome to the Azurea circle.' });
    setEmail('');
  };

  return (
    <footer className="relative overflow-hidden bg-ocean-900 pt-20 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Newsletter */}
        <Reveal>
          <div className="rounded-3xl glass-dark p-8 sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <h3 className="font-display text-3xl font-semibold sm:text-4xl">
                  Join the Azurea circle
                </h3>
                <p className="mt-3 text-white/75">
                  Be the first to receive exclusive offers, new experiences and stories from
                  the island.
                </p>
              </div>
              <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-white/50 outline-none transition focus:border-teal-300"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-ocean-500 px-6 py-3.5 font-semibold text-white transition hover:brightness-110"
                >
                  <Send className="h-4 w-4" />
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </Reveal>

        {/* Instagram feed */}
        <div className="mt-14">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-xl font-semibold">@azurea.resort</h4>
            <a
              href={RESORT.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-teal-300 hover:underline"
            >
              <Instagram className="h-4 w-4" />
              Follow us
            </a>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {INSTA_FEED.map((src, i) => (
              <a
                key={src}
                href={RESORT.instagram}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-xl"
              >
                <img
                  src={src}
                  alt={`Instagram post ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-ocean-900/0 transition group-hover:bg-ocean-900/40">
                  <Instagram className="h-5 w-5 scale-0 text-white transition group-hover:scale-100" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2 font-display text-2xl font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-400/20 text-teal-300">
                <Waves className="h-5 w-5" />
              </span>
              {RESORT.name}
            </a>
            <p className="mt-4 text-sm text-white/70">{RESORT.tagline}</p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-teal-400 hover:text-ocean-900"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Explore
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {NAV_LINKS.slice(0, 5).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-teal-300">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Company
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {NAV_LINKS.slice(5).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="transition hover:text-teal-300">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="transition hover:text-teal-300">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-teal-300">
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
              Contact
            </h5>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>
                <a href={RESORT.phoneHref} className="transition hover:text-teal-300">
                  {RESORT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${RESORT.email}`} className="transition hover:text-teal-300">
                  {RESORT.email}
                </a>
              </li>
              <li className="text-white/70">{RESORT.address}</li>
            </ul>
            <a
              href="#booking"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-300 hover:underline"
            >
              Book now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 py-8 text-sm text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} {RESORT.fullName}. All rights reserved.</p>
          <p>Crafted with care on Paradise Island.</p>
        </div>
      </div>
    </footer>
  );
}
