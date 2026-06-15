const fs = require('fs');

console.log("=== STARTING CLOCK-TO-BOOK IMPLEMENTATION ===");

// ==========================================
// 1. MODIFY js/sketch-extruder.js
// ==========================================
if (fs.existsSync('js/sketch-extruder.js')) {
    let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');
    
    // EN Translations
    const enOld = `dial_click_toast: "🕐 Hour {hour} clicked — assign a section in settings"`;
    const enNew = `dial_click_toast: "🕐 Hour {hour} clicked — assign a section in settings",
            clocktobook: "Clock-to-Book Scheduling",
            book_toast: "Opening booking slot: "`;
    if (code.includes(enOld)) {
        code = code.replace(enOld, enNew);
        console.log("✔ Added English translations");
    } else {
        console.warn("✘ English translations anchor not found!");
    }

    // FR Translations
    const frOld = `dial_click_toast: "🕐 Heure {hour} cliquée — assigner une section dans les paramètres"`;
    const frNew = `dial_click_toast: "🕐 Heure {hour} cliquée — assigner une section dans les paramètres",
            clocktobook: "Réservation par l'Horloge",
            book_toast: "Ouverture du créneau : "`;
    if (code.includes(frOld)) {
        code = code.replace(frOld, frNew);
        console.log("✔ Added French translations");
    } else {
        console.warn("✘ French translations anchor not found!");
    }

    // RO Translations
    const roOld = `dial_click_toast: "🕐 Ora {hour} apăsată — atribuiți o secțiune în setări"`;
    const roNew = `dial_click_toast: "🕐 Ora {hour} apăsată — atribuiți o secțiune în setări",
            clocktobook: "Rezervare Programări prin Ceas",
            book_toast: "Deschidere interval programare: "`;
    if (code.includes(roOld)) {
        code = code.replace(roOld, roNew);
        console.log("✔ Added Romanian translations");
    } else {
        console.warn("✘ Romanian translations anchor not found!");
    }

    // DE Translations
    const deOld = `dial_click_toast: "🕐 Stunde {hour} geklickt — Abschnitt in Einstellungen zuweisen"`;
    const deNew = `dial_click_toast: "🕐 Stunde {hour} geklickt — Abschnitt in Einstellungen zuweisen",
            clocktobook: "Clock-to-Book Terminbuchung",
            book_toast: "Öffne Buchungszeitraum: "`;
    if (code.includes(deOld)) {
        code = code.replace(deOld, deNew);
        console.log("✔ Added German translations");
    } else {
        console.warn("✘ German translations anchor not found!");
    }

    // ES Translations
    const esOld = `dial_click_toast: "🕐 Hora {hour} clicada — asignar una sección en la configuración"`;
    const esNew = `dial_click_toast: "🕐 Hora {hour} clicada — asignar una sección en la configuración",
            clocktobook: "Reservación por Reloj",
            book_toast: "Abriendo espacio de reserva: "`;
    if (code.includes(esOld)) {
        code = code.replace(esOld, esNew);
        console.log("✔ Added Spanish translations");
    } else {
        console.warn("✘ Spanish translations anchor not found!");
    }

    // IT Translations
    const itOld = `dial_click_toast: "🕐 Ora {hour} cliccata — assegna una sezione nelle impostazioni"`;
    const itNew = `dial_click_toast: "🕐 Ora {hour} cliccata — assegna una sezione nelle impostazioni",
            clocktobook: "Prenotazione tramite Orologio",
            book_toast: "Apertura orario di prenotazione: "`;
    if (code.includes(itOld)) {
        code = code.replace(itOld, itNew);
        console.log("✔ Added Italian translations");
    } else {
        console.warn("✘ Italian translations anchor not found!");
    }

    // Controls Checkbox UI
    const cbOld = `              <!-- Navigation Menu -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-navmenu" \\\${sp.navigatorMenuEnabled ? 'checked' : ''} />
                  <span data-key="navmenu"></span>
              </label>`;
    const cbNew = `              <!-- Navigation Menu -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-navmenu" \\\${sp.navigatorMenuEnabled ? 'checked' : ''} />
                  <span data-key="navmenu"></span>
              </label>

              <!-- Clock-to-Book Scheduling -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:6px;">
                  <input type="checkbox" id="cu-cb-clocktobook" \\\${sp.clockToBookEnabled ? 'checked' : ''} />
                  <span data-key="clocktobook"></span>
              </label>`;
    if (code.includes(cbOld)) {
        code = code.replace(cbOld, cbNew);
        console.log("✔ Added editor checkbox UI");
    } else {
        console.warn("✘ Editor checkbox UI anchor not found!");
    }

    // Sync state updateControlPanelUI
    const syncOld = `          // Sync the 5 new premium focus/utility features
          const cbNavMenu = document.getElementById('cu-cb-navmenu');
          if (cbNavMenu) cbNavMenu.checked = !!sp.navigatorMenuEnabled;`;
    const syncNew = `          // Sync the 5 new premium focus/utility features
          const cbNavMenu = document.getElementById('cu-cb-navmenu');
          if (cbNavMenu) cbNavMenu.checked = !!sp.navigatorMenuEnabled;

          const cbClockToBook = document.getElementById('cu-cb-clocktobook');
          if (cbClockToBook) cbClockToBook.checked = !!sp.clockToBookEnabled;`;
    if (code.includes(syncOld)) {
        code = code.replace(syncOld, syncNew);
        console.log("✔ Synchronized Clock-to-Book UI checked state");
    } else {
        console.warn("✘ updateControlPanelUI sync anchor not found!");
    }

    // applyLanguage prefix mapping
    const prefOld = `                  if (key === 'navmenu') prefix = '🧭 ';`;
    const prefNew = `                  if (key === 'navmenu') prefix = '🧭 ';
                  if (key === 'clocktobook') prefix = '📅 ';`;
    if (code.includes(prefOld)) {
        code = code.replace(prefOld, prefNew);
        console.log("✔ Added applyLanguage prefix mapping");
    } else {
        console.warn("✘ applyLanguage prefix mapping anchor not found!");
    }

    // Event Bindings for Mutual Exclusivity
    const bindOld = `      // Bind new premium extras in exported HTML
      const cbNavMenu = document.getElementById('cu-cb-navmenu');
      if (cbNavMenu) {
          cbNavMenu.onchange = (e) => {
              sp.navigatorMenuEnabled = e.target.checked;
          };
      }`;
    const bindNew = `      // Bind new premium extras in exported HTML
      const cbNavMenu = document.getElementById('cu-cb-navmenu');
      const cbClockToBook = document.getElementById('cu-cb-clocktobook');
      if (cbNavMenu) {
          cbNavMenu.onchange = (e) => {
              sp.navigatorMenuEnabled = e.target.checked;
              if (e.target.checked && cbClockToBook) {
                  cbClockToBook.checked = false;
                  sp.clockToBookEnabled = false;
              }
          };
      }
      if (cbClockToBook) {
          cbClockToBook.onchange = (e) => {
              sp.clockToBookEnabled = e.target.checked;
              if (e.target.checked && cbNavMenu) {
                  cbNavMenu.checked = false;
                  sp.navigatorMenuEnabled = false;
              }
          };
      }`;
    if (code.includes(bindOld)) {
        code = code.replace(bindOld, bindNew);
        console.log("✔ Added mutual exclusivity event bindings in editor");
    } else {
        console.warn("✘ Event bindings anchor not found!");
    }

    // Dial Click Raycasting Handler Condition
    const clickCondOld = `if (sp.navigatorMenuEnabled && e.target === renderer.domElement) {`;
    const clickCondNew = `if ((sp.navigatorMenuEnabled || sp.clockToBookEnabled) && e.target === renderer.domElement) {`;
    if (code.includes(clickCondOld)) {
        code = code.replace(clickCondOld, clickCondNew);
        console.log("✔ Extended click raycast handler trigger condition");
    } else {
        console.warn("✘ Click raycast handler condition anchor not found!");
    }

    // Click trigger behavior branching inside click handler
    const clickBranchOld = `                  if (hour !== null) {
                      window._cuNavTargetHour = hour;
                      window._cuNavTargetTime = Date.now();
                      
                      const anchorMap = {`;
    const clickBranchNew = `                  if (hour !== null) {
                      window._cuNavTargetHour = hour;
                      window._cuNavTargetTime = Date.now();
                      
                      if (sp.clockToBookEnabled) {
                          if (window._showBookSection) {
                              window._showBookSection(hour);
                          } else {
                              if (window.toast) {
                                  window.toast("📅 Hour " + hour + " clicked — Book slot loaded");
                              }
                          }
                          if (window.toast) {
                              window.toast(getCuText('book_toast') + hour + ":00");
                          }
                          window.dispatchEvent(new CustomEvent('clock-book-click', { detail: { hour: hour } }));
                          if (window.parent) {
                              window.parent.postMessage({ type: 'clock-book-click', hour: hour }, '*');
                          }
                      } else {
                      const anchorMap = {`;
    if (code.includes(clickBranchOld)) {
        code = code.replace(clickBranchOld, clickBranchNew);
        // We also need to balance the braces since we added an else branch!
        // Let's find where the anchorMap ends.
        // It ends at:
        //                      if (window.toast) {
        //                          const secLabel = anchor ? anchor.toUpperCase() : hour;
        //                          window.toast(getCuText('section_toast') + secLabel);
        //                      }
        //                      
        //                      window.dispatchEvent(new CustomEvent('clock-menu-click', { detail: { hour: hour, anchor: anchor } }));
        //                      if (window.parent) {
        //                          window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
        //                      }
        //                  }
        //
        // Let's find this precise ending in order to inject the closing brace for our `else` branch!
        const endingOld = `                      window.dispatchEvent(new CustomEvent('clock-menu-click', { detail: { hour: hour, anchor: anchor } }));
                      if (window.parent) {
                          window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
                      }
                  }`;
        const endingNew = `                      window.dispatchEvent(new CustomEvent('clock-menu-click', { detail: { hour: hour, anchor: anchor } }));
                      if (window.parent) {
                          window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
                      }
                      }
                  }`;
        if (code.includes(endingOld)) {
            code = code.replace(endingOld, endingNew);
            console.log("✔ Added else-branch and balanced braces for Click trigger");
        } else {
            console.error("✘ Click trigger ending anchor not found! Braces will be unbalanced!");
        }
    } else {
        console.warn("✘ Click trigger behavior branching anchor not found!");
    }

    // Expose clockToBookEnabled on sp in exported JSON config
    // Actually sp fields are dynamically exported since config is generated from models.map(m => { ... })
    // Let's check how clockParts is mapped. It maps the whole object, so sp.clockToBookEnabled is automatically in!

    // Dynamic Injection in exportScene template
    // We will find the end of sp.navigatorMenuEnabled block:
    const injectAnchor = `            // Store sections data for lookup
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
              document.getElementById('nav-hour-text').textContent = (hourNames[curLang] || 'Hour') + ' ' + hour + ' → #' + anchor;
              _navOverlay.classList.add('active');
          };

      }`;
      
    // We want to insert the sp.clockToBookEnabled block right after the closed brace.
    const injectBlock = `            // Store sections data for lookup
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
              document.getElementById('nav-hour-text').textContent = (hourNames[curLang] || 'Hour') + ' ' + hour + ' → #' + anchor;
              _navOverlay.classList.add('active');
          };

      }

      if (sp.clockToBookEnabled) {
          const customStyle = document.createElement('style');
          customStyle.innerHTML = \\\`
              #book-section-overlay {
                  position: fixed;
                  inset: 0;
                  z-index: 10000;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: rgba(5, 8, 21, 0.75);
                  backdrop-filter: blur(8px);
                  -webkit-backdrop-filter: blur(8px);
                  opacity: 0;
                  pointer-events: none;
                  transition: opacity 0.35s ease;
              }
              #book-section-overlay.active {
                  opacity: 1;
                  pointer-events: auto;
              }
              #book-section-card {
                  max-width: 500px;
                  width: 90%;
                  background: rgba(10, 16, 36, 0.95);
                  backdrop-filter: blur(24px);
                  -webkit-backdrop-filter: blur(24px);
                  border: 1px solid rgba(139, 92, 246, 0.45);
                  border-radius: 24px;
                  padding: 30px;
                  color: #cbd5e1;
                  box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(139, 92, 246, 0.15);
                  transform: translateY(20px) scale(0.97);
                  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                  position: relative;
                  font-family: sans-serif;
              }
              #book-section-overlay.active #book-section-card {
                  transform: translateY(0) scale(1);
              }
              #book-section-close {
                  position: absolute;
                  top: 18px;
                  right: 18px;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background: rgba(139, 92, 246, 0.12);
                  border: 1px solid rgba(139, 92, 246, 0.3);
                  color: #a78bfa;
                  font-size: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: background 0.2s, transform 0.2s;
              }
              #book-section-close:hover {
                  background: rgba(139, 92, 246, 0.25);
                  transform: scale(1.05);
              }
              #book-status-badge {
                  display: inline-flex;
                  align-items: center;
                  gap: 8px;
                  padding: 6px 14px;
                  border-radius: 20px;
                  font-size: 11px;
                  font-weight: bold;
                  letter-spacing: 1px;
                  text-transform: uppercase;
                  margin-bottom: 20px;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
              }
              #book-status-badge.free {
                  background: rgba(16, 185, 129, 0.15);
                  border: 1px solid rgba(16, 185, 129, 0.4);
                  color: #34d399;
                  text-shadow: 0 0 8px rgba(52, 211, 153, 0.4);
              }
              #book-status-badge.booked {
                  background: rgba(239, 68, 68, 0.15);
                  border: 1px solid rgba(239, 68, 68, 0.4);
                  color: #f87171;
                  text-shadow: 0 0 8px rgba(248, 113, 113, 0.4);
              }
              .book-form-group {
                  margin-bottom: 16px;
              }
              .book-form-group label {
                  display: block;
                  font-size: 12px;
                  color: #94a3b8;
                  margin-bottom: 6px;
                  font-weight: 600;
                  letter-spacing: 0.5px;
              }
              .book-form-group input, .book-form-group select {
                  width: 100%;
                  background: rgba(7, 10, 22, 0.6);
                  border: 1px solid rgba(255, 255, 255, 0.08);
                  border-radius: 10px;
                  padding: 10px 12px;
                  color: #fff;
                  font-size: 13px;
                  box-sizing: border-box;
                  outline: none;
                  transition: border-color 0.25s, box-shadow 0.25s;
              }
              .book-form-group input:focus, .book-form-group select:focus {
                  border-color: rgba(139, 92, 246, 0.6);
                  box-shadow: 0 0 8px rgba(139, 92, 246, 0.25);
              }
              .book-btn-primary {
                  width: 100%;
                  background: linear-gradient(135deg, #8b5cf6, #ec4899);
                  border: none;
                  border-radius: 12px;
                  padding: 12px;
                  color: #fff;
                  font-size: 14px;
                  font-weight: bold;
                  cursor: pointer;
                  transition: transform 0.25s, box-shadow 0.25s;
                  box-shadow: 0 4px 15px rgba(139, 92, 246, 0.4);
                  margin-top: 8px;
              }
              .book-btn-primary:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 6px 20px rgba(139, 92, 246, 0.6);
              }
              .book-btn-secondary {
                  width: 100%;
                  background: transparent;
                  border: 1px solid rgba(239, 68, 68, 0.4);
                  border-radius: 12px;
                  padding: 10px;
                  color: #f87171;
                  font-size: 12px;
                  font-weight: bold;
                  cursor: pointer;
                  transition: background 0.25s;
                  margin-top: 12px;
              }
              .book-btn-secondary:hover {
                  background: rgba(239, 68, 68, 0.1);
              }
          \\\`;
          document.head.appendChild(customStyle);
          
          const _bookOverlay = document.createElement('div');
          _bookOverlay.id = 'book-section-overlay';
          _bookOverlay.innerHTML = \\\`
              <div id="book-section-card">
                  <div id="book-section-close">&#x2715;</div>
                  <div id="book-status-badge"></div>
                  <h2 style="margin: 0 0 6px 0; font-size: 24px; background: linear-gradient(90deg, #a78bfa, #f472b6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.5px;" id="book-title"></h2>
                  <p style="font-size: 13.5px; color: #94a3b8; margin: 0 0 20px 0; line-height: 1.5;" id="book-time-range"></p>
                  
                  <div id="book-form-area">
                      <div class="book-form-group">
                          <label id="lbl-book-name"></label>
                          <input type="text" id="book-input-name" required />
                      </div>
                      <div class="book-form-group">
                          <label id="lbl-book-contact"></label>
                          <input type="text" id="book-input-contact" placeholder="Email / Phone" required />
                      </div>
                      <div class="book-form-group">
                          <label id="lbl-book-service"></label>
                          <select id="book-select-service">
                              <option value="Consultation">Consultation</option>
                              <option value="3D Design">3D Design & Modeling</option>
                              <option value="Tech Support">Tech Support & Support Technique</option>
                          </select>
                      </div>
                      <button class="book-btn-primary" id="btn-book-submit"></button>
                  </div>
                  
                  <div id="book-details-area" style="display:none; background:rgba(0,0,0,0.25); border-radius:12px; padding:16px; margin-bottom:10px;">
                      <p style="margin:0 0 6px 0; font-size:13px; color:#cbd5e1;"><strong id="lbl-details-client"></strong> <span id="val-details-name" style="color:#fff;"></span></p>
                      <p style="margin:0 0 6px 0; font-size:13px; color:#cbd5e1;"><strong id="lbl-details-contact"></strong> <span id="val-details-contact" style="color:#fff;"></span></p>
                      <p style="margin:0; font-size:13px; color:#cbd5e1;"><strong id="lbl-details-service"></strong> <span id="val-details-service" style="color:#f472b6;"></span></p>
                      <button class="book-btn-secondary" id="btn-book-cancel"></button>
                  </div>
              </div>
          \\\`;
          document.body.appendChild(_bookOverlay);
          
          _bookOverlay.addEventListener('click', function(ev) {
              if (ev.target === _bookOverlay || ev.target.id === 'book-section-close') {
                  _bookOverlay.classList.remove('active');
              }
          });
          document.addEventListener('keydown', function(ev) {
              if (ev.key === 'Escape') _bookOverlay.classList.remove('active');
          });
          
          window._showBookSection = function(hour) {
              const curLang = (typeof cuLangSelect !== 'undefined' && cuLangSelect && cuLangSelect.value) || lang;
              
              const hourMap24 = {
                  12: { time: "12:00 - 13:00", name: { en: "Lunch Slot", ro: "Interval Prânz", fr: "Déjeuner" } },
                  1: { time: "13:00 - 14:00", name: { en: "Early Afternoon Slot", ro: "Interval Amiază", fr: "Début d'Après-midi" } },
                  2: { time: "14:00 - 15:00", name: { en: "Afternoon Session", ro: "Sesiune După-amiază", fr: "Session Après-midi" } },
                  3: { time: "15:00 - 16:00", name: { en: "Creative Design", ro: "Design Creativ", fr: "Design Créatif" } },
                  4: { time: "16:00 - 17:00", name: { en: "Technical Consultation", ro: "Consultație Tehnică", fr: "Consultation Technique" } },
                  5: { time: "17:00 - 18:00", name: { en: "Late Afternoon Session", ro: "Sesiune Târzie", fr: "Session Fin d'Après-midi" } },
                  6: { time: "18:00 - 19:00", name: { en: "Evening Evaluation", ro: "Evaluare de Seară", fr: "Évaluation en Soirée" } },
                  7: { time: "19:00 - 20:00", name: { en: "Late Review", ro: "Revizuire Târzie", fr: "Revue Tardive" } },
                  8: { time: "20:00 - 21:00", name: { en: "Night Session", ro: "Sesiune de Noapte", fr: "Session de Nuit" } },
                  9: { time: "09:00 - 10:00", name: { en: "Morning Starter", ro: "Start de Dimineață", fr: "Démarrage Matinal" } },
                  10: { time: "10:00 - 11:00", name: { en: "Business Consultation", ro: "Consultație Business", fr: "Consultation Business" } },
                  11: { time: "11:00 - 12:00", name: { en: "Tech Overview", ro: "Revizuire Tehnică", fr: "Aperçu Technique" } }
              };
              
              const slot = hourMap24[hour] || { time: hour + ":00 - " + (hour+1) + ":00", name: { en: "General Slot", ro: "Interval General", fr: "Créneau Général" } };
              
              const titles = {
                  en: "📅 Book Time Slot",
                  fr: "📅 Réserver un Créneau",
                  ro: "📅 Rezervă Interval Orar",
                  de: "📅 Termin buchen",
                  es: "📅 Reservar Horario",
                  it: "📅 Prenota Orario"
              };
              
              const statusFree = { en: "🟢 FREE / DISPONIBIL", ro: "🟢 DISPONIBIL", fr: "🟢 DISPONIBLE", de: "🟢 FREI", es: "🟢 DISPONIBLE", it: "🟢 DISPONIBILE" };
              const statusBooked = { en: "🔴 BOOKED / REZERVAT", ro: "🔴 REZERVAT", fr: "🔴 RÉSERVÉ", de: "🔴 GEBUCHT", es: "🔴 RESERVADO", it: "🔴 PRENOTATO" };
              
              const lblName = { en: "Your Name", ro: "Numele Tău", fr: "Votre Nom", de: "Ihr Name", es: "Su Nombre", it: "Il tuo Nome" };
              const lblContact = { en: "Email or Phone", ro: "Email sau Telefon", fr: "Email ou Téléphone", de: "E-Mail oder Telefon", es: "Correo o Teléfono", it: "Email o Telefono" };
              const lblService = { en: "Requested Service", ro: "Serviciu Solicitat", fr: "Service Demandé", de: "Gewünschter Dienst", es: "Servicio Solicitado", it: "Servizio Richiesto" };
              const btnSubmit = { en: "Confirm Appointment", ro: "Confirmă Rezervarea", fr: "Confirmer le RDV", de: "Termin bestätigen", es: "Confirmar Reserva", it: "Conferma Prenotazione" };
              
              const lblDetClient = { en: "Client:", ro: "Client:", fr: "Client:", de: "Kunde:", es: "Cliente:", it: "Cliente:" };
              const lblDetContact = { en: "Contact:", ro: "Contact:", fr: "Contact:", de: "Kontakt:", es: "Contacto:", it: "Contatto:" };
              const lblDetService = { en: "Service:", ro: "Serviciu:", fr: "Service:", de: "Dienst:", es: "Servicio:", it: "Servizio:" };
              const btnCancel = { en: "Cancel Appointment", ro: "Anulează Rezervarea", fr: "Annuler le RDV", de: "Termin stornieren", es: "Cancelar Reserva", it: "Annulla Prenotazione" };
              
              document.getElementById('book-title').textContent = titles[curLang] || titles.en;
              document.getElementById('book-time-range').innerHTML = "<strong>" + (slot.name[curLang] || slot.name.en) + "</strong><br/>⏱️ " + slot.time;
              
              document.getElementById('lbl-book-name').textContent = lblName[curLang] || lblName.en;
              document.getElementById('lbl-book-contact').textContent = lblContact[curLang] || lblContact.en;
              document.getElementById('lbl-book-service').textContent = lblService[curLang] || lblService.en;
              document.getElementById('btn-book-submit').textContent = btnSubmit[curLang] || btnSubmit.en;
              
              document.getElementById('lbl-details-client').textContent = lblDetClient[curLang] || lblDetClient.en;
              document.getElementById('lbl-details-contact').textContent = lblDetContact[curLang] || lblDetContact.en;
              document.getElementById('lbl-details-service').textContent = lblDetService[curLang] || lblDetService.en;
              document.getElementById('btn-book-cancel').textContent = btnCancel[curLang] || btnCancel.en;
              
              const bookings = JSON.parse(localStorage.getItem('clock_booked_slots') || '{}');
              const currentBooking = bookings[hour];
              
              const statusEl = document.getElementById('book-status-badge');
              if (currentBooking) {
                  statusEl.className = 'booked';
                  statusEl.textContent = statusBooked[curLang] || statusBooked.en;
                  
                  document.getElementById('book-form-area').style.display = 'none';
                  document.getElementById('book-details-area').style.display = 'block';
                  
                  document.getElementById('val-details-name').textContent = currentBooking.name;
                  document.getElementById('val-details-contact').textContent = currentBooking.contact;
                  document.getElementById('val-details-service').textContent = currentBooking.service;
              } else {
                  statusEl.className = 'free';
                  statusEl.textContent = statusFree[curLang] || statusFree.en;
                  
                  document.getElementById('book-form-area').style.display = 'block';
                  document.getElementById('book-details-area').style.display = 'none';
                  
                  document.getElementById('book-input-name').value = '';
                  document.getElementById('book-input-contact').value = '';
              }
              
              document.getElementById('btn-book-submit').onclick = function() {
                  const clientName = document.getElementById('book-input-name').value.trim();
                  const clientContact = document.getElementById('book-input-contact').value.trim();
                  const serviceVal = document.getElementById('book-select-service').value;
                  
                  if (!clientName || !clientContact) {
                      const alertMsg = { en: "Please fill in all required fields.", ro: "Vă rugăm să completați toate câmpiile obligatorii." };
                      alert(alertMsg[curLang] || alertMsg.en);
                      return;
                  }
                  
                  bookings[hour] = {
                      name: clientName,
                      contact: clientContact,
                      service: serviceVal,
                      timestamp: Date.now()
                  };
                  localStorage.setItem('clock_booked_slots', JSON.stringify(bookings));
                  
                  try {
                      const ctx = window.getCuPlaybackContext ? window.getCuPlaybackContext() : null;
                      if (ctx && window.playTone) {
                          const nowTime = ctx.currentTime;
                          window.playTone(392.00, nowTime, 0.15);
                          window.playTone(523.25, nowTime + 0.15, 0.35);
                      }
                  } catch(e) {}
                  
                  if (window.toast) {
                      const toastSuccess = { en: "Appointment confirmed successfully!", ro: "Rezervare confirmată cu succes!" };
                      window.toast((toastSuccess[curLang] || toastSuccess.en) + " 📅 " + slot.time);
                  }
                  
                  _bookOverlay.classList.remove('active');
                  
                  window.dispatchEvent(new CustomEvent('clock-booking-confirmed', { detail: { hour: hour, booking: bookings[hour] } }));
                  if (window.parent) {
                      window.parent.postMessage({ type: 'clock-booking-confirmed', hour: hour, booking: bookings[hour] }, '*');
                  }
              };
              
              document.getElementById('btn-book-cancel').onclick = function() {
                  delete bookings[hour];
                  localStorage.setItem('clock_booked_slots', JSON.stringify(bookings));
                  
                  window._showBookSection(hour);
                  
                  if (window.toast) {
                      const toastCancel = { en: "Appointment cancelled.", ro: "Rezervarea a fost anulată." };
                      window.toast(toastCancel[curLang] || toastCancel.en);
                  }
                  
                  window.dispatchEvent(new CustomEvent('clock-booking-cancelled', { detail: { hour: hour } }));
                  if (window.parent) {
                      window.parent.postMessage({ type: 'clock-booking-cancelled', hour: hour }, '*');
                  }
              };
              
              _bookOverlay.classList.add('active');
          };
      }`;

    if (code.includes(injectAnchor)) {
        code = code.replace(injectAnchor, injectBlock);
        console.log("✔ Injected Clock-to-Book styles and popup structures into export template");
    } else {
        console.warn("✘ Export template injection anchor not found!");
    }

    fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
    console.log("✔ SUCCESSFULLY WRITTEN js/sketch-extruder.js");
}

