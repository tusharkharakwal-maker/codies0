"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Counter } from "@/components/motion/counter";
gsap.registerPlugin(ScrollTrigger);
export function CapabilityBars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(".skill-fill", {
        scaleX: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <div className="capability-bars" ref={ref}>
      {[
        { name: "Website & backend development", value: 98 },
        { name: "Creative & design", value: 96 },
        { name: "SEO & AI SEO", value: 94 },
      ].map((item) => (
        <div className="skill" key={item.name}>
          <div>
            <span>{item.name}</span>
            <span>
              <Counter value={item.value} suffix="%" />
            </span>
          </div>
          <div className="skill-track">
            <div className="skill-fill" style={{ width: `${item.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
