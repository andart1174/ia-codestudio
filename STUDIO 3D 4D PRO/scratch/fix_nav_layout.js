const fs = require('fs');
let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// ============================================================
// FIX 1: Update the CSS to add hero spacer and better layout
// ============================================================

const OLD_CSS = `               body {
                   margin: 0 !important;
                   padding: 0 !important;
                   overflow-y: auto !important;
                   overflow-x: hidden !important;
                   height: auto !important;
                   background: #050815 !important;
                   scroll-behavior: smooth !important;
               }
               canvas {
                   position: fixed !important;
                   top: 0 !important;
                   left: 0 !important;
                   width: 100vw !important;
                   height: 100vh !important;
                   z-index: -1 !important;
                   pointer-events: auto !important;
               }
               .mock-section {
                   width: 100%;
                   min-height: 100vh;
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: center;
                   padding: 40px 20px;
                   box-sizing: border-box;
                   position: relative;
                   z-index: 10;
                   pointer-events: none;
               }
               .mock-card {
                   max-width: 600px;
                   width: 90%;
                   background: rgba(8, 12, 28, 0.75);
                   backdrop-filter: blur(12px);
                   -webkit-backdrop-filter: blur(12px);
                   border: 1px solid rgba(6, 182, 212, 0.3);
                   border-radius: 16px;
                   padding: 30px;
                   color: #cbd5e1;
                   box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.15);
                   pointer-events: auto;
                   transition: transform 0.4s ease, border-color 0.4s ease;
                   font-family: sans-serif;
               }
               .mock-card:hover {
                   transform: translateY(-5px);
                   border-color: rgba(6, 182, 212, 0.6);
               }
               .mock-card h2 {
                   margin-top: 0;
                   font-size: 28px;
                   background: linear-gradient(90deg, #22d3ee, #818cf8);
                   -webkit-background-clip: text;
                   -webkit-text-fill-color: transparent;
                   letter-spacing: -0.5px;
                   display: flex;
                   align-items: center;
                   gap: 10px;
               }
               .mock-card p {
                   font-size: 14px;
                   line-height: 1.6;
                   color: #94a3b8;
               }
               .mock-card .meta-tag {
                   display: inline-block;
                   padding: 4px 8px;
                   background: rgba(6, 182, 212, 0.15);
                   color: #22d3ee;
                   border-radius: 6px;
                   font-size: 11px;
                   font-weight: bold;
                   margin-bottom: 12px;
               }`;

