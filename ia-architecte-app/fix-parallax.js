const fs = require('fs');
let fileContent = fs.readFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', 'utf8');

const oldParallax = `  parallaxengine: \`<!-- PARALLAX ENGINE START -->
<div id="parallax-wrap" style="background:linear-gradient(#0284c7, #38bdf8); width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <div style="position:absolute; top:20px; left:20px; color:#fff; font-family:monospace; z-index:10; pointer-events:none;">
    <h3>🌄 PARALLAX SCROLLING</h3>
    <p>Move mouse horizontally to shift layers.</p>
  </div>
  <!-- Sun -->
  <div style="position:absolute; width:80px; height:80px; background:#fef08a; border-radius:50%; top:50px; left:50%; transform:translateX(-50%); box-shadow:0 0 50px #fef08a;"></div>
  <!-- Layers -->
  <div id="layer-back" style="position:absolute; bottom:0; width:200%; height:200px; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 1000 200" xmlns="http://www.w3.org/2000/svg"><path d="M0 200 L0 100 Q100 50 200 150 T400 100 T600 180 T800 120 T1000 150 L1000 200 Z" fill="%23334155"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
  <div id="layer-mid" style="position:absolute; bottom:0; width:200%; height:150px; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 1000 150" xmlns="http://www.w3.org/2000/svg"><path d="M0 150 L0 50 Q100 100 200 30 T400 80 T600 40 T800 100 T1000 60 L1000 150 Z" fill="%23475569"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
  <div id="layer-front" style="position:absolute; bottom:0; width:200%; height:100px; background:url('data:image/svg+xml;utf8,<svg viewBox="0 0 1000 100" xmlns="http://www.w3.org/2000/svg"><path d="M0 100 L0 50 Q100 80 200 20 T400 50 T600 10 T800 60 T1000 40 L1000 100 Z" fill="%231e293b"/></svg>') repeat-x; transition: transform 0.1s linear;"></div>
</div>
<script>
  const wrap = document.getElementById('parallax-wrap');
  const lb = document.getElementById('layer-back');
  const lm = document.getElementById('layer-mid');
  const lf = document.getElementById('layer-front');
  
  wrap.addEventListener('mousemove', e => {
    const percent = e.clientX / window.innerWidth - 0.5;
    lb.style.transform = 'translateX(' + (-percent * 20) + 'px)';
    lm.style.transform = 'translateX(' + (-percent * 60) + 'px)';
    lf.style.transform = 'translateX(' + (-percent * 150) + 'px)';
  });
</script>
<!-- PARALLAX ENGINE END -->\``;

const newParallax = `  parallaxengine: \`<!-- PARALLAX ENGINE START -->
<style>
  .plx-layer { position:absolute; bottom:0; width:200%; transition: transform 0.1s linear; }
  #layer-back { height:200px; background:url("data:image/svg+xml;utf8,<svg viewBox='0 0 1000 200' xmlns='http://www.w3.org/2000/svg'><path d='M0 200 L0 100 Q100 50 200 150 T400 100 T600 180 T800 120 T1000 150 L1000 200 Z' fill='%23334155'/></svg>") repeat-x; }
  #layer-mid { height:150px; background:url("data:image/svg+xml;utf8,<svg viewBox='0 0 1000 150' xmlns='http://www.w3.org/2000/svg'><path d='M0 150 L0 50 Q100 100 200 30 T400 80 T600 40 T800 100 T1000 60 L1000 150 Z' fill='%23475569'/></svg>") repeat-x; }
  #layer-front { height:100px; background:url("data:image/svg+xml;utf8,<svg viewBox='0 0 1000 100' xmlns='http://www.w3.org/2000/svg'><path d='M0 100 L0 50 Q100 80 200 20 T400 50 T600 10 T800 60 T1000 40 L1000 100 Z' fill='%231e293b'/></svg>") repeat-x; }
</style>
<div id="parallax-wrap" style="background:linear-gradient(#0284c7, #38bdf8); width:100%; min-width:300px; height:400px; position:relative; overflow:hidden; border-radius:12px; margin-top:20px;">
  <div style="position:absolute; top:20px; left:20px; color:#fff; font-family:monospace; z-index:10; pointer-events:none;">
    <h3>🌄 PARALLAX SCROLLING</h3>
    <p>Move mouse horizontally to shift layers.</p>
  </div>
  <!-- Sun -->
  <div style="position:absolute; width:80px; height:80px; background:#fef08a; border-radius:50%; top:50px; left:50%; transform:translateX(-50%); box-shadow:0 0 50px #fef08a;"></div>
  <!-- Layers -->
  <div id="layer-back" class="plx-layer"></div>
  <div id="layer-mid" class="plx-layer"></div>
  <div id="layer-front" class="plx-layer"></div>
</div>
<script>
  const wrap = document.getElementById('parallax-wrap');
  const lb = document.getElementById('layer-back');
  const lm = document.getElementById('layer-mid');
  const lf = document.getElementById('layer-front');
  
  wrap.addEventListener('mousemove', e => {
    const percent = e.clientX / window.innerWidth - 0.5;
    lb.style.transform = 'translateX(' + (-percent * 20) + 'px)';
    lm.style.transform = 'translateX(' + (-percent * 60) + 'px)';
    lf.style.transform = 'translateX(' + (-percent * 150) + 'px)';
  });
</script>
<!-- PARALLAX ENGINE END -->\``;

fileContent = fileContent.replace(oldParallax, newParallax);

fs.writeFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', fileContent);
