import React from "react";

interface ProjectsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARCHIVE_PROJECTS = [
  { name: "Beatrice Cortese Vini", role: "Design, Dev", year: "2024" },
  { name: "Barbara Scerbo Studio", role: "Design, Dev", year: "2024" },
  { name: "Viceversa Financing", role: "Product Design", year: "2023" },
  { name: "Codeway Tech", role: "Three.js, Dev", year: "2023" },
  { name: "Miranda Biondi", role: "Identity, Dev", year: "2022" },
  { name: "PwC Alumni Digital Platform", role: "UX/UI, Dev", year: "2022" },
  { name: "Villa di Geggiano Winery", role: "Creative Dev", year: "2021" },
  { name: "WattEV Mobility", role: "Frontend", year: "2021" },
  { name: "SoundFit Audio App", role: "Design, Architecture", year: "2021" },
  { name: "Preludio Music Platform", role: "Design & Dev", year: "2020" },
];

const ProjectsDrawer: React.FC<ProjectsDrawerProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md transition-opacity duration-300 flex justify-end"
      onClick={onClose}
    >
      <div
        className="h-full w-full max-w-2xl bg-[#111111] border-l border-white/10 p-8 sm:p-12 overflow-y-auto flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-white/10 pb-6">
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight">
              Selected Projects (2020-2026)
            </h3>
            <button
              onClick={onClose}
              className="font-mono text-xs uppercase text-white/60 hover:text-white cursor-pointer"
            >
              [ CLOSE ✕ ]
            </button>
          </div>

          <ul className="divide-y divide-white/10 font-mono text-xs uppercase">
            {ARCHIVE_PROJECTS.map((proj, idx) => (
              <li
                key={idx}
                className="py-4 flex justify-between items-center hover:text-[#F3DBC7] transition-colors"
              >
                <span>{proj.name}</span>
                <span className="text-white/40">
                  {proj.role} • {proj.year}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 border-t border-white/10 font-mono text-xs text-white/40 uppercase">
          AVAILABLE FOR SELECTIVE COMMISSIONS
        </div>
      </div>
    </div>
  );
};

export default ProjectsDrawer;
