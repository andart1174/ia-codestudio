const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/figure_data.json', 'utf8'));

// Torus 3D: CSS 3D dots arranged in torus geometry — RAF + setState
const torus = data.find(f => f.id === 'torus');
if (torus) {
    torus.code = `const Torus3D=()=>{const [rot,setRot]=React.useState({x:20,y:0});React.useEffect(()=>{let id,f=0;const tick=()=>{f++;setRot({x:20+Math.sin(f*.008)*15,y:f*.4});id=requestAnimationFrame(tick);};id=requestAnimationFrame(tick);return()=>cancelAnimationFrame(id);},[]);const dots=[];const N=10,N2=6,R=90,r=32;for(let i=0;i<N;i++){for(let j=0;j<N2;j++){const th=(i/N)*Math.PI*2,ph=(j/N2)*Math.PI*2;dots.push({x:(R+r*Math.cos(ph))*Math.cos(th),y:(R+r*Math.cos(ph))*Math.sin(th),z:r*Math.sin(ph),hue:Math.round(i/N*360)});}}return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f172a',perspective:'500px',gap:24}}><div style={{position:'relative',width:300,height:300,transformStyle:'preserve-3d',transform:'rotateX('+rot.x+'deg) rotateY('+rot.y+'deg)'}}>{dots.map(({x,y,z,hue},k)=>(<div key={k} style={{position:'absolute',width:12,height:12,borderRadius:'50%',background:'hsla('+hue+',85%,65%,.9)',boxShadow:'0 0 8px hsla('+hue+',85%,65%,.6)',left:'50%',top:'50%',transform:'translate(-50%,-50%) translate3d('+x+'px,'+y+'px,'+z+'px)'}}/>))}</div><p style={{color:'#06b6d4',fontWeight:700,letterSpacing:3,fontSize:13,textShadow:'0 0 10px #06b6d4'}}>⭕ TORUS 3D ⭕</p></div>);};`;
    console.log('Torus rewritten as CSS 3D');
}

// Klein Spiral: CSS 3D dots arranged in Klein bottle projection — RAF + setState
const klein = data.find(f => f.id === 'klein');
if (klein) {
    klein.code = `const KleinSpiral=()=>{const [ang,setAng]=React.useState(0);React.useEffect(()=>{let id,f=0;const tick=()=>{f++;setAng(f*.25);id=requestAnimationFrame(tick);};id=requestAnimationFrame(tick);return()=>cancelAnimationFrame(id);},[]);const dots=[];const sc=20;for(let ui=0;ui<28;ui++){for(let vi=0;vi<14;vi++){const u=(ui/28)*Math.PI*2,v=(vi/14)*Math.PI*2;let x,y,z;if(u<Math.PI){x=3*Math.cos(u)*(1+Math.sin(u))+2*(1-Math.cos(u)/2)*Math.cos(u)*Math.cos(v);y=4*Math.sin(u)+2*(1-Math.cos(u)/2)*Math.sin(u)*Math.cos(v);}else{x=3*Math.cos(u)*(1+Math.sin(u))+2*(1-Math.cos(u)/2)*Math.cos(v+Math.PI);y=4*Math.sin(u);}z=2*(1-Math.cos(u)/2)*Math.sin(v);dots.push({x:x*sc,y:y*sc,z:z*sc,hue:Math.round(ui/28*280+200)});}}return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#0f172a',perspective:'800px',gap:24}}><div style={{position:'relative',width:300,height:340,transformStyle:'preserve-3d',transform:'rotateX(20deg) rotateY('+ang+'deg)'}}>{dots.map(({x,y,z,hue},k)=>(<div key={k} style={{position:'absolute',width:5,height:5,borderRadius:'50%',background:'hsla('+hue+',70%,65%,.85)',left:'150px',top:'170px',transform:'translate(-50%,-50%) translate3d('+x+'px,'+y+'px,'+z+'px)'}}/>))}</div><p style={{color:'#8b5cf6',fontWeight:700,letterSpacing:3,fontSize:13,textShadow:'0 0 10px #8b5cf6'}}>🌀 SPIRALE DE KLEIN 🌀</p></div>);};`;
    console.log('Klein rewritten as CSS 3D');
}

fs.writeFileSync('public/figure_data.json', JSON.stringify(data, null, 2));
console.log('Saved. Both figures now use CSS 3D (no canvas).');
