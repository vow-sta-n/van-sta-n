import React from "react";

interface FooterProps {
  onOpenCredits: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenCredits }) => {
  const servicePills = [
    { label: "UX/UI DESIGN", subject: "🎨 Looking for a Lead UX/UI Designer. Let's talk" },
    { label: "System ARCHITECTURE", subject: "👨‍💻 Looking for a Master of System Architecture. Let's talk" },
    { label: "AI SOFTWARE & APPS", subject: "🤖 AI Software & Modern Apps. Let's talk" },
    { label: "DIGITAL CONSULTANT", subject: "💼 Digital Consulting & Advisory" },
    { label: "STARTUPS", subject: "🚀 Startup Product Build" },
    { label: "WANNA CREATE SOMETHING?", subject: "🤖 Wanna create something ? Let's talk", isAccent: true },
  ];

  return (
    <footer id="footer" className="pt-24 sm:pt-36 pb-16 px-6 sm:px-10 lg:px-16 max-w-[1720px] mx-auto">
      <div className="space-y-16">
        {/* Headline */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-accent uppercase">
            <span>04 / CONNECT</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>
          <h2 className="font-display text-5xl sm:text-8xl lg:text-9xl font-black uppercase ">
            Let's Connect
          </h2>
        </div>

        {/* Service Tags with Customized Mailto Prompts */}
        <div className="space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-white/50">
            I am always interested in discussing:
          </p>
          <div className="flex flex-wrap gap-3">
            {servicePills.map((pill, idx) => (
              <a
                key={idx}
                href={`mailto:hello@vanstan.dev?subject=${encodeURIComponent(pill.subject)}`}
                className={`service-pill px-5 py-3 rounded-full border font-mono text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${pill.isAccent
                  ? "border-accent/30 bg-accent/10 text-accent hover:bg-accent hover:text-black"
                  : "border-white/10 bg-white/5 hover:bg-white hover:text-black"
                  }`}
              >
                <span>{pill.label}</span>
                <span>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Footer Navigation & Social Links */}
        <div className="pt-12 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/60">
          <div className="flex flex-wrap items-center gap-6">
            <a href="https://github.com/vow-sta-n" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GITHUB
            </a>
            <a href="https://x.com/vowstan" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              TWITTER
            </a>
            <a href="https://www.linkedin.com/in/van-stan/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LINKEDIN
            </a>
            <a href="https://www.figma.com/@vanstan" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              FIGMA
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-white/30">v3.0</span>
            <button
              onClick={onOpenCredits}
              className="hover:text-white transition-colors underline underline-offset-4 cursor-pointer"
            >
              CREDITS
            </button>
            <span>© 2026 VAN STAN</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
