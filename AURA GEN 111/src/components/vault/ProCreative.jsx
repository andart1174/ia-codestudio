const PRO_CREATIVE = [
  { id: 'color_harmony_pro', cat: 'creative', name: 'Color Harmony Engine', nameFr: 'Moteur d\'Harmonie', icon: '🎨', tags: ['Design', 'Creative'], code: `const App = () => {
    const [hue, setHue] = React.useState(200);
    const h1 = hue; const h2 = (hue+120)%360; const h3 = (hue+240)%360;
    const box = h => (<div style={{flex:1,height:'120px',background:'hsl('+h+', 80%, 60%)',borderRadius:'16px',display:'flex',alignItems:'flex-end',padding:'12px',fontWeight:'900',color:'#fff',textShadow:'0 2px 4px rgba(0,0,0,0.5)'}}>HSL({h})</div>);
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>🎨 Triadic Harmony</h3>
        <input type="range" min="0" max="360" value={hue} onChange={e=>setHue(+e.target.value)} style={{width:'100%',marginBottom:'24px'}}/>
        <div style={{display:'flex',gap:'12px'}}>
          {box(h1)}{box(h2)}{box(h3)}
        </div>
      </div>
    );
  };` },
  { id: 'glass_editor', cat: 'creative', name: 'Glassmorphism Editor', nameFr: 'Éditeur Glass', icon: '🫧', tags: ['Design', 'CSS'], code: `const App = () => {
    const [b, setB] = React.useState(10);
    const [o, setO] = React.useState(0.15);
    return (
      <div style={{fontFamily:'system-ui',background:'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop")',backgroundSize:'cover',backgroundPosition:'center',padding:'40px',borderRadius:'24px',maxWidth:'400px',margin:'0 auto'}}>
        <div style={{backdropFilter:'blur('+b+'px)',background:'rgba(255,255,255,'+o+')',padding:'32px',borderRadius:'20px',border:'1px solid rgba(255,255,255,0.3)',boxShadow:'0 10px 40px rgba(0,0,0,0.2)',color:'#fff'}}>
          <h3 style={{margin:'0 0 20px',fontSize:'20px',fontWeight:'900',textShadow:'0 2px 4px rgba(0,0,0,0.2)'}}>🫧 Glass Editor</h3>
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'12px',fontWeight:'800',marginBottom:'8px',textShadow:'0 1px 2px rgba(0,0,0,0.5)'}}>Blur ({b}px)</label>
            <input type="range" min="0" max="40" value={b} onChange={e=>setB(+e.target.value)} style={{width:'100%'}}/>
          </div>
          <div style={{marginBottom:'16px'}}>
            <label style={{display:'block',fontSize:'12px',fontWeight:'800',marginBottom:'8px',textShadow:'0 1px 2px rgba(0,0,0,0.5)'}}>Opacity ({Math.round(o*100)}%)</label>
            <input type="range" min="0" max="0.8" step="0.05" value={o} onChange={e=>setO(+e.target.value)} style={{width:'100%'}}/>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'particle_pro', cat: 'creative', name: 'Particle Flow Simulator', nameFr: 'Particules Interactives', icon: '✨', tags: ['Animation', 'Visual'], code: `const App = () => {
    const cvsRef = React.useRef(null);
    React.useEffect(()=>{
      const ctx = cvsRef.current.getContext('2d');
      let w = 300, h = 300;
      let pts = Array.from({length:60}).map(()=>({x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-0.5)*2, vy:(Math.random()-0.5)*2}));
      let aId;
      const fn = () => {
        ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,w,h);
        pts.forEach(p=>{
          p.x+=p.vx; p.y+=p.vy;
          if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1;
          ctx.beginPath(); ctx.arc(p.x,p.y,2,0,Math.PI*2); ctx.fillStyle='#6366f1'; ctx.fill();
        });
        for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
          const d = Math.hypot(pts[i].x-pts[j].x, pts[i].y-pts[j].y);
          if(d<40){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.strokeStyle='rgba(99,102,241,'+(1-d/40)+')'; ctx.stroke(); }
        }
        aId = requestAnimationFrame(fn);
      };
      fn(); return ()=>cancelAnimationFrame(aId);
    },[]);
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',textAlign:'center'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'16px',fontWeight:'900',color:'#fff'}}>✨ Particle Flow</h3>
        <canvas ref={cvsRef} width="300" height="300" style={{borderRadius:'16px',background:'#000'}}/>
      </div>
    );
  };` },
  { id: 'css_grad_pro', cat: 'creative', name: 'Gradient Designer PRO', nameFr: 'Designer Dégradé', icon: '🌈', tags: ['Design', 'CSS'], code: `const App = () => {
    const [c1, setC1] = React.useState('#ec4899');
    const [c2, setC2] = React.useState('#8b5cf6');
    const [deg, setDeg] = React.useState(45);
    const bg = 'linear-gradient('+deg+'deg, '+c1+', '+c2+')';
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{height:'180px',background:bg,borderRadius:'16px',marginBottom:'20px',boxShadow:'0 4px 12px rgba(0,0,0,0.1)'}}/>
        <div style={{display:'flex',gap:'12px',marginBottom:'16px'}}>
          <input type="color" value={c1} onChange={e=>setC1(e.target.value)} style={{flex:1,height:'40px',border:'none',borderRadius:'8px',cursor:'pointer'}}/>
          <input type="color" value={c2} onChange={e=>setC2(e.target.value)} style={{flex:1,height:'40px',border:'none',borderRadius:'8px',cursor:'pointer'}}/>
        </div>
        <input type="range" min="0" max="360" value={deg} onChange={e=>setDeg(+e.target.value)} style={{width:'100%',marginBottom:'12px'}}/>
        <div style={{background:'#f8fafc',padding:'12px',borderRadius:'8px',fontFamily:'monospace',fontSize:'11px',color:'#334155',textAlign:'center',border:'1px solid #e2e8f0'}}>{bg}</div>
      </div>
    );
  };` },
  { id: 'svg_pattern_pro', cat: 'creative', name: 'SVG Pattern Builder', nameFr: 'Générateur de Motifs', icon: '💠', tags: ['Design', 'Visual'], code: `const App = () => {
    const [s, setS] = React.useState(20);
    const [r, setR] = React.useState(5);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>💠 SVG Pattern</h3>
        <div style={{width:'100%',height:'200px',background:'#0f172a',borderRadius:'16px',marginBottom:'20px',overflow:'hidden'}}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="pat" x="0" y="0" width={s} height={s} patternUnits="userSpaceOnUse">
                <circle cx={s/2} cy={s/2} r={r} fill="#6366f1" opacity="0.8"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pat)"/>
          </svg>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <div style={{flex:1}}><label style={{fontSize:'11px',fontWeight:'800',color:'#64748b'}}>Spacing ({s})</label><input type="range" min="10" max="50" value={s} onChange={e=>setS(+e.target.value)} style={{width:'100%'}}/></div>
          <div style={{flex:1}}><label style={{fontSize:'11px',fontWeight:'800',color:'#64748b'}}>Radius ({r})</label><input type="range" min="1" max="20" value={r} onChange={e=>setR(+e.target.value)} style={{width:'100%'}}/></div>
        </div>
      </div>
    );
  };` },
  { id: 'contrast_pro', cat: 'creative', name: 'WCAG Contrast Checker', nameFr: 'Contraste WCAG', icon: '👁️', tags: ['Accessibility', 'Design'], code: `const App = () => {
    const [fg, setFg] = React.useState('#ffffff');
    const [bg, setBg] = React.useState('#1e293b');
    const getLum = (hex) => {
      let rgb = parseInt(hex.slice(1),16); let r=(rgb>>16)&0xff, g=(rgb>>8)&0xff, b=(rgb>>0)&0xff;
      let [rs,gs,bs] = [r,g,b].map(c=>{c/=255; return c<=0.03928?c/12.92:Math.pow((c+0.055)/1.055,2.4);});
      return 0.2126*rs + 0.7152*gs + 0.0722*bs;
    };
    const l1=getLum(fg), l2=getLum(bg);
    const r = (Math.max(l1,l2)+0.05)/(Math.min(l1,l2)+0.05);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>👁️ WCAG Contrast</h3>
        <div style={{background:bg,color:fg,padding:'32px',borderRadius:'16px',textAlign:'center',marginBottom:'20px',minHeight:'80px',display:'flex',alignItems:'center',justifyContent:'center',border:'1px solid #e2e8f0'}}>
          <div style={{fontSize:'24px',fontWeight:'900'}}>Preview Text</div>
        </div>
        <div style={{display:'flex',gap:'12px',marginBottom:'24px'}}>
          <div style={{flex:1}}><label style={{fontSize:'12px',fontWeight:'700',color:'#64748b',display:'block',marginBottom:'8px'}}>Text</label><input type="color" value={fg} onChange={e=>setFg(e.target.value)} style={{width:'100%',height:'36px',border:'none'}}/></div>
          <div style={{flex:1}}><label style={{fontSize:'12px',fontWeight:'700',color:'#64748b',display:'block',marginBottom:'8px'}}>Background</label><input type="color" value={bg} onChange={e=>setBg(e.target.value)} style={{width:'100%',height:'36px',border:'none'}}/></div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'16px',background:'#f8fafc',borderRadius:'12px'}}>
          <div style={{fontSize:'24px',fontWeight:'900',color:'#0f172a'}}>{r.toFixed(2)}:1</div>
          <div style={{display:'flex',gap:'8px'}}>
            <span style={{padding:'4px 8px',borderRadius:'6px',fontSize:'12px',fontWeight:'800',background:r>=4.5?'#10b981':'#ef4444',color:'#fff'}}>AA</span>
            <span style={{padding:'4px 8px',borderRadius:'6px',fontSize:'12px',fontWeight:'800',background:r>=7?'#10b981':'#ef4444',color:'#fff'}}>AAA</span>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'filter_pro', cat: 'creative', name: 'CSS Filter Playground', nameFr: 'Filtres CSS', icon: '🖼️', tags: ['Design', 'CSS'], code: `const App = () => {
    const [b, setB] = React.useState(0);
    const [s, setS] = React.useState(0);
    const [h, setH] = React.useState(0);
    const fil = 'blur('+b+'px) sepia('+s+'%) hue-rotate('+h+'deg)';
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <div style={{width:'100%',height:'180px',background:'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800")',backgroundSize:'cover',borderRadius:'16px',marginBottom:'20px',filter:fil}}/>
        <div style={{marginBottom:'12px'}}><label style={{fontSize:'11px',fontWeight:'700',color:'#94a3b8'}}>Blur ({b}px)</label><input type="range" min="0" max="20" value={b} onChange={e=>setB(+e.target.value)} style={{width:'100%'}}/></div>
        <div style={{marginBottom:'12px'}}><label style={{fontSize:'11px',fontWeight:'700',color:'#94a3b8'}}>Sepia ({s}%)</label><input type="range" min="0" max="100" value={s} onChange={e=>setS(+e.target.value)} style={{width:'100%'}}/></div>
        <div style={{marginBottom:'12px'}}><label style={{fontSize:'11px',fontWeight:'700',color:'#94a3b8'}}>Hue ({h}deg)</label><input type="range" min="0" max="360" value={h} onChange={e=>setH(+e.target.value)} style={{width:'100%'}}/></div>
      </div>
    );
  };` },
  { id: 'svg_icons_pro', cat: 'creative', name: 'SVG Icon Browser', nameFr: 'Navigateur d\'Icônes', icon: '🖼️', tags: ['Design', 'Visual'], code: `const App = () => {
    const icons = ['★','☀','☁','✖','♥','♫','☂','⚡','⛄','⚑','✂','✈'];
    const [c, setC] = React.useState('#ef4444');
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🖼️ Icon Grid</h3>
          <input type="color" value={c} onChange={e=>setC(e.target.value)} style={{height:'24px',border:'none'}}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:'12px'}}>
          {icons.map((ic,i)=>(
            <div key={i} style={{background:'#f8fafc',aspectRatio:'1',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'28px',borderRadius:'12px',color:c,border:'1px solid #e2e8f0',cursor:'pointer',transition:'transform 0.2s'}} onMouseOver={e=>e.target.style.transform='scale(1.1)'} onMouseOut={e=>e.target.style.transform='scale(1)'}>{ic}</div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'palette_random', cat: 'creative', name: 'Random Palette UI', nameFr: 'Palette Aléatoire', icon: '🎨', tags: ['Design', 'Creative'], code: `const App = () => {
    const gen = () => Array.from({length:5}).map(()=>'#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'));
    const [pal, setPal] = React.useState(gen());
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'32px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>🎨 Palette Generator</h3>
        <div style={{display:'flex',height:'120px',borderRadius:'16px',overflow:'hidden',marginBottom:'24px',boxShadow:'0 10px 20px rgba(0,0,0,0.2)'}}>
          {pal.map((c,i)=><div key={i} style={{flex:1,background:c,position:'relative',display:'flex',alignItems:'flex-end',justifyContent:'center',paddingBottom:'12px'}}><div style={{background:'rgba(0,0,0,0.5)',fontSize:'10px',padding:'4px 6px',borderRadius:'4px',fontWeight:'bold'}}>{c.toUpperCase()}</div></div>)}
        </div>
        <button onClick={()=>setPal(gen())} style={{padding:'14px 32px',background:'#fff',color:'#0f172a',border:'none',borderRadius:'12px',fontWeight:'900',fontSize:'15px',cursor:'pointer'}}>GENERATE NEW</button>
      </div>
    );
  };` },
  { id: 'sketch_lite_pro', cat: 'creative', name: 'Drawing Sketch Board', nameFr: 'Tableau de Dessin', icon: '✏️', tags: ['Creative', 'Visual'], code: `const App = () => {
    const cvsRef = React.useRef(null);
    const [dr, setDr] = React.useState(false);
    const start = e => { setDr(true); const ctx = cvsRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); };
    const draw = e => { if(!dr) return; const ctx = cvsRef.current.getContext('2d'); ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY); ctx.stroke(); };
    React.useEffect(()=>{
      const ctx = cvsRef.current.getContext('2d');
      ctx.strokeStyle = '#6366f1'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    },[]);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'20px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <h3 style={{margin:0,fontSize:'16px',fontWeight:'900',color:'#0f172a'}}>✏️ Sketch Lite</h3>
          <button onClick={()=>{const cvs=cvsRef.current; cvs.getContext('2d').clearRect(0,0,cvs.width,cvs.height);}} style={{padding:'6px 12px',background:'#fee2e2',color:'#ef4444',border:'none',borderRadius:'8px',fontWeight:'800',cursor:'pointer'}}>Clear</button>
        </div>
        <canvas ref={cvsRef} width="300" height="300" onMouseDown={start} onMouseMove={draw} onMouseUp={()=>setDr(false)} onMouseLeave={()=>setDr(false)} style={{background:'#f8fafc',border:'2px dashed #cbd5e1',borderRadius:'16px',cursor:'crosshair',touchAction:'none'}}/>
      </div>
    );
  };` }
];
export default PRO_CREATIVE;
