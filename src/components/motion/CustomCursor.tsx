"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "motion/react";

/**
 * Spade cursor: a solid ace-of-spades, nothing else (no ring, dot, trail or glow).
 *
 *   default  ~28px, #E8E6E1 with mix-blend-mode: difference (dark on the light hero, light on dark)
 *   hover    ~46px, brass, normal blend  — links, buttons, role="button", [data-cursor="hover"]
 *   press    x0.85 of whatever size it currently is
 *
 * Single ownership, so nothing is ever animated by two systems:
 *   - the OUTER wrapper's position (translate3d) and blend mode belong to one rAF loop below;
 *   - the INNER glyph's scale and opacity belong to motion's animate().
 * Position never goes through React state (no re-render per move) and never touches top/left.
 *
 * Mounted directly under <body> (see app/layout.tsx), outside every element that creates a
 * stacking context, so mix-blend-mode: difference blends against the whole page.
 * Renders nothing on touch / coarse pointers; the native cursor is hidden only while this is
 * mounted (it toggles html.has-spade-cursor, which the rule in globals.css keys off).
 */

const SIZE = 28; // px: default height
const HOVER_SCALE = 46 / SIZE; // ~1.64 -> about 46px
const PRESS_SCALE = 0.85;
const SMOOTH_TAU = 0.05; // seconds. Exponential smoothing: ~95% there after 3*tau, about 0.15s
const LIGHT = "#E8E6E1";
const BRASS = "#B49A68";
const EASE = [0.2, 0.8, 0.2, 1] as const;
const HOVER_SELECTOR = 'a[href], button, [role="button"], [data-cursor="hover"], summary';
const SPADE_PATH =
  "M50 6 C50 6 10 38 10 60 C10 77 26 85 38 78 C42 76 46 73 47 70 C47 80 44 90 35 95 L65 95 C56 90 53 80 53 70 C54 73 58 76 62 78 C74 85 90 77 90 60 C90 38 50 6 50 6 Z";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false); // changes once (on mount); never per move
  const wrapRef = useRef<HTMLDivElement>(null);
  const glyphRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // Only for a real, hover-capable, fine pointer. Touch devices render nothing.
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Hide the native cursor only while the spade is actually mounted, so a failure here can
  // never leave a visitor with no cursor at all.
  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-spade-cursor");
    return () => root.classList.remove("has-spade-cursor");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const wrap = wrapRef.current;
    const glyph = glyphRef.current;
    const path = pathRef.current;
    if (!wrap || !glyph || !path) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let tx = 0; // pointer
    let ty = 0;
    let x = 0; // where the spade is drawn
    let y = 0;
    let shown = false;
    let hover = false;
    let pressed = false;
    let raf = 0;
    let last = 0;
    let scaleAnim: { stop: () => void } | undefined;
    let fadeAnim: { stop: () => void } | undefined;

    const place = () => {
      wrap.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
    };

    // One loop. It runs only while the spade is still catching up, then goes to sleep and
    // wakes on the next pointer move. With reduced motion there is no loop at all.
    const frame = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 1 / 60;
      last = t;
      const k = 1 - Math.exp(-dt / SMOOTH_TAU);
      x += (tx - x) * k;
      y += (ty - y) * k;
      const settled = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1;
      if (settled) {
        x = tx;
        y = ty;
        last = 0;
      }
      place();
      raf = settled ? 0 : requestAnimationFrame(frame);
    };

    const setShown = (v: boolean) => {
      if (shown === v) return;
      shown = v;
      fadeAnim?.stop();
      fadeAnim = animate(glyph, { opacity: v ? 1 : 0 }, { duration: reduced.matches ? 0 : 0.18 });
    };
    const applyScale = () => {
      scaleAnim?.stop();
      scaleAnim = animate(
        glyph,
        { scale: (hover ? HOVER_SCALE : 1) * (pressed ? PRESS_SCALE : 1) },
        { duration: reduced.matches ? 0 : pressed ? 0.1 : 0.2, ease: EASE },
      );
    };
    const paint = () => {
      wrap.style.mixBlendMode = hover ? "normal" : "difference";
      path.style.fill = hover ? BRASS : LIGHT;
    };

    // --- the listeners: one pointermove, one hover (pointerover), press (down/up), window-leave ---
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!shown) {
        x = tx; // first move: appear at the pointer, never fly in from 0,0
        y = ty;
        place();
        setShown(true);
      }
      if (reduced.matches) {
        x = tx;
        y = ty;
        place();
      } else if (!raf) {
        raf = requestAnimationFrame(frame);
      }
    };
    const onOver = (e: PointerEvent) => {
      const next = !!(e.target as Element | null)?.closest?.(HOVER_SELECTOR);
      if (next === hover) return;
      hover = next;
      paint();
      applyScale();
    };
    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || e.pointerType === "touch") return;
      pressed = true;
      applyScale();
    };
    const onUp = () => {
      if (!pressed) return;
      pressed = false;
      applyScale();
    };
    // Leaving the window: pointerout bubbles with relatedTarget === null only then.
    const onOut = (e: PointerEvent) => {
      if (!e.relatedTarget) setShown(false);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      cancelAnimationFrame(raf);
      scaleAnim?.stop();
      fadeAnim?.stop();
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      data-spade-cursor
      className="pointer-events-none fixed left-0 top-0 z-[2147483647]"
      style={{ width: SIZE, height: SIZE, mixBlendMode: "difference", willChange: "transform" }}
    >
      <div ref={glyphRef} style={{ opacity: 0, transformOrigin: "50% 50%" }}>
        <svg viewBox="0 0 100 100" width={SIZE} height={SIZE} style={{ display: "block" }} focusable="false">
          <path ref={pathRef} d={SPADE_PATH} fill={LIGHT} />
        </svg>
      </div>
    </div>
  );
}
