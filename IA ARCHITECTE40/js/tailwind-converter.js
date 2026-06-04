/**
 * Tailwind Converter v1.0 — EN/FR
 * Convert CSS ↔ Tailwind classes instantly
 */
(function(){
'use strict';
var TX={
  en:{tab:'Tailwind',title:'🔲 Tailwind Converter',sub:'CSS ↔ Tailwind classes instantly',
      cssIn:'CSS to convert:',twIn:'Tailwind classes to convert:',
      btnCSS:'→ CSS to Tailwind',btnTW:'← Tailwind to CSS',
      result:'Result:',btnCopy:'📋 Copy',copied:'Copied!',noMatch:'No matching classes found.'},
  fr:{tab:'Tailwind',title:'🔲 Convertisseur Tailwind',sub:'CSS ↔ classes Tailwind instantanément',
      cssIn:'CSS à convertir :',twIn:'Classes Tailwind à convertir :',
      btnCSS:'→ CSS vers Tailwind',btnTW:'← Tailwind vers CSS',
      result:'Résultat :',btnCopy:'📋 Copier',copied:'Copié !',noMatch:'Aucune classe correspondante.'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

// CSS → Tailwind mapping
var CSS2TW=[
  // Display
  {css:/display:\s*flex/,tw:'flex'},{css:/display:\s*grid/,tw:'grid'},{css:/display:\s*block/,tw:'block'},
  {css:/display:\s*inline-block/,tw:'inline-block'},{css:/display:\s*none/,tw:'hidden'},
  {css:/display:\s*inline-flex/,tw:'inline-flex'},{css:/display:\s*inline/,tw:'inline'},
  // Flex
  {css:/flex-direction:\s*row/,tw:'flex-row'},{css:/flex-direction:\s*column/,tw:'flex-col'},
  {css:/flex-wrap:\s*wrap/,tw:'flex-wrap'},{css:/flex:\s*1/,tw:'flex-1'},
  {css:/align-items:\s*center/,tw:'items-center'},{css:/align-items:\s*flex-start/,tw:'items-start'},
  {css:/align-items:\s*flex-end/,tw:'items-end'},{css:/align-items:\s*stretch/,tw:'items-stretch'},
  {css:/justify-content:\s*center/,tw:'justify-center'},{css:/justify-content:\s*space-between/,tw:'justify-between'},
  {css:/justify-content:\s*space-around/,tw:'justify-around'},{css:/justify-content:\s*flex-end/,tw:'justify-end'},
  {css:/justify-content:\s*flex-start/,tw:'justify-start'},{css:/gap:\s*4px/,tw:'gap-1'},
  {css:/gap:\s*8px/,tw:'gap-2'},{css:/gap:\s*12px/,tw:'gap-3'},{css:/gap:\s*16px/,tw:'gap-4'},
  {css:/gap:\s*24px/,tw:'gap-6'},{css:/gap:\s*32px/,tw:'gap-8'},
  // Sizing
  {css:/width:\s*100%/,tw:'w-full'},{css:/width:\s*50%/,tw:'w-1\/2'},{css:/width:\s*auto/,tw:'w-auto'},
  {css:/height:\s*100%/,tw:'h-full'},{css:/height:\s*100vh/,tw:'h-screen'},{css:/min-height:\s*100vh/,tw:'min-h-screen'},
  {css:/max-width:\s*1280px/,tw:'max-w-7xl'},{css:/max-width:\s*1024px/,tw:'max-w-4xl'},
  {css:/max-width:\s*768px/,tw:'max-w-2xl'},{css:/max-width:\s*640px/,tw:'max-w-xl'},
  // Spacing
  {css:/padding:\s*4px/,tw:'p-1'},{css:/padding:\s*8px/,tw:'p-2'},{css:/padding:\s*12px/,tw:'p-3'},
  {css:/padding:\s*16px/,tw:'p-4'},{css:/padding:\s*24px/,tw:'p-6'},{css:/padding:\s*32px/,tw:'p-8'},
  {css:/margin:\s*auto/,tw:'mx-auto'},{css:/margin:\s*0/,tw:'m-0'},
  {css:/margin-top:\s*4px/,tw:'mt-1'},{css:/margin-top:\s*8px/,tw:'mt-2'},{css:/margin-top:\s*16px/,tw:'mt-4'},
  {css:/margin-bottom:\s*8px/,tw:'mb-2'},{css:/margin-bottom:\s*16px/,tw:'mb-4'},{css:/margin-bottom:\s*24px/,tw:'mb-6'},
  // Typography
  {css:/font-size:\s*12px/,tw:'text-xs'},{css:/font-size:\s*14px/,tw:'text-sm'},
  {css:/font-size:\s*16px/,tw:'text-base'},{css:/font-size:\s*18px/,tw:'text-lg'},
  {css:/font-size:\s*20px/,tw:'text-xl'},{css:/font-size:\s*24px/,tw:'text-2xl'},
  {css:/font-size:\s*30px/,tw:'text-3xl'},{css:/font-size:\s*36px/,tw:'text-4xl'},
  {css:/font-weight:\s*400/,tw:'font-normal'},{css:/font-weight:\s*500/,tw:'font-medium'},
  {css:/font-weight:\s*600/,tw:'font-semibold'},{css:/font-weight:\s*700/,tw:'font-bold'},
  {css:/font-weight:\s*900/,tw:'font-black'},
  {css:/text-align:\s*center/,tw:'text-center'},{css:/text-align:\s*left/,tw:'text-left'},
  {css:/text-align:\s*right/,tw:'text-right'},
  {css:/line-height:\s*1\.5/,tw:'leading-normal'},{css:/line-height:\s*2/,tw:'leading-loose'},
  // Colors (common)
  {css:/color:\s*white|color:\s*#fff/,tw:'text-white'},{css:/color:\s*black|color:\s*#000/,tw:'text-black'},
  {css:/background-color:\s*white|background:\s*white/,tw:'bg-white'},{css:/background-color:\s*black/,tw:'bg-black'},
  {css:/background-color:\s*transparent/,tw:'bg-transparent'},
  // Border
  {css:/border-radius:\s*4px/,tw:'rounded'},{css:/border-radius:\s*6px/,tw:'rounded-md'},
  {css:/border-radius:\s*8px/,tw:'rounded-lg'},{css:/border-radius:\s*12px/,tw:'rounded-xl'},
  {css:/border-radius:\s*9999px|border-radius:\s*50%/,tw:'rounded-full'},{css:/border-radius:\s*0/,tw:'rounded-none'},
  {css:/border:\s*none/,tw:'border-0'},{css:/border:\s*1px solid/,tw:'border'},
  {css:/border:\s*2px solid/,tw:'border-2'},{css:/outline:\s*none/,tw:'outline-none'},
  // Position
  {css:/position:\s*relative/,tw:'relative'},{css:/position:\s*absolute/,tw:'absolute'},
  {css:/position:\s*fixed/,tw:'fixed'},{css:/position:\s*sticky/,tw:'sticky'},
  {css:/top:\s*0/,tw:'top-0'},{css:/right:\s*0/,tw:'right-0'},{css:/bottom:\s*0/,tw:'bottom-0'},{css:/left:\s*0/,tw:'left-0'},
  // Other
  {css:/overflow:\s*hidden/,tw:'overflow-hidden'},{css:/overflow:\s*auto/,tw:'overflow-auto'},
  {css:/overflow:\s*scroll/,tw:'overflow-scroll'},{css:/overflow-x:\s*auto/,tw:'overflow-x-auto'},
  {css:/cursor:\s*pointer/,tw:'cursor-pointer'},{css:/cursor:\s*not-allowed/,tw:'cursor-not-allowed'},
  {css:/opacity:\s*0/,tw:'opacity-0'},{css:/opacity:\s*0\.5/,tw:'opacity-50'},{css:/opacity:\s*1/,tw:'opacity-100'},
  {css:/z-index:\s*10/,tw:'z-10'},{css:/z-index:\s*50/,tw:'z-50'},{css:/z-index:\s*9999/,tw:'z-[9999]'},
  {css:/box-shadow:\s*none/,tw:'shadow-none'},{css:/pointer-events:\s*none/,tw:'pointer-events-none'},
  {css:/user-select:\s*none/,tw:'select-none'},{css:/white-space:\s*nowrap/,tw:'whitespace-nowrap'},
  {css:/text-transform:\s*uppercase/,tw:'uppercase'},{css:/text-transform:\s*lowercase/,tw:'lowercase'},
  {css:/text-decoration:\s*none/,tw:'no-underline'},{css:/text-decoration:\s*underline/,tw:'underline'},
  {css:/transition:\s*all/,tw:'transition-all'},{css:/transition/,tw:'transition'},
  {css:/object-fit:\s*cover/,tw:'object-cover'},{css:/object-fit:\s*contain/,tw:'object-contain'}
];

// Tailwind → CSS mapping (reverse)
var TW2CSS={
  'flex':'display: flex;','grid':'display: grid;','block':'display: block;','hidden':'display: none;',
  'inline-flex':'display: inline-flex;','inline-block':'display: inline-block;','inline':'display: inline;',
  'flex-row':'flex-direction: row;','flex-col':'flex-direction: column;','flex-wrap':'flex-wrap: wrap;','flex-1':'flex: 1;',
  'items-center':'align-items: center;','items-start':'align-items: flex-start;','items-end':'align-items: flex-end;',
  'justify-center':'justify-content: center;','justify-between':'justify-content: space-between;',
  'justify-end':'justify-content: flex-end;','justify-start':'justify-content: flex-start;',
  'gap-1':'gap: 4px;','gap-2':'gap: 8px;','gap-3':'gap: 12px;','gap-4':'gap: 16px;','gap-6':'gap: 24px;','gap-8':'gap: 32px;',
  'w-full':'width: 100%;','w-auto':'width: auto;','h-full':'height: 100%;','h-screen':'height: 100vh;',
  'min-h-screen':'min-height: 100vh;','mx-auto':'margin: 0 auto;','m-0':'margin: 0;',
  'p-1':'padding: 4px;','p-2':'padding: 8px;','p-3':'padding: 12px;','p-4':'padding: 16px;','p-6':'padding: 24px;','p-8':'padding: 32px;',
  'mt-1':'margin-top: 4px;','mt-2':'margin-top: 8px;','mt-4':'margin-top: 16px;','mb-2':'margin-bottom: 8px;',
  'mb-4':'margin-bottom: 16px;','mb-6':'margin-bottom: 24px;',
  'text-xs':'font-size: 12px;','text-sm':'font-size: 14px;','text-base':'font-size: 16px;',
  'text-lg':'font-size: 18px;','text-xl':'font-size: 20px;','text-2xl':'font-size: 24px;',
  'text-3xl':'font-size: 30px;','text-4xl':'font-size: 36px;',
  'font-normal':'font-weight: 400;','font-medium':'font-weight: 500;','font-semibold':'font-weight: 600;',
  'font-bold':'font-weight: 700;','font-black':'font-weight: 900;',
  'text-center':'text-align: center;','text-left':'text-align: left;','text-right':'text-align: right;',
  'text-white':'color: white;','text-black':'color: black;','bg-white':'background-color: white;','bg-black':'background-color: black;',
  'rounded':'border-radius: 4px;','rounded-md':'border-radius: 6px;','rounded-lg':'border-radius: 8px;',
  'rounded-xl':'border-radius: 12px;','rounded-full':'border-radius: 9999px;','rounded-none':'border-radius: 0;',
  'border':'border: 1px solid;','border-0':'border: none;','border-2':'border: 2px solid;','outline-none':'outline: none;',
  'relative':'position: relative;','absolute':'position: absolute;','fixed':'position: fixed;','sticky':'position: sticky;',
  'top-0':'top: 0;','right-0':'right: 0;','bottom-0':'bottom: 0;','left-0':'left: 0;',
  'overflow-hidden':'overflow: hidden;','overflow-auto':'overflow: auto;','cursor-pointer':'cursor: pointer;',
  'opacity-0':'opacity: 0;','opacity-50':'opacity: 0.5;','opacity-100':'opacity: 1;',
  'z-10':'z-index: 10;','z-50':'z-index: 50;',
  'uppercase':'text-transform: uppercase;','lowercase':'text-transform: lowercase;',
  'underline':'text-decoration: underline;','no-underline':'text-decoration: none;',
  'transition':'transition: all 0.15s;','transition-all':'transition: all 0.15s;',
  'select-none':'user-select: none;','whitespace-nowrap':'white-space: nowrap;',
  'object-cover':'object-fit: cover;','object-contain':'object-fit: contain;',
  'pointer-events-none':'pointer-events: none;','shadow-none':'box-shadow: none;'
};

function cssToTailwind(css){
  var found=[];
  CSS2TW.forEach(function(m){if(m.css.test(css))found.push(m.tw);});
  return found.length?found.join(' '):'';
}
function tailwindToCSS(tw){
  var classes=tw.trim().split(/\s+/);var lines=[];
  classes.forEach(function(cls){
    var val=TW2CSS[cls];if(val)lines.push('/* '+cls+' */\n'+val);
    else{
      // Arbitrary values like w-[200px]
      var arb=cls.match(/^([\w-]+)-\[(.+)\]$/);
      if(arb){var prop=arb[1];var val2=arb[2];
        var propMap={'w':'width','h':'height','max-w':'max-width','min-w':'min-width','text':'font-size','m':'margin','p':'padding','top':'top','left':'left','right':'right','bottom':'bottom','z':'z-index'};
        if(propMap[prop])lines.push('/* '+cls+' */\n'+propMap[prop]+': '+val2+';');
      }
    }
  });
  return lines.length?lines.join('\n'):'';
}

var lastCSS='';var lastTW='';var lastResult='';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(56,189,248,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(56,189,248,0.1),rgba(99,102,241,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#38bdf8;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  // CSS → TW section
  var sec1=document.createElement('div');sec1.style='background:rgba(56,189,248,0.05);border:1px solid rgba(56,189,248,0.15);border-radius:8px;padding:10px;';
  var l1=document.createElement('div');l1.style='font-size:10px;color:#38bdf8;font-weight:700;margin-bottom:6px;';l1.textContent=t('cssIn');
  var ta1=document.createElement('textarea');ta1.value=lastCSS;ta1.placeholder='display: flex;\nalign-items: center;\ngap: 16px;\npadding: 12px;';ta1.rows=4;
  ta1.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(56,189,248,0.1);border-radius:6px;padding:7px;font-size:8.5px;font-family:"JetBrains Mono",monospace;outline:none;width:100%;box-sizing:border-box;resize:vertical;';
  ta1.oninput=function(){lastCSS=this.value;};
  var btn1=document.createElement('button');btn1.innerHTML=t('btnCSS');btn1.style='width:100%;background:rgba(56,189,248,0.12);color:#38bdf8;border:1px solid rgba(56,189,248,0.25);padding:7px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;margin-top:6px;';
  sec1.appendChild(l1);sec1.appendChild(ta1);sec1.appendChild(btn1);body.appendChild(sec1);

  // TW → CSS section
  var sec2=document.createElement('div');sec2.style='background:rgba(99,102,241,0.05);border:1px solid rgba(99,102,241,0.15);border-radius:8px;padding:10px;';
  var l2=document.createElement('div');l2.style='font-size:10px;color:#818cf8;font-weight:700;margin-bottom:6px;';l2.textContent=t('twIn');
  var ta2=document.createElement('textarea');ta2.value=lastTW;ta2.placeholder='flex items-center gap-4 p-3 rounded-lg bg-white shadow';ta2.rows=3;
  ta2.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(99,102,241,0.1);border-radius:6px;padding:7px;font-size:8.5px;font-family:"JetBrains Mono",monospace;outline:none;width:100%;box-sizing:border-box;resize:vertical;';
  ta2.oninput=function(){lastTW=this.value;};
  var btn2=document.createElement('button');btn2.innerHTML=t('btnTW');btn2.style='width:100%;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.25);padding:7px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;margin-top:6px;';
  sec2.appendChild(l2);sec2.appendChild(ta2);sec2.appendChild(btn2);body.appendChild(sec2);

  // Result
  var resLabel=document.createElement('div');resLabel.style='font-size:10px;color:#64748b;font-weight:600;display:none;';resLabel.textContent=t('result');body.appendChild(resLabel);
  var resPre=document.createElement('pre');resPre.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:10px;font-size:9px;font-family:"JetBrains Mono",monospace;white-space:pre-wrap;margin:0;display:none;';body.appendChild(resPre);
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='width:100%;background:rgba(56,189,248,0.1);color:#38bdf8;border:1px solid rgba(56,189,248,0.2);padding:7px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;display:none;';body.appendChild(cpBtn);
  wrap.appendChild(body);parent.appendChild(wrap);

  function showResult(r,label){
    if(!r){resPre.textContent=t('noMatch');resLabel.style.display='';resPre.style.display='';cpBtn.style.display='none';return;}
    lastResult=r;resLabel.style.display='';resPre.style.display='';cpBtn.style.display='';
    resPre.textContent=r;
    cpBtn.onclick=function(){navigator.clipboard.writeText(r).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  }
  btn1.onclick=function(){lastCSS=ta1.value;showResult(cssToTailwind(lastCSS));};
  btn2.onclick=function(){lastTW=ta2.value;showResult(tailwindToCSS(lastTW));};
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-tailwind');if(el)el.textContent=t('tab');if(window.activeTab==='tailwind')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='tailwind'){window.activeTab='tailwind';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-tailwind');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
