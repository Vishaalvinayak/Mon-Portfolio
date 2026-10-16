import { links, profile } from "@/content/resume";
import { Magnetic } from "@/components/motion/Magnetic";
import { Terminal } from "@/components/terminal/Terminal";

const heroLinks = links.filter((l) => l.label !== "Email");

// Plain server component: the two-line reveal below is driven entirely by the
// html[data-intro] attribute in globals.css, so no client-side state is needed here.
export function Hero() {
  return (
    <section
      id="summary"
      className="hero-pop hero-glow grid items-center gap-[clamp(28px,4vw,60px)] px-[clamp(20px,5vw,64px)] pb-[4vh] pt-[5vh] lg:grid-cols-[1.2fr_0.9fr]"
    >
      <div>
        <div className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.06)] px-3.5 py-[7px] text-[13px] text-dim">
          <span className="status-dot h-[7px] w-[7px] rounded-full bg-accent" />
          {profile.status}
        </div>

        <h1 className="mb-6 font-serif text-[clamp(36px,5vw,62px)] font-semibold leading-[1.1]">
          <span className="hero-line">I build products</span>
          <span className="hero-line">
            from the <em className="italic text-accent">interface</em> down to the{" "}
            <em className="italic text-accent">database</em>.
          </span>
        </h1>

        <p className="mb-7 max-w-[62ch] text-[17px] leading-relaxed text-dim">{profile.summary}</p>

        <div className="flex flex-wrap gap-3">
          {heroLinks.map((link, i) => {
            const external = link.href.startsWith("http");
            return (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={
                    i === 0
                      ? "inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-5 py-3 text-sm font-semibold text-[#04140d] transition-colors hover:border-[#93c5fd] hover:bg-[#93c5fd]"
                      : "inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  }
                >
                  {link.label} ↗
                </a>
              </Magnetic>
            );
          })}
        </div>
      </div>

      <Terminal />
    </section>
  );
}
