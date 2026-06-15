const fs = require('fs');
let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// The current faceMesh-based click handler
const OLD = `                  const faceMesh = hasClockUltra.runtimeGroup.getObjectByName('faceMesh');
                  if (faceMesh) {
                      const intersects = rayc.intersectObject(faceMesh);
                      if (intersects.length > 0) {
                          const localPt = faceMesh.worldToLocal(intersects[0].point.clone());
                          const angle = Math.atan2(localPt.x, localPt.y);
                          let deg = angle * (180 / Math.PI);
                          if (deg < 0) deg += 360;
                          let hour = Math.round(deg / 30);
                          if (hour === 0) hour = 12;
                          
                          window._cuNavTargetHour = hour;
                          window._cuNavTargetTime = Date.now();
                          
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
                          const el = document.getElementById(anchor);
                          if (el) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              if (window.toast) {
                                  window.toast(getCuText('section_toast') + anchor.toUpperCase() + ' (#' + anchor + ')');
                              }
                          } else {
                              if (window.toast) {
                                  window.toast(getCuText('dial_click_toast').replace('{hour}', hour));
                              }
                          }
                          
                          window.dispatchEvent(new CustomEvent('clock-menu-click', { detail: { hour: hour, anchor: anchor } }));
                          if (window.parent) {
                              window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
                          }
                      }
                  }`;

const NEW = `                  // Try faceMesh first, then fallback to runtimeGroup intersect, then screen-position angle
                  const faceMesh = hasClockUltra.runtimeGroup ? hasClockUltra.runtimeGroup.getObjectByName('faceMesh') : null;
                  let hour = null;
                  
                  if (faceMesh) {
                      const intersects = rayc.intersectObject(faceMesh);
                      if (intersects.length > 0) {
                          const localPt = faceMesh.worldToLocal(intersects[0].point.clone());
                          const angle = Math.atan2(localPt.x, localPt.y);
                          let deg = angle * (180 / Math.PI);
                          if (deg < 0) deg += 360;
                          hour = Math.round(deg / 30);
                          if (hour === 0) hour = 12;
                      }
                  }
                  
                  // Fallback: if no faceMesh hit, raycast against whole runtimeGroup
                  if (hour === null && hasClockUltra.runtimeGroup) {
                      const allIntersects = rayc.intersectObjects(hasClockUltra.runtimeGroup.children, true);
                      if (allIntersects.length > 0) {
                          const hit = allIntersects[0];
                          const ref = hasClockUltra.runtimeGroup;
                          const localPt = ref.worldToLocal(hit.point.clone());
                          const angle = Math.atan2(localPt.x, localPt.y);
                          let deg = angle * (180 / Math.PI);
                          if (deg < 0) deg += 360;
                          hour = Math.round(deg / 30);
                          if (hour === 0) hour = 12;
                      }
                  }
                  
                  // Fallback 2: use screen position relative to clock center
                  if (hour === null) {
                      // Project clock center to screen and compute angle from click
                      const clockPos = new THREE.Vector3();
                      if (hasClockUltra.runtimeGroup) hasClockUltra.runtimeGroup.getWorldPosition(clockPos);
                      clockPos.project(camera);
                      const screenCX = (clockPos.x + 1) / 2 * rect.width + rect.left;
                      const screenCY = (-clockPos.y + 1) / 2 * rect.height + rect.top;
                      const dx = e.clientX - screenCX;
                      const dy = e.clientY - screenCY;
                      const angle = Math.atan2(dx, -dy); // top = 12 o'clock
                      let deg = angle * (180 / Math.PI);
                      if (deg < 0) deg += 360;
                      hour = Math.round(deg / 30);
                      if (hour === 0) hour = 12;
                  }
                  
                  if (hour !== null) {
                      window._cuNavTargetHour = hour;
                      window._cuNavTargetTime = Date.now();
                      
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
                      const el = document.getElementById(anchor);
                      if (el) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          if (window.toast) {
                              window.toast(getCuText('section_toast') + anchor.toUpperCase() + ' (#' + anchor + ')');
                          }
                      } else {
                          if (window.toast) {
                              window.toast(getCuText('dial_click_toast').replace('{hour}', hour));
                          }
                      }
                      
                      window.dispatchEvent(new CustomEvent('clock-menu-click', { detail: { hour: hour, anchor: anchor } }));
                      if (window.parent) {
                          window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
                      }
                  }`;

if (code.includes(OLD)) {
    code = code.split(OLD).join(NEW);
    fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
    console.log('✅ Click handler upgraded with 3-tier fallback raycasting!');
} else {
    // Try to find how much matches
    const lines = OLD.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (!code.includes(lines[i])) {
            console.log(`❌ First non-matching line [${i}]: "${lines[i]}"`);
            break;
        }
    }
    console.log('❌ Could not find exact match for OLD block');
}
