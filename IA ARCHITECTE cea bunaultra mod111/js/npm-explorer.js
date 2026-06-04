/**
 * NPM Package Explorer v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'NPM',title:'📦 NPM Package Explorer',sub:'Search, explore & inject any npm package',
      search:'Search packages:',ph:'e.g. axios, lodash, chart.js...',btnSearch:'🔍 Search',
      btnInject:'💉 Inject via CDN',btnCopy:'📋 Copy',injected:'✅ Package injected!',
      copied:'📋 Copied!',weekly:'weekly downloads',version:'version',
      noResults:'No results. Try another name.',popular:'⭐ Popular Packages:',
      usage:'Usage Example:'},
  fr:{tab:'NPM',title:'📦 Explorateur NPM',sub:'Cherchez, explorez & injectez n\'importe quel package',
      search:'Rechercher des packages :',ph:'ex. axios, lodash, chart.js...',btnSearch:'🔍 Rechercher',
      btnInject:'💉 Injecter via CDN',btnCopy:'📋 Copier',injected:'✅ Package injecté !',
      copied:'📋 Copié !',weekly:'téléchargements/semaine',version:'version',
      noResults:'Aucun résultat. Essayez un autre nom.',popular:'⭐ Packages Populaires :',
      usage:'Exemple d\'utilisation :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var POPULAR=[
  {name:'axios',desc:'Promise-based HTTP client',cdn:'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js',usage:'axios.get("/api").then(r=>console.log(r.data));',stars:'⭐100k',color:'#5a67d8'},
  {name:'lodash',desc:'Utility library for JS',cdn:'https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js',usage:'_.chunk([1,2,3,4], 2); // [[1,2],[3,4]]',stars:'⭐58k',color:'#3182ce'},
  {name:'chart.js',desc:'Beautiful chart library',cdn:'https://cdn.jsdelivr.net/npm/chart.js',usage:'new Chart(ctx, { type:"bar", data:{...} });',stars:'⭐64k',color:'#f6ad55'},
  {name:'dayjs',desc:'Lightweight date library',cdn:'https://cdn.jsdelivr.net/npm/dayjs/dayjs.min.js',usage:'dayjs().format("YYYY-MM-DD");',stars:'⭐45k',color:'#68d391'},
  {name:'animate.css',desc:'CSS animations library',cdn:'https://cdn.jsdelivr.net/npm/animate.css/animate.min.css',usage:'<div class="animate__animated animate__bounce">',stars:'⭐79k',color:'#f687b3'},
  {name:'three.js',desc:'3D graphics in browser',cdn:'https://cdn.jsdelivr.net/npm/three@0.160/build/three.min.js',usage:'const scene=new THREE.Scene(); const camera=new THREE.PerspectiveCamera(75,w/h,0.1,1000);',stars:'⭐98k',color:'#76e4f7'},
  {name:'gsap',desc:'Professional animation',cdn:'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',usage:'gsap.to(".box", { x:100, duration:1 });',stars:'⭐18k',color:'#9f7aea'},
  {name:'alpinejs',desc:'Lightweight reactive framework',cdn:'https://cdn.jsdelivr.net/npm/alpinejs@3/dist/cdn.min.js',usage:'<div x-data="{ open:false }"><button @click="open=!open">Toggle</button></div>',stars:'⭐27k',color:'#4dc0b5'},
  {name:'sortablejs',desc:'Drag & drop lists',cdn:'https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js',usage:'Sortable.create(document.getElementById("list"), { animation:150 });',stars:'⭐28k',color:'#fc8181'},
  {name:'qrcode',desc:'QR code generator',cdn:'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js',usage:'QRCode.toCanvas(canvas, "https://myapp.com", function(err){});',stars:'⭐8k',color:'#b794f4'}
];

var results=[];

function searchPackages(query){
  var q=query.toLowerCase().trim();
  if(!q)return POPULAR;
  return POPULAR.filter(function(p){return p.name.includes(q)||p.desc.toLowerCase().includes(q);});
}

function injectPackage(pkg){
  if(!window.editor)return;
  var code=window.editor.getValue();
  var isCSS=pkg.cdn.endsWith('.css');
  var tag=isCSS?'<link rel="stylesheet" href="'+pkg.cdn+'">'
    :'<script src="'+pkg.cdn+'"><\/script>';
  if(code.includes(pkg.cdn)){if(window.showToast)window.showToast('Already included!');return;}
  if(isCSS){
    if(code.includes('</head>'))code=code.replace('</head>',tag+'\n</head>');
    else code=tag+'\n'+code;
  } else {
    if(code.includes('</head>'))code=code.replace('</head>',tag+'\n</head>');
    else if(code.includes('</body>'))code=code.replace('</body>',tag+'\n</body>');
    else code+='\n'+tag;
  }
  window.editor.setValue(code);
  if(window.runPreview)window.runPreview();
  if(window.showToast)window.showToast(t('injected')+' ('+pkg.name+')');
}

function renderTab(){
  var parent=document.getElementById('left-body');
  if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');
  hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(245,158,11,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Search
  var slabel=document.createElement('div');slabel.style='font-size:10px;color:#64748b;font-weight:600;';slabel.textContent=t('search');body.appendChild(slabel);
  var srow=document.createElement('div');srow.style='display:flex;gap:6px;';
  var sinp=document.createElement('input');sinp.type='text';sinp.id='npm-search';sinp.placeholder=t('ph');
  sinp.style='flex:1;background:#1e293b;color:#e2e8f0;border:1px solid rgba(245,158,11,0.2);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;';
  var sbtn=document.createElement('button');sbtn.innerHTML=t('btnSearch');
  sbtn.style='background:rgba(245,158,11,0.2);color:#fbbf24;border:1px solid rgba(245,158,11,0.4);padding:8px 10px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;';
  sbtn.onclick=function(){results=searchPackages((document.getElementById('npm-search')||{}).value||'');renderResults(body);};
  sinp.onkeydown=function(e){if(e.key==='Enter')sbtn.click();};
  srow.appendChild(sinp);srow.appendChild(sbtn);body.appendChild(srow);

  var rlabel=document.createElement('div');rlabel.id='npm-rlabel';rlabel.style='font-size:10px;color:#64748b;font-weight:600;';rlabel.textContent=t('popular');body.appendChild(rlabel);
  var rlist=document.createElement('div');rlist.id='npm-results';rlist.style='display:flex;flex-direction:column;gap:6px;';
  body.appendChild(rlist);
  wrap.appendChild(body);parent.appendChild(wrap);

  results=POPULAR;
  renderResults(body);
}

function renderResults(body){
  var rlist=document.getElementById('npm-results');if(!rlist)return;rlist.innerHTML='';
  var rlabel=document.getElementById('npm-rlabel');
  if(rlabel)rlabel.textContent=results.length?t('popular')+(results.length<POPULAR.length?' ('+results.length+' results)':''):t('noResults');
  results.forEach(function(pkg){
    var card=document.createElement('div');
    card.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-left:3px solid '+pkg.color+';border-radius:8px;padding:10px;';
    card.innerHTML='<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">' +
      '<span style="font-size:11px;font-weight:900;color:'+pkg.color+';">'+pkg.name+'</span>' +
      '<span style="font-size:9px;color:#64748b;">'+pkg.stars+'</span></div>' +
      '<div style="font-size:9.5px;color:#94a3b8;margin-bottom:6px;">'+pkg.desc+'</div>' +
      '<pre style="background:#0d1117;border-radius:5px;padding:6px;font-size:8.5px;color:#86efac;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;margin:0;font-family:\'JetBrains Mono\',monospace;">'+pkg.usage.replace(/</g,'&lt;')+'</pre>';
    var brow=document.createElement('div');brow.style='display:flex;gap:6px;margin-top:8px;';
    var ib=document.createElement('button');ib.innerHTML=t('btnInject');
    ib.style='flex:1;background:'+pkg.color+'22;color:'+pkg.color+';border:1px solid '+pkg.color+'44;padding:6px;border-radius:6px;font-size:9px;font-weight:700;cursor:pointer;';
    ib.onclick=(function(p){return function(){injectPackage(p);};})(pkg);
    var cb=document.createElement('button');cb.innerHTML=t('btnCopy');
    cb.style='background:rgba(255,255,255,0.05);color:#64748b;border:1px solid rgba(255,255,255,0.1);padding:6px 8px;border-radius:6px;font-size:9px;font-weight:700;cursor:pointer;';
    var isCSS=pkg.cdn.endsWith('.css');
    var tag=isCSS?'<link rel="stylesheet" href="'+pkg.cdn+'">':'<script src="'+pkg.cdn+'"><\/script>';
    cb.onclick=(function(tg){return function(){navigator.clipboard.writeText(tg).then(function(){if(window.showToast)window.showToast(t('copied'));});};})(tag);
    brow.appendChild(ib);brow.appendChild(cb);card.appendChild(brow);rlist.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-npmexplorer');if(el)el.textContent=t('tab');if(window.activeTab==='npmexplorer')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='npmexplorer'){window.activeTab='npmexplorer';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-npmexplorer');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
