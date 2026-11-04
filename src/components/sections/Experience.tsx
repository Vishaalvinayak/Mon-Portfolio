import { experience } from "@/content/resume";
import { SectionShell } from "./SectionShell";
import { Timeline, TimelineItem } from "./Timeline";

export function Experience() {
  return (
    <SectionShell id="experience" tone="light" title="Work experience">
      <Timeline>
        {experience.map((job) => (
          <TimelineItem
            key={`${job.company}-${job.start}`}
            when={`${job.start} – ${job.end}`}
            title={job.role}
            sub={job.company}
          >
            <ul className="mt-4 max-w-[62ch] space-y-2 text-[15px] leading-relaxed t-soft">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionShell>
  );
}
