import React, { Suspense, lazy, useState, useCallback } from "react";
import ReactDOM from "react-dom/client";
import MinimalPreloader from "./components/Preloader/MinimalPreloader";
import "./style.css";

// Lazy-load the heavy portfolio bundle (Three.js, GSAP, Parallax layers, Cases)
const App = lazy(() => import("./App"));

const Root: React.FC = () => {
  const [isAppMounted, setIsAppMounted] = useState(false);
  const [isPreloadComplete, setIsPreloadComplete] = useState(false);

  const handleAppMounted = useCallback(() => {
    setIsAppMounted(true);
  }, []);

  const handlePreloadComplete = useCallback(() => {
    setIsPreloadComplete(true);
  }, []);

  return (
    <>
      {/* Lightweight, minimal initial preloader screen sent instantly on first paint */}
      <MinimalPreloader
        isAppMounted={isAppMounted}
        onComplete={handlePreloadComplete}
      />

      {/* Heavy client-rendered application chunks download and compile in the background */}
      <Suspense fallback={null}>
        <App
          onReady={handleAppMounted}
          isLoaded={isPreloadComplete}
        />
      </Suspense>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
