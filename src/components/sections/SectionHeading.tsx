import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";

interface SectionHeadingProps {
  title: string | string[];
  /** true for the decorative second copy of a heading (About's ivory layer): no extra number. */
  dup?: boolean;
  /** false when an ancestor with data-reveal controls the reveal (About). */
  reveal?: boolean;
}

// The "01 / 02 / ..." number comes from a CSS counter on .section-no (see globals.css).
export function SectionHeading({ title, dup = false, reveal = true }: SectionHeadingProps) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <header className="mb-14 md:mb-20">
      <div className="mb-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] t-label">
        <span className="section-no" data-dup={dup ? "" : undefined} />
        {reveal ? (
          <Reveal variant="line" className="h-px w-14 bg-brass" />
        ) : (
          <span className="block h-px w-14 bg-brass" />
        )}
      </div>
      <MaskLines
        as="h2"
        lines={lines}
        reveal={reveal}
        className="font-serif text-[clamp(34px,6.2vw,104px)] font-medium uppercase leading-[0.98] tracking-[0.02em]"
      />
    </header>
  );
}
