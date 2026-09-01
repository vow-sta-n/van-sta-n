import React from "react";

interface CreditsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditsDrawer: React.FC<CreditsDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md transition-opacity duration-300 flex justify-end"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-xl bg-[#111111] border-l border-white/10 p-8 sm:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
              Credits & Tech Stack
            </h3>
            <button
              onClick={onClose}
              className="font-mono text-xs uppercase text-white/60 hover:text-white cursor-pointer"
            >
              [ CLOSE ✕ ]
            </button>
          </div>

          <div className="space-y-6 font-mono text-xs uppercase leading-relaxed text-white/70">
            <div>
              <span className="block text-white font-bold mb-1">TYPOGRAPHY:</span>
              <p>Syne, Space Grotesk, Plus Jakarta Sans, Cinzel</p>
            </div>

            <div>
              <span className="block text-white font-bold mb-1">INTERACTIONS & PHYSICS:</span>
              <p>GSAP ScrollTrigger, SplitType</p>
            </div>

            <div>
              <span className="block text-white font-bold mb-1">3D ENGINE:</span>
              <p>Three.js WebGL procedural geometry & dynamic lighting</p>
            </div>

            <div>
              <span className="block text-white font-bold mb-1">ARCHITECTURE:</span>
              <p>React 18/19, TypeScript, Tailwind CSS v4, Vite</p>
            </div>

            <div>
              <span className="block text-white font-bold mb-1">CONCEPT & INSPIRATION:</span>
              <p>Reverse-engineered homage to Patrick David's legendary portfolio aesthetics.</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 font-mono text-xs text-white/40 uppercase">
          VAN STAN — 2026
        </div>
      </div>
    </div>
  );
};

export default CreditsDrawer;
