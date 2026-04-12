'use strict';
/* IA Architecte — Apps ULTRA Library | EN/FR */

window.APPS_ULTRA_DATA = [];

const APP_THEMES = [
  {id:'glass', en:'Glassmorphism', fr:'Effet Verre', bg:'#0f172a', cardbg:'rgba(255,255,255,0.05)', bord:'1px solid rgba(255,255,255,0.1)', text:'#f8fafc', accent:'#38bdf8', shadow:'0 8px 32px rgba(0,0,0,0.3)', rad:'16px', blur:'backdrop-filter:blur(12px);'},
  {id:'neo', en:'Neo-Brutalism', fr:'Néo-Brutalisme', bg:'#fef08a', cardbg:'#ffffff', bord:'4px solid #000', text:'#000000', accent:'#ef4444', shadow:'8px 8px 0px #000', rad:'0px', blur:''},
  {id:'cyber', en:'Cyberpunk', fr:'Cyberpunk', bg:'#0f0f0f', cardbg:'#1a1a1a', bord:'1px solid #fde047', text:'#fde047', accent:'#f43f5e', shadow:'0 0 15px #fde047', rad:'0px', blur:''},
  {id:'pastel', en:'Pastel Soft', fr:'Pastel Doux', bg:'#fdf4ff', cardbg:'#ffffff', bord:'none', text:'#701a75', accent:'#d946ef', shadow:'0 10px 25px rgba(217,70,239,0.15)', rad:'24px', blur:''},
  {id:'dark', en:'Deep Dark', fr:'Noir Profond', bg:'#000000', cardbg:'#111111', bord:'1px solid #333', text:'#e5e5e5', accent:'#10b981', shadow:'none', rad:'8px', blur:''},
  {id:'ios', en:'iOS Style', fr:'Style iOS', bg:'#f3f4f6', cardbg:'#ffffff', bord:'1px solid #e5e7eb', text:'#1f2937', accent:'#007aff', shadow:'0 4px 12px rgba(0,0,0,0.05)', rad:'14px', blur:''},
  {id:'material', en:'Material', fr:'Material', bg:'#eceff1', cardbg:'#ffffff', bord:'none', text:'#263238', accent:'#6200ea', shadow:'0 2px 5px rgba(0,0,0,0.2)', rad:'4px', blur:''},
  {id:'neon', en:'Neon Nights', fr:'Nuits Néon', bg:'#050505', cardbg:'#0a0a0a', bord:'1px solid #a855f7', text:'#a855f7', accent:'#0ea5e9', shadow:'0 0 20px #a855f7', rad:'10px', blur:''},
  {id:'highc', en:'High Contrast', fr:'Haut Contraste', bg:'#000000', cardbg:'#000', bord:'2px solid #fff', text:'#ffffff', accent:'#ffaa00', shadow:'none', rad:'0px', blur:''},
  {id:'forest', en:'Forest', fr:'Forêt', bg:'#111827', cardbg:'#064e3b', bord:'1px solid #047857', text:'#ecfdf5', accent:'#10b981', shadow:'0 10px 20px rgba(0,0,0,0.5)', rad:'12px', blur:''},
  {id:'ocean', en:'Deep Ocean', fr:'Océan Profond', bg:'#082f49', cardbg:'#0c4a6e', bord:'1px solid #0284c7', text:'#e0f2fe', accent:'#38bdf8', shadow:'0 8px 25px rgba(0,0,0,0.4)', rad:'20px', blur:''},
  {id:'sunset', en:'Sunset', fr:'Coucher de Soleil', bg:'#2e1065', cardbg:'#4c1d95', bord:'none', text:'#fff', accent:'#f97316', shadow:'0 5px 20px rgba(249,115,22,0.3)', rad:'16px', blur:''},
  {id:'retro', en:'Retro Web', fr:'Web Rétro', bg:'#008080', cardbg:'#c0c0c0', bord:'2px outset #fff', text:'#000', accent:'#000080', shadow:'none', rad:'0px', blur:''},
  {id:'hacker', en:'Terminal', fr:'Terminal', bg:'#000', cardbg:'#000', bord:'1px solid #22c55e', text:'#22c55e', accent:'#4ade80', shadow:'none', rad:'0px', blur:''},
  {id:'mono', en:'Monochrome', fr:'Monochrome', bg:'#ffffff', cardbg:'#f5f5f5', bord:'1px solid #ccc', text:'#000', accent:'#000', shadow:'none', rad:'4px', blur:''},
  {id:'autumn', en:'Autumn', fr:'Automne', bg:'#451a03', cardbg:'#78350f', bord:'1px solid #b45309', text:'#fef3c7', accent:'#f59e0b', shadow:'4px 4px 10px rgba(0,0,0,0.3)', rad:'8px', blur:''},
  {id:'luxury', en:'Luxury', fr:'Luxe', bg:'#171717', cardbg:'#262626', bord:'1px solid #d4af37', text:'#d4af37', accent:'#facc15', shadow:'0 0 15px rgba(212,175,55,0.2)', rad:'2px', blur:''},
  {id:'candy', en:'Candy', fr:'Bonbon', bg:'#fbcfe8', cardbg:'#fce7f3', bord:'2px dashed #db2777', text:'#831843', accent:'#ec4899', shadow:'0 4px 6px rgba(236,72,153,0.2)', rad:'30px', blur:''},
  {id:'space', en:'Galaxy', fr:'Galaxie', bg:'#020617', cardbg:'rgba(0,0,0,0.6)', bord:'1px solid #8b5cf6', text:'#ddd6fe', accent:'#c084fc', shadow:'0 0 30px rgba(139,92,246,0.3)', rad:'50px', blur:'backdrop-filter:blur(8px);'},
  {id:'minimal', en:'Absolute Minimal', fr:'Minimal Absolu', bg:'#fff', cardbg:'#fff', bord:'none', text:'#111', accent:'#555', shadow:'none', rad:'0px', blur:''}
];

