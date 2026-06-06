const fs = require('fs');

let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// 1. Inject pointerdown raycaster for dial numbers
const clickLogic = `
              if (obj.name && obj.name.startsWith('dialNumber_')) {
                  const hour = parseInt(obj.name.split('_')[1]);
                  const model = models.find(m => m.format === 'clock-ultra');
                  const sp = model && model.clockParts ? model.clockParts[0] : null;
                  if (sp) {
                      if (sp.teamMembersEnabled && window._showTeamMember) {
                          window._showTeamMember(hour);
                          return;
                      } else if (sp.worldClockEnabled && window._showWorldClock) {
                          window._showWorldClock(hour);
                          return;
                      } else if (sp.clockToBookEnabled && window._showBookSection) {
                          window._showBookSection(hour);
                          return;
                      }
                  }
              }
              let handObj = null;`;

code = code.replace('              let handObj = null;', clickLogic);

// 2. Append ensureEditorTeamModal and ensureEditorWorldClockModal
const modals = `
function ensureEditorTeamModal() {
    if (document.getElementById('team-section-overlay')) return;
    
    const curLang = (typeof cuLangSelect !== 'undefined' && cuLangSelect && cuLangSelect.value) || (typeof lang !== 'undefined' ? lang : 'en');
    
    const customStyle = document.createElement('style');
    customStyle.id = 'editor-team-style';
    customStyle.innerHTML = \`
        #team-section-overlay {
            position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center;
            background: rgba(5, 8, 21, 0.7); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
            opacity: 0; pointer-events: none; transition: opacity 0.35s ease;
        }
        #team-section-overlay.active { opacity: 1; pointer-events: auto; }
        #team-section-card {
            width: 380px; max-width: 90%; background: rgba(8,12,28,0.95);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(6,182,212,0.45); border-radius: 22px; padding: 40px; color: #cbd5e1;
            box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(6,182,212,0.18);
            transform: translateY(24px) scale(0.96); transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
            position: relative; font-family: sans-serif; text-align: center;
        }
        #team-section-overlay.active #team-section-card { transform: translateY(0) scale(1); }
        #team-member-avatar {
            width: 90px; height: 90px; border-radius: 50%; margin: 0 auto 20px;
            display: flex; align-items: center; justify-content: center;
            font-size: 32px; font-weight: bold; color: white;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1);
        }
        #team-member-name { font-size: 24px; font-weight: 700; color: #fff; margin: 0 0 5px 0; }
        #team-member-role { font-size: 14px; color: #38bdf8; font-weight: 600; margin: 0 0 20px 0; letter-spacing: 1px; text-transform: uppercase; }
        #team-member-bio { font-size: 15px; color: #94a3b8; line-height: 1.6; margin: 0 0 30px 0; }
        #btn-team-contact {
            background: linear-gradient(135deg, #06b6d4, #3b82f6); border: none; border-radius: 12px;
            color: #fff; font-size: 15px; font-weight: 600; padding: 14px 28px; cursor: pointer;
            width: 100%; transition: all 0.2s ease; box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
        }
        #btn-team-contact:hover { transform: translateY(-2px); box-shadow: 0 15px 30px rgba(6, 182, 212, 0.4); }
        #btn-team-close {
            position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.1); border: none;
            color: #cbd5e1; width: 32px; height: 32px; border-radius: 16px; cursor: pointer;
            display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s;
        }
        #btn-team-close:hover { background: rgba(255,255,255,0.2); color: #fff; }
    \`;
    document.head.appendChild(customStyle);
    
    const overlay = document.createElement('div');
    overlay.id = 'team-section-overlay';
    overlay.innerHTML = \`
        <div id="team-section-card">
            <button id="btn-team-close">✕</button>
            <div id="team-member-avatar"></div>
            <h2 id="team-member-name"></h2>
            <div id="team-member-role"></div>
            <div id="team-member-bio"></div>
            <div id="team-member-email" style="display:none;"></div>
            <button id="btn-team-contact"></button>
        </div>
    \`;
    document.body.appendChild(overlay);
    
    const _teamOverlay = document.getElementById('team-section-overlay');
    document.getElementById('btn-team-close').onclick = () => _teamOverlay.classList.remove('active');
    _teamOverlay.addEventListener('click', (e) => { if (e.target === _teamOverlay) _teamOverlay.classList.remove('active'); });
    window.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') _teamOverlay.classList.remove('active'); });
    
    window._showTeamMember = function(hour) {
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

function ensureEditorWorldClockModal() {
    if (document.getElementById('wc-section-overlay')) return;
    
    const curLang = (typeof cuLangSelect !== 'undefined' && cuLangSelect && cuLangSelect.value) || (typeof lang !== 'undefined' ? lang : 'en');
    
    const customStyle = document.createElement('style');
    customStyle.id = 'editor-wc-style';
    customStyle.innerHTML = \`
        #wc-section-overlay {
            position: fixed; inset: 0; z-index: 10000; display: flex; align-items: center; justify-content: center;
            background: rgba(5, 8, 21, 0.7); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
            opacity: 0; pointer-events: none; transition: opacity 0.35s ease;
        }
        #wc-section-overlay.active { opacity: 1; pointer-events: auto; }
        #wc-section-card {
            width: 380px; max-width: 90%; background: rgba(8,12,28,0.95);
            backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(6,182,212,0.45); border-radius: 22px; padding: 40px; color: #cbd5e1;
            box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 60px rgba(6,182,212,0.18);
            transform: translateY(24px) scale(0.96); transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
            position: relative; font-family: sans-serif; text-align: center;
        }
        #wc-section-overlay.active #wc-section-card { transform: translateY(0) scale(1); }
        #wc-city-name { font-size: 32px; font-weight: 800; color: #fff; margin: 0 0 5px 0; letter-spacing: 1px; text-transform: uppercase; }
        #wc-country { font-size: 14px; color: #38bdf8; font-weight: 600; margin: 0 0 25px 0; letter-spacing: 2px; text-transform: uppercase; }
        #wc-local-time { font-size: 48px; font-weight: 300; color: #fff; margin: 0 0 10px 0; font-variant-numeric: tabular-nums; }
        #wc-local-date { font-size: 16px; color: #94a3b8; font-weight: 500; margin: 0 0 30px 0; }
        #btn-wc-close {
            position: absolute; top: 16px; right: 16px; background: rgba(255,255,255,0.1); border: none;
            color: #cbd5e1; width: 32px; height: 32px; border-radius: 16px; cursor: pointer;
            display: flex; align-items: center; justify-content: center; font-size: 18px; transition: all 0.2s;
        }
        #btn-wc-close:hover { background: rgba(255,255,255,0.2); color: #fff; }
    \`;
    document.head.appendChild(customStyle);
    
    const overlay = document.createElement('div');
    overlay.id = 'wc-section-overlay';
    overlay.innerHTML = \`
        <div id="wc-section-card">
            <button id="btn-wc-close">✕</button>
            <h2 id="wc-city-name"></h2>
            <div id="wc-country"></div>
            <div id="wc-local-time"></div>
            <div id="wc-local-date"></div>
        </div>
    \`;
    document.body.appendChild(overlay);
    
    const _wcOverlay = document.getElementById('wc-section-overlay');
    document.getElementById('btn-wc-close').onclick = () => _wcOverlay.classList.remove('active');
    _wcOverlay.addEventListener('click', (e) => { if (e.target === _wcOverlay) _wcOverlay.classList.remove('active'); });
    window.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') _wcOverlay.classList.remove('active'); });
    
    let wcInterval = null;
    
    window._showWorldClock = function(hour) {
        if (wcInterval) clearInterval(wcInterval);
        
        const cities = {
            12: { name: "London", country: "United Kingdom", tz: "Europe/London" },
            1: { name: "Paris", country: "France", tz: "Europe/Paris" },
            2: { name: "Bucharest", country: "Romania", tz: "Europe/Bucharest" },
            3: { name: "Dubai", country: "United Arab Emirates", tz: "Asia/Dubai" },
            4: { name: "New Delhi", country: "India", tz: "Asia/Kolkata" },
            5: { name: "Bangkok", country: "Thailand", tz: "Asia/Bangkok" },
            6: { name: "Tokyo", country: "Japan", tz: "Asia/Tokyo" },
            7: { name: "Sydney", country: "Australia", tz: "Australia/Sydney" },
            8: { name: "Auckland", country: "New Zealand", tz: "Pacific/Auckland" },
            9: { name: "New York", country: "United States", tz: "America/New_York" },
            10: { name: "Chicago", country: "United States", tz: "America/Chicago" },
            11: { name: "Los Angeles", country: "United States", tz: "America/Los_Angeles" }
        };
        
        const cityInfo = cities[hour] || cities[12];
        document.getElementById('wc-city-name').textContent = cityInfo.name;
        document.getElementById('wc-country').textContent = cityInfo.country;
        
        const updateTime = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { timeZone: cityInfo.tz, hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const dateStr = now.toLocaleDateString(curLang === 'en' ? 'en-US' : (curLang === 'fr' ? 'fr-FR' : 'ro-RO'), { timeZone: cityInfo.tz, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            document.getElementById('wc-local-time').textContent = timeStr;
            document.getElementById('wc-local-date').textContent = dateStr;
        };
        
        updateTime();
        wcInterval = setInterval(updateTime, 1000);
        
        _wcOverlay.classList.add('active');
    };
}
`;

if (!code.includes('ensureEditorTeamModal')) {
    code += '\n' + modals;
}

fs.writeFileSync('js/sketch-extruder.js', code);
