import type { CSSProperties, ElementType } from "react";

interface MaskLinesProps {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number; // seconds before the first line
  stagger?: number; // seconds between lines
  /** false when an ancestor with data-reveal already controls the reveal (About). */
  reveal?: boolean;
}

/** Headline whose lines slide up out of a clipping mask, one after another. */
export function MaskLines({ lines, as: Tag = "span", className, delay = 0, stagger = 0.1, reveal = true }: MaskLinesProps) {
  return (
    <Tag className={className} aria-label={lines.join(" ")} {...(reveal ? { "data-reveal": "mask" } : {})}>
      {lines.map((line, i) => (
        <span key={line} className="mask-line">
          <span style={{ "--d": `${delay + i * stagger}s` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}
