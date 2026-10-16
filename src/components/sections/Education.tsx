import { education } from "@/content/resume";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "./SectionShell";

export function Education() {
  return (
    <SectionShell id="education" title="Education">
      <div className="space-y-10">
        {education.map((item) => (
          <Reveal key={`${item.degree}-${item.school}`} className="max-w-2xl">
            <p className="mb-1.5 text-sm text-azure">
              {item.start} – {item.end}
              {item.note ? ` · ${item.note}` : ""}
            </p>
            <h3 className="text-lg font-semibold">{item.degree}</h3>
            <p className="text-sm text-dim">
              {item.school}, {item.location}
            </p>
            <p className="mt-2 text-sm text-dim">{item.grade}</p>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
