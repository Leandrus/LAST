# LAST : Latin American Simracing Team 🏁

[![Website](https://img.shields.io/badge/Website-last.leandrus.net-E67817?style=flat-square&logo=google-chrome&logoColor=white)](https://last.leandrus.net)
[![Developer](https://img.shields.io/badge/Developer-Leandrus-E67817?style=flat-square&logo=github&logoColor=white)](https://av.leandrus.net)
[![Brand](https://img.shields.io/badge/Initiative-Automovilismo%20Virtual-09488f?style=flat-square)](https://av.leandrus.net)
[![Simulators](https://img.shields.io/badge/Simulators-LFS%20%7C%20Assetto%20Corsa%20%7C%20iRacing-09488f?style=flat-square)](https://last.leandrus.net)
[![License](https://img.shields.io/badge/License-Proprietary-gray?style=flat-square)](LICENSE)

Official website and digital hub for **Team LAST (Latin American Simracing Team)**, developed and maintained by **Leandrus** as part of the **Automovilismo Virtual** motorsport initiative ([av.leandrus.net](https://av.leandrus.net)). Born on the virtual asphalt of *Live For Speed (LFS)* and competing across top simracing titles like *Assetto Corsa* and *iRacing*, Team LAST brings together passionate simracers from across Latin America.

---

## 🚀 Live Demo

The website is deployed and accessible at:
👉 **[https://last.leandrus.net](https://last.leandrus.net)**

---

## ✨ Features

- **Dynamic Driver Roster & Filtering**:
  - Filter team members dynamically by activity status (**Active** vs. **Retired / Inactive**).
  - Filter drivers by nationality with auto-detected flags and member counter badges.
  - Interactive driver cards highlighting real names, nicknames, car numbers, specialties, and social handles.
- **Synchronized Sponsor Spotlight**:
  - Continuous loop sponsor carousel built on Owl Carousel with center spotlight focus.
  - Interactive click-to-center capability on any sponsor logo.
  - Synchronized information card that smoothly updates descriptions, branding images, and external links in real time.
- **Rich Visual Identity & Media**:
  - High-definition looped background video hero section with call-to-action buttons.
  - Glassmorphic UI surfaces and dark aesthetic accented by signature team orange and blue colorways.
  - Expandable cards for featured simulators (*Live For Speed*, *Assetto Corsa*, and *iRacing*).
- **Navigation & Mobile Responsiveness**:
  - Single-page architecture with smooth animated scroll navigation.
  - Scrollspy tracking to automatically highlight the current visible section.
  - Intelligent sticky navbar that reveals the team logo only after scrolling past the hero section (powered by `IntersectionObserver`).
  - Mobile-ready off-canvas navigation menu.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure, accessibility, and metadata |
| **CSS3** | Custom design system, CSS variables, glassmorphic effects, and responsive breakpoints |
| **JavaScript (ES6+)** | Dynamic roster parsing, event orchestration, and DOM manipulation |
| **jQuery 3.x** | DOM querying and utility animations |
| **Owl Carousel 2** | Interactive carousel for team sponsors |
| **Bootstrap** | Grid layout system and responsive utility classes |
| **Font Awesome 6** | Iconography for simulators, social links, and UI indicators |
| **Google Fonts** | Typography using *Inter* and *Playfair Display* |

---

## 📂 Project Structure

```text
.
├── CNAME                         # GitHub Pages custom domain configuration (last.leandrus.net)
├── index.html                    # Main single-page application entry point
├── assets/
│   ├── css/
│   │   ├── owl.css               # Owl Carousel styles
│   │   └── team-last.css         # Main stylesheet (design tokens, glassmorphism, responsive rules)
│   ├── images/
│   │   ├── members/              # Driver profile portraits and fallback images
│   │   ├── sponsors/             # Sponsor logos and spotlight banner images
│   │   ├── fzr-video.mp4         # Hero section background loop video
│   │   ├── logo_last.png         # Official Team LAST emblem
│   │   └── *.jpg, *.svg          # Simulator logos and section background graphics
│   └── js/
│       ├── custom.js             # Sponsor carousel synchronization and general UI handlers
│       ├── members-filter.js     # Driver roster parsing, filter generator, and multi-axis filtering
│       ├── owl-carousel.js       # Owl Carousel core library
│       └── page-nav.js           # Smooth scroll, scrollspy, and IntersectionObserver logo toggle
└── vendor/
    ├── bootstrap/                # Bootstrap stylesheet and bundle scripts
    └── jquery/                   # jQuery core library
```

---

## 💻 Getting Started

This is a lightweight static front-end project requiring no complex build tools or compilers.

### Prerequisites

You only need a modern web browser and any static file server (optional for local testing).

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Leandrus/LAST.git
   cd LAST
   ```

2. **Serve the project:**
   You can open `index.html` directly in your browser, or run a local HTTP server:

   - **Using Python 3:**
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000`.

   - **Using Node.js (`npx serve`):**
     ```bash
     npx serve .
     ```

   - **Using VS Code:**
     Install the **Live Server** extension, right-click `index.html`, and choose **Open with Live Server**.

---

## 🔧 Customization Guide

### Adding or Updating Team Members
Drivers are declared in `index.html` within the `#section3` container:
- Add a new `.team-item` container inside `<div class="col-lg-3 col-md-6 mb-4">`.
- Set the driver's status tag:
  - Active: `<div class="pilot-status stat-active">Activo</div>`
  - Retired: `<div class="pilot-status stat-retired">Retirado</div>`
- Add the driver's nationality flag using `https://flagcdn.com/` with the country name in the `alt` attribute (e.g. `alt="Argentina"` or `alt="Venezuela"`).
- `members-filter.js` automatically detects new drivers, tallies counters, and adds country filter buttons without requiring manual JS modifications.

### Adding or Updating Sponsors
1. Add the sponsor logo to the carousel:
   ```html
   <div class="item" data-sponsor-id="sponsorX">
     <img src="assets/images/sponsors/sponsor_logo.png" alt="Sponsor Name">
   </div>
   ```
2. Add the corresponding detail template in `#sponsors-data`:
   ```html
   <div id="sponsorX" data-title="Sponsor Name" data-img="assets/images/sponsors/sponsor_banner.png">
     <p>Description and promotional text...</p>
     <p><a href="https://example.com" target="_blank"><i class="fa-solid fa-globe"></i></a></p>
   </div>
   ```
- `custom.js` will automatically link the carousel items with the spotlight panel.

---

## 🌐 Deployment

The repository is configured for automated deployment with **GitHub Pages**:
- The `CNAME` file points to `last.leandrus.net`.
- Any commit pushed to the `main` branch is instantly published.

---

## 👨‍💻 Author & Credits

- **Leandrus**: Creator, lead developer, and designer of the project ([av.leandrus.net](https://av.leandrus.net) &bull; [info@leandrus.net](mailto:info@leandrus.net)).
- **Automovilismo Virtual**: Digital motorsport group and community brand developed by Leandrus ([av.leandrus.net](https://av.leandrus.net)).
- **Contact & Inquiries**: [info@leandrus.net](mailto:info@leandrus.net)
- **Team LAST**: Passionate community of Latin American simracers.
- **Simulators**:
  - [Live For Speed (LFS)](https://www.lfs.net/)
  - [Assetto Corsa](https://assettocorsa.gg/)
  - [iRacing](https://www.iracing.com/)

---

Developed with ❤️ by **[Leandrus](https://av.leandrus.net)** &bull; © 2026 Team LAST / Automovilismo Virtual. All rights reserved.
