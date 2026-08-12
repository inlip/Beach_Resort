'use client';

import * as React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { ResortChat } from '@/components/resort-chat';

export function FloatingActions() {
  const [showTop, setShowTop] = React.useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setShowTop(v > 600));

  return (
    <>
      <ResortChat />

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
