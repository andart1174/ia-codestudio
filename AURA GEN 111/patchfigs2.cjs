const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/figure_data.json', 'utf8'));

// Fix Torus: fewer points (step 0.25/0.35 instead of 0.07/0.14) → ~450 pts vs 4050
const torus = data.find(f => f.id === 'torus');
if (torus) {
    torus.code = `const Torus3D=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;if(!cv)return;const ctx=cv.getContext('2d');let id,t=0;const draw=()=>{ctx.fillStyle='rgba(15,23,42,.3)';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2,R=120,r=45,ang=t*.018;for(let th=0;th<Math.PI*2;th+=.22){for(let ph=0;ph<Math.PI*2;ph+=.32){const x3=(R+r*Math.cos(ph))*Math.cos(th+ang),z3=(R+r*Math.cos(ph))*Math.sin(th+ang),y3=r*Math.sin(ph),p=350/(350+z3),hue=(th/(Math.PI*2)*360+ang*40)%360;ctx.beginPath();ctx.arc(cx+x3*p,cy+y3*p,3*p,0,Math.PI*2);ctx.fillStyle='hsla('+hue+',85%,65%,.85)';ctx.fill();}}t++;id=requestAnimationFrame(draw);};draw();return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f172a',gap:16}}><canvas ref={ref} width={500} height={420} style={{borderRadius:12}}/><p style={{color:'#06b6d4',fontWeight:700,letterSpacing:3,fontSize:13,textShadow:'0 0 10px #06b6d4'}}>⭕ TORUS 3D ⭕</p></div>);};`;
    console.log('Torus fixed (lighter)');
}

// Fix Klein: fewer points + fix z property in pts
const klein = data.find(f => f.id === 'klein');
if (klein) {
    klein.code = `const KleinSpiral=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;if(!cv)return;const ctx=cv.getContext('2d');let id,t=0;const draw=()=>{ctx.fillStyle='rgba(15,23,42,.2)';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2,ang=t*.013;for(let u=0;u<Math.PI*2;u+=.22){for(let v=0;v<Math.PI*2;v+=.38){let x,y;if(u<Math.PI){x=3*Math.cos(u)*(1+Math.sin(u))+2*(1-Math.cos(u)/2)*Math.cos(u+ang)*Math.cos(v);y=4*Math.sin(u)+2*(1-Math.cos(u)/2)*Math.sin(u+ang)*Math.cos(v);}else{x=3*Math.cos(u)*(1+Math.sin(u))+2*(1-Math.cos(u)/2)*Math.cos(v+Math.PI);y=4*Math.sin(u);}const sc=22,hue=(u/(Math.PI*2)*280+200+ang*20)%360;ctx.beginPath();ctx.arc(cx+x*sc,cy+y*sc*.5,2,0,Math.PI*2);ctx.fillStyle='hsla('+hue+',70%,65%,.8)';ctx.fill();}}t++;id=requestAnimationFrame(draw);};draw();return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f172a',gap:16}}><canvas ref={ref} width={500} height={420} style={{borderRadius:12}}/><p style={{color:'#8b5cf6',fontWeight:700,letterSpacing:3,fontSize:13,textShadow:'0 0 10px #8b5cf6'}}>🌀 SPIRALE DE KLEIN 🌀</p></div>);};`;
    console.log('Klein fixed (lighter + no sort)');
}

// Fix Tesseract: use requestAnimationFrame with React state instead of CSS keyframes
const tes = data.find(f => f.id === 'tesseract');
if (tes) {
    tes.code = `const Tesseract4D=()=>{const [r,setR]=React.useState({x:0,y:0,z:0});React.useEffect(()=>{let id,f=0;const tick=()=>{f++;setR({x:f*.5,y:f*.3,z:f*.15});id=requestAnimationFrame(tick);};id=requestAnimationFrame(tick);return()=>cancelAnimationFrame(id);},[]);const o={transform:'rotateX('+r.x+'deg) rotateY('+r.y+'deg) rotateZ('+r.z+'deg)',transformStyle:'preserve-3d',position:'absolute',inset:0};const i={transform:'rotateX('+(-r.x*.6)+'deg) rotateY('+(-r.y*.4)+'deg) rotateZ('+(r.z*1.5)+'deg)',transformStyle:'preserve-3d',position:'absolute',top:25,left:25,right:25,bottom:25};const F=({t,bg,bc,w,h,l,tp})=>(<div style={{position:'absolute',width:w||110,height:h||110,left:l||0,top:tp||0,background:bg,border:'1.5px solid '+bc,transform:t}}/>);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#030712',perspective:'700px'}}>
<div style={{position:'relative',width:110,height:110,transformStyle:'preserve-3d',margin:'0 auto'}}>
<div style={o}>{[['rotateX(90deg) translateZ(55px)','rgba(99,102,241,.15)','#6366f1'],['rotateX(-90deg) translateZ(55px)','rgba(139,92,246,.15)','#8b5cf6'],['translateZ(55px)','rgba(167,139,250,.15)','#a78bfa'],['rotateY(180deg) translateZ(55px)','rgba(196,181,253,.15)','#c4b5fd'],['rotateY(90deg) translateZ(55px)','rgba(124,58,237,.15)','#7c3aed'],['rotateY(-90deg) translateZ(55px)','rgba(109,40,217,.15)','#6d28d9']].map(([t,bg,bc],k)=><F key={k} t={t} bg={bg} bc={bc}/>)}</div>
<div style={i}>{[['rotateX(90deg) translateZ(30px)','rgba(6,182,212,.15)','#06b6d4'],['rotateX(-90deg) translateZ(30px)','rgba(14,165,233,.15)','#0ea5e9'],['translateZ(30px)','rgba(56,189,248,.15)','#38bdf8'],['rotateY(180deg) translateZ(30px)','rgba(125,211,252,.15)','#7dd3fc'],['rotateY(90deg) translateZ(30px)','rgba(2,132,199,.15)','#0284c7'],['rotateY(-90deg) translateZ(30px)','rgba(3,105,161,.15)','#0369a1']].map(([t,bg,bc],k)=><F key={k} t={t} bg={bg} bc={bc} w={60} h={60} l={0} tp={0}/>)}</div>
</div>
<p style={{color:'#6366f1',fontWeight:700,marginTop:80,letterSpacing:3,fontSize:13,textShadow:'0 0 10px #6366f1'}}>🔷 TESSERACT 4D 🔷</p>
</div>);};`;
    console.log('Tesseract fixed (RAF-based, no CSS keyframes)');
}

fs.writeFileSync('public/figure_data.json', JSON.stringify(data, null, 2));
console.log('All fixes saved to public/figure_data.json');
