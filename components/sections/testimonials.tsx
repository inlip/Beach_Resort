'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/data';
import { Reveal } from '@/components/motion';
import { cn } from '@/lib/utils';

export function Testimonials() {
  const [idx, setIdx] = React.useState(0);
  const [dir, setDir] = React.useState(1);
  const count = TESTIMONIALS.length;

  const go = React.useCallback(
    (n: number) => {
      setDir(n > 0 ? 1 : -1);
      setIdx((i) => (i + n + count) % count);
    },
    [count]
  );

  React.useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIdx((i) => (i + 1) % count);
    }, 6000);
    return () => clearInterval(t);
  }, [count]);

  const t = TESTIMONIALS[idx];

  return (
    <section className="relative overflow-hidden bg-ocean-700 py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute left-1/4 top-10 h-72 w-72 rounded-full bg-teal-300 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-80 w-80 rounded-full bg-sand-200 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-5 text-center lg:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            Guest Stories
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Loved by travellers worldwide
          </h2>
        </Reveal>

        <div className="relative mt-14 min-h-[280px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={idx}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mx-auto max-w-3xl"
            >
              <Quote className="mx-auto h-10 w-10 text-teal-300" />
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-sand-200 text-sand-200" />
                ))}
              </div>
              <p className="mt-6 text-balance text-lg font-light leading-relaxed text-white/95 md:text-xl">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-white/40"
                />
                <div className="text-left">
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-white/70">{t.country}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDir(i > idx ? 1 : -1);
                  setIdx(i);
                }}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === idx ? 'w-7 bg-teal-300' : 'w-2 bg-white/40 hover:bg-white/60'
                )}
              />
            ))}
          </div>
          <button
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
