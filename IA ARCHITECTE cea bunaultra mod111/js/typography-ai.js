/**
 * Typography Pairing AI v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Typography',title:'🔤 Typography Pairing AI',sub:'Choose a mood → get perfect font combos',
      mood:'Choose a Mood:',preview:'Live Preview:',heading:'Your Headline Here',
      body:'The quick brown fox jumps over the lazy dog. Typography sets the tone of your brand.',
      btnInject:'💉 Inject Fonts',btnCopy:'📋 Copy @import',injected:'✅ Fonts injected!',copied:'📋 Copied!',
      headingFont:'Heading:',bodyFont:'Body:',pairings:'Font Pairings:'},
  fr:{tab:'Typography',title:'🔤 Typographie IA',sub:'Choisissez une ambiance → combos parfaits',
      mood:'Choisissez une Ambiance :',preview:'Aperçu Live :',heading:'Votre Titre Principal',
      body:'Le renard brun rapide saute par-dessus le chien paresseux. La typographie définit votre marque.',
      btnInject:'💉 Injecter Polices',btnCopy:'📋 Copier @import',injected:'✅ Polices injectées !',copied:'📋 Copié !',
      headingFont:'Titre :',bodyFont:'Corps :',pairings:'Combinaisons :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var MOODS={
  '🏆 Luxury':    {color:'#c9a84c',bg:'linear-gradient(135deg,#1a0f00,#2d1f00)',pairs:[
    {h:'Playfair Display',b:'Lato',desc:'Elegant & timeless'},
    {h:'Cormorant Garamond',b:'Montserrat',desc:'High fashion'},
    {h:'DM Serif Display',b:'DM Sans',desc:'Modern luxury'}]},
  '🎮 Playful':   {color:'#f472b6',bg:'linear-gradient(135deg,#1a0020,#000d1a)',pairs:[
    {h:'Fredoka One',b:'Nunito',desc:'Fun & friendly'},
    {h:'Baloo 2',b:'Quicksand',desc:'Rounded & bubbly'},
    {h:'Righteous',b:'Comfortaa',desc:'Geometric fun'}]},
  '💼 Corporate': {color:'#3b82f6',bg:'linear-gradient(135deg,#00001a,#001030)',pairs:[
    {h:'Roboto Slab',b:'Roboto',desc:'Google standard'},
    {h:'IBM Plex Serif',b:'IBM Plex Sans',desc:'Tech & trustworthy'},
    {h:'Source Serif 4',b:'Source Sans 3',desc:'Professional clarity'}]},
  '🎨 Creative':  {color:'#10b981',bg:'linear-gradient(135deg,#00100a,#001a15)',pairs:[
    {h:'Raleway',b:'Open Sans',desc:'Artistic & elegant'},
    {h:'Josefin Sans',b:'Karla',desc:'Geometric minimalism'},
    {h:'Abril Fatface',b:'Lora',desc:'Bold & editorial'}]},
  '⚡ Bold':      {color:'#ef4444',bg:'linear-gradient(135deg,#1a0000,#0d0000)',pairs:[
    {h:'Black Han Sans',b:'Noto Sans KR',desc:'Impact & power'},
    {h:'Bebas Neue',b:'Inter',desc:'Sports & energy'},
    {h:'Oswald',b:'Source Sans 3',desc:'Strong & direct'}]},
  '🌸 Minimal':   {color:'#94a3b8',bg:'linear-gradient(135deg,#050a10,#0a101a)',pairs:[
    {h:'Inter',b:'Inter',desc:'Pure simplicity'},
    {h:'Plus Jakarta Sans',b:'Plus Jakarta Sans',desc:'Modern neutral'},
    {h:'DM Sans',b:'DM Mono',desc:'Clean & technical'}]},
  '🌿 Nature':    {color:'#84cc16',bg:'linear-gradient(135deg,#031400,#060a00)',pairs:[
    {h:'Merriweather',b:'Open Sans',desc:'Organic & warm'},
    {h:'Lora',b:'Nunito',desc:'Earthy & readable'},
    {h:'Playfair Display',b:'Source Sans 3',desc:'Natural elegance'}]},
  '🔮 Futuristic':{color:'#8b5cf6',bg:'linear-gradient(135deg,#050010,#000a1a)',pairs:[
    {h:'Exo 2',b:'Rajdhani',desc:'Sci-fi & tech'},
    {h:'Orbitron',b:'Exo 2',desc:'Space age'},
    {h:'Audiowide',b:'Share Tech Mono',desc:'Cyberpunk'}]}
};

var selectedMood='🏆 Luxury';
var selectedPairIdx=0;
var loadedFonts={};

function loadFont(name){
  if(loadedFonts[name])return;
  var link=document.createElement('link');
  link.rel='stylesheet';
  link.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(name)+':wght@400;700;900&display=swap';
  document.head.appendChild(link);loadedFonts[name]=true;
}

function getImport(pair){
  var fonts=[pair.h,pair.b].filter(function(f,i,a){return a.indexOf(f)===i;});
  return fonts.map(function(f){return'@import url(\'https://fonts.googleapis.com/css2?family='+encodeURIComponent(f)+':wght@400;600;700;900&display=swap\');';}).join('\n');
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.12),rgba(236,72,153,0.08));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Mood selector
  var moodLabel=document.createElement('div');moodLabel.style='font-size:10px;color:#64748b;font-weight:600;';moodLabel.textContent=t('mood');body.appendChild(moodLabel);
  var moodGrid=document.createElement('div');moodGrid.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  Object.keys(MOODS).forEach(function(m){
    var mood=MOODS[m];var isA=selectedMood===m;
    var btn=document.createElement('button');btn.textContent=m;
    btn.style='padding:7px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid '+(isA?mood.color:'rgba(255,255,255,0.08)')+';background:'+(isA?mood.color+'22':'rgba(255,255,255,0.02)')+';color:'+(isA?mood.color:'#64748b')+';text-align:left;';
    btn.onclick=function(){selectedMood=m;selectedPairIdx=0;renderTab();};
    moodGrid.appendChild(btn);
  });
  body.appendChild(moodGrid);

  var mood=MOODS[selectedMood];
  // Load fonts
  mood.pairs.forEach(function(p){loadFont(p.h);loadFont(p.b);});

  // Pairing selector
  var pairLabel=document.createElement('div');pairLabel.style='font-size:10px;color:#64748b;font-weight:600;';pairLabel.textContent=t('pairings');body.appendChild(pairLabel);
  var pairRow=document.createElement('div');pairRow.style='display:flex;flex-direction:column;gap:4px;';
  mood.pairs.forEach(function(p,i){
    var isA=selectedPairIdx===i;
    var pb=document.createElement('button');
    pb.style='display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:8px;cursor:pointer;border:1px solid '+(isA?mood.color:'rgba(255,255,255,0.07)')+';background:'+(isA?mood.color+'11':'rgba(255,255,255,0.02)')+';text-align:left;';
    pb.innerHTML='<div><div style="font-family:\''+p.h+'\',serif;font-size:13px;font-weight:700;color:#e2e8f0;">'+p.h+'</div><div style="font-family:\''+p.b+'\',sans-serif;font-size:10px;color:#64748b;margin-top:1px;">'+p.b+'</div></div><div style="font-size:9px;color:'+mood.color+';font-weight:600;">'+p.desc+'</div>';
    pb.onclick=function(){selectedPairIdx=i;renderTab();};
    pairRow.appendChild(pb);
  });
  body.appendChild(pairRow);

  var pair=mood.pairs[selectedPairIdx];

  // Preview
  var pvLabel=document.createElement('div');pvLabel.style='font-size:10px;color:#64748b;font-weight:600;';pvLabel.textContent=t('preview');body.appendChild(pvLabel);
  var preview=document.createElement('div');
  preview.style='border-radius:12px;padding:20px;overflow:hidden;'+mood.bg.replace('gradient','gradient(');
  preview.style.background=mood.bg;
  preview.innerHTML=
    '<div style="font-family:\''+pair.h+'\',serif;font-size:20px;font-weight:900;color:#fff;line-height:1.2;margin-bottom:10px;">'+t('heading')+'</div>'+
    '<div style="font-family:\''+pair.b+'\',sans-serif;font-size:11px;color:rgba(255,255,255,0.7);line-height:1.6;">'+t('body')+'</div>'+
    '<div style="margin-top:12px;display:flex;gap:6px;">' +
    '<div style="background:'+mood.color+';color:#000;padding:6px 14px;border-radius:6px;font-family:\''+pair.b+'\',sans-serif;font-size:10px;font-weight:700;">CTA Button</div>'+
    '<div style="border:1px solid '+mood.color+';color:'+mood.color+';padding:6px 14px;border-radius:6px;font-family:\''+pair.b+'\',sans-serif;font-size:10px;font-weight:600;">Secondary</div></div>';
  body.appendChild(preview);

  // Info
  var infoRow=document.createElement('div');infoRow.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  [{l:t('headingFont'),v:pair.h},{l:t('bodyFont'),v:pair.b}].forEach(function(info){
    var c=document.createElement('div');c.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:8px;';
    c.innerHTML='<div style="font-size:9px;color:#64748b;margin-bottom:3px;">'+info.l+'</div><div style="font-size:11px;font-weight:700;color:'+mood.color+';font-family:\''+info.v+'\',serif;">'+info.v+'</div>';
    infoRow.appendChild(c);
  });
  body.appendChild(infoRow);

  // Actions
  var actRow=document.createElement('div');actRow.style='display:flex;gap:6px;';
  var injBtn=document.createElement('button');injBtn.innerHTML=t('btnInject');
  injBtn.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  injBtn.onclick=function(){
    if(!window.editor)return;
    var code=window.editor.getValue();
    var imports=getImport(pair);
    var cssVars='<style>\n'+imports+'\n:root{--font-heading:\''+pair.h+'\',serif;--font-body:\''+pair.b+'\',sans-serif;}\nh1,h2,h3{font-family:var(--font-heading);}\nbody,p,span,div{font-family:var(--font-body);}\n</style>';
    if(code.includes('</head>'))code=code.replace('</head>',cssVars+'\n</head>');else code=cssVars+'\n'+code;
    window.editor.setValue(code);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast(t('injected'));
  };
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
  cpBtn.style='flex:1;background:rgba(168,85,247,0.12);color:#c084fc;border:1px solid rgba(168,85,247,0.3);padding:9px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){navigator.clipboard.writeText(getImport(pair)).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  actRow.appendChild(injBtn);actRow.appendChild(cpBtn);body.appendChild(actRow);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-typography');if(el)el.textContent=t('tab');if(window.activeTab==='typography')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='typography'){window.activeTab='typography';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-typography');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
