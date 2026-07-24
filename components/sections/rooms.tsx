'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Armchair,
  ArrowRight,
  Bath,
  BedDouble,
  ChefHat,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  CookingPot,
  DoorOpen,
  Flower2,
  GlassWater,
  House,
  Images,
  Maximize,
  Palmtree,
  PersonStanding,
  Plane,
  ShowerHead,
  Sparkles,
  Star,
  Sun,
  Trees,
  Tv,
  Users,
  Waves,
  Wine,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Reveal, StaggerGroup, staggerItem } from '@/components/motion';
import { ROOMS, type Room } from '@/lib/data';
import { cn } from '@/lib/utils';
import { formatInr, formatUsdFromInr } from '@/lib/currency';

const PHOTO = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1400`;

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=85`;

const AMENITY_ICONS: Record<string, LucideIcon> = {
  'King bed': BedDouble,
  'Ocean balcony': Waves,
  'Rain shower': ShowerHead,
  'Smart TV': Tv,
  'Private deck': Sun,
  'Beach access': Palmtree,
  'Outdoor bath': Bath,
  'Lounge area': Armchair,
  'Private pool': Waves,
  'Sun deck': Sun,
  Cabana: House,
  'Butler service': PersonStanding,
  'Plunge pool': Waves,
  'Romance setup': Flower2,
  Champagne: Wine,
  'Spa bath': Sparkles,
  'Two bedrooms': DoorOpen,
  'Kids loft': Users,
  Kitchenette: CookingPot,
  'Garden view': Trees,
  'Infinity pool': Waves,
  'Private chef': ChefHat,
  'Helipad access': Plane,
  'Cinema room': Clapperboard,
};

const AMENITY_PHOTOS: Record<string, string> = {
  'King bed': UNSPLASH('photo-1611892440504-42a792e24d32'),
  'Ocean balcony': UNSPLASH('photo-1600607687920-4e2a09cf159d'),
  'Rain shower': UNSPLASH('photo-1584622650111-993a426fbf0a'),
  'Smart TV': UNSPLASH('photo-1598928506311-c55ded91a20c'),
  'Private deck': UNSPLASH('photo-1600566753086-00f18fb6b3ea'),
  'Beach access': UNSPLASH('photo-1507525428034-b723cf961d3e'),
  'Outdoor bath': UNSPLASH('photo-1620626011761-996317b8d101'),
  'Lounge area': UNSPLASH('photo-1600210492486-724fe5c67fb0'),
  'Private pool': UNSPLASH('photo-1571896349842-33c89424de2d'),
  'Sun deck': UNSPLASH('photo-1540555700478-4be289fbecef'),
  Cabana: UNSPLASH('photo-1540541338287-41700207dee6'),
  'Butler service': UNSPLASH('photo-1556740749-887f6717d7e4'),
  'Plunge pool': UNSPLASH('photo-1564501049412-61c2a3083791'),
  'Romance setup': UNSPLASH('photo-1519741497674-611481863552'),
  Champagne: UNSPLASH('photo-1510812431401-41d2bd2722f3'),
  'Spa bath': UNSPLASH('photo-1544161515-4ab6ce6db874'),
  'Two bedrooms': UNSPLASH('photo-1566665797739-1674de7a421a'),
  'Kids loft': UNSPLASH('photo-1503454537195-1dcabb73ffb9'),
  Kitchenette: UNSPLASH('photo-1556912167-f556f1f39fdf'),
  'Garden view': UNSPLASH('photo-1585320806297-9794b3e4eeae'),
  'Infinity pool': UNSPLASH('photo-1510414842594-a61c69b5ae57'),
  'Private chef': UNSPLASH('photo-1577219491135-ce391730fb2c'),
  'Helipad access': UNSPLASH('photo-1542296332-2e4473faf563'),
  'Cinema room': UNSPLASH('photo-1489599849927-2ee91cede3ba'),
};

const EXTRA_ROOM_PHOTOS = [
  [PHOTO(271624), PHOTO(164595)],
  [PHOTO(271618), PHOTO(262048)],
  [PHOTO(261102), PHOTO(261169)],
  [PHOTO(271619), PHOTO(1579739)],
  [PHOTO(2029722), PHOTO(271643)],
  [PHOTO(802024), PHOTO(261101)],
];

type Viewer =
  | { kind: 'room'; title: string; photos: string[] }
  | { kind: 'amenity'; title: string; photos: [string] };

