"use client";
import { useRef, useState } from "react";
import { projects } from "@/data/projects";
import { ProjectArtwork } from "@/components/ui/artwork";
import { TransitionLink } from "@/components/motion/transition-link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/icons";

export function FeaturedWork() {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, start: 0, scroll: 0, moved: false });
  const [position, setPosition] = useState({ start: true, end: false });
  const scroll = (direction: number) => {
    if (!track.current) return;
    const card = track.current.querySelector("article");
    track.current.scrollBy({
      left: direction * ((card?.clientWidth ?? 450) + 24),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  };
  return (
    <section
      className="featured-section section-pad"
      aria-labelledby="work-title"
    >
      <div className="featured-heading" data-reveal>
        <div>
          <span className="work-handwritten">From idea to interaction.</span>
          <h2 id="work-title">
            WEBSITES. SYSTEMS.
            <br />
            <span>A CREATIVE EDGE.</span>
          </h2>
        </div>
        <Button href="/work" variant="outline">
          View all work
        </Button>
      </div>
      <div
        className="work-carousel"
        ref={track}
        data-cursor="drag"
        tabIndex={0}
        role="region"
        aria-label="Featured projects, scroll horizontally or use arrow controls"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            scroll(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onScroll={() => {
          const t = track.current;
          if (t)
            setPosition({
              start: t.scrollLeft < 10,
              end: t.scrollLeft + t.clientWidth >= t.scrollWidth - 10,
            });
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          drag.current = {
            down: true,
            start: event.clientX,
            scroll: event.currentTarget.scrollLeft,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current.down) return;
          const diff = event.clientX - drag.current.start;
          if (Math.abs(diff) > 6) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.scrollLeft = drag.current.scroll - diff;
          }
        }}
        onPointerUp={(event) => {
          drag.current.down = false;
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          drag.current.down = false;
        }}
        onPointerLeave={() => {
          drag.current.down = false;
        }}
        onClickCapture={(event) => {
          if (drag.current.moved) {
            event.preventDefault();
            event.stopPropagation();
            drag.current.moved = false;
          }
        }}
      >
        {projects.slice(0, 5).map((project, i) => (
          <article className="featured-card" key={project.slug}>
            <TransitionLink href={`/work/${project.slug}`} draggable={false}>
              <div className="project-art-wrap" aria-hidden="true">
                <ProjectArtwork kind={project.art} />
                <div className="project-open">
                  <ArrowUpRight size={28} />
                </div>
              </div>
              <div className="project-caption">
                <div>
                  <h3>{project.client}</h3>
                  <span>
                    {project.category} / {project.year}
                  </span>
                </div>
                <span className="project-number">0{i + 1}</span>
              </div>
            </TransitionLink>
          </article>
        ))}
      </div>
      <div className="carousel-bottom">
        <span>DEVELOPMENT CONCEPTS, WITH DESIGN IN THEIR DNA.</span>
        <div className="carousel-controls">
          <button
            onClick={() => scroll(-1)}
            disabled={position.start}
            aria-label="Previous projects"
          >
            <ArrowLeft size={21} />
          </button>
          <button
            onClick={() => scroll(1)}
            disabled={position.end}
            aria-label="Next projects"
          >
            <ArrowRight size={21} />
          </button>
        </div>
      </div>
    </section>
  );
}
