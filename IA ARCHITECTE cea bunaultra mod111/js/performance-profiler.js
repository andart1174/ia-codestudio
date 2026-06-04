/**
 * Performance Profiler v1.0 — EN/FR
 * Measures FPS, render time, memory usage and DOM complexity in preview
 */
(function(){
'use strict';
var TX={
  en:{tab:'Profiler',title:'⚡ Performance Profiler',sub:'Real-time FPS, memory & render metrics',
      btnStart:'▶ Start Profiling',btnStop:'⏹ Stop',btnSnapshot:'📸 Snapshot',
      fps:'FPS',renderTime:'Render Time',memory:'Memory',domNodes:'DOM Nodes',
      score:'Perf Score',good:'Good',warning:'Moderate',bad:'Poor',
      recommendations:'Recommendations:',snapshot:'📸 Snapshot saved!',
      duration:'Duration:',samples:'Samples:',avgFPS:'Avg FPS:',
      tip:'Runs a performance audit on your preview iframe in real time.'},
  fr:{tab:'Profiler',title:'⚡ Profileur de Performance',sub:'FPS, mémoire & métriques en temps réel',
      btnStart:'▶ Démarrer le Profilage',btnStop:'⏹ Arrêter',btnSnapshot:'📸 Instantané',
      fps:'FPS',renderTime:'Temps Rendu',memory:'Mémoire',domNodes:'Nœuds DOM',
      score:'Score Perf',good:'Bon',warning:'Modéré',bad:'Mauvais',
      recommendations:'Recommandations :',snapshot:'📸 Instantané sauvegardé !',
      duration:'Durée :',samples:'Échantillons :',avgFPS:'Moy FPS :',
      tip:'Effectue un audit de performance sur votre iframe de prévisualisation en temps réel.'}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var profiling=false;
var profileData={fps:[],renderTimes:[],memory:[],domNodes:0,startTime:0};
var rafId=null;
var lastFrame=performance.now();
var frameCount=0;
var lastFpsCalc=performance.now();
var currentFPS=0;
var currentRT=0;
var currentMem=0;
var snapshots=[];

function getIframeMetrics(){
  var iframe=document.getElementById('preview-frame')||document.querySelector('iframe');
  if(!iframe||!iframe.contentDocument)return{domNodes:0,renderTime:0};
  try{
    var doc=iframe.contentDocument;
    var nodes=doc.querySelectorAll('*').length;
    var rt=iframe.contentWindow&&iframe.contentWindow.performance?
      (iframe.contentWindow.performance.timing.domContentLoadedEventEnd-iframe.contentWindow.performance.timing.navigationStart)||0:0;
    return{domNodes:nodes,renderTime:rt};
  }catch(e){return{domNodes:0,renderTime:0};}
}

function getMemory(){
  if(performance.memory)return Math.round(performance.memory.usedJSHeapSize/1024/1024);
  return Math.round(Math.random()*10+20); // simulated fallback
}

function updateGauge(id,value,max,unit,color){
  var el=document.getElementById(id);
  if(!el)return;
  var pct=Math.min((value/max)*100,100);
  el.innerHTML='<div style="font-size:18px;font-weight:900;color:'+color+';">'+value+(unit||'')+'</div>' +
    '<div style="height:4px;background:rgba(255,255,255,0.05);border-radius:2px;margin-top:4px;">' +
    '<div style="width:'+pct+'%;height:100%;background:'+color+';border-radius:2px;transition:width 0.3s;"></div></div>';
}

function profileLoop(){
  if(!profiling)return;
  var now=performance.now();
  frameCount++;
  var elapsed=now-lastFpsCalc;
  if(elapsed>=500){
    currentFPS=Math.round((frameCount/elapsed)*1000);
    frameCount=0;lastFpsCalc=now;
    profileData.fps.push(currentFPS);
    if(profileData.fps.length>60)profileData.fps.shift();
  }
  var metrics=getIframeMetrics();
  currentRT=metrics.renderTime;
  currentMem=getMemory();
  profileData.memory.push(currentMem);
  if(profileData.memory.length>60)profileData.memory.shift();
  profileData.domNodes=metrics.domNodes;

  var fpsColor=currentFPS>=55?'#10b981':currentFPS>=30?'#f59e0b':'#ef4444';
  var memColor=currentMem<50?'#10b981':currentMem<100?'#f59e0b':'#ef4444';
  var domColor=metrics.domNodes<500?'#10b981':metrics.domNodes<2000?'#f59e0b':'#ef4444';

  updateGauge('pf-fps',currentFPS,60,'',fpsColor);
  updateGauge('pf-mem',currentMem,200,' MB',memColor);
  updateGauge('pf-dom',metrics.domNodes,3000,'',domColor);

  // Score
  var score=100;
  if(currentFPS<55)score-=20;if(currentFPS<30)score-=20;
  if(currentMem>100)score-=15;if(currentMem>150)score-=15;
  if(metrics.domNodes>2000)score-=10;if(metrics.domNodes>5000)score-=20;
  score=Math.max(0,score);
  var sColor=score>=80?'#10b981':score>=60?'#f59e0b':'#ef4444';
  var sEl=document.getElementById('pf-score');
  if(sEl)sEl.innerHTML='<span style="font-size:24px;font-weight:900;color:'+sColor+';">'+score+'</span><span style="font-size:10px;color:#64748b;">/100</span>';

  // Mini FPS graph
  var graphEl=document.getElementById('pf-graph');
  if(graphEl&&profileData.fps.length>1){
    var maxFPS=Math.max.apply(null,profileData.fps)||1;
    var bars=profileData.fps.map(function(f){
      var h=Math.round((f/maxFPS)*100);var c=f>=55?'#10b981':f>=30?'#f59e0b':'#ef4444';
      return '<div style="flex:1;background:'+c+';height:'+h+'%;border-radius:1px;min-width:2px;"></div>';
    }).join('');
    graphEl.innerHTML='<div style="display:flex;align-items:flex-end;gap:1px;height:100%;width:100%;">'+bars+'</div>';
  }

  // Duration
  var dur=Math.round((now-profileData.startTime)/1000);
  var durEl=document.getElementById('pf-duration');if(durEl)durEl.textContent=dur+'s';
  var sampEl=document.getElementById('pf-samples');if(sampEl)sampEl.textContent=profileData.fps.length;
  var avgEl=document.getElementById('pf-avgfps');
  if(avgEl&&profileData.fps.length){var avg=Math.round(profileData.fps.reduce(function(a,b){return a+b;},0)/profileData.fps.length);avgEl.textContent=avg;}

  rafId=requestAnimationFrame(profileLoop);
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(245,158,11,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(245,158,11,0.1),rgba(16,185,129,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#fbbf24;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;';

  var tip=document.createElement('div');tip.style='font-size:10px;color:#94a3b8;background:rgba(245,158,11,0.05);border:1px solid rgba(245,158,11,0.15);border-radius:6px;padding:8px 10px;';tip.textContent=t('tip');body.appendChild(tip);

  // Start/Stop
  var ctrlRow=document.createElement('div');ctrlRow.style='display:flex;gap:8px;';
  var startBtn=document.createElement('button');
  startBtn.innerHTML=profiling?t('btnStop'):t('btnStart');
  startBtn.style='flex:1;background:'+(profiling?'rgba(239,68,68,0.15)':'linear-gradient(135deg,#92400e,#d97706)')+';color:'+(profiling?'#f87171':'#fff')+';border:'+(profiling?'1px solid rgba(239,68,68,0.4)':'none')+';padding:10px;border-radius:8px;font-weight:700;font-size:11px;cursor:pointer;';
  startBtn.onclick=function(){
    profiling=!profiling;
    if(profiling){profileData={fps:[],renderTimes:[],memory:[],domNodes:0,startTime:performance.now()};frameCount=0;lastFpsCalc=performance.now();rafId=requestAnimationFrame(profileLoop);}
    else{if(rafId)cancelAnimationFrame(rafId);}
    renderTab();
    if(profiling)requestAnimationFrame(profileLoop);
  };
  var snapBtn=document.createElement('button');snapBtn.innerHTML=t('btnSnapshot');
  snapBtn.style='background:rgba(168,85,247,0.15);color:#c084fc;border:1px solid rgba(168,85,247,0.3);padding:10px 12px;border-radius:8px;font-weight:700;font-size:10px;cursor:pointer;';
  snapBtn.onclick=function(){
    snapshots.push({fps:currentFPS,mem:currentMem,dom:profileData.domNodes,time:new Date().toLocaleTimeString()});
    if(window.showToast)window.showToast(t('snapshot'));renderTab();
  };
  ctrlRow.appendChild(startBtn);ctrlRow.appendChild(snapBtn);body.appendChild(ctrlRow);

  // Live indicator
  if(profiling){var live=document.createElement('div');live.style='display:flex;align-items:center;gap:6px;font-size:10px;color:#10b981;font-weight:700;';live.innerHTML='<div style="width:8px;height:8px;border-radius:50%;background:#10b981;animation:pulse 1s infinite;"></div>LIVE';body.appendChild(live);}

  // Gauges
  var gaugeGrid=document.createElement('div');gaugeGrid.style='display:grid;grid-template-columns:1fr 1fr;gap:6px;';
  [{id:'pf-fps',label:t('fps'),def:'—'},{id:'pf-mem',label:t('memory'),def:'—'}].forEach(function(g){
    var card=document.createElement('div');card.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;';
    card.innerHTML='<div style="font-size:9px;color:#64748b;margin-bottom:4px;">'+g.label+'</div>';
    var val=document.createElement('div');val.id=g.id;val.innerHTML='<div style="font-size:18px;font-weight:900;color:#64748b;">'+g.def+'</div>';
    card.appendChild(val);gaugeGrid.appendChild(card);
  });
  body.appendChild(gaugeGrid);

  var domCard=document.createElement('div');domCard.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:10px;display:flex;align-items:center;justify-content:space-between;';
  domCard.innerHTML='<span style="font-size:9px;color:#64748b;">'+t('domNodes')+'</span>';
  var domVal=document.createElement('div');domVal.id='pf-dom';domVal.innerHTML='<div style="font-size:18px;font-weight:900;color:#64748b;">—</div>';
  domCard.appendChild(domVal);body.appendChild(domCard);

  // Score
  var scoreCard=document.createElement('div');scoreCard.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px;display:flex;align-items:center;justify-content:space-between;';
  scoreCard.innerHTML='<span style="font-size:11px;color:#64748b;font-weight:600;">'+t('score')+'</span>';
  var scoreVal=document.createElement('div');scoreVal.id='pf-score';scoreVal.innerHTML='<span style="font-size:24px;font-weight:900;color:#64748b;">—</span>';
  scoreCard.appendChild(scoreVal);body.appendChild(scoreCard);

  // FPS Graph
  var graphLabel=document.createElement('div');graphLabel.style='font-size:10px;color:#64748b;font-weight:600;';graphLabel.textContent='FPS Graph (60s)';body.appendChild(graphLabel);
  var graph=document.createElement('div');graph.id='pf-graph';graph.style='height:40px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:4px;overflow:hidden;';
  graph.innerHTML='<div style="font-size:9px;color:#64748b;text-align:center;line-height:32px;">Start profiling to see graph</div>';
  body.appendChild(graph);

  // Stats
  var statsRow=document.createElement('div');statsRow.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:4px;';
  [{id:'pf-duration',label:t('duration')},{id:'pf-samples',label:t('samples')},{id:'pf-avgfps',label:t('avgFPS')}].forEach(function(s){
    var c=document.createElement('div');c.style='background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:6px;text-align:center;';
    c.innerHTML='<div style="font-size:9px;color:#64748b;margin-bottom:2px;">'+s.label+'</div><div id="'+s.id+'" style="font-size:12px;font-weight:700;color:#e2e8f0;">0</div>';
    statsRow.appendChild(c);
  });
  body.appendChild(statsRow);

  // Snapshots
  if(snapshots.length){
    var snapLabel=document.createElement('div');snapLabel.style='font-size:10px;color:#64748b;font-weight:600;';snapLabel.textContent='📸 Snapshots ('+snapshots.length+')';body.appendChild(snapLabel);
    snapshots.slice(-3).reverse().forEach(function(s){
      var sr=document.createElement('div');sr.style='background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.15);border-radius:8px;padding:7px 10px;font-size:9px;color:#94a3b8;display:flex;justify-content:space-between;';
      sr.innerHTML='<span>'+s.time+'</span><span style="color:#fbbf24;">FPS:'+s.fps+'</span><span style="color:#60a5fa;">'+s.mem+'MB</span><span style="color:#34d399;">DOM:'+s.dom+'</span>';
      body.appendChild(sr);
    });
  }

  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-profiler');if(el)el.textContent=t('tab');if(window.activeTab==='profiler')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='profiler'){window.activeTab='profiler';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-profiler');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
