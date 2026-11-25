// Math → 3D Surface Generator v2.0 (Safe Zero-eval Parser + 60 FPS In-Place Updates + Preserved Camera + EN/FR)
window.MathSurface3D = (() => {
  'use strict';

  const PRESETS = [
    { n: 'Sinc',    f: 'sin(sqrt(x*x+y*y)+0.001)/(sqrt(x*x+y*y)+0.001)*8' },
    { n: 'Ripple',  f: 'sin(x*2+t)*cos(y*2+t)*4' },
    { n: 'Saddle',  f: 'x*x/4-y*y/4' },
    { n: 'Wave',    f: 'sin(x+t)*2+cos(y*1.5+t)*2' },
    { n: 'Torus',   f: 'cos(sqrt(x*x+y*y)-4)*2.5' },
    { n: 'Rose',    f: 'sin(4*atan2(y,x+0.001)+t)*sqrt(x*x+y*y)/3' },
    { n: 'Peaks',   f: '(3-2*exp(-((x-1)*(x-1)+(y)*(y))))*exp(-0.1*(x*x+y*y))' },
    { n: 'Volcano', f: '(3-sqrt(x*x+y*y))*exp(-0.2*sqrt(x*x+y*y))*3' }
  ];

  // Safe recursive-descent math compiler (ZERO eval / ZERO new Function — completely immune to XSS!)
  function compileSafeMath(expr) {
    const FUNCS = {
      sin: Math.sin, cos: Math.cos, tan: Math.tan,
      asin: Math.asin, acos: Math.acos, atan: Math.atan, atan2: Math.atan2,
      sqrt: Math.sqrt, abs: Math.abs, pow: Math.pow, exp: Math.exp,
      log: Math.log, floor: Math.floor, ceil: Math.ceil, round: Math.round,
      min: Math.min, max: Math.max, sign: Math.sign, hypot: Math.hypot
    };
    const CONSTS = { pi: Math.PI, PI: Math.PI, e: Math.E, E: Math.E };
    const tokens = [];
    const s = String(expr || '0');
    let i = 0;
    while (i < s.length) {
      const ch = s[i];
      if (/\s/.test(ch)) { i++; continue; }
      if (/[0-9.]/.test(ch)) {
        let num = '';
        while (i < s.length && /[0-9.eE]/.test(s[i])) {
          num += s[i++];
          if ((num.endsWith('e') || num.endsWith('E')) && (s[i] === '+' || s[i] === '-')) num += s[i++];
        }
        tokens.push({ t: 'num', v: parseFloat(num) || 0 });
        continue;
      }
      if (/[a-zA-Z_]/.test(ch)) {
        let id = '';
        while (i < s.length && /[a-zA-Z0-9_]/.test(s[i])) id += s[i++];
        tokens.push({ t: 'id', v: id });
        continue;
      }
      if ('+-*/^%(),'.includes(ch)) {
        tokens.push({ t: 'op', v: ch });
        i++;
        continue;
      }
      i++; // skip unknown chars safely
    }
    let pos = 0;
    const peek = () => tokens[pos];
    const eat = () => tokens[pos++];

    function parseExpr() {
      let left = parseTerm();
      while (peek() && peek().t === 'op' && (peek().v === '+' || peek().v === '-')) {
        const op = eat().v;
        const right = parseTerm();
        const l = left, r = right;
        left = op === '+' ? (x, y, t) => l(x, y, t) + r(x, y, t) : (x, y, t) => l(x, y, t) - r(x, y, t);
      }
      return left;
    }
    function parseTerm() {
      let left = parsePow();
      while (peek() && peek().t === 'op' && (peek().v === '*' || peek().v === '/' || peek().v === '%')) {
        const op = eat().v;
        const right = parsePow();
        const l = left, r = right;
        left = op === '*' ? (x, y, t) => l(x, y, t) * r(x, y, t)
             : op === '/' ? (x, y, t) => l(x, y, t) / (r(x, y, t) || 1e-9)
             : (x, y, t) => l(x, y, t) % (r(x, y, t) || 1);
      }
      return left;
    }
    function parsePow() {
      let left = parseUnary();
      if (peek() && peek().t === 'op' && peek().v === '^') {
        eat();
        const right = parsePow();
        const l = left, r = right;
        return (x, y, t) => Math.pow(l(x, y, t), r(x, y, t));
      }
      return left;
    }
    function parseUnary() {
      if (peek() && peek().t === 'op' && (peek().v === '-' || peek().v === '+')) {
        const op = eat().v;
        const sub = parseUnary();
        return op === '-' ? (x, y, t) => -sub(x, y, t) : sub;
      }
      return parsePrimary();
    }
    function parsePrimary() {
      const tok = peek();
      if (!tok) return () => 0;
      if (tok.t === 'num') { eat(); const v = tok.v; return () => v; }
      if (tok.t === 'op' && tok.v === '(') {
        eat();
        const inner = parseExpr();
        if (peek() && peek().t === 'op' && peek().v === ')') eat();
        return inner;
      }
      if (tok.t === 'id') {
        eat();
        const name = tok.v;
        if (peek() && peek().t === 'op' && peek().v === '(') {
          eat();
          const args = [];
          if (!(peek() && peek().t === 'op' && peek().v === ')')) {
            args.push(parseExpr());
            while (peek() && peek().t === 'op' && peek().v === ',') { eat(); args.push(parseExpr()); }
          }
          if (peek() && peek().t === 'op' && peek().v === ')') eat();
          const fn = FUNCS[name];
          if (!fn) return () => 0;
          if (args.length === 1) { const a0 = args[0]; return (x, y, t) => fn(a0(x, y, t)); }
          if (args.length === 2) { const a0 = args[0], a1 = args[1]; return (x, y, t) => fn(a0(x, y, t), a1(x, y, t)); }
          return (x, y, t) => fn(...args.map(a => a(x, y, t)));
        }
        if (name === 'x') return (x) => x;
        if (name === 'y') return (x, y) => y;
        if (name === 't') return (x, y, t) => t;
        if (Object.prototype.hasOwnProperty.call(CONSTS, name)) { const c = CONSTS[name]; return () => c; }
        return () => 0;
      }
      eat();
      return () => 0;
    }
    try {
      const fn = parseExpr();
      return (x, y, t) => {
        const v = fn(x, y, t);
        return Number.isFinite(v) ? Math.max(-50, Math.min(50, v)) : 0;
      };
    } catch (e) {
      return () => 0;
    }
  }

  // Expose safe math compiler globally so SketchExtruder can use it too (zero eval!)
  window.compileSafeMath = compileSafeMath;

  const COLOR_JS = {
    height:  `var gc=function(n){return new THREE.Color().setHSL(0.67-n*0.67,1,0.45+n*0.1);};`,
    neon:    `var gc=function(n){return n<0.5?new THREE.Color(0,n*2,1):new THREE.Color((n-0.5)*2,1,0);};`,
    thermal: `var gc=function(n){if(n<0.33)return new THREE.Color(0,0,n*3);if(n<0.66)return new THREE.Color(0,(n-0.33)*3,1);return new THREE.Color((n-0.66)*3,1,0);};`,
    gold:    `var gc=function(n){return new THREE.Color(n,n*0.75,0.1);};`,
    ice:     `var gc=function(n){return new THREE.Color(0.2+n*0.3,0.5+n*0.3,1);};`
  };

  function makeHTML(formula, res, range, colorMode, doAnimate, doWire) {
    const colorCode = COLOR_JS[colorMode] || COLOR_JS.height;
    return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Math Surface 3D</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#050815;overflow:hidden;font-family:Inter,sans-serif;}
#ui{position:fixed;top:10px;left:10px;background:rgba(5,8,30,0.92);border:1px solid rgba(99,102,241,0.35);border-radius:12px;padding:12px;width:240px;z-index:9;backdrop-filter:blur(10px);}
#ui textarea{width:100%;padding:6px;background:#111827;border:1px solid #334155;border-radius:6px;color:#10b981;font-family:monospace;font-size:11px;}
.ui-lbl{font-size:10px;color:#94a3b8;font-weight:600;margin-top:5px;display:block;}
.ui-row{display:flex;align-items:center;gap:6px;margin-top:4px;}
#apply-btn{width:100%;margin-top:8px;padding:7px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:7px;color:#fff;font-size:11px;font-weight:700;cursor:pointer;}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
</head><body>
<div id="ui">
  <div style="font-size:12px;font-weight:700;color:#a5b4fc;margin-bottom:8px;">📐 Math Surface f(x,y,t)</div>
  <span class="ui-lbl">Formula</span>
  <textarea id="fn" rows="2">${formula.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</textarea>
  <div class="ui-row"><span class="ui-lbl" style="min-width:78px;">Range ±<b id="rv">${range}</b></span><input type="range" id="rng" min="2" max="20" value="${range}" style="flex:1;accent-color:#6366f1;" oninput="document.getElementById('rv').textContent=this.value;doRebuild(false)"></div>
  <div class="ui-row"><span class="ui-lbl" style="min-width:78px;">Res <b id="resv">${res}</b></span><input type="range" id="ress" min="10" max="80" value="${res}" style="flex:1;accent-color:#6366f1;" oninput="document.getElementById('resv').textContent=this.value;doRebuild(false)"></div>
  <button id="apply-btn" onclick="doRebuild(false)">⚡ Apply</button>
  <div style="font-size:9px;color:#64748b;margin-top:6px;">Safe parser: x, y, t, sin, cos, sqrt, abs, pow, exp, PI, atan2</div>
</div>
<script>(function(){
${compileSafeMath.toString()}
var scene=new THREE.Scene();scene.background=new THREE.Color(0x050815);
var camera=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,0.1,2000);
camera.position.set(0,14,${range * 2.2});
var renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
renderer.setSize(innerWidth,innerHeight);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
document.body.appendChild(renderer.domElement);
var controls=new THREE.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;
scene.add(new THREE.AmbientLight(0xffffff,0.45));
var dl=new THREE.DirectionalLight(0x6366f1,1.8);dl.position.set(50,100,50);scene.add(dl);
var dl2=new THREE.DirectionalLight(0x10b981,1.3);dl2.position.set(-50,-50,-50);scene.add(dl2);
var grid=new THREE.GridHelper(40,20,0x1e2a45,0x0d1225);grid.position.y=-0.05;scene.add(grid);
${colorCode}
var mesh=null,geo=null,mat=null,compiledFn=null,hs=null,colArr=null,t=0;
function updateVertices(timeVal){
  if(!geo||!compiledFn) return;
  var pos=geo.attributes.position,mn=1e9,mx=-1e9;
  for(var i=0;i<pos.count;i++){
    var v=compiledFn(pos.getX(i),pos.getZ(i),timeVal);
    hs[i]=v;if(v<mn)mn=v;if(v>mx)mx=v;
  }
  var span=mx-mn||1;
  for(var i=0;i<pos.count;i++){
    pos.setY(i,hs[i]);
    var c=gc((hs[i]-mn)/span);
    colArr[i*3]=c.r;colArr[i*3+1]=c.g;colArr[i*3+2]=c.b;
  }
  pos.needsUpdate=true;
  geo.attributes.color.needsUpdate=true;
  geo.computeVertexNormals();
}
function doRebuild(resetCam){
  var F=document.getElementById('fn').value,R=+document.getElementById('rng').value,N=+document.getElementById('ress').value;
  compiledFn=compileSafeMath(F);
  if(mesh){scene.remove(mesh);geo.dispose();mat.dispose();}
  geo=new THREE.PlaneGeometry(R*2,R*2,N,N);geo.rotateX(-Math.PI/2);
  var count=geo.attributes.position.count;
  hs=new Float32Array(count);colArr=new Float32Array(count*3);
  geo.setAttribute('color',new THREE.BufferAttribute(colArr,3));
  mat=new THREE.MeshPhongMaterial({vertexColors:true,wireframe:${doWire},shininess:80,side:THREE.DoubleSide});
  mesh=new THREE.Mesh(geo,mat);scene.add(mesh);
  updateVertices(t);
  if(resetCam){camera.position.set(0,R*1.6,R*2.3);controls.target.set(0,0,0);controls.update();}
}
window.doRebuild=doRebuild;doRebuild(true);
window.addEventListener('resize',function(){camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
function anim(){requestAnimationFrame(anim);controls.update();t+=0.025;${doAnimate?'updateVertices(t);':''}renderer.render(scene,camera);}anim();
}());<\/script></body></html>`;
  }

  function init(container, btn) {
    const panel = document.createElement('div');
    panel.id = 'ms3d-panel';
    panel.style.cssText = 'display:none;position:absolute;inset:0;background:rgba(13,18,37,0.98);z-index:100;overflow-y:auto;padding:14px;font-family:Inter,sans-serif;flex-direction:column;border-radius:8px;';

    function renderPanel() {
      const isFR = (window.currentLang || 'en') === 'fr';
      const curFormula = (panel.querySelector('#ms3d-formula') && panel.querySelector('#ms3d-formula').value) || 'sin(x*2+t)*cos(y*2+t)*4';
      const presetsHTML = PRESETS.map((p, idx) =>
        `<button class="ms3d-preset" data-idx="${idx}" style="padding:3px 8px;background:rgba(99,102,241,0.12);border:1px solid rgba(99,102,241,0.25);border-radius:10px;color:#a5b4fc;font-size:10px;cursor:pointer;">${p.n}</button>`
      ).join('');

      panel.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:12px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <div style="width:32px;height:32px;background:linear-gradient(135deg,#6366f1,#a855f7);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">📐</div>
            <div><div style="font-size:13px;font-weight:700;color:#f1f5f9;">${isFR ? 'Surface Math 3D' : 'Math → 3D Surface'}</div><div style="font-size:10px;color:#64748b;">${isFR ? 'Surface interactive sécurisée f(x, y, t)' : 'Safe f(x, y, t) interactive surface'}</div></div>
          </div>
          <button id="ms3d-close" style="background:rgba(255,255,255,0.06);border:1px solid #334155;border-radius:6px;color:#94a3b8;padding:3px 8px;cursor:pointer;font-size:11px;">✕</button>
        </div>
        <div style="font-size:10px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">${isFR ? 'Préréglages' : 'Presets'}</div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px;">${presetsHTML}</div>
        <label style="font-size:10px;color:#94a3b8;font-weight:600;">${isFR ? 'Formule (x, y, t, sin, cos, sqrt, PI...)' : 'Formula (x, y, t, sin, cos, sqrt, PI...)'}</label>
        <textarea id="ms3d-formula" rows="2" style="width:100%;padding:7px;background:#111827;border:1px solid rgba(99,102,241,0.3);border-radius:6px;color:#10b981;font-size:11px;font-family:monospace;resize:none;margin-top:4px;box-sizing:border-box;">${curFormula}</textarea>
        <div style="display:flex;align-items:center;gap:6px;margin-top:8px;"><span style="font-size:10px;color:#94a3b8;min-width:90px;">${isFR ? 'Résolution' : 'Resolution'} <b id="ms3d-rv">40</b></span><input type="range" id="ms3d-res" min="10" max="80" value="40" style="flex:1;accent-color:#6366f1;"></div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:5px;"><span style="font-size:10px;color:#94a3b8;min-width:90px;">${isFR ? 'Étendue' : 'Range'} ± <b id="ms3d-rangev">8</b></span><input type="range" id="ms3d-range" min="2" max="20" value="8" style="flex:1;accent-color:#6366f1;"></div>
        <div style="display:flex;gap:8px;margin-top:8px;align-items:center;">
          <select id="ms3d-color" style="flex:1;padding:5px;background:#111827;border:1px solid #334155;border-radius:6px;color:#f1f5f9;font-size:10px;">
            <option value="height">Height Gradient</option><option value="neon">Neon</option><option value="thermal">Thermal</option><option value="gold">Gold</option><option value="ice">Ice</option>
          </select>
          <label style="font-size:10px;color:#94a3b8;display:flex;align-items:center;gap:4px;white-space:nowrap;"><input type="checkbox" id="ms3d-anim" checked style="accent-color:#6366f1;"> ${isFR ? 'Animer' : 'Animate'}</label>
          <label style="font-size:10px;color:#94a3b8;display:flex;align-items:center;gap:4px;"><input type="checkbox" id="ms3d-wf" style="accent-color:#6366f1;"> Wire</label>
        </div>
        <button id="ms3d-add" style="width:100%;margin-top:10px;padding:9px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;border-radius:8px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 4px 15px rgba(99,102,241,0.4);">📐 ${isFR ? 'AJOUTER À LA SCÈNE' : 'ADD TO SCENE'}</button>
        <button id="ms3d-gen" style="width:100%;margin-top:6px;padding:7px;background:rgba(99,102,241,0.1);border:1px solid rgba(99,102,241,0.3);border-radius:8px;color:#a5b4fc;font-size:11px;font-weight:600;cursor:pointer;">📄 ${isFR ? 'Générer HTML Autonome' : 'Generate Standalone HTML'}</button>
      `;

      panel.querySelector('#ms3d-close').onclick = () => { panel.style.display = 'none'; };
      panel.querySelectorAll('.ms3d-preset').forEach(b => {
        b.onclick = () => {
          const p = PRESETS[+b.dataset.idx];
          if (p) panel.querySelector('#ms3d-formula').value = p.f;
        };
      });
      panel.querySelector('#ms3d-res').addEventListener('input', e => panel.querySelector('#ms3d-rv').textContent = e.target.value);
      panel.querySelector('#ms3d-range').addEventListener('input', e => panel.querySelector('#ms3d-rangev').textContent = e.target.value);

      panel.querySelector('#ms3d-add').addEventListener('click', () => {
        const formula = panel.querySelector('#ms3d-formula').value.trim() || 'sin(x)*cos(y)*3';
        const res = +panel.querySelector('#ms3d-res').value;
        const range = +panel.querySelector('#ms3d-range').value;
        const colorMode = panel.querySelector('#ms3d-color').value;
        const doAnimate = panel.querySelector('#ms3d-anim').checked;
        const doWire = panel.querySelector('#ms3d-wf').checked;
        if (window.SketchExtruder && window.SketchExtruder.addExtraModule) {
          window.SketchExtruder.addExtraModule('math-surface', { formula, res, range, colorMode, doAnimate, doWire });
          panel.style.display = 'none';
        }
      });

      panel.querySelector('#ms3d-gen').addEventListener('click', () => {
        const formula = panel.querySelector('#ms3d-formula').value.trim() || 'sin(x)*cos(y)*3';
        const res = +panel.querySelector('#ms3d-res').value;
        const range = +panel.querySelector('#ms3d-range').value;
        const colorMode = panel.querySelector('#ms3d-color').value;
        const doAnimate = panel.querySelector('#ms3d-anim').checked;
        const doWire = panel.querySelector('#ms3d-wf').checked;
        const html = makeHTML(formula, res, range, colorMode, doAnimate, doWire);
        const ed = document.getElementById('code-editor');
        if (ed) { if (window.pushUndo) window.pushUndo(); ed.value = html; ed.dispatchEvent(new Event('input', { bubbles: true })); }
        if (window.toast) window.toast(isFR ? '📐 Surface Math générée !' : '📐 Math Surface generated!');
      });
    }

    container.appendChild(panel);
    renderPanel();
    window.addEventListener('studio:langchange', renderPanel);

    if (btn) btn.addEventListener('click', () => {
      const vis = panel.style.display === 'flex';
      document.querySelectorAll('[id$="-panel"]').forEach(p => p.style.display = 'none');
      panel.style.display = vis ? 'none' : 'flex';
    });
  }
  return { init, compileSafeMath };
})();
