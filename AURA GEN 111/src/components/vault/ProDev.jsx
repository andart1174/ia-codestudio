const PRO_DEV = [
  { id: 'css_shadow_pro', cat: 'dev', name: 'CSS Shadow Generator', nameFr: 'Générateur Ombre CSS', icon: '☁️', tags: ['DevTools', 'UI'], code: `const App = () => {
    const [x, setX] = React.useState(0); const [y, setY] = React.useState(10);
    const [b, setB] = React.useState(15); const [s, setS] = React.useState(-3);
    const [o, setO] = React.useState(0.1);
    const sh = x+'px '+y+'px '+b+'px '+s+'px rgba(0,0,0,'+o+')';
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>☁️ Shadow Gen</h3>
        <div style={{height:'120px',background:'#fff',borderRadius:'16px',boxShadow:sh,margin:'0 auto 24px',width:'120px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',color:'#64748b'}}>Preview</div>
        <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#64748b',display:'flex',justifyContent:'space-between'}}>X Offset <input type="range" min="-50" max="50" value={x} onChange={e=>setX(+e.target.value)} style={{width:'60%'}}/></label>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#64748b',display:'flex',justifyContent:'space-between'}}>Y Offset <input type="range" min="-50" max="50" value={y} onChange={e=>setY(+e.target.value)} style={{width:'60%'}}/></label>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#64748b',display:'flex',justifyContent:'space-between'}}>Blur <input type="range" min="0" max="100" value={b} onChange={e=>setB(+e.target.value)} style={{width:'60%'}}/></label>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#64748b',display:'flex',justifyContent:'space-between'}}>Spread <input type="range" min="-50" max="50" value={s} onChange={e=>setS(+e.target.value)} style={{width:'60%'}}/></label>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#64748b',display:'flex',justifyContent:'space-between'}}>Opacity <input type="range" min="0" max="1" step="0.05" value={o} onChange={e=>setO(+e.target.value)} style={{width:'60%'}}/></label>
        </div>
        <div style={{background:'#1e293b',color:'#10b981',padding:'12px',borderRadius:'8px',fontFamily:'monospace',fontSize:'11px',textAlign:'center'}}>box-shadow: {sh};</div>
      </div>
    );
  };` },
  { id: 'cursor_pro', cat: 'dev', name: 'Custom Cursor CSS', nameFr: 'Curseur CSS', icon: '👆', tags: ['DevTools', 'Web'], code: `const App = () => {
    const cs = ['auto','default','pointer','wait','text','move','help','not-allowed','crosshair','zoom-in','grab'];
    const [sel, setSel] = React.useState('pointer');
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>👆 CSS Cursors</h3>
        <div style={{height:'100px',background:'rgba(255,255,255,0.05)',border:'2px dashed #3bb2f6',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'800',fontSize:'14px',marginBottom:'24px',cursor:sel}}>Hover over me!</div>
        <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
          {cs.map(c=>(
            <button key={c} onClick={()=>setSel(c)} style={{padding:'6px 12px',background:sel===c?'#3b82f6':'#0f172a',border:'1px solid #334155',borderRadius:'16px',color:'#fff',fontSize:'12px',fontWeight:'700',cursor:'pointer'}}> {c} </button>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'anim_bezier_pro', cat: 'dev', name: 'Cubic Bezier Graph', nameFr: 'Graphe Bézier', icon: '📈', tags: ['DevTools', 'Animation'], code: `const App = () => {
    const [p, setP] = React.useState([0.25, 0.1, 0.25, 1.0]);
    const bz = 'cubic-bezier('+p.join(', ')+')';
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📈 Bezier Playground</h3>
        <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
           {['ease','linear','ease-in','ease-out','ease-in-out'].map(t=>
             <div key={t} style={{flex:1,height:'12px',background:'#e2e8f0',borderRadius:'6px',overflow:'hidden',position:'relative'}}>
               <div style={{position:'absolute',left:0,top:0,bottom:0,width:'10px',background:'#6366f1',borderRadius:'6px',animation:'m 2s infinite '+t}}/>
             </div>
           )}
           <style>{"@keyframes m { 0% { left: 0%; } 100% { left: calc(100% - 10px); } }"}</style>
        </div>
        <div style={{height:'24px',background:'#f1f5f9',borderRadius:'12px',overflow:'hidden',position:'relative',marginBottom:'24px'}}>
           <div style={{position:'absolute',left:0,top:0,bottom:0,width:'20px',background:'#ec4899',borderRadius:'12px',animation:'m 2s infinite '+bz}}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px',marginBottom:'12px'}}>
          <input type="number" step="0.1" value={p[0]} onChange={e=>setP([+e.target.value,p[1],p[2],p[3]])} style={{padding:'8px',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'6px'}}/>
          <input type="number" step="0.1" value={p[1]} onChange={e=>setP([p[0],+e.target.value,p[2],p[3]])} style={{padding:'8px',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'6px'}}/>
          <input type="number" step="0.1" value={p[2]} onChange={e=>setP([p[0],p[1],+e.target.value,p[3]])} style={{padding:'8px',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'6px'}}/>
          <input type="number" step="0.1" value={p[3]} onChange={e=>setP([p[0],p[1],p[2],+e.target.value])} style={{padding:'8px',background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'6px'}}/>
        </div>
        <div style={{background:'#0f172a',color:'#10b981',padding:'12px',borderRadius:'8px',fontFamily:'monospace',fontSize:'12px',textAlign:'center'}}>{bz}</div>
      </div>
    );
  };` },
  { id: 'flexbox_pro', cat: 'dev', name: 'Flexbox Playground', nameFr: 'Testeur Flexbox', icon: '📦', tags: ['DevTools', 'CSS'], code: `const App = () => {
    const [jc, setJc] = React.useState('center');
    const [ai, setAi] = React.useState('center');
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>📦 Flexbox Demo</h3>
        <div style={{display:'flex',justifyContent:jc,alignItems:ai,background:'#0f172a',height:'150px',borderRadius:'16px',border:'1px solid #334155',marginBottom:'20px'}}>
           <div style={{width:'40px',height:'40px',background:'#3b82f6',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>1</div>
           <div style={{width:'50px',height:'60px',background:'#ef4444',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>2</div>
           <div style={{width:'40px',height:'50px',background:'#10b981',borderRadius:'8px',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>3</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
           <select value={jc} onChange={e=>setJc(e.target.value)} style={{padding:'10px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800'}}>
             <option value="flex-start">justify-content: flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="space-between">space-between</option><option value="space-around">space-around</option>
           </select>
           <select value={ai} onChange={e=>setAi(e.target.value)} style={{padding:'10px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800'}}>
             <option value="flex-start">align-items: flex-start</option><option value="center">center</option><option value="flex-end">flex-end</option><option value="stretch">stretch</option>
           </select>
        </div>
      </div>
    );
  };` },
  { id: 'grid_pro', cat: 'dev', name: 'CSS Grid Builder', nameFr: 'Constructeur Grid', icon: '🔲', tags: ['DevTools', 'CSS'], code: `const App = () => {
    const [c, setC] = React.useState(3); const [g, setG] = React.useState(8);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🔲 Grid Builder</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat('+c+', 1fr)',gap:g+'px',background:'#f8fafc',padding:g+'px',borderRadius:'16px',border:'1px solid #e2e8f0',marginBottom:'20px'}}>
           {Array.from({length:6}).map((_,i)=><div key={i} style={{background:'#6366f1',height:'40px',borderRadius:'4px'}}/>)}
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <label style={{flex:1,fontSize:'12px',fontWeight:'700',color:'#64748b'}}>Columns ({c}) <input type="range" min="1" max="6" value={c} onChange={e=>setC(+e.target.value)} style={{width:'100%'}}/></label>
          <label style={{flex:1,fontSize:'12px',fontWeight:'700',color:'#64748b'}}>Gap ({g}px) <input type="range" min="0" max="24" value={g} onChange={e=>setG(+e.target.value)} style={{width:'100%'}}/></label>
        </div>
      </div>
    );
  };` },
  { id: 'keycode_pro', cat: 'dev', name: 'JS KeyCode Finder', nameFr: 'Trouveur KeyCode', icon: '⌨️', tags: ['DevTools', 'JS'], code: `const App = () => {
    const [k, setK] = React.useState({key:'Press any key', code:'...', keyCode:'...'});
    React.useEffect(()=>{
      const fn = e => { e.preventDefault(); setK({key:e.key, code:e.code, keyCode:e.keyCode}); };
      window.addEventListener('keydown', fn); return ()=>window.removeEventListener('keydown', fn);
    },[]);
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <div style={{fontSize:'80px',fontWeight:'900',color:'#10b981',lineHeight:1,marginBottom:'8px'}}>{k.keyCode}</div>
        <div style={{fontSize:'24px',fontWeight:'800',color:'#fff',marginBottom:'24px',minHeight:'30px'}}>{k.key}</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
           <div style={{background:'#0f172a',padding:'12px',borderRadius:'12px',border:'1px solid #334155'}}><div style={{fontSize:'11px',color:'#94a3b8',fontWeight:'bold'}}>event.key</div><div style={{fontSize:'14px',fontFamily:'monospace',color:'#3b82f6'}}>{k.key}</div></div>
           <div style={{background:'#0f172a',padding:'12px',borderRadius:'12px',border:'1px solid #334155'}}><div style={{fontSize:'11px',color:'#94a3b8',fontWeight:'bold'}}>event.code</div><div style={{fontSize:'14px',fontFamily:'monospace',color:'#ec4899'}}>{k.code}</div></div>
        </div>
      </div>
    );
  };` },
  { id: 'meta_tag_pro', cat: 'dev', name: 'SEO Meta Tag Builder', nameFr: 'Balises SEO', icon: '🔍', tags: ['SEO', 'Web'], code: `const App = () => {
    const [t, setT] = React.useState('My Website'); const [d, setD] = React.useState('A great site.');
    const m = '<title>'+t+'</title>\\n<meta name="description" content="'+d+'">\\n<meta property="og:title" content="'+t+'">';
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🔍 Meta Tag Builder</h3>
        <input value={t} onChange={e=>setT(e.target.value)} placeholder="Title" style={{width:'100%',boxSizing:'border-box',padding:'10px',border:'2px solid #e2e8f0',borderRadius:'8px',marginBottom:'12px',fontWeight:'bold'}}/>
        <input value={d} onChange={e=>setD(e.target.value)} placeholder="Description" style={{width:'100%',boxSizing:'border-box',padding:'10px',border:'2px solid #e2e8f0',borderRadius:'8px',marginBottom:'20px',fontWeight:'bold'}}/>
        <textarea readOnly value={m} rows="4" style={{width:'100%',boxSizing:'border-box',padding:'12px',background:'#0f172a',color:'#10b981',border:'none',borderRadius:'12px',fontFamily:'monospace',fontSize:'12px',resize:'none',outline:'none'}}/>
      </div>
    );
  };` },
  { id: 'dummy_json_pro', cat: 'dev', name: 'Mock JSON Generator', nameFr: 'Générateur JSON', icon: '📦', tags: ['DevTools', 'API'], code: `const App = () => {
    const [c, setC] = React.useState(3);
    const gen = () => Array.from({length:c}).map((_,i)=>({id:i+1,name:'User '+(i+1),email:'user'+(i+1)+'@test.com'}));
    const [j, setJ] = React.useState(gen());
    React.useEffect(()=>setJ(gen()),[c]);
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900'}}>📦 Mock JSON</h3>
          <select value={c} onChange={e=>setC(+e.target.value)} style={{padding:'6px',background:'#0f172a',color:'#fff',border:'1px solid #334155',borderRadius:'6px'}}>
            <option value="1">1 Item</option><option value="3">3 Items</option><option value="5">5 Items</option>
          </select>
        </div>
        <textarea readOnly value={JSON.stringify(j,null,2)} rows="10" style={{width:'100%',boxSizing:'border-box',padding:'12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'12px',color:'#3b82f6',fontFamily:'monospace',fontSize:'12px',resize:'none',outline:'none'}}/>
      </div>
    );
  };` },
  { id: 'svg_blob', cat: 'dev', name: 'SVG Blob Shape Gen', nameFr: 'Générateur Blob', icon: '💧', tags: ['DevTools', 'Design'], code: `const App = () => {
    const [v, setV] = React.useState('');
    const gen = () => {
      const p=[]; for(let i=0;i<6;i++){ const a=(Math.PI*2/6)*i; const r=100+Math.random()*40-20; p.push({x:150+Math.cos(a)*r, y:150+Math.sin(a)*r}); }
      const d=p.reduce((acc,pt,i,a)=>{const nx=a[(i+1)%a.length]; return acc+' Q '+pt.x+','+pt.y+' '+(pt.x+nx.x)/2+','+(pt.y+nx.y)/2}, 'M '+(p[0].x+p[p.length-1].x)/2+','+(p[0].y+p[p.length-1].y)/2);
      setV(d+' Z');
    };
    React.useEffect(gen,[]);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>💧 SVG Blob</h3>
        <svg width="200" height="200" style={{margin:'0 auto 20px',background:'#f8fafc',borderRadius:'16px',border:'1px dashed #cbd5e1'}}>
          <path d={v} fill="#ec4899" />
        </svg>
        <button onClick={gen} style={{padding:'12px 24px',background:'#0f172a',color:'#fff',border:'none',borderRadius:'12px',fontWeight:'800',cursor:'pointer'}}>Mutate Shape</button>
      </div>
    );
  };` },
  { id: 'palette_acc_pro', cat: 'dev', name: 'UI Color Accessibility', nameFr: 'Accessibilité Couleurs', icon: '👁️', tags: ['DevTools', 'Access'], code: `const App = () => {
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>👁️ UI A11y</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
           <div style={{background:'#fff',color:'#64748b',padding:'16px',borderRadius:'12px',borderLeft:'4px solid #ef4444'}}>
             <div style={{fontSize:'14px',fontWeight:'800',marginBottom:'4px'}}>#fff / #64748b</div>
             <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'12px',fontWeight:'bold'}}>Ratio: 2.8:1</span><span style={{background:'#fee2e2',color:'#ef4444',padding:'2px 8px',borderRadius:'6px',fontSize:'10px',fontWeight:'900'}}>FAIL</span></div>
           </div>
           <div style={{background:'#fff',color:'#1e293b',padding:'16px',borderRadius:'12px',borderLeft:'4px solid #10b981'}}>
             <div style={{fontSize:'14px',fontWeight:'800',marginBottom:'4px'}}>#fff / #1e293b</div>
             <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><span style={{fontSize:'12px',fontWeight:'bold'}}>Ratio: 12.3:1</span><span style={{background:'#d1fae5',color:'#10b981',padding:'2px 8px',borderRadius:'6px',fontSize:'10px',fontWeight:'900'}}>PASS AAA</span></div>
           </div>
        </div>
      </div>
    );
  };` }
];
export default PRO_DEV;
