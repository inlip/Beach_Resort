'use client';

import { Reveal, StaggerGroup, staggerItem } from '@/components/motion';
import { motion } from 'framer-motion';
import { AMENITIES } from '@/lib/data';

export function Amenities() {
  return (
    <section
      id="amenities"
      className="scroll-mt-24 relative overflow-hidden bg-ocean-500 py-24 lg:py-32"
    >
      {/* decorative palm pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-white" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-teal-300" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              Resort Amenities
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Everything you need, nothing you don&apos;t
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-white/80">
              Twelve signature amenities designed to make every moment effortless.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {AMENITIES.map((a) => (
            <motion.div
              key={a.name}
              variants={staggerItem}
              whileHover={{ y: -6 }}
              className="group rounded-2xl glass p-6 text-white transition hover:bg-white/20"
            >
              <div className="relative mb-5 h-28 overflow-hidden rounded-xl">
                <img src={a.image} alt={a.name} loading="eager" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/50 to-transparent" />
              </div>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-teal-100 transition group-hover:bg-teal-300 group-hover:text-ocean-700">
                <a.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">{a.name}</h3>
              <p className="mt-1.5 text-sm text-white/75">{a.desc}</p>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
