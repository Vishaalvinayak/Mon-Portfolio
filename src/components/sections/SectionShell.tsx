import { Reveal } from "@/components/motion/Reveal";

interface SectionShellProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

// The "01 / 02 / ..." prefix comes from a CSS counter on .section-title::before
// (see globals.css) — sections don't need to track or pass their own number.
export function SectionShell({ id, title, children }: SectionShellProps) {
  return (
    <section id={id} className="border-t border-white/[0.08] px-[clamp(20px,5vw,64px)] py-16 md:py-24">
      <Reveal>
        <h2 className="section-title mb-10 text-xl font-semibold">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
