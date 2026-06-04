(function(){
'use strict';
var T={
  en:{tab:'Webhook Lab',title:'🪝 Webhook Lab',sub:'Local Event Listener Simulation',btnRun:'📡 Start Listening',btnStop:'⏹️ Stop',lbl1:'Webhook URL:',msg:'Listening on dummy endpoint...',event:'[Event Received]'},
  fr:{tab:'Labo Webhook',title:'🪝 Labo Webhook',sub:'Simulation d\'Écouteur d\'Événements',btnRun:'📡 Démarrer l\'écoute',btnStop:'⏹️ Arrêter',lbl1:'URL du Webhook:',msg:'Écoute sur endpoint factice...',event:'[Événement Reçu]'}
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
  
  var lbl1=document.createElement('div');lbl1.style='font-size:11px;color:#94a3b8;';lbl1.innerText=tl('lbl1');
  b.appendChild(lbl1);
  var url=document.createElement('div');
  url.style='width:100%;background:#0f172a;border:1px solid #334155;color:#4ade80;padding:8px;border-radius:6px;font-size:11px;font-family:monospace;word-break:break-all;';
  url.innerText='https://ia-architecte.local/webhook/test';
  b.appendChild(url);

  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#166534,#22c55e);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(34,197,94,0.3);margin-top:5px;';
  b.appendChild(btn);

  var log=document.createElement('div');
  log.style='flex:1;background:#000;border:1px solid #334155;border-radius:6px;padding:8px;font-family:monospace;font-size:10px;color:#94a3b8;overflow-y:auto;min-height:100px;';
  b.appendChild(log);

  var timer = null;
  btn.onclick=function(){
    if(timer){
      clearInterval(timer); timer=null;
      btn.innerHTML=tl('btnRun');
      btn.style.background='linear-gradient(135deg,#166534,#22c55e)';
    }else{
      btn.innerHTML=tl('btnStop');
      btn.style.background='linear-gradient(135deg,#7f1d1d,#ef4444)';
      log.innerHTML = '<div style="color:#4ade80;">'+tl('msg')+'</div>';
      timer = setInterval(function(){
        var events = ['payment.success','user.created','invoice.paid','subscription.updated'];
        var ev = events[Math.floor(Math.random()*events.length)];
        var ts = new Date().toLocaleTimeString();
        log.innerHTML += '<div><span style="color:#64748b;">['+ts+']</span> <span style="color:#fbbf24;">POST</span> /webhook/test - <span style="color:#e2e8f0;">{"type":"'+ev+'"}</span></div>';
        log.scrollTop = log.scrollHeight;
      }, 3000);
    }
  };

  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-webhooklab');if(el)el.textContent=tl('tab');if(window.activeTab==='webhooklab')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='webhooklab'){window.activeTab='webhooklab';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-webhooklab');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
