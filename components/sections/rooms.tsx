'use client';

import * as React from 'react';
import { Reveal, StaggerGroup, staggerItem } from '@/components/motion';
import { motion } from 'framer-motion';
import { Users, Maximize, ArrowRight, Star, X, Images } from 'lucide-react';
import { ROOMS } from '@/lib/data';
import { cn } from '@/lib/utils';

const roomDetailImages = [
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=700&q=85',
];

const roomGalleries: Record<string, string[]> = {
  'deluxe-ocean-view': [
    'https://loremflickr.com/1400/900/indian,hotel-room?lock=101', 'https://loremflickr.com/1400/900/indian,bedroom?lock=102', 'https://loremflickr.com/1400/900/ocean,hotel?lock=103', 'https://loremflickr.com/1400/900/luxury,bathroom?lock=104', 'https://loremflickr.com/1400/900/balcony,sea?lock=105', 'https://loremflickr.com/1400/900/resort,interior?lock=106',
  ],
  'beach-villa': [
    'https://loremflickr.com/1400/900/beach,villa?lock=201', 'https://loremflickr.com/1400/900/indian,bedroom?lock=202', 'https://loremflickr.com/1400/900/private,pool?lock=203', 'https://loremflickr.com/1400/900/tropical,bathroom?lock=204', 'https://loremflickr.com/1400/900/villa,terrace?lock=205', 'https://loremflickr.com/1400/900/beach,resort?lock=206',
  ],
  'pool-villa': [
    'https://loremflickr.com/1400/900/pool,villa?lock=301', 'https://loremflickr.com/1400/900/luxury,bedroom?lock=302', 'https://loremflickr.com/1400/900/infinity,pool?lock=303', 'https://loremflickr.com/1400/900/spa,bathroom?lock=304', 'https://loremflickr.com/1400/900/cabana,resort?lock=305', 'https://loremflickr.com/1400/900/palms,villa?lock=306',
  ],
  'honeymoon-suite': [
    'https://loremflickr.com/1400/900/honeymoon,suite?lock=401', 'https://loremflickr.com/1400/900/romantic,bedroom?lock=402', 'https://loremflickr.com/1400/900/plunge,pool?lock=403', 'https://loremflickr.com/1400/900/candlelight,dining?lock=404', 'https://loremflickr.com/1400/900/luxury,spa?lock=405', 'https://loremflickr.com/1400/900/sunset,balcony?lock=406',
  ],
  'family-cottage': [
    'https://loremflickr.com/1400/900/family,cottage?lock=501', 'https://loremflickr.com/1400/900/family,bedroom?lock=502', 'https://loremflickr.com/1400/900/kids,room?lock=503', 'https://loremflickr.com/1400/900/family,living-room?lock=504', 'https://loremflickr.com/1400/900/garden,house?lock=505', 'https://loremflickr.com/1400/900/kitchen,villa?lock=506',
  ],
  'presidential-villa': [
    'https://loremflickr.com/1400/900/presidential,villa?lock=601', 'https://loremflickr.com/1400/900/indian,luxury,interior?lock=602', 'https://loremflickr.com/1400/900/private,chef,kitchen?lock=603', 'https://loremflickr.com/1400/900/rooftop,pool?lock=604', 'https://loremflickr.com/1400/900/cinema,room?lock=605', 'https://loremflickr.com/1400/900/luxury,terrace?lock=606',
  ],
};

export function Rooms() {
  const [selectedRoom, setSelectedRoom] = React.useState<(typeof ROOMS)[number] | null>(null);

  return (
    <>
      <section id="rooms" className="relative bg-white py-24 dark:bg-ocean-900 lg:py-32">
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
              className="group relative overflow-hidden rounded-3xl bg-sand-50 shadow-glass ring-1 ring-ocean-100/60 transition dark:bg-ocean-800/60 dark:ring-white/5"
              role="button"
              tabIndex={0}
              onClick={() => setSelectedRoom(room)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') setSelectedRoom(room);
              }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={`${room.image}&room=${room.id}`}
                  alt={room.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-4 right-4 flex gap-1.5 rounded-xl bg-black/25 p-1.5 backdrop-blur-sm">
                  {(roomGalleries[room.id] ?? roomDetailImages).slice(0, 3).map((image) => (
                    <img key={image} src={image} alt={`${room.name} room detail`} loading="lazy" className="h-10 w-10 rounded-lg object-cover ring-1 ring-white/50" />
                  ))}
                </div>
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
                    <span className="font-display text-2xl font-bold">₹{room.price.toLocaleString('en-IN')}</span>
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
                <button
                  type="button"
                  onClick={(event) => { event.stopPropagation(); setSelectedRoom(room); }}
                  className={cn(
                    'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full',
                    'bg-ocean-500 px-5 py-3 text-sm font-semibold text-white transition',
                    'hover:bg-ocean-600 hover:shadow-luxe'
                  )}
                >
                  View room photos
                  <Images className="h-4 w-4" />
                </button>
                <a href="#booking" onClick={(event) => event.stopPropagation()} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-ocean-200 px-5 py-3 text-sm font-semibold text-ocean-700 transition hover:bg-ocean-50 dark:border-white/15 dark:text-white dark:hover:bg-white/10">
                  Book this room
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
      </section>

      {selectedRoom && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ocean-950/80 p-4 backdrop-blur-sm" onClick={() => setSelectedRoom(null)}>
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl dark:bg-ocean-900 sm:p-7" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-600">Room gallery</p>
                <h3 className="mt-1 font-display text-3xl font-semibold text-ocean-800 dark:text-white">{selectedRoom.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground dark:text-white/70">Explore the bedroom, living space, bath, balcony and villa details.</p>
              </div>
              <button type="button" aria-label="Close room gallery" onClick={() => setSelectedRoom(null)} className="rounded-full p-2 text-ocean-700 hover:bg-ocean-100 dark:text-white dark:hover:bg-white/10"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(roomGalleries[selectedRoom.id] ?? [selectedRoom.image]).map((image, index) => (
                <img key={image} src={image} alt={`${selectedRoom.name} gallery image ${index + 1}`} className="h-56 w-full rounded-2xl object-cover" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
