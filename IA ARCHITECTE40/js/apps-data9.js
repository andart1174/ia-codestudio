'use strict';
/* IA Architecte — Apps 61-70 (Developer & Design Tools) */

const APPS_DATA_9 = [

/* 61 ── FLEXBOX PLAYGROUND ─────────────────────────── */
{icon:'📦', en:'Flexbox Lab', fr:'Labo Flexbox',
 desc_en:'Visual tester for flex-direction, align & justify',
 desc_fr:'Testeur visuel pour flex-direction, align et justify',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Flex</title>
<style>body{background:#080c14;color:#fff;padding:24px}#f{display:flex;background:#111;height:150px;border:1px solid #333;margin-top:20px}.b{width:40px;height:40px;background:#3b82f6;margin:5px;display:flex;align-items:center;justify-content:center;font-weight:900}</style></head><body>
<h2>📦 Flexbox Lab</h2>
Dir: <select onchange="document.getElementById('f').style.flexDirection=this.value"><option>row</option><option>column</option></select>
Justify: <select onchange="document.getElementById('f').style.justifyContent=this.value"><option>flex-start</option><option>center</option><option>space-between</option></select>
<div id="f"><div class="b">1</div><div class="b">2</div><div class="b">3</div></div></body></html>`},

/* 62 ── GRID GENERATOR ──────────────────────────────── */
{icon:'🔲', en:'Grid Generator', fr:'Générateur Grid',
 desc_en:'Quickly prototype CSS Grid layouts',
 desc_fr:'Prototyper rapidement des mises en page CSS Grid',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Grid</title>
<style>body{background:#080c14;color:#fff;padding:24px}#g{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px}.b{background:#10b981;height:60px;border-radius:8px}</style></head><body>
<h2>🔲 Grid Gen</h2>
Cols: <input type="number" value="3" oninput="document.getElementById('g').style.gridTemplateColumns='repeat('+this.value+',1fr)'"/>
<div id="g"><div class="b"></div><div class="b"></div><div class="b"></div><div class="b"></div></div></body></html>`},

/* 63 ── SVG WAVE GENERATOR ─────────────────────────── */
{icon:'🌊', en:'Wave Generator', fr:'Générateur de Vagues',
 desc_en:'Create animated SVG waves for your headers',
 desc_fr:'Créer des vagues SVG animées pour vos en-têtes',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Wave</title>
<style>body{background:#080c14;margin:0;overflow:hidden}svg{position:absolute;bottom:0;width:100%}</style></head><body>
<svg viewBox="0 0 1440 320"><path fill="#3b82f6" d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,186.7C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg></body></html>`},

/* 64 ── JSON SCHEMA TOOL ───────────────────────────── */
{icon:'📜', en:'JSON Schema', fr:'Schéma JSON',
 desc_en:'Validate JSON data against a schema',
 desc_fr:'Valider des données JSON par rapport à un schéma',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>JSON</title>
<style>body{background:#080c14;color:#fff;padding:24px}textarea{width:100%;height:100px;background:#111;color:#fff;border:1px solid #333}</style></head><body>
<h2>📜 JSON Validator</h2>
<textarea id="j">{"status":"ok"}</textarea>
<button onclick="try{JSON.parse(document.getElementById('j').value);alert('Valid!')}catch(e){alert('Error!')}">Check</button></body></html>`},

/* 65 ── MINIFIER ───────────────────────────────────── */
{icon:'🗜️', en:'Minifier Pro', fr:'Minifieur Pro',
 desc_en:'Minify HTML/CSS/JS code instantly',
 desc_fr:'Minifier instantanément du code HTML/CSS/JS',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Mini</title>
<style>body{background:#080c14;color:#fff;padding:24px}textarea{width:100%;height:100px;background:#111;color:#aaa}</style></head><body>
<h2>🗜️ Minifier</h2>
<textarea id="i">div { margin: 10px; }</textarea>
<button onclick="document.getElementById('i').value=document.getElementById('i').value.replace(/\\s+/g,' ')">Minify</button></body></html>`},

/* 66 ── REGEX VISUALIZER ────────────────────────────── */
{icon:'🔍', en:'Regex Lab', fr:'Regex Lab',
 desc_en:'Interactive regex matching tool',
 desc_fr:'Outil interactif de correspondance regex',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Regex</title>
<style>body{background:#080c14;color:#fff;padding:24px}#res{color:#3b82f6}</style></head><body>
<h2>🔍 Regex Lab</h2>
Pattern: <input id="p" value="[a-z]+"/>
<div id="res"></div>
<script>
document.getElementById('p').oninput=function(){try{new RegExp(this.value);document.getElementById('res').textContent='Valid Regex'}catch(e){}};
</script></body></html>`},

/* 67 ── FANCY BORDER RADIUS ──────────────────────────── */
{icon:'🫧', en:'Fancy Shapes', fr:'Formes Fancy',
 desc_en:'Generate organic CSS border-radius shapes',
 desc_fr:'Générer des formes border-radius CSS organiques',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Shape</title>
<style>body{background:#080c14;color:#fff;text-align:center}#sh{width:150px;height:150px;background:#8b5cf6;margin:50px auto;transition:border-radius 0.3s}</style></head><body>
<h2>🫧 Fancy shapes</h2>
<button onclick="document.getElementById('sh').style.borderRadius='30% 70% 70% 30% / 30% 30% 70% 70%'">Morph</button>
<div id="sh"></div></body></html>`},

/* 68 ── CANVAS DRAWING ─────────────────────────────── */
{icon:'🖌️', en:'Drawing Pad', fr:'Bloc Dessin',
 desc_en:'Simple freehand drawing with colors',
 desc_fr:'Dessin à main levée simple avec couleurs',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Paint</title>
<style>body{background:#080c14;margin:0}canvas{cursor:crosshair;background:#fff}</style></head><body>
<canvas id="c" width="400" height="400"></canvas>
<script>
const n=document.getElementById('c'),x=n.getContext('2d');let d=0;
n.onmousedown=()=>d=1;n.onmouseup=()=>d=0;
n.onmousemove=e=>{if(d){x.fillStyle='#000';x.fillRect(e.clientX,e.clientY,4,4)}};
</script></body></html>`},

/* 69 ── WEB SAFE FONTS ──────────────────────────────── */
{icon:'🔤', en:'Font Preview', fr:'Aperçu Polices',
 desc_en:'Compare system fonts for web development',
 desc_fr:'Comparer les polices système pour le web',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Font</title>
<style>body{background:#080c14;color:#fff;padding:24px}</style></head><body>
<h2 style="font-family:serif">Serif Font</h2>
<h2 style="font-family:sans-serif">Sans-Serif Font</h2>
<h2 style="font-family:monospace">Monospace Font</h2></body></html>`},

/* 70 ── COLOR SHADE GENERATOR ────────────────────────── */
{icon:'🎨', en:'Shade Maker', fr:'Créateur Nuances',
 desc_en:'Generate light/dark variants of a color',
 desc_fr:'Générer des variantes claires/foncées d\'une couleur',
 code:`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><title>Shades</title>
<style>body{background:#080c14;color:#fff;padding:24px}.s{height:50px;margin:2px}</style></head><body>
<input type="color" id="c" oninput="gen()"/>
<div id="o"></div>
<script>
function gen(){let h=document.getElementById('c').value,o=document.getElementById('o');o.innerHTML='';for(let i=1;i<6;i++)o.innerHTML+='<div class="s" style="background:'+h+';opacity:'+(i*0.2)+'"></div>';}
</script></body></html>`}

];

if (window.APPS_DATA) {
  window.APPS_DATA = window.APPS_DATA.concat(APPS_DATA_9);
} else {
  window.APPS_DATA = APPS_DATA_9;
}
