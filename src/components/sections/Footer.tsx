import Image from "next/image";
import { profile } from "@/content/resume";
import { introCredit } from "@/content/intro";
import { Reveal } from "@/components/motion/Reveal";

// A deliberate return to the opening: the same name / signature / name line, on the same
// charcoal-to-obsidian glow the intro uses.
export function Footer() {
  return (
    <footer
      data-tone="espresso"
      className="px-[clamp(20px,5vw,64px)] pb-10 pt-24"
      style={{ background: "radial-gradient(120% 120% at 50% 0%, #2c231c 0%, var(--color-espresso) 62%)" }}
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="foot-credit">
          <span className="name">{introCredit.given}</span>
          <Reveal variant="wipe" delay={0.2} className="sig">
            <Image src="/signature.png" alt={introCredit.signatureAlt} width={900} height={333} />
          </Reveal>
          <span className="name">{introCredit.family}</span>
        </div>
        <p className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t b-rule pt-6 text-sm text-taupe">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href="#summary" className="transition-colors hover:text-brass">
            Back to top
          </a>
        </p>
      </div>
    </footer>
  );
}
