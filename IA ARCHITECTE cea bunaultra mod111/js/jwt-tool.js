/**
 * JWT Decoder/Builder v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'JWT',title:'🔐 JWT Decoder/Builder',sub:'Decode, inspect & build JWT tokens',
      decode:'Decode',build:'Build',token:'Paste JWT Token:',tokenPh:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      header:'Header',payload:'Payload',signature:'Signature',status:'Status',
      valid:'✅ Valid structure',invalid:'❌ Invalid JWT format',expired:'⚠️ Token expired',
      expIn:'Expires in:',issuedAt:'Issued at:',
      secret:'Secret (for verification):',secretPh:'your-secret-key',
      buildSub:'Subject:',buildIss:'Issuer:',buildExp:'Expires in (hours):',
      btnBuild:'🔨 Build Token',btnCopy:'📋 Copy',btnDecode:'🔍 Decode',
      copied:'📋 Copied!',built:'✅ Token built!'},
  fr:{tab:'JWT',title:'🔐 JWT Décodeur/Constructeur',sub:'Décodez, inspectez & construisez des JWT',
      decode:'Décoder',build:'Construire',token:'Collez le Token JWT :',tokenPh:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      header:'En-tête',payload:'Charge utile',signature:'Signature',status:'Statut',
      valid:'✅ Structure valide',invalid:'❌ Format JWT invalide',expired:'⚠️ Token expiré',
      expIn:'Expire dans :',issuedAt:'Émis le :',
      secret:'Secret (vérification) :',secretPh:'votre-clé-secrète',
      buildSub:'Sujet :',buildIss:'Émetteur :',buildExp:'Expire dans (heures) :',
      btnBuild:'🔨 Construire Token',btnCopy:'📋 Copier',btnDecode:'🔍 Décoder',
      copied:'📋 Copié !',built:'✅ Token construit !'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var mode='decode';
var lastToken='';

function b64decode(str){
  try{return JSON.parse(atob(str.replace(/-/g,'+').replace(/_/g,'/')+Array(4-(str.length%4||4)%4).fill('=').join('')));}
  catch(e){return null;}
}

function decodeJWT(token){
  var parts=token.trim().split('.');
  if(parts.length!==3)return null;
  var header=b64decode(parts[0]);
  var payload=b64decode(parts[1]);
  if(!header||!payload)return null;
  return{header:header,payload:payload,sig:parts[2],parts:parts};
}

function buildJWT(sub,iss,expHours){
  var header={alg:'HS256',typ:'JWT'};
  var now=Math.floor(Date.now()/1000);
  var payload={sub:sub,iss:iss,iat:now,exp:now+expHours*3600};
  function enc(obj){return btoa(JSON.stringify(obj)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');}
  var h=enc(header);var p=enc(payload);
  return h+'.'+p+'.HMAC_SIGNATURE_REQUIRED_SERVER_SIDE';
}

function formatTime(ts){
  if(!ts)return'—';
  var d=new Date(ts*1000);
  return d.toLocaleString();
}

function timeUntil(ts){
  if(!ts)return'—';
  var diff=(ts-Date.now()/1000);
  if(diff<0)return gl()==='fr'?'Expiré':'Expired';
  var h=Math.floor(diff/3600);var m=Math.floor((diff%3600)/60);
  return h+'h '+m+'m';
}

function syntaxColor(obj){
  var json=JSON.stringify(obj,null,2);
  return json.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g,'<span style="color:#60a5fa;">$1</span>$2')
    .replace(/:\s*("(?:[^"\\]|\\.)*")/g,': <span style="color:#86efac;">$1</span>')
    .replace(/:\s*(\d+)/g,': <span style="color:#fbbf24;">$1</span>')
    .replace(/:\s*(true|false|null)/g,': <span style="color:#f472b6;">$1</span>');
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(34,197,94,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(34,197,94,0.08),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#4ade80;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  // Mode tabs
  var modeTabs=document.createElement('div');modeTabs.style='display:flex;border-bottom:1px solid rgba(255,255,255,0.06);';
  [['decode',t('decode')],['build',t('build')]].forEach(function(m){
    var btn=document.createElement('button');
    btn.textContent=m[1];btn.style='flex:1;padding:9px;font-size:11px;font-weight:700;cursor:pointer;border:none;' +
      'background:'+(mode===m[0]?'rgba(74,222,128,0.1)':'transparent')+';' +
      'color:'+(mode===m[0]?'#4ade80':'#64748b')+';' +
      'border-bottom:2px solid '+(mode===m[0]?'#4ade80':'transparent')+';';
    btn.onclick=function(){mode=m[0];renderTab();};
    modeTabs.appendChild(btn);
  });
  wrap.appendChild(modeTabs);

  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  if(mode==='decode'){
    var tlabel=document.createElement('div');tlabel.style='font-size:10px;color:#64748b;font-weight:600;';tlabel.textContent=t('token');body.appendChild(tlabel);
    var tinp=document.createElement('textarea');tinp.id='jwt-input';tinp.placeholder=t('tokenPh');tinp.rows=4;
    tinp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(74,222,128,0.2);padding:8px 10px;border-radius:8px;font-size:9px;outline:none;width:100%;box-sizing:border-box;resize:vertical;font-family:"JetBrains Mono",monospace;line-height:1.4;';
    tinp.value=lastToken;body.appendChild(tinp);

    var decBtn=document.createElement('button');decBtn.innerHTML=t('btnDecode');
    decBtn.style='width:100%;background:linear-gradient(135deg,#14532d,#16a34a);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
    decBtn.onclick=function(){lastToken=(document.getElementById('jwt-input')||{}).value||'';renderTab();};
    body.appendChild(decBtn);

    if(lastToken){
      var decoded=decodeJWT(lastToken);
      var statusEl=document.createElement('div');
      if(!decoded){
        statusEl.style='padding:8px 12px;border-radius:8px;font-size:10px;font-weight:700;background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.3);';
        statusEl.textContent=t('invalid');
      } else {
        var exp=decoded.payload.exp;var isExp=exp&&(exp<Date.now()/1000);
        statusEl.style='padding:8px 12px;border-radius:8px;font-size:10px;font-weight:700;' +
          (isExp?'background:rgba(245,158,11,0.12);color:#fbbf24;border:1px solid rgba(245,158,11,0.3);':'background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.25);');
        statusEl.textContent=isExp?t('expired'):t('valid');
      }
      body.appendChild(statusEl);

      if(decoded){
        if(decoded.payload.exp){
          var metaRow=document.createElement('div');metaRow.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
          [{l:t('issuedAt'),v:formatTime(decoded.payload.iat)},{l:t('expIn'),v:timeUntil(decoded.payload.exp)}].forEach(function(m){
            var c=document.createElement('div');c.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px;';
            c.innerHTML='<div style="font-size:8px;color:#64748b;margin-bottom:2px;">'+m.l+'</div><div style="font-size:10px;font-weight:700;color:#fbbf24;">'+m.v+'</div>';
            metaRow.appendChild(c);
          });
          body.appendChild(metaRow);
        }

        [[t('header'),decoded.header,'#3b82f6'],[t('payload'),decoded.payload,'#10b981'],[t('signature'),{value:decoded.sig.substring(0,20)+'...'},'#f59e0b']].forEach(function(sec){
          var sl=document.createElement('div');sl.style='font-size:10px;color:'+sec[2]+';font-weight:700;';sl.textContent=sec[0];body.appendChild(sl);
          var pre=document.createElement('pre');
          pre.style='background:#0d1117;border:1px solid '+sec[2]+'33;border-radius:8px;padding:10px;font-size:8.5px;color:#c9d1d9;overflow:auto;max-height:100px;white-space:pre-wrap;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;';
          pre.innerHTML=syntaxColor(sec[1]);body.appendChild(pre);
        });

        var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
        cpBtn.style='width:100%;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.25);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
        cpBtn.onclick=function(){navigator.clipboard.writeText(JSON.stringify(decoded.payload,null,2)).then(function(){if(window.showToast)window.showToast(t('copied'));});};
        body.appendChild(cpBtn);
      }
    }
  } else {
    function mkInp(lk,id,ph,val){
      var d=document.createElement('div');d.style='display:flex;flex-direction:column;gap:3px;';
      var l=document.createElement('div');l.style='font-size:10px;color:#64748b;font-weight:600;';l.textContent=t(lk);
      var i=document.createElement('input');i.type='text';i.id=id;i.placeholder=ph||'';i.value=val||'';
      i.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(74,222,128,0.2);padding:8px;border-radius:8px;font-size:10px;outline:none;width:100%;box-sizing:border-box;';
      d.appendChild(l);d.appendChild(i);return d;
    }
    body.appendChild(mkInp('buildSub','jwt-sub','user@example.com',''));
    body.appendChild(mkInp('buildIss','jwt-iss','myapp.com',''));
    body.appendChild(mkInp('buildExp','jwt-exp','24','24'));

    var buildBtn=document.createElement('button');buildBtn.innerHTML=t('btnBuild');
    buildBtn.style='width:100%;background:linear-gradient(135deg,#14532d,#16a34a);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
    buildBtn.onclick=function(){
      var sub=(document.getElementById('jwt-sub')||{}).value||'user';
      var iss=(document.getElementById('jwt-iss')||{}).value||'app';
      var exp=parseFloat((document.getElementById('jwt-exp')||{}).value||24);
      var token=buildJWT(sub,iss,exp);
      var out=document.getElementById('jwt-built-out');if(out){out.textContent=token;out.parentElement.style.display='block';}
      if(window.showToast)window.showToast(t('built'));
    };
    body.appendChild(buildBtn);

    var outWrap=document.createElement('div');outWrap.style='display:none;';
    var outPre=document.createElement('pre');outPre.id='jwt-built-out';
    outPre.style='background:#0d1117;border:1px solid rgba(74,222,128,0.25);border-radius:8px;padding:10px;font-size:8.5px;color:#4ade80;white-space:pre-wrap;word-break:break-all;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;';
    var cpBtn2=document.createElement('button');cpBtn2.innerHTML=t('btnCopy');
    cpBtn2.style='width:100%;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.25);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;margin-top:6px;';
    cpBtn2.onclick=function(){var out=document.getElementById('jwt-built-out');if(out)navigator.clipboard.writeText(out.textContent).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    outWrap.appendChild(outPre);outWrap.appendChild(cpBtn2);body.appendChild(outWrap);
  }

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-jwt');if(el)el.textContent=t('tab');if(window.activeTab==='jwt')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='jwt'){window.activeTab='jwt';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-jwt');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
