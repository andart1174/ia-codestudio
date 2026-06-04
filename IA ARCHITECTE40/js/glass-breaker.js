(function(){
'use strict';
var T={
  en:{tab:'Smash UI',title:'🔨 Smash UI',titleSub:'Click to break elements',btnRun:'💥 Load Smasher',msg:'Click elements to smash!'},
  fr:{tab:'Briseur UI',title:'🔨 Briseur UI',titleSub:'Cliquez pour casser',btnRun:'💥 Charger Briseur',msg:'Cliquez pour briser !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(192,132,252,0.3);background:linear-gradient(135deg,rgba(147,51,234,0.3),rgba(192,132,252,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('titleSub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#9333ea,#c084fc);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(192,132,252,0.3);';
  b.appendChild(btn);

  btn.onclick=function(){
    var code = `\n\n<!-- SMASH UI SCRIPT -->\n<script>\n  document.body.addEventListener('click', function(e) {\n    const el = e.target;\n    if(el.tagName==='BODY' || el.tagName==='HTML') return;\n    el.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0.75, 0)';\n    el.style.transform = 'translateY(100vh) rotate('+(Math.random()*90-45)+'deg) scale(0)';\n    el.style.opacity = '0';\n    el.style.pointerEvents = 'none';\n    setTimeout(()=>el.style.display='none', 600);\n    // Flash effect\n    const flash = document.createElement('div');\n    flash.style.position='fixed'; flash.style.left=e.clientX+'px'; flash.style.top=e.clientY+'px';\n    flash.style.width='50px'; flash.style.height='50px'; flash.style.background='#fff';\n    flash.style.borderRadius='50%'; flash.style.transform='translate(-50%,-50%) scale(1)';\n    flash.style.transition='all 0.3s ease-out'; flash.style.opacity='0.8'; flash.style.zIndex='9999';\n    document.body.appendChild(flash);\n    setTimeout(()=> { flash.style.transform='translate(-50%,-50%) scale(5)'; flash.style.opacity='0'; }, 10);\n    setTimeout(()=> flash.remove(), 300);\n  });\n</script>\n`;
    if(window.editor) {
      window.editor.setValue(window.editor.getValue() + code);
      btn.innerText = tl('msg');
      setTimeout(()=>btn.innerText=tl('btnRun'), 2000);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-glassbreaker');if(el)el.textContent=tl('tab');if(window.activeTab==='glassbreaker')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='glassbreaker'){window.activeTab='glassbreaker';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-glassbreaker');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
