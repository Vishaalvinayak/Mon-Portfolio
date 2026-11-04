import type { CSSProperties, ElementType, ReactNode } from "react";

interface RevealProps {
  children?: ReactNode;
  delay?: number; // seconds
  y?: number; // px the element rises from (variant "up")
  className?: string;
  as?: ElementType;
  /** up: fade + lift · line / line-y: a rule draws itself · wipe: clip left to right */
  variant?: "up" | "line" | "line-y" | "wipe";
}

/**
 * Fades and lifts its children into view once, when they scroll on screen.
 * Server component: it only renders attributes. The page-level <RevealController/> hides
 * below-the-fold items and reveals them, so content stays visible if JS never runs.
 */
export function Reveal({ children, delay = 0, y = 18, className, as: Tag = "div", variant = "up" }: RevealProps) {
  return (
    <Tag
      className={className}
      data-reveal={variant}
      style={{ "--d": `${delay}s`, "--y": `${y}px` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
