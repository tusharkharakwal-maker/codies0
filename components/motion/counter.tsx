"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export function Counter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const state = { value: 0 };
    const tween = gsap.to(state, {
      value,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: { trigger: ref.current, start: "top 95%", once: true },
      onUpdate: () => {
        if (ref.current)
          ref.current.textContent = state.value.toFixed(decimals);
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, decimals]);
  return (
    <span>
      <span className="sr-only">
        {value.toFixed(decimals)}
        {suffix}
      </span>
      <span ref={ref} aria-hidden="true">
        {value.toFixed(decimals)}
      </span>
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}
