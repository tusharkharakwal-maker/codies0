"use client";
import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { TransitionLink } from "@/components/motion/transition-link";
import { ArrowUpRight } from "./icons";

export function Button({
  href,
  children,
  variant = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "dark" | "pink" | "outline" | "paper";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  return (
    <span
      className={`magnetic-wrap ${className}`}
      ref={ref}
      onPointerMove={(event) => {
        if (
          event.pointerType !== "mouse" ||
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
          return;
        const box = event.currentTarget.getBoundingClientRect();
        gsap.to(ref.current, {
          x: (event.clientX - box.left - box.width / 2) * 0.12,
          y: (event.clientY - box.top - box.height / 2) * 0.18,
          duration: 0.35,
          overwrite: true,
        });
      }}
      onPointerLeave={() =>
        gsap.to(ref.current, { x: 0, y: 0, duration: 0.4, overwrite: true })
      }
    >
      <TransitionLink href={href} className={`button button-${variant}`}>
        {children}
        <ArrowUpRight size={20} weight="bold" />
      </TransitionLink>
    </span>
  );
}
