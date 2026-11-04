"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";

/**
 * The About colour transition, driven entirely by scroll.
 *
 * Two identical layers are stacked: a dark one (paper text on charcoal) and an ivory one (ink
 * text on ivory). Scroll progress decides how much of the ivory layer is uncovered, top to bottom.
 *
 * Why not just crossfade background and text colour? Any smooth crossfade passes through a
 * moment where text and background are the same grey (illegible). Here every letter is always
 * either light-on-dark or ink-on-ivory — the only thing that changes is which side of the
 * moving edge it is on. It is reversible: scrolling up pulls the dark layer back.
 *
 * With reduced motion, CSS (.about-light in globals.css) shows the finished ivory state.
 */
export function AboutSweep({ id, dark, light }: { id: string; dark: ReactNode; light: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  // 0 when the section's top reaches 75% down the screen; 1 when its bottom reaches 35%.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.35"] });
  const hidden = useTransform(scrollYProgress, [0, 1], [100, 0]); // % of the ivory layer still covered, from the bottom
  const clip = useMotionTemplate`inset(0% 0% ${hidden}% 0%)`;

  return (
    <section ref={ref} id={id} data-tone="charcoal" className="relative overflow-hidden">
      <div>{dark}</div>
      <motion.div
        data-tone="light"
        aria-hidden="true"
        className="about-light"
        style={{ clipPath: clip, WebkitClipPath: clip }}
        // The ivory copy is decorative duplication; keep it out of tab order and the a11y tree.
        {...({ inert: true } as object)}
      >
        {light}
      </motion.div>
    </section>
  );
}
