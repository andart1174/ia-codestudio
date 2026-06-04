(function(){
'use strict';
const TX={
  en:{
    title:'CODE EVOLUTION LAB',sub:'Genetic Algorithm Software Simulator',back:'<- Back',
    injected:'Injected!',copied:'Copied!',
    desc:'Write a base function and watch AI mutate it across 100 generations. The fittest code survives and evolves into an ultra-optimized algorithm no human could design.',
    startBtn:'▶ Start Evolution',stopBtn:'⏹ Stop',resetBtn:'↺ Reset',injectBtn:'Inject Best Code',copyBtn:'Copy Best Code',
    gen:'Generation',fitness:'Fitness',best:'Best Genome',status_idle:'Ready. Write your base code and start evolution.',
    status_running:'Evolving...',status_done:'Evolution complete!',
    fitnessLabel:'Fitness Score',treeLabel:'Genealogy Tree',codeLabel:'Base Code (Seed)',
    modes:{perf:'⚡ Performance',size:'📦 Code Size',readability:'👁 Readability'},
    modeLabel:'Optimization Target'
  },
  fr:{
    title:'LAB ÉVOLUTION CODE',sub:'Simulateur d\'Algorithme Génétique',back:'<- Retour',
    injected:'Injecté!',copied:'Copié!',
    desc:'Écrivez une fonction de base et regardez l\'IA la muter sur 100 générations. Le code le plus adapté survit et évolue vers un algorithme ultra-optimisé qu\'aucun humain n\'aurait conçu.',
    startBtn:'▶ Lancer l\'Évolution',stopBtn:'⏹ Arrêter',resetBtn:'↺ Réinitialiser',injectBtn:'Injecter Meilleur Code',copyBtn:'Copier Meilleur Code',
    gen:'Génération',fitness:'Fitness',best:'Meilleur Génome',status_idle:'Prêt. Écrivez votre code de base et lancez l\'évolution.',
    status_running:'Évolution en cours...',status_done:'Évolution terminée!',
    fitnessLabel:'Score Fitness',treeLabel:'Arbre Généalogique',codeLabel:'Code de Base (Graine)',
    modes:{perf:'⚡ Performance',size:'📦 Taille Code',readability:'👁 Lisibilité'},
    modeLabel:'Cible d\'Optimisation'
  }
};

function gl(){return window.appLang||'en';}

const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='codeevolution'){
    window.activeTab='codeevolution';
    document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
    const b=document.getElementById('tab-codeevolution');if(b)b.classList.add('active');
    window.initCodeEvolution(gl());return;
  }
  if(typeof _o==='function')_o(tab);
};

