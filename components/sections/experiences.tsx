'use client';

import { Reveal, StaggerGroup, staggerItem } from '@/components/motion';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
import { EXPERIENCES } from '@/lib/data';

export function Experiences() {
  return (
    <section
      id="experiences"
      className="relative bg-white py-24 dark:bg-ocean-900 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
                Experiences
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ocean-800 dark:text-white sm:text-5xl">
                Curated moments beyond the villa
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-md text-muted-foreground dark:text-white/70">
              From sunrise dolphin cruises to candlelit dinners on the sand — our concierge
              designs each experience around you.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {EXPERIENCES.map((exp) => (
            <motion.article
              key={exp.title}
              variants={staggerItem}
              className="group relative h-80 overflow-hidden rounded-3xl shadow-glass"
            >
              <img
                src={exp.image}
                alt={exp.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/90 via-ocean-900/30 to-transparent" />
              <motion.div
                className="absolute inset-0 flex flex-col justify-end p-5"
                initial={{ y: 0 }}
                whileHover="hover"
              >
                <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium text-white">
                  <Clock className="h-3 w-3" />
                  {exp.duration}
                </span>
                <h3 className="font-display text-xl font-semibold text-white drop-shadow">
                  {exp.title}
                </h3>
                <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                  {exp.desc}
                </p>
                <span className="mt-3 inline-flex w-fit items-center gap-1 text-sm font-semibold text-teal-300">
                  Discover <ArrowUpRight className="h-4 w-4" />
                </span>
              </motion.div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
