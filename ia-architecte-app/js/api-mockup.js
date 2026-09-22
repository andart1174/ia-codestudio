/**
 * 🔧 API Mockup Builder — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'API Mockup',title:'🔧 API Mockup Builder',sub:'Generate fake REST API snippets with mock delay',
      endpoint:'Endpoint Name',endP:'e.g. /api/users',method:'Method',
      status:'Status Code',delay:'Mock Delay (ms)',
      json:'JSON Response',btn:'🔧 Generate API Mock',inject:'💉 Inject',copy:'📋 Copy Fetch Code'},
  fr:{tab:'API Mockup',title:'🔧 Créateur API Mockup',sub:'Générez des snippets REST API avec délai simulé',
      endpoint:'Nom de l\'Endpoint',endP:'ex. /api/users',method:'Méthode',
      status:'Code Statut',delay:'Délai simulé (ms)',
      json:'Réponse JSON',btn:'🔧 Générer Mock API',inject:'💉 Injecter',copy:'📋 Copier Code Fetch'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var st={endpoint:'/api/users',method:'GET',status:'200',delay:800,json:'[\n  {\n    "id": 1,\n    "name": "Alice Cooper",\n    "role": "Admin"\n  },\n  {\n    "id": 2,\n    "name": "Bob Smith",\n    "role": "User"\n  }\n]'};

function buildMockCode(d){
  return '// 🔧 Simulated '+d.method+' '+d.endpoint+'\n'+
  'function fetchMockData() {\n'+
  '  return new Promise((resolve, reject) => {\n'+
  '    setTimeout(() => {\n'+
  '      const status = '+d.status+';\n'+
  '      const data = '+d.json+';\n\n'+
  '      if (status >= 200 && status < 300) {\n'+
  '        resolve({ ok: true, status, json: () => Promise.resolve(data) });\n'+
  '      } else {\n'+
  '        reject({ ok: false, status, message: "Mock API Error" });\n'+
  '      }\n'+
  '    }, '+d.delay+');\n'+
  '  });\n'+
  '}\n\n'+
  '// Usage Example:\n'+
  'fetchMockData()\n'+
  '  .then(res => res.json())\n'+
  '  .then(data => console.log("Success:", data))\n'+
  '  .catch(err => console.error("Error:", err));';
}

function render(){
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(14,165,233,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(14,165,233,0.1),rgba(56,189,248,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#38bdf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px;';

  function fi(k,lbl,ph,area){var d=document.createElement('div');var l=document.createElement('div');l.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';l.textContent=lbl;var i=area?document.createElement('textarea'):document.createElement('input');i.id='am-'+k;i.placeholder=ph;if(area){i.rows=8;i.style='resize:none;font-family:monospace;';}i.value=st[k]||'';i.style=(i.style.cssText||'')+'width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(14,165,233,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';i.oninput=function(){st[k]=this.value;};d.appendChild(l);d.appendChild(i);return d;}
  
  body.appendChild(fi('endpoint',t('endpoint'),t('endP')));
  
  var cr=document.createElement('div');cr.style='display:grid;grid-template-columns:1fr 1fr;gap:8px;';
  var dm=document.createElement('div');var lm=document.createElement('div');lm.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';lm.textContent=t('method');
  var sel=document.createElement('select');sel.id='am-method';sel.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(14,165,233,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';
  ['GET','POST','PUT','DELETE','PATCH'].forEach(function(m){var o=document.createElement('option');o.value=m;o.textContent=m;if(st.method===m)o.selected=true;sel.appendChild(o);});
  sel.onchange=function(){st.method=this.value;};dm.appendChild(lm);dm.appendChild(sel);cr.appendChild(dm);
  
  var ds=document.createElement('div');var ls=document.createElement('div');ls.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';ls.textContent=t('status');var is=document.createElement('input');is.type='number';is.id='am-status';is.value=st.status;is.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(14,165,233,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';is.oninput=function(){st.status=this.value;};ds.appendChild(ls);ds.appendChild(is);cr.appendChild(ds);
  body.appendChild(cr);

  var dd=document.createElement('div');var ld=document.createElement('div');ld.style='font-size:9px;color:#94a3b8;font-weight:700;margin-bottom:3px;';ld.textContent=t('delay');var id=document.createElement('input');id.type='number';id.id='am-delay';id.value=st.delay;id.style='width:100%;background:#0d1117;color:#e2e8f0;border:1px solid rgba(14,165,233,0.25);border-radius:6px;padding:7px 9px;font-size:10px;outline:none;box-sizing:border-box;';id.oninput=function(){st.delay=parseInt(this.value)||0;};dd.appendChild(ld);dd.appendChild(id);body.appendChild(dd);

  body.appendChild(fi('json',t('json'),'',true));

  var btn=document.createElement('button');btn.innerHTML=t('btn');btn.style='width:100%;background:linear-gradient(135deg,#0284c7,#0ea5e9);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;margin-top:4px;box-shadow:0 4px 15px rgba(14,165,233,0.3);';body.appendChild(btn);
  var ar=document.createElement('div');ar.style='display:none;gap:6px;';
  var cb=document.createElement('button');cb.innerHTML=t('copy');cb.style='flex:1;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1);padding:8px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;';
  ar.appendChild(cb);body.appendChild(ar);
  var res=document.createElement('div');body.appendChild(res);
  wrap.appendChild(body);p.appendChild(wrap);
  
  var code='';
  btn.onclick=function(){st.endpoint=(document.getElementById('am-endpoint')||{}).value||st.endpoint;st.status=(document.getElementById('am-status')||{}).value||st.status;st.delay=parseInt((document.getElementById('am-delay')||{}).value)||st.delay;st.json=(document.getElementById('am-json')||{}).value||st.json;
    try{JSON.parse(st.json);}catch(e){res.innerHTML='<div style="color:#ef4444;font-size:10px;">❌ Invalid JSON Format</div>';return;}
    code=buildMockCode(st);ar.style.display='flex';res.innerHTML='<div style="background:rgba(14,165,233,0.08);border:1px solid rgba(14,165,233,0.2);border-radius:8px;padding:10px;margin-top:4px;font-size:10px;color:#38bdf8;">✅ Mock API code generated!</div>';if(window.showToast)window.showToast('🔧 Mock API generated!');
  };
  cb.onclick=function(){if(code&&navigator.clipboard)navigator.clipboard.writeText(code).then(function(){if(window.showToast)window.showToast('📋 Copied Fetch Code!');});};
}
document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='apimock'){window.activeTab='apimock';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var b=document.getElementById('tab-apimock');if(b)b.classList.add('active');render();return;}if(typeof oRT==='function')oRT(tab);};
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-apimock');if(el)el.textContent=t('tab');if(window.activeTab==='apimock')render();};
});
})();
