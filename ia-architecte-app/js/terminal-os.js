(function(){
'use strict';
var T={
  en:{tab:'Terminal OS',title:'💻 Terminal OS',sub:'Hackerman UI Style',btnRun:'⌨️ Inject Terminal',msg:'System Override...'},
  fr:{tab:'Mode Terminal',title:'💻 Mode Terminal',sub:'Style Hackerman UI',btnRun:'⌨️ Injecter Terminal',msg:'Piratage Système...'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(74,222,128,0.3);background:linear-gradient(135deg,rgba(22,163,74,0.3),rgba(74,222,128,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#16a34a,#4ade80);color:#000;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(74,222,128,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- TERMINAL OS SCRIPT -->\n<style>\n  body { background: #000 !important; color: #0f0 !important; font-family: 'Courier New', Courier, monospace !important; }\n  * { font-family: 'Courier New', Courier, monospace !important; border-radius: 0 !important; }\n  button, a { background: transparent !important; color: #0f0 !important; border: 1px solid #0f0 !important; text-transform: uppercase; }\n  button::before { content: "[ "; } button::after { content: " ]"; }\n  h1::before, h2::before { content: "> "; }\n  h1::after, h2::after { content: "_"; animation: blink 1s step-end infinite; }\n  @keyframes blink { 50% { opacity: 0; } }\n  img { filter: grayscale(100%) contrast(200%) brightness(50%) sepia(100%) hue-rotate(70deg) saturate(500%); }\n</style>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-terminalos');if(el)el.textContent=tl('tab');if(window.activeTab==='terminalos')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='terminalos'){window.activeTab='terminalos';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-terminalos');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
