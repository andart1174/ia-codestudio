const fs = require('fs');

console.log('--- RUNNING ROBUST WIRE SCRIPT ---');

const file = 'js/sketch-extruder.js';
let c = fs.readFileSync(file, 'utf8');

// =========================================================================
// 1. Insert HTML Checkboxes in the Composer Control Panel
// =========================================================================
if (!c.includes('id="cu-cb-teammembers"')) {
    const targetId = 'id="cu-cb-businesshours"';
    const startIdx = c.indexOf(targetId);
    if (startIdx !== -1) {
        // Find the next </label> tag after the business hours checkbox
        const endLabelTag = '</label>';
        const insertIdx = c.indexOf(endLabelTag, startIdx);
        if (insertIdx !== -1) {
            const afterLabelIdx = insertIdx + endLabelTag.length;
            
            // Construct the two new checkboxes with exact matching indentation
            const newCheckboxes = `

              <!-- Team Members per Hour -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;">
                  <input type="checkbox" id="cu-cb-teammembers" \\\${sp.teamMembersEnabled ? 'checked' : ''} />
                  <span data-key="teammembers"></span>
              </label>

              <!-- World Clock Mode -->
              <label style="display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;">
                  <input type="checkbox" id="cu-cb-worldclock" \\\${sp.worldClockEnabled ? 'checked' : ''} />
                  <span data-key="worldclock"></span>
              </label>`;
              
            c = c.slice(0, afterLabelIdx) + newCheckboxes + c.slice(afterLabelIdx);
            console.log('OK: Control Panel checkboxes inserted successfully.');
        } else {
            console.log('ERROR: Next </label> tag not found.');
        }
    } else {
        console.log('ERROR: "cu-cb-businesshours" checkbox not found.');
    }
} else {
    console.log('INFO: Control Panel checkboxes already present.');
}

