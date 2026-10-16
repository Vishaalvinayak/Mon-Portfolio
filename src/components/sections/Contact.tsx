import { links, profile } from "@/content/resume";
import { TextRoll } from "@/components/motion/TextRoll";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { SectionShell } from "./SectionShell";

const contactLinks = [
  { label: profile.phone, href: `tel:${profile.phone.replace(/\s+/g, "")}` },
  ...links.filter((l) => l.label === "Email" || l.label === "GitHub" || l.label === "LinkedIn"),
];

export function Contact() {
  return (
    <SectionShell id="contact" title="Get in touch">
      <Reveal className="max-w-xl">
        <p className="mb-8 text-dim">{profile.contactNote}</p>
        <div className="flex flex-wrap gap-3">
          {contactLinks.map((link, i) => {
            const external = link.href.startsWith("http");
            return (
              <Magnetic key={link.label}>
                <a
                  href={link.href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={
                    i === 0
                      ? "inline-flex items-center gap-2 rounded-lg border border-accent bg-accent px-5 py-3 text-sm font-semibold text-[#04140d] transition-colors hover:border-[#93c5fd] hover:bg-[#93c5fd]"
                      : "rounded-lg border border-white/25 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                  }
                >
                  <TextRoll>{link.label}</TextRoll>
                </a>
              </Magnetic>
            );
          })}
        </div>
      </Reveal>
    </SectionShell>
  );
}
