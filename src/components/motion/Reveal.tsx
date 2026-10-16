"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion/tokens";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

/** Fades and lifts its children into view once, when they scroll on screen. */
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: duration.base, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
