import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { USDLoader } from "three/examples/jsm/loaders/USDLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const About: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<number | null>(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.05,
      100
    );
    camera.position.set(0, 0, 2.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // OrbitControls: Disabled zoom, strictly horizontal rotation constrained to fixed left/right angles
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.rotateSpeed = 0.7;

    // Lock vertical rotation (keep upright on horizon)
    controls.minPolarAngle = Math.PI / 2;
    controls.maxPolarAngle = Math.PI / 2;

    // Restrict horizontal rotation to a fixed bounded angle range left and right
    controls.minAzimuthAngle = -Math.PI / 3; // ~60° to the left
    controls.maxAzimuthAngle = Math.PI / 3;  // ~60° to the right
    controls.target.set(0, 0, 0);

    // Lighting setup for classical museum sculpture
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf3dbc7, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88bbff, 1.4);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 2.0, 10);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Load Julius Caesar USDZ model
    const loader = new USDLoader();
    loader.load(
      `${import.meta.env.BASE_URL}models/Caio_Giulio_Cesare.usdz`,
      (model) => {
        sculptureGroup.add(model);
        sculptureGroup.updateMatrixWorld(true);

        // Calculate accurate world bounding box
        const box = new THREE.Box3().setFromObject(sculptureGroup);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Center model geometry at origin
        model.position.sub(center);

        // Scale the parent group so USDZ internal metersPerUnit scale is preserved
        const maxDim = Math.max(size.x, size.y, size.z);
        if (maxDim > 0) {
          const targetHeight = 1.95; // Compact, perfectly scaled size
          const scaleFactor = targetHeight / maxDim;
          sculptureGroup.scale.setScalar(scaleFactor);
        }

        // Apply high quality material enhancements
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            if (mesh.material) {
              const mat = mesh.material as THREE.MeshStandardMaterial;
              mat.roughness = 0.45;
              mat.metalness = 0.1;
              mat.needsUpdate = true;
            }
          }
        });

        setLoadingProgress(null);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(percent);
        }
      },
      (error) => {
        console.error("Error loading Caesar 3D USDZ model:", error);
        setLoadingProgress(null);
      }
    );

    // Resize Handler
    const onResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", onResize);
      controls.dispose();
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="intro"
      className="py-32 sm:py-48 min-h-[90vh] flex items-center px-6 sm:px-10 lg:px-16 max-w-[1720px] mx-auto"
    >
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Copy & Narrative */}
        <div className="lg:col-span-7 space-y-10">
          {/* Header: Tusker Grotesk Title with Migra Sub-name */}
          <div className="inline-block">
            <h2 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl tracking-[0.03em] uppercase leading-none text-white">
              HELLO. I AM VAN STAN
            </h2>
            <div className="text-right -mt-2">
              <span className="font-serif text-base sm:text-lg text-[#F3DBC7] inline-block tracking-wide ">
                Yu
              </span>
              <span className="font-serif text-base sm:text-lg text-white inline-block tracking-wide">
                van Sta
              </span>
              <span className="font-serif text-base sm:text-lg text-[#F3DBC7] inline-block tracking-wide ">
                rsu
              </span>
              <span className="font-serif text-base sm:text-lg text-white inline-block tracking-wide">
                n
              </span>
            </div>
          </div>

          {/* Body Paragraph: Neue Montreal Uppercase Bold Editorial with Indent */}
          <div className="font-sans font-medium text-lg sm:text-2xl lg:text-[1.9rem] leading-[1.32] text-white uppercase tracking-[0.01em]">
            <p className="indent-16 sm:indent-28 lg:indent-36">
              I USE MY PASSION AND SKILLS TO CREATE DIGITAL PRODUCTS AND EXPERIENCES. NATIONAL AND INTERNATIONAL CUSTOMERS RELY ON ME FOR DESIGN, IMPLEMENTATION, AND MANAGEMENT OF THEIR DIGITAL PRODUCTS. AS AN INDEPENDENT, I WORK ALSO WITH WEB AGENCIES, COMPANIES, STARTUPS AND INDIVIDUALS TO CREATE A BLUEPRINT FOR THE DIGITAL BUSINESS. ADVISOR AND PARTNER OF SOME DIGITAL AND FINTECH STARTUPS. ALSO, JUDGE AT CSSDA AND THE WEBBY.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Canvas & Doodle */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          {/* 3D Canvas Container - Portrait Rectangle */}
          <div className="w-full aspect-[3/4] max-w-[480px] relative group flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Elegant Loading State */}
            {loadingProgress !== null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-transparent backdrop-blur-none pointer-events-none transition-opacity duration-500">
                <div className="w-8 h-8 rounded-full border-2 border-[#F3DBC7]/20 border-t-[#F3DBC7] animate-spin" />
                <span className="font-mono text-xs text-[#F3DBC7] uppercase tracking-widest">
                  Loading 3D Sculpture {loadingProgress > 0 ? `${loadingProgress}%` : ""}
                </span>
              </div>
            )}
          </div>

          {/* Hand-drawn SVG Doodle & Arrow */}
          <div className="absolute -bottom-10 -left-6 sm:-left-10 z-10 pointer-events-none select-none text-[#F3DBC7]">
            <div className="flex items-center gap-3">
              <p className="font-serif italic text-base sm:text-lg tracking-wide whitespace-nowrap">
                "I am not this one"
              </p>
              <svg
                width="104"
                height="54"
                viewBox="0 0 104 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-8 text-[#F3DBC7]"
              >
                <path
                  d="M4.66 4.442C19.968 3.87 51.687 7.98 59.806 10.15c8.119 2.17 42.004 11.335 42.193 22.216.19 10.881-23.966 21.44-51.095 18.938C23.775 48.802 2.174 36.415 2.001 25.7 1.828 14.986 19.498 5.55 42.092 2.767c22.595-2.785 62.01 7.677 49.853 28.879"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
