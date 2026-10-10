import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Baseline dimensions of final.png composite (5941 x 4225)
const BASE_WIDTH = 5941;
const BASE_HEIGHT = 4225;

const toPctX = (px: number) => (px / BASE_WIDTH) * 100;
const toPctY = (px: number) => (px / BASE_HEIGHT) * 100;

interface LayerDef {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
  zIndex: number;
}

const LAYERS: Record<string, LayerDef> = {
  sky: {
    src: `${import.meta.env.BASE_URL}images/background/sky.png`,
    alt: "Celestial Renaissance Sky",
    left: toPctX(0),
    top: toPctY(0),
    width: toPctX(5941),
    height: toPctY(3167),
    zIndex: 1,
  },
  leftAngel: {
    src: `${import.meta.env.BASE_URL}images/background/left-angel.png`,
    alt: "Celestial Angel Left",
    left: toPctX(0),
    top: toPctY(0),
    width: toPctX(1837),
    height: toPctY(1633),
    zIndex: 2,
  },
  babyAngels: {
    src: `${import.meta.env.BASE_URL}images/background/baby-angels.png`,
    alt: "Baby Angels in Clouds",
    left: toPctX(2743),
    top: toPctY(0),
    width: toPctX(2337),
    height: toPctY(1366),
    zIndex: 3,
  },
  rightAngel: {
    src: `${import.meta.env.BASE_URL}images/background/right-angel.png`,
    alt: "Celestial Angel Right",
    left: toPctX(4734),
    top: toPctY(0),
    width: toPctX(1207),
    height: toPctY(1340),
    zIndex: 4,
  },
  scene: {
    src: `${import.meta.env.BASE_URL}images/background/scene.png`,
    alt: "Classical Monument and Arches",
    left: toPctX(0),
    top: toPctY(877),
    width: toPctX(5938),
    height: toPctY(3346),
    zIndex: 5,
  },
  centerMan: {
    src: `${import.meta.env.BASE_URL}images/background/center-man.png`,
    alt: "Philosopher on Center Balcony",
    left: toPctX(2416),
    top: toPctY(1079),
    width: toPctX(785),
    height: toPctY(643),
    zIndex: 6,
  },
  leftMan: {
    src: `${import.meta.env.BASE_URL}images/background/left-man.png`,
    alt: "Philosopher on Left Stairs",
    left: toPctX(1773),
    top: toPctY(1702),
    width: toPctX(1035),
    height: toPctY(932),
    zIndex: 7,
  },
  rightMan: {
    src: `${import.meta.env.BASE_URL}images/background/right-man.png`,
    alt: "Philosopher on Right Stairs",
    left: toPctX(2810),
    top: toPctY(1711),
    width: toPctX(829),
    height: toPctY(973),
    zIndex: 8,
  },
  birds: {
    src: `${import.meta.env.BASE_URL}images/background/birds.png`,
    alt: "Birds Soaring Across Arches",
    left: toPctX(3641),
    top: toPctY(1495),
    width: toPctX(678),
    height: toPctY(364),
    zIndex: 9,
  },
  peacock: {
    src: `${import.meta.env.BASE_URL}images/background/peacock.png`,
    alt: "Peacock on Marble Terrace",
    left: toPctX(1583),
    top: toPctY(2550),
    width: toPctX(376),
    height: toPctY(655),
    zIndex: 10,
  },
  women: {
    src: `${import.meta.env.BASE_URL}images/background/women.png`,
    alt: "Foreground Classical Women",
    left: toPctX(12),
    top: toPctY(2720),
    width: toPctX(1183),
    height: toPctY(1505),
    zIndex: 11,
  },
  workingMan: {
    src: `${import.meta.env.BASE_URL}images/background/working-man.png`,
    alt: "Foreground Working Craftsman",
    left: toPctX(4122),
    top: toPctY(2857),
    width: toPctX(1819),
    height: toPctY(1368),
    zIndex: 12,
  },
  books: {
    src: `${import.meta.env.BASE_URL}images/background/books.png`,
    alt: "Ancient Manuscripts and Books",
    left: toPctX(4208),
    top: toPctY(3450),
    width: toPctX(576),
    height: toPctY(671),
    zIndex: 13,
  },
};

