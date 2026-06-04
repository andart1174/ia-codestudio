/**
 * Sitemap Generator v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Sitemap',title:'🗺️ Sitemap Generator',sub:'Generate sitemap.xml & robots.txt',
      baseUrl:'Base URL:',baseUrlPh:'https://myapp.com',btnScan:'🔍 Scan & Generate',
      btnCopy:'📋 Copy',btnInject:'📥 Export Files',
      sitemap:'sitemap.xml',robots:'robots.txt',
      pages:'Pages Detected:',generated:'Generated Files:',
      freq:'Change Frequency:',priority:'Priority:',
      copied:'📋 Copied!',generated_msg:'✅ Generated!',
      freqs:{always:'Always',hourly:'Hourly',daily:'Daily',weekly:'Weekly',monthly:'Monthly',never:'Never'},
      tip:'Scans your code for anchor links and page patterns to auto-detect URLs.'},
  fr:{tab:'Sitemap',title:'🗺️ Générateur Sitemap',sub:'Générez sitemap.xml & robots.txt',
      baseUrl:'URL de base :',baseUrlPh:'https://monapp.com',btnScan:'🔍 Scanner & Générer',
      btnCopy:'📋 Copier',btnInject:'📥 Exporter',
      sitemap:'sitemap.xml',robots:'robots.txt',
      pages:'Pages Détectées :',generated:'Fichiers Générés :',
      freq:'Fréquence de mise à jour :',priority:'Priorité :',
      copied:'📋 Copié !',generated_msg:'✅ Généré !',
      freqs:{always:'Toujours',hourly:'Horaire',daily:'Quotidien',weekly:'Hebdomadaire',monthly:'Mensuel',never:'Jamais'},
      tip:'Scanne votre code pour les liens et patterns de pages pour détecter les URLs automatiquement.'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}
function tf(k){return((TX[gl()]||TX.en).freqs||TX.en.freqs)[k]||k;}

var pages=[];
var generated={sitemap:'',robots:''};
var activeFile='sitemap';

function scanCode(code,base){
  var found=new Set();found.add('/');
  // href links
  var hrefRx=/<a[^>]+href="([^"#]*)"[^>]*>/gi;var m;
  while((m=hrefRx.exec(code))!==null){var h=m[1];if(h&&!h.startsWith('http')&&!h.startsWith('mailto')&&!h.startsWith('tel'))found.add(h||'/');}
  // nav items with section names
  var navRx=/href="#([^"]+)"/gi;while((m=navRx.exec(code))!==null)found.add('/'+m[1]);
  // Page titles suggest pages
  var titleRx=/<(?:h1|h2|title)[^>]*>([^<]{3,30})<\/(?:h1|h2|title)>/gi;
  while((m=titleRx.exec(code))!==null){
    var slug=m[1].toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'').substring(0,30);
    if(slug&&slug!=='my-app'&&found.size<20)found.add('/'+slug);
  }
  return Array.from(found).map(function(p,i){
    return{path:p,url:(base+p).replace(/\/+/g,'/').replace(':/','/'+'/'),
      priority:i===0?'1.0':i<3?'0.8':'0.6',freq:'weekly',lastmod:new Date().toISOString().split('T')[0]};
  });
}

function genSitemap(pgs){
  var urls=pgs.map(function(p){return'  <url>\n    <loc>'+p.url+'</loc>\n    <lastmod>'+p.lastmod+'</lastmod>\n    <changefreq>'+p.freq+'</changefreq>\n    <priority>'+p.priority+'</priority>\n  </url>';}).join('\n');
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'+urls+'\n</urlset>';
}

function genRobots(base){
  return 'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nDisallow: /_next/\nDisallow: /private/\n\nSitemap: '+base+'/sitemap.xml\n\n# Crawl delay\nCrawl-delay: 10';
}

function getVal(id){return((document.getElementById(id)||{}).value||'').trim();}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.08),rgba(6,182,212,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#34d399;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  var tip=document.createElement('div');tip.style='font-size:9.5px;color:#94a3b8;background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.15);border-radius:6px;padding:7px 9px;';tip.textContent=t('tip');body.appendChild(tip);

  var blabel=document.createElement('div');blabel.style='font-size:10px;color:#64748b;font-weight:600;';blabel.textContent=t('baseUrl');body.appendChild(blabel);
  var binp=document.createElement('input');binp.type='text';binp.id='sm-base';binp.placeholder=t('baseUrlPh');binp.value='https://myapp.com';
  binp.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(16,185,129,0.2);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;width:100%;box-sizing:border-box;';
  body.appendChild(binp);

  var scanBtn=document.createElement('button');scanBtn.innerHTML=t('btnScan');
  scanBtn.style='width:100%;background:linear-gradient(135deg,#065f46,#059669);color:#fff;border:none;padding:11px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(5,150,105,0.35);';
  scanBtn.onclick=function(){
    var code=window.editor?window.editor.getValue():'';
    var base=getVal('sm-base').replace(/\/$/,'');
    pages=scanCode(code,base);
    generated.sitemap=genSitemap(pages);
    generated.robots=genRobots(base);
    renderTab();
  };
  body.appendChild(scanBtn);

  if(pages.length){
    var plabel=document.createElement('div');plabel.style='font-size:10px;color:#64748b;font-weight:600;';plabel.textContent=t('pages')+' ('+pages.length+')';body.appendChild(plabel);
    var plist=document.createElement('div');plist.style='display:flex;flex-direction:column;gap:3px;max-height:100px;overflow-y:auto;';
    pages.forEach(function(p){
      var row=document.createElement('div');row.style='display:flex;align-items:center;gap:8px;padding:5px 8px;background:rgba(16,185,129,0.05);border:1px solid rgba(16,185,129,0.12);border-radius:6px;font-size:9px;';
      row.innerHTML='<span style="color:#34d399;font-family:\'JetBrains Mono\',monospace;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+p.path+'</span><span style="color:#fbbf24;">'+p.priority+'</span><span style="color:#64748b;">'+p.freq+'</span>';
      plist.appendChild(row);
    });
    body.appendChild(plist);

    var glabel=document.createElement('div');glabel.style='font-size:10px;color:#64748b;font-weight:600;';glabel.textContent=t('generated');body.appendChild(glabel);
    var fTabs=document.createElement('div');fTabs.style='display:flex;gap:5px;';
    [['sitemap','sitemap.xml','#10b981'],['robots','robots.txt','#f59e0b']].forEach(function(f){
      var btn=document.createElement('button');btn.textContent=f[1];
      btn.style='flex:1;padding:7px;border-radius:7px;font-size:9px;font-weight:700;cursor:pointer;border:1px solid '+(activeFile===f[0]?f[2]:'rgba(255,255,255,0.08)')+';background:'+(activeFile===f[0]?f[2]+'22':'rgba(255,255,255,0.02)')+';color:'+(activeFile===f[0]?f[2]:'#64748b')+';';
      btn.onclick=function(){activeFile=f[0];renderTab();};
      fTabs.appendChild(btn);
    });
    body.appendChild(fTabs);

    var pre=document.createElement('pre');
    pre.style='background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px;font-size:8px;color:#c9d1d9;overflow:auto;max-height:160px;white-space:pre-wrap;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.4;';
    pre.textContent=generated[activeFile]||'';body.appendChild(pre);

    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
    cpBtn.style='width:100%;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){navigator.clipboard.writeText(generated[activeFile]||'').then(function(){if(window.showToast)window.showToast(t('copied'));});};
    body.appendChild(cpBtn);
  }

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-sitemap');if(el)el.textContent=t('tab');if(window.activeTab==='sitemap')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='sitemap'){window.activeTab='sitemap';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-sitemap');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
