# 🚀 IA Code Studio — AI-Powered Three.js & WebGL IDE

[![Netlify Status](https://api.netlify.com/api/v1/badges/5e4be33/deploy-status)](https://ia-codestudio.com)
[![Product Hunt](https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=ia-code-studio&theme=dark)](https://www.producthunt.com/posts/ia-code-studio)

**IA Code Studio** is a next-generation web development portal and interactive 3D WebGL editor powered by AI. It enables developers, designers, and creators to generate Three.js scenes, extrude vector art into 3D meshes, collaborate in real-time multiplayer coding rooms, and export self-contained interactive web apps with a single click.

🔗 **Live Website:** [https://ia-codestudio.com](https://ia-codestudio.com)  
🔗 **Product Hunt Launch:** [Support us on Product Hunt](https://www.producthunt.com/posts/ia-code-studio)

---

## 🌟 Key Features

### 1. 🤖 AI Code Generator & Assistant
*   **Prompt-to-3D-Code:** Speak to the AI co-pilot in English or French to write complete, bug-free Three.js and HTML/CSS/JS applications.
*   **Instant Compilation:** Write, refactor, and render complex WebGL animations on the fly.
*   **Bilingual System:** Full translation localization support for English and French audiences.

### 2. 👥 DevSocial AI Hub (Multiplayer Co-coding)
*   **Collaborative Sandboxes:** Join real-time room codes to code WebGL animations live with your team.
*   **WebRTC Voice Chat:** High-fidelity microphone voice channels built directly into sandbox rooms.
*   **3D Laser Cursors:** Synchronized 3D raycasting cursors to visually guide peer programmers.
*   **Gamified Community:** Earn XP points, win badges (`Wizard`, `Champion`), and climb the global leaderboards in real-time.

### 3. 🎨 Studio 3D/4D Pro (Vector & Mesh Editor)
*   **2D Vector Extruder:** Convert flat `SVG` paths and `DXF` blueprint drawings into interactive 3D volumetric models.
*   **3D Mesh Importer:** Drag-and-drop `STL`, `GLB`, and `OBJ` assets directly into the viewer.
*   **Standalone HTML Compiler:** Export complete interactive 3D scenes as single, self-contained HTML files or offline ZIP bundles with 1-click.

### 4. ⚙️ Prebuilt Interactive Widgets
*   **Steampunk Chrono:** An ultra-detailed, interactive 3D mechanical clock widget. Fully customizable and embeddable on external websites.
*   **Webcam Avatar:** A 3D particle mesh avatar reacting to live webcam feeds.
*   **Video Mesh:** Projects webcam and video captures onto physics-based 3D terrain meshes.

---

## 🛠️ Technology Stack

*   **Frontend:** Vanilla HTML5, CSS3 (Glassmorphism & animations), JavaScript (ES6+).
*   **3D Engine:** Three.js (WebGL renderer, OrbitControls).
*   **Backend & Sync:** Firebase (Auth, Firestore real-time listeners, Hosting).
*   **WebRTC Protocol:** RTCPeerConnection API with Firestore-based signaling.
*   **Deployment:** Netlify (Continuous Integration & CDN caching).

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/andart1174/ia-codestudio.git
   cd ia-codestudio
   ```

2. Start a local server:
   - Double-click the batch file **`Porneste Portalul AI Hub.bat`** (on Windows) to launch a lightweight local server and open the browser.
   - Alternatively, use Python:
     ```bash
     python -m http.server 8000
     ```

3. Open your browser and navigate to `http://localhost:8000`.

---

## 📄 License & Attribution

Developed by **Andrei Triboi**. All rights reserved. Interactive templates like the Steampunk Chrono are open-source and customizable for external embeds.

*Support the launch on [Product Hunt](https://www.producthunt.com/posts/ia-code-studio)!*
