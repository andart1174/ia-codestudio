const PRO_PROD = [
  { id: 'kanban_pro', cat: 'prod', name: 'Kanban Board PRO', nameFr: 'Tableau Kanban', icon: '📋', tags: ['Productivity', 'Management'], code: `const App = () => {
    const [cols, setCols] = React.useState([
      {id:'todo', name:'To Do', items:[{id:1, text:'Write docs'},{id:2, text:'Update react'}]},
      {id:'doing', name:'In Process', items:[{id:3, text:'Design DB'}]},
      {id:'done', name:'Finished', items:[{id:4, text:'Auth setup'}]}
    ]);
    const move = (cId, iId, dir) => {
      const idx = cols.findIndex(c=>c.id===cId);
      if((dir===-1&&idx===0)||(dir===1&&idx===cols.length-1)) return;
      setCols(prev => {
        const copy = JSON.parse(JSON.stringify(prev));
        const itemIdx = copy[idx].items.findIndex(i=>i.id===iId);
        const item = copy[idx].items.splice(itemIdx,1)[0];
        copy[idx+dir].items.push(item);
        return copy;
      });
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#f1f5f9',padding:'24px',borderRadius:'24px',maxWidth:'560px',margin:'0 auto'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📋 Kanban PRO</h3>
        <div style={{display:'flex',gap:'12px',overflowX:'auto'}}>
          {cols.map((c,i)=>(
            <div key={c.id} style={{flex:1,minWidth:'160px',background:'#e2e8f0',borderRadius:'16px',padding:'12px'}}>
              <div style={{fontSize:'12px',fontWeight:'800',color:'#475569',marginBottom:'12px',textTransform:'uppercase'}}>{c.name} ({c.items.length})</div>
              {c.items.map(it=>(
                <div key={it.id} style={{background:'#fff',padding:'12px',borderRadius:'10px',marginBottom:'8px',boxShadow:'0 2px 4px rgba(0,0,0,0.05)'}}>
                  <div style={{fontSize:'13px',fontWeight:'600',color:'#0f172a',marginBottom:'8px'}}>{it.text}</div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <button disabled={i===0} onClick={()=>move(c.id,it.id,-1)} style={{background:'none',border:'none',cursor:i===0?'default':'pointer',opacity:i===0?0.3:1}}>⬅️</button>
                    <button disabled={i===cols.length-1} onClick={()=>move(c.id,it.id,1)} style={{background:'none',border:'none',cursor:i===cols.length-1?'default':'pointer',opacity:i===cols.length-1?0.3:1}}>➡️</button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'pomodoro_master', cat: 'prod', name: 'Pomodoro Focus', nameFr: 'Focus Pomodoro', icon: '🍅', tags: ['Productivity', 'Timer'], code: `const App = () => {
    const [timeLeft, setTimeLeft] = React.useState(25*60);
    const [run, setRun] = React.useState(false);
    const [mode, setMode] = React.useState('work'); // work, break
    React.useEffect(() => {
      if(!run) return;
      const i = setInterval(() => setTimeLeft(t => {
        if(t <= 1) { setRun(false); return 0; }
        return t - 1;
      }), 1000);
      return () => clearInterval(i);
    }, [run]);
    const setT = (m, mins) => { setMode(m); setTimeLeft(mins*60); setRun(false); };
    const m = Math.floor(timeLeft/60).toString().padStart(2,'0');
    const s = (timeLeft%60).toString().padStart(2,'0');
    const cd = mode==='work' ? '#ef4444' : '#10b981';
    const total = mode==='work' ? 25*60 : 5*60;
    const pct = ((total-timeLeft)/total)*100;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.1)',textAlign:'center'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px'}}>
          <button onClick={()=>setT('work',25)} style={{flex:1,padding:'8px',borderRadius:'10px',border:'none',background:mode==='work'?'#fee2e2':'#f1f5f9',color:mode==='work'?'#dc2626':'#64748b',fontWeight:'800',cursor:'pointer'}}>Focus</button>
          <button onClick={()=>setT('break',5)} style={{flex:1,padding:'8px',borderRadius:'10px',border:'none',background:mode==='break'?'#d1fae5':'#f1f5f9',color:mode==='break'?'#059669':'#64748b',fontWeight:'800',cursor:'pointer'}}>Break</button>
        </div>
        <div style={{position:'relative',width:'200px',height:'200px',margin:'0 auto 24px'}}>
          <svg width="200" height="200" style={{transform:'rotate(-90deg)'}}>
            <circle cx="100" cy="100" r="90" fill="none" stroke="#f1f5f9" strokeWidth="12"/>
            <circle cx="100" cy="100" r="90" fill="none" stroke={cd} strokeWidth="12" strokeDasharray={565} strokeDashoffset={565-(pct/100)*565} strokeLinecap="round" style={{transition:'stroke-dashoffset 1s linear'}}/>
          </svg>
          <div style={{position:'absolute',inset:0,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div style={{fontSize:'48px',fontWeight:'900',color:'#0f172a',letterSpacing:'-2px',fontVariantNumeric:'tabular-nums'}}>{m}:{s}</div>
          </div>
        </div>
        <button onClick={()=>setRun(!run)} style={{width:'100%',padding:'14px',background:cd,color:'#fff',border:'none',borderRadius:'14px',fontSize:'16px',fontWeight:'900',cursor:'pointer',boxShadow:'0 4px 14px '+(mode==='work'?'rgba(239,68,68,0.4)':'rgba(16,185,129,0.4)')}}>{run?'⏸ PAUSE':(timeLeft===0?'RESTART':'▶ START')}</button>
      </div>
    );
  };` },
  { id: 'mindmap_pro', cat: 'prod', name: 'Mind Map Visualizer', nameFr: 'Carte Mentale', icon: '🧠', tags: ['Productivity', 'Visual'], code: `const App = () => {
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'40px',borderRadius:'24px',maxWidth:'400px',margin:'0 auto',color:'#fff',position:'relative',minHeight:'300px'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🧠 Mind Map Core</h3>
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',zIndex:0}}>
          <path d="M 200 150 Q 120 220 80 250" fill="none" stroke="#334155" strokeWidth="3"/>
          <path d="M 200 150 Q 280 220 320 250" fill="none" stroke="#334155" strokeWidth="3"/>
          <path d="M 200 150 Q 200 80 200 60" fill="none" stroke="#334155" strokeWidth="3"/>
        </svg>
        <div style={{position:'absolute',top:'120px',left:'50%',transform:'translate(-50%,0)',background:'#6366f1',padding:'12px 20px',borderRadius:'12px',fontWeight:'800',zIndex:1}}>Central Idea</div>
        <div style={{position:'absolute',bottom:'40px',left:'40px',background:'#1e293b',border:'2px solid #334155',padding:'8px 16px',borderRadius:'10px',fontSize:'13px',fontWeight:'700',zIndex:1}}>Concept A</div>
        <div style={{position:'absolute',bottom:'40px',right:'40px',background:'#1e293b',border:'2px solid #334155',padding:'8px 16px',borderRadius:'10px',fontSize:'13px',fontWeight:'700',zIndex:1}}>Concept B</div>
        <div style={{position:'absolute',top:'20px',left:'50%',transform:'translate(-50%,0)',background:'#1e293b',border:'2px solid #334155',padding:'8px 16px',borderRadius:'10px',fontSize:'13px',fontWeight:'700',zIndex:1}}>Concept C</div>
      </div>
    );
  };` },
  { id: 'daily_planner_pro', cat: 'prod', name: 'Strategic Planner', nameFr: 'Planificateur', icon: '📅', tags: ['Productivity', 'State'], code: `const App = () => {
    const hours = [9,10,11,12,13,14,15,16,17];
    const [tasks, setTasks] = React.useState({10:'Team Sync', 13:'Lunch', 15:'Project Review'});
    const [edit, setEdit] = React.useState(null);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📅 Daily Plan</h3>
          <div style={{fontSize:'12px',color:'#6366f1',fontWeight:'800'}}>{new Date().toLocaleDateString('en-US',{weekday:'short'})}</div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'2px',maxHeight:'320px',overflowY:'auto'}}>
          {hours.map(h=>(
            <div key={h} style={{display:'flex',alignItems:'center',gap:'12px',padding:'8px',background:tasks[h]?'#f0fdf4':'transparent',borderBottom:'1px solid #f1f5f9',cursor:'pointer'}} onClick={()=>setEdit(h)}>
              <div style={{width:'40px',fontSize:'11px',fontWeight:'700',color:'#94a3b8',textAlign:'right'}}>{h>12?h-12:h} {h>=12?'PM':'AM'}</div>
              <div style={{flex:1,position:'relative'}}>
                {tasks[h] && <div style={{position:'absolute',left:-8,top:0,bottom:0,width:'4px',background:'#10b981',borderRadius:'2px'}}/>}
                {edit===h ? <input autoFocus defaultValue={tasks[h]||''} onBlur={e=>{setTasks({...tasks,[h]:e.target.value});setEdit(null);}} onKeyDown={e=>{if(e.key==='Enter')e.target.blur();}} style={{width:'100%',padding:'6px',border:'1px solid #cbd5e1',borderRadius:'6px',fontSize:'13px'}}/> :
                <div style={{fontSize:'13px',color:tasks[h]?'#0f172a':'#cbd5e1',fontWeight:tasks[h]?'600':'400',minHeight:'24px',display:'flex',alignItems:'center'}}>{tasks[h] || 'Free'}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'pass_vault_pro', cat: 'prod', name: 'Secure Password Vault', nameFr: 'Coffre-fort', icon: '🔐', tags: ['Security', 'Utility'], code: `const App = () => {
    const [pwd, setPwd] = React.useState('');
    const [list, setList] = React.useState([{site:'google.com', p:'******'},{site:'github.com', p:'******'}]);
    const unl = pwd === '1234';
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>{unl?'🔓':'🔐'}</div>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>Password Vault</h3>
        {!unl ? (
          <div>
            <div style={{fontSize:'12px',color:'#94a3b8',marginBottom:'12px'}}>Enter PIN to unlock (1234)</div>
            <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} style={{width:'120px',padding:'12px',fontSize:'20px',textAlign:'center',background:'#0f172a',border:'2px solid #334155',borderRadius:'12px',color:'#fff',letterSpacing:'4px'}}/>
          </div>
        ) : (
          <div style={{textAlign:'left'}}>
             {list.map((it,i)=>(
               <div key={i} style={{background:'rgba(255,255,255,0.05)',padding:'12px',borderRadius:'12px',marginBottom:'8px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                 <span style={{fontSize:'14px',fontWeight:'700'}}>{it.site}</span>
                 <button style={{background:'#6366f1',border:'none',color:'#fff',padding:'4px 8px',borderRadius:'6px',fontSize:'11px',fontWeight:'700',cursor:'pointer'}}>COPY</button>
               </div>
             ))}
             <button onClick={()=>setPwd('')} style={{width:'100%',marginTop:'12px',padding:'10px',background:'none',border:'1px solid #ef4444',color:'#ef4444',borderRadius:'10px',fontWeight:'800',cursor:'pointer'}}>Lock Vault</button>
          </div>
        )}
      </div>
    );
  };` },
  { id: 'habit_streak_pro', cat: 'prod', name: 'Habit Streak Master', nameFr: 'Suivi de Série', icon: '🔥', tags: ['Productivity', 'Progress'], code: `const App = () => {
    const [streak, setStreak] = React.useState(14);
    const [done, setDone] = React.useState(false);
    return (
      <div style={{fontFamily:'system-ui',background:'linear-gradient(135deg,#f59e0b,#ea580c)',padding:'32px',borderRadius:'24px',maxWidth:'300px',margin:'0 auto',color:'#fff',textAlign:'center',boxShadow:'0 10px 40px rgba(234,88,12,0.3)'}}>
        <div style={{fontSize:'56px',filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.2))',marginBottom:'16px'}}>🔥</div>
        <div style={{fontSize:'13px',fontWeight:'800',letterSpacing:'2px',opacity:0.9,marginBottom:'4px'}}>CURRENT STREAK</div>
        <div style={{fontSize:'64px',fontWeight:'900',letterSpacing:'-3px',lineHeight:1,marginBottom:'24px'}}>{streak} <span style={{fontSize:'20px'}}>Days</span></div>
        <button onClick={()=>{if(!done){setStreak(s=>s+1);setDone(true);}}} disabled={done} style={{width:'100%',padding:'14px',background:done?'rgba(255,255,255,0.2)':'#fff',color:done?'#fff':'#ea580c',border:'none',borderRadius:'14px',fontSize:'16px',fontWeight:'900',cursor:done?'default':'pointer',transition:'all 0.3s'}}>{done?'✓ Checked In Custom':'Log Today\'s Habit'}</button>
      </div>
    );
  };` },
  { id: 'world_clock_pro', cat: 'prod', name: 'Global Timezone Dash', nameFr: 'Horloge Mondiale', icon: '🌍', tags: ['Utility', 'Time'], code: `const App = () => {
    const [now, setNow] = React.useState(new Date());
    React.useEffect(()=>{
      const i=setInterval(()=>setNow(new Date()), 1000);
      return ()=>clearInterval(i);
    },[]);
    const t = (tz) => now.toLocaleTimeString('en-US',{timeZone:tz, hour:'2-digit', minute:'2-digit'});
    const cities = [
      {city:'New York', tz:'America/New_York', flag:'🇺🇸'},
      {city:'London', tz:'Europe/London', flag:'🇬🇧'},
      {city:'Tokyo', tz:'Asia/Tokyo', flag:'🇯🇵'},
      {city:'Sydney', tz:'Australia/Sydney', flag:'🇦🇺'}
    ];
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'20px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🌍 World Clock</h3>
        <div style={{display:'grid',gap:'12px'}}>
          {cities.map(c=>(
            <div key={c.city} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'rgba(255,255,255,0.05)',padding:'16px',borderRadius:'12px',borderLeft:'4px solid #6366f1'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                <span style={{fontSize:'20px'}}>{c.flag}</span>
                <span style={{fontSize:'15px',fontWeight:'700'}}>{c.city}</span>
              </div>
              <div style={{fontSize:'20px',fontWeight:'900',fontVariantNumeric:'tabular-nums'}}>{t(c.tz)}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'md_preview_pro', cat: 'prod', name: 'Markdown Editor PRO', nameFr: 'Éditeur Markdown', icon: '📝', tags: ['Developer', 'Writer'], code: `const App = () => {
    const [md, setMd] = React.useState('# Hello!\\n\\nWrite **markdown** here.\\n\\n- List item 1\\n- List item 2');
    const html = md.replace(/^### (.*$)/gim, '<h3>\$1</h3>')
                   .replace(/^## (.*$)/gim, '<h2>\$1</h2>')
                   .replace(/^# (.*$)/gim, '<h1>\$1</h1>')
                   .replace(/\\*\\*(.*?)\\*\\*/gim, '<b>\$1</b>')
                   .replace(/\\n/gim, '<br>');
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'20px',borderRadius:'20px',maxWidth:'500px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',gap:'16px',height:'200px'}}>
          <textarea value={md} onChange={e=>setMd(e.target.value)} style={{flex:1,padding:'12px',border:'2px solid #e2e8f0',borderRadius:'12px',fontFamily:'monospace',fontSize:'13px',resize:'none',outline:'none'}}/>
          <div style={{flex:1,padding:'12px',background:'#f8fafc',borderRadius:'12px',border:'1px solid #e2e8f0',overflowY:'auto',fontSize:'14px',color:'#0f172a'}} dangerouslySetInnerHTML={{__html: html}} />
        </div>
      </div>
    );
  };` },
  { id: 'qr_gen_pro', cat: 'prod', name: 'Dynamic QR Generator', nameFr: 'Bâtisseur QR', icon: '📱', tags: ['Utility', 'Web'], code: `const App = () => {
    const [text, setText] = React.useState('https://aura.gen');
    // Generates a mock visual QR based on string length (for aesthetic demo)
    const seed = text.length;
    const size = 12;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'300px',margin:'0 auto',textAlign:'center',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📱 QR Preview</h3>
        <div style={{background:'#fff',padding:'16px',border:'2px solid #e2e8f0',borderRadius:'16px',display:'inline-block',marginBottom:'20px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat('+size+', 12px)',gridTemplateRows:'repeat('+size+', 12px)',gap:'1px'}}>
            {Array.from({length:size*size}).map((_,i) => {
              const on = ((i*seed*17)%100) > 40;
              return <div key={i} style={{background:on?'#000':'#fff',borderRadius:'2px'}}/>
            })}
          </div>
        </div>
        <input value={text} onChange={e=>setText(e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'12px',border:'2px solid #e2e8f0',borderRadius:'12px',fontSize:'14px',textAlign:'center',outline:'none'}} />
      </div>
    );
  };` },
  { id: 'shortener_pro', cat: 'prod', name: 'Link Management UI', nameFr: 'Gestion de Liens', icon: '🔗', tags: ['Web', 'Utility'], code: `const App = () => {
    const [url, setUrl] = React.useState('');
    const [links, setLinks] = React.useState([]);
    const add = () => {
      if(!url) return;
      const sh = 'aura.gen/'+Math.random().toString(36).substring(2,7);
      setLinks([{url, sh}, ...links]);
      setUrl('');
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'20px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>🔗 Link Shortener</h3>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Paste long URL..." style={{flex:1,boxSizing:'border-box',padding:'12px',background:'#1e293b',border:'2px solid #334155',borderRadius:'10px',color:'#fff',fontSize:'13px',outline:'none'}}/>
          <button onClick={add} style={{padding:'0 16px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'10px',fontWeight:'800',cursor:'pointer'}}>Shorten</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {links.map((l,i)=>(
            <div key={i} style={{background:'rgba(255,255,255,0.05)',padding:'12px',borderRadius:'10px',border:'1px solid #334155'}}>
              <div style={{fontSize:'14px',fontWeight:'800',color:'#a5b4fc',marginBottom:'4px'}}>{l.sh}</div>
              <div style={{fontSize:'11px',color:'#64748b',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{l.url}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'age_calc_pro', cat: 'prod', name: 'Precision Age Meter', nameFr: 'Calculateur d\'Âge', icon: '🎂', tags: ['Utility', 'Date'], code: `const App = () => {
    const [dob, setDob] = React.useState('2000-01-01');
    const calc = () => {
      const d1 = new Date(dob);
      const d2 = new Date();
      let y = d2.getFullYear() - d1.getFullYear();
      let m = d2.getMonth() - d1.getMonth();
      let d = d2.getDate() - d1.getDate();
      if(d < 0) { m--; d += new Date(d2.getFullYear(), d2.getMonth(), 0).getDate(); }
      if(m < 0) { y--; m += 12; }
      return {y,m,d};
    };
    const {y,m,d} = calc();
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🎂 Precision Age</h3>
        <input type="date" value={dob} onChange={e=>setDob(e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'12px',border:'2px solid #e2e8f0',borderRadius:'10px',fontSize:'16px',fontWeight:'700',color:'#0f172a',marginBottom:'24px',outline:'none'}}/>
        <div style={{display:'flex',gap:'12px',justifyContent:'center'}}>
          <div style={{flex:1,background:'#f8fafc',padding:'16px 8px',borderRadius:'16px',border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:'32px',fontWeight:'900',color:'#6366f1',lineHeight:1}}>{y}</div>
            <div style={{fontSize:'10px',fontWeight:'800',color:'#64748b',marginTop:'6px',letterSpacing:'1px'}}>YEARS</div>
          </div>
          <div style={{flex:1,background:'#f8fafc',padding:'16px 8px',borderRadius:'16px',border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:'32px',fontWeight:'900',color:'#ec4899',lineHeight:1}}>{m}</div>
            <div style={{fontSize:'10px',fontWeight:'800',color:'#64748b',marginTop:'6px',letterSpacing:'1px'}}>MONTHS</div>
          </div>
          <div style={{flex:1,background:'#f8fafc',padding:'16px 8px',borderRadius:'16px',border:'1px solid #e2e8f0'}}>
            <div style={{fontSize:'32px',fontWeight:'900',color:'#10b981',lineHeight:1}}>{d}</div>
            <div style={{fontSize:'10px',fontWeight:'800',color:'#64748b',marginTop:'6px',letterSpacing:'1px'}}>DAYS</div>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'percent_master_pro', cat: 'prod', name: 'Percent Calculation Master', nameFr: 'Maître Pourcentage', icon: '％', tags: ['Utility', 'Calc'], code: `const App = () => {
    const [v1, setV1] = React.useState(20); const [v2, setV2] = React.useState(150);
    const [mode, setMode] = React.useState(0);
    const modes = [
      {l:'What is X% of Y?', c:()=>(v1/100)*v2},
      {l:'X is what % of Y?', c:()=>(v1/v2)*100},
      {l:'% Change X to Y?', c:()=>((v2-v1)/v1)*100}
    ];
    let res = 0; try { res = modes[mode].c(); } catch(e){}
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>％ Percent Master</h3>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          {modes.map((m,i)=><button key={i} onClick={()=>setMode(i)} style={{flex:1,padding:'6px',fontSize:'10px',fontWeight:'700',borderRadius:'6px',border:'none',background:mode===i?'#6366f1':'#334155',color:'#fff',cursor:'pointer'}}>{m.l}</button>)}
        </div>
        <div style={{display:'flex',gap:'12px',alignItems:'center',marginBottom:'20px'}}>
          <input type="number" value={v1} onChange={e=>setV1(+e.target.value)} style={{flex:1,padding:'12px',fontSize:'16px',fontWeight:'800',background:'#0f172a',border:'2px solid #334155',borderRadius:'10px',color:'#fff',textAlign:'center',outline:'none'}}/>
          <span style={{fontSize:'16px',fontWeight:'900',color:'#64748b'}}>TO</span>
          <input type="number" value={v2} onChange={e=>setV2(+e.target.value)} style={{flex:1,padding:'12px',fontSize:'16px',fontWeight:'800',background:'#0f172a',border:'2px solid #334155',borderRadius:'10px',color:'#fff',textAlign:'center',outline:'none'}}/>
        </div>
        <div style={{background:'linear-gradient(135deg,#10b981,#059669)',padding:'24px',borderRadius:'16px',textAlign:'center'}}>
          <div style={{fontSize:'12px',fontWeight:'700',opacity:0.8,marginBottom:'8px'}}>RESULT</div>
          <div style={{fontSize:'40px',fontWeight:'900',letterSpacing:'-1px'}}>{isFinite(res)?res.toFixed(2):'0.00'}{mode>0?'%':''}</div>
        </div>
      </div>
    );
  };` },
  { id: 'stopwatch_master', cat: 'prod', name: 'Stopwatch with Laps', nameFr: 'Chronomètre Laps', icon: '⏱️', tags: ['Utility', 'Timer'], code: `const App = () => {
    const [time, setTime] = React.useState(0);
    const [run, setRun] = React.useState(false);
    const [laps, setLaps] = React.useState([]);
    React.useEffect(()=>{
      if(!run) return;
      const i=setInterval(()=>setTime(t=>t+10), 10);
      return ()=>clearInterval(i);
    },[run]);
    const fmt = ms => {
      const mn=Math.floor(ms/60000).toString().padStart(2,'0');
      const s=Math.floor((ms%60000)/1000).toString().padStart(2,'0');
      const c=Math.floor((ms%1000)/10).toString().padStart(2,'0');
      return mn+":"+s+"."+c;
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'28px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <div style={{fontSize:'56px',fontWeight:'900',color:'#0f172a',fontVariantNumeric:'tabular-nums',marginBottom:'24px',letterSpacing:'-1px'}}>{fmt(time)}</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'24px'}}>
          <button onClick={()=>{if(!run){setTime(0);setLaps([]);}else{setLaps([time,...laps]);}}} style={{width:'80px',height:'80px',borderRadius:'40px',border:'none',background:'#f1f5f9',color:'#475569',fontSize:'13px',fontWeight:'800',cursor:'pointer'}}>{run?'Lap':'Reset'}</button>
          <button onClick={()=>setRun(!run)} style={{width:'80px',height:'80px',borderRadius:'40px',border:'none',background:run?'#fee2e2':'#d1fae5',color:run?'#dc2626':'#059669',fontSize:'13px',fontWeight:'800',cursor:'pointer'}}>{run?'Stop':'Start'}</button>
        </div>
        <div style={{maxHeight:'150px',overflowY:'auto',textAlign:'left',borderTop:'1px solid #e2e8f0',paddingTop:'12px'}}>
          {laps.map((l,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f1f5f9',fontSize:'14px',color:'#475569',fontVariantNumeric:'tabular-nums'}}>
              <span style={{fontWeight:'600'}}>Lap {laps.length-i}</span>
              <span style={{fontWeight:'800',color:'#0f172a'}}>{fmt(l)}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'todo_priority', cat: 'prod', name: 'Priority Task Matrix', nameFr: 'Matrice Eisenhower', icon: '🔳', tags: ['Management', 'Productivity'], code: `const App = () => {
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'24px',maxWidth:'400px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🔳 Eisenhower Matrix</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
          <div style={{background:'rgba(239,68,68,0.1)',border:'1px solid #ef4444',borderRadius:'12px',padding:'12px',minHeight:'120px'}}>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#fca5a5',marginBottom:'8px'}}>URGENT & IMPORTANT</div>
            <div style={{background:'#1e293b',padding:'8px',borderRadius:'6px',fontSize:'12px',marginBottom:'4px'}}>Fix server crash</div>
          </div>
          <div style={{background:'rgba(59,130,246,0.1)',border:'1px solid #3b82f6',borderRadius:'12px',padding:'12px',minHeight:'120px'}}>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#93c5fd',marginBottom:'8px'}}>NOT URGENT & IMP</div>
            <div style={{background:'#1e293b',padding:'8px',borderRadius:'6px',fontSize:'12px',marginBottom:'4px'}}>Workout</div>
            <div style={{background:'#1e293b',padding:'8px',borderRadius:'6px',fontSize:'12px',marginBottom:'4px'}}>Plan Q4</div>
          </div>
          <div style={{background:'rgba(245,158,11,0.1)',border:'1px solid #f59e0b',borderRadius:'12px',padding:'12px',minHeight:'120px'}}>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#fcd34d',marginBottom:'8px'}}>URGENT & NOT IMP</div>
            <div style={{background:'#1e293b',padding:'8px',borderRadius:'6px',fontSize:'12px',marginBottom:'4px'}}>Reply emails</div>
          </div>
          <div style={{background:'rgba(100,116,139,0.1)',border:'1px solid #64748b',borderRadius:'12px',padding:'12px',minHeight:'120px'}}>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#cbd5e1',marginBottom:'8px'}}>NOT URGENT & NOT IMP</div>
            <div style={{background:'#1e293b',padding:'8px',borderRadius:'6px',fontSize:'12px',marginBottom:'4px'}}>Scroll social</div>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'habit_weekly_pro', cat: 'prod', name: 'Weekly Habit Grid', nameFr: 'Grille Hebdomadaire', icon: '📅', tags: ['Productivity', 'Progress'], code: `const App = () => {
    const days = ['M','T','W','T','F','S','S'];
    const [hx, setHx] = React.useState({
      'Read': [true,true,false,true,false,false,false],
      'Gym': [true,false,true,false,true,false,false],
      'Meditate': [true,true,true,true,true,true,false]
    });
    const tog = (h, i) => {
      const n = {...hx};
      n[h][i] = !n[h][i];
      setHx(n);
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📅 Weekly Habit Grid</h3>
        <div style={{display:'flex',justifyContent:'flex-end',gap:'8px',marginBottom:'12px'}}>
          {days.map((d,i)=><div key={i} style={{width:'24px',textAlign:'center',fontSize:'11px',fontWeight:'800',color:'#94a3b8'}}>{d}</div>)}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {Object.keys(hx).map(h=>(
            <div key={h} style={{display:'flex',alignItems:'center'}}>
              <div style={{flex:1,fontSize:'14px',fontWeight:'700',color:'#0f172a'}}>{h}</div>
              <div style={{display:'flex',gap:'8px'}}>
                {hx[h].map((d,i)=>(
                  <div key={i} onClick={()=>tog(h,i)} style={{width:'24px',height:'24px',borderRadius:'6px',background:d?'#10b981':'#f1f5f9',cursor:'pointer',border:d?'none':'1px solid #e2e8f0',transition:'background 0.2s'}}/>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };` }
];
export default PRO_PROD;
