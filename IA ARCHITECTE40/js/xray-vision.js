(function(){
'use strict';
var T={
  en:{tab:'X-Ray Vision',title:'🦴 X-Ray Vision',sub:'Blueprint Wireframe Mode',btnRun:'👁️ Activate X-Ray',msg:'X-Ray injected!'},
  fr:{tab:'Vision Rayon X',title:'🦴 Vision Rayon X',sub:'Mode Blueprint Wireframe',btnRun:'👁️ Activer Rayon X',msg:'Rayon X injecté !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(56,189,248,0.3);background:linear-gradient(135deg,rgba(2,132,199,0.3),rgba(56,189,248,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#38bdf8;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#0284c7,#38bdf8);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(56,189,248,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- X-RAY ARCHITECT CSS -->\n<style>\n  * {\n    background: transparent !important;\n    color: rgba(56,189,248,0.8) !important;\n    border: 1px solid rgba(56,189,248,0.4) !important;\n    border-radius: 0 !important;\n    box-shadow: none !important;\n    text-shadow: none !important;\n    background-image: none !important;\n  }\n  body {\n    background-color: #000 !important;\n    background-image: linear-gradient(rgba(56,189,248,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.1) 1px, transparent 1px) !important;\n    background-size: 20px 20px !important;\n  }\n  img, svg, iframe, canvas { filter: invert(1) sepia(1) hue-rotate(180deg) saturate(3) opacity(0.5) !important; }\n</style>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-xrayvision');if(el)el.textContent=tl('tab');if(window.activeTab==='xrayvision')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='xrayvision'){window.activeTab='xrayvision';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-xrayvision');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
