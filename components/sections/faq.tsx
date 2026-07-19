'use client';

import { Reveal, StaggerGroup, staggerItem } from '@/components/motion';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '@/lib/data';
import * as React from 'react';

export function Faq() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="faq" className="relative bg-sand-50 py-24 dark:bg-ocean-900/40 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div className="text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-teal-700 dark:bg-teal-500/15 dark:text-teal-300">
              FAQ
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ocean-800 dark:text-white sm:text-5xl">
              Good to know
            </h2>
          </Reveal>
        </div>

        <StaggerGroup className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={f.q}
                variants={staggerItem}
                className="overflow-hidden rounded-2xl bg-white shadow-glass ring-1 ring-ocean-100/60 dark:bg-ocean-800/60 dark:ring-white/5"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-display text-lg font-semibold text-ocean-800 dark:text-white">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-teal-500 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground dark:text-white/70">
                    {f.a}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
