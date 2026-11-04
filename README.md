# Vishaal Vinayak — portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — needs internet, to download the Google fonts
npm run start    # serve the production build
npm run lint
```

## What you get

- **Cinematic intro** (three sketch-line slides, then name + signature). Plays on every load;
  set `introFrequency` to `"once-per-session"` in `src/content/intro.ts` to play it once per tab.
  "Skip intro" works throughout.
- **Hero** — after the intro, the portrait fades in, centred and static, and the name pops out letter
  by letter: "Vishaal" and the role on the left, "Vinayak" and the availability line on the right. The
  entrance starts only when the intro has finished, fonts are ready and the portrait has loaded, and
  finishes in under a second. On phones everything stacks (name, portrait, role).
- **About** — pinned while you scroll: the paragraph fills from faint grey to dark ink, letter by
  letter, with a brass leading edge. Reversible. With "reduce motion" it is simply dark and unpinned.
- **Selected work, Skills, Experience, Education, Achievements & certifications, Contact** with
  masked headline reveals, drawing rules and short staggers. Footer echoes the intro.
- The interactive **terminal** now lives in the Contact section.
- "Reduce motion": no pinning and no reveals; the About paragraph is simply dark.

## Replace the portrait

Drop your photo in `public/`, then edit `src/content/portrait.ts` (`src`, `width`, `height`).
If the photo has a dark background instead of a light one, set `backdrop: "dark"`.

## Add a project screenshot

In `src/content/resume.ts`, give a featured project an `image` (`src`, `alt`, `width`, `height`),
with the file in `public/projects/`. It then scales in on scroll. Without `image`, nothing renders.

## Colours

Defined once, in `src/app/globals.css` (`@theme static`): Obsidian & Antique Brass. Every section
declares a tone (`data-tone="dark | charcoal | light | paper"`) and inherits its colours.
Extra derived tokens: `champagne` (intro highlight), `brass-ink` (brass dark enough for small text
on ivory), `ink-soft` (secondary text on ivory).

## Where things live

```
public/
  portrait.png         hero portrait (replaceable, see above)
  signature.png        signature used in the intro and footer
  resume.pdf           the "Resume (PDF)" links and the terminal's `resume` command
src/
  content/             DATA ONLY. Edit your details here.
    resume.ts            profile (incl. About text), links, education, skills, projects, experience, certifications
    portrait.ts          the hero portrait file + size + backdrop
    intro.ts             intro slide text, credit names, how often the intro plays
    types.ts             TypeScript shapes for the above
  components/
    sections/          LAYOUT ONLY. Server components that render content/.
    motion/            ANIMATION ONLY. Never imports content/.
      HeroScroll.tsx     the hero entrance (time-based, gated on intro + fonts + portrait)
      AboutFill.tsx      the pinned About letter fill (scroll-linked)
      ScrollExpand.tsx   scroll-linked scale for a featured project screenshot
      RevealController.tsx  one IntersectionObserver that drives every reveal (CSS does the animating)
      Reveal.tsx / MaskLines.tsx   markup for fade-up, drawing rules, masked lines
      CustomCursor.tsx, Magnetic.tsx, TextRoll.tsx   cursor + hover effects
      TiltGlow.tsx       card tilt (no longer used by the cards; kept for re-use)
    terminal/            the interactive terminal; answers come from content/resume.ts
    intro/               the intro sequence (IntroSequence.tsx + intro.css)
  lib/motion/tokens.ts   shared easing and durations
  app/                   layout.tsx (fonts, metadata), page.tsx (section order), globals.css (colours + reveal CSS)
```

Rules that keep it clean: `content/` imports nothing; `motion/` never imports `content/`.
