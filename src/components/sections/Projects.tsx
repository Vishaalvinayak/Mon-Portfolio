import { projects } from "@/content/resume";
import { Reveal } from "@/components/motion/Reveal";
import { TiltGlow } from "@/components/motion/TiltGlow";
import { SectionShell } from "./SectionShell";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <SectionShell id="projects" title="Projects">
      <div className="mb-5 grid gap-5 md:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <TiltGlow className="h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6">
              <div className="mb-2.5 flex flex-wrap items-center gap-2">
                {project.tag && <span className="text-xs text-azure">{project.tag}</span>}
                {project.stat && (
                  <span className="rounded-full border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.08)] px-2.5 py-0.5 text-xs font-medium text-[#34d399]">
                    {project.stat}
                  </span>
                )}
              </div>
              <h3 className="mb-3 text-lg font-semibold">{project.name}</h3>
              {project.stack.length > 0 && (
                <ul className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-azure">
                      {tech}
                    </li>
                  ))}
                </ul>
              )}
              <div className="space-y-2 text-sm leading-relaxed text-dim">
                {project.bullets.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </div>
              {project.links && (
                <div className="mt-5 flex gap-4 text-sm">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="proj-link underline-offset-4 hover:underline">
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </TiltGlow>
          </Reveal>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {secondary.map((project, i) => (
          <Reveal key={project.name} delay={i * 0.08}>
            <TiltGlow className="h-full rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent p-6">
              {project.tag && <div className="mb-2.5 text-xs text-azure">{project.tag}</div>}
              <h3 className="mb-3 text-lg font-semibold">{project.name}</h3>
              <p className="text-sm leading-relaxed text-dim">{project.bullets[0]}</p>
            </TiltGlow>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