const APP_ENGINES = [
  {
    type: 'Todo',
    ic: '✅',
    en: 'Task Manager', fr: 'Gestionnaire', desc_en: 'Add, cross off, and delete items.', desc_fr: 'Ajoutez, barrez et supprimez des éléments.',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;padding:50px;background:${t.bg};color:${t.text};font-family:sans-serif;display:flex;justify-content:center;}
.app{width:100%;max-width:400px;background:${t.cardbg};border:${t.bord};border-radius:${t.rad};box-shadow:${t.shadow};padding:30px;${t.blur}}
h2{margin-top:0;} input{width:calc(100% - 24px);padding:12px;margin-bottom:15px;background:transparent;border:1px solid ${t.accent};color:${t.text};border-radius:${t.rad};outline:none;font-size:16px;}
button{width:100%;padding:14px;background:${t.accent};color:${t.bg};border:none;border-radius:${t.rad};cursor:pointer;font-weight:bold;font-size:16px;margin-bottom:20px;}
.it{display:flex;justify-content:space-between;padding:12px;border-bottom:1px solid ${t.bord};font-size:16px;}
.del{color:#ef4444;cursor:pointer;font-weight:900;} .dn{text-decoration:line-through;opacity:0.5;}</style></head>
<body><div class="app"><h2>📋 ${t.en} List</h2><input type="text" id="inp" placeholder="New Item..."><button id="btn">Add Item</button><div id="ls"></div></div>
<script>
const inp=document.getElementById('inp'), ls=document.getElementById('ls');
document.getElementById('btn').onclick=()=>{
  if(!inp.value)return; 
  let d=document.createElement('div'), s=document.createElement('span'), x=document.createElement('span');
  d.className='it'; s.textContent=inp.value; s.style.cursor='pointer'; 
  s.onclick=()=>s.classList.toggle('dn');
  x.innerHTML='&times;'; x.className='del'; x.onclick=()=>d.remove();
  d.appendChild(s); d.appendChild(x); ls.appendChild(d); inp.value='';
};
</script></body></html>`
  },
  {
    type: 'Calc',
    ic: '🧮',
    en: 'Calculator', fr: 'Calculatrice', desc_en: 'Standard arithmetic calculations.', desc_fr: 'Calculs arithmétiques standards.',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;padding:50px;background:${t.bg};font-family:monospace;display:flex;justify-content:center;}
.app{width:320px;background:${t.cardbg};border:${t.bord};border-radius:${t.rad};box-shadow:${t.shadow};padding:25px;${t.blur}}
#res{width:calc(100% - 30px);padding:15px;text-align:right;font-size:36px;background:transparent;color:${t.text};border:1px solid ${t.accent};margin-bottom:20px;border-radius:${t.rad};outline:none;}
.gr{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;}
button{padding:20px;font-size:24px;background:rgba(255,255,255,0.05);color:${t.text};border:${t.bord};border-radius:${t.rad};cursor:pointer;transition:transform 0.1s;}
button:hover{background:${t.accent};color:${t.bg};} button:active{transform:scale(0.95);}</style></head>
<body><div class="app"><input id="res" readonly value="0"><div class="gr" id="gr"></div></div>
<script>
const res=document.getElementById('res'), b=['7','8','9','/','4','5','6','*','1','2','3','-','C','0','=','+'];
let c=''; b.forEach(x=>{ let btn=document.createElement('button'); btn.textContent=x;
btn.onclick=()=>{if(x==='C')c='';else if(x==='='){try{c=eval(c)+'';}catch(e){c='Err';}}else c+=x; res.value=c||'0';};
document.getElementById('gr').appendChild(btn); });
</script></body></html>`
  },
  {
    type: 'Track',
    ic: '📊',
    en: 'Tracker', fr: 'Compteur', desc_en: 'Count and track your progress.', desc_fr: 'Comptabilisez et suivez.',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;height:100vh;background:${t.bg};color:${t.text};font-family:sans-serif;display:flex;justify-content:center;align-items:center;}
.app{text-align:center;width:300px;background:${t.cardbg};border:${t.bord};border-radius:${t.rad};box-shadow:${t.shadow};padding:50px;${t.blur}}
#num{font-size:120px;font-weight:900;margin:20px 0;color:${t.accent};}
button{padding:20px 40px;font-size:36px;background:${t.accent};color:${t.bg};border:none;border-radius:${t.rad};cursor:pointer;margin:5px;transition:0.2s;}
button:active{transform:scale(0.9);} </style></head>
<body><div class="app"><h2>${t.en} Data</h2><div id="num">0</div>
<div style="display:flex;justify-content:center;gap:10px;">
  <button onclick="c(1)">+</button><button onclick="c(-1)" style="background:#ef4444;color:#fff;">-</button>
</div>
<div style="margin-top:30px;cursor:pointer;opacity:0.6;font-weight:bold;" onclick="n=0;c(0)">RESET COUNTER</div></div>
<script>let n=0; window.c=(v)=>{n+=v; document.getElementById('num').textContent=n;};</script></body></html>`
  },
  {
    type: 'Gen',
    ic: '🔑',
    en: 'Generator', fr: 'Générateur', desc_en: 'Generate random secure values.', desc_fr: 'Générer des valeurs aléatoires.',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;padding:50px;background:${t.bg};color:${t.text};font-family:sans-serif;display:flex;justify-content:center;align-items:center;}
.app{width:380px;background:${t.cardbg};border:${t.bord};border-radius:${t.rad};box-shadow:${t.shadow};padding:40px;text-align:center;${t.blur}}
#out{font-size:28px;word-break:break-all;padding:25px;background:rgba(0,0,0,0.1);border:1px solid ${t.accent};margin:30px 0;border-radius:${t.rad};font-family:monospace;letter-spacing:2px;}
button{width:100%;padding:18px;background:${t.accent};color:${t.bg};border:none;border-radius:${t.rad};font-size:20px;font-weight:900;cursor:pointer;transition:0.2s;}
button:active{transform:translateY(3px);}</style></head>
<body><div class="app"><h2>🔐 ${t.en} Auth</h2><div id="out">Press Generate</div><button id="btn">Generate Value</button></div>
<script>
document.getElementById('btn').onclick=()=>{
  let c='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+', r='';
  for(let i=0;i<16;i++) r+=c[Math.floor(Math.random()*c.length)];
  document.getElementById('out').textContent=r;
};</script></body></html>`
  },
  {
    type: 'Conv',
    ic: '⚖️',
    en: 'Celsius Form', fr: 'Celsius Conv.', desc_en: 'Convert Celsius to Fahrenheit.', desc_fr: 'Convertir de Celsius en Fahrenheit.',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;height:100vh;background:${t.bg};color:${t.text};font-family:sans-serif;display:flex;justify-content:center;align-items:center;}
