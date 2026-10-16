import { experience } from "@/content/resume";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "./SectionShell";

export function Experience() {
  return (
    <SectionShell id="experience" title="Work experience">
      <div className="space-y-10">
        {experience.map((job) => (
          <Reveal key={`${job.company}-${job.start}`} className="max-w-2xl">
            <p className="mb-1.5 text-sm text-azure">
              {job.start} – {job.end}
            </p>
            <h3 className="text-lg font-semibold">{job.role}</h3>
            <p className="mb-3 text-sm text-dim">{job.company}</p>
            <ul className="space-y-2 text-sm leading-relaxed text-dim">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
