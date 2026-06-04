/* ============================================================
   🌊 PHYSICS SIMULATION → CSS EXPORTER  |  Tab: physicscss
   IA Architecte Studio Module
   Euler-integration physics engine + CSS @keyframes generator
   ============================================================ */
(function () {
  'use strict';

  // ── i18n ──────────────────────────────────────────────────────────────────
  const T = {
    en: {
      title: '🌊 Physics Simulation → CSS Exporter',
      subtitle: 'Simulate real physics, record motion, export as CSS @keyframes',
      // Controls panel
      gravityStr: 'Gravity Strength',
      gravityAngle: 'Gravity Angle (°)',
      bounce: 'Bounce / Elasticity',
      friction: 'Air Friction',
      // Particle buttons
      addBall: '🔴 Add Ball',
      addPendulum: '🔵 Add Pendulum',
      addSpring: '🟢 Add Spring',
      clearAll: '🗑 Clear All',
      // Presets
      presetsLabel: 'Physics Presets:',
      presetMoon: '🌙 Moon Gravity',
      presetWater: '💧 Water Drag',
      presetElastic: '🎾 Elastic Bounce',
      presetFall: '⬇ Free Fall',
      // Recording
      record3s: '⏺ Record 3s',
      recording: '⏺ Recording…',
      recorded: '✅ Recorded!',
      convertCSS: '🎨 Convert to CSS',
      loadEditor: '🚀 Load to Editor',
      // Panels
      canvasLabel: 'Physics Canvas',
      cssOutput: 'Generated CSS',
      cssPreview: 'CSS Animation Preview',
      clickToAdd: 'Click canvas to add objects',
      nothingRecorded: '// No recording yet. Hit "Record 3s" first.',
      selectObject: 'Select an object first, then record its motion.',
      // Status
      statsObjects: 'Objects',
      statsFPS: 'FPS',
      statsTime: 'Time',
      // Standalone
      loadStandalone: '🚀 Load Full Standalone App',
    },
    fr: {
      title: '🌊 Simulation Physique → Exportateur CSS',
      subtitle: 'Simulez la physique réelle, enregistrez le mouvement, exportez en @keyframes CSS',
      gravityStr: 'Force de Gravité',
      gravityAngle: 'Angle Gravité (°)',
      bounce: 'Rebond / Élasticité',
      friction: 'Friction de l\'air',
      addBall: '🔴 Ajouter Balle',
      addPendulum: '🔵 Ajouter Pendule',
      addSpring: '🟢 Ajouter Ressort',
      clearAll: '🗑 Tout Effacer',
      presetsLabel: 'Préréglages Physiques:',
      presetMoon: '🌙 Gravité Lune',
      presetWater: '💧 Traînée Eau',
      presetElastic: '🎾 Rebond Élastique',
      presetFall: '⬇ Chute Libre',
      record3s: '⏺ Enregistrer 3s',
      recording: '⏺ Enregistrement…',
      recorded: '✅ Enregistré!',
      convertCSS: '🎨 Convertir en CSS',
      loadEditor: '🚀 Charger dans Éditeur',
      canvasLabel: 'Canvas Physique',
      cssOutput: 'CSS Généré',
      cssPreview: 'Aperçu Animation CSS',
      clickToAdd: 'Cliquez sur le canvas pour ajouter des objets',
      nothingRecorded: '// Pas d\'enregistrement. Cliquez "Enregistrer 3s" d\'abord.',
      selectObject: 'Sélectionnez un objet, puis enregistrez son mouvement.',
      statsObjects: 'Objets',
      statsFPS: 'FPS',
      statsTime: 'Temps',
      loadStandalone: '🚀 Charger l\'App Complète',
    }
  };

  function lang() { return window.appLang === 'fr' ? 'fr' : 'en'; }
  function t(key) { return T[lang()][key] || T['en'][key] || key; }

  // ── STANDALONE TEMPLATE ───────────────────────────────────────────────────
  const STANDALONE_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>🌊 Physics → CSS Studio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#020617;--bg2:#0d1424;--bg3:#111827;
  --cyan:#00f5ff;--pink:#ff00aa;--purple:#a855f7;--green:#00ff88;--orange:#ff6b35;
  --border:rgba(0,245,255,.12);--text:#e2e8f0;--text-dim:#64748b;
  --glow-cyan:0 0 20px rgba(0,245,255,.35);--glow-pink:0 0 20px rgba(255,0,170,.35);
}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:14px;min-height:100vh;display:flex;flex-direction:column}
h1{text-align:center;padding:20px;font-size:1.6rem;background:linear-gradient(135deg,var(--cyan),var(--purple));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.subtitle{text-align:center;color:var(--text-dim);margin-bottom:16px;font-size:.85rem}
.layout{display:grid;grid-template-columns:260px 1fr 320px;gap:12px;padding:0 16px 16px;flex:1;min-height:0}
.panel{background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:14px;overflow:hidden;display:flex;flex-direction:column;gap:10px}
.panel-title{font-size:.7rem;font-weight:700;letter-spacing:.12em;color:var(--cyan);text-transform:uppercase;border-bottom:1px solid var(--border);padding-bottom:6px;margin-bottom:4px}
label{font-size:.75rem;color:var(--text-dim);display:block;margin-bottom:2px}
input[type=range]{width:100%;accent-color:var(--cyan);cursor:pointer;height:4px}
.val-badge{font-size:.7rem;color:var(--cyan);font-family:'JetBrains Mono',monospace;float:right}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:7px 12px;border-radius:8px;border:none;cursor:pointer;font-size:.75rem;font-weight:600;font-family:'Inter',sans-serif;transition:all .2s;white-space:nowrap}
.btn-cyan{background:rgba(0,245,255,.12);color:var(--cyan);border:1px solid rgba(0,245,255,.3)}
.btn-cyan:hover{background:rgba(0,245,255,.25);box-shadow:var(--glow-cyan)}
.btn-pink{background:rgba(255,0,170,.12);color:var(--pink);border:1px solid rgba(255,0,170,.3)}
.btn-pink:hover{background:rgba(255,0,170,.25);box-shadow:var(--glow-pink)}
.btn-green{background:rgba(0,255,136,.12);color:var(--green);border:1px solid rgba(0,255,136,.3)}
.btn-green:hover{background:rgba(0,255,136,.25);box-shadow:0 0 20px rgba(0,255,136,.35)}
.btn-orange{background:rgba(255,107,53,.12);color:var(--orange);border:1px solid rgba(255,107,53,.3)}
.btn-orange:hover{background:rgba(255,107,53,.25)}
.btn-red{background:rgba(255,50,50,.1);color:#ff5555;border:1px solid rgba(255,50,50,.25)}
.btn-red:hover{background:rgba(255,50,50,.2)}
.btn-record{background:rgba(255,50,50,.15);color:#ff5555;border:1px solid rgba(255,50,50,.4);width:100%;font-size:.8rem;padding:10px}
.btn-record.active{animation:pulse-rec 1s infinite}
@keyframes pulse-rec{0%,100%{box-shadow:0 0 0 0 rgba(255,50,50,.5)}50%{box-shadow:0 0 0 8px rgba(255,50,50,0)}}
.btn-convert{background:linear-gradient(135deg,rgba(168,85,247,.2),rgba(0,245,255,.2));color:var(--purple);border:1px solid rgba(168,85,247,.4);width:100%;font-size:.8rem;padding:10px}
.btn-convert:hover{background:linear-gradient(135deg,rgba(168,85,247,.35),rgba(0,245,255,.35));box-shadow:0 0 20px rgba(168,85,247,.4)}
.btn-load{background:linear-gradient(135deg,var(--cyan),var(--purple));color:#020617;border:none;width:100%;font-size:.8rem;padding:10px;font-weight:700}
.btn-load:hover{filter:brightness(1.15);box-shadow:var(--glow-cyan)}
.btn-row{display:flex;gap:6px;flex-wrap:wrap}
.preset-row{display:grid;grid-template-columns:1fr 1fr;gap:5px}
#simCanvas{width:100%;flex:1;border-radius:8px;border:1px solid var(--border);cursor:crosshair;display:block;background:#050d1a}
.stats-row{display:flex;gap:8px;font-size:.68rem;font-family:'JetBrains Mono',monospace;color:var(--text-dim)}
.stat{background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:3px 8px}
.stat span{color:var(--cyan)}
textarea{width:100%;flex:1;background:var(--bg3);border:1px solid var(--border);border-radius:8px;color:var(--green);font-family:'JetBrains Mono',monospace;font-size:.7rem;padding:10px;resize:none;outline:none;min-height:180px}
textarea:focus{border-color:var(--cyan)}
.preview-box{flex:1;background:radial-gradient(ellipse at 50% 50%,#0a1628 0%,#020617 100%);border:1px solid var(--border);border-radius:8px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;min-height:160px}
.preview-dot{width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 35% 35%,var(--cyan),var(--purple));box-shadow:0 0 18px var(--cyan)}
.selected-ring{outline:2px solid var(--pink);outline-offset:3px}
.msg{font-size:.72rem;color:var(--text-dim);text-align:center;padding:8px}
.section-gap{margin-top:6px}
@media(max-width:900px){.layout{grid-template-columns:1fr;grid-template-rows:auto 360px auto}}
</style>
</head>
<body>
<h1>🌊 Physics Simulation → CSS Exporter</h1>
<p class="subtitle">Simulate real physics · Record motion · Export as CSS @keyframes</p>
<div class="layout">
  <!-- LEFT: Controls -->
  <div class="panel" id="controlPanel">
    <div class="panel-title">⚙ Physics Controls</div>
    <div>
      <label>Gravity Strength <span class="val-badge" id="gravStrVal">9.8</span></label>
      <input type="range" id="gravStr" min="0" max="30" step="0.1" value="9.8">
    </div>
    <div>
      <label>Gravity Angle (°) <span class="val-badge" id="gravAngVal">270</span></label>
      <input type="range" id="gravAng" min="0" max="360" step="1" value="270">
    </div>
    <div>
      <label>Bounce / Elasticity <span class="val-badge" id="bounceVal">0.65</span></label>
      <input type="range" id="bounceSlider" min="0" max="1" step="0.01" value="0.65">
    </div>
    <div>
      <label>Air Friction <span class="val-badge" id="frictionVal">0.99</span></label>
      <input type="range" id="frictionSlider" min="0.8" max="1" step="0.001" value="0.99">
    </div>
    <div class="section-gap">
      <div class="panel-title">➕ Add Objects</div>
      <div class="btn-row">
        <button class="btn btn-cyan" id="btnBall">🔴 Add Ball</button>
        <button class="btn btn-cyan" id="btnPendulum">🔵 Add Pendulum</button>
        <button class="btn btn-cyan" id="btnSpring">🟢 Add Spring</button>
        <button class="btn btn-red" id="btnClear">🗑 Clear All</button>
      </div>
    </div>
    <div class="section-gap">
      <div class="panel-title">🎛 Presets</div>
      <div class="preset-row">
        <button class="btn btn-orange" id="presetMoon">🌙 Moon</button>
        <button class="btn btn-orange" id="presetWater">💧 Water</button>
        <button class="btn btn-orange" id="presetElastic">🎾 Elastic</button>
        <button class="btn btn-orange" id="presetFall">⬇ Free Fall</button>
      </div>
    </div>
    <div class="section-gap">
      <div class="panel-title">⏺ Record & Export</div>
      <button class="btn btn-record" id="btnRecord">⏺ Record 3s</button>
      <button class="btn btn-convert" id="btnConvert">🎨 Convert to CSS</button>
      <button class="btn btn-load" id="btnLoadEditor">🚀 Load to Editor</button>
    </div>
  </div>
  <!-- CENTER: Canvas -->
  <div class="panel" style="min-height:0">
    <div class="panel-title" id="canvasLabel">Physics Canvas — Click to add objects</div>
    <div class="stats-row">
      <div class="stat">Objects: <span id="statObjs">0</span></div>
      <div class="stat">FPS: <span id="statFPS">60</span></div>
      <div class="stat">Time: <span id="statTime">0.0s</span></div>
    </div>
    <canvas id="simCanvas"></canvas>
  </div>
  <!-- RIGHT: Output -->
  <div class="panel" style="min-height:0">
    <div class="panel-title">🎨 Generated CSS</div>
    <textarea id="cssOutput" readonly placeholder="// No recording yet. Hit Record 3s first, then Convert to CSS."></textarea>
    <div class="panel-title" style="margin-top:8px">✨ CSS Animation Preview</div>
    <div class="preview-box" id="previewBox">
      <div class="preview-dot" id="previewDot"></div>
    </div>
  </div>
</div>
<${'script'}>
(function(){
'use strict';
// ─── Physics Engine ──────────────────────────────────────────────────────────
let objects=[], selected=null, nextId=0;
let gravStr=9.8, gravAng=270, bounce=0.65, friction=0.99;
let simTime=0, lastTimestamp=0, fps=60, fpsFilter=60;
let recordingFrames=null, isRecording=false, recordStart=0;
const RECORD_DURATION=3000; // ms
const canvas=document.getElementById('simCanvas');
const ctx=canvas.getContext('2d');
let pendingType=null;

function resize(){
  const rect=canvas.parentElement.getBoundingClientRect();
  canvas.width=rect.width-28;
  canvas.height=Math.max(300, window.innerHeight-340);
}
resize();
window.addEventListener('resize',resize);

function gravVec(){
  const r=gravAng*Math.PI/180;
  return {x:Math.cos(r)*gravStr*40, y:Math.sin(r)*gravStr*40};
}

// ─ Object classes ─────────────────────────────────────────────────────────────
function makeBall(x,y,color){
  return {id:nextId++,type:'ball',x,y,vx:(Math.random()-0.5)*120,vy:-60,ax:0,ay:0,r:14,color:color||'#00f5ff',trail:[]};
}
function makePendulum(anchorX,anchorY){
  const len=80+Math.random()*40;
  return {id:nextId++,type:'pendulum',ax:anchorX,ay:anchorY,len,angle:0.4+Math.random()*0.4,omega:0,color:'#a855f7',bobR:12};
}
function makeSpring(x,y){
  return {id:nextId++,type:'spring',anchorX:x,anchorY:y-60,x,y,vx:0,vy:0,restLen:60,k:300,mass:1,r:10,color:'#00ff88',trail:[]};
}

// ─ Physics step ───────────────────────────────────────────────────────────────
function stepPhysics(dt){
  if(dt>0.05) dt=0.05; // cap
  const W=canvas.width, H=canvas.height;
  const g=gravVec();
  objects.forEach(o=>{
    if(o.type==='ball'){
      o.vx=(o.vx+g.x*dt)*friction;
      o.vy=(o.vy+g.y*dt)*friction;
      o.x+=o.vx*dt;
      o.y+=o.vy*dt;
      // boundaries
      if(o.x-o.r<0){o.x=o.r;o.vx=Math.abs(o.vx)*bounce;}
      if(o.x+o.r>W){o.x=W-o.r;o.vx=-Math.abs(o.vx)*bounce;}
      if(o.y-o.r<0){o.y=o.r;o.vy=Math.abs(o.vy)*bounce;}
      if(o.y+o.r>H){o.y=H-o.r;o.vy=-Math.abs(o.vy)*bounce;}
      // trail
      o.trail.push({x:o.x,y:o.y});
      if(o.trail.length>40) o.trail.shift();
    } else if(o.type==='pendulum'){
      // simple pendulum: alpha = -g/L * sin(theta) + gravity direction effect
      const gMag=gravStr*40;
      const alpha=(-gMag/o.len)*Math.sin(o.angle);
      o.omega=(o.omega+alpha*dt)*(friction);
      o.angle+=o.omega*dt;
      o.x=o.ax+Math.sin(o.angle)*o.len;
      o.y=o.ay+Math.cos(o.angle)*o.len;
      // wall bounce for pendulum pivot
      if(o.ax<0) o.ax=0;
      if(o.ax>W) o.ax=W;
    } else if(o.type==='spring'){
      // spring-mass: Hooke's law
      const dx=o.x-o.anchorX, dy=o.y-o.anchorY;
      const dist=Math.sqrt(dx*dx+dy*dy)||1;
      const stretch=dist-o.restLen;
      const fx=-o.k*stretch*(dx/dist);
      const fy=-o.k*stretch*(dy/dist);
      o.vx=((o.vx+(g.x+fx/o.mass)*dt)*friction);
      o.vy=((o.vy+(g.y+fy/o.mass)*dt)*friction);
      o.x+=o.vx*dt;
      o.y+=o.vy*dt;
      if(o.x-o.r<0){o.x=o.r;o.vx=Math.abs(o.vx)*bounce;}
      if(o.x+o.r>W){o.x=W-o.r;o.vx=-Math.abs(o.vx)*bounce;}
      if(o.y-o.r<0){o.y=o.r;o.vy=Math.abs(o.vy)*bounce;}
      if(o.y+o.r>H){o.y=H-o.r;o.vy=-Math.abs(o.vy)*bounce;}
      o.trail.push({x:o.x,y:o.y});
      if(o.trail.length>40) o.trail.shift();
    }
  });
}

// ─ Draw ───────────────────────────────────────────────────────────────────────
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  // grid
  ctx.strokeStyle='rgba(0,245,255,0.04)';
  ctx.lineWidth=1;
  for(let x=0;x<canvas.width;x+=40){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,canvas.height);ctx.stroke();}
  for(let y=0;y<canvas.height;y+=40){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(canvas.width,y);ctx.stroke();}
  // gravity arrow
  const g=gravVec();
  const cx2=canvas.width-40,cy2=40;
  ctx.save();
  ctx.translate(cx2,cy2);
  ctx.strokeStyle='rgba(255,107,53,0.7)';
  ctx.lineWidth=2;
  const ang=gravAng*Math.PI/180;
  const len2=22;
  ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(Math.cos(ang)*len2,Math.sin(ang)*len2);ctx.stroke();
  ctx.fillStyle='rgba(255,107,53,0.7)';
  ctx.beginPath();
  ctx.translate(Math.cos(ang)*len2,Math.sin(ang)*len2);
  ctx.rotate(ang);
  ctx.moveTo(0,0);ctx.lineTo(-7,-4);ctx.lineTo(-7,4);ctx.closePath();ctx.fill();
  ctx.restore();

  objects.forEach(o=>{
    const isSel=(o===selected);
    if(o.type==='ball'){
      // trail
      if(o.trail.length>1){
        ctx.beginPath();
        ctx.moveTo(o.trail[0].x,o.trail[0].y);
        for(let i=1;i<o.trail.length;i++) ctx.lineTo(o.trail[i].x,o.trail[i].y);
        ctx.strokeStyle='rgba(0,245,255,0.15)';ctx.lineWidth=2;ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      const grad=ctx.createRadialGradient(o.x-o.r*0.3,o.y-o.r*0.3,2,o.x,o.y,o.r);
      grad.addColorStop(0,'rgba(255,255,255,0.8)');
      grad.addColorStop(0.4,o.color);
      grad.addColorStop(1,o.color+'44');
      ctx.fillStyle=grad;
      ctx.fill();
      if(isSel){ctx.strokeStyle=o.color;ctx.lineWidth=2.5;ctx.shadowBlur=16;ctx.shadowColor=o.color;ctx.stroke();ctx.shadowBlur=0;}
    } else if(o.type==='pendulum'){
      // rod
      ctx.beginPath();ctx.moveTo(o.ax,o.ay);ctx.lineTo(o.x,o.y);
      ctx.strokeStyle='rgba(168,85,247,0.5)';ctx.lineWidth=2;ctx.stroke();
      // anchor
      ctx.beginPath();ctx.arc(o.ax,o.ay,5,0,Math.PI*2);ctx.fillStyle='rgba(168,85,247,0.8)';ctx.fill();
      // bob
      ctx.beginPath();ctx.arc(o.x,o.y,o.bobR,0,Math.PI*2);
      const pg=ctx.createRadialGradient(o.x-4,o.y-4,2,o.x,o.y,o.bobR);
      pg.addColorStop(0,'rgba(255,255,255,0.6)');pg.addColorStop(0.5,'#a855f7');pg.addColorStop(1,'#6d28d9');
      ctx.fillStyle=pg;ctx.fill();
      if(isSel){ctx.strokeStyle='#a855f7';ctx.lineWidth=2;ctx.shadowBlur=14;ctx.shadowColor='#a855f7';ctx.stroke();ctx.shadowBlur=0;}
    } else if(o.type==='spring'){
      // spring wire
      const nCoils=8;
      const ax=o.anchorX,ay=o.anchorY,bx=o.x,by=o.y;
      const ddx=bx-ax,ddy=by-ay;
      const d=Math.sqrt(ddx*ddx+ddy*ddy)||1;
      const nx=-ddy/d,ny=ddx/d;
      const amp=8;
      ctx.beginPath();ctx.moveTo(ax,ay);
      for(let i=0;i<=nCoils*4;i++){
        const t2=i/(nCoils*4);
        const wave=Math.sin(t2*Math.PI*2*nCoils)*amp;
        ctx.lineTo(ax+ddx*t2+nx*wave,ay+ddy*t2+ny*wave);
      }
      ctx.lineTo(bx,by);
      ctx.strokeStyle='rgba(0,255,136,0.6)';ctx.lineWidth=1.5;ctx.stroke();
      // anchor
      ctx.beginPath();ctx.arc(ax,ay,5,0,Math.PI*2);ctx.fillStyle='rgba(0,255,136,0.8)';ctx.fill();
      // mass
      if(o.trail.length>1){
        ctx.beginPath();ctx.moveTo(o.trail[0].x,o.trail[0].y);
        for(let i=1;i<o.trail.length;i++) ctx.lineTo(o.trail[i].x,o.trail[i].y);
        ctx.strokeStyle='rgba(0,255,136,0.12)';ctx.lineWidth=2;ctx.stroke();
      }
      ctx.beginPath();ctx.arc(o.x,o.y,o.r,0,Math.PI*2);
      const sg=ctx.createRadialGradient(o.x-3,o.y-3,2,o.x,o.y,o.r);
      sg.addColorStop(0,'rgba(255,255,255,0.7)');sg.addColorStop(0.5,'#00ff88');sg.addColorStop(1,'#00aa55');
      ctx.fillStyle=sg;ctx.fill();
      if(isSel){ctx.strokeStyle='#00ff88';ctx.lineWidth=2;ctx.shadowBlur=14;ctx.shadowColor='#00ff88';ctx.stroke();ctx.shadowBlur=0;}
    }
    // label
    ctx.fillStyle='rgba(255,255,255,0.5)';ctx.font='10px Inter';
    ctx.fillText('#'+o.id+' '+o.type,o.x-(o.r||12)+2,o.y-(o.r||12)-4);
  });

  // recording indicator
  if(isRecording){
    ctx.fillStyle='rgba(255,50,50,0.85)';
    ctx.beginPath();ctx.arc(20,20,7,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,255,255,0.9)';ctx.font='bold 12px Inter';
    ctx.fillText('REC',32,25);
    const elapsed=performance.now()-recordStart;
    const pct=Math.min(elapsed/RECORD_DURATION,1);
    ctx.fillStyle='rgba(255,50,50,0.3)';
    ctx.fillRect(0,canvas.height-4,canvas.width*pct,4);
    ctx.fillStyle='rgba(255,50,50,0.8)';
    ctx.fillRect(0,canvas.height-4,canvas.width*pct,2);
  }
}

// ─ Main loop ──────────────────────────────────────────────────────────────────
let animId=null;
function loop(ts){
  animId=requestAnimationFrame(loop);
  const dt=(ts-lastTimestamp)/1000;
  lastTimestamp=ts;
  if(dt>0 && dt<0.2){
    simTime+=dt;
    fpsFilter=fpsFilter*0.9+(1/dt)*0.1;
    stepPhysics(dt);
  }
  // record
  if(isRecording && selected){
    const elapsed=performance.now()-recordStart;
    if(elapsed>=RECORD_DURATION){
      isRecording=false;
      document.getElementById('btnRecord').textContent='✅ Recorded!';
      document.getElementById('btnRecord').classList.remove('active');
    } else {
      recordingFrames.push({t:elapsed/1000,x:selected.x,y:selected.y});
    }
  } else if(isRecording && !selected){
    isRecording=false;
    document.getElementById('btnRecord').textContent='⏺ Record 3s';
    document.getElementById('btnRecord').classList.remove('active');
  }
  draw();
  // stats
  if(Math.round(ts/200)!==Math.round((ts-200)/200)){
    document.getElementById('statObjs').textContent=objects.length;
    document.getElementById('statFPS').textContent=Math.round(fpsFilter);
    document.getElementById('statTime').textContent=simTime.toFixed(1)+'s';
  }
}
requestAnimationFrame(ts=>{lastTimestamp=ts;loop(ts);});

// ─ Input ──────────────────────────────────────────────────────────────────────
function bindSlider(id,setter,display,decimals){
  const el=document.getElementById(id);
  const d=document.getElementById(display);
  el.addEventListener('input',()=>{setter(parseFloat(el.value));d.textContent=parseFloat(el.value).toFixed(decimals);});
}
bindSlider('gravStr',v=>{gravStr=v;},'gravStrVal',1);
bindSlider('gravAng',v=>{gravAng=v;},'gravAngVal',0);
bindSlider('bounceSlider',v=>{bounce=v;},'bounceVal',2);
bindSlider('frictionSlider',v=>{friction=v;},'frictionVal',3);

function addBallClick(){pendingType='ball';}
function addPendulumClick(){pendingType='pendulum';}
function addSpringClick(){pendingType='spring';}

document.getElementById('btnBall').onclick=addBallClick;
document.getElementById('btnPendulum').onclick=addPendulumClick;
document.getElementById('btnSpring').onclick=addSpringClick;
document.getElementById('btnClear').onclick=()=>{objects=[];selected=null;recordingFrames=null;document.getElementById('cssOutput').value='';removePreviewAnim();};

canvas.addEventListener('click',e=>{
  const rect=canvas.getBoundingClientRect();
  const mx=e.clientX-rect.left, my=e.clientY-rect.top;
  // check select existing
  const hit=objects.find(o=>{
    const dx=o.x-mx,dy=o.y-my;
    return Math.sqrt(dx*dx+dy*dy)<=(o.r||o.bobR||14)+6;
  });
  if(hit){selected=hit;return;}
  // add
  const colors=['#00f5ff','#ff00aa','#a855f7','#ff6b35','#00ff88','#fbbf24'];
  const color=colors[objects.length%colors.length];
  if(pendingType==='ball'||!pendingType){objects.push(makeBall(mx,my,color));}
  else if(pendingType==='pendulum'){objects.push(makePendulum(mx,my));}
  else if(pendingType==='spring'){objects.push(makeSpring(mx,my));}
  selected=objects[objects.length-1];
});

// ─ Presets ────────────────────────────────────────────────────────────────────
function applyPreset(gs,ga,b,f){
  gravStr=gs;gravAng=ga;bounce=b;friction=f;
  document.getElementById('gravStr').value=gs;document.getElementById('gravStrVal').textContent=gs.toFixed(1);
  document.getElementById('gravAng').value=ga;document.getElementById('gravAngVal').textContent=ga;
  document.getElementById('bounceSlider').value=b;document.getElementById('bounceVal').textContent=b.toFixed(2);
  document.getElementById('frictionSlider').value=f;document.getElementById('frictionVal').textContent=f.toFixed(3);
}
document.getElementById('presetMoon').onclick=()=>applyPreset(1.6,270,0.85,0.999);
document.getElementById('presetWater').onclick=()=>applyPreset(9.8,270,0.1,0.92);
document.getElementById('presetElastic').onclick=()=>applyPreset(9.8,270,0.98,0.999);
document.getElementById('presetFall').onclick=()=>applyPreset(9.8,270,0.0,1.0);

// ─ Recording ──────────────────────────────────────────────────────────────────
document.getElementById('btnRecord').onclick=()=>{
  if(!selected){alert('Click an object on the canvas to select it, then record.');return;}
  if(isRecording) return;
  recordingFrames=[];
  isRecording=true;
  recordStart=performance.now();
  document.getElementById('btnRecord').textContent='⏺ Recording\u2026';
  document.getElementById('btnRecord').classList.add('active');
};

// ─ CSS generation ─────────────────────────────────────────────────────────────
let generatedCSS='';

function removePreviewAnim(){
  const d=document.getElementById('previewDot');
  d.style.animation='none';
  const old=document.getElementById('dynStyle');
  if(old) old.remove();
}

document.getElementById('btnConvert').onclick=()=>{
  if(!recordingFrames||recordingFrames.length<2){
    alert('Record a motion first!');return;
  }
  const frames=recordingFrames;
  const duration=(frames[frames.length-1].t-frames[0].t)||3;
  // find bounding box for normalizing
  let minX=Infinity,maxX=-Infinity,minY=Infinity,maxY=-Infinity;
  frames.forEach(f=>{if(f.x<minX)minX=f.x;if(f.x>maxX)maxX=f.x;if(f.y<minY)minY=f.y;if(f.y>maxY)maxY=f.y;});
  const cX=(minX+maxX)/2, cY=(minY+maxY)/2;
  // Build keyframes at 5% increments (21 steps)
  const steps=21;
  let kfLines='';
  for(let i=0;i<steps;i++){
    const pct=Math.round(i/(steps-1)*100);
    const ti=i/(steps-1)*duration;
    // interpolate
    let best=frames[0];
    for(let j=0;j<frames.length;j++){if(frames[j].t<=ti) best=frames[j];}
    const tx=Math.round((best.x-cX)*100)/100;
    const ty=Math.round((best.y-cY)*100)/100;
    kfLines+=\`  \${pct}% { transform: translate(\${tx}px, \${ty}px); }\\n\`;
  }
  const animName='physics-motion-'+(Date.now()%100000);
  const durationStr=Math.round(duration*100)/100;
  generatedCSS=\`/* Physics Motion — recorded \${durationStr}s */
@keyframes \${animName} {
\${kfLines}}

.\${animName} {
  animation: \${animName} \${durationStr}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate;
  will-change: transform;
}

/* Usage example */
.my-element {
  animation: \${animName} \${durationStr}s ease-in-out infinite;
}\`;
  document.getElementById('cssOutput').value=generatedCSS;
  // inject preview
  const old=document.getElementById('dynStyle');
  if(old) old.remove();
  const style=document.createElement('style');
  style.id='dynStyle';
  style.textContent=\`@keyframes \${animName} {\n\${kfLines}}\n.\${animName} { animation: \${animName} \${durationStr}s cubic-bezier(0.25,0.46,0.45,0.94) infinite alternate; }\`;
  document.head.appendChild(style);
  const dot=document.getElementById('previewDot');
  dot.className='preview-dot '+animName;
};

document.getElementById('btnLoadEditor').onclick=()=>{
  if(!generatedCSS){alert('Convert to CSS first!');return;}
  const html=buildDemoHTML(generatedCSS);
  if(window.editor) window.editor.setValue(html);
  if(window.runPreview) window.runPreview();
};

function buildDemoHTML(css){
  return \`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Physics CSS Demo</title>
<style>
body{background:#020617;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;font-family:Inter,sans-serif;}
.ball{width:48px;height:48px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#00f5ff,#a855f7);box-shadow:0 0 24px #00f5ff;}
\${css}
</style>
</head>
<body>
<div class="ball" style="animation:\${css.match(/animation: ([^;]+);/)?.[1]||'none'}"></div>
</body>
</html>\`;
}

})();
</${'script'}>
</body>
</html>`;

  // ── renderTab hook ─────────────────────────────────────────────────────────
  const _origRenderTab = window.renderTab;
  window.renderTab = function (tabId) {
    if (typeof _origRenderTab === 'function') _origRenderTab(tabId);
    if (tabId !== 'physicscss') {
      return;
    }
    const container = document.getElementById('left-body');
    if (!container) return;
    if (window.editor) {
      window.editor.setValue(STANDALONE_TEMPLATE);
      if (window.runPreview) window.runPreview();
    }
    if (!container) return;
    container.innerHTML = '';

    // ── Scoped CSS ──────────────────────────────────────────────────────────
    const styleId = 'physics-css-studio-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #physics-studio-root {
          display:flex; flex-direction:column; height:100%; min-height:0;
          background:#020617; color:#e2e8f0; font-family:'Inter',sans-serif; font-size:13px;
          --cyan:#00f5ff; --pink:#ff00aa; --purple:#a855f7; --green:#00ff88;
          --orange:#ff6b35; --border:rgba(0,245,255,0.12); --bg2:#0d1424; --bg3:#111827;
        }
        #physics-studio-root * { box-sizing:border-box; }
        .pcs-header {
          padding:10px 16px 6px;
          display:flex; align-items:center; justify-content:space-between; flex-shrink:0;
          border-bottom:1px solid rgba(0,245,255,0.1);
          background:rgba(0,245,255,0.02);
        }
        .pcs-header-left { display:flex; align-items:center; gap:10px; }
        .pcs-title {
          font-size:1.05rem; font-weight:700;
          background:linear-gradient(135deg,#00f5ff,#a855f7);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .pcs-subtitle { font-size:.7rem; color:#64748b; }
        .pcs-body {
          flex:1; display:grid; min-height:0;
          grid-template-columns:220px 1fr 300px;
          gap:8px; padding:8px;
          overflow:hidden;
        }
        .pcs-panel {
          background:#0d1424; border:1px solid rgba(0,245,255,0.1); border-radius:10px;
          padding:10px; display:flex; flex-direction:column; gap:8px; min-height:0; overflow-y:auto;
        }
        .pcs-panel-title {
          font-size:.65rem; font-weight:700; letter-spacing:.12em; color:#00f5ff;
          text-transform:uppercase; border-bottom:1px solid rgba(0,245,255,0.1);
          padding-bottom:5px; margin-bottom:2px; flex-shrink:0;
        }
        .pcs-label { font-size:.7rem; color:#64748b; display:block; margin-bottom:1px; }
        .pcs-val { font-size:.68rem; color:#00f5ff; font-family:'JetBrains Mono',monospace; float:right; }
        .pcs-slider { width:100%; accent-color:#00f5ff; cursor:pointer; height:4px; }
        .pcs-btn {
          display:inline-flex; align-items:center; justify-content:center; gap:5px;
          padding:6px 10px; border-radius:7px; border:none; cursor:pointer;
          font-size:.72rem; font-weight:600; font-family:'Inter',sans-serif;
          transition:all .18s; white-space:nowrap;
        }
        .pcs-btn-cyan { background:rgba(0,245,255,0.1);color:#00f5ff;border:1px solid rgba(0,245,255,0.25); }
        .pcs-btn-cyan:hover { background:rgba(0,245,255,0.22);box-shadow:0 0 14px rgba(0,245,255,0.25); }
        .pcs-btn-pink { background:rgba(255,0,170,0.1);color:#ff00aa;border:1px solid rgba(255,0,170,0.25); }
        .pcs-btn-pink:hover { background:rgba(255,0,170,0.22);box-shadow:0 0 14px rgba(255,0,170,0.25); }
        .pcs-btn-green { background:rgba(0,255,136,0.1);color:#00ff88;border:1px solid rgba(0,255,136,0.25); }
        .pcs-btn-green:hover { background:rgba(0,255,136,0.22); }
        .pcs-btn-orange { background:rgba(255,107,53,0.1);color:#ff6b35;border:1px solid rgba(255,107,53,0.25); }
        .pcs-btn-orange:hover { background:rgba(255,107,53,0.22); }
        .pcs-btn-red { background:rgba(255,50,50,0.08);color:#ff5555;border:1px solid rgba(255,50,50,0.2); }
        .pcs-btn-red:hover { background:rgba(255,50,50,0.18); }
        .pcs-btn-purple { background:rgba(168,85,247,0.12);color:#a855f7;border:1px solid rgba(168,85,247,0.3); }
        .pcs-btn-purple:hover { background:rgba(168,85,247,0.24);box-shadow:0 0 14px rgba(168,85,247,0.3); }
        .pcs-btn-full { width:100%; padding:9px; font-size:.75rem; }
        .pcs-btn-row { display:flex; gap:5px; flex-wrap:wrap; }
        .pcs-preset-grid { display:grid; grid-template-columns:1fr 1fr; gap:4px; }
        .pcs-record-btn {
          background:rgba(255,50,50,0.12);color:#ff5555;border:1px solid rgba(255,50,50,0.35);
          width:100%; padding:9px; font-size:.78rem; border-radius:8px; cursor:pointer;
          font-family:'Inter',sans-serif; font-weight:700; transition:all .2s;
        }
        .pcs-record-btn:hover { background:rgba(255,50,50,0.22); }
        .pcs-record-btn.recording {
          animation:pcs-rec-pulse 1s infinite;
          border-color:rgba(255,50,50,0.7);
        }
        @keyframes pcs-rec-pulse {
          0%,100% { box-shadow:0 0 0 0 rgba(255,50,50,0.5); }
          50% { box-shadow:0 0 0 8px rgba(255,50,50,0); }
        }
        .pcs-convert-btn {
          background:linear-gradient(135deg,rgba(168,85,247,0.18),rgba(0,245,255,0.18));
          color:#a855f7; border:1px solid rgba(168,85,247,0.35);
          width:100%; padding:9px; font-size:.78rem; border-radius:8px; cursor:pointer;
          font-family:'Inter',sans-serif; font-weight:700; transition:all .2s;
        }
        .pcs-convert-btn:hover { box-shadow:0 0 16px rgba(168,85,247,0.35); }
        .pcs-standalone-btn {
          background:linear-gradient(135deg,#00f5ff,#a855f7); color:#020617; border:none;
          width:100%; padding:9px; font-size:.78rem; border-radius:8px; cursor:pointer;
          font-family:'Inter',sans-serif; font-weight:700; transition:filter .2s;
        }
        .pcs-standalone-btn:hover { filter:brightness(1.12); box-shadow:0 0 16px rgba(0,245,255,0.4); }
        .pcs-canvas-wrap {
          flex:1; min-height:0; display:flex; flex-direction:column; gap:6px;
        }
        #pcs-canvas {
          flex:1; width:100%; border-radius:8px; border:1px solid rgba(0,245,255,0.1);
          cursor:crosshair; background:#030b17; display:block; min-height:0;
        }
        .pcs-stats-row { display:flex; gap:6px; flex-shrink:0; }
        .pcs-stat {
          background:#111827; border:1px solid rgba(0,245,255,0.1); border-radius:6px;
          padding:3px 8px; font-size:.65rem; font-family:'JetBrains Mono',monospace; color:#64748b;
        }
        .pcs-stat span { color:#00f5ff; }
        .pcs-type-indicator {
          font-size:.68rem; color:#ff6b35; flex-shrink:0;
          background:rgba(255,107,53,0.1); border:1px solid rgba(255,107,53,0.2);
          border-radius:6px; padding:2px 8px;
        }
        .pcs-textarea {
          flex:1; width:100%; background:#111827; border:1px solid rgba(0,245,255,0.1);
          border-radius:8px; color:#00ff88; font-family:'JetBrains Mono',monospace;
          font-size:.68rem; padding:8px; resize:none; outline:none; min-height:120px;
        }
        .pcs-textarea:focus { border-color:#00f5ff; }
        .pcs-preview-box {
          flex:1; background:radial-gradient(ellipse at 50% 50%,#0a1628 0%,#020617 100%);
          border:1px solid rgba(0,245,255,0.1); border-radius:8px;
          display:flex; align-items:center; justify-content:center;
          overflow:hidden; position:relative; min-height:120px;
        }
        .pcs-preview-dot {
          width:32px; height:32px; border-radius:50%;
          background:radial-gradient(circle at 35% 35%,#00f5ff,#a855f7);
          box-shadow:0 0 16px #00f5ff;
        }
        .pcs-hint { font-size:.65rem; color:#475569; text-align:center; flex-shrink:0; }
        .pcs-section-gap { margin-top:4px; }
        .pcs-load-editor-btn {
          background:rgba(0,255,136,0.12); color:#00ff88; border:1px solid rgba(0,255,136,0.3);
          width:100%; padding:9px; font-size:.78rem; border-radius:8px; cursor:pointer;
          font-family:'Inter',sans-serif; font-weight:700; transition:all .2s;
        }
        .pcs-load-editor-btn:hover { background:rgba(0,255,136,0.22); box-shadow:0 0 14px rgba(0,255,136,0.3); }
      `;
      document.head.appendChild(style);
    }

    // ── HTML Structure ───────────────────────────────────────────────────────
    const root = document.createElement('div');
    root.id = 'physics-studio-root';
    root.innerHTML = `
      <div class="pcs-header">
        <div class="pcs-header-left">
          <div>
            <div class="pcs-title">${t('title')}</div>
            <div class="pcs-subtitle">${t('subtitle')}</div>
          </div>
        </div>
        <button class="pcs-btn pcs-btn-cyan" id="pcs-lang-toggle" style="font-size:.65rem">🌐 FR/EN</button>
      </div>
      <div class="pcs-body">

        <!-- LEFT: Controls -->
        <div class="pcs-panel" id="pcs-controls">
          <div class="pcs-panel-title">⚙ ${lang() === 'fr' ? 'Contrôles Physiques' : 'Physics Controls'}</div>

          <div>
            <label class="pcs-label">${t('gravityStr')} <span class="pcs-val" id="pcs-grav-str-val">9.8</span></label>
            <input type="range" class="pcs-slider" id="pcs-grav-str" min="0" max="30" step="0.1" value="9.8">
          </div>
          <div>
            <label class="pcs-label">${t('gravityAngle')} <span class="pcs-val" id="pcs-grav-ang-val">270</span></label>
            <input type="range" class="pcs-slider" id="pcs-grav-ang" min="0" max="360" step="1" value="270">
          </div>
          <div>
            <label class="pcs-label">${t('bounce')} <span class="pcs-val" id="pcs-bounce-val">0.65</span></label>
            <input type="range" class="pcs-slider" id="pcs-bounce" min="0" max="1" step="0.01" value="0.65">
          </div>
          <div>
            <label class="pcs-label">${t('friction')} <span class="pcs-val" id="pcs-friction-val">0.990</span></label>
            <input type="range" class="pcs-slider" id="pcs-friction" min="0.80" max="1" step="0.001" value="0.99">
          </div>

          <div class="pcs-section-gap">
            <div class="pcs-panel-title">➕ ${lang() === 'fr' ? 'Ajouter Objets' : 'Add Objects'}</div>
            <div class="pcs-btn-row">
              <button class="pcs-btn pcs-btn-cyan" id="pcs-add-ball">${t('addBall')}</button>
              <button class="pcs-btn pcs-btn-pink" id="pcs-add-pendulum">${t('addPendulum')}</button>
              <button class="pcs-btn pcs-btn-green" id="pcs-add-spring">${t('addSpring')}</button>
              <button class="pcs-btn pcs-btn-red" id="pcs-clear">${t('clearAll')}</button>
            </div>
          </div>

          <div class="pcs-section-gap">
            <div class="pcs-panel-title">🎛 ${t('presetsLabel')}</div>
            <div class="pcs-preset-grid">
              <button class="pcs-btn pcs-btn-orange" id="pcs-preset-moon">${t('presetMoon')}</button>
              <button class="pcs-btn pcs-btn-orange" id="pcs-preset-water">${t('presetWater')}</button>
              <button class="pcs-btn pcs-btn-orange" id="pcs-preset-elastic">${t('presetElastic')}</button>
              <button class="pcs-btn pcs-btn-orange" id="pcs-preset-fall">${t('presetFall')}</button>
            </div>
          </div>

          <div class="pcs-section-gap">
            <div class="pcs-panel-title">⏺ ${lang() === 'fr' ? 'Enregistrement & Export' : 'Record & Export'}</div>
            <button class="pcs-record-btn" id="pcs-record">${t('record3s')}</button>
            <div class="pcs-hint" id="pcs-rec-hint">${t('selectObject')}</div>
            <button class="pcs-convert-btn" id="pcs-convert">${t('convertCSS')}</button>
            <button class="pcs-load-editor-btn" id="pcs-load-editor">${t('loadEditor')}</button>
          </div>

          <div class="pcs-section-gap">
            <button class="pcs-standalone-btn" id="pcs-standalone">${t('loadStandalone')}</button>
          </div>
        </div>

        <!-- CENTER: Canvas -->
        <div class="pcs-panel pcs-canvas-wrap">
          <div class="pcs-panel-title">${t('canvasLabel')}</div>
          <div class="pcs-stats-row">
            <div class="pcs-stat">${t('statsObjects')}: <span id="pcs-stat-objs">0</span></div>
            <div class="pcs-stat">${t('statsFPS')}: <span id="pcs-stat-fps">60</span></div>
            <div class="pcs-stat">${t('statsTime')}: <span id="pcs-stat-time">0.0s</span></div>
            <div class="pcs-type-indicator" id="pcs-type-ind">mode: ball</div>
          </div>
          <canvas id="pcs-canvas"></canvas>
          <div class="pcs-hint">${t('clickToAdd')}</div>
        </div>

        <!-- RIGHT: Output -->
        <div class="pcs-panel">
          <div class="pcs-panel-title">${t('cssOutput')}</div>
          <textarea class="pcs-textarea" id="pcs-css-out" readonly placeholder="${t('nothingRecorded')}"></textarea>
          <button class="pcs-btn pcs-btn-purple" id="pcs-copy-css" style="align-self:flex-start;font-size:.68rem;padding:4px 10px">📋 ${lang() === 'fr' ? 'Copier CSS' : 'Copy CSS'}</button>
          <div class="pcs-panel-title">${t('cssPreview')}</div>
          <div class="pcs-preview-box" id="pcs-preview-box">
            <div class="pcs-preview-dot" id="pcs-preview-dot"></div>
          </div>
        </div>

      </div>
    `;
    container.appendChild(root);

    // ── Physics Engine (fully self-contained) ───────────────────────────────
    const canvas = document.getElementById('pcs-canvas');
    const ctx = canvas.getContext('2d');

    // ── State ───────────────────────────────────────────────────────────────
    let objects = [];
    let selected = null;
    let nextId = 0;
    let physGravStr = 9.8;
    let physGravAng = 270;
    let physBounce = 0.65;
    let physFriction = 0.990;
    let simTime = 0;
    let lastTS = 0;
    let fpsFiltered = 60;
    let pendingType = 'ball';
    let recordingFrames = null;
    let isRecording = false;
    let recordStart = 0;
    let animId = null;
    let generatedCSS = '';
    let generatedAnimName = '';
    const RECORD_DURATION = 3000;

    // ── Canvas sizing ────────────────────────────────────────────────────────
    function resizeCanvas() {
      const wrap = canvas.parentElement;
      const wrapRect = wrap.getBoundingClientRect();
      const statsH = document.querySelector('.pcs-stats-row')?.offsetHeight || 30;
      const hintH = 24;
      const titleH = 28;
      const gapTotal = 8 * 4;
      canvas.width = Math.max(300, wrapRect.width - 22);
      canvas.height = Math.max(240, wrapRect.height - statsH - hintH - titleH - gapTotal - 10);
    }
    resizeCanvas();
    const ro = new ResizeObserver(resizeCanvas);
    ro.observe(canvas.parentElement);

    // ── Gravity vector ───────────────────────────────────────────────────────
    function getGrav() {
      const r = physGravAng * Math.PI / 180;
      return { x: Math.cos(r) * physGravStr * 42, y: Math.sin(r) * physGravStr * 42 };
    }

    // ── Object factories ─────────────────────────────────────────────────────
    const COLORS = ['#00f5ff', '#ff00aa', '#a855f7', '#ff6b35', '#00ff88', '#fbbf24', '#f472b6', '#38bdf8'];
    function pickColor() { return COLORS[objects.length % COLORS.length]; }

    function makeBall(x, y) {
      return {
        id: nextId++, type: 'ball',
        x, y, vx: (Math.random() - 0.5) * 130, vy: -80 - Math.random() * 40,
        r: 12 + Math.random() * 6, color: pickColor(), trail: []
      };
    }
    function makePendulum(x, y) {
      const L = 70 + Math.random() * 50;
      return {
        id: nextId++, type: 'pendulum',
        ax: x, ay: Math.min(y, canvas.height * 0.35),
        len: L, angle: 0.35 + Math.random() * 0.5, omega: 0,
        bobR: 11, color: '#a855f7',
        get x() { return this.ax + Math.sin(this.angle) * this.len; },
        get y() { return this.ay + Math.cos(this.angle) * this.len; }
      };
    }
    function makeSpring(x, y) {
      const ancY = Math.max(10, y - 70);
      return {
        id: nextId++, type: 'spring',
        anchorX: x, anchorY: ancY,
        x, y, vx: (Math.random() - 0.5) * 60, vy: 30,
        restLen: 70, k: 280, mass: 1.2,
        r: 10, color: '#00ff88', trail: []
      };
    }
    function makeProjectile(x, y) {
      return {
        id: nextId++, type: 'projectile',
        x, y, vx: 80 + Math.random() * 60, vy: -120 - Math.random() * 60,
        r: 8, color: '#ff6b35', trail: [], isMassive: true
      };
    }

    // ── Physics step ─────────────────────────────────────────────────────────
    function physicsStep(dt) {
      if (dt > 0.05) dt = 0.05;
      const W = canvas.width, H = canvas.height;
      const g = getGrav();

      objects.forEach(o => {
        switch (o.type) {
          case 'ball':
          case 'projectile': {
            // Euler integration
            o.vx = (o.vx + g.x * dt) * physFriction;
            o.vy = (o.vy + g.y * dt) * physFriction;
            o.x += o.vx * dt;
            o.y += o.vy * dt;
            // boundary collisions
            if (o.x - o.r < 0)  { o.x = o.r;     o.vx =  Math.abs(o.vx) * physBounce; }
            if (o.x + o.r > W)  { o.x = W - o.r; o.vx = -Math.abs(o.vx) * physBounce; }
            if (o.y - o.r < 0)  { o.y = o.r;     o.vy =  Math.abs(o.vy) * physBounce; }
            if (o.y + o.r > H)  { o.y = H - o.r; o.vy = -Math.abs(o.vy) * physBounce; }
            o.trail.push({ x: o.x, y: o.y });
            if (o.trail.length > 50) o.trail.shift();
            break;
          }
          case 'pendulum': {
            // Simple pendulum: α = -(g_effective/L)·sin(θ)
            const gEff = physGravStr * 42;
            const alpha = -(gEff / o.len) * Math.sin(o.angle);
            o.omega = (o.omega + alpha * dt) * physFriction;
            o.angle += o.omega * dt;
            // clamp pivot to canvas
            if (o.ax < 10) o.ax = 10;
            if (o.ax > W - 10) o.ax = W - 10;
            if (o.ay < 10) o.ay = 10;
            if (o.ay > H - 10) o.ay = H - 10;
            break;
          }
          case 'spring': {
            // Hooke's law: F = -k·Δx
            const dx = o.x - o.anchorX;
            const dy = o.y - o.anchorY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
            const stretch = dist - o.restLen;
            const fx = -o.k * stretch * (dx / dist);
            const fy = -o.k * stretch * (dy / dist);
            const ax2 = (fx / o.mass) + g.x;
            const ay2 = (fy / o.mass) + g.y;
            o.vx = (o.vx + ax2 * dt) * physFriction;
            o.vy = (o.vy + ay2 * dt) * physFriction;
            o.x += o.vx * dt;
            o.y += o.vy * dt;
            if (o.x - o.r < 0)  { o.x = o.r;     o.vx =  Math.abs(o.vx) * physBounce; }
            if (o.x + o.r > W)  { o.x = W - o.r; o.vx = -Math.abs(o.vx) * physBounce; }
            if (o.y - o.r < 0)  { o.y = o.r;     o.vy =  Math.abs(o.vy) * physBounce; }
            if (o.y + o.r > H)  { o.y = H - o.r; o.vy = -Math.abs(o.vy) * physBounce; }
            o.trail.push({ x: o.x, y: o.y });
            if (o.trail.length > 50) o.trail.shift();
            break;
          }
        }
      });

      // Ball-ball collisions (simple circle-circle)
      for (let i = 0; i < objects.length; i++) {
        for (let j = i + 1; j < objects.length; j++) {
          const a = objects[i], b = objects[j];
          if ((a.type !== 'ball' && a.type !== 'projectile') || (b.type !== 'ball' && b.type !== 'projectile')) continue;
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const minDist = a.r + b.r;
          if (dist < minDist) {
            const nx = dx / dist, ny = dy / dist;
            const overlap = minDist - dist;
            a.x -= nx * overlap * 0.5;
            a.y -= ny * overlap * 0.5;
            b.x += nx * overlap * 0.5;
            b.y += ny * overlap * 0.5;
            // velocity exchange (equal mass approx)
            const dvx = a.vx - b.vx, dvy = a.vy - b.vy;
            const dot = dvx * nx + dvy * ny;
            if (dot > 0) {
              a.vx -= dot * nx * physBounce;
              a.vy -= dot * ny * physBounce;
              b.vx += dot * nx * physBounce;
              b.vy += dot * ny * physBounce;
            }
          }
        }
      }
    }

    // ── Draw ─────────────────────────────────────────────────────────────────
    function drawScene() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      // grid
      ctx.strokeStyle = 'rgba(0,245,255,0.035)';
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // gravity direction arrow
      const g = getGrav();
      const gLen = Math.min(Math.sqrt(g.x * g.x + g.y * g.y), 32);
      const gNx = g.x / (Math.sqrt(g.x * g.x + g.y * g.y) || 1);
      const gNy = g.y / (Math.sqrt(g.x * g.x + g.y * g.y) || 1);
      const arrowX = W - 40, arrowY = 38;
      ctx.save();
      ctx.strokeStyle = 'rgba(255,107,53,0.7)';
      ctx.fillStyle = 'rgba(255,107,53,0.7)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(arrowX + gNx * gLen, arrowY + gNy * gLen);
      ctx.stroke();
      ctx.translate(arrowX + gNx * gLen, arrowY + gNy * gLen);
      ctx.rotate(Math.atan2(gNy, gNx));
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(-8, -4); ctx.lineTo(-8, 4);
      ctx.closePath(); ctx.fill();
      ctx.restore();
      ctx.fillStyle = 'rgba(255,107,53,0.5)';
      ctx.font = '9px Inter';
      ctx.fillText('g', arrowX - 10, arrowY);

      // objects
      objects.forEach(o => {
        const isSel = o === selected;

        if (o.type === 'ball' || o.type === 'projectile') {
          // trail
          if (o.trail.length > 1) {
            ctx.beginPath();
            ctx.moveTo(o.trail[0].x, o.trail[0].y);
            for (let i = 1; i < o.trail.length; i++) ctx.lineTo(o.trail[i].x, o.trail[i].y);
            ctx.strokeStyle = o.color + '22';
            ctx.lineWidth = 2.5;
            ctx.stroke();
          }
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
          const gr = ctx.createRadialGradient(o.x - o.r * 0.35, o.y - o.r * 0.35, 1.5, o.x, o.y, o.r);
          gr.addColorStop(0, 'rgba(255,255,255,0.85)');
          gr.addColorStop(0.35, o.color);
          gr.addColorStop(1, o.color + '33');
          ctx.fillStyle = gr;
          ctx.fill();
          if (isSel) {
            ctx.strokeStyle = o.color; ctx.lineWidth = 2;
            ctx.shadowBlur = 18; ctx.shadowColor = o.color;
            ctx.stroke(); ctx.shadowBlur = 0;
          }
          // velocity indicator
          if (isSel) {
            const speed = Math.sqrt(o.vx * o.vx + o.vy * o.vy);
            const vScale = 0.08;
            ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(o.x, o.y); ctx.lineTo(o.x + o.vx * vScale, o.y + o.vy * vScale); ctx.stroke();
          }
        }

        else if (o.type === 'pendulum') {
          const bx = o.x, by = o.y;
          // rod
          ctx.beginPath(); ctx.moveTo(o.ax, o.ay); ctx.lineTo(bx, by);
          ctx.strokeStyle = 'rgba(168,85,247,0.45)'; ctx.lineWidth = 2; ctx.stroke();
          // anchor pin
          ctx.beginPath(); ctx.arc(o.ax, o.ay, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#a855f7'; ctx.fill();
          ctx.strokeStyle = 'rgba(168,85,247,0.6)'; ctx.lineWidth = 1.5; ctx.stroke();
          // bob
          ctx.beginPath(); ctx.arc(bx, by, o.bobR, 0, Math.PI * 2);
          const pg = ctx.createRadialGradient(bx - 4, by - 4, 2, bx, by, o.bobR);
          pg.addColorStop(0, 'rgba(255,255,255,0.7)');
          pg.addColorStop(0.4, '#a855f7');
          pg.addColorStop(1, '#4c1d95');
          ctx.fillStyle = pg; ctx.fill();
          if (isSel) {
            ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2;
            ctx.shadowBlur = 16; ctx.shadowColor = '#a855f7';
            ctx.stroke(); ctx.shadowBlur = 0;
          }
          // energy arc
          ctx.beginPath();
          ctx.arc(o.ax, o.ay, o.len, Math.PI * 0.5 - 0.6, Math.PI * 0.5 + 0.6);
          ctx.strokeStyle = 'rgba(168,85,247,0.1)'; ctx.lineWidth = 1; ctx.stroke();
        }

        else if (o.type === 'spring') {
          // spring coil drawing
          const nCoils = 8;
          const ax = o.anchorX, ay = o.anchorY, bx = o.x, by = o.y;
          const dx = bx - ax, dy = by - ay;
          const d = Math.sqrt(dx * dx + dy * dy) || 0.001;
          const nx = -dy / d, ny = dx / d;
          const amp = 7;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          for (let i = 0; i <= nCoils * 6; i++) {
            const t2 = i / (nCoils * 6);
            const wave = Math.sin(t2 * Math.PI * 2 * nCoils) * amp;
            ctx.lineTo(ax + dx * t2 + nx * wave, ay + dy * t2 + ny * wave);
          }
          ctx.lineTo(bx, by);
          ctx.strokeStyle = 'rgba(0,255,136,0.55)'; ctx.lineWidth = 1.5; ctx.stroke();

          // anchor pin
          ctx.beginPath(); ctx.arc(ax, ay, 5, 0, Math.PI * 2);
          ctx.fillStyle = '#00ff88'; ctx.fill();

          // trail
          if (o.trail.length > 1) {
            ctx.beginPath(); ctx.moveTo(o.trail[0].x, o.trail[0].y);
            for (let i = 1; i < o.trail.length; i++) ctx.lineTo(o.trail[i].x, o.trail[i].y);
            ctx.strokeStyle = '#00ff8822'; ctx.lineWidth = 2; ctx.stroke();
          }
          // mass bob
          ctx.beginPath(); ctx.arc(bx, by, o.r, 0, Math.PI * 2);
          const sg = ctx.createRadialGradient(bx - 3, by - 3, 2, bx, by, o.r);
          sg.addColorStop(0, 'rgba(255,255,255,0.7)');
          sg.addColorStop(0.4, '#00ff88');
          sg.addColorStop(1, '#065f46');
          ctx.fillStyle = sg; ctx.fill();
          if (isSel) {
            ctx.strokeStyle = '#00ff88'; ctx.lineWidth = 2;
            ctx.shadowBlur = 16; ctx.shadowColor = '#00ff88';
            ctx.stroke(); ctx.shadowBlur = 0;
          }
          // spring constant label
          if (isSel) {
            ctx.fillStyle = 'rgba(0,255,136,0.6)'; ctx.font = '9px Inter';
            ctx.fillText(`k=${o.k} N/m`, ax + dx / 2 + nx * 18, ay + dy / 2 + ny * 18);
          }
        }

        // ID label
        const lx = o.type === 'pendulum' ? o.x : o.x;
        const ly = o.type === 'pendulum' ? o.y - o.bobR - 6 : o.y - (o.r || 11) - 5;
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.font = '9px Inter';
        ctx.fillText(`#${o.id} ${o.type}`, lx - 12, ly);
      });

      // recording overlay
      if (isRecording) {
        const elapsed = performance.now() - recordStart;
        const pct = Math.min(elapsed / RECORD_DURATION, 1);
        // flashing dot
        ctx.fillStyle = `rgba(255,50,50,${0.5 + 0.5 * Math.sin(elapsed / 200)})`;
        ctx.beginPath(); ctx.arc(16, 16, 7, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.font = 'bold 11px Inter';
        ctx.fillText('REC', 28, 21);
        ctx.fillText(`${((RECORD_DURATION - elapsed) / 1000).toFixed(1)}s`, W - 38, 21);
        // progress bar
        ctx.fillStyle = 'rgba(255,50,50,0.2)';
        ctx.fillRect(0, H - 4, W, 4);
        ctx.fillStyle = 'rgba(255,50,50,0.8)';
        ctx.fillRect(0, H - 4, W * pct, 4);
        ctx.fillStyle = 'rgba(255,50,50,0.4)';
        ctx.fillRect(0, H - 4, W * pct, 2);
      }

      // empty state hint
      if (objects.length === 0) {
        ctx.fillStyle = 'rgba(100,116,139,0.5)';
        ctx.font = '600 14px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('Click anywhere to add a physics object', W / 2, H / 2 - 10);
        ctx.font = '12px Inter';
        ctx.fillText(`Current mode: ${pendingType}`, W / 2, H / 2 + 12);
        ctx.textAlign = 'left';
      }
    }

    // ── Animation loop ────────────────────────────────────────────────────────
    let lastStatsUpdate = 0;
    function loop(ts) {
      animId = requestAnimationFrame(loop);
      const dt = (ts - lastTS) / 1000;
      lastTS = ts;

      if (dt > 0 && dt < 0.25) {
        simTime += dt;
        fpsFiltered = fpsFiltered * 0.92 + (1 / dt) * 0.08;
        physicsStep(dt);
      }

      // record frame
      if (isRecording) {
        const elapsed = performance.now() - recordStart;
        if (elapsed >= RECORD_DURATION) {
          isRecording = false;
          const recBtn = document.getElementById('pcs-record');
          if (recBtn) {
            recBtn.textContent = t('recorded');
            recBtn.classList.remove('recording');
          }
          const hint = document.getElementById('pcs-rec-hint');
          if (hint) hint.textContent = lang() === 'fr' ? `✅ ${recordingFrames.length} frames capturées` : `✅ ${recordingFrames.length} frames captured`;
        } else if (selected) {
          recordingFrames.push({ t: elapsed / 1000, x: selected.x, y: selected.y });
        }
      }

      drawScene();

      // stats (throttled)
      if (ts - lastStatsUpdate > 200) {
        lastStatsUpdate = ts;
        const s1 = document.getElementById('pcs-stat-objs');
        const s2 = document.getElementById('pcs-stat-fps');
        const s3 = document.getElementById('pcs-stat-time');
        if (s1) s1.textContent = objects.length;
        if (s2) s2.textContent = Math.round(fpsFiltered);
        if (s3) s3.textContent = simTime.toFixed(1) + 's';
      }
    }
    requestAnimationFrame(ts => { lastTS = ts; loop(ts); });

    // ── Cleanup on tab switch ─────────────────────────────────────────────────
    const origRenderCleanup = window.renderTab;
    // We store the animId so it can be cancelled if needed
    canvas.dataset.animId = 'pcs-anim';

    // ── Canvas interaction ────────────────────────────────────────────────────
    canvas.addEventListener('click', e => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const mx = (e.clientX - rect.left) * scaleX;
      const my = (e.clientY - rect.top) * scaleY;

      // Try to select existing
      for (let i = objects.length - 1; i >= 0; i--) {
        const o = objects[i];
        const ox = o.type === 'pendulum' ? o.x : o.x;
        const oy = o.type === 'pendulum' ? o.y : o.y;
        const radius = (o.r || o.bobR || 14) + 8;
        const dx = ox - mx, dy = oy - my;
        if (Math.sqrt(dx * dx + dy * dy) <= radius) {
          selected = o;
          const hint = document.getElementById('pcs-rec-hint');
          if (hint) hint.textContent = lang() === 'fr' ? `Objet #${o.id} (${o.type}) sélectionné` : `Object #${o.id} (${o.type}) selected`;
          return;
        }
      }

      // Add new object
      let newObj;
      switch (pendingType) {
        case 'ball':       newObj = makeBall(mx, my); break;
        case 'pendulum':   newObj = makePendulum(mx, my); break;
        case 'spring':     newObj = makeSpring(mx, my); break;
        case 'projectile': newObj = makeProjectile(mx, my); break;
        default:           newObj = makeBall(mx, my);
      }
      objects.push(newObj);
      selected = newObj;
      const hint = document.getElementById('pcs-rec-hint');
      if (hint) hint.textContent = lang() === 'fr' ? `Objet #${newObj.id} sélectionné` : `Object #${newObj.id} selected`;
    });

    // ── Sliders ────────────────────────────────────────────────────────────────
    function bindSlider(sliderId, valId, setter, decimals) {
      const sl = document.getElementById(sliderId);
      const vl = document.getElementById(valId);
      if (!sl || !vl) return;
      sl.addEventListener('input', () => {
        const v = parseFloat(sl.value);
        setter(v);
        vl.textContent = v.toFixed(decimals);
      });
    }
    bindSlider('pcs-grav-str', 'pcs-grav-str-val', v => { physGravStr = v; }, 1);
    bindSlider('pcs-grav-ang', 'pcs-grav-ang-val', v => { physGravAng = v; }, 0);
    bindSlider('pcs-bounce',   'pcs-bounce-val',   v => { physBounce = v;  }, 2);
    bindSlider('pcs-friction', 'pcs-friction-val', v => { physFriction = v; }, 3);

    // ── Add buttons ────────────────────────────────────────────────────────────
    function setMode(mode) {
      pendingType = mode;
      const ind = document.getElementById('pcs-type-ind');
      if (ind) ind.textContent = `mode: ${mode}`;
    }
    document.getElementById('pcs-add-ball').onclick = () => setMode('ball');
    document.getElementById('pcs-add-pendulum').onclick = () => setMode('pendulum');
    document.getElementById('pcs-add-spring').onclick = () => setMode('spring');

    document.getElementById('pcs-clear').onclick = () => {
      objects = []; selected = null; recordingFrames = null; generatedCSS = ''; generatedAnimName = '';
      const out = document.getElementById('pcs-css-out');
      if (out) out.value = '';
      removePreviewAnim();
    };

    // ── Presets ────────────────────────────────────────────────────────────────
    function applyPreset(gs, ga, b, f) {
      physGravStr = gs; physGravAng = ga; physBounce = b; physFriction = f;
      ['pcs-grav-str', 'pcs-grav-ang', 'pcs-bounce', 'pcs-friction'].forEach((id, i) => {
        const el = document.getElementById(id);
        if (el) el.value = [gs, ga, b, f][i];
      });
      document.getElementById('pcs-grav-str-val').textContent = gs.toFixed(1);
      document.getElementById('pcs-grav-ang-val').textContent = ga;
      document.getElementById('pcs-bounce-val').textContent = b.toFixed(2);
      document.getElementById('pcs-friction-val').textContent = f.toFixed(3);
    }
    document.getElementById('pcs-preset-moon').onclick    = () => applyPreset(1.6, 270, 0.85, 0.9995);
    document.getElementById('pcs-preset-water').onclick   = () => applyPreset(9.8, 270, 0.08, 0.920);
    document.getElementById('pcs-preset-elastic').onclick = () => applyPreset(9.8, 270, 0.97, 0.9990);
    document.getElementById('pcs-preset-fall').onclick    = () => applyPreset(9.8, 270, 0.00, 1.000);

    // ── Recording ──────────────────────────────────────────────────────────────
    document.getElementById('pcs-record').onclick = () => {
      if (isRecording) return;
      if (!selected) {
        const hint = document.getElementById('pcs-rec-hint');
        if (hint) hint.textContent = lang() === 'fr' ? '⚠ Sélectionnez un objet d\'abord' : '⚠ Select an object first';
        return;
      }
      recordingFrames = [];
      isRecording = true;
      recordStart = performance.now();
      const btn = document.getElementById('pcs-record');
      btn.textContent = t('recording');
      btn.classList.add('recording');
      const hint = document.getElementById('pcs-rec-hint');
      if (hint) hint.textContent = lang() === 'fr' ? `📡 Enregistrement de #${selected.id}…` : `📡 Recording #${selected.id}…`;
    };

    // ── CSS generation ─────────────────────────────────────────────────────────
    function removePreviewAnim() {
      const dot = document.getElementById('pcs-preview-dot');
      if (dot) { dot.style.animation = 'none'; dot.className = 'pcs-preview-dot'; }
      const old = document.getElementById('pcs-dyn-style');
      if (old) old.remove();
    }

    function cubicBezierFromPhysics() {
      // Derive a cubic-bezier approximation from bounce/friction
      const p1x = 0.25;
      const p1y = physBounce > 0.5 ? 0.1 : 0.46;
      const p2x = 0.45;
      const p2y = physFriction > 0.97 ? 0.94 : 0.72;
      return `cubic-bezier(${p1x}, ${p1y.toFixed(2)}, ${p2x}, ${p2y.toFixed(2)})`;
    }

    document.getElementById('pcs-convert').onclick = () => {
      if (!recordingFrames || recordingFrames.length < 4) {
        const hint = document.getElementById('pcs-rec-hint');
        if (hint) hint.textContent = lang() === 'fr' ? '⚠ Enregistrement insuffisant' : '⚠ Not enough recording data';
        return;
      }

      const frames = recordingFrames;
      const duration = Math.max(0.1, frames[frames.length - 1].t - frames[0].t);

      // Compute bounding box → normalize to center
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      frames.forEach(f => {
        if (f.x < minX) minX = f.x;
        if (f.x > maxX) maxX = f.x;
        if (f.y < minY) minY = f.y;
        if (f.y > maxY) maxY = f.y;
      });
      const cX = (minX + maxX) / 2;
      const cY = (minY + maxY) / 2;

      // Sample at 5% intervals → 21 keyframes
      const STEPS = 21;
      const keyframes = [];
      for (let i = 0; i < STEPS; i++) {
        const pct = Math.round((i / (STEPS - 1)) * 100);
        const ti = (i / (STEPS - 1)) * duration;

        // linear interpolation between closest frames
        let lo = frames[0], hi = frames[frames.length - 1];
        for (let j = 0; j < frames.length - 1; j++) {
          if (frames[j].t <= ti && frames[j + 1].t >= ti) {
            lo = frames[j]; hi = frames[j + 1]; break;
          }
        }
        const span = hi.t - lo.t || 0.001;
        const alpha = Math.max(0, Math.min(1, (ti - lo.t) / span));
        const ix = lo.x + (hi.x - lo.x) * alpha;
        const iy = lo.y + (hi.y - lo.y) * alpha;
        const tx = Math.round((ix - cX) * 100) / 100;
        const ty = Math.round((iy - cY) * 100) / 100;
        // Also add a slight rotation for balls based on velocity
        const rot = 0;
        keyframes.push({ pct, tx, ty, rot });
      }

      const animName = `phys-${Math.floor(Math.random() * 90000 + 10000)}`;
      const durationStr = duration.toFixed(2);
      const easing = cubicBezierFromPhysics();

      let kfBlock = '';
      keyframes.forEach(kf => {
        kfBlock += `  ${kf.pct}% { transform: translate(${kf.tx}px, ${kf.ty}px); }\n`;
      });

      generatedAnimName = animName;
      generatedCSS =
`/* ──────────────────────────────────────────────────────
   Physics Motion CSS — generated by IA Architecte Studio
   Object type : ${selected ? selected.type : 'unknown'}
   Duration    : ${durationStr}s
   Frames      : ${frames.length}
   Gravity     : ${physGravStr} at ${physGravAng}°
   Bounce      : ${physBounce}  |  Friction: ${physFriction}
   Easing      : ${easing}
   ────────────────────────────────────────────────────── */

@keyframes ${animName} {
${kfBlock}}

/* ─ Apply this class to any element ─ */
.${animName} {
  animation: ${animName} ${durationStr}s ${easing} infinite alternate;
  will-change: transform;
}

/* ─ Alternative (fill-mode, play once) ─ */
.${animName}-once {
  animation: ${animName} ${durationStr}s ${easing} 1 forwards;
  will-change: transform;
}

/* ─ With loop timing variants ─ */
.${animName}-fast  { animation: ${animName} ${(duration * 0.5).toFixed(2)}s ${easing} infinite alternate; }
.${animName}-slow  { animation: ${animName} ${(duration * 2.0).toFixed(2)}s ${easing} infinite alternate; }

/* ─ Demo HTML ─────────────────────────
<div class="${animName}">
  Your element here
</div>
────────────────────────────────────── */`;

      const out = document.getElementById('pcs-css-out');
      if (out) out.value = generatedCSS;

      // Inject preview
      removePreviewAnim();
      const styleTag = document.createElement('style');
      styleTag.id = 'pcs-dyn-style';
      styleTag.textContent = `@keyframes ${animName} {\n${kfBlock}}\n.${animName} { animation: ${animName} ${durationStr}s ${easing} infinite alternate; }`;
      document.head.appendChild(styleTag);
      const dot = document.getElementById('pcs-preview-dot');
      if (dot) dot.className = `pcs-preview-dot ${animName}`;

      const hint = document.getElementById('pcs-rec-hint');
      if (hint) hint.textContent = lang() === 'fr' ? `✅ CSS @keyframes généré (${STEPS} étapes)` : `✅ CSS @keyframes generated (${STEPS} steps)`;
    };

    // ── Copy CSS ───────────────────────────────────────────────────────────────
    document.getElementById('pcs-copy-css').onclick = () => {
      if (!generatedCSS) return;
      navigator.clipboard.writeText(generatedCSS).then(() => {
        const btn = document.getElementById('pcs-copy-css');
        const orig = btn.textContent;
        btn.textContent = '✅ Copied!';
        setTimeout(() => { btn.textContent = orig; }, 1800);
      });
    };

    // ── Load to Editor ─────────────────────────────────────────────────────────
    document.getElementById('pcs-load-editor').onclick = () => {
      if (!generatedCSS) {
        const hint = document.getElementById('pcs-rec-hint');
        if (hint) hint.textContent = lang() === 'fr' ? '⚠ Convertissez en CSS d\'abord' : '⚠ Convert to CSS first';
        return;
      }
      const demo = buildDemoHTML(generatedCSS, generatedAnimName);
      if (window.editor) window.editor.setValue(demo);
      if (window.runPreview) window.runPreview();
    };

    // ── Standalone ─────────────────────────────────────────────────────────────
    document.getElementById('pcs-standalone').onclick = () => {
      if (window.editor) window.editor.setValue(STANDALONE_TEMPLATE);
      if (window.runPreview) window.runPreview();
    };

    // ── Language toggle ────────────────────────────────────────────────────────
    document.getElementById('pcs-lang-toggle').onclick = () => {
      window.appLang = window.appLang === 'fr' ? 'en' : 'fr';
      window.renderTab('physicscss');
    };

    // ── Toast ──────────────────────────────────────────────────────────────────
    if (window.showToast) window.showToast('✅ Physics CSS Studio initialized.');
  };

  // ── Demo HTML builder (also used by standalone) ────────────────────────────
  function buildDemoHTML(css, animName) {
    const an = animName || 'physics-anim';
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Physics CSS Motion Demo</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #020617;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    color: #e2e8f0;
    gap: 32px;
  }
  h1 {
    font-size: 1.3rem;
    background: linear-gradient(135deg, #00f5ff, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .scene {
    width: 300px;
    height: 300px;
    background: radial-gradient(ellipse at 50% 50%, #0a1628 0%, #020617 100%);
    border: 1px solid rgba(0,245,255,0.15);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
  }
  .ball {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #00f5ff, #a855f7);
    box-shadow: 0 0 24px rgba(0,245,255,0.5), 0 0 48px rgba(168,85,247,0.25);
  }
  .square {
    width: 44px;
    height: 44px;
    background: linear-gradient(135deg, #ff00aa, #ff6b35);
    border-radius: 8px;
    box-shadow: 0 0 20px rgba(255,0,170,0.5);
  }
  .label {
    position: absolute;
    bottom: 8px;
    right: 10px;
    font-size: 10px;
    color: rgba(100,116,139,0.6);
    font-family: 'JetBrains Mono', monospace;
  }
  .info {
    font-size: 0.78rem;
    color: #64748b;
    text-align: center;
    max-width: 300px;
  }
  .info code {
    color: #00f5ff;
    background: rgba(0,245,255,0.1);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.72rem;
  }

${css}
</style>
</head>
<body>
  <h1>🌊 Physics → CSS Motion Demo</h1>
  <div class="scene">
    <div class="ball ${an}"></div>
    <div class="label">${an}</div>
  </div>
  <div class="scene">
    <div class="square ${an}"></div>
    <div class="label">square demo</div>
  </div>
  <div class="info">
    Apply <code>.${an}</code> to any element.<br>
    Generated by IA Architecte Studio — Physics CSS Module.
  </div>
</body>
</html>`;
  }

  // ── Toast on script load ───────────────────────────────────────────────────
  if (window.showToast) window.showToast('✅ Physics CSS Studio initialized.');

})();
