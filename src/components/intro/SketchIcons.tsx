import { createElement, type CSSProperties } from "react";

type Shape = {
  el: "rect" | "line" | "circle" | "path" | "ellipse";
  attrs: Record<string, string | number>;
  accent?: boolean;
};

// One icon per intro slide (same order as content/intro.ts).
const ICONS: Shape[][] = [
  [
    { el: "rect", attrs: { x: 10, y: 18, width: 100, height: 70, rx: 6 } },
    { el: "line", attrs: { x1: 10, y1: 34, x2: 110, y2: 34 } },
    { el: "circle", attrs: { cx: 20, cy: 26, r: 2.4 }, accent: true },
    { el: "path", attrs: { d: "M28 52 L40 62 L28 72" }, accent: true },
    { el: "line", attrs: { x1: 48, y1: 72, x2: 76, y2: 72 } },
  ],
  [
    {
      el: "path",
      attrs: {
        d: "M60 14 C34 14 16 30 16 52 C16 74 34 98 60 106 C86 98 104 74 104 52 C104 30 86 14 60 14 Z",
      },
    },
    { el: "ellipse", attrs: { cx: 60, cy: 52, rx: 22, ry: 34 } },
    { el: "line", attrs: { x1: 60, y1: 18, x2: 60, y2: 102 } },
    { el: "path", attrs: { d: "M60 52 L74 40" }, accent: true },
  ],
  [
    { el: "path", attrs: { d: "M60 12 L104 30 L60 48 L16 30 Z" } },
    { el: "path", attrs: { d: "M16 30 V60 L60 78 L104 60 V30" } },
    { el: "path", attrs: { d: "M16 60 V90 L60 108 L104 90 V60" }, accent: true },
    { el: "line", attrs: { x1: 60, y1: 48, x2: 60, y2: 78 } },
  ],
];

/** Line-art icon whose strokes draw themselves when the parent slide is active (see intro.css). */
export function SketchIcon({ index }: { index: number }) {
  return (
    <svg className="sketch" viewBox="0 0 120 120" aria-hidden="true">
      {ICONS[index].map((s, i) =>
        createElement(s.el, {
          key: i,
          ...s.attrs,
          pathLength: 100,
          className: s.accent ? "draw accent" : "draw",
          style: { "--i": i } as CSSProperties,
        }),
      )}
    </svg>
  );
}
