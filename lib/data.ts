import {
  Waves,
  Sparkles,
  UtensilsCrossed,
  Wine,
  Wifi,
  Plane,
  Dumbbell,
  Baby,
  Sailboat,
  Flower2,
  Building2,
  Clapperboard,
  type LucideIcon,
} from 'lucide-react';

export const RESORT = {
  name: 'Azurea',
  fullName: 'Azurea Oceanfront Resort',
  tagline: 'Luxury Beach Resort • Oceanfront Villas • World-Class Hospitality',
  phone: '+960 999 0000',
  phoneHref: 'tel:+9609990000',
  whatsapp: '+9609990000',
  whatsappHref: 'https://wa.me/9609990000',
  email: 'stay@azurea-resort.example.com',
  address: '1 Lagoon Crescent, Paradise Atoll, Paradise Island',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  youtube: 'https://youtube.com',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Rooms & Villas', href: '#rooms' },
  { label: 'Dining', href: '#dining' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Offers', href: '#offers' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export type Room = {
  id: string;
  name: string;
  price: number;
  capacity: string;
  size: string;
  image: string;
  amenities: string[];
  tag?: string;
};

export const ROOMS: Room[] = [
  {
    id: 'deluxe-ocean-view',
    name: 'Deluxe Ocean View',
    price: 7999,
    capacity: '2 Guests',
    size: '52 m²',
    image:
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85',
    amenities: ['King bed', 'Ocean balcony', 'Rain shower', 'Smart TV'],
    tag: 'Most Popular',
  },
  {
    id: 'beach-villa',
    name: 'Beach Villa',
    price: 12999,
    capacity: '2 Guests',
    size: '88 m²',
    image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Private deck', 'Beach access', 'Outdoor bath', 'Lounge area'],
  },
  {
    id: 'pool-villa',
    name: 'Pool Villa',
    price: 18999,
    capacity: '3 Guests',
    size: '120 m²',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Private pool', 'Sun deck', 'Cabana', 'Butler service'],
    tag: 'Guest Favourite',
  },
  {
    id: 'honeymoon-suite',
    name: 'Honeymoon Suite',
    price: 22999,
    capacity: '2 Guests',
    size: '145 m²',
    image:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Plunge pool', 'Romance setup', 'Champagne', 'Spa bath'],
  },
  {
    id: 'family-cottage',
    name: 'Family Cottage',
    price: 29999,
    capacity: '4 Guests',
    size: '160 m²',
    image:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Two bedrooms', 'Kids loft', 'Kitchenette', 'Garden view'],
  },
  {
    id: 'presidential-villa',
    name: 'Presidential Villa',
    price: 39999,
    capacity: '6 Guests',
    size: '320 m²',
    image:
      'https://images.unsplash.com/photo-1595576508898-0ad5c879a1f8?auto=format&fit=crop&w=1200&q=85',
    amenities: ['Infinity pool', 'Private chef', 'Helipad access', 'Cinema room'],
    tag: 'Signature',
  },
];

export type Amenity = { icon: LucideIcon; name: string; desc: string };

export const AMENITIES: Amenity[] = [
  { icon: Waves, name: 'Infinity Pool', desc: 'Horizon-edge pool overlooking the lagoon' },
  { icon: Flower2, name: 'Spa & Wellness', desc: 'Balinese-inspired overwater spa' },
  { icon: UtensilsCrossed, name: 'Fine Dining', desc: 'Three signature restaurants' },
  { icon: Wine, name: 'Beach Bar', desc: 'Sunset cocktails on the sand' },
  { icon: Wifi, name: 'High-Speed WiFi', desc: 'Complimentary across the resort' },
  { icon: Plane, name: 'Airport Transfer', desc: 'Speedboat or seaplane arrival' },
  { icon: Dumbbell, name: '24/7 Gym', desc: 'Ocean-view fitness pavilion' },
  { icon: Baby, name: 'Kids Zone', desc: 'Supervised club for ages 4–12' },
  { icon: Sailboat, name: 'Water Sports', desc: 'Diving, kayaking, paddleboarding' },
  { icon: Sparkles, name: 'Yoga Deck', desc: 'Sunrise flow over the ocean' },
  { icon: Building2, name: 'Conference Hall', desc: 'Events for up to 200 guests' },
  { icon: Clapperboard, name: 'Outdoor Cinema', desc: 'Movies under the stars' },
];

export type Experience = {
  title: string;
  desc: string;
  image: string;
  duration: string;
};

export const EXPERIENCES: Experience[] = [
  {
    title: 'Scuba Diving',
    desc: 'Explore vibrant coral gardens and reef sharks with PADI-certified guides.',
    image:
      'https://images.pexels.com/photos/3046597/pexels-photo-3046597.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: 'Half day',
  },
  {
    title: 'Snorkeling',
    desc: 'Glide over the house reef with turtles, rays and a rainbow of marine life.',
    image:
      'https://images.pexels.com/photos/3046596/pexels-photo-3046596.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: '2 hours',
  },
  {
    title: 'Sunset Cruise',
    desc: 'Sail a traditional dhoni into a sky painted gold, pink and violet.',
    image:
      'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: '2 hours',
  },
  {
    title: 'Candlelight Dinner',
    desc: 'A private seven-course dinner set on the sand, lit by a hundred lanterns.',
    image:
      'https://images.pexels.com/photos/2629786/pexels-photo-2629786.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: 'Evening',
  },
  {
    title: 'Kayaking',
    desc: 'Paddle through glass-clear lagoons and hidden coves at your own pace.',
    image:
      'https://images.pexels.com/photos/6202966/pexels-photo-6202966.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: '2 hours',
  },
  {
    title: 'Dolphin Watching',
    desc: 'Watch spinner dolphins leap at dawn against the open ocean horizon.',
    image:
      'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: 'Sunrise',
  },
  {
    title: 'Island Tour',
    desc: 'Discover local villages, sandbanks and hidden beaches with a guide.',
    image:
      'https://images.pexels.com/photos/3601456/pexels-photo-3601456.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: 'Full day',
  },
  {
    title: 'Bonfire Night',
    desc: 'Live acoustic music, marshmallows and stories beneath the Milky Way.',
    image:
      'https://images.pexels.com/photos/2637682/pexels-photo-2637682.jpeg?auto=compress&cs=tinysrgb&w=1000',
    duration: 'Evening',
  },
];

export type Dining = {
  name: string;
  cuisine: string;
  desc: string;
  image: string;
  hours: string;
};

export const DINING: Dining[] = [
  {
    name: 'Oceana',
    cuisine: 'Seafood Restaurant',
    desc: 'Catch-of-the-day tasting menus by our Michelin-trained chef, served over the lagoon.',
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=85',
    hours: '6:00 PM – 11:00 PM',
  },
  {
    name: 'Skybar',
    cuisine: 'Rooftop Bar',
    desc: 'Panoramic ocean views, handcrafted cocktails and a DJ set as the sun goes down.',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    hours: '5:00 PM – 1:00 AM',
  },
  {
    name: 'Sand & Saffron',
    cuisine: 'Beach Café',
    desc: 'All-day barefoot dining — wood-fired flatbreads, tropical bowls and cold-pressed juices.',
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85',
    hours: '7:00 AM – 11:00 PM',
  },
  {
    name: 'The Lantern',
    cuisine: 'Private Dining',
    desc: 'Bespoke menus curated for two, served in a private pavilion on the water.',
    image:
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=85',
    hours: 'By reservation',
  },
];

export const GALLERY: string[] = [
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
];

export type Testimonial = {
  name: string;
  country: string;
  avatar: string;
  rating: number;
  text: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Amelia Hartwell',
    country: 'United Kingdom',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'The most magical week of our lives. Our overwater villa felt like floating on the ocean, and the staff anticipated every need before we asked. Pure paradise.',
  },
  {
    name: 'Kenji Tanaka',
    country: 'Japan',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Impeccable service, extraordinary food, and a sunset cruise we will never forget. Azurea sets a new standard for luxury in the Maldives.',
  },
  {
    name: 'Sofia Mancini',
    country: 'Italy',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'We came for our honeymoon and left feeling like family. The candlelight dinner on the beach was the most romantic evening of our lives.',
  },
  {
    name: 'James Whitfield',
    country: 'Australia',
    avatar:
      'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'The diving was world-class — we saw reef sharks, manta rays and turtles. Back on land, the spa was the perfect way to unwind. We are already planning our return.',
  },
  {
    name: 'Priya Nair',
    country: 'India',
    avatar:
      'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=200',
    rating: 5,
    text: 'Our family of four had the most incredible time. The kids club gave us adults a break, and the pool villa was a dream. Five stars in every sense.',
  },
];

