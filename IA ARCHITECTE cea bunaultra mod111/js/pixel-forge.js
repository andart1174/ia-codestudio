(function(){
'use strict';
var T={
  en:{tab:'Pixel Forge',title:'🕹️ Pixel Forge',sub:'8-Bit Retro Demaster',btnRun:'👾 Demaster UI',msg:'Welcome to 1985!'},
  fr:{tab:'Mode 8-Bit',title:'🕹️ Mode 8-Bit',sub:'Retro Demaster 8-Bit',btnRun:'👾 Demasteriser UI',msg:'Bienvenue en 1985 !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(251,146,60,0.3);background:linear-gradient(135deg,rgba(234,88,12,0.3),rgba(251,146,60,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#fb923c;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#ea580c,#fb923c);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(251,146,60,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- 8-BIT PIXEL FORGE CSS -->\n<style>\n  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');\n  * {\n    font-family: 'Press Start 2P', cursive !important;\n    border-radius: 0 !important;\n    box-shadow: 4px 4px 0 #000 !important;\n  }\n  body {\n    image-rendering: pixelated !important;\n    filter: contrast(1.5) saturate(1.2) drop-shadow(0 0 1px rgba(0,0,0,0.5));\n  }\n  button, input, textarea, div { border: 2px solid #000 !important; }\n  img { image-rendering: pixelated; filter: contrast(1.5) saturate(0.8) grayscale(0.2); }\n</style>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-pixelforge');if(el)el.textContent=tl('tab');if(window.activeTab==='pixelforge')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='pixelforge'){window.activeTab='pixelforge';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-pixelforge');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
