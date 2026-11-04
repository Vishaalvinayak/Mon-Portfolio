import { education } from "@/content/resume";
import { SectionShell } from "./SectionShell";
import { Timeline, TimelineItem } from "./Timeline";

export function Education() {
  return (
    <SectionShell id="education" tone="grey" title="Education">
      <Timeline>
        {education.map((item, i) => (
          <TimelineItem
            key={`${item.degree}-${item.school}`}
            delay={i * 0.08}
            when={`${item.start} – ${item.end}${item.note ? ` · ${item.note}` : ""}`}
            title={item.degree}
            sub={`${item.school}, ${item.location}`}
            detail={item.grade}
          />
        ))}
      </Timeline>
    </SectionShell>
  );
}
