import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Experience } from "@/components/experience";
import { Work } from "@/components/work";
import { Education } from "@/components/education";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { CursorGlow } from "@/components/cursor-glow";
import { CareerChat } from "@/components/career-chat";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Work />
        <Education />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <CursorGlow />
      <CareerChat />
    </>
  );
}
