"use client";

import { cloneElement, useRef, type ReactElement } from "react";

interface MagneticProps {
  children: ReactElement;
  strength?: number;
}

/**
 * Nudges its child toward the cursor while hovered, snapping back on leave.
 * Wrap a single link or button: <Magnetic><a ...>Click</a></Magnetic>
 */
export function Magnetic({ children, strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);

  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * strength}px, ${y * (strength + 0.1)}px)`;
  }

  function onMouseLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return cloneElement(children, { ref, onMouseMove, onMouseLeave } as object);
}
