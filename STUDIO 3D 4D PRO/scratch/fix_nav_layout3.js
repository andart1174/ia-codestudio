const fs = require('fs');
let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// ===== FIX 1: Add new CSS classes after the existing .mock-card .meta-tag block =====
// Find the end of the existing CSS (just before closing backtick of customStyle)
const META_TAG_END = '               margin-bottom: 12px;\n              }\n          \\`;\n          document.head.appendChild(customStyle);';
const META_TAG_NEW = '               margin-bottom: 12px;\n              }\n              /* Hero spacer */\n              .nav-hero-spacer {\n                  height: 100vh;\n                  width: 100%;\n                  display: flex;\n                  align-items: flex-end;\n                  justify-content: center;\n                  padding-bottom: 40px;\n                  box-sizing: border-box;\n                  pointer-events: none;\n                  position: relative;\n                  z-index: 10;\n              }\n              .nav-hero-hint {\n                  display: flex;\n                  flex-direction: column;\n                  align-items: center;\n                  gap: 8px;\n                  animation: navBounce 2s infinite ease-in-out;\n              }\n              .nav-hero-hint span {\n                  font-family: sans-serif;\n                  font-size: 12px;\n                  color: rgba(34,211,238,0.65);\n                  letter-spacing: 1.5px;\n                  text-transform: uppercase;\n              }\n              .nav-arrow {\n                  width: 0;\n                  height: 0;\n                  border-left: 7px solid transparent;\n                  border-right: 7px solid transparent;\n                  border-top: 10px solid rgba(34,211,238,0.55);\n              }\n              @keyframes navBounce {\n                  0%,100% { transform: translateY(0); opacity: 0.65; }\n                  50% { transform: translateY(8px); opacity: 1; }\n              }\n              /* Dot navigator */\n              #nav-dot-bar {\n                  position: fixed;\n                  right: 18px;\n                  top: 50%;\n                  transform: translateY(-50%);\n                  display: flex;\n                  flex-direction: column;\n                  gap: 10px;\n                  z-index: 9999;\n              }\n              .nav-dot {\n                  width: 10px;\n                  height: 10px;\n                  border-radius: 50%;\n                  background: rgba(34,211,238,0.25);\n                  border: 1.5px solid rgba(34,211,238,0.5);\n                  cursor: pointer;\n                  transition: all 0.3s ease;\n                  position: relative;\n              }\n              .nav-dot:hover, .nav-dot.active {\n                  background: #22d3ee;\n                  box-shadow: 0 0 10px rgba(34,211,238,0.7);\n                  transform: scale(1.4);\n              }\n              .nav-dot .dot-label {\n                  position: absolute;\n                  right: 18px;\n                  top: 50%;\n                  transform: translateY(-50%);\n                  background: rgba(8,12,28,0.92);\n                  color: #22d3ee;\n                  font-family: sans-serif;\n                  font-size: 11px;\n                  white-space: nowrap;\n                  padding: 3px 9px;\n                  border-radius: 6px;\n                  border: 1px solid rgba(34,211,238,0.3);\n                  opacity: 0;\n                  transition: opacity 0.2s;\n                  pointer-events: none;\n              }\n              .nav-dot:hover .dot-label { opacity: 1; }\n              /* Back button */\n              #nav-back-btn {\n                  position: fixed;\n                  right: 18px;\n                  bottom: 24px;\n                  width: 38px;\n                  height: 38px;\n                  border-radius: 50%;\n                  background: rgba(8,12,28,0.88);\n                  border: 1.5px solid rgba(34,211,238,0.45);\n                  color: #22d3ee;\n                  font-size: 16px;\n                  display: flex;\n                  align-items: center;\n                  justify-content: center;\n                  cursor: pointer;\n                  z-index: 9999;\n                  opacity: 0;\n                  pointer-events: none;\n                  transition: opacity 0.4s, transform 0.3s;\n              }\n              #nav-back-btn.visible { opacity: 1; pointer-events: auto; }\n              #nav-back-btn:hover { background: rgba(34,211,238,0.15); transform: scale(1.1); }\n          \\`;\n          document.head.appendChild(customStyle);';

