(function(){
'use strict';
const TX={
  en:{title:'TESSERACT 4D',sub:'Hyper-Dimensional DataViz Studio',back:'<- Back',injected:'Injected!',copied:'Copied to clipboard!',tools:{
    hypercube:{name:'Hypercube Engine',desc:'A 4-dimensional hypercube projected into 3D using Three.js and mathematical rotation.',injectBtn:'Inject (Replace)',appendBtn:'Inject (Append)',copyBtn:'Copy Code'}
  }},
  fr:{title:'TESSERACT 4D',sub:'Studio Visualisation Hyper-Dimensionnelle',back:'<- Retour',injected:'Injecté!',copied:'Copié dans le presse-papiers!',tools:{
    hypercube:{name:'Moteur Hypercube',desc:'Un hypercube en 4 dimensions projeté en 3D via Three.js et rotation mathématique.',injectBtn:'Injecter (Remplacer)',appendBtn:'Injecter (Ajouter)',copyBtn:'Copier le code'}
  }}
};
function gl(){return window.appLang||'en';}
window._injectTesseractCode=function(c, mode){
  const t=TX[gl()]||TX.en;
  if(mode==='copy'){
    navigator.clipboard.writeText(c).then(()=>{if(window.showToast)window.showToast(t.copied);});
    return;
  }
  if(window.editor){
    if(mode==='append'){
      const cur = window.editor.getValue();
      window.editor.setValue(cur + '\n\n' + c);
    } else {
      window.editor.setValue(c);
    }
    if(window.runPreview)window.runPreview();
    if(window.showToast)window.showToast(t.injected);
  }
};

const _o=window.renderTab;
window.renderTab=function(tab){
  if(tab==='tesseract'){
    window.activeTab='tesseract';
    document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));
    const b=document.getElementById('tab-tesseract');if(b)b.classList.add('active');
    window.initTesseract(gl());
    return;
  }
  if(typeof _o==='function')_o(tab);
};

window.initTesseract=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tx=t.tools.hypercube;
  
  el.innerHTML=`
<div style="padding:15px;font-family:Inter,sans-serif;height:100%;box-sizing:border-box;background:#020617;overflow-y:auto;scrollbar-width:thin;">
  <div style="background:linear-gradient(135deg,rgba(99,102,241,0.12),rgba(79,70,229,0.08));border-radius:14px;padding:16px;border:1px solid rgba(99,102,241,0.35);margin-bottom:16px;display:flex;align-items:center;gap:12px;">
    <span style="font-size:32px;filter:drop-shadow(0 0 12px #818cf8);animation:spinTesseract 8s linear infinite;display:inline-block;">🧊</span>
    <div>
      <h2 style="margin:0;color:#c7d2fe;font-size:15px;font-weight:900;">${t.title}</h2>
      <p style="margin:3px 0 0;color:#94a3b8;font-size:10px;">${t.sub}</p>
    </div>
  </div>
  
  <h3 style="color:#818cf8;margin:0 0 5px;font-size:13px;font-weight:800;">🌌 ${tx.name}</h3>
  <p style="color:#64748b;font-size:10.5px;margin:0 0 16px;line-height:1.5;">${tx.desc}</p>
  
  <div style="background:#0f172a;border:1px dashed rgba(129,140,248,0.3);border-radius:10px;padding:20px;text-align:center;margin-bottom:16px;">
    <div style="font-size:36px;margin-bottom:8px;filter:drop-shadow(0 0 8px rgba(129,140,248,0.4));">🌌</div>
    <div style="color:#94a3b8;font-size:11px;">
      ${lang==='fr'?"Prêt à injecter dans l'éditeur":"Ready to inject into the editor"}
    </div>
  </div>
  
  <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:20px;">
    <button id="btnInjectTesseract" style="width:100%;padding:12px;border-radius:8px;background:#818cf8;border:none;color:#000;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 14px rgba(129,140,248,0.35);transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">
      ${tx.injectBtn}
    </button>
    <button id="btnAppendTesseract" style="width:100%;padding:12px;border-radius:8px;background:#4f46e5;border:none;color:#fff;font-weight:900;font-size:12px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">
      ${tx.appendBtn}
    </button>
    <button id="btnCopyTesseract" style="width:100%;padding:12px;border-radius:8px;background:#312e81;border:none;color:#c7d2fe;font-weight:900;font-size:12px;cursor:pointer;transition:all 0.2s;" onmouseover="this.style.opacity=0.9" onmouseout="this.style.opacity=1">
      ${tx.copyBtn}
    </button>
  </div>
</div>
<style>
@keyframes spinTesseract {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>`;

  document.getElementById('btnInjectTesseract').addEventListener('click',()=>window._injectTesseractCode(getTesseractCode(),'replace'));
  document.getElementById('btnAppendTesseract').addEventListener('click',()=>window._injectTesseractCode(getTesseractCode(),'append'));
  document.getElementById('btnCopyTesseract').addEventListener('click',()=>window._injectTesseractCode(getTesseractCode(),'copy'));
};

