// ══════════════════════════════════════════════════════════════════════════════
// IA ARCHITECTE STUDIO ULTRA — ULTRA WEB CLONER & INGESTOR
// 1. URL & Live Site Scraper / Decompiler
// 2. Raw Code Sanitizer (strips tracking, ads & analytics)
// 3. 4 World-Class UI Clone Presets (Stripe, Linear, Apple, SaaS Dashboard)
// ══════════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  function _it(key, fallback) {
    if (typeof t === 'function') {
      const res = t(key);
      if (res && res !== key) return res;
    }
    return fallback || key;
  }

  function _play(sound) {
    try { if (window.UltraSoundFX) UltraSoundFX.play(sound); } catch(e){}
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') showToast(msg, type || 'success');
  }

  const PRESET_CLONES = {
    'stripe-pricing': {
      name: 'Stripe SaaS Pricing Table',
      icon: '💳',
      descEn: 'High-converting pricing tiers with Monthly/Annual discount toggle, feature comparison, and checkout modal.',
      descFr: 'Grille tarifaire SaaS avec bascule Mensuel/Annuel, comparatif de fonctionnalités et modal de paiement.',
      html: `
<div class="pricing-wrap">
  <div class="pricing-header">
    <span class="badge">PRICING TIERS</span>
    <h1>Simple, transparent pricing</h1>
    <p>Everything you need to launch, scale, and monetize your SaaS application.</p>
    <div class="billing-toggle">
      <span id="label-monthly" class="active">Monthly</span>
      <label class="switch">
        <input type="checkbox" id="annual-switch" onchange="toggleBilling()">
        <span class="slider"></span>
      </label>
      <span id="label-annual">Annual <span class="discount-pill">Save 20%</span></span>
    </div>
  </div>

  <div class="pricing-grid">
    <!-- Tier 1 -->
    <div class="tier-card">
      <div class="tier-name">Starter</div>
      <div class="tier-desc">For indie hackers and solo founders launching prototypes.</div>
      <div class="price-box"><span class="currency">$</span><span class="amount" id="p-starter">19</span><span class="period">/mo</span></div>
      <ul class="features">
        <li>✓ 5 Active Projects</li>
        <li>✓ 10,000 Monthly API Calls</li>
        <li>✓ Community Support</li>
        <li>✓ Basic Analytics</li>
      </ul>
      <button class="btn-tier" onclick="selectPlan('Starter')">Get Started</button>
    </div>

    <!-- Tier 2 (Popular) -->
    <div class="tier-card featured">
      <div class="popular-ribbon">MOST POPULAR</div>
      <div class="tier-name">Growth</div>
      <div class="tier-desc">For rapidly scaling teams needing unlimited generation and team seats.</div>
      <div class="price-box"><span class="currency">$</span><span class="amount" id="p-growth">49</span><span class="period">/mo</span></div>
      <ul class="features">
        <li>✓ Unlimited Active Projects</li>
        <li>✓ 500,000 Monthly API Calls</li>
        <li>✓ Priority 24/7 Support</li>
        <li>✓ Custom Domain & SSL</li>
        <li>✓ Full PWA & Mobile Exporter</li>
      </ul>
      <button class="btn-tier primary" onclick="selectPlan('Growth')">Start 14-Day Free Trial</button>
    </div>

    <!-- Tier 3 -->
    <div class="tier-card">
      <div class="tier-name">Enterprise</div>
      <div class="tier-desc">Dedicated infrastructure, custom SLAs, and enterprise security.</div>
      <div class="price-box"><span class="currency">$</span><span class="amount" id="p-enterprise">199</span><span class="period">/mo</span></div>
      <ul class="features">
        <li>✓ Dedicated VPC Instances</li>
        <li>✓ Unlimited Team Members</li>
        <li>✓ 99.99% SLA Guarantee</li>
        <li>✓ SOC2 & GDPR Compliance</li>
        <li>✓ Dedicated Solutions Architect</li>
      </ul>
      <button class="btn-tier" onclick="selectPlan('Enterprise')">Contact Sales</button>
    </div>
  </div>
</div>
`,
      css: `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #090d16;
  color: #f1f5f9;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
}
.pricing-wrap { max-width: 1100px; width: 100%; margin: 0 auto; text-align: center; }
.pricing-header .badge {
  background: rgba(139,92,246,0.15);
  color: #a78bfa;
  border: 1px solid rgba(139,92,246,0.3);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 20px;
  letter-spacing: 1px;
}
.pricing-header h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 12px 0 8px;
  background: linear-gradient(135deg, #ffffff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.pricing-header p { color: #94a3b8; font-size: 1rem; max-width: 540px; margin: 0 auto 28px; }
.billing-toggle {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(255,255,255,0.04);
  padding: 8px 18px;
  border-radius: 30px;
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 0.88rem;
  font-weight: 600;
}
.billing-toggle span.active { color: #38bdf8; }
.discount-pill {
  background: #10b981;
  color: #000;
  font-size: 0.7rem;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 12px;
  margin-left: 4px;
}
.switch { position: relative; display: inline-block; width: 44px; height: 24px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute; cursor: pointer; inset: 0; background: #334155;
  transition: .25s; border-radius: 24px;
}
.slider:before {
  position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px;
  background: #fff; transition: .25s; border-radius: 50%;
}
input:checked + .slider { background: #8b5cf6; }
input:checked + .slider:before { transform: translateX(20px); }

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
  text-align: left;
}
.tier-card {
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 20px;
  padding: 32px 28px;
  backdrop-filter: blur(12px);
  position: relative;
  display: flex;
  flex-direction: column;
  transition: transform .2s, border-color .2s;
}
.tier-card:hover { transform: translateY(-4px); border-color: rgba(139,92,246,0.4); }
.tier-card.featured {
  border: 2px solid #8b5cf6;
  background: linear-gradient(180deg, rgba(139,92,246,0.1), rgba(15,23,42,0.9));
  box-shadow: 0 10px 40px rgba(139,92,246,0.2);
}
.popular-ribbon {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: linear-gradient(135deg, #8b5cf6, #38bdf8);
  color: #fff; font-size: 0.68rem; font-weight: 800; padding: 4px 14px;
  border-radius: 20px; letter-spacing: 0.5px;
}
.tier-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 6px; }
.tier-desc { font-size: 0.82rem; color: #94a3b8; line-height: 1.4; margin-bottom: 20px; }
.price-box { display: flex; align-items: baseline; gap: 4px; margin-bottom: 24px; }
.price-box .currency { font-size: 1.5rem; font-weight: 700; color: #94a3b8; }
.price-box .amount { font-size: 2.8rem; font-weight: 900; color: #fff; }
.price-box .period { color: #64748b; font-size: 0.88rem; }
.features { list-style: none; padding: 0; margin: 0 0 28px 0; flex: 1; display: flex; flex-direction: column; gap: 10px; }
.features li { font-size: 0.85rem; color: #cbd5e1; display: flex; align-items: center; gap: 8px; }
.btn-tier {
  width: 100%; padding: 12px; border-radius: 12px; font-size: 0.9rem; font-weight: 700;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
  color: #fff; cursor: pointer; transition: all .2s;
}
.btn-tier:hover { background: rgba(255,255,255,0.12); }
.btn-tier.primary {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  border: none; box-shadow: 0 4px 20px rgba(139,92,246,0.3);
}
.btn-tier.primary:hover { opacity: 0.92; transform: scale(1.02); }
`,
      js: `
function toggleBilling() {
  const isAnnual = document.getElementById('annual-switch').checked;
  document.getElementById('label-monthly').classList.toggle('active', !isAnnual);
  document.getElementById('label-annual').classList.toggle('active', isAnnual);

  document.getElementById('p-starter').textContent = isAnnual ? '15' : '19';
  document.getElementById('p-growth').textContent = isAnnual ? '39' : '49';
  document.getElementById('p-enterprise').textContent = isAnnual ? '159' : '199';
}

function selectPlan(plan) {
  alert('Selected ' + plan + ' Plan! Launching simulated checkout...');
}
`
    },

    'linear-kanban': {
      name: 'Linear Issue Tracker Kanban',
      icon: '📐',
      descEn: 'Modern dark-mode project management board with drag-and-drop tasks, tags, and progress tracker.',
      descFr: 'Tableau Kanban moderne avec glisser-déposer, étiquettes de priorité et suivi d\'avancement.',
      html: `
<div class="kanban-app">
  <header class="kanban-top">
    <div class="top-title">
      <span class="logo">📐</span>
      <h1>Linear Studio — Sprint #42</h1>
      <span class="sprint-status">In Progress</span>
    </div>
    <div class="top-actions">
      <button class="btn-new-task" onclick="addNewIssue()">+ New Issue</button>
    </div>
  </header>

  <div class="board-columns">
    <!-- Backlog -->
    <div class="column" id="col-backlog">
      <div class="col-head">
        <span class="dot backlog"></span>
        <span class="col-title">Backlog</span>
        <span class="count" id="count-backlog">2</span>
      </div>
      <div class="col-cards" id="cards-backlog">
        <div class="issue-card" onclick="advanceIssue(this)">
          <div class="issue-id">LIN-104</div>
          <div class="issue-title">Refactor WebRTC signaling protocol for zero-latency peer connection</div>
          <div class="issue-tags">
            <span class="tag prio-high">High</span>
            <span class="tag team">Backend</span>
          </div>
        </div>
        <div class="issue-card" onclick="advanceIssue(this)">
          <div class="issue-id">LIN-105</div>
          <div class="issue-title">Audit WCAG 2.1 AA color contrast across dark glass components</div>
          <div class="issue-tags">
            <span class="tag prio-med">Medium</span>
            <span class="tag team">Design</span>
          </div>
        </div>
      </div>
    </div>

    <!-- In Progress -->
    <div class="column" id="col-progress">
      <div class="col-head">
        <span class="dot progress"></span>
        <span class="col-title">In Progress</span>
        <span class="count" id="count-progress">2</span>
      </div>
      <div class="col-cards" id="cards-progress">
        <div class="issue-card" onclick="advanceIssue(this)">
          <div class="issue-id">LIN-101</div>
          <div class="issue-title">Integrate Three.js spatial background depth canvas</div>
          <div class="issue-tags">
            <span class="tag prio-high">Urgent</span>
            <span class="tag team">Frontend</span>
          </div>
        </div>
        <div class="issue-card" onclick="advanceIssue(this)">
          <div class="issue-id">LIN-102</div>
          <div class="issue-title">Setup Stripe billing webhook listener and subscription tiers</div>
          <div class="issue-tags">
            <span class="tag prio-med">Medium</span>
            <span class="tag team">DevOps</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Done -->
    <div class="column" id="col-done">
      <div class="col-head">
        <span class="dot done"></span>
        <span class="col-title">Done</span>
        <span class="count" id="count-done">1</span>
      </div>
      <div class="col-cards" id="cards-done">
        <div class="issue-card completed">
          <div class="issue-id">LIN-098</div>
          <div class="issue-title">Create standalone 1-click HTML and PWA ZIP packager</div>
          <div class="issue-tags">
            <span class="tag done-tag">✓ Released</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`,
      css: `
body { margin: 0; font-family: -apple-system, system-ui, sans-serif; background: #080c14; color: #e2e8f0; height: 100vh; overflow: hidden; }
.kanban-app { display: flex; flex-direction: column; height: 100vh; }
.kanban-top {
  display: flex; justify-content: space-between; align-items: center; padding: 14px 24px;
  background: #0d1322; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.top-title { display: flex; align-items: center; gap: 12px; }
.top-title h1 { margin: 0; font-size: 1.05rem; font-weight: 700; color: #fff; }
.sprint-status { background: rgba(56,189,248,0.15); color: #38bdf8; font-size: 0.72rem; padding: 3px 10px; border-radius: 12px; font-weight: 700; }
.btn-new-task { background: #6366f1; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 0.8rem; }
.board-columns { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 20px; overflow-x: auto; }
.column { background: #0b101d; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; display: flex; flex-direction: column; overflow: hidden; }
.col-head { padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; align-items: center; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.dot.backlog { background: #94a3b8; }
.dot.progress { background: #f59e0b; }
.dot.done { background: #10b981; }
.col-title { font-weight: 700; font-size: 0.88rem; flex: 1; }
.count { background: rgba(255,255,255,0.08); font-size: 0.72rem; padding: 2px 7px; border-radius: 10px; color: #94a3b8; }
.col-cards { flex: 1; padding: 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
.issue-card {
  background: #111827; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 12px;
  cursor: pointer; transition: all .15s ease;
}
.issue-card:hover { transform: translateY(-2px); border-color: rgba(99,102,241,0.5); box-shadow: 0 4px 12px rgba(0,0,0,0.4); }
.issue-card.completed { opacity: 0.65; text-decoration: line-through; }
.issue-id { font-size: 0.7rem; color: #64748b; font-weight: 700; margin-bottom: 4px; }
.issue-title { font-size: 0.83rem; font-weight: 600; line-height: 1.4; color: #f1f5f9; margin-bottom: 10px; }
.issue-tags { display: flex; gap: 6px; }
.tag { font-size: 0.65rem; font-weight: 700; padding: 2px 7px; border-radius: 4px; }
.tag.prio-high { background: rgba(239,68,68,0.2); color: #f87171; }
.tag.prio-med { background: rgba(245,158,11,0.2); color: #fbbf24; }
.tag.team { background: rgba(255,255,255,0.06); color: #94a3b8; }
.tag.done-tag { background: rgba(16,185,129,0.2); color: #34d399; }
`,
      js: `
function advanceIssue(card) {
  const cardsProgress = document.getElementById('cards-progress');
  const cardsDone = document.getElementById('cards-done');
  if (card.parentNode.id === 'cards-backlog') {
    cardsProgress.appendChild(card);
  } else if (card.parentNode.id === 'cards-progress') {
    card.classList.add('completed');
    cardsDone.appendChild(card);
  }
  updateCounts();
}

function addNewIssue() {
  const title = prompt('Issue Title:', 'New optimization task');
  if (!title) return;
  const card = document.createElement('div');
  card.className = 'issue-card';
  card.onclick = function() { advanceIssue(card); };
  card.innerHTML = '<div class="issue-id">LIN-' + Math.floor(100 + Math.random()*900) + '</div><div class="issue-title">' + title + '</div><div class="issue-tags"><span class="tag prio-high">New</span></div>';
  document.getElementById('cards-backlog').prepend(card);
  updateCounts();
}

function updateCounts() {
  document.getElementById('count-backlog').textContent = document.getElementById('cards-backlog').children.length;
  document.getElementById('count-progress').textContent = document.getElementById('cards-progress').children.length;
  document.getElementById('count-done').textContent = document.getElementById('cards-done').children.length;
}
`
    },

    'apple-showcase': {
      name: 'Apple Vision Pro Showcase',
      icon: '👓',
      descEn: 'Minimalist luxury tech product page with frosted glassmorphism, responsive specs, and smooth tabs.',
      descFr: 'Page vitrine produit technologique de luxe avec glassmorphisme dépoli, spécifications et onglets fluides.',
      html: `
<div class="apple-showcase">
  <nav class="nav-bar">
    <div class="brand"> Vision Studio</div>
    <div class="nav-links">
      <a href="#overview">Overview</a>
      <a href="#tech">Tech Specs</a>
      <button class="btn-buy" onclick="alert('Added to cart!')">Pre-Order</button>
    </div>
  </nav>

  <section class="hero-section">
    <span class="hero-tag">Spatial Computing Era</span>
    <h1>Welcome to the era of spatial computing.</h1>
    <p>You’ve never seen anything like this before. Seamlessly blending digital content with your physical space.</p>
    <div class="glass-card-device">
      <div class="device-glow"></div>
      <div class="device-icon">👓</div>
      <div class="device-meta">
        <h3>Vision Studio Pro</h3>
        <p>23 Million Pixels · Dual Micro-OLED · M2 &amp; R1 Dual Engine</p>
      </div>
    </div>
  </section>

  <div class="specs-grid">
    <div class="spec-card">
      <span class="spec-num">23M</span>
      <span class="spec-label">Pixels across two displays</span>
    </div>
    <div class="spec-card">
      <span class="spec-num">12ms</span>
      <span class="spec-label">Photon-to-motion latency</span>
    </div>
    <div class="spec-card">
      <span class="spec-num">100%</span>
      <span class="spec-label">DCI-P3 Color Gamut accuracy</span>
    </div>
  </div>
</div>
`,
      css: `
body { margin: 0; background: #000; color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif; }
.apple-showcase { min-height: 100vh; display: flex; flex-direction: column; align-items: center; }
.nav-bar {
  width: 100%; max-width: 980px; display: flex; justify-content: space-between; align-items: center;
  padding: 18px 24px; box-sizing: border-box; backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.08); position: sticky; top: 0; z-index: 10;
}
.brand { font-weight: 700; font-size: 1.1rem; }
.nav-links { display: flex; align-items: center; gap: 20px; font-size: 0.85rem; }
.nav-links a { color: #a1a1a6; text-decoration: none; transition: color .15s; }
.nav-links a:hover { color: #fff; }
.btn-buy { background: #0071e3; color: #fff; border: none; padding: 6px 14px; border-radius: 16px; font-weight: 600; cursor: pointer; }
.hero-section { text-align: center; max-width: 780px; padding: 60px 20px 40px; }
.hero-tag { color: #ff375f; font-weight: 700; font-size: 0.85rem; letter-spacing: 0.5px; }
.hero-section h1 { font-size: 3rem; font-weight: 800; line-height: 1.1; margin: 16px 0; background: linear-gradient(180deg, #fff, #86868b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero-section p { font-size: 1.15rem; color: #86868b; line-height: 1.5; margin-bottom: 36px; }
.glass-card-device {
  background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.12);
  border-radius: 28px; padding: 40px; position: relative; overflow: hidden;
  box-shadow: 0 20px 80px rgba(0,0,0,0.8);
}
.device-glow { position: absolute; inset: -40%; background: radial-gradient(circle, rgba(0,113,227,0.2) 0%, transparent 60%); pointer-events: none; }
.device-icon { font-size: 4.5rem; margin-bottom: 12px; }
.device-meta h3 { margin: 0 0 6px 0; font-size: 1.4rem; font-weight: 700; }
.device-meta p { margin: 0; color: #86868b; font-size: 0.85rem; }
.specs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 800px; width: 90%; margin: 20px 0 60px; text-align: center; }
.spec-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 18px; padding: 24px 16px; }
.spec-num { font-size: 2.4rem; font-weight: 800; display: block; background: linear-gradient(135deg,#fff,#38bdf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.spec-label { font-size: 0.8rem; color: #86868b; margin-top: 6px; display: block; }
`,
      js: `
console.log('Apple Vision Showcase loaded!');
`
    },

    'saas-analytics': {
      name: 'SaaS Analytics & KPI Hub',
      icon: '📊',
      descEn: 'Executive metrics dashboard with live ARR counter, SVG sparkline graphs, and real-time visitor activity stream.',
      descFr: 'Tableau de bord de métriques exécutives avec compteur de MRR, graphiques sparkline et flux en direct.',
      html: `
<div class="analytics-app">
  <aside class="sidebar">
    <div class="side-logo">⚡ CloudMetrics</div>
    <ul class="side-menu">
      <li class="active">📊 Overview</li>
      <li>👥 Customers</li>
      <li>💳 Invoices</li>
      <li>⚙️ Settings</li>
    </ul>
  </aside>

  <main class="main-content">
    <header class="content-header">
      <div>
        <h2>SaaS Performance Overview</h2>
        <span style="color:#64748b;font-size:0.8rem">Live metrics refreshed every 5 seconds</span>
      </div>
      <button class="btn-export" onclick="alert('Exporting PDF report...')">Download Report</button>
    </header>

    <div class="kpi-grid">
      <div class="kpi-card">
        <span class="kpi-label">Monthly Recurring Revenue</span>
        <div class="kpi-val" id="val-mrr">$84,230</div>
        <span class="kpi-trend up">↑ +18.4% vs last month</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Active Subscriptions</span>
        <div class="kpi-val" id="val-subs">1,429</div>
        <span class="kpi-trend up">↑ +92 new this week</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Average Revenue / User</span>
        <div class="kpi-val">$58.90</div>
        <span class="kpi-trend up">↑ +4.2% expansion</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Churn Rate</span>
        <div class="kpi-val">0.82%</div>
        <span class="kpi-trend down">↓ Industry benchmark 2%</span>
      </div>
    </div>

    <!-- Live Activity Table -->
    <div class="table-card">
      <div class="table-header">Recent Customer Events</div>
      <table class="data-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Plan</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="events-tbody">
          <tr>
            <td>Alex Rivera</td>
            <td>Enterprise Annual</td>
            <td>$2,388</td>
            <td><span class="pill-status paid">Paid</span></td>
          </tr>
          <tr>
            <td>Elena Rostova</td>
            <td>Growth Pro</td>
            <td>$49</td>
            <td><span class="pill-status paid">Paid</span></td>
          </tr>
          <tr>
            <td>Marcus Vance</td>
            <td>Starter Tier</td>
            <td>$19</td>
            <td><span class="pill-status trial">Trial</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</div>
`,
      css: `
body { margin: 0; font-family: -apple-system, sans-serif; background: #070b14; color: #f8fafc; height: 100vh; overflow: hidden; }
.analytics-app { display: flex; height: 100vh; }
.sidebar { width: 220px; background: #0c1222; border-right: 1px solid rgba(255,255,255,0.06); padding: 24px 16px; box-sizing: border-box; }
.side-logo { font-size: 1.1rem; font-weight: 800; color: #38bdf8; margin-bottom: 30px; }
.side-menu { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
.side-menu li { padding: 10px 14px; border-radius: 8px; color: #94a3b8; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
.side-menu li.active { background: rgba(56,189,248,0.12); color: #38bdf8; }
.main-content { flex: 1; padding: 28px 36px; overflow-y: auto; box-sizing: border-box; }
.content-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
.content-header h2 { margin: 0 0 4px 0; font-size: 1.3rem; font-weight: 700; }
.btn-export { background: #334155; color: #fff; border: none; padding: 8px 16px; border-radius: 8px; font-weight: 600; font-size: 0.8rem; cursor: pointer; }
.kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 28px; }
.kpi-card { background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px; }
.kpi-label { font-size: 0.75rem; color: #94a3b8; font-weight: 600; }
.kpi-val { font-size: 1.8rem; font-weight: 800; color: #fff; margin: 8px 0; }
.kpi-trend { font-size: 0.72rem; font-weight: 700; }
.kpi-trend.up { color: #10b981; }
.kpi-trend.down { color: #38bdf8; }
.table-card { background: #0f172a; border: 1px solid rgba(255,255,255,0.06); border-radius: 14px; padding: 20px; }
.table-header { font-size: 0.95rem; font-weight: 700; margin-bottom: 16px; }
.data-table { width: 100%; border-collapse: collapse; text-align: left; font-size: 0.83rem; }
.data-table th { padding: 10px; color: #64748b; border-bottom: 1px solid rgba(255,255,255,0.06); font-weight: 600; }
.data-table td { padding: 12px 10px; border-bottom: 1px solid rgba(255,255,255,0.04); color: #cbd5e1; }
.pill-status { padding: 3px 8px; border-radius: 12px; font-size: 0.7rem; font-weight: 700; }
.pill-status.paid { background: rgba(16,185,129,0.15); color: #10b981; }
.pill-status.trial { background: rgba(56,189,248,0.15); color: #38bdf8; }
`,
      js: `
setInterval(() => {
  const mrrEl = document.getElementById('val-mrr');
  if (mrrEl) {
    let cur = parseInt(mrrEl.textContent.replace(/[^0-9]/g, ''));
    cur += Math.floor(Math.random() * 20);
    mrrEl.textContent = '$' + cur.toLocaleString();
  }
}, 3000);
`
    }
  };

  const UltraWebCloner = {
    activeTab: 'url',

    open() {
      _play('click');
      const modal = document.getElementById('modal-web-cloner');
      if (modal) {
        modal.classList.add('show');
        this.renderPresets();
      }
    },

    close() {
      _play('click');
      const modal = document.getElementById('modal-web-cloner');
      if (modal) modal.classList.remove('show');
    },

    switchTab(tab) {
      this.activeTab = tab;
      _play('click');
      ['url', 'raw', 'presets'].forEach(t => {
        const pane = document.getElementById('cloner-pane-' + t);
        const btn = document.getElementById('cloner-tab-' + t);
        if (pane) pane.style.display = (t === tab ? 'block' : 'none');
        if (btn) {
          btn.style.background = (t === tab ? '#8b5cf6' : 'transparent');
          btn.style.color = (t === tab ? '#fff' : '#94a3b8');
        }
      });
    },

    renderPresets() {
      const grid = document.getElementById('cloner-presets-grid');
      if (!grid) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      grid.innerHTML = Object.entries(PRESET_CLONES).map(([id, p]) => `
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;transition:border-color .2s;cursor:pointer" onclick="UltraWebCloner.loadPreset('${id}')">
          <div>
            <div style="font-size:2rem;margin-bottom:8px">${p.icon}</div>
            <div style="font-weight:700;color:#fff;font-size:0.95rem;margin-bottom:4px">${p.name}</div>
            <div style="font-size:0.78rem;color:#94a3b8;line-height:1.4">${isFr ? p.descFr : p.descEn}</div>
          </div>
          <button style="margin-top:14px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;border:none;padding:8px 12px;border-radius:8px;font-weight:700;font-size:0.78rem;cursor:pointer">
            ⚡ ${isFr ? 'Cloner & Charger' : 'Clone & Ingest'}
          </button>
        </div>
      `).join('');
    },

    loadPreset(id) {
      const preset = PRESET_CLONES[id];
      if (!preset) return;
      _play('celebrate');
      if (window.UltraConfetti) UltraConfetti.burst(80);

      if (typeof loadAppIntoStudio === 'function') {
        loadAppIntoStudio({
          name: preset.name,
          html: preset.html.trim(),
          css: preset.css.trim(),
          js: preset.js.trim()
        }, true);
      }

      this.close();
      _toast(_it('clonerSuccess', '🎉 Web project successfully cloned and loaded into Studio!'), 'success');
    },

    cleanAndIngestCode(rawCode, sourceUrl, meta) {
      if (!rawCode || !rawCode.trim()) {
        _toast('Please provide valid HTML or code to clone!', 'error');
        return;
      }

      _play('spark');
      let baseOrigin = '';
      try {
        if (sourceUrl && typeof sourceUrl === 'string') {
          const u = sourceUrl.trim().startsWith('http') ? sourceUrl.trim() : 'https://' + sourceUrl.trim();
          if (typeof URL !== 'undefined') {
            baseOrigin = new URL(u).origin;
          } else {
            const m = u.match(/^(https?:\/\/[^\/]+)/i);
            if (m) baseOrigin = m[1];
          }
        }
      } catch(e){}

      // Extract title
      const titleMatch = rawCode.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
      const title = (meta && meta.title) ? meta.title : (titleMatch ? titleMatch[1].replace(/[\n\r]+/g, ' ').trim() : 'Cloned Web App');

      let html = rawCode;
      let css = '';
      let js = '';

      // 1. Strip invasive tracking scripts, tags, iframes, pixels
      html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*(?:google-analytics|gtag|fbq|hotjar|pixel|adsbygoogle|doubleclick)[^<]*<\/script>/gi, '');
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/gi, '');
      html = html.replace(/<div[^>]*(?:cookie|consent|onetrust)[^>]*>[\s\S]*?<\/div>/gi, '');

      // 2. Resolve relative URLs (images, scripts, stylesheets, links) if baseOrigin provided
      if (baseOrigin) {
        html = html.replace(/(src|href)=["'](\/[^"']*)["']/gi, (match, attr, relPath) => {
          return attr + '="' + baseOrigin + relPath + '"';
        });
        if (!html.includes('<base ') && !html.includes('<BASE ')) {
          html = '<base href="' + baseOrigin + '/">\n' + html;
        }
      }

      // 3. Extract <style> blocks
      const styleMatches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
      if (styleMatches) {
        styleMatches.forEach(st => {
          const innerCss = st.replace(/<\/?style[^>]*>/gi, '');
          css += innerCss + '\n';
        });
        html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');
      }

      // 4. Extract safe inline <script> blocks
      const scriptMatches = html.match(/<script[^>]*>([\s\S]*?)<\/script>/gi);
      if (scriptMatches) {
        scriptMatches.forEach(sc => {
          if (!sc.includes('src=')) {
            const innerJs = sc.replace(/<\/?script[^>]*>/gi, '');
            js += innerJs + '\n';
          }
        });
        html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '');
      }

      // 5. If body content present, preserve it along with base tag and stylesheets
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        const baseTag = (html.match(/<base[^>]*>/i) || [''])[0];
        const headLinks = (html.match(/<link[^>]*rel=["']stylesheet["'][^>]*>/gi) || []).join('\n');
        html = (baseTag ? baseTag + '\n' : '') + (headLinks ? headLinks + '\n' : '') + bodyMatch[1];
      }

      // Fallback default clean style if empty
      if (!css.trim()) {
        css = `body { font-family: system-ui, -apple-system, sans-serif; background: #0a0e1a; color: #f1f5f9; padding: 20px; }`;
      }

      if (typeof loadAppIntoStudio === 'function') {
        loadAppIntoStudio({
          name: title,
          html: html.trim(),
          css: css.trim(),
          js: js.trim()
        }, true);
      }

      this.close();
      _play('celebrate');
      if (window.UltraConfetti) UltraConfetti.burst(80);
      _toast(_it('clonerSuccess', '🎉 Web project successfully cloned and loaded into Studio!'), 'success');
    },

    reconstructBrandApp(meta, url) {
      const domain = url ? url.replace(/https?:\/\/(www\.)?/, '').split('/')[0] : 'webapp.io';
      const title = meta?.title || (domain.charAt(0).toUpperCase() + domain.slice(1));
      const desc = meta?.description || ('Official live application for ' + domain);
      const logo = meta?.logo?.url || '';
      const heroImg = meta?.image?.url || '';
      const publisher = meta?.publisher || domain;

      const logoHtml = logo ? `<img src="${logo}" alt="${publisher}" style="height:32px;border-radius:6px;object-fit:contain">` : `⚡ <span style="font-weight:800;font-size:1.2rem;letter-spacing:-0.5px">${publisher.toUpperCase()}</span>`;

      const heroImageHtml = heroImg ? `
        <div style="margin-top:36px;border-radius:16px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.1);max-height:420px">
          <img src="${heroImg}" alt="${title}" style="width:100%;height:auto;object-fit:cover;display:block">
        </div>
      ` : '';

      const html = `
<div class="brand-app-wrap">
  <!-- Navbar -->
  <nav class="brand-nav">
    <div class="brand-nav-left">
      ${logoHtml}
      <span class="brand-title-badge">${publisher}</span>
    </div>
    <div class="brand-nav-links">
      <a href="#features">Features</a>
      <a href="#solutions">Solutions</a>
      <a href="#pricing">Pricing</a>
      <button class="brand-btn-cta" onclick="handleAction('signup')">Get Started</button>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="brand-hero">
    <div class="brand-hero-badge">OFFICIAL CLONE &bull; ${publisher.toUpperCase()}</div>
    <h1 class="brand-headline">${title}</h1>
    <p class="brand-sub">${desc}</p>
    <div class="brand-hero-actions">
      <button class="brand-btn-primary" onclick="handleAction('explore')">Explore ${publisher}</button>
      <button class="brand-btn-secondary" onclick="handleAction('contact')">Contact Sales</button>
    </div>
    ${heroImageHtml}
  </header>

  <!-- Interactive Features Section -->
  <section class="brand-features" id="features">
    <div class="brand-card">
      <div class="card-icon">⚡</div>
      <h3>High Performance</h3>
      <p>Built for scale and lightning-fast responsiveness for ${publisher} users.</p>
    </div>
    <div class="brand-card">
      <div class="card-icon">🛡️</div>
      <h3>Enterprise Security</h3>
      <p>SOC2, GDPR, and automated end-to-end data encryption guaranteed.</p>
    </div>
    <div class="brand-card">
      <div class="card-icon">🚀</div>
      <h3>Global Availability</h3>
      <p>Distributed infrastructure powered by edge networks worldwide.</p>
    </div>
  </section>
</div>
`;

      const css = `
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #090d16;
  color: #f1f5f9;
  min-height: 100vh;
}
.brand-app-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px 60px; }
.brand-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.brand-nav-left { display: flex; align-items: center; gap: 12px; }
.brand-title-badge { font-size: 0.85rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
.brand-nav-links { display: flex; align-items: center; gap: 20px; }
.brand-nav-links a { color: #94a3b8; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: color .2s; }
.brand-nav-links a:hover { color: #fff; }
.brand-btn-cta {
  background: #3b82f6;
  color: #fff;
  border: none;
  padding: 8px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.brand-hero { text-align: center; padding: 60px 0 40px; max-width: 860px; margin: 0 auto; }
.brand-hero-badge {
  display: inline-block;
  background: rgba(59,130,246,0.15);
  color: #60a5fa;
  border: 1px solid rgba(59,130,246,0.3);
  font-size: 0.75rem;
  font-weight: 800;
  padding: 4px 14px;
  border-radius: 20px;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.brand-headline { font-size: 2.8rem; font-weight: 800; line-height: 1.15; margin: 0 0 18px; }
.brand-sub { color: #94a3b8; font-size: 1.15rem; line-height: 1.6; margin: 0 0 32px; }
.brand-hero-actions { display: flex; justify-content: center; gap: 14px; }
.brand-btn-primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: #fff;
  border: none;
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
}
.brand-btn-secondary {
  background: rgba(255,255,255,0.06);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.15);
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
}
.brand-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 60px;
}
.brand-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 24px;
}
.card-icon { font-size: 1.8rem; margin-bottom: 12px; }
.brand-card h3 { margin: 0 0 8px; font-size: 1.1rem; }
.brand-card p { margin: 0; color: #94a3b8; font-size: 0.88rem; line-height: 1.5; }
`;

      const js = `
function handleAction(type) {
  if (window.UltraSoundFX) UltraSoundFX.play('click');
  if (type === 'signup' || type === 'explore') {
    if (window.UltraConfetti) UltraConfetti.burst(50);
  }
  if (typeof showToast === 'function') {
    showToast('Action triggered: ' + type + ' for ${publisher}', 'info');
  } else {
    alert('Action triggered: ' + type + ' for ${publisher}');
  }
}
`;

      return { name: title, html: html.trim(), css: css.trim(), js: js.trim() };
    },

    buildPendingBrandApp() {
      if (!this._pendingUrl) return;
      const app = this.reconstructBrandApp(this._pendingMeta, this._pendingUrl);
      if (typeof loadAppIntoStudio === 'function') {
        loadAppIntoStudio(app, true);
      }
      this.close();
      _play('celebrate');
      if (window.UltraConfetti) UltraConfetti.burst(80);
      _toast(`🎉 Tailored brand clone for ${this._pendingMeta?.publisher || 'site'} loaded!`, 'success');
    },

    async pasteAndIngestFromClipboard() {
      try {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
          _toast('Please paste your code directly into Tab 2 (Paste Raw Code)', 'info');
          this.switchTab('raw');
          return;
        }
        const text = await navigator.clipboard.readText();
        if (!text || text.trim().length < 20) {
          _toast('Clipboard is empty or does not contain HTML! Copy page source first (Ctrl+U)', 'warning');
          return;
        }
        const targetUrl = this._pendingUrl || (document.getElementById('cloner-url-input')?.value) || '';
        this.cleanAndIngestCode(text, targetUrl, this._pendingMeta);
      } catch(e) {
        console.warn('Clipboard read error:', e);
        _toast('Clipboard read blocked. Please paste into Tab 2 (Paste Raw Code)', 'info');
        this.switchTab('raw');
      }
    },

    async pasteClipboardToTextarea() {
      try {
        if (!navigator.clipboard || !navigator.clipboard.readText) {
          _toast('Clipboard API not available. Please press Ctrl+V into the box.', 'info');
          return;
        }
        const text = await navigator.clipboard.readText();
        const ta = document.getElementById('cloner-raw-textarea');
        if (ta) ta.value = text;
        _toast('Pasted from clipboard!', 'success');
      } catch(e) {
        _toast('Please press Ctrl+V directly into the text box.', 'info');
      }
    },

    async fetchAndCloneUrl() {
      const inp = document.getElementById('cloner-url-input');
      let url = inp ? inp.value.trim() : '';
      if (!url) {
        _toast('Please enter a valid website URL!', 'error');
        return;
      }
      if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
        if (inp) inp.value = url;
      }

      _play('click');
      const btn = document.getElementById('btn-cloner-fetch');
      const statusBox = document.getElementById('cloner-url-status');
      if (btn) {
        btn.disabled = true;
        btn.textContent = '⏳ Processing...';
      }

      const domain = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      if (statusBox) {
        statusBox.style.display = 'block';
        statusBox.innerHTML = `
          <div style="background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);border-radius:12px;padding:16px;color:#e2e8f0;font-size:0.85rem">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
              <div style="width:16px;height:16px;border:2px solid #8b5cf6;border-top-color:transparent;border-radius:50%;animation:spin 0.8s linear infinite"></div>
              <b>${_it('clonerStatusScanning', 'Scanning & Decompiling Live Web Entity:')}</b> <code style="color:#a78bfa">${url}</code>
            </div>
            <div style="color:#94a3b8;font-size:0.78rem">${_it('clonerStatusExtracting', 'Extracting live metadata, brand assets & typography...')}</div>
          </div>
        `;
      }

      try {
        // Step 1: Live Brand Asset Extraction via Microlink API
        let meta = null;
        try {
          const mlRes = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}&palette=true`, {
            signal: AbortSignal.timeout(6000)
          });
          if (mlRes.ok) {
            const mlData = await mlRes.json();
            if (mlData && mlData.status === 'success') {
              meta = mlData.data;
            }
          }
        } catch(e) {
          console.warn('Microlink extraction fallback:', e);
        }

        // Step 2: Attempt HTML proxy extraction
        let html = '';
        const proxies = [
          `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
        ];

        for (const p of proxies) {
          try {
            const pRes = await fetch(p, { signal: AbortSignal.timeout(4500) });
            if (pRes.ok) {
              const text = await pRes.text();
              if (text && text.length > 300 && !text.includes('Just a moment...') && !text.includes('Attention Required! | Cloudflare')) {
                html = text;
                break;
              }
            }
          } catch(e){}
        }

        // Case A: Real HTML was successfully obtained
        if (html) {
          this.cleanAndIngestCode(html, url, meta);
          if (statusBox) statusBox.style.display = 'none';
          return;
        }

        // Case B: Protected by Cloudflare / Anti-Bot
        // NEVER LOAD FAKE PRESETS!
        const siteTitle = meta?.title || (domain.charAt(0).toUpperCase() + domain.slice(1));
        const siteDesc = meta?.description || ('Live web application for ' + domain);
        const siteLogo = meta?.logo?.url || '';

        this._pendingMeta = meta || { title: siteTitle, description: siteDesc, url, publisher: domain };
        this._pendingUrl = url;

        if (statusBox) {
          statusBox.style.display = 'block';
          statusBox.innerHTML = `
            <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.12);border-radius:14px;padding:18px">
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:14px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:12px">
                ${siteLogo ? `<img src="${siteLogo}" alt="Logo" style="width:40px;height:40px;border-radius:8px;object-fit:contain;background:rgba(255,255,255,0.05);padding:4px">` : `<div style="font-size:2rem">🌐</div>`}
                <div style="flex:1;min-width:0">
                  <div style="display:flex;align-items:center;gap:8px">
                    <b style="color:#fff;font-size:0.95rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${siteTitle}</b>
                    <span style="background:rgba(239,68,68,0.15);color:#f87171;border:1px solid rgba(239,68,68,0.3);font-size:0.68rem;padding:2px 8px;border-radius:20px;font-weight:700">🛡️ Anti-Bot Active</span>
                  </div>
                  <div style="color:#94a3b8;font-size:0.75rem;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${siteDesc}</div>
                </div>
              </div>

              <div style="color:#cbd5e1;font-size:0.8rem;line-height:1.5;margin-bottom:14px">
                ${isFr ? `Ce site web (<b style="color:#67e8f9">${domain}</b>) utilise une protection <b>Cloudflare Anti-Bot</b>. Choisissez l'une des 2 méthodes réelles :` : `This website (<b style="color:#67e8f9">${domain}</b>) is protected by <b>Cloudflare Bot Management</b>. Choose one of two authentic methods:`}
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
                <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.25);border-radius:10px;padding:14px;display:flex;flex-direction:column;justify-content:space-between">
                  <div>
                    <div style="font-weight:700;color:#c4b5fd;font-size:0.85rem;margin-bottom:4px">✨ ${_it('clonerBtnReconstruct', 'Build Tailored Brand App')}</div>
                    <div style="color:#94a3b8;font-size:0.72rem;line-height:1.4">${isFr ? `Génère l'application sur-mesure avec le logo officiel, le titre et les visuels de <b style="color:#fff">${domain}</b>.` : `Generates a bespoke live application featuring the official logo, title, and brand identity of <b style="color:#fff">${domain}</b>.`}</div>
                  </div>
                  <button onclick="UltraWebCloner.buildPendingBrandApp()" style="margin-top:12px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;border:none;padding:8px 12px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;width:100%">
                    🚀 ${isFr ? 'Générer Clone ' + domain : 'Generate ' + domain + ' Clone'}
                  </button>
                </div>

                <div style="background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.25);border-radius:10px;padding:14px;display:flex;flex-direction:column;justify-content:space-between">
                  <div>
                    <div style="font-weight:700;color:#6ee7b7;font-size:0.85rem;margin-bottom:4px">📋 ${_it('clonerBtnPasteClipboard', 'Paste from Clipboard & Ingest')}</div>
                    <div style="color:#94a3b8;font-size:0.72rem;line-height:1.4">${isFr ? `Ouvrez <a href="${url}" target="_blank" style="color:#38bdf8;text-decoration:underline">${domain} ↗</a>, faites <kbd style="background:#1e293b;padding:1px 4px;border-radius:4px">Ctrl+U</kbd> et cliquez :` : `Open <a href="${url}" target="_blank" style="color:#38bdf8;text-decoration:underline">${domain} ↗</a>, press <kbd style="background:#1e293b;padding:1px 4px;border-radius:4px">Ctrl+U</kbd> and click:`}</div>
                  </div>
                  <button onclick="UltraWebCloner.pasteAndIngestFromClipboard()" style="margin-top:12px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;padding:8px 12px;border-radius:8px;font-size:0.78rem;font-weight:700;cursor:pointer;width:100%">
                    📋 ${isFr ? 'Coller & Charger' : 'Paste & Load'}
                  </button>
                </div>
              </div>
            </div>
          `;
        }
      } catch(err) {
        console.error('Web Cloner fetch error:', err);
        _toast('Error connecting to site: ' + err.message, 'error');
      } finally {
        if (btn) {
          btn.disabled = false;
          btn.textContent = _it('clonerBtnFetch', '🚀 Fetch & Clone URL');
        }
      }
    }
  };

  window.UltraWebCloner = UltraWebCloner;
})();
