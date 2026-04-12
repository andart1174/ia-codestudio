const PRO_SOCIAL = [
  { id: 'chat_sim_pro', cat: 'social', name: 'Chat UI Simulator', nameFr: 'Simulateur de Chat', icon: '💬', tags: ['Social', 'UI'], code: `const App = () => {
    const [msg, setMsg] = React.useState('');
    const [chats, setChats] = React.useState([
      {t:'Hey!', isMe:false}, {t:'Hi there, how are you?', isMe:true}
    ]);
    const endRef = React.useRef(null);
    React.useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [chats]);
    const send = (e) => {
      e.preventDefault();
      if(!msg.trim()) return;
      setChats([...chats, {t:msg, isMe:true}]);
      setMsg('');
      setTimeout(()=>setChats(c=>[...c, {t:'That sounds interesting!', isMe:false}]), 1000);
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',overflow:'hidden',display:'flex',flexDirection:'column',height:'500px'}}>
        <div style={{background:'#6366f1',padding:'20px',color:'#fff',display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'40px',height:'40px',background:'#fff',borderRadius:'20px',display:'flex',justifyContent:'center',alignItems:'center',color:'#6366f1',fontSize:'20px',fontWeight:'900'}}>A</div>
          <div><div style={{fontWeight:'800',fontSize:'16px'}}>Aura Bot</div><div style={{fontSize:'12px',opacity:0.8,fontWeight:'600'}}>Online</div></div>
        </div>
        <div style={{flex:1,padding:'20px',overflowY:'auto',background:'#f8fafc',display:'flex',flexDirection:'column',gap:'12px'}}>
          {chats.map((c,i)=>(
            <div key={i} style={{alignSelf:c.isMe?'flex-end':'flex-start',background:c.isMe?'#6366f1':'#fff',color:c.isMe?'#fff':'#0f172a',padding:'12px 16px',borderRadius:c.isMe?'16px 16px 4px 16px':'16px 16px 16px 4px',maxWidth:'75%',boxShadow:'0 2px 8px rgba(0,0,0,0.05)',fontSize:'14px',lineHeight:'1.4',fontWeight:'600'}}>{c.t}</div>
          ))}
          <div ref={endRef}/>
        </div>
        <form onSubmit={send} style={{padding:'16px',background:'#fff',borderTop:'1px solid #e2e8f0',display:'flex',gap:'8px'}}>
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Type message..." style={{flex:1,padding:'12px',background:'#f1f5f9',border:'none',borderRadius:'20px',fontSize:'14px',outline:'none'}}/>
          <button type="submit" style={{background:'#6366f1',color:'#fff',border:'none',width:'40px',height:'40px',borderRadius:'20px',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>➤</button>
        </form>
      </div>
    );
  };` },
  { id: 'profile_card_pro', cat: 'social', name: 'User Profile Card', nameFr: 'Carte de Profil', icon: '👤', tags: ['Social', 'Component'], code: `const App = () => {
    const [flw, setFlw] = React.useState(false);
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',borderRadius:'24px',maxWidth:'320px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',overflow:'hidden'}}>
        <div style={{height:'100px',background:'linear-gradient(135deg,#a855f7,#ec4899)'}}/>
        <div style={{padding:'0 24px 24px',textAlign:'center'}}>
          <div style={{width:'80px',height:'80px',borderRadius:'40px',background:'#fff',margin:'-40px auto 12px',padding:'4px'}}>
            <img src="https://ui-avatars.com/api/?name=Jane+Doe&background=random" style={{width:'100%',height:'100%',borderRadius:'50%'}} alt="avatar"/>
          </div>
          <h3 style={{margin:'0 0 4px',fontSize:'20px',fontWeight:'900',color:'#0f172a'}}>Jane Doe</h3>
          <div style={{fontSize:'13px',color:'#64748b',fontWeight:'600',marginBottom:'16px'}}>@janedoe • Web Designer</div>
          <p style={{fontSize:'14px',color:'#475569',lineHeight:'1.5',marginBottom:'20px'}}>Passionate about creating beautiful user experiences & writing clean code 🎨💻</p>
          <div style={{display:'flex',justifyContent:'space-around',borderTop:'1px solid #e2e8f0',borderBottom:'1px solid #e2e8f0',padding:'16px 0',marginBottom:'20px'}}>
            <div><div style={{fontSize:'16px',fontWeight:'900',color:'#0f172a'}}>1.2k</div><div style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>POSTS</div></div>
            <div><div style={{fontSize:'16px',fontWeight:'900',color:'#0f172a'}}>45.8k</div><div style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>FOLLOWERS</div></div>
            <div><div style={{fontSize:'16px',fontWeight:'900',color:'#0f172a'}}>256</div><div style={{fontSize:'11px',fontWeight:'700',color:'#64748b'}}>FOLLOWING</div></div>
          </div>
          <button onClick={()=>setFlw(!flw)} style={{width:'100%',padding:'12px',background:flw?'#f1f5f9':'#0f172a',color:flw?'#0f172a':'#fff',border:'none',borderRadius:'12px',fontWeight:'800',fontSize:'14px',cursor:'pointer',transition:'all 0.2s'}}>{flw?'Following':'Follow'}</button>
        </div>
      </div>
    );
  };` },
  { id: 'feed_ui_pro', cat: 'social', name: 'Social Feed Component', nameFr: 'Flux Social', icon: '📰', tags: ['Social', 'Feed'], code: `const App = () => {
    const [posts, setPosts] = React.useState([
      {id:1, a:'Alex', t:'Just launched my new portfolio!', l:42, c:12, liked:false},
      {id:2, a:'Sam', t:'Loving the new AuraGen features 🔥', l:128, c:34, liked:true}
    ]);
    const tg = (id) => {
      setPosts(posts.map(p=>p.id===id?{...p,liked:!p.liked,l:p.liked?p.l-1:p.l+1}:p));
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#f1f5f9',padding:'24px',borderRadius:'24px',maxWidth:'400px',margin:'0 auto',maxHeight:'500px',overflowY:'auto'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>📰 My Feed</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          {posts.map(p=>(
            <div key={p.id} style={{background:'#fff',padding:'20px',borderRadius:'16px',boxShadow:'0 2px 10px rgba(0,0,0,0.05)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'12px'}}>
                <div style={{width:'32px',height:'32px',background:'#e2e8f0',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'14px'}}>{p.a[0]}</div>
                <div><div style={{fontSize:'14px',fontWeight:'800',color:'#0f172a'}}>{p.a}</div><div style={{fontSize:'12px',color:'#64748b'}}>2 hours ago</div></div>
              </div>
              <p style={{margin:'0 0 16px',fontSize:'15px',color:'#334155',lineHeight:'1.5'}}>{p.t}</p>
              <div style={{display:'flex',gap:'16px',borderTop:'1px solid #f1f5f9',paddingTop:'12px'}}>
                <button onClick={()=>tg(p.id)} style={{background:'none',border:'none',display:'flex',alignItems:'center',gap:'6px',color:p.liked?'#ef4444':'#64748b',fontWeight:'700',cursor:'pointer',fontSize:'13px'}}><span style={{fontSize:'16px'}}>{p.liked?'❤️':'🤍'}</span> {p.l}</button>
                <button style={{background:'none',border:'none',display:'flex',alignItems:'center',gap:'6px',color:'#64748b',fontWeight:'700',cursor:'pointer',fontSize:'13px'}}><span style={{fontSize:'16px'}}>💬</span> {p.c}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'comment_pro', cat: 'social', name: 'Nested Comment System', nameFr: 'Commentaires Imbriqués', icon: '📝', tags: ['Social', 'Interactive'], code: `const App = () => {
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'400px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>💬 Discussion (3)</h3>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'flex',gap:'12px'}}>
            <div style={{width:'32px',height:'32px',background:'#6366f1',color:'#fff',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',flexShrink:0}}>J</div>
            <div>
              <div style={{background:'#f1f5f9',padding:'12px',borderRadius:'4px 16px 16px 16px'}}>
                <span style={{fontWeight:'800',fontSize:'13px',marginRight:'8px'}}>JohnD</span><span style={{fontSize:'12px',color:'#64748b'}}>1h ago</span>
                <p style={{margin:'4px 0 0',fontSize:'14px',color:'#334155'}}>This reminds me of the early days of React! Super cool implementation.</p>
              </div>
              <div style={{fontSize:'12px',color:'#64748b',fontWeight:'700',marginTop:'4px',marginLeft:'8px',cursor:'pointer'}}>Reply • Like (4)</div>
            </div>
          </div>
          <div style={{display:'flex',gap:'12px',marginLeft:'44px'}}>
            <div style={{width:'24px',height:'24px',background:'#ec4899',color:'#fff',borderRadius:'12px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'11px',flexShrink:0}}>S</div>
            <div>
              <div style={{background:'#f1f5f9',padding:'10px',borderRadius:'4px 16px 16px 16px'}}>
                <span style={{fontWeight:'800',fontSize:'12px',marginRight:'8px'}}>SarahM</span><span style={{fontSize:'11px',color:'#64748b'}}>45m ago</span>
                <p style={{margin:'4px 0 0',fontSize:'13px',color:'#334155'}}>Exactly what I was thinking! The components look highly reusable.</p>
              </div>
              <div style={{fontSize:'11px',color:'#64748b',fontWeight:'700',marginTop:'4px',marginLeft:'8px',cursor:'pointer'}}>Reply • Like (2)</div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',gap:'12px',marginTop:'24px',borderTop:'1px solid #e2e8f0',paddingTop:'20px'}}>
           <div style={{width:'32px',height:'32px',background:'#0f172a',color:'#fff',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',flexShrink:0}}>U</div>
           <input placeholder="Add a comment..." style={{flex:1,background:'#f8fafc',border:'1px solid #e2e8f0',borderRadius:'16px',padding:'0 16px',fontSize:'14px',outline:'none'}}/>
        </div>
      </div>
    );
  };` },
  { id: 'poll_pro', cat: 'social', name: 'Interactive Poll UI', nameFr: 'Sondage Interactif', icon: '📊', tags: ['Social', 'Vote'], code: `const App = () => {
    const [ops, setOps] = React.useState([{t:'React',v:65},{t:'Vue',v:25},{t:'Angular',v:10}]);
    const [voted, setVoted] = React.useState(false);
    const tot = ops.reduce((s,o)=>s+o.v,0);
    const vote = (idx) => {
      if(voted) return;
      setOps(ops.map((o,i)=>i===idx?{...o,v:o.v+1}:o));
      setVoted(true);
    };
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff'}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px'}}>
          <div style={{width:'40px',height:'40px',background:'#3b82f6',borderRadius:'20px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'20px'}}>📊</div>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',lineHeight:'1.3'}}>What's your favorite frontend framework?</h3>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          {ops.map((o,i)=>{
            const pct = Math.round((o.v/(tot+(voted?0:1)))*100) || 0;
            return (
              <div key={i} onClick={()=>vote(i)} style={{position:'relative',background:'rgba(255,255,255,0.05)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',padding:'16px',cursor:(voted?'default':'pointer'),overflow:'hidden'}}>
                <div style={{position:'relative',zIndex:1,display:'flex',justifyContent:'space-between',fontWeight:'800',fontSize:'14px'}}>
                  <span>{o.t}</span>
                  {voted && <span>{pct}%</span>}
                </div>
                {voted && <div style={{position:'absolute',left:0,top:0,bottom:0,width:pct+'%',background:'rgba(59,130,246,0.3)',zIndex:0,transition:'width 0.5s ease-out'}}/>}
              </div>
            );
          })}
        </div>
        <div style={{fontSize:'12px',color:'#94a3b8',marginTop:'16px',textAlign:'center'}}>{tot} total votes</div>
      </div>
    );
  };` },
  { id: 'story_pro', cat: 'social', name: 'IG-style Story Viewer', nameFr: 'Lecteur d\'Histoires', icon: '📱', tags: ['Social', 'Media'], code: `const App = () => {
    const [idx, setIdx] = React.useState(0);
    const [prog, setProg] = React.useState(0);
    const sts = ['#ef4444','#f59e0b','#10b981'];
    React.useEffect(()=>{
      const i=setInterval(()=>setProg(p=>{
        if(p>=100){
          if(idx<sts.length-1){setIdx(idx+1); return 0;}
          return 100;
        }
        return p+2;
      }), 50);
      return ()=>clearInterval(i);
    },[idx]);
    return (
      <div style={{fontFamily:'system-ui',background:'#000',height:'500px',maxWidth:'300px',margin:'0 auto',borderRadius:'24px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0,background:sts[idx],display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:'32px',fontWeight:'900',textShadow:'0 4px 10px rgba(0,0,0,0.5)'}}>Story {idx+1}</div>
        <div style={{position:'absolute',top:'20px',left:'16px',right:'16px',display:'flex',gap:'4px'}}>
          {sts.map((_,i)=>(
            <div key={i} style={{flex:1,height:'3px',background:'rgba(255,255,255,0.3)',borderRadius:'2px',overflow:'hidden'}}>
              <div style={{height:'100%',background:'#fff',width:(i<idx?'100%':i===idx?prog+'%':'0%'),transition:'width 0.05s linear'}}/>
            </div>
          ))}
        </div>
        <div style={{position:'absolute',top:'40px',left:'16px',display:'flex',alignItems:'center',gap:'8px',color:'#fff'}}>
          <div style={{width:'32px',height:'32px',borderRadius:'16px',background:'#fff',color:'#000',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>A</div>
          <span style={{fontWeight:'800',fontSize:'13px',textShadow:'0 1px 2px rgba(0,0,0,0.5)'}}>auragen</span>
        </div>
        <div style={{position:'absolute',inset:0,display:'flex'}}>
          <div onClick={()=>{if(idx>0){setIdx(idx-1);setProg(0);}}} style={{flex:1}}/>
          <div onClick={()=>{if(idx<sts.length-1){setIdx(idx+1);setProg(0);}}} style={{flex:1}}/>
        </div>
      </div>
    );
  };` },
  { id: 'network_pro', cat: 'social', name: 'Follower Network Graph', nameFr: 'Graphe Réseau', icon: '🕸️', tags: ['Social', 'Data'], code: `const App = () => {
    return (
      <div style={{fontFamily:'system-ui',background:'#1e293b',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',color:'#fff',textAlign:'center'}}>
        <h3 style={{margin:'0 0 20px',fontSize:'18px',fontWeight:'900'}}>🕸️ Network Graph</h3>
        <div style={{position:'relative',height:'240px',background:'#0f172a',borderRadius:'16px',border:'1px solid #334155'}}>
          <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
            <line x1="170" y1="120" x2="80" y2="60" stroke="#6366f1" strokeWidth="2" opacity="0.5"/>
            <line x1="170" y1="120" x2="260" y2="60" stroke="#6366f1" strokeWidth="2" opacity="0.5"/>
            <line x1="170" y1="120" x2="80" y2="180" stroke="#6366f1" strokeWidth="2" opacity="0.5"/>
            <line x1="170" y1="120" x2="260" y2="180" stroke="#6366f1" strokeWidth="2" opacity="0.5"/>
          </svg>
          <div style={{position:'absolute',top:'120px',left:'170px',transform:'translate(-50%,-50%)',width:'44px',height:'44px',background:'#ec4899',borderRadius:'22px',border:'3px solid #fff',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold',fontSize:'12px',zIndex:2}}>YOU</div>
          <div style={{position:'absolute',top:'60px',left:'80px',transform:'translate(-50%,-50%)',width:'32px',height:'32px',background:'#3b82f6',borderRadius:'16px',border:'2px solid #fff',zIndex:2}}/>
          <div style={{position:'absolute',top:'60px',left:'260px',transform:'translate(-50%,-50%)',width:'32px',height:'32px',background:'#10b981',borderRadius:'16px',border:'2px solid #fff',zIndex:2}}/>
          <div style={{position:'absolute',top:'180px',left:'80px',transform:'translate(-50%,-50%)',width:'32px',height:'32px',background:'#f59e0b',borderRadius:'16px',border:'2px solid #fff',zIndex:2}}/>
          <div style={{position:'absolute',top:'180px',left:'260px',transform:'translate(-50%,-50%)',width:'32px',height:'32px',background:'#8b5cf6',borderRadius:'16px',border:'2px solid #fff',zIndex:2}}/>
        </div>
      </div>
    );
  };` },
  { id: 'social_share_pro', cat: 'social', name: 'Custom Share Buttons', nameFr: 'Boutons de Partage', icon: '🔗', tags: ['Social', 'Utility'], code: `const App = () => {
    const net = [
      {n:'Twitter',c:'#1DA1F2',i:'𝕏'},
      {n:'LinkedIn',c:'#0A66C2',i:'in'},
      {n:'Facebook',c:'#1877F2',i:'f'},
      {n:'Copy Link',c:'#64748b',i:'📋'}
    ];
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'32px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)',textAlign:'center'}}>
        <h3 style={{margin:'0 0 12px',fontSize:'20px',fontWeight:'900',color:'#0f172a'}}>Share this post</h3>
        <p style={{margin:'0 0 24px',fontSize:'14px',color:'#64748b'}}>Spread the word with your network!</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
          {net.map(n=>(
            <button key={n.n} style={{display:'flex',alignItems:'center',gap:'12px',background:'#f8fafc',border:'1px solid #e2e8f0',padding:'12px 16px',borderRadius:'12px',cursor:'pointer',transition:'background 0.2s',color:'#0f172a',fontWeight:'800',fontSize:'14px'}} onMouseOver={e=>e.currentTarget.style.borderColor=n.c} onMouseOut={e=>e.currentTarget.style.borderColor='#e2e8f0'}>
              <div style={{width:'24px',height:'24px',background:n.c,color:'#fff',borderRadius:'6px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'14px'}}>{n.i}</div>
              {n.n}
            </button>
          ))}
        </div>
      </div>
    );
  };` },
  { id: 'notification_pro', cat: 'social', name: 'Push Notification Hub', nameFr: 'Centre Notifs', icon: '🔔', tags: ['Social', 'Alert'], code: `const App = () => {
    return (
      <div style={{fontFamily:'system-ui',background:'#fff',padding:'24px',borderRadius:'24px',maxWidth:'340px',margin:'0 auto',boxShadow:'0 10px 40px rgba(0,0,0,0.08)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px'}}>
          <h3 style={{margin:0,fontSize:'18px',fontWeight:'900',color:'#0f172a'}}>🔔 Notifications</h3>
          <span style={{background:'#ef4444',color:'#fff',padding:'2px 8px',borderRadius:'12px',fontSize:'11px',fontWeight:'900'}}>2 NEW</span>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'2px'}}>
          <div style={{background:'#f0fdf4',padding:'16px',borderRadius:'12px',display:'flex',gap:'12px'}}>
             <div style={{fontSize:'20px'}}>❤️</div>
             <div>
               <div style={{fontSize:'13px',color:'#0f172a'}}><span style={{fontWeight:'800'}}>Sarah</span> liked your photo.</div>
               <div style={{fontSize:'11px',color:'#64748b',marginTop:'4px',fontWeight:'600'}}>2m ago</div>
             </div>
          </div>
          <div style={{background:'#eff6ff',padding:'16px',borderRadius:'12px',display:'flex',gap:'12px'}}>
             <div style={{fontSize:'20px'}}>👤</div>
             <div>
               <div style={{fontSize:'13px',color:'#0f172a'}}><span style={{fontWeight:'800'}}>MikeDev</span> followed you.</div>
               <div style={{fontSize:'11px',color:'#64748b',marginTop:'4px',fontWeight:'600'}}>1h ago</div>
             </div>
          </div>
          <div style={{background:'#fff',padding:'16px',borderRadius:'12px',display:'flex',gap:'12px'}}>
             <div style={{fontSize:'20px'}}>💬</div>
             <div>
               <div style={{fontSize:'13px',color:'#0f172a'}}><span style={{fontWeight:'800'}}>Jane</span> commented: "Awesome!"</div>
               <div style={{fontSize:'11px',color:'#64748b',marginTop:'4px',fontWeight:'600'}}>Yesterday</div>
             </div>
          </div>
        </div>
      </div>
    );
  };` },
  { id: 'dm_inbox_pro', cat: 'social', name: 'DM Inbox Interface', nameFr: 'Boîte de Réception', icon: '📥', tags: ['Social', 'Messaging'], code: `const App = () => {
    return (
      <div style={{fontFamily:'system-ui',background:'#0f172a',padding:'24px',borderRadius:'24px',maxWidth:'360px',margin:'0 auto',color:'#fff'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
          <h3 style={{margin:0,fontSize:'20px',fontWeight:'900'}}>Inbox</h3>
          <button style={{width:'36px',height:'36px',borderRadius:'18px',background:'rgba(255,255,255,0.1)',border:'none',color:'#fff',fontSize:'20px',cursor:'pointer'}}>+</button>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
            <div style={{position:'relative'}}>
              <div style={{width:'48px',height:'48px',background:'#3b82f6',borderRadius:'24px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'18px'}}>A</div>
              <div style={{position:'absolute',right:0,bottom:0,width:'12px',height:'12px',background:'#10b981',border:'2px solid #0f172a',borderRadius:'50%'}}/>
            </div>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}><span style={{fontWeight:'800',fontSize:'15px'}}>Alex Smith</span><span style={{fontSize:'12px',color:'#94a3b8'}}>12:45</span></div>
              <div style={{fontSize:'13px',color:'#e2e8f0',fontWeight:'600'}}>Are we still on for tomorrow?</div>
            </div>
            <div style={{width:'8px',height:'8px',background:'#3b82f6',borderRadius:'50%'}}/>
          </div>
          <div style={{display:'flex',gap:'12px',alignItems:'center'}}>
            <div style={{width:'48px',height:'48px',background:'#ec4899',borderRadius:'24px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold',fontSize:'18px'}}>E</div>
            <div style={{flex:1}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:'4px'}}><span style={{fontWeight:'800',fontSize:'15px'}}>Emma W.</span><span style={{fontSize:'12px',color:'#64748b'}}>Yesterday</span></div>
              <div style={{fontSize:'13px',color:'#64748b'}}>Thanks for the help!</div>
            </div>
          </div>
        </div>
      </div>
    );
  };` }
];
export default PRO_SOCIAL;
