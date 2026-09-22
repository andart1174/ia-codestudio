(function(){
'use strict';
const TX={
  en:{
    title:'DEEP SPACE SIMULATOR',sub:'Interplanetary Delay-Tolerant Network Lab',back:'<- Back',copied:'Copied!',
    desc:'Simulate extreme network latency for interplanetary apps. On Mars, an HTTP request takes 4–24 minutes. Test how your UI handles it with AI predictive caching.',
    startBtn:'▶ Launch Simulation',stopBtn:'⏹ Stop',resetBtn:'↺ Reset',injectBtn:'Inject UI Code',copyBtn:'Copy Code',
    planets:{earth:'🌍 Earth (0ms)',moon:'🌕 Moon (1.3s)',mars:'🔴 Mars (3–22 min)',jupiter:'🪐 Jupiter (35–52 min)',voyager:'🛸 Voyager (19h+)'},
    planetLabel:'Target Planet',latencyLabel:'Current Latency',statusLabel:'Network Status',logLabel:'Signal Log',
    predictLabel:'AI Predictive Cache',predictOn:'ON',predictOff:'OFF',
    sending:'📡 Signal sent...',waiting:'⏳ Awaiting response...',received:'✅ Response received!',
    status_idle:'Standing by. Select a planet and launch.',status_running:'Simulation active...',status_done:'Simulation complete.'
  },
  fr:{
    title:'SIMULATEUR DEEP SPACE',sub:'Lab Réseau Tolérant aux Délais Interplanétaires',back:'<- Retour',copied:'Copié!',
    desc:'Simulez une latence réseau extrême pour les applications interplanétaires. Sur Mars, une requête HTTP prend 3 à 22 minutes. Testez comment votre UI gère cela avec le cache prédictif IA.',
    startBtn:'▶ Lancer Simulation',stopBtn:'⏹ Arrêter',resetBtn:'↺ Réinitialiser',injectBtn:'Injecter Code UI',copyBtn:'Copier Code',
    planets:{earth:'🌍 Terre (0ms)',moon:'🌕 Lune (1.3s)',mars:'🔴 Mars (3–22 min)',jupiter:'🪐 Jupiter (35–52 min)',voyager:'🛸 Voyager (19h+)'},
    planetLabel:'Planète Cible',latencyLabel:'Latence Actuelle',statusLabel:'État Réseau',logLabel:'Journal Signal',
    predictLabel:'Cache Prédictif IA',predictOn:'ON',predictOff:'OFF',
    sending:'📡 Signal envoyé...',waiting:'⏳ En attente de réponse...',received:'✅ Réponse reçue!',
    status_idle:'En attente. Sélectionnez une planète et lancez.',status_running:'Simulation active...',status_done:'Simulation terminée.'
  }
};

function gl(){return window.appLang||'en';}

const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='deepspace'){
    window.activeTab='deepspace';
    document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
    const b=document.getElementById('tab-deepspace');if(b)b.classList.add('active');
    window.initDeepSpace(gl());return;
  }
  if(typeof _o==='function')_o(tab);
};