export type Offer = {
  title: string;
  desc: string;
  badge: string;
  image: string;
  cta: string;
};

export const OFFERS: Offer[] = [
  {
    title: 'Stay 3, Pay 2',
    desc: 'Extend your escape with a complimentary third night on every two-night stay. Includes daily breakfast and a sunset cocktail.',
    badge: 'Most Popular',
    image:
      'https://images.pexels.com/photos/261101/pexels-photo-261101.jpeg?auto=compress&cs=tinysrgb&w=1000',
    cta: 'Claim Offer',
  },
  {
    title: 'Honeymoon Package',
    desc: 'Champagne on arrival, a private candlelight dinner, couples spa ritual and a sunset cruise — designed for two.',
    badge: 'Romance',
    image:
      'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=1000',
    cta: 'Plan Our Honeymoon',
  },
  {
    title: 'Family Escape',
    desc: 'Connecting rooms, complimentary kids club, daily breakfast and a family island tour. Children under 12 stay free.',
    badge: 'Family',
    image:
      'https://images.pexels.com/photos/2029722/pexels-photo-2029722.jpeg?auto=compress&cs=tinysrgb&w=1000',
    cta: 'Book Family Trip',
  },
  {
    title: 'Summer Escape',
    desc: 'Up to 25% off villas, complimentary seaplane transfer and a $100 resort credit per day. Valid May – September.',
    badge: 'Limited Time',
    image:
      'https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg?auto=compress&cs=tinysrgb&w=1000',
    cta: 'Grab Summer Deal',
  },
];

