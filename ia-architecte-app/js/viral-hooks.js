/**
 * Viral Hook Generator v1.0 — EN/FR
 * Describe feature → generate viral hooks for TikTok/Twitter/LinkedIn/ProductHunt
 */
(function(){
'use strict';
var TX={
  en:{tab:'Hooks',title:'🎯 Viral Hook Generator',sub:'Describe your app/feature → get viral hooks',
      feature:'Describe your feature or app:',audience:'Target audience:',tone:'Tone:',
      btnGen:'⚡ Generate Hooks',btnCopy:'📋 Copy All',copied:'Copied!',
      ph:'Example: I built a tool that turns any sketch into production-ready React code in seconds...'},
  fr:{tab:'Hooks',title:'🎯 Générateur de Hooks Viraux',sub:'Décrivez votre app → obtenez des hooks viraux',
      feature:'Décrivez votre fonctionnalité :',audience:'Audience cible :',tone:'Ton :',
      btnGen:'⚡ Générer Hooks',btnCopy:'📋 Tout Copier',copied:'Copié !',
      ph:'Exemple: J\'ai créé un outil qui transforme n\'importe quel croquis en code React prêt pour la production...'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var AUDIENCES=['Developers','Designers','Entrepreneurs','Marketers','Students','Everyone'];
var TONES=['Excited','Professional','Casual','Controversial','Storytelling'];

var HOOKS_EN={
  twitter:[
    'I built something that {feature} in {time}.\n\nHere\'s how it works 🧵👇',
    'Stop {pain}. I made a tool that {feature}.\n\nFree. Open source. Ship it.',
    'Hot take: {problem} is a solved problem.\n\nWe solved it with {feature}.\n\n{cta}',
    'POV: You just discovered {feature}.\n\nYour life before: 😩\nYour life after: 🚀',
    'Unpopular opinion: {feature} shouldn\'t cost $99/mo.\n\nSo we made it free.\n\n↓ Link in bio'
  ],
  tiktok:[
    'Wait, you\'re still doing {pain} manually?! 😱 I built this tool that {feature} and it\'s FREE. Link in bio.',
    'POV: You found the secret tool every {audience} needs. It {feature}. Comment "tool" for the link!',
    'Day {n} of building in public. Today I shipped {feature}. Watch me get my first 100 users. 👀',
    'The tool that saved me 10 hours a week. It {feature}. No cap this changed everything 🔥',
    '3 tools I wish I had as a {audience}: 1️⃣ ... 2️⃣ ... 3️⃣ {feature} ← this one\'s mine, link in bio'
  ],
  linkedin:[
    'I spent 3 months building a tool that {feature}.\n\nHere\'s what I learned:\n\n→ {lesson1}\n→ {lesson2}\n→ {lesson3}\n\nThe tool is live. Would love your feedback.',
    '{Number} {audiences} told me {pain} was their biggest problem.\n\nSo I built {feature}.\n\nLaunching today. DMs open for early access.',
    'Most {audiences} waste hours on {pain}.\n\nI automated it.\n\nHere\'s the story of how {feature} went from idea to product in 90 days:',
    'I quit my job to solve {problem}.\n\n6 months later: {feature} is live.\n\nThis is what building in public taught me:'
  ],
  producthunt:[
    '🚀 {Name} — {feature} in seconds, not hours',
    'Makers, meet {Name}: The {adjective} way to {feature}',
    '{Name} — We built the tool we always wished existed. It {feature}.',
    'After {n} months of building: {Name} is live 🎉 {feature} for {audience}'
  ]
};

var HOOKS_FR={
  twitter:[
    'J\'ai construit quelque chose qui {feature} en quelques secondes.\n\nVoici comment ça marche 🧵👇',
    'Arrêtez de {pain} manuellement. J\'ai créé un outil qui {feature}.\n\nGratuit. Open source.',
    'Opinion chaude : {problem} est un problème résolu.\n\nOn l\'a résolu avec {feature}.',
    'POV : Vous venez de découvrir {feature}.\n\nAvant : 😩\nAprès : 🚀'
  ],
  tiktok:[
    'Attends, tu fais encore {pain} manuellement ?! 😱 J\'ai créé cet outil qui {feature} et c\'est GRATUIT.',
    'POV : Tu as trouvé l\'outil secret que tout {audience} doit connaître. Il {feature}. Commente "outil" !',
    'Jour {n} de building en public. Aujourd\'hui j\'ai lancé {feature}. Regardez-moi avoir mes 100 premiers users. 👀'
  ],
  linkedin:[
    'J\'ai passé 3 mois à créer un outil qui {feature}.\n\nVoici ce que j\'ai appris :\n\n→ La validation utilisateur\n→ L\'importance du MVP\n→ Lancer vite et itérer\n\nL\'outil est en ligne. Vos retours sont bienvenus.',
    '{Number} {audiences} m\'ont dit que {pain} était leur plus gros problème.\n\nAlors j\'ai construit {feature}.\n\nLancement aujourd\'hui. DMs ouverts pour l\'accès anticipé.'
  ],
  producthunt:[
    '🚀 {Name} — {feature} en secondes, pas en heures',
    '{Name} — L\'outil {adjective} pour {feature}',
    'Après {n} mois de dev : {Name} est en ligne 🎉 {feature} pour {audience}'
  ]
};

function generateHooks(feature,audience,tone){
  var lx=gl();var hooks=lx==='fr'?HOOKS_FR:HOOKS_EN;
  // Simple substitution
  function fill(tpl){
    return tpl.replace(/{feature}/g,feature)
      .replace(/{pain}/g,'doing this manually')
      .replace(/{audience}/g,audience.toLowerCase())
      .replace(/{audiences}/g,audience.toLowerCase()+'s')
      .replace(/{problem}/g,'this problem')
      .replace(/{n}/g,Math.floor(Math.random()*90+30))
      .replace(/{Number}/g,Math.floor(Math.random()*50+10))
      .replace(/{Name}/g,'IA Architecte')
      .replace(/{adjective}/g,'fastest')
      .replace(/{lesson\d}/g,['Validate before building','Ship fast, iterate faster','Talk to your users'][Math.floor(Math.random()*3)])
      .replace(/{cta}/g,'Link in bio 👇')
      .replace(/{time}/g,'under 10 minutes');
  }
  var result={};
  Object.keys(hooks).forEach(function(platform){
    result[platform]=hooks[platform].slice(0,3).map(function(h){return fill(h);});
  });
  return result;
}

var lastFeature='';var lastAudience='Developers';var lastTone='Excited';
function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(251,146,60,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(251,146,60,0.1),rgba(234,179,8,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fb923c;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  var fl=document.createElement('div');fl.style='font-size:10px;color:#64748b;font-weight:600;';fl.textContent=t('feature');body.appendChild(fl);
  var ta=document.createElement('textarea');ta.value=lastFeature;ta.placeholder=t('ph');ta.rows=4;
  ta.style='background:#0d1117;color:#e2e8f0;border:1px solid rgba(251,146,60,0.2);border-radius:8px;padding:9px;font-size:10px;outline:none;resize:vertical;width:100%;box-sizing:border-box;line-height:1.5;';
  ta.oninput=function(){lastFeature=this.value;};body.appendChild(ta);

  function mkSel(lbl,opts,cur,cb){var w=document.createElement('div');w.style='display:flex;flex-direction:column;gap:2px;';var l=document.createElement('div');l.style='font-size:9px;color:#64748b;font-weight:600;';l.textContent=lbl;var s=document.createElement('select');s.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:5px;border-radius:6px;font-size:9px;outline:none;';opts.forEach(function(o){var op=document.createElement('option');op.value=o;op.textContent=o;if(o===cur)op.selected=true;s.appendChild(op);});s.onchange=function(){cb(this.value);};w.appendChild(l);w.appendChild(s);return w;}
  var row=document.createElement('div');row.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  row.appendChild(mkSel(t('audience'),AUDIENCES,lastAudience,function(v){lastAudience=v;}));
  row.appendChild(mkSel(t('tone'),TONES,lastTone,function(v){lastTone=v;}));
  body.appendChild(row);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#92400e,#f97316);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(249,115,22,0.3);';
  body.appendChild(genBtn);

  var res=document.createElement('div');res.style='display:flex;flex-direction:column;gap:6px;';body.appendChild(res);
  wrap.appendChild(body);parent.appendChild(wrap);

  var platformColors={'twitter':'#1da1f2','tiktok':'#ff0050','linkedin':'#0077b5','producthunt':'#ff6154'};
  var platformIcons={'twitter':'🐦','tiktok':'🎵','linkedin':'💼','producthunt':'🚀'};
  var allHooks='';

  genBtn.onclick=function(){
    var feature=ta.value.trim();if(!feature)return;
    lastFeature=feature;res.innerHTML='';allHooks='';
    var hooks=generateHooks(feature,lastAudience,lastTone);
    Object.keys(hooks).forEach(function(platform){
      var pc=platformColors[platform]||'#8b5cf6';var pi=platformIcons[platform]||'📱';
      var card=document.createElement('div');card.style='background:'+pc+'0d;border:1px solid '+pc+'33;border-radius:8px;padding:10px;';
      var header=document.createElement('div');header.style='font-size:10px;font-weight:700;color:'+pc+';margin-bottom:6px;';header.textContent=pi+' '+platform.charAt(0).toUpperCase()+platform.slice(1);
      card.appendChild(header);
      hooks[platform].forEach(function(hook,i){
        var hDiv=document.createElement('div');hDiv.style='background:rgba(0,0,0,0.3);border-radius:5px;padding:8px;margin-bottom:4px;position:relative;cursor:pointer;';
        var hText=document.createElement('div');hText.style='font-size:8.5px;color:#e2e8f0;line-height:1.6;white-space:pre-wrap;';hText.textContent=hook;
        var cpBtn=document.createElement('button');cpBtn.innerHTML='📋';cpBtn.style='position:absolute;top:5px;right:5px;background:none;border:none;cursor:pointer;font-size:11px;opacity:0.6;';
        cpBtn.onclick=function(){navigator.clipboard.writeText(hook).then(function(){if(window.showToast)window.showToast('Copied!');});};
        hDiv.appendChild(hText);hDiv.appendChild(cpBtn);card.appendChild(hDiv);
        allHooks+=platform.toUpperCase()+':\n'+hook+'\n\n';
      });
      res.appendChild(card);
    });
    var cpAll=document.createElement('button');cpAll.innerHTML=t('btnCopy');cpAll.style='width:100%;background:rgba(251,146,60,0.1);color:#fb923c;border:1px solid rgba(251,146,60,0.2);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
    cpAll.onclick=function(){navigator.clipboard.writeText(allHooks).then(function(){if(window.showToast)window.showToast(t('copied'));});};
    res.appendChild(cpAll);
  };
}
document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-hooks');if(el)el.textContent=t('tab');if(window.activeTab==='hooks')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='hooks'){window.activeTab='hooks';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-hooks');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
