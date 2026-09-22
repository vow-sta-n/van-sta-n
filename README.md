# Van Stan — Personal Portfolio

Welcome to my personal portfolio repository! 

I built this website to showcase my work, creative direction, and design engineering projects. I’ve made this project completely **open-source** so that developers, designers, and creators can freely explore the code, inspect the interactive WebGL & animation mechanics, and draw inspiration from the design system.

🌐 **Live Demo:** [https://vow-sta-n.github.io/van-stan-folio/](https://vow-sta-n.github.io/van-sta-n/)

---

## 🎯 Purpose

This website serves two primary purposes:
1. **My Personal Portfolio:** A creative home where I curate my selected case studies, interactive experiences, and design philosophy as a creative developer and digital architect.
2. **An Open-Source Reference:** A real-world, production-ready example of combining editorial typography, brutalist aesthetics, smooth scroll choreographies, and 3D WebGL models. Feel free to study the architecture, adapt ideas, or use it as a learning reference for your own projects.

---

## ✨ Features & Highlights

- **Interactive 3D & WebGL:** Integrated Three.js rendering with real-time lighting, interactive hover rotations, and USDZ 3D model loaders.
- **Cinematic Animations:** Smooth GSAP timeline animations, ScrollTrigger scroll scrubbing, and page reveal transitions.
- **Smooth Inertia Scrolling:** Butter-smooth scrolling powered by Lenis.
- **Editorial Brutalist Aesthetics:** Custom typography layout blending expressive serif headings, high-contrast brutalist framing, and responsive grids.
- **Interactive Modals & Drawers:** Full-featured case study modal views and slide-out navigation drawers.
- **Automated CI/CD:** Continuous deployment pipeline using GitHub Actions to publish builds directly to GitHub Pages.

---

## 🛠️ Tech Stack

- **Core:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & Vanilla CSS
- **Motion & Interactions:** [GSAP](https://greensock.com/gsap/) (GreenSock) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scroll:** [@studio-freight/lenis](https://github.com/darkroomengineering/lenis)
- **3D Graphics:** [Three.js](https://threejs.org/)
- **Deployment:** GitHub Pages & GitHub Actions

---

## 🚀 Getting Started Locally

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vow-sta-n/van-stan-folio.git
   cd van-stan-folio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build locally:**
   ```bash
   npm run preview
   ```

---

## 📁 Project Structure

```text
├── public/               # Static assets (3D models, images, favicon)
│   ├── images/           # Case study images and hero background
│   └── models/           # 3D USDZ sculpture models
├── src/
│   ├── AppBar/           # Floating pill navigation bar & header
│   ├── components/
│   │   ├── About/        # About section with interactive 3D sculpture
│   │   ├── CaseModal/    # Case study detail overlay modal
│   │   ├── Cases/        # Selected works & editorial layout grid
│   │   ├── Drawers/      # Projects & credits slide-out drawers
│   │   ├── Featured/     # Recognition & honors marquee
│   │   ├── Footer/       # Interactive footer section
│   │   ├── Hero/         # Hero section typography & CTA
│   │   └── LoadingBanner/# Initial reveal transition banner
│   ├── assets/           # Font files and typography assets
│   ├── App.tsx           # Main application shell & scroll triggers
│   ├── main.tsx          # Application entry point
│   └── style.css         # Design system tokens & base styles
├── index.html            # Main HTML document
└── vite.config.js        # Vite configuration & plugins
```

---

## 📄 License & Contributing

This project is open source. You are welcome to view, fork, and learn from the code. If you find this project helpful or inspiring, consider giving it a ⭐ on GitHub!