export const FAQS = [
  {
    q: 'How do I get to the resort?',
    a: 'Azurea is a 35-minute speedboat transfer or a 20-minute seaplane flight from the international airport. Both transfers can be arranged by our concierge when you book.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Flexible rates allow free cancellation up to 14 days before arrival. Special offer packages have their own terms, clearly shown at checkout.',
  },
  {
    q: 'Is the resort suitable for children?',
    a: 'Yes. We offer connecting rooms, a supervised kids club for ages 4–12, family-friendly dining and a shallow lagoon pool. Children under 12 stay free in family offers.',
  },
  {
    q: 'Do you cater to dietary requirements?',
    a: 'Our chefs are happy to accommodate vegetarian, vegan, halal, kosher, gluten-free and allergy-specific diets. Please note requests at booking or contact our concierge.',
  },
  {
    q: 'Can I arrange a wedding or private event?',
    a: 'Absolutely. Our conference hall hosts up to 200 guests and our events team designs bespoke weddings, retreats and celebrations. Reach out via the contact form for a tailored proposal.',
  },
  {
    q: 'Is WiFi available throughout the resort?',
    a: 'Yes, complimentary high-speed WiFi is available in all villas, restaurants and public areas.',
  },
];

export const STATS = [
  { label: 'Oceanfront Villas', value: 64 },
  { label: 'Private Beachfront', value: 1.2, suffix: ' km' },
  { label: 'Restaurants & Bars', value: 5 },
  { label: 'Guest Satisfaction', value: 99, suffix: '%' },
];
