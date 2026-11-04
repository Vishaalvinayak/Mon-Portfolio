import { Reveal } from "@/components/motion/Reveal";

/** Vertical timeline: a rule that draws down the page, with a brass marker per entry. */
export function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative max-w-3xl space-y-14">
      <Reveal variant="line-y" className="absolute bottom-2 left-[7px] top-2 w-px bg-rule" />
      {children}
    </ol>
  );
}

interface TimelineItemProps {
  when: string;
  title: string;
  sub: string;
  detail?: string;
  children?: React.ReactNode;
  delay?: number;
}

export function TimelineItem({ when, title, sub, detail, children, delay = 0 }: TimelineItemProps) {
  return (
    <Reveal as="li" delay={delay} className="relative pl-12">
      <span
        aria-hidden="true"
        className="absolute left-0 top-[0.35rem] h-[15px] w-[15px] rounded-full border border-brass bg-[var(--tone-bg)]"
      >
        <span className="absolute inset-[3px] rounded-full bg-brass" />
      </span>
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] t-label">{when}</p>
      <h3 className="font-serif text-[clamp(24px,2.4vw,34px)] font-medium leading-tight">{title}</h3>
      <p className="mt-1 text-[15px] t-soft">{sub}</p>
      {detail && <p className="mt-2 text-[15px] t-soft">{detail}</p>}
      {children}
    </Reveal>
  );
}
