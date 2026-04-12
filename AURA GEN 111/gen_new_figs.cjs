const fs = require('fs');
const path = require('path');

const NEW_FIGS = [
    {
        id: 'cyberdrone',
        cat: 'chars',
        icon: '🛸',
        en: 'Cyber Drone',
        fr: 'Drone Cybernétique',
        tech: 'CSS 3D',
        tc: '#38bdf8',
        code: `const CyberDrone=()=>{const [r,setR]=React.useState(0);React.useEffect(()=>{let id,f=0;const t=()=>{f++;setR(f);id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);const S=({t,bg}) => <div style={{position:'absolute',width:80,height:80,background:bg||'rgba(56,189,248,.1)',border:'1px solid #38bdf8',transform:t,borderRadius:4}}/>;return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#020617',perspective:800}}><div style={{position:'relative',width:80,height:80,transformStyle:'preserve-3d',transform:\`translateY(\${Math.sin(r*.05)*20}px) rotateY(\${r}deg)\`}}>
<div style={{transformStyle:'preserve-3d'}}>{['rotateX(90deg) translateZ(40px)','rotateX(-90deg) translateZ(40px)','translateZ(40px)','rotateY(180deg) translateZ(40px)','rotateY(90deg) translateZ(40px)','rotateY(-90deg) translateZ(40px)'].map((t,k)=><S key={k} t={t}/>)}</div>
{[[-50,-50],[50,-50],[-50,50],[50,50]].map(([x,y],i)=><div key={i} style={{position:'absolute',left:'50%',top:'50%',width:40,height:4,background:'#38bdf8',transform:\`translate(-50%,-50%) translate3d(\${x}px,\${y}px,0) rotateY(90deg)\` , boxShadow:'0 0 10px #38bdf8'}}><div style={{width:30,height:2,background:'#fff',animation:'u-prop .1s linear infinite'}}/></div>)}
</div><p style={{color:'#38bdf8',marginTop:100,fontWeight:700,letterSpacing:4,fontSize:14,textShadow:'0 0 15px #38bdf8'}}>🛸 CYBER DRONE 🛸</p>
<style>{\`@keyframes u-prop{from{transform:rotateX(0)}to{transform:rotateX(360deg)}}\`}</style></div>);};`
    },
    {
        id: 'weaver',
        cat: 'geo4d',
        icon: '🕸️',
        en: 'Quantum Weaver',
        fr: 'Tisseur Quantique',
        tech: 'Canvas',
        tc: '#a78bfa',
        code: `const QuantumWeaver=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;const ctx=cv.getContext('2d');let id,t=0;const d=()=>{ctx.fillStyle='rgba(10,10,25,.15)';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2;for(let i=0;i<60;i++){const a=t*.01+i*.2,r=100+Math.sin(t*.02+i*.5)*50;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a*1.5)*r;ctx.beginPath();ctx.arc(x,y,2,0,Math.PI*2);ctx.fillStyle=i%2?'#a78bfa':'#6366f1';ctx.fill();if(i>0){ctx.beginPath();ctx.moveTo(x,y);const la=t*.01+(i-1)*.2,lr=100+Math.sin(t*.02+(i-1)*.5)*50;ctx.lineTo(cx+Math.cos(la)*lr,cy+Math.sin(la*1.5)*lr);ctx.strokeStyle='rgba(167,139,250,.2)';ctx.stroke();}}t++;id=requestAnimationFrame(d);};id=requestAnimationFrame(d);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#030712'}}><canvas ref={ref} width={600} height={500}/><p style={{color:'#a78bfa',fontWeight:800,letterSpacing:5,marginTop:-40,fontSize:15,textShadow:'0 0 10px #a78bfa'}}>🕸️ QUANTUM WEAVER 🕸️</p></div>);};`
    },
    {
        id: 'blackhole',
        cat: 'space',
        icon: '🌑',
        en: 'Singularity',
        fr: 'Singularité',
        tech: 'Canvas',
        tc: '#f1f5f9',
        code: `const Singularity=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;const ctx=cv.getContext('2d');let id,t=0;const d=()=>{ctx.fillStyle='#000';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2;const g=ctx.createRadialGradient(cx,cy,5,cx,cy,50);g.addColorStop(0,'#000');g.addColorStop(0.8,'#000');g.addColorStop(1,'#fff');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,50,0,Math.PI*2);ctx.fill();for(let i=0;i<150;i++){const a=t*.005+i*.3,r=60+i*1.2+Math.sin(t*.01+i)*10;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.3+Math.sin(t*.005)*20;ctx.fillStyle='hsla('+(200+Math.sin(i)*50)+',70%,70%,'+(1-i/150)+')';ctx.fillRect(x,y,2,2);}t++;id=requestAnimationFrame(d);};id=requestAnimationFrame(d);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#000'}}><canvas ref={ref} width={600} height={500}/><p style={{color:'#fff',fontWeight:900,letterSpacing:8,marginTop:-60,fontSize:16,textShadow:'0 0 20px #fff'}}>SINGULARITY</p></div>);};`
    },
    {
        id: 'jellyfish',
        cat: 'chars',
        icon: '🪼',
        en: 'Glowing Medusa',
        fr: 'Méduse Lumineuse',
        tech: 'CSS 3D',
        tc: '#c084fc',
        code: `const GlowingMedusa=()=>{const [f,setF]=React.useState(0);React.useEffect(()=>{let id,c=0;const t=()=>{c++;setF(c);id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#020617',perspective:600}}><div style={{position:'relative',width:100,height:120,transformStyle:'preserve-3d',transform:\`translateY(\${Math.sin(f*.03)*30}px) rotateY(\${f*.2}deg)\`}}>
<div style={{width:100,height:60,background:'radial-gradient(circle at 50% 0%,#c084fc,#2e1065)',borderRadius:'50% 50% 10% 10%',opacity:.8,boxShadow:'0 0 20px #c084fc'}}/>
{[...Array(8)].map((_,i)=><div key={i} style={{position:'absolute',left:20+i*8,top:50,width:2,height:100,background:'linear-gradient(#c084fc,transparent)',transform:\`rotateZ(\${Math.sin(f*.05+i)*20}deg)\`,transformOrigin:'top',opacity:.6,boxShadow:'0 0 5px #c084fc'}}/>)}
</div><p style={{color:'#c084fc',marginTop:120,fontWeight:700,letterSpacing:3,fontSize:14,textShadow:'0 0 15px #c084fc'}}>🪼 MÉDUSE LUMINEUSE 🪼</p></div>);};`
    },
    {
        id: 'gears',
        cat: 'interact',
        icon: '⚙️',
        en: 'Steampunk Tech',
        fr: 'Tech Steampunk',
        tech: 'CSS 3D',
        tc: '#fbbf24',
        code: `const SteampunkGears=()=>{const [r,setR]=React.useState(0);React.useEffect(()=>{let id,c=0;const t=()=>{c++;setR(c);id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);const G=({s,x,y,rot,c})=> (
<div style={{position:'absolute',width:s,height:s,left:x,top:y,transform:\`rotate(\${rot}deg)\`,transformStyle:'preserve-3d'}}>
<div style={{width:'100%',height:'100%',borderRadius:'50%',border:'8px solid '+c,boxSizing:'border-box'}}/>
{[...Array(12)].map((_,i)=><div key={i} style={{position:'absolute',width:10,height:15,background:c,left:'50%',marginLeft:-5,top:-5,transformOrigin:\`50% \${s/2+5}px\`,transform:\`rotate(\${i*30}deg)\` , borderRadius:2}}/>)}
</div>);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#1c1917',perspective:1000}}><div style={{position:'relative',width:300,height:300,transform:'rotateX(30deg)'}}>
<G s={150} x={75} y={75} rot={r} c='#fbbf24'/>
<G s={100} x={180} y={40} rot={-r*1.5+15} c='#d97706'/>
<G s={80} x={40} y={180} rot={-r*1.8} c='#f59e0b'/>
</div><p style={{color:'#fbbf24',marginTop:60,fontWeight:800,letterSpacing:4,fontSize:15,textShadow:'1px 1px 2px #000'}}>⚙️ TECH STEAMPUNK ⚙️</p></div>);};`
    },
    {
        id: 'prism',
        cat: 'geo4d',
        icon: '🌈',
        en: 'Light Prism',
        fr: 'Prisme de Lumière',
        tech: 'CSS 3D',
        tc: '#fff',
        code: `const LightPrism=()=>{const [r,setR]=React.useState(0);React.useEffect(()=>{let id,c=0;const t=()=>{c++;setR(c);id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#050505',perspective:1000}}><div style={{position:'relative',width:150,height:150,transformStyle:'preserve-3d',transform:\`rotateY(\${r*.5}deg) rotateX(15deg)\`}}>
<div style={{position:'absolute',width:0,height:0,borderLeft:'75px solid transparent',borderRight:'75px solid transparent',borderBottom:'130px solid rgba(255,255,255,.1)',borderBottomColor:'rgba(255,255,255,.2)',transform:'rotateY(0deg) translateZ(43px) rotateX(30deg)',transformOrigin:'bottom'}}/>
<div style={{position:'absolute',width:0,height:0,borderLeft:'75px solid transparent',borderRight:'75px solid transparent',borderBottom:'130px solid rgba(255,255,255,.1)',borderBottomColor:'rgba(255,255,255,.2)',transform:'rotateY(120deg) translateZ(43px) rotateX(30deg)',transformOrigin:'bottom'}}/>
<div style={{position:'absolute',width:0,height:0,borderLeft:'75px solid transparent',borderRight:'75px solid transparent',borderBottom:'130px solid rgba(255,255,255,.1)',borderBottomColor:'rgba(255,255,255,.2)',transform:'rotateY(240deg) translateZ(43px) rotateX(30deg)',transformOrigin:'bottom'}}/>
<div style={{position:'absolute',width:200,height:60,background:'linear-gradient(90deg,transparent,red,orange,yellow,green,cyan,blue,violet,transparent)',top:60,left:100,transform:'translateZ(-100px) rotateY(-45deg)',opacity:.6,filter:'blur(10px)'}}/>
</div><p style={{color:'#fff',marginTop:100,fontWeight:700,letterSpacing:6,fontSize:14}}>🌈 LIGHT PRISM 🌈</p></div>);};`
    },
    {
        id: 'molecule',
        cat: 'geo4d',
        icon: '🧪',
        en: 'Molecular Bond',
        fr: 'Liaison Moléculaire',
        tech: 'CSS 3D',
        tc: '#4ade80',
        code: `const MolecularBond=()=>{const [r,setR]=React.useState(0);React.useEffect(()=>{let id,c=0;const t=()=>{c++;setR(c);id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);const A=({t,c,s})=> <div style={{position:'absolute',width:s,height:s,borderRadius:'50%',background:c,left:'50%',top:'50%',transform:\`translate(-50%,-50%) \${t}\` , boxShadow:'inset -5px -5px 10px rgba(0,0,0,.5), 0 0 20px '+c}}/>;return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#064e3b',perspective:1000}}><div style={{position:'relative',width:200,height:200,transformStyle:'preserve-3d',transform:\`rotateY(\${r}deg) rotateX(\${r*.5}deg)\`}}>
<A t='translateZ(0)' c='#ef4444' s={60}/>
<A t='translateX(80px)' c='#3b82f6' s={40}/>
<A t='translateX(-80px)' c='#3b82f6' s={40}/>
<A t='translateY(80px)' c='#4ade80' s={40}/>
<A t='translateY(-80px)' c='#4ade80' s={40}/>
{[0,90,180,270].map(a=><div key={a} style={{position:'absolute',width:80,height:8,background:'#94a3b8',left:'50%',top:'50%',transformOrigin:'left',transform:\`translate(0,-50%) rotateZ(\${a}deg)\` , borderRadius:4}}/>)}
</div><p style={{color:'#4ade80',marginTop:80,fontWeight:800,letterSpacing:4,fontSize:15}}>🧪 MOLECULAR BOND 🧪</p></div>);};`
    },
    {
        id: 'vortex',
        cat: 'space',
        icon: '🌀',
        en: 'Time Vortex',
        fr: 'Vortex Temporel',
        tech: 'Canvas',
        tc: '#6366f1',
        code: `const TimeVortex=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;const ctx=cv.getContext('2d');let id,t=0;const d=()=>{ctx.fillStyle='#000';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2;for(let i=0;i<40;i++){const r=i*10 + (t%200)*0.5;const op=1 - r/400;ctx.strokeStyle='hsla('+(200+i*5)+',70%,60%,'+op+')';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();const a=t*.02+i*.5;ctx.fillStyle='rgba(255,255,255,'+op+')';ctx.beginPath();ctx.arc(cx+Math.cos(a)*r,cy+Math.sin(a)*r,2,0,Math.PI*2);ctx.fill();}t++;id=requestAnimationFrame(d);};id=requestAnimationFrame(d);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#000'}}><canvas ref={ref} width={600} height={500}/><p style={{color:'#6366f1',fontWeight:800,letterSpacing:10,marginTop:-60,fontSize:16,textShadow:'0 0 20px #6366f1'}}>TIME VORTEX</p></div>);};`
    },
    {
        id: 'cyberheart',
        cat: 'chars',
        icon: '🫀',
        en: 'Cyber Heart',
        fr: 'Coeur Cybernétique',
        tech: 'CSS 3D',
        tc: '#ef4444',
        code: `const CyberHeart=()=>{const [s,setS]=React.useState(1);React.useEffect(()=>{let id,f=0;const t=()=>{f++;setS(1+Math.sin(f*.15)*0.1 * (Math.sin(f*.05)>0?1:0.2));id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#111',perspective:800}}><div style={{position:'relative',width:120,height:120,transformStyle:'preserve-3d',transform:\`scale(\${s}) rotateY(\${Math.sin(s*5)*10}deg)\`}}>
<div style={{position:'absolute',width:80,height:80,background:'#ef4444',borderRadius:'50% 50% 0 50%',transform:'rotate(-45deg)',left:20,top:20,boxShadow:'0 0 30px #ef4444, inset -10px -10px 20px rgba(0,0,0,.5)'}}/>
<div style={{position:'absolute',width:80,height:80,background:'#ef4444',borderRadius:'50% 50% 50% 0',transform:'rotate(45deg)',left:20,top:20,boxShadow:'0 0 30px #ef4444'}}/>
{[...Array(6)].map((_,i)=><div key={i} style={{position:'absolute',width:4,height:40,background:'#444',left:50+i*4,top:0,transform:'rotateZ(10deg)',border:'1px solid #666'}}/>)}
</div><p style={{color:'#ef4444',marginTop:100,fontWeight:800,letterSpacing:4,fontSize:15,textShadow:'0 0 10px #ef4444'}}>🫀 COEUR CYBERNÉTIQUE 🫀</p></div>);};`
    },
    {
        id: 'hyperspace',
        cat: 'interact',
        icon: '🏎️',
        en: 'Hyper Tunnel',
        fr: 'Tunnel Hyper-espace',
        tech: 'Canvas',
        tc: '#60a5fa',
        code: `const HyperTunnel=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;const ctx=cv.getContext('2d');let id,t=0;const stars=[...Array(200)].map(()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,z:Math.random()*cv.width}));const d=()=>{ctx.fillStyle='#000';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2;stars.forEach(s=>{s.z-=10;if(s.z<=0)s.z=cv.width;const sc=128/s.z,px=(s.x-cx)*sc+cx,py=(s.y-cy)*sc+cy;ctx.fillStyle='rgba(96,165,250,'+(1-s.z/cv.width)+')';ctx.fillRect(px,py,sc*2,sc*2);});t++;id=requestAnimationFrame(d);};id=requestAnimationFrame(d);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#000'}}><canvas ref={ref} width={600} height={500}/><p style={{color:'#60a5fa',fontWeight:900,letterSpacing:12,marginTop:-60,fontSize:18,textShadow:'0 0 15px #60a5fa'}}>HYPERSPACE</p></div>);};`
    },
    {
        id: 'cave',
        cat: 'interact',
        icon: '🛖',
        en: 'Crystal Cave',
        fr: 'Caverne de Cristal',
        tech: 'CSS 3D',
        tc: '#22d3ee',
        code: `const CrystalCave=()=>{const [r,setR]=React.useState(0);React.useEffect(()=>{let id,c=0;const t=()=>{c++;setR(c);id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#083344',perspective:1000}}><div style={{position:'relative',width:300,height:300,transformStyle:'preserve-3d',transform:\`rotateX(60deg) rotateZ(\${r*.2}deg)\`}}>
<div style={{position:'absolute',inset:0,background:'rgba(21,94,117,.4)',border:'2px solid #22d3ee'}}/>
{[...Array(12)].map((_,i)=><div key={i} style={{position:'absolute',width:20,height:60+Math.random()*100,background:'rgba(34,211,238,.3)',border:'1px solid #fff',left:Math.random()*280,top:Math.random()*280,transform:'rotateX(-90deg)',transformOrigin:'bottom',boxShadow:'0 0 15px #22d3ee'}}/>)}
</div><p style={{color:'#22d3ee',marginTop:60,fontWeight:700,letterSpacing:4,fontSize:14,textShadow:'0 0 10px #22d3ee'}}>🛖 CAVERNE DE CRISTAL 🛖</p></div>);};`
    },
    {
        id: 'plasma',
        cat: 'interact',
        icon: '🔮',
        en: 'Plasma Sphere',
        fr: 'Sphère de Plasma',
        tech: 'Canvas',
        tc: '#e879f9',
        code: `const PlasmaSphere=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;const ctx=cv.getContext('2d');let id,t=0;const d=()=>{ctx.fillStyle='#111';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2;ctx.strokeStyle='#e879f9';ctx.lineWidth=2;ctx.beginPath();ctx.arc(cx,cy,100,0,Math.PI*2);ctx.stroke();for(let i=0;i<6;i++){ctx.beginPath();ctx.moveTo(cx,cy);let lx=cx,ly=cy;for(let j=0;j<10;j++){const a=t*.05+i*1.1+j*.2,r=j*10;const nx=cx+Math.cos(a)*r+Math.random()*10-5,ny=cy+Math.sin(a)*r+Math.random()*10-5;ctx.lineTo(nx,ny);lx=nx;ly=ny;}ctx.strokeStyle='#fdf4ff';ctx.stroke();}t++;id=requestAnimationFrame(d);};id=requestAnimationFrame(d);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#111'}}><canvas ref={ref} width={500} height={500}/><p style={{color:'#e879f9',fontWeight:800,letterSpacing:5,marginTop:-60,fontSize:15,textShadow:'0 0 15px #e879f9'}}>🔮 PLASMA SPHERE 🔮</p></div>);};`
    },
    {
        id: 'galaxy2',
        cat: 'space',
        icon: '🔯',
        en: 'Stellar Core',
        fr: 'Coeur Stellaire',
        tech: 'Canvas',
        tc: '#fde047',
        code: `const StellarCore=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;const ctx=cv.getContext('2d');let id,t=0;const d=()=>{ctx.fillStyle='#020617';ctx.fillRect(0,0,cv.width,cv.height);const cx=cv.width/2,cy=cv.height/2;const g=ctx.createRadialGradient(cx,cy,0,cx,cy,80);g.addColorStop(0,'#fff');g.addColorStop(0.2,'#fde047');g.addColorStop(1,'transparent');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,80,0,Math.PI*2);ctx.fill();for(let i=0;i<300;i++){const a=t*.002+i*.5,r=30+i*.5+Math.sin(t*.01+i)*5;ctx.fillStyle='rgba(253,224,71,'+(1-i/300)+')';ctx.fillRect(cx+Math.cos(a)*r,cy+Math.sin(a)*r,1.5,1.5);}t++;id=requestAnimationFrame(d);};id=requestAnimationFrame(d);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#020617'}}><canvas ref={ref} width={600} height={600}/><p style={{color:'#fde047',fontWeight:900,letterSpacing:8,marginTop:-120,fontSize:16,textShadow:'0 0 15px #fde047'}}>STELLAR CORE</p></div>);};`
    },
    {
        id: 'statue',
        cat: 'chars',
        icon: '👤',
        en: 'Phasing Statue',
        fr: 'Statue de Phase',
        tech: 'CSS 3D',
        tc: '#94a3b8',
        code: `const PhasingStatue=()=>{const [f,setF]=React.useState(0);React.useEffect(()=>{let id,c=0;const t=()=>{c++;setF(c);id=requestAnimationFrame(t);};id=requestAnimationFrame(t);return()=>cancelAnimationFrame(id);},[]);const op=Math.abs(Math.sin(f*.02));return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f172a',perspective:800}}><div style={{position:'relative',width:120,height:180,transformStyle:'preserve-3d',transform:\`rotateY(\${f}deg)\`}}>
<div style={{position:'absolute',inset:0,background:'#94a3b8',borderRadius:'40% 40% 10% 10%',opacity:op,boxShadow:'inset 0 0 20px #000'}}/>
<div style={{position:'absolute',inset:0,border:'1px solid #94a3b8',borderRadius:'40% 40% 10% 10%',opacity:1-op}}/>
<div style={{position:'absolute',width:40,height:20,background:'#0f172a',top:60,left:15,borderRadius:'10px 10px 0 0',opacity:op}}/>
<div style={{position:'absolute',width:40,height:20,background:'#0f172a',top:60,right:15,borderRadius:'10px 10px 0 0',opacity:op}}/>
</div><p style={{color:'#94a3b8',marginTop:60,fontWeight:700,letterSpacing:5,fontSize:14,textShadow:'0 0 10px #94a3b8'}}>👤 STATUE DE PHASE 👤</p></div>);};`
    },
    {
        id: 'neuralweb',
        cat: 'interact',
        icon: '🧠',
        en: 'Neural Web',
        fr: 'Toile Neuronale',
        tech: 'Canvas',
        tc: '#06b6d4',
        code: `const NeuralWeb=()=>{const ref=React.useRef(null);React.useEffect(()=>{const cv=ref.current;const ctx=cv.getContext('2d');let id,t=0;const nodes=[...Array(40)].map(()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-0.5)*2,vy:(Math.random()-0.5)*2}));const d=()=>{ctx.fillStyle='#0f172a';ctx.fillRect(0,0,cv.width,cv.height);nodes.forEach(n=>{n.x+=n.vx;n.y+=n.vy;if(n.x<0||n.x>cv.width)n.vx*=-1;if(n.y<0||n.y>cv.height)n.vy*=-1;ctx.fillStyle='#06b6d4';ctx.beginPath();ctx.arc(n.x,n.y,2,0,Math.PI*2);ctx.fill();nodes.forEach(m=>{const dist=Math.hypot(n.x-m.x,n.y-m.y);if(dist<100){ctx.strokeStyle='rgba(6,182,212,'+(1-dist/100)+')';ctx.beginPath();ctx.moveTo(n.x,n.y);ctx.lineTo(m.x,m.y);ctx.stroke();}});});t++;id=requestAnimationFrame(d);};id=requestAnimationFrame(d);return()=>cancelAnimationFrame(id);},[]);return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f172a'}}><canvas ref={ref} width={600} height={500}/><p style={{color:'#06b6d4',fontWeight:800,letterSpacing:4,marginTop:-60,fontSize:15,textShadow:'0 0 10px #06b6d4'}}>🧠 NEURAL WEB 🧠</p></div>);};`
    }
];

// Append to public/figure_data.json
const currentPath = 'public/figure_data.json';
const data = JSON.parse(fs.readFileSync(currentPath, 'utf8'));
const finalData = [...data, ...NEW_FIGS];
fs.writeFileSync(currentPath, JSON.stringify(finalData, null, 2));

console.log('Successfully added 15 new figures to figure_data.json');
