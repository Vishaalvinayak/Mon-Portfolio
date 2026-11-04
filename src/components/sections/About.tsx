import { profile } from "@/content/resume";
import { AboutFill } from "@/components/motion/AboutFill";
import { SectionHeading } from "./SectionHeading";

// Static, pinned About: the paragraph fills from light to dark as you scroll (see AboutFill).
export function About() {
  return <AboutFill id="about" heading={<SectionHeading title="About" />} text={profile.about} />;
}
