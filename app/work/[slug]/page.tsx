import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ProjectArtwork } from "@/components/ui/artwork";
import { Counter } from "@/components/motion/counter";
import { TransitionLink } from "@/components/motion/transition-link";
import { ArrowUpRight, ArrowLeft } from "@/components/ui/icons";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p ? `${p.client}: ${p.title}` : "Project not found",
    description: p?.intro,
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  return (
    <main id="main" className="case-page">
      <header className="case-header section-pad">
        <TransitionLink href="/work" className="text-link back-link">
          <ArrowLeft size={18} />
          All work
        </TransitionLink>
        <h1 className="line-mask">
          <span data-hero-line>
            {project.client}
            <span className="pink-text">.</span>
          </span>
        </h1>
        <div className="case-intro">
          <p>{project.intro}</p>
          <dl>
            <div>
              <dt>CLIENT</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>YEAR</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>SERVICES</dt>
              <dd>{project.services.join(" / ")}</dd>
            </div>
          </dl>
        </div>
      </header>
      <div className="case-hero-art" data-photo-slot={project.photoSlot}>
        <ProjectArtwork kind={project.art} />
      </div>
      <section className="case-story section-pad">
        <h2 data-reveal>{project.title}</h2>
        <div className="story-columns">
          <div data-reveal>
            <span>01 / THE CHALLENGE</span>
            <p>{project.challenge}</p>
          </div>
          <div data-reveal>
            <span>02 / OUR APPROACH</span>
            <p>{project.approach}</p>
          </div>
          <div data-reveal>
            <span>03 / THE RESULT</span>
            <p>{project.result}</p>
          </div>
        </div>
      </section>
      <section
        className="case-stats"
        style={{ background: project.color }}
        aria-label="Illustrative project results"
      >
        {project.stats.map((stat) => (
          <div key={stat.label}>
            <strong>
              <Counter {...stat} />
            </strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>
      <section
        className="case-gallery"
        aria-label={`${project.client} identity details`}
      >
        <div data-image-reveal data-photo-slot={`${project.photoSlot}-detail`}>
          <ProjectArtwork kind={project.art} variant={1} />
        </div>
        <div
          className="case-type-poster"
          style={{ background: project.color }}
          data-reveal
        >
          <span>{project.client} / BY CODIE</span>
          <h2>{project.title}</h2>
          <span className="signature">Different is a good thing.</span>
        </div>
      </section>
      <p className="case-disclaimer">
        Concept case study. Project results are illustrative, not verified
        client outcomes.
      </p>
      <TransitionLink
        href={`/work/${next.slug}`}
        className="next-project"
        aria-label={`Next project: ${next.client}`}
      >
        <span aria-hidden="true">UP NEXT / {next.category}</span>
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track" aria-hidden="true">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i}>
                {next.client}
                <ArrowUpRight />
              </span>
            ))}
          </div>
        </div>
      </TransitionLink>
    </main>
  );
}