function getTesseractCode(){
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tesseract 4D</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #020617;
      color: #fff;
      font-family: system-ui, -apple-system, sans-serif;
    }
    #info {
      position: absolute;
      top: 20px;
      left: 20px;
      z-index: 10;
      pointer-events: none;
    }
    h1 {
      margin: 0;
      font-size: 22px;
      color: #818cf8;
      text-shadow: 0 0 10px rgba(129,140,248,0.5);
      font-weight: 800;
    }
    p {
      color: #94a3b8;
      margin-top: 5px;
      font-size: 12px;
    }
  </style>
  <script src="js/three.min.js"></script>
</head>
<body>
  <div id="info">
    <h1>Tesseract Engine 4D</h1>
    <p>Hypercube mathematically projected into 3D space</p>
  </div>
  <script>
    const points4D = [];
    for(let x=-1;x<=1;x+=2)
      for(let y=-1;y<=1;y+=2)
        for(let z=-1;z<=1;z+=2)
          for(let w=-1;w<=1;w+=2)
            points4D.push({x,y,z,w});

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.z = 6;
    
    const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const material = new THREE.LineBasicMaterial({color: 0x818cf8, transparent:true, opacity:0.65});
    const spheresMaterial = new THREE.MeshBasicMaterial({color: 0xc7d2fe});
    const sphereGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const spheres = [];

    points4D.forEach(()=>{
      let mesh = new THREE.Mesh(sphereGeo, spheresMaterial);
      scene.add(mesh);
      spheres.push(mesh);
    });

    const edges = [];
    for(let i=0;i<16;i++){
      for(let j=i+1;j<16;j++){
        let diffs = 0;
        if(points4D[i].x !== points4D[j].x) diffs++;
        if(points4D[i].y !== points4D[j].y) diffs++;
        if(points4D[i].z !== points4D[j].z) diffs++;
        if(points4D[i].w !== points4D[j].w) diffs++;
        if(diffs === 1) edges.push([i,j]);
      }
    }

    const lines = [];
    edges.forEach(()=>{
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]);
      const line = new THREE.Line(geo, material);
      scene.add(line);
      lines.push(line);
    });

    let angle = 0;
    function animate(){
      requestAnimationFrame(animate);
      angle += 0.008;
      const sin = Math.sin(angle), cos = Math.cos(angle);
      
      const projected3D = points4D.map(p => {
        // Rotation in XW 
        let x = p.x * cos - p.w * sin;
        let w = p.x * sin + p.w * cos;
        
        // Rotation in YW 
        let y = p.y * cos - w * sin;
        let w2 = p.y * sin + w * cos;
        
        // Rotation in ZW 
        let z = p.z * cos - w2 * sin;
        let w3 = p.z * sin + w2 * cos;
        
        // Stereographic projection
        let distance = 3.2;
        let z4 = 1 / (distance - w3);
        
        return new THREE.Vector3(x * z4 * 3.8, y * z4 * 3.8, z * z4 * 3.8);
      });
      
      for(let i=0;i<16;i++){
        spheres[i].position.copy(projected3D[i]);
      }
      
      edges.forEach((edge, idx) => {
        const p1 = projected3D[edge[0]];
        const p2 = projected3D[edge[1]];
        lines[idx].geometry.setFromPoints([p1, p2]);
      });
      
      renderer.render(scene, camera);
    }
    
    window.addEventListener('resize', ()=>{
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    animate();
  </script>
</body>
</html>`;
}

const _oa=window.applyLang;
window.applyLang=function(){
  if(typeof _oa==='function')_oa();
  const l=document.getElementById('lbl-tab-tesseract');
  if(l)l.textContent=gl()==='fr'?'Tesseract 4D':'Tesseract 4D';
  if(window.activeTab==='tesseract')window.initTesseract(gl());
};
})();
