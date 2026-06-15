const fs = require('fs');
const path = require('path');

const filePath = path.resolve('js/sketch-extruder.js');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Locate the misplaced block to delete it.
const misplacedBlockStart = `// ── Navigator Menu section (always injected) ──`;
const misplacedBlockEnd = `      });`;

const startIdx = content.indexOf(misplacedBlockStart);
if (startIdx === -1) {
    console.error("Could not find misplaced Navigator Menu section start!");
    process.exit(1);
}

// Find the first "      });" after startIdx
const endIdx = content.indexOf(misplacedBlockEnd, startIdx);
if (endIdx === -1) {
    console.error("Could not find misplaced Navigator Menu section end!");
    process.exit(1);
}

const fullMisplacedBlockLength = (endIdx + misplacedBlockEnd.length) - startIdx;
const misplacedBlockText = content.substring(startIdx, endIdx + misplacedBlockEnd.length);

console.log("Found misplaced block text length:", misplacedBlockText.length);

// Remove the misplaced block
content = content.replace(misplacedBlockText, '');

// 2. Locate the insertion point inside pointerup:
const insertionTarget = `                          if (window.parent) {
                              window.parent.postMessage({ type: 'clock-book-click', hour: hour }, '*');
                          }
                      }`;

const targetStr = content.includes('\r\n') ? insertionTarget.replace(/\n/g, '\r\n') : insertionTarget;
const insertIdx = content.indexOf(targetStr);
if (insertIdx === -1) {
    console.error("Could not find insertion target in pointerup listener!");
    process.exit(1);
}

// Let's replace the insertionTarget with insertionTarget + navigator menu block
const newNavigatorMenuBlock = `\n\n                      // ── Navigator Menu section (always injected) ──
                      if (sp.navigatorMenuEnabled) {
                          const anchorMap = {
                              12: 'home',
                              1: 'features',
                              2: 'about',
                              3: 'about',
                              4: 'services',
                              5: 'pricing',
                              6: 'portfolio',
                              7: 'testimonials',
                              8: 'faq',
                              9: 'contact',
                              10: 'contact',
                              11: 'footer'
                          };
                          const anchor = anchorMap[hour];
                          // Show overlay popup for the section
                          if (window._showNavSection) {
                              window._showNavSection(anchor, hour);
                          } else {
                              const el = document.getElementById(anchor);
                              if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }
                          if (window.toast) {
                              const secLabel = anchor ? anchor.toUpperCase() : hour;
                              window.toast(getCuText('section_toast') + secLabel);
                          }
                          
                          window.dispatchEvent(new CustomEvent('clock-menu-click', { detail: { hour: hour, anchor: anchor } }));
                          if (window.parent) {
                              window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
                          }
                      }`;

const replacementStr = targetStr + (content.includes('\r\n') ? newNavigatorMenuBlock.replace(/\n/g, '\r\n') : newNavigatorMenuBlock);

content = content.replace(targetStr, replacementStr);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully fixed sketch-extruder.js!");