function AmenityTile({
  name,
  onOpen,
}: {
  name: string;
  onOpen: () => void;
}) {
  const Icon = AMENITY_ICONS[name] ?? GlassWater;

  return (
    <button
      type="button"
      title={`View ${name}`}
      onClick={onOpen}
      className="group/amenity flex min-w-0 items-center gap-2.5 rounded-xl bg-white/80 p-2.5 text-left ring-1 ring-ocean-100 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d66a31] dark:bg-white/5 dark:ring-white/10"
    >
      <span className="relative flex h-10 w-10 flex-none overflow-hidden rounded-lg">
        <img
          src={AMENITY_PHOTOS[name]}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover/amenity:scale-110"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-[#512113]/45 text-white">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[11px] font-semibold leading-tight text-ocean-700 dark:text-white/80">
          {name}
        </span>
        <span className="mt-0.5 block text-[9px] font-medium uppercase tracking-wider text-[#b65329]">
          View photo
        </span>
      </span>
    </button>
  );
}

function PhotoViewer({
  viewer,
  onClose,
}: {
  viewer: Viewer;
  onClose: () => void;
}) {
  const [active, setActive] = React.useState(0);
  const photos = viewer.photos;

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') {
        setActive((value) => (value + 1) % photos.length);
      }
      if (event.key === 'ArrowLeft') {
        setActive((value) => (value - 1 + photos.length) % photos.length);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, photos.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#130c09]/90 p-4 backdrop-blur-md sm:p-8"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-[#21120d] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label={`${viewer.title} photos`}
      >
        <div className="absolute left-5 top-5 z-20 rounded-full bg-black/45 px-4 py-2 text-sm font-semibold text-white backdrop-blur-md">
          {viewer.title}
        </div>
        <button
          type="button"
          aria-label="Close photos"
          onClick={onClose}
          className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-md transition hover:bg-black/70"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[16/10] max-h-[72vh] w-full bg-black">
          <AnimatePresence mode="wait">
            <motion.img
              key={photos[active]}
              src={photos[active]}
              alt={`${viewer.title} photo ${active + 1}`}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.35 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() =>
                  setActive((value) => (value - 1 + photos.length) % photos.length)
                }
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/65"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => setActive((value) => (value + 1) % photos.length)}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/65"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {photos.length > 1 && (
          <div className="flex gap-3 overflow-x-auto p-4">
            {photos.map((photo, index) => (
              <button
                type="button"
                key={photo}
                onClick={() => setActive(index)}
                className={cn(
                  'h-16 w-24 flex-none overflow-hidden rounded-xl ring-2 transition',
                  index === active
                    ? 'ring-[#f0a756]'
                    : 'opacity-60 ring-transparent hover:opacity-100',
                )}
              >
                <img
                  src={photo}
                  alt={`${viewer.title} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function Rooms() {
  const [viewer, setViewer] = React.useState<Viewer | null>(null);

  const openRoom = (room: Room, index: number) => {
    setViewer({
      kind: 'room',
      title: room.name,
      photos: [room.image, ...EXTRA_ROOM_PHOTOS[index]],
    });
  };

  return (
    <section
      id="rooms"
      className="relative bg-white py-24 dark:bg-ocean-900 lg:py-32"
    >
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
              Select any room or amenity to explore its photos before you book.
            </p>
          </Reveal>
        </div>

        <StaggerGroup className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {ROOMS.map((room, index) => (
            <motion.article
              key={room.id}
              variants={staggerItem}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-3xl bg-sand-50 shadow-glass ring-1 ring-ocean-100/60 transition dark:bg-ocean-800/60 dark:ring-white/5"
            >
              <button
                type="button"
                onClick={() => openRoom(room, index)}
                className="relative block h-64 w-full overflow-hidden text-left focus:outline-none focus:ring-4 focus:ring-inset focus:ring-[#e4772d]"
                aria-label={`View photos of ${room.name}`}
              >
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/75 via-ocean-900/10 to-transparent" />
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/35 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  <Images className="h-3.5 w-3.5" />
                  View photos
                </span>
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
                  <p className="flex flex-col items-end text-right leading-tight">
                    <span className="font-display text-xl font-bold">
                      {formatInr(room.price)}
                    </span>
                    <span className="mt-1 text-xs font-medium text-white/85">
                      {formatUsdFromInr(room.price)} / night
                    </span>
                  </p>
                </div>
              </button>

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
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {room.amenities.map((amenity) => (
                    <AmenityTile
                      key={amenity}
                      name={amenity}
                      onOpen={() =>
                        setViewer({
                          kind: 'amenity',
                          title: amenity,
                          photos: [AMENITY_PHOTOS[amenity]],
                        })
                      }
                    />
                  ))}
                </div>
                <a
                  href="#booking"
                  className={cn(
                    'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full',
                    'bg-ocean-500 px-5 py-3 text-sm font-semibold text-white transition',
                    'hover:bg-ocean-600 hover:shadow-luxe',
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

      <AnimatePresence>
        {viewer && (
          <PhotoViewer
            key={`${viewer.kind}-${viewer.title}`}
            viewer={viewer}
            onClose={() => setViewer(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
