"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

export function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const element = ref.current;
    return () => {
      if (element) gsap.killTweensOf(element);
    };
  }, []);
  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const rect = event.currentTarget.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (event.clientX - rect.left - rect.width / 2) * 0.35,
          y: (event.clientY - rect.top - rect.height / 2) * 0.35,
          duration: 0.25,
          overwrite: true,
        });
      }}
      onPointerLeave={() =>
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.3, overwrite: true })
      }
    >
      {children}
    </a>
  );
}
