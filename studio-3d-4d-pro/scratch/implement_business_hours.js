const fs = require('fs');

console.log("=== STARTING BUSINESS HOURS RING IMPLEMENTATION ===");

// ==========================================
// 1. MODIFY js/sketch-extruder.js
// ==========================================
if (fs.existsSync('js/sketch-extruder.js')) {
    let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

    // Add translations
    const enOld = `clocktobook: "Clock-to-Book Scheduling",`;
    const enNew = `clocktobook: "Clock-to-Book Scheduling",
            businesshours: "Business Hours Visual Ring",`;
    if (code.includes(enOld)) code = code.replace(enOld, enNew);

    const frOld = `clocktobook: "Réservation par l'Horloge",`;
    const frNew = `clocktobook: "Réservation par l'Horloge",
            businesshours: "Inel Program de Lucru (Business Hours)",`;
    if (code.includes(frOld)) code = code.replace(frOld, frNew);

    const roOld = `clocktobook: "Rezervare Programări prin Ceas",`;
    const roNew = `clocktobook: "Rezervare Programări prin Ceas",
            businesshours: "Program de Lucru Vizual (Business Hours)",`;
    if (code.includes(roOld)) code = code.replace(roOld, roNew);

    const deOld = `clocktobook: "Clock-to-Book Terminbuchung",`;
    const deNew = `clocktobook: "Clock-to-Book Terminbuchung",
            businesshours: "Geschäftszeiten-Ring (Business Hours)",`;
    if (code.includes(deOld)) code = code.replace(deOld, deNew);

    const esOld = `clocktobook: "Reservación por Reloj",`;
    const esNew = `clocktobook: "Reservación por Reloj",
            businesshours: "Anillo de Horas de Trabajo (Business Hours)",`;
    if (code.includes(esOld)) code = code.replace(esOld, esNew);

    const itOld = `clocktobook: "Prenotazione tramite Orologio",`;
    const itNew = `clocktobook: "Prenotazione tramite Orologio",
            businesshours: "Anello Orari di Lavoro (Business Hours)",`;
    if (code.includes(itOld)) code = code.replace(itOld, itNew);
    
    console.log("✔ Added translations for all 6 languages");

    // UI checkbox and sliders
    const cbOld = `              <!-- Clock-to-Book Scheduling -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-clocktobook" \\\${sp.clockToBookEnabled ? 'checked' : ''} />
                  <span data-key="clocktobook"></span>
              </label>`;
    const cbNew = `              <!-- Clock-to-Book Scheduling -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-clocktobook" \\\${sp.clockToBookEnabled ? 'checked' : ''} />
                  <span data-key="clocktobook"></span>
              </label>

              <!-- Business Hours Ring -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;">
                  <input type="checkbox" id="cu-cb-businesshours" \\\${sp.businessHoursRingEnabled ? 'checked' : ''} />
                  <span data-key="businesshours"></span>
              </label>
              <div id="cu-businesshours-controls" style="display: \\\${sp.businessHoursRingEnabled ? 'block' : 'none'}; margin-left:14px; padding: 4px; background:rgba(0,0,0,0.2); border-radius:4px; margin-bottom:6px;">
                  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                      <span style="font-size:9.5px;color:#cbd5e1;">Start Hour: <span id="lbl-bh-start-val">\\\${sp.businessHoursStart !== undefined ? sp.businessHoursStart : 9}</span>:00</span>
                      <input type="range" id="cu-businesshours-start" min="0" max="23" value="\\\${sp.businessHoursStart !== undefined ? sp.businessHoursStart : 9}" style="width:70px;height:4px;accent-color:#10b981;" />
                  </div>
                  <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:9.5px;color:#cbd5e1;">End Hour: <span id="lbl-bh-end-val">\\\${sp.businessHoursEnd !== undefined ? sp.businessHoursEnd : 18}</span>:00</span>
                      <input type="range" id="cu-businesshours-end" min="0" max="23" value="\\\${sp.businessHoursEnd !== undefined ? sp.businessHoursEnd : 18}" style="width:70px;height:4px;accent-color:#10b981;" />
                  </div>
              </div>`;
    if (code.includes(cbOld)) {
        code = code.replace(cbOld, cbNew);
        console.log("✔ Added checkbox and sliders UI");
    } else {
        console.warn("✘ Checkbox UI anchor not found!");
    }

    // sync state updateControlPanelUI
    const syncOld = `          const cbClockToBook = document.getElementById('cu-cb-clocktobook');
          if (cbClockToBook) cbClockToBook.checked = !!sp.clockToBookEnabled;`;
    const syncNew = `          const cbClockToBook = document.getElementById('cu-cb-clocktobook');
          if (cbClockToBook) cbClockToBook.checked = !!sp.clockToBookEnabled;

          const cbBusinessHours = document.getElementById('cu-cb-businesshours');
          if (cbBusinessHours) cbBusinessHours.checked = !!sp.businessHoursRingEnabled;
          
          const divBusinessHours = document.getElementById('cu-businesshours-controls');
          if (divBusinessHours) divBusinessHours.style.display = sp.businessHoursRingEnabled ? 'block' : 'none';
          
          const sldBhStart = document.getElementById('cu-businesshours-start');
          if (sldBhStart) sldBhStart.value = sp.businessHoursStart !== undefined ? sp.businessHoursStart : 9;
          
          const sldBhEnd = document.getElementById('cu-businesshours-end');
          if (sldBhEnd) sldBhEnd.value = sp.businessHoursEnd !== undefined ? sp.businessHoursEnd : 18;`;
    if (code.includes(syncOld)) {
        code = code.replace(syncOld, syncNew);
        console.log("✔ Added updateControlPanelUI sync");
    } else {
        console.warn("✘ updateControlPanelUI sync anchor not found!");
    }

    // prefix mapping in applyLanguage
    const prefOld = `                  if (key === 'clocktobook') prefix = '📅 ';`;
    const prefNew = `                  if (key === 'clocktobook') prefix = '📅 ';
                  if (key === 'businesshours') prefix = '🟢 ';`;
    if (code.includes(prefOld)) {
        code = code.replace(prefOld, prefNew);
        console.log("✔ Added prefix mapping");
    } else {
        console.warn("✘ Prefix mapping anchor not found!");
    }

    // Event Bindings
    const bindOld = `      if (cbClockToBook) {
          cbClockToBook.onchange = (e) => {
              sp.clockToBookEnabled = e.target.checked;
              if (e.target.checked) {
                  if (cbNavMenu) {
                      cbNavMenu.checked = false;
                      sp.navigatorMenuEnabled = false;
                  }
                  if (typeof ensureEditorBookModal === 'function') ensureEditorBookModal();
              }
          };
      }`;
    const bindNew = `      if (cbClockToBook) {
          cbClockToBook.onchange = (e) => {
              sp.clockToBookEnabled = e.target.checked;
              if (e.target.checked) {
                  if (cbNavMenu) {
                      cbNavMenu.checked = false;
                      sp.navigatorMenuEnabled = false;
                  }
                  if (typeof ensureEditorBookModal === 'function') ensureEditorBookModal();
              }
          };
      }

      const cbBusinessHours = document.getElementById('cu-cb-businesshours');
      const divBusinessHours = document.getElementById('cu-businesshours-controls');
      const sldBhStart = document.getElementById('cu-businesshours-start');
      const sldBhEnd = document.getElementById('cu-businesshours-end');
      
      if (cbBusinessHours) {
          cbBusinessHours.onchange = (e) => {
              sp.businessHoursRingEnabled = e.target.checked;
              if (divBusinessHours) divBusinessHours.style.display = sp.businessHoursRingEnabled ? 'block' : 'none';
              rebuildClockUltraGeo();
          };
      }
      if (sldBhStart) {
          sldBhStart.oninput = (e) => {
              sp.businessHoursStart = parseInt(e.target.value);
              const valDisp = document.getElementById('lbl-bh-start-val');
              if (valDisp) valDisp.textContent = sp.businessHoursStart;
              rebuildClockUltraGeo();
          };
      }
      if (sldBhEnd) {
          sldBhEnd.oninput = (e) => {
              sp.businessHoursEnd = parseInt(e.target.value);
              const valDisp = document.getElementById('lbl-bh-end-val');
              if (valDisp) valDisp.textContent = sp.businessHoursEnd;
              rebuildClockUltraGeo();
          };
      }`;
    if (code.includes(bindOld)) {
        code = code.replace(bindOld, bindNew);
        console.log("✔ Added event bindings for sliders and checkboxes");
    } else {
        console.warn("✘ Event bindings anchor not found!");
    }

    // 3D Mesh Geometry rebuild (in buildClockUltraGeo)
    const geomOld = `      if (bezelMesh && mStyle !== 'none') {
          bezelMesh.position.z = 0.5;
          meshGroup.add(bezelMesh);
      }`;
    const geomNew = `      if (bezelMesh && mStyle !== 'none') {
          bezelMesh.position.z = 0.5;
          meshGroup.add(bezelMesh);
      }

      // 3D Business Hours Ring (Visual program)
      if (p0.businessHoursRingEnabled) {
          const hStart = p0.businessHoursStart !== undefined ? p0.businessHoursStart : 9;
          const hEnd = p0.businessHoursEnd !== undefined ? p0.businessHoursEnd : 18;
          const hs = parseFloat(hStart);
          const he = parseFloat(hEnd);
          
          let lenHours = he - hs;
          if (lenHours < 0) lenHours += 24;
          // Calculate active arc length in radians
          const arcLength = (lenHours / 12) * Math.PI * 2;
          // Start angle (clockwise from East to North mapping)
          const startAngle = Math.PI / 2 - (he / 12) * Math.PI * 2;
          
          // Outer glowing ring
          const ringGeo = new THREE.TorusGeometry(37.3, 0.45, 8, 48, arcLength);
          
          // Glowing material initially colored based on whether it is open/closed
          const curTime = new Date();
          const curHr = curTime.getHours() + curTime.getMinutes() / 60;
          let isOpen = false;
          if (he > hs) {
              isOpen = curHr >= hs && curHr < he;
          } else {
              isOpen = curHr >= hs || curHr < he;
          }
          const ringColor = isOpen ? 0x10b981 : 0xef4444; // Green / Red
          
          const ringMat = new THREE.MeshPhongMaterial({
              color: ringColor,
              emissive: ringColor,
              emissiveIntensity: 1.5,
              transparent: true,
              opacity: 0.9,
              shininess: 90
          });
          const bhRingMesh = new THREE.Mesh(ringGeo, ringMat);
          bhRingMesh.name = 'businessHoursRing';
          bhRingMesh.position.z = 0.55; // just above bezel
          bhRingMesh.rotation.z = startAngle;
          meshGroup.add(bhRingMesh);
      }`;
    if (code.includes(geomOld)) {
        code = code.replace(geomOld, geomNew);
        console.log("✔ Injected 3D Business Hours Ring generation in buildClockUltraGeo");
    } else {
        console.warn("✘ buildClockUltraGeo anchor not found!");
    }

    // Dynamic rotation update inside addClockUltraAnimCb
    const animOld = `          if (partsMap.hand_h) partsMap.hand_h.rotation.z = overrideHands ? angleH_nav : angleH_real;
          if (partsMap.hand_m) partsMap.hand_m.rotation.z = overrideHands ? angleM_nav : angleM_real;`;
    const animNew = `          if (partsMap.hand_h) partsMap.hand_h.rotation.z = overrideHands ? angleH_nav : angleH_real;
          if (partsMap.hand_m) partsMap.hand_m.rotation.z = overrideHands ? angleM_nav : angleM_real;

          // Dynamically update Business Hours Ring status color
          const bhRing = m.runtimeGroup ? m.runtimeGroup.getObjectByName('businessHoursRing') : null;
          if (bhRing) {
              const hStart = p0.businessHoursStart !== undefined ? p0.businessHoursStart : 9;
              const hEnd = p0.businessHoursEnd !== undefined ? p0.businessHoursEnd : 18;
              const hs = parseFloat(hStart);
              const he = parseFloat(hEnd);
              const curHr = now.getHours() + now.getMinutes() / 60;
              let isOpen = false;
              if (he > hs) {
                  isOpen = curHr >= hs && curHr < he;
              } else {
                  isOpen = curHr >= hs || curHr < he;
              }
              const targetColor = isOpen ? 0x10b981 : 0xef4444;
              if (bhRing.material.color.getHex() !== targetColor) {
                  bhRing.material.color.setHex(targetColor);
                  bhRing.material.emissive.setHex(targetColor);
              }
          }`;
    if (code.includes(animOld)) {
        code = code.replace(animOld, animNew);
        console.log("✔ Injected dynamic color updates inside addClockUltraAnimCb");
    } else {
        console.warn("✘ addClockUltraAnimCb anchor not found!");
    }

    fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
    console.log("✔ SUCCESSFULLY WRITTEN js/sketch-extruder.js");
}

