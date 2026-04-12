const PRO_EDU = [
  { id: 'flashcard_pro', cat: 'edu', name: 'Smart Study Cards', nameFr: 'Cartes Mémoire', icon: '📇', tags: ['Education', 'Study'], code: `const App = () => {
    const [idx, setIdx] = React.useState(0);
    const [flip, setFlip] = React.useState(false);
    const crds = [
      {q:'What is React?', a:'A JavaScript library for UI'},
      {q:'What is JSX?', a:'Syntax extension for JS'},
      {q:'What is a Hook?', a:'Function to use React features'}
    ];
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff',textAlign:'center',perspective:'1000px'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>📇 Flashcards ({idx+1}/{crds.length})</h3>
        <div onClick={()=>setFlip(!flip)} style={{height:'200px',background:flip?'#6366f1':'#fff',color:flip?'#fff':'#0f172a',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',padding:'24px',fontSize:'20px',fontWeight:'800',cursor:'pointer',boxShadow:'0 10px 30px rgba(0,0,0,0.2)',transform:flip?'rotateY(180deg)':'rotateY(0deg)',transition:'transform 0.6s, background 0.3s, color 0.3s',transformStyle:'preserve-3d'}}>
           <div style={{transform:flip?'rotateY(180deg)':'none'}}>{flip?crds[idx].a:crds[idx].q}</div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',marginTop:'24px'}}>
          <button onClick={()=>{setIdx((idx-1+crds.length)%crds.length);setFlip(false);}} style={{padding:'12px 24px',background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',borderRadius:'12px',fontWeight:'800',cursor:'pointer'}}>Prev</button>
          <button onClick={()=>{setIdx((idx+1)%crds.length);setFlip(false);}} style={{padding:'12px 24px',background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',borderRadius:'12px',fontWeight:'800',cursor:'pointer'}}>Next</button>
        </div>
      </div>
    );
  };` },
  { id: 'quiz_pro', cat: 'edu', name: 'Multi-choice Exam', nameFr: 'Examen QCM', icon: '📝', tags: ['Education', 'Test'], code: `const App = () => {
    const qs = [{q:'5 + 7 = ?',o:['10','12','14'],a:1},{q:'Capital of France?',o:['London','Berlin','Paris'],a:2}];
    const [c, setC] = React.useState(0);
    const [sc, setSc] = React.useState(0);
    const [end, setEnd] = React.useState(false);
    const ans = (i) => {
      if(i===qs[c].a) setSc(sc+1);
      if(c<qs.length-1) setC(c+1); else setEnd(true);
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        {end ? (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🎓</div>
            <h3 style={{margin:'0 0 12px',fontSize:'24px',fontWeight:'900',color:'#0f172a'}}>Results</h3>
            <div style={{fontSize:'20px',fontWeight:'800',color:'#64748b'}}>Score: <span style={{color:'#10b981'}}>{sc}/{qs.length}</span></div>
            <button onClick={()=>{setC(0);setSc(0);setEnd(false);}} style={{width:'100%',padding:'16px',background:'#0f172a',color:'#fff',border:'none',borderRadius:'12px',marginTop:'24px',fontWeight:'800',cursor:'pointer'}}>Retake Exam</button>
          </div>
        ) : (
          <div>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#6366f1',marginBottom:'16px'}}>QUESTION {c+1} OF {qs.length}</div>
            <h3 style={{margin:'0 0 24px',fontSize:'20px',fontWeight:'800',color:'#0f172a'}}>{qs[c].q}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {qs[c].o.map((o,i)=>(
                <button key={i} onClick={()=>ans(i)} style={{padding:'16px',background:'#f8fafc',border:'2px solid #e2e8f0',borderRadius:'12px',textAlign:'left',fontSize:'16px',fontWeight:'700',color:'#0f172a',cursor:'pointer'}}>{o}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };` },
  { id: 'math_pro', cat: 'edu', name: 'Mental Math Challenge', nameFr: 'Défi Calcul Mental', icon: '🧮', tags: ['Education', 'Math'], code: `const App = () => {
    const [n1, setN1] = React.useState(5); const [n2, setN2] = React.useState(8); const [op, setOp] = React.useState('+');
    const [inp, setInp] = React.useState(''); const [sc, setSc] = React.useState(0);
    const gen = () => {
      const ops=['+','-','*']; const o = ops[Math.floor(Math.random()*ops.length)];
      setOp(o);
      if(o==='*'){setN1(Math.floor(Math.random()*12)+1); setN2(Math.floor(Math.random()*12)+1);}
      else {setN1(Math.floor(Math.random()*50)+10); setN2(Math.floor(Math.random()*30)+1);}
    };
    const chk = (e) => {
      e.preventDefault();
      let ans=0; if(op==='+')ans=n1+n2; if(op==='-')ans=n1-n2; if(op==='*')ans=n1*n2;
      if(+inp===ans){setSc(s=>s+1);gen();setInp('');}else{setInp('');}
    };
    React.useEffect(gen,[]);
    return (
      <div style={{fontFamily:'system-ui',background:'linear-gradient(135deg,#0ea5e9,#2563eb)',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900',textShadow:'0 2px 4px rgba(0,0,0,0.2)'}}>🧮 Mental Math</h3>
        <div style={{fontSize:'14px',fontWeight:'800',marginBottom:'24px',opacity:0.9}}>Streak: {sc}</div>
        <div style={{fontSize:'48px',fontWeight:'900',background:'rgba(255,255,255,0.1)',padding:'24px',borderRadius:'16px',marginBottom:'24px',letterSpacing:'2px'}}>{n1} {op} {n2}</div>
        <form onSubmit={chk}>
          <input type="number" value={inp} onChange={e=>setInp(e.target.value)} placeholder="=" autoFocus style={{width:'100%',boxSizing:'border-box',padding:'16px',fontSize:'24px',fontWeight:'900',textAlign:'center',border:'none',borderRadius:'12px',outline:'none',marginBottom:'16px'}}/>
        </form>
      </div>
    );
  };` },
  { id: 'vocab_pro', cat: 'edu', name: 'Daily Word Builder', nameFr: 'Vocabulaire', icon: '📖', tags: ['Education', 'Language'], code: `const App = () => {
    const ws = [{w:'Ubiquitous',d:'Present, appearing, or found everywhere.'},{w:'Ephemeral',d:'Lasting for a very short time.'},{w:'Cacophony',d:'A harsh, discordant mixture of sounds.'}];
    const [idx, setIdx] = React.useState(0);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900',color:'#0f172a',textAlign:'center'}}>📖 Word of the Day</h3>
        <div style={{background:'#f8fafc',padding:'24px',borderRadius:'16px',borderLeft:'4px solid #6366f1'}}>
           <div style={{fontSize:'24px',fontWeight:'900',color:'#0f172a',marginBottom:'8px'}}>{ws[idx].w}</div>
           <div style={{fontSize:'13px',color:'#64748b',fontStyle:'italic',marginBottom:'16px'}}>Adjective</div>
           <p style={{margin:0,fontSize:'15px',color:'#334155',lineHeight:'1.5'}}>{ws[idx].d}</p>
        </div>
        <button onClick={()=>setIdx((idx+1)%ws.length)} style={{width:'100%',padding:'14px',marginTop:'24px',background:'#0f172a',color:'#fff',border:'none',borderRadius:'12px',fontWeight:'800',cursor:'pointer'}}>Next Word →</button>
      </div>
    );
  };` },
  { id: 'timer_study_pro', cat: 'edu', name: 'Deep Work Timer', nameFr: 'Chrono Travail', icon: '⏳', tags: ['Education', 'Productivity'], code: `const App = () => {
    const [v, setV] = React.useState(45*60);
    const [r, setR] = React.useState(false);
    React.useEffect(()=>{
      if(!r) return;
      const i=setInterval(()=>setV(x=>{if(x<=1){setR(false);return 0;}return x-1;}), 1000);
      return ()=>clearInterval(i);
    },[r]);
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'300px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>🧠</div>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>Deep Work Phase</h3>
        <div style={{fontSize:'64px',fontWeight:'900',fontVariantNumeric:'tabular-nums',marginBottom:'32px',letterSpacing:'-2px'}}>{Math.floor(v/60).toString().padStart(2,'0')}:{(v%60).toString().padStart(2,'0')}</div>
        <button onClick={()=>setR(!r)} style={{padding:'16px 40px',background:r?'#ef4444':'#10b981',color:'#fff',border:'none',borderRadius:'100px',fontSize:'16px',fontWeight:'900',cursor:'pointer',boxShadow:r?'0 4px 14px rgba(239,68,68,0.4)':'0 4px 14px rgba(16,185,129,0.4)'}}>{r?'PAUSE FOCUS':'START FOCUS'}</button>
      </div>
    );
  };` },
  { id: 'gpa_pro', cat: 'edu', name: 'GPA Calculator Master', nameFr: 'Calculateur GPA', icon: '💯', tags: ['Education', 'Utility'], code: `const App = () => {
    const [c, setC] = React.useState([{cr:3, gr:4},{cr:4, gr:3}]);
    const add =()=>setC([...c,{cr:3,gr:4}]);
    const tc = c.reduce((s,x)=>s+x.cr,0);
    const tp = c.reduce((s,x)=>s+(x.cr*x.gr),0);
    const gpa = tc===0?0:(tp/tc).toFixed(2);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>💯 GPA Calculator</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'12px',marginBottom:'20px'}}>
           {c.map((it,i)=>(
             <div key={i} style={{display:'flex',gap:'8px'}}>
               <select value={it.cr} onChange={e=>{let n=[...c];n[i].cr=+e.target.value;setC(n);}} style={{flex:1,padding:'8px',border:'1px solid #e2e8f0',borderRadius:'8px'}}>
                 {[1,2,3,4,5].map(v=><option key={v} value={v}>{v} Credits</option>)}
               </select>
               <select value={it.gr} onChange={e=>{let n=[...c];n[i].gr=+e.target.value;setC(n);}} style={{flex:1,padding:'8px',border:'1px solid #e2e8f0',borderRadius:'8px'}}>
                 {[{l:'A',v:4},{l:'B',v:3},{l:'C',v:2},{l:'D',v:1},{l:'F',v:0}].map(g=><option key={g.l} value={g.v}>Grade {g.l}</option>)}
               </select>
             </div>
           ))}
        </div>
        <button onClick={add} style={{width:'100%',padding:'10px',background:'#f1f5f9',color:'#0f172a',border:'none',borderRadius:'8px',fontWeight:'800',cursor:'pointer',marginBottom:'24px'}}>+ Add Course</button>
        <div style={{background:'#0f172a',color:'#fff',padding:'20px',borderRadius:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
           <div style={{fontSize:'12px',fontWeight:'800',color:'#94a3b8'}}>TOTAL GPA</div>
           <div style={{fontSize:'32px',fontWeight:'900',color:'#10b981'}}>{gpa}</div>
        </div>
      </div>
    );
  };` },
  { id: 'kanji_pro', cat: 'edu', name: 'Japanese Kanji Drill', nameFr: 'Quiz Kanji', icon: '🇯🇵', tags: ['Education', 'Language'], code: `const App = () => {
    const k = [{c:'水',m:'Water',r:'Mizu'},{c:'火',m:'Fire',r:'Hi'},{c:'木',m:'Tree',r:'Ki'}];
    const [idx, setIdx] = React.useState(0); const [r, setR] = React.useState(false);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🇯🇵 Kanji Drill</h3>
        <div onClick={()=>setR(!r)} style={{aspectRatio:'1',background:'#f8fafc',border:'2px solid #e2e8f0',borderRadius:'24px',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer',marginBottom:'24px',transition:'all 0.2s'}}>
          <div style={{fontSize:'80px',fontWeight:'900',color:'#ef4444',marginBottom:'8px'}}>{k[idx].c}</div>
          {r && <div style={{fontSize:'16px',fontWeight:'800',color:'#0f172a'}}>{k[idx].m} ({k[idx].r})</div>}
        </div>
        <button onClick={()=>{setIdx((idx+1)%k.length);setR(false);}} style={{width:'100%',padding:'16px',background:'#0f172a',color:'#fff',border:'none',borderRadius:'12px',fontWeight:'800',cursor:'pointer'}}>Next Kanji</button>
      </div>
    );
  };` },
  { id: 'periodic_table', cat: 'edu', name: 'Element Explorer', nameFr: 'Tableau Périodique', icon: '🧪', tags: ['Education', 'Science'], code: `const App = () => {
    const el = [{s:'H',n:'Hydrogen',w:1.008,c:'#f87171'},{s:'He',n:'Helium',w:4.0026,c:'#60a5fa'},{s:'Li',n:'Lithium',w:6.94,c:'#34d399'},{s:'Be',n:'Beryllium',w:9.0122,c:'#34d399'},{s:'B',n:'Boron',w:10.81,c:'#fbbf24'},{s:'C',n:'Carbon',w:12.011,c:'#a78bfa'}];
    const [sel, setSel] = React.useState(0);
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🧪 Tiny Periodic Table</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'8px',marginBottom:'24px'}}>
          {el.map((e,i)=>(
            <div key={i} onClick={()=>setSel(i)} style={{background:e.c,padding:'12px',borderRadius:'12px',textAlign:'center',cursor:'pointer',opacity:sel===i?1:0.6,transform:sel===i?'scale(1.05)':'scale(1)',transition:'all 0.2s',color:'#fff'}}>
              <div style={{fontSize:'10px',fontWeight:'800',textAlign:'left',opacity:0.8}}>{i+1}</div>
              <div style={{fontSize:'24px',fontWeight:'900'}}>{e.s}</div>
            </div>
          ))}
        </div>
        <div style={{background:'rgba(255,255,255,0.05)',padding:'20px',borderRadius:'16px'}}>
          <div style={{fontSize:'13px',fontWeight:'800',color:'#94a3b8',marginBottom:'4px'}}>Atomic Number: {sel+1}</div>
          <div style={{fontSize:'24px',fontWeight:'900',color:el[sel].c,marginBottom:'4px'}}>{el[sel].n}</div>
          <div style={{fontSize:'14px',color:'#fff'}}>Weight: {el[sel].w} u</div>
        </div>
      </div>
    );
  };` },
  { id: 'typing_pro', cat: 'edu', name: 'Speed Typing Test', nameFr: 'Test de Dactylographie', icon: '⌨️', tags: ['Education', 'Skill'], code: `const App = () => {
    const txt = "The quick brown fox jumps over the lazy dog";
    const [i, setI] = React.useState('');
    const [st, setSt] = React.useState(0);
    const [t, setT] = React.useState(0);
    React.useEffect(()=>{
      if(st===0 || i===txt) return;
      const id=setInterval(()=>setT(Date.now()-st), 100);
      return ()=>clearInterval(id);
    },[st, i]);
    const wr = i.split('').some((c,idx)=>c!==txt[idx]);
    const wpm = i===txt ? Math.round((txt.split(' ').length / (t/60000))) : 0;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>⌨️ Typing Test</h3>
        <div style={{background:'#f8fafc',padding:'20px',borderRadius:'16px',fontSize:'16px',lineHeight:'1.5',color:'#475569',fontWeight:'600',marginBottom:'20px',fontFamily:'monospace'}}>
          {txt.split('').map((c,idx)=><span key={idx} style={{color:i.length>idx?(i[idx]===c?'#10b981':'#ef4444'):'#94a3b8',background:i.length===idx?'rgba(99,102,241,0.2)':'transparent'}}>{c}</span>)}
        </div>
        <input value={i} onChange={e=>{if(st===0)setSt(Date.now());setI(e.target.value);}} disabled={i===txt} placeholder="Start typing..." style={{width:'100%',boxSizing:'border-box',padding:'16px',border:wr?'2px solid #ef4444':'2px solid #e2e8f0',borderRadius:'12px',fontSize:'16px',fontFamily:'monospace',outline:'none',background:wr?'#fef2f2':'#fff'}}/>
        {i===txt && <div style={{marginTop:'24px',textAlign:'center'}}><div style={{fontSize:'12px',fontWeight:'800',color:'#64748b'}}>YOUR SPEED</div><div style={{fontSize:'48px',fontWeight:'900',color:'#6366f1'}}>{wpm} <span style={{fontSize:'16px'}}>WPM</span></div></div>}
      </div>
    );
  };` },
  { id: 'read_speed', cat: 'edu', name: 'Speed Reading Trainer', nameFr: 'Entraîneur Lecture', icon: '👁️', tags: ['Education', 'Skill'], code: `const App = () => {
    const ws = "Speed reading is a skill you can develop with practice. Focus on the center.".split(' ');
    const [i, setI] = React.useState(0);
    const [r, setR] = React.useState(false);
    React.useEffect(()=>{
      if(!r) return;
      const id=setInterval(()=>{
        setI(x=>{if(x>=ws.length-1){setR(false);return 0;} return x+1;});
      }, 300);
      return ()=>clearInterval(id);
    },[r]);
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>👁️ Speed Reader</h3>
        <div style={{height:'120px',background:'#0f172a',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',fontWeight:'900',marginBottom:'24px',border:'1px solid #334155'}}>{ws[i]}</div>
        <button onClick={()=>setR(!r)} style={{padding:'16px 40px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'12px',fontSize:'16px',fontWeight:'900',cursor:'pointer'}}>{r?'STOP':'START 200 WPM'}</button>
      </div>
    );
  };` }
];
export default PRO_EDU;
