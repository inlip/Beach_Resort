'use client';

import { Reveal, StaggerGroup, staggerItem } from '@/components/motion';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';
import { OFFERS } from '@/lib/data';

export function Offers() {
  return (
    <section id="offers" className="relative bg-sand-50 py-24 dark:bg-ocean-900/40 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
              <Tag className="h-3.5 w-3.5" />
              Special Offers
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ocean-800 dark:text-white sm:text-5xl">
              Offers worth escaping for
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted-foreground dark:text-white/70">
              Limited-time packages designed to make your stay even sweeter.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((o) => (
            <motion.article
              key={o.title}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-glass ring-1 ring-ocean-100/60 dark:bg-ocean-800/60 dark:ring-white/5"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={o.image}
                  alt={o.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/60 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-teal-400 px-3 py-1 text-xs font-semibold text-ocean-900 shadow">
                  {o.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold text-ocean-800 dark:text-white">
                  {o.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground dark:text-white/70">
                  {o.desc}
                </p>
                <a
                  href="#booking"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-ocean-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ocean-600"
                >
                  {o.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