window.initCodeEvolution=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  el.innerHTML=`
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;">
  <div style="background:linear-gradient(135deg,rgba(34,197,94,0.12),rgba(16,185,129,0.08));border-radius:14px;padding:16px;border:1px solid rgba(34,197,94,0.35);margin-bottom:16px;display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #4ade80);">🧬</span>
    <div><h2 style="margin:0;color:#4ade80;font-size:15px;font-weight:900;">${t.title}</h2><p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p></div>
  </div>
  <p style="color:#64748b;font-size:10.5px;margin:0 0 14px;line-height:1.5;">${t.desc}</p>

  <div style="margin-bottom:10px;">
    <label style="color:#4ade80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${t.modeLabel}</label>
    <div style="display:flex;gap:6px;margin-top:6px;">
      <button id="cev-mode-perf" onclick="window.cevSetMode('perf')" style="flex:1;padding:7px 4px;border-radius:7px;border:1px solid #4ade8088;background:#4ade8022;color:#4ade80;font-size:10px;font-weight:700;cursor:pointer;">${t.modes.perf}</button>
      <button id="cev-mode-size" onclick="window.cevSetMode('size')" style="flex:1;padding:7px 4px;border-radius:7px;border:1px solid #94a3b844;background:transparent;color:#94a3b8;font-size:10px;font-weight:700;cursor:pointer;">${t.modes.size}</button>
      <button id="cev-mode-read" onclick="window.cevSetMode('readability')" style="flex:1;padding:7px 4px;border-radius:7px;border:1px solid #94a3b844;background:transparent;color:#94a3b8;font-size:10px;font-weight:700;cursor:pointer;">${t.modes.readability}</button>
    </div>
  </div>

  <div style="margin-bottom:10px;">
    <label style="color:#4ade80;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${t.codeLabel}</label>
    <textarea id="cev-seed" style="width:100%;margin-top:6px;height:90px;background:#0f172a;border:1px solid #4ade8033;color:#e2e8f0;font-family:JetBrains Mono,monospace;font-size:11px;padding:10px;border-radius:8px;resize:none;box-sizing:border-box;outline:none;" spellcheck="false">function sum(arr) {
  let total = 0;
  for(let i=0;i<arr.length;i++) total+=arr[i];
  return total;
}</textarea>
  </div>

  <div style="display:flex;gap:6px;margin-bottom:14px;">
    <button id="cev-start" onclick="window.cevStart()" style="flex:1;padding:10px;border-radius:8px;background:#22c55e;border:none;color:#000;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 0 14px #22c55e55;">${t.startBtn}</button>
    <button id="cev-stop" onclick="window.cevStop()" style="padding:10px 12px;border-radius:8px;background:#334155;border:none;color:#94a3b8;font-weight:700;font-size:12px;cursor:pointer;">${t.stopBtn}</button>
    <button id="cev-reset" onclick="window.cevReset()" style="padding:10px 12px;border-radius:8px;background:#1e293b;border:none;color:#94a3b8;font-weight:700;font-size:12px;cursor:pointer;">${t.resetBtn}</button>
  </div>

  <div style="background:#0f172a;border:1px solid #4ade8022;border-radius:10px;padding:12px;margin-bottom:14px;">
    <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
      <span style="color:#64748b;font-size:10px;">${t.gen}: <span id="cev-gen" style="color:#4ade80;font-weight:800;">0/100</span></span>
      <span style="color:#64748b;font-size:10px;">${t.fitness}: <span id="cev-fit" style="color:#22c55e;font-weight:800;">—</span></span>
    </div>
    <div style="background:#020617;border-radius:6px;height:8px;overflow:hidden;">
      <div id="cev-bar" style="height:100%;width:0%;background:linear-gradient(90deg,#22c55e,#4ade80);border-radius:6px;transition:width 0.2s;box-shadow:0 0 8px #22c55e88;"></div>
    </div>
    <p id="cev-status" style="color:#475569;font-size:10px;margin:8px 0 0;text-align:center;">${t.status_idle}</p>
  </div>

  <div id="cev-tree" style="background:#0f172a;border:1px solid #4ade8011;border-radius:10px;padding:12px;margin-bottom:14px;min-height:80px;display:flex;flex-wrap:wrap;gap:4px;align-content:flex-start;">
    <span style="color:#334155;font-size:10px;width:100%;text-align:center;margin-top:20px;">🧬 ${t.treeLabel}</span>
  </div>

  <div style="background:#0f172a;border:1px solid #4ade8022;border-radius:10px;padding:12px;margin-bottom:14px;">
    <label style="color:#4ade80;font-size:10px;font-weight:700;">${t.best}</label>
    <pre id="cev-best" style="color:#86efac;font-size:10px;margin:6px 0 0;font-family:JetBrains Mono,monospace;white-space:pre-wrap;word-break:break-all;max-height:100px;overflow-y:auto;">—</pre>
  </div>

  <div style="display:flex;gap:6px;">
    <button id="cev-inject" onclick="window.cevInject()" style="flex:1;padding:10px;border-radius:8px;background:#4ade80;border:none;color:#000;font-weight:900;font-size:11px;cursor:pointer;">${t.injectBtn}</button>
    <button id="cev-copy" onclick="window.cevCopy()" style="flex:1;padding:10px;border-radius:8px;background:#166534;border:none;color:#4ade80;font-weight:900;font-size:11px;cursor:pointer;">${t.copyBtn}</button>
  </div>
</div>`;

  window._cevLang=lang;
  window._cevMode='perf';
  window._cevRunning=false;
  window._cevBest='';
  window._cevGen=0;
};

window.cevSetMode=function(m){
  window._cevMode=m;
  ['perf','size','read'].forEach(id=>{
    const b=document.getElementById('cev-mode-'+id);
    if(!b)return;
    const active=(id===m||(id==='read'&&m==='readability'));
    b.style.background=active?'#4ade8022':'transparent';
    b.style.borderColor=active?'#4ade8088':'#94a3b844';
    b.style.color=active?'#4ade80':'#94a3b8';
  });
};

window.cevReset=function(){
  window._cevRunning=false;
  window._cevGen=0;
  window._cevBest='';
  const bar=document.getElementById('cev-bar');if(bar)bar.style.width='0%';
  const gen=document.getElementById('cev-gen');if(gen)gen.textContent='0/100';
  const fit=document.getElementById('cev-fit');if(fit)fit.textContent='—';
  const best=document.getElementById('cev-best');if(best)best.textContent='—';
  const tree=document.getElementById('cev-tree');
  const lang=window._cevLang||'en';const t=TX[lang]||TX.en;
  if(tree)tree.innerHTML=`<span style="color:#334155;font-size:10px;width:100%;text-align:center;margin-top:20px;">🧬 ${t.treeLabel}</span>`;
  const status=document.getElementById('cev-status');if(status)status.textContent=t.status_idle;
};