.app{width:350px;background:${t.cardbg};border:${t.bord};border-radius:${t.rad};box-shadow:${t.shadow};padding:40px;text-align:center;${t.blur}}
input{width:calc(100% - 30px);padding:15px;font-size:28px;text-align:center;margin:15px 0 25px 0;background:transparent;border:2px solid ${t.accent};color:${t.text};border-radius:${t.rad};outline:none;font-weight:bold;}
p{font-size:18px;font-weight:bold;margin:0;opacity:0.8;text-transform:uppercase;letter-spacing:1px;}</style></head>
<body><div class="app"><h2>🌡 Temp Shift</h2>
<p>🔥 Celsius</p><input id="c" type="number" value="25">
<p>❄️ Fahrenheit</p><input id="f" type="number" value="77"></div>
<script>
const c=document.getElementById('c'), f=document.getElementById('f');
c.oninput=()=>f.value=((c.value*9/5)+32).toFixed(1);
f.oninput=()=>c.value=((f.value-32)*5/9).toFixed(1);
</script></body></html>`
  }
];

APP_THEMES.forEach((theme) => {
  APP_ENGINES.forEach((eng) => {
    window.APPS_ULTRA_DATA.push({
      icon: eng.ic,
      en: theme.en + ' ' + eng.en,
      fr: theme.fr + ' ' + eng.fr,
      desc_en: eng.desc_en,
      desc_fr: eng.desc_fr,
      code: eng.make(theme)
    });
  });
});

window.APPS_ULTRA_DATA = window.APPS_ULTRA_DATA.slice(0, 100);
