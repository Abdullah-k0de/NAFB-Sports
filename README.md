<div align="center">
  <div style="background-color: #0f172a; padding: 40px; border-radius: 12px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.1);">
    <img src="src/assets/NAFB-Sports-logo-without-bg.png" alt="NAFB Sports Logo" width="160">
  </div>

  # NAFB Sports
  **National Association of Fitness Based Sports Org**

  [![Angular](https://img.shields.io/badge/Angular-21-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev/)
  [![Vanilla CSS](https://img.shields.io/badge/CSS3-Vanilla--CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
  [![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

  ---

  <p align="center">
    A premium digital experience for <b>NAFB Sports</b>, the National Association of Fitness Based Sports Org, designed to unite, engage, and elevate athletes, fans, and fitness enthusiasts alike.
    <br />
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Architecture</a> •
    <a href="#-deployment">Deployment</a>
  </p>
</div>

## 🌟 Overview

**NAFB Sports** (National Association of Fitness Based Sports Org) is a cutting-edge platform crafting the future of fitness-based sports. Transitioning traditional physical athletic paradigms into a modern digital interface, NAFB Sports provides fans and competitive athletes with a high-fidelity space to connect, share, and track physical excellence. 

Currently loading its next-generation platform, the site features a highly interactive coming-soon environment utilizing sophisticated floating physics and fluid design aesthetics.

---

## ✨ Features

- **🌌 Interactive Floating Background**: An organic, fluid background populated with sports icons (soccer, basketball, tennis, football, trophy, whistle) that dynamically repel away from the user's cursor.
- **⚡ Modern Coming Soon Teaser**: A state-of-the-art landing page establishing brand authority and capturing excitement.
- **🎨 Glassmorphism & Vibrant Styling**: Premium visuals utilizing custom CSS properties, blur filters, sleek gradients, and the modern **Outfit** typeface.
- **📱 True Liquid Responsiveness**: Pixel-perfect scaling optimized for everything from micro-screen mobile devices to ultra-wide desktop displays.
- **🔗 Sleek Social Connectivity**: Integrated premium interactive pill-badges for quick community access.

---

## 🛠 Tech Stack

- **Framework**: [Angular 21](https://angular.dev/) (Standalone Components, Signals API for reactive state management)
- **Styling**: [Vanilla CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) (Modular custom variables, keyframe animations, glassmorphic filters)
- **Deployment & Hosting**: [Firebase Hosting](https://firebase.google.com/)
- **Code Quality & Styling**: [Prettier](https://prettier.io/)
- **Unit Testing**: [Vitest](https://vitest.dev/) (Fast & reliable modern runner)
- **Build Tool**: [Angular CLI / Vite](https://angular.dev/tools/cli)

---

## 🚀 Getting Started

Follow these simple steps to run a local copy of the project.

### Prerequisites

* **Node.js**: `v18.x` or higher
* **npm**: `v9.x` or higher

### Installation & Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdullah-k0de/nafb-sports.git
   cd nafb-sports
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:4200](http://localhost:4200) to see the application in action.

---

## 📂 Project Structure

```text
nafb-sports/
├── src/
│   ├── app/                  # Core Application Logic
│   │   ├── app.ts            # Standalone App Component (Floating logic, mouse interactions)
│   │   ├── app.html          # Main HTML structure with sports SVG templates
│   │   ├── app.css           # Component styles (Layout, glass effect, keyframe animations)
│   │   └── app.spec.ts       # Vitest specs
│   ├── assets/               # Static Assets & Branding
│   │   ├── NAFB-Sports-logo-without-bg.png  # Transparent brand logo
│   │   └── NAFB-Sports-white-bg.png         # Solid brand logo
│   ├── styles.css            # Global modern stylesheet (Fonts, color tokens)
│   └── index.html            # Core entry HTML file
├── firebase.json             # Firebase configuration
├── angular.json              # Angular CLI configuration
├── tsconfig.json             # TypeScript root configuration
├── tsconfig.app.json         # TypeScript application setup
├── tsconfig.spec.json        # TypeScript test configuration
└── package.json              # Script automation and NPM packages
```

---

## ☁️ Deployment

The project is fully integrated with Firebase Hosting for rapid production deployment.

```bash
# Build the optimized production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy
```

---

## 📄 License

### 🔒 PROPRIETARY AND CONFIDENTIAL
> This software and all original assets, including source code, UI designs, and logo graphics, are the exclusive property of **NAFB Sports**. All rights reserved. Unauthorized copying, modification, or distribution is strictly prohibited. See the [LICENSE](LICENSE) file for the full legal terms.

---

<div align="center">
  Built for <a href="https://nafbsports.org">nafbsports.org</a> by <a href="https://github.com/Abdullah-k0de">Abdullah</a>
</div>
