'use strict';
/* IA Architecte — Apps 71-80 (Health & Finance) */

const APPS_DATA_10 = [

/* 71 ── COMPOUND INTEREST ──────────────────────────── */
{icon:'🏦', en:'Compound Calc', fr:'Intérêts Composés',
 desc_en:'Calculate long-term wealth growth with interest',
 desc_fr:'Calculer la croissance de la richesse à long terme',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Interest</title>
<style>body{background:#080c14;color:#fff;padding:24px}input{width:100%;margin:10px 0;padding:10px}</style></head><body>
<h2>🏦 Compound Interest</h2>
Principal: <input id="p" value="1000"/>
Rate %: <input id="r" value="7"/>
Years: <input id="y" value="10"/>
<h3 id="o">Result: $1967</h3>
<script>
function c(){const p=+document.getElementById('p').value,r=+document.getElementById('r').value/100,y=+document.getElementById('y').value;document.getElementById('o').textContent='Result: $'+(p*Math.pow(1+r,y)).toFixed(0);}
document.querySelectorAll('input').forEach(i=>i.oninput=c);
</script></body></html>`},

/* 72 ── SAVINGS GOAL ───────────────────────────────── */
{icon:'🐷', en:'Savings Goal', fr:'Objectif Épargne',
 desc_en:'Track progress towards your next big purchase',
 desc_fr:'Suivre les progrès vers votre prochain achat',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Save</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:24px}.b{width:100%;height:30px;background:#333;border-radius:15px;overflow:hidden}.f{height:100%;background:#10b981;transition:width 0.3s}</style></head><body>
<h2>🐷 Savings Tracker</h2>
Goal: $5000 / Saved: $1200
<div class="b"><div class="f" style="width:24%"></div></div></body></html>`},

/* 73 ── EXPENSE LOG ────────────────────────────────── */
{icon:'🧾', en:'Mini Expense Log', fr:'Petit Log Dépenses',
 desc_en:'Daily spending tracker with categories',
 desc_fr:'Suivi des dépenses quotidiennes par catégories',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Expenses</title>
<style>body{background:#080c14;color:#fff;padding:24px}li{background:#1a1a1a;margin:5px;padding:10px;border-radius:5px}</style></head><body>
<h2>🧾 Expenses</h2>
<ul><li>Coffee - $4.50</li><li>Lunch - $12.00</li></ul>
Total: $16.50</body></html>`},

/* 74 ── VAT / TAX CALC ─────────────────────────────── */
{icon:'⚖️', en:'VAT Calculator', fr:'Calculateur TVA',
 desc_en:'Add or remove tax from any price',
 desc_fr:'Ajouter ou retirer la taxe de n\'importe quel prix',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Tax</title>
<style>body{background:#080c14;color:#fff;padding:24px}input{width:100%;padding:10px}</style></head><body>
<h2>⚖️ Tax Calculator</h2>
Net Price: <input id="n" value="100"/>
Tax Rate %: <input id="t" value="20"/>
<h3 id="o">Gross: $120.00</h3>
<script>
document.querySelectorAll('input').forEach(i=>i.oninput=function(){const n=+document.getElementById('n').value,t=+document.getElementById('t').value;document.getElementById('o').textContent='Gross: $'+(n*(1+t/100)).toFixed(2)});
</script></body></html>`},

/* 75 ── LIQUID INTAKE CHART ────────────────────────── */
{icon:'📈', en:'Liquid Chart', fr:'Graphique Liquide',
 desc_en:'Visualize your weekly hydration trend',
 desc_fr:'Visualiser votre tendance hebdomadaire d\'hydratation',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Chart</title>
<style>body{background:#080c14;padding:24px}.b{display:inline-block;width:30px;background:#3b82f6;margin:2px}</style></head><body>
<h2 style="color:#fff">📈 Hydration Trend</h2>
<div class="b" style="height:50px"></div><div class="b" style="height:80px"></div><div class="b" style="height:60px"></div><div class="b" style="height:90px"></div></body></html>`},

/* 76 ── MACRO SPLITTER ─────────────────────────────── */
{icon:'🥗', en:'Macro Splitter', fr:'Répartiteur Macros',
 desc_en:'Calculate G/P/C grams based on calories',
 desc_fr:'Calculer les grammes G/P/C en fonction des calories',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Macros</title>
<style>body{background:#080c14;color:#fff;padding:24px}input{width:100%;padding:10px}</style></head><body>
<h2>🥗 Macro Splitter</h2>
Calories: <input id="c" value="2000"/>
<div id="o" style="margin-top:20px">Prot: 150g | Carb: 250g | Fat: 44g</div>
<script>
document.getElementById('c').oninput=function(){const c=+this.value;document.getElementById('o').textContent='Prot: '+(c*0.3/4).toFixed(0)+'g | Carb: '+(c*0.5/4).toFixed(0)+'g | Fat: '+(c*0.2/9).toFixed(0)+'g';};
</script></body></html>`},

/* 77 ── SLEEP DEBT ─────────────────────────────────── */
{icon:'🌔', en:'Sleep Debt', fr:'Dette Sommeil',
 desc_en:'Calculate your weekly sleep deficit',
 desc_fr:'Calculer votre déficit de sommeil hebdomadaire',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Sleep</title>
<style>body{background:#080c14;color:#fff;padding:24px}</style></head><body>
<h2>🌔 Sleep Debt Calc</h2>
Hours/night: <input id="h" value="6"/>
<div id="o" style="margin-top:20px">Debt: 14 hours / week</div>
<script>
document.getElementById('h').oninput=function(){document.getElementById('o').textContent='Debt: '+((8-this.value)*7)+' hours / week';};
</script></body></html>`},

/* 78 ── AMRAP TIMER ────────────────────────────────── */
{icon:'⏱️', en:'AMRAP Timer', fr:'Timer AMRAP',
 desc_en:'As Many Rounds As Possible workout timer',
 desc_fr:'Timer pour workout "Autant de Tours que Possible"',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>AMRAP</title>
<style>body{background:#080c14;color:#fff;text-align:center;padding:24px;font-size:40px}</style></head><body>
<h2>⏱️ AMRAP</h2><div id="t">10:00</div>
<button onclick="let s=600,i=setInterval(()=>{s--;document.getElementById('t').textContent=Math.floor(s/60)+':'+(s%60);if(s<=0)clearInterval(i)},1000)" style="font-size:20px">START</button></body></html>`},

/* 79 ── DAILY AFFIRMATIONS ─────────────────────────── */
{icon:'✨', en:'Daily Affirm', fr:'Affirmations Daily',
 desc_en:'Positive quotes to start your day',
 desc_fr:'Citations positives pour commencer la journée',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Quotes</title>
<style>body{background:#080c14;color:#10b981;text-align:center;padding:50px;font-style:italic;font-size:24px}</style></head><body>
<div id="q">"You are capable of amazing things."</div>
<button onclick="const a=['Today is a good day','Focus on progress','You got this'];document.getElementById('q').textContent=a[Math.floor(Math.random()*a.length)]" style="margin-top:20px">New Quote</button></body></html>`},

/* 80 ── MEDITATION BELL ────────────────────────────── */
{icon:'🔔', en:'Meditation Bell', fr:'Cloche Médit.',
 desc_en:'Relaxing timer with visual breathing circle',
 desc_fr:'Timer de relaxation avec cercle respiratoire visuel',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Bell</title>
<style>body{background:#080c14;color:#fff;text-align:center}.c{width:100px;height:100px;border-radius:50%;background:#8b5cf6;margin:50px auto;animation:b 4s ease-in-out infinite}@keyframes b{0%,100%{transform:scale(1)}50%{transform:scale(1.5)}}</style></head><body>
<h2>🔔 Zen Bell</h2><div class="c"></div></body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_10);
} else {
  window.APPS_DATA = APPS_DATA_10;
}