window.initDeepSpace=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const planetData={
    earth:{delay:0,color:'#22d3ee',dist:'0 km',speed:'0 ms'},
    moon:{delay:1300,color:'#94a3b8',dist:'384,400 km',speed:'1.3 s'},
    mars:{delay:12*60*1000,color:'#f87171',dist:'225,000,000 km',speed:'12.5 min'},
    jupiter:{delay:43*60*1000,color:'#fb923c',dist:'628,730,000 km',speed:'43 min'},
    voyager:{delay:19*60*60*1000,color:'#a78bfa',dist:'23,000,000,000 km',speed:'19+ hrs'}
  };
  window._dsPlanetData=planetData;
  window._dsRunning=false;
  window._dsPredict=true;
  window._dsLang=lang;

  el.innerHTML=`
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;">
  <div style="background:linear-gradient(135deg,rgba(56,189,248,0.12),rgba(14,165,233,0.08));border-radius:14px;padding:16px;border:1px solid rgba(56,189,248,0.35);margin-bottom:16px;display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #38bdf8);">🌌</span>
    <div><h2 style="margin:0;color:#38bdf8;font-size:15px;font-weight:900;">${t.title}</h2><p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p></div>
  </div>
  <p style="color:#64748b;font-size:10.5px;margin:0 0 14px;line-height:1.5;">${t.desc}</p>

  <div style="margin-bottom:12px;">
    <label style="color:#38bdf8;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${t.planetLabel}</label>
    <div style="display:flex;flex-direction:column;gap:5px;margin-top:7px;">
      ${Object.entries(planetData).map(([k,v])=>`
      <div onclick="window.dsSelectPlanet('${k}')" id="ds-planet-${k}" style="background:rgba(15,23,42,0.8);border:1px solid ${v.color}33;border-radius:9px;padding:10px 12px;cursor:pointer;transition:all 0.2s;display:flex;justify-content:space-between;align-items:center;" onmouseover="this.style.borderColor='${v.color}'" onmouseout="if(window._dsCurrent!=='${k}')this.style.borderColor='${v.color}33'">
        <span style="color:${v.color};font-size:12px;font-weight:700;">${t.planets[k]}</span>
        <span style="color:#475569;font-size:10px;">${v.speed}</span>
      </div>`).join('')}
    </div>
  </div>

  <div style="display:flex;align-items:center;gap:8px;background:#0f172a;border:1px solid #38bdf822;border-radius:10px;padding:10px 12px;margin-bottom:12px;">
    <span style="color:#38bdf8;font-size:10px;font-weight:700;flex:1;">${t.predictLabel}</span>
    <button id="ds-predict-toggle" onclick="window.dsTogglePredict()" style="padding:5px 12px;border-radius:20px;border:none;background:#22d3ee22;color:#22d3ee;font-size:10px;font-weight:900;cursor:pointer;">${t.predictOn} ✓</button>
  </div>

  <div style="display:flex;gap:6px;margin-bottom:14px;">
    <button onclick="window.dsStart()" style="flex:1;padding:10px;border-radius:8px;background:#0ea5e9;border:none;color:#000;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 0 14px #0ea5e955;">${t.startBtn}</button>
    <button onclick="window.dsStop()" style="padding:10px 10px;border-radius:8px;background:#334155;border:none;color:#94a3b8;font-weight:700;font-size:11px;cursor:pointer;">${t.stopBtn}</button>
    <button onclick="window.dsReset()" style="padding:10px 10px;border-radius:8px;background:#1e293b;border:none;color:#94a3b8;font-weight:700;font-size:11px;cursor:pointer;">${t.resetBtn}</button>
  </div>

  <div style="background:#0f172a;border:1px solid #38bdf822;border-radius:10px;padding:12px;margin-bottom:12px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
      <span style="color:#64748b;font-size:10px;">${t.latencyLabel}: <span id="ds-latency" style="color:#38bdf8;font-weight:800;">—</span></span>
      <span id="ds-status-badge" style="font-size:10px;color:#475569;">${t.status_idle}</span>
    </div>
    <div style="background:#020617;border-radius:6px;height:6px;overflow:hidden;margin-bottom:8px;">
      <div id="ds-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#0ea5e9,#38bdf8);border-radius:6px;transition:width 0.3s;box-shadow:0 0 8px #0ea5e988;"></div>
    </div>
    <div id="ds-signal" style="display:flex;align-items:center;gap:8px;">
      <div id="ds-dot" style="width:8px;height:8px;border-radius:50%;background:#334155;flex-shrink:0;"></div>
      <span id="ds-signal-text" style="color:#475569;font-size:10px;">${t.status_idle}</span>
    </div>
  </div>

  <div style="background:#0f172a;border:1px solid #38bdf811;border-radius:10px;padding:10px 12px;margin-bottom:12px;max-height:120px;overflow-y:auto;" id="ds-log">
    <div style="color:#1e3a5f;font-size:10px;text-align:center;padding-top:15px;">📡 ${t.logLabel}</div>
  </div>

  <div style="display:flex;gap:6px;">
    <button onclick="window.dsInject()" style="flex:1;padding:10px;border-radius:8px;background:#38bdf8;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;">${t.injectBtn}</button>
    <button onclick="window.dsCopy()" style="flex:1;padding:10px;border-radius:8px;background:#0c4a6e;border:none;color:#38bdf8;font-weight:900;font-size:11px;cursor:pointer;">${t.copyBtn}</button>
  </div>
</div>`;

  window._dsCurrent='mars';
  window.dsSelectPlanet('mars');
};

