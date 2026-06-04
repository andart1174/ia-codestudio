(function() {
'use strict';
var TX = {
  en: { tab: 'WebGL Ripple', title: '🌊 WebGL Ripple FX', sub: 'Liquid Image Distortion', desc: 'Converts standard images into interactive WebGL canvases that ripple and distort like water when hovered.', apply: '➕ Inject WebGL Engine', applied: '✅ Ripple Engine Injected!' },
  fr: { tab: 'Ondulation', title: '🌊 Effet WebGL Ripple', sub: "Distorsion Liquide d'Image", desc: "Convertit les images standard en toiles WebGL interactives qui ondulent comme de l'eau au survol.", apply: '➕ Injecter Moteur WebGL', applied: '✅ Moteur Ripple Injecté!' }
};
function gl() { return window.lang || 'en'; }
function t(k) { return (TX[gl()] || TX.en)[k] || k; }

var snippet = `<!-- WEBGL RIPPLE ENGINE START -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
window.addEventListener('load', () => {
  document.querySelectorAll('.ia-ripple-img').forEach(img => {
    const w = img.clientWidth || 300, h = img.clientHeight || 200;
    const src = img.src;
    img.style.opacity = 0;
    
    const wrapper = document.createElement('div');
    wrapper.style.cssText = \`width:\${w}px; height:\${h}px; position:relative; display:inline-block;\`;
    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);
    
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-w/2, w/2, h/2, -h/2, 1, 1000);
    camera.position.z = 1;
    const renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setSize(w, h);
    renderer.domElement.style.cssText = 'position:absolute;top:0;left:0;pointer-events:none;';
    wrapper.appendChild(renderer.domElement);
    
    const tex = new THREE.TextureLoader().load(src);
    const material = new THREE.ShaderMaterial({
      uniforms: { tDiffuse: {value: tex}, uTime: {value: 0}, uHover: {value: 0} },
      vertexShader: \`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }\`,
      fragmentShader: \`uniform sampler2D tDiffuse; uniform float uTime; uniform float uHover; varying vec2 vUv;
        void main() {
          vec2 uv = vUv;
          uv.y += sin(uv.x * 10.0 + uTime) * 0.05 * uHover;
          gl_FragColor = texture2D(tDiffuse, uv);
        }\`
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    scene.add(mesh);
    
    let hover = 0;
    wrapper.onmouseenter = () => hover = 1;
    wrapper.onmouseleave = () => hover = 0;
    
    function anim(t) {
      requestAnimationFrame(anim);
      material.uniforms.uTime.value = t * 0.005;
      material.uniforms.uHover.value += (hover - material.uniforms.uHover.value) * 0.1;
      renderer.render(scene, camera);
    }
    anim(0);
  });
});
</script>
<div style="padding: 50px; background: #0f172a; text-align: center;">
  <h2 style="color:white; margin-bottom: 20px;">Hover the image!</h2>
  <img class="ia-ripple-img" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80" width="600" height="400" style="border-radius:10px; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
</div>
<!-- WEBGL RIPPLE ENGINE END -->`;

function renderTab() {
  var parent = document.getElementById('left-body');
  if (!parent) return;
  parent.innerHTML = '';
  
  var w = document.createElement('div');
  w.style.cssText = 'padding:15px;color:#fff;font-family:sans-serif;';
  w.innerHTML = '<h2 style="margin:0 0 5px;color:#34d399;font-size:16px;">'+t('title')+'</h2><p style="font-size:11px;color:#94a3b8;margin:0 0 15px;">'+t('sub')+'</p><p style="font-size:12px;color:#cbd5e1;line-height:1.5;margin-bottom:20px;">'+t('desc')+'</p>';
  
  var btn = document.createElement('button');
  btn.textContent = t('apply');
  btn.style.cssText = 'width:100%;padding:10px;background:linear-gradient(90deg,#059669,#10b981);border:none;border-radius:8px;color:#fff;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(16,185,129,0.3);';
  btn.onclick = function() {
    if(!window.editor) return;
    var code = window.editor.getValue();
    if(code.indexOf('ia-ripple-img') !== -1 && code.indexOf('THREE.Scene') !== -1) { if(window.showToast) window.showToast('Already injected!'); return; }
    if(code.indexOf('</body>') !== -1) code = code.replace('</body>', snippet + '\\n</body>');
    else code += '\\n' + snippet;
    window.editor.setValue(code);
    if(window.runPreview) window.runPreview();
    if(window.showToast) window.showToast(t('applied'));
  };
  
  var demo = document.createElement('div');
  demo.style.cssText = 'margin-top:20px;padding:10px;background:rgba(255,255,255,0.05);border-radius:8px;font-size:11px;color:#94a3b8;';
  demo.innerHTML = '<b>Usage / Utilisation:</b><br><br>&lt;img class="ia-ripple-img" src="image.jpg" width="300" height="200"&gt;';
  
  w.appendChild(btn);
  w.appendChild(demo);
  parent.appendChild(w);
}

document.addEventListener('DOMContentLoaded', function() {
  var oAL = window.applyLang;
  window.applyLang = function() {
    if(oAL) oAL();
    var el = document.getElementById('lbl-tab-webgldistort');
    if(el) el.textContent = t('tab');
    if(window.activeTab === 'webgldistort') renderTab();
  };
  var oRT = window.renderTab;
  window.renderTab = function(tab) {
    if(tab === 'webgldistort') {
      window.activeTab = 'webgldistort';
      document.querySelectorAll('.ltab').forEach(function(b){ b.classList.remove('active'); });
      var b = document.getElementById('tab-webgldistort');
      if(b) b.classList.add('active');
      renderTab();
      return;
    }
    if(oRT) oRT(tab);
  };
});
})();
