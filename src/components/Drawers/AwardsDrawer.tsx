import React from "react";

interface AwardsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const FULL_AWARDS = [
  { title: "Website of the Day", platform: "CSS Design Awards", project: "Beatrice Cortese" },
  { title: "Honorable Mention", platform: "Awwwards", project: "Barbara Scerbo" },
  { title: "Special Kudos", platform: "CSS Design Awards", project: "Barbara Scerbo" },
  { title: "Mobile Excellence", platform: "Awwwards", project: "Miranda Biondi" },
  { title: "Site of the Day", platform: "CSS Winner", project: "Van Stan Folio" },
  { title: "Designer of the Year Special Kudos", platform: "CSSDA", project: "Van Stan" },
  { title: "UX, UI Design & Innovation", platform: "CSS Design Awards", project: "Codeway Tech" },
  { title: "Special Kudos", platform: "CSS Design Awards", project: "Viceversa" },
  { title: "Site of the Day", platform: "Mindsparkle Mag", project: "Van Stan Folio" },
];

const AwardsDrawer: React.FC<AwardsDrawerProps> = ({ isOpen, onClose }) => {
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
              Full Honors & Awards
            </h3>
            <button
              onClick={onClose}
              className="font-mono text-xs uppercase text-white/60 hover:text-white cursor-pointer"
            >
              [ CLOSE ✕ ]
            </button>
          </div>

          <ul className="divide-y divide-white/10 font-mono text-xs uppercase">
            {FULL_AWARDS.map((item, idx) => (
              <li key={idx} className="py-4 flex justify-between items-center">
                <div>
                  <div className="font-bold text-white">{item.title}</div>
                  <div className="text-white/40 text-[10px]">{item.platform}</div>
                </div>
                <span className="text-[#F3DBC7]">{item.project}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-8 border-t border-white/10 font-mono text-xs text-white/40 uppercase">
          RECOGNITION BY INDUSTRY PEERS
        </div>
      </div>
    </div>
  );
};

export default AwardsDrawer;
