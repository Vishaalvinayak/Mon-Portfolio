// content/intro.ts
// Text shown by the intro sequence. Icons live in components/intro/SketchIcons.tsx.

export const introSlides = [
  {
    label: "Interface & interaction",
    role: "Frontend engineering",
    stack: "React · TypeScript · Tailwind",
  },
  {
    label: "Services & data",
    role: "Backend engineering",
    stack: "Java · Spring Boot · PostgreSQL",
  },
  {
    label: "End to end",
    role: "Full-stack delivery",
    stack: "Design → build → ship",
  },
] as const;

export const introCredit = {
  given: "Vishaal",
  family: "Vinayak",
  signatureAlt: "Vishaal Vinayak's signature",
} as const;

// How often the intro plays:
//   "every-load"       plays on every page load, including refreshes (the default)
//   "once-per-session" plays once per browser tab; refreshing in that tab skips it
export const introFrequency: "every-load" | "once-per-session" = "every-load";
