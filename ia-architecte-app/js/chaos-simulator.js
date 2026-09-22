/**
 * Chaos Simulator — EN/FR
 */
(function(){
'use strict';
var T={
  en:{tab:'Chaos Sim',title:'🌪️ Chaos Simulator',sub:'Extreme Real-World Testing',btnRun:'🌪️ Inject Chaos Script',opt1:'CPU Lag (Block Main Thread)',opt2:'Network Glitch (Flicker Images)',opt3:'Aggressive DOM Deletions',msg:'Chaos injected! Preview is now lagging.'},
  fr:{tab:'Chaos Sim',title:'🌪️ Simulateur Chaos',sub:'Tests Extrêmes Monde Réel',btnRun:'🌪️ Injecter Script Chaos',opt1:'Lag CPU (Bloque le Thread Principal)',opt2:'Bug Réseau (Images Clignotantes)',opt3:'Suppressions DOM Agressives',msg:'Chaos injecté ! La prévisualisation lag.'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(236,72,153,0.3);background:linear-gradient(135deg,rgba(157,23,77,0.3),rgba(236,72,153,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  function mkR(lbl,id){
    var d=document.createElement('label');d.style='display:flex;align-items:center;gap:8px;color:#e2e8f0;font-size:11px;background:rgba(236,72,153,0.05);padding:10px;border-radius:6px;border:1px solid rgba(236,72,153,0.1);';
    d.innerHTML='<input type="checkbox" id="'+id+'" checked> '+lbl;
    return d;
  }
  b.appendChild(mkR('🔋 '+tl('opt1'),'chk-lag'));
  b.appendChild(mkR('🚂 '+tl('opt2'),'chk-net'));
  b.appendChild(mkR('🛡️ '+tl('opt3'),'chk-dom'));

  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='margin-top:10px;width:100%;background:linear-gradient(135deg,#9d174d,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';
  b.appendChild(btn);

  btn.onclick=function(){
    if(!window.editor)return;
    var c=window.editor.getValue();
    var hasLag = document.getElementById('chk-lag').checked;
    var hasNet = document.getElementById('chk-net').checked;
    var hasDom = document.getElementById('chk-dom').checked;

    var s='\n<!-- 🌪️ REAL CHAOS SIMULATOR -->\n<script>\n';
    s+='document.addEventListener("DOMContentLoaded", function() {\n';
    s+='  const warn = document.createElement("div");\n';
    s+='  warn.style.cssText = "position:fixed;bottom:10px;left:10px;background:red;color:white;padding:5px 10px;font-family:sans-serif;font-size:12px;font-weight:bold;z-index:999999;box-shadow:0 0 10px red;animation:chaosBlink 0.5s infinite;";\n';
    s+='  warn.innerHTML = "⚠️ CHAOS MODE ACTIVE";\n';
    s+='  document.body.appendChild(warn);\n';
    s+='  const st = document.createElement("style");\n';
    s+='  st.innerHTML = "@keyframes chaosBlink { 50% { opacity: 0; } }";\n';
    s+='  document.head.appendChild(st);\n';

    if(hasLag) {
      s+='  // CPU Lag Simulation (Blocking thread randomly)\n';
      s+='  setInterval(() => {\n';
      s+='    if(Math.random() > 0.5) {\n';
      s+='      const start = Date.now();\n';
      s+='      while(Date.now() - start < 300) { /* Blocking... */ }\n';
      s+='    }\n';
      s+='  }, 2000);\n';
    }
    
    if(hasNet) {
      s+='  // Network Fluctuation (Flickering images and changing opacity)\n';
      s+='  setInterval(() => {\n';
      s+='    document.querySelectorAll("img, div, p").forEach(el => {\n';
      s+='      if(Math.random() > 0.9) el.style.opacity = Math.random() > 0.5 ? "0.1" : "1";\n';
      s+='    });\n';
      s+='  }, 500);\n';
    }

    if(hasDom) {
      s+='  // Aggressive AdBlock / Glitch (Randomly hiding elements)\n';
      s+='  document.body.addEventListener("click", () => {\n';
      s+='    if(Math.random() > 0.7) {\n';
      s+='       const all = document.querySelectorAll("div");\n';
      s+='       if(all.length > 0) all[Math.floor(Math.random()*all.length)].style.display = "none";\n';
      s+='    }\n';
      s+='  });\n';
    }

    s+='});\n';
    s+='</script>\n';

    var pos = c.indexOf('</body>');
    if (pos > -1) {
      window.editor.setValue(c.slice(0, pos) + s + c.slice(pos));
    } else {
      window.editor.setValue(c + s);
    }
    if(window.showToast) window.showToast(tl('msg'));
  };
  
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-chaos');if(el)el.textContent=tl('tab');if(window.activeTab==='chaos')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='chaos'){window.activeTab='chaos';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-chaos');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
