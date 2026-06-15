const fs = require('fs');
let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// =========================================================
// FIX: Replace hero spacer + dot nav + scrollable sections
// with a clean overlay popup approach
// =========================================================

// STEP 1: Find and replace the entire new CSS we added (dots, hero, back btn)
// Replace just the extra CSS we added (from .nav-hero-spacer to end of #nav-back-btn)
const EXTRA_CSS_START = '\n              /* Hero spacer */\n              .nav-hero-spacer {';
const EXTRA_CSS_END = '              #nav-back-btn:hover { background: rgba(34,211,238,0.15); transform: scale(1.1); }';

const idxCssStart = code.indexOf(EXTRA_CSS_START);
const idxCssEnd = code.indexOf(EXTRA_CSS_END);

if (idxCssStart === -1 || idxCssEnd === -1) {
    console.log('CSS markers:', idxCssStart, idxCssEnd);
    // Try alternate
    console.log('Trying to find mock-section instead...');
}

// Replace with clean overlay CSS
const NEW_EXTRA_CSS = `
              /* Section overlay popup */
              #nav-section-overlay {
                  position: fixed;
                  inset: 0;
                  z-index: 10000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: rgba(5, 8, 21, 0.7);
                  backdrop-filter: blur(6px);
                  -webkit-backdrop-filter: blur(6px);
                  opacity: 0;
                  pointer-events: none;
                  transition: opacity 0.35s ease;
              }
              #nav-section-overlay.active {
                  opacity: 1;
                  pointer-events: auto;
              }
              #nav-section-card {
                  max-width: 560px;
                  width: 90%;
                  background: rgba(8,12,28,0.95);
                  backdrop-filter: blur(20px);
                  -webkit-backdrop-filter: blur(20px);
                  border: 1px solid rgba(6,182,212,0.45);
                  border-radius: 22px;
                  padding: 38px 40px;
                  color: #cbd5e1;
                  box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(6,182,212,0.18);
                  transform: translateY(24px) scale(0.96);
                  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
                  position: relative;
                  font-family: sans-serif;
              }
              #nav-section-overlay.active #nav-section-card {
                  transform: translateY(0) scale(1);
              }
              #nav-section-close {
                  position: absolute;
                  top: 16px;
                  right: 18px;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  background: rgba(6,182,212,0.12);
                  border: 1px solid rgba(6,182,212,0.3);
                  color: #22d3ee;
                  font-size: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: background 0.2s;
              }
              #nav-section-close:hover { background: rgba(6,182,212,0.3); }
              #nav-section-tag {
                  display: inline-block;
                  padding: 4px 12px;
                  background: rgba(6,182,212,0.12);
                  color: #22d3ee;
                  border-radius: 20px;
                  font-size: 11px;
                  font-weight: bold;
                  margin-bottom: 16px;
                  letter-spacing: 1.2px;
                  text-transform: uppercase;
              }
              #nav-section-title {
                  margin: 0 0 14px 0;
                  font-size: 30px;
                  background: linear-gradient(90deg, #22d3ee, #818cf8);
                  -webkit-background-clip: text;
                  -webkit-text-fill-color: transparent;
                  letter-spacing: -0.5px;
              }
              #nav-section-desc {
                  font-size: 15px;
                  line-height: 1.75;
                  color: #94a3b8;
                  margin: 0 0 22px 0;
              }
              #nav-section-hour-badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 6px 14px;
                  background: rgba(129,140,248,0.1);
                  border: 1px solid rgba(129,140,248,0.3);
                  border-radius: 20px;
                  color: #a5b4fc;
                  font-size: 12px;
                  font-weight: bold;
                  letter-spacing: 0.5px;
              }`;

if (idxCssStart !== -1 && idxCssEnd !== -1) {
    const afterEnd = idxCssEnd + EXTRA_CSS_END.length;
    code = code.substring(0, idxCssStart) + NEW_EXTRA_CSS + code.substring(afterEnd);
    console.log('✅ CSS replaced with overlay popup styles');
} else {
    // Try to find mock-section CSS to do targeted replacement
    const mcStart = code.indexOf('\n              .mock-section {');
    const mcEnd = code.indexOf('.mock-card .meta-tag {');
    if (mcStart !== -1 && mcEnd !== -1) {
        // Just append new overlay CSS after meta-tag block end
        const metaEnd = code.indexOf('\n              }', mcEnd) + '\n              }'.length;
        code = code.substring(0, metaEnd) + '\n' + NEW_EXTRA_CSS + code.substring(metaEnd);
        console.log('✅ CSS appended after meta-tag block');
    } else {
        console.log('❌ Could not find CSS insertion point');
        process.exit(1);
    }
}