// ==========================================
// 2. MODIFY js/clock-ultra-3d.js
// ==========================================
if (fs.existsSync('js/clock-ultra-3d.js')) {
    let code = fs.readFileSync('js/clock-ultra-3d.js', 'utf8');

    // Variable declaration
    const varOld = `    // 5 New Focus & Utility features
    let navigatorMenuEnabled = false;`;
    const varNew = `    // 5 New Focus & Utility features
    let navigatorMenuEnabled = false;
    let clockToBookEnabled = false;`;
    if (code.includes(varOld)) {
        code = code.replace(varOld, varNew);
        console.log("✔ Declared clockToBookEnabled variable");
    } else {
        console.warn("✘ Variable declaration anchor not found!");
    }

    // Translations label en
    const transEnOld = `navigatorMenuEnabledLabel: '3D Website Menu Redirection',`;
    const transEnNew = `navigatorMenuEnabledLabel: '3D Website Menu Redirection',
            clockToBookEnabledLabel: 'Clock-to-Book Appointment Scheduling',`;
    if (code.includes(transEnOld)) {
        code = code.replace(transEnOld, transEnNew);
        console.log("✔ Added clockToBookEnabled English label");
    } else {
        console.warn("✘ English label anchor not found!");
    }

    // Translations label fr
    const transFrOld = `navigatorMenuEnabledLabel: 'Redirection Menu Site 3D',`;
    const transFrNew = `navigatorMenuEnabledLabel: 'Redirection Menu Site 3D',
            clockToBookEnabledLabel: 'Réservation par l\\'Horloge (Clock-to-Book)',`;
    if (code.includes(transFrOld)) {
        code = code.replace(transFrOld, transFrNew);
        console.log("✔ Added clockToBookEnabled French/Romanian label");
    } else {
        console.warn("✘ French/Romanian label anchor not found!");
    }

    // UI checkbox markup
    const uiCbOld = `                    <!-- Navigator Menu Redirect -->
                    <label class="cb-row" style="border-top: 1px solid rgba(255,255,255,0.04); margin-top: 6px; padding-top: 6px;">
                        <input type="checkbox" id="cu3-opt-navmenu" \${navigatorMenuEnabled?'checked':''} />
                        <span>\${l.navigatorMenuEnabledLabel}</span>
                    </label>`;
    const uiCbNew = `                    <!-- Navigator Menu Redirect -->
                    <label class="cb-row" style="border-top: 1px solid rgba(255,255,255,0.04); margin-top: 6px; padding-top: 6px;">
                        <input type="checkbox" id="cu3-opt-navmenu" \${navigatorMenuEnabled?'checked':''} />
                        <span>\${l.navigatorMenuEnabledLabel}</span>
                    </label>

                    <!-- Clock-to-Book Scheduling -->
                    <label class="cb-row">
                        <input type="checkbox" id="cu3-opt-clocktobook" \${clockToBookEnabled?'checked':''} />
                        <span>\${l.clockToBookEnabledLabel}</span>
                    </label>`;
    if (code.includes(uiCbOld)) {
        code = code.replace(uiCbOld, uiCbNew);
        console.log("✔ Added UI checkbox in clock-ultra-3d.js panel");
    } else {
        console.warn("✘ clock-ultra-3d.js panel UI anchor not found!");
    }

    // Event bindings and mutual exclusivity in clock-ultra-3d.js
    const bindOptOld = `        const optNavMenu = document.getElementById('cu3-opt-navmenu');
        if (optNavMenu) {
            optNavMenu.onchange = (e) => {
                navigatorMenuEnabled = e.target.checked;
                syncProModel();
            };
        }`;
    const bindOptNew = `        const optNavMenu = document.getElementById('cu3-opt-navmenu');
        const optClockToBook = document.getElementById('cu3-opt-clocktobook');
        if (optNavMenu) {
            optNavMenu.onchange = (e) => {
                navigatorMenuEnabled = e.target.checked;
                if (e.target.checked && optClockToBook) {
                    optClockToBook.checked = false;
                    clockToBookEnabled = false;
                }
                syncProModel();
            };
        }
        if (optClockToBook) {
            optClockToBook.onchange = (e) => {
                clockToBookEnabled = e.target.checked;
                if (e.target.checked && optNavMenu) {
                    optNavMenu.checked = false;
                    navigatorMenuEnabled = false;
                }
                syncProModel();
            };
        }`;
    if (code.includes(bindOptOld)) {
        code = code.replace(bindOptOld, bindOptNew);
        console.log("✔ Added bindings and mutual exclusivity in clock-ultra-3d.js panel");
    } else {
        console.warn("✘ clock-ultra-3d.js panel binding anchor not found!");
    }

    // Sync inclusion
    const syncIncOld = `            navigatorMenuEnabled: navigatorMenuEnabled,`;
    const syncIncNew = `            navigatorMenuEnabled: navigatorMenuEnabled,
            clockToBookEnabled: clockToBookEnabled,`;
    if (code.includes(syncIncOld)) {
        code = code.replace(syncIncOld, syncIncNew);
        console.log("✔ Included clockToBookEnabled in syncProModel fields");
    } else {
        console.warn("✘ syncProModel field anchor not found!");
    }

    // Settings loading
    const loadOptOld = `                        navigatorMenuEnabled = p0.navigatorMenuEnabled !== undefined ? p0.navigatorMenuEnabled : false;`;
    const loadOptNew = `                        navigatorMenuEnabled = p0.navigatorMenuEnabled !== undefined ? p0.navigatorMenuEnabled : false;
                        clockToBookEnabled = p0.clockToBookEnabled !== undefined ? p0.clockToBookEnabled : false;`;
    if (code.includes(loadOptOld)) {
        code = code.replace(loadOptOld, loadOptNew);
        console.log("✔ Loaded clockToBookEnabled parameter from p0 settings");
    } else {
        console.warn("✘ Settings loading anchor not found!");
    }

    fs.writeFileSync('js/clock-ultra-3d.js', code, 'utf8');
    console.log("✔ SUCCESSFULLY WRITTEN js/clock-ultra-3d.js");
}

console.log("=== COMPLETED CLOCK-TO-BOOK IMPLEMENTATION ===");