const NEW_CSS = `               body {
                   margin: 0 !important;
                   padding: 0 !important;
                   overflow-y: auto !important;
                   overflow-x: hidden !important;
                   height: auto !important;
                   background: #050815 !important;
                   scroll-behavior: smooth !important;
               }
               canvas {
                   position: fixed !important;
                   top: 0 !important;
                   left: 0 !important;
                   width: 100vw !important;
                   height: 100vh !important;
                   z-index: -1 !important;
                   pointer-events: auto !important;
               }
               /* Hero spacer: first 100vh shows clock only */
               .nav-hero-spacer {
                   height: 100vh;
                   width: 100%;
                   display: flex;
                   align-items: flex-end;
                   justify-content: center;
                   padding-bottom: 32px;
                   box-sizing: border-box;
                   pointer-events: none;
                   position: relative;
                   z-index: 10;
               }
               .nav-hero-hint {
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   gap: 8px;
                   animation: navBounce 2s infinite ease-in-out;
                   pointer-events: none;
               }
               .nav-hero-hint span {
                   font-family: sans-serif;
                   font-size: 13px;
                   color: rgba(34, 211, 238, 0.7);
                   letter-spacing: 1px;
                   text-transform: uppercase;
               }
               .nav-hero-hint svg {
                   width: 24px;
                   height: 24px;
                   fill: none;
                   stroke: rgba(34, 211, 238, 0.6);
                   stroke-width: 2;
               }
               @keyframes navBounce {
                   0%, 100% { transform: translateY(0); opacity: 0.6; }
                   50% { transform: translateY(8px); opacity: 1; }
               }
               .mock-section {
                   width: 100%;
                   min-height: 100vh;
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: center;
                   padding: 40px 20px;
                   box-sizing: border-box;
                   position: relative;
                   z-index: 10;
                   pointer-events: none;
               }
               .mock-card {
                   max-width: 600px;
                   width: 90%;
                   background: rgba(8, 12, 28, 0.82);
                   backdrop-filter: blur(16px);
                   -webkit-backdrop-filter: blur(16px);
                   border: 1px solid rgba(6, 182, 212, 0.3);
                   border-radius: 20px;
                   padding: 36px;
                   color: #cbd5e1;
                   box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(6, 182, 212, 0.12);
                   pointer-events: auto;
                   transition: transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
                   font-family: sans-serif;
               }
               .mock-card:hover {
                   transform: translateY(-6px);
                   border-color: rgba(6, 182, 212, 0.7);
                   box-shadow: 0 24px 70px rgba(0, 0, 0, 0.8), 0 0 50px rgba(6, 182, 212, 0.25);
               }
               .mock-card h2 {
                   margin-top: 0;
                   font-size: 28px;
                   background: linear-gradient(90deg, #22d3ee, #818cf8);
                   -webkit-background-clip: text;
                   -webkit-text-fill-color: transparent;
                   letter-spacing: -0.5px;
                   display: flex;
                   align-items: center;
                   gap: 10px;
               }
               .mock-card p {
                   font-size: 15px;
                   line-height: 1.7;
                   color: #94a3b8;
                   margin: 0;
               }
               .mock-card .meta-tag {
                   display: inline-block;
                   padding: 4px 10px;
                   background: rgba(6, 182, 212, 0.12);
                   color: #22d3ee;
                   border-radius: 20px;
                   font-size: 11px;
                   font-weight: bold;
                   margin-bottom: 14px;
                   letter-spacing: 1px;
               }
               /* Dot navigator */
               #nav-dot-bar {
                   position: fixed;
                   right: 20px;
                   top: 50%;
                   transform: translateY(-50%);
                   display: flex;
                   flex-direction: column;
                   gap: 10px;
                   z-index: 9999;
                   pointer-events: auto;
               }
               .nav-dot {
                   width: 10px;
                   height: 10px;
                   border-radius: 50%;
                   background: rgba(34, 211, 238, 0.3);
                   border: 1px solid rgba(34, 211, 238, 0.5);
                   cursor: pointer;
                   transition: all 0.3s ease;
                   position: relative;
               }
               .nav-dot:hover, .nav-dot.active {
                   background: rgba(34, 211, 238, 0.9);
                   box-shadow: 0 0 10px rgba(34, 211, 238, 0.6);
                   transform: scale(1.4);
               }
               .nav-dot .nav-dot-label {
                   position: absolute;
                   right: 20px;
                   top: 50%;
                   transform: translateY(-50%);
                   background: rgba(8, 12, 28, 0.9);
                   color: #22d3ee;
                   font-family: sans-serif;
                   font-size: 11px;
                   white-space: nowrap;
                   padding: 3px 8px;
                   border-radius: 6px;
                   border: 1px solid rgba(34, 211, 238, 0.3);
                   opacity: 0;
                   pointer-events: none;
                   transition: opacity 0.2s;
               }
               .nav-dot:hover .nav-dot-label {
                   opacity: 1;
               }
               /* Back-to-clock arrow */
               #nav-back-btn {
                   position: fixed;
                   right: 20px;
                   bottom: 24px;
                   width: 40px;
                   height: 40px;
                   border-radius: 50%;
                   background: rgba(8, 12, 28, 0.85);
                   border: 1px solid rgba(34, 211, 238, 0.4);
                   color: #22d3ee;
                   font-size: 18px;
                   display: flex;
                   align-items: center;
                   justify-content: center;
                   cursor: pointer;
                   z-index: 9999;
                   opacity: 0;
                   transition: opacity 0.4s, transform 0.3s;
                   pointer-events: auto;
                   box-shadow: 0 4px 20px rgba(0,0,0,0.4);
               }
               #nav-back-btn:hover {
                   background: rgba(34, 211, 238, 0.15);
                   border-color: rgba(34, 211, 238, 0.8);
                   transform: scale(1.1);
               }
               #nav-back-btn.visible {
                   opacity: 1;
               }`;

if (code.includes(OLD_CSS)) {
    code = code.split(OLD_CSS).join(NEW_CSS);
    console.log('✅ CSS updated with hero spacer + dot navigator + back button');
} else {
    // Try partial match
    const partial = OLD_CSS.substring(0, 100);
    if (code.includes(partial)) {
        console.log('Partial match found - marker found but full block mismatch');
    } else {
        console.log('❌ CSS block not found');
        process.exit(1);
    }
}

