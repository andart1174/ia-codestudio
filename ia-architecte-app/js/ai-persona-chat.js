/**
 * 🤖 AI Persona Chat Widget Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'AI Chat',title:'🤖 AI Persona Chat',sub:'Configurable AI Chatbot Widget',
      botName:'Bot Name',botNameP:'e.g. Alex (Support)',persona:'Persona/Role',personaP:'e.g. Friendly Tech Support',
      greeting:'Initial Greeting',greetingP:'e.g. Hi! How can I help you today?',color:'Accent Color',
      btn:'🤖 Generate Chat Widget',inject:'💉 Inject',copy:'📋 Copy Code'},
  fr:{tab:'AI Chat',title:'🤖 Chat IA Persona',sub:'Widget Chatbot IA Configurable',
      botName:'Nom du Bot',botNameP:'ex. Alex (Support)',persona:'Persona/Rôle',personaP:'ex. Support Technique Amical',
      greeting:'Message d\'accueil',greetingP:'ex. Bonjour! Comment puis-je vous aider?',color:'Couleur Accent',
      btn:'🤖 Générer Widget Chat',inject:'💉 Injecter',copy:'📋 Copier Code'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
var st={name:'Alex',persona:'Customer Support',greet:'Hi! How can I help you today?',color:'#3b82f6'};

function buildChatHTML(d){
  return '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>AI Chat Widget</title>'+
  '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">'+
  '<style>*{margin:0;padding:0;box-sizing:border-box;font-family:Inter,sans-serif;}'+
  'body{background:#f1f5f9;height:100vh;}'+
  '.cw{position:fixed;bottom:20px;right:20px;z-index:9999;}'+
  '.cb{width:60px;height:60px;border-radius:50%;background:'+d.color+';box-shadow:0 4px 15px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.2s;}'+
  '.cb:hover{transform:scale(1.05);}'+
  '.ci{fill:#fff;width:30px;height:30px;}'+
  '.cp{position:absolute;bottom:80px;right:0;width:350px;height:500px;background:#fff;border-radius:16px;box-shadow:0 10px 40px rgba(0,0,0,0.15);display:none;flex-direction:column;overflow:hidden;transform-origin:bottom right;animation:scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);}'+
  '@keyframes scaleIn{from{opacity:0;transform:scale(0.8);}to{opacity:1;transform:scale(1);}}'+
  '.ch{background:'+d.color+';padding:20px;color:#fff;display:flex;align-items:center;gap:12px;position:relative;}'+
  '.ca{width:40px;height:40px;background:rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold;}'+
  '.ci-info{flex:1;}'+
  '.cn{font-weight:700;font-size:16px;margin-bottom:2px;}'+
  '.cp-role{font-size:12px;opacity:0.9;}'+
  '.cx{position:absolute;top:20px;right:20px;cursor:pointer;font-size:20px;opacity:0.8;}'+
  '.cx:hover{opacity:1;}'+
  '.cm-area{flex:1;background:#f8fafc;padding:20px;overflow-y:auto;display:flex;flex-direction:column;gap:12px;}'+
  '.cm{max-width:80%;padding:12px 16px;border-radius:16px;font-size:14px;line-height:1.5;animation:fadeIn 0.3s ease;}'+
  '@keyframes fadeIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:none;}}'+
  '.cm.bot{background:#fff;color:#1e293b;border:1px solid #e2e8f0;border-bottom-left-radius:4px;align-self:flex-start;}'+
  '.cm.user{background:'+d.color+';color:#fff;border-bottom-right-radius:4px;align-self:flex-end;}'+
  '.cin{padding:16px;background:#fff;border-top:1px solid #e2e8f0;display:flex;gap:10px;}'+
  '.cin input{flex:1;border:none;background:#f1f5f9;padding:12px 16px;border-radius:24px;outline:none;font-size:14px;}'+
  '.cin button{background:'+d.color+';color:#fff;border:none;width:40px;height:40px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;}'+
  '</style></head><body>'+
  '<div class="cw">'+
  '<div class="cb" onclick="toggleChat()"><svg class="ci" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg></div>'+
  '<div class="cp" id="chatPanel">'+
  '<div class="ch"><div class="ca">'+d.name.charAt(0)+'</div><div class="ci-info"><div class="cn">'+d.name+'</div><div class="cp-role">'+d.persona+'</div></div><div class="cx" onclick="toggleChat()">×</div></div>'+
  '<div class="cm-area" id="chatMsgs"><div class="cm bot">'+d.greet+'</div></div>'+
  '<div class="cin"><input type="text" id="chatInp" placeholder="Type a message..." onkeypress="if(event.key===\'Enter\')sendMsg()"><button onclick="sendMsg()">➤</button></div>'+
  '</div></div>'+
  '<script>'+
  'var open=false;function toggleChat(){open=!open;document.getElementById("chatPanel").style.display=open?"flex":"none";}'+
  'function sendMsg(){var inp=document.getElementById("chatInp");var txt=inp.value.trim();if(!txt)return;inp.value="";addMsg(txt,"user");setTimeout(function(){addMsg("I am a simulated AI for "+'+JSON.stringify(d.brand)+'+". In a real setup, I would be connected to an LLM endpoint.","bot");},1000);}'+
  'function addMsg(txt,type){var m=document.createElement("div");m.className="cm "+type;m.textContent=txt;var area=document.getElementById("chatMsgs");area.appendChild(m);area.scrollTop=area.scrollHeight;}'+
  '<\/script></body></html>';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(59,130,246,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(59,130,246,0.1),rgba(147,197,253,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#60a5fa;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=document.createElement('input');i.id='ac-'+k;i.placeholder=ph;i.value=st[k]||'';i.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(59,130,246,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  body.appendChild(fi('name',t('botName'),t('botNameP')));
  body.appendChild(fi('persona',t('persona'),t('personaP')));
  body.appendChild(fi('greet',t('greeting'),t('greetingP')));
  
  var cx=document.createElement('div');cx.style='display:flex;align-items:center;gap:8px;';
  var cl=document.createElement('div');cl.style='font-size:9px;color:#94a3b8;font-weight:700;flex:1;';cl.textContent=t('color');
  var ci=document.createElement('input');ci.type='color';ci.id='ac-color';ci.value=st.color;ci.style='width:44px;height:30px;background:#0d1117;border:1px solid rgba(59,130,246,0.25);border-radius:6px;cursor:pointer;padding:2px;';ci.oninput=function(){st.color=this.value;};
  cx.appendChild(cl);cx.appendChild(ci);body.appendChild(cx);

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#1e3a8a,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(59,130,246,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var ib=document.createElement('button');ib.innerHTML=t('inject');ib.style='flex:1;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(ib);ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var html='';
  btn.onclick=function(){['name','persona','greet','color'].forEach(function(k){var el=document.getElementById('ac-'+k);if(el)st[k]=el.value||st[k];});html=buildChatHTML(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#60a5fa;">✅ Chat Widget generated!</div>';if(window.showToast)window.showToast('🤖 Chat Widget ready!');};
  ib.onclick=function(){if(!html)return;var inj=window.injectCode||(window.parent&&window.parent.injectCode);if(typeof inj==='function'){inj(html);if(window.showToast)window.showToast('✅ Injected!');}};
  cb.onclick=function(){if(html&&navigator.clipboard)navigator.clipboard.writeText(html).then(function(){if(window.showToast)window.showToast('📋 Copied!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='aichat'){window.activeTab='aichat';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-aichat');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-aichat');if(el)el.textContent=t('tab');if(window.activeTab==='aichat')render();};
});
})();
