(function(){
'use strict';
var T={
  en:{tab:'VHS Rewind',title:'📼 VHS Rewind',sub:'Retro Tape Distortion',btnRun:'▶️ Insert VHS',msg:'Tape is rolling...'},
  fr:{tab:'Cassette VHS',title:'📼 Cassette VHS',sub:'Distorsion Rétro',btnRun:'▶️ Insérer VHS',msg:'Lecture en cours...'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(251,113,133,0.3);background:linear-gradient(135deg,rgba(225,45,114,0.3),rgba(251,113,133,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#fb7185;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#e11d48,#fb7185);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(251,113,133,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- VHS REWIND CSS -->\n<style>\n  body {\n    filter: contrast(1.2) saturate(0.8) sepia(0.2) hue-rotate(-10deg);\n    position: relative;\n  }\n  body::before {\n    content: " ";\n    display: block;\n    position: fixed;\n    top: 0; left: 0; bottom: 0; right: 0;\n    background: repeating-linear-gradient(\n      transparent, transparent 3px,\n      rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 4px\n    );\n    z-index: 9998;\n    pointer-events: none;\n    animation: vhsTrack 5s linear infinite;\n  }\n  body::after {\n    content: "PLAY ►";\n    position: fixed;\n    top: 20px; right: 40px;\n    color: #fff;\n    font-size: 40px;\n    font-family: 'Courier New', monospace;\n    text-shadow: 2px 2px 0 #000, -2px 0 0 red, 2px 0 0 blue;\n    z-index: 9999;\n    pointer-events: none;\n    animation: vhsText 2s step-end infinite;\n  }\n  @keyframes vhsTrack { 0% { background-position: 0 0; } 100% { background-position: 0 100vh; } }\n  @keyframes vhsText { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }\n  * { text-shadow: -2px 0 0 rgba(255,0,0,0.5), 2px 0 0 rgba(0,0,255,0.5); }\n</style>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-vhsrewind');if(el)el.textContent=tl('tab');if(window.activeTab==='vhsrewind')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='vhsrewind'){window.activeTab='vhsrewind';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-vhsrewind');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
