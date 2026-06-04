(function(){
'use strict';
var T={
  en:{tab:'Zero-G',title:'🪐 Anti-Gravity UI',sub:'Make the UI float',btnRun:'🚀 Unstick Everything',msg:'Injected physics into code.'},
  fr:{tab:'Zéro-G',title:'🪐 UI Anti-Gravité',sub:'Faites flotter l\'UI',btnRun:'🚀 Détacher Tout',msg:'Physique injectée dans le code.'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(168,85,247,0.3);background:linear-gradient(135deg,rgba(88,28,135,0.3),rgba(168,85,247,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#581c87,#9333ea);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(147,51,234,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- ANTI-GRAVITY UI SCRIPT -->\n<script>\n  setTimeout(() => {\n    const els = document.querySelectorAll('div, button, img, h1, p');\n    els.forEach(el => {\n      if(el.children.length === 0 || el.tagName==='BUTTON' || el.tagName==='IMG') {\n        el.style.position = 'absolute';\n        el.style.left = el.getBoundingClientRect().left + 'px';\n        el.style.top = el.getBoundingClientRect().top + 'px';\n        el.style.transition = 'all 5s cubic-bezier(0.25, 1, 0.5, 1)';\n        setTimeout(() => {\n          el.style.transform = 'translate('+(Math.random()*400-200)+'px, '+(Math.random()*400-200)+'px) rotate('+(Math.random()*360)+'deg)';\n        }, 100);\n      }\n    });\n  }, 1000);\n</script>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-zerog');if(el)el.textContent=tl('tab');if(window.activeTab==='zerog')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='zerog'){window.activeTab='zerog';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-zerog');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
