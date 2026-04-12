const PRO_HEALTH = [
  { id: 'calorie_dash', cat: 'health', name: 'Calorie Intake Dash', nameFr: 'Journal Calories', icon: '🍎', tags: ['Health', 'Data'], code: `const App = () => {
    const [cals, setCals] = React.useState(1450);
    const goal = 2000;
    const pct = Math.min(100, Math.round((cals/goal)*100));
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🍎 Calorie Dashboard</h3>
        <div style={{position:'relative',width:'160px',height:'160px',margin:'0 auto 24px'}}>
          <svg width="160" height="160" style={{transform:'rotate(-90deg)'}}>
            <circle cx="80" cy="80" r="70" fill="none" stroke="#f1f5f9" strokeWidth="14"/>
            <circle cx="80" cy="80" r="70" fill="none" stroke={pct>100?'#ef4444':'#10b981'} strokeWidth="14" strokeDasharray={440} strokeDashoffset={440-(pct/100)*440} strokeLinecap="round" style={{transition:'stroke-dashoffset 1s ease-out'}}/>
          </svg>
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div style={{fontSize:'32px',fontWeight:'900',color:'#0f172a',letterSpacing:'-1px'}}>{cals}</div>
            <div style={{fontSize:'11px',color:'#64748b',fontWeight:'700'}}>/ {goal} kcal</div>
          </div>
        </div>
        <div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
          {[100, 250, 500].map(v=>(
            <button key={v} onClick={()=>setCals(c=>c+v)} style={{padding:'8px 12px',background:'#f1f5f9',border:'none',borderRadius:'8px',fontWeight:'800',color:'#475569',cursor:'pointer'}}>+{v}</button>
          ))}
          <button onClick={()=>setCals(0)} style={{padding:'8px 12px',background:'#fee2e2',border:'none',borderRadius:'8px',fontWeight:'800',color:'#ef4444',cursor:'pointer'}}>Reset</button>
        </div>
      </div>
    );
  };` },
  { id: 'workout_pro', cat: 'health', name: 'HIIT Workout Assistant', nameFr: 'Entraîneur HIIT', icon: '💪', tags: ['Fitness', 'Timer'], code: `const App = () => {
    const [timeLeft, setTimeLeft] = React.useState(45);
    const [run, setRun] = React.useState(false);
    const [mode, setMode] = React.useState('WORK');
    const [rnd, setRnd] = React.useState(1);
    React.useEffect(()=>{
      if(!run) return;
      const i=setInterval(()=>{
        setTimeLeft(t=>{
          if(t<=1){
            if(mode==='WORK'){setMode('REST'); return 15;}
            else{setMode('WORK'); setRnd(r=>r+1); return 45;}
          }
          return t-1;
        });
      }, 1000);
      return ()=>clearInterval(i);
    },[run, mode]);
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'32px',borderRadius:'24px',maxWidth:'300px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <div style={{fontSize:'12px',letterSpacing:'2px',fontWeight:'700',color:'#94a3b8',marginBottom:'20px'}}>ROUND {rnd}/5</div>
        <div style={{fontSize:'40px',fontWeight:'900',color:mode==='WORK'?'#ef4444':'#10b981',letterSpacing:'1px',marginBottom:'8px'}}>{mode}</div>
        <div style={{fontSize:'72px',fontWeight:'900',lineHeight:1,fontVariantNumeric:'tabular-nums',marginBottom:'32px'}}>{timeLeft}</div>
        <button onClick={()=>setRun(!run)} style={{width:'100%',padding:'16px',background:mode==='WORK'?'#ef4444':'#10b981',color:'#fff',border:'none',borderRadius:'16px',fontSize:'16px',fontWeight:'900',cursor:'pointer'}}>{run?'PAUSE':'START'}</button>
      </div>
    );
  };` },
  { id: 'bmi_pro', cat: 'health', name: 'Full BMI Analysis', nameFr: 'Analyse IMC', icon: '⚖️', tags: ['Health', 'Calc'], code: `const App = () => {
    const [w, setW] = React.useState(70);
    const [h, setH] = React.useState(175);
    const bmi = (w / Math.pow(h/100, 2)).toFixed(1);
    let st = 'Normal'; let c = '#10b981';
    if(bmi<18.5){st='Underweight';c='#3b82f6';}
    else if(bmi>=25&&bmi<30){st='Overweight';c='#f59e0b';}
    else if(bmi>=30){st='Obese';c='#ef4444';}
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>⚖️ BMI Analyzer</h3>
        <div style={{display:'flex',gap:'12px',marginBottom:'20px'}}>
          <label style={{flex:1,fontSize:'12px',fontWeight:'700',color:'#64748b'}}>Weight (kg)<input type="number" value={w} onChange={e=>setW(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',border:'2px solid #e2e8f0',borderRadius:'8px',fontWeight:'800',outline:'none'}}/></label>
          <label style={{flex:1,fontSize:'12px',fontWeight:'700',color:'#64748b'}}>Height (cm)<input type="number" value={h} onChange={e=>setH(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',border:'2px solid #e2e8f0',borderRadius:'8px',fontWeight:'800',outline:'none'}}/></label>
        </div>
        <div style={{background:c,padding:'24px',borderRadius:'16px',color:'#fff',textAlign:'center',transition:'background 0.3s'}}>
          <div style={{fontSize:'12px',fontWeight:'700',opacity:0.9,marginBottom:'4px',letterSpacing:'1px'}}>YOUR BMI</div>
          <div style={{fontSize:'48px',fontWeight:'900',letterSpacing:'-1px',lineHeight:1}}>{bmi}</div>
          <div style={{fontSize:'16px',fontWeight:'800',marginTop:'8px'}}>{st}</div>
        </div>
      </div>
    );
  };` },
  { id: 'mood_pro', cat: 'health', name: 'Mood & Energy Tracker', nameFr: 'Suivi de l\'Humeur', icon: '🌈', tags: ['Health', 'Mindfulness'], code: `const App = () => {
    const moods = [{i:'😫',l:'Awful',c:'#ef4444'},{i:'😕',l:'Bad',c:'#f59e0b'},{i:'😐',l:'Okay',c:'#64748b'},{i:'🙂',l:'Good',c:'#3b82f6'},{i:'🤩',l:'Great',c:'#10b981'}];
    const [sel, setSel] = React.useState(3);
    const [en, setEn] = React.useState(70);
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>🌈 Daily Check-In</h3>
        <div style={{fontSize:'12px',fontWeight:'700',color:'#94a3b8',marginBottom:'12px'}}>HOW ARE YOU FEELING?</div>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'32px'}}>
          {moods.map((m,i)=>(
            <div key={i} onClick={()=>setSel(i)} style={{cursor:'pointer',filter:sel===i?'none':'grayscale(1) opacity(0.5)',transform:sel===i?'scale(1.2)':'scale(1)',transition:'all 0.2s'}}>
              <div style={{fontSize:'32px'}}>{m.i}</div>
              {sel===i && <div style={{fontSize:'10px',fontWeight:'800',color:m.c,marginTop:'4px'}}>{m.l}</div>}
            </div>
          ))}
        </div>
        <div style={{fontSize:'12px',fontWeight:'700',color:'#94a3b8',marginBottom:'12px'}}>ENERGY LEVEL: {en}%</div>
        <input type="range" min="0" max="100" value={en} onChange={e=>setEn(+e.target.value)} style={{width:'100%',accentColor:moods[sel].c}}/>
        <button style={{width:'100%',padding:'14px',background:moods[sel].c,border:'none',borderRadius:'12px',color:'#fff',fontWeight:'900',marginTop:'24px',cursor:'pointer'}}>SAVE ENTRY</button>
      </div>
    );
  };` },
  { id: 'water_pro', cat: 'health', name: 'Daily Hydration Goal', nameFr: 'Suivi Hydratation', icon: '💧', tags: ['Health', 'Progress'], code: `const App = () => {
    const [w, setW] = React.useState(3);
    const goal = 8;
    return (
      <div style={{fontFamily:'system-ui',background:'linear-gradient(135deg,#0ea5e9,#2563eb)',padding:'32px',borderRadius:'24px',maxWidth:'300px',margin:'0 auto',color:'#fff',textAlign:'center',boxShadow:'0 10px 40px rgba(14,165,233,0.3)'}}>
        <div style={{fontSize:'48px',marginBottom:'16px'}}>💧</div>
        <h3 style={{margin:'0 0 8px',fontSize:'20px',fontWeight:'900'}}>Hydration</h3>
        <div style={{fontSize:'13px',fontWeight:'700',opacity:0.9,marginBottom:'24px'}}>{Math.round((w/goal)*100)}% of daily goal</div>
        <div style={{display:'flex',gap:'4px',justifyContent:'center',flexWrap:'wrap',marginBottom:'32px'}}>
          {Array.from({length:goal}).map((_,i)=>(
            <div key={i} style={{width:'24px',height:'32px',background:i<w?'#fff':'rgba(255,255,255,0.2)',borderRadius:'4px 4px 12px 12px',transition:'background 0.3s'}}/>
          ))}
        </div>
        <button onClick={()=>setW(Math.min(goal, w+1))} disabled={w>=goal} style={{padding:'14px 32px',borderRadius:'100px',border:'none',background:'#fff',color:'#0ea5e9',fontWeight:'900',fontSize:'16px',cursor:w>=goal?'default':'pointer',boxShadow:'0 4px 14px rgba(0,0,0,0.1)'}}>{w>=goal?'HOORAY! 🎉':'+ ADD A GLASS'}</button>
      </div>
    );
  };` },
  { id: 'step_pro', cat: 'health', name: 'Activity Step Converter', nameFr: 'Compteur de Pas', icon: '👟', tags: ['Health', 'Utility'], code: `const App = () => {
    const [steps, setSteps] = React.useState(8500);
    const km = (steps * 0.000762).toFixed(2);
    const cals = (steps * 0.04).toFixed(0);
    const mi = (km * 0.621371).toFixed(2);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>👟 Step Converter</h3>
        <input type="range" min="0" max="25000" step="100" value={steps} onChange={e=>setSteps(+e.target.value)} style={{width:'100%',accentColor:'#10b981',marginBottom:'20px'}}/>
        <div style={{textAlign:'center',marginBottom:'24px'}}>
          <div style={{fontSize:'48px',fontWeight:'900',color:'#10b981',letterSpacing:'-2px',lineHeight:1}}>{steps.toLocaleString()}</div>
          <div style={{fontSize:'12px',fontWeight:'800',color:'#64748b'}}>TOTAL STEPS</div>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <div style={{flex:1,background:'#f8fafc',padding:'16px',borderRadius:'16px',textAlign:'center'}}>
            <div style={{fontSize:'24px',fontWeight:'900',color:'#0f172a'}}>{km}</div>
            <div style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>KILOMETERS</div>
            <div style={{fontSize:'10px',color:'#94a3b8',marginTop:'4px'}}>{mi} Miles</div>
          </div>
          <div style={{flex:1,background:'#f8fafc',padding:'16px',borderRadius:'16px',textAlign:'center'}}>
            <div style={{fontSize:'24px',fontWeight:'900',color:'#ef4444'}}>{cals}</div>
            <div style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>CALORIES</div>
            <div style={{fontSize:'10px',color:'#94a3b8',marginTop:'4px'}}>Burned 🔥</div>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'bmr_pro', cat: 'health', name: 'BMR Health Estimator', nameFr: 'Estimateur BMR', icon: '🔥', tags: ['Health', 'Calc'], code: `const App = () => {
    const [age, setAge] = React.useState(30);
    const [w, setW] = React.useState(75);
    const [h, setH] = React.useState(180);
    const [gender, setGender] = React.useState('m');
    const bmr = gender==='m' ? (10*w) + (6.25*h) - (5*age) + 5 : (10*w) + (6.25*h) - (5*age) - 161;
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🔥 BMR Estimator</h3>
        <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
          <button onClick={()=>setGender('m')} style={{flex:1,padding:'10px',background:gender==='m'?'#6366f1':'#1e293b',border:'none',borderRadius:'8px',color:'#fff',fontWeight:'800',cursor:'pointer'}}>Male</button>
          <button onClick={()=>setGender('f')} style={{flex:1,padding:'10px',background:gender==='f'?'#ec4899':'#1e293b',border:'none',borderRadius:'8px',color:'#fff',fontWeight:'800',cursor:'pointer'}}>Female</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#94a3b8'}}>Age<input type="number" value={age} onChange={e=>setAge(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',outline:'none'}}/></label>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#94a3b8'}}>Height (cm)<input type="number" value={h} onChange={e=>setH(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',outline:'none'}}/></label>
          <label style={{gridColumn:'span 2',fontSize:'12px',fontWeight:'700',color:'#94a3b8'}}>Weight (kg)<input type="number" value={w} onChange={e=>setW(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',outline:'none'}}/></label>
        </div>
        <div style={{background:'rgba(255,255,255,0.05)',padding:'20px',borderRadius:'16px',textAlign:'center'}}>
          <div style={{fontSize:'12px',fontWeight:'700',color:'#94a3b8',marginBottom:'4px'}}>BASAL METABOLIC RATE</div>
          <div style={{fontSize:'42px',fontWeight:'900',color:gender==='m'?'#a5b4fc':'#fbcfe8'}}>{Math.round(bmr)}</div>
          <div style={{fontSize:'13px',fontWeight:'800'}}>kcal / day</div>
        </div>
      </div>
    );
  };` },
  { id: 'bmi_chart_pro', cat: 'health', name: 'BMI Reference Chart', nameFr: 'Tableau IMC', icon: '📊', tags: ['Health', 'Manual'], code: `const App = () => {
    const d = [{r:'< 18.5',l:'Underweight',c:'#3b82f6'},{r:'18.5 - 24.9',l:'Normal weight',c:'#10b981'},{r:'25.0 - 29.9',l:'Overweight',c:'#f59e0b'},{r:'30.0 - 34.9',l:'Obesity Class I',c:'#ef4444'},{r:'35.0 - 39.9',l:'Obesity Class II',c:'#b91c1c'},{r:'> 40.0',l:'Obesity Class III',c:'#7f1d1d'}];
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📊 BMI Reference Guide</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
          {d.map(x=>(
            <div key={x.l} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'#f8fafc',padding:'12px 16px',borderRadius:'12px',borderLeft:'4px solid '+x.c}}>
              <span style={{fontSize:'14px',fontWeight:'700',color:'#0f172a'}}>{x.l}</span>
              <span style={{fontSize:'14px',fontWeight:'800',color:x.c}}>{x.r}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'ideal_weight_pro', cat: 'health', name: 'Ideal Weight Calc', nameFr: 'Poids Idéal', icon: '⚖️', tags: ['Health', 'Calc'], code: `const App = () => {
    const [h, setH] = React.useState(175);
    const [g, setG] = React.useState('m');
    const inch = h / 2.54;
    const iw = g==='m' ? 50 + 2.3 * (inch - 60) : 45.5 + 2.3 * (inch - 60);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>⚖️ Ideal Weight</h3>
        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          <button onClick={()=>setG('m')} style={{flex:1,padding:'10px',background:g==='m'?'#3b82f6':'#f1f5f9',color:g==='m'?'#fff':'#64748b',border:'none',borderRadius:'8px',fontWeight:'800'}}>Male</button>
          <button onClick={()=>setG('f')} style={{flex:1,padding:'10px',background:g==='f'?'#ec4899':'#f1f5f9',color:g==='f'?'#fff':'#64748b',border:'none',borderRadius:'8px',fontWeight:'800'}}>Female</button>
        </div>
        <div style={{marginBottom:'24px',textAlign:'left'}}>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#64748b'}}>Height (cm) - {h}</label>
          <input type="range" min="140" max="220" value={h} onChange={e=>setH(+e.target.value)} style={{width:'100%',accentColor:g==='m'?'#3b82f6':'#ec4899',marginTop:'8px'}}/>
        </div>
        <div style={{background:'#f8fafc',padding:'24px',borderRadius:'16px',border:'2px solid #e2e8f0'}}>
          <div style={{fontSize:'11px',fontWeight:'800',color:'#64748b',letterSpacing:'1px',marginBottom:'4px'}}>TARGET (DEVIne Formula)</div>
          <div style={{fontSize:'48px',fontWeight:'900',color:g==='m'?'#3b82f6':'#ec4899',letterSpacing:'-1px'}}>{Math.round(iw)} <span style={{fontSize:'20px'}}>kg</span></div>
        </div>
      </div>
    );
  };` },
  { id: 'med_reminder', cat: 'health', name: 'Medication Reminder', nameFr: 'Rappel Médicaments', icon: '💊', tags: ['Health', 'Utility'], code: `const App = () => {
    const meds = [{n:'Vitamin D',t:'08:00',d:true},{n:'Omega 3',t:'13:00',d:false},{n:'Magnesium',t:'21:00',d:false}];
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>💊 Med Schedule</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {meds.map((m,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:m.d?'rgba(16,185,129,0.1)':'rgba(255,255,255,0.05)',padding:'16px',borderRadius:'16px',border:m.d?'1px solid #10b981':'1px solid #334155'}}>
              <div style={{display:'flex',alignItems:'center',gap:'16px'}}>
                <div style={{fontSize:'18px',fontWeight:'900',color:m.d?'#10b981':'#a5b4fc'}}>{m.t}</div>
                <div style={{fontSize:'15px',fontWeight:'700',color:m.d?'#a7f3d0':'#fff'}}>{m.n}</div>
              </div>
              <div style={{width:'24px',height:'24px',borderRadius:'12px',border:m.d?'none':'2px solid #64748b',background:m.d?'#10b981':'transparent',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'12px',fontWeight:'bold'}}>{m.d?'✓':''}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };` }
];
export default PRO_HEALTH;
