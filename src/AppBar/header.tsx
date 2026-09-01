import React, { useState, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./header.css";

interface AppBarProps {
  onOpenProjects?: () => void;
}

const AppBar: React.FC<AppBarProps> = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [blurRatio, setBlurRatio] = useState(0);

  useEffect(() => {
    // 1. GSAP ScrollTrigger listener (synced with Lenis RAF)
    const st = ScrollTrigger.create({
      start: "top top",
      end: "max",
      onUpdate: (self) => {
        setScrollProgress(self.progress * 100);
        const scrollY = self.scroll();
        const ratio = Math.min(1, Math.max(0, scrollY / 100));
        setBlurRatio(ratio);
      },
    });

    // 2. Window scroll listener fallback
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      const ratio = Math.min(1, Math.max(0, scrollY / 100));
      setBlurRatio(ratio);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      st.kill();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      id="header"
      className="fixed top-0 left-0 right-0 z-50 w-full"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${blurRatio * 0.09})`,
        backdropFilter: blurRatio > 0 ? `blur(${blurRatio * 8}px)` : "none",
        WebkitBackdropFilter: blurRatio > 0 ? `blur(${blurRatio * 8}px)` : "none",
        transition: "background-color 150ms ease-out, backdrop-filter 150ms ease-out, -webkit-backdrop-filter 150ms ease-out",
      }}
      role="banner"
    >
      <div className="max-w-[1720px] h-16 mx-auto px-6 sm:px-10 lg:px-8 flex items-center justify-between">
        {/* Brand Title Area */}
        <div className="flex items-center">
          <a
            href="#hero"
            className="group flex items-center gap-2 text-[#F8EEE4] hover:text-[#F3DBC7] transition-colors"
            aria-label="Van Stan - Home"
          >
            <span className="font-sans font-bold text-sm sm:text-base tracking-tight uppercase">
              Van Stan
            </span>
          </a>
          <span className="hidden sm:inline-block font-sans font-medium text-xs sm:text-sm text-[#F8EEE4]/60 uppercase tracking-wider pl-4 sm:pl-6 ml-4 sm:ml-6 border-l border-white/20">
            UX/UI Designer, Developer
          </span>
        </div>

        {/* Navigation Links with Strike-Through Hover/Focus Animation */}
        <nav id="main-menu" className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs font-medium" aria-label="Main Navigation">
          <a
            href="#cases"
            className="relative font-sans uppercase tracking-widest text-[#F8EEE4]/80 hover:text-white focus:text-[#F3DBC7] focus:outline-none transition-colors group py-1"
          >
            <span className="relative inline-block">
              works
              <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#F3DBC7] -translate-y-1/2 scale-x-0 origin-left group-hover:scale-x-100 group-focus:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out pointer-events-none" />
            </span>
          </a>

          <a
            href="#intro"
            className="relative font-sans uppercase tracking-widest text-[#F8EEE4]/80 hover:text-white focus:text-[#F3DBC7] focus:outline-none transition-colors group py-1"
          >
            <span className="relative inline-block">
              about
              <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#F3DBC7] -translate-y-1/2 scale-x-0 origin-left group-hover:scale-x-100 group-focus:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out pointer-events-none" />
            </span>
          </a>

          <a
            href="#footer"
            className="relative font-sans uppercase tracking-widest text-[#F8EEE4]/80 hover:text-white focus:text-[#F3DBC7] focus:outline-none transition-colors group py-1"
          >
            <span className="relative inline-block">
              contact
              <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[#F3DBC7] -translate-y-1/2 scale-x-0 origin-left group-hover:scale-x-100 group-focus:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out pointer-events-none" />
            </span>
          </a>
        </nav>
      </div>

      {/* Signature Scroll Progress Indicator / Default Borderline with mx-10 */}
      <div
        className="absolute bottom-0 left-0 right-0 mx-8 h-[1px] bg-[#555555] pointer-events-none overflow-hidden rounded-full"
        role="presentation"
      >
        <div
          className="h-full w-full bg-white origin-left will-change-transform"
          style={{
            transform: `scaleX(${scrollProgress / 100})`,
            transition: "transform 120ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </header>
  );
};

export default AppBar;
