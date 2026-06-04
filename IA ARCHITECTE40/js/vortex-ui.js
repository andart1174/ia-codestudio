(function(){
'use strict';
var T={
  en:{tab:'Vortex Hole',title:'🕳️ Vortex Hole',sub:'Black hole visual effect',btnRun:'🌀 Trigger Vortex',msg:'Vortex injected!'},
  fr:{tab:'Trou Noir',title:'🕳️ Trou Noir',sub:'Effet visuel trou noir',btnRun:'🌀 Déclencher le Vortex',msg:'Vortex injecté !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(100,100,100,0.3);background:linear-gradient(135deg,rgba(0,0,0,0.8),rgba(30,30,30,0.5));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#94a3b8;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#000000,#333333);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.8);border:1px solid #475569;';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- VORTEX UI CSS -->\n<style>\n  body {\n    animation: vortexSuck 4s ease-in forwards;\n    transform-origin: center center;\n    overflow: hidden;\n  }\n  @keyframes vortexSuck {\n    0% { transform: scale(1) rotate(0deg); filter: blur(0px); }\n    50% { transform: scale(0.5) rotate(180deg); filter: blur(5px); }\n    100% { transform: scale(0) rotate(720deg); filter: blur(20px); opacity: 0; }\n  }\n</style>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-vortexui');if(el)el.textContent=tl('tab');if(window.activeTab==='vortexui')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='vortexui'){window.activeTab='vortexui';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-vortexui');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
