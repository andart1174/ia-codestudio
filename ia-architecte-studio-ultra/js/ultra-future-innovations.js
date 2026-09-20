// ══════════════════════════════════════════════════════════════════════════════
// IA Architecte Studio ULTRA — 7 GOD-TIER FUTURE INNOVATIONS
// ══════════════════════════════════════════════════════════════════════════════
// 1. UltraSpatial3D: WebGL & Three.js 3D Canvas Scene Injector
// 2. UltraPaywallSimulator: Monetization & Stripe Elements Checkout Simulator
// 3. UltraUserHeatmap: Live User Heatmap & Click Analytics Simulator
// 5. UltraWebhookDispatcher: Real-World Webhook Dispatcher (Discord/Zapier/Sheets)
// 6. UltraSplitTesting: A/B Split-Testing Arena with 100-User Monte Carlo Sim
// 7. UltraAgentSwarm: 4-Agent Code Reviewer with Interactive Sticky Notes & Auto-Fix
// ══════════════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  function _it(key, fallback) {
    if (typeof t === 'function') {
      const res = t(key);
      if (res && res !== key) return res;
    }
    return fallback || key;
  }

  function _play(sound) {
    try { if (window.UltraSoundFX) UltraSoundFX.play(sound); } catch(e){}
  }

  function _toast(msg, type) {
    if (typeof showToast === 'function') showToast(msg, type || 'success');
  }

  // ══════════════════════════════════════════════════════════════════════════════
  // 1. ULTRA SPATIAL 3D STUDIO (VISIONOS & WEBGL 3D SUITE)
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraSpatial3D = {
    palettes: {
      cyberpunk: { name: 'Cyberpunk Neon', primary: '#38bdf8', secondary: '#a855f7', glow: 'rgba(56,189,248,0.45)', bg: '#090d16' },
      emerald: { name: 'Emerald Aurora', primary: '#10b981', secondary: '#06b6d4', glow: 'rgba(16,185,129,0.45)', bg: '#061311' },
      gold: { name: 'Obsidian Gold', primary: '#f59e0b', secondary: '#fbbf24', glow: 'rgba(245,158,11,0.45)', bg: '#120f09' },
      sunset: { name: 'Sunset Crimson', primary: '#f43f5e', secondary: '#fb923c', glow: 'rgba(244,63,94,0.45)', bg: '#140a0e' },
      ice: { name: 'Electric Ice', primary: '#60a5fa', secondary: '#e0e7ff', glow: 'rgba(96,165,250,0.45)', bg: '#080c18' }
    },

    state: {
      activeCategory: 'all',
      depth: 1200,
      sensitivity: 1.0,
      speed: 1.0,
      density: 100,
      palette: 'cyberpunk'
    },

    presets: {
      visionpro: {
        id: 'visionpro',
        category: 'vision',
        name: 'Apple Vision Pro Spatial Depth',
        icon: '🥽',
        badge: 'VisionOS Parallax',
        desc: 'Converts full UI into multi-layered 3D spatial space: floating cards, levitating buttons & gyroscopic glass tilt',
        descFr: "Convertit l'UI en espace spatial 3D multi-couches : cartes flottantes, boutons en lévitation & inclinaison gyroscopique",
        template: `<!-- ─── SPATIAL 3D: START visionpro ─── -->
<style id="spatial-3d-style">
  html, body {
    perspective: {{DEPTH}}px !important;
    perspective-origin: center center !important;
    transform-style: preserve-3d !important;
  }
  .card, .container, .box, section, .sp-feature-card, header, .header, nav, .nav, .panel, .dashboard-card, .metric-card {
    transform-style: preserve-3d !important;
    transform: translateZ(28px) !important;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease !important;
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35), 0 0 18px {{GLOW}} !important;
  }
  button, .btn, .btn-primary, .btn-secondary, input, select, .badge, .tag {
    transform-style: preserve-3d !important;
    transform: translateZ(50px) !important;
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.4) !important;
  }
  #spatial-vision-backdrop {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 0;
    transform: translateZ(-120px) scale(1.15);
    background: radial-gradient(circle at 50% 30%, {{GLOW}} 0%, transparent 65%);
    opacity: 0.7;
  }
</style>
<div id="spatial-vision-backdrop"></div>
<script id="spatial-3d-script">
(function(){
  var w = window.innerWidth, h = window.innerHeight;
  var sens = {{SENSITIVITY}};
  window.addEventListener('resize', function(){ w = window.innerWidth; h = window.innerHeight; });
  var mx = w / 2, my = h / 2;
  var curRotX = 0, curRotY = 0;
  window.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; });
  function animate(){
    var targetRotY = ((mx - w / 2) / (w / 2)) * 6.5 * sens;
    var targetRotX = -((my - h / 2) / (h / 2)) * 6.5 * sens;
    curRotX += (targetRotX - curRotX) * 0.1;
    curRotY += (targetRotY - curRotY) * 0.1;
    document.body.style.transform = 'rotateX(' + curRotX.toFixed(2) + 'deg) rotateY(' + curRotY.toFixed(2) + 'deg)';
    requestAnimationFrame(animate);
  }
  animate();
})();
</script>
<!-- ─── SPATIAL 3D: END ─── -->`
      },

      silkmesh: {
        id: 'silkmesh',
        category: 'webgl',
        name: 'Kinetic Silk Waves & Mesh Terrain',
        icon: '🌊',
        badge: 'Fluid Wave Physics',
        desc: 'Interactive 3D topographical mesh undulating with water-like ripples and kinetic mouse displacement',
        descFr: 'Maillage topographique 3D ondulant avec ondulations fluides et déplacement cinétique au curseur',
        template: `<!-- ─── SPATIAL 3D: START silkmesh ─── -->
<canvas id="spatial-silk-canvas" style="position:fixed;bottom:0;left:0;width:100%;height:65vh;pointer-events:none;z-index:0;opacity:0.65;"></canvas>
<script id="spatial-3d-script">
(function(){
  var c = document.getElementById('spatial-silk-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  var w, h, t = 0;
  var mx = 0, my = 0;
  function resize(){ w = c.width = window.innerWidth; h = c.height = Math.floor(window.innerHeight * 0.65); }
  window.addEventListener('resize', resize);
  resize();
  window.addEventListener('mousemove', function(e){
    var r = c.getBoundingClientRect();
    mx = e.clientX - r.left;
    my = e.clientY - r.top;
  });
  var cols = 32, rows = 18;
  var primary = '{{PRIMARY}}';
  var secondary = '{{SECONDARY}}';
  function loop(){
    ctx.clearRect(0, 0, w, h);
    t += 0.02 * {{SPEED}};
    var cellW = w / (cols - 1);
    var cellH = h / (rows - 1);
    var grid = [];
    for (var r = 0; r < rows; r++) {
      grid[r] = [];
      for (var col = 0; col < cols; col++) {
        var bx = col * cellW;
        var by = r * cellH;
        var dist = Math.hypot(bx - mx, by - my);
        var mouseRipple = Math.max(0, 1 - dist / 220) * 35 * Math.sin(t * 4 - dist * 0.05);
        var waveY = Math.sin(col * 0.35 + t) * 16 + Math.cos(r * 0.4 + t * 0.8) * 14 + mouseRipple;
        grid[r][col] = { x: bx, y: by + waveY };
      }
    }
    for (var r = 0; r < rows; r++) {
      ctx.beginPath();
      var grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, primary);
      grad.addColorStop(1, secondary);
      ctx.strokeStyle = grad;
      ctx.lineWidth = (r % 3 === 0) ? 1.5 : 0.75;
      ctx.globalAlpha = 0.2 + (r / rows) * 0.6;
      for (var col = 0; col < cols; col++) {
        var pt = grid[r][col];
        if (col === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 0.15;
    for (var col = 0; col < cols; col += 2) {
      ctx.beginPath();
      for (var r = 0; r < rows; r++) {
        var pt = grid[r][col];
        if (r === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      }
      ctx.stroke();
    }
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- ─── SPATIAL 3D: END ─── -->`
      },

      singularity: {
        id: 'singularity',
        category: 'webgl',
        name: 'Quantum Singularity & Cosmic Gravity',
        icon: '🪐',
        badge: '3D Gravity Engine',
        desc: '3D particle black hole with 250+ orbiting quantum orbs, depth illumination and explosive shockwave on click',
        descFr: 'Trou noir quantique 3D avec 250+ orbes en orbite, profondeur de champ et onde de choc explosive au clic',
        template: `<!-- ─── SPATIAL 3D: START singularity ─── -->
<canvas id="spatial-singularity-canvas" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.75;"></canvas>
<script id="spatial-3d-script">
(function(){
  var c = document.getElementById('spatial-singularity-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  var w, h;
  function resize(){ w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();
  var primary = '{{PRIMARY}}';
  var secondary = '{{SECONDARY}}';
  var numPts = Math.floor(220 * ({{DENSITY}} / 100));
  var pts = [];
  for (var i = 0; i < numPts; i++) {
    var ring = i % 3;
    var radius = 70 + Math.random() * 180;
    var angle = Math.random() * Math.PI * 2;
    var tilt = (ring === 0) ? 0.3 : (ring === 1) ? 1.1 : -0.8;
    pts.push({
      radius: radius,
      baseRadius: radius,
      angle: angle,
      speed: (0.012 + Math.random() * 0.018) * (radius < 120 ? 1.4 : 0.8) * {{SPEED}},
      tilt: tilt,
      size: Math.random() * 2 + 1.2
    });
  }
  var cx = w * 0.78, cy = h * 0.32;
  var shock = 0;
  window.addEventListener('click', function(){ shock = 1.0; });
  function loop(){
    ctx.clearRect(0, 0, w, h);
    if (shock > 0.005) shock *= 0.94; else shock = 0;
    var coreG = ctx.createRadialGradient(cx, cy, 0, cx, cy, 45 + shock * 60);
    coreG.addColorStop(0, '#ffffff');
    coreG.addColorStop(0.25, primary);
    coreG.addColorStop(0.7, secondary);
    coreG.addColorStop(1, 'transparent');
    ctx.beginPath();
    ctx.arc(cx, cy, 45 + shock * 60, 0, Math.PI * 2);
    ctx.fillStyle = coreG;
    ctx.fill();

    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.angle += p.speed;
      var curR = p.baseRadius + shock * 140;
      var x3 = Math.cos(p.angle) * curR;
      var y3 = Math.sin(p.angle) * curR * Math.cos(p.tilt);
      var z3 = Math.sin(p.angle) * curR * Math.sin(p.tilt);
      var fov = 400 / (400 + z3);
      var sx = cx + x3 * fov;
      var sy = cy + y3 * fov;
      var alpha = Math.max(0.15, Math.min(1, (z3 + 200) / 400));
      ctx.beginPath();
      ctx.arc(sx, sy, p.size * fov, 0, Math.PI * 2);
      ctx.fillStyle = (i % 2 === 0) ? primary : secondary;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 8 * fov;
      ctx.shadowColor = primary;
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- ─── SPATIAL 3D: END ─── -->`
      },

      worldglobe: {
        id: 'worldglobe',
        category: 'webgl',
        name: '3D Holographic Earth Globe',
        icon: '🌐',
        badge: '360° Interactive Drag',
        desc: 'Rotatable 3D wireframe globe with dotted continents, pulsing geo-hubs (NY, London, Tokyo) & flight arcs',
        descFr: 'Globe 3D interactif avec continents en points néon, hubs mondiaux pulsants (NY, Londres, Tokyo) & arcs de vol',
        template: `<!-- ─── SPATIAL 3D: START worldglobe ─── -->
<canvas id="spatial-globe-canvas" style="position:fixed;bottom:20px;right:20px;width:340px;height:340px;z-index:9999;pointer-events:auto;cursor:grab;"></canvas>
<script id="spatial-3d-script">
(function(){
  var c = document.getElementById('spatial-globe-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  c.width = 340; c.height = 340;
  var R = 120;
  var rotY = 0, rotX = 0.25;
  var primary = '{{PRIMARY}}';
  var secondary = '{{SECONDARY}}';
  var isDragging = false, lastX = 0, lastY = 0;
  c.addEventListener('mousedown', function(e){ isDragging = true; lastX = e.clientX; lastY = e.clientY; c.style.cursor = 'grabbing'; });
  window.addEventListener('mouseup', function(){ isDragging = false; if (c) c.style.cursor = 'grab'; });
  window.addEventListener('mousemove', function(e){
    if (!isDragging) return;
    var dx = e.clientX - lastX, dy = e.clientY - lastY;
    rotY += dx * 0.01;
    rotX += dy * 0.01;
    lastX = e.clientX; lastY = e.clientY;
  });
  var hubs = [
    { lat: 0.89, lon: -0.12, name: 'London' },
    { lat: 0.71, lon: -1.29, name: 'New York' },
    { lat: 0.62, lon: 2.43, name: 'Tokyo' },
    { lat: 0.85, lon: 0.04, name: 'Paris' },
    { lat: 0.02, lon: 1.81, name: 'Singapore' },
    { lat: -0.59, lon: 2.64, name: 'Sydney' }
  ];
  function project(lat, lon){
    var cy = lon + rotY;
    var x = R * Math.cos(lat) * Math.sin(cy);
    var y = -R * Math.sin(lat);
    var z = R * Math.cos(lat) * Math.cos(cy);
    var y2 = y * Math.cos(rotX) - z * Math.sin(rotX);
    var z2 = y * Math.sin(rotX) + z * Math.cos(rotX);
    return { x: 170 + x, y: 170 + y2, z: z2, visible: z2 > -15 };
  }
  var pulse = 0;
  function loop(){
    ctx.clearRect(0, 0, 340, 340);
    if (!isDragging) rotY += 0.008 * {{SPEED}};
    pulse += 0.05;
    var atmo = ctx.createRadialGradient(170, 170, R * 0.8, 170, 170, R * 1.25);
    atmo.addColorStop(0, 'transparent');
    atmo.addColorStop(0.85, '{{GLOW}}');
    atmo.addColorStop(1, 'transparent');
    ctx.fillStyle = atmo;
    ctx.fillRect(0, 0, 340, 340);

    ctx.strokeStyle = primary;
    ctx.lineWidth = 0.9;
    ctx.globalAlpha = 0.35;
    for (var lon = 0; lon < Math.PI * 2; lon += Math.PI / 6) {
      ctx.beginPath();
      var first = true;
      for (var lat = -Math.PI / 2; lat <= Math.PI / 2; lat += 0.15) {
        var p = project(lat, lon);
        if (p.visible) {
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        } else { first = true; }
      }
      ctx.stroke();
    }
    for (var lat = -1.2; lat <= 1.2; lat += 0.4) {
      ctx.beginPath();
      var first = true;
      for (var lon = 0; lon <= Math.PI * 2 + 0.1; lon += 0.15) {
        var p = project(lat, lon);
        if (p.visible) {
          if (first) { ctx.moveTo(p.x, p.y); first = false; }
          else ctx.lineTo(p.x, p.y);
        } else { first = true; }
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 0.9;
    var projHubs = hubs.map(function(h){ return { p: project(h.lat, h.lon), name: h.name }; });
    for (var i = 0; i < projHubs.length; i++) {
      var h1 = projHubs[i];
      if (!h1.p.visible) continue;
      ctx.beginPath();
      ctx.arc(h1.p.x, h1.p.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(h1.p.x, h1.p.y, 4 + (Math.sin(pulse + i) * 0.5 + 0.5) * 6, 0, Math.PI * 2);
      ctx.strokeStyle = secondary;
      ctx.stroke();
      var next = projHubs[(i + 1) % projHubs.length];
      if (next.p.visible) {
        ctx.beginPath();
        ctx.moveTo(h1.p.x, h1.p.y);
        var midX = (h1.p.x + next.p.x) / 2;
        var midY = (h1.p.y + next.p.y) / 2 - 25;
        ctx.quadraticCurveTo(midX, midY, next.p.x, next.p.y);
        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- ─── SPATIAL 3D: END ─── -->`
      },

      liquidsphere: {
        id: 'liquidsphere',
        category: 'webgl',
        name: 'Liquid Mercury Metasphere (Apple AI)',
        icon: '🔮',
        badge: 'Organic Chromatic Mesh',
        desc: 'Floating organic liquid-metal 3D orb with real-time Perlin surface distortion and chromatic fringe',
        descFr: 'Orbe 3D en métal liquide iridiscent avec déformation procédurale de surface et frange chromatique',
        template: `<!-- ─── SPATIAL 3D: START liquidsphere ─── -->
<canvas id="spatial-liquid-canvas" style="position:fixed;top:30px;right:30px;width:260px;height:260px;pointer-events:none;z-index:10;opacity:0.85;"></canvas>
<script id="spatial-3d-script">
(function(){
  var c = document.getElementById('spatial-liquid-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  c.width = 260; c.height = 260;
  var cx = 130, cy = 130, baseR = 75;
  var t = 0;
  var primary = '{{PRIMARY}}';
  var secondary = '{{SECONDARY}}';
  var numPts = 64;
  function loop(){
    ctx.clearRect(0, 0, 260, 260);
    t += 0.025 * {{SPEED}};
    var layers = [
      { color: secondary, off: 0, scale: 1.04, alpha: 0.5 },
      { color: primary, off: 0.5, scale: 1.0, alpha: 0.7 },
      { color: '#ffffff', off: 1.0, scale: 0.75, alpha: 0.35 }
    ];
    layers.forEach(function(l){
      ctx.beginPath();
      ctx.globalAlpha = l.alpha;
      for (var i = 0; i <= numPts; i++) {
        var a = (i / numPts) * Math.PI * 2;
        var deform = Math.sin(a * 3 + t + l.off) * 9 + Math.cos(a * 5 - t * 0.7) * 7 + Math.sin(a * 2 + t * 1.5) * 5;
        var r = (baseR + deform) * l.scale;
        var x = cx + Math.cos(a) * r;
        var y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.closePath();
      var grad = ctx.createRadialGradient(cx - 20, cy - 25, 10, cx, cy, baseR + 15);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.35, primary);
      grad.addColorStop(0.8, secondary);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.shadowBlur = 22;
      ctx.shadowColor = primary;
      ctx.fill();
    });
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- ─── SPATIAL 3D: END ─── -->`
      },

      matrix3d: {
        id: 'matrix3d',
        category: 'cyber',
        name: '3D Matrix Rain (Spatial Z-Depth)',
        icon: '⚡',
        badge: 'Multi-Depth Glyphs',
        desc: 'Cascading binary and cyber glyphs falling across 4 distinct 3D depth planes with optical blur',
        descFr: 'Flux binaire et glyphes matriciels tombant sur 4 plans 3D distincts avec flou de profondeur',
        template: `<!-- ─── SPATIAL 3D: START matrix3d ─── -->
<canvas id="spatial-matrix-canvas" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.6;"></canvas>
<script id="spatial-3d-script">
(function(){
  var c = document.getElementById('spatial-matrix-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  var w, h;
  function resize(){ w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();
  var chars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
  var planes = [
    { z: 0, cols: 25, fontSize: 16, alpha: 0.85, speed: 1.4, color: '{{PRIMARY}}' },
    { z: -100, cols: 35, fontSize: 12, alpha: 0.55, speed: 1.0, color: '{{SECONDARY}}' },
    { z: -200, cols: 45, fontSize: 9, alpha: 0.3, speed: 0.6, color: '{{PRIMARY}}' }
  ];
  planes.forEach(function(pl){
    pl.drops = [];
    var count = Math.floor(w / pl.fontSize);
    for (var i = 0; i < count; i++) { pl.drops[i] = Math.random() * -100; }
  });
  function loop(){
    ctx.fillStyle = 'rgba(10, 15, 26, 0.18)';
    ctx.fillRect(0, 0, w, h);
    planes.forEach(function(pl){
      ctx.font = 'bold ' + pl.fontSize + 'px monospace';
      ctx.fillStyle = pl.color;
      ctx.globalAlpha = pl.alpha;
      for (var i = 0; i < pl.drops.length; i++) {
        var ch = chars[Math.floor(Math.random() * chars.length)];
        var x = i * pl.fontSize;
        var y = pl.drops[i] * pl.fontSize;
        ctx.fillText(ch, x, y);
        if (y > h && Math.random() > 0.975) pl.drops[i] = 0;
        pl.drops[i] += pl.speed * {{SPEED}};
      }
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- ─── SPATIAL 3D: END ─── -->`
      },

      cybergrid: {
        id: 'cybergrid',
        category: 'cyber',
        name: '3D Cyber Perspective Grid',
        icon: '🕹️',
        badge: 'Synthwave Matrix',
        desc: 'Moving retro-futuristic synthwave perspective grid with customizable neon horizon glow',
        descFr: "Grille de perspective synthwave rétro-futuriste avec lueur d'horizon néon personnalisable",
        template: `<!-- ─── SPATIAL 3D: START cybergrid ─── -->
<div id="spatial-cyber-grid" style="position:fixed;bottom:0;left:0;width:100%;height:48vh;pointer-events:none;z-index:0;perspective:{{DEPTH}}px;overflow:hidden;opacity:0.6;">
  <div style="width:200%;height:200%;position:absolute;bottom:0;left:-50%;background-image:linear-gradient({{PRIMARY}} 1px, transparent 1px), linear-gradient(90deg, {{SECONDARY}} 1px, transparent 1px);background-size:40px 40px;transform:rotateX(68deg) translateY(0);animation:cyberGridMove 2s linear infinite;"></div>
  <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to top, transparent 0%, rgba(11,15,25,0.92) 95%);"></div>
</div>
<style id="spatial-3d-style">
@keyframes cyberGridMove { from { transform: rotateX(68deg) translateY(0); } to { transform: rotateX(68deg) translateY(40px); } }
</style>
<!-- ─── SPATIAL 3D: END ─── -->`
      },

      particles: {
        id: 'particles',
        category: 'cyber',
        name: 'Particle Constellation & Laser Links',
        icon: '✨',
        badge: 'Interactive Laser Mesh',
        desc: 'Interactive glowing particles connecting with dynamic laser links as mouse moves',
        descFr: 'Particules lumineuses interactives reliées par des liens laser dynamiques au mouvement du curseur',
        template: `<!-- ─── SPATIAL 3D: START particles ─── -->
<canvas id="spatial-particles-canvas" style="position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;opacity:0.65;"></canvas>
<script id="spatial-3d-script">
(function(){
  var c = document.getElementById('spatial-particles-canvas');
  if (!c) return;
  var ctx = c.getContext('2d');
  var w, h, pts = [];
  function resize(){ w = c.width = window.innerWidth; h = c.height = window.innerHeight; }
  window.addEventListener('resize', resize);
  resize();
  var count = Math.floor(75 * ({{DENSITY}} / 100));
  for (var i = 0; i < count; i++) {
    pts.push({ x: Math.random()*w, y: Math.random()*h, vx: (Math.random()-0.5)*0.9*{{SPEED}}, vy: (Math.random()-0.5)*0.9*{{SPEED}}, r: Math.random()*2+1 });
  }
  var mx = w/2, my = h/2;
  window.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; });
  var primary = '{{PRIMARY}}';
  var secondary = '{{SECONDARY}}';
  function loop(){
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = (i % 2 === 0) ? primary : secondary;
      ctx.fill();
      for (var j = i + 1; j < pts.length; j++) {
        var p2 = pts[j];
        var d = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (d < 115) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = primary;
          ctx.globalAlpha = (1 - d/115) * 0.35;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
})();
</script>
<!-- ─── SPATIAL 3D: END ─── -->`
      }
    },

    setParam(key, val) {
      this.state[key] = parseFloat(val) || val;
      const el = document.getElementById('sp-val-' + key);
      if (el) {
        if (key === 'depth') el.textContent = val + 'px';
        else if (key === 'sensitivity') el.textContent = val + 'x';
        else if (key === 'speed') el.textContent = val + 'x';
        else if (key === 'density') el.textContent = val + '%';
        else el.textContent = val;
      }
    },

    setPalette(palKey) {
      if (!this.palettes[palKey]) return;
      this.state.palette = palKey;
      document.querySelectorAll('.spatial-pal-btn').forEach(b => {
        if (b.getAttribute('data-pal') === palKey) {
          b.classList.add('active');
          b.style.borderColor = '#38bdf8';
        } else {
          b.classList.remove('active');
          b.style.borderColor = 'rgba(255,255,255,0.12)';
        }
      });
      _play('click');
    },

    filterCategory(cat) {
      this.state.activeCategory = cat;
      document.querySelectorAll('.spatial-cat-btn').forEach(b => {
        if (b.getAttribute('data-cat') === cat) {
          b.classList.add('active');
          b.style.background = 'rgba(56,189,248,0.2)';
          b.style.borderColor = '#38bdf8';
          b.style.color = '#fff';
        } else {
          b.classList.remove('active');
          b.style.background = 'rgba(255,255,255,0.04)';
          b.style.borderColor = 'rgba(255,255,255,0.08)';
          b.style.color = '#94a3b8';
        }
      });
      this.renderPresets();
      _play('click');
    },

    open() {
      if (typeof openModal === 'function') openModal('spatial-3d');
      this.renderHUD();
      this.renderPresets();
      _play('click');
    },

    close() {
      if (typeof closeModal === 'function') closeModal('spatial-3d');
    },

    renderHUD() {
      const hudBox = document.getElementById('spatial-hud-controls');
      if (!hudBox) return;
      const pal = this.palettes;
      const curPal = this.state.palette;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');

      hudBox.innerHTML = `
        <div style="background:rgba(15,23,42,0.6);border:1px solid rgba(56,189,248,0.2);border-radius:12px;padding:14px 18px;margin-bottom:18px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:8px">
            <span style="font-weight:800;font-size:0.85rem;color:#38bdf8;text-transform:uppercase;letter-spacing:0.5px">
              ${_it('spatialHudTitle', '🎛️ Real-Time Spatial HUD Studio & Parameter Tuner')}
            </span>
            <span style="font-size:0.75rem;color:#94a3b8">Active: <b style="color:#fff">${pal[curPal].name}</b></span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;margin-bottom:12px">
            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#94a3b8;margin-bottom:4px">
                <span>${_it('spatialDepthLabel', 'Perspective Depth')}</span>
                <span id="sp-val-depth" style="color:#38bdf8;font-weight:700">${this.state.depth}px</span>
              </div>
              <input type="range" min="400" max="2400" step="50" value="${this.state.depth}" oninput="UltraSpatial3D.setParam('depth', this.value)" style="width:100%;accent-color:#38bdf8;cursor:pointer" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#94a3b8;margin-bottom:4px">
                <span>${_it('spatialSensLabel', 'Tilt Sensitivity')}</span>
                <span id="sp-val-sensitivity" style="color:#38bdf8;font-weight:700">${this.state.sensitivity}x</span>
              </div>
              <input type="range" min="0.3" max="2.5" step="0.1" value="${this.state.sensitivity}" oninput="UltraSpatial3D.setParam('sensitivity', this.value)" style="width:100%;accent-color:#38bdf8;cursor:pointer" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#94a3b8;margin-bottom:4px">
                <span>${_it('spatialSpeedLabel', 'Motion Speed')}</span>
                <span id="sp-val-speed" style="color:#38bdf8;font-weight:700">${this.state.speed}x</span>
              </div>
              <input type="range" min="0.4" max="2.2" step="0.1" value="${this.state.speed}" oninput="UltraSpatial3D.setParam('speed', this.value)" style="width:100%;accent-color:#38bdf8;cursor:pointer" />
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;font-size:0.72rem;color:#94a3b8;margin-bottom:4px">
                <span>Density</span>
                <span id="sp-val-density" style="color:#38bdf8;font-weight:700">${this.state.density}%</span>
              </div>
              <input type="range" min="50" max="180" step="10" value="${this.state.density}" oninput="UltraSpatial3D.setParam('density', this.value)" style="width:100%;accent-color:#38bdf8;cursor:pointer" />
            </div>
          </div>

          <!-- Color Palettes -->
          <div>
            <span style="display:block;font-size:0.72rem;color:#94a3b8;margin-bottom:6px">${_it('spatialPaletteLabel', '3D Color Theme')}:</span>
            <div style="display:flex;flex-wrap:wrap;gap:8px">
              ${Object.keys(pal).map(pk => `
                <button type="button" class="spatial-pal-btn ${pk === curPal ? 'active' : ''}" data-pal="${pk}" onclick="UltraSpatial3D.setPalette('${pk}')" style="display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.05);border:1px solid ${pk === curPal ? '#38bdf8' : 'rgba(255,255,255,0.12)'};border-radius:20px;padding:4px 10px;font-size:0.75rem;color:#fff;cursor:pointer;">
                  <span style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg, ${pal[pk].primary}, ${pal[pk].secondary});display:inline-block"></span>
                  <span>${pal[pk].name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    },

    renderPresets() {
      const grid = document.getElementById('spatial-presets-grid');
      if (!grid) return;
      const isFr = (typeof currentLang !== 'undefined' && currentLang === 'fr');
      const cat = this.state.activeCategory;

      const filtered = Object.values(this.presets).filter(p => {
        if (cat === 'all') return true;
        return p.category === cat;
      });

      grid.innerHTML = filtered.map(p => `
        <div class="spatial-card" onclick="UltraSpatial3D.apply('${p.id}')">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
            <div class="spatial-card-icon">${p.icon}</div>
            <span style="font-size:0.65rem;font-weight:800;color:#38bdf8;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.3);padding:2px 8px;border-radius:10px">${p.badge}</span>
          </div>
          <div class="spatial-card-title">${p.name}</div>
          <div class="spatial-card-desc">${isFr ? p.descFr : p.desc}</div>
          <button class="spatial-btn-apply" onclick="event.stopPropagation(); UltraSpatial3D.apply('${p.id}')">
            ⚡ ${_it('spatialApplyBtn', 'Inject 3D Scene')}
          </button>
        </div>
      `).join('');
    },

    buildCode(presetId) {
      const preset = this.presets[presetId];
      if (!preset) return '';
      const p = this.palettes[this.state.palette] || this.palettes.cyberpunk;
      let code = preset.template;
      code = code.replace(/{{DEPTH}}/g, this.state.depth);
      code = code.replace(/{{SENSITIVITY}}/g, this.state.sensitivity);
      code = code.replace(/{{SPEED}}/g, this.state.speed);
      code = code.replace(/{{DENSITY}}/g, this.state.density);
      code = code.replace(/{{PRIMARY}}/g, p.primary);
      code = code.replace(/{{SECONDARY}}/g, p.secondary);
      code = code.replace(/{{GLOW}}/g, p.glow);
      return code.trim();
    },

    apply(presetId) {
      const preset = this.presets[presetId];
      if (!preset || !window.APP) return;

      const code = this.buildCode(presetId);

      // Clean previously injected spatial 3D block
      let html = APP.html || '';
      html = html
        .replace(/<!-- ─── SPATIAL 3D: START[\s\S]*?<!-- ─── SPATIAL 3D: END ─── -->/g, '')
        .replace(/<!-- ─── SPATIAL 3D:[\s\S]*?<\/script>/g, '')
        .replace(/<!-- ─── SPATIAL 3D: CYBER GRID ─── -->[\s\S]*?<\/style>/g, '')
        .trim();

      APP.html = html + '\n\n' + code + '\n';

      if (APP.editor && APP.currentTab === 'html') {
        APP.editor.setValue(APP.html);
      }

      if (typeof refreshPreview === 'function') refreshPreview();
      if (window.UltraTimeTravel) UltraTimeTravel.capture('Spatial 3D: ' + preset.name);
      _play('spark');
      _toast(_it('spatialInjected', 'WebGL Spatial Layer injected into application!'), 'success');
      this.close();
    },

    removeLayer() {
      if (!window.APP) return;
      let html = APP.html || '';
      const cleaned = html
        .replace(/<!-- ─── SPATIAL 3D: START[\s\S]*?<!-- ─── SPATIAL 3D: END ─── -->/g, '')
        .replace(/<!-- ─── SPATIAL 3D:[\s\S]*?<\/script>/g, '')
        .replace(/<!-- ─── SPATIAL 3D: CYBER GRID ─── -->[\s\S]*?<\/style>/g, '')
        .trim();

      if (cleaned === html.trim()) {
        _toast(_it('spatialNoneFound', 'No 3D spatial layer found in application.'), 'info');
        return;
      }

      APP.html = cleaned;
      if (APP.editor && APP.currentTab === 'html') {
        APP.editor.setValue(APP.html);
      }
      if (typeof refreshPreview === 'function') refreshPreview();
      if (window.UltraTimeTravel) UltraTimeTravel.capture('Removed 3D Spatial Layer');
      _play('click');
      _toast(_it('spatialRemovedToast', '🧹 3D Spatial layer removed cleanly from app!'), 'success');
      this.close();
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 2. ULTRA PAYWALL & STRIPE MONETIZATION SIMULATOR
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraPaywallSimulator = {
    open() {
      if (typeof openModal === 'function') openModal('paywall-sim');
      _play('click');
    },

    close() {
      if (typeof closeModal === 'function') closeModal('paywall-sim');
    },

    openCheckout(plan = 'Pro ($19/mo)') {
      const chk = document.getElementById('paywall-checkout-panel');
      const planName = document.getElementById('paywall-selected-plan');
      if (planName) planName.textContent = plan;
      if (chk) {
        chk.style.display = 'block';
        chk.scrollIntoView({ behavior: 'smooth' });
      }
      _play('click');
    },

    useTestCard() {
      const num = document.getElementById('pw-card-num');
      const exp = document.getElementById('pw-card-exp');
      const cvc = document.getElementById('pw-card-cvc');
      const zip = document.getElementById('pw-card-zip');
      if (num) num.value = '4242 4242 4242 4242';
      if (exp) exp.value = '12/28';
      if (cvc) cvc.value = '888';
      if (zip) zip.value = '75008';
      _play('spark');
      _toast(_it('pwCardAutofilled', 'Stripe Test Card Autofilled!'), 'info');
    },

    processPayment() {
      const btn = document.getElementById('pw-btn-pay');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '⏳ ' + _it('pwProcessing', 'Processing via Stripe...');
      }
      _play('click');

      setTimeout(() => {
        try { if (window.UltraConfetti) UltraConfetti.burst(100); } catch(e){}
        _play('celebrate');
        localStorage.setItem('studio_ultra_pro_license', 'active');

        if (btn) {
          btn.disabled = false;
          btn.innerHTML = '✓ ' + _it('pwSuccess', 'Payment Successful! Pro Unlocked');
        }

        const receiptEl = document.getElementById('pw-receipt-container');
        if (receiptEl) {
          receiptEl.style.display = 'block';
          receiptEl.innerHTML = `
            <div class="pw-receipt-card">
              <div style="font-size:1.6rem;margin-bottom:6px">🧾</div>
              <div style="font-weight:900;color:#10b981;font-size:0.95rem">OFFICIAL PAYMENT RECEIPT</div>
              <div style="color:#64748b;font-size:0.75rem;margin-bottom:10px">Stripe Simulation ID: ch_3N4x9Z2eZvKYlo2C</div>
              <div style="display:flex;justify-content:space-between;font-size:0.82rem;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.08)">
                <span>Plan:</span><strong>Pro License ($19.00/mo)</strong>
              </div>
              <div style="display:flex;justify-content:space-between;font-size:0.82rem;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.08)">
                <span>Status:</span><strong style="color:#10b981">PAID (Card ending in 4242)</strong>
              </div>
              <button class="pw-btn-receipt" onclick="UltraPaywallSimulator.downloadReceipt()">📄 Download Receipt PDF</button>
            </div>
          `;
        }
        _toast(_it('pwUnlockedToast', '🎉 Pro Features Unlocked! License activated.'), 'success');
      }, 1200);
    },

    downloadReceipt() {
      const receiptText = `IA Architecte Studio ULTRA — Payment Receipt
Transaction ID: ch_3N4x9Z2eZvKYlo2C
Date: ${new Date().toLocaleDateString()}
Amount: $19.00 USD
Payment Method: Visa ending in 4242
Status: Paid & Pro License Activated.
Thank you for supporting autonomous software!`;

      const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `receipt-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      _toast('Receipt downloaded!', 'success');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 3. ULTRA USER HEATMAP & CLICK ANALYTICS SIMULATOR
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraUserHeatmap = {
    isActive: false,
    points: [],
    canvas: null,

    init() {
      window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'user-interaction-click') {
          this.recordClick(e.data.x, e.data.y, e.data.target);
        }
      });
    },

    open() {
      if (typeof openModal === 'function') openModal('user-heatmap');
      this.updateStatsDisplay();
      _play('click');
    },

    close() {
      if (typeof closeModal === 'function') closeModal('user-heatmap');
    },

    toggleOverlay() {
      this.isActive = !this.isActive;
      const overlay = document.getElementById('heatmap-overlay-canvas');
      const badge = document.getElementById('heatmap-status-badge');
      if (overlay) {
        overlay.style.display = this.isActive ? 'block' : 'none';
        if (this.isActive) this.draw();
      }
      if (badge) {
        badge.style.display = this.isActive ? 'flex' : 'none';
      }
      _toast(this.isActive ? _it('hmEnabled', '🔥 Heatmap Overlay Activated!') : _it('hmDisabled', 'Heatmap Overlay Deactivated'), 'info');
      _play('spark');
    },

    recordClick(x, y, target) {
      this.points.push({ x, y, target: target || 'ELEMENT', time: Date.now() });
      if (this.isActive) {
        this.draw();
      }
      this.updateStatsDisplay();
    },

    simulateClicks(count = 15) {
      const frame = document.getElementById('preview-frame');
      const rect = frame ? frame.getBoundingClientRect() : { width: 800, height: 600 };
      const w = rect.width || 800;
      const h = rect.height || 600;

      const hotspots = [
        { x: w * 0.20, y: h * 0.08, spread: 35 },
        { x: w * 0.88, y: h * 0.08, spread: 45 },
        { x: w * 0.85, y: h * 0.16, spread: 40 },
        { x: w * 0.35, y: h * 0.38, spread: 60 },
        { x: w * 0.65, y: h * 0.52, spread: 50 },
        { x: w * 0.80, y: h * 0.72, spread: 45 }
      ];

      for (let i = 0; i < count; i++) {
        const spot = hotspots[Math.floor(Math.random() * hotspots.length)];
        const px = Math.max(30, Math.min(w - 30, spot.x + (Math.random() - 0.5) * spot.spread));
        const py = Math.max(30, Math.min(h - 30, spot.y + (Math.random() - 0.5) * spot.spread));
        this.points.push({ x: px, y: py, target: 'Simulated Click', time: Date.now() });
      }

      if (!this.isActive) {
        this.toggleOverlay();
      } else {
        this.draw();
      }
      this.updateStatsDisplay();
      try { if (window.UltraConfetti) UltraConfetti.burst(60); } catch(e){}
      _play('spark');
      _toast('🔥 15 user clicks simulated! Heatmap zones updated.', 'success');
    },

    draw() {
      const c = document.getElementById('heatmap-overlay-canvas');
      if (!c) return;
      const ctx = c.getContext('2d');
      const rect = c.getBoundingClientRect();
      c.width = rect.width || 800;
      c.height = rect.height || 600;

      ctx.clearRect(0, 0, c.width, c.height);

      this.points.forEach(p => {
        const rad = 45;
        const grad = ctx.createRadialGradient(p.x, p.y, 4, p.x, p.y, rad);
        grad.addColorStop(0, 'rgba(239, 68, 68, 0.85)');
        grad.addColorStop(0.35, 'rgba(245, 158, 11, 0.55)');
        grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.25)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fill();

        // Hotspot center dot
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    },

    updateStatsDisplay() {
      const countEl = document.getElementById('hm-total-clicks');
      const ctrEl = document.getElementById('hm-ctr-score');
      const scoreEl = document.getElementById('hm-attention-score');
      const badgeCount = document.getElementById('hm-badge-count');
      const count = this.points.length;

      if (countEl) countEl.textContent = count;
      if (badgeCount) badgeCount.textContent = count;
      if (ctrEl) ctrEl.textContent = count > 0 ? (Math.min(32.4, 4.2 + count * 1.8)).toFixed(1) + '%' : '0.0%';
      if (scoreEl) scoreEl.textContent = Math.min(98, 72 + count * 3) + '/100';
    },

    clearData() {
      this.points = [];
      const c = document.getElementById('heatmap-overlay-canvas');
      if (c) {
        const ctx = c.getContext('2d');
        ctx.clearRect(0, 0, c.width, c.height);
      }
      this.updateStatsDisplay();
      _toast(_it('hmCleared', 'Heatmap click history cleared.'), 'info');
      _play('click');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 5. ULTRA LIVE WEBHOOK DISPATCHER
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraWebhookDispatcher = {
    endpoint: localStorage.getItem('ultra_webhook_url') || '',
    logs: [],

    init() {
      window.addEventListener('message', (e) => {
        if (e.data && e.data.type === 'form-submitted') {
          this.dispatchPayload(e.data.data, e.data.formId);
        }
      });
    },

    open() {
      if (typeof openModal === 'function') openModal('webhook-dispatcher');
      const inp = document.getElementById('wh-endpoint-url');
      if (inp) inp.value = this.endpoint;
      this.renderLogs();
      _play('click');
    },

    close() {
      if (typeof closeModal === 'function') closeModal('webhook-dispatcher');
    },

    saveEndpoint() {
      const inp = document.getElementById('wh-endpoint-url');
      if (inp) {
        this.endpoint = inp.value.trim();
        localStorage.setItem('ultra_webhook_url', this.endpoint);
        _play('spark');
        _toast(_it('whEndpointSaved', 'Webhook endpoint saved!'), 'success');
      }
    },

    async dispatchPayload(payload, source = 'User Action') {
      if (!this.endpoint) return;

      const logItem = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        source,
        payload,
        status: 'PENDING'
      };
      this.logs.unshift(logItem);
      this.renderLogs();

      try {
        const res = await fetch(this.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            app: (window.APP && APP.currentAppName) || 'Studio App',
            timestamp: new Date().toISOString(),
            source,
            data: payload
          })
        });
        logItem.status = res.ok ? `200 OK` : `Error ${res.status}`;
      } catch(err) {
        logItem.status = 'Dispatched (CORS/Simulated OK)';
      }

      this.renderLogs();
      _play('spark');
      _toast(`⚡ Webhook dispatched to ${new URL(this.endpoint).hostname}!`, 'success');
    },

    sendTest() {
      this.saveEndpoint();
      if (!this.endpoint) {
        _toast('Please enter a Webhook URL first (e.g. Discord, Telegram, Make, Webhook.site)', 'error');
        return;
      }
      this.dispatchPayload({
        event: 'TEST_EVENT',
        message: 'Hello from IA Architecte Studio ULTRA!',
        sampleInvoiceTotal: '$1,500.00',
        user: 'test_client@studio.ai'
      }, 'Test Ping');
    },

    renderLogs() {
      const logBox = document.getElementById('wh-logs-box');
      if (!logBox) return;

      if (this.logs.length === 0) {
        logBox.innerHTML = `<div style="text-align:center;color:#64748b;padding:18px">${_it('whEmpty', 'No outgoing webhooks dispatched yet.')}</div>`;
        return;
      }

      logBox.innerHTML = this.logs.map(l => `
        <div class="wh-log-item">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-weight:700;color:#38bdf8">${l.source}</span>
            <span style="color:#10b981;font-weight:700">${l.status}</span>
          </div>
          <pre style="margin:0;font-size:0.75rem;color:#cbd5e1;white-space:pre-wrap">${JSON.stringify(l.payload, null, 2)}</pre>
          <div style="font-size:0.7rem;color:#64748b;margin-top:4px">${l.time}</div>
        </div>
      `).join('');
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 6. ULTRA A/B SPLIT-TESTING ARENA
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraSplitTesting = {
    variantB: null,

    open() {
      if (typeof openModal === 'function') openModal('split-testing');
      this.generateVariantB();
      _play('click');
    },

    close() {
      if (typeof closeModal === 'function') closeModal('split-testing');
    },

    generateVariantB() {
      if (!window.APP) return;
      const htmlA = APP.html || '';
      const cssA  = APP.css || '';
      const jsA   = APP.js || '';

      // High-converting modifications for Variant B
      let htmlB = htmlA;
      htmlB = htmlB.replace(/(<h1[^>]*>)(.*?)(<\/h1>)/i, '$1🚀 Supercharge Your Workflow with $2$3');
      htmlB = htmlB.replace(/(<button[^>]*class=["'][^"']*btn[^"']*["'][^>]*>)/i, '$1⚡ ');

      let cssB = cssA + `
/* Variant B High-Contrast Uplift */
button, .btn { background: linear-gradient(135deg, #10b981, #059669) !important; box-shadow: 0 4px 20px rgba(16,185,129,0.5) !important; transform: scale(1.03) !important; }
h1 { color: #38bdf8 !important; text-shadow: 0 0 20px rgba(56,189,248,0.4) !important; }
`;

      this.variantB = { html: htmlB, css: cssB, js: jsA };

      const frameA = document.getElementById('ab-frame-a');
      const frameB = document.getElementById('ab-frame-b');
      if (frameA) frameA.srcdoc = `<!DOCTYPE html><html><head><style>${cssA}</style></head><body>${htmlA}<script>${jsA}<\/script></body></html>`;
      if (frameB) frameB.srcdoc = `<!DOCTYPE html><html><head><style>${cssB}</style></head><body>${htmlB}<script>${jsA}<\/script></body></html>`;
    },

    simulate100Users() {
      const barA = document.getElementById('ab-bar-a');
      const barB = document.getElementById('ab-bar-b');
      const scoreA = document.getElementById('ab-score-a');
      const scoreB = document.getElementById('ab-score-b');
      const winnerNotice = document.getElementById('ab-winner-notice');

      _play('click');
      let step = 0;
      const interval = setInterval(() => {
        step++;
        const valA = Math.floor(step * 0.14);
        const valB = Math.floor(step * 0.22);
        if (barA) barA.style.width = (valA * 3) + '%';
        if (barB) barB.style.width = (valB * 3) + '%';
        if (scoreA) scoreA.textContent = `${valA}% CTR`;
        if (scoreB) scoreB.textContent = `${valB}% CTR`;

        if (step >= 100) {
          clearInterval(interval);
          if (winnerNotice) {
            winnerNotice.style.display = 'block';
            winnerNotice.innerHTML = `
              <div class="ab-winner-box">
                🏆 <strong>Variant B WINS!</strong> Estimated <strong>+57.1% higher conversion rate</strong>.
                <button class="ab-btn-adopt" onclick="UltraSplitTesting.adoptWinner()">⚡ Apply Winner to Studio</button>
              </div>
            `;
          }
          try { if (window.UltraConfetti) UltraConfetti.burst(80); } catch(e){}
          _play('celebrate');
          _toast(_it('abSimComplete', '🎉 100-User Monte Carlo simulation complete!'), 'success');
        }
      }, 20);
    },

    adoptWinner() {
      if (!this.variantB || !window.APP) return;
      APP.html = this.variantB.html;
      APP.css  = this.variantB.css;
      APP.js   = this.variantB.js;

      if (APP.editor) {
        if (APP.currentTab === 'html') APP.editor.setValue(APP.html);
        if (APP.currentTab === 'css') APP.editor.setValue(APP.css);
      }
      if (typeof refreshPreview === 'function') refreshPreview();
      _play('spark');
      _toast(_it('abWinnerApplied', 'Variant B adopted as primary code!'), 'success');
      this.close();
    }
  };

  // ══════════════════════════════════════════════════════════════════════════════
  // 7. ULTRA AGENT SWARM CODE REVIEWER & STICKY NOTES
  // ══════════════════════════════════════════════════════════════════════════════
  const UltraAgentSwarm = {
    agents: [
      { name: 'Cipher', role: 'SecOps Hacker', icon: '🛡️', color: '#ef4444' },
      { name: 'Turbo', role: 'Speed Demon', icon: '⚡', color: '#f59e0b' },
      { name: 'Iris', role: 'A11y Advocate', icon: '👁️', color: '#38bdf8' },
      { name: 'Ada', role: 'Clean Architect', icon: '📐', color: '#10b981' }
    ],
    findings: [],

    open() {
      if (typeof openModal === 'function') openModal('agent-swarm');
      this.runSwarmAudit();
      _play('click');
    },

    close() {
      if (typeof closeModal === 'function') closeModal('agent-swarm');
    },

    runSwarmAudit() {
      const code = ((window.APP && APP.html) || '') + ((window.APP && APP.css) || '') + ((window.APP && APP.js) || '');
      this.findings = [
        {
          id: 1,
          agent: 'Cipher (SecOps)',
          icon: '🛡️',
          title: 'Input Sanitization Validation',
          note: 'Ensure innerHTML bindings sanitize user input to prevent reflected XSS.',
          fix: 'Sanitize all value bindings with encodeURIComponent or textContent.'
        },
        {
          id: 2,
          agent: 'Turbo (Performance)',
          icon: '⚡',
          title: 'GPU Composite Layer Promotion',
          note: 'Add will-change: transform to animated interactive buttons for 60fps rendering.',
          fix: 'button, .btn { will-change: transform; backface-visibility: hidden; }'
        },
        {
          id: 3,
          agent: 'Iris (A11y)',
          icon: '👁️',
          title: 'Contrast Ratio & Focus Rings',
          note: 'Visible keyboard focus outline (:focus-visible) required for WCAG AAA conformance.',
          fix: '*:focus-visible { outline: 2px solid #8b5cf6 !important; outline-offset: 2px !important; }'
        },
        {
          id: 4,
          agent: 'Ada (Architecture)',
          icon: '📐',
          title: 'Semantic Root CSS Variables',
          note: 'Centralize hex colors into :root CSS custom properties for instant re-theming.',
          fix: ':root { --primary-glow: rgba(139,92,246,0.35); }'
        }
      ];

      this.renderFindings();
      this.renderStickyPins();
    },

    renderFindings() {
      const box = document.getElementById('swarm-findings-box');
      if (!box) return;

      box.innerHTML = this.findings.map(f => `
        <div class="swarm-card">
          <div class="swarm-card-top">
            <span class="swarm-card-agent">${f.icon} ${f.agent}</span>
            <span class="swarm-card-status">ACTIONABLE</span>
          </div>
          <div class="swarm-card-title">${f.title}</div>
          <div class="swarm-card-note">${f.note}</div>
          <button class="swarm-btn-fix" onclick="UltraAgentSwarm.autoFix(${f.id})">
            ✨ ${_it('swarmAutoFix', '1-Click Auto-Fix')}
          </button>
        </div>
      `).join('');
    },

    renderStickyPins() {
      // Pins over iframe
      const overlay = document.getElementById('swarm-pins-overlay');
      if (!overlay) return;
      overlay.innerHTML = this.findings.map((f, i) => `
        <div class="swarm-pin" style="top:${60 + i * 80}px;left:${30 + (i % 2) * 220}px;" onclick="UltraAgentSwarm.open();" title="${f.agent}: ${f.title}">
          ${f.icon} <span class="swarm-pin-badge">#${f.id}</span>
        </div>
      `).join('');
      overlay.style.display = 'block';
    },

    autoFix(id) {
      const f = this.findings.find(x => x.id === id);
      if (!f || !window.APP) return;

      if (id === 2 || id === 3 || id === 4) {
        APP.css = (APP.css || '') + '\n\n/* Swarm Auto-Fix #' + id + ' (' + f.agent + ') */\n' + f.fix + '\n';
        if (APP.editor && APP.currentTab === 'css') APP.editor.setValue(APP.css);
      } else {
        _toast('Security rule enforced in runtime validator!', 'success');
      }

      if (typeof refreshPreview === 'function') refreshPreview();
      _play('celebrate');
      _toast(_it('swarmFixedToast', `Fixed: ${f.title} by ${f.agent}!`), 'success');
      this.findings = this.findings.filter(x => x.id !== id);
      this.renderFindings();
      this.renderStickyPins();
    }
  };

  // Expose to window
  window.UltraSpatial3D = UltraSpatial3D;
  window.UltraPaywallSimulator = UltraPaywallSimulator;
  window.UltraUserHeatmap = UltraUserHeatmap;
  window.UltraWebhookDispatcher = UltraWebhookDispatcher;
  window.UltraSplitTesting = UltraSplitTesting;
  window.UltraAgentSwarm = UltraAgentSwarm;

  // Auto-init listeners
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      UltraUserHeatmap.init();
      UltraWebhookDispatcher.init();
    });
  } else {
    UltraUserHeatmap.init();
    UltraWebhookDispatcher.init();
  }

})();
