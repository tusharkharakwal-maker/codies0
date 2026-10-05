import {
  Target,
  Lightning,
  ChartLine,
  Crosshair,
  ArrowUpRight,
  Asterisk,
  Star,
  Globe,
} from "@/components/ui/icons";
import { Scribble } from "@/components/ui/artwork";
import { TransitionLink } from "@/components/motion/transition-link";
import { Counter } from "@/components/motion/counter";
import { CapabilityBars } from "./capability-bars";
import { ContactForm } from "./contact-form";
import { services, serviceGroups } from "@/data/services";

export function About() {
  return (
    <section id="about" className="about-section">
      <div className="about-manifesto" data-reveal>
        <div className="side-label">
          <span />
          ABOUT US
        </div>
        <h2>
          BUILT RIGHT.
          <br />
          LOOKS{" "}
          <span>
            BOLD.
            <Scribble />
          </span>
        </h2>
        <p>
          We&apos;re a web development agency with design in our DNA. We build
          websites, 3D experiences, and the systems behind them, with creative
          and SEO to support what comes next.
        </p>
        <span className="signature">
          Creative on the outside. Capable underneath.
        </span>
        <Globe className="about-globe" size={60} weight="light" />
      </div>
      <div className="about-pillars" data-reveal>
        <div className="pillar-heading">
          <span>
            DEVELOPMENT AT THE CORE.
            <br />
            CREATIVE IN EVERY DETAIL.
          </span>
          <Asterisk size={58} weight="bold" />
        </div>
        <div className="pillars">
          {[
            {
              Icon: Target,
              title: "Built for your goals",
              text: "The right website for the way you work.",
            },
            {
              Icon: Lightning,
              title: "Designed to stand out",
              text: "Distinctive visuals. Clear interactions.",
            },
            {
              Icon: ChartLine,
              title: "Strong underneath",
              text: "Backends, logins, and data that connect.",
            },
            {
              Icon: Crosshair,
              title: "Ready to be found",
              text: "SEO and AI SEO beyond the launch.",
            },
          ].map(({ Icon, title, text }) => (
            <div className="pillar" key={title}>
              <Icon size={25} />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section className="services-section section-pad" id="services">
      <div className="section-heading" data-reveal>
        <h2>
          WEB DEVELOPMENT FIRST.
          <br />
          <span className="outline-type">EVERYTHING ELSE, CONNECTED.</span>
        </h2>
        <Scribble variant="star" />
      </div>
      <div className="services-grid">
        {serviceGroups.map((group, i) => (
          <article
            className={`service-item service-${group.id}`}
            key={group.id}
            data-reveal
          >
            <div className="service-top">
              <span>
                0{i + 1}
                {i === 0 ? " / OUR CORE" : ""}
              </span>
              <ArrowUpRight size={31} />
            </div>
            <h3>
              {group.headline.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
            <p>{group.description}</p>
            <ul className="service-list">
              {group.items.map((service) => (
                <li key={service}>
                  <TransitionLink
                    href={`/contact?service=${encodeURIComponent(service)}`}
                  >
                    {service}
                    <ArrowUpRight size={15} />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function Capabilities() {
  return (
    <section className="capabilities-section">
      <div className="capability-copy" data-reveal>
        <div className="side-label">
          <span />
          THE WAY WE WORK
        </div>
        <h2>
          FROM FIRST CLICK
          <br />
          TO <span className="script-inline">full stack.</span>
        </h2>
        <p>
          A website is more than its front page. We connect the design, backend,
          login experience, and database, then support your content and search
          visibility.
        </p>
        <CapabilityBars />
      </div>
      <div className="stats-poster" data-reveal>
        <Crosshair size={28} />
        <span className="stats-note">
          ONE CONNECTED TEAM.
          <br />
          FROM BUILD TO DISCOVERY.
        </span>
        <div className="stats-grid">
          {[
            {
              value: services.length,
              suffix: "",
              label: "SPECIALIST SERVICES",
            },
            {
              value: serviceGroups[0].items.length,
              suffix: "",
              label: "DEVELOPMENT SERVICES",
            },
            {
              value: serviceGroups.length,
              suffix: "",
              label: "CONNECTED DISCIPLINES",
            },
            {
              value: 1,
              suffix: "",
              label: "TEAM FROM BUILD TO BEYOND",
            },
          ].map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>
                <Counter {...stat} />
              </strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
        <span className="signature">
          Code, creative, and a clear way forward.
        </span>
      </div>
    </section>
  );
}

export function Testimonials() {
  const quotes = [
    {
      quote:
        "The graphics and product images feel unmistakably like us. Every detail works together.",
      name: "Amara Okafor",
      role: "FOUNDER, OTHER SODA",
      initials: "AO",
    },
    {
      quote:
        "The site gives our work room to breathe. Updating it feels just as considered as browsing it.",
      name: "Felix Moreno",
      role: "DIRECTOR, FIELDWORK",
      initials: "FM",
    },
    {
      quote:
        "Finally, a studio that cares as much about the result as the way it looks.",
      name: "Priya Mehta",
      role: "CO-FOUNDER, FORM OBJECTS",
      initials: "PM",
    },
  ];
  return (
    <section className="testimonials section-pad">
      <div className="testimonials-heading" data-reveal>
        <h2>
          GOOD COMPANY.
          <br />
          EVEN BETTER WORDS.
        </h2>
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
      </div>
      <div className="quote-grid">
        {quotes.map((q) => (
          <figure key={q.name} data-reveal>
            <div className="stars" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} size={13} weight="fill" />
              ))}
            </div>
            <blockquote>“{q.quote}”</blockquote>
            <figcaption>
              <span className="initial-avatar">{q.initials}</span>
              <div>
                <strong>{q.name}</strong>
                <small>{q.role}</small>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Achievements() {
  return (
    <section className="awards-section" aria-labelledby="awards-heading">
      <div className="awards-title">
        <Crosshair size={29} />
        <h2 id="awards-heading">
          BUILT WITH CARE.
          <br />
          MADE FOR BUSINESS.
        </h2>
      </div>
      {[
        { name: "RESPONSIVE", detail: "Every screen counts." },
        { name: "ACCESSIBLE", detail: "More people included." },
        { name: "MAINTAINABLE", detail: "Built to keep evolving." },
        { name: "SEARCH-READY", detail: "A stronger starting point." },
      ].map((item) => (
        <div className="award" key={item.name}>
          <strong>{item.name}</strong>
          <span>{item.detail}</span>
        </div>
      ))}
    </section>
  );
}

export function HomeContact() {
  return (
    <section className="home-contact section-pad" id="contact">
      <div className="home-contact-copy" data-reveal>
        <span className="contact-handwritten">
          Your next website starts here.
        </span>
        <h2>
          LET&apos;S BUILD
          <br />
          YOUR NEXT
          <br />
          <span>
            WEBSITE.
            <Scribble />
          </span>
        </h2>
        <a href="mailto:hello@codie.studio">
          hello@codie.studio <ArrowUpRight size={22} />
        </a>
      </div>
      <div className="home-contact-form" data-reveal>
        <h3>
          A BETTER WEBSITE
          <br />
          STARTS WITH A HELLO.
        </h3>
        <ContactForm compact />
      </div>
    </section>
  );
}
