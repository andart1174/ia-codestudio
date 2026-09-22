/**
 * Gamification Engine — EN/FR
 */
(function(){
'use strict';
var T={
  en:{tab:'Gamify UI',title:'🎮 Gamification Engine',sub:'Turn boring apps into games',btnInj:'💉 Inject Real Game Logic',xp:'Add Visual XP System',ach:'Add Achievements Popups',conf:'Real Confetti on Click',msg:'Game logic injected! Test your buttons!'},
  fr:{tab:'Gamifier',title:'🎮 Moteur Gamification',sub:'Transforme vos apps en jeux',btnInj:'💉 Injecter Logique Réelle',xp:'Ajouter Système XP Visuel',ach:'Ajouter Popups de Succès',conf:'Vrais Confettis au Clic',msg:'Logique de jeu injectée ! Testez vos boutons !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(59,130,246,0.3);background:linear-gradient(135deg,rgba(30,58,138,0.3),rgba(59,130,246,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  function mkC(lbl,id){
    var d=document.createElement('label');d.style='display:flex;align-items:center;gap:8px;color:#cbd5e1;font-size:11px;cursor:pointer;background:rgba(255,255,255,0.03);padding:10px;border-radius:6px;';
    d.innerHTML='<input type="checkbox" id="'+id+'" checked> '+lbl;
    return d;
  }
  b.appendChild(mkC('⭐ '+tl('xp'),'chk-xp'));
  b.appendChild(mkC('🏆 '+tl('ach'),'chk-ach'));
  b.appendChild(mkC('🎉 '+tl('conf'),'chk-conf'));

  var btnI=document.createElement('button');btnI.innerHTML=tl('btnInj');
  btnI.style='margin-top:10px;width:100%;background:linear-gradient(135deg,#1e40af,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;';
  b.appendChild(btnI);
  
  btnI.onclick=function(){
    if(!window.editor)return;
    var c=window.editor.getValue();
    var hasConf = document.getElementById('chk-conf').checked;
    var hasXP = document.getElementById('chk-xp').checked;
    var hasAch = document.getElementById('chk-ach').checked;
    
    var s='\n<!-- 🎮 REAL GAMIFICATION ENGINE -->\n';
    if(hasConf) {
      s+='<script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>\n';
    }
    s+='<script>\n';
    s+='document.addEventListener("DOMContentLoaded", function() {\n';
    s+='  let xp = 0;\n';
    
    if(hasXP) {
      s+='  const xpUi = document.createElement("div");\n';
      s+='  xpUi.style.cssText = "position:fixed;top:20px;right:20px;background:#1e293b;color:#fbbf24;padding:10px 20px;border-radius:20px;font-family:sans-serif;font-weight:bold;box-shadow:0 4px 15px rgba(0,0,0,0.3);z-index:999999;border:2px solid #fbbf24;transition:transform 0.1s;";\n';
      s+='  xpUi.innerHTML = "⭐ XP: <span id=\'ui-xp-val\'>0</span>";\n';
      s+='  document.body.appendChild(xpUi);\n';
    }
    
    s+='  document.querySelectorAll("button, a, input[type=\'button\'], input[type=\'submit\']").forEach(btn => {\n';
    s+='    btn.addEventListener("click", function(e) {\n';
    if(hasConf) {
      s+='      if(window.confetti) confetti({ particleCount: 60, spread: 70, origin: { x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight } });\n';
    }
    if(hasXP) {
      s+='      xp += 50;\n';
      s+='      document.getElementById("ui-xp-val").innerText = xp;\n';
      s+='      xpUi.style.transform = "scale(1.2)";\n';
      s+='      setTimeout(() => xpUi.style.transform = "scale(1)", 150);\n';
    }
    if(hasAch) {
      s+='      if(xp === 150) {\n';
      s+='        const ach = document.createElement("div");\n';
      s+='        ach.style.cssText = "position:fixed;bottom:-100px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#8b5cf6,#d946ef);color:#fff;padding:15px 30px;border-radius:30px;font-family:sans-serif;font-weight:bold;box-shadow:0 10px 30px rgba(217,70,239,0.5);z-index:999999;transition:bottom 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);";\n';
      s+='        ach.innerHTML = "🏆 ACHIEVEMENT UNLOCKED: Click Master!";\n';
      s+='        document.body.appendChild(ach);\n';
      s+='        setTimeout(() => ach.style.bottom = "30px", 100);\n';
      s+='        setTimeout(() => ach.style.bottom = "-100px", 4000);\n';
      s+='      }\n';
    }
    s+='    });\n';
    s+='  });\n';
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
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-gamification');if(el)el.textContent=tl('tab');if(window.activeTab==='gamification')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='gamification'){window.activeTab='gamification';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-gamification');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
