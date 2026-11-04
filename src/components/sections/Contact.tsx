import { links, profile } from "@/content/resume";
import { MaskLines } from "@/components/motion/MaskLines";
import { Reveal } from "@/components/motion/Reveal";
import { Terminal } from "@/components/terminal/Terminal";

// What each row shows is derived from the real data in content/resume.ts.
const show = (href: string, label: string) =>
  href.startsWith("mailto:") ? profile.email : href.startsWith("http") ? href.replace(/^https?:\/\/(www\.)?/, "") : label;

const rows = [
  ...(["Email", "GitHub", "LinkedIn", "Resume (PDF)"] as const).flatMap((label) => {
    const l = links.find((x) => x.label === label);
    return l ? [{ kind: label === "Resume (PDF)" ? "Résumé" : label, value: show(l.href, l.label), href: l.href }] : [];
  }),
];

export function Contact() {
  return (
    <section id="contact" data-tone="espresso" className="relative px-[clamp(20px,5vw,64px)] pb-24 pt-24 md:pb-36 md:pt-36">
      <div className="mx-auto max-w-[1440px]">
        <header className="mb-16 md:mb-24">
          <div className="mb-6 flex items-center gap-4 text-xs font-medium uppercase tracking-[0.22em] t-label">
            <span className="section-no" />
            <Reveal variant="line" className="h-px w-14 bg-brass" />
          </div>
          <MaskLines
            as="h2"
            lines={["Let’s build", "something", "meaningful."]}
            stagger={0.12}
            className="font-serif text-[clamp(40px,9vw,150px)] font-medium uppercase leading-[0.95] tracking-[0.03em]"
          />
        </header>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <div>
            <Reveal>
              <p className="mb-12 max-w-[48ch] text-[17px] leading-relaxed t-soft">{profile.contactNote}</p>
            </Reveal>
            <ul>
              {rows.map((row, i) => {
                const external = row.href.startsWith("http") || row.href.startsWith("/");
                return (
                  <Reveal as="li" key={row.kind} delay={i * 0.07} className="relative">
                    <Reveal variant="line" delay={i * 0.07} className="absolute inset-x-0 top-0 h-px bg-rule" />
                    <a
                      href={row.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="contact-row group relative flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span className="shrink-0 text-xs sm:w-24 font-medium uppercase tracking-[0.2em] t-label">
                        {row.kind}
                      </span>
                      <span className="value min-w-0 flex-1 pr-8 [overflow-wrap:anywhere] font-serif text-[clamp(20px,5.2vw,34px)] sm:pr-0 md:text-[clamp(22px,2.4vw,34px)] font-medium">
                        {row.value}
                      </span>
                      <span aria-hidden="true" className="arrow absolute right-0 top-6 text-lg text-brass sm:static">
                        ↗
                      </span>
                    </a>
                  </Reveal>
                );
              })}
              <Reveal variant="line" className="h-px bg-rule" />
            </ul>
          </div>

          <Reveal delay={0.15} className="self-start">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] t-label">Prefer a prompt?</p>
            <Terminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
