(function(){
'use strict';
var T={
  en:{tab:'Cyber Glitch',title:'📺 Cyber Glitch',sub:'CRT Matrix Effect',btnRun:'👾 Inject Matrix',msg:'Glitch active!'},
  fr:{tab:'Glitch Cyber',title:'📺 Glitch Cyber',sub:'Effet Matrix CRT',btnRun:'👾 Injecter Matrix',msg:'Glitch actif !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(74,222,128,0.3);background:linear-gradient(135deg,rgba(22,101,52,0.3),rgba(74,222,128,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#166534,#22c55e);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(34,197,94,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- CYBER GLITCH CRT CSS -->\n<style>\n  body {\n    background-color: #000 !important;\n    color: #0f0 !important;\n    font-family: monospace !important;\n    text-shadow: 0 0 5px #0f0;\n  }\n  body::after {\n    content: " ";\n    display: block;\n    position: absolute;\n    top: 0; left: 0; bottom: 0; right: 0;\n    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));\n    z-index: 2;\n    background-size: 100% 2px, 3px 100%;\n    pointer-events: none;\n  }\n  * { box-shadow: none !important; border-color: #0f0 !important; }\n  img { filter: sepia(1) hue-rotate(90deg) saturate(3) contrast(2); opacity: 0.7; }\n</style>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-cyberglitch');if(el)el.textContent=tl('tab');if(window.activeTab==='cyberglitch')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='cyberglitch'){window.activeTab='cyberglitch';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-cyberglitch');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
