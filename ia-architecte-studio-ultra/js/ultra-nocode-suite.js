// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — NO-CODE SUITE v2.0
// 1. UltraWizard: Visual Multi-Step App Creator
// 2. UltraVisualInspector: Live Preview WYSIWYG Click-to-Edit
// 3. UltraScreenManager: Multi-Screen & Page Navigation
// 4. UltraDataEngine: Notion/Airtable LocalStorage Visual DB
// 5. UltraBlockLibrary: Lego UI Component Block Palette
// 6. UltraVoice: Bilingual Voice Dictation Engine
// Strictly Bilingual: EN / FR
// ══════════════════════════════════════════════════════════════════════════════

// Helper for i18n translation lookup
function _t(key, fallback) {
  if (typeof t === 'function') {
    const res = t(key);
    if (res && res !== key) return res;
  }
  return fallback || key;
}

// ══════════════════════════════════════════════════════════════════════════════
// 1. ULTRA WIZARD — VISUAL APP CREATOR (NO-CODE)
// ══════════════════════════════════════════════════════════════════════════════
const UltraWizard = {
  step: 0,
  selectedArchetype: 'crm',
  selectedTheme: 'neon',
  features: {
    auth: true,
    search: true,
    charts: true,
    export: true,
    dark: true,
    payment: true,
    storage: true,
    notifications: true
  },

  open() {
    this.step = 0;
    this.renderStepper();
    this.renderPages();
    const modal = document.getElementById('modal-wizard');
    if (modal) modal.classList.add('show');
  },

  close() {
    const modal = document.getElementById('modal-wizard');
    if (modal) modal.classList.remove('show');
  },

  setStep(s) {
    this.step = Math.max(0, Math.min(3, s));
    this.renderStepper();
    this.renderPages();
  },

  nextStep() {
    if (this.step < 3) {
      this.setStep(this.step + 1);
    } else {
      this.buildApp();
    }
  },

  prevStep() {
    if (this.step > 0) this.setStep(this.step - 1);
  },

  selectArchetype(type) {
    this.selectedArchetype = type;
    document.querySelectorAll('.archetype-card').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-arch') === type);
    });
  },

  toggleFeature(featKey) {
    this.features[featKey] = !this.features[featKey];
    const card = document.getElementById('feat-toggle-' + featKey);
    if (card) {
      card.classList.toggle('checked', this.features[featKey]);
      const cb = card.querySelector('.feature-checkbox');
      if (cb) cb.textContent = this.features[featKey] ? '✓' : '';
    }
  },

  selectTheme(themeKey) {
    this.selectedTheme = themeKey;
    document.querySelectorAll('.theme-palette-card').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-theme') === themeKey);
    });
  },

  renderStepper() {
    const steps = [
      { num: 1, labelKey: 'wizardStep1', def: '1. Archetype' },
      { num: 2, labelKey: 'wizardStep2', def: '2. Features' },
      { num: 3, labelKey: 'wizardStep3', def: '3. Theme' },
      { num: 4, labelKey: 'wizardStep4', def: '4. Launch' }
    ];
    const stepper = document.getElementById('wizard-stepper');
    if (!stepper) return;

    stepper.innerHTML = steps.map((s, idx) => {
      const cls = idx === this.step ? 'wizard-step-item active' : (idx < this.step ? 'wizard-step-item completed' : 'wizard-step-item');
      return `<div class="${cls}" onclick="UltraWizard.setStep(${idx})">
        <div class="step-num">${idx < this.step ? '✓' : s.num}</div>
        <span>${_t(s.labelKey, s.def)}</span>
      </div>`;
    }).join('');

    // Update navigation buttons
    const btnBack = document.getElementById('wizard-btn-back');
    const btnNext = document.getElementById('wizard-btn-next');
    if (btnBack) btnBack.style.visibility = this.step === 0 ? 'hidden' : 'visible';
    if (btnNext) {
      if (this.step === 3) {
        btnNext.innerHTML = '<span>⚡</span> <span>' + _t('wizardBuild', 'Build & Run Application') + '</span>';
        btnNext.className = 'btn-modal-primary btn-insp-apply';
      } else {
        btnNext.innerHTML = '<span>' + _t('wizardNext', 'Next Step →') + '</span>';
        btnNext.className = 'btn-modal-primary';
      }
    }
  },

  renderPages() {
    for (let i = 0; i <= 3; i++) {
      const page = document.getElementById('wizard-page-' + i);
      if (page) page.classList.toggle('active', i === this.step);
    }
    if (this.step === 3) {
      this.renderSummary();
    }
  },

  renderSummary() {
    const summaryBox = document.getElementById('wizard-launch-summary');
    if (!summaryBox) return;

    const archNames = {
      crm: _t('archCrm', 'CRM & Sales Pipeline'),
      ecom: _t('archEcom', 'Modern E-Commerce Store'),
      saas: _t('archSaas', 'SaaS Analytics Dashboard'),
      task: _t('archTask', 'Project & Task Board'),
      booking: _t('archBooking', 'Booking & Appointments'),
      finance: _t('archFinance', 'Personal Finance & Budget')
    };

    const activeFeats = Object.keys(this.features).filter(k => this.features[k]);
    const lang = (typeof currentLang !== 'undefined' && currentLang === 'fr') ? 'fr' : 'en';

    summaryBox.innerHTML = `
      <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:18px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;align-items:center;gap:12px">
          <div style="font-size:2.2rem">🚀</div>
          <div>
            <h4 style="color:#fff;margin:0;font-size:1.1rem">${archNames[this.selectedArchetype] || this.selectedArchetype}</h4>
            <p style="color:#94a3b8;margin:3px 0 0 0;font-size:0.8rem">${lang === 'fr' ? 'Prêt à être assemblé et rendu en direct dans le studio.' : 'Ready to be assembled and rendered live in the studio.'}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px">
          <span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:4px 10px;border-radius:20px;font-size:0.75rem;font-weight:700">🎨 Theme: ${this.selectedTheme.toUpperCase()}</span>
          <span style="background:rgba(16,185,129,0.15);color:#34d399;padding:4px 10px;border-radius:20px;font-size:0.75rem;font-weight:700">⚡ ${activeFeats.length} Features Active</span>
          <span style="background:rgba(236,72,153,0.15);color:#f472b6;padding:4px 10px;border-radius:20px;font-size:0.75rem;font-weight:700">💾 LocalStorage Ready</span>
        </div>
      </div>
    `;
  },

  buildApp() {
    this.close();
    if (typeof showToast === 'function') {
      showToast(_t('msgGenStart', '✦ Constructing your application...'), 'info');
    }

    setTimeout(() => {
      const app = this.generateArchetypeCode(this.selectedArchetype, this.selectedTheme, this.features);
      if (typeof loadAppIntoStudio === 'function') {
        loadAppIntoStudio(app, false);
      }
      if (typeof showToast === 'function') {
        showToast(_t('msgGenDone', '✅ Application generated and rendered live!'), 'success');
      }
      if (typeof consoleLog === 'function') {
        consoleLog('🧙‍♂️ App Wizard: Successfully created ' + app.name, 'ok');
      }

      // Update screen bar if screens are supported
      if (window.UltraScreenManager) {
        UltraScreenManager.scanAndRender();
      }
    }, 400);
  },

  generateArchetypeCode(arch, theme, feat) {
    const lang = (typeof currentLang !== 'undefined' && currentLang === 'fr') ? 'fr' : 'en';
    const isFr = lang === 'fr';

    // Theme color palettes
    const themes = {
      neon:     { bg: '#090d16', card: '#111827', accent: '#8b5cf6', accent2: '#06b6d4', text: '#f8fafc', border: 'rgba(139,92,246,0.35)' },
      saas:     { bg: '#0f172a', card: '#1e293b', accent: '#3b82f6', accent2: '#10b981', text: '#f1f5f9', border: 'rgba(59,130,246,0.3)' },
      midnight: { bg: '#030712', card: '#0b1120', accent: '#38bdf8', accent2: '#6366f1', text: '#f9fafb', border: 'rgba(56,189,248,0.25)' },
      emerald:  { bg: '#061712', card: '#0b261e', accent: '#10b981', accent2: '#f59e0b', text: '#ecfdf5', border: 'rgba(16,185,129,0.3)' },
      rose:     { bg: '#180a14', card: '#271221', accent: '#ec4899', accent2: '#a855f7', text: '#fdf2f8', border: 'rgba(236,72,153,0.35)' }
    };
    const pal = themes[theme] || themes.neon;

    if (arch === 'crm') {
      return this._generateCrm(pal, isFr, feat);
    } else if (arch === 'ecom') {
      return this._generateEcom(pal, isFr, feat);
    } else if (arch === 'saas') {
      return this._generateSaas(pal, isFr, feat);
    } else if (arch === 'task') {
      return this._generateTask(pal, isFr, feat);
    } else if (arch === 'booking') {
      return this._generateBooking(pal, isFr, feat);
    } else {
      return this._generateFinance(pal, isFr, feat);
    }
  },

  // --- ARCHETYPE 1: CRM & SALES PIPELINE ---
  _generateCrm(pal, isFr, feat) {
    const name = isFr ? 'CRM & Pipeline Commercial' : 'CRM & Sales Pipeline';
    const html = `
<div class="app-container">
  <!-- Topbar -->
  <header class="navbar">
    <div class="brand">
      <div class="brand-logo">💼</div>
      <div>
        <h2 class="brand-title">${isFr ? 'Nexus CRM Studio' : 'Nexus Sales CRM'}</h2>
        <span class="brand-sub">${isFr ? 'Pipeline Commercial & Leads' : 'Enterprise Pipeline & Deals'}</span>
      </div>
    </div>
    <div class="nav-actions">
      ${feat.search ? '<input type="text" id="lead-search" class="search-input" placeholder="' + (isFr ? 'Rechercher prospects...' : 'Search leads...') + '" oninput="renderLeads()" />' : ''}
      <button class="btn-primary" onclick="openLeadModal()">${isFr ? '+ Nouveau Prospect' : '+ Add Lead'}</button>
      ${feat.export ? '<button class="btn-secondary" onclick="exportCsv()">📥 CSV</button>' : ''}
    </div>
  </header>

  <!-- SCREEN 1: HOME (KANBAN & LEADS) -->
  <div data-screen="home" class="screen-view">
    <section class="kpi-grid">
      <div class="kpi-card">
        <span class="kpi-label">${isFr ? 'Total Pipeline' : 'Total Pipeline Value'}</span>
        <div class="kpi-val" id="kpi-total">$142,500</div>
        <span class="kpi-badge positive">+18.5% ${isFr ? 'ce mois' : 'this month'}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">${isFr ? 'Opportunités Actives' : 'Active Deals'}</span>
        <div class="kpi-val" id="kpi-count">18</div>
        <span class="kpi-badge">8 ${isFr ? 'qualifiées' : 'qualified'}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">${isFr ? 'Taux de Conversion' : 'Conversion Rate'}</span>
        <div class="kpi-val">34.2%</div>
        <span class="kpi-badge positive">▲ 4.1%</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">${isFr ? 'Gagnées (Ce Mois)' : 'Won This Month'}</span>
        <div class="kpi-val" id="kpi-won">$58,000</div>
        <span class="kpi-badge positive">5 ${isFr ? 'signatures' : 'signed'}</span>
      </div>
    </section>

    <main class="pipeline-board" style="margin-top:16px">
      <div class="column" data-stage="new">
        <div class="col-header">
          <span class="col-title">${isFr ? 'Nouveaux Prospects' : 'New Leads'}</span>
          <span class="col-badge" id="badge-new">0</span>
        </div>
        <div class="card-list" id="col-new"></div>
      </div>
      <div class="column" data-stage="contacted">
        <div class="col-header">
          <span class="col-title">${isFr ? 'Contactés' : 'Contacted'}</span>
          <span class="col-badge" id="badge-contacted">0</span>
        </div>
        <div class="card-list" id="col-contacted"></div>
      </div>
      <div class="column" data-stage="proposal">
        <div class="col-header">
          <span class="col-title">${isFr ? 'Proposition Envoyée' : 'Proposal Sent'}</span>
          <span class="col-badge" id="badge-proposal">0</span>
        </div>
        <div class="card-list" id="col-proposal"></div>
      </div>
      <div class="column" data-stage="won">
        <div class="col-header">
          <span class="col-title">${isFr ? 'Gagnés & Signés' : 'Won & Closed'}</span>
          <span class="col-badge" id="badge-won">0</span>
        </div>
        <div class="card-list" id="col-won"></div>
      </div>
    </main>
  </div>

  <!-- SCREEN 2: DASHBOARD (SALES ANALYTICS & FORECAST) -->
  <div data-screen="dashboard" class="screen-view" style="display:none">
    <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:16px">
      <h3 style="color:#fff;margin:0 0 6px 0">📊 ${isFr ? 'Analytiques Commerciales & Prévisions' : 'Sales Analytics & Forecasting'}</h3>
      <p style="color:#94a3b8;font-size:0.82rem;margin:0">${isFr ? 'Indicateurs de vélocité des ventes et ratios de transformation' : 'Deal velocity metrics, conversion ratios and quarterly projection'}</p>
    </div>
    <div class="kpi-grid">
      <div class="kpi-card"><span class="kpi-label">Win Rate</span><div class="kpi-val" style="color:#10b981">68.4%</div><span class="kpi-badge positive">▲ Top Tier</span></div>
      <div class="kpi-card"><span class="kpi-label">Avg Sales Cycle</span><div class="kpi-val">14 Days</div><span class="kpi-badge">High Velocity</span></div>
      <div class="kpi-card"><span class="kpi-label">Q3 Forecast</span><div class="kpi-val">$284,000</div><span class="kpi-badge positive">+22% Target</span></div>
      <div class="kpi-card"><span class="kpi-label">Active Reps</span><div class="kpi-val">6 Reps</div><span class="kpi-badge">100% Quota</span></div>
    </div>
  </div>

  <!-- SCREEN 3: SETTINGS (CRM PREFERENCES) -->
  <div data-screen="settings" class="screen-view" style="display:none">
    <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:14px">
      <h3 style="color:#fff;margin:0">⚙️ ${isFr ? 'Paramètres & Configuration CRM' : 'CRM Workspace & Settings'}</h3>
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:12px">
        <div>
          <strong style="color:#fff;font-size:0.88rem">${isFr ? 'Devise du Pipeline' : 'Pipeline Currency'}</strong>
          <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">Default currency for all deal amounts</p>
        </div>
        <select style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid var(--border);padding:6px 12px;border-radius:8px">
          <option>USD ($)</option><option>EUR (€)</option><option>GBP (£)</option>
        </select>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <strong style="color:#fff;font-size:0.88rem">${isFr ? 'Sauvegarde Automatique' : 'Auto-Save Leads'}</strong>
          <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">Sync changes instantly to LocalStorage</p>
        </div>
        <input type="checkbox" checked style="width:20px;height:20px;accent-color:var(--accent)" />
      </div>
    </div>
  </div>

  <!-- Add Lead Modal -->
  <div class="modal-overlay" id="lead-modal">
    <div class="modal-box">
      <div class="modal-head">
        <h3 style="margin:0;color:#fff">${isFr ? 'Nouveau Prospect' : 'Create New Lead'}</h3>
        <button class="btn-close" onclick="closeLeadModal()">✕</button>
      </div>
      <form onsubmit="saveLead(event)" class="modal-form">
        <label>${isFr ? 'Nom du Contact' : 'Contact Name'}</label>
        <input type="text" id="m-name" required placeholder="e.g. Sarah Connor" />
        <label>${isFr ? 'Entreprise' : 'Company'}</label>
        <input type="text" id="m-company" required placeholder="e.g. Cyberdyne Systems" />
        <label>${isFr ? 'Valeur Estimée ($)' : 'Deal Value ($)'}</label>
        <input type="number" id="m-val" required placeholder="12500" />
        <label>${isFr ? 'Priorité' : 'Priority'}</label>
        <select id="m-prio">
          <option value="High">${isFr ? 'Haute' : 'High'}</option>
          <option value="Medium">${isFr ? 'Moyenne' : 'Medium'}</option>
          <option value="Low">${isFr ? 'Basse' : 'Low'}</option>
        </select>
        <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:14px">
          <button type="button" class="btn-secondary" onclick="closeLeadModal()">${isFr ? 'Annuler' : 'Cancel'}</button>
          <button type="submit" class="btn-primary">${isFr ? 'Enregistrer' : 'Save Lead'}</button>
        </div>
      </form>
    </div>
  </div>
</div>`;

    const css = `
:root {
  --bg: ${pal.bg};
  --card: ${pal.card};
  --accent: ${pal.accent};
  --accent2: ${pal.accent2};
  --text: ${pal.text};
  --border: ${pal.border};
}
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: var(--bg); color: var(--text); padding: 18px; }
.app-container { max-width: 1300px; margin: 0 auto; display: flex; flex-direction: column; gap: 18px; }
.navbar { display: flex; align-items: center; justify-content: space-between; background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 14px 20px; flex-wrap: wrap; gap: 12px; }
.brand { display: flex; align-items: center; gap: 12px; }
.brand-logo { font-size: 1.8rem; }
.brand-title { font-size: 1.15rem; font-weight: 800; color: #fff; }
.brand-sub { font-size: 0.72rem; color: #94a3b8; }
.nav-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.search-input { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; color: #fff; padding: 8px 14px; font-size: 0.82rem; outline: none; width: 200px; }
.btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; padding: 9px 18px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; transition: opacity .2s; }
.btn-primary:hover { opacity: .9; }
.btn-secondary { background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: var(--text); padding: 9px 14px; border-radius: 8px; font-weight: 700; font-size: 0.82rem; cursor: pointer; }
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.kpi-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.kpi-label { font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
.kpi-val { font-size: 1.6rem; font-weight: 800; color: #fff; }
.kpi-badge { font-size: 0.72rem; font-weight: 700; color: #94a3b8; }
.kpi-badge.positive { color: #10b981; }
.pipeline-board { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
.column { background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px; min-height: 420px; }
.col-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.col-title { font-size: 0.84rem; font-weight: 800; color: #e2e8f0; }
.col-badge { background: rgba(255,255,255,0.08); padding: 2px 8px; border-radius: 10px; font-size: 0.72rem; font-weight: 800; }
.card-list { display: flex; flex-direction: column; gap: 10px; flex: 1; }
.lead-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 6px; cursor: pointer; transition: all .15s; }
.lead-card:hover { transform: translateY(-2px); border-color: var(--accent); }
.lead-name { font-weight: 700; font-size: 0.88rem; color: #fff; }
.lead-company { font-size: 0.75rem; color: #94a3b8; }
.lead-foot { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
.lead-val { font-weight: 800; color: var(--accent2); font-size: 0.85rem; }
.prio-pill { font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 6px; }
.prio-High { background: rgba(239,68,68,0.2); color: #f87171; }
.prio-Medium { background: rgba(245,158,11,0.2); color: #fbbf24; }
.prio-Low { background: rgba(16,185,129,0.2); color: #34d399; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center; z-index: 99; padding: 16px; }
.modal-overlay.open { display: flex; }
.modal-box { background: var(--card); border: 1px solid var(--border); border-radius: 14px; width: 440px; max-width: 95vw; padding: 20px; box-shadow: 0 20px 50px rgba(0,0,0,0.8); }
.modal-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.btn-close { background: none; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer; }
.modal-form { display: flex; flex-direction: column; gap: 10px; }
.modal-form label { font-size: 0.75rem; color: #94a3b8; font-weight: 700; }
.modal-form input, .modal-form select { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; color: #fff; padding: 9px 12px; font-size: 0.85rem; outline: none; }
`;

    const js = `
const STORAGE_KEY = 'crm_leads';
const DEFAULT_LEADS = [
  { id: '1', name: 'Alexander Vance', company: 'Quantum Labs', val: 28000, stage: 'new', prio: 'High' },
  { id: '2', name: 'Elena Rostova', company: 'Aero Dynamics', val: 14500, stage: 'contacted', prio: 'Medium' },
  { id: '3', name: 'Marcus Chen', company: 'Nova Robotics', val: 42000, stage: 'proposal', prio: 'High' },
  { id: '4', name: 'Sophia Dupont', company: 'Solaris Cloud', val: 35000, stage: 'won', prio: 'High' },
  { id: '5', name: 'Liam Davies', company: 'Apex Global', val: 23000, stage: 'won', prio: 'Medium' }
];

let leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_LEADS;

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

function renderLeads() {
  const q = (document.getElementById('lead-search')?.value || '').toLowerCase();
  const stages = ['new', 'contacted', 'proposal', 'won'];
  
  stages.forEach(st => {
    const col = document.getElementById('col-' + st);
    if (!col) return;
    const filtered = leads.filter(l => l.stage === st && (l.name.toLowerCase().includes(q) || l.company.toLowerCase().includes(q)));
    
    document.getElementById('badge-' + st).textContent = filtered.length;
    col.innerHTML = filtered.map(l => \`
      <div class="lead-card" onclick="advanceStage('\${l.id}')" title="Click to advance stage">
        <div class="lead-name">\${l.name}</div>
        <div class="lead-company">\${l.company}</div>
        <div class="lead-foot">
          <span class="lead-val">$\${l.val.toLocaleString()}</span>
          <span class="prio-pill prio-\${l.prio}">\${l.prio}</span>
        </div>
      </div>
    \`).join('');
  });

  // Calculate KPIs
  const total = leads.reduce((acc, l) => acc + Number(l.val), 0);
  const won = leads.filter(l => l.stage === 'won').reduce((acc, l) => acc + Number(l.val), 0);
  
  const elTotal = document.getElementById('kpi-total');
  const elCount = document.getElementById('kpi-count');
  const elWon = document.getElementById('kpi-won');
  if (elTotal) elTotal.textContent = '$' + total.toLocaleString();
  if (elCount) elCount.textContent = leads.length;
  if (elWon) elWon.textContent = '$' + won.toLocaleString();
}

function advanceStage(id) {
  const idx = leads.findIndex(l => l.id === id);
  if (idx === -1) return;
  const order = ['new', 'contacted', 'proposal', 'won'];
  const curPos = order.indexOf(leads[idx].stage);
  leads[idx].stage = order[(curPos + 1) % order.length];
  saveStorage();
  renderLeads();
}

function openLeadModal() { document.getElementById('lead-modal').classList.add('open'); }
function closeLeadModal() { document.getElementById('lead-modal').classList.remove('open'); }

function saveLead(e) {
  e.preventDefault();
  const name = document.getElementById('m-name').value.trim();
  const company = document.getElementById('m-company').value.trim();
  const val = Number(document.getElementById('m-val').value) || 5000;
  const prio = document.getElementById('m-prio').value;

  leads.unshift({ id: String(Date.now()), name, company, val, stage: 'new', prio });
  saveStorage();
  closeLeadModal();
  renderLeads();
}

function exportCsv() {
  const rows = [['Name', 'Company', 'Value', 'Stage', 'Priority']];
  leads.forEach(l => rows.push([l.name, l.company, l.val, l.stage, l.prio]));
  const csv = rows.map(r => r.join(',')).join('\\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'crm_leads.csv';
  a.click();
}

// Listen for storage updates from Data Engine
window.addEventListener('storage', () => {
  leads = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_LEADS;
  renderLeads();
});

renderLeads();
`;

    return { name, html, css, js };
  },

  // --- ARCHETYPE 2: MODERN E-COMMERCE STORE ---
  _generateEcom(pal, isFr, feat) {
    const name = isFr ? 'Boutique E-Commerce Moderne' : 'Modern E-Commerce Store';
    const html = `
<div class="store-app">
  <header class="store-header">
    <div class="brand">
      <span class="logo">🛍️</span>
      <div>
        <h1 class="title">${isFr ? 'Aura Luxe Store' : 'Aura Concept Store'}</h1>
        <p class="subtitle">${isFr ? 'Boutique en ligne & design épuré' : 'Curated premium tech & minimalist goods'}</p>
      </div>
    </div>
    <div class="actions">
      ${feat.search ? '<input type="text" id="prod-search" class="search-bar" placeholder="' + (isFr ? 'Rechercher des articles...' : 'Search products...') + '" oninput="renderProducts()" />' : ''}
      <button class="cart-trigger" onclick="toggleCart()">
        <span>🛒</span>
        <span class="cart-count" id="cart-badge">0</span>
      </button>
    </div>
  </header>

  <!-- SCREEN 1: HOME (CATALOG) -->
  <div data-screen="home" class="screen-view">
    <nav class="cat-bar" id="cat-bar" style="margin-bottom:14px">
      <button class="cat-btn active" data-cat="all" onclick="filterCat('all', this)">${isFr ? 'Tout' : 'All Products'}</button>
      <button class="cat-btn" data-cat="Audio" onclick="filterCat('Audio', this)">Audio</button>
      <button class="cat-btn" data-cat="Tech" onclick="filterCat('Tech', this)">Tech</button>
      <button class="cat-btn" data-cat="Wear" onclick="filterCat('Wear', this)">${isFr ? 'Mode' : 'Wearables'}</button>
    </nav>
    <main class="product-grid" id="product-grid"></main>
  </div>

  <!-- SCREEN 2: DASHBOARD (ORDERS HISTORY) -->
  <div data-screen="dashboard" class="screen-view" style="display:none">
    <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:20px;margin-bottom:16px">
      <h3 style="color:#fff;margin:0 0 6px 0">📦 ${isFr ? 'Historique des Commandes' : 'Customer Orders & History'}</h3>
      <p style="color:#94a3b8;font-size:0.82rem;margin:0">${isFr ? 'Suivez vos colis et vos achats passés' : 'Track current deliveries and view order receipts'}</p>
    </div>
    <div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;display:flex;flex-direction:column;gap:12px">
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:10px">
        <div>
          <strong style="color:#fff">Order #AUR-8942</strong>
          <div style="color:#94a3b8;font-size:0.75rem">1x Aura Studio Wireless ANC</div>
        </div>
        <span style="background:rgba(16,185,129,0.15);color:#34d399;font-weight:700;padding:4px 10px;border-radius:12px;font-size:0.75rem">Delivered / Livré</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <strong style="color:#fff">Order #AUR-9104</strong>
          <div style="color:#94a3b8;font-size:0.75rem">1x Mechanical Cyber Keyboard</div>
        </div>
        <span style="background:rgba(56,189,248,0.15);color:#38bdf8;font-weight:700;padding:4px 10px;border-radius:12px;font-size:0.75rem">In Transit / En cours</span>
      </div>
    </div>
  </div>

  <!-- SCREEN 3: SETTINGS (STORE PREFERENCES) -->
  <div data-screen="settings" class="screen-view" style="display:none">
    <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:14px">
      <h3 style="color:#fff;margin:0">⚙️ ${isFr ? 'Préférences de la Boutique' : 'Store Settings & Shipping'}</h3>
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:12px">
        <span style="color:#e2e8f0;font-size:0.85rem">Default Shipping Region</span>
        <select style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid var(--border);padding:6px 12px;border-radius:8px"><option>Europe (Express)</option><option>North America</option></select>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="color:#e2e8f0;font-size:0.85rem">Order Confirmation SMS</span>
        <input type="checkbox" checked style="width:20px;height:20px;accent-color:var(--accent)" />
      </div>
    </div>
  </div>

  <!-- Cart Drawer -->
  <div class="cart-drawer" id="cart-drawer">
    <div class="cart-head">
      <h3>${isFr ? 'Mon Panier' : 'Your Cart'}</h3>
      <button class="btn-close" onclick="toggleCart()">✕</button>
    </div>
    <div class="cart-items" id="cart-items"></div>
    <div class="cart-footer">
      <div class="total-row">
        <span>${isFr ? 'Sous-total' : 'Subtotal'}:</span>
        <strong id="cart-subtotal">$0.00</strong>
      </div>
      ${feat.payment ? '<button class="btn-checkout" onclick="openCheckout()">' + (isFr ? 'Passer la Commande' : 'Proceed to Checkout') + '</button>' : ''}
    </div>
  </div>

  <!-- Checkout Modal -->
  <div class="modal-overlay" id="checkout-modal">
    <div class="modal-box">
      <div class="modal-head">
        <h3 style="color:#fff">${isFr ? 'Paiement Sécurisé' : 'Express Checkout'}</h3>
        <button class="btn-close" onclick="closeCheckout()">✕</button>
      </div>
      <form onsubmit="handlePayment(event)" style="display:flex;flex-direction:column;gap:10px">
        <label style="font-size:0.75rem;color:#94a3b8">${isFr ? 'Adresse Email' : 'Email Address'}</label>
        <input type="email" required placeholder="alex@domain.com" class="inp" />
        <label style="font-size:0.75rem;color:#94a3b8">${isFr ? 'Numéro de Carte' : 'Card Number'}</label>
        <input type="text" required placeholder="4242 •••• •••• 4242" class="inp" />
        <div style="display:flex;gap:8px">
          <input type="text" required placeholder="MM/YY" class="inp" style="flex:1" />
          <input type="text" required placeholder="CVC" class="inp" style="width:80px" />
        </div>
        <button type="submit" class="btn-checkout" style="margin-top:12px">${isFr ? 'Payer Maintenant' : 'Pay Now'}</button>
      </form>
    </div>
  </div>
</div>`;

    const css = `
:root {
  --bg: ${pal.bg};
  --card: ${pal.card};
  --accent: ${pal.accent};
  --accent2: ${pal.accent2};
  --text: ${pal.text};
  --border: ${pal.border};
}
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: var(--bg); color: var(--text); padding: 18px; }
.store-app { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.store-header { display: flex; justify-content: space-between; align-items: center; background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 14px 20px; flex-wrap: wrap; gap: 12px; }
.brand { display: flex; align-items: center; gap: 12px; }
.logo { font-size: 2rem; }
.title { font-size: 1.2rem; font-weight: 800; color: #fff; }
.subtitle { font-size: 0.75rem; color: #94a3b8; }
.actions { display: flex; align-items: center; gap: 10px; }
.search-bar { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; color: #fff; padding: 8px 14px; font-size: 0.82rem; outline: none; width: 220px; }
.cart-trigger { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; padding: 8px 16px; border-radius: 10px; cursor: pointer; display: flex; align-items: center; gap: 8px; font-weight: 800; }
.cart-count { background: #fff; color: #000; border-radius: 50%; padding: 2px 7px; font-size: 0.72rem; }
.cat-bar { display: flex; gap: 8px; overflow-x: auto; }
.cat-btn { background: rgba(255,255,255,0.04); border: 1px solid var(--border); color: #94a3b8; padding: 6px 14px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all .15s; }
.cat-btn.active, .cat-btn:hover { background: var(--accent); color: #fff; border-color: var(--accent); }
.product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.prod-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 14px; display: flex; flex-direction: column; gap: 10px; transition: transform .2s, border-color .2s; }
.prod-card:hover { transform: translateY(-3px); border-color: var(--accent); }
.prod-img { width: 100%; height: 160px; object-fit: cover; border-radius: 10px; background: #1a2238; }
.prod-title { font-size: 0.92rem; font-weight: 800; color: #fff; }
.prod-cat { font-size: 0.7rem; color: var(--accent2); font-weight: 700; text-transform: uppercase; }
.prod-foot { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
.prod-price { font-size: 1.1rem; font-weight: 900; color: #fff; }
.btn-add { background: rgba(255,255,255,0.08); border: 1px solid var(--border); color: #fff; padding: 6px 12px; border-radius: 8px; font-size: 0.78rem; font-weight: 700; cursor: pointer; transition: all .15s; }
.btn-add:hover { background: var(--accent); border-color: var(--accent); }
.cart-drawer { position: fixed; top: 0; right: -360px; width: 340px; height: 100vh; background: var(--card); border-left: 1px solid var(--border); z-index: 100; transition: right .3s ease; display: flex; flex-direction: column; padding: 20px; box-shadow: -10px 0 40px rgba(0,0,0,0.8); }
.cart-drawer.open { right: 0; }
.cart-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.btn-close { background: none; border: none; color: #94a3b8; font-size: 1.2rem; cursor: pointer; }
.cart-items { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
.cart-row { display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 8px 10px; border-radius: 8px; font-size: 0.82rem; }
.cart-footer { margin-top: auto; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; display: flex; flex-direction: column; gap: 10px; }
.total-row { display: flex; justify-content: space-between; font-size: 1rem; color: #fff; }
.btn-checkout { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; padding: 12px; border-radius: 10px; font-weight: 800; cursor: pointer; }
.modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); backdrop-filter: blur(4px); display: none; align-items: center; justify-content: center; z-index: 101; padding: 16px; }
.modal-overlay.open { display: flex; }
.modal-box { background: var(--card); border: 1px solid var(--border); border-radius: 14px; width: 400px; max-width: 95vw; padding: 20px; }
.inp { background: rgba(255,255,255,0.06); border: 1px solid var(--border); border-radius: 8px; color: #fff; padding: 9px 12px; font-size: 0.85rem; outline: none; }
`;

    const js = `
const STORAGE_KEY = 'store_products';
const DEFAULT_PRODUCTS = [
  { id: '1', title: 'Aura Studio Wireless ANC', cat: 'Audio', price: 299, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: '2', title: 'Mechanical Cyber Keyboard', cat: 'Tech', price: 169, img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80' },
  { id: '3', title: 'Precision Touch Stylus Pro', cat: 'Tech', price: 89, img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=500&q=80' },
  { id: '4', title: 'Minimalist Titanium Watch', cat: 'Wear', price: 340, img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { id: '5', title: 'Acoustic Soundbar Ultra', cat: 'Audio', price: 420, img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80' },
  { id: '6', title: 'Smart Fitness Band V3', cat: 'Wear', price: 119, img: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80' }
];

let products = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_PRODUCTS;
let cart = [];
let currentCategory = 'all';

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  const q = (document.getElementById('prod-search')?.value || '').toLowerCase();

  const filtered = products.filter(p => {
    const matchCat = currentCategory === 'all' || p.cat === currentCategory;
    const matchSearch = p.title.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  grid.innerHTML = filtered.map(p => \`
    <div class="prod-card">
      <img src="\${p.img}" class="prod-img" alt="\${p.title}" />
      <span class="prod-cat">\${p.cat}</span>
      <h4 class="prod-title">\${p.title}</h4>
      <div class="prod-foot">
        <span class="prod-price">$\${p.price}</span>
        <button class="btn-add" onclick="addToCart('\${p.id}')">\${(typeof currentLang !== 'undefined' && currentLang === 'fr') ? '+ Ajouter' : '+ Add'}</button>
      </div>
    </div>
  \`).join('');
}

function filterCat(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderProducts();
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  if (!prod) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...prod, qty: 1 });
  }
  updateCartUI();
}

function updateCartUI() {
  const badge = document.getElementById('cart-badge');
  const itemsBox = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  
  const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  if (badge) badge.textContent = totalCount;
  if (subtotalEl) subtotalEl.textContent = '$' + totalPrice.toFixed(2);

  if (itemsBox) {
    itemsBox.innerHTML = cart.map(item => \`
      <div class="cart-row">
        <div>
          <div style="font-weight:700">\${item.title}</div>
          <div style="color:#94a3b8;font-size:0.75rem">$\${item.price} × \${item.qty}</div>
        </div>
        <button onclick="removeFromCart('\${item.id}')" style="background:none;border:none;color:#f87171;cursor:pointer">🗑️</button>
      </div>
    \`).join('');
  }
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
}

function openCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  document.getElementById('checkout-modal').classList.add('open');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('open');
}

function handlePayment(e) {
  e.preventDefault();
  closeCheckout();
  toggleCart();
  cart = [];
  updateCartUI();
  alert('🎉 Order confirmed! Thank you for your purchase.');
}

renderProducts();
`;

    return { name, html, css, js };
  },

  // --- ARCHETYPE 3: SAAS ANALYTICS DASHBOARD ---
  _generateSaas(pal, isFr, feat) {
    const name = isFr ? 'Tableau de Bord SaaS & Métriques' : 'SaaS Analytics Dashboard';
    const html = `
<div class="saas-app">
  <header class="saas-header">
    <div>
      <h2 style="color:#fff;margin:0;font-size:1.25rem">${isFr ? 'Observatoire Métriques SaaS' : 'SaaS Growth & Telemetry'}</h2>
      <span style="color:#94a3b8;font-size:0.75rem">${isFr ? 'Indicateurs temps réel & rétention client' : 'Live ARR, MRR, Churn and User Retention'}</span>
    </div>
    <div style="display:flex;gap:8px">
      <button class="saas-pill active">${isFr ? '30 Jours' : '30 Days'}</button>
      <button class="saas-pill">${isFr ? 'Trimestre' : 'Quarter'}</button>
      ${feat.export ? '<button class="saas-btn-export" onclick="exportData()">📥 ' + (isFr ? 'Exporter' : 'Export') + '</button>' : ''}
    </div>
  </header>

  <!-- SCREEN 1: HOME -->
  <div data-screen="home" class="screen-view">
    <div style="background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:14px;padding:36px 20px;text-align:center;margin-bottom:16px">
      <span style="font-size:0.7rem;font-weight:800;padding:3px 10px;border-radius:20px;background:rgba(56,189,248,0.15);color:#38bdf8">SCREEN 1 / ÉCRAN 1</span>
      <h1 style="color:#fff;margin:12px 0 8px 0;font-size:2rem">${isFr ? 'Vue d\'Ensemble SaaS' : 'SaaS Platform Overview'}</h1>
      <p style="color:#94a3b8;max-width:540px;margin:0 auto 20px auto;font-size:0.9rem">${isFr ? 'Pilotez vos revenus récurrents, surveillez la rétention et gérez votre infrastructure.' : 'Monitor recurring revenue, track churn, and oversee subscriber growth in real-time.'}</p>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="btn-primary" onclick="window.parent.UltraScreenManager ? window.parent.UltraScreenManager.switchScreen('Dashboard') : null">${isFr ? 'Voir le Dashboard →' : 'Open Dashboard →'}</button>
        <button class="btn-secondary" onclick="window.parent.UltraScreenManager ? window.parent.UltraScreenManager.switchScreen('Settings') : null">${isFr ? 'Paramètres' : 'Settings'}</button>
      </div>
    </div>
  </div>

  <!-- SCREEN 2: DASHBOARD -->
  <div data-screen="dashboard" class="screen-view" style="display:none">
    <!-- 4 KPIs -->
    <section class="kpi-row">
      <div class="kpi-card">
        <span class="label">Monthly Recurring (MRR)</span>
        <div class="val">$48,250</div>
        <span class="trend positive">▲ +14.2% vs last mo</span>
      </div>
      <div class="kpi-card">
        <span class="label">Active Subscriptions</span>
        <div class="val">1,420</div>
        <span class="trend positive">▲ +84 this week</span>
      </div>
      <div class="kpi-card">
        <span class="label">Customer Churn Rate</span>
        <div class="val">1.18%</div>
        <span class="trend positive">▼ -0.3% improvement</span>
      </div>
      <div class="kpi-card">
        <span class="label">Average Revenue / User</span>
        <div class="val">$84.50</div>
        <span class="trend">● Stable</span>
      </div>
    </section>

    <!-- Chart Card -->
    <section class="chart-card">
      <div class="chart-head">
        <h3 style="color:#fff;font-size:0.95rem;margin:0">${isFr ? 'Courbe des Revenus (MRR)' : 'MRR Growth Trajectory'}</h3>
        <span style="color:#38bdf8;font-size:0.78rem;font-weight:700">● Live Stream</span>
      </div>
      <canvas id="saas-chart" height="110" style="width:100%;background:#090e1c;border-radius:10px"></canvas>
    </section>

    <!-- Live Event Stream -->
    <section class="table-card">
      <h3 style="color:#fff;font-size:0.92rem;margin-bottom:12px">${isFr ? 'Activité Récente des Abonnés' : 'Recent Subscription Activity'}</h3>
      <table class="saas-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody id="activity-rows"></tbody>
      </table>
    </section>
  </div>

  <!-- SCREEN 3: SETTINGS -->
  <div data-screen="settings" class="screen-view" style="display:none">
    <div style="background:var(--card);border:1px solid var(--border);border-radius:14px;padding:24px;display:flex;flex-direction:column;gap:16px;max-width:700px">
      <h3 style="color:#fff;margin:0">⚙️ ${isFr ? 'Configuration SaaS & Facturation' : 'SaaS Billing & API Settings'}</h3>
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.06);padding-bottom:12px">
        <div>
          <strong style="color:#fff;font-size:0.88rem">${isFr ? 'Passerelle Stripe / Paiements' : 'Payment Gateway'}</strong>
          <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">Live webhook synchronization</p>
        </div>
        <span style="background:rgba(16,185,129,0.2);color:#34d399;font-size:0.75rem;font-weight:800;padding:3px 8px;border-radius:6px">● CONNECTED</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div>
          <strong style="color:#fff;font-size:0.88rem">${isFr ? 'Alertes de Churn Automatiques' : 'Automated Churn Alerts'}</strong>
          <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">Email notifications on subscription cancellations</p>
        </div>
        <input type="checkbox" checked style="width:20px;height:20px;accent-color:var(--accent)" />
      </div>
    </div>
  </div>
</div>`;

    const css = `
:root {
  --bg: ${pal.bg};
  --card: ${pal.card};
  --accent: ${pal.accent};
  --accent2: ${pal.accent2};
  --text: ${pal.text};
  --border: ${pal.border};
}
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: var(--bg); color: var(--text); padding: 18px; }
.saas-app { max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.saas-header { display: flex; justify-content: space-between; align-items: center; background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px 20px; flex-wrap: wrap; gap: 10px; }
.saas-pill { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: #94a3b8; padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; cursor: pointer; }
.saas-pill.active { background: var(--accent); color: #fff; border-color: var(--accent); }
.saas-btn-export { background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.4); color: #34d399; padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 700; cursor: pointer; }
.kpi-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
.kpi-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.label { font-size: 0.75rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
.val { font-size: 1.6rem; font-weight: 800; color: #fff; }
.trend { font-size: 0.72rem; font-weight: 700; color: #94a3b8; }
.trend.positive { color: #10b981; }
.chart-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.chart-head { display: flex; justify-content: space-between; align-items: center; }
.table-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px; overflow-x: auto; }
.saas-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.saas-table th { text-align: left; padding: 9px 12px; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.08); font-weight: 700; }
.saas-table td { padding: 9px 12px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #e2e8f0; }
.status-pill { padding: 3px 8px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; }
.status-active { background: rgba(16,185,129,0.15); color: #34d399; }
.status-upgraded { background: rgba(56,189,248,0.15); color: #38bdf8; }
`;

    const js = `
const activities = [
  { user: 'Maya Lin (Vortex)', plan: 'Enterprise', amt: '$499/mo', status: 'upgraded', time: '2 mins ago' },
  { user: 'Kenji Sato (Mirai)', plan: 'Pro Tier', amt: '$99/mo', status: 'active', time: '14 mins ago' },
  { user: 'Clara Oswald (Tardis)', plan: 'Starter', amt: '$29/mo', status: 'active', time: '38 mins ago' },
  { user: 'David Kim (Hyper)', plan: 'Pro Tier', amt: '$99/mo', status: 'active', time: '1 hr ago' },
  { user: 'Sarah Connor (Cyber)', plan: 'Enterprise', amt: '$499/mo', status: 'upgraded', time: '2 hrs ago' }
];

function renderTable() {
  const tb = document.getElementById('activity-rows');
  if (!tb) return;
  tb.innerHTML = activities.map(a => \`
    <tr>
      <td style="font-weight:700">\${a.user}</td>
      <td>\${a.plan}</td>
      <td style="color:#38bdf8;font-weight:700">\${a.amt}</td>
      <td><span class="status-pill status-\${a.status}">\${a.status.toUpperCase()}</span></td>
      <td style="color:#64748b">\${a.time}</td>
    </tr>
  \`).join('');
}

function renderChart() {
  const canvas = document.getElementById('saas-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth;
  const h = canvas.height = 110;

  const points = [28, 32, 30, 36, 42, 39, 45, 48, 52, 58, 64, 70];
  const step = w / (points.length - 1);

  ctx.clearRect(0, 0, w, h);
  
  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(139,92,246,0.3)');
  grad.addColorStop(1, 'rgba(139,92,246,0.0)');

  ctx.beginPath();
  ctx.moveTo(0, h);
  points.forEach((p, i) => {
    const y = h - (p / 80) * (h - 20) - 10;
    ctx.lineTo(i * step, y);
  });
  ctx.lineTo(w, h);
  ctx.fillStyle = grad;
  ctx.fill();

  // Line stroke
  ctx.beginPath();
  points.forEach((p, i) => {
    const y = h - (p / 80) * (h - 20) - 10;
    if (i === 0) ctx.moveTo(0, y);
    else ctx.lineTo(i * step, y);
  });
  ctx.strokeStyle = '#8b5cf6';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function exportData() {
  alert('Exporting SaaS telemetry records to CSV...');
}

window.addEventListener('resize', renderChart);
renderTable();
setTimeout(renderChart, 100);
`;

    return { name, html, css, js };
  },

  // --- ARCHETYPE 4: PROJECT & TASK BOARD ---
  _generateTask(pal, isFr, feat) {
    const name = isFr ? 'Gestion de Projets & Tâches' : 'Project & Task Board';
    const html = `
<div class="task-app">
  <header class="task-head">
    <div>
      <h2 style="color:#fff;margin:0;font-size:1.25rem">${isFr ? 'Tableau des Tâches Projet' : 'Sprint Task Management'}</h2>
      <span style="color:#94a3b8;font-size:0.75rem">${isFr ? 'Organisation agile par colonnes' : 'Agile sprint workflow & backlog tracking'}</span>
    </div>
    <button class="btn-primary" onclick="openTaskModal()">${isFr ? '+ Nouvelle Tâche' : '+ New Task'}</button>
  </header>

  <main class="board-grid">
    <div class="board-col">
      <div class="col-title">${isFr ? 'À Faire' : 'To Do'}</div>
      <div class="task-list" id="col-todo"></div>
    </div>
    <div class="board-col">
      <div class="col-title">${isFr ? 'En Cours' : 'In Progress'}</div>
      <div class="task-list" id="col-prog"></div>
    </div>
    <div class="board-col">
      <div class="col-title">${isFr ? 'Revue & Test' : 'Review'}</div>
      <div class="task-list" id="col-rev"></div>
    </div>
    <div class="board-col">
      <div class="col-title">${isFr ? 'Terminé' : 'Done'}</div>
      <div class="task-list" id="col-done"></div>
    </div>
  </main>
</div>`;

    const css = `
:root {
  --bg: ${pal.bg};
  --card: ${pal.card};
  --accent: ${pal.accent};
  --accent2: ${pal.accent2};
  --text: ${pal.text};
  --border: ${pal.border};
}
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: var(--bg); color: var(--text); padding: 18px; }
.task-app { max-width: 1240px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.task-head { display: flex; justify-content: space-between; align-items: center; background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px 20px; }
.btn-primary { background: linear-gradient(135deg, var(--accent), var(--accent2)); color: #fff; border: none; padding: 9px 18px; border-radius: 8px; font-weight: 700; cursor: pointer; }
.board-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
.board-col { background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; gap: 10px; min-height: 400px; }
.col-title { font-size: 0.85rem; font-weight: 800; color: #cbd5e1; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 8px; }
.task-list { display: flex; flex-direction: column; gap: 10px; }
.t-card { background: var(--card); border: 1px solid var(--border); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 6px; cursor: pointer; }
.t-card:hover { border-color: var(--accent); }
.t-title { font-size: 0.88rem; font-weight: 700; color: #fff; }
.t-badge { font-size: 0.68rem; font-weight: 800; padding: 2px 7px; border-radius: 6px; align-self: flex-start; background: rgba(139,92,246,0.2); color: #c084fc; }
`;

    const js = `
const tasks = [
  { id: '1', title: 'Implement Auth0 JWT Verification', col: 'todo', tag: 'Backend' },
  { id: '2', title: 'Build Dynamic KPI Metrics Grid', col: 'prog', tag: 'Frontend' },
  { id: '3', title: 'E2E Cypress Test Suite Setup', col: 'rev', tag: 'QA' },
  { id: '4', title: 'Deploy Staging Docker Cluster', col: 'done', tag: 'DevOps' }
];

function renderTasks() {
  ['todo', 'prog', 'rev', 'done'].forEach(col => {
    const el = document.getElementById('col-' + col);
    if (!el) return;
    el.innerHTML = tasks.filter(t => t.col === col).map(t => \`
      <div class="t-card" onclick="cycleTask('\${t.id}')" title="Click to move forward">
        <span class="t-badge">\${t.tag}</span>
        <div class="t-title">\${t.title}</div>
      </div>
    \`).join('');
  });
}

function cycleTask(id) {
  const t = tasks.find(x => x.id === id);
  if (!t) return;
  const seq = ['todo', 'prog', 'rev', 'done'];
  t.col = seq[(seq.indexOf(t.col) + 1) % seq.length];
  renderTasks();
}

function openTaskModal() {
  const title = prompt('Enter new task title:');
  if (title) {
    tasks.push({ id: String(Date.now()), title, col: 'todo', tag: 'Feature' });
    renderTasks();
  }
}

renderTasks();
`;

    return { name, html, css, js };
  },

  // --- ARCHETYPE 5: BOOKING & APPOINTMENTS ---
  _generateBooking(pal, isFr, feat) {
    const name = isFr ? 'Réservations & Rendez-vous' : 'Booking & Appointments Hub';
    const html = `
<div class="book-app">
  <header class="book-head">
    <h2 style="color:#fff;margin:0;font-size:1.2rem">${isFr ? 'Planification de Consultations' : 'Executive Consultation Booking'}</h2>
    <span style="color:#94a3b8;font-size:0.75rem">${isFr ? 'Choisissez un service et votre créneau' : 'Select service tier & pick an available slot'}</span>
  </header>
  <div class="book-grid">
    <div class="book-card" onclick="selectService('Strategy Call (30m)', this)">
      <h3>Strategy Call</h3>
      <p style="color:#94a3b8;font-size:0.8rem">30 mins · Rapid architecture alignment</p>
      <div style="font-size:1.3rem;font-weight:800;color:#38bdf8;margin-top:8px">Free / Gratuit</div>
    </div>
    <div class="book-card" onclick="selectService('Deep Architectural Audit (90m)', this)">
      <h3>Deep System Audit</h3>
      <p style="color:#94a3b8;font-size:0.8rem">90 mins · Full stack & security review</p>
      <div style="font-size:1.3rem;font-weight:800;color:#10b981;margin-top:8px">$240.00</div>
    </div>
  </div>
  <div class="slot-box">
    <h4 style="color:#fff;margin-bottom:8px">${isFr ? 'Créneaux Disponibles' : 'Available Time Slots'}</h4>
    <div class="slots-row">
      <button class="slot-btn" onclick="selectSlot('09:30 AM', this)">09:30 AM</button>
      <button class="slot-btn" onclick="selectSlot('11:00 AM', this)">11:00 AM</button>
      <button class="slot-btn" onclick="selectSlot('02:30 PM', this)">02:30 PM</button>
      <button class="slot-btn" onclick="selectSlot('04:00 PM', this)">04:00 PM</button>
    </div>
    <button class="btn-confirm" onclick="confirmBooking()">${isFr ? 'Confirmer la Réservation' : 'Confirm Appointment'}</button>
  </div>
</div>`;

    const css = `
:root { --bg: ${pal.bg}; --card: ${pal.card}; --accent: ${pal.accent}; --border: ${pal.border}; }
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: var(--bg); color: #fff; padding: 18px; }
.book-app { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.book-head { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
.book-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.book-card { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; cursor: pointer; transition: all .2s; }
.book-card.selected, .book-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.slot-box { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; }
.slots-row { display: flex; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
.slot-btn { background: rgba(255,255,255,0.06); border: 1px solid var(--border); color: #fff; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; }
.slot-btn.selected { background: var(--accent); border-color: var(--accent); }
.btn-confirm { background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; cursor: pointer; width: 100%; }
`;

    const js = `
let chosenService = '';
let chosenSlot = '';

function selectService(s, el) {
  chosenService = s;
  document.querySelectorAll('.book-card').forEach(c => c.classList.remove('selected'));
  if (el) el.classList.add('selected');
}

function selectSlot(sl, el) {
  chosenSlot = sl;
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
  if (el) el.classList.add('selected');
}

function confirmBooking() {
  if (!chosenService || !chosenSlot) {
    alert('Please select both a service and a time slot!');
    return;
  }
  alert('🎉 Booking confirmed for ' + chosenService + ' at ' + chosenSlot + '!');
}
`;

    return { name, html, css, js };
  },

  // --- ARCHETYPE 6: PERSONAL FINANCE & BUDGET ---
  _generateFinance(pal, isFr, feat) {
    const name = isFr ? 'Budget & Finances Personnelles' : 'Personal Finance & Budget';
    const html = `
<div class="fin-app">
  <header class="fin-head">
    <h2 style="color:#fff;margin:0;font-size:1.25rem">${isFr ? 'Gestionnaire Financier & Budget' : 'Wealth & Budget Tracker'}</h2>
    <button class="btn-tx" onclick="addTx()">+ ${isFr ? 'Nouvelle Transaction' : 'Add Transaction'}</button>
  </header>
  <section class="fin-kpis">
    <div class="kpi-box"><span class="kpi-lbl">Total Balance</span><div class="kpi-val" id="fin-bal">$24,850</div></div>
    <div class="kpi-box"><span class="kpi-lbl">Income (Mo)</span><div class="kpi-val" style="color:#10b981">+$8,400</div></div>
    <div class="kpi-box"><span class="kpi-lbl">Expenses (Mo)</span><div class="kpi-val" style="color:#f87171">-$3,120</div></div>
  </section>
  <section class="fin-table-box">
    <h3 style="color:#fff;font-size:0.95rem;margin-bottom:10px">Transactions</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.85rem">
      <tbody id="tx-rows"></tbody>
    </table>
  </section>
</div>`;

    const css = `
:root { --bg: ${pal.bg}; --card: ${pal.card}; --accent: ${pal.accent}; --border: ${pal.border}; }
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: var(--bg); color: #fff; padding: 18px; }
.fin-app { max-width: 1000px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px; }
.fin-head { display: flex; justify-content: space-between; align-items: center; background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px 20px; }
.btn-tx { background: linear-gradient(135deg, #10b981, #059669); color: #fff; border: none; padding: 9px 18px; border-radius: 8px; font-weight: 700; cursor: pointer; }
.fin-kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
.kpi-box { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 4px; }
.kpi-lbl { font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
.kpi-val { font-size: 1.6rem; font-weight: 800; color: #fff; }
.fin-table-box { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
`;

    const js = `
const transactions = [
  { desc: 'Consulting Retainer', cat: 'Income', amt: 5200, type: 'in' },
  { desc: 'Office Workspace Rent', cat: 'Overhead', amt: 1200, type: 'out' },
  { desc: 'Cloud Infrastructure AWS', cat: 'Tech', amt: 480, type: 'out' },
  { desc: 'SaaS Design Subscription', cat: 'Software', amt: 79, type: 'out' }
];

function renderTx() {
  const tb = document.getElementById('tx-rows');
  if (!tb) return;
  tb.innerHTML = transactions.map(t => \`
    <tr style="border-bottom:1px solid rgba(255,255,255,0.05)">
      <td style="padding:10px;font-weight:700">\${t.desc}</td>
      <td style="color:#94a3b8;font-size:0.75rem">\${t.cat}</td>
      <td style="padding:10px;text-align:right;font-weight:800;color:\${t.type === 'in' ? '#10b981' : '#f87171'}">\${t.type === 'in' ? '+' : '-'}$\${t.amt}</td>
    </tr>
  \`).join('');
}

function addTx() {
  const desc = prompt('Transaction description:');
  const amt = Number(prompt('Amount ($):'));
  if (desc && amt) {
    transactions.unshift({ desc, cat: 'Custom', amt, type: 'out' });
    renderTx();
  }
}

renderTx();
`;

    return { name, html, css, js };
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 2. ULTRA VISUAL INSPECTOR — WYSIWYG CLICK-TO-EDIT ON LIVE PREVIEW
// ══════════════════════════════════════════════════════════════════════════════
const UltraVisualInspector = {
  active: false,
  selectedEl: null,
  colorTouched: false,
  bgTouched: false,
  textTouched: false,
  _listenersAttached: false,

  toggle() {
    this.active = !this.active;
    const btn = document.getElementById('btn-visual-inspect');
    const tbBtn = document.getElementById('tb-btn-visual-inspect');
    const banner = document.getElementById('insp-active-banner');
    if (btn) btn.classList.toggle('active-tool', this.active);
    if (tbBtn) tbBtn.classList.toggle('active', this.active);
    if (banner) banner.style.display = this.active ? 'block' : 'none';

    if (this.active) {
      if (typeof showToast === 'function') {
        showToast(_t('inspActiveNotice', 'Click any element in the preview to edit visually.'), 'info');
      }
      this.attachIframeListeners();
    } else {
      this.detachIframeListeners();
      this.hidePopover();
      if (typeof showToast === 'function') {
        showToast('Visual Inspector deactivated', 'info');
      }
    }
  },

  getIframeDoc() {
    const frame = document.getElementById('preview-frame');
    if (!frame) return null;
    try {
      return frame.contentDocument || (frame.contentWindow ? frame.contentWindow.document : null);
    } catch(e) {
      return null;
    }
  },

  attachIframeListeners() {
    const doc = this.getIframeDoc();
    if (!doc) return;

    if (!doc.getElementById('_ultra-inspector-style')) {
      const st = doc.createElement('style');
      st.id = '_ultra-inspector-style';
      st.textContent = `
        ._insp-hover { outline: 2px dashed #38bdf8 !important; outline-offset: 2px !important; cursor: pointer !important; }
        ._insp-selected { outline: 3px solid #8b5cf6 !important; outline-offset: 3px !important; }
        ._insp-editing { outline: 3px solid #a855f7 !important; outline-offset: 3px !important; background: rgba(168,85,247,0.15) !important; border-radius: 4px; caret-color: #a855f7; }
      `;
      doc.head.appendChild(st);
    }

    const ignoredTags = ['HTML', 'BODY', 'HEAD', 'SCRIPT', 'STYLE', 'LINK', 'META', 'IFRAME'];

    doc._inspOver = (e) => {
      if (!this.active) return;
      doc.querySelectorAll('._insp-hover').forEach(el => el.classList.remove('_insp-hover'));
      if (e.target && !ignoredTags.includes(e.target.tagName)) {
        e.target.classList.add('_insp-hover');
      }
    };

    doc._inspOut = (e) => {
      if (e.target) e.target.classList.remove('_insp-hover');
    };

    doc._inspClick = (e) => {
      if (!this.active) return;
      let target = e.target;
      if (!target || ignoredTags.includes(target.tagName)) return;
      e.preventDefault();
      e.stopPropagation();
      this.selectElement(target);
    };

    doc._inspDblClick = (e) => {
      if (!this.active) return;
      let target = e.target;
      if (!target || ignoredTags.includes(target.tagName)) return;
      e.preventDefault();
      e.stopPropagation();
      this.startInlineEdit(target);
    };

    doc.addEventListener('mouseover', doc._inspOver, true);
    doc.addEventListener('mouseout', doc._inspOut, true);
    doc.addEventListener('click', doc._inspClick, true);
    doc.addEventListener('dblclick', doc._inspDblClick, true);

    this.setupPopoverListeners();
  },

  detachIframeListeners() {
    const doc = this.getIframeDoc();
    if (!doc) return;
    if (doc._inspOver) doc.removeEventListener('mouseover', doc._inspOver, true);
    if (doc._inspOut) doc.removeEventListener('mouseout', doc._inspOut, true);
    if (doc._inspClick) doc.removeEventListener('click', doc._inspClick, true);
    if (doc._inspDblClick) doc.removeEventListener('dblclick', doc._inspDblClick, true);
    doc.querySelectorAll('._insp-hover, ._insp-selected, ._insp-editing').forEach(el => {
      el.classList.remove('_insp-hover', '_insp-selected', '_insp-editing');
      el.contentEditable = 'false';
    });
  },

  startInlineEdit(el) {
    if (!el) return;
    const isTextEl = el.children.length === 0 || ['H1','H2','H3','H4','H5','H6','P','SPAN','BUTTON','A','LABEL','LI','B','STRONG','I','EM','SMALL','TD','TH'].includes(el.tagName);
    if (!isTextEl) return;

    this.selectElement(el);
    el.contentEditable = 'true';
    el.classList.add('_insp-editing');
    el.focus();

    const doc = this.getIframeDoc();
    const win = (doc && doc.defaultView) ? doc.defaultView : window;
    try {
      const range = doc.createRange();
      range.selectNodeContents(el);
      const sel = win.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } catch(err){}

    const onFinish = () => {
      el.contentEditable = 'false';
      el.classList.remove('_insp-editing');
      el.removeEventListener('blur', onFinish);
      el.removeEventListener('keydown', onKeyDown);
      this.syncToCode();
      if (typeof showToast === 'function') {
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
        showToast(isFr ? '✏️ Texte modifié en direct !' : '✏️ Text updated live on canvas!', 'success');
      }
    };

    const onKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        el.blur();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        el.blur();
      }
    };

    el.addEventListener('blur', onFinish);
    el.addEventListener('keydown', onKeyDown);
  },

  selectElement(el) {
    if (!el) return;
    const doc = this.getIframeDoc();
    if (doc) doc.querySelectorAll('._insp-selected').forEach(x => x.classList.remove('_insp-selected'));
    el.classList.add('_insp-selected');
    this.selectedEl = el;
    this.showPopover(el);
  },

  showPopover(el) {
    const popover = document.getElementById('ultra-inspector-popover');
    if (!popover) return;

    this.colorTouched = false;
    this.bgTouched = false;
    this.textTouched = false;

    const tag = el.tagName.toLowerCase();
    const tagBadge = document.getElementById('insp-tag-badge');
    if (tagBadge) {
      const cls = (typeof el.className === 'string' && el.className)
        ? '.' + el.className.split(' ').filter(c => !c.startsWith('_insp')).join('.')
        : '';
      tagBadge.textContent = `<${tag}>${cls}`;
    }

    const doc = this.getIframeDoc();
    const win = (doc && doc.defaultView) ? doc.defaultView : window;
    const comp = win.getComputedStyle(el);

    // Text Content
    const txtInp = document.getElementById('insp-txt');
    const isTextEl = el.children.length === 0 || ['H1','H2','H3','H4','H5','H6','P','SPAN','BUTTON','A','LABEL','LI','B','STRONG','I','EM','SMALL','TD','TH'].includes(el.tagName);

    if (txtInp) {
      if (isTextEl) {
        txtInp.disabled = false;
        txtInp.value = el.textContent ? el.textContent.trim() : '';
        txtInp.placeholder = 'Type to edit text...';
      } else {
        txtInp.disabled = true;
        txtInp.value = '';
        txtInp.placeholder = 'Container element. Click directly on headline or text to edit wording.';
      }
    }

    // Text Color
    const colorInp = document.getElementById('insp-color');
    const colorHex = document.getElementById('insp-color-hex');
    const curColor = this.rgbToHex(comp.color, '#ffffff');
    if (colorInp) colorInp.value = curColor;
    if (colorHex) colorHex.value = curColor;

    // Background Color
    const bgInp = document.getElementById('insp-bg');
    const isTransparent = (!comp.backgroundColor || comp.backgroundColor === 'transparent' || comp.backgroundColor === 'rgba(0, 0, 0, 0)');
    if (bgInp) {
      bgInp.value = isTransparent ? '#1e293b' : this.rgbToHex(comp.backgroundColor, '#1e293b');
    }

    popover.style.display = 'flex';
  },

  setupPopoverListeners() {
    if (this._listenersAttached) return;
    this._listenersAttached = true;

    const txtInp = document.getElementById('insp-txt');
    if (txtInp) {
      txtInp.addEventListener('input', () => {
        if (!this.selectedEl || txtInp.disabled) return;
        this.textTouched = true;
        if (this.selectedEl.children.length === 0) {
          this.selectedEl.textContent = txtInp.value;
        } else {
          this.selectedEl.innerText = txtInp.value;
        }
      });
    }

    const colorInp = document.getElementById('insp-color');
    const colorHex = document.getElementById('insp-color-hex');
    if (colorInp) {
      colorInp.addEventListener('input', (e) => {
        if (!this.selectedEl) return;
        this.colorTouched = true;
        this.selectedEl.style.color = e.target.value;
        if (colorHex) colorHex.value = e.target.value;
      });
    }
    if (colorHex) {
      colorHex.addEventListener('input', (e) => {
        if (!this.selectedEl) return;
        const val = e.target.value.trim();
        if (/^#[0-9A-F]{6}$/i.test(val)) {
          this.colorTouched = true;
          this.selectedEl.style.color = val;
          if (colorInp) colorInp.value = val;
        }
      });
    }

    const bgInp = document.getElementById('insp-bg');
    if (bgInp) {
      bgInp.addEventListener('input', (e) => {
        if (!this.selectedEl) return;
        this.bgTouched = true;
        this.selectedEl.style.backgroundColor = e.target.value;
      });
    }
  },

  resetBg() {
    if (!this.selectedEl) return;
    this.bgTouched = true;
    this.selectedEl.style.backgroundColor = 'transparent';
    const bgInp = document.getElementById('insp-bg');
    if (bgInp) bgInp.value = '#1e293b';
    if (typeof showToast === 'function') {
      showToast('Background set to transparent', 'info');
    }
  },

  hidePopover() {
    const popover = document.getElementById('ultra-inspector-popover');
    if (popover) popover.style.display = 'none';
  },

  rgbToHex(rgb, fallback = '#ffffff') {
    if (!rgb || rgb === 'transparent' || rgb.indexOf('rgb') === -1) return fallback;
    const rgbValues = rgb.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) return fallback;
    if (rgbValues.length >= 4 && Number(rgbValues[3]) === 0) return fallback;
    return '#' + ((1 << 24) + (Number(rgbValues[0]) << 16) + (Number(rgbValues[1]) << 8) + Number(rgbValues[2])).toString(16).slice(1);
  },

  applyLiveEdit() {
    if (!this.selectedEl) return;

    const txtInp = document.getElementById('insp-txt');
    if (this.textTouched && txtInp && !txtInp.disabled) {
      if (this.selectedEl.children.length === 0) {
        this.selectedEl.textContent = txtInp.value;
      } else {
        this.selectedEl.innerText = txtInp.value;
      }
    }

    const colorInp = document.getElementById('insp-color');
    if (this.colorTouched && colorInp) {
      this.selectedEl.style.color = colorInp.value;
    }

    // ONLY APPLY BACKGROUND IF EXPLICITLY TOUCHED!
    const bgInp = document.getElementById('insp-bg');
    if (this.bgTouched && bgInp) {
      this.selectedEl.style.backgroundColor = bgInp.value;
    }

    // Sync to Studio Code
    this.syncToCode();

    if (typeof showToast === 'function') {
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      showToast(isFr ? '✓ Modifications appliquées & synchronisées !' : '✓ Changes applied & synced to code!', 'success');
    }
  },

  duplicateElement() {
    if (!this.selectedEl || !this.selectedEl.parentNode) return;
    const clone = this.selectedEl.cloneNode(true);
    clone.classList.remove('_insp-selected', '_insp-hover');
    this.selectedEl.parentNode.insertBefore(clone, this.selectedEl.nextSibling);
    this.syncToCode();
    if (typeof showToast === 'function') {
      showToast('Element duplicated', 'info');
    }
  },

  deleteElement() {
    if (!this.selectedEl || !this.selectedEl.parentNode) return;
    this.selectedEl.parentNode.removeChild(this.selectedEl);
    this.selectedEl = null;
    this.hidePopover();
    this.syncToCode();
    if (typeof showToast === 'function') {
      showToast('Element removed', 'info');
    }
  },

  syncToCode() {
    const doc = this.getIframeDoc();
    if (!doc || !window.APP) return;

    const cloneBody = doc.body.cloneNode(true);
    // Remove inspector hover & selection outlines and editing attributes
    cloneBody.querySelectorAll('._insp-hover, ._insp-selected, ._insp-editing').forEach(x => {
      x.classList.remove('_insp-hover', '_insp-selected', '_insp-editing');
      x.removeAttribute('contenteditable');
      if (x.getAttribute('class') === '') x.removeAttribute('class');
    });
    // Strip injected runtime scripts and dialog overlays
    cloneBody.querySelectorAll('script, ._dlg-ov, #_ultra-inspector-style').forEach(el => el.remove());

    const cleanHtml = cloneBody.innerHTML.trim();
    APP.html = cleanHtml;
    if (APP.currentTab === 'html' && APP.editor) {
      APP.editor.setValue(cleanHtml);
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 3. ULTRA SCREEN MANAGER — MULTI-SCREEN NAVIGATION
// ══════════════════════════════════════════════════════════════════════════════
const UltraScreenManager = {
  screens: ['Home', 'Dashboard', 'Settings'],
  activeScreen: 'Home',

  getStarterMultiScreenApp(isFr) {
    const name = isFr ? 'Application Multi-Écrans Pro' : 'Pro Multi-Screen Application';
    const html = `
<div class="multi-app-root">
  <!-- Global Top Header -->
  <header class="app-global-header">
    <div class="brand">
      <span class="logo-icon">⚡</span>
      <div>
        <h2 style="margin:0;font-size:1.15rem;color:#fff">${isFr ? 'Plateforme Multi-Écrans Ultra' : 'Ultra Multi-Screen Platform'}</h2>
        <span style="font-size:0.75rem;color:#94a3b8">${isFr ? '3 Vues Distinctes : Accueil, Dashboard, Paramètres' : '3 Distinct Screens: Home, Dashboard, Settings'}</span>
      </div>
    </div>
    <nav class="in-app-nav">
      <button class="nav-link active" onclick="switchInAppScreen('home', this)">${isFr ? '🏠 Accueil' : '🏠 Home'}</button>
      <button class="nav-link" onclick="switchInAppScreen('dashboard', this)">${isFr ? '📊 Dashboard' : '📊 Dashboard'}</button>
      <button class="nav-link" onclick="switchInAppScreen('settings', this)">${isFr ? '⚙️ Paramètres' : '⚙️ Settings'}</button>
    </nav>
  </header>

  <!-- SCREEN 1: HOME -->
  <div data-screen="home" class="screen-view active-view">
    <section class="hero-welcome">
      <span class="badge-pill">SCREEN 1 / ÉCRAN 1</span>
      <h1 style="color:#fff;font-size:2.2rem;margin:12px 0 8px 0">${isFr ? 'Bienvenue sur l\'Écran d\'Accueil' : 'Welcome to the Home Screen'}</h1>
      <p style="color:#94a3b8;font-size:0.95rem;max-width:560px;margin:0 auto 20px auto">${isFr ? 'Cet écran présente la vitrine principale, vos services ou vos opérations quotidiennes.' : 'This view represents your core operations, catalog, or primary workflow.'}</p>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="btn-cta" onclick="switchInAppScreen('dashboard')">${isFr ? 'Voir le Dashboard →' : 'View Dashboard →'}</button>
        <button class="btn-sub" onclick="switchInAppScreen('settings')">${isFr ? 'Ouvrir les Paramètres' : 'Open Settings'}</button>
      </div>
    </section>

    <div class="home-cards-grid">
      <div class="card-item">
        <div class="card-ico">🚀</div>
        <h3>${isFr ? 'Architecture Modulaire' : 'Modular Architecture'}</h3>
        <p>${isFr ? 'Naviguez facilement d\'un écran à l\'autre sans rechargement de page.' : 'Easily switch between different screens with instant reactive views.'}</p>
      </div>
      <div class="card-item">
        <div class="card-ico">🎨</div>
        <h3>${isFr ? 'Édition Visuelle WYSIWYG' : 'WYSIWYG Visual Edit'}</h3>
        <p>${isFr ? 'Utilisez le bouton Visual Edit pour modifier les textes ou les couleurs directement.' : 'Use the Visual Edit inspector to customize any headline or color live.'}</p>
      </div>
      <div class="card-item">
        <div class="card-ico">💾</div>
        <h3>${isFr ? 'Base de Données Intégrée' : 'Built-in Local DB'}</h3>
        <p>${isFr ? 'Toutes vos données restent synchronisées et persistées dans votre navigateur.' : 'All records are synced and safely persisted directly in LocalStorage.'}</p>
      </div>
    </div>
  </div>

  <!-- SCREEN 2: DASHBOARD -->
  <div data-screen="dashboard" class="screen-view" style="display:none">
    <div class="screen-title-row">
      <div>
        <span class="badge-pill" style="background:rgba(56,189,248,0.15);color:#38bdf8">SCREEN 2 / ÉCRAN 2</span>
        <h2 style="color:#fff;font-size:1.6rem;margin:8px 0 4px 0">${isFr ? 'Tableau de Bord & Analytiques' : 'Analytics & Operations Dashboard'}</h2>
        <p style="color:#94a3b8;font-size:0.85rem;margin:0">${isFr ? 'Métriques temps réel, télémétrie et indicateurs de performance' : 'Live performance indicators, growth metrics and telemetry stream'}</p>
      </div>
      <button class="btn-cta" onclick="refreshChart()">${isFr ? 'Actualiser les Données' : 'Refresh Metrics'}</button>
    </div>

    <div class="stats-row">
      <div class="stat-card">
        <span class="stat-lbl">Active Users</span>
        <div class="stat-val">12,480</div>
        <span class="stat-growth positive">▲ +18.4%</span>
      </div>
      <div class="stat-card">
        <span class="stat-lbl">Monthly Revenue</span>
        <div class="stat-val">$64,250</div>
        <span class="stat-growth positive">▲ +$8,120</span>
      </div>
      <div class="stat-card">
        <span class="stat-lbl">System Uptime</span>
        <div class="stat-val">99.98%</div>
        <span class="stat-growth">● Operational</span>
      </div>
      <div class="stat-card">
        <span class="stat-lbl">Conversion Rate</span>
        <div class="stat-val">4.62%</div>
        <span class="stat-growth positive">▲ +0.5%</span>
      </div>
    </div>

    <div class="chart-container-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h4 style="color:#fff;margin:0">${isFr ? 'Trajectoire de Croissance Hebdomadaire' : 'Weekly Growth Trajectory'}</h4>
        <span style="color:#38bdf8;font-size:0.75rem;font-weight:700">● Live Canvas 2D</span>
      </div>
      <canvas id="multi-app-chart" height="120" style="width:100%;background:#080e1c;border-radius:10px"></canvas>
    </div>
  </div>

  <!-- SCREEN 3: SETTINGS -->
  <div data-screen="settings" class="screen-view" style="display:none">
    <div class="screen-title-row">
      <div>
        <span class="badge-pill" style="background:rgba(245,158,11,0.15);color:#fbbf24">SCREEN 3 / ÉCRAN 3</span>
        <h2 style="color:#fff;font-size:1.6rem;margin:8px 0 4px 0">${isFr ? 'Paramètres & Configuration' : 'Application Settings & Environment'}</h2>
        <p style="color:#94a3b8;font-size:0.85rem;margin:0">${isFr ? 'Personnalisez votre espace de travail et vos préférences' : 'Manage application preferences, environment variables and profile'}</p>
      </div>
    </div>

    <div class="settings-box">
      <div class="setting-item">
        <div>
          <strong style="color:#fff;font-size:0.9rem">${isFr ? 'Nom de l\'Organisation' : 'Workspace Name'}</strong>
          <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">${isFr ? 'Identifiant affiché sur tous vos rapports' : 'Displayed across generated invoices and reports'}</p>
        </div>
        <input type="text" value="Apex Global Corp" class="settings-inp" />
      </div>

      <div class="setting-item">
        <div>
          <strong style="color:#fff;font-size:0.9rem">${isFr ? 'Devise Principale' : 'Default Currency'}</strong>
          <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">${isFr ? 'Format monétaire par défaut' : 'Formatting for prices and pipeline deals'}</p>
        </div>
        <select class="settings-inp">
          <option>USD ($)</option>
          <option>EUR (€)</option>
          <option>GBP (£)</option>
        </select>
      </div>

      <div class="setting-item">
        <div>
          <strong style="color:#fff;font-size:0.9rem">${isFr ? 'Notifications & Alertes' : 'Live Notifications'}</strong>
          <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">${isFr ? 'Recevoir des alertes toast lors d\'événements' : 'Receive instant toasts on system changes'}</p>
        </div>
        <input type="checkbox" checked style="width:20px;height:20px;accent-color:#8b5cf6" />
      </div>

      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px">
        <button class="btn-sub" onclick="alert('Settings reset to defaults')">${isFr ? 'Réinitialiser' : 'Reset'}</button>
        <button class="btn-cta" onclick="alert('Settings saved successfully!')">${isFr ? 'Enregistrer les Modifications' : 'Save Changes'}</button>
      </div>
    </div>
  </div>
</div>`;

    const css = `
* { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Inter', system-ui, sans-serif; }
body { background: #070b16; color: #f1f5f9; padding: 18px; }
.multi-app-root { max-width: 1200px; margin: 0 auto; display: flex; flex-direction: column; gap: 18px; }
.app-global-header { display: flex; justify-content: space-between; align-items: center; background: #0d152b; border: 1px solid rgba(139,92,246,0.3); border-radius: 14px; padding: 14px 20px; flex-wrap: wrap; gap: 12px; }
.brand { display: flex; align-items: center; gap: 12px; }
.logo-icon { font-size: 1.8rem; background: linear-gradient(135deg,#8b5cf6,#06b6d4); border-radius: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
.in-app-nav { display: flex; gap: 6px; }
.nav-link { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #94a3b8; padding: 6px 14px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; cursor: pointer; transition: all .15s; }
.nav-link.active, .nav-link:hover { background: #8b5cf6; border-color: #8b5cf6; color: #fff; }
.screen-view { animation: fadeIn .2s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.badge-pill { font-size: 0.68rem; font-weight: 800; padding: 3px 9px; border-radius: 20px; background: rgba(139,92,246,0.2); color: #c084fc; letter-spacing: 0.5px; }
.hero-welcome { text-align: center; padding: 46px 20px; background: linear-gradient(180deg, rgba(139,92,246,0.12), transparent); border: 1px solid rgba(139,92,246,0.25); border-radius: 16px; margin-bottom: 18px; }
.btn-cta { background: linear-gradient(135deg, #8b5cf6, #06b6d4); color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; font-size: 0.84rem; cursor: pointer; }
.btn-sub { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.15); color: #fff; padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.84rem; cursor: pointer; }
.home-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
.card-item { background: #0c1428; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; display: flex; flex-direction: column; gap: 8px; }
.card-ico { font-size: 1.8rem; }
.card-item h3 { color: #fff; font-size: 1rem; margin: 0; }
.card-item p { color: #94a3b8; font-size: 0.82rem; line-height: 1.5; margin: 0; }
.screen-title-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 10px; }
.stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-bottom: 18px; }
.stat-card { background: #0c1428; border: 1px solid rgba(139,92,246,0.25); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 4px; }
.stat-lbl { font-size: 0.72rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
.stat-val { font-size: 1.7rem; font-weight: 900; color: #fff; }
.stat-growth { font-size: 0.72rem; font-weight: 700; color: #94a3b8; }
.stat-growth.positive { color: #10b981; }
.chart-container-card { background: #0c1428; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 18px; }
.settings-box { background: #0c1428; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 22px; display: flex; flex-direction: column; gap: 16px; }
.setting-item { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; border-bottom: 1px solid rgba(255,255,255,0.05); gap: 14px; flex-wrap: wrap; }
.settings-inp { background: rgba(255,255,255,0.06); border: 1px solid rgba(139,92,246,0.3); border-radius: 8px; color: #fff; padding: 8px 12px; font-size: 0.85rem; outline: none; }
`;

    const js = `
function switchInAppScreen(targetName, btn) {
  document.querySelectorAll('[data-screen]').forEach(el => {
    el.style.display = (el.getAttribute('data-screen') === targetName) ? 'block' : 'none';
  });
  document.querySelectorAll('.nav-link').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  
  // Inform parent studio
  if (window.parent && window.parent.UltraScreenManager) {
    window.parent.UltraScreenManager.activeScreen = targetName.charAt(0).toUpperCase() + targetName.slice(1);
    window.parent.UltraScreenManager.scanAndRender();
  }
  if (targetName === 'dashboard') {
    setTimeout(renderChart, 60);
  }
}

function renderChart() {
  const canvas = document.getElementById('multi-app-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const w = canvas.width = canvas.offsetWidth || 500;
  const h = canvas.height = 120;
  ctx.clearRect(0, 0, w, h);
  const pts = [20, 35, 45, 40, 60, 55, 75, 85, 95];
  const step = w / (pts.length - 1);
  
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(56,189,248,0.3)');
  grad.addColorStop(1, 'rgba(56,189,248,0.0)');
  ctx.beginPath();
  ctx.moveTo(0, h);
  pts.forEach((p, i) => ctx.lineTo(i * step, h - (p / 100) * (h - 20) - 10));
  ctx.lineTo(w, h);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  pts.forEach((p, i) => {
    const y = h - (p / 100) * (h - 20) - 10;
    if (i === 0) ctx.moveTo(0, y);
    else ctx.lineTo(i * step, y);
  });
  ctx.strokeStyle = '#38bdf8';
  ctx.lineWidth = 3;
  ctx.stroke();
}

function refreshChart() {
  renderChart();
  alert('Metrics refreshed with live stream!');
}

setTimeout(renderChart, 150);
`;
    return { name, html, css, js };
  },

  toggleBar() {
    const bar = document.getElementById('ultra-screen-bar');
    const btn = document.getElementById('btn-screens');
    const tbBtn = document.getElementById('tb-btn-screens');
    if (!bar) return;
    const isVisible = bar.style.display === 'flex';
    bar.style.display = isVisible ? 'none' : 'flex';
    if (btn) btn.classList.toggle('active-tool', !isVisible);
    if (tbBtn) tbBtn.classList.toggle('active', !isVisible);
    if (!isVisible) this.scanAndRender();
  },

  scanAndRender() {
    const bar = document.getElementById('ultra-screen-bar');
    if (!bar) return;

    // If active document has custom screens, scan them dynamically
    const doc = UltraVisualInspector.getIframeDoc();
    if (doc) {
      const foundScreens = [];
      doc.querySelectorAll('[data-screen]').forEach(el => {
        const sc = el.getAttribute('data-screen');
        if (sc) {
          const cap = sc.charAt(0).toUpperCase() + sc.slice(1);
          if (!foundScreens.includes(cap)) foundScreens.push(cap);
        }
      });
      if (foundScreens.length > 0) {
        this.screens = Array.from(new Set([...foundScreens, 'Settings']));
      }
    }

    bar.innerHTML = this.screens.map((sc, idx) => {
      const icon = sc.toLowerCase().includes('home') ? '🏠' : (sc.toLowerCase().includes('dash') ? '📊' : (sc.toLowerCase().includes('setting') ? '⚙️' : '📱'));
      return `<button class="screen-tab ${sc === this.activeScreen ? 'active' : ''}" onclick="UltraScreenManager.switchScreen('${sc}')">
        <span>${icon}</span>
        <span>${sc}</span>
      </button>`;
    }).join('') + `
      <button class="screen-btn-add" onclick="UltraScreenManager.promptNewScreen()">+ ${_t('screenAdd', 'Add Screen')}</button>
    `;
  },

  switchScreen(screenName) {
    this.activeScreen = screenName;
    this.scanAndRender();

    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    const hasCode = window.APP && (APP.html || APP.css || APP.js || APP.full);

    // If editor is currently empty (as in initial studio state), auto-load the multi-screen starter app!
    if (!hasCode) {
      if (typeof showToast === 'function') {
        showToast(isFr ? `⚡ Chargement de l'App Multi-Écrans (${screenName})...` : `⚡ Loading Multi-Screen App (${screenName})...`, 'info');
      }
      const demo = this.getStarterMultiScreenApp(isFr);
      if (typeof loadAppIntoStudio === 'function') {
        loadAppIntoStudio(demo, false);
      }
      setTimeout(() => {
        this._toggleIframeScreens(screenName);
      }, 350);
      return;
    }

    this._toggleIframeScreens(screenName);
  },

  _toggleIframeScreens(screenName) {
    const doc = UltraVisualInspector.getIframeDoc();
    if (!doc) return;

    const screenEls = doc.querySelectorAll('[data-screen]');
    const target = screenName.toLowerCase();

    if (screenEls.length > 0) {
      let found = false;
      screenEls.forEach(el => {
        const match = el.getAttribute('data-screen').toLowerCase() === target;
        el.style.display = match ? 'block' : 'none';
        if (match) found = true;
      });
      if (found) {
        if (typeof showToast === 'function') {
          showToast(`📱 ${screenName}`, 'info');
        }
        return;
      }
    }

    // If the app doesn't have this screen container, auto-generate it seamlessly!
    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    if (window.APP && (APP.html || APP.full)) {
      this.autoWrapAndAddScreen(screenName, isFr);
      return;
    }

    if (typeof showToast === 'function') {
      showToast(
        isFr 
          ? `ℹ️ Vue [${screenName}]. Cliquez sur [+ Add Screen] pour insérer cet écran dans le code!`
          : `ℹ️ View [${screenName}]. Click [+ Add Screen] to inject this screen into code!`,
        'info'
      );
    }
  },

  autoWrapAndAddScreen(screenName, isFr) {
    if (!window.APP) return;
    const clean = screenName.trim();
    const slug = clean.toLowerCase().replace(/\s+/g, '-');
    
    let html = APP.html || '';
    // Wrap existing content as 'home' if no data-screen exists yet
    if (!html.includes('data-screen=')) {
      html = `<div data-screen="home" class="screen-view" style="${slug === 'home' ? 'display:block' : 'display:none'}">\n` + html + `\n</div>`;
      if (!this.screens.includes('Home')) this.screens.unshift('Home');
    }

    if (slug === 'home') {
      APP.html = html;
      if (APP.editor && APP.currentTab === 'html') APP.editor.setValue(APP.html);
      if (typeof refreshPreview === 'function') refreshPreview();
      return;
    }

    let newScreenContent = '';
    if (slug === 'dashboard') {
      newScreenContent = `
<!-- Screen: Dashboard -->
<div data-screen="dashboard" class="screen-view" style="display:block;padding:24px;background:#090d1a;color:#fff;min-height:100vh;font-family:system-ui,sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;background:rgba(255,255,255,0.05);padding:16px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.1)">
    <div>
      <span style="font-size:0.7rem;font-weight:800;color:#38bdf8;text-transform:uppercase;letter-spacing:1px">SCREEN / ÉCRAN 2</span>
      <h2 style="margin:4px 0 0 0;font-size:1.4rem">📊 ${isFr ? 'Tableau de Bord & Analytiques' : 'Analytics & Telemetry Dashboard'}</h2>
    </div>
    <button onclick="window.parent.UltraScreenManager.switchScreen('Home')" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:700">← ${isFr ? 'Retour Accueil' : 'Back Home'}</button>
  </div>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:14px;margin-bottom:20px">
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:16px;border-radius:12px">
      <div style="font-size:0.75rem;color:#94a3b8;font-weight:700">ACTIVE USERS</div>
      <div style="font-size:1.6rem;font-weight:900;color:#fff;margin:4px 0">8,420</div>
      <div style="font-size:0.75rem;color:#10b981;font-weight:700">▲ +12.4% this week</div>
    </div>
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:16px;border-radius:12px">
      <div style="font-size:0.75rem;color:#94a3b8;font-weight:700">REVENUE</div>
      <div style="font-size:1.6rem;font-weight:900;color:#38bdf8;margin:4px 0">$34,800</div>
      <div style="font-size:0.75rem;color:#10b981;font-weight:700">▲ +$4,200</div>
    </div>
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:16px;border-radius:12px">
      <div style="font-size:0.75rem;color:#94a3b8;font-weight:700">PERFORMANCE</div>
      <div style="font-size:1.6rem;font-weight:900;color:#a855f7;margin:4px 0">99.9%</div>
      <div style="font-size:0.75rem;color:#94a3b8;font-weight:700">● Optimal</div>
    </div>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:20px;border-radius:12px">
    <h4 style="margin:0 0 12px 0;color:#fff">${isFr ? 'Statut du Flux Temps Réel' : 'Live Activity & Event Stream'}</h4>
    <p style="color:#94a3b8;font-size:0.85rem;line-height:1.6;margin:0">${isFr ? 'Toutes les métriques de votre application sont connectées et visualisées ici.' : 'All real-time application metrics, user actions and event flows are monitored in this view.'}</p>
  </div>
</div>`;
    } else if (slug === 'settings') {
      newScreenContent = `
<!-- Screen: Settings -->
<div data-screen="settings" class="screen-view" style="display:block;padding:24px;background:#090d1a;color:#fff;min-height:100vh;font-family:system-ui,sans-serif">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;background:rgba(255,255,255,0.05);padding:16px 20px;border-radius:12px;border:1px solid rgba(255,255,255,0.1)">
    <div>
      <span style="font-size:0.7rem;font-weight:800;color:#f59e0b;text-transform:uppercase;letter-spacing:1px">SCREEN / ÉCRAN 3</span>
      <h2 style="margin:4px 0 0 0;font-size:1.4rem">⚙️ ${isFr ? 'Paramètres & Configuration' : 'Application Settings & Config'}</h2>
    </div>
    <button onclick="window.parent.UltraScreenManager.switchScreen('Home')" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:8px 16px;border-radius:8px;cursor:pointer;font-weight:700">← ${isFr ? 'Retour Accueil' : 'Back Home'}</button>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:22px;border-radius:12px;display:flex;flex-direction:column;gap:16px;max-width:680px">
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:14px">
      <div>
        <strong style="font-size:0.9rem">${isFr ? 'Nom de l\'application' : 'Application Name'}</strong>
        <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">${isFr ? 'Titre public de votre projet' : 'Public title for your project'}</p>
      </div>
      <input type="text" value="Studio App" style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);border-radius:8px;color:#fff;padding:6px 12px;outline:none" />
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:14px">
      <div>
        <strong style="font-size:0.9rem">${isFr ? 'Notifications' : 'Notifications'}</strong>
        <p style="color:#94a3b8;font-size:0.75rem;margin:2px 0 0 0">${isFr ? 'Activer les alertes système' : 'Enable system alerts'}</p>
      </div>
      <input type="checkbox" checked style="width:20px;height:20px;accent-color:#8b5cf6" />
    </div>
    <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:10px">
      <button onclick="alert('Settings saved!')" style="background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;border:none;padding:8px 18px;border-radius:8px;font-weight:700;cursor:pointer">${isFr ? 'Enregistrer' : 'Save Changes'}</button>
    </div>
  </div>
</div>`;
    }

    if (newScreenContent && !html.includes(`data-screen="${slug}"`)) {
      html += '\n' + newScreenContent;
    }

    APP.html = html;
    if (APP.editor && APP.currentTab === 'html') {
      APP.editor.setValue(APP.html);
    }
    if (typeof refreshPreview === 'function') refreshPreview();
    if (!this.screens.includes(clean)) this.screens.push(clean);
    this.scanAndRender();

    setTimeout(() => {
      this._toggleIframeScreens(clean);
    }, 250);

    if (typeof showToast === 'function') {
      showToast(isFr ? `✨ Écran [${clean}] créé et affiché !` : `✨ Screen [${clean}] created & switched!`, 'success');
    }
  },

  promptNewScreen() {
    const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
    const name = prompt(isFr ? 'Entrez le nom du nouvel écran :' : 'Enter name for new screen:');
    if (!name) return;
    const clean = name.trim();
    const slug = clean.toLowerCase().replace(/\s+/g, '-');
    if (!this.screens.includes(clean)) {
      this.screens.push(clean);
    }

    // Inject screen into APP.html
    const newScreenHtml = `
<!-- Screen: ${clean} -->
<div data-screen="${slug}" class="screen-view" style="display:none;padding:24px">
  <div style="display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);padding:14px 20px;border-radius:12px;margin-bottom:18px">
    <h2 style="color:#fff;margin:0;font-size:1.25rem">📱 ${clean} Screen</h2>
    <button onclick="window.parent.UltraScreenManager.switchScreen('Home')" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.2);color:#fff;padding:6px 14px;border-radius:8px;cursor:pointer;font-weight:700">← ${isFr ? 'Retour Accueil' : 'Back Home'}</button>
  </div>
  <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:24px">
    <h3 style="color:#38bdf8;margin-top:0">✨ ${clean}</h3>
    <p style="color:#94a3b8;line-height:1.6">${isFr ? 'Cet écran est maintenant créé et intégré ! Utilisez l\'Inspecteur Visuel pour ajouter des éléments.' : 'This screen is now created and integrated! Use Visual Edit to customize it.'}</p>
  </div>
</div>`;

    if (window.APP) {
      APP.html = (APP.html || '') + '\n' + newScreenHtml;
      if (APP.editor && APP.currentTab === 'html') {
        APP.editor.setValue(APP.html);
      }
      if (typeof refreshPreview === 'function') refreshPreview();
    }

    setTimeout(() => {
      this.switchScreen(clean);
    }, 250);
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 4. ULTRA DATA ENGINE — VISUAL DATABASE & LOCALSTORAGE SPREADSHEET
// ══════════════════════════════════════════════════════════════════════════════
const UltraDataEngine = {
  activeKey: 'crm_leads',
  records: [],

  open() {
    this.discoverCollections();
    this.loadData();
    this.renderTable();
    const modal = document.getElementById('modal-data-engine');
    if (modal) modal.classList.add('show');
  },

  close() {
    const modal = document.getElementById('modal-data-engine');
    if (modal) modal.classList.remove('show');
  },

  discoverCollections() {
    const select = document.getElementById('data-collection-select');
    if (!select) return;

    const standardKeys = ['crm_leads', 'store_products', 'tasks_data', 'finance_tx', 'booking_data'];
    const foundKeys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && !k.startsWith('cm_') && !k.startsWith('ultra_')) {
        foundKeys.push(k);
      }
    }
    const allKeys = Array.from(new Set([...standardKeys, ...foundKeys]));
    select.innerHTML = allKeys.map(k => `<option value="${k}" ${k === this.activeKey ? 'selected' : ''}>${k}</option>`).join('');
  },

  onCollectionChange(key) {
    this.activeKey = key;
    this.loadData();
    this.renderTable();
  },

  loadData() {
    try {
      const raw = localStorage.getItem(this.activeKey);
      this.records = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(this.records)) this.records = [];
    } catch(e) {
      this.records = [];
    }
  },

  saveData() {
    localStorage.setItem(this.activeKey, JSON.stringify(this.records));
    // Trigger storage event for live preview reload
    window.dispatchEvent(new Event('storage'));
    const frame = document.getElementById('preview-frame');
    if (frame && frame.contentWindow) {
      try { frame.contentWindow.dispatchEvent(new Event('storage')); } catch(e){}
    }
  },

  renderTable() {
    const wrap = document.getElementById('data-engine-grid-wrap');
    if (!wrap) return;

    if (this.records.length === 0) {
      wrap.innerHTML = `
        <div style="padding:40px;text-align:center;color:#94a3b8">
          <div style="font-size:2.5rem;margin-bottom:10px">📊</div>
          <p>${_t('dataEngineNoData', 'No records found in this collection. Click "Seed Mock Data" to populate.')}</p>
          <button class="btn-primary" onclick="UltraDataEngine.seedData()" style="margin-top:12px;padding:8px 18px;background:#10b981;border:none;border-radius:8px;color:#fff;font-weight:700;cursor:pointer">🌱 ${_t('dataEngineSeed', 'Seed Mock Data')}</button>
        </div>
      `;
      return;
    }

    const columns = Object.keys(this.records[0]);
    wrap.innerHTML = `
      <table class="ultra-data-grid">
        <thead>
          <tr>
            <th>#</th>
            ${columns.map(c => '<th>' + c.toUpperCase() + '</th>').join('')}
            <th style="width:50px">Actions</th>
          </tr>
        </thead>
        <tbody>
          ${this.records.map((r, idx) => `
            <tr>
              <td style="color:#64748b">${idx + 1}</td>
              ${columns.map(c => `
                <td>
                  <div class="editable-cell" contenteditable="true" onblur="UltraDataEngine.updateCell(${idx}, '${c}', this.innerText)">${r[c] !== undefined ? r[c] : ''}</div>
                </td>
              `).join('')}
              <td>
                <button onclick="UltraDataEngine.deleteRow(${idx})" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:1rem" title="Delete">🗑️</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  },

  updateCell(rowIdx, colKey, val) {
    if (this.records[rowIdx]) {
      this.records[rowIdx][colKey] = isNaN(val) ? val : Number(val);
      this.saveData();
    }
  },

  addRow() {
    if (this.records.length === 0) {
      this.records.push({ id: String(Date.now()), name: 'New Item', val: 100 });
    } else {
      const template = { ...this.records[0] };
      Object.keys(template).forEach(k => {
        if (k === 'id') template[k] = String(Date.now());
        else if (typeof template[k] === 'number') template[k] = 0;
        else template[k] = 'Sample';
      });
      this.records.unshift(template);
    }
    this.saveData();
    this.renderTable();
    if (typeof showToast === 'function') {
      showToast('Record added', 'success');
    }
  },

  deleteRow(idx) {
    this.records.splice(idx, 1);
    this.saveData();
    this.renderTable();
  },

  seedData() {
    if (this.activeKey === 'crm_leads') {
      this.records = [
        { id: '1', name: 'Sophia Dupont', company: 'Solaris Cloud', val: 35000, stage: 'won', prio: 'High' },
        { id: '2', name: 'Alexander Vance', company: 'Quantum Labs', val: 28000, stage: 'new', prio: 'High' },
        { id: '3', name: 'Marcus Chen', company: 'Nova Robotics', val: 42000, stage: 'proposal', prio: 'High' },
        { id: '4', name: 'Elena Rostova', company: 'Aero Dynamics', val: 14500, stage: 'contacted', prio: 'Medium' }
      ];
    } else {
      this.records = [
        { id: '101', name: 'Pro Subscription', category: 'Software', amount: 99, status: 'Active' },
        { id: '102', name: 'Enterprise License', category: 'Software', amount: 499, status: 'Active' },
        { id: '103', name: 'Cloud Server Hosting', category: 'Infra', amount: 140, status: 'Pending' }
      ];
    }
    this.saveData();
    this.renderTable();
    if (typeof showToast === 'function') {
      showToast('Seeded 4 records!', 'success');
    }
  },

  exportCsv() {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export CSV Data')) return;
    if (this.records.length === 0) return;
    const cols = Object.keys(this.records[0]);
    const rows = [cols];
    this.records.forEach(r => rows.push(cols.map(c => r[c])));
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = this.activeKey + '.csv';
    a.click();
    if (typeof showToast === 'function') {
      showToast('CSV exported!', 'success');
    }
  },

  exportJson() {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export JSON Data')) return;
    if (!this.records || !this.records.length) {
      if (typeof showToast === 'function') showToast('No records to export', 'info');
      return;
    }
    const blob = new Blob([JSON.stringify(this.records, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = this.activeKey + '.json';
    a.click();
    if (typeof showToast === 'function') showToast('💾 JSON exported successfully!', 'success');
  },

  exportSql() {
    if (typeof window.guardPremium === 'function' && !window.guardPremium(null, 'Export SQL Dump')) return;
    if (!this.records || !this.records.length) {
      if (typeof showToast === 'function') showToast('No records to export', 'info');
      return;
    }
    const table = this.activeKey.replace(/[^a-zA-Z0-9_]/g, '_');
    const cols = Object.keys(this.records[0]);
    let sql = `-- IA Architecte Studio ULTRA SQL Dump\n-- Table: ${table}\n\n`;
    sql += `CREATE TABLE IF NOT EXISTS ${table} (\n`;
    sql += cols.map(c => `  \`${c}\` ${typeof this.records[0][c] === 'number' ? 'NUMERIC' : 'TEXT'}`).join(',\n');
    sql += `\n);\n\n`;
    this.records.forEach(r => {
      const vals = cols.map(c => {
        const v = r[c];
        if (v == null) return 'NULL';
        if (typeof v === 'number') return v;
        return `'${String(v).replace(/'/g, "''")}'`;
      });
      sql += `INSERT INTO ${table} (\`${cols.join('`, `')}\`) VALUES (${vals.join(', ')});\n`;
    });
    const blob = new Blob([sql], { type: 'text/plain;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = table + '_dump.sql';
    a.click();
    if (typeof showToast === 'function') showToast('🗄️ SQL dump exported!', 'success');
  },

  importFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed)) {
            this.records = parsed;
          } else {
            this.records = [parsed];
          }
        } else {
          // CSV parse
          const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
          if (lines.length > 1) {
            const headers = lines[0].split(',').map(h => h.replace(/^["']|["']$/g, '').trim());
            this.records = lines.slice(1).map(line => {
              const values = line.split(',').map(v => v.replace(/^["']|["']$/g, '').trim());
              const obj = {};
              headers.forEach((h, i) => {
                const val = values[i] !== undefined ? values[i] : '';
                obj[h] = !isNaN(val) && val !== '' ? Number(val) : val;
              });
              return obj;
            });
          }
        }
        this.saveData();
        this.renderTable();
        if (typeof showToast === 'function') {
          showToast(`📥 Imported ${this.records.length} records!`, 'success');
        }
      } catch(err) {
        if (typeof showToast === 'function') showToast('Failed to parse file: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 5. ULTRA BLOCK LIBRARY — LEGO UI COMPONENT PALETTE
// ══════════════════════════════════════════════════════════════════════════════
const UltraBlockLibrary = {
  blocks: [
    {
      id: 'hero',
      titleKey: 'blockHero',
      titleDef: 'Hero Section with CTA',
      icon: '🌟',
      html: `
<section style="text-align:center;padding:60px 20px;background:linear-gradient(180deg,rgba(139,92,246,0.15),transparent);border-radius:18px;margin:20px 0;border:1px solid rgba(139,92,246,0.25)">
  <span style="background:rgba(56,189,248,0.15);color:#38bdf8;padding:4px 12px;border-radius:20px;font-size:0.75rem;font-weight:800;letter-spacing:1px">ULTRA NEXT-GEN</span>
  <h1 style="font-size:2.6rem;font-weight:900;color:#fff;margin:14px 0 8px 0;line-height:1.2">Architect Smarter Web Applications</h1>
  <p style="color:#94a3b8;font-size:1rem;max-width:560px;margin:0 auto 24px auto">Empower teams with stateful components, automated persistence, and lightning-fast workflows.</p>
  <div style="display:flex;gap:12px;justify-content:center">
    <button style="background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;border:none;padding:12px 28px;border-radius:10px;font-weight:800;cursor:pointer;box-shadow:0 4px 20px rgba(139,92,246,0.4)">🚀 Get Started Free</button>
    <button style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:12px 24px;border-radius:10px;font-weight:700;cursor:pointer">Explore Demo →</button>
  </div>
</section>`
    },
    {
      id: 'kpi',
      titleKey: 'blockKpi',
      titleDef: 'KPI Metrics 4-Pack',
      icon: '📊',
      html: `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin:20px 0">
  <div style="background:#111827;border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:16px">
    <span style="font-size:0.75rem;color:#94a3b8;font-weight:700;text-transform:uppercase">Total Revenue</span>
    <div style="font-size:1.6rem;font-weight:800;color:#fff;margin:4px 0">$94,250</div>
    <span style="font-size:0.72rem;color:#10b981;font-weight:700">▲ +12.4% this month</span>
  </div>
  <div style="background:#111827;border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:16px">
    <span style="font-size:0.75rem;color:#94a3b8;font-weight:700;text-transform:uppercase">Active Users</span>
    <div style="font-size:1.6rem;font-weight:800;color:#fff;margin:4px 0">8,420</div>
    <span style="font-size:0.72rem;color:#10b981;font-weight:700">▲ +340 today</span>
  </div>
  <div style="background:#111827;border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:16px">
    <span style="font-size:0.75rem;color:#94a3b8;font-weight:700;text-transform:uppercase">Conversion</span>
    <div style="font-size:1.6rem;font-weight:800;color:#fff;margin:4px 0">3.85%</div>
    <span style="font-size:0.72rem;color:#38bdf8;font-weight:700">● Industry Top 10%</span>
  </div>
  <div style="background:#111827;border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:16px">
    <span style="font-size:0.75rem;color:#94a3b8;font-weight:700;text-transform:uppercase">Avg Session</span>
    <div style="font-size:1.6rem;font-weight:800;color:#fff;margin:4px 0">4m 18s</div>
    <span style="font-size:0.72rem;color:#10b981;font-weight:700">▲ +45s retention</span>
  </div>
</div>`
    },
    {
      id: 'pricing',
      titleKey: 'blockPricing',
      titleDef: 'SaaS 3-Tier Pricing',
      icon: '💳',
      html: `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:24px 0">
  <div style="background:#111827;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:12px">
    <h3 style="color:#fff;margin:0">Starter</h3>
    <div style="font-size:1.8rem;font-weight:900;color:#fff">$29<span style="font-size:0.8rem;color:#94a3b8">/mo</span></div>
    <ul style="color:#cbd5e1;font-size:0.82rem;line-height:1.8;padding-left:18px;margin:0">
      <li>Up to 5 Projects</li>
      <li>Community Support</li>
      <li>Basic Analytics</li>
    </ul>
    <button style="background:rgba(255,255,255,0.08);color:#fff;border:1px solid rgba(255,255,255,0.15);padding:10px;border-radius:8px;font-weight:700;cursor:pointer;margin-top:auto">Select Plan</button>
  </div>
  <div style="background:#161f36;border:2px solid #8b5cf6;border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:12px;box-shadow:0 0 25px rgba(139,92,246,0.3)">
    <span style="background:#8b5cf6;color:#fff;font-size:0.7rem;font-weight:800;padding:2px 8px;border-radius:10px;align-self:flex-start">MOST POPULAR</span>
    <h3 style="color:#fff;margin:0">Professional</h3>
    <div style="font-size:1.8rem;font-weight:900;color:#fff">$79<span style="font-size:0.8rem;color:#94a3b8">/mo</span></div>
    <ul style="color:#cbd5e1;font-size:0.82rem;line-height:1.8;padding-left:18px;margin:0">
      <li>Unlimited Projects</li>
      <li>Priority Support 24/7</li>
      <li>Advanced Local DB</li>
      <li>Custom Branding</li>
    </ul>
    <button style="background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:800;cursor:pointer;margin-top:auto">Get Pro</button>
  </div>
</div>`
    }
  ],

  open() {
    this.render();
    const m = document.getElementById('modal-blocks');
    if (m) m.classList.add('show');
  },

  close() {
    const m = document.getElementById('modal-blocks');
    if (m) m.classList.remove('show');
  },

  render() {
    const container = document.getElementById('block-library-grid');
    if (!container) return;

    container.innerHTML = this.blocks.map(b => `
      <div class="block-card">
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:1.4rem">${b.icon}</span>
          <strong style="color:#fff;font-size:0.88rem">${_t(b.titleKey, b.titleDef)}</strong>
        </div>
        <div class="block-preview-box">
          <span style="color:#64748b;font-size:0.75rem">${b.titleDef}</span>
        </div>
        <button class="btn-insert-block" onclick="UltraBlockLibrary.insert('${b.id}')">${_t('blockInsert', '+ Insert into App')}</button>
      </div>
    `).join('');
  },

  insert(id) {
    const b = this.blocks.find(x => x.id === id);
    if (!b || !window.APP) return;

    this.close();
    APP.html = (APP.html || '') + '\n' + b.html;
    if (APP.editor && APP.currentTab === 'html') {
      APP.editor.setValue(APP.html);
    }
    if (typeof refreshPreview === 'function') refreshPreview();
    if (typeof showToast === 'function') {
      showToast(_t('blockInsert', '✓ Block inserted into application!'), 'success');
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// 6. ULTRA VOICE — BILINGUAL SPEECH-TO-TEXT INPUT (EN / FR)
// ══════════════════════════════════════════════════════════════════════════════
const UltraVoice = {
  recognition: null,
  isListening: false,

  toggle() {
    if (this.isListening) {
      this.stop();
    } else {
      this.start();
    }
  },

  start() {
    const Speech = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Speech) {
      if (typeof showToast === 'function') {
        showToast(_t('voiceNotSupported', 'Speech recognition not supported in this browser.'), 'error');
      }
      return;
    }

    try {
      this.recognition = new Speech();
      const lang = (typeof currentLang !== 'undefined' && currentLang === 'fr') ? 'fr-FR' : 'en-US';
      this.recognition.lang = lang;
      this.recognition.continuous = false;
      this.recognition.interimResults = true;

      const btn = document.getElementById('btn-voice');
      const input = document.getElementById('prompt-input');

      this.recognition.onstart = () => {
        this.isListening = true;
        if (btn) btn.classList.add('listening');
        if (typeof showToast === 'function') {
          showToast(_t('voiceListening', '🎙️ Listening... Speak your app idea'), 'info');
        }
      };

      this.recognition.onresult = (e) => {
        let transcript = '';
        for (let i = 0; i < e.results.length; i++) {
          transcript += e.results[i][0].transcript;
        }
        if (input) {
          input.value = transcript;
        }

        // Voice Copilot Commands (EN & FR)
        const lower = transcript.toLowerCase().trim();
        const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

        if (lower.includes('dashboard') || lower.includes('tableau de bord')) {
          if (window.UltraScreenManager) UltraScreenManager.switchScreen('Dashboard');
          if (window.UltraSoundFX) UltraSoundFX.play('success');
          if (typeof showToast === 'function') showToast(isFr ? '🎙️ Navigation vers Dashboard' : '🎙️ Switching to Dashboard', 'success');
        } else if (lower.includes('home') || lower.includes('accueil')) {
          if (window.UltraScreenManager) UltraScreenManager.switchScreen('Home');
          if (window.UltraSoundFX) UltraSoundFX.play('success');
          if (typeof showToast === 'function') showToast(isFr ? '🎙️ Navigation vers Accueil' : '🎙️ Switching to Home', 'success');
        } else if (lower.includes('settings') || lower.includes('paramètres') || lower.includes('parametres')) {
          if (window.UltraScreenManager) UltraScreenManager.switchScreen('Settings');
          if (window.UltraSoundFX) UltraSoundFX.play('success');
        } else if (lower.includes('data engine') || lower.includes('database') || lower.includes('base de données')) {
          if (window.UltraDataEngine) UltraDataEngine.open();
          if (window.UltraSoundFX) UltraSoundFX.play('success');
        } else if (lower.includes('magic styler') || lower.includes('styler') || lower.includes('thème') || lower.includes('theme')) {
          if (window.UltraMagicStyler) UltraMagicStyler.open();
          if (window.UltraSoundFX) UltraSoundFX.play('success');
        } else if (lower.includes('automation') || lower.includes('automatisation')) {
          if (window.UltraAutomations) UltraAutomations.open();
          if (window.UltraSoundFX) UltraSoundFX.play('success');
        } else if (lower.includes('confetti') || lower.includes('celebrate') || lower.includes('fête')) {
          if (window.UltraConfetti) UltraConfetti.burst();
        } else if (lower.includes('iphone') || lower.includes('mobile')) {
          if (window.UltraDeviceSimulator) UltraDeviceSimulator.setMode('iphone');
        } else if (lower.includes('blocks') || lower.includes('composants')) {
          if (window.UltraBlockLibrary) UltraBlockLibrary.open();
          if (window.UltraSoundFX) UltraSoundFX.play('success');
        } else if (lower.includes('wizard') || lower.includes('créateur')) {
          if (window.UltraWizard) UltraWizard.open();
          if (window.UltraSoundFX) UltraSoundFX.play('success');
        }
      };

      this.recognition.onerror = () => {
        this.stop();
      };

      this.recognition.onend = () => {
        this.stop();
      };

      this.recognition.start();
    } catch(e) {
      this.stop();
    }
  },

  stop() {
    this.isListening = false;
    const btn = document.getElementById('btn-voice');
    if (btn) btn.classList.remove('listening');
    if (this.recognition) {
      try { this.recognition.stop(); } catch(e){}
    }
  }
};

// Export globals
window.UltraWizard = UltraWizard;
window.UltraVisualInspector = UltraVisualInspector;
window.UltraScreenManager = UltraScreenManager;
window.UltraDataEngine = UltraDataEngine;
window.UltraBlockLibrary = UltraBlockLibrary;
window.UltraVoice = UltraVoice;

// Auto-initialize Screen Manager on load so the tabs are visible and interactive
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.UltraScreenManager) UltraScreenManager.scanAndRender();
    });
  } else {
    setTimeout(() => {
      if (window.UltraScreenManager) UltraScreenManager.scanAndRender();
    }, 150);
  }

  // Keep inspector active across iframe srcdoc reloads
  window.addEventListener('load', () => {
    const frame = document.getElementById('preview-frame');
    if (frame) {
      frame.addEventListener('load', () => {
        if (window.UltraVisualInspector && UltraVisualInspector.active) {
          UltraVisualInspector.attachIframeListeners();
        }
      });
    }
  });
}
