import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export interface CaseItemData {
  id: string;
  title: string;
  tag: string;
  category: string;
  desc: string;
  disciplines: string;
  awards: string;
  img: string;
  link: string;
}

export const CASES_DATA: CaseItemData[] = [
  {
    id: "1",
    title: "Barbara Scerbo",
    tag: "01 / ART DIRECTION & DEV",
    category: "SELECTED CASE 01",
    desc: "A bespoke digital showcase engineered for high-fashion photography and avant-garde art direction. Featuring custom typography choreography, smooth kinetic gallery transitions, and brutalist framing.",
    disciplines: "UX/UI DESIGN, FULL-STACK DEVELOPMENT",
    awards: "06 HONORS & RECOGNITIONS",
    img: "/images/case-1.jpg",
    link: "https://behance.net",
  },
  {
    id: "2",
    title: "Beatrice Cortese",
    tag: "02 / ECOMMERCE & BRAND",
    category: "SELECTED CASE 02",
    desc: "A tailored digital cellar experience designed for an esteemed Italian artisan winemaking house. Rich atmospheric storytelling, interactive vintage archives, and award-winning minimalist elegance.",
    disciplines: "CREATIVE DIRECTION, THREE.JS, ECOMMERCE",
    awards: "WEBSITE OF THE DAY • 06 AWARDS",
    img: "/images/case-2.jpg",
    link: "https://behance.net",
  },
  {
    id: "3",
    title: "Viceversa",
    tag: "03 / FINTECH PLATFORM",
    category: "SELECTED CASE 03",
    desc: "Tailored user-friendly and high-contrast UX/UI architecture for Viceversa's revenue-based financing platform. Empowering fast-growing digital businesses with clear data insights.",
    disciplines: "PRODUCT DESIGN, DESIGN SYSTEM, FRONTEND",
    awards: "FINTECH LEADER 2024",
    img: "/images/case-3.jpg",
    link: "https://behance.net",
  },
  {
    id: "4",
    title: "Codeway Tech",
    tag: "04 / CREATIVE TECH",
    category: "SELECTED CASE 04",
    desc: "A dynamic brutalist website blending algorithmic software engineering with interactive 3D mechanics and WebGL canvas interactions to elevate their global brand identity.",
    disciplines: "THREE.JS, FULL-STACK DEVELOPMENT",
    awards: "FWA OF THE DAY • SPECIAL KUDOS",
    img: "/images/case-4.jpg",
    link: "https://behance.net",
  },
  {
    id: "5",
    title: "Miranda Biondi",
    tag: "05 / VISUAL IDENTITY",
    category: "SELECTED CASE 05",
    desc: "A catchy, high-impact creative portfolio spotlighting prowess in graphic design, experimental typography, and geometric poster systems with fluid interactive reveals.",
    disciplines: "UX/UI DESIGN, MOTION DEVELOPMENT",
    awards: "MOBILE EXCELLENCE • CSSDA",
    img: "/images/case-5.jpg",
    link: "https://behance.net",
  },
];

interface CasesProps {
  onSelectCase: (caseItem: CaseItemData) => void;
}

const Cases: React.FC<CasesProps> = ({ onSelectCase }) => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = document.querySelectorAll(".case-item");
      items.forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="cases"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1720px] mx-auto border-t border-white/10"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-24 gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#F3DBC7] uppercase mb-3">
            <div className="star-icon w-4 h-4 animate-spin-slow">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
            <span>02 / PORTFOLIO</span>
          </div>
          <h2 className="font-display text-4xl sm:text-7xl font-extrabold uppercase tracking-tight">
            Selected Cases
          </h2>
        </div>
        <div className="font-mono text-xs text-white/50 uppercase tracking-widest">
          <span>[ 05 FEATURED COMMISSIONS ]</span>
        </div>
      </div>

      {/* Asymmetric Grid Container */}
      <div className="space-y-24 lg:space-y-36">
        {CASES_DATA.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={item.id}
              onClick={() => onSelectCase(item)}
              className="case-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center cursor-pointer group"
            >
              {/* Text Column */}
              <div
                className={`space-y-4 ${
                  isEven
                    ? "lg:col-span-5 order-2 lg:pl-8"
                    : "lg:col-span-5 order-2 lg:order-1"
                }`}
              >
                <span className="font-mono text-xs text-[#F3DBC7] tracking-widest uppercase">
                  {item.tag}
                </span>
                <h3 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight group-hover:text-[#F3DBC7] transition-colors">
                  {item.title}
                </h3>
                <p className="font-sans text-white/60 text-base sm:text-lg max-w-md">
                  {item.desc}
                </p>
                <div className="pt-2 flex items-center gap-4 font-mono text-xs text-white/40 uppercase tracking-wider">
                  <span>{item.disciplines.split(",")[0]}</span>
                  <span>•</span>
                  <span className="text-[#F3DBC7]">{item.awards.split("•")[0]}</span>
                </div>
              </div>

              {/* Image Column */}
              <div
                className={`overflow-hidden rounded-xl border border-white/10 bg-white/5 ${
                  isEven
                    ? "lg:col-span-7 order-1"
                    : "lg:col-span-7 order-1 lg:order-2"
                }`}
              >
                <div className="overflow-hidden aspect-[16/10] relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="case-img w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-110 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-4 right-4 bg-[#0a0a0a]/90 text-white font-mono text-xs uppercase px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-colors">
                    <span>Explore Case</span>
                    <span>↗</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Cases;
