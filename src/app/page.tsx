import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import SkillsMarquee from "@/components/SkillsMarquee";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectGrid from "@/components/ProjectGrid";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col min-h-screen">
      <HeroSection />
      <AboutSection />
      <SkillsMarquee />
      <SkillsSection />
      <ExperienceSection />
      <ProjectGrid />
      <ContactSection />
      <Footer />
    </main>
  );
}
