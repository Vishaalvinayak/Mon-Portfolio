"use client";

import { useEffect, useRef } from "react";

/**
 * Replaces the system cursor with a small dot, a ring that eases toward it,
 * and a faint radial spotlight that follows the pointer. Renders nothing on
 * touch devices or when the OS asks for reduced motion — the real cursor
 * stays in those cases (see the matching @media query in globals.css).
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spot = spotRef.current;
    if (!dot || !ring || !spot) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let shown = false;
    let raf = 0;

    // The ring eases toward the pointer. The loop only runs while the ring still has distance
    // to cover: it goes to sleep once it has caught up and wakes on the next mouse move,
    // instead of waking the browser ~60 times a second for as long as the page is open.
    const place = () => {
      ring.style.transform = `translate(${rx - 17}px,${ry - 17}px)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const settled = Math.abs(mx - rx) < 0.1 && Math.abs(my - ry) < 0.1;
      if (settled) {
        rx = mx;
        ry = my;
      }
      place();
      raf = settled ? 0 : requestAnimationFrame(loop);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    place(); // starting spot, same as before (the old loop placed it on its first frame)

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 3}px,${my - 3}px)`;
      spot.style.setProperty("--mx", `${mx}px`);
      spot.style.setProperty("--my", `${my}px`);
      if (!shown) {
        shown = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        spot.style.opacity = "1";
      }
      wake();
    };
    const onLeave = () => {
      shown = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      spot.style.opacity = "0";
    };
    // .tilt-glow (the project cards) is deliberately NOT in this list: those cards already
    // tilt and glow toward the cursor, so growing the ring too was two effects competing for
    // the same signal. Links and buttons — including the links inside a card — still grow it.
    const onOver = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.("a, button")) ring.classList.add("grow");
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as Element)?.closest?.("a, button")) ring.classList.remove("grow");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={spotRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[2] opacity-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx,50%) var(--my,30%), rgba(59,130,246,.055), rgba(56,189,248,.035) 45%, transparent 70%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[100] h-[34px] w-[34px] rounded-full border border-[rgba(59,130,246,0.5)] opacity-0 transition-[opacity,width,height,border-color,background] duration-300 ease-out"
      />
    </>
  );
}
