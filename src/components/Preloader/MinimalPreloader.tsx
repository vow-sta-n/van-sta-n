import React, { useEffect, useRef, useState } from "react";

interface MinimalPreloaderProps {
  isAppMounted?: boolean;
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

const MinimalPreloader: React.FC<MinimalPreloaderProps> = ({
  isAppMounted = false,
  onComplete,
}) => {
  const [percent, setPercent] = useState(0);
  const [statusText, setStatusText] = useState("Compiling Digital Architecture...");
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Keep callback ref so it never re-triggers effects
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const targetPercentRef = useRef(15);
  const currentPercentRef = useRef(0);
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    // 1. Lock body scrolling strictly during preloading
    document.body.style.overflow = "hidden";

    let isCancelled = false;
    let loadedAssetsCount = 0;
    const totalAssets = ASSETS_TO_PRELOAD.length;

    // Smooth animation loop for progress counter & bar
    let rafId: number;
    const updateLoop = () => {
      if (isCancelled || hasFinishedRef.current) return;

      const diff = targetPercentRef.current - currentPercentRef.current;
      if (Math.abs(diff) > 0.4) {
        currentPercentRef.current += diff * 0.12;
      } else {
        currentPercentRef.current = targetPercentRef.current;
      }

      const displayVal = Math.min(100, Math.floor(currentPercentRef.current));
      setPercent(displayVal);

      if (displayVal >= 100 && isAppMounted && !hasFinishedRef.current) {
        hasFinishedRef.current = true;
        triggerExit();
        return;
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    // Dynamic status text updater
    const updateProgress = (pct: number) => {
      targetPercentRef.current = Math.max(targetPercentRef.current, pct);

      if (pct < 30) {
        setStatusText("Compiling Digital Architecture...");
      } else if (pct < 65) {
        setStatusText("Downloading Fresco Layers...");
      } else if (pct < 90) {
        setStatusText("Aligning Parallax Canvas...");
      } else {
        setStatusText("Canvas Complete");
      }
    };

    // Preload each background image
    const preloadImage = (url: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        const handleDone = () => {
          if (isCancelled) return;
          loadedAssetsCount++;
          // Assets account for 75% of progress, app compilation accounts for 25%
          const assetPct = Math.round((loadedAssetsCount / totalAssets) * 75);
          updateProgress(20 + assetPct);
          resolve();
        };

        if (img.decode) {
          img
            .decode()
            .then(handleDone)
            .catch(() => {
              img.onload = handleDone;
              img.onerror = handleDone;
            });
        } else {
          img.onload = handleDone;
          img.onerror = handleDone;
        }

        // 5s fallback per asset
        setTimeout(handleDone, 5000);
      });
    };

    // Load fonts and assets
    const initPreloader = async () => {
      if ("fonts" in document) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore font load error
        }
      }
      updateProgress(25);

      // Concurrently load all parallax assets
      await Promise.all(ASSETS_TO_PRELOAD.map(preloadImage));

      if (isCancelled) return;

      // Assets are fully ready
      if (isAppMounted) {
        targetPercentRef.current = 100;
        setStatusText("Entering Portfolio");
      } else {
        targetPercentRef.current = 92;
        setStatusText("Finalizing Application Bundle...");
      }
    };

    initPreloader();

    // Trigger curtain exit
    const triggerExit = () => {
      setStatusText("Entering Portfolio");
      setPercent(100);

      // Hold at 100% for a moment for polished presentation
      setTimeout(() => {
        if (isCancelled) return;
        setIsExiting(true);

        // Crucial: Unlock scroll immediately when exit transition starts
        document.body.style.overflow = "";

        // Immediately activate background parallax, mouse tilt, and ambient floating
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }

        // Wait for CSS slide-up transition to complete (950ms)
        setTimeout(() => {
          if (isCancelled) return;
          setIsDone(true);
          document.body.style.overflow = "";

          // Trigger ScrollTrigger refresh if loaded on window
          if (typeof window !== "undefined" && (window as unknown as { ScrollTrigger?: { refresh: () => void } }).ScrollTrigger) {
            (window as unknown as { ScrollTrigger: { refresh: () => void } }).ScrollTrigger.refresh();
          }
        }, 950);
      }, 300);
    };

    // Safety timeout: never block user for more than 6.5 seconds
    const safetyTimer = setTimeout(() => {
      if (!isCancelled && !hasFinishedRef.current) {
        hasFinishedRef.current = true;
        targetPercentRef.current = 100;
        triggerExit();
      }
    }, 6500);

    return () => {
      isCancelled = true;
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
      // Guarantee body scroll restoration on unmount
      document.body.style.overflow = "";
    };
  }, []);

  // Update progress when App component signals it has mounted
  useEffect(() => {
    if (isAppMounted && !hasFinishedRef.current) {
      if (targetPercentRef.current >= 90) {
        targetPercentRef.current = 100;
      } else {
        targetPercentRef.current = Math.max(targetPercentRef.current, 75);
      }
    }
  }, [isAppMounted]);

  if (isDone) return null;

  return (
    <div
      id="portfolio-preloader"
      className={`fixed inset-0 z-[9999] bg-[#070707] flex flex-col justify-between items-center p-8 sm:p-12 lg:p-16 select-none overflow-hidden transition-transform duration-[950ms] ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting
          ? "-translate-y-full pointer-events-none"
          : "translate-y-0 pointer-events-auto"
      }`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      aria-label="Loading Renaissance Fresco Portfolio"
    >
      {/* Top Bar: Monogram & Subtitle */}
      <div
        className={`w-full flex justify-between items-center text-[#f8eee4]/70 text-xs sm:text-sm tracking-widest uppercase font-sans transition-all duration-400 ease-out ${
          isExiting ? "opacity-0 -translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <span className="font-semibold tracking-[0.25em] text-[#f8eee4]">
          VAN STAN
        </span>
        <span className="font-serif italic lowercase tracking-wider text-[#f3dbc7]/80">
          (renaissance portfolio)
        </span>
      </div>

      {/* Center: Monumental Progress & Status Display */}
      <div
        className={`flex flex-col items-center justify-center text-center max-w-md w-full my-auto transition-all duration-400 ease-out ${
          isExiting ? "opacity-0 -translate-y-6" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Large Counter in Tusker Grotesk */}
        <div className="flex items-baseline justify-center mb-6 text-[#f8eee4]">
          <span className="text-7xl sm:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-none tabular-nums">
            {percent < 10 ? `0${percent}` : percent}
          </span>
          <span className="text-2xl sm:text-3xl font-display font-light text-[#f3dbc7]/60 ml-1">
            %
          </span>
        </div>

        {/* Minimalist Progress Bar */}
        <div className="w-64 sm:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-5 relative">
          <div
            className="h-full bg-gradient-to-r from-[#f3dbc7] via-[#f8eee4] to-[#ffffff] rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(248,238,228,0.5)]"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Dynamic Status Caption */}
        <span className="text-xs sm:text-sm text-[#f5eee6]/60 font-sans tracking-widest uppercase animate-pulse">
          {statusText}
        </span>
      </div>

      {/* Bottom Bar: Architectural Metadata Notice */}
      <div
        className={`w-full flex justify-between items-center text-[10px] sm:text-xs text-[#f5eee6]/40 font-mono tracking-wider transition-all duration-400 ease-out ${
          isExiting ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
        }`}
      >
        <span>STREAMING ASSETS</span>
        <span>13-TIER PARALLAX STACK</span>
      </div>
    </div>
  );
};

export default MinimalPreloader;
