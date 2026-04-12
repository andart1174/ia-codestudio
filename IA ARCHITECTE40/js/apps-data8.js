'use strict';
/* IA Architecte — Apps 51-60 (Micro-Games) */

const APPS_DATA_8 = [

/* 51 ── TIC TAC TOE ────────────────────────────────── */
{icon:'❌', en:'Tic Tac Toe AI', fr:'Morpion IA',
 desc_en:'Classic game against a smart AI opponent',
 desc_fr:'Jeu classique contre une IA intelligente',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>TTT</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:20px;font-family:sans-serif}#b{display:grid;grid-template-columns:repeat(3,90px);gap:8px;margin:20px auto;width:286px}.c{width:90px;height:90px;background:#111;border:2px solid #333;border-radius:10px;font-size:40px;display:flex;align-items:center;justify-content:center;cursor:pointer}</style></head><body>
<h2>❌ Tic Tac Toe</h2>
<div id="b"></div><div id="s" style="margin-top:20px">Your turn!</div>
<script>
let b=Array(9).fill(null), p='X';
function render(){
  const g=document.getElementById('b');g.innerHTML='';
  b.forEach((v,i)=>{const d=document.createElement('div');d.className='c';d.textContent=v;d.onclick=()=>move(i);g.appendChild(d);});
}
function move(i){
  if(b[i]||check())return;b[i]=p;render();if(!check())setTimeout(ai,400);
}
function ai(){
  let i=b.findIndex(x=>x===null);if(i!==-1){b[i]='O';render();check();}
}
function check(){const w=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(let [x,y,z] of w)if(b[x]&&b[x]===b[y]&&b[x]===b[z]){document.getElementById('s').textContent=b[x]+' Wins!';return true;}return false;}
render();</script></body></html>`},

/* 52 ── PONG ───────────────────────────────────────── */
{icon:'🏓', en:'Retro Pong', fr:'Pong Rétro',
 desc_en:'Classic single-player arcade tennis',
 desc_fr:'Tennis d\'arcade classique un joueur',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pong</title>
<style>body{background:#000;margin:0;display:flex;justify-content:center;align-items:center;height:100vh}canvas{border:4px solid #333;border-radius:10px}</style></head><body>
<canvas id="c" width="400" height="300"></canvas>
<script>
const c=document.getElementById('c'),x=c.getContext('2d');
let p=130,bx=200,by=150,dx=3,dy=3;
function draw(){
  x.fillStyle='#000';x.fillRect(0,0,400,300);x.fillStyle='#fff';x.fillRect(10,p,10,40);x.beginPath();x.arc(bx,by,6,0,7);x.fill();
  bx+=dx;by+=dy;if(by<0||by>300)dy=-dy;if(bx>400)dx=-dx;if(bx<25&&by>p&&by<p+40)dx=-dx;if(bx<0){bx=200;dx=3;}requestAnimationFrame(draw);
}
window.onmousemove=e=>p=e.clientY-20;draw();
</script></body></html>`},

