'use client';

import { Reveal, Counter, StaggerGroup, staggerItem } from '@/components/motion';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { STATS } from '@/lib/data';

const HIGHLIGHTS = [
  'Private beach',
  'Infinity pool',
  'Luxury villas',
  'Fine dining',
  'Overwater spa',
  'Family-friendly',
  'Adventure activities',
];

export function About() {
  return (
    <section id="about" className="relative bg-sand-50 py-24 dark:bg-ocean-900/40 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <Reveal>
            <div className="relative">
              <div className="overflow-hidden rounded-[2rem] shadow-luxe">
                <img
                  src="https://images.pexels.com/photos/1455861/pexels-photo-1455861.jpeg?auto=compress&cs=tinysrgb&w=1100"
                  alt="Azurea Oceanfront Resort aerial view"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-4 hidden w-56 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block dark:border-ocean-800">
                <img
                  src="https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Infinity pool"
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="absolute -left-4 -top-6 hidden rounded-2xl glass-solid px-5 py-4 shadow-glass md:block dark:bg-ocean-800/80">
                <p className="font-display text-3xl font-bold text-ocean-700 dark:text-teal-300">
                  <Counter value={15} suffix=" yrs" />
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  of hospitality
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                About Azurea
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ocean-800 dark:text-white sm:text-5xl">
                Where the ocean meets <em className="text-teal-500">timeless luxury</em>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground dark:text-white/70">
                Tucked between a private crescent of white sand and a turquoise lagoon,
                Azurea Oceanfront Resort is a sanctuary designed for those who travel for
                beauty, stillness and the slow rhythm of island life. Every villa opens to
                the sea, every meal is a celebration, and every moment is yours.
              </p>
            </Reveal>

            <StaggerGroup className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
              {HIGHLIGHTS.map((h) => (
                <motion.div
                  key={h}
                  variants={staggerItem}
                  className="flex items-center gap-2.5 text-sm font-medium text-ocean-800 dark:text-white/85"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-400/20 text-teal-600 dark:text-teal-300">
                    <Check className="h-3 w-3" />
                  </span>
                  {h}
                </motion.div>
              ))}
            </StaggerGroup>

            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-bold text-ocean-700 dark:text-teal-300">
                      <Counter
                        value={s.value}
                        suffix={s.suffix ?? ''}
                        decimals={s.suffix === ' km' ? 1 : 0}
                      />
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
