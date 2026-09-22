(function(){
'use strict';
var T={
  en:{tab:'Cron Studio',title:'⏳ Cron Studio',sub:'Visual Task Scheduler',btnRun:'⚙️ Generate Cron',lbl1:'Select Frequency:',val1:'Every Day at Midnight',val2:'Every Monday at 4 AM',val3:'Every 15 Minutes',val4:'First Day of Month',lbl2:'Cron Syntax:',msg:'Added to editor.'},
  fr:{tab:'Studio Cron',title:'⏳ Studio Cron',sub:'Planificateur Visuel de Tâches',btnRun:'⚙️ Générer Cron',lbl1:'Sélectionner la Fréquence:',val1:'Tous les Jours à Minuit',val2:'Chaque Lundi à 4h00',val3:'Toutes les 15 Minutes',val4:'Premier Jour du Mois',lbl2:'Syntaxe Cron:',msg:'Ajouté à l\'éditeur.'}
};
function tl(k){return (T[window.lang||'en']||T.en)[k]||k;}

function renderTab(){
  var p=document.getElementById('left-body');if(!p)return;
  p.innerHTML='';
  var w=document.createElement('div');w.style='display:flex;flex-direction:column;height:100%;background:#0c0f1a;';
  var h=document.createElement('div');h.style='padding:12px 14px;border-bottom:1px solid rgba(248,113,113,0.3);background:linear-gradient(135deg,rgba(153,27,27,0.3),rgba(248,113,113,0.06));';
  h.innerHTML='<div style="font-size:13px;font-weight:900;color:#f87171;">'+tl('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+tl('sub')+'</div>';
  w.appendChild(h);
  var b=document.createElement('div');b.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';
  
  var lbl1=document.createElement('div');lbl1.style='font-size:11px;color:#94a3b8;';lbl1.innerText=tl('lbl1');
  b.appendChild(lbl1);
  
  var sel=document.createElement('select');
  sel.style='width:100%;background:#0f172a;border:1px solid #334155;color:#e2e8f0;padding:8px;border-radius:6px;font-size:12px;outline:none;';
  sel.innerHTML='<option value="0 0 * * *">'+tl('val1')+'</option><option value="0 4 * * 1">'+tl('val2')+'</option><option value="*/15 * * * *">'+tl('val3')+'</option><option value="0 0 1 * *">'+tl('val4')+'</option>';
  b.appendChild(sel);

  var btn=document.createElement('button');btn.innerHTML=tl('btnRun');
  btn.style='width:100%;background:linear-gradient(135deg,#991b1b,#ef4444);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(239,68,68,0.3);margin-top:5px;';
  b.appendChild(btn);

  var lbl2=document.createElement('div');lbl2.style='font-size:11px;color:#94a3b8;margin-top:10px;';lbl2.innerText=tl('lbl2');
  b.appendChild(lbl2);
  var out=document.createElement('div');
  out.style='width:100%;background:#1e293b;border:1px solid #334155;color:#f87171;padding:15px;border-radius:6px;font-family:monospace;font-size:16px;font-weight:bold;text-align:center;letter-spacing:2px;';
  out.innerText = sel.value;
  b.appendChild(out);

  sel.onchange = function(){ out.innerText = sel.value; };

  btn.onclick=function(){
    var v = sel.value;
    if(window.editor) {
      var current = window.editor.getValue();
      var code = '\n\n// Cron Job Schedule\n// ' + sel.options[sel.selectedIndex].text + '\nconst cronSchedule = "' + v + '";\n';
      window.editor.setValue(current + code);
    }
  };
  w.appendChild(b);p.appendChild(w);
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-cronstudio');if(el)el.textContent=tl('tab');if(window.activeTab==='cronstudio')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(t){if(t==='cronstudio'){window.activeTab='cronstudio';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-cronstudio');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(t);};
});
})();
