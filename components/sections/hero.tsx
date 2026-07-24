'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  Compass,
  Flower2,
  Sparkles,
} from 'lucide-react';

const VIDEO_SRC =
  'https://cdn.coverr.co/videos/coverr-aerial-view-of-the-beach-1080p.mp4';
const VIDEO_FALLBACK =
  'https://images.pexels.com/photos/1450363/pexels-photo-1450363.jpeg?auto=compress&cs=tinysrgb&w=1920';

export function Hero() {
  return (
    <section id="home" className="relative h-[100svh] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#25120e]/45 via-[#5b2416]/20 to-[#1c1510]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#4d1f14]/45 via-transparent to-[#102f38]/20" />
        <div className="indian-hero-pattern absolute inset-0 opacity-25" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#ff9933] via-white to-[#138808]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#f9cf84]/60 bg-[#6f2718]/30 text-[#ffd58a] shadow-[0_0_40px_rgba(255,180,70,0.25)] backdrop-blur-md"
        >
          <Flower2 className="h-8 w-8" strokeWidth={1.5} />
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#f5c36c]/35 bg-[#542014]/35 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.22em] text-[#ffe8bd] backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[#f6bd5b]" />
          Goa · Arabian Sea · India
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display text-5xl font-semibold leading-[1.02] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.5)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Where India
          <span className="block bg-gradient-to-r from-[#ffd384] via-[#fff4dc] to-[#f3b85c] bg-clip-text italic text-transparent">
            Meets the Sea
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-6 max-w-2xl text-balance text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-xl"
        >
          Soulful coastal luxury, sun-washed villas and the timeless warmth of
          Indian hospitality.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-3 font-display text-sm tracking-[0.18em] text-[#ffd58a] sm:text-base"
        >
          अतिथि देवो भवः
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#booking"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e4772d] to-[#b84522] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_-16px_rgba(226,105,42,0.75)] transition hover:scale-[1.03] hover:brightness-110"
          >
            <Calendar className="h-5 w-5" />
            Reserve Your Escape
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-[#f8d89c]/40 bg-[#401a12]/25 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition hover:bg-[#6b2c1c]/40"
          >
            <Compass className="h-5 w-5" />
            Discover Azurea
          </a>
        </motion.div>
      </div>

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
          <span className="text-[11px] uppercase tracking-[0.25em]">
            Discover
          </span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

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
              fill="#c85b2a"
              d="M0,80 C240,40 480,120 720,80 C960,40 1200,120 1440,80 C1680,40 1920,120 2160,80 C2400,40 2640,120 2880,80 L2880,120 L0,120 Z"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