// ============================================================
// FIX 2: Update the section rendering to add hero spacer + dot nav + back button
// ============================================================
const OLD_RENDER = `          sectionsData.forEach(sec => {
              const secEl = document.createElement('div');
              secEl.id = sec.id;
              secEl.className = 'mock-section';
              
              const cardEl = document.createElement('div');
              cardEl.className = 'mock-card';
              
              const tagEl = document.createElement('div');
              tagEl.className = 'meta-tag';
              tagEl.textContent = 'SECTION: #' + sec.id.toUpperCase();
              cardEl.appendChild(tagEl);
              
              const titleEl = document.createElement('h2');
              titleEl.innerHTML = sec.title[lang] || sec.title.en;
              cardEl.appendChild(titleEl);
              
              const descEl = document.createElement('p');
              descEl.innerHTML = sec.desc[lang] || sec.desc.en;
              cardEl.appendChild(descEl);
              
              secEl.appendChild(cardEl);
              document.body.appendChild(secEl);
          });`;

const NEW_RENDER = `          // Hero spacer (first viewport = clock only, no section overlap)
          const heroSpacer = document.createElement('div');
          heroSpacer.className = 'nav-hero-spacer';
          heroSpacer.innerHTML = '<div class="nav-hero-hint"><span>Scroll ↓ or click clock dial</span><svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg></div>';
          document.body.appendChild(heroSpacer);

          // Dot navigator bar
          const dotBar = document.createElement('div');
          dotBar.id = 'nav-dot-bar';
          document.body.appendChild(dotBar);

          // Back-to-clock button
          const backBtn = document.createElement('div');
          backBtn.id = 'nav-back-btn';
          backBtn.title = 'Back to clock';
          backBtn.innerHTML = '▲';
          backBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
          document.body.appendChild(backBtn);

          sectionsData.forEach((sec, idx) => {
              const secEl = document.createElement('div');
              secEl.id = sec.id;
              secEl.className = 'mock-section';
              
              const cardEl = document.createElement('div');
              cardEl.className = 'mock-card';
              
              const tagEl = document.createElement('div');
              tagEl.className = 'meta-tag';
              tagEl.textContent = 'SECTION: #' + sec.id.toUpperCase();
              cardEl.appendChild(tagEl);
              
              const titleEl = document.createElement('h2');
              titleEl.innerHTML = sec.title[lang] || sec.title.en;
              cardEl.appendChild(titleEl);
              
              const descEl = document.createElement('p');
              descEl.innerHTML = sec.desc[lang] || sec.desc.en;
              cardEl.appendChild(descEl);
              
              secEl.appendChild(cardEl);
              document.body.appendChild(secEl);

              // Add dot for each section
              const dot = document.createElement('div');
              dot.className = 'nav-dot';
              dot.dataset.target = sec.id;
              const label = document.createElement('span');
              label.className = 'nav-dot-label';
              label.textContent = sec.title[lang] || sec.title.en;
              dot.appendChild(label);
              dot.onclick = () => {
                  document.getElementById(sec.id).scrollIntoView({ behavior: 'smooth' });
              };
              dotBar.appendChild(dot);
          });

          // Scroll observer: highlight active dot + show/hide back button
          const observerOpts = { rootMargin: '-40% 0px -40% 0px', threshold: 0 };
          const obs = new IntersectionObserver((entries) => {
              entries.forEach(en => {
                  const dot = dotBar.querySelector('[data-target="' + en.target.id + '"]');
                  if (dot) dot.classList.toggle('active', en.isIntersecting);
              });
          }, observerOpts);
          document.querySelectorAll('.mock-section').forEach(s => obs.observe(s));

          // Back-to-clock button visibility
          window.addEventListener('scroll', () => {
              const scrolled = window.scrollY > window.innerHeight * 0.5;
              backBtn.classList.toggle('visible', scrolled);
          }, { passive: true });`;

if (code.includes(OLD_RENDER)) {
    code = code.split(OLD_RENDER).join(NEW_RENDER);
    console.log('✅ Section rendering updated with hero spacer + dot navigator + back button');
    fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
    console.log('✅ File saved!');
} else {
    console.log('❌ RENDER block not found. First 80 chars:');
    console.log(JSON.stringify(OLD_RENDER.substring(0, 80)));
    // Check partial
    const lines = OLD_RENDER.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (!code.includes(lines[i].trimStart())) {
            console.log(`First non-matching line [${i}]: "${lines[i]}"`);
            break;
        }
    }
}
