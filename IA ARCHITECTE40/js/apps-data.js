'use strict';
/* IA Architecte — Apps Data Part 1 (apps 1-5) */

const APPS_DATA = [

/* 1 ── CALCULATOR ─────────────────────────────────── */
{icon:'🧮', en:'Calculator Pro', fr:'Calculatrice Pro',
 desc_en:'Full calculator with keyboard support & history',
 desc_fr:'Calculatrice complète avec clavier et historique',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Calculator Pro</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#0f1521;display:flex;align-items:center;justify-content:center;min-height:100vh}
.calc{background:#151d2e;border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:24px;width:320px;box-shadow:0 24px 48px rgba(0,0,0,.5)}
.display{background:#0b0f1a;border-radius:14px;padding:16px 20px;margin-bottom:16px;text-align:right}
.expr{font-size:13px;color:#4a5568;min-height:20px;margin-bottom:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.result{font-size:36px;font-weight:800;color:#e2e8f0;word-break:break-all}
.history{font-size:11px;color:#2d3748;margin-top:6px;max-height:40px;overflow-y:auto}
.btns{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
btn{display:block}
.btn{padding:16px 0;border-radius:12px;border:none;font-size:16px;font-weight:700;cursor:pointer;transition:all .15s;width:100%}
.btn:hover{filter:brightness(1.2);transform:translateY(-1px)}
.btn:active{transform:translateY(0);filter:brightness(.9)}
.btn-num{background:#1e2a3a;color:#e2e8f0}
.btn-op{background:rgba(59,130,246,.15);color:#3b82f6}
.btn-eq{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;grid-column:span 2}
.btn-clear{background:rgba(239,68,68,.15);color:#ef4444}
.btn-sm{font-size:13px;padding:14px 0}
</style></head><body>
<div class="calc">
  <div class="display">
    <div class="expr" id="expr"></div>
    <div class="result" id="result">0</div>
    <div class="history" id="history"></div>
  </div>
  <div class="btns">
    <button class="btn btn-clear btn-sm" onclick="clearAll()">AC</button>
    <button class="btn btn-op btn-sm" onclick="toggleSign()">+/−</button>
    <button class="btn btn-op btn-sm" onclick="percent()">%</button>
    <button class="btn btn-op" onclick="op('/')">÷</button>
    <button class="btn btn-num" onclick="num('7')">7</button>
    <button class="btn btn-num" onclick="num('8')">8</button>
    <button class="btn btn-num" onclick="num('9')">9</button>
    <button class="btn btn-op" onclick="op('*')">×</button>
    <button class="btn btn-num" onclick="num('4')">4</button>
    <button class="btn btn-num" onclick="num('5')">5</button>
    <button class="btn btn-num" onclick="num('6')">6</button>
    <button class="btn btn-op" onclick="op('-')">−</button>
    <button class="btn btn-num" onclick="num('1')">1</button>
    <button class="btn btn-num" onclick="num('2')">2</button>
    <button class="btn btn-num" onclick="num('3')">3</button>
    <button class="btn btn-op" onclick="op('+')">+</button>
    <button class="btn btn-num" style="grid-column:span 2" onclick="num('0')">0</button>
    <button class="btn btn-num" onclick="num('.')">.</button>
    <button class="btn btn-eq" onclick="calc()">=</button>
  </div>
</div>
<script>
let cur='0',prev='',operator='',newNum=false,hist=[];
const R=()=>document.getElementById('result'),E=()=>document.getElementById('expr'),H=()=>document.getElementById('history');
function num(n){
  if(newNum){cur=n==='.'?'0.':n;newNum=false;}
  else{if(n==='.'&&cur.includes('.'))return;cur=cur==='0'&&n!=='.'?n:cur+n;}
  R().textContent=cur;
}
function op(o){
  if(operator&&!newNum){calc(false);}
  prev=cur;operator=o;newNum=true;
  const sym={'+':'+','-':'−','*':'×','/':'÷'}[o];
  E().textContent=prev+' '+sym;
}
function calc(final=true){
  if(!operator||!prev)return;
  const a=parseFloat(prev),b=parseFloat(cur);
  let res;
  switch(operator){case '+':res=a+b;break;case '-':res=a-b;break;case '*':res=a*b;break;case '/':res=b===0?'Error':a/b;break;}
  if(final){
    const entry=prev+(operator==='+'?'+':operator==='−'||operator==='-'?'−':operator==='*'?'×':'÷')+cur+'='+res;
    hist.unshift(entry);if(hist.length>5)hist.pop();
    H().textContent=hist.join(' | ');
    E().textContent='';
  }
  cur=String(res);R().textContent=cur;prev='';operator='';newNum=true;
}
function clearAll(){cur='0';prev='';operator='';newNum=false;R().textContent='0';E().textContent='';}
function toggleSign(){cur=String(-parseFloat(cur));R().textContent=cur;}
function percent(){cur=String(parseFloat(cur)/100);R().textContent=cur;}
document.addEventListener('keydown',e=>{
  if(e.key>='0'&&e.key<='9')num(e.key);
  else if(e.key==='.')num('.');
  else if(e.key==='+'||e.key==='-'||e.key==='*'||e.key==='/')op(e.key);
  else if(e.key==='Enter'||e.key==='=')calc();
  else if(e.key==='Escape'||e.key==='c')clearAll();
  else if(e.key==='Backspace'){cur=cur.length>1?cur.slice(0,-1):'0';R().textContent=cur;}
});
</script></body></html>`},

/* 2 ── CLOCK ───────────────────────────────────────── */
{icon:'🕐', en:'World Clock', fr:'Horloge Mondiale',
 desc_en:'Analog + digital clock with stopwatch & timer',
 desc_fr:'Horloge analogique + chronomètre + minuteur',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>World Clock</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;padding:24px}
.clock-face{width:220px;height:220px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#1a2436,#0b0f1a);border:3px solid rgba(59,130,246,.3);box-shadow:0 0 40px rgba(59,130,246,.2),inset 0 0 30px rgba(0,0,0,.5);position:relative}
.hand{position:absolute;bottom:50%;left:50%;transform-origin:bottom center;border-radius:4px;transition:transform .5s cubic-bezier(.4,2.08,.55,.44)}
.hand-h{width:5px;height:60px;background:linear-gradient(180deg,#3b82f6,#8b5cf6);margin-left:-2.5px;border-radius:4px 4px 0 0}
.hand-m{width:3px;height:80px;background:#10b981;margin-left:-1.5px;border-radius:3px 3px 0 0}
.hand-s{width:2px;height:90px;background:#ef4444;margin-left:-1px;border-radius:2px 2px 0 0}
.center-dot{position:absolute;width:10px;height:10px;background:#fff;border-radius:50%;top:50%;left:50%;transform:translate(-50%,-50%);z-index:10}
.tick{position:absolute;width:2px;height:10px;background:rgba(255,255,255,.3);left:50%;transform-origin:bottom center}
.digital{font-size:40px;font-weight:900;font-family:monospace;color:#3b82f6;text-shadow:0 0 20px rgba(59,130,246,.5)}
.date{font-size:13px;color:#94a3b8;text-align:center}
.tabs{display:flex;gap:8px}
.tab{padding:7px 18px;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#94a3b8;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s}
.tab.active{background:rgba(59,130,246,.15);color:#3b82f6;border-color:rgba(59,130,246,.3)}
.panel{text-align:center;min-width:280px}
.sw-time{font-size:48px;font-weight:900;font-family:monospace;color:#10b981;margin:10px 0}
.btns{display:flex;gap:10px;justify-content:center}
.sbtn{padding:10px 24px;border-radius:10px;border:none;font-size:14px;font-weight:700;cursor:pointer;transition:all .2s}
.sbtn-start{background:linear-gradient(135deg,#10b981,#3b82f6);color:#fff}
.sbtn-stop{background:linear-gradient(135deg,#ef4444,#f59e0b);color:#fff}
.sbtn-reset{background:rgba(255,255,255,.07);color:#94a3b8;border:1px solid rgba(255,255,255,.1)}
.laps{max-height:100px;overflow-y:auto;margin-top:10px;display:flex;flex-direction:column;gap:4px}
.lap{font-size:11px;color:#64748b;font-family:monospace}
</style></head><body>
<svg style="position:absolute;opacity:0" width="0" height="0"></svg>
<div class="tabs">
  <button class="tab active" onclick="showTab('clock',this)">🕐 Clock</button>
  <button class="tab" onclick="showTab('stop',this)">⏱ Stopwatch</button>
  <button class="tab" onclick="showTab('timer',this)">⏲ Timer</button>
</div>

<div id="tab-clock" class="panel">
  <div class="clock-face" id="cf">
    <div class="hand hand-h" id="hh"></div>
    <div class="hand hand-m" id="hm"></div>
    <div class="hand hand-s" id="hs"></div>
    <div class="center-dot"></div>
  </div>
  <div class="digital" id="dtime">00:00:00</div>
  <div class="date" id="ddate"></div>
</div>

<div id="tab-stop" class="panel" style="display:none">
  <div class="sw-time" id="sw-display">00:00.00</div>
  <div class="btns">
    <button class="sbtn sbtn-start" id="sw-btn" onclick="swToggle()">Start</button>
    <button class="sbtn sbtn-reset" onclick="swReset()">Reset</button>
    <button class="sbtn sbtn-reset" onclick="swLap()">Lap</button>
  </div>
  <div class="laps" id="laps"></div>
</div>

<div id="tab-timer" class="panel" style="display:none">
  <div class="sw-time" id="tmr-display" style="color:#f59e0b">05:00</div>
  <input type="range" min="1" max="60" value="5" id="tmr-range" style="width:200px;accent-color:#f59e0b" oninput="tmrSet(this.value)"/>
  <div style="font-size:12px;color:#64748b;margin-top:4px" id="tmr-label">5 minutes</div>
  <div class="btns" style="margin-top:10px">
    <button class="sbtn sbtn-start" id="tmr-btn" onclick="tmrToggle()">Start</button>
    <button class="sbtn sbtn-reset" onclick="tmrReset()">Reset</button>
  </div>
</div>

<script>
// Clock
function updateClock(){
  const n=new Date();
  const h=n.getHours()%12,m=n.getMinutes(),s=n.getSeconds();
  document.getElementById('hh').style.transform=\`rotate(\${h*30+m*.5}deg)\`;
  document.getElementById('hm').style.transform=\`rotate(\${m*6}deg)\`;
  document.getElementById('hs').style.transform=\`rotate(\${s*6}deg)\`;
  document.getElementById('dtime').textContent=n.toLocaleTimeString();
  document.getElementById('ddate').textContent=n.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
}
setInterval(updateClock,1000);updateClock();

// Tabs
function showTab(id,el){
  ['clock','stop','timer'].forEach(t=>document.getElementById('tab-'+t).style.display='none');
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+id).style.display='';el.classList.add('active');
}

// Stopwatch
let swStart=null,swElapsed=0,swRunning=false,swInterval,lapCount=0;
function swToggle(){
  if(!swRunning){swStart=Date.now()-swElapsed;swInterval=setInterval(swUpdate,10);swRunning=true;document.getElementById('sw-btn').textContent='Stop';document.getElementById('sw-btn').className='sbtn sbtn-stop';}
  else{clearInterval(swInterval);swElapsed=Date.now()-swStart;swRunning=false;document.getElementById('sw-btn').textContent='Start';document.getElementById('sw-btn').className='sbtn sbtn-start';}
}
function swUpdate(){
  swElapsed=Date.now()-swStart;
  const t=swElapsed,m=Math.floor(t/60000),s=Math.floor((t%60000)/1000),ms=Math.floor((t%1000)/10);
  document.getElementById('sw-display').textContent=\`\${String(m).padStart(2,'0')}:\${String(s).padStart(2,'0')}.\${String(ms).padStart(2,'0')}\`;
}
function swReset(){clearInterval(swInterval);swElapsed=0;swRunning=false;document.getElementById('sw-display').textContent='00:00.00';document.getElementById('sw-btn').textContent='Start';document.getElementById('sw-btn').className='sbtn sbtn-start';document.getElementById('laps').innerHTML='';lapCount=0;}
function swLap(){if(!swRunning)return;lapCount++;const laps=document.getElementById('laps');const d=document.getElementById('sw-display').textContent;const el=document.createElement('div');el.className='lap';el.textContent='Lap '+lapCount+': '+d;laps.prepend(el);}

// Timer
let tmrTotal=300,tmrLeft=300,tmrRunning=false,tmrInterval;
function tmrSet(v){tmrTotal=v*60;tmrLeft=tmrTotal;tmrRender();document.getElementById('tmr-label').textContent=v+' minute'+(v>1?'s':'');}
function tmrRender(){const m=Math.floor(tmrLeft/60),s=tmrLeft%60;document.getElementById('tmr-display').textContent=String(m).padStart(2,'0')+':'+String(s).padStart(2,'0');}
function tmrToggle(){
  if(!tmrRunning){tmrInterval=setInterval(()=>{if(tmrLeft<=0){clearInterval(tmrInterval);tmrRunning=false;document.getElementById('tmr-btn').textContent='Start';document.getElementById('tmr-display').style.color='#ef4444';}else{tmrLeft--;tmrRender();}},1000);tmrRunning=true;document.getElementById('tmr-btn').textContent='Pause';document.getElementById('tmr-display').style.color='#f59e0b';}
  else{clearInterval(tmrInterval);tmrRunning=false;document.getElementById('tmr-btn').textContent='Resume';}
}
function tmrReset(){clearInterval(tmrInterval);tmrRunning=false;tmrLeft=tmrTotal;tmrRender();document.getElementById('tmr-btn').textContent='Start';document.getElementById('tmr-display').style.color='#f59e0b';}
</script></body></html>`},

/* 3 ── SNAKE GAME ──────────────────────────────────── */
{icon:'🎮', en:'Snake Game', fr:'Jeu Snake',
 desc_en:'Classic Snake with score, speed & game over screen',
 desc_fr:'Snake classique avec score, vitesse et écran game over',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Snake Game</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;gap:14px}
h1{font-size:22px;font-weight:900;background:linear-gradient(135deg,#10b981,#3b82f6);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hud{display:flex;gap:24px;font-size:13px;font-weight:700}
.hud span{color:#94a3b8}.hud strong{color:#10b981}
canvas{border:2px solid rgba(16,185,129,.3);border-radius:12px;box-shadow:0 0 30px rgba(16,185,129,.15)}
.overlay{position:absolute;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center}
.start-btn{padding:12px 30px;background:linear-gradient(135deg,#10b981,#3b82f6);border:none;border-radius:12px;color:#fff;font-weight:800;font-size:15px;cursor:pointer;transition:all .2s}
.start-btn:hover{transform:translateY(-2px);box-shadow:0 8px 20px rgba(16,185,129,.4)}
.arrow-keys{display:grid;grid-template-columns:repeat(3,40px);gap:5px;margin-top:10px}
.key{width:40px;height:36px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:16px;cursor:pointer;transition:all .15s;user-select:none}
.key:active,.key.pressed{background:rgba(16,185,129,.2);border-color:rgba(16,185,129,.4)}
</style></head><body>
<h1>🐍 Snake Game</h1>
<div class="hud"><span>Score: <strong id="score">0</strong></span><span>Best: <strong id="best">0</strong></span><span>Level: <strong id="level">1</strong></span></div>
<div style="position:relative">
  <canvas id="c" width="360" height="360"></canvas>
  <div class="overlay" id="overlay" style="inset:0;background:rgba(8,12,20,.85);border-radius:12px">
    <div style="font-size:36px">🐍</div>
    <div style="font-size:20px;font-weight:800">Snake Game</div>
    <div style="font-size:13px;color:#94a3b8">Use arrow keys or buttons below</div>
    <button class="start-btn" onclick="startGame()">▶ Start Game</button>
  </div>
</div>
<div class="arrow-keys">
  <div></div><div class="key" id="kU" onclick="dir(0,-1)">▲</div><div></div>
  <div class="key" id="kL" onclick="dir(-1,0)">◄</div>
  <div class="key" id="kD" onclick="dir(0,1)">▼</div>
  <div class="key" id="kR" onclick="dir(1,0)">►</div>
</div>
<script>
const C=document.getElementById('c'),ctx=C.getContext('2d');
const S=18,G=C.width/S;
let snake,food,dx,dy,score,best=0,lvl,running,interval;
function startGame(){
  document.getElementById('overlay').style.display='none';
  snake=[{x:9,y:9},{x:8,y:9},{x:7,y:9}];
  dx=1;dy=0;score=0;lvl=1;
  updateHud();placeFood();
  clearInterval(interval);running=true;
  interval=setInterval(tick,200-lvl*15);
}
function placeFood(){
  do{food={x:Math.floor(Math.random()*G),y:Math.floor(Math.random()*G)};}
  while(snake.some(s=>s.x===food.x&&s.y===food.y));
}
function dir(x,y){if(x&&!dx||y&&!dy){dx=x;dy=y;}}
function tick(){
  const head={x:snake[0].x+dx,y:snake[0].y+dy};
  if(head.x<0||head.x>=G||head.y<0||head.y>=G||snake.some(s=>s.x===head.x&&s.y===head.y)){
    clearInterval(interval);running=false;
    const ol=document.getElementById('overlay');ol.style.display='flex';
    ol.innerHTML=\`<div style="font-size:40px">💀</div><div style="font-size:22px;font-weight:800">Game Over!</div><div style="color:#94a3b8">Score: \${score}</div><button class="start-btn" onclick="startGame()">🔄 Play Again</button>\`;
    return;
  }
  snake.unshift(head);
  if(head.x===food.x&&head.y===food.y){score+=10;if(score>best)best=score;if(score%50===0){lvl=Math.min(8,lvl+1);clearInterval(interval);interval=setInterval(tick,200-lvl*15);}updateHud();placeFood();}
  else snake.pop();
  draw();
}
function draw(){
  ctx.fillStyle='#080c14';ctx.fillRect(0,0,C.width,C.height);
  // Grid
  ctx.strokeStyle='rgba(255,255,255,.03)';ctx.lineWidth=.5;
  for(let i=0;i<=G;i++){ctx.beginPath();ctx.moveTo(i*S,0);ctx.lineTo(i*S,C.height);ctx.stroke();ctx.beginPath();ctx.moveTo(0,i*S);ctx.lineTo(C.width,i*S);ctx.stroke();}
  // Food
  ctx.fillStyle='#ef4444';ctx.shadowColor='#ef4444';ctx.shadowBlur=10;
  ctx.beginPath();ctx.arc(food.x*S+S/2,food.y*S+S/2,S/2-2,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;
  // Snake
  snake.forEach((s,i)=>{
    const g=ctx.createLinearGradient(s.x*S,s.y*S,s.x*S+S,s.y*S+S);
    g.addColorStop(0,i===0?'#10b981':'#3b82f6');g.addColorStop(1,i===0?'#3b82f6':'#1a3a5c');
    ctx.fillStyle=g;ctx.shadowColor='#10b981';ctx.shadowBlur=i===0?8:0;
    ctx.beginPath();ctx.roundRect(s.x*S+1,s.y*S+1,S-2,S-2,4);ctx.fill();ctx.shadowBlur=0;
  });
}
function updateHud(){document.getElementById('score').textContent=score;document.getElementById('best').textContent=best;document.getElementById('level').textContent=lvl;}
document.addEventListener('keydown',e=>{
  const m={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
  if(m[e.key]){e.preventDefault();dir(...m[e.key]);}
  const k={ArrowUp:'kU',ArrowDown:'kD',ArrowLeft:'kL',ArrowRight:'kR'};
  if(k[e.key]){const el=document.getElementById(k[e.key]);el.classList.add('pressed');setTimeout(()=>el.classList.remove('pressed'),150);}
});
</script></body></html>`},

/* 4 ── WEATHER UI ──────────────────────────────────── */
{icon:'🌤️', en:'Weather Dashboard', fr:'Météo Dashboard',
 desc_en:'Beautiful weather UI with animated icons & 5 cities',
 desc_fr:'Interface météo avec animations et 5 villes',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Weather</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;min-height:100vh;padding:24px}
.container{max-width:700px;margin:0 auto}
h1{font-size:20px;font-weight:800;margin-bottom:18px;display:flex;align-items:center;gap:8px}
.city-tabs{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.ctab{padding:7px 14px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.04);color:#94a3b8;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s}
.ctab.active{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;border-color:transparent}
.main-card{background:linear-gradient(135deg,rgba(59,130,246,.15),rgba(139,92,246,.1));border:1px solid rgba(59,130,246,.2);border-radius:24px;padding:32px;margin-bottom:16px;display:flex;align-items:center;gap:24px}
.weather-icon{font-size:80px;animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.temp{font-size:64px;font-weight:900;line-height:1}
.city-name{font-size:22px;font-weight:800;margin-bottom:6px}
.condition{font-size:15px;color:#94a3b8;margin-bottom:10px}
.meta{display:flex;gap:16px;font-size:13px;color:#94a3b8}
.meta strong{color:#e2e8f0}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:14px}
.mini{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:16px;text-align:center}
.mini-icon{font-size:24px;margin-bottom:8px}
.mini-val{font-size:18px;font-weight:800;color:#3b82f6}
.mini-lbl{font-size:11px;color:#64748b;margin-top:4px}
.forecast{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.fday{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:14px;padding:14px 8px;text-align:center;font-size:12px}
.fday-name{color:#64748b;font-weight:700;margin-bottom:8px}
.fday-icon{font-size:22px;margin:6px 0}
.fday-temp{font-weight:800;font-size:14px}
.fday-low{color:#64748b;font-size:12px}
</style></head><body>
<div class="container">
  <h1>🌤️ Weather Dashboard</h1>
  <div class="city-tabs" id="city-tabs"></div>
  <div class="main-card" id="main-card"></div>
  <div class="grid" id="stats-grid"></div>
  <div class="forecast" id="forecast"></div>
</div>
<script>
const CITIES=[
  {name:'Paris',country:'🇫🇷',icon:'⛅',temp:18,feels:15,condition:'Partly Cloudy',humidity:65,wind:22,uv:4,visibility:12,forecast:[{d:'Mon',i:'🌧',h:16,l:11},{d:'Tue',i:'🌦',h:19,l:13},{d:'Wed',i:'☀️',h:24,l:16},{d:'Thu',i:'⛅',h:21,l:14},{d:'Fri',i:'🌧',h:17,l:12}]},
  {name:'New York',country:'🇺🇸',icon:'☀️',temp:24,feels:22,condition:'Sunny',humidity:45,wind:18,uv:7,visibility:16,forecast:[{d:'Mon',i:'☀️',h:26,l:18},{d:'Tue',i:'⛅',h:23,l:16},{d:'Wed',i:'🌧',h:19,l:14},{d:'Thu',i:'⛅',h:22,l:16},{d:'Fri',i:'☀️',h:27,l:19}]},
  {name:'Tokyo',country:'🇯🇵',icon:'🌸',temp:21,feels:20,condition:'Clear with clouds',humidity:70,wind:12,uv:5,visibility:14,forecast:[{d:'Mon',i:'⛅',h:22,l:17},{d:'Tue',i:'🌦',h:20,l:15},{d:'Wed',i:'⛅',h:21,l:16},{d:'Thu',i:'☀️',h:25,l:18},{d:'Fri',i:'☀️',h:26,l:19}]},
  {name:'Dubai',country:'🇦🇪',icon:'☀️',temp:38,feels:41,condition:'Sunny & Hot',humidity:30,wind:8,uv:11,visibility:20,forecast:[{d:'Mon',i:'☀️',h:39,l:28},{d:'Tue',i:'☀️',h:40,l:29},{d:'Wed',i:'🌫',h:36,l:27},{d:'Thu',i:'☀️',h:38,l:28},{d:'Fri',i:'☀️',h:39,l:29}]},
  {name:'London',country:'🇬🇧',icon:'🌧',temp:12,feels:9,condition:'Rainy',humidity:80,wind:28,uv:2,visibility:8,forecast:[{d:'Mon',i:'🌧',h:13,l:9},{d:'Tue',i:'🌧',h:11,l:8},{d:'Wed',i:'🌦',h:14,l:10},{d:'Thu',i:'⛅',h:16,l:11},{d:'Fri',i:'🌦',h:15,l:10}]},
];
let cur=0;
function render(){
  const c=CITIES[cur];
  // Tabs
  document.getElementById('city-tabs').innerHTML=CITIES.map((ci,i)=>\`<button class="ctab\${i===cur?' active':''}" onclick="cur=\${i};render()">\${ci.country} \${ci.name}</button>\`).join('');
  // Main
  document.getElementById('main-card').innerHTML=\`<div class="weather-icon">\${c.icon}</div><div><div class="city-name">\${c.name} \${c.country}</div><div class="condition">\${c.condition}</div><div class="temp">\${c.temp}°<span style="font-size:28px;color:#64748b">C</span></div><div class="meta" style="margin-top:12px"><span>Feels <strong>\${c.feels}°</strong></span><span>Humidity <strong>\${c.humidity}%</strong></span><span>Wind <strong>\${c.wind}km/h</strong></span></div></div>\`;
  // Stats
  document.getElementById('stats-grid').innerHTML=[['💧','Humidity',c.humidity+'%'],['💨','Wind',c.wind+' km/h'],['🌡','UV Index',c.uv],['👁','Visibility',c.visibility+' km']].map(([i,l,v])=>\`<div class="mini"><div class="mini-icon">\${i}</div><div class="mini-val">\${v}</div><div class="mini-lbl">\${l}</div></div>\`).join('');
  // Forecast
  document.getElementById('forecast').innerHTML=c.forecast.map(f=>\`<div class="fday"><div class="fday-name">\${f.d}</div><div class="fday-icon">\${f.i}</div><div class="fday-temp">\${f.h}°</div><div class="fday-low">\${f.l}°</div></div>\`).join('');
}
render();
</script></body></html>`},

/* 5 ── TODO LIST ───────────────────────────────────── */
{icon:'✅', en:'Todo List Pro', fr:'Liste de Tâches Pro',
 desc_en:'Task manager with categories, priorities & stats',
 desc_fr:'Gestionnaire de tâches avec priorités et statistiques',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Todo Pro</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;min-height:100vh;padding:24px}
.container{max-width:600px;margin:0 auto}
h1{font-size:22px;font-weight:900;margin-bottom:6px}
.stats{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.stat{padding:8px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;font-size:12px;color:#94a3b8}
.stat strong{color:#3b82f6}
.add-row{display:flex;gap:8px;margin-bottom:16px}
.add-input{flex:1;padding:11px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;font-size:14px;outline:none;transition:border .2s}
.add-input:focus{border-color:#3b82f6}
.add-sel{padding:11px 10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;color:#e2e8f0;font-size:13px;outline:none;cursor:pointer}
.add-btn{padding:11px 18px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;border-radius:10px;color:#fff;font-weight:700;cursor:pointer;white-space:nowrap}
.filters{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap}
.filter{padding:5px 12px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:#94a3b8;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s}
.filter.active{background:rgba(59,130,246,.15);color:#3b82f6;border-color:rgba(59,130,246,.3)}
.todo-item{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:12px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;transition:all .2s;animation:slideIn .2s ease}
@keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
.todo-item:hover{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1)}
.todo-item.done{opacity:.5}
.todo-item.done .todo-text{text-decoration:line-through;color:#64748b}
.chk{width:20px;height:20px;border-radius:50%;border:2px solid rgba(255,255,255,.2);cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s}
.chk.checked{background:var(--p-color);border-color:var(--p-color)}
.todo-text{flex:1;font-size:14px}
.priority{font-size:10px;padding:2px 8px;border-radius:10px;font-weight:700;flex-shrink:0}
.p-high{background:rgba(239,68,68,.1);color:#ef4444}
.p-medium{background:rgba(245,158,11,.1);color:#f59e0b}
.p-low{background:rgba(16,185,129,.1);color:#10b981}
.del-btn{background:none;border:none;color:#374151;cursor:pointer;font-size:16px;transition:color .2s;padding:2px 6px}
.del-btn:hover{color:#ef4444}
.progress-bar{height:4px;background:rgba(255,255,255,.07);border-radius:2px;margin-bottom:20px;overflow:hidden}
.progress-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#10b981);border-radius:2px;transition:width .4s}
.empty{text-align:center;padding:32px;color:#374151;font-size:14px}
</style></head><body>
<div class="container">
  <h1>✅ Todo List Pro</h1>
  <div class="stats" id="stats"></div>
  <div class="progress-bar"><div class="progress-fill" id="prog" style="width:0%"></div></div>
  <div class="add-row">
    <input class="add-input" id="inp" placeholder="Add a new task..." onkeydown="if(event.key==='Enter')addTodo()"/>
    <select class="add-sel" id="prio"><option value="low">🟢 Low</option><option value="medium" selected>🟡 Medium</option><option value="high">🔴 High</option></select>
    <button class="add-btn" onclick="addTodo()">+ Add</button>
  </div>
  <div class="filters">
    <button class="filter active" onclick="setFilter('all',this)">All</button>
    <button class="filter" onclick="setFilter('active',this)">Active</button>
    <button class="filter" onclick="setFilter('done',this)">Done</button>
    <button class="filter" onclick="setFilter('high',this)">🔴 High</button>
  </div>
  <div id="list"></div>
</div>
<script>
let todos=[
  {id:1,text:'Design the landing page',done:false,p:'high'},
  {id:2,text:'Write project documentation',done:false,p:'medium'},
  {id:3,text:'Fix navigation bug',done:true,p:'high'},
  {id:4,text:'Add dark mode support',done:false,p:'low'},
  {id:5,text:'Review pull requests',done:false,p:'medium'},
];
let nextId=6,filter='all';
const pColors={high:'#ef4444',medium:'#f59e0b',low:'#10b981'};
function addTodo(){
  const v=document.getElementById('inp').value.trim();if(!v)return;
  todos.unshift({id:nextId++,text:v,done:false,p:document.getElementById('prio').value});
  document.getElementById('inp').value='';render();
}
function toggle(id){const t=todos.find(t=>t.id===id);if(t)t.done=!t.done;render();}
function del(id){todos=todos.filter(t=>t.id!==id);render();}
function setFilter(f,el){filter=f;document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));el.classList.add('active');render();}
function render(){
  const total=todos.length,done=todos.filter(t=>t.done).length;
  document.getElementById('stats').innerHTML=[['Total',total,'#3b82f6'],['Done',done,'#10b981'],['Active',total-done,'#f59e0b'],['High',todos.filter(t=>t.p==='high'&&!t.done).length,'#ef4444']].map(([l,v,c])=>\`<div class="stat">\${l}: <strong style="color:\${c}">\${v}</strong></div>\`).join('');
  document.getElementById('prog').style.width=(total?Math.round(done/total*100):0)+'%';
  let list=todos;
  if(filter==='active')list=todos.filter(t=>!t.done);
  else if(filter==='done')list=todos.filter(t=>t.done);
  else if(filter==='high')list=todos.filter(t=>t.p==='high');
  const el=document.getElementById('list');
  if(!list.length){el.innerHTML='<div class="empty">🎉 Nothing here!</div>';return;}
  el.innerHTML=list.map(t=>\`<div class="todo-item\${t.done?' done':''}">
    <div class="chk\${t.done?' checked':''}" style="--p-color:\${pColors[t.p]}" onclick="toggle(\${t.id})">\${t.done?'✓':''}</div>
    <span class="todo-text">\${t.text}</span>
    <span class="priority p-\${t.p}">\${t.p.toUpperCase()}</span>
    <button class="del-btn" onclick="del(\${t.id})">✕</button>
  </div>\`).join('');
}
render();
</script></body></html>`},

];

window.APPS_DATA = APPS_DATA;
