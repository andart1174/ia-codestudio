'use strict';
/* IA Architecte — Games PRO Library | EN/FR */

window.GAMES_PRO_DATA = [];

const THEMES = [
  {id:'space', en:'Space', fr:'Espace', p:'🚀', e:'☄️', g:'⭐', bg:'#020617', mEn:"Avoid meteors, collect stars!", mFr:"Évitez les météores, collectez les étoiles !"},
  {id:'ocean', en:'Ocean', fr:'Océan', p:'🐡', e:'🦈', g:'🦐', bg:'#1e3a8a', mEn:"Swim from sharks, eat shrimp!", mFr:"Fuyez les requins, mangez des crevettes!"},
  {id:'food', en:'Fast Food', fr:'Restauration', p:'🍔', e:'🥦', g:'🍟', bg:'#b45309', mEn:"Avoid broccoli, get fries!", mFr:"Évitez le brocoli, prenez les frites!"},
  {id:'spooky', en:'Halloween', fr:'Halloween', p:'🎃', e:'👻', g:'🍬', bg:'#1e1b4b', mEn:"Defeat ghosts, get candy.", mFr:"Battez les fantômes, prenez les bonbons."},
  {id:'zombie', en:'Apocalypse', fr:'Apocalypse', p:'🧟', e:'🧠', g:'🩸', bg:'#27272a', mEn:"Zombies vs Brains.", mFr:"Zombies vs Cerveaux."},
  {id:'racing', en:'Racing', fr:'Course', p:'🏎️', e:'🚧', g:'⛽', bg:'#374151', mEn:"Dodge barricades, get fuel.", mFr:"Évitez les barrières, prenez l'essence."},
  {id:'safari', en:'Safari', fr:'Safari', p:'🦁', e:'🐊', g:'🥩', bg:'#a16207', mEn:"King of the jungle.", mFr:"Le roi de la jungle."},
  {id:'magic', en:'Fantasy', fr:'Fantaisie', p:'🧙', e:'🐉', g:'🔮', bg:'#4c1d95', mEn:"Wizards and Dragons.", mFr:"Sorciers et Dragons."},
  {id:'frozen', en:'Winter', fr:'Hiver', p:'⛄', e:'🔥', g:'❄️', bg:'#0c4a6e', mEn:"Don't melt!", mFr:"Ne fondez pas !"},
  {id:'desert', en:'Desert', fr:'Désert', p:'🐪', e:'🦂', g:'💧', bg:'#b45309', mEn:"Survive the heat.", mFr:"Survivez à la chaleur."},
  {id:'ninja', en:'Ninja', fr:'Ninja', p:'🥷', e:'👹', g:'🗡️', bg:'#3f3f46', mEn:"Slice the demons.", mFr:"Tranchez les démons."},
  {id:'farm', en:'Farming', fr:'Ferme', p:'🚜', e:'🦊', g:'🌾', bg:'#3f6212', mEn:"Protect the crops.", mFr:"Protégez les récoltes."},
  {id:'city', en:'Urban', fr:'Urbain', p:'🚕', e:'🚔', g:'💰', bg:'#1f2937', mEn:"Outrun the cops.", mFr:"Semez la police."},
  {id:'hack', en:'Hacker', fr:'Hacker', p:'💻', e:'🐛', g:'💾', bg:'#022c22', mEn:"Fix the bugs.", mFr:"Réparez les bugs."},
  {id:'pirate', en:'Pirate', fr:'Pirate', p:'🏴‍☠️', e:'🐙', g:'🪙', bg:'#083344', mEn:"Plunder the seas.", mFr:"Pillez les mers."},
  {id:'sports', en:'Stadium', fr:'Stade', p:'🏀', e:'❌', g:'🏆', bg:'#14532d', mEn:"Go for the cup.", mFr:"Gagnez la coupe."},
  {id:'school', en:'Academy', fr:'Académie', p:'🎒', e:'📚', g:'🍎', bg:'#78350f', mEn:"Get the grades.", mFr:"Ayez de bonnes notes."},
  {id:'medic', en:'Hospital', fr:'Hôpital', p:'🩺', e:'🦠', g:'💊', bg:'#0f172a', mEn:"Cure the virus.", mFr:"Guérissez le virus."},
  {id:'build', en:'Builder', fr:'Constructeur', p:'🏗️', e:'🧱', g:'🔨', bg:'#713f12', mEn:"Build it high.", mFr:"Construisez haut."},
  {id:'music', en:'Concert', fr:'Concert', p:'🎸', e:'🤫', g:'🎵', bg:'#4a044e', mEn:"Keep the rhythm.", mFr:"Gardez le rythme."}
];

