/**
 * Studio 3D/4D Pro v2.0 — E-Commerce Interactive Product Configurator & 3D Hotspot Builder
 * Place clickable 3D hotspots + color finish variants and export a standalone Shopify/WordPress-ready 3D widget!
 */
(function () {
  'use strict';

  let drawer = null;
  let hotspotGroup = null;
  const hotspots = [
    { title: 'Titanium Core', desc: 'Aerospace-grade milled finish with anti-scratch coat.', price: '$299', pos: [0, 28, 22] },
    { title: 'Optical Halo', desc: '360° dynamic refractive ring with micro-LED accent.', price: 'Included', pos: [34, 4, 18] }
  ];
  const variants = [
    { name: 'Cyber Indigo', color: '#6366f1' },
    { name: 'Luxury Gold', color: '#f5b942' },
    { name: 'Titanium Ice', color: '#38bdf8' },
    { name: 'Stealth Carbon', color: '#1e293b' },
    { name: 'Crimson Pro', color: '#f43f5e' }
  ];

  function isFR() { return (window.currentLang || 'en') === 'fr'; }

  function syncHotspotPins() {
    const scn = window.SketchExtruder && window.SketchExtruder.getScene ? window.SketchExtruder.getScene() : null;
    if (!scn) return;
    if (hotspotGroup) {
      scn.remove(hotspotGroup);
      if (window.SketchExtruder.disposeObject3D) window.SketchExtruder.disposeObject3D(hotspotGroup);
    }
    hotspotGroup = new THREE.Group();
    hotspotGroup.name = 'StudioHotspotsGroup';
    hotspots.forEach((h) => {
      const pin = new THREE.Mesh(
        new THREE.SphereGeometry(3.2, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xf97316 })
      );
      pin.position.set(h.pos[0], h.pos[1], h.pos[2]);
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(4.2, 5.4, 24),
        new THREE.MeshBasicMaterial({ color: 0xfdba74, side: THREE.DoubleSide })
      );
      ring.position.copy(pin.position);
      hotspotGroup.add(pin, ring);
    });
    scn.add(hotspotGroup);
  }

  function applyVariantColor(hex) {
    const act = window.SketchExtruder && window.SketchExtruder.getActiveModel ? window.SketchExtruder.getActiveModel() : null;
    if (!act || !act.meshGroup) return;
    const col = new THREE.Color(hex);
    act.meshGroup.traverse(c => {
      if (c.isMesh && c.material && c.material.color) c.material.color.copy(col);
    });
    act.colorHex = hex;
  }

  function generateConfiguratorHTML() {
    const grp = window.SketchExtruder && window.SketchExtruder.getGroup ? window.SketchExtruder.getGroup() : null;
    if (!grp || grp.children.length === 0) {
      if (window.toast) window.toast('⚠️ Add a 3D product model first');
      return;
    }
    const sceneJSON = grp.toJSON();
    const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Interactive 3D Product Configurator</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>
<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{background:#050815;overflow:hidden;font-family:Inter,system-ui,sans-serif;color:#f8fafc;}
#swatches{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:10px;background:rgba(13,18,37,0.88);padding:10px 16px;border-radius:999px;border:1px solid rgba(255,255,255,0.12);backdrop-filter:blur(12px);z-index:20;}
.sw{width:26px;height:26px;border-radius:50%;border:2px solid rgba(255,255,255,0.4);cursor:pointer;transition:transform 0.15s;}.sw:hover{transform:scale(1.18);}
.pin{position:fixed;transform:translate(-50%,-50%);width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#f97316,#ec4899);color:#fff;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:2px solid #fff;box-shadow:0 4px 16px rgba(249,115,22,0.5);z-index:15;}
#card{position:fixed;top:18px;right:18px;width:260px;background:rgba(13,18,37,0.94);border:1px solid rgba(249,115,22,0.45);border-radius:14px;padding:14px;display:none;backdrop-filter:blur(12px);z-index:25;}
</style></head><body>
<div id="pins"></div>
<div id="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b id="c-title"></b><span id="c-price" style="color:#34d399;font-weight:800;font-size:12px;"></span></div><p id="c-desc" style="font-size:12px;color:#94a3b8;line-height:1.45;"></p></div>
<div id="swatches">${variants.map(v => `<button class="sw" title="${v.name}" style="background:${v.color}" onclick="setCol('${v.color}')"></button>`).join('')}</div>
<script>(function(){
const scene=new THREE.Scene();scene.background=new THREE.Color(0x050815);
const camera=new THREE.PerspectiveCamera(48,innerWidth/innerHeight,0.1,4000);camera.position.set(0,45,190);
const renderer=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.outputEncoding=THREE.sRGBEncoding;document.body.appendChild(renderer.domElement);
const controls=new THREE.OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.autoRotate=true;controls.autoRotateSpeed=0.6;
scene.add(new THREE.AmbientLight(0xffffff,0.6),new THREE.HemisphereLight(0xe0f2fe,0x1e293b,0.9));
const dl=new THREE.DirectionalLight(0xffffff,1.4);dl.position.set(100,180,180);scene.add(dl);
const product=new THREE.ObjectLoader().parse(${JSON.stringify(sceneJSON)});scene.add(product);
window.setCol=hex=>{const c=new THREE.Color(hex);product.traverse(o=>{if(o.isMesh&&o.material&&o.material.color)o.material.color.copy(c);});};
const HS=${JSON.stringify(hotspots)};
const pinWrap=document.getElementById('pins');
const pinEls=HS.map((h,i)=>{const el=document.createElement('button');el.className='pin';el.textContent=i+1;el.onclick=()=>{document.getElementById('c-title').textContent=h.title;document.getElementById('c-price').textContent=h.price;document.getElementById('c-desc').textContent=h.desc;document.getElementById('card').style.display='block';};pinWrap.appendChild(el);return {el,v:new THREE.Vector3(h.pos[0],h.pos[1],h.pos[2])};});
window.addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
function anim(){requestAnimationFrame(anim);controls.update();pinEls.forEach(p=>{const v=p.v.clone().project(camera);p.el.style.left=((v.x*0.5+0.5)*innerWidth)+'px';p.el.style.top=((-v.y*0.5+0.5)*innerHeight)+'px';p.el.style.display=v.z<1?'flex':'none';});renderer.render(scene,camera);}anim();
})();<\/script></body></html>`;

    const ed = document.getElementById('code-editor');
    if (ed) {
      if (window.pushUndo) window.pushUndo();
      ed.value = html;
      ed.dispatchEvent(new Event('input', { bubbles: true }));
      if (window.toast) window.toast(isFR() ? '🛍️ Configurateur E-Commerce généré dans Live Preview !' : '🛍️ E-Commerce Configurator generated in Live Preview!');
    }
  }

  function renderDrawer() {
    if (!drawer) return;
    const fr = isFR();
    drawer.panel.innerHTML = `
      ${drawer.renderHeader('🛍️', fr ? 'Configurateur E-Commerce & Hotspots' : 'Product Configurator & Hotspots')}
      <div style="font-size:10px;font-weight:800;color:#fb923c;text-transform:uppercase;margin-bottom:6px;">🎨 ${fr ? 'Variantes Couleur (Aperçu Live)' : 'Color Variants (Live Preview)'}</div>
      <div style="display:flex;gap:7px;margin-bottom:12px;">
        ${variants.map(v => `<button class="cfg-sw" data-c="${v.color}" title="${v.name}" style="width:28px;height:28px;border-radius:50%;background:${v.color};border:2px solid rgba(255,255,255,0.35);cursor:pointer;"></button>`).join('')}
      </div>

      <div style="font-size:10px;font-weight:800;color:#38bdf8;text-transform:uppercase;margin-bottom:6px;">📍 ${fr ? 'Hotspots 3D Interactifs' : 'Interactive 3D Hotspots'} (${hotspots.length})</div>
      <div style="max-height:130px;overflow-y:auto;margin-bottom:10px;">
        ${hotspots.map((h, i) => `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 8px;background:rgba(255,255,255,0.03);border:1px solid #1e293b;border-radius:7px;margin-bottom:4px;font-size:10.5px;">
            <div><b>#${i + 1} ${h.title}</b> <span style="color:#34d399;">${h.price}</span><div style="font-size:9px;color:#64748b;">(${h.pos.join(', ')})</div></div>
            <button class="cfg-del-hs" data-i="${i}" style="background:none;border:none;color:#f87171;cursor:pointer;">✕</button>
          </div>
        `).join('')}
      </div>
      <div style="background:rgba(0,0,0,0.28);border:1px solid #1e293b;border-radius:8px;padding:8px;margin-bottom:10px;display:flex;flex-direction:column;gap:5px;">
        <input id="hs-title" type="text" placeholder="${fr ? 'Titre (ex: Verre Saphir)' : 'Title (e.g. Sapphire Glass)'}" style="padding:6px;background:#0f172a;border:1px solid #334155;border-radius:5px;color:#fff;font-size:11px;">
        <div style="display:flex;gap:5px;">
          <input id="hs-price" type="text" placeholder="$199" style="width:72px;padding:6px;background:#0f172a;border:1px solid #334155;border-radius:5px;color:#34d399;font-size:11px;">
          <input id="hs-desc" type="text" placeholder="${fr ? 'Description courte' : 'Short feature description'}" style="flex:1;padding:6px;background:#0f172a;border:1px solid #334155;border-radius:5px;color:#fff;font-size:11px;">
        </div>
        <button id="hs-add" class="studio-btn-sec">➕ ${fr ? 'Ajouter Pin 3D' : 'Add 3D Hotspot Pin'}</button>
      </div>
      <button id="cfg-gen-html" class="studio-btn-primary" style="background:linear-gradient(135deg,#f97316,#ec4899);">🚀 ${fr ? 'Générer Widget Configurateur E-Com' : 'Generate E-Commerce Embed Widget'}</button>
    `;

    drawer.panel.querySelectorAll('.cfg-sw').forEach(b => { b.onclick = () => applyVariantColor(b.dataset.c); });
    drawer.panel.querySelectorAll('.cfg-del-hs').forEach(b => { b.onclick = () => { hotspots.splice(+b.dataset.i, 1); syncHotspotPins(); renderDrawer(); }; });
    drawer.panel.querySelector('#hs-add').onclick = () => {
      const title = drawer.panel.querySelector('#hs-title').value.trim() || ('Feature #' + (hotspots.length + 1));
      const price = drawer.panel.querySelector('#hs-price').value.trim() || 'Pro';
      const desc = drawer.panel.querySelector('#hs-desc').value.trim() || 'Interactive 3D highlight';
      const a = hotspots.length * 1.4;
      hotspots.push({ title, price, desc, pos: [Math.round(Math.cos(a) * 32), Math.round(10 + (hotspots.length % 3) * 14), Math.round(Math.sin(a) * 32)] });
      syncHotspotPins();
      renderDrawer();
    };
    drawer.panel.querySelector('#cfg-gen-html').onclick = generateConfiguratorHTML;
  }

  window.addEventListener('studio:langchange', () => { if (drawer && drawer.panel.classList.contains('open')) renderDrawer(); });

  window.StudioConfigurator = {
    toggle() {
      if (!drawer && window.StudioShellUI) drawer = window.StudioShellUI.createToolDrawer('studio-configurator-drawer');
      if (!drawer) return;
      drawer.toggle();
      if (drawer.panel.classList.contains('open')) { syncHotspotPins(); renderDrawer(); }
    }
  };
})();
