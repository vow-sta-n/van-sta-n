import React from "react";

interface CtaBannerProps {
  onOpenProjects: () => void;
}

const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenProjects }) => {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-[1720px] mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/[0.02] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-xl">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">
            Yes, these are some buttons
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-bold uppercase tracking-tight text-white">
            Ready to create something remarkable?
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a
            href="mailto:hello@vanstan.dev?subject=🤝%20Project%20Inquiry%20-%20Let's%20Talk"
            className="magnetic-btn group relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 hover:border-white bg-[#0a0a0a] text-[#f5f5f5] overflow-hidden transition-all duration-300 font-mono text-xs uppercase tracking-widest"
          >
            <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-200">
              Contact me
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

          <button
            onClick={onOpenProjects}
            className="magnetic-btn group relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/10 hover:border-white/40 bg-white/5 text-white/80 hover:text-white overflow-hidden transition-all duration-300 font-mono text-xs uppercase tracking-widest cursor-pointer"
          >
            <span className="relative z-10 group-hover:opacity-0 transition-opacity duration-200">
              SEE OTHER CASES
            </span>
            <div className="marquee-overlay absolute inset-0 bg-[#F3DBC7] text-[#0a0a0a] flex items-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="marquee-track flex whitespace-nowrap animate-marquee font-bold">
                <span className="px-3">Archive •</span>
                <span className="px-3">Archive •</span>
                <span className="px-3">Archive •</span>
                <span className="px-3">Archive •</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
