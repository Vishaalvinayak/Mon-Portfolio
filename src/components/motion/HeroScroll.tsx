"use client";

import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Hero entrance (time-based, plays once, every load).
 *
 * It starts only when ALL of these are true, so it can never play behind the intro overlay,
 * with a fallback font, or before the portrait has arrived:
 *   1. the intro has finished  (<html data-intro> is "done" or "seen")
 *   2. fonts are ready         (document.fonts.ready)
 *   3. the portrait has loaded (next/image onLoad / already complete)
 * If 2 or 3 stall, a short fail-safe starts it anyway, so the text can never stay hidden.
 *
 * Budget: every element's delay <= 0.4s and everything finishes in < 1.2s.
 * Only transform and opacity are animated. Layout never changes after mount.
 * (File name kept from the earlier scroll-driven version; nothing here is scroll-driven now,
 *  apart from the SCROLL cue fading out.)
 */

const EASE = [0.2, 0.8, 0.2, 1] as const;
const FAILSAFE_MS = 800; // after the intro ends, start anyway if fonts/portrait are slow
const LETTER_STAGGER = 0.02; // 17 characters -> last delay 0.32s
const DUR = 0.55;

type Ctx = { ready: boolean; portraitLoaded: boolean; reduce: boolean; setPortraitLoaded: () => void };
const HeroCtx = createContext<Ctx | null>(null);
function useHero() {
  const c = useContext(HeroCtx);
  if (!c) throw new Error("Hero parts must be rendered inside <HeroScroll>");
  return c;
}

export function HeroScroll({ id, className, children }: { id?: string; className?: string; children: ReactNode }) {
  const reduce = !!useReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);
  const [portraitLoaded, setPortraitLoaded] = useState(false);
  const [failsafe, setFailsafe] = useState(false);

  // 1. Wait for the intro to finish. A missing attribute means "not decided yet", not "done".
  useEffect(() => {
    const root = document.documentElement;
    const check = () => {
      if (root.dataset.intro === "done" || root.dataset.intro === "seen") setIntroDone(true);
    };
    check();
    const mo = new MutationObserver(check);
    mo.observe(root, { attributes: true, attributeFilter: ["data-intro"] });
    // If nothing ever sets the attribute (intro removed), don't wait forever.
    const t = window.setTimeout(() => {
      if (root.dataset.intro !== "playing") setIntroDone(true);
    }, 1500);
    return () => {
      mo.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  // 2. Fonts.
  useEffect(() => {
    let alive = true;
    const fonts = document.fonts;
    if (!fonts?.ready) setFontsReady(true);
    else fonts.ready.then(() => alive && setFontsReady(true));
    return () => {
      alive = false;
    };
  }, []);

  // Fail-safe, armed only once the intro is over.
  useEffect(() => {
    if (!introDone) return;
    const t = window.setTimeout(() => setFailsafe(true), FAILSAFE_MS);
    return () => window.clearTimeout(t);
  }, [introDone]);

  const ready = introDone && ((fontsReady && portraitLoaded) || failsafe);

  return (
    <HeroCtx.Provider value={{ ready, portraitLoaded, reduce, setPortraitLoaded: () => setPortraitLoaded(true) }}>
      <section id={id} data-tone="hero" className="relative bg-hero text-ink">
        <div className={`hero-stage hero-grain ${className ?? ""}`}>{children}</div>
      </section>
    </HeroCtx.Provider>
  );
}

/** The portrait: static, centred, never moves or resizes. It only fades in (opacity). */
export function HeroPortrait({
  src,
  alt,
  aspect,
  visible,
  cropTop,
  backdrop,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  aspect: number; // width / height of the visible (cropped) picture
  visible: number; // share of the picture's height that is shown (1 - cropTop - cropBottom)
  cropTop: number;
  backdrop: "light" | "dark";
  sizes: string;
  className?: string;
}) {
  const { ready, portraitLoaded, reduce, setPortraitLoaded } = useHero();
  return (
    <div className={className} style={{ aspectRatio: String(aspect), "--ar": aspect } as CSSProperties}>
      <motion.div
        className="h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: ready && portraitLoaded ? 1 : 0 }} // fades in only once the image has really arrived
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      >
        <div className="portrait-panel" data-backdrop={backdrop}>
          {/* Laid out at its natural shape and shifted so the cropped strips fall outside the panel. */}
          <div className="absolute inset-x-0" style={{ top: `${(-cropTop / visible) * 100}%`, height: `${100 / visible}%` }}>
            <Image
              src={src}
              alt={alt}
              fill
              priority
              sizes={sizes}
              className="object-cover"
              onLoad={setPortraitLoaded}
              ref={(el) => {
                if (el?.complete) setPortraitLoaded(); // already cached before hydration
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/** One letter of the name pops up out of its own mask. `index` staggers across all lines. */
function HeroLetter({ index, children }: { index: number; children: ReactNode }) {
  const { ready, reduce } = useHero();
  return (
    <span
      className="inline-block overflow-hidden align-top"
      style={{ paddingBottom: "0.32em", marginBottom: "-0.32em", paddingInline: "0.03em", marginInline: "-0.03em" }}
    >
      <motion.span
        className="inline-block will-change-transform"
        initial={{ y: "160%" }}
        animate={{ y: ready ? "0%" : "160%" }}
        transition={{ duration: reduce ? 0 : DUR, ease: EASE, delay: reduce ? 0 : index * LETTER_STAGGER }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** A line of the name. `offset` is the number of characters on earlier lines (keeps one continuous stagger). */
export function HeroLetters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="block" aria-hidden="true">
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block w-[0.26em]" />
        ) : (
          <HeroLetter key={i} index={offset + i}>
            {ch}
          </HeroLetter>
        ),
      )}
    </span>
  );
}

/** Fades in and lifts a few px, after `delay` seconds (keep <= 0.4). */
export function HeroFade({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) {
  const { ready, reduce } = useHero();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
}

/** A thin rule that draws itself left to right. */
export function HeroRule({ delay, className }: { delay: number; className?: string }) {
  const { ready, reduce } = useHero();
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      style={{ transformOrigin: "left center" }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: ready ? 1 : 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: reduce ? 0 : delay }}
    />
  );
}

/** "Scroll" cue: always at the bottom-left, fades out over the first 160px of scrolling. */
export function HeroCue({ children, className }: { children: ReactNode; className?: string }) {
  const { scrollY } = useScroll();
  // Function form: always computed in JS (never handed to the browser's scroll timeline).
  const opacity = useTransform(scrollY, (v) => Math.max(0, 1 - v / 160));
  return (
    <motion.div aria-hidden="true" className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
}
