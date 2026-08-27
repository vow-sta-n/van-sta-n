import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      <div className="flex flex-col text-left">
        <span className="font-display font-bold text-sm tracking-tight text-white group-hover:text-[#F3DBC7] uppercase transition-colors">
          Van Stan
        </span>
        <span className="font-mono text-[9px] text-white/40 tracking-wider uppercase -mt-0.5">
          Folio 2026
        </span>
      </div>
    </div>
  );
};

export default Logo;
