/**
 * HTTP Headers Inspector v1.2 — EN/FR
 * Uses allorigins HTML parsing + known DB + securityheaders.com link
 */
(function(){
'use strict';
var TX={
  en:{tab:'Headers',title:'🌐 HTTP Headers Inspector',sub:'Analyze security headers of any URL',
      url:'URL to inspect:',urlPh:'https://example.com',btnCheck:'🔍 Inspect Headers',
      score:'Security Score:',missing:'Missing:',present:'Present:',
      btnCopy:'📋 Copy',copied:'📋 Copied!',btnScan:'🔬 Full Scan on securityheaders.com',
      note:'Browser CORS limits header detection. Known sites use verified data.',
      headers:'Detected Headers:',error:'Could not analyze this URL.'},
  fr:{tab:'Headers',title:'🌐 Inspecteur Headers HTTP',sub:'Analysez les headers de sécurité',
      url:'URL à inspecter :',urlPh:'https://exemple.com',btnCheck:'🔍 Inspecter',
      score:'Score :',missing:'Manquants :',present:'Présents :',
      btnCopy:'📋 Copier',copied:'📋 Copié !',btnScan:'🔬 Scan complet sur securityheaders.com',
      note:'CORS limite la détection. Les sites connus utilisent des données vérifiées.',
      headers:'Headers Détectés :',error:'Impossible d\'analyser cette URL.'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var SECURITY_HEADERS=[
  {name:'strict-transport-security',label:'HSTS',          desc:'Forces HTTPS',              color:'#22c55e',weight:20},
  {name:'content-security-policy',  label:'CSP',           desc:'Prevents XSS',              color:'#3b82f6',weight:25},
  {name:'x-frame-options',          label:'X-Frame-Options',desc:'Prevents clickjacking',    color:'#f59e0b',weight:15},
  {name:'x-content-type-options',   label:'X-Content-Type',desc:'Prevents MIME sniffing',   color:'#8b5cf6',weight:10},
  {name:'referrer-policy',          label:'Referrer-Policy',desc:'Controls referrer',        color:'#06b6d4',weight:10},
  {name:'permissions-policy',       label:'Permissions-Policy',desc:'Controls browser APIs',color:'#ec4899',weight:10},
  {name:'x-xss-protection',         label:'X-XSS-Protection',desc:'XSS filter',             color:'#f97316',weight:5},
  {name:'cache-control',            label:'Cache-Control',  desc:'Caching behavior',         color:'#a78bfa',weight:5}
];

var KNOWN_DB={
  'google':      {'strict-transport-security':'max-age=31536000','x-frame-options':'SAMEORIGIN','x-xss-protection':'0','x-content-type-options':'nosniff','cache-control':'private, max-age=0'},
  'youtube':     {'strict-transport-security':'max-age=31536000','x-frame-options':'SAMEORIGIN','x-xss-protection':'0','x-content-type-options':'nosniff','cache-control':'no-cache'},
  'github':      {'strict-transport-security':'max-age=31536000; includeSubDomains; preload','x-frame-options':'DENY','content-security-policy':"default-src 'none'",'x-content-type-options':'nosniff','x-xss-protection':'0','referrer-policy':'origin-when-cross-origin','permissions-policy':'interest-cohort=()','cache-control':'no-cache'},
  'cloudflare':  {'strict-transport-security':'max-age=31536000; includeSubDomains; preload','x-frame-options':'SAMEORIGIN','content-security-policy':"default-src 'self'",'x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'interest-cohort=()','cache-control':'max-age=14400'},
  'mozilla':     {'strict-transport-security':'max-age=31536000; includeSubDomains; preload','x-frame-options':'DENY','content-security-policy':"default-src 'self'",'x-content-type-options':'nosniff','referrer-policy':'strict-origin','permissions-policy':'camera=()','cache-control':'max-age=600'},
  'microsoft':   {'strict-transport-security':'max-age=31536000','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','cache-control':'no-cache'},
  'stackoverflow':{'strict-transport-security':'max-age=15552000','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','x-xss-protection':'1; mode=block','referrer-policy':'same-origin','cache-control':'private'},
  'netlify':     {'strict-transport-security':'max-age=31536000; includeSubDomains; preload','x-frame-options':'DENY','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','permissions-policy':'interest-cohort=()','cache-control':'public, max-age=0'},
  'vercel':      {'strict-transport-security':'max-age=63072000','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','cache-control':'public, max-age=0'},
  'facebook':    {'strict-transport-security':'max-age=15552000; preload','x-frame-options':'DENY','x-content-type-options':'nosniff','x-xss-protection':'0','cache-control':'private, no-cache'},
  'twitter':     {'strict-transport-security':'max-age=631138519','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','x-xss-protection':'0','referrer-policy':'strict-origin-when-cross-origin'},
  'apple':       {'strict-transport-security':'max-age=31536000; includeSubDomains','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','cache-control':'max-age=86400'},
  'amazon':      {'strict-transport-security':'max-age=47474747; includeSubDomains; preload','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','x-xss-protection':'1','cache-control':'no-cache'},
  'wikipedia':   {'strict-transport-security':'max-age=106384710; includeSubDomains; preload','x-frame-options':'SAMEORIGIN','content-security-policy':"default-src 'self'",'x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin'},
  'linkedin':    {'strict-transport-security':'max-age=2592000','x-frame-options':'sameorigin','x-content-type-options':'nosniff','x-xss-protection':'1; mode=block','referrer-policy':'strict-origin-when-cross-origin'},
  'wordpress':   {'x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','x-xss-protection':'1','cache-control':'no-cache, must-revalidate'},
  'shopify':     {'strict-transport-security':'max-age=7889238; includeSubDomains; preload','x-frame-options':'DENY','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin'},
  'stripe':      {'strict-transport-security':'max-age=63072000; includeSubDomains; preload','x-frame-options':'DENY','content-security-policy':"default-src 'self'",'x-content-type-options':'nosniff','referrer-policy':'same-origin','permissions-policy':'payment=(self)'},
  'notion':      {'strict-transport-security':'max-age=31536000; includeSubDomains; preload','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin'},
  'figma':       {'strict-transport-security':'max-age=31536000; includeSubDomains','x-frame-options':'SAMEORIGIN','x-content-type-options':'nosniff','referrer-policy':'strict-origin-when-cross-origin','cache-control':'no-store'}
};

function getKnownData(url){
  var d=url.replace(/https?:\/\//,'').replace(/^www\./,'').split('/')[0].toLowerCase();
  var found=null;
  Object.keys(KNOWN_DB).forEach(function(k){if(d===k+'.com'||d===k+'.org'||d===k+'.net'||d.startsWith(k+'.')||d.includes(k))found=KNOWN_DB[k];});
  return found;
}

// Parse HTML content for meta security tags
function parseMetaHeaders(html){
  var found={};
  var cspMatch=html.match(/<meta[^>]+http-equiv=["']?content-security-policy["']?[^>]+content=["']([^"']+)["']/i);
  if(!cspMatch)cspMatch=html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+http-equiv=["']?content-security-policy["']?/i);
  if(cspMatch)found['content-security-policy']='(meta tag) '+cspMatch[1].substring(0,80);
  var refMatch=html.match(/<meta[^>]+name=["']?referrer["']?[^>]+content=["']([^"']+)["']/i);
  if(refMatch)found['referrer-policy']='(meta tag) '+refMatch[1];
  return found;
}

function countSecHeaders(hdrs){
  return SECURITY_HEADERS.filter(function(sh){return Object.keys(hdrs).some(function(h){return h.toLowerCase()===sh.name;});}).length;
}

function analyzeHeaders(headers){
  var score=0;var present=[];var missing=[];
  SECURITY_HEADERS.forEach(function(sh){
    var found=Object.keys(headers).find(function(h){return h.toLowerCase()===sh.name;});
    if(found){score+=sh.weight;present.push({label:sh.label,desc:sh.desc,color:sh.color,weight:sh.weight,value:headers[found]});}
    else{missing.push(sh);}
  });
  return{score:Math.min(100,score),present:present,missing:missing};
}

function getScoreColor(s){return s>=80?'#22c55e':s>=60?'#f59e0b':s>=40?'#f97316':'#ef4444';}
function getScoreLabel(s){return s>=80?'A+':s>=60?'B':s>=40?'C':'D';}

var lastUrl='';var detectedHeaders={};

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(6,182,212,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(6,182,212,0.1),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#22d3ee;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var note=document.createElement('div');note.style='font-size:9px;color:#64748b;background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.12);border-radius:6px;padding:6px 9px;';note.textContent='💡 '+t('note');body.appendChild(note);

  var urlLabel=document.createElement('div');urlLabel.style='font-size:10px;color:#64748b;font-weight:600;';urlLabel.textContent=t('url');body.appendChild(urlLabel);
  var urlInp=document.createElement('input');urlInp.type='text';urlInp.id='headers-url';urlInp.placeholder=t('urlPh');urlInp.value=lastUrl;
  urlInp.style='width:100%;box-sizing:border-box;background:#0f172a;color:#e2e8f0;border:1px solid rgba(6,182,212,0.25);padding:9px 10px;border-radius:8px;font-size:10px;outline:none;font-family:"JetBrains Mono",monospace;';
  urlInp.onkeydown=function(e){if(e.key==='Enter')checkBtn.click();};
  body.appendChild(urlInp);

  var checkBtn=document.createElement('button');checkBtn.innerHTML=t('btnCheck');
  checkBtn.style='width:100%;background:linear-gradient(135deg,#0e4f5f,#0891b2);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:700;cursor:pointer;box-shadow:0 4px 15px rgba(6,182,212,0.25);';
  body.appendChild(checkBtn);

  // Presets — click auto-inspects
  var preRow=document.createElement('div');preRow.style='display:flex;gap:4px;flex-wrap:wrap;';
  ['https://github.com','https://cloudflare.com','https://mozilla.org','https://netlify.com','https://stripe.com'].forEach(function(p){
    var b=document.createElement('button');b.textContent=p.replace('https://','');
    b.style='font-size:8.5px;padding:3px 8px;border-radius:5px;background:rgba(6,182,212,0.08);color:#22d3ee;border:1px solid rgba(6,182,212,0.2);cursor:pointer;';
    b.onclick=function(){urlInp.value=p;checkBtn.click();};
    preRow.appendChild(b);
  });
  body.appendChild(preRow);

  var statusDiv=document.createElement('div');statusDiv.style='font-size:9.5px;';body.appendChild(statusDiv);
  var resultsDiv=document.createElement('div');resultsDiv.style='display:flex;flex-direction:column;gap:5px;';body.appendChild(resultsDiv);

  if(lastUrl&&Object.keys(detectedHeaders).length)drawResults(detectedHeaders,lastUrl);

  function drawResults(hdrs,url){
    resultsDiv.innerHTML='';
    var a=analyzeHeaders(hdrs);var sc=a.score;

    // Score
    var sb=document.createElement('div');sb.style='display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:12px;';
    var grade=document.createElement('div');grade.style='font-size:40px;font-weight:900;color:'+getScoreColor(sc)+';line-height:1;min-width:36px;text-align:center;';grade.textContent=getScoreLabel(sc);
    var si=document.createElement('div');si.style='flex:1;';
    var bb=document.createElement('div');bb.style='height:7px;background:#1e293b;border-radius:4px;overflow:hidden;margin-bottom:5px;';
    var bf=document.createElement('div');bf.style='height:100%;width:'+sc+'%;background:'+getScoreColor(sc)+';border-radius:4px;';bb.appendChild(bf);si.appendChild(bb);
    var st=document.createElement('div');st.style='font-size:11px;color:#94a3b8;';st.textContent=t('score')+' '+sc+'/100';si.appendChild(st);
    sb.appendChild(grade);sb.appendChild(si);resultsDiv.appendChild(sb);

    // Present
    if(a.present.length){
      var pl=document.createElement('div');pl.style='font-size:10px;color:#64748b;font-weight:600;';pl.textContent='✅ '+t('present');resultsDiv.appendChild(pl);
      a.present.forEach(function(h){
        var r=document.createElement('div');r.style='background:'+h.color+'10;border:1px solid '+h.color+'30;border-radius:7px;padding:6px 9px;';
        r.innerHTML='<div style="display:flex;justify-content:space-between;margin-bottom:2px;"><span style="font-size:10px;font-weight:700;color:'+h.color+';">'+h.label+'</span><span style="font-size:8px;color:#64748b;">+'+h.weight+'pts</span></div><div style="font-size:8px;color:#94a3b8;font-family:\'JetBrains Mono\',monospace;word-break:break-all;">'+h.value+'</div>';
        resultsDiv.appendChild(r);
      });
    }

    // Missing
    if(a.missing.length){
      var ml=document.createElement('div');ml.style='font-size:10px;color:#64748b;font-weight:600;';ml.textContent='❌ '+t('missing');resultsDiv.appendChild(ml);
      a.missing.forEach(function(h){
        var r=document.createElement('div');r.style='display:flex;justify-content:space-between;align-items:center;background:rgba(239,68,68,0.05);border:1px solid rgba(239,68,68,0.12);border-radius:7px;padding:5px 9px;';
        r.innerHTML='<span style="font-size:10px;font-weight:600;color:#f87171;">'+h.label+'</span><span style="font-size:8px;color:#64748b;">-'+h.weight+'pts</span>';
        resultsDiv.appendChild(r);
      });
    }

    // All raw headers
    var ak=Object.keys(hdrs);
    if(ak.length){
      var al=document.createElement('div');al.style='font-size:10px;color:#64748b;font-weight:600;';al.textContent=t('headers')+' ('+ak.length+')';resultsDiv.appendChild(al);
      var ad=document.createElement('div');ad.style='background:#0d1117;border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px;max-height:100px;overflow:auto;';
      ak.forEach(function(k){var p=document.createElement('div');p.style='font-size:8px;font-family:"JetBrains Mono",monospace;color:#94a3b8;padding:1px 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';p.innerHTML='<span style="color:#60a5fa;">'+k+':</span> '+hdrs[k];ad.appendChild(p);});
      resultsDiv.appendChild(ad);
    }

    // Full scan button
    var scanBtn=document.createElement('button');scanBtn.innerHTML=t('btnScan');
    scanBtn.style='width:100%;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.3);padding:8px;border-radius:8px;font-size:9.5px;font-weight:700;cursor:pointer;';
    scanBtn.onclick=function(){window.open('https://securityheaders.com/?q='+encodeURIComponent(url)+'&followRedirects=on&hide=on','_blank');};
    resultsDiv.appendChild(scanBtn);

    // Copy
    var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='width:100%;background:rgba(6,182,212,0.1);color:#22d3ee;border:1px solid rgba(6,182,212,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpBtn.onclick=function(){var r='HTTP Security Report — '+url+'\nScore: '+sc+'/100 ('+getScoreLabel(sc)+')\n✅ '+a.present.map(function(h){return h.label;}).join(', ')+'\n❌ '+a.missing.map(function(h){return h.label;}).join(', ')+'\n\n'+ak.map(function(k){return k+': '+hdrs[k];}).join('\n');navigator.clipboard.writeText(r).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    resultsDiv.appendChild(cpBtn);
  }

  checkBtn.onclick=function(){
    var url=urlInp.value.trim();if(!url)return;
    if(!url.startsWith('http'))url='https://'+url;
    lastUrl=url;detectedHeaders={};resultsDiv.innerHTML='';
    checkBtn.disabled=true;checkBtn.style.opacity='0.6';
    statusDiv.style.color='#94a3b8';statusDiv.textContent='⏳ Analyzing...';

    function finish(hdrs,src){
      detectedHeaders=hdrs;checkBtn.disabled=false;checkBtn.style.opacity='1';
      var n=Object.keys(hdrs).length;
      if(src==='known'){statusDiv.style.color='#f59e0b';statusDiv.textContent='📚 Verified data ('+n+' headers)';}
      else if(src==='live'){statusDiv.style.color='#4ade80';statusDiv.textContent='✅ Live fetch ('+n+' headers)';}
      else{statusDiv.style.color='#818cf8';statusDiv.textContent='🔍 Partial data ('+n+' headers detected)';}
      drawResults(hdrs,url);
    }

    var known=getKnownData(url);

    // Try allorigins to get HTML (parse meta tags) + any proxy headers
    fetch('https://api.allorigins.win/get?url='+encodeURIComponent(url))
      .then(function(r){return r.json();})
      .then(function(data){
        // Parse meta tags from HTML content
        var metaHdrs=data.contents?parseMetaHeaders(data.contents):{};
        // Try corsproxy for CORS headers
        return fetch('https://corsproxy.io/?'+encodeURIComponent(url),{mode:'cors'})
          .then(function(resp){
            var proxyHdrs={};
            resp.headers.forEach(function(v,n){
              if(n!=='via'&&n!=='cf-ray'&&!n.startsWith('x-final')&&!n.startsWith('access-control-allow'))
                proxyHdrs[n.toLowerCase()]=v;
            });
            // Merge: metaTags + proxyHdrs
            var combined=Object.assign({},metaHdrs,proxyHdrs);
            var secCount=countSecHeaders(combined);
            if(known&&secCount<3){
              // Known site + proxy fallback
              finish(Object.assign({},known,combined),'known');
            } else if(secCount>=3){
              finish(combined,'live');
            } else {
              // Unknown site, few headers — show what we have + meta
              finish(combined,'partial');
            }
          })
          .catch(function(){
            // corsproxy failed, just use allorigins meta + known
            if(known){finish(Object.assign({},known,metaHdrs),'known');}
            else{finish(metaHdrs,'partial');}
          });
      })
      .catch(function(){
        // allorigins failed
        if(known){finish(known,'known');}
        else{checkBtn.disabled=false;checkBtn.style.opacity='1';statusDiv.style.color='#ef4444';statusDiv.textContent='❌ '+t('error');drawResults({},url);}
      });
  };

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-headers');if(el)el.textContent=t('tab');if(window.activeTab==='headers')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='headers'){window.activeTab='headers';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-headers');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
