(function(){
'use strict';
var T={
  en:{tab:'Chaos Shake',title:'🥴 Chaos Shake',sub:'Drunk & Earthquake UI',btnRun:'🥃 Drink up!',msg:'Chaos Unleashed!'},
  fr:{tab:'Mode Séisme',title:'🥴 Mode Séisme',sub:'UI Ivre & Tremblement',btnRun:'🥃 Santé !',msg:'Chaos déclenché !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(244,63,94,0.3);background:linear-gradient(135deg,rgba(159,18,57,0.3),rgba(244,63,94,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#fb7185;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#9f1239,#e11d48);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(225,29,72,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- CHAOS SHAKE CSS -->\n<style>\n  body {\n    animation: drunkSway 4s ease-in-out infinite alternate;\n  }\n  @keyframes drunkSway {\n    0% { transform: skewX(-5deg) rotate(2deg) scale(1.05); filter: blur(1px); }\n    50% { transform: skewX(0deg) rotate(-1deg) scale(1.0); filter: blur(0px); }\n    100% { transform: skewX(5deg) rotate(-3deg) scale(1.1); filter: blur(2px) hue-rotate(20deg); }\n  }\n  div:hover, button:hover {\n    animation: earthquake 0.1s linear infinite;\n  }\n  @keyframes earthquake {\n    0% { transform: translate(2px, 1px) rotate(0deg); }\n    10% { transform: translate(-1px, -2px) rotate(-1deg); }\n    20% { transform: translate(-3px, 0px) rotate(1deg); }\n    30% { transform: translate(0px, 2px) rotate(0deg); }\n    40% { transform: translate(1px, -1px) rotate(1deg); }\n    50% { transform: translate(-1px, 2px) rotate(-1deg); }\n    60% { transform: translate(-3px, 1px) rotate(0deg); }\n    70% { transform: translate(2px, 1px) rotate(-1deg); }\n    80% { transform: translate(-1px, -1px) rotate(1deg); }\n    90% { transform: translate(2px, 2px) rotate(0deg); }\n    100% { transform: translate(1px, -2px) rotate(-1deg); }\n  }\n</style>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-chaosshake');if(el)el.textContent=tl('tab');if(window.activeTab==='chaosshake')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='chaosshake'){window.activeTab='chaosshake';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-chaosshake');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