const ENGINES = [
  {
    type: 'Runner',
    ic: '🏃',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;overflow:hidden;background:${t.bg};color:#fff;font-family:sans-serif;}#c{display:block;margin:50px auto;border:2px solid #fff;background:rgba(0,0,0,0.5);}</style></head>
<body><h1 style="text-align:center">Score: <span id="sc">0</span> | Space or Click to Jump</h1><canvas id="c" width="800" height="300"></canvas>
<script>
const ctx=document.getElementById('c').getContext('2d'), sc=document.getElementById('sc');
let y=200, v=0, obs=[], s=0, f=0, alive=true;
document.onkeydown = (e) => { if(e.code==='Space' && y===200) v=-15; };
document.onclick = () => { document.getElementById('c').focus(); if(y===200) v=-15; };
setInterval(()=>{
  if(!alive)return;
  v+=1; y+=v; if(y>200){y=200;v=0;}
  if(f%80===0) obs.push({x:800, type:Math.random()>0.5?1:0});
  ctx.clearRect(0,0,800,300);
  ctx.font='50px sans-serif'; ctx.fillText('${t.p}', 100, y+40);
  for(let i=obs.length-1; i>=0; i--) {
    let o = obs[i]; o.x -= 7;
    ctx.fillText(o.type? '${t.e}':'${t.g}', o.x, 240);
    if(o.x<150 && o.x>50 && y>150) {
      if(o.type) { alive=false; ctx.fillStyle='red'; ctx.fillText('GAME OVER', 250, 150); }
      else { s+=10; sc.textContent=s; obs.splice(i,1); }
    } else if(o.x<-50) obs.splice(i,1);
  } f++;
}, 20);
</script></body></html>`
  },
  {
    type: 'Collector',
    ic: '🧺',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;overflow:hidden;background:${t.bg};color:#fff;font-family:sans-serif;}#c{cursor:none;width:100%;height:100vh;}</style></head>
<body><h1 style="position:absolute;margin:20px;">Score: <span id="sc">0</span></h1><canvas id="c"></canvas>
<script>
const cvs=document.getElementById('c'), ctx=cvs.getContext('2d'), sc=document.getElementById('sc');
cvs.width=window.innerWidth; cvs.height=window.innerHeight;
let items=[], s=0, px=cvs.width/2, alive=true;
cvs.onmousemove = e => px=e.clientX;
setInterval(()=>{
  if(!alive)return;
  if(Math.random()<0.06) items.push({x:Math.random()*(cvs.width-50), y:-50, bad:Math.random()>0.7});
  ctx.clearRect(0,0,cvs.width,cvs.height);
  ctx.font='60px sans-serif'; ctx.fillText('${t.p}', px-30, cvs.height-50);
  for(let i=items.length-1; i>=0; i--) {
    let it = items[i]; it.y+=6;
    ctx.fillText(it.bad?'${t.e}':'${t.g}', it.x, it.y);
    if(it.y>cvs.height-100 && Math.abs(it.x-(px-30))<50) {
      if(it.bad) { alive=false; ctx.fillStyle='red'; ctx.fillText('GAME OVER', cvs.width/2-150, cvs.height/2); }
      else { s++; sc.textContent=s; items.splice(i,1); }
    } else if(it.y>cvs.height) items.splice(i,1);
  }
}, 16);
</script></body></html>`
  },
  {
    type: 'Shooter',
    ic: '🔫',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;background:${t.bg};color:#fff;font-family:sans-serif;}#area{position:relative;width:600px;height:400px;background:rgba(0,0,0,0.5);margin:50px auto;overflow:hidden;}</style></head>
<body><h1 style="text-align:center;">Kills: <span id="sc">0</span> | Attack to Shoot</h1><div id="area"></div>
<script>
const a=document.getElementById('area'), sc=document.getElementById('sc');
let px=300, projs=[], ens=[], s=0, alive=true;
a.onmousemove = e => { px = e.offsetX; if(px<20)px=20; if(px>580)px=580; };
a.onclick = () => { if(alive) projs.push({x:px-10, y:350}); };
setInterval(()=>{
  if(!alive)return; 
  let html = '<div style="position:absolute;font-size:40px;left:'+(px-20)+'px;top:350px;pointer-events:none;">${t.p}</div>';
  if(Math.random()<0.04) ens.push({x:Math.random()*560, y:-40});
  for(let i=ens.length-1; i>=0; i--) {
    let e = ens[i]; e.y+=2.5;
    html += '<div style="position:absolute;font-size:30px;left:'+e.x+'px;top:'+e.y+'px;">${t.e}</div>';
    if(e.y>350) { alive=false; html += '<div style="position:absolute;color:red;font-size:60px;top:150px;left:100px;font-weight:bold;">GAME OVER</div>'; }
  }
  for(let i=projs.length-1; i>=0; i--) {
    let p = projs[i]; p.y-=10;
    html += '<div style="position:absolute;font-size:20px;left:'+p.x+'px;top:'+p.y+'px;">${t.g}</div>';
    if(p.y<0) { projs.splice(i,1); continue; }
    for(let j=ens.length-1; j>=0; j--) {
      if(Math.abs(p.x-ens[j].x)<40 && Math.abs(p.y-ens[j].y)<40) {
        projs.splice(i,1); ens.splice(j,1); s++; sc.textContent=s; break;
      }
    }
  }
  a.innerHTML = html;
}, 30);
</script></body></html>`
  },
  {
    type: 'Clicker',
    ic: '🖱️',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;background:${t.bg};color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;padding:50px;user-select:none;}
#btn{font-size:120px;background:none;border:none;cursor:pointer;transition:transform 0.1s;} #btn:active{transform:scale(0.9);}
.u{padding:15px;background:rgba(255,255,255,0.2);margin:10px;cursor:pointer;border-radius:10px;font-weight:bold;color:#fff;font-size:20px;border:2px solid transparent;}
.u:hover{border-color:#fff;}</style></head>
<body><h2>${t.en} Empire | Storage: <span id="sc">0</span> ${t.g}</h2><button id="btn">${t.p}</button>
<div class="u" onclick="buy(10,1)">+1 Per Click (Cost: <span id="c1">10</span> ${t.g})</div>
<div class="u" onclick="buyA(50,2)">Buy ${t.e} Upgrades (Cost: <span id="c2">50</span> ${t.g}) [+2/sec]</div>
<script>
let s=0, c=1, a=0, c1=10, c2=50; const sc=document.getElementById('sc');
document.getElementById('btn').onclick = () => { s+=c; sc.textContent=s; };
window.buy = (p,v) => { if(s>=c1){s-=c1; c+=v; c1=Math.floor(c1*1.5); document.getElementById('c1').textContent=c1; sc.textContent=s;} };
window.buyA = (p,v) => { if(s>=c2){s-=c2; a+=v; c2=Math.floor(c2*1.6); document.getElementById('c2').textContent=c2; sc.textContent=s;} };
setInterval(()=>{ s+=a; sc.textContent=s; }, 1000);
</script></body></html>`
  },
  {
    type: 'Memory',
    ic: '🧠',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;background:${t.bg};color:#fff;font-family:sans-serif;display:flex;flex-direction:column;align-items:center;padding:50px;}
#g{display:grid;grid-template-columns:repeat(4, 80px);gap:15px;} .c{width:80px;height:80px;background:rgba(255,255,255,0.1);display:flex;justify-content:center;align-items:center;font-size:50px;cursor:pointer;border-radius:10px;border:2px solid rgba(255,255,255,0.3);}
.h{color:transparent;}</style></head>
<body><h2>Matches: <span id="m">0</span>/8</h2><div id="g"></div>
<script>
const ems=['${t.p}','${t.e}','${t.g}','🔥','💎','🍀','🎈','⚡'];
const deck = [...ems,...ems].sort(()=>Math.random()-0.5);
const g = document.getElementById('g'); let op=[], m=0;
deck.forEach((e,i)=>{
  let d=document.createElement('div'); d.className='c h'; d.textContent=e;
  d.onclick = () => {
    if(op.length===2 || !d.classList.contains('h')) return;
    d.classList.remove('h'); op.push(d);
    if(op.length===2) {
      setTimeout(()=>{
        if(op[0].textContent===op[1].textContent) { m++; document.getElementById('m').textContent=m; if(m===8) document.getElementById('g').innerHTML = '<h1 style="color:#10b981;font-size:40px;text-align:center;width:340px;">Victory!</h1>'; }
        else { op[0].classList.add('h'); op[1].classList.add('h'); }
        op=[];
      }, 700);
    }
  }; g.appendChild(d);
});
</script></body></html>`
  },
  {
    type: 'Slicer',
    ic: '🗡️',
    make: (t) => `<!DOCTYPE html><html><head><style>body{margin:0;background:${t.bg};color:#fff;font-family:sans-serif;overflow:hidden;}#c{cursor:crosshair;}</style></head>
<body><h2 style="position:absolute;margin:20px;pointer-events:none;">Score: <span id="sc">0</span></h2><canvas id="c"></canvas>
<script>
const cvs=document.getElementById('c'), ctx=cvs.getContext('2d'); cvs.width=window.innerWidth; cvs.height=window.innerHeight;
let figs=[], tr=[], s=0, mx, my, alive=true;
cvs.onmousedown = () => tr=[]; cvs.onmousemove = e => { if(e.buttons>0) tr.push({x:e.clientX, y:e.clientY}); mx=e.clientX; my=e.clientY; };
setInterval(()=>{
  if(!alive)return;
  if(Math.random()<0.08) figs.push({x:Math.random()*(cvs.width-100), y:cvs.height, vx:(Math.random()-0.5)*10, vy:-22, bad:Math.random()>0.8});
  ctx.clearRect(0,0,cvs.width,cvs.height);
  for(let i=figs.length-1; i>=0; i--) {
    let f=figs[i]; f.x+=f.vx; f.y+=f.vy; f.vy+=0.6;
    ctx.font='60px sans-serif'; ctx.fillText(f.bad?'${t.e}':'${t.g}', f.x, f.y);
    if(tr.length>2 && Math.abs(f.x-mx)<60 && Math.abs(f.y-my)<60) {
      if(f.bad) { alive=false; ctx.fillStyle='red'; ctx.fillText('GAME OVER', cvs.width/2-150, cvs.height/2); }
      else { s++; document.getElementById('sc').textContent=s; figs.splice(i,1); }
    } else if(f.y>cvs.height+100) figs.splice(i,1);
  }
  if(tr.length>0) { ctx.strokeStyle='#ef4444'; ctx.lineWidth=6; ctx.beginPath(); ctx.moveTo(tr[0].x,tr[0].y); tr.forEach(p=>ctx.lineTo(p.x,p.y)); ctx.stroke(); if(tr.length>12)tr.shift(); }
}, 20);
</script></body></html>`
  }
];

THEMES.forEach((theme) => {
  ENGINES.forEach((eng) => {
    window.GAMES_PRO_DATA.push({
      icon: eng.ic,
      en: theme.en + ' ' + eng.type,
      fr: theme.fr + ' ' + eng.type,
      desc_en: theme.mEn,
      desc_fr: theme.mFr,
      code: eng.make(theme)
    });
  });
});

// Trim exactly to 100 for the promised "100 games"
window.GAMES_PRO_DATA = window.GAMES_PRO_DATA.slice(0, 100);
