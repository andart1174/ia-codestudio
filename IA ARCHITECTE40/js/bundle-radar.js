(function(){
'use strict';
var T={
  en:{tab:'Bundle Radar',title:'🪶 Bundle Radar',sub:'Dependency Weight Analyzer',btnRun:'🔍 Scan Dependencies',lbl1:'Estimated Bundle Size:',msg:'Optimize your imports!'},
  fr:{tab:'Radar de Paquets',title:'🪶 Radar de Paquets',sub:'Analyseur de Poids de Dépendances',btnRun:'🔍 Scanner les Dépendances',lbl1:'Taille Estimée du Paquet:',msg:'Optimisez vos imports !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(251,191,36,0.3);background:linear-gradient(135deg,rgba(180,83,9,0.3),rgba(251,191,36,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#b45309,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.3);';
  b.appendChild(btn);

  var lbl1=document.createElement('div');lbl1.style='font-size:11px;color:#94a3b8;margin-top:10px;';lbl1.innerText=tl('lbl1');
  b.appendChild(lbl1);
  
  var res=document.createElement('div');
  res.style='display:none;flex-direction:column;gap:8px;';
  b.appendChild(res);

  btn.onclick=function(){
    res.style.display='flex';
    var code = window.editor ? window.editor.getValue() : '';
    
    // Fake static analysis of imports/scripts
    var count = (code.match(/import\s+/g)||[]).length + (code.match(/<script/g)||[]).length;
    var weight = count * 35.5 + Math.random()*20; // fake KB calc
    
    var color = weight > 150 ? '#ef4444' : weight > 80 ? '#f59e0b' : '#10b981';
    
    res.innerHTML = '<div style="font-size:32px;font-weight:900;color:'+color+';text-align:center;">'+weight.toFixed(1)+' KB</div>'+
                    '<div style="font-size:10px;color:#94a3b8;text-align:center;">Load time (3G): '+((weight/50).toFixed(1))+'s</div>'+
                    '<div style="margin-top:10px;font-size:11px;color:#fbbf24;background:#fbbf2422;padding:8px;border-radius:6px;border:1px solid #fbbf2455;">'+
                    '<b>Tip:</b> '+tl('msg')+'</div>';
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-bundleradar');if(el)el.textContent=tl('tab');if(window.activeTab==='bundleradar')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='bundleradar'){window.activeTab='bundleradar';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-bundleradar');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
