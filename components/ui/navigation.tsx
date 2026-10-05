"use client";
import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { TransitionLink } from "@/components/motion/transition-link";
import { ArrowUpRight, Menu, Close } from "./icons";

const links = [
  { href: "/#about", label: "The studio" },
  { href: "/#services", label: "What we do" },
  { href: "/work", label: "Our work" },
];
export function Navigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();
  const close = () => dialog.current?.close();
  const open = () => {
    dialog.current?.showModal();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      gsap.fromTo(
        ".mobile-menu-link",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.45 },
      );
  };
  return (
    <>
      <header className="site-nav">
        <TransitionLink href="/" className="wordmark" aria-label="Codie home">
          CODIE<span>.</span>
        </TransitionLink>
        <nav className="desktop-links" aria-label="Main navigation">
          {links.map((link) => (
            <TransitionLink
              key={link.label}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </TransitionLink>
          ))}
        </nav>
        <TransitionLink href="/contact" className="nav-cta">
          Let&apos;s talk <ArrowUpRight size={18} weight="bold" />
        </TransitionLink>
        <button
          type="button"
          className="menu-toggle"
          onClick={open}
          aria-label="Open navigation menu"
        >
          <Menu size={28} />
        </button>
      </header>
      <dialog
        className="mobile-menu"
        ref={dialog}
        aria-label="Main navigation menu"
      >
        <div className="mobile-menu-top">
          <span className="wordmark">CODIE.</span>
          <button onClick={close} aria-label="Close navigation menu">
            <Close size={30} />
          </button>
        </div>
        <nav>
          {[...links, { href: "/contact", label: "Let's talk" }].map(
            (link, index) => (
              <TransitionLink
                onClick={close}
                className="mobile-menu-link"
                key={link.href}
                href={link.href}
              >
                <small>0{index + 1}</small>
                {link.label}
                <ArrowUpRight />
              </TransitionLink>
            ),
          )}
        </nav>
        <a className="menu-email" href="mailto:hello@codie.studio">
          hello@codie.studio
        </a>
      </dialog>
    </>
  );
}