if (code.includes(META_TAG_END)) {
    code = code.split(META_TAG_END).join(META_TAG_NEW);
    console.log('FIX1 OK: Added new CSS classes');
} else {
    // Check what the actual ending looks like
    const idx = code.indexOf('margin-bottom: 12px;\n              }');
    if (idx !== -1) {
        console.log('Found margin-bottom at:', idx);
        console.log('Context (200 chars after):', JSON.stringify(code.substring(idx, idx + 200)));
    } else {
        console.log('margin-bottom not found either - checking alternatives');
        const idx2 = code.indexOf('margin-bottom: 12px;');
        console.log('margin-bottom: 12px; at:', idx2);
        if (idx2 !== -1) console.log('Context:', JSON.stringify(code.substring(idx2, idx2 + 200)));
    }
    process.exit(1);
}

// ===== FIX 2: Replace the section rendering =====
const OLD_RENDER_START = '          sectionsData.forEach(sec => {\n              const secEl = document.createElement(\'div\');\n              secEl.id = sec.id;\n              secEl.className = \'mock-section\';\n              \n              const cardEl = document.createElement(\'div\');\n              cardEl.className = \'mock-card\';';
const OLD_RENDER_END = '              document.body.appendChild(secEl);\n          });';

const startIdx = code.indexOf(OLD_RENDER_START);
const endIdx = code.indexOf(OLD_RENDER_END, startIdx);

if (startIdx === -1 || endIdx === -1) {
    console.log('FIX2 ERROR: Render block bounds not found:', startIdx, endIdx);
    process.exit(1);
}

const afterEnd = endIdx + OLD_RENDER_END.length;
const NEW_RENDER = `          // Hero spacer so clock is clean on first viewport
          const _heroSpacer = document.createElement('div');
          _heroSpacer.className = 'nav-hero-spacer';
          _heroSpacer.innerHTML = '<div class="nav-hero-hint"><span>Scroll \u2193 or click clock</span><div class="nav-arrow"></div></div>';
          document.body.appendChild(_heroSpacer);
          // Dot navigator + back button
          const _dotBar = document.createElement('div');
          _dotBar.id = 'nav-dot-bar';
          document.body.appendChild(_dotBar);
          const _backBtn = document.createElement('div');
          _backBtn.id = 'nav-back-btn';
          _backBtn.innerHTML = '\u25b2';
          _backBtn.onclick = function() { window.scrollTo({ top: 0, behavior: 'smooth' }); };
          document.body.appendChild(_backBtn);
          window.addEventListener('scroll', function() {
              _backBtn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.4);
          }, { passive: true });
          sectionsData.forEach(function(sec, idx) {
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
              // Dot for sidebar nav
              const dot = document.createElement('div');
              dot.className = 'nav-dot';
              dot.dataset.target = sec.id;
              const dotLabel = document.createElement('span');
              dotLabel.className = 'dot-label';
              const rawTitle = sec.title[lang] || sec.title.en;
              dotLabel.textContent = rawTitle.replace(/[\\uD800-\\uDFFF]|[^\\w\\s\\u00C0-\\u024F]/g, '').trim();
              dot.appendChild(dotLabel);
              dot.onclick = function() { document.getElementById(sec.id).scrollIntoView({ behavior: 'smooth' }); };
              _dotBar.appendChild(dot);
          });
          // Observer to highlight current section dot
          if (typeof IntersectionObserver !== 'undefined') {
              const _sObs = new IntersectionObserver(function(entries) {
                  entries.forEach(function(en) {
                      const d = _dotBar.querySelector('[data-target="' + en.target.id + '"]');
                      if (d) d.classList.toggle('active', en.isIntersecting);
                  });
              }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
              document.querySelectorAll('.mock-section').forEach(function(s) { _sObs.observe(s); });
          }`;

code = code.substring(0, startIdx) + NEW_RENDER + code.substring(afterEnd);
console.log('FIX2 OK: Section render block replaced with hero spacer + dot nav');

fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
console.log('File saved!');
