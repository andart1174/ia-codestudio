const PRO_BIZ = [
  { id: 'crm_pro', cat: 'biz', name: 'CRM Pipeline Master', nameFr: 'Master Pipeline CRM', icon: '📈', tags: ['Business', 'Dashboard'], code: `const App = () => {
    const [stages, setStages] = React.useState([
      {id: 'lead', title: 'Leads', items: [{id: 1, name: 'Acme Corp', val: 12500}, {id: 2, name: 'Globex', val: 8000}]},
      {id: 'contact', title: 'Contacted', items: [{id: 3, name: 'Initech', val: 4500}]},
      {id: 'close', title: 'Closed', items: [{id: 4, name: 'Stark Ind', val: 25000}]}
    ]);
    const move = (stId, itemId, dir) => {
      const sIdx = stages.findIndex(s => s.id === stId);
      if ((dir === -1 && sIdx === 0) || (dir === 1 && sIdx === stages.length - 1)) return;
      setStages(prev => {
        const copy = JSON.parse(JSON.stringify(prev));
        const itemIdx = copy[sIdx].items.findIndex(i => i.id === itemId);
        const item = copy[sIdx].items.splice(itemIdx, 1)[0];
        copy[sIdx + dir].items.push(item);
        return copy;
      });
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'20px',color:'#fff',maxWidth:'500px',margin:'0 auto'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>📈 CRM Pipeline</h3>
        <div style={{display:'flex',gap:'12px',overflowX:'auto',paddingBottom:'8px'}}>
          {stages.map((st, i) => (
            <div key={st.id} style={{flex:'1',background:'rgba(255,255,255,0.05)',borderRadius:'12px',padding:'12px',minWidth:'140px'}}>
              <div style={{fontSize:'12px',color:'#94a3b8',fontWeight:'700',marginBottom:'12px',textTransform:'uppercase'}}>{st.title} ({st.items.length})</div>
              {st.items.map(item => (
                <div key={item.id} style={{background:'#1e293b',padding:'10px',borderRadius:'8px',marginBottom:'8px',borderLeft:'3px solid #6366f1'}}>
                  <div style={{fontSize:'13px',fontWeight:'700',marginBottom:'4px'}}>{item.name}</div>
                  <div style={{fontSize:'12px',color:'#10b981',fontWeight:'800',marginBottom:'8px'}}>\${item.val.toLocaleString()}</div>
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <button disabled={i===0} onClick={()=>move(st.id,item.id,-1)} style={{background:'none',border:'none',color:i===0?'#334':'#64748b',cursor:i===0?'default':'pointer'}}>←</button>
                    <button disabled={i===stages.length-1} onClick={()=>move(st.id,item.id,1)} style={{background:'none',border:'none',color:i===stages.length-1?'#334':'#6366f1',cursor:i===stages.length-1?'default':'pointer'}}>→</button>
                  </div>
                </div>
              ))}
              <div style={{fontSize:'11px',textAlign:'right',color:'#64748b',marginTop:'8px',fontWeight:'700'}}>Total: \${st.items.reduce((s,x)=>s+x.val,0).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'invoice_pro', cat: 'biz', name: 'Invoice Generator PRO', nameFr: 'Générateur de Factures', icon: '🧾', tags: ['Business', 'Utility'], code: `const App = () => {
    const [items, setItems] = React.useState([{id:1, desc:'Web Consulting', hrs:10, rate:120}]);
    const [tax, setTax] = React.useState(20);
    const add = () => setItems([...items, {id:Date.now(), desc:'New Item', hrs:1, rate:50}]);
    const upd = (id, f, v) => setItems(items.map(x=> x.id===id ? {...x, [f]: v} : x));
    const sub = items.reduce((s,x)=>s+(x.hrs*x.rate),0);
    const taxAmt = sub*(tax/100);
    const total = sub+taxAmt;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'16px',color:'#0f172a',maxWidth:'400px',margin:'0 auto',boxShadow:'0 4px 20px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',borderBottom:'2px solid #e2e8f0',paddingBottom:'16px',marginBottom:'16px'}}>
          <div><h2 style={{margin:0,fontSize:'24px',fontWeight:'900'}}>INVOICE</h2><div style={{fontSize:'12px',color:'#64748b'}}>#INV-{Math.floor(Date.now()%10000)}</div></div>
          <div style={{textAlign:'right',fontSize:'12px',color:'#64748b'}}>Date: {new Date().toLocaleDateString()}</div>
        </div>
        {items.map((it,i) => (
          <div key={it.id} style={{display:'flex',gap:'8px',marginBottom:'8px'}}>
            <input value={it.desc} onChange={e=>upd(it.id,'desc',e.target.value)} style={{flex:2,padding:'8px',border:'1px solid #e2e8f0',borderRadius:'6px',fontSize:'12px'}}/>
            <input type="number" value={it.hrs} onChange={e=>upd(it.id,'hrs',+e.target.value)} style={{flex:1,padding:'8px',border:'1px solid #e2e8f0',borderRadius:'6px',fontSize:'12px'}}/>
            <input type="number" value={it.rate} onChange={e=>upd(it.id,'rate',+e.target.value)} style={{flex:1,padding:'8px',border:'1px solid #e2e8f0',borderRadius:'6px',fontSize:'12px'}}/>
            <div style={{flex:1,padding:'8px',textAlign:'right',fontSize:'12px',fontWeight:'700'}}>\${it.hrs*it.rate}</div>
          </div>
        ))}
        <button onClick={add} style={{fontSize:'12px',color:'#6366f1',background:'none',border:'none',cursor:'pointer',padding:'8px 0',fontWeight:'bold'}}>+ Add Item</button>
        <div style={{marginTop:'16px',borderTop:'1px solid #e2e8f0',paddingTop:'16px',display:'grid',gridTemplateColumns:'1fr 100px',gap:'8px',fontSize:'13px',fontWeight:'600'}}>
          <div style={{textAlign:'right',color:'#64748b'}}>Subtotal:</div><div style={{textAlign:'right'}}>\${sub.toFixed(2)}</div>
          <div style={{textAlign:'right',color:'#64748b',display:'flex',alignItems:'center',justifyContent:'flex-end',gap:'8px'}}>Tax <input type="number" value={tax} onChange={e=>setTax(+e.target.value)} style={{width:'40px',padding:'2px',textAlign:'center',border:'1px solid #e2e8f0',borderRadius:'4px'}}/>%:</div><div style={{textAlign:'right'}}>\${taxAmt.toFixed(2)}</div>
          <div style={{textAlign:'right',fontSize:'16px',color:'#0f172a',fontWeight:'900',marginTop:'8px'}}>Total:</div><div style={{textAlign:'right',fontSize:'16px',color:'#6366f1',fontWeight:'900',marginTop:'8px'}}>\${total.toFixed(2)}</div>
        </div>
      </div>
    );
  };` },
  { id: 'inventory_pro', cat: 'biz', name: 'Stock Control System', nameFr: 'Contrôle des Stocks', icon: '📦', tags: ['Business', 'Data'], code: `const App = () => {
    const [items, setItems] = React.useState([
      {id:1, name:'Laptop Pro', stock:5, min:10},
      {id:2, name:'Wireless Mouse', stock:42, min:20},
      {id:3, name:'USB-C Hub', stock:8, min:15}
    ]);
    const upd = (id, d) => setItems(items.map(x=>x.id===id?{...x,stock:Math.max(0,x.stock+d)}:x));
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'20px',color:'#f8fafc',maxWidth:'360px',margin:'0 auto'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>📦 Stock Control</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
          {items.map(it => (
            <div key={it.id} style={{background:'#1e293b',padding:'12px',borderRadius:'12px',display:'flex',justifyContent:'space-between',alignItems:'center',borderLeft:it.stock<it.min?'4px solid #ef4444':'4px solid #10b981'}}>
              <div>
                <div style={{fontSize:'14px',fontWeight:'700',marginBottom:'4px'}}>{it.name}</div>
                <div style={{fontSize:'11px',color:it.stock<it.min?'#ef4444':'#64748b',fontWeight:'600'}}>{it.stock<it.min?'⚠️ Low Stock (Min: '+it.min+')':'Status: Healthy'}</div>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <button onClick={()=>upd(it.id,-1)} style={{width:'28px',height:'28px',borderRadius:'6px',border:'none',background:'rgba(255,255,255,0.1)',color:'#fff',cursor:'pointer',fontWeight:'bold'}}>-</button>
                <div style={{fontSize:'16px',fontWeight:'900',width:'24px',textAlign:'center'}}>{it.stock}</div>
                <button onClick={()=>upd(it.id,1)} style={{width:'28px',height:'28px',borderRadius:'6px',border:'none',background:'rgba(255,255,255,0.1)',color:'#fff',cursor:'pointer',fontWeight:'bold'}}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'roi_master', cat: 'biz', name: 'Investment ROI Calc', nameFr: 'Calculateur ROI', icon: '💰', tags: ['Financial', 'Calc'], code: `const App = () => {
    const [inv, setInv] = React.useState(10000);
    const [ret, setRet] = React.useState(14500);
    const [yrs, setYrs] = React.useState(3);
    const profit = ret - inv;
    const roi = (profit / inv) * 100;
    const ann = (Math.pow(ret / inv, 1 / yrs) - 1) * 100;
    const sl = (lbl,v,st,min,max)=>(<div style={{marginBottom:'12px'}}><div style={{display:'flex',justifyContent:'space-between',fontSize:'12px',fontWeight:'700',color:'#64748b',marginBottom:'4px'}}><span>{lbl}</span><span style={{color:'#0f172a'}}>{v}</span></div><input type="range" min={min} max={max} value={v} onChange={e=>st(+e.target.value)} style={{width:'100%',accentColor:'#6366f1'}}/></div>);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'20px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 30px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>💰 ROI Calculator</h3>
        {sl('Investment (\$)',inv,setInv,1000,100000)}
        {sl('Final Return (\$)',ret,setRet,1000,150000)}
        {sl('Duration (Years)',yrs,setYrs,1,20)}
        <div style={{marginTop:'20px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',padding:'20px',borderRadius:'16px',color:'#fff'}}>
          <div style={{textAlign:'center',marginBottom:'16px'}}>
            <div style={{fontSize:'12px',opacity:0.8,fontWeight:'600'}}>Total ROI</div>
            <div style={{fontSize:'36px',fontWeight:'900'}}>{roi.toFixed(1)}%</div>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',fontWeight:'600',background:'rgba(255,255,255,0.1)',padding:'12px',borderRadius:'10px'}}>
            <div>Net Profit:<br/>\${profit.toLocaleString()}</div>
            <div style={{textAlign:'right'}}>Annualized:<br/>{ann.toFixed(2)}%</div>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'meeting_cost', cat: 'biz', name: 'Meeting Cost Live', nameFr: 'Coût Réunion Direct', icon: '⏳', tags: ['Business', 'Utility'], code: `const App = () => {
    const [run, setRun] = React.useState(false);
    const [sec, setSec] = React.useState(0);
    const [ppl, setPpl] = React.useState(5);
    const [rate, setRate] = React.useState(50);
    React.useEffect(()=>{
      if(!run) return;
      const i = setInterval(()=>setSec(s=>s+1), 1000);
      return ()=>clearInterval(i);
    },[run]);
    const cost = (sec / 3600) * ppl * rate;
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px 24px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <div style={{fontSize:'48px',marginBottom:'8px'}}>💸</div>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'800'}}>Live Meeting Cost</h3>
        <div style={{fontSize:'56px',fontWeight:'900',color:'#ef4444',letterSpacing:'-2px',fontVariantNumeric:'tabular-nums'}}>\${cost.toFixed(2)}</div>
        <div style={{fontSize:'14px',color:'#94a3b8',marginBottom:'24px',fontVariantNumeric:'tabular-nums'}}>Time: {Math.floor(sec/60).toString().padStart(2,'0')}:{(sec%60).toString().padStart(2,'0')}</div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'24px'}}>
          <button onClick={()=>setRun(!run)} style={{padding:'12px 24px',borderRadius:'12px',border:'none',background:run?'#334155':'#10b981',color:'#fff',fontWeight:'800',fontSize:'16px',cursor:'pointer'}}>{run?'⏸ Pause':'▶ Start'}</button>
          <button onClick={()=>{setRun(false);setSec(0);}} style={{padding:'12px 16px',borderRadius:'12px',border:'none',background:'rgba(255,255,255,0.1)',color:'#fff',fontWeight:'700',cursor:'pointer'}}>Reset</button>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',textAlign:'left'}}>
          <label style={{fontSize:'11px',color:'#94a3b8',fontWeight:'700'}}>Attendees<br/><input type="number" value={ppl} onChange={e=>setPpl(+e.target.value)} style={{width:'100%',marginTop:'4px',padding:'8px',background:'rgba(255,255,255,0.05)',border:'1px solid #334155',borderRadius:'8px',color:'#fff'}}/></label>
          <label style={{fontSize:'11px',color:'#94a3b8',fontWeight:'700'}}>Avg \$/Hour<br/><input type="number" value={rate} onChange={e=>setRate(+e.target.value)} style={{width:'100%',marginTop:'4px',padding:'8px',background:'rgba(255,255,255,0.05)',border:'1px solid #334155',borderRadius:'8px',color:'#fff'}}/></label>
        </div>
      </div>
    );
  };` },
  { id: 'okr_dash', cat: 'biz', name: 'Company OKR Dashboard', nameFr: 'Tableau OKR', icon: '🎯', tags: ['Business', 'Management'], code: `const App = () => {
    const [okrs, setOkrs] = React.useState([
      {id:1, obj:'Launch V2 Platform', kr:'Achieve 99.9% Uptime', prog:85, c:'#10b981'},
      {id:2, obj:'Increase Revenue', kr:'Hit \$50k MRR', prog:42, c:'#6366f1'},
      {id:3, obj:'Expand Team', kr:'Hire 3 Senior Eng', prog:66, c:'#f59e0b'}
    ]);
    const upd = (id) => setOkrs(o=>o.map(x=>x.id===id?{...x,prog:Math.min(100,x.prog+5)}:x));
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'20px',maxWidth:'380px',margin:'0 auto',color:'#fff'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900'}}>🎯 Company OKRs</h3>
          <span style={{fontSize:'12px',background:'rgba(255,255,255,0.1)',padding:'4px 8px',borderRadius:'12px',fontWeight:'700'}}>Q3 2026</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {okrs.map(o=>(
            <div key={o.id} style={{background:'#1e293b',padding:'16px',borderRadius:'12px',cursor:'pointer'}} onClick={()=>upd(o.id)}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
                <div>
                  <div style={{fontSize:'14px',fontWeight:'800'}}>{o.obj}</div>
                  <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'2px'}}>{o.kr}</div>
                </div>
                <div style={{fontSize:'16px',fontWeight:'900',color:o.c}}>{o.prog}%</div>
              </div>
              <div style={{background:'rgba(255,255,255,0.05)',height:'8px',borderRadius:'4px',overflow:'hidden'}}>
                <div style={{background:o.c,width:o.prog+'%',height:'100%',borderRadius:'4px',transition:'width 0.3s'}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',fontSize:'11px',color:'#64748b',marginTop:'16px'}}>Click any OKR to update progress (+5%)</div>
      </div>
    );
  };` },
  { id: 'payroll_pro', cat: 'biz', name: 'Payroll Summary', nameFr: 'Résumé de Paie', icon: '💵', tags: ['Business', 'Financial'], code: `const App = () => {
    const [emps, setEmps] = React.useState([
      {name:'Alice J.', hrs:160, rate:45},
      {name:'Bob S.', hrs:145, rate:38},
      {name:'Charlie M.', hrs:80, rate:55}
    ]);
    const gross = emps.reduce((s,e)=>s+(e.hrs*e.rate),0);
    const tax = gross * 0.22;
    const net = gross - tax;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'20px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>💵 Payroll Summary</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'20px'}}>
          {emps.map((e,i)=>(
            <div key={i} style={{background:'#f8fafc',padding:'12px',borderRadius:'10px',border:'1px solid #e2e8f0',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <div style={{fontSize:'14px',fontWeight:'700',color:'#0f172a'}}>{e.name}</div>
                <div style={{fontSize:'11px',color:'#64748b'}}>{e.hrs}h @ \${e.rate}/hr</div>
              </div>
              <div style={{fontSize:'14px',fontWeight:'800',color:'#10b981'}}>\${(e.hrs*e.rate).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div style={{background:'#0f172a',padding:'20px',borderRadius:'16px',color:'#fff'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',marginBottom:'8px',color:'#94a3b8'}}><span>Gross Pay</span><span>\${gross.toLocaleString()}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'13px',marginBottom:'12px',color:'#94a3b8'}}><span>Est. Taxes (22%)</span><span style={{color:'#ef4444'}}>-\${tax.toLocaleString()}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'18px',fontWeight:'900',borderTop:'1px solid #334155',paddingTop:'12px'}}><span>Net Total</span><span style={{color:'#10b981'}}>\${net.toLocaleString()}</span></div>
        </div>
      </div>
    );
  };` },
  { id: 'mortgage_pro', cat: 'biz', name: 'Mortgage Amortization', nameFr: 'Amortissement Prêt', icon: '🏠', tags: ['Financial', 'Calc'], code: `const App = () => {
    const [amt, setAmt] = React.useState(300000);
    const [yrs, setYrs] = React.useState(30);
    const [rate, setRate] = React.useState(6.5);
    const r = rate/100/12;
    const n = yrs*12;
    const pay = r===0 ? amt/n : amt*r/(1-Math.pow(1+r,-n));
    const tot = pay*n;
    const w1 = (amt/tot)*100;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'28px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.1)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🏠 Mortgage Analyzer</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'20px'}}>
          <label style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>Amount (\$)<input type="number" value={amt} onChange={e=>setAmt(+e.target.value)} style={{width:'100%',padding:'8px',marginTop:'4px',border:'2px solid #e2e8f0',borderRadius:'8px',fontWeight:'700',outline:'none',boxSizing:'border-box'}}/></label>
          <label style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>Years<input type="number" value={yrs} onChange={e=>setYrs(+e.target.value)} style={{width:'100%',padding:'8px',marginTop:'4px',border:'2px solid #e2e8f0',borderRadius:'8px',fontWeight:'700',outline:'none',boxSizing:'border-box'}}/></label>
          <label style={{gridColumn:'span 2',fontSize:'11px',fontWeight:'700',color:'#64748b'}}>Rate (%)<input type="range" min={1} max={15} step={0.1} value={rate} onChange={e=>setRate(+e.target.value)} style={{width:'100%',marginTop:'8px',accentColor:'#6366f1'}}/><div style={{textAlign:'right',fontSize:'14px',color:'#0f172a'}}>{rate}%</div></label>
        </div>
        <div style={{textAlign:'center',padding:'24px 0',background:'#f8fafc',borderRadius:'16px',border:'1px solid #e2e8f0'}}>
          <div style={{fontSize:'12px',fontWeight:'700',color:'#64748b',letterSpacing:'1px',marginBottom:'4px'}}>MONTHLY</div>
          <div style={{fontSize:'42px',fontWeight:'900',color:'#6366f1',letterSpacing:'-2px'}}>\${Math.round(pay).toLocaleString()}</div>
          <div style={{display:'flex',height:'12px',borderRadius:'6px',overflow:'hidden',margin:'16px 24px 8px'}}>
            <div style={{width:w1+'%',background:'#10b981'}} title="Principal"/>
            <div style={{width:(100-w1)+'%',background:'#ef4444'}} title="Interest"/>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'0 24px',fontSize:'11px',fontWeight:'600'}}>
            <span style={{color:'#10b981'}}>Principal: \${(amt/1000).toFixed(0)}k</span>
            <span style={{color:'#ef4444'}}>Int: \${((tot-amt)/1000).toFixed(0)}k</span>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'loan_term_pro', cat: 'biz', name: 'Loan Payoff Tracker', nameFr: 'Suivi de Prêt', icon: '🗓️', tags: ['Financial', 'Utility'], code: `const App = () => {
    const [bal, setBal] = React.useState(25000);
    const [pay, setPay] = React.useState(600);
    const rate = 8;
    const r = rate/100/12;
    let m = 0; let c = bal;
    if (pay > c*r) {
      while(c>0 && m<360) { c += c*r - pay; m++; }
    } else { m = Infinity; }
    const yrs = Math.floor(m/12); const mos = m%12;
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'20px',maxWidth:'320px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <div style={{fontSize:'40px',marginBottom:'12px'}}>🗓️</div>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'800'}}>Payoff Tracker</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'12px',textAlign:'left',background:'rgba(255,255,255,0.05)',padding:'16px',borderRadius:'12px',marginBottom:'20px'}}>
          <label style={{fontSize:'12px',color:'#94a3b8',fontWeight:'600'}}>Current Balance (\$)<input type="number" value={bal} onChange={e=>setBal(+e.target.value)} style={{width:'100%',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',boxSizing:'border-box'}}/></label>
          <label style={{fontSize:'12px',color:'#94a3b8',fontWeight:'600'}}>Monthly Payment (\$)<input type="number" value={pay} onChange={e=>setPay(+e.target.value)} style={{width:'100%',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',boxSizing:'border-box'}}/></label>
        </div>
        <div>
          <div style={{fontSize:'12px',color:'#94a3b8',fontWeight:'700',textTransform:'uppercase',letterSpacing:'1px'}}>Debt Free In</div>
          {m === Infinity ? <div style={{fontSize:'20px',color:'#ef4444',fontWeight:'800',marginTop:'8px'}}>Payment too low!</div> :
          <div style={{fontSize:'36px',fontWeight:'900',color:'#10b981',marginTop:'4px'}}>{yrs>0?yrs+'y ':''}{mos}m</div>}
        </div>
      </div>
    );
  };` },
  { id: 'savings_dash', cat: 'biz', name: 'Savings Goal Meter', nameFr: 'Objectif Épargne', icon: '🐷', tags: ['Financial', 'Progress'], code: `const App = () => {
    const [goal, setGoal] = React.useState(20000);
    const [saved, setSaved] = React.useState(8500);
    const pct = Math.min(100, Math.round((saved/goal)*100));
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'28px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🐷 Savings Goal</h3>
          <div style={{background:'#f0fdf4',color:'#166534',padding:'4px 10px',borderRadius:'99px',fontSize:'12px',fontWeight:'800'}}>Active</div>
        </div>
        <div style={{position:'relative',width:'180px',height:'180px',margin:'0 auto 24px'}}>
          <svg width="180" height="180" style={{transform:'rotate(-90deg)'}}>
            <circle cx="90" cy="90" r="80" fill="none" stroke="#f1f5f9" strokeWidth="16"/>
            <circle cx="90" cy="90" r="80" fill="none" stroke="#10b981" strokeWidth="16" strokeDasharray={502} strokeDashoffset={502-(pct/100)*502} strokeLinecap="round" style={{transition:'stroke-dashoffset 1s ease-out'}}/>
          </svg>
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <div style={{fontSize:'42px',fontWeight:'900',color:'#0f172a',letterSpacing:'-2px'}}>{pct}%</div>
            <div style={{fontSize:'12px',color:'#64748b',fontWeight:'700'}}>REACHED</div>
          </div>
        </div>
        <input type="range" min={0} max={goal} value={saved} onChange={e=>setSaved(+e.target.value)} style={{width:'100%',accentColor:'#10b981',marginBottom:'16px'}}/>
        <div style={{display:'flex',justifyContent:'space-between',background:'#f8fafc',padding:'16px',borderRadius:'12px'}}>
          <div><div style={{fontSize:'11px',color:'#64748b',fontWeight:'700'}}>SAVED</div><div style={{fontSize:'16px',fontWeight:'800',color:'#10b981'}}>\${saved.toLocaleString()}</div></div>
          <div style={{textAlign:'right'}}><div style={{fontSize:'11px',color:'#64748b',fontWeight:'700'}}>GOAL</div><div style={{fontSize:'16px',fontWeight:'800',color:'#0f172a'}}>\${goal.toLocaleString()}</div></div>
        </div>
      </div>
    );
  };` },
  { id: 'budget_planner_pro', cat: 'biz', name: 'Budget Planner PRO', nameFr: 'Planificateur Budget', icon: '📊', tags: ['Financial', 'Business'], code: `const App = () => {
    const [inc, setInc] = React.useState(5000);
    const n = inc*0.5; const w = inc*0.3; const s = inc*0.2;
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>📊 50/30/20 Planner</h3>
        <div style={{marginBottom:'24px'}}>
          <label style={{fontSize:'12px',fontWeight:'700',color:'#94a3b8',display:'flex',flexDirection:'column',gap:'8px'}}>Monthly After-Tax Income
            <input type="number" value={inc} onChange={e=>setInc(+e.target.value)} style={{padding:'12px',background:'#1e293b',border:'2px solid #334155',borderRadius:'10px',color:'#fff',fontSize:'20px',fontWeight:'800',outline:'none'}}/>
          </label>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          <div style={{background:'rgba(239,68,68,0.1)',borderLeft:'4px solid #ef4444',padding:'16px',borderRadius:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}><span style={{fontWeight:'800',color:'#fca5a5'}}>Needs (50%)</span><span style={{fontWeight:'900',color:'#fff'}}>\${n.toLocaleString()}</span></div>
            <div style={{fontSize:'11px',color:'#94a3b8'}}>Housing, groceries, bills, transport</div>
          </div>
          <div style={{background:'rgba(245,158,11,0.1)',borderLeft:'4px solid #f59e0b',padding:'16px',borderRadius:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}><span style={{fontWeight:'800',color:'#fcd34d'}}>Wants (30%)</span><span style={{fontWeight:'900',color:'#fff'}}>\${w.toLocaleString()}</span></div>
            <div style={{fontSize:'11px',color:'#94a3b8'}}>Dining, entertainment, shopping</div>
          </div>
          <div style={{background:'rgba(16,185,129,0.1)',borderLeft:'4px solid #10b981',padding:'16px',borderRadius:'10px'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}><span style={{fontWeight:'800',color:'#6ee7b7'}}>Savings (20%)</span><span style={{fontWeight:'900',color:'#fff'}}>\${s.toLocaleString()}</span></div>
            <div style={{fontSize:'11px',color:'#94a3b8'}}>Debt payoff, investments, emergency</div>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'price_splitter_pro', cat: 'biz', name: 'Bill Splitter Master', nameFr: 'Partage de Facture', icon: '🔪', tags: ['Utility', 'Financial'], code: `const App = () => {
    const [amt, setAmt] = React.useState(120);
    const [tip, setTip] = React.useState(15);
    const [ppl, setPpl] = React.useState(3);
    const t = amt * (1 + tip/100);
    const p = t / ppl;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'28px',borderRadius:'24px',maxWidth:'300px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <div style={{fontSize:'40px',marginBottom:'12px'}}>🔪</div>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>Bill Splitter Master</h3>
        <input type="number" value={amt} onChange={e=>setAmt(+e.target.value)} placeholder="Bill \$" style={{width:'100%',boxSizing:'border-box',padding:'14px',fontSize:'24px',fontWeight:'800',textAlign:'center',background:'#f8fafc',border:'2px solid #e2e8f0',borderRadius:'16px',marginBottom:'16px',outline:'none',color:'#0f172a'}}/>
        <div style={{display:'flex',gap:'8px',marginBottom:'16px'}}>
          {[10,15,20].map(pt=><button key={pt} onClick={()=>setTip(pt)} style={{flex:1,padding:'10px',borderRadius:'10px',border:'none',background:tip===pt?'#6366f1':'#f1f5f9',color:tip===pt?'#fff':'#64748b',fontWeight:'800',cursor:'pointer'}}>{pt}%</button>)}
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'16px',marginBottom:'24px'}}>
          <button onClick={()=>setPpl(Math.max(1,ppl-1))} style={{width:'40px',height:'40px',borderRadius:'20px',border:'none',background:'#f1f5f9',fontSize:'20px',fontWeight:'800',cursor:'pointer'}}>-</button>
          <span style={{fontSize:'20px',fontWeight:'900',color:'#0f172a'}}>{ppl} 👤</span>
          <button onClick={()=>setPpl(ppl+1)} style={{width:'40px',height:'40px',borderRadius:'20px',border:'none',background:'#f1f5f9',fontSize:'20px',fontWeight:'800',cursor:'pointer'}}>+</button>
        </div>
        <div style={{background:'linear-gradient(135deg,#0ea5e9,#3b82f6)',padding:'24px',borderRadius:'20px',color:'#fff'}}>
          <div style={{fontSize:'12px',fontWeight:'700',opacity:0.8,marginBottom:'4px',letterSpacing:'1px'}}>EACH PAYS</div>
          <div style={{fontSize:'42px',fontWeight:'900',letterSpacing:'-2px'}}>\${p.toFixed(2)}</div>
          <div style={{fontSize:'11px',fontWeight:'600',marginTop:'8px',opacity:0.8}}>Total with tip: \${t.toFixed(2)}</div>
        </div>
      </div>
    );
  };` },
  { id: 'discount_master', cat: 'biz', name: 'Discount Calculator', nameFr: 'Calcul Remise', icon: '🏷️', tags: ['Business', 'Utility'], code: `const App = () => {
    const [price, setPrice] = React.useState(250);
    const [d1, setD1] = React.useState(20);
    const [d2, setD2] = React.useState(0);
    const res1 = price * (1 - d1/100);
    const res2 = res1 * (1 - d2/100);
    const saved = price - res2;
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'20px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🏷️ Discount Calculator</h3>
        <div style={{display:'flex',gap:'12px',marginBottom:'16px'}}>
          <div style={{flex:1}}><label style={{fontSize:'11px',fontWeight:'700',color:'#94a3b8'}}>Original Price (\$)</label><input type="number" value={price} onChange={e=>setPrice(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',outline:'none'}}/></div>
        </div>
        <div style={{display:'flex',gap:'12px',marginBottom:'24px'}}>
          <div style={{flex:1}}><label style={{fontSize:'11px',fontWeight:'700',color:'#94a3b8'}}>Discount 1 (%)</label><input type="number" value={d1} onChange={e=>setD1(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',outline:'none'}}/></div>
          <div style={{flex:1}}><label style={{fontSize:'11px',fontWeight:'700',color:'#94a3b8'}}>Discount 2 (%)</label><input type="number" value={d2} onChange={e=>setD2(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',background:'#0f172a',border:'1px solid #334155',borderRadius:'8px',color:'#fff',fontWeight:'800',outline:'none'}}/></div>
        </div>
        <div style={{background:'linear-gradient(135deg,#ec4899,#f43f5e)',padding:'20px',borderRadius:'16px',textAlign:'center'}}>
          <div style={{fontSize:'12px',fontWeight:'800',letterSpacing:'1px',opacity:0.9}}>FINAL PRICE</div>
          <div style={{fontSize:'48px',fontWeight:'900',letterSpacing:'-2px',margin:'4px 0'}}>\${res2.toFixed(2)}</div>
          <div style={{fontSize:'13px',fontWeight:'600'}}>You save: \${saved.toFixed(2)} ({((saved/price)*100).toFixed(1)}%)</div>
        </div>
      </div>
    );
  };` },
  { id: 'sales_tax_pro', cat: 'biz', name: 'Sales Tax Calculator', nameFr: 'Calcul de Taxe', icon: '🏛️', tags: ['Business', 'Calc'], code: `const App = () => {
    const [amt, setAmt] = React.useState(100);
    const [tax, setTax] = React.useState(8.5);
    const [mode, setMode] = React.useState('add');
    const final = mode==='add' ? amt*(1+tax/100) : amt;
    const tAmt = mode==='add' ? final-amt : amt-(amt/(1+tax/100));
    const base = final-tAmt;
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'20px',maxWidth:'320px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🏛️ Sales Tax Calc</h3>
        <div style={{display:'flex',background:'#f1f5f9',borderRadius:'12px',padding:'4px',marginBottom:'20px'}}>
          <button onClick={()=>setMode('add')} style={{flex:1,padding:'8px',border:'none',borderRadius:'8px',background:mode==='add'?'#fff':'transparent',color:mode==='add'?'#0f172a':'#64748b',fontWeight:'800',boxShadow:mode==='add'?'0 2px 4px rgba(0,0,0,0.05)':'none',cursor:'pointer'}}>Add Tax</button>
          <button onClick={()=>setMode('extract')} style={{flex:1,padding:'8px',border:'none',borderRadius:'8px',background:mode==='extract'?'#fff':'transparent',color:mode==='extract'?'#0f172a':'#64748b',fontWeight:'800',boxShadow:mode==='extract'?'0 2px 4px rgba(0,0,0,0.05)':'none',cursor:'pointer'}}>Extract Tax</button>
        </div>
        <div style={{display:'flex',gap:'12px',marginBottom:'24px'}}>
          <div style={{flex:2}}><label style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>Amount (\$)</label><input type="number" value={amt} onChange={e=>setAmt(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',border:'2px solid #e2e8f0',borderRadius:'8px',fontWeight:'800',outline:'none'}}/></div>
          <div style={{flex:1}}><label style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>Tax (%)</label><input type="number" value={tax} onChange={e=>setTax(+e.target.value)} style={{width:'100%',boxSizing:'border-box',padding:'10px',marginTop:'4px',border:'2px solid #e2e8f0',borderRadius:'8px',fontWeight:'800',outline:'none'}}/></div>
        </div>
        <div style={{background:'#0f172a',padding:'20px',borderRadius:'16px',color:'#fff'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px',fontSize:'13px'}}><span style={{color:'#94a3b8'}}>Base Amount:</span><span style={{fontWeight:'700'}}>\${base.toFixed(2)}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:'16px',fontSize:'13px'}}><span style={{color:'#94a3b8'}}>Tax Amount:</span><span style={{fontWeight:'700',color:'#10b981'}}>\${tAmt.toFixed(2)}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',borderTop:'1px solid #334155',paddingTop:'12px',fontSize:'18px'}}><span style={{fontWeight:'900'}}>Total:</span><span style={{fontWeight:'900',color:'#6366f1'}}>\${final.toFixed(2)}</span></div>
        </div>
      </div>
    );
  };` },
  { id: 'lead_form_pro', cat: 'biz', name: 'B2B Lead Collector', nameFr: 'Collecteur de Leads', icon: '📝', tags: ['Marketing', 'Business'], code: `const App = () => {
    const [step, setStep] = React.useState(1);
    const [done, setDone] = React.useState(false);
    const next = (e) => { e.preventDefault(); if (step<3) setStep(step+1); else setDone(true); };
    if(done) return (<div style={{fontFamily:'system-ui',background:'#10b981',color:'#fff',padding:'40px',borderRadius:'24px',textAlign:'center'}}><div style={{fontSize:'64px'}}>✅</div><h2 style={{margin:'10px 0'}}>Lead Captured!</h2><p>Our sales team will contact you soon.</p></div>);
    const inp = (l, t) => (<div style={{marginBottom:'16px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'700',color:'#64748b',marginBottom:'6px'}}>{l}</label><input type={t} required style={{width:'100%',boxSizing:'border-box',padding:'12px',border:'2px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',outline:'none'}}/></div>);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',gap:'8px',marginBottom:'24px'}}>
          {[1,2,3].map(i=><div key={i} style={{flex:1,height:'6px',borderRadius:'3px',background:step>=i?'#6366f1':'#e2e8f0',transition:'background 0.3s'}}/>)}
        </div>
        <h3 style={{margin:'0 0 24px',fontSize:'20px',fontWeight:'900',color:'#0f172a'}}>Let's talk business 🤝</h3>
        <form onSubmit={next}>
          {step===1 && <>{inp('Full Name','text')}{inp('Work Email','email')}</>}
          {step===2 && <>{inp('Company Name','text')}{inp('Job Title','text')}</>}
          {step===3 && <div style={{marginBottom:'16px'}}><label style={{display:'block',fontSize:'12px',fontWeight:'700',color:'#64748b',marginBottom:'6px'}}>Project Budget</label><select required style={{width:'100%',padding:'12px',border:'2px solid #e2e8f0',borderRadius:'10px',fontSize:'14px',background:'#fff',outline:'none'}}><option value="">Select range...</option><option><\$10k</option><option>\$10k - \$50k</option><option>\$50k+</option></select></div>}
          <div style={{display:'flex',gap:'12px',marginTop:'24px'}}>
            {step>1 && <button type="button" onClick={()=>setStep(step-1)} style={{padding:'12px 20px',background:'#f1f5f9',border:'none',borderRadius:'12px',color:'#64748b',fontWeight:'800',cursor:'pointer'}}>Back</button>}
            <button type="submit" style={{flex:1,padding:'12px',background:'#0f172a',border:'none',borderRadius:'12px',color:'#fff',fontWeight:'800',cursor:'pointer'}}>{step===3?'Submit':'Continue →'}</button>
          </div>
        </form>
      </div>
    );
  };` }
];
export default PRO_BIZ;
