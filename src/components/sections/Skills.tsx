import { skills } from "@/content/resume";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "./SectionShell";

export function Skills() {
  return (
    <SectionShell id="skills" title="Skills">
      <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
        {skills.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.05}>
            <h3 className="mb-3 text-sm text-dim">{group.label}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item} className="rounded-full border border-white/10 px-3 py-1.5 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
