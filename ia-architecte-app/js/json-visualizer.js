/**
 * JSON Visualizer v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'JSON',title:'📊 JSON Visualizer',sub:'Paste JSON → interactive tree view',
      paste:'Paste JSON here...',btnParse:'🔍 Parse & Visualize',btnCopy:'📋 Copy',
      btnFormat:'✨ Format',btnMinify:'⚡ Minify',search:'Search keys...',
      nodes:'nodes',copied:'📋 Copied!',error:'❌ Invalid JSON',
      lines:'lines',size:'size',expand:'Expand All',collapse:'Collapse All'},
  fr:{tab:'JSON',title:'📊 Visualiseur JSON',sub:'Collez JSON → vue arborescente',
      paste:'Collez votre JSON ici...',btnParse:'🔍 Parser & Visualiser',btnCopy:'📋 Copier',
      btnFormat:'✨ Formater',btnMinify:'⚡ Minifier',search:'Rechercher clés...',
      nodes:'noeuds',copied:'📋 Copié !',error:'❌ JSON invalide',
      lines:'lignes',size:'taille',expand:'Tout Déplier',collapse:'Tout Plier'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var parsedData=null;var rawJson='';

var SAMPLE='{\n  "studio": "IA Architecte",\n  "version": 3.7,\n  "modules": ["editor","AR","gradient","password"],\n  "settings": {\n    "language": "en",\n    "theme": "dark",\n    "ai": true\n  },\n  "stats": {\n    "users": 1500,\n    "modules": 40,\n    "rating": 4.9\n  }\n}';

function countNodes(obj,count){
  count=count||0;if(obj===null||typeof obj!=='object')return count+1;
  Object.keys(obj).forEach(function(k){count=countNodes(obj[k],count)+1;});return count;
}

function getTypeColor(val){
  if(val===null)return'#ef4444';if(typeof val==='boolean')return'#f59e0b';
  if(typeof val==='number')return'#60a5fa';if(typeof val==='string')return'#4ade80';
  if(Array.isArray(val))return'#c084fc';return'#94a3b8';
}

function getTypeLabel(val){
  if(val===null)return'null';if(Array.isArray(val))return'['+val.length+']';
  return typeof val;
}

function buildTree(obj,key,depth,search){
  depth=depth||0;
  var wrap=document.createElement('div');wrap.style='margin-left:'+(depth>0?14:0)+'px;';
  var isObj=obj!==null&&typeof obj==='object';
  var keyMatch=search&&key&&key.toLowerCase().includes(search.toLowerCase());
  if(isObj){
    var keys=Object.keys(obj);
    var header=document.createElement('div');header.style='display:flex;align-items:center;gap:5px;cursor:pointer;padding:2px 0;user-select:none;';
    var arrow=document.createElement('span');arrow.style='font-size:8px;color:#64748b;transition:transform 0.2s;';arrow.textContent='▶';
    var keySpan=document.createElement('span');keySpan.style='font-size:10px;font-weight:700;color:'+(keyMatch?'#fbbf24':'#818cf8')+';font-family:"JetBrains Mono",monospace;';keySpan.textContent=(key!==undefined?'"'+key+'" : ':'')+(Array.isArray(obj)?'[':'{')+' ';
    var countSpan=document.createElement('span');countSpan.style='font-size:9px;color:#334155;';countSpan.textContent=(Array.isArray(obj)?obj.length+' items':keys.length+' keys');
    header.appendChild(arrow);header.appendChild(keySpan);header.appendChild(countSpan);
    var children=document.createElement('div');children.style='border-left:1px solid rgba(255,255,255,0.07);margin-left:6px;padding-left:6px;';
    keys.forEach(function(k){children.appendChild(buildTree(obj[k],k,depth+1,search));});
    var isCollapsed=depth>2&&!search;
    if(isCollapsed){children.style.display='none';arrow.style.transform='rotate(0deg)';}
    else{arrow.style.transform='rotate(90deg)';}
    header.onclick=function(){
      var collapsed=children.style.display==='none';
      children.style.display=collapsed?'block':'none';
      arrow.style.transform=collapsed?'rotate(90deg)':'rotate(0deg)';
    };
    wrap.appendChild(header);wrap.appendChild(children);
    var close=document.createElement('div');close.style='font-size:10px;color:#818cf8;font-family:"JetBrains Mono",monospace;padding:1px 0 1px 18px;';close.textContent=(Array.isArray(obj)?']':'}');wrap.appendChild(close);
  } else {
    var leaf=document.createElement('div');leaf.style='display:flex;align-items:center;gap:5px;padding:2px 0;';
    var typeTag=document.createElement('span');typeTag.style='font-size:8px;background:'+getTypeColor(obj)+'22;color:'+getTypeColor(obj)+';padding:1px 5px;border-radius:3px;font-family:"JetBrains Mono",monospace;flex-shrink:0;';typeTag.textContent=getTypeLabel(obj);
    var kSpan=document.createElement('span');kSpan.style='font-size:10px;color:'+(keyMatch?'#fbbf24':'#94a3b8')+';font-family:"JetBrains Mono",monospace;';kSpan.textContent=(key!==undefined?'"'+key+'" : ':'');
    var vSpan=document.createElement('span');vSpan.style='font-size:10px;color:'+getTypeColor(obj)+';font-family:"JetBrains Mono",monospace;cursor:pointer;';
    vSpan.textContent=JSON.stringify(obj);vSpan.title='Click to copy';
    vSpan.onclick=function(){navigator.clipboard.writeText(JSON.stringify(obj));};
    leaf.appendChild(typeTag);leaf.appendChild(kSpan);leaf.appendChild(vSpan);wrap.appendChild(leaf);
  }
  return wrap;
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(99,102,241,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(6,182,212,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#818cf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  // Input area
  var ta=document.createElement('textarea');ta.id='json-input';ta.placeholder=t('paste');ta.value=rawJson||SAMPLE;ta.rows=5;
  ta.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(99,102,241,0.2);border-radius:8px;padding:10px;font-size:9px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.4;';
  body.appendChild(ta);

  // Actions row
  var actRow=document.createElement('div');actRow.style='display:flex;gap:5px;flex-wrap:wrap;';
  function mkBtn(label,color,onclick){var b=document.createElement('button');b.innerHTML=label;b.style='font-size:9.5px;padding:6px 10px;border-radius:7px;border:1px solid '+color+'44;background:'+color+'15;color:'+color+';cursor:pointer;font-weight:700;';b.onclick=onclick;return b;}
  actRow.appendChild(mkBtn(t('btnParse'),'#818cf8',function(){
    try{rawJson=ta.value;parsedData=JSON.parse(rawJson);renderTreeSection('');}
    catch(e){if(window.showToast)window.showToast(t('error'));}
  }));
  actRow.appendChild(mkBtn(t('btnFormat'),'#34d399',function(){
    try{ta.value=JSON.stringify(JSON.parse(ta.value),null,2);}catch(e){if(window.showToast)window.showToast(t('error'));}
  }));
  actRow.appendChild(mkBtn(t('btnMinify'),'#fbbf24',function(){
    try{ta.value=JSON.stringify(JSON.parse(ta.value));}catch(e){if(window.showToast)window.showToast(t('error'));}
  }));
  actRow.appendChild(mkBtn(t('btnCopy'),'#60a5fa',function(){navigator.clipboard.writeText(ta.value).then(function(){if(window.showToast)window.showToast(t('copied'));});}));
  body.appendChild(actRow);

  // Stats bar
  var statsDiv=document.createElement('div');statsDiv.id='json-stats';statsDiv.style='display:flex;gap:6px;';
  if(parsedData!==null){
    [{v:rawJson.split('\n').length,l:t('lines')},{v:countNodes(parsedData),l:t('nodes')},{v:(rawJson.length/1024).toFixed(2)+' KB',l:t('size')}].forEach(function(s){
      var d=document.createElement('div');d.style='flex:1;background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.15);border-radius:6px;padding:5px 8px;text-align:center;';
      d.innerHTML='<div style="font-size:11px;font-weight:700;color:#818cf8;">'+s.v+'</div><div style="font-size:8px;color:#64748b;">'+s.l+'</div>';
      statsDiv.appendChild(d);
    });
  }
  body.appendChild(statsDiv);

  // Search
  var searchInp=document.createElement('input');searchInp.type='text';searchInp.placeholder='🔍 '+t('search');
  searchInp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.07);padding:7px 10px;border-radius:7px;font-size:10px;outline:none;width:100%;box-sizing:border-box;';
  searchInp.oninput=function(){if(parsedData!==null)renderTreeSection(this.value);};
  body.appendChild(searchInp);

  // Expand/Collapse controls
  if(parsedData!==null){
    var ecRow=document.createElement('div');ecRow.style='display:flex;gap:5px;';
    [t('expand'),t('collapse')].forEach(function(label,isCollapse){
      var b=document.createElement('button');b.textContent=label;b.style='flex:1;font-size:9px;padding:5px;border-radius:6px;background:rgba(255,255,255,0.03);color:#64748b;border:1px solid rgba(255,255,255,0.07);cursor:pointer;';
      b.onclick=function(){document.querySelectorAll('#json-tree div[style*="border-left"]').forEach(function(el){el.style.display=isCollapse?'none':'block';});};
      ecRow.appendChild(b);
    });
    body.appendChild(ecRow);
  }

  // Tree container
  var treeDiv=document.createElement('div');treeDiv.id='json-tree';
  treeDiv.style='background:#0d1117;border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:10px;overflow:auto;flex:1;min-height:100px;';
  if(parsedData!==null){treeDiv.appendChild(buildTree(parsedData,undefined,0,searchInp.value));}
  else{treeDiv.innerHTML='<div style="color:#334155;font-size:10px;text-align:center;padding:20px;">'+(gl()==='fr'?'Cliquez "Parser" pour visualiser':'Click "Parse" to visualize')+'</div>';}
  body.appendChild(treeDiv);
  wrap.appendChild(body);parent.appendChild(wrap);

  function renderTreeSection(search){
    treeDiv.innerHTML='';
    if(parsedData!==null)treeDiv.appendChild(buildTree(parsedData,undefined,0,search));
    // Update stats
    statsDiv.innerHTML='';
    [{v:rawJson.split('\n').length,l:t('lines')},{v:countNodes(parsedData),l:t('nodes')},{v:(rawJson.length/1024).toFixed(2)+' KB',l:t('size')}].forEach(function(s){
      var d=document.createElement('div');d.style='flex:1;background:rgba(99,102,241,0.07);border:1px solid rgba(99,102,241,0.15);border-radius:6px;padding:5px 8px;text-align:center;';
      d.innerHTML='<div style="font-size:11px;font-weight:700;color:#818cf8;">'+s.v+'</div><div style="font-size:8px;color:#64748b;">'+s.l+'</div>';
      statsDiv.appendChild(d);
    });
  }

  // Auto-parse sample
  if(!rawJson){rawJson=SAMPLE;try{parsedData=JSON.parse(rawJson);renderTreeSection('');}catch(e){}}
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-jsonviz');if(el)el.textContent=t('tab');if(window.activeTab==='jsonviz')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='jsonviz'){window.activeTab='jsonviz';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-jsonviz');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