const renderLayer = (layer: LayerDef, extraClassName = "") => (
  <div
    key={layer.alt}
    className={`absolute pointer-events-none select-none will-change-transform ${extraClassName}`}
    style={{
      left: `${layer.left}%`,
      top: `${layer.top}%`,
      width: `${layer.width}%`,
      height: `${layer.height}%`,
      zIndex: layer.zIndex,
    }}
  >
    <img
      src={layer.src}
      alt={layer.alt}
      className="w-full h-full object-fill pointer-events-none select-none"
      draggable={false}
      loading="eager"
      decoding="async"
    />
  </div>
);

interface ParallaxBackgroundProps {
  isLoaded?: boolean;
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({ isLoaded = true }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Scroll parallax layer refs (nested outer containers)
  const skyScrollRef = useRef<HTMLDivElement | null>(null);
  const angelsScrollRef = useRef<HTMLDivElement | null>(null);
  const sceneScrollRef = useRef<HTMLDivElement | null>(null);
  const birdsScrollRef = useRef<HTMLDivElement | null>(null);
  const foregroundLeftScrollRef = useRef<HTMLDivElement | null>(null);
  const foregroundRightScrollRef = useRef<HTMLDivElement | null>(null);

  // Mouse parallax / ambient float layer refs (nested inner containers)
  const skyMouseRef = useRef<HTMLDivElement | null>(null);
  const angelsMouseRef = useRef<HTMLDivElement | null>(null);
  const sceneMouseRef = useRef<HTMLDivElement | null>(null);
  const birdsMouseRef = useRef<HTMLDivElement | null>(null);
  const foregroundLeftMouseRef = useRef<HTMLDivElement | null>(null);
  const foregroundRightMouseRef = useRef<HTMLDivElement | null>(null);

  // Individual ambient floating refs
  const leftAngelFloatRef = useRef<HTMLDivElement | null>(null);
  const babyAngelsFloatRef = useRef<HTMLDivElement | null>(null);
  const rightAngelFloatRef = useRef<HTMLDivElement | null>(null);
  const birdsFloatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // 1. Scroll-driven Parallax Animation linked to #hero
      const scrollTriggerConfig = {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      };

      if (!prefersReducedMotion) {
        // Deep background sky: moves slowest
        if (skyScrollRef.current) {
          gsap.fromTo(
            skyScrollRef.current,
            { y: "0vh" },
            {
              y: "-18vh",
              ease: "none",
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }

        // Celestial angels: drift between sky and architecture
        if (angelsScrollRef.current) {
          gsap.fromTo(
            angelsScrollRef.current,
            { y: "0vh" },
            {
              y: "-26vh",
              ease: "none",
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }

        // Midground architecture and integrated figures: move solidly together
        if (sceneScrollRef.current) {
          gsap.fromTo(
            sceneScrollRef.current,
            { y: "0vh" },
            {
              y: "-44vh",
              ease: "none",
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }

        // Birds soaring through arches
        if (birdsScrollRef.current) {
          gsap.fromTo(
            birdsScrollRef.current,
            { y: "0vh", x: "0vw" },
            {
              y: "-38vh",
              x: "-2vw",
              ease: "none",
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }

        // Foreground left (women & peacock)
        if (foregroundLeftScrollRef.current) {
          gsap.fromTo(
            foregroundLeftScrollRef.current,
            { y: "0vh" },
            {
              y: "-54vh",
              ease: "none",
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }

        // Foreground right (working man & books)
        if (foregroundRightScrollRef.current) {
          gsap.fromTo(
            foregroundRightScrollRef.current,
            { y: "0vh" },
            {
              y: "-60vh",
              ease: "none",
              scrollTrigger: scrollTriggerConfig,
            }
          );
        }

        // 2. Ambient Ethereal Float Animations
        if (leftAngelFloatRef.current) {
          gsap.to(leftAngelFloatRef.current, {
            y: "-=7",
            x: "+=3",
            duration: 5.5,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        if (babyAngelsFloatRef.current) {
          gsap.to(babyAngelsFloatRef.current, {
            y: "+=6",
            duration: 6.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        if (rightAngelFloatRef.current) {
          gsap.to(rightAngelFloatRef.current, {
            y: "-=8",
            x: "-=3",
            duration: 5.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        if (birdsFloatRef.current) {
          gsap.to(birdsFloatRef.current, {
            y: "-=5",
            x: "+=6",
            duration: 4.2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      }
    }, containerRef);

    // Refresh ScrollTrigger after triggers are registered so coordinates are exact
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    // 3. Desktop Interactive Mouse Parallax (subtle 3D diorama tilt)
    let removeMouseListener: (() => void) | undefined;
    const hasPointer = window.matchMedia("(pointer: fine)").matches || window.innerWidth > 768;

    if (!prefersReducedMotion && hasPointer) {
      const quickSkyX = skyMouseRef.current
        ? gsap.quickTo(skyMouseRef.current, "x", { duration: 1.2, ease: "power2.out" })
        : null;
      const quickSkyY = skyMouseRef.current
        ? gsap.quickTo(skyMouseRef.current, "y", { duration: 1.2, ease: "power2.out" })
        : null;

      const quickAngelsX = angelsMouseRef.current
        ? gsap.quickTo(angelsMouseRef.current, "x", { duration: 1.1, ease: "power2.out" })
        : null;
      const quickAngelsY = angelsMouseRef.current
        ? gsap.quickTo(angelsMouseRef.current, "y", { duration: 1.1, ease: "power2.out" })
        : null;

      const quickSceneX = sceneMouseRef.current
        ? gsap.quickTo(sceneMouseRef.current, "x", { duration: 1.0, ease: "power2.out" })
        : null;
      const quickSceneY = sceneMouseRef.current
        ? gsap.quickTo(sceneMouseRef.current, "y", { duration: 1.0, ease: "power2.out" })
        : null;

      const quickBirdsX = birdsMouseRef.current
        ? gsap.quickTo(birdsMouseRef.current, "x", { duration: 0.9, ease: "power2.out" })
        : null;
      const quickBirdsY = birdsMouseRef.current
        ? gsap.quickTo(birdsMouseRef.current, "y", { duration: 0.9, ease: "power2.out" })
        : null;

      const quickFgLeftX = foregroundLeftMouseRef.current
        ? gsap.quickTo(foregroundLeftMouseRef.current, "x", { duration: 0.8, ease: "power2.out" })
        : null;
      const quickFgLeftY = foregroundLeftMouseRef.current
        ? gsap.quickTo(foregroundLeftMouseRef.current, "y", { duration: 0.8, ease: "power2.out" })
        : null;

      const quickFgRightX = foregroundRightMouseRef.current
        ? gsap.quickTo(foregroundRightMouseRef.current, "x", { duration: 0.8, ease: "power2.out" })
        : null;
      const quickFgRightY = foregroundRightMouseRef.current
        ? gsap.quickTo(foregroundRightMouseRef.current, "y", { duration: 0.8, ease: "power2.out" })
        : null;

      const handleMouseMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;

        quickSkyX?.(nx * 8);
        quickSkyY?.(ny * 5);

        quickAngelsX?.(nx * 14);
        quickAngelsY?.(ny * 9);

        quickSceneX?.(nx * -12);
        quickSceneY?.(ny * -8);

        quickBirdsX?.(nx * -16);
        quickBirdsY?.(ny * -10);

        quickFgLeftX?.(nx * -22);
        quickFgLeftY?.(ny * -14);

        quickFgRightX?.(nx * -26);
        quickFgRightY?.(ny * -16);
      };

      const handleMouseLeave = () => {
        quickSkyX?.(0);
        quickSkyY?.(0);
        quickAngelsX?.(0);
        quickAngelsY?.(0);
        quickSceneX?.(0);
        quickSceneY?.(0);
        quickBirdsX?.(0);
        quickBirdsY?.(0);
        quickFgLeftX?.(0);
        quickFgLeftY?.(0);
        quickFgRightX?.(0);
        quickFgRightY?.(0);
      };

      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      document.addEventListener("mouseleave", handleMouseLeave);

      removeMouseListener = () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    return () => {
      ctx.revert();
      removeMouseListener?.();
    };
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none filter brightness-[0.75] contrast-[1.05]"
      aria-hidden="true"
    >
      {/* Aspect-ratio preserving stage centered horizontally, covering full viewport */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none select-none"
        style={{
          width: "max(100vw, calc(155vh * 1.406154))",
          height: "max(calc(100vw * 0.71116), 155vh)",
        }}
      >
        {/* Layer 1: Sky (Furthest Background) */}
        <div ref={skyScrollRef} className="absolute inset-0 will-change-transform">
          <div ref={skyMouseRef} className="absolute inset-0 will-change-transform">
            {renderLayer(LAYERS.sky)}
          </div>
        </div>

        {/* Layer 2: Celestial Angels Floating in Cloudscape */}
        <div ref={angelsScrollRef} className="absolute inset-0 will-change-transform">
          <div ref={angelsMouseRef} className="absolute inset-0 will-change-transform">
            <div ref={leftAngelFloatRef} className="absolute inset-0 will-change-transform">
              {renderLayer(LAYERS.leftAngel)}
            </div>
            <div ref={babyAngelsFloatRef} className="absolute inset-0 will-change-transform">
              {renderLayer(LAYERS.babyAngels)}
            </div>
            <div ref={rightAngelFloatRef} className="absolute inset-0 will-change-transform">
              {renderLayer(LAYERS.rightAngel)}
            </div>
          </div>
        </div>

        {/* Layer 3: Classical Architecture Scene + Integrated Figures */}
        <div ref={sceneScrollRef} className="absolute inset-0 will-change-transform">
          <div ref={sceneMouseRef} className="absolute inset-0 will-change-transform">
            {renderLayer(LAYERS.scene)}
            {renderLayer(LAYERS.centerMan)}
            {renderLayer(LAYERS.leftMan)}
            {renderLayer(LAYERS.rightMan)}
          </div>
        </div>

        {/* Layer 4: Airborne Birds Soaring Across Arches */}
        <div ref={birdsScrollRef} className="absolute inset-0 will-change-transform">
          <div ref={birdsMouseRef} className="absolute inset-0 will-change-transform">
            <div ref={birdsFloatRef} className="absolute inset-0 will-change-transform">
              {renderLayer(LAYERS.birds)}
            </div>
          </div>
        </div>

        {/* Layer 5: Foreground Left (Women & Peacock) */}
        <div ref={foregroundLeftScrollRef} className="absolute inset-0 will-change-transform">
          <div ref={foregroundLeftMouseRef} className="absolute inset-0 will-change-transform">
            {renderLayer(LAYERS.peacock)}
            {renderLayer(LAYERS.women)}
          </div>
        </div>

        {/* Layer 6: Foreground Right (Working Man & Books) */}
        <div ref={foregroundRightScrollRef} className="absolute inset-0 will-change-transform">
          <div ref={foregroundRightMouseRef} className="absolute inset-0 will-change-transform">
            {renderLayer(LAYERS.workingMan)}
            {renderLayer(LAYERS.books)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxBackground;
