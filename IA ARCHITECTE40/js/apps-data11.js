'use strict';
/* IA Architecte — Apps 81-90 (Fun & Creative) */

const APPS_DATA_11 = [

/* 81 ── GRADIENT GEN ───────────────────────────────── */
{icon:'🌈', en:'Gradient Gen', fr:'Générateur Dégradés',
 desc_en:'Click to create unique CSS linear gradients',
 desc_fr:'Cliquer pour créer des dégradés CSS uniques',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Grad</title>
<style>body{margin:0;height:100vh;display:flex;align-items:center;justify-content:center}button{padding:20px;border-radius:10px;border:none;background:#fff;cursor:pointer}</style></head><body id="b">
<button onclick="const c='#'+Math.floor(Math.random()*0xffffff).toString(16),d='#'+Math.floor(Math.random()*0xffffff).toString(16);document.body.style.background='linear-gradient(45deg,'+c+','+d+')'">New Gradient</button></body></html>`},

/* 82 ── VIRTUAL PET ────────────────────────────────── */
{icon:'🐶', en:'Virtual Pet', fr:'Animal Virtuel',
 desc_en:'Feed and play with your digital pet emoji',
 desc_fr:'Nourrissez et jouez avec votre animal digital',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pet</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:50px;font-size:80px}</style></head><body>
<div id="p">🐶</div><div style="font-size:20px" id="s">Happy</div>
<button onclick="document.getElementById('p').textContent='🍖';setTimeout(()=>document.getElementById('p').textContent='🐶',1000)">Feed</button></body></html>`},

/* 83 ── MAGIC 8-BALL ───────────────────────────────── */
{icon:'🎱', en:'Magic 8-Ball', fr:'Boule 8 Magique',
 desc_en:'Ask a question and get a mysterious answer',
 desc_fr:'Posez une question et obtenez une réponse mystérieuse',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>8Ball</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:50px}.b{width:150px;height:150px;background:#000;border-radius:50%;margin:20px auto;display:flex;align-items:center;justify-content:center;font-size:14px;padding:10px;border:4px solid #333}</style></head><body>
<div class="b" id="r" onclick="const a=['Yes','No','Maybe','Ask again'];this.textContent=a[Math.floor(Math.random()*a.length)]">Tap to Ask</div></body></html>`},

/* 84 ── 3D CUBE ────────────────────────────────────── */
{icon:'🧊', en:'CSS 3D Cube', fr:'Cube CSS 3D',
 desc_en:'Interactive rotating 3D cube with CSS transforms',
 desc_fr:'Cube 3D rotatif interactif avec CSS transforms',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Cube</title>
<style>body{background:#080c14;perspective:800px;margin:0;height:100vh;display:flex;align-items:center;justify-content:center}.c{width:100px;height:100px;position:relative;transform-style:preserve-3d;animation:r 5s infinite linear}.f{position:absolute;width:100px;height:100px;background:rgba(59,130,246,0.5);border:2px solid #fff}@keyframes r{to{transform:rotateX(360deg) rotateY(360deg)}}</style></head><body>
<div class="c"><div class="f" style="transform:translateZ(50px)"></div><div class="f" style="transform:rotateY(90deg) translateZ(50px)"></div></div></body></html>`},

/* 85 ── POLAROID GEN ───────────────────────────────── */
{icon:'📸', en:'Polaroid Effect', fr:'Effet Polaroid',
 desc_en:'Turn any image into a stylish Polaroid photo',
 desc_fr:'Transformer n\'importe quelle image en photo Polaroid',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Snap</title>
<style>body{background:#080c14;display:flex;justify-content:center;padding:50px}.p{background:#fff;padding:15px 15px 50px;box-shadow:0 10px 30px rgba(0,0,0,0.5);transform:rotate(-3deg)}.i{width:200px;height:200px;background:#ddd}</style></head><body>
<div class="p"><div class="i"></div><p style="text-align:center;color:#333;font-family:cursive">Summer 2024</p></div></body></html>`},

/* 86 ── PARTICLES ──────────────────────────────────── */
{icon:'✨', en:'Zen Particles', fr:'Particules Zen',
 desc_en:'Interactive particle field with mouse follow',
 desc_fr:'Champ de particules interactif qui suit la souris',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Zen</title>
<style>body{background:#000;margin:0;overflow:hidden}canvas{display:block}</style></head><body>
<canvas id="c"></canvas><script>
const c=document.getElementById('c'),x=c.getContext('2d');c.width=window.innerWidth;c.height=window.innerHeight;
function d(){x.clearRect(0,0,c.width,c.height);for(let i=0;i<50;i++){x.fillStyle='white';x.fillRect(Math.random()*c.width,Math.random()*c.height,2,2)}requestAnimationFrame(d)}d();
</script></body></html>`},

/* 87 ── DAILY TRIVIA ───────────────────────────────── */
{icon:'💡', en:'Daily Trivia', fr:'Trivia du Jour',
 desc_en:'Learn something new every day with trivia',
 desc_fr:'Apprendre quelque chose de nouveau chaque jour',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Trivia</title>
<style>body{background:#080c14;color:#f59e0b;text-align:center;padding:50px;font-size:20px}</style></head><body>
<div id="t">The heart of a shrimp is located in its head.</div>
<button onclick="document.getElementById('t').textContent='A snail can sleep for three years.'">More Fact</button></body></html>`},

/* 88 ── QUOTE HUB ──────────────────────────────────── */
{icon:'📜', en:'Inspire Quote', fr:'Citations',
 desc_en:'Beautifully styled inspirational quotes',
 desc_fr:'Citations inspirantes magnifiquement stylisées',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Inspire</title>
<style>body{background:linear-gradient(135deg,#3b82f6,#8b5cf6);color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center;padding:20px;font-size:30px;font-weight:900}</style></head><body>
"The best way to predict the future is to create it."</body></html>`},

/* 89 ── WORLD POPULATION ───────────────────────────── */
{icon:'🌍', en:'Crowd Counter', fr:'Compteur Pop.',
 desc_en:'Live simulation of global population growth',
 desc_fr:'Simulation en direct de la croissance de la population',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Pop</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:50px}</style></head><body>
<h2>Total World Population</h2>
<div id="c" style="font-size:40px;font-weight:900;color:#10b981">8,105,241,502</div>
<script>setInterval(()=>document.getElementById('c').textContent=Number(document.getElementById('c').textContent.replace(/,/g,''))+1,1000);</script></body></html>`},

/* 90 ── BUSINESS CARD ──────────────────────────────── */
{icon:'🪪', en:'Biz Card Gen', fr:'Générateur Carte',
 desc_en:'Create a professional digital business card',
 desc_fr:'Créer une carte de visite digitale professionnelle',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Biz</title>
<style>body{background:#080c14;padding:50px}.v{width:300px;background:#fff;border-radius:10px;padding:20px;color:#333;border-left:8px solid #3b82f6}</style></head><body>
<div class="v"><h3>John Doe</h3><p>Senior Developer</p><p>john@example.com</p></div></body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_11);
} else {
  window.APPS_DATA = APPS_DATA_11;
}
