import { IntroSequence } from "@/components/intro/IntroSequence";
import { SiteNav } from "@/components/sections/SiteNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

// Server component: the whole site is in the HTML; the intro just overlays it.
// The order of the sections below sets the scroll order AND the 01/02/... numbers (a CSS
// counter in globals.css), so SiteNav's link order should always match it.
// Tone rhythm: hero dark → About dark-to-ivory → Work dark → Skills…Achievements light → Contact dark.
export default function Home() {
  return (
    <>
      <IntroSequence />
      <main id="site">
        <SiteNav />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
