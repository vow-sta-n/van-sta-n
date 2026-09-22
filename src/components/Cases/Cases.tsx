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
    title: "BARBARA SCERBO",
    tag: "01 / ART DIRECTION & DEV",
    category: "SELECTED CASE 01",
    desc: "A bespoke digital showcase engineered for high-fashion photography and avant-garde art direction. Featuring custom typography choreography, smooth kinetic gallery transitions, and brutalist framing.",
    disciplines: "UX/UI DESIGN, DEVELOPMENT",
    awards: "06 HONORS & RECOGNITIONS",
    img: `${import.meta.env.BASE_URL}images/case-1.jpg`,
    link: "https://behance.net",
  },
  {
    id: "2",
    title: "BEATRICE CORTESE",
    tag: "02 / ECOMMERCE & BRAND",
    category: "SELECTED CASE 02",
    desc: "A tailored digital cellar experience designed for an esteemed Italian artisan winemaking house. Rich atmospheric storytelling, interactive vintage archives, and award-winning minimalist elegance.",
    disciplines: "UX/UI DESIGN, DEVELOPMENT",
    awards: "WEBSITE OF THE DAY • 06 AWARDS",
    img: `${import.meta.env.BASE_URL}images/case-2.jpg`,
    link: "https://behance.net",
  },
  {
    id: "3",
    title: "VICEVERSA",
    tag: "03 / FINTECH PLATFORM",
    category: "SELECTED CASE 03",
    desc: "Tailored user-friendly and high-contrast UX/UI architecture for Viceversa's revenue-based financing platform. Empowering fast-growing digital businesses with clear data insights.",
    disciplines: "UX/UI DESIGN",
    awards: "FINTECH LEADER 2024",
    img: `${import.meta.env.BASE_URL}images/case-3.jpg`,
    link: "https://behance.net",
  },
  {
    id: "4",
    title: "CODEWAY CH",
    tag: "04 / CREATIVE TECH",
    category: "SELECTED CASE 04",
    desc: "A dynamic brutalist website blending algorithmic software engineering with interactive 3D mechanics and WebGL canvas interactions to elevate their global brand identity.",
    disciplines: "UX/UI DESIGN, DEVELOPMENT",
    awards: "FWA OF THE DAY • SPECIAL KUDOS",
    img: `${import.meta.env.BASE_URL}images/case-4.jpg`,
    link: "https://behance.net",
  },
  {
    id: "5",
    title: "MIRANDA",
    tag: "05 / VISUAL IDENTITY",
    category: "SELECTED CASE 05",
    desc: "A catchy, high-impact creative portfolio spotlighting prowess in graphic design, experimental typography, and geometric poster systems with fluid interactive reveals.",
    disciplines: "UX/UI DESIGN",
    awards: "MOBILE EXCELLENCE • CSSDA",
    img: `${import.meta.env.BASE_URL}images/case-5.jpg`,
    link: "https://behance.net",
  },
];

// Asymmetric grid positioning configs matching editorial reference layout
const CASE_LAYOUTS = [
  // 1. Barbara Scerbo: Title Left (cols 1-5), Image Right (cols 5-11)
  {
    textWrapper: "lg:col-span-5 xl:col-span-4 lg:col-start-1 xl:col-start-1",
    imgWrapper: "lg:col-span-6 xl:col-span-6 lg:col-start-6 xl:col-start-5",
    textOrder: "order-2 lg:order-1",
    imgOrder: "order-1 lg:order-2",
  },
  // 2. Beatrice Cortese: Image Left (cols 2-6), Title Right (cols 7-11)
  {
    textWrapper: "lg:col-span-5 xl:col-span-5 lg:col-start-7 xl:col-start-7",
    imgWrapper: "lg:col-span-5 xl:col-span-5 lg:col-start-2 xl:col-start-2",
    textOrder: "order-2 lg:order-2",
    imgOrder: "order-1 lg:order-1",
  },
  // 3. Viceversa: Image Center (cols 5-9), Title Right (cols 9-12)
  {
    textWrapper: "lg:col-span-4 xl:col-span-3 lg:col-start-10 xl:col-start-9",
    imgWrapper: "lg:col-span-5 xl:col-span-4 lg:col-start-5 xl:col-start-5",
    textOrder: "order-2 lg:order-2",
    imgOrder: "order-1 lg:order-1",
  },
  // 4. Codeway CH: Title Center (cols 5-7), Image Right (cols 8-12)
  {
    textWrapper: "lg:col-span-4 xl:col-span-3 lg:col-start-5 xl:col-start-5",
    imgWrapper: "lg:col-span-5 xl:col-span-5 lg:col-start-8 xl:col-start-8",
    textOrder: "order-2 lg:order-1",
    imgOrder: "order-1 lg:order-2",
  },
  // 5. Miranda: Title Left (cols 2-4), Image Center-Right (cols 5-10)
  {
    textWrapper: "lg:col-span-3 xl:col-span-3 lg:col-start-2 xl:col-start-2",
    imgWrapper: "lg:col-span-6 xl:col-span-6 lg:col-start-5 xl:col-start-5",
    textOrder: "order-2 lg:order-1",
    imgOrder: "order-1 lg:order-2",
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
      className="py-24 sm:py-36 pl-[15%] max-w-[1720px] mx-auto"
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-20 sm:mb-32 gap-6">
        <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#F3DBC7] uppercase mb-3">
          <div className="star-icon w-4 h-4 animate-spin-slow">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
          <h2 className="font-sans text-[2rem] sm:text-[2rem] font-medium tracking-tight">
            SELECTED CASES
          </h2>
        </div>
      </div>

      {/* Asymmetric Editorial Grid Container */}
      <div className="space-y-25 sm:space-y-30 lg:space-y-28">
        {CASES_DATA.map((item, index) => {
          const layout = CASE_LAYOUTS[index % CASE_LAYOUTS.length];

          return (
            <div
              key={item.id}
              onClick={() => onSelectCase(item)}
              className="case-item grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center cursor-pointer group select-none"
            >
              {/* Typography Block: Title + Subtitle */}
              <div className={`${layout.textWrapper} ${layout.textOrder} space-y-2`}>
                <h3 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-[0.01em] uppercase leading-[0.88] text-white ">
                  {item.title}
                </h3>
                <p className="font-sans font-medium text-[16px] tracking-widest text-white/70 uppercase">
                  {item.disciplines}
                </p>
              </div>

              {/* Clean Image Block */}
              <div className={`${layout.imgWrapper} ${layout.imgOrder}`}>
                <div className="overflow-hidden aspect-[16/8] relative bg-neutral-900 transition-transform duration-700 ease-out group-hover:scale-[0.96] origin-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="case-img w-full h-full object-cover filter grayscale contrast-110  group-hover:scale-110 transition-all duration-700 ease-out"
                  />
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

// group-hover:grayscale-0