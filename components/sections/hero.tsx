'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Compass } from 'lucide-react';

const VIDEO_SRC =
  'https://cdn.coverr.co/videos/coverr-aerial-view-of-the-beach-1080p.mp4';
const VIDEO_FALLBACK =
  'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1920';

export function Hero() {
  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={VIDEO_FALLBACK}
          className="h-full w-full object-cover"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ocean-900/40 via-ocean-900/25 to-ocean-900/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-300" />
          Paradise Island • Indian Ocean
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-semibold leading-[1.05] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.45)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          India&apos;s Coastal Sanctuary
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 max-w-2xl text-balance text-base font-light text-white/90 sm:text-lg md:text-xl"
        >
          Luxury Beach Resort • Oceanfront Villas • World-Class Hospitality
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-ocean-500 px-8 py-4 text-base font-semibold text-white shadow-luxe transition hover:scale-[1.03] hover:brightness-110"
          >
            <Calendar className="h-5 w-5" />
            Book Your Stay
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full glass px-8 py-4 text-base font-semibold text-white transition hover:bg-white/20"
          >
            <Compass className="h-5 w-5" />
            Explore Resort
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-28 left-1/2 z-10 -translate-x-1/2 text-white/80"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="flex flex-col items-center gap-1"
        >
          <span className="text-[11px] uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Animated wave at bottom */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[120px]">
        <div className="relative h-full w-full overflow-hidden">
          <svg
            className="absolute bottom-0 left-0 h-full w-[200%] animate-wave-move"
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="rgba(255,255,255,0.9)"
              d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 C1680,100 1920,20 2160,60 C2400,100 2640,20 2880,60 L2880,120 L0,120 Z"
            />
          </svg>
          <svg
            className="absolute bottom-0 left-0 h-full w-[200%] animate-wave-move opacity-60"
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
            style={{ animationDuration: '18s' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#0F6E8C"
              d="M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80 C1680,40 1920,120 2160,80 C2400,40 2640,120 2880,80 L2880,120 L0,120 Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
