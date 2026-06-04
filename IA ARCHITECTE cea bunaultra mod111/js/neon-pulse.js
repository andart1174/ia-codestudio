(function(){
'use strict';
var T={
  en:{tab:'Neon Pulse',title:'🪩 Neon Pulse',sub:'Rave Strobe Effect',btnRun:'🎶 Drop the Bass',msg:'Party Started!'},
  fr:{tab:'Mode Disco',title:'🪩 Mode Disco',sub:'Effet Stroboscope Rave',btnRun:'🎶 Lancer le Son',msg:'La fête commence !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(236,72,153,0.3);background:linear-gradient(135deg,rgba(190,24,93,0.3),rgba(236,72,153,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#f472b6;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#be185d,#ec4899);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(236,72,153,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- NEON PULSE RAVE SCRIPT -->\n<script>\n  setInterval(() => {\n    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#8b5cf6', '#3b82f6', '#0ea5e9', '#10b981', '#f59e0b'];\n    document.querySelectorAll('div, button, section, header, footer').forEach(el => {\n      if(Math.random() > 0.5) {\n        el.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];\n        el.style.color = '#fff';\n        el.style.boxShadow = '0 0 20px ' + el.style.backgroundColor;\n      }\n    });\n    document.body.style.filter = 'hue-rotate('+(Math.random()*360)+'deg) contrast(150%)';\n  }, 200);\n</script>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-neonpulse');if(el)el.textContent=tl('tab');if(window.activeTab==='neonpulse')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='neonpulse'){window.activeTab='neonpulse';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-neonpulse');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