// ==========================================
// 2. MODIFY js/clock-ultra-3d.js
// ==========================================
if (fs.existsSync('js/clock-ultra-3d.js')) {
    let code = fs.readFileSync('js/clock-ultra-3d.js', 'utf8');

    // Variable declarations
    const varOld = `    let navigatorMenuEnabled = false;
    let clockToBookEnabled = false;`;
    const varNew = `    let navigatorMenuEnabled = false;
    let clockToBookEnabled = false;
    let businessHoursRingEnabled = false;
    let businessHoursStart = 9;
    let businessHoursEnd = 18;`;
    if (code.includes(varOld)) {
        code = code.replace(varOld, varNew);
        console.log("✔ Declared variables in clock-ultra-3d.js");
    } else {
        console.warn("✘ Variable anchor not found in clock-ultra-3d.js!");
    }

    // English label
    const enLabelOld = `clockToBookEnabledLabel: 'Clock-to-Book Appointment Scheduling',`;
    const enLabelNew = `clockToBookEnabledLabel: 'Clock-to-Book Appointment Scheduling',
            businessHoursRingEnabledLabel: 'Business Hours Visual Ring',`;
    if (code.includes(enLabelOld)) {
        code = code.replace(enLabelOld, enLabelNew);
        console.log("✔ Added English label");
    } else {
        console.warn("✘ English label anchor not found in clock-ultra-3d.js!");
    }

    // French label
    const frLabelOld = `clockToBookEnabledLabel: 'Réservation par l\\'Horloge (Clock-to-Book)',`;
    const frLabelNew = `clockToBookEnabledLabel: 'Réservation par l\\'Horloge (Clock-to-Book)',
            businessHoursRingEnabledLabel: 'Program de Lucru Vizual (Business Hours)',`;
    if (code.includes(frLabelOld)) {
        code = code.replace(frLabelOld, frLabelNew);
        console.log("✔ Added French/Romanian label");
    } else {
        console.warn("✘ French label anchor not found in clock-ultra-3d.js!");
    }

    // UI checkbox and sliders
    const uiCbOld = `                    <!-- Clock-to-Book Scheduling -->
                    <label class="cb-row">
                        <input type="checkbox" id="cu3-opt-clocktobook" \${clockToBookEnabled?'checked':''} />
                        <span>\${l.clockToBookEnabledLabel}</span>
                    </label>`;
    const uiCbNew = `                    <!-- Clock-to-Book Scheduling -->
                    <label class="cb-row">
                        <input type="checkbox" id="cu3-opt-clocktobook" \${clockToBookEnabled?'checked':''} />
                        <span>\${l.clockToBookEnabledLabel}</span>
                    </label>

                    <!-- Business Hours Ring -->
                    <label class="cb-row">
                        <input type="checkbox" id="cu3-opt-businesshours" \${businessHoursRingEnabled?'checked':''} />
                        <span>\${l.businessHoursRingEnabledLabel}</span>
                    </label>
                    <div id="cu3-businesshours-controls" style="display: \${businessHoursRingEnabled?'block':'none'}; margin-left: 20px; padding: 6px; background: rgba(0,0,0,0.15); border-radius: 4px; margin-bottom: 8px;">
                        <div class="slider-row" style="margin-bottom: 4px;">
                            <span class="slider-label" style="font-size: 9.5px;">Start Hour: <span id="cu3-bh-start-val">\${businessHoursStart}</span>:00</span>
                            <input type="range" id="cu3-businesshours-start" min="0" max="23" value="\${businessHoursStart}" style="flex:1;height:4px;accent-color:#10b981;" />
                        </div>
                        <div class="slider-row">
                            <span class="slider-label" style="font-size: 9.5px;">End Hour: <span id="cu3-bh-end-val">\${businessHoursEnd}</span>:00</span>
                            <input type="range" id="cu3-businesshours-end" min="0" max="23" value="\${businessHoursEnd}" style="flex:1;height:4px;accent-color:#10b981;" />
                        </div>
                    </div>`;
    if (code.includes(uiCbOld)) {
        code = code.replace(uiCbOld, uiCbNew);
        console.log("✔ Added UI components to panel");
    } else {
        console.warn("✘ UI components anchor not found in clock-ultra-3d.js!");
    }

    // Bind event handlers
    const bindOld = `        if (optClockToBook) {
            optClockToBook.onchange = (e) => {
                clockToBookEnabled = e.target.checked;
                if (e.target.checked && optNavMenu) {
                    optNavMenu.checked = false;
                    navigatorMenuEnabled = false;
                }
                syncProModel();
            };
        }`;
    const bindNew = `        if (optClockToBook) {
            optClockToBook.onchange = (e) => {
                clockToBookEnabled = e.target.checked;
                if (e.target.checked && optNavMenu) {
                    optNavMenu.checked = false;
                    navigatorMenuEnabled = false;
                }
                syncProModel();
            };
        }

        const optBusinessHours = document.getElementById('cu3-opt-businesshours');
        const divBhControls = document.getElementById('cu3-businesshours-controls');
        const sldBhStart = document.getElementById('cu3-businesshours-start');
        const sldBhEnd = document.getElementById('cu3-businesshours-end');
        
        if (optBusinessHours) {
            optBusinessHours.onchange = (e) => {
                businessHoursRingEnabled = e.target.checked;
                if (divBhControls) divBhControls.style.display = businessHoursRingEnabled ? 'block' : 'none';
                build3DClockwork();
                syncProModel();
            };
        }
        if (sldBhStart) {
            sldBhStart.oninput = (e) => {
                businessHoursStart = parseInt(e.target.value);
                const valDisp = document.getElementById('cu3-bh-start-val');
                if (valDisp) valDisp.textContent = businessHoursStart;
                build3DClockwork();
                syncProModel();
            };
        }
        if (sldBhEnd) {
            sldBhEnd.oninput = (e) => {
                businessHoursEnd = parseInt(e.target.value);
                const valDisp = document.getElementById('cu3-bh-end-val');
                if (valDisp) valDisp.textContent = businessHoursEnd;
                build3DClockwork();
                syncProModel();
            };
        }`;
    if (code.includes(bindOld)) {
        code = code.replace(bindOld, bindNew);
        console.log("✔ Added event bindings in clock-ultra-3d.js panel");
    } else {
        console.warn("✘ Event bindings anchor not found in clock-ultra-3d.js!");
    }

    // Sync inclusion
    const syncOld = `            navigatorMenuEnabled: navigatorMenuEnabled,
            clockToBookEnabled: clockToBookEnabled,`;
    const syncNew = `            navigatorMenuEnabled: navigatorMenuEnabled,
            clockToBookEnabled: clockToBookEnabled,
            businessHoursRingEnabled: businessHoursRingEnabled,
            businessHoursStart: businessHoursStart,
            businessHoursEnd: businessHoursEnd,`;
    if (code.includes(syncOld)) {
        code = code.replace(syncOld, syncNew);
        console.log("✔ Included variables in syncProModel");
    } else {
        console.warn("✘ syncProModel anchor not found in clock-ultra-3d.js!");
    }

    // Settings loading
    const loadOld = `                        navigatorMenuEnabled = p0.navigatorMenuEnabled !== undefined ? p0.navigatorMenuEnabled : false;
                        clockToBookEnabled = p0.clockToBookEnabled !== undefined ? p0.clockToBookEnabled : false;`;
    const loadNew = `                        navigatorMenuEnabled = p0.navigatorMenuEnabled !== undefined ? p0.navigatorMenuEnabled : false;
                        clockToBookEnabled = p0.clockToBookEnabled !== undefined ? p0.clockToBookEnabled : false;
                        businessHoursRingEnabled = p0.businessHoursRingEnabled !== undefined ? p0.businessHoursRingEnabled : false;
                        businessHoursStart = p0.businessHoursStart !== undefined ? p0.businessHoursStart : 9;
                        businessHoursEnd = p0.businessHoursEnd !== undefined ? p0.businessHoursEnd : 18;`;
    if (code.includes(loadOld)) {
        code = code.replace(loadOld, loadNew);
        console.log("✔ Loaded settings parameters");
    } else {
        console.warn("✘ Settings loading anchor not found in clock-ultra-3d.js!");
    }

    fs.writeFileSync('js/clock-ultra-3d.js', code, 'utf8');
    console.log("✔ SUCCESSFULLY WRITTEN js/clock-ultra-3d.js");
}

console.log("=== COMPLETED BUSINESS HOURS RING IMPLEMENTATION ===");
