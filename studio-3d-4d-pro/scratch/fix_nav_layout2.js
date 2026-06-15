const fs = require('fs');
let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// ===== FIX 1: Replace the CSS block =====
// Find exact boundaries using unique markers
const cssStart = code.indexOf('customStyle.innerHTML = \\`\n');
const cssEnd = code.indexOf('\\`;\n          document.head.appendChild(customStyle);', cssStart);

if (cssStart === -1 || cssEnd === -1) {
    console.log('❌ Could not find CSS block boundaries');
    console.log('cssStart:', cssStart, 'cssEnd:', cssEnd);
    process.exit(1);
}

const existingCSS = code.substring(cssStart, cssEnd + 2); // include trailing `
console.log('Found CSS block, length:', existingCSS.length, 'lines:', existingCSS.split('\n').length);

const NEW_CSS_BLOCK = `customStyle.innerHTML = \\`
              body {
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
              /* Hero spacer: first viewport = clock only */
              .nav-hero-spacer {
                  height: 100vh;
                  width: 100%;
                  display: flex;
                  align-items: flex-end;
                  justify-content: center;
                  padding-bottom: 40px;
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
              }
              .nav-hero-hint span {
                  font-family: sans-serif;
                  font-size: 12px;
                  color: rgba(34,211,238,0.65);
                  letter-spacing: 1.5px;
                  text-transform: uppercase;
              }
              .nav-hero-hint .nav-arrow {
                  width: 0; height: 0;
                  border-left: 7px solid transparent;
                  border-right: 7px solid transparent;
                  border-top: 10px solid rgba(34,211,238,0.55);
              }
              @keyframes navBounce {
                  0%,100% { transform: translateY(0); opacity: 0.65; }
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
                  background: rgba(8,12,28,0.85);
                  backdrop-filter: blur(16px);
                  -webkit-backdrop-filter: blur(16px);
                  border: 1px solid rgba(6,182,212,0.3);
                  border-radius: 20px;
                  padding: 36px;
                  color: #cbd5e1;
                  box-shadow: 0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(6,182,212,0.12);
                  pointer-events: auto;
                  transition: transform 0.4s ease, border-color 0.4s ease;
                  font-family: sans-serif;
              }
              .mock-card:hover {
                  transform: translateY(-6px);
                  border-color: rgba(6,182,212,0.7);
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
                  background: rgba(6,182,212,0.12);
                  color: #22d3ee;
                  border-radius: 20px;
                  font-size: 11px;
                  font-weight: bold;
                  margin-bottom: 14px;
                  letter-spacing: 1px;
              }
              /* Dot navigator sidebar */
              #nav-dot-bar {
                  position: fixed;
                  right: 18px;
                  top: 50%;
                  transform: translateY(-50%);
                  display: flex;
                  flex-direction: column;
                  gap: 10px;
                  z-index: 9999;
              }
              .nav-dot {
                  width: 10px;
                  height: 10px;
                  border-radius: 50%;
                  background: rgba(34,211,238,0.25);
                  border: 1.5px solid rgba(34,211,238,0.5);
                  cursor: pointer;
                  transition: all 0.3s ease;
                  position: relative;
              }
              .nav-dot:hover, .nav-dot.active {
                  background: #22d3ee;
                  box-shadow: 0 0 10px rgba(34,211,238,0.7);
                  transform: scale(1.4);
              }
              .nav-dot .dot-label {
                  position: absolute;
                  right: 18px;
                  top: 50%;
                  transform: translateY(-50%);
                  background: rgba(8,12,28,0.92);
                  color: #22d3ee;
                  font-family: sans-serif;
                  font-size: 11px;
                  white-space: nowrap;
                  padding: 3px 9px;
                  border-radius: 6px;
                  border: 1px solid rgba(34,211,238,0.3);
                  opacity: 0;
                  transition: opacity 0.2s;
                  pointer-events: none;
              }
              .nav-dot:hover .dot-label { opacity: 1; }
              /* Back-to-clock button */
              #nav-back-btn {
                  position: fixed;
                  right: 18px;
                  bottom: 24px;
                  width: 38px;
                  height: 38px;
                  border-radius: 50%;
                  background: rgba(8,12,28,0.88);
                  border: 1.5px solid rgba(34,211,238,0.45);
                  color: #22d3ee;
                  font-size: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  z-index: 9999;
                  opacity: 0;
                  pointer-events: none;
                  transition: opacity 0.4s, transform 0.3s;
              }
              #nav-back-btn.visible { opacity: 1; pointer-events: auto; }
              #nav-back-btn:hover { background: rgba(34,211,238,0.15); transform: scale(1.1); }
          \``;

// Replace old CSS block
code = code.substring(0, cssStart) + NEW_CSS_BLOCK + code.substring(cssEnd + 2);
console.log('✅ CSS block replaced');

// ===== FIX 2: Replace the section rendering block =====
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

const NEW_RENDER = `          // Hero spacer: first screen shows clock + scroll hint, sections below
          const heroSpacer = document.createElement('div');
          heroSpacer.className = 'nav-hero-spacer';
          heroSpacer.innerHTML = '<div class="nav-hero-hint"><span>Scroll ↓ or click clock dial</span><div class="nav-arrow"></div></div>';
          document.body.appendChild(heroSpacer);

          // Right-side dot navigator
          const dotBar = document.createElement('div');
          dotBar.id = 'nav-dot-bar';
          document.body.appendChild(dotBar);

          // Back-to-top / back-to-clock button
          const backBtn = document.createElement('div');
          backBtn.id = 'nav-back-btn';
          backBtn.title = 'Back to clock';
          backBtn.innerHTML = '&#9650;';
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

              // Dot for this section
              const dot = document.createElement('div');
              dot.className = 'nav-dot';
              dot.dataset.target = sec.id;
              const dotLabel = document.createElement('span');
              dotLabel.className = 'dot-label';
              dotLabel.textContent = (sec.title[lang] || sec.title.en).replace(/[^\\w\\s\\u00C0-\\u024F\\u0400-\\u04FF]/gu, '').trim();
              dot.appendChild(dotLabel);
              dot.onclick = () => document.getElementById(sec.id).scrollIntoView({ behavior: 'smooth' });
              dotBar.appendChild(dot);
          });

          // IntersectionObserver to highlight active dot
          const ioOpts = { rootMargin: '-40% 0px -40% 0px', threshold: 0 };
          const sectionObs = new IntersectionObserver((entries) => {
              entries.forEach(en => {
                  const d = dotBar.querySelector('[data-target="' + en.target.id + '"]');
                  if (d) d.classList.toggle('active', en.isIntersecting);
              });
          }, ioOpts);
          document.querySelectorAll('.mock-section').forEach(s => sectionObs.observe(s));

          // Show back-to-clock button after scrolling past hero
          window.addEventListener('scroll', () => {
              backBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.4);
          }, { passive: true });`;

if (code.includes(OLD_RENDER)) {
    code = code.split(OLD_RENDER).join(NEW_RENDER);
    console.log('✅ Section render block replaced with hero spacer + dot nav + back button');
} else {
    console.log('❌ RENDER block not found!');
    // Debug: find partial
    const lines = OLD_RENDER.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (!code.includes(lines[i])) {
            console.log('First non-matching line ' + i + ':', JSON.stringify(lines[i]));
            break;
        }
    }
    process.exit(1);
}

fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
console.log('✅ File saved!');
