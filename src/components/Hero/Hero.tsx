import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      tl.from(
        ".hero-tagline",
        {
          x: -20,
          opacity: 0,
          duration: 0.8,
        }
      )
        .from(
          ".hero-title-line",
          {
            y: 80,
            opacity: 0,
            stagger: 0.18,
            duration: 1.2,
          },
          "-=0.5"
        )
        .from(
          ".hero-desc-box",
          {
            y: 40,
            opacity: 0,
            duration: 0.9,
          },
          "-=0.6"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pt-28 pb-8 sm:pb-6 px-6 sm:px-10 lg:px-6 max-w-[1720px] mx-auto select-none"
    >

      {/* Main Grid: Left Titles (Bottom-Left) & Right Paragraph/Button (Bottom-Right) */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-end gap-8 lg:gap-10">

        {/* Left Column: Monumental Titles (Bottom-Left) */}
        <div className="w-full lg:w-[56%] flex flex-col justify-end items-start text-[#F8EEE4] font-semibold ">
          <span className="hero-tagline font-serif italic text-0.5xl sm:text-1xl lg:text-2xl text-[#F8EEE4] tracking-tight block mb-8 pl-1">
            (self-taught)
          </span>

          <div className="hero-title-line">
            <h1 className=" flex items-baseline gap-2 sm:gap-4">
              <span className="font-monumental text-[33vw] sm:text-[9.5vw] lg:text-[16.5vw] uppercase tracking-[0.002em]">Engineer</span>
              <span className="font-serif font-semibold text-[2rem] text-[#F3DBC7] tracking-tighter leading-none">
                &
              </span>
            </h1>
          </div>

          <div className="hero-title-line leading-10 mt-10">
            <h1 className="font-monumental text-[33vw] sm:text-[9.5vw] lg:text-[16.5vw] uppercase tracking-[0.002em]">
              Psychologist
            </h1>
          </div>
        </div>

        {/* Right Column: Bio Paragraph & Contact Button (40% Width) */}
        <div className="w-full lg:w-[40%] flex flex-col items-start lg:items-end justify-end space-y-6 pb-2 sm:pb-3">
          <div className="hero-desc-box w-full space-y-3 text-left">
            <p className="w-full font-sans font-medium text-base sm:text-lg lg:text-[1.75rem] uppercase tracking-tight text-[#F8EEE4] leading-[1.3] indent-12 sm:indent-16 lg:indent-20">
              I AM A SELF-TAUGHT SOFTWARE ENGINEER WITH A BACKGROUND IN PSYCHOLOGY. I COMBINE SOFTWARE ENGINEERING WITH COGNITIVE PRINCIPLES TO BUILD PRACTICAL TOOLS ACROSS MOBILE, WEB, AND EMBEDDED SYSTEMS.
            </p>
          </div>

          {/* Rounded Pill Contact Button */}
          {/* <div className="pt-2 w-full lg:w-auto flex justify-start lg:justify-end">
            <a
              href="#footer"
              className="magnetic-btn group relative inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-white/60 hover:border-white bg-[#0a0a0a]/60 backdrop-blur-md text-[#f5f5f5] overflow-hidden transition-all duration-300 font-sans text-xs sm:text-sm uppercase tracking-widest font-bold shadow-xl"
            >
              <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-200">
                CONTACT ME
              </span>
              <div className="marquee-overlay absolute inset-0 bg-[#f5f5f5] text-[#0a0a0a] flex items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="marquee-track flex whitespace-nowrap animate-marquee font-bold">
                  <span className="px-3">Contact me •</span>
                  <span className="px-3">Contact me •</span>
                  <span className="px-3">Contact me •</span>
                  <span className="px-3">Contact me •</span>
                </div>
              </div>
            </a>
          </div> */}
        </div>

      </div>

    </section>
  );
};

export default Hero;
