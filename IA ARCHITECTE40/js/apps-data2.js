'use strict';
/* IA Architecte — Apps Data Part 2 (apps 6-10) */

const APPS_DATA_2 = [

/* 6 ── COLOR PALETTE GENERATOR ─────────────────────── */
{icon:'🎨', en:'Color Palette Generator', fr:'Générateur de Palettes',
 desc_en:'Generate harmonious color palettes, export CSS variables',
 desc_fr:'Génère des palettes harmonieuses, export CSS variables',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Color Palette</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;min-height:100vh;padding:24px}
.container{max-width:700px;margin:0 auto}
h1{font-size:22px;font-weight:900;margin-bottom:20px}
.controls{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center}
.base-label{font-size:13px;color:#94a3b8;font-weight:700}
input[type=color]{width:48px;height:40px;border:none;background:none;cursor:pointer;border-radius:8px}
select{padding:9px 12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:9px;color:#e2e8f0;font-size:13px;outline:none;cursor:pointer}
.gen-btn{padding:10px 20px;background:linear-gradient(135deg,#3b82f6,#8b5cf6);border:none;border-radius:10px;color:#fff;font-weight:700;cursor:pointer;transition:all .2s}
.gen-btn:hover{transform:translateY(-1px);box-shadow:0 6px 16px rgba(59,130,246,.4)}
.palette{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
.swatch-card{flex:1;min-width:90px;border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .15s;position:relative}
.swatch-card:hover{transform:translateY(-4px)}
.swatch-color{height:120px;transition:all .2s}
.swatch-info{background:rgba(0,0,0,.4);padding:10px 12px;backdrop-filter:blur(10px)}
.swatch-hex{font-size:12px;font-weight:800;font-family:monospace;margin-bottom:2px}
.swatch-name{font-size:10px;color:rgba(255,255,255,.6)}
.copy-hint{position:absolute;top:8px;right:8px;font-size:10px;background:rgba(0,0,0,.6);padding:2px 7px;border-radius:10px;opacity:0;transition:opacity .2s}
.swatch-card:hover .copy-hint{opacity:1}
.export-box{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px;margin-bottom:16px}
.export-title{font-size:12px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center}
.copy-btn{padding:4px 10px;background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);color:#3b82f6;border-radius:6px;font-size:11px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}
.copy-btn:hover{background:rgba(59,130,246,.2)}
.code-out{font-family:monospace;font-size:12px;color:#94a3b8;line-height:1.7;white-space:pre-wrap}
.harmonies{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.harmony-pill{display:flex;gap:4px;align-items:center;padding:6px 12px;border-radius:20px;font-size:11px;font-weight:700;border:1px solid rgba(255,255,255,.1);cursor:pointer;transition:all .2s;background:rgba(255,255,255,.03)}
.harmony-pill:hover{border-color:rgba(59,130,246,.3);background:rgba(59,130,246,.08)}
.swatch-dot{width:14px;height:14px;border-radius:50%;flex-shrink:0}
</style></head><body>
<div class="container">
  <h1>🎨 Color Palette Generator</h1>
  <div class="controls">
    <span class="base-label">Base Color:</span>
    <input type="color" id="base-color" value="#3b82f6" oninput="generate()"/>
    <select id="harmony-type" onchange="generate()">
      <option value="analogous">Analogous</option>
      <option value="complementary">Complementary</option>
      <option value="triadic">Triadic</option>
      <option value="split">Split Complementary</option>
      <option value="monochromatic">Monochromatic</option>
    </select>
    <button class="gen-btn" onclick="randomColor()">🎲 Random</button>
  </div>
  <div class="palette" id="palette"></div>
  <div class="harmonies" id="harmonies"></div>
  <div class="export-box">
    <div class="export-title">CSS Variables <button class="copy-btn" onclick="copyCSS()">📋 Copy CSS</button></div>
    <div class="code-out" id="css-out"></div>
  </div>
</div>
<script>
function hexToHsl(hex){const r=parseInt(hex.slice(1,3),16)/255,g=parseInt(hex.slice(3,5),16)/255,b=parseInt(hex.slice(5,7),16)/255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}return[h*360,s*100,l*100];}
function hslToHex(h,s,l){h/=360;s/=100;l/=100;const a=s*Math.min(l,1-l);const f=n=>{const k=(n+h/0.0833333)%12;const c=l-a*Math.max(-1,Math.min(k-3,9-k,1));return Math.round(255*c).toString(16).padStart(2,'0');};return '#'+f(0)+f(8)+f(4);}
function generate(){
  const hex=document.getElementById('base-color').value;
  const type=document.getElementById('harmony-type').value;
  const [h,s,l]=hexToHsl(hex);
  let colors=[];
  const shades=[80,60,50,40,25];
  if(type==='monochromatic'){colors=shades.map(ll=>hslToHex(h,s,ll));}
  else if(type==='analogous'){colors=[hslToHex((h-40+360)%360,s,l),hslToHex((h-20+360)%360,s,l),hex,hslToHex((h+20)%360,s,l),hslToHex((h+40)%360,s,l)];}
  else if(type==='complementary'){colors=[hslToHex(h,s,70),hslToHex(h,s,50),hex,hslToHex((h+180)%360,s,50),hslToHex((h+180)%360,s,35)];}
  else if(type==='triadic'){colors=[hex,hslToHex((h+120)%360,s,l),hslToHex((h+240)%360,s,l),hslToHex((h+120)%360,s,l+15),hslToHex((h+240)%360,s,l+15)];}
  else{colors=[hex,hslToHex((h+150)%360,s,l),hslToHex((h+210)%360,s,l),hslToHex((h+150)%360,s,l+10),hslToHex((h+210)%360,s,l+10)];}
  const names=['Primary','Secondary','Accent','Light','Dark'];
  document.getElementById('palette').innerHTML=colors.map((c,i)=>\`<div class="swatch-card" onclick="navigator.clipboard.writeText('\${c}').then(()=>alert('Copied: \${c}'))" title="Click to copy"><div class="swatch-color" style="background:\${c}"></div><div class="swatch-info"><div class="swatch-hex">\${c.toUpperCase()}</div><div class="swatch-name">\${names[i]||'Color '+i}</div></div><div class="copy-hint">📋 Copy</div></div>\`).join('');
  document.getElementById('css-out').textContent=':root {\n'+colors.map((c,i)=>\`  --color-\${(names[i]||'color-'+i).toLowerCase()}: \${c};\`).join('\n')+'\n}';
}
function randomColor(){document.getElementById('base-color').value='#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');generate();}
function copyCSS(){navigator.clipboard.writeText(document.getElementById('css-out').textContent).then(()=>{const b=event.target;b.textContent='✓ Copied!';setTimeout(()=>b.textContent='📋 Copy CSS',2000)});}
generate();
</script></body></html>`},

/* 7 ── CHART DASHBOARD ─────────────────────────────── */
{icon:'📊', en:'Chart Dashboard', fr:'Tableau de Bord Graphiques',
 desc_en:'Dashboard with bar, line & donut charts in pure SVG',
 desc_fr:'Dashboard avec graphiques SVG purs (bar, line, donut)',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Charts</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;padding:20px;min-height:100vh}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
h1{font-size:20px;font-weight:900}
.kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px}
.kpi{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:16px}
.kpi-val{font-size:26px;font-weight:900;color:#3b82f6}
.kpi-lbl{font-size:11px;color:#64748b;margin-top:4px}
.kpi-delta{font-size:11px;font-weight:700;margin-top:6px}
.up{color:#10b981}.down{color:#ef4444}
.charts{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:14px}
.chart-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:16px;padding:18px}
.chart-title{font-size:13px;font-weight:800;margin-bottom:14px;color:#94a3b8}
svg text{font-family:'Inter',sans-serif}
.legend{display:flex;gap:14px;margin-top:10px;flex-wrap:wrap}
.leg-item{display:flex;align-items:center;gap:5px;font-size:11px;color:#64748b}
.leg-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
.months{display:flex;justify-content:space-between;padding:0 2px;margin-top:4px}
.month{font-size:9px;color:#374151}
</style></head><body>
<div class="header"><h1>📊 Analytics Dashboard</h1><span style="font-size:12px;color:#374151">Last 6 months</span></div>
<div class="kpis">
  <div class="kpi"><div class="kpi-val">$84.2K</div><div class="kpi-lbl">Total Revenue</div><div class="kpi-delta up">↑ 12.5% vs last month</div></div>
  <div class="kpi"><div class="kpi-val" style="color:#10b981">2,847</div><div class="kpi-lbl">Active Users</div><div class="kpi-delta up">↑ 8.3%</div></div>
  <div class="kpi"><div class="kpi-val" style="color:#8b5cf6">142</div><div class="kpi-lbl">New Projects</div><div class="kpi-delta up">↑ 23.1%</div></div>
  <div class="kpi"><div class="kpi-val" style="color:#f59e0b">94.7%</div><div class="kpi-lbl">Satisfaction</div><div class="kpi-delta down">↓ 1.2%</div></div>
</div>
<div class="charts">
  <div class="chart-card">
    <div class="chart-title">Monthly Revenue</div>
    <svg width="100%" height="160" id="bar-chart" viewBox="0 0 400 160"></svg>
    <div class="months" style="max-width:400px"><span class="month">Jan</span><span class="month">Feb</span><span class="month">Mar</span><span class="month">Apr</span><span class="month">May</span><span class="month">Jun</span></div>
    <div class="legend"><div class="leg-item"><div class="leg-dot" style="background:#3b82f6"></div>Revenue</div><div class="leg-item"><div class="leg-dot" style="background:#8b5cf6"></div>Target</div></div>
  </div>
  <div class="chart-card">
    <div class="chart-title">Traffic Sources</div>
    <svg width="100%" height="180" id="donut-chart" viewBox="0 0 180 180"></svg>
    <div class="legend" id="donut-legend"></div>
  </div>
</div>
<div class="chart-card" style="margin-bottom:0">
  <div class="chart-title">User Growth Trend</div>
  <svg width="100%" height="120" id="line-chart" viewBox="0 0 600 120"></svg>
  <div class="months"><span class="month">Jan</span><span class="month">Feb</span><span class="month">Mar</span><span class="month">Apr</span><span class="month">May</span><span class="month">Jun</span></div>
</div>
<script>
// Bar chart
const bars=[45,62,58,78,65,84],targets=[50,60,65,75,70,80];
const bsvg=document.getElementById('bar-chart');
const bw=60,gap=8,maxV=100;
bars.forEach((v,i)=>{
  const x=i*(bw+gap)+10,h=(v/maxV)*130,ty=(targets[i]/maxV)*130;
  bsvg.innerHTML+=\`<rect x="\${x}" y="\${160-h-10}" width="\${bw*0.6}" height="\${h}" rx="5" fill="url(#bg\${i})" opacity=".9"/>
  <rect x="\${x+bw*0.65}" y="\${160-ty-10}" width="\${bw*0.3}" height="\${ty}" rx="4" fill="rgba(139,92,246,.4)" opacity=".8"/>
  <text x="\${x+bw*0.3}" y="\${160-h-16}" fill="#94a3b8" font-size="10" text-anchor="middle">\${v}K</text>
  <defs><linearGradient id="bg\${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#1e40af"/></linearGradient></defs>\`;
});

// Donut chart
const segments=[{label:'Organic',v:35,c:'#3b82f6'},{label:'Paid',v:28,c:'#8b5cf6'},{label:'Social',v:22,c:'#10b981'},{label:'Direct',v:15,c:'#f59e0b'}];
const dsvg=document.getElementById('donut-chart'),cx=90,cy=90,r=70,ir=45;
let angle=-90;
segments.forEach(s=>{
  const a=s.v/100*360,rad=Math.PI/180;
  const x1=cx+r*Math.cos(angle*rad),y1=cy+r*Math.sin(angle*rad);
  angle+=a;
  const x2=cx+r*Math.cos(angle*rad),y2=cy+r*Math.sin(angle*rad);
  const x3=cx+ir*Math.cos(angle*rad),y3=cy+ir*Math.sin(angle*rad);
  const x4=cx+ir*Math.cos((angle-a)*rad),y4=cy+ir*Math.sin((angle-a)*rad);
  const lg=a>180?1:0;
  dsvg.innerHTML+=\`<path d="M\${x1} \${y1} A\${r} \${r} 0 \${lg} 1 \${x2} \${y2} L\${x3} \${y3} A\${ir} \${ir} 0 \${lg} 0 \${x4} \${y4} Z" fill="\${s.c}" opacity=".85"/>\`;
});
dsvg.innerHTML+=\`<circle cx="\${cx}" cy="\${cy}" r="\${ir-5}" fill="#080c14"/><text x="\${cx}" y="\${cy-5}" fill="#e2e8f0" font-size="18" font-weight="900" text-anchor="middle">100%</text><text x="\${cx}" y="\${cy+14}" fill="#64748b" font-size="10" text-anchor="middle">Traffic</text>\`;
document.getElementById('donut-legend').innerHTML=segments.map(s=>\`<div class="leg-item"><div class="leg-dot" style="background:\${s.c}"></div>\${s.label} \${s.v}%</div>\`).join('');

// Line chart
const users=[820,980,1150,1420,1680,2100,1950,2300,2847];
const lsvg=document.getElementById('line-chart'),lw=600,lh=110;
const pts=users.map((v,i)=>[i*(lw/(users.length-1)),lh-(v/3000)*lh+5]);
const path=pts.map((p,i)=>(i===0?'M':'L')+p[0]+' '+p[1]).join(' ');
const area=path+\` L\${pts[pts.length-1][0]} \${lh} L0 \${lh} Z\`;
lsvg.innerHTML=\`<defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3b82f6" stop-opacity=".4"/><stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/></linearGradient></defs><path d="\${area}" fill="url(#lg)"/><path d="\${path}" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linecap="round"/>\`+pts.map(([x,y],i)=>\`<circle cx="\${x}" cy="\${y}" r="4" fill="#3b82f6" stroke="#080c14" stroke-width="2"/>\`).join('');
</script></body></html>`},

/* 8 ── MUSIC PLAYER ─────────────────────────────────── */
{icon:'🎵', en:'Music Player UI', fr:'Lecteur Musique',
 desc_en:'Visual music player with playlist and animated equalizer',
 desc_fr:'Lecteur avec playlist et égaliseur animé',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Music Player</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.player{width:360px}
.now-playing{background:linear-gradient(135deg,#0f1521,#1a1040);border:1px solid rgba(139,92,246,.2);border-radius:24px;padding:24px;margin-bottom:14px;text-align:center;box-shadow:0 20px 40px rgba(0,0,0,.5)}
.cover{width:160px;height:160px;border-radius:20px;margin:0 auto 20px;position:relative;overflow:hidden;box-shadow:0 12px 32px rgba(0,0,0,.5)}
.cover-bg{width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:70px}
.cover-spin{animation:spin 8s linear infinite;animation-play-state:var(--spin,paused)}
@keyframes spin{to{transform:rotate(360deg)}}
.vinyl{position:absolute;inset:0;border-radius:50%;border:3px solid rgba(255,255,255,.1)}
.track-title{font-size:18px;font-weight:800;margin-bottom:4px}
.track-artist{font-size:13px;color:#94a3b8;margin-bottom:20px}
.eq{display:flex;gap:3px;align-items:flex-end;justify-content:center;height:30px;margin-bottom:16px}
.eq-bar{width:4px;background:linear-gradient(180deg,#8b5cf6,#3b82f6);border-radius:2px;animation:eq var(--d,.5s) ease-in-out infinite alternate;animation-play-state:var(--spin,paused)}
@keyframes eq{from{height:4px}to{height:var(--h,20px)}}
.progress-wrap{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.progress-bar{height:4px;background:rgba(255,255,255,.1);border-radius:2px;cursor:pointer;position:relative}
.progress-fill{height:100%;background:linear-gradient(90deg,#8b5cf6,#3b82f6);border-radius:2px;position:relative;transition:width .5s linear}
.progress-fill::after{content:'';position:absolute;right:-5px;top:-4px;width:12px;height:12px;background:#fff;border-radius:50%;box-shadow:0 0 8px rgba(139,92,246,.8)}
.times{display:flex;justify-content:space-between;font-size:11px;color:#64748b;font-family:monospace}
.controls{display:flex;align-items:center;justify-content:center;gap:16px}
.ctrl-btn{background:none;border:none;color:#94a3b8;cursor:pointer;font-size:18px;transition:all .2s;padding:4px}
.ctrl-btn:hover{color:#e2e8f0;transform:scale(1.1)}
.play-btn{width:54px;height:54px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;border-radius:50%;color:#fff;font-size:22px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 20px rgba(139,92,246,.4);transition:all .2s}
.play-btn:hover{transform:scale(1.05);box-shadow:0 12px 28px rgba(139,92,246,.5)}
.playlist{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:18px;overflow:hidden}
.pl-header{padding:12px 16px;font-size:12px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:.06em;border-bottom:1px solid rgba(255,255,255,.06)}
.pl-track{display:flex;align-items:center;gap:12px;padding:12px 16px;cursor:pointer;transition:all .2s}
.pl-track:hover,.pl-track.active{background:rgba(139,92,246,.08)}
.pl-track.active .pl-num{color:#8b5cf6}
.pl-num{font-size:12px;color:#374151;width:16px;text-align:center;flex-shrink:0;font-family:monospace}
.pl-icon{font-size:20px;flex-shrink:0}
.pl-info{flex:1;min-width:0}
.pl-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pl-artist{font-size:11px;color:#64748b}
.pl-dur{font-size:11px;color:#374151;font-family:monospace;flex-shrink:0}
</style></head><body>
<div class="player">
  <div class="now-playing">
    <div class="cover"><div class="cover-bg cover-spin" id="cover-emoji">🎸</div></div>
    <div class="track-title" id="t-title">Neon Dreams</div>
    <div class="track-artist" id="t-artist">Synthwave Project</div>
    <div class="eq" id="eq"></div>
    <div class="progress-wrap">
      <div class="progress-bar" onclick="seek(event)"><div class="progress-fill" id="prog" style="width:35%"></div></div>
      <div class="times"><span id="cur-time">1:22</span><span id="tot-time">3:47</span></div>
    </div>
    <div class="controls">
      <button class="ctrl-btn" onclick="prev()" title="Previous">⏮</button>
      <button class="ctrl-btn" onclick="toggleShuffle()" id="shuffle-btn" title="Shuffle">🔀</button>
      <button class="play-btn" id="play-btn" onclick="togglePlay()">▶</button>
      <button class="ctrl-btn" onclick="toggleRepeat()" id="repeat-btn" title="Repeat">🔁</button>
      <button class="ctrl-btn" onclick="next()" title="Next">⏭</button>
    </div>
  </div>
  <div class="playlist">
    <div class="pl-header">▶ Playlist — 6 tracks</div>
    <div id="playlist-items"></div>
  </div>
</div>
<script>
const tracks=[
  {title:'Neon Dreams',artist:'Synthwave Project',dur:'3:47',emoji:'🎸',color:'#8b5cf6'},
  {title:'Midnight City',artist:'Electro Pulse',dur:'4:12',emoji:'🌃',color:'#3b82f6'},
  {title:'Cyber Rain',artist:'Digital Storm',dur:'3:28',emoji:'⚡',color:'#10b981'},
  {title:'Stellar Waves',artist:'Cosmos Audio',dur:'5:01',emoji:'🌌',color:'#f59e0b'},
  {title:'Code & Bass',artist:'Dev Beats',dur:'3:55',emoji:'💻',color:'#ec4899'},
  {title:'Final Level',artist:'Pixel Sound',dur:'4:30',emoji:'🎮',color:'#ef4444'},
];
let cur=0,playing=false,prog=35;

// EQ bars
const eq=document.getElementById('eq');
for(let i=0;i<16;i++){
  const h=Math.random()*22+6;
  eq.innerHTML+=\`<div class="eq-bar" style="--h:\${h}px;--d:\${(Math.random()*.4+.3).toFixed(2)}s;height:4px"></div>\`;
}

function renderPlaylist(){
  document.getElementById('playlist-items').innerHTML=tracks.map((t,i)=>\`
    <div class="pl-track\${i===cur?' active':''}" onclick="loadTrack(\${i})">
      <span class="pl-num">\${i===cur&&playing?'♪':i+1}</span>
      <span class="pl-icon">\${t.emoji}</span>
      <div class="pl-info"><div class="pl-title">\${t.title}</div><div class="pl-artist">\${t.artist}</div></div>
      <span class="pl-dur">\${t.dur}</span>
    </div>\`).join('');
}

function loadTrack(i){cur=i;prog=0;const tr=tracks[i];document.getElementById('t-title').textContent=tr.title;document.getElementById('t-artist').textContent=tr.artist;document.getElementById('cover-emoji').textContent=tr.emoji;document.getElementById('tot-time').textContent=tr.dur;updateProg();renderPlaylist();}

function togglePlay(){playing=!playing;document.getElementById('play-btn').textContent=playing?'⏸':'▶';document.documentElement.style.setProperty('--spin',playing?'running':'paused');document.querySelectorAll('.eq-bar').forEach(b=>b.style.animationPlayState=playing?'running':'paused');if(playing)simProgress();}
let progInterval;
function simProgress(){clearInterval(progInterval);progInterval=setInterval(()=>{if(!playing)return;prog+=.5;if(prog>=100){prog=0;next();}updateProg();},300);}
function updateProg(){document.getElementById('prog').style.width=prog+'%';const tot=tracks[cur].dur.split(':');const total=parseInt(tot[0])*60+parseInt(tot[1]);const c=Math.round(total*prog/100);document.getElementById('cur-time').textContent=Math.floor(c/60)+':'+(c%60).toString().padStart(2,'0');}
function next(){loadTrack((cur+1)%tracks.length);if(playing){playing=false;togglePlay();}}
function prev(){loadTrack((cur-1+tracks.length)%tracks.length);if(playing){playing=false;togglePlay();}}
function seek(e){const r=e.currentTarget.getBoundingClientRect();prog=Math.max(0,Math.min(100,(e.clientX-r.left)/r.width*100));updateProg();}
function toggleShuffle(){document.getElementById('shuffle-btn').style.opacity=document.getElementById('shuffle-btn').style.opacity==='1'?'.5':'1';}
function toggleRepeat(){document.getElementById('repeat-btn').style.color=document.getElementById('repeat-btn').style.color==='#8b5cf6'?'':'#8b5cf6';}
renderPlaylist();loadTrack(0);
</script></body></html>`},

/* 9 ── MEMORY CARD GAME ─────────────────────────────── */
{icon:'🃏', en:'Memory Card Game', fr:'Jeu de Mémoire',
 desc_en:'Flip card memory game with timer, score & difficulty',
 desc_fr:'Jeu de mémorisation avec timer, score et niveaux',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Memory Game</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;gap:16px}
h1{font-size:22px;font-weight:900;background:linear-gradient(135deg,#f59e0b,#ef4444);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hud{display:flex;gap:20px;font-size:13px;font-weight:700}
.hud-item{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);border-radius:10px;padding:8px 16px;text-align:center}
.hud-val{font-size:20px;font-weight:900;color:#f59e0b}
.hud-lbl{font-size:10px;color:#64748b;margin-top:2px}
.board{display:grid;gap:10px}
.card{width:80px;height:80px;cursor:pointer;position:relative;transition:transform .15s}
.card:hover:not(.flipped):not(.matched){transform:translateY(-3px)}
.card-inner{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform .4s}
.card.flipped .card-inner,.card.matched .card-inner{transform:rotateY(180deg)}
.card-front,.card-back{position:absolute;inset:0;border-radius:14px;display:flex;align-items:center;justify-content:center;backface-visibility:hidden}
.card-back{background:linear-gradient(135deg,#1e2a3a,#0f1521);border:2px solid rgba(59,130,246,.2);font-size:24px;font-weight:900;color:rgba(59,130,246,.3)}
.card-front{background:linear-gradient(135deg,#1a2436,#0f172a);border:2px solid rgba(255,255,255,.1);font-size:36px;transform:rotateY(180deg)}
.card.matched .card-front{background:linear-gradient(135deg,rgba(16,185,129,.15),rgba(59,130,246,.1));border-color:rgba(16,185,129,.3);box-shadow:0 0 16px rgba(16,185,129,.2)}
.controls{display:flex;gap:10px}
.ctrl-btn{padding:9px 20px;border-radius:10px;border:none;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}
.ctrl-btn-main{background:linear-gradient(135deg,#f59e0b,#ef4444);color:#fff}
.ctrl-btn-sec{background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.1)}
.diff-tabs{display:flex;gap:6px}
.diffbtn{padding:5px 14px;border-radius:20px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:#94a3b8;font-size:12px;font-weight:700;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}
.diffbtn.active{background:rgba(245,158,11,.15);color:#f59e0b;border-color:rgba(245,158,11,.3)}
.win-msg{position:fixed;inset:0;background:rgba(8,12,20,.9);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;z-index:100;display:none}
.win-msg.show{display:flex!important}
</style></head><body>
<h1>🃏 Memory Game</h1>
<div class="diff-tabs">
  <button class="diffbtn active" onclick="setDiff(4,4,this)">Easy 4×4</button>
  <button class="diffbtn" onclick="setDiff(4,5,this)">Medium 4×5</button>
  <button class="diffbtn" onclick="setDiff(5,6,this)">Hard 5×6</button>
</div>
<div class="hud">
  <div class="hud-item"><div class="hud-val" id="moves">0</div><div class="hud-lbl">Moves</div></div>
  <div class="hud-item"><div class="hud-val" id="timer">0:00</div><div class="hud-lbl">Time</div></div>
  <div class="hud-item"><div class="hud-val" id="pairs">0</div><div class="hud-lbl">Pairs</div></div>
</div>
<div class="board" id="board"></div>
<div class="controls">
  <button class="ctrl-btn ctrl-btn-main" onclick="initGame()">🔄 New Game</button>
  <button class="ctrl-btn ctrl-btn-sec" onclick="revealAll()">👁 Peek</button>
</div>
<div class="win-msg" id="win-msg">
  <div style="font-size:60px">🎉</div>
  <div style="font-size:26px;font-weight:900">You Won!</div>
  <div style="color:#94a3b8;font-size:14px" id="win-stats"></div>
  <button class="ctrl-btn ctrl-btn-main" onclick="initGame();document.getElementById('win-msg').classList.remove('show')">🔄 Play Again</button>
</div>
<script>
const EMOJIS=['🦊','🐺','🦁','🐯','🦄','🐉','🦋','🌸','⚡','🔥','💎','🚀','🎸','🎯','🍕','🌈','🎪','🎭','🧲','🏆','🌺','🦅','🐬','🦑'];
let cols=4,rows=4,cards=[],flipped=[],matched=0,moves=0,timer=0,timerInt=null,lock=false;

function setDiff(c,r,el){cols=c;rows=r;document.querySelectorAll('.diffbtn').forEach(b=>b.classList.remove('active'));el.classList.add('active');initGame();}

function initGame(){
  clearInterval(timerInt);timer=0;moves=0;matched=0;flipped=[];lock=false;
  document.getElementById('moves').textContent='0';document.getElementById('timer').textContent='0:00';document.getElementById('pairs').textContent='0';
  const total=cols*rows,pairs=total/2;
  const pool=EMOJIS.slice(0,pairs);
  cards=[...pool,...pool].sort(()=>Math.random()-.5);
  const board=document.getElementById('board');
  board.style.gridTemplateColumns=\`repeat(\${cols},80px)\`;
  board.innerHTML=cards.map((e,i)=>\`<div class="card" id="c\${i}" onclick="flip(\${i})"><div class="card-inner"><div class="card-back">?</div><div class="card-front">\${e}</div></div></div>\`).join('');
  timerInt=setInterval(()=>{timer++;const m=Math.floor(timer/60),s=timer%60;document.getElementById('timer').textContent=m+':'+(s<10?'0':'')+s;},1000);
}

function flip(i){
  if(lock||flipped.includes(i)||document.getElementById('c'+i).classList.contains('matched'))return;
  const card=document.getElementById('c'+i);card.classList.add('flipped');flipped.push(i);
  if(flipped.length===2){
    moves++;document.getElementById('moves').textContent=moves;
    lock=true;
    setTimeout(()=>{
      if(cards[flipped[0]]===cards[flipped[1]]){
        flipped.forEach(idx=>document.getElementById('c'+idx).classList.add('matched'));
        matched++;document.getElementById('pairs').textContent=matched;
        if(matched===cols*rows/2){clearInterval(timerInt);document.getElementById('win-stats').textContent=\`Solved in \${moves} moves & \${Math.floor(timer/60)}:\${(timer%60).toString().padStart(2,'0')}\`;document.getElementById('win-msg').classList.add('show');}
      } else {
        flipped.forEach(idx=>{document.getElementById('c'+idx).classList.remove('flipped');});
      }
      flipped=[];lock=false;
    },800);
  }
}

function revealAll(){
  document.querySelectorAll('.card:not(.matched)').forEach(c=>c.classList.add('flipped'));
  setTimeout(()=>document.querySelectorAll('.card:not(.matched)').forEach(c=>c.classList.remove('flipped')),1500);
}
initGame();
</script></body></html>`},

/* 10 ── CURRENCY CONVERTER ─────────────────────────── */
{icon:'💱', en:'Currency Converter', fr:'Convertisseur Devises',
 desc_en:'Convert 20 currencies with live trend chart',
 desc_fr:'Convertit 20 devises avec graphique de tendance',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Currency Converter</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;font-family:'Inter',sans-serif}
body{background:#080c14;color:#e2e8f0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.container{width:100%;max-width:500px}
h1{font-size:20px;font-weight:900;margin-bottom:20px;text-align:center}
.card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:24px;margin-bottom:14px}
.input-group{display:flex;flex-direction:column;gap:6px;margin-bottom:16px}
.input-label{font-size:11px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.06em}
.input-row{display:flex;gap:8px}
.amount-input{flex:1;padding:13px 16px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:#e2e8f0;font-size:20px;font-weight:800;outline:none;transition:border .2s;font-family:'Inter',sans-serif}
.amount-input:focus{border-color:#3b82f6}
.currency-sel{padding:13px 12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:12px;color:#e2e8f0;font-size:14px;font-weight:700;outline:none;cursor:pointer;min-width:120px}
.swap-btn{width:100%;padding:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:12px;color:#3b82f6;font-size:18px;cursor:pointer;transition:all .2s;margin:0 0 16px;font-family:'Inter',sans-serif}
.swap-btn:hover{background:rgba(59,130,246,.1);transform:rotate(180deg)}
.result-box{background:linear-gradient(135deg,rgba(59,130,246,.1),rgba(139,92,246,.08));border:1px solid rgba(59,130,246,.2);border-radius:14px;padding:20px;text-align:center;margin-bottom:14px}
.result-amount{font-size:36px;font-weight:900;color:#3b82f6;margin-bottom:4px}
.result-rate{font-size:12px;color:#64748b}
.chart-container{height:80px;position:relative}
.chart-label{font-size:10px;color:#374151;margin-bottom:6px}
svg{width:100%;height:60px}
.quick-pairs{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px}
.pair-btn{padding:8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:10px;cursor:pointer;font-size:11px;font-weight:700;text-align:center;transition:all .2s;color:#94a3b8;font-family:'Inter',sans-serif}
.pair-btn:hover{background:rgba(59,130,246,.08);color:#3b82f6;border-color:rgba(59,130,246,.2)}
.rates-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:6px}
.rate-item{padding:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);border-radius:10px;display:flex;justify-content:space-between;align-items:center;font-size:12px}
.rate-val{font-weight:800;color:#10b981}
</style></head><body>
<div class="container">
  <h1>💱 Currency Converter</h1>
  <div class="quick-pairs" id="quick-pairs"></div>
  <div class="card">
    <div class="input-group">
      <div class="input-label">From</div>
      <div class="input-row">
        <input class="amount-input" id="amount" type="number" value="100" oninput="convert()"/>
        <select class="currency-sel" id="from" onchange="convert()"><option>Loading...</option></select>
      </div>
    </div>
    <button class="swap-btn" onclick="swapCurrencies()">⇅ Swap</button>
    <div class="input-group">
      <div class="input-label">To</div>
      <div class="input-row">
        <input class="amount-input" id="result-input" type="number" readonly style="cursor:default;color:#94a3b8"/>
        <select class="currency-sel" id="to" onchange="convert()"><option>Loading...</option></select>
      </div>
    </div>
  </div>
  <div class="result-box">
    <div class="result-amount" id="res-amount">--</div>
    <div class="result-rate" id="res-rate">Select currencies above</div>
  </div>
  <div class="card">
    <div class="chart-label" id="chart-label">Trend (simulated 30 days)</div>
    <svg id="trend-chart" viewBox="0 0 400 60"></svg>
  </div>
  <div class="card">
    <div style="font-size:11px;font-weight:700;color:#7a8fa8;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">Quick Rates (1 USD =)</div>
    <div class="rates-grid" id="rates-grid"></div>
  </div>
</div>
<script>
const CURRENCIES={USD:{s:'$',n:'US Dollar'},EUR:{s:'€',n:'Euro'},GBP:{s:'£',n:'British Pound'},JPY:{s:'¥',n:'Japanese Yen'},CAD:{s:'$',n:'Canadian Dollar'},AUD:{s:'$',n:'Australian Dollar'},CHF:{s:'₣',n:'Swiss Franc'},CNY:{s:'¥',n:'Chinese Yuan'},INR:{s:'₹',n:'Indian Rupee'},MXN:{s:'$',n:'Mexican Peso'},BRL:{s:'R$',n:'Brazilian Real'},KRW:{s:'₩',n:'South Korean Won'},SGD:{s:'$',n:'Singapore Dollar'},NOK:{s:'kr',n:'Norwegian Krone'},SEK:{s:'kr',n:'Swedish Krona'},DKK:{s:'kr',n:'Danish Krone'},PLN:{s:'zł',n:'Polish Zloty'},CZK:{s:'Kč',n:'Czech Koruna'},HUF:{s:'Ft',n:'Hungarian Forint'},RON:{s:'lei',n:'Romanian Leu'}};
const RATES={USD:1,EUR:0.92,GBP:0.79,JPY:149.5,CAD:1.36,AUD:1.53,CHF:0.90,CNY:7.24,INR:83.1,MXN:17.2,BRL:4.97,KRW:1325,SGD:1.34,NOK:10.58,SEK:10.42,DKK:6.89,PLN:4.02,CZK:23.1,HUF:357,RON:4.59};
const PAIRS=[['USD','EUR'],['EUR','GBP'],['USD','JPY'],['GBP','USD'],['USD','CAD'],['EUR','CHF']];

const fromSel=document.getElementById('from'),toSel=document.getElementById('to');
Object.entries(CURRENCIES).forEach(([code,{n}])=>{
  [fromSel,toSel].forEach(sel=>{const o=document.createElement('option');o.value=code;o.textContent=code+' — '+n;sel.appendChild(o);});
});
fromSel.value='USD';toSel.value='EUR';

document.getElementById('quick-pairs').innerHTML=PAIRS.map(([f,t])=>\`<button class="pair-btn" onclick="loadPair('\${f}','\${t}')">\${f}/\${t}</button>\`).join('');
function loadPair(f,t){fromSel.value=f;toSel.value=t;convert();}

function convert(){
  const amt=parseFloat(document.getElementById('amount').value)||0;
  const f=fromSel.value,t=toSel.value;
  const rate=(RATES[t]||1)/(RATES[f]||1);
  const result=amt*rate;
  document.getElementById('result-input').value=result.toFixed(t==='JPY'||t==='KRW'||t==='HUF'?0:2);
  document.getElementById('res-amount').textContent=\`\${CURRENCIES[t].s}\${result.toFixed(t==='JPY'||t==='KRW'?0:2)}\`;
  document.getElementById('res-rate').textContent=\`1 \${f} = \${rate.toFixed(4)} \${t}\`;
  document.getElementById('chart-label').textContent=\`\${f}→\${t} Trend (simulated 30 days)\`;
  drawChart(rate);
  const quickRates=[['EUR',RATES.EUR],['GBP',RATES.GBP],['JPY',RATES.JPY],['CAD',RATES.CAD],['AUD',RATES.AUD],['CHF',RATES.CHF],['CNY',RATES.CNY],['INR',RATES.INR]];
  document.getElementById('rates-grid').innerHTML=quickRates.map(([c,r])=>\`<div class="rate-item"><span>\${c}</span><span class="rate-val">\${CURRENCIES[c].s}\${r.toFixed(c==='JPY'?0:2)}</span></div>\`).join('');
}

function drawChart(baseRate){
  const svg=document.getElementById('trend-chart');
  const pts=Array.from({length:30},(_,i)=>baseRate*(1+(Math.sin(i*.4)+Math.random()*.1-.05)*.03));
  const min=Math.min(...pts),max=Math.max(...pts),range=max-min||.001;
  const coords=pts.map((v,i)=>[(i/29)*380+10,50-((v-min)/range)*44]);
  const path=coords.map((p,i)=>(i===0?'M':'L')+p.join(' ')).join(' ');
  const area=path+\` L\${coords[29][0]} 58 L10 58 Z\`;
  const trend=pts[pts.length-1]>pts[0];
  const color=trend?'#10b981':'#ef4444';
  svg.innerHTML=\`<defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="\${color}" stop-opacity=".3"/><stop offset="100%" stop-color="\${color}" stop-opacity="0"/></linearGradient></defs><path d="\${area}" fill="url(#cg)"/><path d="\${path}" fill="none" stroke="\${color}" stroke-width="2" stroke-linecap="round"/>\`;
}

function swapCurrencies(){const f=fromSel.value;fromSel.value=toSel.value;toSel.value=f;convert();}
convert();
</script></body></html>`},

];

// Merge into global APPS_DATA
if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_2);
}
