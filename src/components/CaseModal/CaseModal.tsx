import React from "react";
import { CaseItemData } from "../Cases/Cases";

interface CaseModalProps {
  activeCase: CaseItemData | null;
  onClose: () => void;
}

const CaseModal: React.FC<CaseModalProps> = ({ activeCase, onClose }) => {
  if (!activeCase) return null;

  return (
    <div
      id="case-modal"
      className="fixed inset-0 z-[10000] bg-[#0a0a0a] overflow-y-auto opacity-100 transition-opacity duration-300"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 py-16 min-h-screen flex flex-col justify-between">
        {/* Top Action Bar with Hand-Drawn SVG Back Button */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={onClose}
            className="group flex items-center gap-4 text-white hover:text-[#F3DBC7] transition-colors font-mono text-xs uppercase tracking-widest cursor-pointer"
          >
            <svg
              width="60"
              height="24"
              viewBox="0 0 60 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="group-hover:-translate-x-2 transition-transform"
            >
              <path
                d="M58 12H4M4 12L15 2M4 12L15 22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>BACK TO CASES</span>
          </button>
          <div className="font-mono text-xs text-white/40 uppercase tracking-wider">
            {activeCase.category}
          </div>
        </div>

        {/* Case Detail Content */}
        <div className="space-y-12 my-auto py-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#F3DBC7] block">
              {activeCase.tag}
            </span>
            <h2 className="font-display text-4xl sm:text-7xl font-extrabold uppercase tracking-tight text-white">
              {activeCase.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
              <img
                src={activeCase.img}
                alt={activeCase.title}
                className="w-full aspect-[16/10] object-cover"
              />
            </div>
            <div className="lg:col-span-4 space-y-6">
              <p className="font-sans text-white/80 text-lg leading-relaxed">
                {activeCase.desc}
              </p>
              <div className="border-t border-white/10 pt-4 space-y-2 font-mono text-xs uppercase tracking-wider text-white/60">
                <div className="flex justify-between">
                  <span>DISCIPLINES</span>
                  <span className="text-white">{activeCase.disciplines}</span>
                </div>
                <div className="flex justify-between">
                  <span>AWARDS</span>
                  <span className="text-[#F3DBC7]">{activeCase.awards}</span>
                </div>
              </div>
              <a
                href={activeCase.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full py-4 rounded-full bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-[#F3DBC7] transition-colors shadow-lg"
              >
                VIEW CASE ON BEHANCE ↗
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-white/10 flex justify-between font-mono text-xs uppercase text-white/40">
          <span>VAN STAN PORTFOLIO ARCHIVE</span>
          <span>✦ CRAFTED WITH DISCIPLINE</span>
        </div>
      </div>
    </div>
  );
};

export default CaseModal;
