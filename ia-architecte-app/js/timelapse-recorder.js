(function() {
'use strict';
var SNAPSHOTS = [];
var RECORDING = false;
var PLAYING = false;
var PLAY_IDX = 0;
var PLAY_TIMER = null;
var LAST_CODE = '';
var SNAP_INTERVAL = null;
var PLAY_SPEED = 50;

function gl(){return window.lang||'en';}

function startRecording() {
  SNAPSHOTS = []; RECORDING = true; LAST_CODE = '';
  SNAP_INTERVAL = setInterval(takeSnapshot, 1000);
  takeSnapshot();
  if(window.showToast) window.showToast('🔴 Recording started!');
  renderTLTab();
}

function takeSnapshot() {
  if(!window.editor) return;
  var code = window.editor.getValue();
  if(code === LAST_CODE && SNAPSHOTS.length > 0) return;
  LAST_CODE = code;
  SNAPSHOTS.push({ ts: Date.now(), code: code, lines: code.split('\n').length, chars: code.length });
  if(SNAPSHOTS.length > 600) SNAPSHOTS.shift();
  var counter = document.getElementById('tl-counter');
  if(counter) counter.textContent = '🔴 ' + SNAPSHOTS.length + ' frames';
}

function stopRecording() {
  RECORDING = false;
  clearInterval(SNAP_INTERVAL);
  takeSnapshot();
  if(window.showToast) window.showToast('✅ Saved: ' + SNAPSHOTS.length + ' frames');
  renderTLTab();
}

function startPlayback() {
  if(!SNAPSHOTS.length) return;
  PLAYING = true; PLAY_IDX = 0;
  renderTLTab();
  setTimeout(playNext, 100);
}

function playNext() {
  if(!PLAYING || PLAY_IDX >= SNAPSHOTS.length) { PLAYING = false; renderTLTab(); return; }
  var snap = SNAPSHOTS[PLAY_IDX];
  var d = document.getElementById('tl-display');
  if(d) d.textContent = snap.code.split('\n').slice(0,25).join('\n');
  var pb = document.getElementById('tl-progress');
  if(pb) pb.style.width = Math.round(PLAY_IDX/(SNAPSHOTS.length-1)*100)+'%';
  var fn = document.getElementById('tl-framenum');
  if(fn) fn.textContent = (PLAY_IDX+1)+'/'+SNAPSHOTS.length;
  PLAY_IDX++;
  PLAY_TIMER = setTimeout(playNext, PLAY_SPEED);
}

function pausePlayback() {
  PLAYING = false;
  clearTimeout(PLAY_TIMER);
  renderTLTab();
}

function exportHTML() {
  if(!SNAPSHOTS.length) { if(window.showToast) window.showToast('No frames!'); return; }
  var step = Math.max(1, Math.floor(SNAPSHOTS.length/100));
  var frames = [];
  for(var i=0; i<SNAPSHOTS.length; i+=step) {
    var s = SNAPSHOTS[i];
    frames.push({ code: s.code.substring(0,1500), lines: s.lines, chars: s.chars });
  }
  if(frames[frames.length-1] !== frames[frames.length-1]) frames.push(SNAPSHOTS[SNAPSHOTS.length-1]);

  var parts = [];
  parts.push('<!DOCTYPE html><html><head><meta charset="UTF-8">');
  parts.push('<title>Code Time-Lapse</title><style>');
  parts.push('*{margin:0;padding:0;box-sizing:border-box}');
  parts.push('body{background:#020817;color:#e2e8f0;font-family:monospace;display:flex;flex-direction:column;height:100vh}');
  parts.push('.bar{background:#1e293b;padding:10px 16px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #334155}');
  parts.push('.title{color:#f87171;font-weight:900;font-size:15px}');
  parts.push('.info{color:#64748b;font-size:11px}');
  parts.push('.code{flex:1;padding:16px;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-all;overflow:hidden}');
  parts.push('.ctrl{background:#0f172a;padding:10px 16px;display:flex;align-items:center;gap:10px;border-top:1px solid #334155}');
  parts.push('.prog{flex:1;background:#1e293b;border-radius:4px;height:8px;cursor:pointer}');
  parts.push('.prog-bar{height:100%;background:linear-gradient(90deg,#ef4444,#f97316);border-radius:4px;transition:width 0.05s}');
  parts.push('.btn{background:#1e293b;color:#e2e8f0;border:1px solid #334155;padding:6px 14px;border-radius:6px;cursor:pointer;font-size:11px}');
  parts.push('.btn.p{background:#3b82f6;border-color:#3b82f6;font-weight:bold}');
  parts.push('.spd{display:flex;gap:4px}.spd button{background:#1e293b;color:#64748b;border:1px solid #334155;padding:3px 7px;border-radius:4px;cursor:pointer;font-size:10px}');
  parts.push('.spd button.a{background:#3b82f6;color:#fff}');
  parts.push('.stat{color:#64748b;font-size:10px}');
  parts.push('</style></head><body>');
  parts.push('<div class="bar"><div class="title">&#127916; Code Time-Lapse &mdash; IA Architecte</div><div class="info" id="inf"></div></div>');
  parts.push('<div class="code" id="cv"></div>');
  parts.push('<div class="ctrl">');
  parts.push('<button class="btn p" id="pb" onclick="tog()">&#9654; Play</button>');
  parts.push('<div class="prog" id="pw" onclick="seek(event)"><div class="prog-bar" id="pgb" style="width:0%"></div></div>');
  parts.push('<div class="spd"><button onclick="sp(200)">0.5x</button><button class="a" onclick="sp(100)">1x</button><button onclick="sp(50)">2x</button><button onclick="sp(25)">4x</button><button onclick="sp(12)">8x</button></div>');
  parts.push('<span class="stat" id="st">1/'+frames.length+'</span>');
  parts.push('</div>');
  parts.push('<script>');
  parts.push('var F='+JSON.stringify(frames)+';');
  parts.push('var c=0,pl=false,spd=100,tm=null;');
  parts.push('function render(i){var f=F[i];document.getElementById("cv").textContent=f.code;document.getElementById("pgb").style.width=((i/(F.length-1))*100)+"%";document.getElementById("st").textContent=(i+1)+"/"+F.length;document.getElementById("inf").textContent=f.lines+" lines | "+f.chars+" chars";}');
  parts.push('function step(){if(!pl)return;if(c>=F.length){c=0;tog();return;}render(c++);tm=setTimeout(step,spd);}');
  parts.push('function tog(){pl=!pl;document.getElementById("pb").textContent=pl?"&#9646;&#9646; Pause":"&#9654; Play";if(pl)step();else clearTimeout(tm);}');
  parts.push('function seek(e){c=Math.floor(e.offsetX/document.getElementById("pw").offsetWidth*(F.length-1));render(c);}');
  parts.push('function sp(s){spd=s;document.querySelectorAll(".spd button").forEach(function(b){b.className="";});event.target.className="a";}');
  parts.push('document.addEventListener("keydown",function(e){if(e.key===" ")tog();if(e.key==="ArrowRight"){c=Math.min(c+1,F.length-1);render(c);}if(e.key==="ArrowLeft"){c=Math.max(c-1,0);render(c);}});');
  parts.push('render(0);');
  parts.push('<\/script></body></html>');

  var html = parts.join('');
  var blob = new Blob([html], {type:'text/html'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href=url; a.download='timelapse-'+Date.now()+'.html'; a.click();
  setTimeout(function(){URL.revokeObjectURL(url);},5000);
  if(window.showToast) window.showToast('✅ Exported as HTML!');
}

function exportWebM(format) {
  if(!SNAPSHOTS.length){if(window.showToast)window.showToast('No frames!');return;}
  var brandInput = document.getElementById('tl-brand');
  var brandText = brandInput && brandInput.value ? brandInput.value : 'IA Architecte Studio';
  if(!window.MediaRecorder){exportHTML();return;}
  var mime='video/webm;codecs=vp9';
  if(!MediaRecorder.isTypeSupported(mime)) mime='video/webm;codecs=vp8';
  if(!MediaRecorder.isTypeSupported(mime)) mime='video/webm';
  if(!MediaRecorder.isTypeSupported(mime)){exportHTML();return;}
  
  var isPort = (format === 'portrait');
  var W = isPort ? 1080 : 1920;
  var H = isPort ? 1920 : 1080;
  var headerH = isPort ? 120 : 80;
  var padding = isPort ? 60 : 40;
  var lineH = isPort ? 40 : 36;
  var maxVisLines = Math.floor((H - headerH - padding*2) / lineH);
  var fontSize = isPort ? '28px monospace' : '24px monospace';
  var titleSize = isPort ? 'bold 32px monospace' : 'bold 28px monospace';
  
  var canvas=document.createElement('canvas');
  canvas.width=W; canvas.height=H;
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.opacity = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '-9999';
  document.body.appendChild(canvas);
  var ctx=canvas.getContext('2d');
  ctx.textBaseline='top';

  ctx.fillStyle='#0f172a';ctx.fillRect(0,0,W,H);
  
  var stream;
  try { stream = canvas.captureStream(30); }
  catch(e){ if(window.showToast)window.showToast('Canvas capture error'); return; }
  
  var rec=new MediaRecorder(stream,{mimeType:mime});
  var chunks=[];
  rec.ondataavailable=function(e){if(e.data&&e.data.size>0)chunks.push(e.data);};
  rec.onstop=function(){
    document.body.removeChild(canvas);
    if(!chunks.length){if(window.showToast)window.showToast('No data — try HTML');return;}
    var blob=new Blob(chunks,{type:'video/webm'});
    var url=URL.createObjectURL(blob);
    var a=document.createElement('a');a.href=url;a.download='timelapse-'+(isPort?'9x16':'16x9')+'-'+Date.now()+'.webm';a.click();
    setTimeout(function(){URL.revokeObjectURL(url);},5000);
    if(window.showToast)window.showToast('✅ Video exported!');
  };
  rec.start(100);
  
  var totalEdits = 0;
  var lastC = '';
  var snapsEdits = [];
  for(var i=0; i<SNAPSHOTS.length; i++) {
     var tCode = SNAPSHOTS[i].code;
     var cLen = 0;
     var mLen = Math.min(lastC.length, tCode.length);
     while(cLen < mLen && lastC[cLen] === tCode[cLen]) cLen++;
     
     var sLen = 0;
     var mRem = Math.min(lastC.length - cLen, tCode.length - cLen);
     while(sLen < mRem && lastC[lastC.length - 1 - sLen] === tCode[tCode.length - 1 - sLen]) sLen++;
     
     var dels = lastC.length - cLen - sLen;
     var adds = tCode.length - cLen - sLen;
     var edits = dels + adds;
     if(edits === 0) edits = 1; 
     snapsEdits.push({ cLen: cLen, sLen: sLen, dels: dels, adds: adds, total: edits });
     totalEdits += edits;
     lastC = tCode;
  }
  
  var targetDurationSec = Math.max(5, Math.min(45, totalEdits / 60)); 
  var totalTargetFrames = Math.floor(targetDurationSec * 30);
  
  var frames = [];
  lastC = '';
  for(var i=0; i<SNAPSHOTS.length; i++) {
      var tCode = SNAPSHOTS[i].code;
      var se = snapsEdits[i];
      var framesForThisSnap = Math.max(1, Math.floor((se.total / totalEdits) * totalTargetFrames));
      
      var delFrames = Math.floor((se.dels / se.total) * framesForThisSnap);
      var addFrames = framesForThisSnap - delFrames;
      
      var prefix = tCode.substring(0, se.cLen);
      var suffix = lastC.substring(lastC.length - se.sLen);
      var pLines = prefix.split('\n').length - 1;
      
      var deletedPart = lastC.substring(se.cLen, lastC.length - se.sLen);
      for(var f=1; f<=delFrames; f++) {
          var keepDel = deletedPart.length - Math.floor((f/delFrames)*se.dels);
          var delStr = deletedPart.substring(0, keepDel);
          var partialCode = prefix + delStr + suffix;
          frames.push({ code: partialCode, lines: partialCode.split('\n').length, chars: partialCode.length, activeLine: pLines + delStr.split('\n').length - 1 });
      }
      
      var addedPart = tCode.substring(se.cLen, tCode.length - se.sLen);
      for(var f=1; f<=addFrames; f++) {
          var keepAdd = Math.floor((f/addFrames)*se.adds);
          var addStr = addedPart.substring(0, keepAdd);
          var partialCode = prefix + addStr + suffix;
          frames.push({ code: partialCode, lines: partialCode.split('\n').length, chars: partialCode.length, activeLine: pLines + addStr.split('\n').length - 1 });
      }
      if(addFrames === 0 && delFrames === 0) {
          frames.push({ code: tCode, lines: tCode.split('\n').length, chars: tCode.length, activeLine: tCode.split('\n').length - 1 });
      }
      lastC = tCode;
  }
  var finalSnap = frames.length > 0 ? frames[frames.length - 1] : { code: SNAPSHOTS[SNAPSHOTS.length-1].code, lines: SNAPSHOTS[SNAPSHOTS.length-1].lines, chars: SNAPSHOTS[SNAPSHOTS.length-1].chars, activeLine: SNAPSHOTS[SNAPSHOTS.length-1].code.split('\n').length - 1 };
  for(var k=0; k<60; k++) frames.push(finalSnap);
  
  var fi=0;
  var currentScroll = 0;
  var lastActiveLine = 0;

  function renderColoredLine(ctx, text, x, y) {
     var isComment = text.trim().startsWith('//') || text.trim().startsWith('<!--');
     if(isComment) { ctx.fillStyle = '#64748b'; ctx.fillText(text, x, y); return; }
     
     var tokens = text.split(/([<>\s="':;(){}\[\]])/);
     var cx = x;
     var inStr = false, strCh = '';
     for(var i=0; i<tokens.length; i++) {
        var t = tokens[i];
        if(!t) continue;
        var color = '#e2e8f0';
        if(!inStr && (t==='"'||t==="'"||t==='`')) {
            inStr = true; strCh = t; color = '#a7f3d0';
        } else if(inStr) {
            color = '#a7f3d0';
            if(t===strCh) inStr = false;
        } else if(t==='<'||t==='>'||t==='</') {
            color = '#f472b6';
        } else if(/^(div|span|a|p|button|input|script|style|html|head|body|meta|link)$/i.test(t)) {
            color = '#f472b6'; 
        } else if(/^(var|let|const|function|if|else|for|while|return|class|import|export|true|false|null|undefined)$/.test(t)) {
            color = '#c084fc'; 
        } else if(/^(id|class|style|type|href|src|width|height|onClick)$/i.test(t)) {
            color = '#38bdf8'; 
        } else if(/^[0-9.]+$/.test(t)) {
            color = '#fde047'; 
        } else if(/^[A-Z][a-zA-Z0-9]*$/.test(t)) {
            color = '#fbbf24'; 
        } else if(t==='{'||t==='}'||t==='('||t===')'||t==='['||t===']') {
            color = '#fb923c'; 
        }
        ctx.fillStyle = color;
        ctx.fillText(t, cx, y);
        cx += ctx.measureText(t).width;
     }
  }
  
  function drawFrame(){
    if(fi>=frames.length){setTimeout(function(){rec.stop();},1000);return;}
    var snap=frames[fi++];
    
    var lines=snap.code.split('\n');
    lastActiveLine = snap.activeLine !== undefined ? snap.activeLine : (lines.length - 1);
    
    var targetScroll = lastActiveLine - Math.floor(maxVisLines / 2);
    if(targetScroll < 0) targetScroll = 0;
    if(targetScroll > lines.length - maxVisLines) targetScroll = Math.max(0, lines.length - maxVisLines);
    
    currentScroll += (targetScroll - currentScroll) * 0.15; 
    var startIdx = Math.floor(currentScroll);
    var offsetY = (currentScroll - startIdx) * lineH;

    ctx.fillStyle='#0f172a';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#1e293b';ctx.fillRect(0,0,W,headerH);
    ctx.fillStyle='#ef4444';ctx.fillRect(0,0,12,headerH);
    
    ctx.fillStyle='#f87171';ctx.font=titleSize;
    ctx.fillText(brandText, 40, isPort ? 30 : 26);
    
    var isFr = (window.lang||'en')==='fr';
    ctx.fillStyle='#64748b';ctx.font=fontSize;
    if(isPort) {
        ctx.fillText(snap.lines+(isFr?' lignes | ':' lines | ')+snap.chars+(isFr?' carac.':' chars'), 40, 70);
    } else {
        ctx.fillText(snap.lines+(isFr?' lignes | ':' lines | ')+snap.chars+(isFr?' carac.':' chars'), W - 400, 26);
    }
    
    ctx.fillStyle='#ef4444';ctx.fillRect(0,headerH,W*(fi/frames.length),6);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, headerH + 6, W, H - headerH - 6);
    ctx.clip();
    
    ctx.font=fontSize; 
    for(var j=0; j<maxVisLines + 2; j++) {
       var idx = startIdx + j;
       if(idx >= lines.length) break;
       var line = lines[idx];
       var y = headerH + padding + j*lineH - offsetY;
       
       ctx.fillStyle='#334155';
       ctx.fillText((idx+1).toString().padStart(4, ' '), isPort ? 20 : 30, y);
       
       renderColoredLine(ctx, line, isPort ? 110 : 120, y);
       
       if(idx === lastActiveLine && (fi % 15) < 8) {
           var cursorX = (isPort ? 110 : 120) + ctx.measureText(line).width + 4;
           ctx.fillStyle = '#3b82f6'; 
           ctx.fillRect(cursorX, y + 2, isPort ? 12 : 14, lineH * 0.8);
       }
    }
    ctx.restore();
    
    setTimeout(drawFrame, 33); 
  }
  
  setTimeout(drawFrame,200);
  if(window.showToast)window.showToast('🎥 ' + ((window.lang||'en')==='fr'?'Enregistrement vidéo Haute Qualité...':'Recording High-Quality Video...'));
}

function renderTLTab() {
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var isFr=gl()==='fr';
  var wrap=document.createElement('div');
  wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0f172a;font-family:sans-serif;';

  var hdr=document.createElement('div');
  hdr.style='padding:10px 14px 8px;border-bottom:1px solid rgba(239,68,68,0.3);flex-shrink:0;';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#f87171;">&#127916; Code Time-Lapse</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+(isFr?'Enregistrez votre session de codage':'Record your coding session as a speed-run')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');
  body.style='flex:1;overflow-y:auto;padding:10px;display:flex;flex-direction:column;gap:8px;';

  if(!document.getElementById('tl-pulse-style')){
    var ps=document.createElement('style');ps.id='tl-pulse-style';
    ps.textContent='@keyframes tlpulse{0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,0.5)}50%{box-shadow:0 0 0 8px rgba(239,68,68,0)}}';
    document.head.appendChild(ps);
  }

  var recRow=document.createElement('div');recRow.style='display:flex;gap:6px;';
  if(!RECORDING){
    var recBtn=document.createElement('button');
    recBtn.innerHTML='&#9679; '+(isFr?'Démarrer':'Start Recording');
    recBtn.style='flex:1;background:linear-gradient(90deg,#dc2626,#b91c1c);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
    recBtn.onclick=startRecording;recRow.appendChild(recBtn);
  } else {
    var stopBtn=document.createElement('button');
    stopBtn.innerHTML='&#9632; '+(isFr?'Arrêter':'Stop Recording');
    stopBtn.style='flex:1;background:#1e293b;border:2px solid #ef4444;color:#ef4444;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;animation:tlpulse 1.2s infinite;';
    stopBtn.onclick=stopRecording;recRow.appendChild(stopBtn);
  }
  var clearBtn=document.createElement('button');
  clearBtn.innerHTML='&#128465;';clearBtn.title='Clear';
  clearBtn.style='background:#1e293b;border:1px solid #334155;color:#64748b;padding:10px 14px;border-radius:8px;font-size:13px;cursor:pointer;';
  clearBtn.onclick=function(){SNAPSHOTS=[];RECORDING=false;clearInterval(SNAP_INTERVAL);PLAYING=false;renderTLTab();};
  recRow.appendChild(clearBtn);body.appendChild(recRow);

  var counter=document.createElement('div');counter.id='tl-counter';
  counter.style='font-size:10px;color:'+(RECORDING?'#ef4444':'#64748b')+';font-weight:bold;text-align:center;min-height:16px;';
  counter.textContent=RECORDING?'&#9679; Recording...':SNAPSHOTS.length+' frames recorded';
  body.appendChild(counter);

  if(SNAPSHOTS.length>0){
    var prog=document.createElement('div');
    prog.style='background:#1e293b;border-radius:6px;height:8px;overflow:hidden;cursor:pointer;';
    var pBar=document.createElement('div');pBar.id='tl-progress';
    pBar.style='height:100%;width:0%;background:linear-gradient(90deg,#ef4444,#f97316);border-radius:6px;transition:width 0.05s;';
    prog.appendChild(pBar);
    prog.onclick=function(e){if(!PLAYING){var idx=Math.floor(e.offsetX/this.offsetWidth*(SNAPSHOTS.length-1));var d=document.getElementById('tl-display');if(d)d.textContent=SNAPSHOTS[idx].code.split('\n').slice(0,25).join('\n');pBar.style.width=Math.round(idx/(SNAPSHOTS.length-1)*100)+'%';}};
    body.appendChild(prog);

    var statsRow=document.createElement('div');statsRow.style='display:flex;justify-content:space-between;font-size:9px;color:#64748b;';
    var fnum=document.createElement('span');fnum.id='tl-framenum';fnum.textContent='0/'+SNAPSHOTS.length;
    var fstats=document.createElement('span');
    if(SNAPSHOTS.length>1){var secs=Math.round((SNAPSHOTS[SNAPSHOTS.length-1].ts-SNAPSHOTS[0].ts)/1000);fstats.textContent=secs+'s session';}
    statsRow.appendChild(fnum);statsRow.appendChild(fstats);body.appendChild(statsRow);

    var display=document.createElement('pre');display.id='tl-display';
    display.style='background:#000;color:#e2e8f0;border-radius:8px;padding:10px;font-size:9px;font-family:monospace;overflow:hidden;height:180px;border:1px solid #1e293b;margin:0;white-space:pre-wrap;word-break:break-all;';
    display.textContent=SNAPSHOTS[SNAPSHOTS.length-1].code.split('\n').slice(0,20).join('\n');
    body.appendChild(display);

    var speedRow=document.createElement('div');speedRow.style='display:flex;align-items:center;gap:6px;font-size:10px;color:#64748b;';
    speedRow.innerHTML='<span>'+(isFr?'Vitesse:':'Speed:')+'</span>';
    [['.5x',100],['1x',50],['2x',25],['4x',12],['8x',6]].forEach(function(s){
      var sb=document.createElement('button');sb.textContent=s[0];
      sb.style='background:'+(PLAY_SPEED===s[1]?'#3b82f6;color:#fff':'#1e293b;color:#64748b')+';border:1px solid #334155;padding:3px 7px;border-radius:4px;font-size:9px;cursor:pointer;';
      sb.onclick=function(){PLAY_SPEED=s[1];renderTLTab();};speedRow.appendChild(sb);
    });
    body.appendChild(speedRow);

    var playRow=document.createElement('div');playRow.style='display:flex;gap:6px;';
    if(!PLAYING){
      var pb=document.createElement('button');
      pb.innerHTML='&#9654; '+(isFr?'Lire':'Play Time-Lapse');
      pb.style='flex:1;background:linear-gradient(90deg,#3b82f6,#1d4ed8);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
      pb.onclick=startPlayback;playRow.appendChild(pb);
    } else {
      var pauseB=document.createElement('button');
      pauseB.innerHTML='&#9646;&#9646; '+(isFr?'Pause':'Pause');
      pauseB.style='flex:1;background:#f59e0b;color:#000;border:none;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
      pauseB.onclick=pausePlayback;playRow.appendChild(pauseB);
    }
    body.appendChild(playRow);

    var brandBox=document.createElement('div');
    brandBox.style='background:rgba(255,255,255,0.05);border-radius:8px;padding:8px;display:flex;flex-direction:column;gap:6px;';
    var brandLbl=document.createElement('div');
    brandLbl.style='font-size:10px;color:#94a3b8;';
    brandLbl.textContent=isFr?'Texte / Nume (Watermark)':'Brand Name (Watermark)';
    var brandInp=document.createElement('input');
    brandInp.id='tl-brand';
    brandInp.type='text';
    brandInp.placeholder=isFr?'ex: @IA_Architecte':'e.g. @CodingGenius';
    brandInp.style='width:100%;background:#000;border:1px solid #334155;color:#e2e8f0;padding:6px 8px;border-radius:6px;font-size:10px;outline:none;';
    brandBox.appendChild(brandLbl);brandBox.appendChild(brandInp);
    body.appendChild(brandBox);

    var htmlBtn=document.createElement('button');
    htmlBtn.innerHTML='&#127760; '+(isFr?'Exporter HTML (recommandé)':'Export HTML (recommended)');
    htmlBtn.style='width:100%;background:linear-gradient(90deg,#1d4ed8,#3b82f6);color:#fff;border:none;padding:10px;border-radius:8px;font-weight:900;font-size:11px;cursor:pointer;';
    htmlBtn.onclick=exportHTML;body.appendChild(htmlBtn);

    var webmRow=document.createElement('div');
    webmRow.style='display:flex;gap:6px;';
    
    var webmLand=document.createElement('button');
    webmLand.innerHTML='&#127909; 16:9 '+(isFr?'(PC/YT)':'(PC/YT)');
    webmLand.style='flex:1;background:#059669;color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;';
    webmLand.onclick=function(){exportWebM('landscape');};
    webmRow.appendChild(webmLand);

    var webmPort=document.createElement('button');
    webmPort.innerHTML='&#128241; 9:16 '+(isFr?'(TikTok)':'(TikTok)');
    webmPort.style='flex:1;background:#d946ef;color:#fff;border:none;padding:10px;border-radius:8px;font-size:11px;font-weight:bold;cursor:pointer;';
    webmPort.onclick=function(){exportWebM('portrait');};
    webmRow.appendChild(webmPort);

    body.appendChild(webmRow);

    if(SNAPSHOTS.length>1){
      var totalTime=Math.round((SNAPSHOTS[SNAPSHOTS.length-1].ts-SNAPSHOTS[0].ts)/1000);
      var maxLines=0;for(var i=0;i<SNAPSHOTS.length;i++){if(SNAPSHOTS[i].lines>maxLines)maxLines=SNAPSHOTS[i].lines;}
      var summ=document.createElement('div');
      summ.style='background:#1e293b;border-radius:8px;padding:10px;display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;text-align:center;';
      [['&#9201;',totalTime+'s',isFr?'Durée':'Duration'],['&#128202;',SNAPSHOTS.length,isFr?'Frames':'Frames'],['&#128221;',maxLines,isFr?'Lignes max':'Max lines']].forEach(function(s){
        var box=document.createElement('div');
        box.innerHTML='<div style="font-size:14px;">'+s[0]+'</div><div style="font-size:13px;font-weight:bold;color:#e2e8f0;">'+s[1]+'</div><div style="font-size:8px;color:#64748b;">'+s[2]+'</div>';
        summ.appendChild(box);
      });body.appendChild(summ);
    }
  } else {
    var empty=document.createElement('div');
    empty.style='text-align:center;color:#475569;font-size:11px;padding:24px 16px;line-height:1.7;';
    empty.innerHTML='&#9679; '+(isFr?'Appuyez sur Démarrer puis écrivez du code':'Press Start then write some code')+'<br><br><span style="font-size:10px;color:#334155;">'+(isFr?'Chaque changement est capturé automatiquement':'Every change is captured automatically')+'</span>';
    body.appendChild(empty);
  }

  wrap.appendChild(body);parent.appendChild(wrap);
}

function hookEditor(){
  if(!window.editor||!window.editor.onDidChangeModelContent){setTimeout(hookEditor,2000);return;}
  window.editor.onDidChangeModelContent(function(){if(RECORDING)takeSnapshot();});
}

document.addEventListener('DOMContentLoaded',function(){
  setTimeout(hookEditor,3000);
  var oAL=window.applyLang;
  window.applyLang=function(){if(typeof oAL==='function')oAL();if(window.activeTab==='timelapse')renderTLTab();};
  var oRT=window.renderTab;
  window.renderTab=function(tab){
    if(tab==='timelapse'){
      window.activeTab='timelapse';
      document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
      var el=document.getElementById('tab-timelapse');if(el)el.classList.add('active');
      renderTLTab();return;
    }
    if(typeof oRT==='function')oRT(tab);
  };
});
if(document.readyState==='complete'||document.readyState==='interactive')setTimeout(hookEditor,3000);
})();
