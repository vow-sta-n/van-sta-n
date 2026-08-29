import React from "react";
import "./header.css";
import Logo from "../components/Logo/Logo";

interface AppBarProps {
  onOpenProjects?: () => void;
}

const AppBar: React.FC<AppBarProps> = () => {
  return (
    <div className="app-bar-container">
      <header className="app-bar" role="banner">
        <a href="#hero" className="app-bar-logo" aria-label="Go to Home">
          <Logo />
        </a>
        <nav className="app-bar-nav" aria-label="Main Navigation">
          <a href="#intro" className="app-bar-link">
            About
          </a>
          <a href="#cases" className="app-bar-link">
            Works
          </a>
          <a href="#footer" className="app-bar-link">
            Contact
          </a>
        </nav>
      </header>
    </div>
  );
};

export default AppBar;
