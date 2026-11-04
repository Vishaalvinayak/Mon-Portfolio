import Image from "next/image";
import { projects } from "@/content/resume";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollExpand } from "@/components/motion/ScrollExpand";
import { SectionShell } from "./SectionShell";

const linkClass =
  "inline-flex items-center gap-1.5 border-b border-brass/50 pb-0.5 text-[15px] text-ivory transition-colors hover:border-brass hover:text-brass";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const secondary = projects.filter((p) => !p.featured);

  return (
    <SectionShell id="projects" tone="work" title={["Selected", "work"]}>
      <div>
        {featured.map((project) => (
          <article key={project.name} className="relative py-14 md:py-20">
            <Reveal variant="line" className="absolute inset-x-0 top-0 h-px bg-rule" />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <Reveal className="flex flex-wrap items-center gap-3">
                  {project.tag && (
                    <span className="text-xs font-medium uppercase tracking-[0.2em] t-label">{project.tag}</span>
                  )}
                  {project.stat && (
                    <span className="rounded-full border border-divider-dark px-3 py-1 text-xs text-muted">
                      {project.stat}
                    </span>
                  )}
                </Reveal>
                <MaskLines
                  as="h3"
                  lines={[project.name]}
                  delay={0.08}
                  className="mt-6 font-serif text-[clamp(36px,4.4vw,68px)] font-medium leading-[1.02] tracking-[-0.005em]"
                />
              </div>

              <div className="space-y-8 lg:col-span-7">
                {project.stack.length > 0 && (
                  <Reveal delay={0.12}>
                    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.18em] text-taupe">
                      {project.stack.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </Reveal>
                )}
                <div className="max-w-[62ch] space-y-4 text-[clamp(16px,1.25vw,19px)] leading-relaxed t-soft">
                  {project.bullets.map((b, i) => (
                    <Reveal key={b} delay={0.18 + i * 0.08}>
                      <p>{b}</p>
                    </Reveal>
                  ))}
                </div>
                {project.links && (
                  <Reveal delay={0.18 + project.bullets.length * 0.08}>
                    <div className="flex flex-wrap gap-6">
                      {project.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass} aria-label={`${l.label}: ${project.name}`}>
                          {l.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  </Reveal>
                )}
              </div>
            </div>

            {/* Only rendered when a screenshot is supplied in content/resume.ts. */}
            {project.image && (
              <ScrollExpand className="mt-12 overflow-hidden rounded-sm border border-divider-dark md:mt-16">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 1440px) 1312px, 90vw"
                  className="h-auto w-full"
                />
              </ScrollExpand>
            )}
          </article>
        ))}
      </div>

      {secondary.length > 0 && (
        <div className="relative pt-14 md:pt-20">
          <Reveal variant="line" className="absolute inset-x-0 top-0 h-px bg-rule" />
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
            {secondary.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.1}>
                {project.tag && (
                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] t-label">{project.tag}</p>
                )}
                <h3 className="mb-3 font-serif text-[clamp(26px,2.4vw,36px)] font-medium leading-tight">
                  {project.name}
                </h3>
                <p className="max-w-[52ch] text-[15px] leading-relaxed t-soft">{project.bullets[0]}</p>
                {project.stack.length > 0 && (
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-taupe">{project.stack.join("  /  ")}</p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </SectionShell>
  );
}
