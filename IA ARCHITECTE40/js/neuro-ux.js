/**
 * Neuro UX Analyzer — EN/FR
 */
(function(){
'use strict';
var T={
  en:{tab:'Neuro UX',title:'🧠 Neuromorphic UX',sub:'Live UI Emotion Scanner',btnRun:'🧠 Scan App Emotions',res1:'Joy / Clarity',res2:'Confusion',res3:'Frustration',msg:'Analysis Complete based on your code.'},
  fr:{tab:'Neuro UX',title:'🧠 UX Neuromorphique',sub:'Scanner Émotion UI en Direct',btnRun:'🧠 Scanner les Émotions',res1:'Joie / Clarté',res2:'Confusion',res3:'Frustration',msg:'Analyse Terminée selon votre code.'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(99,102,241,0.3);background:linear-gradient(135deg,rgba(49,46,129,0.3),rgba(99,102,241,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var vp=document.createElement('div');vp.style='height:120px;background:#0f172a;border-radius:8px;border:1px solid rgba(99,102,241,0.3);position:relative;overflow:hidden;';
  b.appendChild(vp);

  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#312e81,#6366f1);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.3);';
  b.appendChild(btn);

  var res=document.createElement('div');res.style='display:none;flex-direction:column;gap:6px;margin-top:5px;';
  function mkB(L,C,W){return '<div style="display:flex;align-items:center;gap:8px;"><div style="width:60px;font-size:9px;color:#94a3b8;text-align:right;">'+L+'</div><div style="flex:1;height:6px;background:#1e293b;border-radius:3px;"><div style="width:'+W+'%;height:100%;background:'+C+';border-radius:3px;transition:width 1s;"></div></div><div style="width:20px;font-size:9px;color:#e2e8f0;text-align:left;">'+Math.round(W)+'%</div></div>';}
  
  btn.onclick=function(){
    res.style.display='flex';
    var code = window.editor ? window.editor.getValue() : '';
    
    // Real Code Parsing for UX Emotions
    // 1. Confusion: Too many colors, too many links
    var colorsMatch = code.match(/#(?:[0-9a-fA-F]{3}){1,2}|rgba?\([^)]+\)/g)||[];
    var uniqueColors = [...new Set(colorsMatch)].length;
    var isOverloadedColors = uniqueColors > 8;
    var excessiveLinks = (code.match(/<a[\s>]/g)||[]).length > 20;
    
    // 2. Frustration: Small tap targets, missing paddings, alerts
    var missingPadding = /padding:\s*0|margin:\s*0/.test(code) && (code.match(/padding/g)||[]).length < 2;
    var hasAlerts = (code.match(/alert\(/g)||[]).length > 0;
    
    // 3. Joy: Animations, transitions, emojis, rounded corners
    var hasAnim = /transition|animation|@keyframes|border-radius/.test(code);
    var hasEmojis = /[\u{1F300}-\u{1F9FF}]/u.test(code);
    
    var joyScore = 50, confScore = 25, frustScore = 25;
    
    if(isOverloadedColors) { confScore += 25; joyScore -= 10; frustScore += 10; }
    if(excessiveLinks) { confScore += 15; frustScore += 10; }
    if(missingPadding) { frustScore += 20; joyScore -= 10; }
    if(hasAlerts) { frustScore += 30; joyScore -= 20; }
    
    if(hasAnim) { joyScore += 30; frustScore -= 10; confScore -= 10; }
    if(hasEmojis) { joyScore += 15; confScore -= 5; }
    
    // Normalize to 100%
    if(joyScore < 5) joyScore = 5;
    if(confScore < 5) confScore = 5;
    if(frustScore < 5) frustScore = 5;
    var total = joyScore + confScore + frustScore;
    var jP = (joyScore/total)*100;
    var cP = (confScore/total)*100;
    var fP = (frustScore/total)*100;

    // dynamic heatmap dots
    var b1 = Math.min(100, jP*2);
    var b2 = Math.min(100, cP*2.5);
    var b3 = Math.min(100, fP*2.5);

    vp.innerHTML='<div style="position:absolute;top:20%;left:20%;width:'+b1+'px;height:'+b1+'px;background:rgba(52,211,153,0.5);filter:blur(15px);border-radius:50%;"></div>'+
                 '<div style="position:absolute;top:40%;left:60%;width:'+b2+'px;height:'+b2+'px;background:rgba(251,191,36,0.5);filter:blur(15px);border-radius:50%;"></div>'+
                 '<div style="position:absolute;top:60%;left:30%;width:'+b3+'px;height:'+b3+'px;background:rgba(248,113,113,0.5);filter:blur(15px);border-radius:50%;"></div>';

    res.innerHTML=mkB(tl('res1'),'#34d399',jP)+mkB(tl('res2'),'#fbbf24',cP)+mkB(tl('res3'),'#f87171',fP)+'<div style="text-align:center;color:#818cf8;font-size:10px;margin-top:10px;font-weight:bold;">'+tl('msg')+'</div>';
  };
  b.appendChild(res);w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-neuro');if(el)el.textContent=tl('tab');if(window.activeTab==='neuro')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='neuro'){window.activeTab='neuro';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-neuro');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
