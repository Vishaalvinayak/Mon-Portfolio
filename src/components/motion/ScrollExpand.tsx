"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Wraps a featured project's screenshot: it widens and settles from a slight zoom as it scrolls in. */
export function ScrollExpand({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.3"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const clip = useMotionTemplate`inset(0% ${inset}% 0% ${inset}%)`;

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { clipPath: clip, WebkitClipPath: clip }}>
        <motion.div style={reduce ? undefined : { scale }}>{children}</motion.div>
      </motion.div>
    </div>
  );
}
