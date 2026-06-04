/**
 * Carbon Code Screenshot v1.0 — EN/FR
 * Generate beautiful code images for social media
 */
(function(){
'use strict';
var TX={
  en:{tab:'Carbon',title:'🎨 Carbon Screenshot',sub:'Generate beautiful code images for social media',
      code:'Paste your code:',lang:'Language:',theme:'Theme:',font:'Font:',
      btnGen:'🎨 Generate Image',btnDL:'⬇️ Download PNG',btnCopy:'📋 Copy',
      copied:'Copied!',watermark:'Made with IA Architecte'},
  fr:{tab:'Carbon',title:'🎨 Carbon Screenshot',sub:'Générez de belles images de code',
      code:'Collez votre code :',lang:'Langage :',theme:'Thème :',font:'Police :',
      btnGen:'🎨 Générer Image',btnDL:'⬇️ Télécharger PNG',btnCopy:'📋 Copier',
      copied:'Copié !',watermark:'Fait avec IA Architecte'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var THEMES={
  'Dracula':    {bg:'#282a36',header:'#44475a',text:'#f8f8f2',kw:'#ff79c6',str:'#f1fa8c',fn:'#50fa7b',num:'#bd93f9',cm:'#6272a4'},
  'Monokai':    {bg:'#272822',header:'#3d3d3d',text:'#f8f8f2',kw:'#f92672',str:'#e6db74',fn:'#a6e22e',num:'#ae81ff',cm:'#75715e'},
  'GitHub Dark':{bg:'#0d1117',header:'#161b22',text:'#c9d1d9',kw:'#ff7b72',str:'#a5d6ff',fn:'#d2a8ff',num:'#79c0ff',cm:'#8b949e'},
  'Night Owl':  {bg:'#011627',header:'#0b2942',text:'#d6deeb',kw:'#c792ea',str:'#addb67',fn:'#82aaff',num:'#f78c6c',cm:'#637777'},
  'Cobalt':     {bg:'#002240',header:'#003559',text:'#ffffff',kw:'#ff9d00',str:'#3ad900',fn:'#0088ff',num:'#ff628c',cm:'#0088ff'},
  'Solarized':  {bg:'#002b36',header:'#073642',text:'#839496',kw:'#268bd2',str:'#2aa198',fn:'#b58900',num:'#d33682',cm:'#586e75'}
};

var LANGS=['JavaScript','TypeScript','Python','HTML','CSS','SQL','PHP','Go','Java','C++'];
var FONTS=['JetBrains Mono','Fira Code','Source Code Pro','Inconsolata'];
var lastCode='';var lastTheme='Dracula';var lastLang='JavaScript';var lastFont='JetBrains Mono';

function tokenize(code,lang){
  var th=THEMES[lastTheme];
  var escaped=code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  // Keywords by language
  var kws={JavaScript:'\\b(const|let|var|function|return|if|else|for|while|class|import|export|default|async|await|try|catch|new|this|typeof|null|undefined|true|false)\\b',
           Python:'\\b(def|class|import|from|return|if|elif|else|for|while|try|except|with|as|and|or|not|in|is|None|True|False|pass|break|continue|lambda|yield)\\b',
           HTML:'(&lt;[/!]?[a-zA-Z][^&]*?&gt;)',CSS:'([.#][\\w-]+|:[\\w-]+|@[\\w-]+|[\\w-]+(?=\\s*\\{))',
           SQL:'\\b(SELECT|FROM|WHERE|JOIN|ON|AND|OR|NOT|INSERT|UPDATE|DELETE|CREATE|TABLE|INDEX|INTO|VALUES|GROUP BY|ORDER BY|LIMIT|AS|INNER|LEFT|RIGHT|OUTER|UNION)\\b'};
  var kw=kws[lang]||kws.JavaScript;
  // Apply coloring: strings first, then keywords, then numbers, then comments
  var html=escaped;
  html=html.replace(/(\/\/[^\n]*)/g,'<cm>$1</cm>');
  html=html.replace(/(\/\*[\s\S]*?\*\/)/g,'<cm>$1</cm>');
  html=html.replace(/(#[^\n]*)/g,function(m,a){return lang==='CSS'||lang==='Python'?'<cm>'+a+'</cm>':a;});
  html=html.replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,'<str>$1</str>');
  html=html.replace(new RegExp(kw,'g'),function(m){return'<kw>'+m+'</kw>';});
  html=html.replace(/\b(\d+\.?\d*)\b/g,'<num>$1</num>');
  html=html.replace(/<cm>([\s\S]*?)<\/cm>/g,'<span style="color:'+th.cm+'">$1</span>');
  html=html.replace(/<str>([\s\S]*?)<\/str>/g,'<span style="color:'+th.str+'">$1</span>');
  html=html.replace(/<kw>([\s\S]*?)<\/kw>/g,'<span style="color:'+th.kw+';font-weight:bold;">$1</span>');
  html=html.replace(/<num>([\s\S]*?)<\/num>/g,'<span style="color:'+th.num+'">$1</span>');
  return html;
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(248,113,113,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(248,113,113,0.1),rgba(251,191,36,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  // Controls row
  function mkSel(label,opts,cur,cb){
    var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;gap:2px;';
    var lbl=document.createElement('div');lbl.style='font-size:9px;color:#64748b;font-weight:600;';lbl.textContent=label;
    var sel=document.createElement('select');sel.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(255,255,255,0.08);padding:5px;border-radius:6px;font-size:9px;outline:none;';
    opts.forEach(function(o){var op=document.createElement('option');op.value=o;op.textContent=o;if(o===cur)op.selected=true;sel.appendChild(op);});
    sel.onchange=function(){cb(this.value);};
    wrap.appendChild(lbl);wrap.appendChild(sel);return wrap;
  }
  var ctrlRow=document.createElement('div');ctrlRow.style='display:grid;grid-template-columns:1fr 1fr;gap:5px;';
  ctrlRow.appendChild(mkSel(t('theme'),Object.keys(THEMES),lastTheme,function(v){lastTheme=v;}));
  ctrlRow.appendChild(mkSel(t('lang'),LANGS,lastLang,function(v){lastLang=v;}));
  body.appendChild(ctrlRow);
  var fontSel=mkSel(t('font'),FONTS,lastFont,function(v){lastFont=v;});fontSel.style='';body.appendChild(fontSel);

  var codeLbl=document.createElement('div');codeLbl.style='font-size:10px;color:#64748b;font-weight:600;';codeLbl.textContent=t('code');body.appendChild(codeLbl);
  var codeTa=document.createElement('textarea');codeTa.value=lastCode;codeTa.rows=6;
  codeTa.style='background:#0d1117;color:#c9d1d9;border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:9px;font-size:8.5px;font-family:"JetBrains Mono",monospace;outline:none;resize:vertical;width:100%;box-sizing:border-box;';
  if(!lastCode)codeTa.placeholder='// const greet = (name) => {\n//   console.log(`Hello, ${name}!`);\n// };';
  codeTa.oninput=function(){lastCode=this.value;};
  // Grab from editor
  if(window.editor){var gb=document.createElement('button');gb.innerHTML='📥 '+(gl()==='fr'?'Depuis l\'Éditeur':'From Editor');gb.style='width:100%;background:rgba(99,102,241,0.08);color:#818cf8;border:1px solid rgba(99,102,241,0.2);padding:6px;border-radius:7px;font-size:9px;cursor:pointer;';gb.onclick=function(){var s=window.editor.getModel().getValueInRange(window.editor.getSelection());codeTa.value=s||window.editor.getValue().substring(0,500);lastCode=codeTa.value;};body.appendChild(gb);}
  body.appendChild(codeTa);

  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#92400e,#f59e0b);color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:900;cursor:pointer;box-shadow:0 4px 15px rgba(245,158,11,0.3);';
  body.appendChild(genBtn);

  var previewDiv=document.createElement('div');body.appendChild(previewDiv);
  wrap.appendChild(body);parent.appendChild(wrap);

  genBtn.onclick=function(){
    var code=codeTa.value.trim();if(!code)return;
    lastCode=code;previewDiv.innerHTML='';
    var th=THEMES[lastTheme];

    // Build the card preview
    var card=document.createElement('div');card.style='background:'+th.bg+';border-radius:12px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.5);font-family:'+lastFont+',monospace;';
    // Window chrome
    var chrome=document.createElement('div');chrome.style='background:'+th.header+';padding:10px 14px;display:flex;align-items:center;gap:6px;';
    chrome.innerHTML='<span style="width:11px;height:11px;border-radius:50%;background:#ff5f57;display:inline-block;"></span><span style="width:11px;height:11px;border-radius:50%;background:#febc2e;display:inline-block;"></span><span style="width:11px;height:11px;border-radius:50%;background:#28c840;display:inline-block;"></span><span style="font-size:10px;color:'+th.cm+';margin:0 auto;">'+lastLang+'</span>';
    // Code area
    var codeDiv=document.createElement('div');codeDiv.style='padding:16px 20px;overflow-x:auto;';
    var pre=document.createElement('pre');pre.style='margin:0;font-size:11px;line-height:1.7;color:'+th.text+';font-family:inherit;white-space:pre-wrap;word-break:break-all;';
    pre.innerHTML=tokenize(code,lastLang);
    codeDiv.appendChild(pre);
    // Watermark
    var wm=document.createElement('div');wm.style='text-align:right;padding:4px 14px 8px;font-size:8px;color:'+th.cm+';font-family:sans-serif;';wm.textContent=t('watermark');
    card.appendChild(chrome);card.appendChild(codeDiv);card.appendChild(wm);
    previewDiv.appendChild(card);

    // Download button
    var dlBtn=document.createElement('button');dlBtn.innerHTML=t('btnDL');dlBtn.style='width:100%;background:rgba(245,158,11,0.12);color:#fbbf24;border:1px solid rgba(245,158,11,0.25);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;margin-top:6px;';
    dlBtn.onclick=function(){
      // Use html2canvas-like approach: copy to canvas
      var canvas=document.createElement('canvas');
      var scale=2;var W=card.offsetWidth||400;var H=card.offsetHeight||200;
      canvas.width=W*scale;canvas.height=H*scale;
      var ctx=canvas.getContext('2d');ctx.scale(scale,scale);
      ctx.fillStyle=th.bg;ctx.beginPath();ctx.roundRect(0,0,W,H,12);ctx.fill();
      // Header
      ctx.fillStyle=th.header;ctx.fillRect(0,0,W,33);
      [[20,'#ff5f57'],[37,'#febc2e'],[54,'#28c840']].forEach(function(c){ctx.beginPath();ctx.arc(c[0],17,5.5,0,Math.PI*2);ctx.fillStyle=c[1];ctx.fill();});
      ctx.fillStyle=th.cm;ctx.font='10px sans-serif';ctx.textAlign='center';ctx.fillText(lastLang,W/2,22);
      // Code lines
      var lines=code.split('\n');ctx.font='11px '+lastFont+', monospace';ctx.textAlign='left';
      lines.forEach(function(line,i){ctx.fillStyle=th.text;ctx.fillText(line.substring(0,60),20,55+i*19);});
      // Watermark
      ctx.fillStyle=th.cm;ctx.font='8px sans-serif';ctx.textAlign='right';ctx.fillText(t('watermark'),W-10,H-6);
      var a=document.createElement('a');a.download='code-'+Date.now()+'.png';a.href=canvas.toDataURL('image/png');a.click();
    };
    previewDiv.appendChild(dlBtn);
  };
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-carbon');if(el)el.textContent=t('tab');if(window.activeTab==='carbon')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='carbon'){window.activeTab='carbon';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-carbon');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
