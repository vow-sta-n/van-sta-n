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
  linkText?: string;
  secondaryLink?: string;
  secondaryLinkText?: string;
}

export const CASES_DATA: CaseItemData[] = [
  {
    id: "1",
    title: "ALGA",
    tag: "01 / ENTERPRISE HRMS & PAYROLL",
    category: "SELECTED CASE 01",
    desc: "End-to-end mobile front-end architecture for OrbidX's enterprise B2B HRMS and payroll platform built with Flutter. Engineered biometric hardware telemetry, real-time geo-attendance tracking, punch-violation notifications, shift scheduling, and granular payroll reporting. Published on both Apple App Store and Google Play Store.",
    disciplines: "FLUTTER, DART, REST APIS, BIOMETRICS",
    awards: "APP STORE & PLAY STORE DEPLOYED",
    img: `${import.meta.env.BASE_URL}images/case-alga.jpg`,
    link: "https://apps.apple.com/us/app/alga/id6747277841",
    linkText: "VIEW ON APP STORE ↗",
    secondaryLink: "https://play.google.com/store/apps/details?id=com.orbidx.algas&hl=en_SG",
    secondaryLinkText: "VIEW ON GOOGLE PLAY ↗",
  },
  {
    id: "2",
    title: "CHLORO IOT",
    tag: "02 / INDUSTRIAL IOT & BLE CONFIGURATOR",
    category: "SELECTED CASE 02",
    desc: "A Flutter-based industrial IoT hardware configurator and live telemetry dashboard. Pairs seamlessly with smart industrial devices over Bluetooth Low Energy (BLE) protocols, giving on-site technicians and engineers real-time parameter tuning, field diagnostics, and high-frequency sensor telemetry streaming.",
    disciplines: "FLUTTER, BLE, EMBEDDED C/C++, IOT",
    awards: "ORBIDX INDUSTRIAL PRODUCTION",
    img: `${import.meta.env.BASE_URL}images/case-chloroiot.jpg`,
    link: "https://play.google.com/store/apps/details?id=com.orbidx.chloroiot",
    linkText: "VIEW ON GOOGLE PLAY ↗",
  },
  {
    id: "3",
    title: "CHLORO X",
    tag: "03 / MANUFACTURING EXECUTION SYSTEM",
    category: "SELECTED CASE 03",
    desc: "Industrial Manufacturing Execution System (MES) and statistical analytics platform. Designed following an on-site manufacturing workflow study in Indonesia, transforming operator constraints into high-efficiency data-entry flows, real-time machine telemetry, and actionable factory KPI dashboards.",
    disciplines: "FLUTTER, INDUSTRIAL MES, HCI, ANALYTICS",
    awards: "INTERNATIONAL INDUSTRIAL DEPLOYMENT",
    img: `${import.meta.env.BASE_URL}images/case-chlorox.jpg`,
    link: "https://play.google.com/store/apps/details?id=com.orbidx.chlorox",
    linkText: "VIEW ON GOOGLE PLAY ↗",
  },
  {
    id: "4",
    title: "SNAPTAG",
    tag: "04 / SPATIAL CAMERA & GEOTAGGING",
    category: "SELECTED CASE 04",
    desc: "Open-source, high-precision GPS camera application that stamps real-time location, live satellite and street map tiles, altitude, weather metrics, and tamper-proof EXIF coordinates directly onto captured imagery. Engineered with Flutter, Camera2 API, and offline spatial caching for surveyors and researchers.",
    disciplines: "FLUTTER, CAMERA2, GIS / MAPS, BLOC",
    awards: "OPEN SOURCE • GPL V3 • GOOGLE PLAY",
    img: `${import.meta.env.BASE_URL}images/case-snaptag.jpg`,
    link: "https://play.google.com/store/apps/details?id=com.novaturients.snaptag&hl=en_IN",
    linkText: "VIEW ON GOOGLE PLAY ↗",
    secondaryLink: "https://github.com/vow-sta-n/snaptag",
    secondaryLinkText: "VIEW ON GITHUB ↗",
  },
  {
    id: "5",
    title: "PDF HAWK",
    tag: "05 / LOCAL-FIRST PDF WORKSPACE",
    category: "SELECTED CASE 05",
    desc: "Lightweight (~10 MB), privacy-first cross-platform document utility built with Flutter. Delivers instant multi-page PDF rendering, rich Quill document authoring, page manipulation (split, merge, reorder), document scanning, and vector signatures—all executed 100% locally on-device without cloud telemetry.",
    disciplines: "FLUTTER, DART, PDF RENDERING, OFFLINE-FIRST",
    awards: "POLYFORM NONCOMMERCIAL • OPEN SOURCE",
    img: `${import.meta.env.BASE_URL}images/case-pdfhawk.jpg`,
    link: "https://github.com/vow-sta-n/pdf-hawk",
    linkText: "VIEW ON GITHUB ↗",
  },
  {
    id: "6",
    title: "FLUTTER DA VINCI",
    tag: "06 / FIGMA PLUGIN & CODE ENGINE",
    category: "SELECTED CASE 06",
    desc: "A Figma Community developer tool that parses vector paths, complex bezier curves, and auto-layouts directly into production-grade Dart CustomPainter code and Flutter widget trees with a single click, bridging vector graphic design and procedural Flutter rendering.",
    disciplines: "FIGMA API, TYPESCRIPT, FLUTTER, DART",
    awards: "FIGMA COMMUNITY • MIT LICENSE",
    img: `${import.meta.env.BASE_URL}images/case-davinci.jpg`,
    link: "https://www.figma.com/community/plugin/1563794532123885981/flutter-da-vinci-vector-to-custompainter",
    linkText: "VIEW ON FIGMA COMMUNITY ↗",
    secondaryLink: "https://github.com/vow-sta-n/Flutter-Da-Vinci",
    secondaryLinkText: "VIEW ON GITHUB ↗",
  },
];

