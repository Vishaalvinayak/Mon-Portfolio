import { achievements, certifications } from "@/content/resume";
import { Reveal } from "@/components/motion/Reveal";
import { TiltGlow } from "@/components/motion/TiltGlow";
import { SectionShell } from "./SectionShell";

export function Certifications() {
  return (
    <SectionShell id="certifications" title="Achievements & certifications">
      {/* The headline proof gets a card of its own, full width, above the certificate list. */}
      {achievements.length > 0 && (
        <div className="mb-12 space-y-5">
          {achievements.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08}>
              <TiltGlow className="rounded-xl border border-[rgba(59,130,246,0.28)] bg-[linear-gradient(135deg,rgba(59,130,246,0.09),transparent_60%)] p-6 md:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="mb-2.5 text-xs text-accent">Achievement</div>
                    <p className="mb-1.5 text-xl font-semibold md:text-2xl">{a.title}</p>
                    <p className="text-sm text-dim">{a.event}</p>
                  </div>
                  <span className="font-mono text-3xl tabular-nums text-accent/80 md:text-4xl">{a.year}</span>
                </div>
              </TiltGlow>
            </Reveal>
          ))}
        </div>
      )}

      <Reveal>
        <h3 className="mb-4 text-sm text-dim">Certifications</h3>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li key={c.name} className="rounded-lg border border-white/10 p-4">
              <p className="font-medium">{c.name}</p>
              <p className="text-sm text-dim">{c.issuer}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </SectionShell>
  );
}
