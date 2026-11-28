/**
 * IA Code Studio — 4 Pre-Saved Interactive Showcase Demos ($0.00 API Cost)
 * Runs 100% locally in the browser for non-paying visitors clicking the 4 hero quick-prompt chips.
 * Strictly bilingual EN / FR — zero external API calls.
 */
(function (window) {
  'use strict';

  function getDemos(lang) {
    const isFr = lang === 'fr';

    return {
      saas: {
        id: 'saas',
        title: isFr ? 'PulseMetrics — Tableau de Bord SaaS' : 'PulseMetrics — SaaS Analytics Dashboard',
        summary: isFr
          ? 'Démo interactive complète ($0 API) : KPIs dynamiques, graphique Canvas temps réel par période (7J/30J/1A), filtre clients et export CSV.'
          : 'Complete interactive demo ($0 API): live KPI counters, Canvas revenue chart with 7D/30D/1Y switchers, searchable customer table, and CSV export.',
        dnaUsed: ['IA Cyber-Glass Aesthetic DNA', 'IA Interactive Data & Canvas Charts DNA'],
        html: `<div class="app-shell">
  <aside class="sidebar">
    <div class="brand"><span class="dot"></span> PulseMetrics</div>
    <nav class="nav">
      <button class="nav-item active" data-tab="overview">📊 ${isFr ? 'Vue globale' : 'Overview'}</button>
      <button class="nav-item" data-tab="customers">👥 ${isFr ? 'Clients' : 'Customers'}</button>
      <button class="nav-item" data-tab="revenue">💎 ${isFr ? 'Revenus' : 'Revenue'}</button>
    </nav>
    <div class="side-card">
      <div class="side-label">${isFr ? 'Santé Serveur' : 'System Health'}</div>
      <div class="side-val">99.98% <span>${isFr ? 'En ligne' : 'Online'}</span></div>
      <div class="bar"><div class="bar-fill" style="width:94%"></div></div>
    </div>
  </aside>
  <main class="main">
    <header class="topbar">
      <div>
        <h1>${isFr ? 'Analytique SaaS en Direct' : 'Live SaaS Analytics'}</h1>
        <p>${isFr ? 'Cliquez sur les périodes ou filtrez les clients en temps réel' : 'Switch timeframes or filter customers in real time'}</p>
      </div>
      <div class="controls">
        <div class="seg">
          <button class="seg-btn active" data-range="7d">${isFr ? '7J' : '7D'}</button>
          <button class="seg-btn" data-range="30d">${isFr ? '30J' : '30D'}</button>
          <button class="seg-btn" data-range="1y">${isFr ? '1A' : '1Y'}</button>
        </div>
        <button class="btn-export" id="btn-csv">⬇ CSV</button>
      </div>
    </header>

    <section class="kpi-grid">
      <div class="kpi"><span class="kpi-lbl">MRR</span><strong id="k-mrr">$48,920</strong><em class="up" id="k-mrr-d">+18.4%</em></div>
      <div class="kpi"><span class="kpi-lbl">${isFr ? 'Utilisateurs Actifs' : 'Active Users'}</span><strong id="k-users">14,280</strong><em class="up" id="k-users-d">+11.2%</em></div>
      <div class="kpi"><span class="kpi-lbl">${isFr ? 'Conversion Pro' : 'Pro Conversion'}</span><strong id="k-conv">6.84%</strong><em class="up" id="k-conv-d">+1.4%</em></div>
      <div class="kpi"><span class="kpi-lbl">${isFr ? 'Taux Churn' : 'Monthly Churn'}</span><strong id="k-churn">1.12%</strong><em class="up">-0.3%</em></div>
    </section>

    <section class="chart-card">
      <div class="card-head">
        <h2>${isFr ? 'Croissance du Revenu & Abonnements' : 'Revenue & Subscription Growth'}</h2>
        <span class="pill" id="chart-badge">${isFr ? 'Mise à jour live' : 'Live Canvas Render'}</span>
      </div>
      <canvas id="rev-chart" height="210"></canvas>
    </section>

    <section class="table-card">
      <div class="card-head">
        <h2>${isFr ? 'Derniers Abonnés Pro' : 'Recent Pro Subscribers'}</h2>
        <input type="text" id="cust-search" placeholder="${isFr ? 'Rechercher un client...' : 'Filter customers...'}">
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>${isFr ? 'Client' : 'Customer'}</th><th>Plan</th><th>${isFr ? 'Statut' : 'Status'}</th><th>MRR</th></tr></thead>
          <tbody id="cust-body"></tbody>
        </table>
      </div>
    </section>
  </main>
</div>
<div id="toast" class="toast"></div>`,
        css: `*{box-sizing:border-box;margin:0;padding:0}
body{background:#030712;color:#f8fafc;font-family:'Inter',system-ui,sans-serif;min-height:100vh}
.app-shell{display:grid;grid-template-columns:230px 1fr;min-height:100vh}
.sidebar{background:rgba(15,23,42,.85);border-right:1px solid rgba(255,255,255,.08);padding:22px 16px;display:flex;flex-direction:column;gap:22px}
.brand{font-weight:800;font-size:1.1rem;display:flex;align-items:center;gap:10px;letter-spacing:-.02em}
.brand .dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);box-shadow:0 0 12px #06b6d4}
.nav{display:flex;flex-direction:column;gap:6px}
.nav-item{background:transparent;border:1px solid transparent;color:#94a3b8;padding:10px 12px;border-radius:10px;text-align:left;font-weight:600;font-size:.88rem;cursor:pointer;transition:.2s}
.nav-item.active,.nav-item:hover{background:rgba(139,92,246,.15);border-color:rgba(139,92,246,.35);color:#fff}
.side-card{margin-top:auto;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px}
.side-label{font-size:.72rem;color:#94a3b8;text-transform:uppercase;letter-spacing:.08em}
.side-val{font-size:1.1rem;font-weight:800;margin:6px 0 8px;display:flex;justify-content:space-between;align-items:center}
.side-val span{font-size:.7rem;color:#34d399;background:rgba(16,185,129,.15);padding:2px 8px;border-radius:99px}
.bar{height:6px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,#8b5cf6,#06b6d4)}
.main{padding:26px 28px;display:flex;flex-direction:column;gap:20px;overflow-x:hidden}
.topbar{display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap}
.topbar h1{font-size:1.45rem;font-weight:800}
.topbar p{font-size:.85rem;color:#94a3b8;margin-top:3px}
.controls{display:flex;gap:10px;align-items:center}
.seg{display:flex;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:10px;padding:3px}
.seg-btn{background:transparent;border:none;color:#94a3b8;padding:6px 12px;border-radius:7px;font-weight:700;font-size:.8rem;cursor:pointer}
.seg-btn.active{background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff}
.btn-export{background:rgba(16,185,129,.15);border:1px solid rgba(16,185,129,.4);color:#6ee7b7;padding:8px 14px;border-radius:10px;font-weight:700;font-size:.82rem;cursor:pointer}
.kpi-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
.kpi{background:rgba(15,23,42,.75);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:6px}
.kpi-lbl{font-size:.76rem;color:#94a3b8;font-weight:600;text-transform:uppercase;letter-spacing:.06em}
.kpi strong{font-size:1.55rem;font-weight:800;letter-spacing:-.02em}
.kpi em{font-style:normal;font-size:.78rem;font-weight:700;color:#34d399}
.chart-card,.table-card{background:rgba(15,23,42,.75);border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:20px}
.card-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.card-head h2{font-size:1rem;font-weight:700}
.pill{font-size:.74rem;padding:4px 10px;border-radius:99px;background:rgba(6,182,212,.14);color:#67e8f9;font-weight:700}
#rev-chart{width:100%;display:block}
#cust-search{background:rgba(2,6,23,.8);border:1px solid rgba(255,255,255,.12);color:#fff;padding:8px 12px;border-radius:10px;font-size:.84rem;outline:none;min-width:200px}
#cust-search:focus{border-color:#8b5cf6}
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse;font-size:.86rem}
th,td{padding:11px 10px;text-align:left;border-bottom:1px solid rgba(255,255,255,.06)}
th{color:#94a3b8;font-size:.75rem;text-transform:uppercase;letter-spacing:.06em}
.badge{padding:3px 9px;border-radius:99px;font-size:.72rem;font-weight:700;background:rgba(16,185,129,.15);color:#34d399}
.badge.trial{background:rgba(245,158,11,.15);color:#fbbf24}
.toast{position:fixed;bottom:20px;right:20px;background:#0f172a;border:1px solid #10b981;color:#fff;padding:12px 18px;border-radius:12px;font-size:.84rem;font-weight:700;opacity:0;transform:translateY(10px);transition:.25s;pointer-events:none}
.toast.show{opacity:1;transform:translateY(0)}
@media(max-width:860px){.app-shell{grid-template-columns:1fr}.sidebar{display:none}.kpi-grid{grid-template-columns:repeat(2,1fr)}}`,
        js: `const DATA = {
  '7d':  { mrr:'$48,920', mrrD:'+18.4%', users:'14,280', usersD:'+11.2%', conv:'6.84%', convD:'+1.4%', churn:'1.12%', pts:[31,36,34,42,45,48,54], lbl:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] },
  '30d': { mrr:'$194,600', mrrD:'+24.1%', users:'42,910', usersD:'+19.6%', conv:'7.35%', convD:'+2.1%', churn:'0.98%', pts:[22,28,31,39,44,49,58,64,71,79], lbl:['W1','W2','W3','W4','W5','W6','W7','W8','W9','W10'] },
  '1y':  { mrr:'$1.84M', mrrD:'+142%', users:'218,400', usersD:'+89.3%', conv:'8.12%', convD:'+3.4%', churn:'0.84%', pts:[14,19,25,33,40,48,55,63,72,81,88,96], lbl:['J','F','M','A','M','J','J','A','S','O','N','D'] }
};
const CUSTOMERS = [
  { name:'NovaCraft Labs', plan:'Creator Pro', status:'Active', mrr:'$290' },
  { name:'Studio Lumière Paris', plan:'Enterprise 3D', status:'Active', mrr:'$490' },
  { name:'Vortex AI Systems', plan:'Creator Pro', status:'Active', mrr:'$190' },
  { name:'PixelForge Agency', plan:'Team Scale', status:'Trial', mrr:'$120' },
  { name:'Aether Dynamics', plan:'Enterprise 3D', status:'Active', mrr:'$640' }
];
let curRange = '7d';
function toast(msg){ const t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2400); }
function renderTable(q=''){
  const body=document.getElementById('cust-body');
  const rows=CUSTOMERS.filter(c=>(c.name+c.plan+c.status).toLowerCase().includes(q.toLowerCase()));
  body.innerHTML=rows.map(c=>'<tr><td><strong>'+c.name+'</strong></td><td>'+c.plan+'</td><td><span class="badge '+(c.status==='Trial'?'trial':'')+'">'+c.status+'</span></td><td><strong>'+c.mrr+'</strong></td></tr>').join('');
}
function drawChart(range){
  const d=DATA[range]; const c=document.getElementById('rev-chart'); const ctx=c.getContext('2d');
  const w=c.width=c.parentElement.clientWidth-40; const h=c.height=210;
  ctx.clearRect(0,0,w,h);
  const pad=28, max=Math.max(...d.pts)*1.12;
  ctx.strokeStyle='rgba(255,255,255,0.06)'; ctx.lineWidth=1;
  for(let i=0;i<4;i++){ const y=pad+(h-pad*2)*(i/3); ctx.beginPath(); ctx.moveTo(pad,y); ctx.lineTo(w-12,y); ctx.stroke(); }
  const step=(w-pad-20)/(d.pts.length-1);
  const grad=ctx.createLinearGradient(0,pad,0,h-pad); grad.addColorStop(0,'rgba(139,92,246,0.42)'); grad.addColorStop(1,'rgba(6,182,212,0.0)');
  ctx.beginPath();
  d.pts.forEach((v,i)=>{ const x=pad+i*step, y=h-pad-(v/max)*(h-pad*2); if(i===0)ctx.moveTo(x,y); else ctx.lineTo(x,y); });
  ctx.lineTo(pad+(d.pts.length-1)*step,h-pad); ctx.lineTo(pad,h-pad); ctx.closePath(); ctx.fillStyle=grad; ctx.fill();
  ctx.beginPath();
  d.pts.forEach((v,i)=>{ const x=pad+i*step, y=h-pad-(v/max)*(h-pad*2); if(i===0)ctx.moveTo(x,y); else ctx.lineTo(x,y); });
  ctx.strokeStyle='#38bdf8'; ctx.lineWidth=3; ctx.stroke();
  d.pts.forEach((v,i)=>{ const x=pad+i*step, y=h-pad-(v/max)*(h-pad*2); ctx.beginPath(); ctx.arc(x,y,4.5,0,Math.PI*2); ctx.fillStyle='#c4b5fd'; ctx.fill(); ctx.fillStyle='#94a3b8'; ctx.font='11px Inter,sans-serif'; ctx.fillText(d.lbl[i],x-8,h-8); });
}
function updateRange(r){
  curRange=r; const d=DATA[r];
  document.getElementById('k-mrr').textContent=d.mrr; document.getElementById('k-mrr-d').textContent=d.mrrD;
  document.getElementById('k-users').textContent=d.users; document.getElementById('k-users-d').textContent=d.usersD;
  document.getElementById('k-conv').textContent=d.conv; document.getElementById('k-conv-d').textContent=d.convD;
  document.getElementById('k-churn').textContent=d.churn;
  drawChart(r);
}
document.querySelectorAll('.seg-btn').forEach(b=>b.addEventListener('click',()=>{ document.querySelectorAll('.seg-btn').forEach(x=>x.classList.remove('active')); b.classList.add('active'); updateRange(b.dataset.range); }));
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>{ document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active')); b.classList.add('active'); toast('${isFr ? 'Vue active :' : 'Switched view:'} '+b.textContent.trim()); }));
document.getElementById('cust-search').addEventListener('input',e=>renderTable(e.target.value));
document.getElementById('btn-csv').addEventListener('click',()=>toast('${isFr ? '✓ Rapport CSV généré !' : '✓ CSV report exported!'}'));
window.addEventListener('resize',()=>drawChart(curRange));
renderTable(); updateRange('7d');`
      },

      landing: {
        id: 'landing',
        title: isFr ? 'AetherAI — Landing Page Startup Interactive' : 'AetherAI — Interactive Startup Landing Page',
        summary: isFr
          ? 'Démo interactive complète ($0 API) : champ d’étoiles Canvas 60 FPS réactif à la souris, calculateur de gain de temps et formulaire waitlist.'
          : 'Complete interactive demo ($0 API): 60 FPS cursor-reactive particle starfield hero, interactive ROI calculator slider, and live waitlist signup.',
        dnaUsed: ['IA Cyber-Glass Aesthetic DNA', 'IA Three.js WebGL 60 FPS DNA'],
        html: `<canvas id="bg-stars"></canvas>
<div class="wrap">
  <nav class="nav">
    <div class="logo">✦ AetherAI</div>
    <div class="links"><a href="#features">${isFr ? 'Fonctions' : 'Features'}</a><a href="#roi">${isFr ? 'Calculateur' : 'ROI'}</a><a href="#join" class="cta-sm">${isFr ? 'Rejoindre' : 'Get Access'}</a></div>
  </nav>
  <header class="hero">
    <span class="badge">⚡ ${isFr ? 'MOTEUR IA NOUVELLE GÉNÉRATION' : 'NEXT-GEN AI LAUNCH ENGINE'}</span>
    <h1>${isFr ? 'Lancez vos produits 10x plus vite avec des interfaces 3D.' : 'Ship web products 10x faster with live 3D interfaces.'}</h1>
    <p>${isFr ? 'Déplacez votre souris sur le fond interactif, estimez vos gains ci-dessous et testez la liste d’attente en direct.' : 'Move your cursor across the live particle field, test the interactive ROI calculator below, and join the waitlist.'}</p>
    <form class="waitlist" id="wl-form">
      <input type="email" id="wl-email" required placeholder="${isFr ? 'votre@email.com' : 'you@company.com'}">
      <button type="submit">${isFr ? 'Accès Anticipé →' : 'Join Waitlist →'}</button>
    </form>
    <div id="wl-msg" class="wl-msg"></div>
  </header>
  <section id="features" class="bento">
    <div class="card"><span>⚡</span><h3>${isFr ? 'Déploiement 60 FPS' : '60 FPS Performance'}</h3><p>${isFr ? 'Zéro dépendance lourde, animations fluides sur mobile et desktop.' : 'Zero heavy bloat with silky animations across mobile and desktop.'}</p></div>
    <div class="card"><span>🧠</span><h3>${isFr ? 'Architecture IA' : 'Neural Architecture'}</h3><p>${isFr ? 'Du texte brut au code propre HTML, CSS et JavaScript prêt à héberger.' : 'From plain language to clean, production HTML, CSS, and JavaScript.'}</p></div>
    <div class="card"><span>🔒</span><h3>${isFr ? '100% Propriétaire' : '100% Code Ownership'}</h3><p>${isFr ? 'Exportez votre projet complet et hébergez-le où vous voulez.' : 'Export standalone source code and host anywhere with zero lock-in.'}</p></div>
  </section>
  <section id="roi" class="roi-box">
    <h2>${isFr ? 'Calculateur de Temps Économisé' : 'Interactive Time Saved Calculator'}</h2>
    <p>${isFr ? 'Projets lancés par mois :' : 'Projects shipped per month:'} <strong id="proj-val">4</strong></p>
    <input type="range" id="proj-slider" min="1" max="20" value="4">
    <div class="roi-stats">
      <div><span id="hrs-saved">96h</span><small>${isFr ? 'Heures gagnées / mois' : 'Hours saved / month'}</small></div>
      <div><span id="usd-saved">$4,800</span><small>${isFr ? 'Valeur estimée / mois' : 'Estimated value / mo'}</small></div>
    </div>
  </section>
</div>`,
        css: `*{box-sizing:border-box;margin:0;padding:0}
body{background:#020617;color:#f8fafc;font-family:'Inter',system-ui,sans-serif;overflow-x:hidden;min-height:100vh}
#bg-stars{position:fixed;inset:0;width:100%;height:100%;z-index:0}
.wrap{position:relative;z-index:2;max-width:1040px;margin:0 auto;padding:24px 22px 60px}
.nav{display:flex;justify-content:space-between;align-items:center;padding:12px 18px;background:rgba(15,23,42,.68);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.09);border-radius:16px}
.logo{font-weight:900;font-size:1.1rem;background:linear-gradient(90deg,#c084fc,#38bdf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.links{display:flex;gap:18px;align-items:center}
.links a{color:#cbd5e1;text-decoration:none;font-size:.86rem;font-weight:600}
.cta-sm{background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff !important;padding:7px 14px;border-radius:10px}
.hero{text-align:center;padding:64px 10px 44px}
.badge{display:inline-block;padding:6px 14px;border-radius:99px;background:rgba(139,92,246,.16);border:1px solid rgba(139,92,246,.38);color:#ddd6fe;font-size:.74rem;font-weight:800;letter-spacing:.08em}
.hero h1{font-size:clamp(2rem,4.5vw,3.4rem);font-weight:900;line-height:1.12;margin:18px auto 14px;max-width:780px;background:linear-gradient(180deg,#fff,#94a3b8);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{color:#94a3b8;max-width:600px;margin:0 auto 26px;font-size:1rem;line-height:1.6}
.waitlist{display:flex;gap:10px;max-width:480px;margin:0 auto;background:rgba(15,23,42,.82);padding:6px;border-radius:14px;border:1px solid rgba(255,255,255,.12)}
.waitlist input{flex:1;background:transparent;border:none;color:#fff;padding:10px 14px;font-size:.92rem;outline:none}
.waitlist button{background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:none;color:#fff;padding:11px 18px;border-radius:10px;font-weight:800;cursor:pointer;white-space:nowrap}
.wl-msg{margin-top:12px;font-size:.86rem;font-weight:700;color:#34d399;min-height:20px}
.bento{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:24px 0 32px}
.card{background:rgba(15,23,42,.74);border:1px solid rgba(255,255,255,.09);border-radius:18px;padding:22px;backdrop-filter:blur(10px);transition:.25s}
.card:hover{transform:translateY(-4px);border-color:rgba(139,92,246,.45)}
.card span{font-size:1.6rem;display:block;margin-bottom:10px}
.card h3{font-size:1.02rem;margin-bottom:6px}
.card p{color:#94a3b8;font-size:.86rem;line-height:1.6}
.roi-box{background:linear-gradient(135deg,rgba(139,92,246,.14),rgba(6,182,212,.1));border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:28px;text-align:center}
.roi-box h2{font-size:1.3rem;margin-bottom:8px}
.roi-box p{color:#cbd5e1;margin-bottom:12px}
#proj-slider{width:100%;max-width:440px;accent-color:#8b5cf6;cursor:pointer}
.roi-stats{display:flex;justify-content:center;gap:40px;margin-top:20px;flex-wrap:wrap}
.roi-stats span{display:block;font-size:2rem;font-weight:900;color:#38bdf8}
.roi-stats small{color:#94a3b8;font-size:.8rem}
@media(max-width:740px){.bento{grid-template-columns:1fr}.waitlist{flex-direction:column}}`,
        js: `const canvas=document.getElementById('bg-stars'), ctx=canvas.getContext('2d');
let W,H,mx=-999,my=-999; const pts=Array.from({length:75},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0006,vy:(Math.random()-.5)*.0006,r:1.5+Math.random()*2}));
function resize(){ W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight; }
window.addEventListener('resize',resize); resize();
window.addEventListener('mousemove',e=>{ mx=e.clientX; my=e.clientY; });
function tick(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x=(p.x+p.vx+1)%1; p.y=(p.y+p.vy+1)%1;
    const px=p.x*W, py=p.y*H;
    const dx=mx-px, dy=my-py, dist=Math.hypot(dx,dy);
    if(dist<150){ ctx.strokeStyle='rgba(56,189,248,'+(1-dist/150)*.45+')'; ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(mx,my); ctx.stroke(); }
    ctx.beginPath(); ctx.arc(px,py,p.r,0,Math.PI*2); ctx.fillStyle='rgba(196,181,253,0.75)'; ctx.fill();
  });
  requestAnimationFrame(tick);
}
tick();
const sl=document.getElementById('proj-slider');
sl.addEventListener('input',()=>{ const v=+sl.value; document.getElementById('proj-val').textContent=v; document.getElementById('hrs-saved').textContent=(v*24)+'h'; document.getElementById('usd-saved').textContent='$'+(v*1200).toLocaleString(); });
document.getElementById('wl-form').addEventListener('submit',e=>{ e.preventDefault(); const em=document.getElementById('wl-email').value; document.getElementById('wl-msg').textContent='${isFr ? '✓ Merci ! Invitation réservée pour ' : '✓ Spot reserved for '}'+em; e.target.reset(); });`
      },

      pricing: {
        id: 'pricing',
        title: isFr ? 'Matrice de Tarifs SaaS Interactive' : 'Interactive 3-Tier SaaS Pricing Matrix',
        summary: isFr
          ? 'Démo interactive complète ($0 API) : bascule Mensuel/Annuel (-20%), curseur d’équipe dynamique et modale de sélection de plan.'
          : 'Complete interactive demo ($0 API): Monthly/Annual (-20%) animated billing switch, dynamic seat slider, and instant checkout preview modal.',
        dnaUsed: ['IA Cyber-Glass Aesthetic DNA', 'IA Full Working State & LocalStorage DB DNA'],
        html: `<div class="page">
  <header class="head">
    <span class="tag">${isFr ? 'TARIFICATION TRANSPARENTE' : 'TRANSPARENT PRICING'}</span>
    <h1>${isFr ? 'Choisissez le plan adapté à votre croissance' : 'Simple pricing that scales with your team'}</h1>
    <div class="switch-row">
      <span id="lbl-mo" class="active">${isFr ? 'Mensuel' : 'Monthly'}</span>
      <button type="button" id="bill-toggle" class="toggle" aria-label="Toggle billing"><span class="knob"></span></button>
      <span id="lbl-yr">${isFr ? 'Annuel' : 'Annual'} <em>-20%</em></span>
    </div>
    <div class="seats-bar">
      <label>${isFr ? 'Membres de l’équipe :' : 'Team seats:'} <strong id="seats-num">3</strong></label>
      <input type="range" id="seats-slider" min="1" max="20" value="3">
    </div>
  </header>
  <section class="grid">
    <article class="plan">
      <div class="tier">Starter</div>
      <div class="price"><span class="amt" data-mo="0" data-yr="0">$0</span><small>/${isFr ? 'mois' : 'mo'}</small></div>
      <ul><li>✓ ${isFr ? 'Aperçu live illimité' : 'Unlimited live previews'}</li><li>✓ ${isFr ? '10+ outils développeurs' : '10+ offline developer tools'}</li><li>✓ ${isFr ? 'Export communautaire' : 'Community templates'}</li></ul>
      <button class="btn ghost" data-plan="Starter">${isFr ? 'Commencer Gratuit' : 'Start Free'}</button>
    </article>
    <article class="plan popular">
      <div class="ribbon">★ ${isFr ? 'LE PLUS POPULAIRE' : 'MOST POPULAR'}</div>
      <div class="tier">Creator Pro</div>
      <div class="price"><span class="amt" data-mo="10" data-yr="8">$10</span><small>/${isFr ? 'mois' : 'mo'}</small></div>
      <ul><li>✓ ${isFr ? 'IA Gemini Pro illimitée' : 'Google Gemini Neural Architect'}</li><li>✓ ${isFr ? 'Boost 3D WebGL & Shaders' : '3D WebGL Boost & Shaders'}</li><li>✓ ${isFr ? 'Export ZIP / React / Vue' : 'Unlimited ZIP, React & Vue export'}</li><li>✓ ${isFr ? 'Auto-réparation du code' : 'Automatic JS Auto-Repair'}</li></ul>
      <button class="btn primary" data-plan="Creator Pro">${isFr ? 'Activer Creator Pro' : 'Choose Creator Pro'}</button>
    </article>
    <article class="plan">
      <div class="tier">Scale Studio</div>
      <div class="price"><span class="amt scale-amt" data-mo="29" data-yr="23">$87</span><small>/${isFr ? 'mois' : 'mo'}</small></div>
      <ul><li>✓ ${isFr ? 'Tous les avantages Pro' : 'Everything in Creator Pro'}</li><li>✓ <span id="seat-feat">3</span> ${isFr ? 'sièges collaborateurs' : 'team seats included'}</li><li>✓ ${isFr ? 'Support prioritaire 24/7' : 'Priority 24/7 engineering support'}</li></ul>
      <button class="btn ghost" data-plan="Scale Studio">${isFr ? 'Sélectionner Scale' : 'Choose Scale Studio'}</button>
    </article>
  </section>
  <div id="confirm" class="confirm"></div>
</div>`,
        css: `*{box-sizing:border-box;margin:0;padding:0}
body{background:radial-gradient(circle at top,#1e1b4b,#030712 65%);color:#f8fafc;font-family:'Inter',system-ui,sans-serif;min-height:100vh;padding:36px 20px}
.page{max-width:1020px;margin:0 auto}
.head{text-align:center;margin-bottom:34px}
.tag{font-size:.74rem;font-weight:800;letter-spacing:.1em;color:#38bdf8;background:rgba(56,189,248,.12);padding:5px 12px;border-radius:99px}
.head h1{font-size:clamp(1.7rem,3.6vw,2.5rem);font-weight:900;margin:14px 0 20px}
.switch-row{display:inline-flex;align-items:center;gap:12px;font-size:.9rem;font-weight:700;color:#94a3b8}
.switch-row span.active{color:#fff}
.switch-row em{font-style:normal;background:rgba(16,185,129,.18);color:#34d399;padding:2px 8px;border-radius:99px;font-size:.74rem;margin-left:4px}
.toggle{width:54px;height:28px;border-radius:99px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:3px;cursor:pointer;position:relative}
.knob{display:block;width:20px;height:20px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);transition:.25s}
.toggle.annual .knob{transform:translateX(26px)}
.seats-bar{margin:18px auto 0;max-width:340px;background:rgba(15,23,42,.7);border:1px solid rgba(255,255,255,.08);padding:12px 16px;border-radius:14px;display:flex;flex-direction:column;gap:8px;font-size:.84rem;color:#cbd5e1}
.seats-bar input{accent-color:#8b5cf6;cursor:pointer}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;align-items:stretch}
.plan{background:rgba(15,23,42,.78);border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:26px 22px;display:flex;flex-direction:column;position:relative;transition:.25s}
.plan:hover{transform:translateY(-4px)}
.plan.popular{border-color:#8b5cf6;box-shadow:0 0 36px rgba(139,92,246,.22);background:linear-gradient(180deg,rgba(139,92,246,.14),rgba(15,23,42,.88))}
.ribbon{position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff;font-size:.7rem;font-weight:800;padding:4px 12px;border-radius:99px;white-space:nowrap}
.tier{font-size:1.05rem;font-weight:800;margin-bottom:8px}
.price{font-size:2.4rem;font-weight:900;margin-bottom:18px}
.price small{font-size:.9rem;color:#94a3b8;font-weight:500}
.plan ul{list-style:none;display:flex;flex-direction:column;gap:10px;color:#cbd5e1;font-size:.88rem;margin-bottom:24px;flex:1}
.btn{padding:12px;border-radius:12px;font-weight:800;font-size:.9rem;cursor:pointer;border:none;transition:.2s}
.btn.primary{background:linear-gradient(135deg,#8b5cf6,#06b6d4);color:#fff}
.btn.ghost{background:rgba(255,255,255,.07);color:#fff;border:1px solid rgba(255,255,255,.14)}
.confirm{margin-top:22px;text-align:center;color:#34d399;font-weight:700;font-size:.92rem;min-height:24px}
@media(max-width:780px){.grid{grid-template-columns:1fr}}`,
        js: `let annual=false, seats=3;
function refreshPrices(){
  document.querySelectorAll('.amt').forEach(el=>{
    const base=annual ? +el.dataset.yr : +el.dataset.mo;
    const val=el.classList.contains('scale-amt') ? base*seats : base;
    el.textContent='$'+val;
  });
  document.getElementById('seats-num').textContent=seats;
  document.getElementById('seat-feat').textContent=seats;
}
document.getElementById('bill-toggle').addEventListener('click',function(){
  annual=!annual; this.classList.toggle('annual',annual);
  document.getElementById('lbl-mo').classList.toggle('active',!annual);
  document.getElementById('lbl-yr').classList.toggle('active',annual);
  refreshPrices();
});
document.getElementById('seats-slider').addEventListener('input',e=>{ seats=+e.target.value; refreshPrices(); });
document.querySelectorAll('.btn').forEach(b=>b.addEventListener('click',()=>{
  const cycle=annual ? '${isFr ? 'Annuel (-20%)' : 'Annual (-20%)'}' : '${isFr ? 'Mensuel' : 'Monthly'}';
  document.getElementById('confirm').textContent='✓ '+b.dataset.plan+' ('+cycle+') ${isFr ? 'sélectionné !' : 'selected!'}';
}));
refreshPrices();`
      },

      contact: {
        id: 'contact',
        title: isFr ? 'Studio Contact & Réservation Glass UI' : 'Glassmorphism Contact & Booking Studio',
        summary: isFr
          ? 'Démo interactive complète ($0 API) : design verre dépoli, sélecteur de créneaux horaires, validation temps réel et récapitulatif animé.'
          : 'Complete interactive demo ($0 API): frosted glassmorphism UI, live meeting slot picker, instant form validation, and animated confirmation card.',
        dnaUsed: ['IA Cyber-Glass Aesthetic DNA', 'IA Full Working State & LocalStorage DB DNA'],
        html: `<div class="bg-orb o1"></div><div class="bg-orb o2"></div>
<main class="shell">
  <section class="glass-card">
    <div class="left">
      <span class="eyebrow">✨ ${isFr ? 'PARLONS DE VOTRE PROJET' : "LET'S BUILD TOGETHER"}</span>
      <h1>${isFr ? 'Réservez une démo ou envoyez un message' : 'Book a live session or send a message'}</h1>
      <p>${isFr ? 'Réponse garantie sous 2 heures. Choisissez un créneau horaire directement ci-dessous.' : 'Guaranteed response under 2 hours. Pick a live slot or drop your project brief.'}</p>
      <div class="slots-title">${isFr ? 'Créneaux disponibles aujourd’hui' : 'Available Slots Today'}</div>
      <div class="slots" id="slot-grid">
        <button type="button" class="slot active">10:00</button>
        <button type="button" class="slot">11:30</button>
        <button type="button" class="slot">14:00</button>
        <button type="button" class="slot">16:30</button>
      </div>
      <div class="info"><span>📍 Paris &amp; Remote</span><span>⚡ 24/7 Support</span></div>
    </div>
    <form class="right" id="contact-form">
      <label>${isFr ? 'Nom complet' : 'Full Name'}<input type="text" id="c-name" required placeholder="Alex Rivera"></label>
      <label>Email<input type="email" id="c-email" required placeholder="alex@studio.com"></label>
      <label>${isFr ? 'Sujet du projet' : 'Project Brief'}<textarea id="c-msg" rows="3" required placeholder="${isFr ? 'Application SaaS, vitrine 3D WebGL...' : 'SaaS web app, 3D WebGL showcase...'}"></textarea></label>
      <button type="submit" class="send-btn">${isFr ? 'Confirmer le créneau' : 'Confirm Slot'} (<span id="chosen-slot">10:00</span>) →</button>
      <div id="c-status" class="status"></div>
    </form>
  </section>
</main>`,
        css: `*{box-sizing:border-box;margin:0;padding:0}
body{background:#030712;color:#f8fafc;font-family:'Inter',system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;overflow-x:hidden}
.bg-orb{position:fixed;border-radius:50%;filter:blur(90px);opacity:.45;pointer-events:none}
.o1{width:340px;height:340px;background:#8b5cf6;top:-80px;left:-60px}
.o2{width:360px;height:360px;background:#06b6d4;bottom:-90px;right:-60px}
.shell{position:relative;z-index:2;width:100%;max-width:860px}
.glass-card{display:grid;grid-template-columns:1fr 1fr;gap:28px;background:rgba(15,23,42,.66);backdrop-filter:blur(22px);border:1px solid rgba(255,255,255,.12);border-radius:26px;padding:34px;box-shadow:0 24px 60px rgba(0,0,0,.5)}
.eyebrow{font-size:.74rem;font-weight:800;letter-spacing:.08em;color:#67e8f9}
.left h1{font-size:1.7rem;font-weight:900;line-height:1.2;margin:10px 0 12px}
.left p{color:#94a3b8;font-size:.9rem;line-height:1.6;margin-bottom:20px}
.slots-title{font-size:.76rem;text-transform:uppercase;letter-spacing:.08em;color:#cbd5e1;font-weight:700;margin-bottom:10px}
.slots{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:22px}
.slot{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#e2e8f0;padding:10px;border-radius:11px;font-weight:700;cursor:pointer;transition:.2s}
.slot.active,.slot:hover{background:rgba(139,92,246,.25);border-color:#a78bfa;color:#fff}
.info{display:flex;gap:14px;font-size:.8rem;color:#94a3b8}
.right{display:flex;flex-direction:column;gap:14px}
.right label{display:flex;flex-direction:column;gap:6px;font-size:.8rem;font-weight:700;color:#cbd5e1}
.right input,.right textarea{background:rgba(2,6,23,.65);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:11px 13px;color:#fff;font-family:inherit;font-size:.88rem;outline:none}
.right input:focus,.right textarea:focus{border-color:#38bdf8}
.send-btn{margin-top:4px;background:linear-gradient(135deg,#8b5cf6,#06b6d4);border:none;color:#fff;padding:13px;border-radius:12px;font-weight:800;font-size:.92rem;cursor:pointer}
.status{font-size:.84rem;font-weight:700;color:#34d399;min-height:20px;text-align:center}
@media(max-width:720px){.glass-card{grid-template-columns:1fr;padding:24px}}`,
        js: `let slot='10:00';
document.querySelectorAll('.slot').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.slot').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); slot=b.textContent; document.getElementById('chosen-slot').textContent=slot;
}));
document.getElementById('contact-form').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('c-name').value;
  document.getElementById('c-status').textContent='✓ ${isFr ? 'Confirmé pour ' : 'Confirmed for '}'+n+' ('+slot+')!';
  e.target.reset();
});`
      }
    };
  }

  window.IANeuralDemos = { getDemos };
})(window);
