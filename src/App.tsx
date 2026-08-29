import React, { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppBar from "./AppBar/header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Cases, { CaseItemData } from "./components/Cases/Cases";
import CaseModal from "./components/CaseModal/CaseModal";
import CtaBanner from "./components/CTA/CtaBanner";
import Featured from "./components/Featured/Featured";
import Footer from "./components/Footer/Footer";
import ProjectsDrawer from "./components/Drawers/ProjectsDrawer";
import CreditsDrawer from "./components/Drawers/CreditsDrawer";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const [activeCase, setActiveCase] = useState<CaseItemData | null>(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
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

    // 2. Parallax motion for the 120vh background image:
    // Scrolls the extra 20% height during initial scroll and halts in place while rest of site continues.
    const ctx = gsap.context(() => {
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          y: "-20vh",
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    // Stop Lenis scroll when modals or drawers are open
    if (activeCase || isProjectsOpen || isCreditsOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      ctx.revert();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [activeCase, isProjectsOpen, isCreditsOpen]);

  return (
    <div className="bg-[#0a0a0a] text-[#f5f5f5] min-h-screen selection:bg-[#F3DBC7] selection:text-[#0a0a0a] relative">
      {/* Global Fixed Renaissance Fresco Background Under Entire Site with Parallax Motion */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          ref={bgImageRef}
          src="/images/hero-renaissance.jpg"
          alt="Renaissance artwork background"
          className="w-full h-[120vh] max-w-none object-cover object-top filter brightness-[0.75] contrast-[1.05] will-change-transform"
        />
        {/* Atmosphere Vignettes & Contrast Overlays */}
        {/* <div className="absolute inset-0 bg-[#0a0a0a]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50" /> */}
      </div>

      {/* Floating Pill App Bar Header */}
      <AppBar
        onOpenProjects={() => setIsProjectsOpen(true)}
      />

      {/* Main Content Sections Scrolling Over Fixed Background */}
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Cases onSelectCase={(item) => setActiveCase(item)} />
        <CtaBanner onOpenProjects={() => setIsProjectsOpen(true)} />
        <Featured />
        <Footer onOpenCredits={() => setIsCreditsOpen(true)} />
      </main>

      {/* Interactive Case Study Detail Modal */}
      <CaseModal activeCase={activeCase} onClose={() => setActiveCase(null)} />

      {/* Slide-out Drawers */}
      <ProjectsDrawer isOpen={isProjectsOpen} onClose={() => setIsProjectsOpen(false)} />
      <CreditsDrawer isOpen={isCreditsOpen} onClose={() => setIsCreditsOpen(false)} />
    </div>
  );
};

export default App;
