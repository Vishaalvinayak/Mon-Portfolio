import { achievements, certifications } from "@/content/resume";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "./SectionShell";

export function Certifications() {
  return (
    <SectionShell id="certifications" tone="light" title={["Achievements &", "certifications"]}>
      {achievements.length > 0 && (
        <div className="mb-20 md:mb-28">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08} className="relative py-10">
              <Reveal variant="line" className="absolute inset-x-0 top-0 h-px bg-rule" />
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-2xl">
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] t-label">Achievement</p>
                  <p className="font-serif text-[clamp(28px,3.2vw,46px)] font-medium leading-[1.1]">{a.title}</p>
                  <p className="mt-3 text-[15px] t-soft">{a.event}</p>
                </div>
                <span className="font-serif text-[clamp(44px,6vw,88px)] font-medium leading-none tabular-nums text-brass-ink">
                  {a.year}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal>
        <h3 className="mb-6 text-xs font-medium uppercase tracking-[0.2em] t-label">Certifications</h3>
      </Reveal>
      <ul>
        {certifications.map((c, i) => (
          <Reveal as="li" key={c.name} delay={Math.min(i * 0.05, 0.3)} className="relative">
            <Reveal variant="line" className="absolute inset-x-0 top-0 h-px bg-rule" />
            <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <p className="font-serif text-[clamp(22px,2vw,28px)] font-medium">{c.name}</p>
              <p className="text-sm t-soft">{c.issuer}</p>
            </div>
          </Reveal>
        ))}
        <Reveal variant="line" className="h-px bg-rule" />
      </ul>
    </SectionShell>
  );
}
