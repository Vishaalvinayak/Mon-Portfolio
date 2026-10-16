"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { introCredit, introSlides } from "@/content/intro";
import { Magnetic } from "@/components/motion/Magnetic";
import { SketchIcon } from "./SketchIcons";
import "./intro.css";

type Flag = "frame" | "credit" | "bg" | "names" | "sign" | "fadeout" | "hide";
const FLAGS: Flag[] = ["frame", "credit", "bg", "names", "sign", "fadeout", "hide"];
const NONE = Object.fromEntries(FLAGS.map((f) => [f, false])) as Record<Flag, boolean>;

const HOLD = 1400; // ms each slide stays up
const GAP = 380; // clean cut between slides

/**
 * Plays once per session: 3 slides → signature credit → reveals the site.
 * The site is already in the server-rendered HTML underneath; this only overlays it.
 * The <html data-intro> attribute ("seen" | "playing" | "done") lets CSS animate the hero in.
 */
export function IntroSequence() {
  const [flags, setFlags] = useState(NONE);
  const [active, setActive] = useState<number | null>(null);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [dot, setDot] = useState(-1);
  const [gone, setGone] = useState(false);
  const finishRef = useRef<() => void>(() => {});

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro === "seen") {
      setGone(true); // already seen this session (marked "seen" by the inline script in layout.tsx)
      return;
    }

    const site = document.getElementById("site");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, reduced ? 0 : ms));
    };
    const turnOn = (...names: Flag[]) =>
      setFlags((prev) => {
        const next = { ...prev };
        names.forEach((n) => (next[n] = true));
        return next;
      });

    root.dataset.intro = "playing";
    site?.setAttribute("inert", "");
    document.body.style.overflow = "hidden";

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      turnOn("hide");
      root.dataset.intro = "done";
      site?.removeAttribute("inert");
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {}
      window.dispatchEvent(new Event("intro:done"));
      window.setTimeout(() => setGone(true), 950);
    };
    finishRef.current = finish;

    if (reduced) {
      turnOn("frame", "credit", "bg", "names", "sign");
      finish();
      return;
    }

    let current: number | null = null;
    const showSlide = (i: number) => {
      const prev = current;
      current = i;
      setDot(i);
      if (prev === null) {
        setActive(i);
        return;
      }
      setActive(null);
      setLeaving(prev);
      at(GAP, () => {
        setLeaving(null);
        setActive(i);
      });
    };

    turnOn("frame");
    at(500, () => showSlide(0));
    at(500 + HOLD, () => showSlide(1));
    at(500 + HOLD * 2, () => showSlide(2));
    at(500 + HOLD * 3, () => {
      turnOn("credit", "bg");
      at(900, () => turnOn("names"));
      at(1700, () => turnOn("sign"));
      at(3800, () => turnOn("fadeout"));
      at(4800, finish);
    });

    return () => {
      finished = true;
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (gone) return null;

  const stageClass = FLAGS.filter((f) => flags[f]).join(" ");

  return (
    <div id="stage" className={stageClass}>
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="pencil">
          <feTurbulence type="fractalNoise" baseFrequency="0.02 0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.4" />
        </filter>
      </svg>

      <div className="vignette" />
      <div className="grain" />
      <Magnetic>
        <button type="button" className="skip-btn" onClick={() => finishRef.current()}>
          Skip intro
        </button>
      </Magnetic>

      <div className="reel">
        {introSlides.map((s, i) => (
          <section
            key={s.role}
            className={["slide", active === i && "active", leaving === i && "leaving"]
              .filter(Boolean)
              .join(" ")}
          >
            <SketchIcon index={i} />
            <div className="credit-label">{s.label}</div>
            <div className="credit-role">{s.role}</div>
            <div className="credit-stack">{s.stack}</div>
          </section>
        ))}
      </div>

      <div className="dots" aria-hidden="true">
        {introSlides.map((s, i) => (
          <span key={s.role} className={dot === i ? "on" : undefined} />
        ))}
      </div>

      <div className="credit-frame">
        <div className="credit-bg" />
        <div className="credit-line">
          <span className="credit-name given">{introCredit.given}</span>
          <div className="credit-sig">
            <Image src="/signature.png" alt={introCredit.signatureAlt} width={900} height={333} priority />
          </div>
          <span className="credit-name family">{introCredit.family}</span>
        </div>
      </div>
    </div>
  );
}
