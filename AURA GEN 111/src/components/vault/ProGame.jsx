const PRO_GAME = [
  { id: 'click_game_pro', cat: 'game', name: 'Click Speed Challenge', nameFr: 'Vitesse de Clique', icon: '🖱️', tags: ['Game', 'Fun'], code: `const App = () => {
    const [c, setC] = React.useState(0);
    const [t, setT] = React.useState(10);
    const [r, setR] = React.useState(false);
    React.useEffect(()=>{
      if(!r || t<=0) return;
      const i=setInterval(()=>setT(x=>x-0.1), 100);
      return ()=>clearInterval(i);
    },[r, t]);
    const clk = () => { if(!r && t===10) setR(true); if(t>0) setC(c=>c+1); };
    const rst = () => { setC(0); setT(10); setR(false); };
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>🖱️ Speed Clicker</h3>
        <div style={{display:'flex',justifyContent:'space-between',marginBottom:'24px'}}>
          <div style={{background:'rgba(255,255,255,0.1)',padding:'12px',borderRadius:'12px',flex:1,marginRight:'8px'}}>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#94a3b8'}}>TIME S</div>
            <div style={{fontSize:'24px',fontWeight:'900',color:t<=3?'#ef4444':'#fff'}}>{Math.max(0,t).toFixed(1)}</div>
          </div>
          <div style={{background:'rgba(255,255,255,0.1)',padding:'12px',borderRadius:'12px',flex:1,marginLeft:'8px'}}>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#94a3b8'}}>CLICKS</div>
            <div style={{fontSize:'24px',fontWeight:'900',color:'#10b981'}}>{c}</div>
          </div>
        </div>
        <button onClick={clk} disabled={t<=0} style={{width:'100%',aspectRatio:'1',borderRadius:'50%',background:t<=0?'#334155':'linear-gradient(135deg,#6366f1,#8b5cf6)',border:'none',color:'#fff',fontSize:'24px',fontWeight:'900',cursor:t<=0?'default':'pointer',boxShadow:t<=0?'none':'0 10px 30px rgba(99,102,241,0.4)',transform:r?'scale(0.98)':'scale(1)',transition:'transform 0.1s'}}>CLICK ME!</button>
        {t<=0 && <button onClick={rst} style={{marginTop:'24px',padding:'12px 24px',background:'#fff',color:'#0f172a',border:'none',borderRadius:'12px',fontWeight:'800',cursor:'pointer'}}>Play Again</button>}
      </div>
    );
  };` },
  { id: 'rps_pro', cat: 'game', name: 'Modern RPS Game', nameFr: 'Chifoumi Moderne', icon: '✊', tags: ['Game', 'Fun'], code: `const App = () => {
    const opts = ['✊','✋','✌️'];
    const [res, setRes] = React.useState('');
    const [sc, setSc] = React.useState({w:0, l:0});
    const play = (p) => {
      const c = Math.floor(Math.random()*3);
      if(p===c) setRes('Draw! Both picked '+opts[p]);
      else if((p===0&&c===2) || (p===1&&c===0) || (p===2&&c===1)) { setRes('You Win! '+opts[p]+' beats '+opts[c]); setSc({w:sc.w+1,l:sc.l}); }
      else { setRes('You Lose! '+opts[c]+' beats '+opts[p]); setSc({w:sc.w,l:sc.l+1}); }
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',textAlign:'center',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>Rock Paper Scissors</h3>
        <div style={{display:'flex',justifyContent:'space-around',background:'#f8fafc',padding:'16px',borderRadius:'16px',marginBottom:'24px'}}>
          <div><div style={{fontSize:'12px',fontWeight:'800',color:'#64748b'}}>SCORE</div><div style={{fontSize:'24px',fontWeight:'900',color:'#10b981'}}>{sc.w}</div></div>
          <div><div style={{fontSize:'12px',fontWeight:'800',color:'#64748b'}}>AI</div><div style={{fontSize:'24px',fontWeight:'900',color:'#ef4444'}}>{sc.l}</div></div>
        </div>
        <div style={{display:'flex',gap:'12px',justifyContent:'center',marginBottom:'24px'}}>
          {opts.map((o,i)=>(
            <button key={i} onClick={()=>play(i)} style={{width:'80px',height:'80px',borderRadius:'20px',border:'2px solid #e2e8f0',background:'#fff',fontSize:'40px',cursor:'pointer',boxShadow:'0 4px 12px rgba(0,0,0,0.05)',transition:'transform 0.1s'}} onMouseDown={e=>e.target.style.transform='scale(0.9)'} onMouseUp={e=>e.target.style.transform='scale(1)'}>{o}</button>
          ))}
        </div>
        <div style={{height:'40px',fontSize:'15px',fontWeight:'800',color:'#0f172a'}}>{res}</div>
      </div>
    );
  };` },
  { id: 'tic_tac_pro', cat: 'game', name: 'Tic Tac Toe Master', nameFr: 'Morpion Master', icon: '⭕', tags: ['Game', 'Fun'], code: `const App = () => {
    const [b, setB] = React.useState(Array(9).fill(null));
    const [x, setX] = React.useState(true);
    const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].find(([i,j,k])=>b[i]&&b[i]===b[j]&&b[i]===b[k]);
    const w = win ? b[win[0]] : null;
    const clk = (i) => { if(b[i] || w) return; const nb=[...b]; nb[i]=x?'X':'O'; setB(nb); setX(!x); };
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'32px',borderRadius:'24px',maxWidth:'300px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>⭕ Tic Tac Toe</h3>
        <div style={{fontSize:'14px',fontWeight:'800',color:w?'#10b981':'#94a3b8',marginBottom:'24px'}}>{w ? w+' WINS! 🎉' : b.every(Boolean) ? 'DRAW!' : 'Turn: '+(x?'X':'O')}</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'8px',marginBottom:'24px'}}>
          {b.map((v,i)=>(
            <button key={i} onClick={()=>clk(i)} style={{aspectRatio:'1',background:win&&win.includes(i)?'#6366f1':'#1e293b',border:'2px solid #334155',borderRadius:'16px',fontSize:'40px',fontWeight:'900',color:v==='X'?'#ec4899':'#0ea5e9',cursor:'pointer'}}>{v}</button>
          ))}
        </div>
        <button onClick={()=>{setB(Array(9).fill(null));setX(true);}} style={{padding:'12px 24px',background:'#fff',color:'#0f172a',border:'none',borderRadius:'12px',fontWeight:'900',cursor:'pointer'}}>Restart</button>
      </div>
    );
  };` },
  { id: 'snake_pro', cat: 'game', name: 'Retro Snake Canvas', nameFr: 'Serpent Rétro', icon: '🐍', tags: ['Game', 'Animation'], code: `const App = () => {
    const cvsRef = React.useRef(null);
    const [sc, setSc] = React.useState(0);
    React.useEffect(()=>{
      const ctx = cvsRef.current.getContext('2d');
      let s = [{x:10,y:10}], food = {x:15,y:15}, dx=1, dy=0, over=false;
      const fn = (e) => {
        if(e.key==='ArrowUp' && dy===0) {dx=0; dy=-1;}
        if(e.key==='ArrowDown' && dy===0) {dx=0; dy=1;}
        if(e.key==='ArrowLeft' && dx===0) {dx=-1; dy=0;}
        if(e.key==='ArrowRight' && dx===0) {dx=1; dy=0;}
      };
      document.addEventListener('keydown', fn);
      const i = setInterval(()=>{
        if(over) return;
        const h = {x:s[0].x+dx, y:s[0].y+dy};
        if(h.x<0||h.x>=20||h.y<0||h.y>=20||s.some(p=>p.x===h.x&&p.y===h.y)) { over=true; return; }
        s.unshift(h);
        if(h.x===food.x && h.y===food.y) { setSc(x=>x+10); food={x:Math.floor(Math.random()*20), y:Math.floor(Math.random()*20)}; } else { s.pop(); }
        ctx.fillStyle='#0f172a'; ctx.fillRect(0,0,300,300);
        ctx.fillStyle='#ef4444'; ctx.fillRect(food.x*15, food.y*15, 14, 14);
        ctx.fillStyle='#10b981'; s.forEach(p=>ctx.fillRect(p.x*15, p.y*15, 14, 14));
      }, 100);
      return ()=>{clearInterval(i); document.removeEventListener('keydown',fn);};
    },[]);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🐍 Snake</h3>
          <div style={{fontSize:'14px',fontWeight:'800',color:'#64748b'}}>Score: <span style={{color:'#10b981'}}>{sc}</span></div>
        </div>
        <canvas ref={cvsRef} width="300" height="300" tabIndex="0" style={{background:'#0f172a',borderRadius:'16px',outline:'none',boxShadow:'inset 0 0 20px rgba(0,0,0,0.5)'}}/>
        <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'12px',fontWeight:'700'}}>Click canvas & use arrow keys to play</div>
      </div>
    );
  };` },
  { id: 'reaction_pro', cat: 'game', name: 'Reaction Speed Tester', nameFr: 'Test de Réaction', icon: '⚡', tags: ['Game', 'Fun'], code: `const App = () => {
    const [st, setSt] = React.useState('WAIT'); // WAIT, READY, GREEN, DONE
    const [t, setT] = React.useState(0);
    const tmr = React.useRef(null);
    const clk = () => {
      if(st==='WAIT') {
        setSt('READY');
        tmr.current = setTimeout(()=>{ setSt('GREEN'); setT(Date.now()); }, Math.random()*3000+1000);
      } else if(st==='READY') {
        clearTimeout(tmr.current); setSt('DONE'); setT(-1); // Too early
      } else if(st==='GREEN') {
        setT(Date.now()-t); setSt('DONE');
      } else if(st==='DONE') {
        setSt('WAIT');
      }
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'900'}}>⚡ Reaction Test</h3>
        <div onClick={clk} style={{height:'200px',background:st==='WAIT'?'#334155':st==='READY'?'#ef4444':st==='GREEN'?'#10b981':'#3b82f6',borderRadius:'24px',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',userSelect:'none',boxShadow:'0 10px 30px rgba(0,0,0,0.2)',transition:'background 0.2s'}}>
          <div style={{fontSize:'24px',fontWeight:'900',textShadow:'0 2px 4px rgba(0,0,0,0.3)'}}>
            {st==='WAIT'&&'Click to Start'}
            {st==='READY'&&'Wait for Green...'}
            {st==='GREEN'&&'CLICK NOW!'}
            {st==='DONE'&&(t>0?t+' ms':t===-1?'Too Early!':'')}
          </div>
        </div>
        <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'20px',fontWeight:'700'}}>{st==='DONE'?'Click to try again':'Focus!'}</div>
      </div>
    );
  };` },
  { id: 'dice_pro', cat: 'game', name: '3D Dice Roller', nameFr: 'Lanceur de Dés', icon: '🎲', tags: ['Game', 'Fun'], code: `const App = () => {
    const [d, setD] = React.useState([1,1]);
    const [r, setR] = React.useState(false);
    const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    const roll = () => {
      setR(true);
      let c=0;
      const i=setInterval(()=>{
        setD([Math.ceil(Math.random()*6), Math.ceil(Math.random()*6)]);
        c++; if(c>15){ clearInterval(i); setR(false); }
      }, 50);
    };
    return (
      <div style={{fontFamily:'system-ui',background:'linear-gradient(135deg,#db2777,#4f46e5)',padding:'40px 32px',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',color:'#fff',textAlign:'center',boxShadow:'0 20px 40px rgba(219,39,119,0.3)'}}>
        <h3 style={{margin:'0 0 24px',fontSize:'20px',fontWeight:'900',textShadow:'0 2px 4px rgba(0,0,0,0.2)'}}>🎲 Let's Roll</h3>
        <div style={{display:'flex',justifyContent:'center',gap:'20px',marginBottom:'32px',transform:r?'scale(1.1)':'scale(1)',transition:'transform 0.1s'}}>
          <div style={{fontSize:'80px',lineHeight:1,filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'}}>{faces[d[0]-1]}</div>
          <div style={{fontSize:'80px',lineHeight:1,filter:'drop-shadow(0 4px 8px rgba(0,0,0,0.4))'}}>{faces[d[1]-1]}</div>
        </div>
        <div style={{fontSize:'24px',fontWeight:'900',marginBottom:'24px',textShadow:'0 2px 4px rgba(0,0,0,0.2)'}}>Total: {d[0]+d[1]}</div>
        <button onClick={roll} disabled={r} style={{padding:'16px 32px',background:'#fff',color:'#db2777',border:'none',borderRadius:'16px',fontSize:'18px',fontWeight:'900',cursor:'pointer',boxShadow:'0 10px 20px rgba(0,0,0,0.2)'}}>ROLL DICE</button>
      </div>
    );
  };` },
  { id: 'emoji_match', cat: 'game', name: 'Emoji Memory Match', nameFr: 'Mémoire Emojis', icon: '🧠', tags: ['Game', 'Fun'], code: `const App = () => {
    const ev = ['🐶','🐱','🐭','🐹','🐰','🦊'];
    const [c, setC] = React.useState([...ev,...ev].map((e,i)=>({i,e,f:false,m:false})).sort(()=>Math.random()-0.5));
    const [s, setS] = React.useState([]);
    React.useEffect(()=>{
      if(s.length!==2) return;
      if(c[s[0]].e === c[s[1]].e) setC(c=>c.map((x,i)=>s.includes(i)?{...x,m:true}:x));
      else setTimeout(()=>setC(c=>c.map((x,i)=>s.includes(i)?{...x,f:false}:x)), 700);
      setS([]);
    },[s,c]);
    const flp = (idx) => { if(s.length<2 && !c[idx].f && !c[idx].m){ setC(c.map((x,i)=>i===idx?{...x,f:true}:x)); setS([...s,idx]); } };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a',textAlign:'center'}}>🧠 Memory Match</h3>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'8px'}}>
          {c.map((x,i)=>(
            <div key={i} onClick={()=>flp(i)} style={{aspectRatio:'1',background:x.m?'#d1fae5':x.f?'#fff':'#1e293b',border:x.m?'2px solid #10b981':x.f?'2px solid #6366f1':'none',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'32px',cursor:'pointer',boxShadow:x.f||x.m?'0 4px 12px rgba(0,0,0,0.1)':'none',transition:'all 0.2s'}}>
              {(x.f||x.m)&&x.e}
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'click_dash_pro', cat: 'game', name: 'Dot Catch Challenge', nameFr: 'Attrape Points', icon: '🎯', tags: ['Game', 'Animation'], code: `const App = () => {
    const [p, setP] = React.useState({x:50,y:50});
    const [sc, setSc] = React.useState(0);
    const mv = () => { setP({x:Math.random()*80+10, y:Math.random()*80+10}); setSc(s=>s+1); };
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>🎯 Catch the Dot</h3>
        <div style={{fontSize:'14px',fontWeight:'800',color:'#10b981',marginBottom:'20px'}}>Score: {sc}</div>
        <div style={{position:'relative',width:'100%',height:'250px',background:'#1e293b',borderRadius:'16px',overflow:'hidden'}}>
          <div onClick={mv} style={{position:'absolute',left:p.x+'%',top:p.y+'%',width:'30px',height:'30px',borderRadius:'15px',background:'#ef4444',cursor:'crosshair',transform:'translate(-50%,-50%)',boxShadow:'0 0 15px #ef4444'}}/>
        </div>
      </div>
    );
  };` },
  { id: 'trivia_lite', cat: 'game', name: 'Tech Trivia Quiz', nameFr: 'Quiz Tech', icon: '❓', tags: ['Game', 'Fun'], code: `const App = () => {
    const qs = [
      {q:'What does HTML stand for?', o:['Hyper Text', 'Hyperlinks', 'Home Tool'], a:0},
      {q:'Who invented JavaScript?', o:['Brendan Eich', 'Tim Berners-Lee', 'Linus Torvalds'], a:0},
      {q:'What year was React created?', o:['2011', '2013', '2015'], a:1}
    ];
    const [c, setC] = React.useState(0); const [sc, setSc] = React.useState(0); const [dn, setDn] = React.useState(false);
    const ans = (i) => { if(i===qs[c].a) setSc(s=>s+1); if(c<qs.length-1) setC(c+1); else setDn(true); };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        {dn ? (
          <div style={{textAlign:'center'}}>
            <div style={{fontSize:'48px',marginBottom:'16px'}}>🏆</div>
            <h3 style={{margin:'0 0 8px',fontSize:'20px',fontWeight:'900',color:'#0f172a'}}>Quiz Complete!</h3>
            <div style={{fontSize:'16px',fontWeight:'800',color:'#64748b'}}>You scored <span style={{color:'#6366f1'}}>{sc}/{qs.length}</span></div>
          </div>
        ) : (
          <div>
            <div style={{fontSize:'12px',fontWeight:'800',color:'#6366f1',marginBottom:'16px'}}>QUESTION {c+1}/{qs.length}</div>
            <h3 style={{margin:'0 0 24px',fontSize:'18px',fontWeight:'800',color:'#0f172a',minHeight:'48px'}}>{qs[c].q}</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
              {qs[c].o.map((o,i)=>(
                <button key={i} onClick={()=>ans(i)} style={{padding:'16px',background:'#f8fafc',border:'2px solid #e2e8f0',borderRadius:'12px',fontSize:'14px',fontWeight:'700',color:'#0f172a',cursor:'pointer',textAlign:'left'}}>{o}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };` },
  { id: 'scramble_pro', cat: 'game', name: 'Word Scramble Game', nameFr: 'Mots Mêlés', icon: '🔠', tags: ['Game', 'Fun'], code: `const App = () => {
    const ws = ['REACT', 'AURA', 'JAVASCRIPT', 'DESIGN', 'CODE', 'BUILD'];
    const [w, setW] = React.useState(ws[0]);
    const [s, setS] = React.useState('');
    const [i, setI] = React.useState('');
    const [sc, setSc] = React.useState(0);
    React.useEffect(()=>{
      setS(w.split('').sort(()=>Math.random()-0.5).join(''));
    },[w]);
    const check = (e) => {
      e.preventDefault();
      if(i.toUpperCase()===w) { setSc(sc+1); setW(ws[Math.floor(Math.random()*ws.length)]); setI(''); }
      else { alert('Try again!'); }
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 16px',fontSize:'18px',fontWeight:'900'}}>🔠 Word Scramble</h3>
        <div style={{fontSize:'12px',fontWeight:'800',color:'#10b981',marginBottom:'24px'}}>Score: {sc}</div>
        <div style={{fontSize:'32px',fontWeight:'900',letterSpacing:'8px',background:'rgba(255,255,255,0.05)',padding:'24px',borderRadius:'16px',marginBottom:'24px'}}>{s}</div>
        <form onSubmit={check}>
          <input value={i} onChange={e=>setI(e.target.value)} placeholder="Unscramble..." style={{width:'100%',boxSizing:'border-box',padding:'16px',background:'#0f172a',border:'2px solid #334155',borderRadius:'12px',color:'#fff',textAlign:'center',fontSize:'16px',fontWeight:'800',outline:'none',marginBottom:'16px',textTransform:'uppercase'}}/>
          <button type="submit" style={{width:'100%',padding:'16px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'12px',fontWeight:'900',fontSize:'14px',cursor:'pointer'}}>SUBMIT</button>
        </form>
      </div>
    );
  };` }
];
export default PRO_GAME;
