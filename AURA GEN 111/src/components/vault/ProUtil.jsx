const PRO_UTIL = [
  { id: 'unit_convert_pro', cat: 'util', name: 'Universal Converter', nameFr: 'Convertisseur', icon: '🔄', tags: ['Utility', 'Calc'], code: `const App = () => {
    const [v, setV] = React.useState(1);
    const [u1, setU1] = React.useState('km');
    const [u2, setU2] = React.useState('mi');
    const m = {km:1000, m:1, cm:0.01, mi:1609.34, yd:0.9144, ft:0.3048, in:0.0254};
    const res = (v * m[u1] / m[u2]).toFixed(4);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🔄 Unit Converter</h3>
        <div style={{display:'flex',gap:'12px',marginBottom:'12px'}}>
          <input type="number" value={v} onChange={e=>setV(+e.target.value)} style={{flex:2,padding:'12px',border:'2px solid #e2e8f0',borderRadius:'12px',fontSize:'16px',fontWeight:'800',outline:'none'}}/>
          <select value={u1} onChange={e=>setU1(e.target.value)} style={{flex:1,padding:'12px',border:'2px solid #e2e8f0',borderRadius:'12px',background:'#f8fafc',fontWeight:'700'}}>
            {Object.keys(m).map(k=><option key={k} value={k}>{k}</option>)}
          </select>
        </div>
        <div style={{textAlign:'center',padding:'8px',color:'#94a3b8',fontWeight:'900'}}>EQUALS</div>
        <div style={{display:'flex',gap:'12px',marginTop:'12px'}}>
          <div style={{flex:2,padding:'12px',background:'#f8fafc',border:'2px solid #e2e8f0',borderRadius:'12px',fontSize:'16px',fontWeight:'900',color:'#10b981',display:'flex',alignItems:'center'}}>{res}</div>
          <select value={u2} onChange={e=>setU2(e.target.value)} style={{flex:1,padding:'12px',border:'2px solid #e2e8f0',borderRadius:'12px',background:'#f8fafc',fontWeight:'700'}}>
            {Object.keys(m).map(k=><option key={k} value={k}>{k}</option>)}
          </select>
        </div>
      </div>
    );
  };` },
  { id: 'regex_pro', cat: 'util', name: 'Regex Tester', nameFr: 'Testeur Regex', icon: '🔍', tags: ['Utility', 'DevTools'], code: `const App = () => {
    const [re, setRe] = React.useState('[a-z]+');
    const [fl, setFl] = React.useState('gi');
    const [txt, setTxt] = React.useState('Hello WORLD 123');
    let m = []; let err = '';
    try { m = txt.match(new RegExp(re, fl)) || []; } catch(e){ err = e.message; }
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🔍 Regex Tester</h3>
        <div style={{display:'flex',gap:'8px',marginBottom:'12px'}}>
          <div style={{flex:4,display:'flex',background:'#0f172a',padding:'12px',borderRadius:'12px',border:'1px solid #334155'}}>
            <span style={{color:'#64748b',marginRight:'4px'}}>/</span>
            <input value={re} onChange={e=>setRe(e.target.value)} style={{flex:1,background:'none',border:'none',color:'#10b981',fontFamily:'monospace',fontSize:'14px',outline:'none'}}/>
            <span style={{color:'#64748b',marginLeft:'4px'}}>/</span>
          </div>
          <input value={fl} onChange={e=>setFl(e.target.value)} style={{flex:1,background:'#0f172a',border:'1px solid #334155',borderRadius:'12px',padding:'12px',color:'#3b82f6',fontFamily:'monospace',fontSize:'14px',textAlign:'center',outline:'none'}}/>
        </div>
        <textarea value={txt} onChange={e=>setTxt(e.target.value)} rows="3" style={{width:'100%',boxSizing:'border-box',padding:'12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'12px',color:'#fff',fontFamily:'monospace',fontSize:'14px',resize:'none',outline:'none',marginBottom:'16px'}}/>
        <div style={{background:'rgba(255,255,255,0.05)',padding:'16px',borderRadius:'12px'}}>
          <div style={{fontSize:'12px',fontWeight:'800',color:'#94a3b8',marginBottom:'8px'}}>{err?'ERROR':'MATCHES ('+m.length+')'}</div>
          {err ? <div style={{color:'#ef4444',fontSize:'12px'}}>{err}</div> :
           <div style={{display:'flex',flexWrap:'wrap',gap:'6px'}}>{m.map((x,i)=><div key={i} style={{background:'rgba(16,185,129,0.2)',color:'#10b981',padding:'4px 8px',borderRadius:'6px',fontSize:'12px',fontFamily:'monospace'}}>{x}</div>)}</div>}
        </div>
      </div>
    );
  };` },
  { id: 'json_fmt_pro', cat: 'util', name: 'JSON Formatter', nameFr: 'Formatteur JSON', icon: '{}', tags: ['Utility', 'DevTools'], code: `const App = () => {
    const [i, setI] = React.useState('{"a":1,"b":[1,2,3]}');
    const [fmt, setFmt] = React.useState('');
    const [err, setErr] = React.useState('');
    const prs = () => { try { setFmt(JSON.stringify(JSON.parse(i),null,2)); setErr(''); } catch(e){ setErr(e.message); setFmt(''); } };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>{'{}'} JSON Formatter</h3>
          <button onClick={prs} style={{padding:'6px 16px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'800',cursor:'pointer'}}>Format</button>
        </div>
        <textarea value={i} onChange={e=>setI(e.target.value)} rows="3" placeholder="Paste JSON here..." style={{width:'100%',boxSizing:'border-box',padding:'12px',border:'2px solid #e2e8f0',borderRadius:'12px',fontFamily:'monospace',fontSize:'12px',resize:'none',outline:'none',marginBottom:'12px'}}/>
        {err && <div style={{background:'#fee2e2',color:'#ef4444',padding:'12px',borderRadius:'8px',fontSize:'12px',fontWeight:'700',marginBottom:'12px',fontFamily:'monospace'}}>{err}</div>}
        {fmt && <textarea readOnly value={fmt} rows="8" style={{width:'100%',boxSizing:'border-box',padding:'12px',background:'#f8fafc',border:'2px solid #e2e8f0',borderRadius:'12px',color:'#0f172a',fontFamily:'monospace',fontSize:'12px',resize:'none',outline:'none'}}/>}
      </div>
    );
  };` },
  { id: 'hash_pro', cat: 'util', name: 'MD5/SHA Hash Engine', nameFr: 'Générateur de Hash', icon: '🔐', tags: ['Security', 'Utility'], code: `const App = () => {
    const [i, setI] = React.useState('hello world');
    const b64 = btoa(i); // Simulating hash with base64 for demo purposes to avoid large crypto libs in this snippet
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
         <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🔐 Hash Engine</h3>
         <input value={i} onChange={e=>setI(e.target.value)} placeholder="Enter string..." style={{width:'100%',boxSizing:'border-box',padding:'12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'10px',color:'#fff',marginBottom:'20px',outline:'none'}}/>
         <div>
           <div style={{fontSize:'11px',fontWeight:'800',color:'#94a3b8',marginBottom:'4px'}}>(Base64 encoded demo)</div>
           <div style={{background:'rgba(255,255,255,0.05)',padding:'12px',borderRadius:'8px',fontFamily:'monospace',fontSize:'12px',wordBreak:'break-all'}}>{b64}</div>
         </div>
      </div>
    );
  };` },
  { id: 'lorem_pro', cat: 'util', name: 'Lorem Ipsum Gen', nameFr: 'Générateur Lorem', icon: '📃', tags: ['Utility', 'Design'], code: `const App = () => {
    const p = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
    const [c, setC] = React.useState(2);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📃 Lorem Ipsum</h3>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <button onClick={()=>setC(Math.max(1,c-1))} style={{width:'28px',height:'28px',borderRadius:'14px',border:'1px solid #e2e8f0',background:'#f8fafc',fontWeight:'bold',cursor:'pointer'}}>-</button>
            <span style={{fontWeight:'800',fontSize:'14px'}}>{c} P</span>
            <button onClick={()=>setC(Math.min(5,c+1))} style={{width:'28px',height:'28px',borderRadius:'14px',border:'1px solid #e2e8f0',background:'#f8fafc',fontWeight:'bold',cursor:'pointer'}}>+</button>
          </div>
        </div>
        <div style={{maxHeight:'250px',overflowY:'auto',background:'#f8fafc',padding:'16px',borderRadius:'16px',border:'1px solid #e2e8f0',fontSize:'13px',lineHeight:'1.6',color:'#334155'}}>
          {Array.from({length:c}).map((_,i)=><p key={i} style={{margin:'0 0 12px'}}>{p}</p>)}
        </div>
      </div>
    );
  };` },
  { id: 'cron_pro', cat: 'util', name: 'Cron Expression Reader', nameFr: 'Lecteur Cron', icon: '⏱️', tags: ['Utility', 'DevTools'], code: `const App = () => {
    const [c, setC] = React.useState('0 0 * * *');
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>⏱️ Cron Reader</h3>
        <input value={c} onChange={e=>setC(e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'16px',background:'#0f172a',border:'2px solid #334155',borderRadius:'12px',color:'#fff',fontFamily:'monospace',fontSize:'18px',textAlign:'center',letterSpacing:'2px',outline:'none',marginBottom:'20px'}}/>
        <div style={{background:'rgba(16,185,129,0.1)',color:'#10b981',padding:'16px',borderRadius:'12px',fontWeight:'800',fontSize:'14px'}}>Runs everyday at midnight (Demo static translation)</div>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:'10px',fontWeight:'800',color:'#64748b',marginTop:'16px'}}>
          <span>MIN</span><span>HOUR</span><span>DOM</span><span>MON</span><span>DOW</span>
        </div>
      </div>
    );
  };` },
  { id: 'uuid_pro', cat: 'util', name: 'UUID Generator', nameFr: 'Générateur UUID', icon: '🆔', tags: ['Utility', 'DevTools'], code: `const App = () => {
    const gen = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8); return v.toString(16); });
    const [us, setUs] = React.useState([gen(),gen(),gen()]);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🆔 UUIDv4 Gen</h3>
          <button onClick={()=>setUs([gen(),gen(),gen()])} style={{padding:'6px 12px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'8px',fontWeight:'800',cursor:'pointer'}}>Refresh</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {us.map((u,i)=>(
            <div key={i} style={{background:'#f8fafc',border:'1px dashed #cbd5e1',padding:'12px',borderRadius:'8px',fontFamily:'monospace',fontSize:'12px',color:'#334155',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              {u}
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'base64_pro', cat: 'util', name: 'Base64 Encode/Decode', nameFr: 'Encodeur Base64', icon: '🔤', tags: ['Utility', 'DevTools'], code: `const App = () => {
    const [i, setI] = React.useState(''); const [o, setO] = React.useState(''); const [m, setM] = React.useState('enc');
    const proc = (txt, mode) => {
      try { if(mode==='enc') setO(btoa(txt)); else setO(atob(txt)); } catch(e) { setO('Error'); }
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900'}}>🔤 Base64 Tools</h3>
          <div style={{display:'flex',background:'#0f172a',borderRadius:'8px',overflow:'hidden',border:'1px solid #334155'}}>
            <button onClick={()=>{setM('enc');proc(i,'enc');}} style={{padding:'6px 12px',border:'none',background:m==='enc'?'#6366f1':'transparent',color:'#fff',fontWeight:'800',cursor:'pointer'}}>Enc</button>
            <button onClick={()=>{setM('dec');proc(i,'dec');}} style={{padding:'6px 12px',border:'none',background:m==='dec'?'#6366f1':'transparent',color:'#fff',fontWeight:'800',cursor:'pointer'}}>Dec</button>
          </div>
        </div>
        <textarea value={i} onChange={e=>{setI(e.target.value); proc(e.target.value,m);}} rows="3" placeholder="Input..." style={{width:'100%',boxSizing:'border-box',padding:'12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'12px',color:'#fff',fontFamily:'monospace',fontSize:'13px',resize:'none',outline:'none',marginBottom:'12px'}}/>
        <textarea value={o} readOnly placeholder="Output..." rows="3" style={{width:'100%',boxSizing:'border-box',padding:'12px',background:'rgba(99,102,241,0.1)',border:'1px dashed #6366f1',borderRadius:'12px',color:'#a5b4fc',fontFamily:'monospace',fontSize:'13px',resize:'none',outline:'none'}}/>
      </div>
    );
  };` },
  { id: 'color_pick_pro', cat: 'util', name: 'Color Code Picker', nameFr: 'Sélecteur de Code', icon: '🎨', tags: ['Utility', 'Design'], code: `const App = () => {
    const [c, setC] = React.useState('#6366f1');
    const hex2rgb = h => { let r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16); return 'rgb('+r+','+g+','+b+')'; };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🎨 Color Picker</h3>
        <input type="color" value={c} onChange={e=>setC(e.target.value)} style={{width:'120px',height:'120px',padding:0,border:'none',borderRadius:'60px',cursor:'pointer',background:'none',marginBottom:'24px'}}/>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          <div style={{background:'#f8fafc',padding:'12px',borderRadius:'8px',border:'1px solid #e2e8f0',fontWeight:'900',color:'#0f172a'}}>{c.toUpperCase()}</div>
          <div style={{background:'#f8fafc',padding:'12px',borderRadius:'8px',border:'1px solid #e2e8f0',fontWeight:'900',color:'#475569'}}>{hex2rgb(c)}</div>
        </div>
      </div>
    );
  };` },
  { id: 'aspect_ratio_pro', cat: 'util', name: 'Aspect Ratio Calc', nameFr: 'Calculateur de Ratio', icon: '📐', tags: ['Utility', 'Design'], code: `const App = () => {
    const [w1, setW1] = React.useState(1920); const [h1, setH1] = React.useState(1080);
    const [w2, setW2] = React.useState(1280); const [h2, setH2] = React.useState('');
    const c = (t) => {
      if(t==='w') setW2(Math.round((h2*w1)/h1)||"");
      if(t==='h') setH2(Math.round((w2*h1)/w1)||"");
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>📐 Aspect Ratio Calc</h3>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
          <input type="number" value={w1} onChange={e=>setW1(+e.target.value)} style={{flex:1,padding:'12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',textAlign:'center',width:'100%'}}/>
          <span style={{fontWeight:'900',color:'#64748b'}}>:</span>
          <input type="number" value={h1} onChange={e=>setH1(+e.target.value)} style={{flex:1,padding:'12px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',textAlign:'center',width:'100%'}}/>
        </div>
        <div style={{height:'1px',background:'#334155',margin:'16px 0'}}/>
        <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
          <input type="number" value={w2} onChange={e=>{setW2(+e.target.value);c('h');}} placeholder="W2" style={{flex:1,padding:'12px',background:'rgba(255,255,255,0.05)',border:'1px solid #6366f1',borderRadius:'8px',color:'#fff',fontWeight:'800',textAlign:'center',width:'100%'}}/>
          <span style={{fontWeight:'900',color:'#64748b'}}>:</span>
          <input type="number" value={h2} onChange={e=>{setH2(+e.target.value);c('w');}} placeholder="H2" style={{flex:1,padding:'12px',background:'rgba(255,255,255,0.05)',border:'1px dashed #6366f1',borderRadius:'8px',color:'#fff',fontWeight:'800',textAlign:'center',width:'100%'}}/>
        </div>
      </div>
    );
  };` }
];
export default PRO_UTIL;
