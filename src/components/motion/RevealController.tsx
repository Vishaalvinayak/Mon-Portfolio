"use client";

import { useEffect } from "react";

/**
 * Mount once. Finds every [data-reveal] element that is below the fold, marks it data-armed
 * (CSS then hides it) and adds data-in when it scrolls into view (CSS then animates it).
 *
 * Elements already on screen are never hidden, reduced-motion visitors are never armed, and
 * the observer is disconnected on unmount.
 * data-reveal-id / data-reveal-mirror: a mirror copy follows the state of its source, so the
 * two layers of the About section reveal in perfect sync.
 */
export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const mirrorsOf = (el: HTMLElement) => {
      const id = el.dataset.revealId;
      return id ? Array.from(document.querySelectorAll<HTMLElement>(`[data-reveal-mirror="${id}"]`)) : [];
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.setAttribute("data-in", "");
          mirrorsOf(el).forEach((m) => m.setAttribute("data-in", ""));
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal-mirror])").forEach((el) => {
      const r = el.getBoundingClientRect();
      const onScreen = r.top < window.innerHeight * 0.9 && r.bottom > 0;
      if (onScreen) return; // already visible: leave it alone
      el.setAttribute("data-armed", "");
      mirrorsOf(el).forEach((m) => m.setAttribute("data-armed", ""));
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