window.dsSelectPlanet=function(key){
  window._dsCurrent=key;
  const pd=window._dsPlanetData;if(!pd)return;
  Object.keys(pd).forEach(k=>{
    const el=document.getElementById('ds-planet-'+k);if(!el)return;
    el.style.borderColor=(k===key)?pd[k].color:pd[k].color+'33';
    el.style.background=(k===key)?pd[k].color+'18':'rgba(15,23,42,0.8)';
  });
  const lat=document.getElementById('ds-latency');
  if(lat)lat.textContent=pd[key].speed;
};

window.dsTogglePredict=function(){
  window._dsPredict=!window._dsPredict;
  const btn=document.getElementById('ds-predict-toggle');
  const lang=window._dsLang||'en';const t=TX[lang]||TX.en;
  if(btn)btn.textContent=window._dsPredict?t.predictOn+' ✓':t.predictOff+' ✗';
};

window.dsStop=function(){window._dsRunning=false;};
window.dsReset=function(){
  window._dsRunning=false;
  const bar=document.getElementById('ds-bar');if(bar)bar.style.width='0%';
  const dot=document.getElementById('ds-dot');if(dot)dot.style.background='#334155';
  const txt=document.getElementById('ds-signal-text');
  const lang=window._dsLang||'en';const t=TX[lang]||TX.en;
  if(txt)txt.textContent=t.status_idle;
  const log=document.getElementById('ds-log');
  if(log)log.innerHTML=`<div style="color:#1e3a5f;font-size:10px;text-align:center;padding-top:15px;">📡 ${t.logLabel}</div>`;
};

function dsLog(msg,color){
  const log=document.getElementById('ds-log');if(!log)return;
  const row=document.createElement('div');
  row.style.cssText=`color:${color||'#64748b'};font-size:10px;padding:2px 0;border-bottom:1px solid #1e293b;`;
  row.textContent='['+(new Date().toLocaleTimeString())+'] '+msg;
  log.appendChild(row);log.scrollTop=log.scrollHeight;
}

window.dsStart=function(){
  if(window._dsRunning)return;
  window._dsRunning=true;
  const lang=window._dsLang||'en';const t=TX[lang]||TX.en;
  const pd=window._dsPlanetData;if(!pd)return;
  const key=window._dsCurrent||'mars';
  const delay=pd[key].delay;
  const steps=20;const stepMs=Math.max(100,Math.min(delay/steps,3000));
  const dot=document.getElementById('ds-dot');
  const txt=document.getElementById('ds-signal-text');
  const bar=document.getElementById('ds-bar');
  if(dot)dot.style.background='#0ea5e9';
  if(txt)txt.textContent=t.sending;
  dsLog(t.sending,'#38bdf8');
  if(window._dsPredict)dsLog('🤖 AI Predictive Cache: pre-loading likely response...','#a78bfa');

  let step=0;
  function tick(){
    if(!window._dsRunning)return;
    step++;
    const pct=Math.min(100,Math.round((step/steps)*100));
    if(bar)bar.style.width=pct+'%';
    if(step===Math.floor(steps/2)){
      if(dot)dot.style.background='#f59e0b';
      if(txt)txt.textContent=t.waiting;
      dsLog(t.waiting,'#fbbf24');
      if(window._dsPredict)dsLog('🤖 AI prediction confidence: '+(Math.floor(Math.random()*30)+70)+'%','#a78bfa');
    }
    if(step>=steps){
      if(dot)dot.style.background='#22c55e';
      if(txt)txt.textContent=t.received;
      dsLog(t.received,'#4ade80');
      dsLog('Round-trip: '+pd[key].speed,'#38bdf8');
      window._dsRunning=false;return;
    }
    setTimeout(tick,stepMs);
  }
  tick();
};

