(function(){
'use strict';
var T={
  en:{tab:'Regex Forge',title:'🧩 Regex Forge',sub:'Visual Regex Builder & Tester',btnRun:'🛠️ Build Regex',lblIn:'Input String:',lblOut:'Generated Regex:',msg:'Regex built successfully!'},
  fr:{tab:'Forge Regex',title:'🧩 Forge Regex',sub:'Générateur & Testeur Visuel',btnRun:'🛠️ Générer Regex',lblIn:'Chaîne d\'entrée:',lblOut:'Regex Générée:',msg:'Regex construite avec succès!'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(16,185,129,0.3);background:linear-gradient(135deg,rgba(4,120,87,0.3),rgba(16,185,129,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#34d399;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var lbl1=document.createElement('div');lbl1.style='font-size:11px;color:#94a3b8;';lbl1.innerText=tl('lblIn');
  b.appendChild(lbl1);
  var inp=document.createElement('input');inp.type='text';inp.placeholder='e.g. user@email.com';
  inp.style='width:100%;background:#0f172a;border:1px solid #334155;color:#e2e8f0;padding:8px;border-radius:6px;font-size:12px;outline:none;';
  b.appendChild(inp);

  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#047857,#10b981);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);margin-top:5px;';
  b.appendChild(btn);

  var lbl2=document.createElement('div');lbl2.style='font-size:11px;color:#94a3b8;margin-top:10px;';lbl2.innerText=tl('lblOut');
  b.appendChild(lbl2);
  var out=document.createElement('div');
  out.style='width:100%;background:#1e293b;border:1px solid #334155;color:#34d399;padding:10px;border-radius:6px;font-family:monospace;font-size:12px;min-height:40px;word-break:break-all;';
  b.appendChild(out);

  btn.onclick=function(){
    var val = inp.value.trim();
    if(!val) { out.innerText = '/.*/g'; return; }
    var rx = '';
    if(val.includes('@') && val.includes('.')) {
      rx = '/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/g';
    } else if(/^\\d+$/.test(val)) {
      rx = '/^\\d+$/g';
    } else if(/^https?:\/\//.test(val)) {
      rx = '/^https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/g';
    } else {
      rx = '/' + val.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '/g';
    }
    out.innerText = rx;
    if(window.editor) {
      var current = window.editor.getValue();
      window.editor.setValue(current + '\n\n// Regex Test\nconst regex = ' + rx + ';\nconst testStr = "' + val + '";\nconsole.log(regex.test(testStr));');
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-regexforge');if(el)el.textContent=tl('tab');if(window.activeTab==='regexforge')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='regexforge'){window.activeTab='regexforge';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-regexforge');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
