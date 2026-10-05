"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
export const TransitionContext = createContext<(href: string) => void>(
  () => {},
);

export function MotionProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const wipe = useRef<HTMLDivElement>(null);
  const preloader = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  // Persist through client navigation, but reset on each full page load.
  const hasLoaded = useRef(false);
  const busy = useRef(false);
  const transition = useRef<gsap.core.Timeline | null>(null);

  const resetTransition = useCallback(() => {
    transition.current?.kill();
    transition.current = null;
    busy.current = false;
    gsap.set(wipe.current, { visibility: "hidden", y: 0, yPercent: -100 });
  }, []);

  const navigate = useCallback(
    (href: string) => {
      if (busy.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }
      busy.current = true;
      transition.current?.kill();
      transition.current = gsap
        .timeline()
        // Reset the pixel offset so only yPercent controls the screen wipe.
        .set(wipe.current, { visibility: "visible", y: 0, yPercent: 100 })
        .to(wipe.current, {
          yPercent: 0,
          duration: 0.42,
          ease: "power3.inOut",
          onComplete: () => router.push(href),
        });
    },
    [router],
  );

  useEffect(() => {
    // History gestures can interrupt either half of a transition. Cancel the
    // pending push as well as the animation so it cannot reopen the project.
    const restorePage = (event: PageTransitionEvent) => {
      if (event.persisted) resetTransition();
    };
    window.addEventListener("popstate", resetTransition);
    window.addEventListener("pageshow", restorePage);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = reduced
      ? null
      : new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
    }
    const update = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(progress.current, { scaleX: self.progress });
        const nav = document.querySelector(".site-nav");
        if (nav && !reduced)
          gsap.to(nav, {
            yPercent: self.direction === 1 && self.scroll() > 160 ? -105 : 0,
            duration: 0.3,
            overwrite: true,
          });
      },
    });
    return () => {
      lenis?.destroy();
      gsap.ticker.remove(tick);
      update.kill();
      transition.current?.kill();
      window.removeEventListener("popstate", resetTransition);
      window.removeEventListener("pageshow", restorePage);
    };
  }, [resetTransition]);

  useLayoutEffect(() => {
    if (!busy.current) resetTransition();
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compact = window.matchMedia("(max-width: 767px)").matches;
    const context = gsap.context((pageContext) => {
      const heroLines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
      const reveal = () => {
        if (!reduced) {
          if (heroLines.length)
            gsap.fromTo(
              heroLines,
              { yPercent: 110, rotate: 2 },
              {
                yPercent: 0,
                rotate: 0,
                duration: compact ? 0.38 : 0.8,
                stagger: compact ? 0.045 : 0.1,
                ease: "power4.out",
                clearProps: "transform",
              },
            );
          const heroArtwork = document.querySelector("[data-hero-art]");
          if (heroArtwork)
            gsap.from(heroArtwork, {
              opacity: 0,
              y: 25,
              duration: 0.85,
              delay: 0.15,
              clearProps: "all",
            });
        }
        ScrollTrigger.refresh();
      };
      if (!hasLoaded.current && !reduced) {
        const number = { value: 0 };
        gsap.set(preloader.current, { display: "flex", yPercent: 0 });
        gsap.set(heroLines, { yPercent: 110 });
        gsap
          .timeline({
            onComplete: () => {
              hasLoaded.current = true;
              reveal();
            },
          })
          .to(number, {
            value: 100,
            duration: compact ? 0.75 : 1.05,
            ease: "power2.out",
            onUpdate: () => {
              if (counter.current)
                counter.current.textContent = Math.round(number.value)
                  .toString()
                  .padStart(3, "0");
            },
          })
          .to(".preloader-word span", {
            yPercent: -115,
            delay: 0.18,
            stagger: compact ? 0.02 : 0.03,
            duration: compact ? 0.18 : 0.28,
            ease: "power3.in",
          })
          .to(preloader.current, {
            yPercent: -100,
            duration: compact ? 0.28 : 0.32,
            ease: "power3.inOut",
          })
          .set(preloader.current, { display: "none" });
      } else {
        gsap.set(preloader.current, { display: "none" });
        if (busy.current) {
          // The overlay persists across routes. Page cleanup must never revert
          // it to the covered state captured at the start of this animation.
          pageContext.ignore(() => {
            transition.current?.kill();
            transition.current = gsap
              .timeline({
                onComplete: () => {
                  gsap.set(wipe.current, { visibility: "hidden" });
                  transition.current = null;
                  busy.current = false;
                  reveal();
                },
              })
              .fromTo(
                wipe.current,
                { y: 0, yPercent: 0, visibility: "visible" },
                {
                  yPercent: -100,
                  delay: 0.18,
                  duration: 0.42,
                  ease: "power3.inOut",
                },
              );
          });
        } else reveal();
      }
      if (!reduced) {
        if (document.querySelector(".hero-art"))
          gsap.to(".chrome-mark", {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-art",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, {
            opacity: 0,
            y: 36,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 94%", once: true },
            clearProps: "all",
          });
        });
        gsap.utils
          .toArray<HTMLElement>("[data-image-reveal]")
          .forEach((element) => {
            gsap.from(element, {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.9,
              ease: "power3.inOut",
              scrollTrigger: { trigger: element, start: "top 92%", once: true },
              clearProps: "clipPath",
            });
          });
      }
    });
    return () => context.revert();
  }, [pathname, resetTransition]);

  return (
    <TransitionContext.Provider value={navigate}>
      <div className="scroll-progress" ref={progress} aria-hidden="true" />
      {children}
      <div className="page-wipe" ref={wipe} aria-hidden="true">
        <span>CODIE.</span>
      </div>
      <div className="preloader" ref={preloader} aria-hidden="true">
        <div className="loader-corner">IDEAS INTO WORKING WEBSITES.</div>
        <div className="preloader-word">
          {"CODIE.".split("").map((letter, index) => (
            <span key={index}>{letter}</span>
          ))}
        </div>
        <div className="loader-count">
          <span ref={counter}>000</span>
          <span>/ 100</span>
        </div>
      </div>
      <CustomCursor />
    </TransitionContext.Provider>
  );
}

function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    if (!query.matches) return;
    const x = gsap.quickTo(ring.current, "x", {
      duration: 0.22,
      ease: "power3",
    });
    const y = gsap.quickTo(ring.current, "y", {
      duration: 0.22,
      ease: "power3",
    });
    const move = (event: PointerEvent) => {
      gsap.set(dot.current, { x: event.clientX, y: event.clientY, opacity: 1 });
      x(event.clientX);
      y(event.clientY);
      if (ring.current) {
        ring.current.style.opacity = "1";
        const target = event.target instanceof Element ? event.target : null;
        const state = target?.closest("input, textarea")
          ? "input"
          : target?.closest("[data-cursor='view']")
            ? "view"
            : target?.closest("[data-cursor='drag']")
              ? "drag"
              : target?.closest("a, button")
                ? "link"
                : "default";
        ring.current.dataset.state = state;
        ring.current.textContent =
          state === "view" ? "VIEW" : state === "drag" ? "DRAG" : "";
      }
    };
    const leave = () => gsap.set([dot.current, ring.current], { opacity: 0 });
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      x.tween.kill();
      y.tween.kill();
    };
  }, []);
  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  );
}
