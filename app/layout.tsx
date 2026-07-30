import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { FloatingActions } from '@/components/floating-actions';
import { Toaster } from '@/components/ui/toaster';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const SITE_URL = 'https://azurea-resort.example.com';
const description =
  'Azurea Oceanfront Resort — a luxury beach resort offering private beach, infinity pool, oceanfront villas, fine dining, spa and world-class hospitality. Book your escape to paradise.';
const title = 'Azurea Oceanfront Resort | Luxury Beach Resort & Villas';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: '%s | Azurea Oceanfront Resort',
  },
  description,
  keywords: [
    'luxury beach resort',
    'oceanfront villas',
    'Maldives resort',
    'Bali resort',
    'infinity pool',
    'honeymoon suite',
    'private beach',
    'fine dining resort',
  ],
  authors: [{ name: 'Azurea Oceanfront Resort' }],
  creator: 'Azurea Oceanfront Resort',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Azurea Oceanfront Resort',
    title,
    description,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Azurea Oceanfront Resort',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85',
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Azurea Oceanfront Resort',
  description,
  url: SITE_URL,
  image:
    'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=85',
  starRating: { '@type': 'Rating', ratingValue: '5' },
  priceRange: '$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '1 Lagoon Crescent, Paradise Atoll',
    addressLocality: 'Paradise Island',
    addressCountry: 'MV',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 3.2028, longitude: 73.2207 },
  telephone: '+960 999 0000',
  email: 'stay@azurea-resort.example.com',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Private beach' },
    { '@type': 'LocationFeatureSpecification', name: 'Infinity pool' },
    { '@type': 'LocationFeatureSpecification', name: 'Spa' },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi' },
    { '@type': 'LocationFeatureSpecification', name: 'Restaurant' },
    { '@type': 'LocationFeatureSpecification', name: 'Beach bar' },
    { '@type': 'LocationFeatureSpecification', name: 'Water sports' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className={`${playfair.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <FloatingActions />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
