/**
 * Haptic Forge (Vibration UI) — EN/FR
 */
(function(){
'use strict';
var T={
  en:{tab:'Haptic Forge',title:'📳 Haptic Forge',sub:'Web Vibration Auto-Injector',btnTest:'Test Vibration',btnInj:'💉 Auto-Link All Buttons',pat:'Pattern:',succ:'Success Pulse',err:'Heavy Error',warn:'Double Warn',msg:'Haptics injected into all buttons!'},
  fr:{tab:'Forge Haptique',title:'📳 Forge Haptique',sub:'Auto-Injecteur Vibration Web',btnTest:'Tester Vibration',btnInj:'💉 Lier Tous les Boutons',pat:'Modèle :',succ:'Pulsation Succès',err:'Erreur Lourde',warn:'Avertissement Double',msg:'Haptiques injectés sur les boutons !'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

var vPat=[100,50,100];
function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(251,191,36,0.3);background:linear-gradient(135deg,rgba(180,83,9,0.3),rgba(251,191,36,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var l=document.createElement('div');l.style='font-size:10px;color:#94a3b8;font-weight:700;';l.textContent=tl('pat');b.appendChild(l);
  var ch=document.createElement('div');ch.style='display:flex;flex-direction:column;gap:6px;';
  
  function mkB(lbl,arr){
    var bt=document.createElement('button');bt.textContent=lbl+' ['+arr.join(',')+']';
    bt.style='padding:8px;background:#0f172a;border:1px solid rgba(251,191,36,0.3);color:#e2e8f0;border-radius:6px;font-size:10px;cursor:pointer;text-align:left;';
    bt.onclick=function(){vPat=arr;document.querySelectorAll('.hp-btn').forEach(function(x){x.style.background='#0f172a';});bt.style.background='rgba(251,191,36,0.15)';};
    bt.className='hp-btn';
    ch.appendChild(bt);
  }
  mkB(tl('succ'),[50,100,50]);
  mkB(tl('err'),[200,50,200,50,200]);
  mkB(tl('warn'),[100,100,100]);
  b.appendChild(ch);

  var r2=document.createElement('div');r2.style='display:flex;flex-direction:column;gap:6px;margin-top:10px;';
  var btnT=document.createElement('button');btnT.innerHTML='📳 '+tl('btnTest');
  btnT.style='width:100%;background:rgba(251,191,36,0.15);color:#fbbf24;border:1px solid rgba(251,191,36,0.3);padding:10px;border-radius:8px;font-size:10px;font-weight:900;cursor:pointer;';
  btnT.onclick=function(){if(navigator.vibrate)navigator.vibrate(vPat);};
  
  var btnI=document.createElement('button');btnI.innerHTML=tl('btnInj');
  btnI.style='width:100%;background:linear-gradient(135deg,#b45309,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:10px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.3);';
  
  btnI.onclick=function(){
    if(window.editor){
      var c=window.editor.getValue();
      // REAL HAPTIC LOGIC: Auto binds to ALL buttons and links!
      var scriptStr = '\n<!-- Real Haptic Auto-Binder -->\n<script>\n  document.addEventListener("DOMContentLoaded", function() {\n    document.querySelectorAll("button, a, input[type=\'button\'], input[type=\'submit\']").forEach(function(el) {\n      el.addEventListener("click", function() {\n        if(navigator.vibrate) navigator.vibrate(['+vPat.join(',')+']);\n      });\n    });\n  });\n</script>\n';
      
      var pos = c.indexOf('</body>');
      if (pos > -1) {
        window.editor.setValue(c.slice(0, pos) + scriptStr + c.slice(pos));
      } else {
        window.editor.setValue(c + scriptStr);
      }
      if(window.showToast) window.showToast(tl('msg'));
    }
  };
  
  r2.appendChild(btnT);r2.appendChild(btnI);b.appendChild(r2);
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-haptic');if(el)el.textContent=tl('tab');if(window.activeTab==='haptic')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='haptic'){window.activeTab='haptic';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-haptic');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