// STEP 2: Replace the section rendering (hero spacer + dots + forEach) with overlay approach
const OLD_RENDER_MARKER_START = "          // Hero spacer so clock is clean on first viewport\n          const _heroSpacer";
const OLD_RENDER_MARKER_END = "              document.querySelectorAll('.mock-section').forEach(function(s) { _sObs.observe(s); });\n          }";

const r1 = code.indexOf(OLD_RENDER_MARKER_START);
const r2 = code.indexOf(OLD_RENDER_MARKER_END, r1);

if (r1 === -1 || r2 === -1) {
    console.log('RENDER markers not found:', r1, r2);
    // Fallback - find the sectionsData.forEach block
    const alt1 = code.indexOf("          // Hero spacer: first screen shows clock + scroll hint, sections below\n          const heroSpacer");
    const alt2 = code.indexOf("          });", alt1 + 100);
    if (alt1 !== -1 && alt2 !== -1) {
        const OLD_ALT_END = "              document.querySelectorAll('.mock-section').forEach(s => obs.observe(s));\n";
        const altEnd2 = code.indexOf(OLD_ALT_END, alt1);
        console.log('Alt markers:', alt1, altEnd2);
    }
    process.exit(1);
}

const afterR2 = r2 + OLD_RENDER_MARKER_END.length;

const NEW_RENDER = `          // Create hidden overlay popup (shown on clock-number click)
          const _navOverlay = document.createElement('div');
          _navOverlay.id = 'nav-section-overlay';
          _navOverlay.innerHTML = '<div id="nav-section-card"><div id="nav-section-close">&#x2715;</div><div id="nav-section-tag"></div><h2 id="nav-section-title"></h2><p id="nav-section-desc"></p><div id="nav-section-hour-badge"><span id="nav-hour-icon">&#x1F551;</span><span id="nav-hour-text"></span></div></div>';
          document.body.appendChild(_navOverlay);
          // Close on backdrop or close button click
          _navOverlay.addEventListener('click', function(ev) {
              if (ev.target === _navOverlay || ev.target.id === 'nav-section-close') {
                  _navOverlay.classList.remove('active');
              }
          });
          document.addEventListener('keydown', function(ev) {
              if (ev.key === 'Escape') _navOverlay.classList.remove('active');
          });
          // Store sections data for lookup
          window._navSectionsData = sectionsData;
          window._navCurrentLang = lang;
          window._showNavSection = function(anchor, hour) {
              const sec = sectionsData.find(function(s) { return s.id === anchor; });
              if (!sec) return;
              const curLang = (typeof cuLangSelect !== 'undefined' && cuLangSelect && cuLangSelect.value) || lang;
              document.getElementById('nav-section-tag').textContent = 'SECTION: #' + anchor.toUpperCase();
              document.getElementById('nav-section-title').innerHTML = sec.title[curLang] || sec.title.en;
              document.getElementById('nav-section-desc').innerHTML = sec.desc[curLang] || sec.desc.en;
              const hourNames = { en: 'Hour', fr: 'Heure', ro: 'Ora', de: 'Stunde', es: 'Hora', it: 'Ora' };
              document.getElementById('nav-hour-text').textContent = (hourNames[curLang] || 'Hour') + ' ' + hour + ' \u2192 #' + anchor;
              _navOverlay.classList.add('active');
          };`;

code = code.substring(0, r1) + NEW_RENDER + code.substring(afterR2);
console.log('✅ Render block replaced with overlay popup approach');

// STEP 3: Update the click handler to call window._showNavSection instead of scrollIntoView
const OLD_TOAST_BLOCK = `                      const el = document.getElementById(anchor);
                      if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          if (window.toast) {
                              window.toast(getCuText('section_toast') + anchor.toUpperCase() + ' (#' + anchor + ')');
                          }
                      } else {
                          if (window.toast) {
                              window.toast(getCuText('dial_click_toast').replace('{hour}', hour));
                          }
                      }`;

const NEW_TOAST_BLOCK = `                      // Show overlay popup for the section
                      if (window._showNavSection) {
                          window._showNavSection(anchor, hour);
                      } else {
                          const el = document.getElementById(anchor);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                      if (window.toast) {
                          const secLabel = anchor ? anchor.toUpperCase() : hour;
                          window.toast(getCuText('section_toast') + secLabel);
                      }`;

if (code.includes(OLD_TOAST_BLOCK)) {
    code = code.split(OLD_TOAST_BLOCK).join(NEW_TOAST_BLOCK);
    console.log('✅ Click handler updated to use overlay popup');
} else {
    console.log('❌ Toast block not found - click handler unchanged');
}

fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
console.log('✅ File saved!');
