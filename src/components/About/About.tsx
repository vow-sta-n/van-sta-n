import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const About: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf3dbc7, 2.2);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88bbff, 1.2);
    fillLight.position.set(-4, -2, 2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xffffff, 1.8, 10);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    // Sculpture Group
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Materials
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0xdedede,
      roughness: 0.35,
      metalness: 0.15,
      flatShading: true,
    });

    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xf3dbc7,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });

    // 1. Head Cranium (Icosahedron)
    const headGeo = new THREE.IcosahedronGeometry(1.05, 2);
    const headMesh = new THREE.Mesh(headGeo, headMaterial);
    const headWire = new THREE.Mesh(headGeo, wireframeMaterial);
    sculptureGroup.add(headMesh);
    sculptureGroup.add(headWire);

    // 2. Classical Facial Feature Planes (Nose / Brow / Jaw)
    const noseGeo = new THREE.ConeGeometry(0.22, 0.6, 4);
    noseGeo.rotateX(Math.PI / 2);
    const noseMesh = new THREE.Mesh(noseGeo, headMaterial);
    noseMesh.position.set(0, -0.05, 0.95);
    sculptureGroup.add(noseMesh);

    // 3. Jaw / Chin Block
    const jawGeo = new THREE.BoxGeometry(0.8, 0.45, 0.7);
    const jawMesh = new THREE.Mesh(jawGeo, headMaterial);
    jawMesh.position.set(0, -0.75, 0.35);
    sculptureGroup.add(jawMesh);

    // 4. Neck & Pedestal Base
    const neckGeo = new THREE.CylinderGeometry(0.35, 0.5, 0.8, 8);
    const neckMesh = new THREE.Mesh(neckGeo, headMaterial);
    neckMesh.position.set(0, -1.2, 0);
    sculptureGroup.add(neckMesh);

    const baseGeo = new THREE.CylinderGeometry(0.9, 1.1, 0.35, 12);
    const baseMesh = new THREE.Mesh(baseGeo, headMaterial);
    baseMesh.position.set(0, -1.7, 0);
    sculptureGroup.add(baseMesh);

    // 5. Crown Hair Ring
    const ringGeo = new THREE.TorusGeometry(1.15, 0.15, 6, 16);
    ringGeo.rotateX(Math.PI / 2.3);
    const ringMesh = new THREE.Mesh(ringGeo, headMaterial);
    ringMesh.position.set(0, 0.5, -0.1);
    sculptureGroup.add(ringMesh);

    // Interactive Mouse Orbit & Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const mouseNormX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseNormY = -(e.clientY / window.innerHeight) * 2 + 1;

      if (!isDragging) {
        targetRotationY = mouseNormX * 0.75;
        targetRotationX = -mouseNormY * 0.45;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onDragMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.01;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onDragMove);

    // Resize Handler
    const onResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      sculptureGroup.rotation.y += (targetRotationY - sculptureGroup.rotation.y) * 0.06;
      sculptureGroup.rotation.x += (targetRotationX - sculptureGroup.rotation.x) * 0.06;
      sculptureGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.05 + 0.3;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onDragMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="intro"
      className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1720px] mx-auto border-t border-white/10"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Copy & Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#F3DBC7] uppercase">
            <span>01 / ABOUT</span>
            <span className="h-[1px] w-12 bg-[#F3DBC7]/40" />
          </div>

          <h2 className="font-display text-4xl sm:text-6xl font-bold uppercase tracking-tight leading-tight">
            Hello. I am Van Stan
            <span className="inline-block text-sm font-mono tracking-widest text-[#0a0a0a] bg-[#F3DBC7] px-3 py-1 rounded ml-3 align-middle font-normal">
              CREATIVE DIRECTOR
            </span>
          </h2>

          <div className="space-y-6 text-white/70 text-lg sm:text-xl leading-relaxed font-sans">
            <p>
              I use deep engineering discipline and art direction to create bespoke digital products, immersive web applications, and brutalist digital identities.
            </p>
            <p>
              Forward-thinking brands, design agencies, and innovative startups rely on my expertise for full-cycle creative development—from architecture to pixel-perfect motion choreography.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-xs uppercase tracking-wider text-white/60">
            <div>
              <span className="block text-white font-bold text-sm mb-1">LOCATION</span>
              <span>Global / Remote</span>
            </div>
            <div>
              <span className="block text-white font-bold text-sm mb-1">DISCIPLINES</span>
              <span>UX/UI • 3D • Motion</span>
            </div>
            <div>
              <span className="block text-white font-bold text-sm mb-1">RECOGNITIONS</span>
              <span>Awwwards • CSSDA • FWA</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 3D WebGL Canvas & Doodle */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          {/* 3D Canvas Container */}
          <div className="w-full aspect-square max-w-[500px] relative rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden group shadow-2xl">
            <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Subtle Canvas Overlay Gradients */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-[#0a0a0a]/60" />

            {/* Interactive Hint */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F3DBC7] animate-ping" />
              <span>Interactive 3D • Drag to orbit</span>
            </div>
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
