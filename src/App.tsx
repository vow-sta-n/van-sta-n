import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppBar from "./AppBar/header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Cases, { CaseItemData } from "./components/Cases/Cases";
import CaseModal from "./components/CaseModal/CaseModal";
import Footer from "./components/Footer/Footer";
import ProjectsDrawer from "./components/Drawers/ProjectsDrawer";
import CreditsDrawer from "./components/Drawers/CreditsDrawer";
import ParallaxBackground from "./components/ParallaxBackground/ParallaxBackground";

gsap.registerPlugin(ScrollTrigger);

interface AppProps {
  onReady?: () => void;
  isLoaded?: boolean;
}

const App: React.FC<AppProps> = ({ onReady, isLoaded = false }) => {
  const darkOverlayRef = useRef<HTMLDivElement | null>(null);
  const [activeCase, setActiveCase] = useState<CaseItemData | null>(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  // Notify parent root when App has mounted in DOM
  useEffect(() => {
    if (onReady) {
      onReady();
    }
  }, [onReady]);

  // Refresh ScrollTrigger when preloader completes and scroll unlocks
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // Lock body scroll ONLY when interactive modals or drawers are actively open
  useEffect(() => {
    if (activeCase || isProjectsOpen || isCreditsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeCase, isProjectsOpen, isCreditsOpen]);

  useEffect(() => {
    // Parallax motion & dynamic background transitions with native scroll
    const ctx = gsap.context(() => {

      if (darkOverlayRef.current) {
        const overlay = darkOverlayRef.current;
        const ease = gsap.parseEase("power1.inOut");

        let heroST: ScrollTrigger;
        let footerST: ScrollTrigger;

        const updateOverlayOpacity = () => {
          const heroProgress = heroST ? heroST.progress : 0;
          const footerProgress = footerST ? footerST.progress : 0;
          const easedHero = ease(heroProgress);
          const easedFooter = ease(footerProgress);
          // Hero fades overlay in (0 -> 1), footer fades overlay out (1 -> 0)
          const opacity = Math.max(0, Math.min(1, easedHero * (1 - easedFooter)));
          overlay.style.opacity = opacity.toFixed(4);
        };

        // Hero exit transition: slowly change background to dark grey after hero scrolls
        heroST = ScrollTrigger.create({
          trigger: "#hero",
          start: "bottom top",
          end: "+=150px",
          onUpdate: updateOverlayOpacity,
          onEnter: updateOverlayOpacity,
          onLeave: updateOverlayOpacity,
          onEnterBack: updateOverlayOpacity,
          onLeaveBack: updateOverlayOpacity,
          onRefresh: updateOverlayOpacity,
        });

        // Footer enter transition: slowly change background back to transparent when Footer enters viewport
        footerST = ScrollTrigger.create({
          trigger: "#footer",
          start: "top 85%",
          end: "top 25%",
          onUpdate: updateOverlayOpacity,
          onEnter: updateOverlayOpacity,
          onLeave: updateOverlayOpacity,
          onEnterBack: updateOverlayOpacity,
          onLeaveBack: updateOverlayOpacity,
          onRefresh: updateOverlayOpacity,
        });

        // Synchronize initial state
        updateOverlayOpacity();
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-background text-[#f5f5f5] min-h-screen selection:bg-accent selection:text-background relative">
      {/* Global Fixed Renaissance Fresco Background Under Entire Site with Parallax Motion */}
      <ParallaxBackground isLoaded={isLoaded} />

      {/* Dynamic Dark Grey Transition Overlay over Fresco */}
      <div
        ref={darkOverlayRef}
        className="fixed inset-0 pointer-events-none z-[1] bg-[#0c0c0c] opacity-0 will-change-[opacity]"
        aria-hidden="true"
      />

      {/* Floating Pill App Bar Header */}
      <AppBar
        onOpenProjects={() => setIsProjectsOpen(true)}
      />

      {/* Main Content Sections Scrolling Over Fixed Background */}
      <main id="main-content" className="relative z-10">
        <Hero isLoaded={isLoaded} />
        <div className="h-80"></div>
        <About />
        <Cases onSelectCase={(item) => setActiveCase(item)} />

        {/* <Featured /> */}
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
