import { Hero } from "@/components/sections/hero";
import {
  About,
  Services,
  Capabilities,
  Testimonials,
  Achievements,
  HomeContact,
} from "@/components/sections/home-sections";
import { FeaturedWork } from "@/components/sections/featured-work";
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Services />
      <Capabilities />
      <FeaturedWork />
      <Testimonials />
      <Achievements />
      <HomeContact />
    </main>
  );
}