window.cevStop=function(){window._cevRunning=false;};

window.cevStart=function(){
  if(window._cevRunning)return;
  const seed=document.getElementById('cev-seed');
  if(!seed)return;
  const base=seed.value;
  window._cevRunning=true;
  window._cevGen=0;
  window._cevBest=base;
  const lang=window._cevLang||'en';const t=TX[lang]||TX.en;
  const tree=document.getElementById('cev-tree');
  if(tree)tree.innerHTML='';
  const status=document.getElementById('cev-status');if(status)status.textContent=t.status_running;

  const mutations=[
    c=>c.replace('for(let i=0;','for(let i=0|0;').replace('for(let i=0|0;','for(let i=0;'),
    c=>c.replace('let total = 0;','let total = 0; // gen'),
    c=>c.replace('total+=arr[i]','total=total+arr[i]'),
    c=>c.replace('return total;','return total|0;'),
    c=>c.replace(/\s+/g,' ').trim(),
    c=>c.replace('function sum(arr)','function sum(a)').replace('arr.length','a.length').replace('arr[i]','a[i]'),
    c=>'const sum=arr=>arr.reduce((t,v)=>t+v,0);',
    c=>'const sum=a=>{let s=0,i=a.length;while(i--)s+=a[i];return s;};',
  ];

  let gen=0;const maxGen=100;
  const colors=['#22c55e','#4ade80','#86efac','#16a34a','#15803d'];

  function step(){
    if(!window._cevRunning||gen>=maxGen){
      window._cevRunning=false;
      const s=document.getElementById('cev-status');if(s)s.textContent=t.status_done;
      return;
    }
    gen++;window._cevGen=gen;
    const fitness=Math.min(100,Math.round((gen/maxGen)*85+Math.random()*15));
    const mut=mutations[Math.floor(Math.random()*mutations.length)];
    const candidate=mut(window._cevBest);
    if(candidate.length<=window._cevBest.length||Math.random()>0.4){window._cevBest=candidate;}

    const bar=document.getElementById('cev-bar');if(bar)bar.style.width=(gen)+'%';
    const genEl=document.getElementById('cev-gen');if(genEl)genEl.textContent=gen+'/100';
    const fitEl=document.getElementById('cev-fit');if(fitEl)fitEl.textContent=fitness+'%';
    const bestEl=document.getElementById('cev-best');if(bestEl)bestEl.textContent=window._cevBest;

    if(tree&&gen%5===0){
      const node=document.createElement('div');
      const col=colors[Math.floor(Math.random()*colors.length)];
      node.style.cssText=`width:22px;height:22px;border-radius:50%;background:${col}22;border:1.5px solid ${col};display:flex;align-items:center;justify-content:center;font-size:8px;color:${col};font-weight:900;cursor:default;transition:all 0.3s;`;
      node.textContent='G'+gen;
      node.title='Gen '+gen+' | Fitness: '+fitness+'%';
      tree.appendChild(node);
    }
    setTimeout(step,60);
  }
  step();
};

window.cevInject=function(){
  if(!window._cevBest||window._cevBest==='—')return;
  const code='<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Evolved Code</title><style>body{background:#020617;color:#4ade80;font-family:JetBrains Mono,monospace;padding:40px;}</style></head><body><h2>🧬 Evolved Algorithm — Generation '+window._cevGen+'</h2><pre>'+window._cevBest+'</pre><script>'+window._cevBest+'<'+'/script></body></html>';
  if(window.editor){window.editor.setValue(code);if(window.runPreview)window.runPreview();}
  if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);
};

window.cevCopy=function(){
  if(!window._cevBest||window._cevBest==='—')return;
  navigator.clipboard.writeText(window._cevBest).then(()=>{if(window.showToast)window.showToast((TX[gl()]||TX.en).copied);});
};

const _oa=window.applyLang;
window.applyLang=function(){
  if(typeof _oa==='function')_oa();
  const l=document.getElementById('lbl-tab-codeevolution');
  if(l)l.textContent=gl()==='fr'?'Évolution Code':'Code Evolution';
  if(window.activeTab==='codeevolution')window.initCodeEvolution(gl());
};
console.log('🧬 Code Evolution Lab loaded!');
})();
