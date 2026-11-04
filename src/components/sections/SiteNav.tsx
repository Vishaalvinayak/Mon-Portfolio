import { profile } from "@/content/resume";
import { TextRoll } from "@/components/motion/TextRoll";

const NAV = [
  ["About", "#about"],
  ["Work", "#projects"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Achievements", "#certifications"],
  ["Contact", "#contact"],
] as const;

// Sits over the top of the hero (absolute), so the pinned hero stage can start at the very top.
export function SiteNav() {
  return (
    <nav className="absolute inset-x-0 top-0 z-30 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-[clamp(20px,5vw,64px)] py-6 text-[13px] text-ink-soft">
      <span className="inline-flex items-center">
        <span className="font-semibold text-ink">{profile.name}</span>
        <span className="work-dot" aria-hidden="true" />
        <span className="work-text">{profile.availability}</span>
      </span>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {NAV.map(([label, href]) => (
          <a key={href} href={href} className="transition-colors hover:text-brass-ink">
            <TextRoll>{label}</TextRoll>
          </a>
        ))}
      </div>
    </nav>
  );
}
