import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contact-form";
import { SocialLinks } from "@/components/sections/footer";
import { Scribble } from "@/components/ui/artwork";
import { Asterisk, ArrowUpRight } from "@/components/ui/icons";
export const metadata: Metadata = {
  title: "Let's talk",
  description:
    "Tell Codie about your website, 3D experience, backend, login system, or database. Add creative, video, SEO, and AI SEO services to your brief.",
};
export default function ContactPage() {
  return (
    <main id="main">
      <section className="contact-page">
        <div className="contact-intro">
          <span className="contact-handwritten">
            Big ideas start with a conversation.
          </span>
          <h1>
            {["TELL US", "WHAT YOU'RE", "BUILDING."].map((line) => (
              <span className="line-mask" key={line}>
                <span>
                  {line.split(" ").map((word, i) => (
                    <span className="contact-word" data-hero-line key={i}>
                      {word}&nbsp;
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>
          <Scribble className="contact-underline" />
          <p>
            A new website. A backend that does more.
            <br />A 3D experience worth exploring.
            <br />
            Tell us what your business needs.
          </p>
          <div className="contact-details">
            <a href="mailto:hello@codie.studio">
              hello@codie.studio
              <ArrowUpRight size={23} />
            </a>
            <dl>
              <div>
                <dt>BASED IN</dt>
                <dd>
                  New Delhi, India.
                  <br />
                  Working everywhere.
                </dd>
              </div>
              <div>
                <dt>ON THE PHONE</dt>
                <dd>
                  Let&apos;s arrange a call.
                  <br />
                  <a href="mailto:hello@codie.studio?subject=Let%27s%20arrange%20a%20call">
                    Ask for a callback <ArrowUpRight size={14} />
                  </a>
                </dd>
              </div>
            </dl>
            <SocialLinks />
          </div>
          <Asterisk className="contact-asterisk" size={95} weight="bold" />
        </div>
        <div className="contact-form-panel" data-reveal>
          <div className="form-panel-heading">
            <span>LET’S TALK ABOUT YOUR NEXT BUILD.</span>
            <ArrowUpRight size={33} />
          </div>
          <ContactForm />
        </div>
      </section>
      <div className="contact-marquee marquee" aria-hidden="true">
        <div className="marquee-track" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i}>
              LET&apos;S TALK
              <Asterisk />
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
