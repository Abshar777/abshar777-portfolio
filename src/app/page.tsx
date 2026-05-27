import AnnouncementBar from "@/components/AnnouncementBar";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SectionDivider from "@/components/SectionDivider";
import StatsSection from "@/components/StatsSection";
import EquipSection from "@/components/EquipSection";
import CentralizeSection from "@/components/CentralizeSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import ContactFooter from "@/components/ContactFooter";
import IntroAnimation from "@/components/IntroAnimation";

export default function Home() {
  return (
    <div className="flex flex-col bg-[#0c0c0c]">
      <IntroAnimation />
      <AnnouncementBar />
      <Nav />
      <div id="hero"><Hero /></div>
      <div className="max-md:-mt-20">
        <StatsSection />
        <EquipSection />
        <CentralizeSection />
        <div id="projects"><ProjectsSection /></div>
        <div id="experience"><TimelineSection /></div>
        <div id="contact"><ContactFooter /></div>
      </div>
    </div>
  );
}
