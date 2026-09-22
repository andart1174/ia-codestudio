'use strict';
/**
 * IA Architecte — Draw → 3D Studio  v5.0
 * 15 Modes:
 *  Extrude | Voxel | Revolution | Pixel Art
 *  SVG→3D | Terrain | Text 3D
 *  Formula | Terrain Paint | Mandala | Camera
 *  🎵 Audio | 📊 Data Chart | 🌐 Globe | 📱 QR Code   ← PHASE 4
 * EN/FR — Zero API — Three.js r128
 */

/* ══════════════════════════════════════════════════════ TRANSLATIONS */
const D3D_LANG = {
  en: {
    title:'🎨 Draw → 3D Studio v5',
    subtitle:'Draw, import, calculate, capture, listen or scan → Three.js 3D',
    modeExtrude:'✏️ Extrude',modeVoxel:'🧱 Voxel',modeLathe:'🔄 Revolve',
    modePixel:'🟦 Pixel',modeSVG:'🎨 SVG',modeHeight:'🖼️ Terrain',
    modeText:'🔤 Text',modeFormula:'∫ Formula',modePaint:'🗻 Paint',
    modeMandala:'🌀 Mandala',modeCamera:'📷 Camera',
    modeAudio:'🎵 Audio',modeData:'📊 Chart',modeGlobe:'🌐 Globe',modeQR:'📱 QR',
    helpExtrude:'Draw a closed outline → 3D extruded solid.',helpVoxel:'Click/drag → 3D voxel cubes. Shift=erase.',
    helpLathe:'Draw right-side profile → 360° revolution.',helpPixel:'Paint pixels → 3D wall. Shift=erase.',
    helpSVG:'Import SVG → paths extruded to 3D.',helpHeight:'Import PNG/JPG → brightness = 3D height.',
    helpText:'Type text → extruded 3D letters.',helpFormula:'z=f(x,y) → 3D mathematical surface.',
    helpPaint:'Paint heightmap by hand → terrain. Shift=lower.',helpMandala:'Draw branch → radial symmetry → 3D.',
    helpCamera:'📷 Webcam/photo → 3D relief sculpture or edge cloud.',
    helpAudio:'🎤 Microphone or audio file → live or frozen 3D waveform bars.',
    helpData:'Paste CSV values → 3D bar chart, pie or line chart.',
    helpGlobe:'Import image → mapped as displacement on a 3D sphere (planet).',
    helpQR:'Type URL/text → QR code extruded as 3D relief sculpture.',
    depth:'3D Depth',color:'Color',material:'Material',matMetal:'Metal',matGlass:'Glass',matMatte:'Matte',
    clear:'🗑️ Clear',generate:'⚡ Generate 3D',generated:'🌟 3D model generated! Check the preview →',
    errFewPts:'Draw more points!',errNoPixels:'Paint some pixels first!',errNoVoxels:'Click cells first!',
    errNoSVG:'Import an SVG first!',errNoImage:'Import an image first!',errNoText:'Enter some text!',
    errFormula:'Invalid formula! Use x and y.',errMandala:'Draw something first!',errNoCapture:'Capture or import a photo first!',
    errNoAudio:'Capture or import audio first!',errNoData:'Enter some data values first!',
    errNoGlobe:'Import an image first!',errNoQR:'Enter some text first!',
    animate:'Animate',autoRotate:'Auto-Rotate',wireframe:'Wireframe',
    svgDrop:'Drop SVG here',svgLoaded:'✅ SVG:',imgDrop:'Drop PNG/JPG here',imgLoaded:'✅ Image:',
    amplitude:'Amplitude',smooth:'Smooth',textPh:'Type your text...',
    fontSize:'Size',fontDepth:'Depth',fontStyle:'Font',fontBevel:'Bevel',multiColor:'Multi-Color',
    formulaLabel:'z = f(x,y)',formulaRes:'Resolution',formulaRange:'Range',brushSize:'Brush',
    brushStr:'Strength',axes:'Axes',
    camStart:'🎥 Start Webcam',camStop:'⏹ Stop',camCapture:'📸 Capture',
    camImport:'🖼️ Import Photo',camCaptured:'✅ Captured!',cam3dMode:'3D Mode',
    camRelief:'🗿 Relief',camEdges:'✨ Edges',camResolution:'Resolution',camDepth:'Depth',
    camNoCam:'Webcam unavailable.',camInvert:'🔄 Invert',
    audioStart:'🎤 Start Mic',audioStop:'⏹ Stop',audioSnap:'📸 Snapshot',
    audioImport:'🗂️ Audio File',audioSnapped:'✅ Snapshot taken!',audioShape:'Shape',
    audioBars:'Bars',audioCircle:'Circular',audioWave:'Wave',audioLive:'Live in 3D',
    audioNoMic:'Microphone unavailable.',
    dataPlaceholder:'Apple,120\nBanana,85\nCherry,140\nDate,60\nElder,95',
    dataType:'Chart',dataBar:'🏙️ Bars',dataPie:'🍩 Pie',dataLine:'📈 Line',
    dataColors:'Colors',dataGradient:'Gradient',dataRainbow:'Rainbow',
    globeDrop:'Drop globe image here',globeLoaded:'✅ Globe image loaded',
    globeDisp:'Displacement',globeRes:'Resolution',
    qrPh:'Enter URL or text…',qrSize:'Cell Size',qrPreview:'QR Preview',
    qrColor:'Color',qrBG:'Background',
  },
  fr: {
    title:'🎨 Studio Dessin → 3D v5',
    subtitle:'Dessinez, importez, calculez, capturez, écoutez ou scannez → Three.js 3D',
    modeExtrude:'✏️ Extrude',modeVoxel:'🧱 Voxel',modeLathe:'🔄 Révol.',
    modePixel:'🟦 Pixel',modeSVG:'🎨 SVG',modeHeight:'🖼️ Terrain',
    modeText:'🔤 Texte',modeFormula:'∫ Formule',modePaint:'🗻 Peindre',
    modeMandala:'🌀 Mandala',modeCamera:'📷 Caméra',
    modeAudio:'🎵 Audio',modeData:'📊 Chart',modeGlobe:'🌐 Globe',modeQR:'📱 QR',
    helpExtrude:'Contour fermé → forme extrudée.',helpVoxel:'Cliquez → cubes 3D. Shift=effacer.',
    helpLathe:'Profil droit → révolution 360°.',helpPixel:'Pixels → mur 3D coloré. Shift=effacer.',
    helpSVG:'SVG → chemins extrudés.',helpHeight:'PNG/JPG → luminosité = hauteur 3D.',
    helpText:'Tapez du texte → lettres 3D.',helpFormula:'z=f(x,y) → surface mathématique 3D.',
    helpPaint:'Peignez un heightmap → terrain. Shift=abaisser.',helpMandala:'Branche → symétrie radiale → 3D.',
    helpCamera:'📷 Webcam/photo → sculpture relief 3D ou nuage de contours.',
    helpAudio:'🎤 Micro ou fichier audio → barres 3D en direct ou figées.',
    helpData:'Collez des valeurs CSV → graphique 3D barres, camembert ou ligne.',
    helpGlobe:'Importez une image → déplacement sur une sphère 3D (planète).',
    helpQR:'Tapez URL/texte → QR code extrudé en sculpture 3D.',
    depth:'Profondeur 3D',color:'Couleur',material:'Matière',matMetal:'Métal',matGlass:'Verre',matMatte:'Mat',
    clear:'🗑️ Effacer',generate:'⚡ Générer 3D',generated:'🌟 Modèle 3D généré ! Vérifiez l\'aperçu →',
    errFewPts:'Dessinez plus!',errNoPixels:'Peignez d\'abord!',errNoVoxels:'Cliquez des cellules!',
    errNoSVG:'Importez un SVG!',errNoImage:'Importez une image!',errNoText:'Entrez du texte!',
    errFormula:'Formule invalide ! Ex: sin(x)*cos(y)',errMandala:'Dessinez quelque chose!',errNoCapture:'Capturez ou importez une photo!',
    errNoAudio:'Capturez ou importez de l\'audio!',errNoData:'Entrez des valeurs!',
    errNoGlobe:'Importez une image!',errNoQR:'Entrez du texte!',
    animate:'Animer',autoRotate:'Auto-Rotation',wireframe:'Fil de fer',
    svgDrop:'Glissez SVG ici',svgLoaded:'✅ SVG:',imgDrop:'Glissez PNG/JPG ici',imgLoaded:'✅ Image:',
    amplitude:'Amplitude',smooth:'Lisse',textPh:'Tapez votre texte...',
    fontSize:'Taille',fontDepth:'Profondeur',fontStyle:'Police',fontBevel:'Biseau',multiColor:'Multi-Couleur',
    formulaLabel:'z = f(x,y)',formulaRes:'Résolution',formulaRange:'Étendue',brushSize:'Pinceau',
    brushStr:'Force',axes:'Axes',
    camStart:'🎥 Démarrer Webcam',camStop:'⏹ Arrêter',camCapture:'📸 Capturer',
    camImport:'🖼️ Importer Photo',camCaptured:'✅ Capturé!',cam3dMode:'Mode 3D',
    camRelief:'🗿 Relief',camEdges:'✨ Contours',camResolution:'Résolution',camDepth:'Profondeur',
    camNoCam:'Webcam non disponible.',camInvert:'🔄 Inverser',
    audioStart:'🎤 Démarrer Micro',audioStop:'⏹ Arrêter',audioSnap:'📸 Snapshot',
    audioImport:'🗂️ Fichier Audio',audioSnapped:'✅ Snapshot pris!',audioShape:'Forme',
    audioBars:'Barres',audioCircle:'Circulaire',audioWave:'Vague',audioLive:'Live 3D',
    audioNoMic:'Micro non disponible.',
    dataPlaceholder:'Paris,120\nLyon,85\nMarseille,140\nBordeaux,60\nLille,95',
    dataType:'Graphe',dataBar:'🏙️ Barres',dataPie:'🍩 Camembert',dataLine:'📈 Ligne',
    dataColors:'Couleurs',dataGradient:'Dégradé',dataRainbow:'Arc-en-ciel',
    globeDrop:'Glissez image globe ici',globeLoaded:'✅ Image globe chargée',
    globeDisp:'Déplacement',globeRes:'Résolution',
    qrPh:'Entrez URL ou texte…',qrSize:'Taille cellule',qrPreview:'Aperçu QR',
    qrColor:'Couleur',qrBG:'Fond',
  }
};

