import React, { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AppBar from "./AppBar/header";
import CustomCursor from "./components/Cursor/CustomCursor";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Cases, { CaseItemData } from "./components/Cases/Cases";
import CaseModal from "./components/CaseModal/CaseModal";
import CtaBanner from "./components/CTA/CtaBanner";
import Awards from "./components/Awards/Awards";
import Featured from "./components/Featured/Featured";
import Footer from "./components/Footer/Footer";
import ProjectsDrawer from "./components/Drawers/ProjectsDrawer";
import AwardsDrawer from "./components/Drawers/AwardsDrawer";
import CreditsDrawer from "./components/Drawers/CreditsDrawer";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const [activeCase, setActiveCase] = useState<CaseItemData | null>(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isAwardsOpen, setIsAwardsOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  useEffect(() => {
    // 1. Initialize Lenis physics scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Stop Lenis scroll when modals or drawers are open
    if (activeCase || isProjectsOpen || isAwardsOpen || isCreditsOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [activeCase, isProjectsOpen, isAwardsOpen, isCreditsOpen]);

  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5] min-h-screen selection:bg-[#F3DBC7] selection:text-[#0a0a0a] relative">
      {/* Custom Fluid Cursor */}
      <CustomCursor />

      {/* Floating Pill App Bar Header */}
      <AppBar
        onOpenProjects={() => setIsProjectsOpen(true)}
        onOpenAwards={() => setIsAwardsOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <Cases onSelectCase={(item) => setActiveCase(item)} />
        <CtaBanner onOpenProjects={() => setIsProjectsOpen(true)} />
        <Awards onOpenAwards={() => setIsAwardsOpen(true)} />
        <Featured />
        <Footer onOpenCredits={() => setIsCreditsOpen(true)} />
      </main>

      {/* Interactive Case Study Detail Modal */}
      <CaseModal activeCase={activeCase} onClose={() => setActiveCase(null)} />

      {/* Slide-out Drawers */}
      <ProjectsDrawer isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />
      <AwardsDrawer isOpen={isAwardsOpen} onClose={() => setIsAwardsOpen(false)} />
      <CreditsDrawer isOpen={isCreditsOpen} onClose={() => setIsCreditsOpen(false)} />
    </div>
  );
};

export default App;
