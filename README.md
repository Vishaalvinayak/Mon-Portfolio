# Vishaal Vinayak — portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build — needs internet, to download the Google fonts
npm run start    # serve the production build
```

## What you get

- A cinematic intro (three sketch-line slides, then your name and signature) that fades
  into the site. **It plays on every page load.** To play it once per browser tab instead,
  set `introFrequency` to `"once-per-session"` in `src/content/intro.ts`.
- A hero with a terminal you can type into. It types commands by itself until someone clicks
  it. Commands: `help`, `whoami`, `about`, `skills`, `projects` (and `projects 1`),
  `experience`, `education`, `certifications`, `contact`, `resume` (also `cv`), `github`,
  `linkedin`, `clear`.
- Your own favicon (a blue "V" with a green cursor bar) and a link-preview image that is
  generated from your profile data.
- Visitors who turn on "reduce motion" in their system settings get a still page: no
  background drift, no pulsing dots, no custom cursor, no typing demo, no smooth scrolling.

## Where things live

```
public/
  signature.png        signature used in the intro
  resume.pdf           the "Resume (PDF)" buttons and the terminal's `resume` command open this
src/
  content/             DATA ONLY. Edit your details here.
    resume.ts            profile, links, education, skills, projects, experience, certifications
    intro.ts             intro slide text, credit names, and how often the intro plays
    types.ts             TypeScript shapes for the above
  components/
    sections/          LAYOUT ONLY. Server components that render content/.
    motion/            ANIMATION ONLY. Never imports content/.
      CustomCursor.tsx   dot + ring + spotlight that follow the mouse (rests when it is still)
      Magnetic.tsx       buttons nudge toward the cursor
      TiltGlow.tsx       project cards tilt and glow toward the cursor
      Reveal.tsx         fade-up on scroll (the only file that uses the `motion` package)
      TextRoll.tsx       hover text-roll
    terminal/
      Terminal.tsx       the interactive terminal; answers come from content/resume.ts
    intro/               the intro sequence (IntroSequence.tsx + intro.css)
  lib/motion/
    tokens.ts          shared easing and durations
  app/
    layout.tsx         fonts, page title/description, link-preview tags, mounts the cursor
    page.tsx           the order of the sections
    globals.css        colours, aurora background, section numbers, reduced-motion rules
    opengraph-image.tsx  the link-preview image (reads from content/resume.ts)
    favicon.ico, icon.svg, apple-icon.png   the favicon set
```

Rules that keep it clean: `content/` imports nothing; `motion/` never imports `content/`.

## Things worth knowing

- **Section order = scroll order = the 01/02/... numbers.** The order in `src/app/page.tsx`
  sets all three (the numbers come from a CSS counter), so keep `SiteNav.tsx`'s link order
  in the same order.
- **Target roles.** `targetRoles` at the top of `src/content/resume.ts` feeds the status pill,
  the summary, the contact note and the link-preview image — change it once.
- **Link previews.** Set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` where you build/deploy
  so preview images resolve to your domain. On Vercel it falls back to the deployment URL.
- **Replace the favicon** by swapping the three files in `src/app/` (keep the same names).
- **Change the accent colour** with `--accent` in `src/app/globals.css`.
- **Turn off the custom cursor** by removing `<CustomCursor />` from `src/app/layout.tsx`.
- **Terminal commands** live in the `runCommand` switch in `Terminal.tsx`; the words it types
  by itself are `DEMO_COMMANDS` at the top of that file.

## Still to fill in

- The Inbox Reader "GitHub" link points to your profile, not the repository. Put the real
  repository URL (and a live URL, if it is deployed) in `projects` in `src/content/resume.ts`.
