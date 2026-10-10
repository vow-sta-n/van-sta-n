import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface LoadingBannerProps {
  onComplete?: () => void;
}

const ASSETS_TO_PRELOAD = [
  `${import.meta.env.BASE_URL}images/background/sky.png`,
  `${import.meta.env.BASE_URL}images/background/scene.png`,
  `${import.meta.env.BASE_URL}images/background/left-angel.png`,
  `${import.meta.env.BASE_URL}images/background/baby-angels.png`,
  `${import.meta.env.BASE_URL}images/background/right-angel.png`,
  `${import.meta.env.BASE_URL}images/background/center-man.png`,
  `${import.meta.env.BASE_URL}images/background/left-man.png`,
  `${import.meta.env.BASE_URL}images/background/right-man.png`,
  `${import.meta.env.BASE_URL}images/background/birds.png`,
  `${import.meta.env.BASE_URL}images/background/peacock.png`,
  `${import.meta.env.BASE_URL}images/background/women.png`,
  `${import.meta.env.BASE_URL}images/background/working-man.png`,
  `${import.meta.env.BASE_URL}images/background/books.png`,
];

const LoadingBanner: React.FC<LoadingBannerProps> = ({ onComplete }) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  const [isDone, setIsDone] = useState(false);
  const [statusText, setStatusText] = useState("Initializing Canvas...");

  useEffect(() => {
    // Lock body scrolling while loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let isCancelled = false;
    let completedCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length + 1; // +1 for document.fonts

    const progressObj = { value: 0 };

    const updateVisualProgress = (targetPercent: number) => {
      gsap.to(progressObj, {
        value: targetPercent,
        duration: 0.45,
        ease: "power2.out",
        onUpdate: () => {
          const rounded = Math.round(progressObj.value);
          if (counterRef.current) {
            counterRef.current.textContent = rounded < 10 ? `0${rounded}` : `${rounded}`;
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progressObj.value}%`;
          }
        },
      });
    };

    const onItemLoaded = () => {
      if (isCancelled) return;
      completedCount++;
      const pct = Math.min(100, Math.round((completedCount / totalAssets) * 100));

      if (pct < 35) {
        setStatusText("Downloading Fresco Layers...");
      } else if (pct < 75) {
        setStatusText("Decoding Classical Imagery...");
      } else if (pct < 99) {
        setStatusText("Aligning Parallax Canvas...");
      } else {
        setStatusText("Canvas Complete");
      }

      updateVisualProgress(pct);
    };

    // Preload each image with decoding support
    const preloadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        const handleSuccess = () => {
          onItemLoaded();
          resolve();
        };

        if (img.decode) {
          img
            .decode()
            .then(handleSuccess)
            .catch(() => {
              // Fallback to onload
              img.onload = handleSuccess;
              img.onerror = handleSuccess;
            });
        } else {
          img.onload = handleSuccess;
          img.onerror = handleSuccess;
        }

        // Safety timeout per image
        setTimeout(handleSuccess, 8000);
      });
    };

    // Preload all assets and fonts
    const loadAll = async () => {
      // Preload fonts
      if ("fonts" in document) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore font loading error
        }
      }
      onItemLoaded();

      // Preload all background layers in parallel
      await Promise.all(ASSETS_TO_PRELOAD.map(preloadImage));

      if (isCancelled) return;

      // Ensure progress counter hits 100%
      updateVisualProgress(100);
      setStatusText("Entering Portfolio");

      // Give a brief moment at 100% for visual polish, then execute curtain reveal
      setTimeout(() => {
        if (isCancelled || !overlayRef.current) return;

        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = originalOverflow;
            setIsDone(true);
            if (onComplete) onComplete();
          },
        });

        // 1. Fade out the text/counter content smoothly
        if (contentRef.current) {
          tl.to(contentRef.current, {
            opacity: 0,
            y: -25,
            duration: 0.45,
            ease: "power2.in",
          });
        }

        // 2. Slide the dark curtain upward in a grand theatrical reveal
        tl.to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.95,
            ease: "power4.inOut",
          },
          "-=0.1"
        );
      }, 350);
    };

    loadAll();

    // Global safety fallback: never block user for more than 10 seconds
    const fallbackTimer = setTimeout(() => {
      if (!isCancelled && !isDone) {
        updateVisualProgress(100);
        setTimeout(() => {
          if (!isCancelled && overlayRef.current) {
            gsap.to(overlayRef.current, {
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => {
                document.body.style.overflow = originalOverflow;
                setIsDone(true);
                if (onComplete) onComplete();
              },
            });
          }
        }, 300);
      }
    }, 10000);

    return () => {
      isCancelled = true;
      clearTimeout(fallbackTimer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={overlayRef}
      id="portfolio-preloader"
      className="fixed inset-0 z-[9999] bg-[#070707] flex flex-col justify-between items-center p-8 sm:p-12 lg:p-16 select-none pointer-events-auto overflow-hidden"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Renaissance Fresco Portfolio"
    >
      {/* Top Bar: Monogram & Subtitle */}
      <div className="w-full flex justify-between items-center text-[#f8eee4]/70 text-xs sm:text-sm tracking-widest uppercase font-sans">
        <span className="font-semibold tracking-[0.25em] text-[#f8eee4]">
          VAN STAN
        </span>
        <span className="font-serif italic lowercase tracking-wider text-[#f3dbc7]/80">
          (renaissance portfolio)
        </span>
      </div>

      {/* Center: Monumental Progress & Status Display */}
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center text-center max-w-md w-full my-auto"
      >
        {/* Large Counter in Tusker Grotesk */}
        <div className="flex items-baseline justify-center mb-6 text-[#f8eee4]">
          <span
            ref={counterRef}
            className="text-7xl sm:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-none"
          >
            00
          </span>
          <span className="text-2xl sm:text-3xl font-display font-light text-[#f3dbc7]/60 ml-1">
            %
          </span>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="w-64 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-5 relative">
          <div
            ref={progressBarRef}
            className="h-full bg-gradient-to-r from-[#f3dbc7] via-[#f8eee4] to-[#ffffff] rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(248,238,228,0.5)]"
            style={{ width: "0%" }}
          />
        </div>

        {/* Dynamic Status Caption */}
        <span className="text-xs sm:text-sm text-[#f5eee6]/60 font-sans tracking-widest uppercase animate-pulse">
          {statusText}
        </span>
      </div>

      {/* Bottom Bar: Architectural Metadata Notice */}
      <div className="w-full flex justify-between items-center text-[10px] sm:text-xs text-[#f5eee6]/40 font-mono tracking-wider">
        <span>PRELOADING ASSETS</span>
        <span>13-TIER PARALLAX STACK</span>
      </div>
    </div>
  );
};

export default LoadingBanner;
