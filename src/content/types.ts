// content/types.ts
// Shapes for everything in resume.ts. No animation code and no imports from
// components/ — this folder is data only.

export interface Profile {
  name: string;        // display name, e.g. "Vishaal Vinayak"
  fullName: string;    // as printed on the resume
  role: string;
  status: string;      // hero status-pill text, e.g. "Open to backend & full-stack roles · 2026"
  headline: string;    // big hero line shown after the intro
  contactNote: string; // longer availability sentence, shown in the Contact section
  location: string;
  email: string;
  summary: string;
  about: string;       // the About section's introduction paragraph
  availability: string; // short nav-bar line, e.g. "Available for work"
}

export interface Link {
  label: string;
  href: string;
}

export interface Education {
  school: string;
  degree: string;
  start: string;
  end: string;
  note?: string; // e.g. "Final year" — appended after the date range
  grade: string;
  location: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface Project {
  name: string;
  tag?: string;       // e.g. "Flagship project", "In planning"
  stat?: string;      // one headline result, shown as a chip next to the tag, e.g. "96.15% test accuracy"
  featured: boolean;  // featured: chips + multi-paragraph + link. secondary: compact card.
  stack: string[];
  bullets: string[];
  links?: Link[]; // repo / live demo, add when you have them
  // Optional screenshot for a featured project. When present it scales in on scroll;
  // when absent nothing is shown (no placeholder). Put the file in /public/projects/.
  image?: { src: string; alt: string; width: number; height: number };
}

export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  bullets: string[];
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface Achievement {
  title: string;
  event: string;
  year: string;
}
