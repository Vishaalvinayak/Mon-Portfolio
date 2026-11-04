import { skills } from "@/content/resume";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "./SectionShell";

export function Skills() {
  return (
    <SectionShell id="skills" tone="grey" title="Skills">
      <div>
        {skills.map((group, i) => (
          <div key={group.label} className="relative grid grid-cols-1 gap-3 py-8 md:grid-cols-[minmax(180px,0.3fr)_1fr] md:gap-12">
            <Reveal variant="line" delay={i * 0.04} className="absolute inset-x-0 top-0 h-px bg-rule" />
            <Reveal delay={i * 0.04 + 0.05}>
              <h3 className="text-xs font-medium uppercase tracking-[0.2em] t-label md:pt-2">{group.label}</h3>
            </Reveal>
            <Reveal delay={i * 0.04 + 0.12}>
              <ul className="flex flex-wrap gap-x-8 gap-y-2 font-serif text-[clamp(22px,2.2vw,32px)] font-medium leading-snug">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        ))}
        <Reveal variant="line" className="h-px bg-rule" />
      </div>
    </SectionShell>
  );
}