window.dsInject=function(){
  const lang=window._dsLang||'en';const t=TX[lang]||TX.en;
  const key=window._dsCurrent||'mars';
  const pd=window._dsPlanetData||{};
  const info=pd[key]||{speed:'unknown',color:'#38bdf8'};
  const code=`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Deep Space UI</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{background:#020617;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh;align-items:center;justify-content:center;overflow:hidden;}
.orbit{position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,0.05);animation:spin linear infinite;}
@keyframes spin{to{transform:rotate(360deg)}}
.planet{width:80px;height:80px;border-radius:50%;background:radial-gradient(circle at 35% 35%,${info.color},${info.color}55);box-shadow:0 0 40px ${info.color}55;position:relative;z-index:10;}
.signal{position:absolute;width:10px;height:10px;border-radius:50%;background:${info.color};animation:pulse 2s infinite;top:50%;left:50%;transform:translate(-50%,-50%);}
@keyframes pulse{0%,100%{box-shadow:0 0 0 0 ${info.color}88}50%{box-shadow:0 0 0 30px transparent}}
.hud{position:absolute;bottom:40px;text-align:center;}
.hud h2{color:${info.color};font-size:22px;font-weight:900;text-shadow:0 0 20px ${info.color};}
.hud p{color:#64748b;font-size:13px;margin-top:8px;}
.latency{margin-top:15px;background:${info.color}18;border:1px solid ${info.color}44;border-radius:30px;padding:8px 20px;color:${info.color};font-weight:800;font-size:14px;}
</style>
</head><body>
<div class="orbit" style="width:300px;height:300px;animation-duration:20s;"></div>
<div class="orbit" style="width:500px;height:500px;animation-duration:35s;"></div>
<div class="planet"><div class="signal"></div></div>
<div class="hud">
  <h2>📡 Signal: ${t.planets[key]}</h2>
  <p>Delay-Tolerant Networking Active</p>
  <div class="latency">Latency: ${info.speed}</div>
</div>
</body></html>`;
  if(window.editor){window.editor.setValue(code);if(window.runPreview)window.runPreview();}
  if(window.showToast)window.showToast(t.injected||'Injected!');
};

window.dsCopy=function(){
  const lang=window._dsLang||'en';const t=TX[lang]||TX.en;
  const key=window._dsCurrent||'mars';
  const pd=window._dsPlanetData||{};
  const info=pd[key]||{speed:'unknown',color:'#38bdf8'};
  const code=`/* Deep Space Network — Target: ${key} | Latency: ${info.speed} */\n/* Implement delay-tolerant networking patterns for ${info.speed} round-trip */`;
  navigator.clipboard.writeText(code).then(()=>{if(window.showToast)window.showToast(t.copied);});
};

const _oa=window.applyLang;
window.applyLang=function(){
  if(typeof _oa==='function')_oa();
  const l=document.getElementById('lbl-tab-deepspace');
  if(l)l.textContent=gl()==='fr'?'Deep Space':'Deep Space';
  if(window.activeTab==='deepspace')window.initDeepSpace(gl());
};
console.log('🌌 Deep Space Simulator loaded!');
})();