/* ══════════════════════════════════════════════════════ MAIN */
function renderDraw3DTab(body) {
  const L = window.lang||'en', tx = D3D_LANG[L]||D3D_LANG.en;
  body.style.cssText='padding:0;overflow:hidden;height:100%;display:flex;flex-direction:column;';

  /* State */
  let activeMode='extrude',drawPoints=[],isDrawing=false,canvasEl=null,ctx=null;
  let voxelData={},pixelData={};
  let svgSource=null,svgFileName='';
  let heightmapData=null;
  let mandalaPoints=[],mandalaAxes=6,mandalaIsDrawing=false;
  let terrainGrid=null,terrainN=32,terrainCanvasEl=null,terrainCtx=null,terrainPainting=false;
  let formulaStr='Math.sin(x)*Math.cos(y)';
  let camStream=null,camVideoEl=null,camCapture=null,camWrap=null;
  // Audio
  let audioStream=null,audioCtx=null,audioAnalyser=null,audioAnimId=null;
  let audioSnapshot=null,audioCanvasEl=null;
  // Global
  let globeCapture=null,globeWrap=null;
  let currentColor='#10b981',depth=2.0,animate3d=true,autoRotate=true,wireframe=false,materialType='metal';
  const VOXEL_N=10,PIXEL_N=16,LATHE_SEG=36;

  /* Root */
  const root=document.createElement('div');
  root.style.cssText='display:flex;flex-direction:column;height:100%;background:var(--bg-deep,#080c14);font-family:Inter,sans-serif;color:#e2e8f0;overflow:hidden;';

  /* Header */
  const hdr=document.createElement('div');
  hdr.style.cssText='padding:6px 12px 3px;border-bottom:1px solid rgba(255,255,255,0.06);background:linear-gradient(135deg,rgba(16,185,129,0.09),rgba(236,72,153,0.05));flex-shrink:0;';
  hdr.innerHTML=`<div style="font-size:11px;font-weight:900;background:linear-gradient(135deg,#10b981,#3b82f6,#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${tx.title}</div><div style="font-size:8.5px;color:#64748b;margin-top:1px;">${tx.subtitle}</div>`;
  root.appendChild(hdr);

  /* Mode buttons — 3 rows × 5 */
  const MODES=[
    {id:'extrude',label:tx.modeExtrude,c:'#10b981'},{id:'voxel',label:tx.modeVoxel,c:'#10b981'},
    {id:'lathe',label:tx.modeLathe,c:'#10b981'},{id:'pixel',label:tx.modePixel,c:'#10b981'},
    {id:'svg',label:tx.modeSVG,c:'#10b981'},
    {id:'heightmap',label:tx.modeHeight,c:'#3b82f6'},{id:'text3d',label:tx.modeText,c:'#3b82f6'},
    {id:'formula',label:tx.modeFormula,c:'#f59e0b'},{id:'paint',label:tx.modePaint,c:'#f59e0b'},
    {id:'mandala',label:tx.modeMandala,c:'#c084fc'},
    {id:'camera',label:tx.modeCamera,c:'#ec4899'},{id:'audio',label:tx.modeAudio,c:'#22d3ee'},
    {id:'datachart',label:tx.modeData,c:'#fb923c'},{id:'globe',label:tx.modeGlobe,c:'#34d399'},
    {id:'qrcode',label:tx.modeQR,c:'#a78bfa'},
  ];
  const modeBar=document.createElement('div');
  modeBar.style.cssText='display:flex;gap:2px;padding:4px 6px 2px;flex-shrink:0;flex-wrap:wrap;';
  const modeBtns={};
  MODES.forEach(m=>{
    const b=document.createElement('button');b.textContent=m.label;b.dataset.mode=m.id;
    b.style.cssText='flex:1;min-width:calc(20% - 4px);padding:3px 1px;font-size:7.5px;font-weight:700;border-radius:5px;cursor:pointer;border:1px solid rgba(255,255,255,0.09);background:rgba(255,255,255,0.04);color:#94a3b8;transition:all .15s;white-space:nowrap;overflow:hidden;';
    b.onclick=()=>switchMode(m.id);modeBtns[m.id]=b;modeBar.appendChild(b);
  });
  root.appendChild(modeBar);

  const helpDiv=document.createElement('div');
  helpDiv.style.cssText='font-size:8.5px;color:#64748b;padding:2px 10px 2px;min-height:13px;flex-shrink:0;';
  root.appendChild(helpDiv);

  /* Options */
  const optBar=document.createElement('div');optBar.style.cssText='padding:0 8px 3px;flex-shrink:0;display:flex;flex-direction:column;gap:3px;';
  const row1=document.createElement('div');row1.id='d3d-row1';row1.style.cssText='display:flex;gap:5px;align-items:center;';
  row1.innerHTML=`<label style="font-size:9px;color:#64748b;">${tx.color}</label><input type="color" id="d3d-color" value="#10b981" style="width:26px;height:20px;border:none;border-radius:3px;cursor:pointer;padding:0;background:transparent;"><label style="font-size:9px;color:#64748b;margin-left:3px;">${tx.material}</label><select id="d3d-material" style="flex:1;font-size:9px;background:rgba(255,255,255,0.05);color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px 4px;"><option value="metal">${tx.matMetal}</option><option value="glass">${tx.matGlass}</option><option value="matte">${tx.matMatte}</option></select>`;
  optBar.appendChild(row1);
  const row2=document.createElement('div');row2.id='d3d-depth-row';row2.style.cssText='display:flex;gap:5px;align-items:center;';
  row2.innerHTML=`<label style="font-size:9px;color:#64748b;">${tx.depth}</label><input type="range" id="d3d-depth" min="0.2" max="6" step="0.1" value="2" style="flex:1;accent-color:#10b981;"><span id="d3d-depth-val" style="font-size:9px;color:#10b981;font-weight:700;min-width:22px;">2.0</span>`;
  optBar.appendChild(row2);
  const row3=document.createElement('div');row3.style.cssText='display:flex;gap:8px;align-items:center;';
  row3.innerHTML=`<label style="display:flex;align-items:center;gap:3px;font-size:9px;color:#94a3b8;cursor:pointer;"><input type="checkbox" id="d3d-animate" checked style="accent-color:#10b981;width:11px;height:11px;">${tx.animate}</label><label style="display:flex;align-items:center;gap:3px;font-size:9px;color:#94a3b8;cursor:pointer;"><input type="checkbox" id="d3d-autorotate" checked style="accent-color:#10b981;width:11px;height:11px;">${tx.autoRotate}</label><label style="display:flex;align-items:center;gap:3px;font-size:9px;color:#94a3b8;cursor:pointer;"><input type="checkbox" id="d3d-wireframe" style="accent-color:#10b981;width:11px;height:11px;">${tx.wireframe}</label>`;
  optBar.appendChild(row3);root.appendChild(optBar);

  const canvasWrap=document.createElement('div');canvasWrap.id='d3d-canvas-wrap';
  canvasWrap.style.cssText='flex:1;position:relative;margin:0 8px 4px;border-radius:7px;overflow:hidden;border:1px solid rgba(255,255,255,0.07);background:#08101c;min-height:80px;';
  root.appendChild(canvasWrap);

  const btnRow=document.createElement('div');btnRow.style.cssText='display:flex;gap:6px;padding:0 8px 7px;flex-shrink:0;';
  const clearBtn=document.createElement('button');clearBtn.textContent=tx.clear;clearBtn.style.cssText='flex:1;padding:6px;font-size:9.5px;font-weight:700;cursor:pointer;border-radius:6px;background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.09);';
  const genBtn=document.createElement('button');genBtn.textContent=tx.generate;genBtn.style.cssText='flex:2;padding:6px;font-size:10px;font-weight:900;cursor:pointer;border-radius:6px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;box-shadow:0 4px 14px rgba(16,185,129,0.35);';
  btnRow.appendChild(clearBtn);btnRow.appendChild(genBtn);root.appendChild(btnRow);
  body.appendChild(root);

  function q(id){return root.querySelector('#'+id);}
  q('d3d-color').oninput=ev=>{currentColor=ev.target.value;};
  q('d3d-depth').oninput=ev=>{depth=parseFloat(ev.target.value);q('d3d-depth-val').textContent=depth.toFixed(1);};
  q('d3d-material').onchange=ev=>{materialType=ev.target.value;};
  q('d3d-animate').onchange=ev=>{animate3d=ev.target.checked;};
  q('d3d-autorotate').onchange=ev=>{autoRotate=ev.target.checked;};
  q('d3d-wireframe').onchange=ev=>{wireframe=ev.target.checked;};
  clearBtn.onclick=clearAll;genBtn.onclick=generate3D;

  /* Switch mode */
  function switchMode(mode){
    if(activeMode==='camera'&&mode!=='camera')stopCamera();
    if(activeMode==='audio'&&mode!=='audio')stopAudio();
    activeMode=mode;
    MODES.forEach(m=>{const b=modeBtns[m.id];b.style.background=m.id===mode?`linear-gradient(135deg,${m.c}35,${m.c}18)`:'rgba(255,255,255,.04)';b.style.color=m.id===mode?m.c:'#94a3b8';b.style.borderColor=m.id===mode?`${m.c}65`:'rgba(255,255,255,.09)';});
    const helps={extrude:tx.helpExtrude,voxel:tx.helpVoxel,lathe:tx.helpLathe,pixel:tx.helpPixel,svg:tx.helpSVG,heightmap:tx.helpHeight,text3d:tx.helpText,formula:tx.helpFormula,paint:tx.helpPaint,mandala:tx.helpMandala,camera:tx.helpCamera,audio:tx.helpAudio,datachart:tx.helpData,globe:tx.helpGlobe,qrcode:tx.helpQR};
    helpDiv.textContent=helps[mode]||'';
    const hideDepth=['pixel','heightmap','text3d','formula','paint','camera','audio','datachart','globe'].includes(mode);
    const hideColor=['heightmap','formula','camera','globe','datachart'].includes(mode);
    const dr=q('d3d-depth-row'),r1=q('d3d-row1');
    if(dr)dr.style.display=hideDepth?'none':'flex';
    if(r1)r1.style.display=hideColor?'none':'flex';
    clearAll();
  }

  /* Clear */
  function clearAll(){
    if(activeMode!=='camera')stopCamera();
    if(activeMode!=='audio')stopAudio();
    drawPoints=[];voxelData={};pixelData={};isDrawing=false;canvasEl=null;ctx=null;
    mandalaPoints=[];mandalaIsDrawing=false;
    terrainGrid=null;terrainCanvasEl=null;terrainCtx=null;terrainPainting=false;
    canvasWrap.innerHTML='';
    ({extrude:buildFreeCanvas,lathe:buildFreeCanvas,voxel:buildVoxelGrid,pixel:buildPixelArtGrid,
      svg:buildSVGMode,heightmap:buildHeightmapMode,text3d:buildText3DMode,
      formula:buildFormulaMode,paint:buildTerrainPaint,mandala:buildMandalaMode,
      camera:buildCameraMode,audio:buildAudioMode,datachart:buildDataChartMode,
      globe:buildGlobeMode,qrcode:buildQRMode}[activeMode]||(() => {}))();
  }
  function stopCamera(){if(camStream){camStream.getTracks().forEach(t=>t.stop());camStream=null;}camVideoEl=null;}
  function stopAudio(){if(audioAnimId){cancelAnimationFrame(audioAnimId);audioAnimId=null;}if(audioStream){audioStream.getTracks().forEach(t=>t.stop());audioStream=null;}if(audioCtx){try{audioCtx.close();}catch(e){}audioCtx=null;}audioAnalyser=null;}

  /* ═══ BUILD: FREE DRAW ═══ */
  function buildFreeCanvas(){canvasEl=document.createElement('canvas');canvasEl.style.cssText='position:absolute;inset:0;width:100%;height:100%;cursor:crosshair;touch-action:none;display:block;';canvasWrap.appendChild(canvasEl);function resize(){canvasEl.width=canvasWrap.clientWidth||200;canvasEl.height=canvasWrap.clientHeight||150;ctx=canvasEl.getContext('2d');redrawFree();}new ResizeObserver(resize).observe(canvasWrap);setTimeout(resize,30);canvasEl.addEventListener('pointerdown',ev=>{ev.preventDefault();isDrawing=true;drawPoints=[];drawPoints.push(getXY(ev));redrawFree();});canvasEl.addEventListener('pointermove',ev=>{if(!isDrawing)return;ev.preventDefault();drawPoints.push(getXY(ev));redrawFree();});window.addEventListener('pointerup',()=>{isDrawing=false;});function getXY(ev){const r=canvasEl.getBoundingClientRect();return{x:(ev.touches?ev.touches[0].clientX:ev.clientX)-r.left,y:(ev.touches?ev.touches[0].clientY:ev.clientY)-r.top};}}
  function redrawFree(){if(!ctx||!canvasEl)return;const W=canvasEl.width,H=canvasEl.height;ctx.clearRect(0,0,W,H);ctx.strokeStyle='rgba(255,255,255,0.03)';ctx.lineWidth=1;for(let x=0;x<W;x+=20){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}for(let y=0;y<H;y+=20){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}if(activeMode==='lathe'){ctx.save();ctx.setLineDash([4,4]);ctx.strokeStyle='rgba(59,130,246,0.5)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.setLineDash([]);ctx.restore();ctx.fillStyle='rgba(59,130,246,0.7)';ctx.font='9px Inter,sans-serif';ctx.fillText('← Axis',W/2+3,12);}if(drawPoints.length<2)return;ctx.beginPath();ctx.moveTo(drawPoints[0].x,drawPoints[0].y);for(let i=1;i<drawPoints.length;i++)ctx.lineTo(drawPoints[i].x,drawPoints[i].y);ctx.strokeStyle='#10b981';ctx.lineWidth=3;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();ctx.beginPath();ctx.arc(drawPoints[0].x,drawPoints[0].y,5,0,Math.PI*2);ctx.fillStyle='#ef4444';ctx.fill();const last=drawPoints[drawPoints.length-1];ctx.beginPath();ctx.arc(last.x,last.y,5,0,Math.PI*2);ctx.fillStyle='#3b82f6';ctx.fill();ctx.fillStyle='rgba(100,116,139,.8)';ctx.font='9px Inter,sans-serif';ctx.fillText(`${drawPoints.length} pts`,6,H-5);}

  /* ═══ BUILD: VOXEL ═══ */
  function buildVoxelGrid(){voxelData={};const N=VOXEL_N;const grid=document.createElement('div');grid.style.cssText=`display:grid;grid-template-columns:repeat(${N},1fr);gap:1px;padding:3px;position:absolute;inset:0;box-sizing:border-box;`;for(let r=0;r<N;r++)for(let c=0;c<N;c++){const key=`${r}_${c}`,cell=document.createElement('div');cell.dataset.key=key;cell.style.cssText='background:rgba(255,255,255,0.03);border-radius:2px;cursor:pointer;border:1px solid rgba(255,255,255,0.04);';grid.appendChild(cell);}let p=false;grid.addEventListener('mousedown',ev=>{p=true;pV(ev.target,ev.shiftKey);});grid.addEventListener('mouseover',ev=>{if(p)pV(ev.target,ev.shiftKey);});window.addEventListener('mouseup',()=>{p=false;});function pV(t,e){const k=t.dataset&&t.dataset.key;if(!k)return;if(e||voxelData[k]){delete voxelData[k];t.style.background='rgba(255,255,255,0.03)';t.style.boxShadow='';}else{voxelData[k]=currentColor;t.style.background=currentColor;t.style.boxShadow=`0 0 6px ${currentColor}99`;}}canvasWrap.appendChild(grid);}

  /* ═══ BUILD: PIXEL ART ═══ */
  function buildPixelArtGrid(){pixelData={};const N=PIXEL_N;const grid=document.createElement('div');grid.style.cssText=`display:grid;grid-template-columns:repeat(${N},1fr);gap:0;padding:2px;position:absolute;inset:0;box-sizing:border-box;`;for(let r=0;r<N;r++)for(let c=0;c<N;c++){const key=`${r}_${c}`,cell=document.createElement('div');cell.dataset.key=key;cell.style.cssText='background:rgba(255,255,255,0.02);cursor:crosshair;border:1px solid rgba(255,255,255,0.025);box-sizing:border-box;';grid.appendChild(cell);}let p=false;grid.addEventListener('mousedown',ev=>{ev.preventDefault();p=true;aP(ev.target,ev.shiftKey);});grid.addEventListener('mousemove',ev=>{if(!p)return;ev.preventDefault();aP(ev.target,ev.shiftKey);});window.addEventListener('mouseup',()=>{p=false;});function aP(t,e){const k=t.dataset&&t.dataset.key;if(!k)return;if(e){delete pixelData[k];t.style.background='rgba(255,255,255,0.02)';t.style.boxShadow='';}else{pixelData[k]=currentColor;t.style.background=currentColor;t.style.boxShadow=`0 0 3px ${currentColor}99`;}}canvasWrap.appendChild(grid);}

  /* ═══ BUILD: SVG ═══ */
  function buildSVGMode(){svgSource=null;const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:12px;box-sizing:border-box;';const drop=document.createElement('div');drop.style.cssText='width:100%;flex:1;border:2px dashed rgba(16,185,129,0.4);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;background:rgba(16,185,129,0.04);overflow:hidden;';drop.innerHTML=`<div style="font-size:24px;">🎨</div><div style="font-size:10px;font-weight:700;color:#10b981;">${tx.svgDrop}</div><div id="d3d-svg-status" style="font-size:8.5px;color:#64748b;"></div>`;const inp=document.createElement('input');inp.type='file';inp.accept='.svg,image/svg+xml';inp.style.display='none';drop.appendChild(inp);drop.onclick=()=>inp.click();drop.ondragover=ev=>{ev.preventDefault();};drop.ondrop=ev=>{ev.preventDefault();if(ev.dataTransfer.files[0])loadSVG(ev.dataTransfer.files[0]);};inp.onchange=()=>{if(inp.files[0])loadSVG(inp.files[0]);};function loadSVG(file){const r=new FileReader();r.onload=e=>{svgSource=e.target.result;const st=wrap.querySelector('#d3d-svg-status');if(st)st.textContent=`${tx.svgLoaded} ${file.name}`;drop.style.background='rgba(16,185,129,0.12)';};r.readAsText(file);}wrap.appendChild(drop);canvasWrap.appendChild(wrap);}

  /* ═══ BUILD: HEIGHTMAP ═══ */
  function buildHeightmapMode(){heightmapData=null;const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:8px;box-sizing:border-box;';const drop=document.createElement('div');drop.style.cssText='flex:1;border:2px dashed rgba(59,130,246,0.4);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;background:rgba(59,130,246,0.04);position:relative;overflow:hidden;';const lbl=document.createElement('div');lbl.style.cssText='font-size:10px;font-weight:700;color:#3b82f6;text-align:center;z-index:2;position:relative;';lbl.innerHTML=`<div style="font-size:20px;margin-bottom:2px;">🖼️</div>${tx.imgDrop}`;drop.appendChild(lbl);const ip=document.createElement('img');ip.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.35;display:none;';drop.appendChild(ip);const st=document.createElement('div');st.style.cssText='font-size:8.5px;color:#64748b;text-align:center;z-index:2;position:relative;';drop.appendChild(st);const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.style.display='none';drop.appendChild(inp);drop.onclick=()=>inp.click();drop.ondrop=ev=>{ev.preventDefault();if(ev.dataTransfer.files[0])loadImg(ev.dataTransfer.files[0]);};drop.ondragover=ev=>ev.preventDefault();inp.onchange=()=>{if(inp.files[0])loadImg(inp.files[0]);};function loadImg(file){const r=new FileReader();r.onload=e=>{const src=e.target.result;const img=new Image();img.onload=()=>{const RES=64;const tmp=document.createElement('canvas');tmp.width=RES;tmp.height=RES;const tc=tmp.getContext('2d');tc.drawImage(img,0,0,RES,RES);const data=tc.getImageData(0,0,RES,RES).data;const grid=new Float32Array(RES*RES);for(let i=0;i<RES*RES;i++)grid[i]=(data[i*4]*0.299+data[i*4+1]*0.587+data[i*4+2]*0.114)/255;heightmapData={grid,w:RES};ip.src=src;ip.style.display='block';lbl.style.display='none';st.textContent=`${tx.imgLoaded} ${file.name}`;};img.src=src;};r.readAsDataURL(file);}wrap.appendChild(drop);const ctrl=document.createElement('div');ctrl.innerHTML=`<div style="display:flex;gap:5px;align-items:center;"><label style="font-size:8.5px;color:#64748b;">${tx.amplitude}</label><input type="range" id="d3d-hm-amp" min="0.5" max="8" step="0.1" value="3" style="flex:1;accent-color:#3b82f6;"><span id="d3d-hm-amp-val" style="font-size:8.5px;color:#3b82f6;font-weight:700;min-width:22px;">3.0</span></div>`;wrap.appendChild(ctrl);canvasWrap.appendChild(wrap);setTimeout(()=>{const a=canvasWrap.querySelector('#d3d-hm-amp'),av=canvasWrap.querySelector('#d3d-hm-amp-val');if(a&&av)a.oninput=()=>{av.textContent=parseFloat(a.value).toFixed(1);};},80);}

  /* ═══ BUILD: TEXT 3D ═══ */
  function buildText3DMode(){const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:9px;box-sizing:border-box;overflow:auto;';const ta=document.createElement('textarea');ta.id='d3d-text-input';ta.placeholder=tx.textPh;ta.value='IA 3D';ta.style.cssText='width:100%;flex:1;min-height:48px;padding:8px;font-size:17px;font-weight:900;background:rgba(255,255,255,0.05);color:#e2e8f0;border:1px solid rgba(16,185,129,0.3);border-radius:8px;outline:none;resize:none;text-align:center;box-sizing:border-box;';ta.onfocus=()=>ta.style.borderColor='#10b981';ta.onblur=()=>ta.style.borderColor='rgba(16,185,129,0.3)';wrap.appendChild(ta);const fr=document.createElement('div');fr.style.cssText='display:flex;gap:4px;align-items:center;flex-shrink:0;';fr.innerHTML=`<label style="font-size:8.5px;color:#64748b;">${tx.fontStyle}</label>`;const fs=document.createElement('select');fs.id='d3d-font-type';fs.style.cssText='flex:1;font-size:8.5px;background:rgba(255,255,255,0.05);color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px;';[['helvetiker','Helvetiker'],['gentilis','Gentilis'],['optimer','Optimer'],['droid_sans','Droid Sans']].forEach(([v,l])=>{const o=document.createElement('option');o.value=v;o.textContent=l;fs.appendChild(o);});fr.appendChild(fs);wrap.appendChild(fr);const sl=document.createElement('div');sl.style.cssText='display:flex;flex-direction:column;gap:4px;flex-shrink:0;';sl.innerHTML=`<div style="display:flex;gap:5px;align-items:center;"><label style="font-size:8.5px;color:#64748b;min-width:50px;">${tx.fontSize}</label><input type="range" id="d3d-text-size" min="0.5" max="4" step="0.1" value="1.5" style="flex:1;accent-color:#10b981;"><span id="d3d-tsv" style="font-size:8.5px;color:#10b981;font-weight:700;min-width:22px;">1.5</span></div><div style="display:flex;gap:5px;align-items:center;"><label style="font-size:8.5px;color:#64748b;min-width:50px;">${tx.fontDepth}</label><input type="range" id="d3d-text-depth" min="0.05" max="1.5" step="0.05" value="0.3" style="flex:1;accent-color:#10b981;"><span id="d3d-tdv" style="font-size:8.5px;color:#10b981;font-weight:700;min-width:22px;">0.30</span></div><div style="display:flex;gap:6px;align-items:center;"><label style="display:flex;align-items:center;gap:3px;font-size:8.5px;color:#94a3b8;cursor:pointer;"><input type="checkbox" id="d3d-text-bevel" checked style="accent-color:#10b981;width:11px;height:11px;">${tx.fontBevel}</label><label style="display:flex;align-items:center;gap:3px;font-size:8.5px;color:#94a3b8;cursor:pointer;"><input type="checkbox" id="d3d-text-multicolor" style="accent-color:#10b981;width:11px;height:11px;">${tx.multiColor}</label></div>`;wrap.appendChild(sl);canvasWrap.appendChild(wrap);setTimeout(()=>{const ts=canvasWrap.querySelector('#d3d-text-size'),tsv=canvasWrap.querySelector('#d3d-tsv');const td=canvasWrap.querySelector('#d3d-text-depth'),tdv=canvasWrap.querySelector('#d3d-tdv');if(ts&&tsv)ts.oninput=()=>tsv.textContent=parseFloat(ts.value).toFixed(1);if(td&&tdv)td.oninput=()=>tdv.textContent=parseFloat(td.value).toFixed(2);},80);}

  /* ═══ BUILD: FORMULA ═══ */
  function buildFormulaMode(){formulaStr='Math.sin(x)*Math.cos(y)';const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:9px;box-sizing:border-box;';const presets=[{label:'🌊 Waves',f:'Math.sin(x)*Math.cos(y)'},{label:'🪿 Ripple',f:'Math.sin(Math.sqrt(x*x+y*y))'},{label:'🏔️ Peak',f:'Math.exp(-(x*x+y*y)*0.3)'},{label:'🌀 Saddle',f:'x*x-y*y'},{label:'💎 Crystal',f:'Math.cos(x)+Math.cos(y)'},{label:'🌺 Flower',f:'Math.sin(x*y)*0.5'}];const pw=document.createElement('div');pw.style.cssText='display:flex;gap:3px;flex-wrap:wrap;flex-shrink:0;';presets.forEach(p=>{const b=document.createElement('button');b.textContent=p.label;b.style.cssText='padding:2px 5px;font-size:7.5px;border-radius:4px;cursor:pointer;background:rgba(245,158,11,0.12);color:#f59e0b;border:1px solid rgba(245,158,11,0.3);';b.onclick=()=>{formulaStr=p.f;const i=wrap.querySelector('#d3d-formula-input');if(i)i.value=formulaStr;drawFPrev(pvc);};pw.appendChild(b);});wrap.appendChild(pw);const lbl=document.createElement('div');lbl.style.cssText='font-size:9px;color:#f59e0b;font-weight:700;flex-shrink:0;';lbl.textContent=tx.formulaLabel;wrap.appendChild(lbl);const inp=document.createElement('input');inp.id='d3d-formula-input';inp.type='text';inp.value=formulaStr;inp.style.cssText='width:100%;padding:6px 9px;font-size:10.5px;font-family:monospace;background:rgba(245,158,11,0.08);color:#fbbf24;border:1px solid rgba(245,158,11,0.35);border-radius:6px;outline:none;box-sizing:border-box;flex-shrink:0;';inp.onfocus=()=>inp.style.borderColor='#f59e0b';inp.onblur=()=>inp.style.borderColor='rgba(245,158,11,0.35)';inp.oninput=()=>{formulaStr=inp.value;drawFPrev(pvc);};wrap.appendChild(inp);const sls=document.createElement('div');sls.style.cssText='display:flex;flex-direction:column;gap:4px;flex-shrink:0;';sls.innerHTML=`<div style="display:flex;gap:5px;align-items:center;"><label style="font-size:8.5px;color:#64748b;min-width:58px;">${tx.formulaRes}</label><input type="range" id="d3d-formula-res" min="10" max="60" step="5" value="30" style="flex:1;accent-color:#f59e0b;"><span id="d3d-fres-v" style="font-size:8.5px;color:#f59e0b;font-weight:700;min-width:20px;">30</span></div><div style="display:flex;gap:5px;align-items:center;"><label style="font-size:8.5px;color:#64748b;min-width:58px;">${tx.formulaRange}</label><input type="range" id="d3d-formula-range" min="3" max="12" step="1" value="6" style="flex:1;accent-color:#f59e0b;"><span id="d3d-frange-v" style="font-size:8.5px;color:#f59e0b;font-weight:700;min-width:24px;">±6</span></div>`;wrap.appendChild(sls);const pvc=document.createElement('canvas');pvc.style.cssText='flex:1;width:100%;border-radius:6px;background:rgba(0,0,0,0.3);';wrap.appendChild(pvc);canvasWrap.appendChild(wrap);setTimeout(()=>{const rEl=canvasWrap.querySelector('#d3d-formula-res'),rv=canvasWrap.querySelector('#d3d-fres-v');const raEl=canvasWrap.querySelector('#d3d-formula-range'),rav=canvasWrap.querySelector('#d3d-frange-v');if(rEl&&rv)rEl.oninput=()=>{rv.textContent=rEl.value;drawFPrev(pvc);};if(raEl&&rav)raEl.oninput=()=>{rav.textContent=`±${raEl.value}`;drawFPrev(pvc);};drawFPrev(pvc);},80);}
  function drawFPrev(canvas){if(!canvas)return;const W=canvas.width=canvas.clientWidth||200,H=canvas.height=canvas.clientHeight||80;const c=canvas.getContext('2d');c.clearRect(0,0,W,H);const N=parseInt(canvasWrap.querySelector('#d3d-formula-res')?.value||30);const R=parseFloat(canvasWrap.querySelector('#d3d-formula-range')?.value||6);let fn;try{fn=new Function('x','y','return '+formulaStr);}catch(e){c.fillStyle='#ef4444';c.font='9px Inter,sans-serif';c.fillText('Syntax error',4,14);return;}try{const sc=Math.min(W,H)/N*0.85,ox=W/2,oy=H/2;let minV=Infinity,maxV=-Infinity;const vals=[];for(let r=0;r<=N;r++)for(let cc=0;cc<=N;cc++){const x=(cc/N*2-1)*R,y=(r/N*2-1)*R;let v=0;try{v=fn(x,y);}catch(e){}vals.push(v);if(v<minV)minV=v;if(v>maxV)maxV=v;}const range=maxV-minV||1;for(let r=0;r<N;r++)for(let cc=0;cc<N;cc++){const t=(vals[r*(N+1)+cc]-minV)/range;const col=[30,58,138].map((l,k)=>Math.round(l+([16,185,129][k]-l)*t));c.fillStyle=`rgb(${col.join(',')})`;c.fillRect(cc*sc+ox-N*sc/2,r*sc+oy-N*sc/2,sc,sc);}c.fillStyle='rgba(245,158,11,0.7)';c.font='8px Inter';c.fillText(`${N}×${N}`,4,H-4);}catch(e){c.fillStyle='#ef4444';c.font='8px Inter';c.fillText('Error',4,14);}}

  /* ═══ BUILD: TERRAIN PAINT ═══ */
  function buildTerrainPaint(){terrainGrid=new Float32Array(terrainN*terrainN).fill(0.1);const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;';const ctrl=document.createElement('div');ctrl.style.cssText='display:flex;gap:5px;align-items:center;padding:4px 8px;flex-shrink:0;background:rgba(0,0,0,0.3);';ctrl.innerHTML=`<label style="font-size:8.5px;color:#64748b;">${tx.brushSize}</label><input type="range" id="d3d-brush-size" min="1" max="6" step="1" value="3" style="width:55px;accent-color:#f59e0b;"><label style="font-size:8.5px;color:#64748b;">${tx.brushStr}</label><input type="range" id="d3d-brush-str" min="0.02" max="0.2" step="0.01" value="0.08" style="width:55px;accent-color:#f59e0b;"><span style="font-size:8.5px;color:#64748b;">Shift=lower</span>`;wrap.appendChild(ctrl);terrainCanvasEl=document.createElement('canvas');terrainCanvasEl.style.cssText='flex:1;display:block;cursor:crosshair;';wrap.appendChild(terrainCanvasEl);canvasWrap.appendChild(wrap);function rT(){terrainCanvasEl.width=terrainCanvasEl.clientWidth||200;terrainCanvasEl.height=terrainCanvasEl.clientHeight||150;terrainCtx=terrainCanvasEl.getContext('2d');redrawTerrain();}new ResizeObserver(rT).observe(terrainCanvasEl);setTimeout(rT,30);terrainCanvasEl.addEventListener('mousedown',ev=>{terrainPainting=true;ptT(ev);});terrainCanvasEl.addEventListener('mousemove',ev=>{if(terrainPainting)ptT(ev);});window.addEventListener('mouseup',()=>{terrainPainting=false;});function ptT(ev){const rect=terrainCanvasEl.getBoundingClientRect(),px=((ev.clientX-rect.left)/rect.width)*terrainN,py=((ev.clientY-rect.top)/rect.height)*terrainN;const bs=parseFloat(canvasWrap.querySelector('#d3d-brush-size')?.value||3);const str=parseFloat(canvasWrap.querySelector('#d3d-brush-str')?.value||0.08);const raise=!ev.shiftKey;for(let r=0;r<terrainN;r++)for(let c=0;c<terrainN;c++){const dist=Math.sqrt((c-px)**2+(r-py)**2);if(dist<bs){const fb=1-dist/bs;const idx=r*terrainN+c;terrainGrid[idx]=Math.max(0,Math.min(1,terrainGrid[idx]+(raise?1:-1)*str*fb));}}redrawTerrain();}}
  function redrawTerrain(){if(!terrainCtx||!terrainCanvasEl)return;const W=terrainCanvasEl.width,H=terrainCanvasEl.height,N=terrainN,cw=W/N,ch=H/N;for(let r=0;r<N;r++)for(let c=0;c<N;c++){const v=terrainGrid[r*N+c];const col=[30,58,138].map((l,k)=>Math.round(l+([16,185,129][k]-l)*v));terrainCtx.fillStyle=`rgb(${col.join(',')})`;terrainCtx.fillRect(c*cw,r*ch,cw+0.5,ch+0.5);}terrainCtx.fillStyle='rgba(245,158,11,0.6)';terrainCtx.font='8.5px Inter';terrainCtx.fillText('Left=raise  Shift=lower',4,H-5);}

  /* ═══ BUILD: MANDALA ═══ */
  function buildMandalaMode(){mandalaPoints=[];mandalaIsDrawing=false;const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;';const ctrl=document.createElement('div');ctrl.style.cssText='display:flex;gap:5px;align-items:center;padding:4px 8px;flex-shrink:0;background:rgba(0,0,0,0.3);';ctrl.innerHTML=`<label style="font-size:8.5px;color:#c084fc;">${tx.axes}</label><input type="range" id="d3d-mandala-axes" min="2" max="12" step="1" value="6" style="width:65px;accent-color:#c084fc;"><span id="d3d-mandala-axes-val" style="font-size:8.5px;color:#c084fc;font-weight:700;min-width:14px;">6</span>`;wrap.appendChild(ctrl);canvasEl=document.createElement('canvas');canvasEl.style.cssText='flex:1;display:block;cursor:crosshair;';wrap.appendChild(canvasEl);canvasWrap.appendChild(wrap);function rM(){canvasEl.width=canvasEl.clientWidth||200;canvasEl.height=canvasEl.clientHeight||150;ctx=canvasEl.getContext('2d');redrawMandala();}new ResizeObserver(rM).observe(canvasEl);setTimeout(rM,30);const axSl=wrap.querySelector('#d3d-mandala-axes'),axV=wrap.querySelector('#d3d-mandala-axes-val');if(axSl){axSl.oninput=()=>{mandalaAxes=parseInt(axSl.value);if(axV)axV.textContent=mandalaAxes;redrawMandala();};}canvasEl.addEventListener('pointerdown',ev=>{ev.preventDefault();mandalaIsDrawing=true;mandalaPoints=[];mandalaPoints.push(mXY(ev));redrawMandala();});canvasEl.addEventListener('pointermove',ev=>{if(!mandalaIsDrawing)return;ev.preventDefault();mandalaPoints.push(mXY(ev));redrawMandala();});window.addEventListener('pointerup',()=>{mandalaIsDrawing=false;});function mXY(ev){const r=canvasEl.getBoundingClientRect();return{x:(ev.touches?ev.touches[0].clientX:ev.clientX)-r.left-canvasEl.width/2,y:(ev.touches?ev.touches[0].clientY:ev.clientY)-r.top-canvasEl.height/2};}}
  function redrawMandala(){if(!ctx||!canvasEl)return;const W=canvasEl.width,H=canvasEl.height,CX=W/2,CY=H/2;ctx.clearRect(0,0,W,H);[40,80,120].forEach(r=>{ctx.beginPath();ctx.arc(CX,CY,r,0,Math.PI*2);ctx.strokeStyle='rgba(192,132,252,0.07)';ctx.lineWidth=1;ctx.stroke();});if(mandalaPoints.length<2)return;for(let a=0;a<mandalaAxes;a++){const angle=(Math.PI*2/mandalaAxes)*a,mirror=a%2===1;ctx.save();ctx.translate(CX,CY);ctx.rotate(angle);if(mirror)ctx.scale(1,-1);ctx.beginPath();ctx.moveTo(mandalaPoints[0].x,mandalaPoints[0].y);for(let i=1;i<mandalaPoints.length;i++)ctx.lineTo(mandalaPoints[i].x,mandalaPoints[i].y);ctx.strokeStyle=`hsl(${(a/mandalaAxes)*360},80%,65%)`;ctx.lineWidth=2.5;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();ctx.restore();}ctx.beginPath();ctx.arc(CX,CY,4,0,Math.PI*2);ctx.fillStyle='rgba(192,132,252,0.7)';ctx.fill();}

  /* ═══ BUILD: CAMERA ═══ */
  function buildCameraMode(){camCapture=null;camWrap=document.createElement('div');camWrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;';const topBar=document.createElement('div');topBar.style.cssText='display:flex;gap:3px;align-items:center;padding:4px 8px;flex-shrink:0;background:rgba(0,0,0,0.4);flex-wrap:wrap;';topBar.innerHTML=`<button id="d3d-cam-start" style="padding:3px 6px;font-size:8px;font-weight:700;border-radius:4px;cursor:pointer;background:rgba(236,72,153,0.15);color:#ec4899;border:1px solid rgba(236,72,153,0.35);">${tx.camStart}</button><button id="d3d-cam-capture" style="padding:3px 6px;font-size:8px;font-weight:700;border-radius:4px;cursor:pointer;background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.35);opacity:0.4;pointer-events:none;">${tx.camCapture}</button><label style="padding:3px 6px;font-size:8px;font-weight:700;border-radius:4px;cursor:pointer;background:rgba(59,130,246,0.15);color:#3b82f6;border:1px solid rgba(59,130,246,0.35);">${tx.camImport}<input id="d3d-cam-file" type="file" accept="image/*" style="display:none;"></label><span id="d3d-cam-status" style="font-size:8px;color:#64748b;"></span>`;camWrap.appendChild(topBar);const viewArea=document.createElement('div');viewArea.id='d3d-cam-view';viewArea.style.cssText='flex:1;position:relative;overflow:hidden;background:#0a1628;display:flex;align-items:center;justify-content:center;';viewArea.innerHTML=`<div style="text-align:center;color:#334155;"><div style="font-size:32px;">📷</div><div style="font-size:9px;margin-top:4px;">Start webcam or import a photo</div></div>`;camWrap.appendChild(viewArea);const botBar=document.createElement('div');botBar.style.cssText='display:flex;gap:4px;align-items:center;padding:4px 8px;flex-shrink:0;background:rgba(0,0,0,0.4);flex-wrap:wrap;';botBar.innerHTML=`<label style="font-size:8.5px;color:#ec4899;font-weight:700;">${tx.cam3dMode}</label><select id="d3d-cam-mode" style="font-size:8.5px;background:rgba(255,255,255,0.05);color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px 3px;"><option value="relief">${tx.camRelief}</option><option value="edges">${tx.camEdges}</option></select><label style="font-size:8.5px;color:#64748b;">${tx.camResolution}</label><input type="range" id="d3d-cam-res" min="20" max="80" step="10" value="48" style="width:50px;accent-color:#ec4899;"><span id="d3d-cam-res-val" style="font-size:8.5px;color:#ec4899;font-weight:700;min-width:19px;">48</span><label style="font-size:8.5px;color:#64748b;">${tx.camDepth}</label><input type="range" id="d3d-cam-depth" min="1" max="8" step="0.5" value="3" style="width:46px;accent-color:#ec4899;"><span id="d3d-cam-depth-val" style="font-size:8.5px;color:#ec4899;font-weight:700;min-width:22px;">3.0</span><label style="display:flex;align-items:center;gap:3px;font-size:8.5px;color:#f472b6;cursor:pointer;margin-left:3px;"><input type="checkbox" id="d3d-cam-invert" style="accent-color:#ec4899;width:11px;height:11px;">${tx.camInvert}</label>`;camWrap.appendChild(botBar);canvasWrap.appendChild(camWrap);setTimeout(()=>{const startBtn=camWrap.querySelector('#d3d-cam-start'),captureBtn=camWrap.querySelector('#d3d-cam-capture'),fileInp=camWrap.querySelector('#d3d-cam-file'),status=camWrap.querySelector('#d3d-cam-status'),resSlider=camWrap.querySelector('#d3d-cam-res'),resVal=camWrap.querySelector('#d3d-cam-res-val'),depSlider=camWrap.querySelector('#d3d-cam-depth'),depVal=camWrap.querySelector('#d3d-cam-depth-val');if(resSlider&&resVal)resSlider.oninput=()=>resVal.textContent=resSlider.value;if(depSlider&&depVal)depSlider.oninput=()=>depVal.textContent=parseFloat(depSlider.value).toFixed(1);if(startBtn)startBtn.onclick=()=>{if(camStream){stopCamera();viewArea.innerHTML=`<div style="text-align:center;color:#334155;"><div style="font-size:32px;">📷</div><div style="font-size:9px;margin-top:4px;">Start webcam or import a photo</div></div>`;startBtn.textContent=tx.camStart;captureBtn.style.opacity='0.4';captureBtn.style.pointerEvents='none';if(status)status.textContent='';}else{navigator.mediaDevices.getUserMedia({video:{facingMode:'user'}}).then(stream=>{camStream=stream;camVideoEl=document.createElement('video');camVideoEl.srcObject=stream;camVideoEl.autoplay=true;camVideoEl.playsInline=true;camVideoEl.style.cssText='width:100%;height:100%;object-fit:cover;';viewArea.innerHTML='';viewArea.appendChild(camVideoEl);startBtn.textContent=tx.camStop;captureBtn.style.opacity='1';captureBtn.style.pointerEvents='auto';if(status)status.textContent='🔴 Live';}).catch(()=>{if(status)status.textContent=tx.camNoCam;});}};if(captureBtn)captureBtn.onclick=()=>{if(!camVideoEl)return;const RES=resSlider?parseInt(resSlider.value):48;const tmpC=document.createElement('canvas');tmpC.width=camVideoEl.videoWidth||640;tmpC.height=camVideoEl.videoHeight||480;tmpC.getContext('2d').drawImage(camVideoEl,0,0);processCamCapture(tmpC,RES,status,viewArea);};if(fileInp)fileInp.onchange=()=>{const file=fileInp.files[0];if(!file)return;const rdr=new FileReader();rdr.onload=e=>{const img=new Image();img.onload=()=>{const RES=resSlider?parseInt(resSlider.value):48;const tmpC=document.createElement('canvas');tmpC.width=img.width;tmpC.height=img.height;tmpC.getContext('2d').drawImage(img,0,0);processCamCapture(tmpC,RES,status,viewArea,e.target.result);};img.src=e.target.result;};rdr.readAsDataURL(file);};},80);}
  function processCamCapture(src,RES,statusEl,viewArea,photoSrc){const ratio=src.width/src.height;const rW=ratio>=1?RES:Math.round(RES*ratio),rH=ratio>=1?Math.round(RES/ratio):RES;const tmpC=document.createElement('canvas');tmpC.width=rW;tmpC.height=rH;tmpC.getContext('2d').drawImage(src,0,0,rW,rH);const imgData=tmpC.getContext('2d').getImageData(0,0,rW,rH);camCapture={imgData,width:rW,height:rH,dataURL:photoSrc||src.toDataURL('image/jpeg',0.85)};if(viewArea){let thumb=viewArea.querySelector('.cam-thumb');if(!thumb){thumb=document.createElement('img');thumb.className='cam-thumb';thumb.style.cssText='position:absolute;bottom:4px;right:4px;width:44px;height:44px;object-fit:cover;border-radius:4px;border:2px solid #ec4899;z-index:10;';viewArea.appendChild(thumb);}if(camCapture.dataURL)thumb.src=camCapture.dataURL;}if(statusEl)statusEl.textContent=tx.camCaptured;}

  /* ══════════════════════════════════════════════════════
     ★ PHASE 4 NEW MODES ★
  ══════════════════════════════════════════════════════ */

  /* ═══ BUILD: AUDIO → 3D ═══ */
  function buildAudioMode(){
    audioSnapshot=null;audioCanvasEl=null;
    const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;';
    const topBar=document.createElement('div');topBar.style.cssText='display:flex;gap:3px;align-items:center;padding:4px 8px;flex-shrink:0;background:rgba(0,0,0,0.4);flex-wrap:wrap;';
    topBar.innerHTML=`<button id="d3d-aud-start" style="padding:3px 6px;font-size:8px;font-weight:700;border-radius:4px;cursor:pointer;background:rgba(34,211,238,0.15);color:#22d3ee;border:1px solid rgba(34,211,238,0.35);">${tx.audioStart}</button><button id="d3d-aud-snap" style="padding:3px 6px;font-size:8px;font-weight:700;border-radius:4px;cursor:pointer;background:rgba(16,185,129,0.15);color:#10b981;border:1px solid rgba(16,185,129,0.35);opacity:0.4;pointer-events:none;">${tx.audioSnap}</button><label style="padding:3px 6px;font-size:8px;font-weight:700;border-radius:4px;cursor:pointer;background:rgba(59,130,246,0.15);color:#3b82f6;border:1px solid rgba(59,130,246,0.35);">${tx.audioImport}<input id="d3d-aud-file" type="file" accept="audio/*" style="display:none;"></label><span id="d3d-aud-status" style="font-size:8px;color:#64748b;"></span>`;
    wrap.appendChild(topBar);
    // FFT Canvas
    audioCanvasEl=document.createElement('canvas');audioCanvasEl.style.cssText='flex:1;display:block;background:#050c18;';
    wrap.appendChild(audioCanvasEl);
    // Bottom controls
    const botBar=document.createElement('div');botBar.style.cssText='display:flex;gap:5px;align-items:center;padding:4px 8px;flex-shrink:0;background:rgba(0,0,0,0.4);';
    botBar.innerHTML=`<label style="font-size:8.5px;color:#22d3ee;font-weight:700;">${tx.audioShape}</label><select id="d3d-aud-shape" style="font-size:8.5px;background:rgba(255,255,255,0.05);color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px 3px;"><option value="bars">${tx.audioBars}</option><option value="circle">${tx.audioCircle}</option><option value="wave">${tx.audioWave}</option></select><label style="display:flex;align-items:center;gap:3px;font-size:8.5px;color:#22d3ee;cursor:pointer;margin-left:4px;"><input type="checkbox" id="d3d-aud-live" style="accent-color:#22d3ee;width:11px;height:11px;">${tx.audioLive}</label>`;
    wrap.appendChild(botBar);
    canvasWrap.appendChild(wrap);
    setTimeout(()=>{
      const startBtn=wrap.querySelector('#d3d-aud-start');
      const snapBtn=wrap.querySelector('#d3d-aud-snap');
      const fileInp=wrap.querySelector('#d3d-aud-file');
      const status=wrap.querySelector('#d3d-aud-status');
      function drawFFT(){
        if(!audioCanvasEl||!audioAnalyser)return;
        const W=audioCanvasEl.width=audioCanvasEl.clientWidth||200;
        const H=audioCanvasEl.height=audioCanvasEl.clientHeight||120;
        const c=audioCanvasEl.getContext('2d');c.clearRect(0,0,W,H);
        const bins=audioAnalyser.frequencyBinCount;const data=new Uint8Array(bins);
        audioAnalyser.getByteFrequencyData(data);
        const bw=W/bins;
        const grad=c.createLinearGradient(0,H,0,0);grad.addColorStop(0,'#3b82f6');grad.addColorStop(0.5,'#10b981');grad.addColorStop(1,'#22d3ee');
        c.fillStyle=grad;
        for(let i=0;i<bins;i++){const h=(data[i]/255)*H;c.fillRect(i*bw,H-h,Math.max(bw-1,1),h);}
        audioAnimId=requestAnimationFrame(drawFFT);
      }
      if(startBtn)startBtn.onclick=()=>{
        if(audioStream){stopAudio();startBtn.textContent=tx.audioStart;startBtn.style.color='#22d3ee';snapBtn.style.opacity='0.4';snapBtn.style.pointerEvents='none';if(status)status.textContent='';if(audioCanvasEl){const c=audioCanvasEl.getContext('2d');c.clearRect(0,0,audioCanvasEl.width,audioCanvasEl.height);}}
        else{navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{audioStream=stream;audioCtx=new (window.AudioContext||window.webkitAudioContext)();audioAnalyser=audioCtx.createAnalyser();audioAnalyser.fftSize=128;const src2=audioCtx.createMediaStreamSource(stream);src2.connect(audioAnalyser);startBtn.textContent=tx.audioStop;startBtn.style.color='#ef4444';snapBtn.style.opacity='1';snapBtn.style.pointerEvents='auto';if(status)status.textContent='🔴 Live';drawFFT();}).catch(()=>{if(status)status.textContent=tx.audioNoMic;});}
      };
      if(snapBtn)snapBtn.onclick=()=>{
        if(!audioAnalyser)return;
        const bins=audioAnalyser.frequencyBinCount;const data=new Uint8Array(bins);audioAnalyser.getByteFrequencyData(data);
        audioSnapshot=Array.from(data).map(v=>v/255);
        if(status)status.textContent=`${tx.audioSnapped} (${bins} bins)`;
      };
      if(fileInp)fileInp.onchange=()=>{
        const file=fileInp.files[0];if(!file)return;
        const rdr=new FileReader();rdr.onload=e=>{
          const tmpCtx=new (window.AudioContext||window.webkitAudioContext)();
          tmpCtx.decodeAudioData(e.target.result.slice(),decoded=>{
            const ch=decoded.getChannelData(0);const BINS=64;const step=Math.floor(ch.length/BINS);
            audioSnapshot=[];for(let i=0;i<BINS;i++){let sum=0;for(let j=0;j<step;j++)sum+=Math.abs(ch[i*step+j]||0);audioSnapshot.push(Math.min(1,sum/step*3));}
            if(status)status.textContent=`${tx.audioSnapped} (${file.name})`;
            // Draw static bars
            if(audioCanvasEl){const W=audioCanvasEl.width=audioCanvasEl.clientWidth||200,H=audioCanvasEl.height=audioCanvasEl.clientHeight||120;const c=audioCanvasEl.getContext('2d');c.clearRect(0,0,W,H);const bw=W/BINS;const grad=c.createLinearGradient(0,H,0,0);grad.addColorStop(0,'#3b82f6');grad.addColorStop(0.5,'#10b981');grad.addColorStop(1,'#22d3ee');c.fillStyle=grad;audioSnapshot.forEach((v,i)=>{const h=v*H;c.fillRect(i*bw,H-h,Math.max(bw-1,1),h);});}
            try{tmpCtx.close();}catch(e){}
          },err=>{if(status)status.textContent='⚠️ Decode error';});
        };rdr.readAsArrayBuffer(file);
      };
    },80);
  }

  /* ═══ BUILD: DATA CHART ═══ */
  function buildDataChartMode(){
    const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:9px;box-sizing:border-box;';
    const ta=document.createElement('textarea');ta.id='d3d-data-input';ta.placeholder=tx.dataPlaceholder;ta.value=tx.dataPlaceholder;
    ta.style.cssText='width:100%;flex:1;min-height:60px;padding:7px;font-size:10px;font-family:monospace;background:rgba(251,146,60,0.07);color:#fed7aa;border:1px solid rgba(251,146,60,0.3);border-radius:6px;outline:none;resize:none;box-sizing:border-box;';
    ta.onfocus=()=>ta.style.borderColor='#fb923c';ta.onblur=()=>ta.style.borderColor='rgba(251,146,60,0.3)';
    wrap.appendChild(ta);
    const ctrls=document.createElement('div');ctrls.style.cssText='display:flex;flex-direction:column;gap:5px;flex-shrink:0;';
    ctrls.innerHTML=`<div style="display:flex;gap:5px;align-items:center;flex-wrap:wrap;"><label style="font-size:8.5px;color:#fb923c;font-weight:700;">${tx.dataType}</label><select id="d3d-data-type" style="font-size:8.5px;background:rgba(255,255,255,0.05);color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px 3px;"><option value="bar">${tx.dataBar}</option><option value="pie">${tx.dataPie}</option><option value="line">${tx.dataLine}</option></select><label style="font-size:8.5px;color:#64748b;">${tx.dataColors}</label><select id="d3d-data-colors" style="font-size:8.5px;background:rgba(255,255,255,0.05);color:#e2e8f0;border:1px solid rgba(255,255,255,0.1);border-radius:4px;padding:2px 3px;"><option value="rainbow">${tx.dataRainbow}</option><option value="gradient">${tx.dataGradient}</option></select></div>`;
    wrap.appendChild(ctrls);
    canvasWrap.appendChild(wrap);
  }

  /* ═══ BUILD: GLOBE ═══ */
  function buildGlobeMode(){
    globeCapture=null;globeWrap=document.createElement('div');globeWrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:8px;box-sizing:border-box;';
    const drop=document.createElement('div');drop.style.cssText='flex:1;border:2px dashed rgba(52,211,153,0.4);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px;cursor:pointer;background:rgba(52,211,153,0.04);position:relative;overflow:hidden;';
    const lbl=document.createElement('div');lbl.style.cssText='font-size:9.5px;font-weight:700;color:#34d399;text-align:center;z-index:2;position:relative;';lbl.innerHTML=`<div style="font-size:24px;margin-bottom:3px;">🌐</div>${tx.globeDrop}`;drop.appendChild(lbl);
    const ip=document.createElement('img');ip.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0.4;display:none;';drop.appendChild(ip);
    const st=document.createElement('div');st.style.cssText='font-size:8.5px;color:#64748b;z-index:2;position:relative;text-align:center;';drop.appendChild(st);
    const inp=document.createElement('input');inp.type='file';inp.accept='image/*';inp.style.display='none';drop.appendChild(inp);
    drop.onclick=()=>inp.click();drop.ondragover=ev=>ev.preventDefault();drop.ondrop=ev=>{ev.preventDefault();if(ev.dataTransfer.files[0])loadGlobe(ev.dataTransfer.files[0]);};inp.onchange=()=>{if(inp.files[0])loadGlobe(inp.files[0]);};
    function loadGlobe(file){const r=new FileReader();r.onload=e=>{const src=e.target.result;const img=new Image();img.onload=()=>{const RES=64;const tmp=document.createElement('canvas');tmp.width=RES;tmp.height=RES/2;const tc=tmp.getContext('2d');tc.drawImage(img,0,0,RES,RES/2);const imgData=tc.getImageData(0,0,RES,RES/2);globeCapture={imgData,width:RES,height:RES/2,dataURL:e.target.result};ip.src=src;ip.style.display='block';lbl.style.display='none';st.textContent=`${tx.globeLoaded}: ${file.name}`;};img.src=src;};r.readAsDataURL(file);}
    globeWrap.appendChild(drop);
    const ctrl=document.createElement('div');ctrl.style.cssText='display:flex;flex-direction:column;gap:4px;flex-shrink:0;';
    ctrl.innerHTML=`<div style="display:flex;gap:5px;align-items:center;"><label style="font-size:8.5px;color:#64748b;min-width:70px;">${tx.globeDisp}</label><input type="range" id="d3d-globe-disp" min="0.2" max="3" step="0.1" value="1" style="flex:1;accent-color:#34d399;"><span id="d3d-globe-disp-val" style="font-size:8.5px;color:#34d399;font-weight:700;min-width:22px;">1.0</span></div><div style="display:flex;gap:5px;align-items:center;"><label style="font-size:8.5px;color:#64748b;min-width:70px;">${tx.globeRes}</label><input type="range" id="d3d-globe-res" min="32" max="128" step="16" value="64" style="flex:1;accent-color:#34d399;"><span id="d3d-globe-res-val" style="font-size:8.5px;color:#34d399;font-weight:700;min-width:22px;">64</span></div>`;
    globeWrap.appendChild(ctrl);canvasWrap.appendChild(globeWrap);
    setTimeout(()=>{const d=globeWrap.querySelector('#d3d-globe-disp'),dv=globeWrap.querySelector('#d3d-globe-disp-val');const res=globeWrap.querySelector('#d3d-globe-res'),rv=globeWrap.querySelector('#d3d-globe-res-val');if(d&&dv)d.oninput=()=>dv.textContent=parseFloat(d.value).toFixed(1);if(res&&rv)res.oninput=()=>rv.textContent=res.value;},80);
  }

  /* ═══ BUILD: QR CODE ═══ */
  function buildQRMode(){
    const wrap=document.createElement('div');wrap.style.cssText='position:absolute;inset:0;display:flex;flex-direction:column;gap:6px;padding:9px;box-sizing:border-box;';
    const inp=document.createElement('input');inp.id='d3d-qr-text';inp.type='text';inp.placeholder=tx.qrPh;inp.value='https://ia-architecte.com';
    inp.style.cssText='width:100%;padding:8px 10px;font-size:10px;background:rgba(167,139,250,0.08);color:#c4b5fd;border:1px solid rgba(167,139,250,0.35);border-radius:6px;outline:none;box-sizing:border-box;flex-shrink:0;';
    inp.onfocus=()=>inp.style.borderColor='#a78bfa';inp.onblur=()=>inp.style.borderColor='rgba(167,139,250,0.35)';
    wrap.appendChild(inp);
    // QR preview canvas
    const previewLabel=document.createElement('div');previewLabel.style.cssText='font-size:8.5px;color:#a78bfa;font-weight:700;flex-shrink:0;';previewLabel.textContent=tx.qrPreview;
    wrap.appendChild(previewLabel);
    const qrCanvas=document.createElement('canvas');qrCanvas.id='d3d-qr-canvas';qrCanvas.style.cssText='flex:1;image-rendering:pixelated;border-radius:6px;border:1px solid rgba(167,139,250,0.2);background:#fff;min-height:60px;';
    wrap.appendChild(qrCanvas);
    const ctrl=document.createElement('div');ctrl.style.cssText='display:flex;gap:5px;align-items:center;flex-wrap:wrap;flex-shrink:0;';
    ctrl.innerHTML=`<label style="font-size:8.5px;color:#64748b;">${tx.qrColor}</label><input type="color" id="d3d-qr-color" value="${currentColor}" style="width:24px;height:20px;border:none;border-radius:3px;cursor:pointer;padding:0;background:transparent;"><label style="font-size:8.5px;color:#64748b;margin-left:3px;">${tx.qrSize}</label><input type="range" id="d3d-qr-size" min="0.3" max="1.2" step="0.1" value="0.8" style="width:55px;accent-color:#a78bfa;"><span id="d3d-qr-size-val" style="font-size:8.5px;color:#a78bfa;font-weight:700;min-width:25px;">0.8</span>`;
    wrap.appendChild(ctrl);
    canvasWrap.appendChild(wrap);
    // Load QR library dynamically
    setTimeout(()=>{
      const sizeSlider=canvasWrap.querySelector('#d3d-qr-size');const sizeVal=canvasWrap.querySelector('#d3d-qr-size-val');
      if(sizeSlider&&sizeVal)sizeSlider.oninput=()=>{sizeVal.textContent=parseFloat(sizeSlider.value).toFixed(1);};
      function updateQR(){
        const text=canvasWrap.querySelector('#d3d-qr-text')?.value||'IA Architecte';
        if(!window.QRCode){loadQRLib(updateQR);return;}
        try{window.QRCode.toCanvas(qrCanvas,text,{width:qrCanvas.clientWidth||200,margin:2,color:{dark:'#000000',light:'#ffffff'}},err=>{if(err)console.warn('QR:',err);});}catch(e){console.warn('QR err:',e);}
      }
      inp.oninput=updateQR;
      updateQR();
    },80);
  }
  function loadQRLib(cb){
    if(document.getElementById('d3d-qrlib')){
      if(window.QRCode&&window.QRCode.toCanvas)cb();
      else setTimeout(()=>loadQRLib(cb),200);
      return;
    }
    const s=document.createElement('script');s.id='d3d-qrlib';
    // Use qrcode-generator (lightweight, browser-native, no module system)
    s.src='https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
    s.onload=()=>{
      // Wrap qrcode-generator API to match QRCode.toCanvas interface
      window.QRCode=window.QRCode||{};
      window.QRCode.toCanvas=function(canvas,text,opts,cbk){
        try{
          const qr=qrcode(0,'M');
          qr.addData(text);qr.make();
          const N=qr.getModuleCount();
          const W=(opts&&opts.width)?opts.width:200;
          const cs=Math.floor(W/N);
          canvas.width=N*cs;canvas.height=N*cs;
          const c=canvas.getContext('2d');c.clearRect(0,0,canvas.width,canvas.height);
          c.fillStyle='#ffffff';c.fillRect(0,0,canvas.width,canvas.height);
          c.fillStyle='#000000';
          for(let r=0;r<N;r++)for(let cc=0;cc<N;cc++){if(qr.isDark(r,cc))c.fillRect(cc*cs,r*cs,cs,cs);}
          if(cbk)cbk(null);
        }catch(e){if(cbk)cbk(e);}
      };
      cb();
    };
    s.onerror=()=>console.warn('QR lib failed');
    document.head.appendChild(s);
  }

  /* ══════════════════════════════════════════════════════
     GENERATE 3D
  ══════════════════════════════════════════════════════ */
  function generate3D(){
    let code='';const tx2=D3D_LANG[window.lang||'en']||D3D_LANG.en;
    try{const gen={
      extrude:()=>genExtrude(tx2),lathe:()=>genLathe(tx2),voxel:()=>genVoxel(tx2),
      pixel:()=>genPixel(tx2),svg:()=>genSVG(tx2),heightmap:()=>genHeightmap(tx2),
      text3d:()=>genText3D(tx2),formula:()=>genFormula(tx2),paint:()=>genPaint(tx2),
      mandala:()=>genMandala(tx2),camera:()=>genCamera(tx2),
      audio:()=>genAudio(tx2),datachart:()=>genDataChart(tx2),
      globe:()=>genGlobe(tx2),qrcode:()=>genQRCode(tx2),
    };if(gen[activeMode])code=gen[activeMode]();}
    catch(err){console.error('[Draw→3D]',err);if(window.showToast)window.showToast('⚠️ '+err.message);return;}
    if(!code)return;injectCode(code,tx2.generated);
  }

  /* HTML helpers */
  function hi(h){return h.replace('#','0x');}
  function mObj(col){const c=hi(col),wf=wireframe?',wireframe:true':'';return materialType==='glass'?`{color:${c},metalness:0.1,roughness:0.0,transparent:true,opacity:0.55${wf}}`:materialType==='matte'?`{color:${c},metalness:0.0,roughness:0.85${wf}}`:`{color:${c},metalness:0.85,roughness:0.15${wf}}`;}
  function hWrap(title,js3){return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${title}</title>\n<script>\n(function w(){if(window.parent&&window.parent.THREE&&!window.THREE){window.THREE=window.parent.THREE;return;}if(!window.THREE)setTimeout(w,40);})();\n<\/script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>\n<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>\n<style>*{margin:0;padding:0}body{background:#080c14;overflow:hidden}canvas{display:block}<\/style>\n</head><body><script>${js3}\nwindow.addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});\n<\/script></body></html>`;}
  function hWrapRich(title,srcs,js3){const hs=srcs.map(s=>`<script src="${s}"><\/script>`).join('\n');return `<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>${title}</title>\n<script>\n(function w(){if(window.parent&&window.parent.THREE&&!window.THREE){window.THREE=window.parent.THREE;return;}if(!window.THREE)setTimeout(w,40);})();\n<\/script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"><\/script>\n<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"><\/script>\n${hs}\n<style>*{margin:0;padding:0}body{background:#080c14;overflow:hidden}canvas{display:block}<\/style>\n</head><body><script>${js3}\nwindow.addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});\n<\/script></body></html>`;}
  function sc3(camZ){return `var scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x080c14,0.025);var cam=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,0.1,500);cam.position.set(0,4,${camZ||18});cam.lookAt(0,0,0);var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;document.body.appendChild(renderer.domElement);var controls=new THREE.OrbitControls(cam,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=0.07;controls.autoRotate=${autoRotate};controls.autoRotateSpeed=1.5;scene.add(new THREE.AmbientLight(0xffffff,0.5));var sun=new THREE.DirectionalLight(0xffffff,1.2);sun.position.set(8,14,8);sun.castShadow=true;scene.add(sun);var fill=new THREE.PointLight(0x3b82f6,1.5,60);fill.position.set(-8,-2,-8);scene.add(fill);var rim=new THREE.PointLight(0x10b981,1,40);rim.position.set(0,8,0);scene.add(rim);var gh=new THREE.GridHelper(30,30,0x10b981,0x1e293b);gh.position.y=-3;gh.material.transparent=true;gh.material.opacity=0.13;scene.add(gh);`;}
  function lp3(anim){return `var t=0;(function loop(){requestAnimationFrame(loop);t+=0.016;controls.update();${anim||''}renderer.render(scene,cam);})();`;}

  /* ── Existing generators (compact) ── */
  function genExtrude(tx2){if(drawPoints.length<5){if(window.showToast)window.showToast(tx2.errFewPts);return'';}const W=canvasEl?canvasEl.width:400,H=canvasEl?canvasEl.height:300,scale=14/Math.min(W,H);const step=Math.max(1,Math.floor(drawPoints.length/80));const pts=[];for(let i=0;i<drawPoints.length;i+=step){const p=drawPoints[i];pts.push(`{x:${((p.x-W/2)*scale).toFixed(3)},y:${(-(p.y-H/2)*scale).toFixed(3)}}`);}return hWrap('✏️ Extrusion 3D',`${sc3(18)}var rawPts=[${pts.join(',')}];var sh=new THREE.Shape();if(rawPts.length){sh.moveTo(rawPts[0].x,rawPts[0].y);rawPts.slice(1).forEach(function(p){sh.lineTo(p.x,p.y);});sh.lineTo(rawPts[0].x,rawPts[0].y);}var geo=new THREE.ExtrudeGeometry(sh,{depth:${depth},bevelEnabled:true,bevelSegments:3,steps:2,bevelSize:0.12,bevelThickness:0.12});geo.computeBoundingBox();var bc=new THREE.Vector3();geo.boundingBox.getCenter(bc);geo.translate(-bc.x,-bc.y,-bc.z);var mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial(${mObj(currentColor)}));mesh.castShadow=true;scene.add(mesh);${lp3(animate3d?'mesh.position.y=Math.sin(t)*0.3;':'')}`);}
  function genLathe(tx2){if(drawPoints.length<4){if(window.showToast)window.showToast(tx2.errFewPts);return'';}const W=canvasEl?canvasEl.width:400,H=canvasEl?canvasEl.height:300,scale=10/H;const step=Math.max(1,Math.floor(drawPoints.length/60));const pts=[];for(let i=0;i<drawPoints.length;i+=step){const p=drawPoints[i];const rx=Math.abs(p.x-W/2)*scale,ry=(-(p.y-H/2))*scale;if(rx>0.01)pts.push(`new THREE.Vector2(${rx.toFixed(3)},${ry.toFixed(3)})`);}if(pts.length<2){if(window.showToast)window.showToast(tx2.errFewPts);return'';}return hWrap('🔄 Revolution 3D',`${sc3(16)}var pts=[${pts.join(',')}];var geo=new THREE.LatheGeometry(pts,${LATHE_SEG});var mesh=new THREE.Mesh(geo,new THREE.MeshStandardMaterial(${mObj(currentColor)}));mesh.castShadow=true;var bb=new THREE.Box3().setFromObject(mesh);var bc=bb.getCenter(new THREE.Vector3());mesh.position.sub(bc);scene.add(mesh);${lp3(animate3d?'mesh.position.y=Math.sin(t)*0.2;':'')}`);}
  function genVoxel(tx2){const keys=Object.keys(voxelData);if(!keys.length){if(window.showToast)window.showToast(tx2.errNoVoxels);return'';}const N=VOXEL_N,wf=wireframe?',wireframe:true':'';const bl=keys.map(k=>{const[r,c]=k.split('_').map(Number);return`{x:${c-N/2},y:0,z:${r-N/2},c:'${voxelData[k]}'}`;});return hWrap('🧱 Voxels 3D',`${sc3(20)}var voxels=[${bl.join(',')}];var gb2=new THREE.BoxGeometry(1,1,1);var mats={};var grp=new THREE.Group();voxels.forEach(function(v){if(!mats[v.c])mats[v.c]=new THREE.MeshStandardMaterial({color:v.c,metalness:0.3,roughness:0.5${wf}});var m=new THREE.Mesh(gb2,mats[v.c]);m.position.set(v.x,v.y,v.z);m.castShadow=true;grp.add(m);});var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);grp.position.y+=0.5;scene.add(grp);${lp3(animate3d?'grp.position.y=Math.sin(t)*0.3+0.5;':'')}`);}
  function genPixel(tx2){const keys=Object.keys(pixelData);if(!keys.length){if(window.showToast)window.showToast(tx2.errNoPixels);return'';}const N=PIXEL_N,wf=wireframe?',wireframe:true':'';const bl=keys.map(k=>{const[r,cc]=k.split('_').map(Number);return`{x:${((cc-N/2)*1.05).toFixed(2)},y:${(-(r-N/2)*1.05).toFixed(2)},c:'${pixelData[k]}'}`;});return hWrap('🟦 Pixel Art 3D',`${sc3(22)}var pixels=[${bl.join(',')}];var pGeo=new THREE.BoxGeometry(1,1,0.55);var pMats={};var grp=new THREE.Group();pixels.forEach(function(p){if(!pMats[p.c])pMats[p.c]=new THREE.MeshStandardMaterial({color:p.c,metalness:0.4,roughness:0.4${wf}});var m=new THREE.Mesh(pGeo,pMats[p.c]);m.position.set(p.x,p.y,0);m.castShadow=true;grp.add(m);});var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);scene.add(grp);${lp3(animate3d?'grp.rotation.y=Math.sin(t*0.4)*0.35;':'')}`);}
  function genSVG(tx2){if(!svgSource){if(window.showToast)window.showToast(tx2.errNoSVG);return'';}const b64=btoa(unescape(encodeURIComponent(svgSource)));const dURL='data:image/svg+xml;base64,'+b64;const wf=wireframe?',wireframe:true':'';const anim=animate3d?'grp.rotation.y+=0.005;':'';return hWrapRich('🎨 SVG→3D',['https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/SVGLoader.js'],`${sc3(22)}(function waitSVG(){if(!THREE.SVGLoader){setTimeout(waitSVG,60);return;}var loader=new THREE.SVGLoader();loader.load('${dURL}',function(data){var grp=new THREE.Group();var fb=new THREE.Color(${hi(currentColor)});data.paths.forEach(function(path){var color=path.color&&path.color.isColor?path.color:fb;THREE.SVGLoader.createShapes(path).forEach(function(shape){var geo=new THREE.ExtrudeGeometry(shape,{depth:${depth},bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:0.04,bevelThickness:0.04});grp.add(new THREE.Mesh(geo,new THREE.MeshStandardMaterial({color:color,metalness:0.7,roughness:0.2${wf}})));});});var bb=new THREE.Box3().setFromObject(grp);var bs=new THREE.Vector3();bb.getSize(bs);var n=20/Math.max(bs.x,bs.y,0.001);grp.scale.set(n,-n,n);var bb2=new THREE.Box3().setFromObject(grp);var bc=bb2.getCenter(new THREE.Vector3());grp.position.sub(bc);scene.add(grp);var t=0;(function loop(){requestAnimationFrame(loop);t+=0.016;controls.update();${anim}renderer.render(scene,cam);})();});})();`);}
  function genHeightmap(tx2){if(!heightmapData){if(window.showToast)window.showToast(tx2.errNoImage);return'';}const amp=parseFloat(canvasWrap.querySelector('#d3d-hm-amp')?.value||3);const{grid,w:RES}=heightmapData;const DS=32;const ds=[];for(let r=0;r<DS;r++)for(let c=0;c<DS;c++){const sr=Math.floor(r/DS*RES),sc2=Math.floor(c/DS*RES);ds.push(grid[sr*RES+sc2].toFixed(3));}const wf=wireframe?',wireframe:true':'';return hWrap('🖼️ Heightmap 3D',`${sc3(26)}var G=[${ds.join(',')}];var N=${DS},SIZE=20,AMP=${amp};var geo=new THREE.PlaneGeometry(SIZE,SIZE,N-1,N-1);geo.rotateX(-Math.PI/2);var pos=geo.attributes.position;for(var i=0;i<pos.count;i++)pos.setY(i,(G[i]||0)*AMP);geo.computeVertexNormals();var cols=[];for(var i=0;i<pos.count;i++){var h=pos.getY(i)/AMP;var lo=new THREE.Color(0x1e3a8a),mi=new THREE.Color(0xf59e0b),hi2=new THREE.Color(0x10b981);var c=h<0.5?lo.lerp(mi,h*2):mi.clone().lerp(hi2,(h-0.5)*2);cols.push(c.r,c.g,c.b);}geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));var mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.6,metalness:0.1${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;var bb=new THREE.Box3().setFromObject(mesh);var bc=bb.getCenter(new THREE.Vector3());mesh.position.sub(bc);scene.add(mesh);cam.position.set(0,14,22);cam.lookAt(0,0,0);${lp3(animate3d?'mesh.rotation.z=Math.sin(t*0.2)*0.04;':'')}`);}
  function genText3D(tx2){const text=(canvasWrap.querySelector('#d3d-text-input')?.value||'IA 3D').trim();const fontType=canvasWrap.querySelector('#d3d-font-type')?.value||'helvetiker';const tSize=parseFloat(canvasWrap.querySelector('#d3d-text-size')?.value||1.5);const tDepth=parseFloat(canvasWrap.querySelector('#d3d-text-depth')?.value||0.3);const bevel=canvasWrap.querySelector('#d3d-text-bevel')?.checked??true;const multi=canvasWrap.querySelector('#d3d-text-multicolor')?.checked||false;if(!text){if(window.showToast)window.showToast(tx2.errNoText);return'';}const FONT_URL=`https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/${fontType}_regular.typeface.json`;const safeText=text.replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\r?\n/g,' ');const COLORS=multi?"['#ff6b6b','#ffd93d','#6bcb77','#4d96ff','#c77dff','#f72585','#4cc9f0']":`['${currentColor}']`;const wf=wireframe?',wireframe:true':'';const anim=animate3d?'grp.rotation.y+=0.01;grp.position.y=Math.sin(t)*0.3;':'';return hWrapRich(`🔤 Text 3D`,['https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FontLoader.js','https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/geometries/TextGeometry.js'],`${sc3(18)}(function waitFont(){if(!THREE.FontLoader||!THREE.TextGeometry){setTimeout(waitFont,60);return;}var loader=new THREE.FontLoader();loader.load('${FONT_URL}',function(font){var letters='${safeText}'.split('');var COLORS=${COLORS};var grp=new THREE.Group();var xOff=0;letters.forEach(function(ch,i){if(ch===' '){xOff+=${tSize}*0.6;return;}var geo=new THREE.TextGeometry(ch,{font:font,size:${tSize},height:${tDepth},curveSegments:6,bevelEnabled:${bevel},bevelThickness:0.03,bevelSize:0.02,bevelSegments:3});geo.computeBoundingBox();var cw2=geo.boundingBox.max.x-geo.boundingBox.min.x;var mat=new THREE.MeshStandardMaterial({color:COLORS[i%COLORS.length],metalness:0.8,roughness:0.15${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.position.x=xOff;mesh.castShadow=true;grp.add(mesh);xOff+=cw2+0.08;});var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);scene.add(grp);var t=0;(function loop(){requestAnimationFrame(loop);t+=0.016;controls.update();${anim}renderer.render(scene,cam);})();});})();`);}
  function genFormula(tx2){const N=parseInt(canvasWrap.querySelector('#d3d-formula-res')?.value||30);const R=parseFloat(canvasWrap.querySelector('#d3d-formula-range')?.value||6);let fn;try{fn=new Function('x','y','return '+formulaStr);}catch(e){if(window.showToast)window.showToast(tx2.errFormula);return'';}const vals=[];let minV=Infinity,maxV=-Infinity;for(let r=0;r<=N;r++)for(let c=0;c<=N;c++){const x=(c/N*2-1)*R,y=(r/N*2-1)*R;let v=0;try{v=fn(x,y);if(!isFinite(v))v=0;}catch(e){}vals.push(v);if(v<minV)minV=v;if(v>maxV)maxV=v;}const wf=wireframe?',wireframe:true':'';return hWrap(`∫ Formula 3D`,`${sc3(22)}var VALS=[${vals.map(v=>v.toFixed(4)).join(',')}];var N=${N},SIZE=16,MINV=${minV.toFixed(4)},MAXV=${maxV.toFixed(4)};var geo=new THREE.PlaneGeometry(SIZE,SIZE,N,N);geo.rotateX(-Math.PI/2);var pos=geo.attributes.position;var range=MAXV-MINV||1;var cols=[];for(var i=0;i<pos.count;i++){var h=VALS[i]||0;pos.setY(i,h);var t2=(h-MINV)/range;var lo=new THREE.Color(0x1e3a8a),mi=new THREE.Color(0xf59e0b),hi2=new THREE.Color(0x10b981);var c=t2<0.5?lo.lerp(mi,t2*2):mi.clone().lerp(hi2,(t2-0.5)*2);cols.push(c.r,c.g,c.b);}geo.computeVertexNormals();geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));var mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.3,metalness:0.2,side:THREE.DoubleSide${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;var bb=new THREE.Box3().setFromObject(mesh);var bc=bb.getCenter(new THREE.Vector3());mesh.position.sub(bc);scene.add(mesh);cam.position.set(0,12,20);cam.lookAt(0,0,0);${lp3(animate3d?'mesh.rotation.z+=0.003;mesh.position.y=Math.sin(t*0.5)*0.4;':'')}`);}
  function genPaint(tx2){const N=terrainN;const ds=[];for(let i=0;i<N*N;i++)ds.push((terrainGrid?terrainGrid[i]:0.1).toFixed(3));const wf=wireframe?',wireframe:true':'';return hWrap('🗻 Terrain 3D',`${sc3(28)}var G=[${ds.join(',')}];var N=${N},SIZE=20,AMP=4.0;var geo=new THREE.PlaneGeometry(SIZE,SIZE,N-1,N-1);geo.rotateX(-Math.PI/2);var pos=geo.attributes.position;for(var i=0;i<pos.count;i++)pos.setY(i,(G[i]||0)*AMP);geo.computeVertexNormals();var cols=[];for(var i=0;i<pos.count;i++){var h=pos.getY(i)/AMP;var c=h<0.4?new THREE.Color(0x1e3a8a).lerp(new THREE.Color(0x22c55e),h/0.4):h<0.7?new THREE.Color(0x22c55e).lerp(new THREE.Color(0x78716c),(h-0.4)/0.3):new THREE.Color(0x78716c).lerp(new THREE.Color(0xffffff),(h-0.7)/0.3);cols.push(c.r,c.g,c.b);}geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));var mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.8,metalness:0.0${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;var bb=new THREE.Box3().setFromObject(mesh);var bc=bb.getCenter(new THREE.Vector3());mesh.position.sub(bc);scene.add(mesh);cam.position.set(0,16,24);cam.lookAt(0,0,0);${lp3(animate3d?'mesh.rotation.z=Math.sin(t*0.15)*0.05;':'')}`);}
  function genMandala(tx2){if(mandalaPoints.length<4){if(window.showToast)window.showToast(tx2.errMandala);return'';}const W=canvasEl?canvasEl.width:300,H=canvasEl?canvasEl.height:200,scale=16/Math.max(W,H);const step=Math.max(1,Math.floor(mandalaPoints.length/60));const pts=[];for(let i=0;i<mandalaPoints.length;i+=step){const p=mandalaPoints[i];pts.push(`[${(p.x*scale).toFixed(3)},${(p.y*scale).toFixed(3)}]`);}const wf=wireframe?',wireframe:true':'';const COLORS=['#10b981','#3b82f6','#c084fc','#f59e0b','#ef4444','#22d3ee','#f472b6','#a3e635','#fb923c','#818cf8','#e879f9','#34d399'];return hWrap('🌀 Mandala 3D',`${sc3(22)}var branchPts=[${pts.join(',')}];var AXES=${mandalaAxes};var DEPTH=${depth};var grp=new THREE.Group();var COLORS=${JSON.stringify(COLORS)};for(var a=0;a<AXES;a++){var angle=Math.PI*2/AXES*a;var mirror=a%2===1;var shape=new THREE.Shape();branchPts.forEach(function(p,i){var px=p[0],py=p[1];if(mirror)py=-py;var rx=px*Math.cos(angle)-py*Math.sin(angle);var ry=px*Math.sin(angle)+py*Math.cos(angle);if(i===0)shape.moveTo(rx,ry);else shape.lineTo(rx,ry);});var geo=new THREE.ExtrudeGeometry(shape,{depth:DEPTH,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:0.05,bevelThickness:0.05});var mat=new THREE.MeshStandardMaterial({color:new THREE.Color(COLORS[a%COLORS.length]),metalness:0.7,roughness:0.2${wf}});var m=new THREE.Mesh(geo,mat);m.castShadow=true;grp.add(m);}var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);scene.add(grp);${lp3(animate3d?'grp.rotation.z+=0.006;':'')}`);}
  function genCamera(tx2){if(!camCapture){if(window.showToast)window.showToast(tx2.errNoCapture);return'';}const modeEl=camWrap&&camWrap.querySelector('#d3d-cam-mode'),depthEl=camWrap&&camWrap.querySelector('#d3d-cam-depth'),invertEl=camWrap&&camWrap.querySelector('#d3d-cam-invert');const is3DMode=modeEl?modeEl.value:'relief';const reliefDepth=depthEl?parseFloat(depthEl.value):3;const doInvert=invertEl?invertEl.checked:false;const{imgData,width:W,height:H}=camCapture;const src2=imgData.data;const data=new Uint8ClampedArray(src2.length);for(let i=0;i<src2.length;i+=4){data[i]=doInvert?255-src2[i]:src2[i];data[i+1]=doInvert?255-src2[i+1]:src2[i+1];data[i+2]=doInvert?255-src2[i+2]:src2[i+2];data[i+3]=src2[i+3];}const wf=wireframe?',wireframe:true':'';if(is3DMode==='edges'){return genCamEdges(data,W,H,wf);}return genCamRelief(data,W,H,reliefDepth,wf);}
  function genCamRelief(data,W,H,reliefDepth,wf){const brightArr=[],colorArr=[];for(let i=0;i<W*H;i++){const r=data[i*4],g=data[i*4+1],b=data[i*4+2];brightArr.push(((r*0.299+g*0.587+b*0.114)/255).toFixed(3));colorArr.push(`[${(r/255).toFixed(2)},${(g/255).toFixed(2)},${(b/255).toFixed(2)}]`);}const SW=16,SH=Math.round(16*H/W);return hWrap('📷 Photo Relief 3D',`${sc3(20)}var BRIGHT=[${brightArr.join(',')}];var COLORS=[${colorArr.join(',')}];var W=${W},H=${H},SW=${SW},SH=${SH},DEPTH=${reliefDepth};var geo=new THREE.PlaneGeometry(SW,SH,W-1,H-1);var pos=geo.attributes.position;var cols=[];for(var i=0;i<pos.count;i++){var col2=Math.round((pos.getX(i)/SW+0.5)*(W-1));var row2=Math.round((0.5-pos.getY(i)/SH)*(H-1));col2=Math.max(0,Math.min(W-1,col2));row2=Math.max(0,Math.min(H-1,row2));var pidx=row2*W+col2;pos.setZ(i,(BRIGHT[pidx]||0)*DEPTH);var c=COLORS[pidx]||[0.5,0.5,0.5];cols.push(c[0],c[1],c[2]);}geo.computeVertexNormals();geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));var mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.4,metalness:0.1,side:THREE.DoubleSide${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;var bb=new THREE.Box3().setFromObject(mesh);var bc=bb.getCenter(new THREE.Vector3());mesh.position.sub(bc);scene.add(mesh);cam.position.set(0,0,22);cam.lookAt(0,0,0);${lp3(animate3d?'mesh.rotation.y+=0.004;':'')}`);}
  function genCamEdges(data,W,H,wf){const edges=[];const threshold=0.15;const SW=16,SH=Math.round(16*H/W);for(let r=1;r<H-1;r++)for(let c=1;c<W-1;c++){function lm(ro,co){const idx=(ro*W+co)*4;return(data[idx]*0.299+data[idx+1]*0.587+data[idx+2]*0.114)/255;}const gx=-lm(r-1,c-1)-2*lm(r,c-1)-lm(r+1,c-1)+lm(r-1,c+1)+2*lm(r,c+1)+lm(r+1,c+1);const gy=-lm(r-1,c-1)-2*lm(r-1,c)-lm(r-1,c+1)+lm(r+1,c-1)+2*lm(r+1,c)+lm(r+1,c+1);if(Math.sqrt(gx*gx+gy*gy)>threshold){const x=((c/W)-0.5)*SW,y=(0.5-(r/H))*SH;const idx=(r*W+c)*4;const hex='#'+[data[idx],data[idx+1],data[idx+2]].map(v=>v.toString(16).padStart(2,'0')).join('');edges.push(`{x:${x.toFixed(2)},y:${y.toFixed(2)},c:'${hex}'}`);}};const limited=edges.slice(0,3000);return hWrap('📷 Edge Cloud 3D',`${sc3(20)}var edges=[${limited.join(',')}];var geo=new THREE.BoxGeometry(0.12,0.12,0.05);var mats={};var grp=new THREE.Group();edges.forEach(function(e){if(!mats[e.c])mats[e.c]=new THREE.MeshStandardMaterial({color:e.c,metalness:0.6,roughness:0.2,emissive:e.c,emissiveIntensity:0.3${wf}});var m=new THREE.Mesh(geo,mats[e.c]);m.position.set(e.x,e.y,0);grp.add(m);});var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);scene.add(grp);cam.position.set(0,0,20);cam.lookAt(0,0,0);${lp3(animate3d?'grp.rotation.y+=0.004;':'')}`);}

  /* ════════════════════════════════════════════════════
     PHASE 4 GENERATORS
  ════════════════════════════════════════════════════ */

  /* ── 🎵 AUDIO → 3D ── */
  function genAudio(tx2){
    if(!audioSnapshot){if(window.showToast)window.showToast(tx2.errNoAudio);return'';}
    const shape=canvasWrap.querySelector('#d3d-aud-shape')?.value||'bars';
    const isLive=canvasWrap.querySelector('#d3d-aud-live')?.checked||false;
    const BINS=audioSnapshot.length;
    const VALS=JSON.stringify(audioSnapshot.map(v=>parseFloat(v.toFixed(3))));
    const wf=wireframe?',wireframe:true':'';
    const COLORS_LIST=['#22d3ee','#3b82f6','#10b981','#f59e0b','#ef4444','#c084fc','#f472b6'];
    if(shape==='bars'||shape==='circle'){
      const circ=shape==='circle';
      return hWrap(`🎵 Audio ${circ?'Circular':'Bars'} 3D`,
`${sc3(24)}
var VALS=${VALS};var BINS=${BINS};
var grp=new THREE.Group();
var COLORS=${JSON.stringify(COLORS_LIST)};
var barGeos=[];var barMeshes=[];
VALS.forEach(function(v,i){
  var h=Math.max(0.05,v*12);
  var geo=new THREE.BoxGeometry(0.8,h,0.8);
  var mat=new THREE.MeshStandardMaterial({color:COLORS[i%COLORS.length],metalness:0.7,roughness:0.15,emissive:COLORS[i%COLORS.length],emissiveIntensity:0.2${wf}});
  var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;
  var angle=${circ}?(i/BINS)*Math.PI*2:0;
  var radius=${circ}?8:0;
  mesh.position.set(${circ}?Math.cos(angle)*radius:i*1.1-BINS/2,h/2,${circ}?Math.sin(angle)*radius:0);
  grp.add(mesh);barMeshes.push(mesh);
});
var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);scene.add(grp);
cam.position.set(0,8,${circ?22:BINS*0.65});cam.lookAt(0,0,0);
${isLive?`
var audioMic=null;(function tryMic(){navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){var ac=new AudioContext();var an=ac.createAnalyser();an.fftSize=${BINS*2};var src=ac.createMediaStreamSource(stream);src.connect(an);var fd=new Uint8Array(an.frequencyBinCount);audioMic={an:an,fd:fd};}).catch(function(){});})();
`:''}
${lp3(animate3d?`grp.rotation.y+=${circ?0.006:0.003};${isLive?`if(audioMic&&audioMic.an){audioMic.an.getByteFrequencyData(audioMic.fd);barMeshes.forEach(function(m,i){var v=Math.max(0.05,(audioMic.fd[i]||0)/255*12);m.scale.y=v/Math.max(0.05,VALS[i]*12);m.position.y=v/2;});}`:''}`:'')}`);
    } else { // wave
      return hWrap('🎵 Audio Wave 3D',`${sc3(18)}var VALS=${VALS};var BINS=${VALS.length};var pts=[];VALS.forEach(function(v,i){pts.push(new THREE.Vector3(i*0.4-BINS*0.2,v*8,0));});var curve=new THREE.CatmullRomCurve3(pts);var geo=new THREE.TubeGeometry(curve,BINS*4,0.15,8,false);var mat=new THREE.MeshStandardMaterial({color:0x22d3ee,metalness:0.8,roughness:0.1,emissive:0x0e7490,emissiveIntensity:0.5${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;var bb=new THREE.Box3().setFromObject(mesh);var bc=bb.getCenter(new THREE.Vector3());mesh.position.sub(bc);scene.add(mesh);${lp3(animate3d?'mesh.rotation.y+=0.005;mesh.position.y=Math.sin(t)*0.5;':'')}`);}
  }

  /* ── 📊 DATA → 3D CHART ── */
  function genDataChart(tx2){
    const raw=canvasWrap.querySelector('#d3d-data-input')?.value||'';
    if(!raw.trim()){if(window.showToast)window.showToast(tx2.errNoData);return'';}
    const lines=raw.trim().split(/\n/);
    const items=lines.map(l=>{const parts=l.split(',');const label=parts[0]?.trim()||'?';const val=parseFloat(parts[1]||parts[0])||0;return{label,val};}).filter(d=>!isNaN(d.val)&&d.val!==0);
    if(!items.length){if(window.showToast)window.showToast(tx2.errNoData);return'';}
    const chartType=canvasWrap.querySelector('#d3d-data-type')?.value||'bar';
    const colorMode=canvasWrap.querySelector('#d3d-data-colors')?.value||'rainbow';
    const maxVal=Math.max(...items.map(d=>d.val));
    const COLORS=['#ef4444','#f59e0b','#10b981','#3b82f6','#8b5cf6','#ec4899','#22d3ee','#84cc16','#f97316','#06b6d4','#a855f7','#14b8a6'];
    const wf=wireframe?',wireframe:true':'';
    if(chartType==='bar'){
      const N=items.length;const barW=1.0,gap=0.4;
      const bars=items.map((d,i)=>{
        const h=Math.max(0.1,(d.val/maxVal)*10);
        const c=colorMode==='gradient'?lerpHex('#3b82f6','#10b981',i/Math.max(1,N-1)):COLORS[i%COLORS.length];
        return `{h:${h.toFixed(3)},c:'${c}',label:'${d.label.replace(/'/g,"\\'")}'}`;
      });
      const spread=N*1.4+4;
      return hWrap('📊 3D Bar Chart',`var scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x080c14,0.006);var cam=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,0.1,500);cam.position.set(0,8,${N*1.4+8});cam.lookAt(0,3,0);var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(innerWidth,innerHeight);renderer.shadowMap.enabled=true;document.body.appendChild(renderer.domElement);var controls=new THREE.OrbitControls(cam,renderer.domElement);controls.enableDamping=true;controls.dampingFactor=0.07;controls.autoRotate=${autoRotate};controls.autoRotateSpeed=0.8;controls.target.set(0,3,0);scene.add(new THREE.AmbientLight(0xffffff,0.7));var sun=new THREE.DirectionalLight(0xffffff,1.2);sun.position.set(8,20,8);sun.castShadow=true;scene.add(sun);var fill=new THREE.PointLight(0x3b82f6,1,60);fill.position.set(-8,2,-8);scene.add(fill);var gh=new THREE.GridHelper(${N*2+10},${N*2+10},0x10b981,0x1e293b);gh.material.transparent=true;gh.material.opacity=0.15;scene.add(gh);var bars=[${bars.join(',')}];var grp=new THREE.Group();var bw=${barW},gap=${gap};var total=bars.length*(bw+gap);bars.forEach(function(b,i){var geo=new THREE.BoxGeometry(bw,b.h,bw);var mat=new THREE.MeshStandardMaterial({color:b.c,metalness:0.4,roughness:0.4${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;mesh.position.set(i*(bw+gap)-total/2+bw/2,b.h/2,0);grp.add(mesh);});scene.add(grp);var t=0;(function loop(){requestAnimationFrame(loop);t+=0.016;controls.update();${animate3d?'grp.rotation.y+=0.003;':''}renderer.render(scene,cam);})();window.addEventListener('resize',()=>{cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});`);
    } else if(chartType==='pie'){
      const total2=items.reduce((s,d)=>s+d.val,0);let startAngle=0;const sectors=items.map((d,i)=>{const angle=(d.val/total2)*Math.PI*2;const s=startAngle;startAngle+=angle;const c=COLORS[i%COLORS.length];return `{start:${s.toFixed(4)},angle:${angle.toFixed(4)},c:'${c}'}`;});
      return hWrap('🍩 3D Pie Chart',`${sc3(20)}var sectors=[${sectors.join(',')}];var grp=new THREE.Group();sectors.forEach(function(s){var shape=new THREE.Shape();shape.moveTo(0,0);shape.arc(0,0,5,s.start,s.start+s.angle,false);shape.lineTo(0,0);var geo=new THREE.ExtrudeGeometry(shape,{depth:${depth},bevelEnabled:false});var mat=new THREE.MeshStandardMaterial({color:s.c,metalness:0.5,roughness:0.3${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;grp.add(mesh);});var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);grp.rotation.x=-Math.PI/2;scene.add(grp);cam.position.set(0,16,8);cam.lookAt(0,0,0);${lp3(animate3d?'grp.rotation.z+=0.004;':'')}`);
    } else { // line
      const pts=items.map((d,i)=>`new THREE.Vector3(${(i*2-items.length).toFixed(1)},${((d.val/maxVal)*8).toFixed(3)},0)`);
      return hWrap('📈 3D Line Chart',`${sc3(16)}var pts=[${pts.join(',')}];var curve=new THREE.CatmullRomCurve3(pts);var geo=new THREE.TubeGeometry(curve,items.length*6,0.2,8,false);var mat=new THREE.MeshStandardMaterial({color:${hi(currentColor)},metalness:0.8,roughness:0.1,emissive:${hi(currentColor)},emissiveIntensity:0.3${wf}});var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;scene.add(mesh);var items2=${JSON.stringify(items)};items2.forEach(function(d,i){var sg=new THREE.SphereGeometry(0.3,16,16);var sm=new THREE.MeshStandardMaterial({color:'${COLORS[0]}',metalness:0.7,roughness:0.15});var ball=new THREE.Mesh(sg,sm);ball.position.set(i*2-items2.length,(d.val/${maxVal})*8,0);scene.add(ball);});cam.position.set(0,6,18);cam.lookAt(0,3,0);${lp3(animate3d?'mesh.rotation.y=Math.sin(t*0.3)*0.15;':'')}`);
    }
  }
  function lerpHex(c1,c2,t){const h1=parseInt(c1.slice(1),16),h2=parseInt(c2.slice(1),16);const r=Math.round(((h1>>16)&255)+t*(((h2>>16)&255)-((h1>>16)&255)));const g=Math.round(((h1>>8)&255)+t*(((h2>>8)&255)-((h1>>8)&255)));const b=Math.round((h1&255)+t*((h2&255)-(h1&255)));return'#'+(r<<16|g<<8|b).toString(16).padStart(6,'0');}

  /* ── 🌐 GLOBE → 3D ── */
  function genGlobe(tx2){
    if(!globeCapture){if(window.showToast)window.showToast(tx2.errNoGlobe);return'';}
    const disp=parseFloat(globeWrap?.querySelector('#d3d-globe-disp')?.value||1);
    const res=parseInt(globeWrap?.querySelector('#d3d-globe-res')?.value||64);
    const{imgData,width:IW,height:IH}=globeCapture;
    const data=imgData.data;
    // Build height and color arrays (downsampled to res x res/2)
    const WW=res,HH=Math.floor(res/2);
    const heights=[],colors=[];
    for(let r=0;r<HH;r++)for(let c=0;c<WW;c++){
      const sr=Math.floor(r/HH*IH),sc2=Math.floor(c/WW*IW);
      const idx=(sr*IW+sc2)*4;
      const bright=(data[idx]*0.299+data[idx+1]*0.587+data[idx+2]*0.114)/255;
      heights.push(bright.toFixed(3));
      colors.push(`[${(data[idx]/255).toFixed(2)},${(data[idx+1]/255).toFixed(2)},${(data[idx+2]/255).toFixed(2)}]`);
    }
    const wf=wireframe?',wireframe:true':'';const anim=animate3d?'mesh.rotation.y+=0.005;':'';
    return hWrap('🌐 Globe 3D',
`${sc3(18)}
var H=[${heights.join(',')}];var C=[${colors.join(',')}];var WW=${WW},HH=${HH},R=6,DISP=${disp};
var geo=new THREE.SphereGeometry(R,WW-1,HH-1);
geo.computeBoundingBox();
var pos=geo.attributes.position;var norm=geo.attributes.normal;
var cols=[];
for(var i=0;i<pos.count;i++){
  var nx=norm.getX(i),ny=norm.getY(i),nz=norm.getZ(i);
  var lon=(Math.atan2(nz,nx)/(Math.PI*2)+0.5);var lat=(Math.asin(Math.max(-1,Math.min(1,ny)))/Math.PI+0.5);
  var pi=Math.round(lat*(HH-1))*WW+Math.round(lon*(WW-1));pi=Math.max(0,Math.min(H.length-1,pi));
  var h=H[pi]||0;pos.setX(i,pos.getX(i)*(1+h*DISP/R));pos.setY(i,pos.getY(i)*(1+h*DISP/R));pos.setZ(i,pos.getZ(i)*(1+h*DISP/R));
  var c=C[pi]||[0.3,0.5,0.8];cols.push(c[0],c[1],c[2]);
}
geo.computeVertexNormals();
geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));
var mat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:0.5,metalness:0.1${wf}});
var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;scene.add(mesh);
cam.position.set(0,4,18);cam.lookAt(0,0,0);
${lp3(anim)}`);
  }

  /* ── 📱 QR CODE → 3D ── */
  function genQRCode(tx2){
    const text=canvasWrap.querySelector('#d3d-qr-text')?.value||'IA Architecte';
    const cellSize=parseFloat(canvasWrap.querySelector('#d3d-qr-size')?.value||0.8);
    const color=canvasWrap.querySelector('#d3d-qr-color')?.value||currentColor;
    if(!text){if(window.showToast)window.showToast(tx2.errNoQR);return'';}
    // Read QR from canvas pixel data
    const qrCvs=canvasWrap.querySelector('#d3d-qr-canvas');
    if(!qrCvs||!window.QRCode||!window.QRCode.toCanvas){
      if(window.showToast)window.showToast('QR not ready. Wait 2s and retry.');
      return '';
    }
    const W=qrCvs.width||200,H=qrCvs.height||200;
    const tc=qrCvs.getContext('2d');
    const pix=tc.getImageData(0,0,W,H).data;
    // Auto-detect QR cell size from first black pixel run
    let cellPx=8;for(let x=0;x<W;x++){const idx=(1*W+x)*4;if(pix[idx]<128){cellPx=x;break;}}if(cellPx<2)cellPx=8;
    const COLS=Math.round(W/cellPx),ROWS=Math.round(H/cellPx);
    const cells=[];
    for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++){
      const px=Math.floor((c+0.5)*cellPx),py=Math.floor((r+0.5)*cellPx);
      const idx=(py*W+px)*4;if(pix[idx]<128)cells.push(`[${c},${r}]`);
    }
    if(!cells.length){if(window.showToast)window.showToast('Could not read QR. Try "Generate 3D" again.');return'';}
    const wf=wireframe?',wireframe:true':'';const MID=COLS/2;
    return hWrap(`📱 QR Code 3D — ${text.substring(0,20)}`,
`${sc3(COLS*cellSize*0.8+5)}
var cells=[${cells.join(',')}];var N=${COLS},CS=${cellSize},D=${depth};
var geo=new THREE.BoxGeometry(CS-0.05,CS-0.05,D);
var mat=new THREE.MeshStandardMaterial({color:${hi(color)},metalness:0.5,roughness:0.3${wf}});
var grp=new THREE.Group();
cells.forEach(function(c){
  var mesh=new THREE.Mesh(geo,mat);mesh.castShadow=true;
  mesh.position.set((c[0]-N/2)*CS,(-(c[1]-N/2))*CS,0);
  grp.add(mesh);
});
var bg=new THREE.Mesh(new THREE.BoxGeometry(N*CS+1,N*CS+1,D*0.3),new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.9}));bg.position.z=-D*0.65;grp.add(bg);
var bb=new THREE.Box3().setFromObject(grp);var bc=bb.getCenter(new THREE.Vector3());grp.position.sub(bc);
scene.add(grp);cam.position.set(0,0,N*CS*1.1);cam.lookAt(0,0,0);
${lp3(animate3d?'grp.rotation.y=Math.sin(t*0.4)*0.5;':'')}`);
  }

  /* Inject into Monaco */
  function injectCode(code,msg){const ed=window.editor;if(!ed){const blob=new Blob([code],{type:'text/html'});window.open(URL.createObjectURL(blob),'_blank');return;}if(typeof window.pushUndo==='function')window.pushUndo();ed.setValue(code);ed.pushUndoStop();if(window.runPreview)setTimeout(window.runPreview,200);if(window.showToast)window.showToast(msg||'🌟 3D generated!');}

  switchMode('extrude');
}
window.renderDraw3DTab = renderDraw3DTab;
