/**
 * Regex Live Tester v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'Regex',title:'🧮 Regex Live Tester',sub:'Test patterns in real time with highlights',
      pattern:'Pattern:',ph:'e.g. \\b\\w+@\\w+\\.\\w+\\b',flags:'Flags:',testStr:'Test String:',
      testPh:'Paste text to test here...',matches:'Matches:',groups:'Groups',noMatch:'No matches found.',
      btnCopy:'📋 Copy Regex',btnTest:'⚡ Test',copied:'📋 Copied!',
      presets:'Quick Presets:',time:'Time:'},
  fr:{tab:'Regex',title:'🧮 Testeur Regex',sub:'Testez les patterns en temps réel',
      pattern:'Pattern :',ph:'ex. \\b\\w+@\\w+\\.\\w+\\b',flags:'Options :',testStr:'Texte de test :',
      testPh:'Collez le texte à tester ici...',matches:'Correspondances :',groups:'Groupes',noMatch:'Aucune correspondance.',
      btnCopy:'📋 Copier Regex',btnTest:'⚡ Tester',copied:'📋 Copié !',
      presets:'Présélections :',time:'Temps :'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var PRESETS=[
  {name:'Email',pat:'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',flags:'gi'},
  {name:'URL',pat:'https?:\\/\\/[\\w\\-\\.]+(?:\\.[a-z]{2,})+[\\/\\w\\-\\._~:/?#[\\]@!$&\'()*+,;=]*',flags:'gi'},
  {name:'Phone',pat:'(?:\\+?\\d{1,3}[-.\\s]?)?\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}',flags:'g'},
  {name:'IPv4',pat:'(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)',flags:'g'},
  {name:'Hex Color',pat:'#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\\b',flags:'gi'},
  {name:'Date',pat:'\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])',flags:'g'},
  {name:'HTML Tag',pat:'<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^>]*)?>',flags:'gi'},
  {name:'Number',pat:'-?\\d+(?:\\.\\d+)?',flags:'g'}
];

var HIGHLIGHT_COLORS=['rgba(59,130,246,0.35)','rgba(16,185,129,0.35)','rgba(245,158,11,0.35)','rgba(168,85,247,0.35)','rgba(236,72,153,0.35)'];

function doTest(pat,flags,str){
  var t0=performance.now();
  try{
    var rx=new RegExp(pat,flags.replace('e',''));
    var matches=[];var m;
    if(flags.includes('g')){while((m=rx.exec(str))!==null){matches.push(m);if(matches.length>100)break;}}
    else{m=rx.exec(str);if(m)matches.push(m);}
    return{ok:true,matches:matches,time:Math.round(performance.now()-t0*100)/100};
  }catch(e){return{ok:false,error:e.message};}
}

function highlightText(str,matches){
  if(!matches||!matches.length)return escHTML(str);
  // Build character map
  var spans=[];
  matches.forEach(function(m,i){
    var s=m.index,e=m.index+m[0].length;
    spans.push({s:s,e:e,color:HIGHLIGHT_COLORS[i%HIGHLIGHT_COLORS.length]});
  });
  spans.sort(function(a,b){return a.s-b.s;});
  var html='';var pos=0;
  spans.forEach(function(sp){
    if(pos<sp.s)html+=escHTML(str.slice(pos,sp.s));
    html+='<mark style="background:'+sp.color+';border-radius:3px;padding:0 2px;color:#fff;">'+escHTML(str.slice(sp.s,sp.e))+'</mark>';
    pos=sp.e;
  });
  if(pos<str.length)html+=escHTML(str.slice(pos));
  return html;
}

function escHTML(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(168,85,247,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(168,85,247,0.08),rgba(236,72,153,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#c084fc;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  // Presets
  var plabel=document.createElement('div');plabel.style='font-size:10px;color:#64748b;font-weight:600;';plabel.textContent=t('presets');body.appendChild(plabel);
  var prow=document.createElement('div');prow.style='display:flex;flex-wrap:wrap;gap:4px;';
  PRESETS.forEach(function(p){
    var b=document.createElement('button');b.textContent=p.name;
    b.style='font-size:9px;padding:3px 8px;border-radius:5px;border:1px solid rgba(168,85,247,0.3);background:rgba(168,85,247,0.1);color:#c084fc;cursor:pointer;';
    b.onclick=function(){
      var pi=document.getElementById('rx-pattern');if(pi)pi.value=p.pat;
      var fi=document.getElementById('rx-flags');if(fi)fi.value=p.flags;
      liveTest();
    };
    prow.appendChild(b);
  });
  body.appendChild(prow);

  var plabelI=document.createElement('div');plabelI.style='font-size:10px;color:#64748b;font-weight:600;';plabelI.textContent=t('pattern');body.appendChild(plabelI);
  var pRow=document.createElement('div');pRow.style='display:flex;gap:6px;';
  var patInp=document.createElement('input');patInp.type='text';patInp.id='rx-pattern';patInp.placeholder=t('ph');
  patInp.style='flex:1;background:#0f172a;color:#e2e8f0;border:1px solid rgba(168,85,247,0.2);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;font-family:"JetBrains Mono",monospace;';
  var flagInp=document.createElement('input');flagInp.type='text';flagInp.id='rx-flags';flagInp.value='gi';flagInp.placeholder='gi';
  flagInp.style='width:48px;background:#0f172a;color:#c084fc;border:1px solid rgba(168,85,247,0.2);padding:8px;border-radius:8px;font-size:10px;outline:none;text-align:center;font-family:"JetBrains Mono",monospace;font-weight:700;';
  pRow.appendChild(patInp);pRow.appendChild(flagInp);body.appendChild(pRow);

  var tlabel=document.createElement('div');tlabel.style='font-size:10px;color:#64748b;font-weight:600;';tlabel.textContent=t('testStr');body.appendChild(tlabel);
  var testArea=document.createElement('textarea');testArea.id='rx-test';testArea.rows=4;testArea.placeholder=t('testPh');
  testArea.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(168,85,247,0.15);padding:8px 10px;border-radius:8px;font-size:10px;outline:none;resize:vertical;width:100%;box-sizing:border-box;font-family:inherit;line-height:1.4;';
  body.appendChild(testArea);

  var statsRow=document.createElement('div');statsRow.id='rx-stats';statsRow.style='display:flex;gap:8px;align-items:center;font-size:9px;color:#64748b;min-height:16px;';body.appendChild(statsRow);

  // Highlighted output
  var hlLabel=document.createElement('div');hlLabel.style='font-size:10px;color:#64748b;font-weight:600;';hlLabel.textContent=t('matches');body.appendChild(hlLabel);
  var hlOut=document.createElement('div');hlOut.id='rx-hl';
  hlOut.style='background:#0d1117;border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:10px;font-size:10px;line-height:1.6;min-height:40px;max-height:120px;overflow-y:auto;word-break:break-word;white-space:pre-wrap;font-family:"JetBrains Mono",monospace;';
  hlOut.innerHTML='<span style="color:#64748b;">'+(gl()==='fr'?'Entrez un pattern et du texte...':'Enter a pattern and test text...')+'</span>';
  body.appendChild(hlOut);

  // Match list
  var mList=document.createElement('div');mList.id='rx-mlist';mList.style='display:flex;flex-direction:column;gap:3px;max-height:100px;overflow-y:auto;';body.appendChild(mList);

  // Copy button
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');
  cpBtn.style='width:100%;background:rgba(168,85,247,0.12);color:#c084fc;border:1px solid rgba(168,85,247,0.3);padding:8px;border-radius:8px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){var p=document.getElementById('rx-pattern');if(p)navigator.clipboard.writeText('/'+p.value+'/'+(document.getElementById('rx-flags')||{value:'g'}).value).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  body.appendChild(cpBtn);

  function liveTest(){
    var pat=(document.getElementById('rx-pattern')||{}).value||'';
    var flags=(document.getElementById('rx-flags')||{}).value||'g';
    var str=(document.getElementById('rx-test')||{}).value||'';
    var hl=document.getElementById('rx-hl');var ml=document.getElementById('rx-mlist');var st=document.getElementById('rx-stats');
    if(!pat||!str){if(hl)hl.innerHTML='<span style="color:#64748b;">'+(gl()==='fr'?'En attente...':'Waiting...')+'</span>';if(ml)ml.innerHTML='';if(st)st.innerHTML='';return;}
    var res=doTest(pat,flags,str);
    if(!res.ok){if(hl)hl.innerHTML='<span style="color:#ef4444;">❌ '+escHTML(res.error)+'</span>';if(ml)ml.innerHTML='';return;}
    if(hl)hl.innerHTML=highlightText(str,res.matches);
    if(st)st.innerHTML='<span style="color:'+(res.matches.length?'#10b981':'#ef4444')+';font-weight:700;">'+res.matches.length+' match'+(res.matches.length!==1?'es':'')+'</span><span>·</span><span>'+t('time')+' '+res.time+'ms</span>';
    if(ml){
      ml.innerHTML='';
      res.matches.slice(0,10).forEach(function(m,i){
        var row=document.createElement('div');row.style='font-size:9px;background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.15);border-radius:5px;padding:4px 8px;color:#e2e8f0;font-family:"JetBrains Mono",monospace;display:flex;align-items:center;gap:8px;';
        row.innerHTML='<span style="color:#64748b;">#'+(i+1)+'</span><code style="color:#c084fc;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+escHTML(m[0])+'</code><span style="color:#64748b;">@'+m.index+'</span>';
        ml.appendChild(row);
      });
      if(res.matches.length>10){var more=document.createElement('div');more.style='font-size:9px;color:#64748b;text-align:center;padding:3px;';more.textContent='+'+(res.matches.length-10)+' more...';ml.appendChild(more);}
    }
  }

  patInp.oninput=liveTest;flagInp.oninput=liveTest;testArea.oninput=liveTest;
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-regex');if(el)el.textContent=t('tab');if(window.activeTab==='regex')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='regex'){window.activeTab='regex';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-regex');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
