"use client";
import { useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { ChromeMark, Scribble } from "@/components/ui/artwork";
import {
  Asterisk,
  ArrowUpRight,
  Crosshair,
  Globe,
} from "@/components/ui/icons";

export function Hero() {
  const art = useRef<HTMLDivElement>(null);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="hero-eyebrow">
          <Asterisk size={16} weight="bold" /> WEB DEVELOPMENT. WITH A CREATIVE
          EDGE.
        </p>
        <h1 id="hero-title">
          <span className="line-mask">
            <span data-hero-line>WE BUILD</span>
          </span>
          <span className="line-mask brand-line">
            <span data-hero-line>
              WEBSITES
              <Scribble className="brand-brush" />
            </span>
          </span>
          <span className="line-mask">
            <span data-hero-line>THAT MEAN</span>
          </span>
          <span className="line-mask">
            <span data-hero-line>
              BUSINESS<span className="pink-dot">.</span>
            </span>
          </span>
        </h1>
        <div className="hero-bottom">
          <p>
            Websites. 3D experiences. Backends.
            <br />
            Built to work. Designed to stand out.
            <br className="desktop-break" /> Supported by creative and SEO.
          </p>
          <div className="hero-actions">
            <Button href="/work">View our work</Button>
            <a className="text-link" href="/contact">
              Start a project <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
      <div
        className="hero-art"
        data-hero-art
        onPointerMove={(e) => {
          if (
            e.pointerType !== "mouse" ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
          )
            return;
          const box = e.currentTarget.getBoundingClientRect();
          gsap.to(art.current, {
            x: (e.clientX - box.left - box.width / 2) * 0.035,
            y: (e.clientY - box.top - box.height / 2) * 0.035,
            rotate: (e.clientX - box.left - box.width / 2) * 0.005,
            duration: 0.7,
            overwrite: true,
          });
        }}
        onPointerLeave={() =>
          gsap.to(art.current, {
            x: 0,
            y: 0,
            rotate: 0,
            duration: 0.7,
            overwrite: true,
          })
        }
      >
        <div className="art-topline">
          <span>WEB DEVELOPMENT / DESIGN / SEO</span>
          <Crosshair size={25} />
        </div>
        <div className="hero-art-inner" ref={art}>
          <ChromeMark />
          <div className="hero-flyer">
            <small>THE CODIE EFFECT</small>
            <b>
              IDEAS
              <br />
              INTO CODE.
            </b>
            <Globe size={30} />
            <span>FROM FIRST CLICK TO FULL STACK.</span>
          </div>
          <div className="original-sticker">
            <Asterisk size={39} weight="bold" />
            <span>
              ORIGINAL
              <br />
              BY DEFAULT
            </span>
          </div>
          <div className="hero-script">
            Bold design.
            <br />
            <span>Solid code.</span>
            <Scribble />
          </div>
        </div>
        <span className="vertical-micro">
          GOOD ON THE SURFACE. STRONG UNDERNEATH.
        </span>
        <div className="art-bottomline">
          <span>DEVELOPMENT. DESIGN. DISCOVERY.</span>
          <span className="art-signature">c®</span>
        </div>
      </div>
    </section>
  );
}
