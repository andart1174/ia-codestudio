const fs = require('fs');

if (fs.existsSync('js/sketch-extruder.js')) {
    let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

    // Find the exact line
    const targetStr = "document.getElementById('nav-hour-text').textContent = (hourNames[curLang] || 'Hour') + ' ' + hour + ' → #' + anchor;";
    const idx = code.indexOf(targetStr);
    
    if (idx !== -1) {
        console.log("✔ Found target string in sketch-extruder.js");
        
        // Let's find the closing of the function and the block.
        // It should look like:
        //               _navOverlay.classList.add('active');
        //           };
        // 
        //       }
        // 
        //       function makeElementDraggable
        
        // Find the index of "makeElementDraggable" after idx
        const dragIdx = code.indexOf("function makeElementDraggable", idx);
        
        if (dragIdx !== -1) {
            console.log("✔ Found makeElementDraggable block");
            
            // We want to replace everything from the closing brace of window._showNavSection (after _navOverlay.classList.add)
            // up to function makeElementDraggable
            const endFuncStr = "_navOverlay.classList.add('active');\n          };\n\n      }";
            const endFuncIdx = code.indexOf(endFuncStr, idx);
            
            if (endFuncIdx !== -1) {
                console.log("✔ Found endFuncStr block");
                
                // Let's construct the replacement.
                // We'll replace from endFuncIdx + endFuncStr.length up to dragIdx.
                const beforeDrag = code.substring(endFuncIdx, dragIdx);
                console.log("Segment to replace:\n" + JSON.stringify(beforeDrag));
                
                // The block we want to insert:
                const injectBlock = `_navOverlay.classList.add('active');
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
      }

      \n\n      `;
                
                // Replace everything between endFuncIdx and dragIdx
                const newCode = code.substring(0, endFuncIdx) + injectBlock + code.substring(dragIdx);
                fs.writeFileSync('js/sketch-extruder.js', newCode, 'utf8');
                console.log("✔ SUCCESS: sketch-extruder.js dynamic injection completed successfully!");
            } else {
                console.error("✘ Failed to locate endFuncStr");
            }
        } else {
            console.error("✘ Failed to locate makeElementDraggable");
        }
    } else {
        console.error("✘ Failed to locate target string");
    }
}
