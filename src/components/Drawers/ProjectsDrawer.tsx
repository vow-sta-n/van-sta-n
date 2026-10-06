import React from "react";

interface ProjectsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ARCHIVE_PROJECTS = [
  { name: "Alga: HRMS & Payroll", role: "Flutter Architecture", year: "2024-2026" },
  { name: "Chloro IoT Configurator", role: "Flutter, BLE, IoT", year: "2024" },
  { name: "Chloro X: Factory MES", role: "MES Interface, HCI", year: "2024" },
  { name: "SnapTag GPS Map Camera", role: "Flutter, Camera2, GIS", year: "2026" },
  { name: "PDF Hawk Document Engine", role: "Flutter, PDF Engine", year: "2026" },
  { name: "Flutter Da Vinci Figma Plugin", role: "Figma API, TypeScript", year: "2026" },
  { name: "EMA Distress Assessment", role: "Flutter, GCP Functions", year: "2026" },
  { name: "PSYRA Web Platform", role: "React, Three.js", year: "2024" },
  { name: "Independent E-Commerce PoC", role: "Node.js, SQL, AWS", year: "2021-2023" },
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