// =========================================================================
// 2. Insert sp.teamMembersEnabled and sp.worldClockEnabled blocks in exportScene
// =========================================================================
if (!c.includes('if (sp.teamMembersEnabled) {') || !c.includes('Send Message')) {
    // Find the 'if (sp.clockToBookEnabled) {' block in exportScene
    // The first one is in ensureEditorBookModal, the second one is inside exportScene
    const pattern = 'if (sp.clockToBookEnabled) {';
    let idx = c.indexOf(pattern);
    if (idx !== -1) {
        // Find the second occurrence
        idx = c.indexOf(pattern, idx + 1);
        if (idx !== -1) {
            console.log('Found second "if (sp.clockToBookEnabled) {" block at index', idx);
            
            // Find matching closing brace using bracket counting
            let bracketCount = 0;
            let closingBraceIdx = -1;
            for (let i = idx; i < c.length; i++) {
                if (c[i] === '{') {
                    bracketCount++;
                } else if (c[i] === '}') {
                    bracketCount--;
                    if (bracketCount === 0) {
                        closingBraceIdx = i;
                        break;
                    }
                }
            }
            
            if (closingBraceIdx !== -1) {
                console.log('Found matching closing brace at index', closingBraceIdx);
                const insertIdx = closingBraceIdx + 1;
                
                const exportInjection = `

      if (sp.teamMembersEnabled) {
          const customStyle = document.createElement('style');
          customStyle.innerHTML = \\\`
              #team-section-overlay {
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
              #team-section-overlay.active {
                  opacity: 1;
                  pointer-events: auto;
              }
              #team-section-card {
                  max-width: 420px;
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
              #team-section-overlay.active #team-section-card {
                  transform: translateY(0) scale(1);
              }
              #team-section-close {
                  position: absolute;
                  top: 18px;
                  right: 18px;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background: rgba(255, 255, 255, 0.05);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  color: #94a3b8;
                  font-size: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: all 0.2s;
              }
              #team-section-close:hover {
                  background: rgba(255, 255, 255, 0.1);
                  color: #fff;
              }
          \\\`;
          document.head.appendChild(customStyle);
          
          const _teamOverlay = document.createElement('div');
          _teamOverlay.id = 'team-section-overlay';
          _teamOverlay.innerHTML = \\\`
              <div id="team-section-card">
                  <div id="team-section-close">&#x2715;</div>
                  <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                      <div id="team-member-avatar" style="width:90px; height:90px; border-radius:50%; margin-bottom:16px; display:flex; align-items:center; justify-content:center; font-size:32px; font-weight:bold; color:#fff; box-shadow:0 8px 24px rgba(0,0,0,0.3); border:2px solid rgba(255,255,255,0.1);"></div>
                      <h2 id="team-member-name" style="margin:0 0 4px 0; font-size:24px; color:#fff; font-weight:700; letter-spacing:-0.5px;"></h2>
                      <div id="team-member-role" style="font-size:13px; color:#a78bfa; font-weight:600; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px; background:rgba(167,139,250,0.1); padding:4px 12px; border-radius:12px;"></div>
                      <p id="team-member-bio" style="font-size:14px; line-height:1.6; color:#94a3b8; margin:0 0 20px 0; max-width:320px;"></p>
                      <div style="display:flex; align-items:center; gap:8px; background:rgba(255,255,255,0.03); padding:8px 16px; border-radius:12px; border:1px solid rgba(255,255,255,0.06); margin-bottom:20px; font-size:13px; color:#cbd5e1; width:100%; box-sizing:border-box; justify-content:center;">
                          <span>✉️</span>
                          <span id="team-member-email" style="font-family:monospace; user-select:all;"></span>
                      </div>
                      <button class="team-btn-primary" id="btn-team-contact" style="width:100%; border:none; background:linear-gradient(135deg, #8b5cf6, #ec4899); color:#fff; font-weight:bold; padding:12px; border-radius:12px; cursor:pointer; font-size:14px; transition:transform 0.2s, opacity 0.2s; box-shadow:0 8px 20px rgba(139,92,246,0.3);">
                          Send Message
                      </button>
                  </div>
              </div>
          \\\`;
          document.body.appendChild(_teamOverlay);
          
          _teamOverlay.addEventListener('click', function(ev) {
              if (ev.target === _teamOverlay || ev.target.id === 'team-section-close') {
                  _teamOverlay.classList.remove('active');
              }
          });
          document.addEventListener('keydown', function(ev) {
              if (ev.key === 'Escape') _teamOverlay.classList.remove('active');
          });
          
          window._showTeamMember = function(hour) {
              const curLang = (typeof cuLangSelect !== 'undefined' && cuLangSelect && cuLangSelect.value) || lang;
              const teamData = {
                  12: { name: "Alice Smith", role: { en: "Chief Executive Officer", fr: "Directrice Générale", ro: "Director General" }, email: "alice.smith@clockultra.com", bg: "linear-gradient(135deg, #3b82f6, #8b5cf6)", bio: { en: "Visionary leader driving innovation and digital expansion globally.", fr: "Leader visionnaire menant l'innovation et l'expansion numérique mondiale.", ro: "Lider vizionar care conduce inovația și expansiunea digitală la nivel global." } },
                  1: { name: "Bob Jones", role: { en: "Technical Director", fr: "Directeur Technique", ro: "Director Tehnic" }, email: "bob.jones@clockultra.com", bg: "linear-gradient(135deg, #10b981, #3b82f6)", bio: { en: "Full-stack wizard orchestrating secure, high-performance cloud architectures.", fr: "Magicien full-stack orchestrant des architectures cloud sécurisées et performantes.", ro: "Magician full-stack care orchestrează arhicturi cloud securizate și performante." } },
                  2: { name: "Charlie Brown", role: { en: "Lead Product Designer", fr: "Designer de Produit Principal", ro: "Designer de Produs Principal" }, email: "charlie.brown@clockultra.com", bg: "linear-gradient(135deg, #f59e0b, #ec4899)", bio: { en: "Crafting beautiful, user-centric interfaces with passion and visual poetry.", fr: "Création d'interfaces magnifiques et centrées sur l'utilisateur avec passion.", ro: "Crearea de interfețe superbe, centrate pe utilizator, cu pasiune și poezie vizuală." } },
                  3: { name: "Diana Prince", role: { en: "Senior Project Manager", fr: "Chef de Projet Senior", ro: "Manager de Proiect Senior" }, email: "diana.prince@clockultra.com", bg: "linear-gradient(135deg, #ec4899, #8b5cf6)", bio: { en: "Ensuring flawless execution and perfect delivery of complex solutions.", fr: "Assurer une exécution sans faille et une livraison parfaite des projets.", ro: "Asigurarea unei execuții impecabile și livrarea perfectă a soluțiilor complexe." } },
                  4: { name: "Ethan Hunt", role: { en: "Security Operations", fr: "Opérations de Sécurité", ro: "Operațiuni de Securitate" }, email: "ethan.hunt@clockultra.com", bg: "linear-gradient(135deg, #ef4444, #f59e0b)", bio: { en: "Protecting user data and guaranteeing maximum application integrity.", fr: "Protection des données utilisateurs et garantie d'intégrité maximale.", ro: "Protejarea datelor utilizatorilor și garantarea integrității maxime a aplicației." } },
                  5: { name: "Fiona Gallagher", role: { en: "Lead Frontend Dev", fr: "Développeuse Frontend Principale", ro: "Dezvoltator Frontend Principal" }, email: "fiona.g@clockultra.com", bg: "linear-gradient(135deg, #06b6d4, #3b82f6)", bio: { en: "Transforming design prototypes into rich, interactive 3D realities.", fr: "Transformer les prototypes en réalités 3D interactives et riches.", ro: "Transformarea prototipurilor de design în realități 3D interactive bogate." } },
                  6: { name: "George Clark", role: { en: "Cloud & Devops", fr: "Infrastructure & DevOps", ro: "Cloud & DevOps" }, email: "george.c@clockultra.com", bg: "linear-gradient(135deg, #6366f1, #a855f7)", bio: { en: "Scaling server capacity and guaranteeing 99.9% application uptime.", fr: "Dimensionnement des serveurs et garantie d'un temps de disponibilité de 99,9%.", ro: "Scalarea capacității serverelor și garantarea unui uptime de 99.9%." } },
                  7: { name: "Hannah Abbott", role: { en: "QA Lead Engineer", fr: "Responsable Assurance Qualité", ro: "Inginer Coordonator QA" }, email: "hannah.a@clockultra.com", bg: "linear-gradient(135deg, #14b8a6, #10b981)", bio: { en: "Meticulously testing every edge case to ensure perfection.", fr: "Tester méticuleusement chaque cas limite pour garantir la perfection.", ro: "Testarea meticuloasă a fiecărui caz limită pentru a asigura perfecțiunea." } },
                  8: { name: "Ian Malcolm", role: { en: "Data Scientist", fr: "Scientifique des Données", ro: "Data Scientist" }, email: "ian.m@clockultra.com", bg: "linear-gradient(135deg, #a855f7, #ec4899)", bio: { en: "Analyzing user metrics to dynamically improve application performance.", fr: "Analyse des métriques pour améliorer dynamiquement les performances.", ro: "Analizarea metricilor utilizatorilor pentru a îmbunătăți dinamic performanța." } },
                  9: { name: "Julia Roberts", role: { en: "Marketing Director", fr: "Directrice Marketing", ro: "Director de Marketing" }, email: "julia.r@clockultra.com", bg: "linear-gradient(135deg, #f43f5e, #f59e0b)", bio: { en: "Connecting our premium products with millions of users worldwide.", fr: "Connecter nos produits haut de gamme avec des millions d'utilisateurs.", ro: "Conectarea produselor noastre premium cu milioane de utilizatori din întreaga lume." } },
                  10: { name: "Kevin Bacon", role: { en: "Customer Experience", fr: "Directeur Expérience Client", ro: "Director Experiență Clienți" }, email: "kevin.b@clockultra.com", bg: "linear-gradient(135deg, #06b6d4, #14b8a6)", bio: { en: "Dedicated to solving customer issues with empathy and speed.", fr: "Dédié à résoudre les problèmes des clients avec empathie et rapidité.", ro: "Dedicat rezolvării problemelor clienților cu empatie și rapiditate." } },
                  11: { name: "Laura Croft", role: { en: "Mobile Platforms Dev", fr: "Développeuse Plateformes Mobiles", ro: "Dezvoltator Platforme Mobile" }, email: "laura.c@clockultra.com", bg: "linear-gradient(135deg, #8b5cf6, #3b82f6)", bio: { en: "Optimizing responsive graphics for flawless smartphone experiences.", fr: "Optimisation des graphismes pour des expériences mobiles fluides.", ro: "Optimizarea graficii responsive pentru experiențe mobile impecabile." } }
              };
              
              const member = teamData[hour] || teamData[12];
              const initials = member.name.split(' ').map(n => n[0]).join('');
              const avatar = document.getElementById('team-member-avatar');
              avatar.textContent = initials;
              avatar.style.background = member.bg;
              
              document.getElementById('team-member-name').textContent = member.name;
              document.getElementById('team-member-role').textContent = member.role[curLang] || member.role.en;
              document.getElementById('team-member-bio').textContent = member.bio[curLang] || member.bio.en;
              document.getElementById('team-member-email').textContent = member.email;
              
              const btnContact = document.getElementById('btn-team-contact');
              const contactTexts = { en: "✉️ Send Message", fr: "✉️ Envoyer un Message", ro: "✉️ Trimite Mesaj" };
              btnContact.textContent = contactTexts[curLang] || contactTexts.en;
              btnContact.onclick = function() {
                  window.location.href = "mailto:" + member.email + "?subject=Clock%20Ultra%20Inquiry";
              };
              
              _teamOverlay.classList.add('active');
          };
      }

      if (sp.worldClockEnabled) {
          const customStyle = document.createElement('style');
          customStyle.innerHTML = \\\`
              #worldclock-section-overlay {
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
              #worldclock-section-overlay.active {
                  opacity: 1;
                  pointer-events: auto;
              }
              #worldclock-section-card {
                  max-width: 420px;
                  width: 90%;
                  background: rgba(10, 16, 36, 0.95);
                  backdrop-filter: blur(24px);
                  -webkit-backdrop-filter: blur(24px);
                  border: 1px solid rgba(6, 182, 212, 0.45);
                  border-radius: 24px;
                  padding: 30px;
                  color: #cbd5e1;
                  box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(6, 182, 212, 0.15);
                  transform: translateY(20px) scale(0.97);
                  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
                  position: relative;
                  font-family: sans-serif;
              }
              #worldclock-section-overlay.active #worldclock-section-card {
                  transform: translateY(0) scale(1);
              }
              #worldclock-section-close {
                  position: absolute;
                  top: 18px;
                  right: 18px;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background: rgba(255, 255, 255, 0.05);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  color: #94a3b8;
                  font-size: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  cursor: pointer;
                  transition: all 0.2s;
              }
              #worldclock-section-close:hover {
                  background: rgba(255, 255, 255, 0.1);
                  color: #fff;
              }
              @keyframes wc-spin {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
              }
          \\\`;
          document.head.appendChild(customStyle);
          
          const _wcOverlay = document.createElement('div');
          _wcOverlay.id = 'worldclock-section-overlay';
          _wcOverlay.innerHTML = \\\`
              <div id="worldclock-section-card">
                  <div id="worldclock-section-close">&#x2715;</div>
                  <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                      <div style="position:relative; margin-bottom:20px; width:70px; height:70px; display:flex; align-items:center; justify-content:center; background:rgba(6,182,212,0.1); border-radius:50%; border:1px solid rgba(6,182,212,0.3); box-shadow:0 0 20px rgba(6,182,212,0.15);">
                          <span style="font-size:36px; animation: wc-spin 8s linear infinite; display:inline-block;">🌍</span>
                      </div>
                      <h2 id="wc-city-name" style="margin:0 0 6px 0; font-size:26px; color:#fff; font-weight:700; letter-spacing:-0.5px;"></h2>
                      <div id="wc-country" style="font-size:12px; color:#22d3ee; font-weight:600; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:20px; background:rgba(6,182,212,0.1); padding:4px 12px; border-radius:12px;"></div>
                      
                      <div style="background:rgba(0,0,0,0.2); padding:20px; border-radius:18px; border:1px solid rgba(255,255,255,0.06); width:100%; box-sizing:border-box; margin-bottom:20px;">
                          <div id="wc-local-time" style="font-size:36px; font-weight:800; color:#fff; letter-spacing:1px; font-family:monospace; margin-bottom:6px;">--:--:--</div>
                          <div id="wc-local-date" style="font-size:13px; color:#94a3b8; font-weight:500;"></div>
                      </div>
                      
                      <div style="display:flex; align-items:center; gap:8px; justify-content:center; font-size:13px; color:#cbd5e1; background:rgba(255,255,255,0.02); width:100%; padding:10px; border-radius:12px; border:1px solid rgba(255,255,255,0.04); box-sizing:border-box;">
                          <span id="wc-offset-icon">🧭</span>
                          <span id="wc-offset-text"></span>
                      </div>
                  </div>
              </div>
          \\\`;
          document.body.appendChild(_wcOverlay);
          
          let wcInterval = null;
          
          _wcOverlay.addEventListener('click', function(ev) {
              if (ev.target === _wcOverlay || ev.target.id === 'worldclock-section-close') {
                  _wcOverlay.classList.remove('active');
                  if (wcInterval) clearInterval(wcInterval);
              }
          });
          document.addEventListener('keydown', function(ev) {
              if (ev.key === 'Escape') {
                  _wcOverlay.classList.remove('active');
                  if (wcInterval) clearInterval(wcInterval);
              }
          });
          
          window._showWorldClock = function(hour) {
              const curLang = (typeof cuLangSelect !== 'undefined' && curLangSelect && curLangSelect.value) || lang;
              const cityMap = {
                  12: { name: "London", country: { en: "United Kingdom", fr: "Royaume-Uni", ro: "Marea Britanie" }, zone: "Europe/London" },
                  1: { name: "Paris", country: { en: "France", fr: "France", ro: "Franța" }, zone: "Europe/Paris" },
                  2: { name: "Bucharest", country: { en: "Romania", fr: "Roumanie", ro: "România" }, zone: "Europe/Bucharest" },
                  3: { name: "Dubai", country: { en: "United Arab Emirates", fr: "Émirats Arabes Unis", ro: "Emiratele Arabe Unite" }, zone: "Asia/Dubai" },
                  4: { name: "New Delhi", country: { en: "India", fr: "Inde", ro: "India" }, zone: "Asia/Kolkata" },
                  5: { name: "Bangkok", country: { en: "Thailand", fr: "Thaïlande", ro: "Thailanda" }, zone: "Asia/Bangkok" },
                  6: { name: "Tokyo", country: { en: "Japan", fr: "Japon", ro: "Japonia" }, zone: "Asia/Tokyo" },
                  7: { name: "Sydney", country: { en: "Australia", fr: "Australie", ro: "Australia" }, zone: "Australia/Sydney" },
                  8: { name: "Auckland", country: { en: "New Zealand", fr: "Nouvelle-Zélande", ro: "Noua Zeelandă" }, zone: "Pacific/Auckland" },
                  9: { name: "New York", country: { en: "United States", fr: "États-Unis", ro: "Statele Unite" }, zone: "America/New_York" },
                  10: { name: "Chicago", country: { en: "United States", fr: "États-Unis", ro: "Statele Unite" }, zone: "America/Chicago" },
                  11: { name: "Los Angeles", country: { en: "United States", fr: "États-Unis", ro: "Statele Unite" }, zone: "America/Los_Angeles" }
              };
              
              const city = cityMap[hour] || { name: "London", country: { en: "United Kingdom", fr: "Royaume-Uni" }, zone: "Europe/London" };
              document.getElementById('wc-city-name').textContent = city.name;
              document.getElementById('wc-country').textContent = city.country[curLang] || city.country.en;
              
              if (wcInterval) clearInterval(wcInterval);
              
              function updateTime() {
                  try {
                      const now = new Date();
                      const timeStr = now.toLocaleTimeString('en-US', { timeZone: city.zone, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      document.getElementById('wc-local-time').textContent = timeStr;
                      
                      const dateStr = now.toLocaleDateString(curLang === 'ro' ? 'ro-RO' : (curLang === 'fr' ? 'fr-FR' : 'en-US'), {
                          timeZone: city.zone,
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                      });
                      document.getElementById('wc-local-date').textContent = dateStr;
                      
                      const localTime = new Date().getTime();
                      const targetTimeStr = now.toLocaleString('en-US', { timeZone: city.zone });
                      const targetTime = new Date(targetTimeStr).getTime();
                      const diffHours = Math.round((targetTime - localTime) / 3600000);
                      
                      let offsetText = "";
                      if (diffHours === 0) {
                          const sameTexts = { en: "Same time as your location", fr: "Même heure que chez vous", ro: "Aceeași oră cu locația ta" };
                          offsetText = sameTexts[curLang] || sameTexts.en;
                      } else if (diffHours > 0) {
                          const aheadTexts = { en: diffHours + " hours ahead", fr: diffHours + " heures d'avance", ro: diffHours + " ore înainte" };
                          offsetText = aheadTexts[curLang] || aheadTexts.en;
                      } else {
                          const behindTexts = { en: Math.abs(diffHours) + " hours behind", fr: Math.abs(diffHours) + " heures de retard", ro: Math.abs(diffHours) + " ore în urmă" };
                          offsetText = behindTexts[curLang] || behindTexts.en;
                      }
                      document.getElementById('wc-offset-text').textContent = offsetText;
                  } catch (e) {
                      console.error(e);
                  }
              }
              
              updateTime();
              wcInterval = setInterval(updateTime, 1000);
              _wcOverlay.classList.add('active');
          };
      }
`;
                
                c = c.slice(0, insertIdx) + exportInjection + c.slice(insertIdx);
                console.log('OK: exportScene modal layers injected successfully!');
            } else {
                console.log('ERROR: Closing brace not found for exportScene block.');
            }
        } else {
            console.log('ERROR: Second occurrence of "if (sp.clockToBookEnabled) {" not found.');
        }
    } else {
        console.log('ERROR: "if (sp.clockToBookEnabled) {" block not found.');
    }
} else {
    console.log('INFO: exportScene modal layers already present.');
}

// Write back with CRLF newlines
fs.writeFileSync(file, c.replace(/\r?\n/g, '\r\n'), 'utf8');

console.log('--- ROBUST WIRE SCRIPT COMPLETE ---');
