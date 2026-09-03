import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingBannerProps {
  onComplete?: () => void;
}

const LoadingBanner: React.FC<LoadingBannerProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Lock scroll until loaded
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let hasFaded = false;

    const fadeOut = () => {
      if (hasFaded || !overlayRef.current) return;
      hasFaded = true;

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.style.overflow = originalOverflow;
          setIsDone(true);
          if (onComplete) onComplete();
        },
      });
    };

    // Trigger fade-out once website is completely loaded
    if (document.readyState === "complete") {
      const timer = setTimeout(fadeOut, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      const handleLoad = () => fadeOut();
      window.addEventListener("load", handleLoad);

      // Fallback in case load already fired or takes too long
      const fallbackTimer = setTimeout(fadeOut, 2500);

      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(fallbackTimer);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={overlayRef}
      id="svg-loading-banner"
      className="fixed inset-0 z-[9999] pointer-events-auto select-none"
      aria-label="Loading Website"
      role="status"
    >
      {/* Static Black SVG Overlay */}
      <svg
        className="w-full h-full block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="100" height="100" fill="#000000" />
      </svg>
    </div>
  );
};

export default LoadingBanner;
