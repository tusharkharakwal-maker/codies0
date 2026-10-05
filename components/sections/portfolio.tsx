"use client";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { projects, categories } from "@/data/projects";
import { ProjectArtwork } from "@/components/ui/artwork";
import { ArrowUpRight } from "@/components/ui/icons";
import { TransitionLink } from "@/components/motion/transition-link";
gsap.registerPlugin(Flip);
export function Portfolio() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const grid = useRef<HTMLDivElement>(null);
  const state = useRef<ReturnType<typeof Flip.getState> | null>(null);
  useLayoutEffect(() => {
    if (
      !state.current ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animation = Flip.from(state.current, {
      duration: 0.6,
      ease: "power3.inOut",
      absoluteOnLeave: true,
      scale: true,
      nested: true,
      onEnter: (elements) =>
        gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.45 },
        ),
      onLeave: (elements) => gsap.to(elements, { opacity: 0, duration: 0.2 }),
    });
    return () => {
      animation.kill();
    };
  }, [category]);
  const select = (value: typeof category) => {
    if (value === category) return;
    state.current = Flip.getState(
      grid.current?.querySelectorAll(".portfolio-card") ?? [],
    );
    setCategory(value);
  };
  const count = projects.filter(
    (p) => category === "All" || p.category === category,
  ).length;
  return (
    <>
      <div
        className="portfolio-filters"
        role="group"
        aria-label="Filter projects by discipline"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            aria-pressed={category === cat}
            onClick={() => select(cat)}
          >
            {cat}
            {cat === "All" && <small>09</small>}
          </button>
        ))}
        <span className="filter-count" aria-live="polite">
          {count} PROJECT{count !== 1 ? "S" : ""}
        </span>
      </div>
      <div className="portfolio-grid" ref={grid}>
        {projects.map((project) => (
          <article
            className={`portfolio-card aspect-${project.aspect}`}
            style={{
              display:
                category === "All" || category === project.category
                  ? undefined
                  : "none",
            }}
            key={project.slug}
            data-flip-id={project.slug}
          >
            <TransitionLink href={`/work/${project.slug}`} data-cursor="view">
              <div className="project-art-wrap" aria-hidden="true">
                <ProjectArtwork kind={project.art} />
                <div className="portfolio-hover">
                  <span>
                    {project.client}
                    <small>
                      {project.category} / {project.year}
                    </small>
                  </span>
                  <ArrowUpRight size={34} />
                </div>
              </div>
              <div className="project-caption">
                <div>
                  <h2>{project.client}</h2>
                  <span>{project.title}</span>
                </div>
                <span>
                  {project.category}
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </TransitionLink>
          </article>
        ))}
      </div>
    </>
  );
}
