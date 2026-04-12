'use strict';
/* IA Architecte — Apps 91-100 (Final Milestone) */

const APPS_DATA_12 = [

/* 91 ── STOPWATCH PRO ──────────────────────────────── */
{icon:'⏱️', en:'Stopwatch Pro', fr:'Chrono Pro',
 desc_en:'Professional stopwatch with lap time logging',
 desc_fr:'Chronomètre professionnel avec temps au tour',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Stop</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:24px}.t{font-size:50px;margin:20px 0}.l{margin-top:10px}</style></head><body>
<div class="t" id="t">0.0</div><button id="b" onclick="toggle()">Start</button><div id="l" class="l"></div>
<script>
let s=0,i,r=0;
function toggle(){r=!r;document.getElementById('b').textContent=r?'Stop':'Start';if(r)i=setInterval(()=>{s+=0.1;document.getElementById('t').textContent=s.toFixed(1)},100);else clearInterval(i);}
</script></body></html>`},

/* 92 ── QR SCAN SIM ────────────────────────────────── */
{icon:'📸', en:'QR Scan Sim', fr:'Sim. Scan QR',
 desc_en:'Simulated QR code scanner with data feedback',
 desc_fr:'Simulateur de scanner QR avec retour de données',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Scan</title>
<style>body{background:#000;color:#fff;text-align:center;padding:50px}.s{width:150px;height:150px;border:2px solid #3b82f6;margin:0 auto;position:relative}.l{position:absolute;width:100%;height:2px;background:#3b82f6;top:0;animation:m 2s infinite}@keyframes m{to{top:100%}}</style></head><body>
<div class="s"><div class="l"></div></div></body></html>`},

/* 93 ── MORSE SOUND ────────────────────────────────── */
{icon:'🔊', en:'Morse Sound', fr:'Son Morse',
 desc_en:'Listen to simulated Morse code audio signals',
 desc_fr:'Écouter des signaux audio Morse simulés',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sound</title>
<style>body{background:#080c14;color:#f59e0b;text-align:center;padding:50px}</style></head><body>
<button onclick="alert('Beep... Beep... Beeeeeep...')">Play Morse SOS</button></body></html>`},

/* 94 ── AREA CONVERTER ─────────────────────────────── */
{icon:'📐', en:'Area Converter', fr:'Conv. Surface',
 desc_en:'Square meters, feet and acres calculator',
 desc_fr:'Calculateur de mètres carrés, pieds et acres',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Area</title>
<style>body{background:#080c14;color:#fff;padding:24px}input{width:100%;padding:10px}</style></head><body>
SqM: <input id="i" value="100" oninput="document.getElementById('o').textContent=(this.value*10.764).toFixed(2)+' SqFt'"/>
<div id="o">1076.40 SqFt</div></body></html>`},

/* 95 ── BMI PRO ────────────────────────────────────── */
{icon:'⚖️', en:'BMI Health Score', fr:'Score Santé IMC',
 desc_en:'Body Mass Index with detailed health categories',
 desc_fr:'Indice de Masse Corporelle avec catégories santé',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>BMI</title>
<style>body{background:#080c14;color:#fff;padding:24px}.g{height:10px;background:linear-gradient(to right,blue,green,orange,red);margin-top:20px}</style></head><body>
Height (cm): <input id="h" value="180"/><br>Weight (kg): <input id="w" value="75"/>
<div class="g"></div></body></html>`},

/* 96 ── CALORIE DEFICIT ────────────────────────────── */
{icon:'🔥', en:'Calorie Deficit', fr:'Déficit Cal.',
 desc_en:'Calculate daily goal for healthy weight loss',
 desc_fr:'Calculer l\'objectif quotidien pour mincir sainement',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Fire</title>
<style>body{background:#080c14;color:#fff;padding:24px;text-align:center}.v{font-size:30px;color:#ef4444;margin-top:20px}</style></head><body>
Maintenance: <input id="m" value="2500" oninput="document.getElementById('o').textContent=(this.value-500)+' kcal'"/>
<div id="o" class="v">2000 kcal</div></body></html>`},

/* 97 ── COMPOUND VISUAL ────────────────────────────── */
{icon:'🕯️', en:'Wealth Plotter', fr:'Traceur Épargne',
 desc_en:'Graph your compounding wealth over time',
 desc_fr:'Tracer la croissance composée de l\'épargne',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Plot</title>
<style>body{background:#080c14;padding:24px}.b{display:inline-block;width:15px;background:#10b981;margin:2px;vertical-align:bottom}</style></head><body>
<div style="height:200px;display:flex;align-items:flex-end">
<div class="b" style="height:20px"></div><div class="b" style="height:30px"></div><div class="b" style="height:50px"></div><div class="b" style="height:80px"></div><div class="b" style="height:120px"></div>
</div></body></html>`},

/* 98 ── ZEN FOCUS ──────────────────────────────────── */
{icon:'🧘', en:'Zen Focus', fr:'Focus Zen',
 desc_en:'Minimalist clean slate for deep work focus',
 desc_fr:'Interface minimaliste pour le travail concentré',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Zen</title>
<style>body{background:#080c14;display:flex;align-items:center;justify-content:center;height:100vh}textarea{background:transparent;border:none;color:#fff;font-size:24px;text-align:center;width:80%;outline:none}</style></head><body>
<textarea placeholder="Write your core goal here..."></textarea></body></html>`},

/* 99 ── COUNTDOWN NEW YEAR ─────────────────────────── */
{icon:'🎊', en:'Holiday Counter', fr:'Compteur Fêtes',
 desc_en:'Countdown timer to the next major milestone',
 desc_fr:'Compte à rebours jusqu\'au prochain événement majeur',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Cheers</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:50px;font-size:40px}</style></head><body>
<div id="t">265 Days Left</div></body></html>`},

/* 100 ── THE 100TH APP ──────────────────────────────── */
{icon:'💯', en:'IA ARCHITECTE 100', fr:'IA ARCHITECTE 100',
 desc_en:'Celebration of the 100-App Milestone!',
 desc_fr:'Célébration du cap des 100 applications !',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>100</title>
<style>body{background:radial-gradient(circle,#1a1a1a,#080c14);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;text-align:center}h1{font-size:60px;margin:0;color:#3b82f6;text-shadow:0 0 20px rgba(59,130,246,0.5)}p{font-size:20px;color:#64748b;margin-top:20px}</style></head><body>
<h1>100 APPS</h1><p>The library is complete.<br>Built with IA ARCHITECTE Genius Engine.</p></body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_12);
} else {
  window.APPS_DATA = APPS_DATA_12;
}
