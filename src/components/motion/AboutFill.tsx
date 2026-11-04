"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

/**
 * About: the section is pinned while the visitor scrolls; the paragraph fills from faint grey to
 * dark ink, letter by letter, with a brass leading edge. Entirely driven by scroll position, so it
 * is smooth and reverses when scrolling up.
 *
 * Without JS, or with "reduce motion", the text is simply fully dark and nothing is pinned
 * (the server renders ink by default; the .about-pin / .about-stage rules in globals.css undo
 * the pinning for reduced motion).
 */

const RUNWAY = 110; // extra screens (in svh) the section stays pinned for
const FILL_DONE = 0.8; // share of the pinned scroll at which the last letter is dark
const FRONT = 16; // how many letters wide the soft leading edge is

type RGB = [number, number, number];
const PALE: RGB = [183, 174, 158]; // not yet read
const BRASS: RGB = [180, 154, 104]; // the leading edge
const INK: RGB = [28, 27, 24]; // read

const mix = (a: RGB, b: RGB, t: number) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const colorAt = (t: number) => {
  const c = t < 0.5 ? mix(PALE, BRASS, t * 2) : mix(BRASS, INK, (t - 0.5) * 2);
  return `rgb(${c[0]} ${c[1]} ${c[2]})`;
};

export function AboutFill({ id, heading, text }: { id: string; heading: ReactNode; text: string }) {
  const ref = useRef<HTMLElement>(null);
  const chars = useRef<HTMLSpanElement[]>([]);
  const last = useRef<string[]>([]);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const apply = (p: number) => {
    const els = chars.current;
    const front = Math.min(1, Math.max(0, p / FILL_DONE)) * (els.length + FRONT);
    for (let k = 0; k < els.length; k++) {
      const t = Math.min(1, Math.max(0, (front - k) / FRONT));
      const c = colorAt(t);
      if (last.current[k] !== c) {
        els[k].style.color = c;
        last.current[k] = c;
      }
    }
  };

  // Set the correct starting colours before the first paint after hydration.
  useLayoutEffect(() => {
    if (!reduce) apply(scrollYProgress.get());
  }, [reduce]); // eslint-disable-line react-hooks/exhaustive-deps
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduce) apply(p);
  });

  let k = 0;
  const words = text.split(/\s+/);

  return (
    <section
      ref={ref}
      id={id}
      data-tone="light"
      className="about-pin relative"
      style={{ height: `calc(100svh + ${RUNWAY}svh)` }}
    >
      <div className="about-stage sticky top-0 flex h-svh items-center">
        <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,5vw,64px)]">
          {heading}
          <p
            aria-label={text}
            className="font-serif text-[clamp(26px,3.1vw,48px)] font-medium leading-[1.28] text-ink lg:ml-auto lg:w-[76%] lg:max-w-[24em]"
          >
            {words.map((word, wi) => (
              <span key={wi} aria-hidden="true">
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((ch, ci) => {
                    const idx = k++;
                    return (
                      <span
                        key={ci}
                        ref={(el) => {
                          if (el) chars.current[idx] = el;
                        }}
                      >
                        {ch}
                      </span>
                    );
                  })}
                </span>{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
