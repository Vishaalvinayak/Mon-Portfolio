import { profile } from "@/content/resume";
import { portrait } from "@/content/portrait";
import { HeroCue, HeroFade, HeroLetters, HeroPortrait, HeroScroll } from "@/components/motion/HeroScroll";

// Desktop (>= 768px): "Vishaal" + role on the left, "Vinayak" + availability on the right,
// portrait centred between them. Mobile: Vishaal, Vinayak, portrait, role, availability, stacked.
// The groups use `contents` on mobile so their children can be re-ordered in one column.
const NAME =
  "font-serif font-medium leading-[0.92] tracking-[-0.01em] text-ink whitespace-nowrap " +
  "text-[clamp(52px,14vw,96px)] md:text-[clamp(44px,8.4vw,150px)]";

export function Hero() {
  const visible = 1 - portrait.cropTop - portrait.cropBottom; // share of the picture that is shown
  const aspect = portrait.width / (portrait.height * visible);

  return (
    <HeroScroll
      id="summary"
      className="relative flex min-h-svh flex-col gap-6 overflow-hidden px-[clamp(20px,5vw,64px)] pb-16 pt-40 md:block md:h-svh md:pb-0 md:pt-0"
    >
      {/* The visual name is split in two, so the full name lives here for screen readers and SEO. */}
      <h1 className="sr-only">{profile.fullName}</h1>

      {/* LEFT: first name + role */}
      <div className="contents md:absolute md:left-[clamp(20px,5vw,64px)] md:top-[34%] md:z-10 md:block">
        <div className={`${NAME} order-1`}>
          <HeroLetters text="Vishaal" offset={0} />
        </div>
        <HeroFade delay={0.35} className="order-4 md:mt-6">
          <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-ink-soft md:max-lg:text-xs md:max-lg:tracking-[0.2em] md:text-sm">
            {profile.role}
          </p>
        </HeroFade>
      </div>

      {/* PORTRAIT: centred, bottom-anchored, never moves */}
      <HeroPortrait
        src={portrait.src}
        alt={portrait.alt}
        aspect={aspect}
        visible={visible}
        cropTop={portrait.cropTop}
        backdrop={portrait.backdrop}
        sizes="(min-width: 768px) 64vw, 90vw"
        className="relative z-0 order-3 mx-auto w-[min(100%,calc(62svh*var(--ar)),520px)] md:absolute md:inset-x-0 md:bottom-0 md:w-[min(calc(100svh*var(--ar)),60vw)] lg:w-[min(calc(100svh*var(--ar)),64vw)]"
      />

      {/* RIGHT: last name + availability (right-aligned on desktop) */}
      <div className="contents md:absolute md:right-[clamp(20px,5vw,64px)] md:top-[34%] md:z-10 md:block md:max-w-[31vw] md:text-right">
        <div className={`${NAME} order-2`}>
          <HeroLetters text="Vinayak" offset={7} />
        </div>
        <HeroFade delay={0.4} className="order-5 md:mt-6 md:flex md:justify-end">
          <p className="inline-flex items-center gap-3 text-[13px] text-ink-soft md:text-left">
            <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-brass" />
            {profile.status}
          </p>
        </HeroFade>
      </div>

      <HeroCue className="absolute bottom-8 left-[clamp(20px,5vw,64px)] z-10 hidden items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-[color:var(--hero-muted)] md:flex">
        <span className="h-px w-10 bg-brass" />
        Scroll
      </HeroCue>
    </HeroScroll>
  );
}
