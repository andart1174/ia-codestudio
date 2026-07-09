/**
 * IA Code Studio - Community Seed Script
 * Run this in the browser console on the /community/ page while logged in as Admin.
 * It will publish 10 spectacular 3D projects to the Firestore feed.
 */
(async function seedCommunity() {
  if (typeof firebase === 'undefined') {
    console.error('Firebase not loaded. Run this on the /community/ page.');
    return;
  }
  const db = firebase.firestore();

  const CREATORS = [
    { user: 'Alex_3D', tag: 'Elite Builder 🏆', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex3D' },
    { user: 'NovaDev',  tag: 'Top Creator ⚡',  avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=NovaDev' },
    { user: 'CyberArt', tag: 'WebGL Expert 🎨', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CyberArt' },
    { user: 'ProtoLab', tag: 'AI Builder 🤖',   avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ProtoLab' },
    { user: 'VoxelX',   tag: 'Premium Maker 💎', avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=VoxelX' },
  ];

  const POSTS = [

    // ─── 1. TESSERACT 4D ────────────────────────────────────────────────────────
    {
      creator: CREATORS[0],
      category: '3ddesign',
      caption_en: '4D Hypercube (Tesseract) rendered in real-time WebGL. Watch the 4th dimension unfold! Fork it and change the rotation speed or color.',
      caption_fr: 'Hypercube 4D (Tesseract) rendu en WebGL temps réel. La 4e dimension se déploie sous vos yeux ! Forkez et modifiez la vitesse ou la couleur.',
      code: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Tesseract 4D</title>
<style>*{margin:0;padding:0}body{background:#020617;overflow:hidden}canvas{display:block}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),gl=cv.getContext('webgl');
cv.width=innerWidth;cv.height=innerHeight;
const vs=`attribute vec4 p;uniform mat4 mvp;void main(){gl_Position=mvp*p;gl_PointSize=3.0;}`;
const fs=`precision mediump float;void main(){gl_FragColor=vec4(0.5,0.3,1.0,1.0);}`;
function sh(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);return x;}
const pg=gl.createProgram();
gl.attachShader(pg,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pg,sh(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(pg);gl.useProgram(pg);
// 16 vertices of tesseract in 4D
const v4=[];
for(let i=0;i<16;i++)v4.push([(i&1)?1:-1,(i&2)?1:-1,(i&4)?1:-1,(i&8)?1:-1]);
const edges=[];
for(let i=0;i<16;i++)for(let j=i+1;j<16;j++){
  let d=0;for(let k=0;k<4;k++)d+=Math.abs(v4[i][k]-v4[j][k]);
  if(d===2)edges.push(i,j);}
const buf=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer());
const pb=gl.createBuffer();
const loc=gl.getAttribLocation(pg,'p'),mvp=gl.getUniformLocation(pg,'mvp');
gl.enableVertexAttribArray(loc);
function proj4to3(v,t){
  const w=1/(2-v[3]);
  return[v[0]*w,v[1]*w,v[2]*w];}
function mat4(a){
  const m=new Float32Array(16);m[0]=a[0];m[5]=a[1];m[10]=a[2];m[15]=1;
  m[3]=a[3];m[7]=a[4];m[11]=a[5];return m;}
function mulMat(a,b){
  const r=new Float32Array(16);
  for(let i=0;i<4;i++)for(let j=0;j<4;j++){
    r[i*4+j]=0;for(let k=0;k<4;k++)r[i*4+j]+=a[i*4+k]*b[k*4+j];}
  return r;}
function ident(){const m=new Float32Array(16);m[0]=m[5]=m[10]=m[15]=1;return m;}
function rotXY(a){const m=ident();m[0]=Math.cos(a);m[1]=-Math.sin(a);m[4]=Math.sin(a);m[5]=Math.cos(a);return m;}
function rotZW(a){const m=ident();m[10]=Math.cos(a);m[11]=-Math.sin(a);m[14]=Math.sin(a);m[15]=Math.cos(a);return m;}
function perspective(fov,asp,near,far){
  const f=1/Math.tan(fov/2),m=new Float32Array(16);
  m[0]=f/asp;m[5]=f;m[10]=(far+near)/(near-far);m[11]=-1;m[14]=(2*far*near)/(near-far);return m;}
function translate(x,y,z){const m=ident();m[12]=x;m[13]=y;m[14]=z;return m;}
let t=0;
function draw(){
  t+=0.007;
  const r1=rotXY(t*0.7);const r2=rotZW(t*1.1);
  const pts3=v4.map(v=>{
    const rv=[0,0,0,0];
    for(let i=0;i<4;i++)for(let j=0;j<4;j++)rv[i]+=r1[i*4+j]*v[j];
    const rv2=[0,0,0,0];
    for(let i=0;i<4;i++)for(let j=0;j<4;j++)rv2[i]+=r2[i*4+j]*rv[j];
    return proj4to3(rv2,t);});
  const verts=new Float32Array(pts3.flatMap(p=>[p[0],p[1],p[2],1]));
  gl.bindBuffer(gl.ARRAY_BUFFER,pb);
  gl.bufferData(gl.ARRAY_BUFFER,verts,gl.DYNAMIC_DRAW);
  gl.vertexAttribPointer(loc,4,gl.FLOAT,false,0,0);
  const asp=cv.width/cv.height;
  const p=perspective(1.2,asp,0.1,100);
  const tr=translate(0,0,-3.5);
  const mvpM=mulMat(p,tr);
  gl.uniformMatrix4fv(mvp,false,mvpM);
  gl.clearColor(0.01,0.02,0.09,1);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(edges),gl.STATIC_DRAW);
  gl.drawElements(gl.LINES,edges.length,gl.UNSIGNED_SHORT,0);
  requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 2. GALAXY PARTICLE SYSTEM ──────────────────────────────────────────────
    {
      creator: CREATORS[1],
      category: '3ddesign',
      caption_en: 'A full WebGL galaxy with 80,000 animated stars. Spiral arms, dust clouds, and depth. Pure GPU power — no Three.js needed!',
      caption_fr: 'Une galaxie WebGL avec 80 000 étoiles animées. Bras spiraux, nuages de poussière et profondeur. Puissance GPU pure, sans Three.js !',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Galaxy</title>
<style>*{margin:0;padding:0;background:#000}canvas{display:block;width:100vw;height:100vh}</style></head>
<body><canvas id="c"></canvas><script>
const c=document.getElementById('c'),gl=c.getContext('webgl');
c.width=innerWidth;c.height=innerHeight;
const N=80000;const pos=new Float32Array(N*3);const col=new Float32Array(N*3);
for(let i=0;i<N;i++){
  const arm=Math.floor(Math.random()*3);
  const r=Math.random()*2.0;
  const angle=arm*(Math.PI*2/3)+r*2.5+(Math.random()-0.5)*0.4;
  const spread=0.04+r*0.08;
  pos[i*3]=Math.cos(angle)*r+(Math.random()-0.5)*spread;
  pos[i*3+1]=(Math.random()-0.5)*spread*0.4;
  pos[i*3+2]=Math.sin(angle)*r+(Math.random()-0.5)*spread;
  const t=r/2;
  col[i*3]=0.6+t*0.4;col[i*3+1]=0.3+t*0.5;col[i*3+2]=0.8-t*0.5;}
const vs=`attribute vec3 p;attribute vec3 c;uniform mat4 mvp;varying vec3 vc;
void main(){gl_Position=mvp*vec4(p,1.0);gl_PointSize=max(1.0,2.0-gl_Position.z);vc=c;}`;
const fs=`precision mediump float;varying vec3 vc;
void main(){vec2 uv=gl_PointCoord-0.5;float d=length(uv);if(d>0.5)discard;
gl_FragColor=vec4(vc,1.0-d*1.8);}`;
function mk(t,s){const x=gl.createShader(t);gl.shaderSource(x,s);gl.compileShader(x);return x;}
const pg=gl.createProgram();
gl.attachShader(pg,mk(gl.VERTEX_SHADER,vs));gl.attachShader(pg,mk(gl.FRAGMENT_SHADER,fs));
gl.linkProgram(pg);gl.useProgram(pg);
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
const pb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,pos,gl.STATIC_DRAW);
const lp=gl.getAttribLocation(pg,'p');gl.enableVertexAttribArray(lp);gl.vertexAttribPointer(lp,3,gl.FLOAT,false,0,0);
const cb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.bufferData(gl.ARRAY_BUFFER,col,gl.STATIC_DRAW);
const lc=gl.getAttribLocation(pg,'c');gl.enableVertexAttribArray(lc);gl.vertexAttribPointer(lc,3,gl.FLOAT,false,0,0);
const um=gl.getUniformLocation(pg,'mvp');
function m4(){return new Float32Array(16);}
function ident(){const m=m4();m[0]=m[5]=m[10]=m[15]=1;return m;}
function mul(a,b){const r=m4();for(let i=0;i<4;i++)for(let j=0;j<4;j++){r[j*4+i]=0;for(let k=0;k<4;k++)r[j*4+i]+=a[k*4+i]*b[j*4+k];}return r;}
function rotY(a){const m=ident();m[0]=Math.cos(a);m[8]=Math.sin(a);m[2]=-Math.sin(a);m[10]=Math.cos(a);return m;}
function rotX(a){const m=ident();m[5]=Math.cos(a);m[9]=-Math.sin(a);m[6]=Math.sin(a);m[10]=Math.cos(a);return m;}
function persp(f,a,n,fr){const m=m4(),tf=1/Math.tan(f/2);m[0]=tf/a;m[5]=tf;m[10]=(fr+n)/(n-fr);m[11]=-1;m[14]=(2*fr*n)/(n-fr);return m;}
let t=0;
function draw(){t+=0.003;
  const asp=c.width/c.height;
  const view=mul(rotX(0.3),rotY(t));
  const tr=ident();tr[14]=-3.5;
  const p=persp(1.1,asp,0.1,100);
  const mvp=mul(mul(p,tr),view);
  gl.uniformMatrix4fv(um,false,mvp);
  gl.clearColor(0,0,0.02,1);gl.clear(gl.COLOR_BUFFER_BIT);
  gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.vertexAttribPointer(lp,3,gl.FLOAT,false,0,0);
  gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.vertexAttribPointer(lc,3,gl.FLOAT,false,0,0);
  gl.drawArrays(gl.POINTS,0,N);requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 3. NEURAL NETWORK VISUALIZATION ────────────────────────────────────────
    {
      creator: CREATORS[2],
      category: 'aiapp',
      caption_en: 'Real-time animated neural network with signal propagation. Each pulse travels through layers like a real AI brain. Built in pure CSS/JS!',
      caption_fr: 'Réseau de neurones animé en temps réel avec propagation de signal. Chaque impulsion traverse les couches comme un vrai cerveau IA. En CSS/JS pur!',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Neural Network</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#020617;overflow:hidden;font-family:monospace}
canvas{display:block}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
cv.width=innerWidth;cv.height=innerHeight;
const layers=[3,5,6,5,3];
const nodes=[];const signals=[];
const W=cv.width,H=cv.height;
layers.forEach((n,li)=>{
  const x=W*0.15+li*(W*0.7/(layers.length-1));
  for(let ni=0;ni<n;ni++){
    const y=H/2+(ni-(n-1)/2)*90;
    nodes.push({x,y,li,ni,glow:0});}});
function getNode(li,ni){return nodes.find(n=>n.li===li&&n.ni===ni);}
let t=0;
function spawnSignal(){
  const li=0,ni=Math.floor(Math.random()*layers[0]);
  const src=getNode(li,ni);
  if(!src)return;
  function chain(src,li){
    if(li>=layers.length-1)return;
    const nli=li+1;
    for(let nni=0;nni<layers[nli];nni++){
      if(Math.random()>0.35)continue;
      const dst=getNode(nli,nni);
      if(!dst)continue;
      const delay=(li)*18;
      signals.push({sx:src.x,sy:src.y,ex:dst.x,ey:dst.y,p:0,spd:0.015+Math.random()*0.01,dst,li:nli,ni:nni,delay:delay+Math.random()*10});}}
  chain(src,0);}
setInterval(spawnSignal,600);
function draw(){
  ctx.fillStyle='rgba(2,6,23,0.18)';ctx.fillRect(0,0,W,H);
  // Draw connections
  for(let li=0;li<layers.length-1;li++){
    for(let ni=0;ni<layers[li];ni++){
      const src=getNode(li,ni);
      for(let ni2=0;ni2<layers[li+1];ni2++){
        const dst=getNode(li+1,ni2);
        if(!src||!dst)continue;
        ctx.beginPath();ctx.moveTo(src.x,src.y);ctx.lineTo(dst.x,dst.y);
        ctx.strokeStyle='rgba(99,102,241,0.08)';ctx.lineWidth=0.8;ctx.stroke();}}}
  // Draw signals
  for(let i=signals.length-1;i>=0;i--){
    const s=signals[i];
    if(s.delay>0){s.delay--;continue;}
    s.p+=s.spd;
    if(s.p>=1){s.dst.glow=1.0;signals.splice(i,1);continue;}
    const x=s.sx+(s.ex-s.sx)*s.p;
    const y=s.sy+(s.ey-s.sy)*s.p;
    const grd=ctx.createRadialGradient(x,y,0,x,y,8);
    grd.addColorStop(0,'rgba(139,92,246,0.9)');grd.addColorStop(1,'rgba(139,92,246,0)');
    ctx.beginPath();ctx.arc(x,y,8,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();}
  // Draw nodes
  nodes.forEach(n=>{
    n.glow=Math.max(0,n.glow-0.025);
    const grd=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,18);
    const g=n.glow;
    grd.addColorStop(0,`rgba(${100+Math.round(g*155)},${80+Math.round(g*60)},246,${0.4+g*0.6})`);
    grd.addColorStop(1,'rgba(99,102,241,0)');
    ctx.beginPath();ctx.arc(n.x,n.y,18,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
    ctx.beginPath();ctx.arc(n.x,n.y,6,0,Math.PI*2);
    ctx.fillStyle=`rgba(${150+Math.round(g*105)},${100+Math.round(g*80)},255,${0.7+g*0.3})`;ctx.fill();});
  requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 4. HOLOGRAPHIC HUD ─────────────────────────────────────────────────────
    {
      creator: CREATORS[3],
      category: 'showcase',
      caption_en: 'Sci-fi holographic HUD with animated radar, live stats, and glitch effects. Ready to embed in any website or game project!',
      caption_fr: 'HUD holographique sci-fi avec radar animé, statistiques en direct et effets glitch. Prêt à intégrer dans n\'importe quel site ou jeu!',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Holographic HUD</title>
<style>*{margin:0;padding:0;box-sizing:border-box}
body{background:#000;display:flex;align-items:center;justify-content:center;height:100vh;font-family:'Courier New',monospace;overflow:hidden}
.hud{width:520px;height:380px;border:1px solid rgba(0,255,200,0.3);border-radius:8px;position:relative;background:rgba(0,20,30,0.95);box-shadow:0 0 40px rgba(0,255,200,0.15),inset 0 0 40px rgba(0,255,200,0.03)}
.corner{position:absolute;width:20px;height:20px;border-color:rgba(0,255,200,0.8);border-style:solid}
.c-tl{top:-1px;left:-1px;border-width:2px 0 0 2px}.c-tr{top:-1px;right:-1px;border-width:2px 2px 0 0}
.c-bl{bottom:-1px;left:-1px;border-width:0 0 2px 2px}.c-br{bottom:-1px;right:-1px;border-width:0 2px 2px 0}
.title{color:rgba(0,255,200,0.9);font-size:10px;letter-spacing:6px;text-align:center;padding:10px;border-bottom:1px solid rgba(0,255,200,0.15)}
.main{display:flex;gap:12px;padding:14px;height:calc(100% - 40px)}
.radar-wrap{width:180px;flex-shrink:0;display:flex;flex-direction:column;align-items:center;gap:8px}
canvas#radar{border-radius:50%;border:1px solid rgba(0,255,200,0.2)}
.side{flex:1;display:flex;flex-direction:column;gap:8px}
.bar-row{display:flex;flex-direction:column;gap:3px}
.bar-lbl{color:rgba(0,255,200,0.6);font-size:9px;letter-spacing:2px;display:flex;justify-content:space-between}
.bar-bg{height:6px;background:rgba(0,255,200,0.08);border-radius:3px;overflow:hidden}
.bar-fill{height:100%;background:linear-gradient(90deg,rgba(0,255,200,0.8),rgba(0,200,255,0.5));border-radius:3px;transition:width 0.5s}
.stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:4px}
.stat-box{border:1px solid rgba(0,255,200,0.15);padding:6px;border-radius:4px}
.stat-val{color:rgba(0,255,200,0.95);font-size:14px;font-weight:bold}
.stat-lbl{color:rgba(0,255,200,0.4);font-size:8px;letter-spacing:2px}
.log{font-size:8px;color:rgba(0,255,200,0.4);border-top:1px solid rgba(0,255,200,0.1);padding-top:6px;height:44px;overflow:hidden}
.log-line{animation:fadein 0.5s}@keyframes fadein{from{opacity:0}to{opacity:1}}
</style></head>
<body><div class="hud">
<div class="corner c-tl"></div><div class="corner c-tr"></div>
<div class="corner c-bl"></div><div class="corner c-br"></div>
<div class="title">⬡ TACTICAL INTERFACE v2.1 ⬡</div>
<div class="main">
<div class="radar-wrap">
  <canvas id="radar" width="170" height="170"></canvas>
  <div style="color:rgba(0,255,200,0.4);font-size:8px;letter-spacing:3px">RADAR SYS</div>
</div>
<div class="side">
  <div class="bar-row"><div class="bar-lbl"><span>POWER</span><span id="pv">0%</span></div><div class="bar-bg"><div class="bar-fill" id="pb" style="width:0%"></div></div></div>
  <div class="bar-row"><div class="bar-lbl"><span>SHIELD</span><span id="sv">0%</span></div><div class="bar-bg"><div class="bar-fill" id="sb" style="width:0%"></div></div></div>
  <div class="bar-row"><div class="bar-lbl"><span>SIGNAL</span><span id="sgv">0%</span></div><div class="bar-bg"><div class="bar-fill" id="sgb" style="width:0%"></div></div></div>
  <div class="stats-grid">
    <div class="stat-box"><div class="stat-val" id="lat">0ms</div><div class="stat-lbl">LATENCY</div></div>
    <div class="stat-box"><div class="stat-val" id="tgt">0</div><div class="stat-lbl">TARGETS</div></div>
    <div class="stat-box"><div class="stat-val" id="alt">0m</div><div class="stat-lbl">ALTITUDE</div></div>
    <div class="stat-box"><div class="stat-val" id="spd">0</div><div class="stat-lbl">VELOCITY</div></div>
  </div>
  <div class="log" id="log"></div>
</div></div></div>
<script>
const rc=document.getElementById('radar'),ctx=rc.getContext('2d');
const R=85,cx=R,cy=R;let angle=0;
const blips=Array.from({length:6},()=>({a:Math.random()*Math.PI*2,r:Math.random()*65+10,life:1}));
function drawRadar(){
  ctx.clearRect(0,0,170,170);
  ctx.strokeStyle='rgba(0,255,200,0.12)';ctx.lineWidth=1;
  [20,40,60,80].forEach(r=>{ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();});
  ctx.strokeStyle='rgba(0,255,200,0.08)';
  for(let a=0;a<Math.PI*2;a+=Math.PI/6){ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*R,cy+Math.sin(a)*R);ctx.stroke();}
  const grd=ctx.createConicalGradient?null:null;
  for(let i=0;i<60;i++){
    const a=angle-i*0.06;const alpha=Math.max(0,(60-i)/60)*0.5;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,R,a,a+0.08);ctx.closePath();
    ctx.fillStyle=`rgba(0,255,180,${alpha*0.3})`;ctx.fill();}
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(angle)*R,cy+Math.sin(angle)*R);
  ctx.strokeStyle='rgba(0,255,200,0.9)';ctx.lineWidth=1.5;ctx.stroke();
  blips.forEach(b=>{
    const bx=cx+Math.cos(b.a)*b.r,by=cy+Math.sin(b.a)*b.r;
    const diff=Math.abs(((angle-b.a)%(Math.PI*2)+Math.PI*2)%(Math.PI*2));
    if(diff<0.3)b.life=1;else b.life=Math.max(0,b.life-0.008);
    if(b.life>0){ctx.beginPath();ctx.arc(bx,by,3,0,Math.PI*2);ctx.fillStyle=`rgba(0,255,100,${b.life})`;ctx.fill();}});
  angle+=0.04;requestAnimationFrame(drawRadar);}
drawRadar();
function rnd(a,b){return Math.floor(Math.random()*(b-a)+a);}
const logs=['> SYS ONLINE','> TARGETING LOCK','> SIGNAL ACQUIRED','> SECTOR CLEAR','> ROUTE CALC OK','> FIREWALL ACTIVE'];
let li=0;
function update(){
  const p=rnd(70,100),s=rnd(55,95),sg=rnd(80,100);
  document.getElementById('pb').style.width=p+'%';document.getElementById('pv').textContent=p+'%';
  document.getElementById('sb').style.width=s+'%';document.getElementById('sv').textContent=s+'%';
  document.getElementById('sgb').style.width=sg+'%';document.getElementById('sgv').textContent=sg+'%';
  document.getElementById('lat').textContent=rnd(8,40)+'ms';
  document.getElementById('tgt').textContent=rnd(3,12);
  document.getElementById('alt').textContent=rnd(800,2400)+'m';
  document.getElementById('spd').textContent=rnd(280,620);
  const logEl=document.getElementById('log');
  logEl.innerHTML='<div class="log-line">'+logs[li%logs.length]+'</div>'+logEl.innerHTML;
  li++;if(logEl.children.length>4)logEl.removeChild(logEl.lastChild);}
update();setInterval(update,1800);
<\/script></body></html>`
    },

    // ─── 5. DNA DOUBLE HELIX ────────────────────────────────────────────────────
    {
      creator: CREATORS[4],
      category: '3ddesign',
      caption_en: 'Animated DNA double helix in 3D WebGL. Genetic code visualized beautifully. Perfect for biotech landing pages or science portfolios!',
      caption_fr: 'Double hélice ADN animée en WebGL 3D. Le code génétique visualisé magnifiquement. Parfait pour les pages biotech ou portfolios scientifiques !',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>DNA Helix</title>
<style>*{margin:0;padding:0}body{background:#020617;overflow:hidden}canvas{display:block}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
cv.width=innerWidth;cv.height=innerHeight;
const W=cv.width,H=cv.height;
const PAIRS=28,RADIUS=110,SPEED=0.012;
const COLORS_A=['#f472b6','#ec4899','#db2777','#be185d'];
const COLORS_B=['#38bdf8','#0ea5e9','#0284c7','#0369a1'];
const RUNGS=['A-T','T-A','G-C','C-G'];
let t=0;
function draw(){
  ctx.fillStyle='rgba(2,6,23,0.15)';ctx.fillRect(0,0,W,H);
  const points=[];
  for(let i=0;i<PAIRS;i++){
    const progress=i/PAIRS;
    const angle=progress*Math.PI*4+t;
    const y=H*0.1+progress*(H*0.8);
    const depth=Math.sin(angle)*0.5+0.5;
    const ax=W/2+Math.cos(angle)*RADIUS;
    const bx=W/2+Math.cos(angle+Math.PI)*RADIUS;
    points.push({ax,bx,y,depth,angle,i});}
  // Sort by depth for pseudo-3D
  const sorted=[...points].sort((a,b)=>a.depth-b.depth);
  sorted.forEach(p=>{
    const {ax,bx,y,depth,i}=p;
    const alpha=0.3+depth*0.7;
    const sz=3+depth*4;
    // Rung
    ctx.beginPath();ctx.moveTo(ax,y);ctx.lineTo(bx,y);
    ctx.strokeStyle=`rgba(148,163,184,${alpha*0.25})`;ctx.lineWidth=1;ctx.stroke();
    // Node A
    const gA=ctx.createRadialGradient(ax,y,0,ax,y,sz*2);
    gA.addColorStop(0,COLORS_A[i%4]);gA.addColorStop(1,'transparent');
    ctx.beginPath();ctx.arc(ax,y,sz,0,Math.PI*2);ctx.fillStyle=gA;ctx.fill();
    // Node B
    const gB=ctx.createRadialGradient(bx,y,0,bx,y,sz*2);
    gB.addColorStop(0,COLORS_B[i%4]);gB.addColorStop(1,'transparent');
    ctx.beginPath();ctx.arc(bx,y,sz,0,Math.PI*2);ctx.fillStyle=gB;ctx.fill();
    // Label
    if(depth>0.7){
      ctx.fillStyle=`rgba(148,163,184,${alpha*0.7})`;
      ctx.font=`${Math.round(7+depth*4)}px monospace`;
      ctx.textAlign='center';ctx.fillText(RUNGS[i%4],W/2,y+1);}});
  // Backbone curves
  ctx.beginPath();
  points.forEach((p,idx)=>{
    if(idx===0)ctx.moveTo(p.ax,p.y);else ctx.lineTo(p.ax,p.y);});
  ctx.strokeStyle='rgba(244,114,182,0.3)';ctx.lineWidth=2;ctx.stroke();
  ctx.beginPath();
  points.forEach((p,idx)=>{
    if(idx===0)ctx.moveTo(p.bx,p.y);else ctx.lineTo(p.bx,p.y);});
  ctx.strokeStyle='rgba(56,189,248,0.3)';ctx.lineWidth=2;ctx.stroke();
  t+=SPEED;requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 6. CYBERPUNK CITY ──────────────────────────────────────────────────────
    {
      creator: CREATORS[0],
      category: 'showcase',
      caption_en: 'Procedural cyberpunk city skyline with neon glow, rain effect, and animated billboards. CSS + Canvas only — completely dependency-free!',
      caption_fr: 'Skyline de ville cyberpunk procédurale avec néon, pluie et panneaux animés. CSS + Canvas uniquement — sans aucune dépendance !',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Cyberpunk City</title>
<style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
cv.width=innerWidth;cv.height=innerHeight;
const W=cv.width,H=cv.height;
const NEON=['#ff2079','#00f5ff','#b14fff','#ff7c00','#00ff88'];
// Generate buildings
const buildings=[];
let x=0;
while(x<W+50){
  const w=40+Math.random()*80;
  const h=80+Math.random()*350;
  const windows=[];
  for(let wy=10;wy<h-20;wy+=18){
    for(let wx=8;wx<w-8;wx+=14){
      if(Math.random()>0.35)windows.push({x:wx,y:wy,on:Math.random()>0.4,r:Math.random()*2000+500});}}
  buildings.push({x,w,h,windows,neon:NEON[Math.floor(Math.random()*NEON.length)],neon2:NEON[Math.floor(Math.random()*NEON.length)]});
  x+=w+2;}
// Rain drops
const rain=Array.from({length:300},()=>({x:Math.random()*W,y:Math.random()*H,spd:8+Math.random()*12,len:15+Math.random()*25,alpha:0.2+Math.random()*0.5}));
let t=0;
function draw(){
  ctx.fillStyle='rgba(0,0,8,0.35)';ctx.fillRect(0,0,W,H);
  // Sky gradient
  const sky=ctx.createLinearGradient(0,0,0,H*0.6);
  sky.addColorStop(0,'rgba(2,0,20,0)');sky.addColorStop(1,'rgba(80,0,80,0.08)');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H*0.6);
  // Neon floor reflection
  const fl=ctx.createLinearGradient(0,H*0.72,0,H);
  fl.addColorStop(0,'rgba(0,0,30,0.6)');fl.addColorStop(1,'rgba(0,0,0,0.9)');
  ctx.fillStyle=fl;ctx.fillRect(0,H*0.72,W,H*0.28);
  buildings.forEach(b=>{
    const bx=b.x-t*0.3%(W+200);
    const by=H*0.72-b.h;
    // Body
    const bg=ctx.createLinearGradient(bx,by,bx,H*0.72);
    bg.addColorStop(0,'#0a0a1a');bg.addColorStop(1,'#050510');
    ctx.fillStyle=bg;ctx.fillRect(bx,by,b.w,b.h);
    // Windows
    b.windows.forEach(w=>{
      const on=w.on&&(Math.floor(t*0.02+w.r)%80>10);
      ctx.fillStyle=on?`rgba(255,240,180,0.7)`:`rgba(20,20,40,0.4)`;
      ctx.fillRect(bx+w.x,by+w.y,8,10);});
    // Neon sign on top
    ctx.shadowBlur=15;ctx.shadowColor=b.neon;
    ctx.fillStyle=b.neon;ctx.fillRect(bx+8,by-3,b.w-16,3);
    ctx.shadowBlur=0;
    // Reflection
    ctx.save();ctx.scale(1,-1);ctx.translate(0,-H*1.44);
    ctx.globalAlpha=0.12;
    ctx.fillStyle=bg;ctx.fillRect(bx,by,b.w,b.h*0.4);
    ctx.restore();ctx.globalAlpha=1;});
  // Rain
  rain.forEach(r=>{
    r.y+=r.spd;if(r.y>H){r.y=-20;r.x=Math.random()*W;}
    ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x-1,r.y+r.len);
    ctx.strokeStyle=`rgba(160,210,255,${r.alpha})`;ctx.lineWidth=0.5;ctx.stroke();});
  // Ground line
  ctx.fillStyle='rgba(100,0,120,0.5)';ctx.fillRect(0,H*0.72,W,1);
  t+=0.4;requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 7. MATRIX RAIN ─────────────────────────────────────────────────────────
    {
      creator: CREATORS[1],
      category: 'webdev',
      caption_en: 'The iconic Matrix digital rain with customizable colors and speed. Add this epic background to any website in 5 lines of code. Free to fork!',
      caption_fr: 'La pluie numérique Matrix iconique avec couleurs et vitesse personnalisables. Ajoutez cet arrière-plan épique à n\'importe quel site en 5 lignes!',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Matrix Rain</title>
<style>*{margin:0;padding:0}body{background:#000;overflow:hidden}canvas{display:block}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
cv.width=innerWidth;cv.height=innerHeight;
const W=cv.width,H=cv.height;
const SZ=16;const COLS=Math.floor(W/SZ);
const drops=Array(COLS).fill(1);
const CHARS='ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF';
function draw(){
  ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,W,H);
  for(let i=0;i<COLS;i++){
    const char=CHARS[Math.floor(Math.random()*CHARS.length)];
    const bright=Math.random();
    if(bright>0.98){ctx.fillStyle='#fff';}
    else if(bright>0.9){ctx.fillStyle='#9effa0';}
    else{ctx.fillStyle='#00cc44';}
    ctx.font=SZ+'px monospace';
    ctx.fillText(char,i*SZ,drops[i]*SZ);
    if(drops[i]*SZ>H&&Math.random()>0.975)drops[i]=0;
    drops[i]++;}
  requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 8. AUDIO VISUALIZER ────────────────────────────────────────────────────
    {
      creator: CREATORS[2],
      category: 'showcase',
      caption_en: 'Animated audio visualizer with circular frequency bars and glowing colors. Click anywhere to change color theme. Perfect for music portfolios!',
      caption_fr: 'Visualiseur audio animé avec barres de fréquence circulaires et couleurs lumineuses. Cliquez pour changer le thème. Parfait pour les portfolios musicaux !',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Audio Visualizer</title>
<style>*{margin:0;padding:0}body{background:#050510;display:flex;align-items:center;justify-content:center;height:100vh;overflow:hidden;cursor:pointer}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
cv.width=innerWidth;cv.height=innerHeight;
const W=cv.width,H=cv.height,CX=W/2,CY=H/2;
const BARS=128,R0=80,themes=[
  ['#f472b6','#a78bfa','#60a5fa'],['#34d399','#06b6d4','#a78bfa'],
  ['#fb923c','#f43f5e','#f472b6'],['#fbbf24','#34d399','#06b6d4']];
let themeIdx=0,t=0;
const freqs=Array.from({length:BARS},(_,i)=>({phase:Math.random()*Math.PI*2,speed:0.02+Math.random()*0.04,amp:0.2+Math.random()*0.8}));
document.body.onclick=()=>themeIdx=(themeIdx+1)%themes.length;
function draw(){
  ctx.fillStyle='rgba(5,5,16,0.25)';ctx.fillRect(0,0,W,H);
  const theme=themes[themeIdx];
  for(let i=0;i<BARS;i++){
    const f=freqs[i];
    const val=Math.abs(Math.sin(t*f.speed+f.phase))*f.amp*0.7+Math.abs(Math.sin(t*f.speed*0.3+f.phase*0.7))*f.amp*0.3;
    const barH=20+val*160;
    const angle=(i/BARS)*Math.PI*2;
    const x0=CX+Math.cos(angle)*R0;const y0=CY+Math.sin(angle)*R0;
    const x1=CX+Math.cos(angle)*(R0+barH);const y1=CY+Math.sin(angle)*(R0+barH);
    const prog=i/BARS;
    const r=parseInt(theme[0].slice(1,3),16)*(1-prog)+parseInt(theme[1].slice(1,3),16)*prog;
    const g=parseInt(theme[0].slice(3,5),16)*(1-prog)+parseInt(theme[1].slice(3,5),16)*prog;
    const b=parseInt(theme[0].slice(5,7),16)*(1-prog)+parseInt(theme[1].slice(5,7),16)*prog;
    ctx.beginPath();ctx.moveTo(x0,y0);ctx.lineTo(x1,y1);
    ctx.strokeStyle=`rgba(${r|0},${g|0},${b|0},0.85)`;
    ctx.lineWidth=2+val*2;ctx.stroke();}
  // Center circle
  const grd=ctx.createRadialGradient(CX,CY,0,CX,CY,R0);
  grd.addColorStop(0,themes[themeIdx][0]+'44');grd.addColorStop(1,'transparent');
  ctx.beginPath();ctx.arc(CX,CY,R0,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
  ctx.fillStyle=themes[themeIdx][0];ctx.font='bold 14px sans-serif';ctx.textAlign='center';
  ctx.fillText('CLICK TO CHANGE THEME',CX,CY+5);
  t++;requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 9. PARTICLE VORTEX ─────────────────────────────────────────────────────
    {
      creator: CREATORS[3],
      category: '3ddesign',
      caption_en: 'An interactive particle vortex that reacts to your mouse cursor! Move your mouse to control the gravity well. 5000 particles rendered in real-time!',
      caption_fr: 'Un vortex de particules interactif qui réagit à votre curseur! Bougez la souris pour contrôler la force gravitationnelle. 5000 particules temps réel !',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Particle Vortex</title>
<style>*{margin:0;padding:0}body{background:#000;overflow:hidden;cursor:none}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
cv.width=innerWidth;cv.height=innerHeight;
const W=cv.width,H=cv.height;
let mx=W/2,my=H/2;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
const N=5000;
const px=new Float32Array(N),py=new Float32Array(N);
const vx=new Float32Array(N),vy=new Float32Array(N);
const hue=new Float32Array(N);
for(let i=0;i<N;i++){
  px[i]=Math.random()*W;py[i]=Math.random()*H;
  vx[i]=(Math.random()-0.5)*2;vy[i]=(Math.random()-0.5)*2;
  hue[i]=Math.random()*360;}
function draw(){
  ctx.fillStyle='rgba(0,0,0,0.12)';ctx.fillRect(0,0,W,H);
  for(let i=0;i<N;i++){
    const dx=mx-px[i],dy=my-py[i];
    const dist=Math.sqrt(dx*dx+dy*dy)+1;
    const force=Math.min(800/(dist*dist),3);
    vx[i]+=dx/dist*force;vy[i]+=dy/dist*force;
    // Swirl
    vx[i]+=(-dy/dist)*0.4;vy[i]+=(dx/dist)*0.4;
    // Damping
    vx[i]*=0.96;vy[i]*=0.96;
    px[i]+=vx[i];py[i]+=vy[i];
    if(px[i]<0)px[i]=W;if(px[i]>W)px[i]=0;
    if(py[i]<0)py[i]=H;if(py[i]>H)py[i]=0;
    hue[i]=(hue[i]+0.5)%360;
    const spd=Math.sqrt(vx[i]*vx[i]+vy[i]*vy[i]);
    ctx.beginPath();ctx.arc(px[i],py[i],Math.min(1.5+spd*0.3,3),0,Math.PI*2);
    ctx.fillStyle=`hsla(${hue[i]},100%,65%,0.7)`;ctx.fill();}
  // Cursor glow
  const g=ctx.createRadialGradient(mx,my,0,mx,my,40);
  g.addColorStop(0,'rgba(255,255,255,0.15)');g.addColorStop(1,'transparent');
  ctx.beginPath();ctx.arc(mx,my,40,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();
  requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    },

    // ─── 10. SOLAR SYSTEM ───────────────────────────────────────────────────────
    {
      creator: CREATORS[4],
      category: '3ddesign',
      caption_en: 'Animated solar system with realistic orbital speeds, glowing planets, and asteroid belt. Built in pure Canvas 2D — no libraries required!',
      caption_fr: 'Système solaire animé avec vitesses orbitales réalistes, planètes lumineuses et ceinture d\'astéroïdes. En Canvas 2D pur — aucune bibliothèque requise !',
      code: `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Solar System</title>
<style>*{margin:0;padding:0}body{background:#000;overflow:hidden}</style></head>
<body><canvas id="c"></canvas><script>
const cv=document.getElementById('c'),ctx=cv.getContext('2d');
cv.width=innerWidth;cv.height=innerHeight;
const W=cv.width,H=cv.height,CX=W/2,CY=H/2;
const planets=[
  {name:'Mercury',r:4,orbit:52,speed:0.047,color:'#b5b5b5',glow:'#888'},
  {name:'Venus',r:7,orbit:80,speed:0.035,color:'#e8cda0',glow:'#c8a060'},
  {name:'Earth',r:8,orbit:115,speed:0.029,color:'#4fa3e0',glow:'#2080c0',moon:true},
  {name:'Mars',r:6,orbit:155,speed:0.024,color:'#e07040',glow:'#b04010'},
  {name:'Jupiter',r:22,orbit:215,speed:0.013,color:'#c88b5a',glow:'#a06030',bands:true},
  {name:'Saturn',r:18,orbit:280,speed:0.009,color:'#e0c878',glow:'#b09040',ring:true},
  {name:'Uranus',r:13,orbit:335,speed:0.006,color:'#7de8e8',glow:'#40b0b0'},
  {name:'Neptune',r:12,orbit:378,speed:0.005,color:'#3050d8',glow:'#1030a0'}];
const asteroids=Array.from({length:120},()=>({a:Math.random()*Math.PI*2,r:175+Math.random()*25,sz:0.5+Math.random()*2,spd:0.01+Math.random()*0.008}));
const stars=Array.from({length:300},()=>({x:Math.random()*W,y:Math.random()*H,sz:Math.random()*1.5,alpha:0.3+Math.random()*0.7}));
let angles=planets.map(()=>Math.random()*Math.PI*2);
let t=0;
function drawGlow(x,y,r,color){
  const g=ctx.createRadialGradient(x,y,0,x,y,r*2.5);
  g.addColorStop(0,color+'99');g.addColorStop(1,'transparent');
  ctx.beginPath();ctx.arc(x,y,r*2.5,0,Math.PI*2);ctx.fillStyle=g;ctx.fill();}
function draw(){
  ctx.fillStyle='rgba(0,0,8,0.3)';ctx.fillRect(0,0,W,H);
  // Stars
  stars.forEach(s=>{ctx.beginPath();ctx.arc(s.x,s.y,s.sz,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;ctx.fill();});
  // Orbits
  planets.forEach(p=>{ctx.beginPath();ctx.arc(CX,CY,p.orbit,0,Math.PI*2);ctx.strokeStyle='rgba(255,255,255,0.05)';ctx.lineWidth=1;ctx.stroke();});
  // Asteroid belt
  asteroids.forEach(a=>{
    a.a+=a.spd*0.003;
    const ax=CX+Math.cos(a.a)*a.r,ay=CY+Math.sin(a.a)*a.r;
    ctx.beginPath();ctx.arc(ax,ay,a.sz,0,Math.PI*2);ctx.fillStyle='rgba(150,130,110,0.5)';ctx.fill();});
  // Sun
  drawGlow(CX,CY,28,'#ff9900');
  const sunG=ctx.createRadialGradient(CX,CY,0,CX,CY,28);
  sunG.addColorStop(0,'#fff7a0');sunG.addColorStop(0.4,'#ffcc00');sunG.addColorStop(1,'#ff6600');
  ctx.beginPath();ctx.arc(CX,CY,28,0,Math.PI*2);ctx.fillStyle=sunG;ctx.fill();
  // Planets
  planets.forEach((p,i)=>{
    angles[i]+=p.speed*0.018;
    const px=CX+Math.cos(angles[i])*p.orbit;
    const py=CY+Math.sin(angles[i])*p.orbit;
    drawGlow(px,py,p.r,p.glow);
    if(p.ring){
      ctx.beginPath();ctx.ellipse(px,py,p.r*2.2,p.r*0.5,angles[i]*0.1,0,Math.PI*2);
      ctx.strokeStyle='rgba(200,180,100,0.5)';ctx.lineWidth=4;ctx.stroke();}
    ctx.beginPath();ctx.arc(px,py,p.r,0,Math.PI*2);ctx.fillStyle=p.color;ctx.fill();
    if(p.moon){
      const ma=t*0.08;
      const moonX=px+Math.cos(ma)*14,moonY=py+Math.sin(ma)*14;
      ctx.beginPath();ctx.arc(moonX,moonY,2.5,0,Math.PI*2);ctx.fillStyle='#ccc';ctx.fill();}});
  t++;requestAnimationFrame(draw);}
draw();
<\/script></body></html>`
    }
  ];

  console.log('🚀 Starting community seed...');
  let count = 0;

  for (const post of POSTS) {
    const id = Date.now() + count * 1000;
    const doc = {
      id,
      user: post.creator.user,
      displayName: post.creator.user,
      userTag: post.creator.tag,
      userAvatar: post.creator.avatar,
      photoURL: post.creator.avatar,
      userEmail: `${post.creator.user.toLowerCase()}@iacodestudio.com`,
      uid: `seed_${post.creator.user}`,
      category: post.category,
      content: post.caption_en,
      caption_en: post.caption_en,
      caption_fr: post.caption_fr,
      code: post.code,
      hasThree: true,
      likes: Math.floor(Math.random() * 120) + 10,
      likesCount: Math.floor(Math.random() * 120) + 10,
      likedBy: [],
      commentsCount: Math.floor(Math.random() * 18),
      comments: [],
      preset: 'custom',
      createdAt: firebase.firestore.Timestamp.fromMillis(Date.now() - count * 3600000 * 3)
    };

    try {
      await db.collection('devsocial_posts').doc(String(id)).set(doc);
      console.log(`✅ [${count + 1}/10] Published: "${post.creator.user}" — ${post.category}`);
      count++;
      await new Promise(r => setTimeout(r, 400));
    } catch (e) {
      console.error(`❌ Failed post ${count + 1}:`, e.message);
    }
  }

  console.log(`\n🎉 Done! ${count} spectacular projects published to the community feed.`);
  console.log('👉 Refresh the community page to see them live!');
})();
