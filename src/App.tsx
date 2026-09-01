import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AppBar from "./AppBar/header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Cases, { CaseItemData } from "./components/Cases/Cases";
import CaseModal from "./components/CaseModal/CaseModal";
import Featured from "./components/Featured/Featured";
import Footer from "./components/Footer/Footer";
import ProjectsDrawer from "./components/Drawers/ProjectsDrawer";
import CreditsDrawer from "./components/Drawers/CreditsDrawer";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const bgImageRef = useRef<HTMLImageElement | null>(null);
  const darkOverlayRef = useRef<HTMLDivElement | null>(null);
  const [activeCase, setActiveCase] = useState<CaseItemData | null>(null);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);

  // Lock body scroll when modals or drawers are open
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
      if (bgImageRef.current) {
        gsap.to(bgImageRef.current, {
          y: "-50vh",
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

      if (darkOverlayRef.current) {
        // Slowly change background to dark grey ONLY after background image finishes scrolling
        gsap.to(darkOverlayRef.current, {
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#hero",
            start: "bottom top",
            end: "+=150px",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        // Slowly change background from dark grey back to transparent when Footer enters viewport
        gsap.to(darkOverlayRef.current, {
          opacity: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: "#footer",
            start: "top 85%",
            end: "top 25%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="bg-background text-[#f5f5f5] min-h-screen selection:bg-accent selection:text-background relative">
      {/* Global Fixed Renaissance Fresco Background Under Entire Site with Parallax Motion */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          ref={bgImageRef}
          src="/images/hero-renaissance.jpg"
          alt="Renaissance artwork background"
          className="w-full h-[155vh] max-w-none object-cover object-top filter brightness-[0.75] contrast-[1.05] will-change-transform"
        />
      </div>

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
        <Hero />
        <div className="h-80"></div>
        <About />
        <Cases onSelectCase={(item) => setActiveCase(item)} />

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
