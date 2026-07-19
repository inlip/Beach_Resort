'use client';

import * as React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { MessageCircle, ArrowUp, X, Phone, Sparkles } from 'lucide-react';
import { RESORT } from '@/lib/data';

export function FloatingActions() {
  const [showTop, setShowTop] = React.useState(false);
  const [chatOpen, setChatOpen] = React.useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 600));

  return (
    <>
      {/* WhatsApp */}
      <motion.a
        href={RESORT.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.08 }}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-luxe"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden>
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.041zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </motion.a>

      {/* Live chat */}
      <div className="fixed bottom-24 right-6 z-40">
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-3 w-72 overflow-hidden rounded-2xl bg-white shadow-luxe ring-1 ring-ocean-100 dark:bg-ocean-800 dark:ring-white/10"
            >
              <div className="bg-gradient-to-r from-teal-400 to-ocean-500 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-display text-lg font-semibold">Azurea Concierge</span>
                  </div>
                  <button onClick={() => setChatOpen(false)} aria-label="Close chat">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-white/85">Typically replies in minutes</p>
              </div>
              <div className="p-4">
                <div className="rounded-2xl rounded-tl-sm bg-sand-50 p-3 text-sm text-ocean-800 dark:bg-ocean-900/60 dark:text-white">
                  Hello! Welcome to Azurea. How can we help plan your perfect escape?
                </div>
                <a
                  href={RESORT.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ocean-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-ocean-600"
                >
                  <Phone className="h-4 w-4" />
                  Chat with us
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setChatOpen((o) => !o)}
          aria-label="Open live chat"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean-600 text-white shadow-luxe"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="fixed bottom-6 left-6 z-40 flex h-11 w-11 items-center justify-center rounded-full glass-solid text-ocean-700 shadow-glass dark:bg-ocean-800/80 dark:text-white"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
