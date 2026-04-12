import React from 'react';
import {
    LayoutDashboard, Table2, Bell, MessageSquare, Settings,
    CreditCard, Upload, Map, User, Calendar, Kanban, BarChart3,
    ShieldCheck, Search, Menu, Star, ChevronRight, LogIn, Loader
} from 'lucide-react';

export const getToolboxProCategories = (t) => [
    {
        name: 'Dashboard',
        items: [
            {
                name: 'KPI Row (4 cards)',
                icon: <LayoutDashboard size={16} />,
                snippet: `<div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'20px'}}>
  {[{label:'Revenue',value:'$48,295',diff:'+12%',color:'#6366f1'},{label:'Users',value:'3,842',diff:'+8%',color:'#10b981'},{label:'Orders',value:'1,204',diff:'+5%',color:'#f59e0b'},{label:'Churn',value:'2.4%',diff:'-0.3%',color:'#ef4444'}].map((k,i)=>(
    <div key={i} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'16px',padding:'24px'}}>
      <div style={{fontSize:'13px',color:'#64748b',fontWeight:600}}>{k.label}</div>
      <div style={{fontSize:'28px',fontWeight:900,color:'#0f172a',margin:'8px 0'}}>{k.value}</div>
      <div style={{fontSize:'13px',color:k.color,fontWeight:700}}>{k.diff} vs last month</div>
    </div>
  ))}
</div>`
            },
            {
                name: 'Sidebar Layout',
                icon: <LayoutDashboard size={16} />,
                snippet: `<div style={{display:'flex',height:'400px',border:'1px solid #e2e8f0',borderRadius:'20px',overflow:'hidden'}}>
  <div style={{width:'200px',background:'#0f172a',padding:'24px',display:'flex',flexDirection:'column',gap:'8px'}}>
    <div style={{color:'#fff',fontWeight:900,fontSize:'18px',marginBottom:'16px'}}>MyApp</div>
    {['Dashboard','Analytics','Users','Settings'].map((item,i)=>(
      <div key={i} style={{padding:'10px 16px',borderRadius:'10px',color:i===0?'#fff':'#94a3b8',background:i===0?'rgba(99,102,241,0.3)':'transparent',cursor:'pointer',fontSize:'14px',fontWeight:600}}>{item}</div>
    ))}
  </div>
  <div style={{flex:1,padding:'32px',background:'#f8fafc'}}>
    <h2 style={{margin:'0 0 24px',color:'#0f172a'}}>Dashboard Overview</h2>
    <p style={{color:'#64748b'}}>Your main content goes here.</p>
  </div>
</div>`
            },
            {
                name: 'Activity Feed',
                icon: <LayoutDashboard size={16} />,
                snippet: `<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'16px',padding:'24px',maxWidth:'420px'}}>
  <h3 style={{margin:'0 0 20px',fontSize:'16px',color:'#0f172a'}}>Recent Activity</h3>
  {[{text:'Alice uploaded a new file',time:'2 min ago',color:'#6366f1'},{text:'Order #1042 was shipped',time:'15 min ago',color:'#10b981'},{text:'New user registered',time:'1h ago',color:'#f59e0b'},{text:'Server alert resolved',time:'3h ago',color:'#ef4444'}].map((a,i)=>(
    <div key={i} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'10px 0',borderBottom:i<3?'1px solid #f1f5f9':'none'}}>
      <div style={{width:'8px',height:'8px',borderRadius:'50%',background:a.color,marginTop:'6px',flexShrink:0}}/>
      <div><div style={{fontSize:'14px',color:'#1e293b'}}>{a.text}</div><div style={{fontSize:'12px',color:'#94a3b8'}}>{a.time}</div></div>
    </div>
  ))}
</div>`
            },
        ]
    },
    {
        name: 'Tables & Data',
        items: [
            {
                name: 'Data Table',
                icon: <Table2 size={16} />,
                snippet: `<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'16px',overflow:'hidden'}}>
  <table style={{width:'100%',borderCollapse:'collapse'}}>
    <thead><tr style={{background:'#f8fafc'}}>
      {['Name','Email','Role','Status'].map(h=><th key={h} style={{padding:'14px 20px',textAlign:'left',fontSize:'12px',fontWeight:700,color:'#64748b',textTransform:'uppercase',letterSpacing:'0.05em'}}>{h}</th>)}
    </tr></thead>
    <tbody>
      {[{n:'Alice Martin',e:'alice@example.com',r:'Admin',s:'Active'},{n:'Bob Chen',e:'bob@example.com',r:'Editor',s:'Active'},{n:'Claire Dubois',e:'claire@example.com',r:'Viewer',s:'Inactive'}].map((row,i)=>(
        <tr key={i} style={{borderTop:'1px solid #f1f5f9'}}>
          <td style={{padding:'14px 20px',fontWeight:600,color:'#0f172a'}}>{row.n}</td>
          <td style={{padding:'14px 20px',color:'#64748b'}}>{row.e}</td>
          <td style={{padding:'14px 20px',color:'#475569'}}>{row.r}</td>
          <td style={{padding:'14px 20px'}}><span style={{padding:'4px 10px',borderRadius:'99px',fontSize:'12px',fontWeight:700,background:row.s==='Active'?'#dcfce7':'#fee2e2',color:row.s==='Active'?'#166534':'#991b1b'}}>{row.s}</span></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>`
            },
            {
                name: 'Search & Filter Bar',
                icon: <Search size={16} />,
                snippet: `<div style={{display:'flex',gap:'12px',alignItems:'center',flexWrap:'wrap'}}>
  <div style={{flex:1,minWidth:'220px',position:'relative'}}>
    <span style={{position:'absolute',left:'14px',top:'50%',transform:'translateY(-50%)',color:'#94a3b8',fontSize:'16px'}}>🔍</span>
    <input placeholder="Search..." style={{width:'100%',boxSizing:'border-box',padding:'12px 14px 12px 40px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px',background:'#fff'}} />
  </div>
  {['All','Active','Pending','Closed'].map((f,i)=>(
    <button key={i} style={{padding:'10px 20px',border:'1px solid #e2e8f0',borderRadius:'10px',background:i===0?'#0f172a':'#fff',color:i===0?'#fff':'#64748b',fontWeight:600,cursor:'pointer',fontSize:'13px'}}>{f}</button>
  ))}
</div>`
            },
        ]
    },
    {
        name: 'Auth & Onboarding',
        items: [
            {
                name: 'Register Form',
                icon: <LogIn size={16} />,
                snippet: `<div style={{background:'#fff',padding:'48px',borderRadius:'24px',boxShadow:'0 20px 40px rgba(0,0,0,0.08)',maxWidth:'420px',margin:'0 auto'}}>
  <h2 style={{margin:'0 0 8px',fontSize:'28px',fontWeight:900,color:'#0f172a'}}>Create account</h2>
  <p style={{color:'#64748b',margin:'0 0 32px'}}>Start your 14-day free trial. No credit card.</p>
  <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
    <div style={{display:'flex',gap:'12px'}}>
      <input placeholder="First name" style={{flex:1,padding:'14px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px'}} />
      <input placeholder="Last name" style={{flex:1,padding:'14px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px'}} />
    </div>
    <input type="email" placeholder="Email address" style={{padding:'14px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px'}} />
    <input type="password" placeholder="Password (8+ characters)" style={{padding:'14px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px'}} />
    <button style={{padding:'16px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer',fontSize:'16px'}}>Create Free Account</button>
    <p style={{textAlign:'center',color:'#94a3b8',fontSize:'13px',margin:0}}>Already have an account? <a href="#" style={{color:'#6366f1',fontWeight:600}}>Sign in</a></p>
  </div>
</div>`
            },
            {
                name: 'Onboarding Steps',
                icon: <LogIn size={16} />,
                snippet: `<div style={{maxWidth:'600px',margin:'0 auto',padding:'40px',background:'#fff',borderRadius:'24px',boxShadow:'0 10px 30px rgba(0,0,0,0.06)'}}>
  <div style={{display:'flex',justifyContent:'space-between',marginBottom:'40px'}}>
    {['Profile','Preferences','Team','Done'].map((step,i)=>(
      <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'8px'}}>
        <div style={{width:'36px',height:'36px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'14px',background:i<=1?'#6366f1':'#f1f5f9',color:i<=1?'#fff':'#94a3b8'}}>{i<1?'✓':i+1}</div>
        <span style={{fontSize:'12px',fontWeight:600,color:i<=1?'#6366f1':'#94a3b8'}}>{step}</span>
      </div>
    ))}
  </div>
  <h3 style={{margin:'0 0 24px',color:'#0f172a'}}>Set up your preferences</h3>
  <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
    {['Dark Mode','Email Notifications','Weekly Digest','Public Profile'].map((opt,i)=>(
      <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'14px',border:'1px solid #e2e8f0',borderRadius:'12px'}}>
        <span style={{fontWeight:600,color:'#1e293b'}}>{opt}</span>
        <div style={{width:'44px',height:'24px',borderRadius:'99px',background:i%2===0?'#6366f1':'#e2e8f0',cursor:'pointer',position:'relative'}}>
          <div style={{width:'18px',height:'18px',borderRadius:'50%',background:'#fff',position:'absolute',top:'3px',left:i%2===0?'23px':'3px',transition:'left 0.2s'}}/>
        </div>
      </div>
    ))}
  </div>
  <button style={{marginTop:'24px',width:'100%',padding:'14px',background:'#0f172a',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer',fontSize:'15px'}}>Continue →</button>
</div>`
            },
        ]
    },
    {
        name: 'Notifications & Alerts',
        items: [
            {
                name: 'Toast Stack',
                icon: <Bell size={16} />,
                snippet: `<div style={{display:'flex',flexDirection:'column',gap:'12px',maxWidth:'380px'}}>
  {[{type:'success',msg:'Changes saved successfully!',icon:'✅'},{type:'error',msg:'Failed to delete. Try again.',icon:'❌'},{type:'warning',msg:'Your trial expires in 3 days.',icon:'⚠️'},{type:'info',msg:'New update available now.',icon:'ℹ️'}].map((t,i)=>(
    <div key={i} style={{display:'flex',gap:'12px',alignItems:'center',padding:'14px 18px',borderRadius:'14px',background:'#fff',boxShadow:'0 4px 12px rgba(0,0,0,0.08)',border:'1px solid '+({'success':'#bbf7d0','error':'#fecaca','warning':'#fed7aa','info':'#bfdbfe'}[t.type])}}>
      <span style={{fontSize:'18px'}}>{t.icon}</span>
      <span style={{flex:1,fontSize:'14px',fontWeight:600,color:'#1e293b'}}>{t.msg}</span>
      <span style={{cursor:'pointer',color:'#94a3b8',fontSize:'18px'}}>×</span>
    </div>
  ))}
</div>`
            },
            {
                name: 'Notification Bell',
                icon: <Bell size={16} />,
                snippet: `<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'20px',padding:'20px',maxWidth:'360px',boxShadow:'0 8px 24px rgba(0,0,0,0.06)'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
    <h4 style={{margin:0,color:'#0f172a'}}>Notifications <span style={{background:'#ef4444',color:'#fff',borderRadius:'99px',padding:'2px 8px',fontSize:'12px',marginLeft:'8px'}}>4</span></h4>
    <button style={{border:'none',background:'none',color:'#6366f1',fontWeight:700,cursor:'pointer',fontSize:'13px'}}>Mark all read</button>
  </div>
  {[{msg:'Alice commented on your post',time:'2m',read:false},{msg:'Your export is ready',time:'10m',read:false},{msg:'3 new followers',time:'1h',read:true},{msg:'Invoice #1042 paid',time:'2h',read:true}].map((n,i)=>(
    <div key={i} style={{display:'flex',gap:'12px',padding:'10px',borderRadius:'10px',background:n.read?'transparent':'rgba(99,102,241,0.05)',marginBottom:'4px'}}>
      <div style={{width:'8px',height:'8px',borderRadius:'50%',background:n.read?'transparent':'#6366f1',marginTop:'6px',flexShrink:0}}/>
      <div><div style={{fontSize:'13px',color:'#1e293b',fontWeight:n.read?400:600}}>{n.msg}</div><div style={{fontSize:'11px',color:'#94a3b8'}}>{n.time} ago</div></div>
    </div>
  ))}
</div>`
            },
        ]
    },
    {
        name: 'Chat & Messaging',
        items: [
            {
                name: 'Chat Window',
                icon: <MessageSquare size={16} />,
                snippet: `<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'20px',overflow:'hidden',maxWidth:'440px',display:'flex',flexDirection:'column',height:'400px'}}>
  <div style={{padding:'16px 20px',borderBottom:'1px solid #f1f5f9',display:'flex',alignItems:'center',gap:'12px',background:'#f8fafc'}}>
    <div style={{width:'36px',height:'36px',borderRadius:'50%',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>A</div>
    <div><div style={{fontWeight:700,color:'#0f172a'}}>Alice Martin</div><div style={{fontSize:'12px',color:'#10b981'}}>● Online</div></div>
  </div>
  <div style={{flex:1,padding:'16px',display:'flex',flexDirection:'column',gap:'12px',overflowY:'auto'}}>
    <div style={{alignSelf:'flex-start',background:'#f1f5f9',padding:'10px 14px',borderRadius:'0 12px 12px 12px',maxWidth:'70%',fontSize:'14px',color:'#1e293b'}}>Hey! How is the project going?</div>
    <div style={{alignSelf:'flex-end',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',padding:'10px 14px',borderRadius:'12px 0 12px 12px',maxWidth:'70%',fontSize:'14px',color:'#fff'}}>Going great! Nearly done 🚀</div>
    <div style={{alignSelf:'flex-start',background:'#f1f5f9',padding:'10px 14px',borderRadius:'0 12px 12px 12px',maxWidth:'70%',fontSize:'14px',color:'#1e293b'}}>Awesome! Can't wait to see it.</div>
  </div>
  <div style={{padding:'12px',borderTop:'1px solid #f1f5f9',display:'flex',gap:'8px'}}>
    <input placeholder="Type a message..." style={{flex:1,padding:'10px 14px',border:'1px solid #e2e8f0',borderRadius:'10px',outline:'none',fontSize:'14px'}} />
    <button style={{padding:'10px 20px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'10px',fontWeight:700,cursor:'pointer'}}>Send</button>
  </div>
</div>`
            },
        ]
    },
    {
        name: 'Profile & User',
        items: [
            {
                name: 'Profile Card',
                icon: <User size={16} />,
                snippet: `<div style={{background:'#fff',borderRadius:'24px',overflow:'hidden',maxWidth:'360px',boxShadow:'0 10px 30px rgba(0,0,0,0.08)',border:'1px solid #e2e8f0'}}>
  <div style={{height:'100px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)'}}/>
  <div style={{padding:'0 24px 24px',textAlign:'center'}}>
    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="Avatar" style={{width:'80px',height:'80px',borderRadius:'50%',border:'4px solid #fff',marginTop:'-40px',display:'block',margin:'-40px auto 16px'}} />
    <h3 style={{margin:'0 0 4px',color:'#0f172a',fontSize:'20px'}}>Alice Martin</h3>
    <p style={{margin:'0 0 16px',color:'#64748b',fontSize:'14px'}}>Senior Product Designer · Paris</p>
    <div style={{display:'flex',justifyContent:'center',gap:'32px',margin:'16px 0',padding:'16px 0',borderTop:'1px solid #f1f5f9',borderBottom:'1px solid #f1f5f9'}}>
      {[{n:'284',l:'Projects'},{n:'12k',l:'Followers'},{n:'4.9',l:'Rating'}].map((s,i)=>(
        <div key={i} style={{textAlign:'center'}}><div style={{fontWeight:900,fontSize:'18px',color:'#0f172a'}}>{s.n}</div><div style={{fontSize:'12px',color:'#94a3b8'}}>{s.l}</div></div>
      ))}
    </div>
    <button style={{width:'100%',padding:'12px',background:'#0f172a',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer'}}>Follow</button>
  </div>
</div>`
            },
            {
                name: 'Settings Panel',
                icon: <Settings size={16} />,
                snippet: `<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'20px',overflow:'hidden',maxWidth:'480px'}}>
  <div style={{padding:'20px 24px',borderBottom:'1px solid #f1f5f9'}}><h3 style={{margin:0,color:'#0f172a'}}>Account Settings</h3></div>
  {[{label:'Full Name',value:'Alice Martin',type:'text'},{label:'Email',value:'alice@example.com',type:'email'},{label:'Role',value:'Administrator',type:'text'}].map((field,i)=>(
    <div key={i} style={{padding:'16px 24px',borderBottom:'1px solid #f1f5f9',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'16px'}}>
      <label style={{fontSize:'14px',fontWeight:600,color:'#475569',minWidth:'100px'}}>{field.label}</label>
      <input defaultValue={field.value} type={field.type} style={{flex:1,padding:'10px 14px',border:'1px solid #e2e8f0',borderRadius:'10px',outline:'none',fontSize:'14px',color:'#0f172a'}} />
    </div>
  ))}
  <div style={{padding:'16px 24px',display:'flex',gap:'12px',justifyContent:'flex-end'}}>
    <button style={{padding:'10px 20px',border:'1px solid #e2e8f0',borderRadius:'10px',background:'#fff',color:'#64748b',fontWeight:600,cursor:'pointer'}}>Cancel</button>
    <button style={{padding:'10px 20px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'10px',fontWeight:700,cursor:'pointer'}}>Save Changes</button>
  </div>
</div>`
            },
        ]
    },
    {
        name: 'E-Commerce Pro',
        items: [
            {
                name: 'Shopping Cart',
                icon: <CreditCard size={16} />,
                snippet: `<div style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'20px',padding:'24px',maxWidth:'480px'}}>
  <h3 style={{margin:'0 0 20px',color:'#0f172a'}}>Your Cart (3)</h3>
  {[{name:'Smart Watch Pro',price:'$299',qty:1},{name:'Wireless Earbuds',price:'$149',qty:2},{name:'USB-C Hub',price:'$79',qty:1}].map((item,i)=>(
    <div key={i} style={{display:'flex',gap:'16px',alignItems:'center',padding:'14px 0',borderBottom:'1px solid #f1f5f9'}}>
      <div style={{width:'52px',height:'52px',borderRadius:'12px',background:'#f1f5f9',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'24px'}}>📦</div>
      <div style={{flex:1}}>
        <div style={{fontWeight:700,color:'#0f172a',fontSize:'14px'}}>{item.name}</div>
        <div style={{color:'#64748b',fontSize:'13px'}}>Qty: {item.qty}</div>
      </div>
      <div style={{fontWeight:700,color:'#0f172a'}}>{item.price}</div>
    </div>
  ))}
  <div style={{display:'flex',justifyContent:'space-between',padding:'16px 0',fontWeight:700,fontSize:'18px',color:'#0f172a'}}>
    <span>Total</span><span>$676</span>
  </div>
  <button style={{width:'100%',padding:'14px',background:'linear-gradient(135deg,#6366f1,#8b5cf6)',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer',fontSize:'16px'}}>Checkout →</button>
</div>`
            },
            {
                name: 'Checkout Form',
                icon: <CreditCard size={16} />,
                snippet: `<div style={{background:'#fff',padding:'32px',borderRadius:'24px',border:'1px solid #e2e8f0',maxWidth:'480px'}}>
  <h3 style={{margin:'0 0 24px',color:'#0f172a'}}>Payment Details</h3>
  <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
    <input placeholder="Cardholder name" style={{padding:'12px 16px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px'}} />
    <div style={{padding:'12px 16px',border:'1px solid #e2e8f0',borderRadius:'12px',fontSize:'14px',color:'#94a3b8',display:'flex',alignItems:'center',gap:'12px'}}>
      <span>💳</span><span>4242 4242 4242 4242</span>
    </div>
    <div style={{display:'flex',gap:'12px'}}>
      <input placeholder="MM / YY" style={{flex:1,padding:'12px 16px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px'}} />
      <input placeholder="CVC" style={{flex:1,padding:'12px 16px',border:'1px solid #e2e8f0',borderRadius:'12px',outline:'none',fontSize:'14px'}} />
    </div>
    <button style={{padding:'14px',background:'#10b981',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer',fontSize:'15px',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px'}}><span>🔒</span> Pay $676</button>
    <p style={{textAlign:'center',color:'#94a3b8',fontSize:'12px',margin:0}}>Secured by 256-bit SSL encryption</p>
  </div>
</div>`
            },
        ]
    },
    {
        name: 'Kanban & Tasks',
        items: [
            {
                name: 'Kanban Board',
                icon: <Kanban size={16} />,
                snippet: `<div style={{display:'flex',gap:'16px',overflowX:'auto',paddingBottom:'8px'}}>
  {[{col:'📋 Todo',color:'#e0e7ff',tasks:['Design login page','Set up DB','Write tests']},{col:'⚡ In Progress',color:'#fef3c7',tasks:['Build API','Deploy staging']},{col:'✅ Done',color:'#dcfce7',tasks:['Init project','Set CI/CD','Design system']}].map((col,i)=>(
    <div key={i} style={{minWidth:'240px',background:'#f8fafc',borderRadius:'16px',padding:'16px'}}>
      <div style={{fontWeight:700,color:'#0f172a',marginBottom:'12px',fontSize:'14px'}}>{col.col}</div>
      {col.tasks.map((task,j)=>(
        <div key={j} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'10px',padding:'12px',marginBottom:'8px',fontSize:'13px',color:'#1e293b',cursor:'grab',boxShadow:'0 2px 4px rgba(0,0,0,0.04)'}}>{task}</div>
      ))}
      <button style={{width:'100%',padding:'8px',border:'2px dashed #cbd5e1',borderRadius:'10px',background:'none',color:'#94a3b8',cursor:'pointer',fontSize:'13px',marginTop:'4px'}}>+ Add card</button>
    </div>
  ))}
</div>`
            },
        ]
    },
    {
        name: 'Media & Upload',
        items: [
            {
                name: 'File Dropzone',
                icon: <Upload size={16} />,
                snippet: `<div style={{border:'2px dashed #cbd5e1',borderRadius:'20px',padding:'48px 32px',textAlign:'center',background:'#f8fafc',maxWidth:'480px',cursor:'pointer',transition:'all 0.2s'}} onMouseOver={e=>{e.currentTarget.style.borderColor='#6366f1';e.currentTarget.style.background='rgba(99,102,241,0.04)'}} onMouseOut={e=>{e.currentTarget.style.borderColor='#cbd5e1';e.currentTarget.style.background='#f8fafc'}}>
  <div style={{fontSize:'48px',marginBottom:'16px'}}>☁️</div>
  <h3 style={{margin:'0 0 8px',color:'#0f172a'}}>Drop files here</h3>
  <p style={{margin:'0 0 20px',color:'#64748b',fontSize:'14px'}}>Supports PDF, PNG, JPG, MP4 up to 50MB</p>
  <button style={{padding:'12px 28px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer'}}>Browse Files</button>
</div>`
            },
            {
                name: 'Image Gallery Grid',
                icon: <Upload size={16} />,
                snippet: `<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',maxWidth:'600px'}}>
  {['1523275335684-37898b6baf30','1572635196237-14b3f281503f','1593642632559-0c6d3fc62b89','1587829741301-dc798b82a2f0','1491933382734-91922175b0a4','1550751827-4bd374c3f58b'].map((id,i)=>(
    <div key={i} style={{position:'relative',borderRadius:'14px',overflow:'hidden',aspectRatio:'1',cursor:'pointer'}} onMouseOver={e=>e.currentTarget.querySelector('.overlay').style.opacity='1'} onMouseOut={e=>e.currentTarget.querySelector('.overlay').style.opacity='0'}>
      <img src={"https://images.unsplash.com/photo-"+id+"?w=300&q=80"} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} />
      <div className="overlay" style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.4)',display:'flex',alignItems:'center',justifyContent:'center',opacity:0,transition:'opacity 0.2s',color:'#fff',fontSize:'24px'}}>🔍</div>
    </div>
  ))}
</div>`
            },
        ]
    },
    {
        name: 'SaaS Landing',
        items: [
            {
                name: 'Pricing Plans',
                icon: <Star size={16} />,
                snippet: `<section style={{padding:'60px 20px',background:'#f8fafc'}}>
  <h2 style={{textAlign:'center',fontSize:'36px',fontWeight:900,color:'#0f172a',margin:'0 0 8px'}}>Simple pricing</h2>
  <p style={{textAlign:'center',color:'#64748b',margin:'0 0 48px'}}>Start free. Scale as you grow.</p>
  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'24px',maxWidth:'960px',margin:'0 auto'}}>
    {[{plan:'Starter',price:'$0',desc:'Perfect for side projects',features:['3 projects','1GB storage','Community support'],highlight:false},{plan:'Pro',price:'$49',desc:'For growing teams',features:['Unlimited projects','50GB storage','Priority support','Team collaboration'],highlight:true},{plan:'Enterprise',price:'$199',desc:'For large organizations',features:['Everything in Pro','Custom integrations','SLA guarantee','Dedicated manager'],highlight:false}].map((p,i)=>(
      <div key={i} style={{padding:'32px',borderRadius:'20px',background:p.highlight?'linear-gradient(135deg,#6366f1,#8b5cf6)':'#fff',border:p.highlight?'none':'1px solid #e2e8f0',color:p.highlight?'#fff':'#0f172a',position:'relative'}}>
        {p.highlight&&<div style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)',background:'#f59e0b',color:'#fff',padding:'4px 16px',borderRadius:'99px',fontSize:'12px',fontWeight:700}}>MOST POPULAR</div>}
        <div style={{fontWeight:700,fontSize:'16px',opacity:p.highlight?1:0.7,marginBottom:'8px'}}>{p.plan}</div>
        <div style={{fontSize:'40px',fontWeight:900,margin:'12px 0 4px'}}>{p.price}<span style={{fontSize:'16px',fontWeight:400,opacity:0.7}}>/mo</span></div>
        <div style={{fontSize:'13px',opacity:0.7,marginBottom:'24px'}}>{p.desc}</div>
        {p.features.map((f,j)=><div key={j} style={{display:'flex',gap:'8px',marginBottom:'8px',fontSize:'14px'}}><span>✓</span>{f}</div>)}
        <button style={{marginTop:'20px',width:'100%',padding:'14px',borderRadius:'12px',border:'none',background:p.highlight?'#fff':'#0f172a',color:p.highlight?'#6366f1':'#fff',fontWeight:700,cursor:'pointer',fontSize:'15px'}}>Get {p.plan}</button>
      </div>
    ))}
  </div>
</section>`
            },
            {
                name: 'FAQ Accordion',
                icon: <ChevronRight size={16} />,
                snippet: `<div style={{maxWidth:'640px',margin:'0 auto'}}>
  <h2 style={{textAlign:'center',fontSize:'32px',fontWeight:900,color:'#0f172a',marginBottom:'32px'}}>Frequently Asked</h2>
  {[{q:'Is there a free trial?',a:'Yes! You get 14 days free with full access to all Pro features, no credit card required.'},{q:'Can I cancel anytime?',a:'Absolutely. Cancel with one click from your settings. No questions asked.'},{q:'Do you support multiple users?',a:'Yes, our Pro and Enterprise plans support unlimited team members with role management.'},{q:'What payment methods are accepted?',a:'We accept all major credit cards, PayPal, and bank transfers for Enterprise.'}].map((item,i)=>(
    <div key={i} style={{borderBottom:'1px solid #f1f5f9',padding:'20px 0'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
        <span style={{fontWeight:700,color:'#0f172a',fontSize:'16px'}}>{item.q}</span>
        <span style={{color:'#6366f1',fontSize:'20px',fontWeight:700}}>+</span>
      </div>
      <p style={{margin:'12px 0 0',color:'#64748b',lineHeight:'1.7',fontSize:'15px'}}>{item.a}</p>
    </div>
  ))}
</div>`
            },
            {
                name: 'Logo Cloud',
                icon: <Star size={16} />,
                snippet: `<section style={{padding:'60px 20px',textAlign:'center',background:'#fff'}}>
  <p style={{color:'#94a3b8',fontSize:'13px',fontWeight:700,textTransform:'uppercase',letterSpacing:'2px',marginBottom:'32px'}}>Trusted by teams at</p>
  <div style={{display:'flex',gap:'40px',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
    {['Stripe','Notion','Vercel','Linear','Figma','GitHub'].map((brand,i)=>(
      <div key={i} style={{fontSize:'22px',fontWeight:900,color:'#94a3b8',letterSpacing:'-0.5px',filter:'grayscale(1)',opacity:0.6}}>{brand}</div>
    ))}
  </div>
</section>`
            },
        ]
    },
    {
        name: 'Navigation Pro',
        items: [
            {
                name: 'Mobile Menu',
                icon: <Menu size={16} />,
                snippet: `<div style={{background:'#0f172a',borderRadius:'20px',overflow:'hidden',maxWidth:'320px'}}>
  <div style={{padding:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
    <span style={{color:'#fff',fontWeight:900,fontSize:'20px'}}>Aura.</span>
    <span style={{color:'#fff',fontSize:'24px',cursor:'pointer'}}>✕</span>
  </div>
  {['Home','Features','Pricing','Blog','Contact'].map((item,i)=>(
    <div key={i} style={{padding:'16px 24px',color:i===0?'#a5b4fc':'#94a3b8',fontWeight:i===0?700:500,borderBottom:'1px solid rgba(255,255,255,0.05)',cursor:'pointer',fontSize:'16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
      {item}<span style={{opacity:0.4}}>›</span>
    </div>
  ))}
  <div style={{padding:'20px'}}><button style={{width:'100%',padding:'14px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer',fontSize:'15px'}}>Get Started Free</button></div>
</div>`
            },
            {
                name: 'Breadcrumbs',
                icon: <ChevronRight size={16} />,
                snippet: `<div style={{display:'flex',alignItems:'center',gap:'8px',fontSize:'14px'}}>
  {['Home','Dashboard','Projects','AuraGen v2'].map((crumb,i,arr)=>(
    <React.Fragment key={i}>
      <span style={{color:i===arr.length-1?'#0f172a':'#6366f1',fontWeight:i===arr.length-1?700:500,cursor:i<arr.length-1?'pointer':'default'}}>{crumb}</span>
      {i<arr.length-1&&<span style={{color:'#cbd5e1'}}>›</span>}
    </React.Fragment>
  ))}
</div>`
            },
        ]
    },
    {
        name: 'Loaders & States',
        items: [
            {
                name: 'Skeleton Cards',
                icon: <Loader size={16} />,
                snippet: `<div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'20px',maxWidth:'700px'}}>
  {[1,2,3].map(i=>(
    <div key={i} style={{background:'#fff',border:'1px solid #e2e8f0',borderRadius:'16px',padding:'20px'}}>
      <div style={{height:'120px',background:'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',backgroundSize:'200% 100%',borderRadius:'10px',marginBottom:'16px',animation:'pulse 1.5s infinite'}}/>
      <div style={{height:'16px',background:'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',backgroundSize:'200% 100%',borderRadius:'6px',marginBottom:'8px'}}/>
      <div style={{height:'12px',background:'linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%)',backgroundSize:'200% 100%',borderRadius:'6px',width:'70%'}}/>
    </div>
  ))}
</div>`
            },
            {
                name: 'Empty State',
                icon: <Loader size={16} />,
                snippet: `<div style={{textAlign:'center',padding:'80px 40px',maxWidth:'400px',margin:'0 auto'}}>
  <div style={{fontSize:'72px',marginBottom:'24px'}}>📂</div>
  <h3 style={{margin:'0 0 12px',fontSize:'22px',fontWeight:800,color:'#0f172a'}}>No projects yet</h3>
  <p style={{color:'#64748b',margin:'0 0 28px',lineHeight:'1.6'}}>You haven't created any projects yet. Start by creating your first one to get going.</p>
  <button style={{padding:'14px 32px',background:'#6366f1',color:'#fff',border:'none',borderRadius:'14px',fontWeight:700,cursor:'pointer',fontSize:'15px'}}>+ Create Project</button>
</div>`
            },
        ]
    },
    {
        name: 'Security & Verify',
        items: [
            {
                name: 'OTP Input',
                icon: <ShieldCheck size={16} />,
                snippet: `<div style={{textAlign:'center',padding:'40px',background:'#fff',borderRadius:'24px',maxWidth:'380px',margin:'0 auto',boxShadow:'0 10px 30px rgba(0,0,0,0.06)',border:'1px solid #e2e8f0'}}>
  <div style={{fontSize:'40px',marginBottom:'16px'}}>🔐</div>
  <h3 style={{margin:'0 0 8px',color:'#0f172a'}}>Verify your identity</h3>
  <p style={{color:'#64748b',margin:'0 0 28px',fontSize:'14px'}}>Enter the 6-digit code sent to alice@example.com</p>
  <div style={{display:'flex',gap:'10px',justifyContent:'center',marginBottom:'24px'}}>
    {[1,2,3,4,5,6].map(n=>(
      <input key={n} maxLength={1} style={{width:'44px',height:'52px',textAlign:'center',fontSize:'22px',fontWeight:700,border:'2px solid #e2e8f0',borderRadius:'12px',outline:'none',color:'#0f172a'}} onFocus={e=>e.target.style.borderColor='#6366f1'} onBlur={e=>e.target.style.borderColor='#e2e8f0'} />
    ))}
  </div>
  <button style={{padding:'14px',width:'100%',background:'#6366f1',color:'#fff',border:'none',borderRadius:'12px',fontWeight:700,cursor:'pointer',fontSize:'15px'}}>Verify Code</button>
  <p style={{marginTop:'16px',color:'#94a3b8',fontSize:'13px'}}>Didn't receive it? <span style={{color:'#6366f1',fontWeight:700,cursor:'pointer'}}>Resend</span></p>
</div>`
            },
        ]
    },
];
