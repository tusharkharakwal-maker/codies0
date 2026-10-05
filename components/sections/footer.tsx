import { SocialLink } from "@/components/ui/social-link";
import { TransitionLink } from "@/components/motion/transition-link";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Behance,
  Asterisk,
} from "@/components/ui/icons";

export function SocialLinks() {
  // Replace discovery URLs with the studio's verified profile URLs before launch.
  return (
    <div className="social-links">
      <SocialLink href="https://www.instagram.com/" label="Explore Instagram">
        <Instagram size={20} />
      </SocialLink>
      <SocialLink href="https://www.linkedin.com/" label="Explore LinkedIn">
        <Linkedin size={20} />
      </SocialLink>
      <SocialLink href="https://www.behance.net/" label="Explore Behance">
        <Behance size={22} />
      </SocialLink>
    </div>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <TransitionLink href="/" className="footer-wordmark">
          CODIE<span>.</span>
          <sup>®</sup>
        </TransitionLink>
        <div className="footer-note">
          <Asterisk size={34} />
          <p>
            Web development at the core.
            <br />
            Design and SEO alongside.
          </p>
        </div>
        <div className="footer-contact">
          <a href="mailto:hello@codie.studio">
            hello@codie.studio <ArrowUpRight size={18} />
          </a>
          <SocialLinks />
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} CODIE STUDIO</span>
        <nav aria-label="Footer navigation">
          <TransitionLink href="/#about">Studio</TransitionLink>
          <TransitionLink href="/work">Work</TransitionLink>
          <TransitionLink href="/contact">Contact</TransitionLink>
          <TransitionLink href="/privacy">Privacy</TransitionLink>
        </nav>
        <span>BUILT TO WORK. DESIGNED TO STAND OUT.</span>
      </div>
      <p className="concept-note">
        Featured projects, project results, and testimonials are illustrative
        concepts.
      </p>
    </footer>
  );
}
