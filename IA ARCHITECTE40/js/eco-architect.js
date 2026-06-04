/**
 * Eco-Architect (Green IT Tracker) — EN/FR
 */
(function(){
'use strict';
var T={
  en:{tab:'Eco-Tracker',title:'🌱 Eco-Architect Tracker',sub:'Real-Time Code Analysis',btnGen:'🌱 Analyze Live Code',stat1:'DOM Depth',stat2:'JS Energy Cost',stat3:'Est. CO2/Load',stat4:'Green Score',grade:'A+',msg:'Ultra-lightweight! Exceptional eco-friendly code.',msgBad:'Needs optimization. High carbon footprint.'},
  fr:{tab:'Éco-Tracker',title:'🌱 Éco-Architecte',sub:'Analyse de Code en Temps Réel',btnGen:'🌱 Analyser le Code',stat1:'Profond. DOM',stat2:'Coût Énergie JS',stat3:'CO2 Est./Visite',stat4:'Score Écolo',grade:'A+',msg:'Ultra-léger ! Code écologique exceptionnel.',msgBad:'Nécessite optimisation. Forte empreinte carbone.'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(34,197,94,0.3);background:linear-gradient(135deg,rgba(20,83,45,0.3),rgba(34,197,94,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnGen');
  btn.style='width:100%;background:linear-gradient(135deg,#14532d,#22c55e);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(34,197,94,0.3);';
  b.appendChild(btn);

  var res=document.createElement('div');res.style='display:none;flex-direction:column;gap:8px;margin-top:10px;';
  function mkS(L,V,c){return '<div style="display:flex;justify-content:space-between;background:rgba(255,255,255,0.03);padding:8px 10px;border-radius:6px;border:1px solid rgba(255,255,255,0.05);"><span style="color:#94a3b8;font-size:10px;">'+L+'</span><span style="color:'+c+';font-weight:800;font-size:11px;">'+V+'</span></div>';}
  
  btn.onclick=function(){
    res.style.display='flex';
    var code = window.editor ? window.editor.getValue() : '';
    
    // 1. Calculate Est CO2 based on real bytes
    var sizeBytes = new Blob([code]).size;
    var estCO2 = (sizeBytes / 1024 / 1024) * 0.6; // ~0.6g CO2 per MB
    var co2Str = estCO2 < 0.01 ? '<0.01g' : estCO2.toFixed(2) + 'g';
    
    // 2. Calculate DOM Depth
    var maxDepth = 0;
    var currDepth = 0;
    var tags = code.match(/<\/?([a-zA-Z0-9\-]+)[^>]*>/g) || [];
    tags.forEach(function(t) {
      if(t.startsWith('</')) { currDepth--; if(currDepth<0) currDepth=0; }
      else if(!t.endsWith('/>') && !t.includes('img') && !t.includes('input') && !t.includes('br') && !t.includes('hr') && !t.includes('meta') && !t.includes('link')) {
        currDepth++;
        if(currDepth > maxDepth) maxDepth = currDepth;
      }
    });
    
    // 3. JS Energy Cost
    var jsOps = (code.match(/function|for\s*\(|while\s*\(|forEach|map|filter|reduce/g) || []).length;
    var energyCost = 'Low (Eco)';
    var cE = '#4ade80';
    if(jsOps > 10) { energyCost = 'Medium'; cE = '#fbbf24'; }
    if(jsOps > 30) { energyCost = 'High (Heavy)'; cE = '#f87171'; }
    
    // 4. Score
    var score = 100;
    if(maxDepth > 15) score -= (maxDepth - 15) * 2;
    if(jsOps > 10) score -= (jsOps - 10);
    if(sizeBytes > 50000) score -= 15;
    if(score < 10) score = 10;
    if(score > 100) score = 100;
    
    var isGood = score >= 75;
    var finalGrade = score >= 90 ? 'A+' : (score >= 75 ? 'B' : (score >= 50 ? 'C' : 'D'));
    var finalColor = score >= 75 ? '#4ade80' : (score >= 50 ? '#fbbf24' : '#f87171');

    res.innerHTML=
      mkS(tl('stat1'), maxDepth + ' levels', maxDepth > 15 ? '#f87171' : '#4ade80')+
      mkS(tl('stat2'), energyCost, cE)+
      mkS(tl('stat3'), co2Str, estCO2 > 0.1 ? '#f87171' : '#4ade80')+
      mkS(tl('stat4'), score + '/100', finalColor)+
      '<div style="text-align:center;margin-top:10px;"><div style="font-size:36px;font-weight:900;color:'+finalColor+';">'+finalGrade+'</div><div style="color:#64748b;font-size:9px;margin-top:4px;">'+(isGood?tl('msg'):tl('msgBad'))+'</div></div>';
  };
  b.appendChild(res);w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-eco');if(el)el.textContent=tl('tab');if(window.activeTab==='eco')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='eco'){window.activeTab='eco';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-eco');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
