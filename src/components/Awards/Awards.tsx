import React from "react";

interface AwardsProps {
  onOpenAwards: () => void;
}

const AWARDS_LIST = [
  {
    award: "Website of the Day",
    platform: "CSS Design Awards",
    project: "Beatrice Cortese Wines",
  },
  {
    award: "DOTY Special Kudos",
    platform: "CSS Design Awards",
    project: "Designer of the Year",
  },
  {
    award: "Honorable Mention",
    platform: "Awwwards",
    project: "Barbara Scerbo",
  },
  {
    award: "Developer of the Day",
    platform: "FWA / CSSDA",
    project: "Codeway Tech Studio",
  },
  {
    award: "Mobile Excellence",
    platform: "Awwwards",
    project: "Miranda Biondi",
  },
];

const Awards: React.FC<AwardsProps> = ({ onOpenAwards }) => {
  return (
    <section
      id="awards"
      className="relative py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1720px] mx-auto border-t border-white/10 overflow-hidden"
    >
      {/* Large Concentric Circle Background SVG */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 -z-10 pointer-events-none opacity-20">
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="400" r="399" stroke="#F8EEE4" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="400" cy="400" r="299" stroke="#F8EEE4" strokeWidth="1" />
          <circle cx="400" cy="400" r="199" stroke="#F8EEE4" strokeWidth="1" strokeDasharray="8 8" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-end">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#F3DBC7] uppercase">
            <span>03 / RECOGNITION</span>
            <span className="h-[1px] w-12 bg-[#F3DBC7]/40" />
          </div>
          <h2 className="font-display text-3xl sm:text-6xl font-extrabold uppercase tracking-tight leading-tight">
            HONORED TO WORK WITH SPECIAL PEOPLE & I WIN AWARDS SOMETIMES
          </h2>
        </div>

        <div className="lg:col-span-4 flex lg:justify-end">
          {/* Counter Badge */}
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl shadow-lg">
            <div className="star-icon w-8 h-8 text-[#F3DBC7] animate-spin-slow">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
              </svg>
            </div>
            <div>
              <div className="font-display font-black text-3xl text-white">69</div>
              <div className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                AWARDS WON
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Awards Interactive List Table */}
      <div className="border-t border-white/10 divide-y divide-white/10 font-mono text-xs uppercase tracking-wider">
        {/* Table Header */}
        <div className="hidden sm:grid sm:grid-cols-12 py-4 text-white/40">
          <div className="col-span-5 font-bold">AWARD</div>
          <div className="col-span-4 font-bold">PLATFORM</div>
          <div className="col-span-3 font-bold text-right">PROJECT</div>
        </div>

        {/* Award Rows */}
        {AWARDS_LIST.map((item, idx) => (
          <div
            key={idx}
            className="award-row relative py-6 sm:py-7 group cursor-pointer overflow-hidden transition-colors hover:bg-white/[0.02]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 relative z-10">
              <div className="sm:col-span-5 font-sans font-bold text-lg sm:text-xl text-white group-hover:text-[#F3DBC7] transition-colors">
                {item.award}
              </div>
              <div className="sm:col-span-4 text-white/60">{item.platform}</div>
              <div className="sm:col-span-3 sm:text-right text-white/80 flex items-center sm:justify-end gap-2">
                <span>{item.project}</span>
                <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  ↗
                </span>
              </div>
            </div>

            {/* Hover Infinite Marquee Ticker */}
            <div className="award-marquee absolute inset-0 bg-[#F3DBC7] text-[#0a0a0a] flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="marquee-track flex whitespace-nowrap animate-marquee font-display font-black text-lg tracking-tight">
                <span className="px-6">
                  {item.award} • {item.platform} • {item.project} •
                </span>
                <span className="px-6">
                  {item.award} • {item.platform} • {item.project} •
                </span>
                <span className="px-6">
                  {item.award} • {item.platform} • {item.project} •
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          onClick={onOpenAwards}
          className="magnetic-btn group relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 hover:border-white bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden transition-all duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer"
        >
          <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-200">
            VIEW COMPLETE AWARDS LIST
          </span>
          <div className="marquee-overlay absolute inset-0 bg-[#f5f5f5] text-[#0a0a0a] flex items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <div className="marquee-track flex whitespace-nowrap animate-marquee font-bold">
              <span className="px-3">View More •</span>
              <span className="px-3">View More •</span>
              <span className="px-3">View More •</span>
              <span className="px-3">View More •</span>
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};

export default Awards;
