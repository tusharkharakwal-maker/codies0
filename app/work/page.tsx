import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/portfolio";
import { Scribble } from "@/components/ui/artwork";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "Selected work",
  description:
    "Explore Codie's website, 3D, and backend concepts, alongside graphics, video, SEO, and AI SEO projects.",
};
export default function WorkPage() {
  return (
    <main id="main" className="work-page">
      <section className="page-title section-pad">
        <p className="hero-eyebrow">A FEW RECENT OBSESSIONS.</p>
        <h1>
          <span className="line-mask">
            <span data-hero-line>
              SELECTED <span className="pink-text">WORK.</span>
            </span>
          </span>
        </h1>
        <p>
          Websites first. Every detail connected.
          <br />
          Explore development concepts, with creative and search working
          alongside.
        </p>
        <Scribble variant="star" />
      </section>
      <section
        className="portfolio-section section-pad"
        aria-label="Project collection"
      >
        <Portfolio />
      </section>
      <section className="work-cta">
        <h2>
          YOUR NEXT WEBSITE
          <br />
          COULD BE RIGHT HERE.
        </h2>
        <Button href="/contact" variant="dark">
          Let&apos;s talk
        </Button>
      </section>
    </main>
  );
}
