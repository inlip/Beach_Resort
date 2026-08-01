'use client';

import { Reveal, StaggerGroup, staggerItem } from '@/components/motion';
import { motion } from 'framer-motion';
import { Users, Maximize, ArrowRight, Star, X } from 'lucide-react';
import * as React from 'react';
import { ROOMS, formatPrice } from '@/lib/data';
import { cn } from '@/lib/utils';

export function Rooms() {
  const [selectedRoom, setSelectedRoom] = React.useState<(typeof ROOMS)[number] | null>(null);

  return (
    <section id="rooms" className="scroll-mt-24 relative bg-white py-24 dark:bg-ocean-900 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-ocean-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-ocean-700 dark:bg-white/10 dark:text-teal-300">
              Rooms & Villas
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 font-display text-4xl font-semibold leading-tight text-ocean-800 dark:text-white sm:text-5xl">
              A villa for every kind of escape
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted-foreground dark:text-white/70">
              From intimate ocean-view rooms to a sprawling presidential retreat — each
              space is designed with private decks, natural light and the sound of the sea.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room) => (
            <motion.article
              key={room.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedRoom(room)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') setSelectedRoom(room);
              }}
              className="group relative overflow-hidden rounded-3xl bg-sand-50 shadow-glass ring-1 ring-ocean-100/60 transition dark:bg-ocean-800/60 dark:ring-white/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="eager"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/70 via-ocean-900/10 to-transparent" />
                {room.tag && (
                  <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-teal-400 px-3 py-1 text-xs font-semibold text-ocean-900 shadow">
                    <Star className="h-3 w-3 fill-ocean-900" />
                    {room.tag}
                  </span>
                )}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <h3 className="font-display text-2xl font-semibold drop-shadow">
                    {room.name}
                  </h3>
                  <p className="text-right">
                    <span className="font-display text-xl font-bold sm:text-2xl">{formatPrice(room.price)}</span>
                    <span className="text-xs font-light opacity-80"> /night</span>
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-white/70">
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-teal-500" />
                    {room.capacity}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize className="h-4 w-4 text-teal-500" />
                    {room.size}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ocean-700 ring-1 ring-ocean-100 dark:bg-white/5 dark:text-white/80 dark:ring-white/10"
                    >
                      {a}
                    </span>
                  ))}
                </div>
                <a
                  href="#booking"
                  onClick={(event) => event.stopPropagation()}
                  className={cn(
                    'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full',
                    'bg-ocean-500 px-5 py-3 text-sm font-semibold text-white transition',
                    'hover:bg-ocean-600 hover:shadow-luxe'
                  )}
                >
                  Book Now
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>

      {selectedRoom && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ocean-900/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedRoom.name} details`}
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-white shadow-2xl dark:bg-ocean-800"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close room details"
              onClick={() => setSelectedRoom(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white transition hover:bg-black/60"
            >
              <X className="h-5 w-5" />
            </button>
            <img src={selectedRoom.image} alt={selectedRoom.name} className="h-64 w-full object-cover sm:h-80" />
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">Room & Villa</p>
                  <h3 className="mt-2 font-display text-3xl font-semibold text-ocean-800 dark:text-white">{selectedRoom.name}</h3>
                </div>
                <p className="font-display text-2xl font-bold text-teal-600 dark:text-teal-300">{formatPrice(selectedRoom.price)}<span className="ml-1 text-xs font-normal">/night</span></p>
              </div>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-muted-foreground dark:text-white/70">
                <span className="inline-flex items-center gap-1.5"><Users className="h-4 w-4 text-teal-500" />{selectedRoom.capacity}</span>
                <span className="inline-flex items-center gap-1.5"><Maximize className="h-4 w-4 text-teal-500" />{selectedRoom.size}</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedRoom.amenities.map((amenity) => <span key={amenity} className="rounded-full bg-ocean-50 px-3 py-1.5 text-sm text-ocean-700 dark:bg-white/10 dark:text-white/80">{amenity}</span>)}
              </div>
              <a href="#booking" onClick={() => setSelectedRoom(null)} className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean-500 px-5 py-3 font-semibold text-white transition hover:bg-ocean-600">Book this room <ArrowRight className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
