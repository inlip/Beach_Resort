import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Rooms } from '@/components/sections/rooms';
import { Amenities } from '@/components/sections/amenities';
import { Experiences } from '@/components/sections/experiences';
import { Dining } from '@/components/sections/dining';
import { Gallery } from '@/components/sections/gallery';
import { Testimonials } from '@/components/sections/testimonials';
import { Offers } from '@/components/sections/offers';
import { BookingInner as Booking } from '@/components/sections/booking';
import { Faq } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <Experiences />
        <Dining />
        <Gallery />
        <Testimonials />
        <Offers />
        <Booking />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
