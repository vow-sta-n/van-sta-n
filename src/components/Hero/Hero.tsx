import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroBgRef = useRef<HTMLImageElement | null>(null);

  const now = new Date();
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const currentMonth = monthNames[now.getMonth()];
  const currentDay = String(now.getDate()).padStart(2, "0");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1.2 } });

      tl.from(".hero-date-widget", {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".hero-creative-tag",
          {
            x: -20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-title-line",
          {
            y: 80,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
          },
          "-=0.4"
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

      if (heroBgRef.current && heroRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-10 lg:px-16 max-w-[1720px] mx-auto overflow-hidden select-none"
    >
      {/* Renaissance Oil Painting Parallax Background Plane */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          ref={heroBgRef}
          src="/images/hero-renaissance.jpg"
          alt="Renaissance ceiling fresco"
          className="w-full h-[125%] object-cover -translate-y-8 scale-105 filter brightness-90 contrast-105"
        />
        {/* Subtle Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/50" />
      </div>

      {/* Top Right Availability & Live Date Widget */}
      <div className="w-full flex justify-end items-start pt-2 sm:pt-4">
        <div className="hero-date-widget flex items-center gap-3 sm:gap-4 text-[#F8EEE4] drop-shadow-md">
          {/* Rotating Sun / Star Glyph */}
          <div className="w-7 h-7 sm:w-10 sm:h-10 text-[#F3DBC7] animate-spin-slow flex-shrink-0">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50 0 L58 35 L93 20 L73 50 L93 80 L58 65 L50 100 L42 65 L7 80 L27 50 L7 20 L42 35 Z" />
            </svg>
          </div>

          {/* Huge Date Display */}
          <div className="font-serif italic font-black text-6xl sm:text-8xl lg:text-9xl leading-none tracking-tighter text-[#F8EEE4]">
            {currentDay}
          </div>

          {/* Month & Status */}
          <div className="flex flex-col justify-center text-left pl-1">
            <span className="font-serif italic text-xl sm:text-3xl lg:text-4xl text-[#F8EEE4] leading-none mb-1 lowercase">
              {currentMonth}
            </span>
            <span className="font-sans text-[10px] sm:text-xs uppercase tracking-wider text-white/80 font-bold leading-tight">
              available
              <br />
              for work
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Titles & Right Paragraph/Button */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto pt-6 pb-4">
        
        {/* Left Column: Huge Monumental Condensed Titles */}
        <div className="lg:col-span-7 flex flex-col justify-end">
          <span className="hero-creative-tag font-serif italic text-2xl sm:text-4xl lg:text-5xl text-[#F8EEE4] tracking-tight block mb-0 pl-1">
            creative
          </span>

          <div className="hero-title-line flex items-baseline leading-none">
            <h1 className="font-monumental text-[22vw] sm:text-[18vw] lg:text-[15vw] font-extrabold text-[#F8EEE4] tracking-[-0.04em] leading-[0.82] drop-shadow-lg">
              DESIGNER
            </h1>
            <span className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[#F3DBC7] ml-2 lg:ml-4 font-normal">
              &
            </span>
          </div>

          <div className="hero-title-line leading-none mt-1 sm:mt-2">
            <h1 className="font-monumental text-[22vw] sm:text-[18vw] lg:text-[15vw] font-extrabold text-[#F8EEE4] tracking-[-0.04em] leading-[0.82] drop-shadow-lg">
              DEVELOPER
            </h1>
          </div>
        </div>

        {/* Right Column: Bio Paragraph & Contact Button */}
        <div className="lg:col-span-5 flex flex-col items-start lg:items-end justify-end space-y-6 lg:pl-6 pb-2 sm:pb-4">
          <div className="hero-desc-box space-y-3 max-w-lg text-left lg:text-left">
            <p className="font-sans font-extrabold text-base sm:text-lg lg:text-xl uppercase tracking-tight text-[#F8EEE4] leading-[1.3] drop-shadow-md">
              I AM A DEVELOPER AND UX/UI DESIGNER BASED IN ITALY. I HAVE MANY YEARS OF EXPERIENCE IN CONSULTING IN ALL AREAS OF DIGITAL. I LOVE MINIMAL AND BRUTALIST DESIGN. I LOVE NATURE, PIZZA AND ART.
            </p>
          </div>

          {/* Rounded Pill Contact Button */}
          <div className="pt-2 w-full lg:w-auto flex justify-start lg:justify-end">
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
          </div>
        </div>

      </div>

      {/* Subtle bottom divider */}
      <div className="w-full h-[1px] bg-white/10 mt-4" />
    </section>
  );
};

export default Hero;
