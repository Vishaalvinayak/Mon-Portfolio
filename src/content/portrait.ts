// content/portrait.ts
// The hero portrait. To use a different photo: drop it in /public, then change `src`
// and width/height (the file's pixel size) so the hero reserves the right shape.

export const portrait = {
  src: "/portrait.png",
  width: 765,
  height: 1024,
  alt: "Portrait of Vishaal Vinayak, photographed from behind and in profile, looking to the left against a bright backdrop",
  // Fractions of the picture's height trimmed off the top / bottom so the figure sits large in the
  // hero and bleeds off its bottom edge. (This file also carries a corner watermark in the bottom
  // strip, which the bottom crop removes.) Use 0 for no crop.
  cropTop: 0.1,
  cropBottom: 0.14,
  // "light": the photo has a white/bright background (the current one). It is multiplied onto the
  //          hero's own grey so the backdrop disappears and the subject stays untouched.
  // "dark":  the photo has a dark background; it is shown as-is on the hero.
  backdrop: "light" as "light" | "dark",
} as const;
