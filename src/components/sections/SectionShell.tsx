import { SectionHeading } from "./SectionHeading";

export type Tone = "dark" | "charcoal" | "work" | "espresso" | "light" | "paper" | "grey";

interface SectionShellProps {
  id: string;
  title: string | string[];
  tone: Tone;
  children: React.ReactNode;
}

// Colours come from data-tone (globals.css), so every section follows the same palette rules.
export function SectionShell({ id, title, tone, children }: SectionShellProps) {
  return (
    <section id={id} data-tone={tone} className="relative px-[clamp(20px,5vw,64px)] py-24 md:py-36">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading title={title} />
        {children}
      </div>
    </section>
  );
}
