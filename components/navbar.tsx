'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Waves } from 'lucide-react';
import { NAV_LINKS, RESORT } from '@/lib/data';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
          scrolled
            ? 'glass-solid shadow-glass dark:bg-ocean-900/85 dark:backdrop-blur-xl'
            : 'bg-transparent'
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link
            href="#home"
            className={cn(
              'group flex items-center gap-2 font-display text-2xl font-semibold tracking-wide transition-colors',
              scrolled
                ? 'text-ocean-700 dark:text-white'
                : 'text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]'
            )}
          >
            <span
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                scrolled ? 'bg-teal-400/20 text-teal-500' : 'bg-white/15 text-white'
              )}
            >
              <Waves className="h-5 w-5" />
            </span>
            {RESORT.name}
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'rounded-full px-3.5 py-2 text-sm font-medium transition-colors',
                  scrolled
                    ? 'text-ocean-800/80 hover:bg-ocean-100/60 dark:text-white/80 dark:hover:bg-white/10'
                    : 'text-white/90 hover:bg-white/15'
                )}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle
              className={cn(
                scrolled
                  ? 'border-ocean-200/60 text-ocean-700 dark:border-white/15 dark:text-white'
                  : 'border-white/30 text-white'
              )}
            />
            <Link
              href="#booking"
              className="hidden rounded-full bg-gradient-to-r from-teal-400 to-ocean-500 px-6 py-2.5 text-sm font-semibold text-white shadow-luxe transition hover:shadow-lg hover:brightness-110 sm:inline-flex"
            >
              Book Now
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className={cn(
                'inline-flex h-10 w-10 items-center justify-center rounded-full transition lg:hidden',
                scrolled
                  ? 'text-ocean-700 dark:text-white'
                  : 'text-white'
              )}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-ocean-900/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 34 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-6 shadow-2xl dark:bg-ocean-900"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-semibold text-ocean-700 dark:text-white">
                  {RESORT.name}
                </span>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ocean-100 text-ocean-700 dark:bg-white/10 dark:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 flex flex-col gap-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-lg font-medium text-ocean-800 transition hover:bg-ocean-50 dark:text-white/90 dark:hover:bg-white/10"
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-6 block rounded-full bg-gradient-to-r from-teal-400 to-ocean-500 px-6 py-3.5 text-center text-base font-semibold text-white shadow-luxe"
              >
                Book Your Stay
              </Link>
              <div className="mt-8 space-y-1 text-sm text-muted-foreground">
                <a href={RESORT.phoneHref} className="block">
                  {RESORT.phone}
                </a>
                <a href={`mailto:${RESORT.email}`} className="block">
                  {RESORT.email}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
