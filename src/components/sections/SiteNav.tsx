import { profile } from "@/content/resume";
import { TextRoll } from "@/components/motion/TextRoll";

const NAV = [
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Achievements", "#certifications"],
  ["Contact", "#contact"],
] as const;

export function SiteNav() {
  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 px-[clamp(20px,5vw,64px)] py-6 text-sm text-dim">
      <span className="inline-flex items-center">
        <span className="font-semibold text-ink">{profile.name}</span>
        <span className="work-dot" aria-hidden="true" />
        <span className="work-text">{profile.availability}</span>
      </span>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} className="transition-colors hover:text-ink">
            <TextRoll>{label}</TextRoll>
          </a>
        ))}
      </div>
    </nav>
  );
}