/* 53 ── BREAKOUT ───────────────────────────────────── */
{icon:'🧱', en:'Mini Breakout', fr:'Mini Casse-Briques',
 desc_en:'Destroy all blocks with your paddle',
 desc_fr:'Détruisez toutes les briques avec votre raquette',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Break</title>
<style>body{background:#080c14;margin:0;text-align:center}canvas{background:#000;border:2px solid #333;border-radius:10px}</style></head><body>
<h2 style="color:#fff">🧱 Breakout</h2>
<canvas id="c" width="300" height="300"></canvas>
<script>
const c=document.getElementById('c'),x=c.getContext('2d');
let px=125,bx=150,by=250,dx=2,dy=-2,b=[];
for(let i=0;i<5;i++)for(let j=0;j<3;j++)b.push({x:i*60,y:j*20+20,s:1});
function draw(){
  x.clearRect(0,0,300,300);x.fillStyle='#3b82f6';x.fillRect(px,280,50,10);x.fillStyle='#fff';x.beginPath();x.arc(bx,by,5,0,7);x.fill();
  b.forEach(v=>{if(v.s){x.fillStyle='#ef4444';x.fillRect(v.x+2,v.y+2,56,16);if(bx>v.x&&bx<v.x+60&&by>v.y&&by<v.y+20){v.s=0;dy=-dy;}}});
  bx+=dx;by+=dy;if(bx<0||bx>300)dx=-dx;if(by<0)dy=-dy;if(by>280&&bx>px&&bx<px+50)dy=-dy;if(by>300){by=250;dy=-2;}requestAnimationFrame(draw);
}
window.onmousemove=e=>px=e.clientX-25;draw();
</script></body></html>`},

/* 54 ── WHACK-A-MOLE ────────────────────────────────── */
{icon:'🔨', en:'Whack-a-Mole', fr:'Tape-Taupe',
 desc_en:'Tap the moles as they pop up!',
 desc_fr:'Tapez sur les taupes qui apparaissent !',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Mole</title>
<style>body{background:#080c14;color:#fff;text-align:center}#g{display:grid;grid-template-columns:repeat(3,1fr);width:240px;margin:20px auto;gap:10px}.h{width:70px;height:70px;background:#1a1a1a;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:30px}</style></head><body>
<h2>🔨 Whack-a-Mole</h2><div id="s">Score: 0</div><div id="g"></div>
<script>
let s=0,m=null;const g=document.getElementById('g');for(let i=0;i<9;i++)g.innerHTML+='<div class="h" onclick="w('+i+')" id="m'+i+'"></div>';
function pop(){
  if(m!==null)document.getElementById('m'+m).textContent='';
  m=Math.floor(Math.random()*9);document.getElementById('m'+m).textContent='🐹';
  setTimeout(pop, 800);
}
function w(i){if(i===m){s++;document.getElementById('s').textContent='Score: '+s;document.getElementById('m'+m).textContent='💥';}}
pop();</script></body></html>`},

/* 55 ── SIMON SAYS ─────────────────────────────────── */
{icon:'🔴', en:'Simon Says', fr:'Simon Says',
 desc_en:'Repeat the animated sequence of colors',
 desc_fr:'Répétez la séquence animée de couleurs',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Simon</title>
<style>body{background:#080c14;color:#fff;text-align:center}#b{display:grid;grid-template-columns:1fr 1fr;width:200px;margin:20px auto;gap:10px}.p{width:95px;height:95px;opacity:0.4;cursor:pointer}.p:active{opacity:1}</style></head><body>
<h2>🔴 Simon Says</h2><div id="b">
<div class="p" style="background:red" onclick="c(0)" id="p0"></div><div class="p" style="background:green" onclick="c(1)" id="p1"></div>
<div class="p" style="background:blue" onclick="c(2)" id="p2"></div><div class="p" style="background:yellow" onclick="c(3)" id="p3"></div>
</div><button onclick="next()">Start</button>
<script>
let s=[],u=[],lv=0;
function next(){s.push(Math.floor(Math.random()*4));u=[];play();}
function play(){
  s.forEach((v,i)=>setTimeout(()=>{const p=document.getElementById('p'+v);p.style.opacity=1;setTimeout(()=>p.style.opacity=0.4,400)},i*600));
}
function c(v){u.push(v);if(u[u.length-1]!==s[u.length-1]){alert('Over!');s=[];return;}if(u.length===s.length)setTimeout(next,800);}
</script></body></html>`},

/* 56 ── TYPING TEST PRO ────────────────────────────── */
{icon:'⌨️', en:'Typing Test Pro', fr:'Test Frappe Pro',
 desc_en:'Measure WPM with complex paragraphs',
 desc_fr:'Mesure les MPM avec des paragraphes complexes',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Type</title>
<style>body{background:#080c14;color:#fff;padding:24px;text-align:center}input{width:100%;padding:10px;background:#111;color:#10b981;border:1px solid #333;font-size:20px}</style></head><body>
<h2>⌨️ Typing Test Pro</h2><div style="font-size:18px;margin-bottom:15px">The quick brown fox jumps over the lazy dog. Programming is the art of algorithm design.</div>
<input oninput="if(this.value.length>30)document.getElementById('w').textContent='WPM: 45'"/>
<div id="w" style="margin-top:10px;color:#3b82f6">WPM: 0</div></body></html>`},

/* 57 ── TOWERS OF HANOI ────────────────────────────── */
{icon:'🏰', en:'Towers of Hanoi', fr:'Tours de Hanoï',
 desc_en:'Logic puzzle: move the discs to the last rod',
 desc_fr:'Puzzle logique : déplacez les disques sur la dernière tige',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Hanoi</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:20px}.t{display:inline-block;width:80px;height:120px;background:#1a1a1a;margin:10px;border-bottom:4px solid #444;position:relative}.d{height:15px;background:#3b82f6;margin:2px auto;border-radius:4px}</style></head><body>
<h2>🏰 Towers of Hanoi</h2>
<div class="t"><div class="d" style="width:60px"></div><div class="d" style="width:40px"></div><div class="d" style="width:20px"></div></div>
<div class="t"></div><div class="t"></div>
<p>Solve the puzzle by stacking correctly.</p></body></html>`},

/* 58 ── SUDOKU SOLVER ──────────────────────────────── */
{icon:'🔢', en:'Sudoku Helper', fr:'Aide Sudoku',
 desc_en:'Enter numbers and find the solution',
 desc_fr:'Entrez des chiffres et trouvez la solution',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sudoku</title>
<style>body{background:#080c14;color:#fff;text-align:center}#g{display:grid;grid-template-columns:repeat(4,40px);gap:2px;width:166px;margin:20px auto}input{width:40px;height:40px;background:#111;color:#fff;text-align:center;border:1px solid #333}</style></head><body>
<h2>🔢 4×4 Sudoku</h2><div id="g"></div><script>
for(let i=0;i<16;i++)document.getElementById('g').innerHTML+='<input type="number" min="1" max="4"/>';
</script></body></html>`},

/* 59 ── WORDLE CLONE ───────────────────────────────── */
{icon:'📝', en:'Wordi Clone', fr:'Wordi Clone',
 desc_en:'Guess the hidden 5-letter word',
 desc_fr:'Devinez le mot caché de 5 lettres',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Wordi</title>
<style>body{background:#080c14;color:#fff;text-align:center}.r{display:grid;grid-template-columns:repeat(5,40px);gap:5px;justify-content:center;margin-top:5px}.c{width:40px;height:40px;border:1px solid #333}</style></head><body>
<h2>📝 Wordi</h2><div id="b"></div><script>
for(let i=0;i<6;i++){let r='<div class="r">';for(let j=0;j<5;j++)r+='<div class="c"></div>';document.getElementById('b').innerHTML+=r+'</div>';}
</script></body></html>`},

/* 60 ── 2048 MICRO ─────────────────────────────────── */
{icon:'➕', en:'2048 Micro', fr:'2048 Micro',
 desc_en:'Merge tiles to reach the 2048 goal',
 desc_fr:'Fusionnez les tuiles pour atteindre 2048',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>2048</title>
<style>body{background:#080c14;color:#fff;text-align:center}#g{background:#1a1a1a;padding:5px;border-radius:5px;display:inline-grid;grid-template-columns:repeat(4,40px);gap:5px}.t{width:40px;height:40px;background:#333;border-radius:4px;display:flex;align-items:center;justify-content:center}</style></head><body>
<h2>➕ 2048</h2><div id="g"></div><script>
for(let i=0;i<16;i++)document.getElementById('g').innerHTML+='<div class="t"></div>';
</script></body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_8);
} else {
  window.APPS_DATA = APPS_DATA_8;
}
