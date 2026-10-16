"use client";

import { useRef } from "react";

interface TiltGlowProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a card-like element with a subtle 3D tilt toward the cursor and a
 * soft radial highlight that follows it (the highlight itself is the
 * `.tilt-glow::after` rule in globals.css, driven by the --gx/--gy vars set here).
 */
export function TiltGlow({ children, className }: TiltGlowProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(800px) rotateX(${(py - 0.5) * -6}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-3px)`;
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} className={`tilt-glow ${className ?? ""}`}>
      {children}
    </div>
  );
}
