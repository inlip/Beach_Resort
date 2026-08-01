'use client';

import { Reveal } from '@/components/motion';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { DINING } from '@/lib/data';

export function Dining() {
  return (
    <section id="dining" className="relative bg-sand-50 py-24 dark:bg-ocean-900/40 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ocean-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700 dark:bg-white/10 dark:text-teal-300">
              Dining
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ocean-800 dark:text-white sm:text-5xl">
              India on every plate
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted-foreground dark:text-white/70">
              Four distinctive venues, one philosophy — fresh, local and unforgettable.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {DINING.map((d, i) => (
            <Reveal key={d.name} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group relative h-80 overflow-hidden rounded-3xl shadow-glass sm:h-96"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium text-white">
                    <Clock className="h-3 w-3" />
                    {d.hours}
                  </span>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-teal-300">
                    {d.cuisine}
                  </p>
                  <h3 className="mt-1 font-display text-3xl font-semibold text-white">
                    {d.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-white/85">{d.desc}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