// Asymmetric grid positioning configs matching editorial reference layout
const CASE_LAYOUTS = [
  // 1. Alga: Title Left (cols 1-5), Image Right (cols 5-11)
  {
    textWrapper: "lg:col-span-5 xl:col-span-4 lg:col-start-1 xl:col-start-1",
    imgWrapper: "lg:col-span-6 xl:col-span-6 lg:col-start-6 xl:col-start-5",
    textOrder: "order-2 lg:order-1",
    imgOrder: "order-1 lg:order-2",
  },
  // 2. Chloro IoT: Image Left (cols 2-6), Title Right (cols 7-11)
  {
    textWrapper: "lg:col-span-5 xl:col-span-5 lg:col-start-7 xl:col-start-7",
    imgWrapper: "lg:col-span-5 xl:col-span-5 lg:col-start-2 xl:col-start-2",
    textOrder: "order-2 lg:order-2",
    imgOrder: "order-1 lg:order-1",
  },
  // 3. Chloro X: Image Center (cols 5-9), Title Right (cols 9-12)
  {
    textWrapper: "lg:col-span-4 xl:col-span-3 lg:col-start-10 xl:col-start-9",
    imgWrapper: "lg:col-span-5 xl:col-span-4 lg:col-start-5 xl:col-start-5",
    textOrder: "order-2 lg:order-2",
    imgOrder: "order-1 lg:order-1",
  },
  // 4. SnapTag: Title Center (cols 5-7), Image Right (cols 8-12)
  {
    textWrapper: "lg:col-span-4 xl:col-span-3 lg:col-start-5 xl:col-start-5",
    imgWrapper: "lg:col-span-5 xl:col-span-5 lg:col-start-8 xl:col-start-8",
    textOrder: "order-2 lg:order-1",
    imgOrder: "order-1 lg:order-2",
  },
  // 5. PDF Hawk: Title Left (cols 2-4), Image Center-Right (cols 5-10)
  {
    textWrapper: "lg:col-span-3 xl:col-span-3 lg:col-start-2 xl:col-start-2",
    imgWrapper: "lg:col-span-6 xl:col-span-6 lg:col-start-5 xl:col-start-5",
    textOrder: "order-2 lg:order-1",
    imgOrder: "order-1 lg:order-2",
  },
  // 6. Flutter Da Vinci: Image Left (cols 1-6), Title Right (cols 7-12)
  {
    textWrapper: "lg:col-span-5 xl:col-span-5 lg:col-start-7 xl:col-start-7",
    imgWrapper: "lg:col-span-6 xl:col-span-6 lg:col-start-1 xl:col-start-1",
    textOrder: "order-2 lg:order-2",
    imgOrder: "order-1 lg:order-1",
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