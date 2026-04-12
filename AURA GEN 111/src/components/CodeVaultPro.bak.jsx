const VAULT_PRO = [
  // ─── DASHBOARDS & BUSINESS ───
  {
    id: 'crm_lite',
    cat: 'biz',
    name: 'CRM Sales Dashboard',
    nameFr: 'Tableau de bord Ventes',
    icon: '📈',
    tags: ['Dashboard', 'Modern'],
    code: `const App = () => {
  const [data] = React.useState([
    { id: 1, name: 'Acme Corp', value: 12500, status: 'Closed' },
    { id: 2, name: 'Globex', value: 8900, status: 'Negotiation' },
    { id: 3, name: 'Soylent Corp', value: 4500, status: 'Lead' },
    { id: 4, name: 'Initech', value: 15600, status: 'Closed' },
  ]);
  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', fontFamily: 'system-ui' }}>
      <h3 style={{ margin: '0 0 16px', color: '#1e293b' }}>🚀 Sales Pipeline</h3>
      <div style={{ display: 'grid', gap: '12px' }}>
        {data.map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <span style={{ fontWeight: 600 }}>{item.name}</span>
            <span style={{ color: '#6366f1', fontWeight: 700 }}>${item.value.toLocaleString()}</span>
            <span style={{ fontSize: '12px', padding: '2px 8px', borderRadius: '99px', background: item.status === 'Closed' ? '#dcfce7' : '#fef9c3', color: item.status === 'Closed' ? '#166534' : '#854d0e' }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'invoice_gen',
    cat: 'biz',
    name: 'Simple Invoice Builder',
    nameFr: 'Générateur de Factures',
    icon: '🧾',
    tags: ['Utility', 'Business'],
    code: `const App = () => {
  const [items, setItems] = React.useState([{ desc: 'Web Design', price: 1200 }]);
  const total = items.reduce((sum, i) => sum + i.price, 0);
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
        <h2 style={{ margin: 0 }}>INVOICE</h2>
        <div style={{ textAlign: 'right', fontSize: '13px', color: '#64748b' }}>#INV-2026-001</div>
      </div>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span>{it.desc}</span>
          <span style={{ fontWeight: 700 }}>${it.price}</span>
        </div>
      ))}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <div style={{ fontSize: '14px', color: '#64748b' }}>Total Amount</div>
        <div style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a' }}>${total.toLocaleString()}</div>
      </div>
      <button onClick={() => alert('Printing...')} style={{ width: '100%', marginTop: '24px', padding: '12px', background: '#000', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Print Invoice</button>
    </div>
  );
};`
  },
  {
    id: 'inventory_track',
    cat: 'biz',
    name: 'Stock Inventory Tracker',
    nameFr: 'Suivi de Stock',
    icon: '📦',
    tags: ['Data', 'Management'],
    code: `const App = () => {
  const [stock, setStock] = React.useState([
    { id: 1, item: 'Laptop Pro', qty: 12 },
    { id: 2, item: 'Keyboard Mini', qty: 45 },
    { id: 3, item: 'USB-C Cable', qty: 5 },
  ]);
  const update = (id, delta) => setStock(s => s.map(x => x.id === id ? { ...x, qty: Math.max(0, x.qty + delta) } : x));
  return (
    <div style={{ padding: '20px', background: '#111827', color: '#fff', borderRadius: '16px' }}>
      <h3 style={{ margin: '0 0 16px' }}>📦 Inventory</h3>
      {stock.map(x => (
        <div key={x.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', background: '#1f2937', padding: '10px', borderRadius: '8px' }}>
          <span>{x.item}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button onClick={() => update(x.id, -1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: 'none', background: '#ef4444', color: '#fff' }}>-</button>
            <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 700, color: x.qty < 10 ? '#f59e0b' : '#10b981' }}>{x.qty}</span>
            <button onClick={() => update(x.id, 1)} style={{ width: '24px', height: '24px', borderRadius: '50%', border: 'none', background: '#10b981', color: '#fff' }}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};`
  },
  {
    id: 'expense_report',
    cat: 'biz',
    name: 'Business Expense Report',
    nameFr: 'Rapport de Dépenses',
    icon: '📊',
    tags: ['Financial', 'Dashboard'],
    code: `const App = () => {
  const data = [
    { cat: 'Travel', amt: 450, color: '#6366f1' },
    { cat: 'Software', amt: 280, color: '#10b981' },
    { cat: 'Marketing', amt: 600, color: '#f59e0b' },
    { cat: 'Office', amt: 120, color: '#ec4899' },
  ];
  const max = Math.max(...data.map(d => d.amt));
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 20px' }}>Monthly Expenses</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {data.map(d => (
          <div key={d.cat}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
              <span style={{ fontWeight: 600 }}>{d.cat}</span>
              <span style={{ color: '#64748b' }}>${d.amt}</span>
            </div>
            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: (d.amt/max*100)+'%', height: '100%', background: d.color, borderRadius: '4px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'meeting_timer',
    cat: 'biz',
    name: 'Meeting Cost Timer',
    nameFr: 'Chrono Coût Réunion',
    icon: '⏳',
    tags: ['Utility', 'Real-time'],
    code: `const App = () => {
  const [attendees, setAttendees] = React.useState(5);
  const [avgSalary, setAvgSalary] = React.useState(80);
  const [seconds, setSeconds] = React.useState(0);
  const [active, setActive] = React.useState(false);
  React.useEffect(() => {
    let iv; if (active) iv = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(iv);
  }, [active]);
  const cost = (seconds / 3600) * avgSalary * attendees;
  return (
    <div style={{ padding: '24px', background: '#0f172a', color: '#fff', borderRadius: '20px', textAlign: 'center' }}>
      <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '2px' }}>Meeting Cost</div>
      <div style={{ fontSize: '48px', fontWeight: 900, margin: '10px 0', color: '#22d3ee' }}>${cost.toFixed(2)}</div>
      <div style={{ fontSize: '18px', marginBottom: '20px' }}>{Math.floor(seconds/60)}m {seconds%60}s</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
        <input type="number" value={attendees} onChange={e => setAttendees(+e.target.value)} placeholder="People" style={{ background: '#1e293b', border: 'none', color: '#fff', padding: '10px', borderRadius: '8px' }} />
        <input type="number" value={avgSalary} onChange={e => setAvgSalary(+e.target.value)} placeholder="Avg $/hr" style={{ background: '#1e293b', border: 'none', color: '#fff', padding: '10px', borderRadius: '8px' }} />
      </div>
      <button onClick={() => setActive(!active)} style={{ width: '100%', padding: '12px', background: active ? '#ef4444' : '#10b981', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700 }}>
        {active ? 'Pause Meeting' : 'Start Meeting'}
      </button>
    </div>
  );
};`
  },
  {
    id: 'okr_tracker',
    cat: 'biz',
    name: 'Company OKR Tracker',
    nameFr: 'Suivi Objectifs OKR',
    icon: '🎯',
    tags: ['Business', 'Progress'],
    code: `const App = () => {
  const goals = [
    { title: 'Increase Revenue', progress: 65, status: 'On Track' },
    { title: 'Customer Base', progress: 88, status: 'Ahead' },
    { title: 'App Performance', progress: 40, status: 'At Risk' },
  ];
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 16px', color: '#0f172a' }}>🎯 Q2 Objectives</h3>
      {goals.map(g => (
        <div key={g.title} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '6px' }}>
            <span style={{ fontWeight: 700 }}>{g.title}</span>
            <span style={{ color: g.status === 'At Risk' ? '#ef4444' : '#10b981', fontWeight: 600 }}>{g.status}</span>
          </div>
          <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '5px', overflow: 'hidden' }}>
            <div style={{ width: g.progress+'%', height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '5px' }} />
          </div>
        </div>
      ))}
    </div>
  );
};`
  },
  {
    id: 'lead_form',
    cat: 'biz',
    name: 'Lead Capture Form',
    nameFr: 'Formulaire de Contact',
    icon: '📩',
    tags: ['Marketing', 'Input'],
    code: `const App = () => {
  const [sent, setSent] = React.useState(false);
  const submit = (e) => { e.preventDefault(); setSent(true); };
  if (sent) return <div style={{ padding: '40px', textAlign: 'center', background: '#dcfce7', borderRadius: '20px', color: '#166534' }}><h3>✅ Thank you!</h3><p>We will contact you soon.</p></div>;
  return (
    <div style={{ padding: '30px', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 20px' }}>📩 Get a Quote</h3>
      <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
        <input placeholder="Name" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        <input type="email" placeholder="Email" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
        <textarea placeholder="Tell us about your project" style={{ padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', height: '80px' }} />
        <button style={{ padding: '14px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}>Send Request</button>
      </form>
    </div>
  );
};`
  },
  {
    id: 'biz_card',
    cat: 'biz',
    name: 'Business Card Designer',
    nameFr: 'Éditeur de Cartes de Visite',
    icon: '💳',
    tags: ['Creative', 'Design'],
    code: `const App = () => {
  const [name, setName] = React.useState('John Doe');
  const [role, setRole] = React.useState('Software Architect');
  const [color, setColor] = React.useState('#6366f1');
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ width: '340px', height: '190px', background: color, borderRadius: '12px', padding: '24px', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        <div><div style={{ fontSize: '24px', fontWeight: 900 }}>{name}</div><div style={{ opacity: 0.8 }}>{role}</div></div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: '12px' }}>john@example.com<br/>www.example.com</div>
          <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px' }} />
        </div>
      </div>
      <div style={{ display: 'grid', gap: '8px' }}>
        <input value={name} onChange={e => setName(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }} />
        <input value={role} onChange={e => setRole(e.target.value)} style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }} />
        <input type="color" value={color} onChange={e => setColor(e.target.value)} style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }} />
      </div>
    </div>
  );
};`
  },
  {
    id: 'roi_calc',
    cat: 'biz',
    name: 'Product ROI Calculator',
    nameFr: 'Calculateur ROI',
    icon: '💰',
    tags: ['Financial', 'Calc'],
    code: `const App = () => {
  const [cost, setCost] = React.useState(1000);
  const [rev, setRev] = React.useState(1500);
  const roi = ((rev - cost) / cost * 100).toFixed(1);
  return (
    <div style={{ padding: '24px', background: '#f8fafc', borderRadius: '16px', textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 20px' }}>Product ROI</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        <div><label style={{ fontSize: '12px', display: 'block' }}>Cost</label><input type="number" value={cost} onChange={e => setCost(+e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} /></div>
        <div><label style={{ fontSize: '12px', display: 'block' }}>Revenue</label><input type="number" value={rev} onChange={e => setRev(+e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} /></div>
      </div>
      <div style={{ padding: '20px', background: '#fff', borderRadius: '12px', border: '2px solid #6366f1' }}>
        <div style={{ color: '#6366f1', fontSize: '36px', fontWeight: 900 }}>{roi}%</div>
        <div style={{ color: '#64748b', fontSize: '14px' }}>Return on Investment</div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'payroll_dash',
    cat: 'biz',
    name: 'Payroll Summary',
    nameFr: 'Résumé de Paie',
    icon: '💵',
    tags: ['Business', 'Financial'],
    code: `const App = () => {
  const employees = [
    { name: 'Alice', salary: 5500, status: 'Paid' },
    { name: 'Bob', salary: 4800, status: 'Paid' },
    { name: 'Charlie', salary: 6200, status: 'Pending' },
  ];
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h3 style={{ margin: 0 }}>💵 Payroll</h3>
        <span style={{ fontSize: '13px', color: '#64748b' }}>Total: $16,500</span>
      </div>
      {employees.map(e => (
        <div key={e.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #f1f5f9' }}>
          <span>{e.name}</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700 }}>${e.salary}</div>
            <div style={{ fontSize: '11px', color: e.status === 'Paid' ? '#10b981' : '#f59e0b' }}>{e.status}</div>
          </div>
        </div>
      ))}
    </div>
  );
};`
  },
  // ─── PRODUCTIVITY & TOOLS ───
  {
    id: 'mindmap_lite',
    cat: 'prod',
    name: 'Mind Map Lite',
    nameFr: 'Carte Mentale',
    icon: '🧠',
    tags: ['Visual', 'Interactive'],
    code: `const App = () => {
  const [nodes, setNodes] = React.useState([{ id: 0, text: 'Central Idea', x: 200, y: 150 }]);
  const add = () => setNodes([...nodes, { id: Date.now(), text: 'New Node', x: Math.random()*300, y: Math.random()*250 }]);
  return (
    <div style={{ height: '300px', background: '#f8fafc', position: 'relative', overflow: 'hidden', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <button onClick={add} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, padding: '8px 12px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px' }}>+ Add Node</button>
      {nodes.map(n => (
        <div key={n.id} style={{ position: 'absolute', left: n.x, top: n.y, padding: '10px 16px', background: '#fff', border: '2px solid #6366f1', borderRadius: '20px', fontSize: '13px', fontWeight: 700, cursor: 'move', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          {n.text}
        </div>
      ))}
      <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {nodes.slice(1).map(n => <line key={n.id} x1={nodes[0].x+50} y1={nodes[0].y+20} x2={n.x+50} y2={n.y+20} stroke="#cbd5e1" strokeWidth="2" />)}
      </svg>
    </div>
  );
};`
  },
  {
    id: 'daily_planner',
    cat: 'prod',
    name: 'Daily Planner',
    nameFr: 'Planificateur',
    icon: '📅',
    tags: ['Productivity', 'State'],
    code: `const App = () => {
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  const [tasks, setTasks] = React.useState({});
  const setTask = (h, v) => setTasks({ ...tasks, [h]: v });
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 16px' }}>📅 Daily Schedule</h3>
      {hours.map(h => (
        <div key={h} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', color: '#64748b', minWidth: '40px' }}>{h}</span>
          <input value={tasks[h] || ''} onChange={e => setTask(h, e.target.value)} placeholder="Click to add task..." style={{ flex: 1, padding: '8px', border: 'none', borderBottom: '1px solid #f1f5f9', outline: 'none', fontSize: '14px' }} />
        </div>
      ))}
    </div>
  );
};`
  },
  {
    id: 'password_vault',
    cat: 'prod',
    name: 'Password Vault (Safe)',
    nameFr: 'Coffre-fort Mots de Passe',
    icon: '🔐',
    tags: ['Security', 'Utility'],
    code: `const App = () => {
  const [locked, setLocked] = React.useState(true);
  const [pass, setPass] = React.useState('');
  if (locked) return (
    <div style={{ padding: '40px', textAlign: 'center', background: '#1e293b', borderRadius: '20px', color: '#fff' }}>
      <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
      <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter PIN (1234)" style={{ padding: '10px', borderRadius: '8px', border: 'none', textAlign: 'center', marginBottom: '12px' }} />
      <button onClick={() => pass === '1234' && setLocked(false)} style={{ display: 'block', margin: '0 auto', padding: '10px 20px', background: '#6366f1', border: 'none', borderRadius: '8px', color: '#fff' }}>Unlock</button>
    </div>
  );
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3>Vault</h3>
        <button onClick={() => setLocked(true)} style={{ color: '#ef4444', border: 'none', background: 'none' }}>Lock</button>
      </div>
      <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px', marginBottom: '8px' }}>
        <div style={{ fontSize: '10px', color: '#64748b' }}>Netflix</div>
        <div style={{ fontWeight: 700 }}>•••••••• (click to copy)</div>
      </div>
      <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '8px' }}>
        <div style={{ fontSize: '10px', color: '#64748b' }}>Google</div>
        <div style={{ fontWeight: 700 }}>••••••••</div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'md_preview',
    cat: 'prod',
    name: 'Markdown Previewer',
    nameFr: 'Prévisualisation MD',
    icon: '📝',
    tags: ['Developer', 'Writer'],
    code: `const App = () => {
  const [text, setText] = React.useState('# Hello\\nThis is **markdown** preview.');
  const html = text.replace(/# (.+)/g, '<h1>$1</h1>').replace(/\\*\\*(.+)\\*\\*/g, '<b>$1</b>');
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', padding: '10px', height: '300px' }}>
      <textarea value={text} onChange={e => setText(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontFamily: 'monospace' }} />
      <div dangerouslySetInnerHTML={{ __html: html }} style={{ padding: '10px', background: '#f9f9f9', borderRadius: '8px', overflow: 'auto' }} />
    </div>
  );
};`
  },
  {
    id: 'note_labels',
    cat: 'prod',
    name: 'Smart Notes with Tags',
    nameFr: 'Notes Inteligentes',
    icon: '🏷️',
    tags: ['Productivity', 'State'],
    code: `const App = () => {
  const [notes, setNotes] = React.useState([{ id: 1, text: 'Buy milk', tag: 'Personal' }, { id: 2, text: 'Fix bug', tag: 'Work' }]);
  const [sel, setSel] = React.useState('All');
  const filtered = notes.filter(n => sel === 'All' || n.tag === sel);
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px' }}>
      <div style={{ display: 'flex', gap: '5px', marginBottom: '16px' }}>
        {['All', 'Work', 'Personal'].map(t => <button key={t} onClick={() => setSel(t)} style={{ padding: '4px 10px', borderRadius: '20px', border: 'none', background: sel === t ? '#6366f1' : '#f1f5f9', color: sel === t ? '#fff' : '#64748b', fontSize: '11px' }}>{t}</button>)}
      </div>
      {filtered.map(n => (
        <div key={n.id} style={{ padding: '10px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between' }}>
          <span>{n.text}</span>
          <span style={{ fontSize: '10px', color: '#6366f1' }}>#{n.tag}</span>
        </div>
      ))}
    </div>
  );
};`
  },
  {
    id: 'poll_builder',
    cat: 'prod',
    name: 'Quick Poll Builder',
    nameFr: 'Générateur de Sondage',
    icon: '📊',
    tags: ['Social', 'Input'],
    code: `const App = () => {
  const [opts, setOpts] = React.useState([ { text: 'Blue', votes: 12 }, { text: 'Red', votes: 8 }, { text: 'Green', votes: 5 } ]);
  const vote = (i) => { const n = [...opts]; n[i].votes++; setOpts(n); };
  const total = opts.reduce((s, o) => s + o.votes, 0);
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 20px' }}>What's your favorite color?</h3>
      {opts.map((o, i) => (
        <div key={i} onClick={() => vote(i)} style={{ padding: '12px', border: '1px solid #f1f5f9', borderRadius: '10px', marginBottom: '8px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#6366f1', opacity: 0.1, width: (o.votes / total * 100) + '%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <span>{o.text}</span>
            <span style={{ fontWeight: 700 }}>{Math.round(o.votes / total * 100)}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};`
  },
  {
    id: 'habit_streak',
    cat: 'prod',
    name: 'Habit Streak Tracker',
    nameFr: 'Suivi de Série',
    icon: '🔥',
    tags: ['Productivity', 'Progress'],
    code: `const App = () => {
  const [streak, setStreak] = React.useState(5);
  const [completedToday, setCompletedToday] = React.useState(false);
  const finish = () => { if(!completedToday) { setStreak(s => s + 1); setCompletedToday(true); } };
  return (
    <div style={{ padding: '24px', background: 'linear-gradient(135deg, #f59e0b, #ef4444)', borderRadius: '24px', color: '#fff', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '10px' }}>🔥</div>
      <div style={{ fontSize: '32px', fontWeight: 900 }}>{streak} Day Streak</div>
      <p style={{ opacity: 0.8, marginBottom: '20px' }}>Don't break the chain!</p>
      <button onClick={finish} disabled={completedToday} style={{ padding: '12px 24px', background: '#fff', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: 700, cursor: completedToday ? 'default' : 'pointer', opacity: completedToday ? 0.6 : 1 }}>
        {completedToday ? 'Done for Today!' : 'Complete Habit'}
      </button>
    </div>
  );
};`
  },
  {
    id: 'goal_progress',
    cat: 'prod',
    name: 'Goal Progress Circle',
    nameFr: 'Cercle d\'Objectif',
    icon: '🎯',
    tags: ['Progress', 'Visual'],
    code: `const App = () => {
  const [v, setV] = React.useState(45);
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 20px' }}>
        <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="3" />
          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray={v+', 100'} strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.5s' }} />
        </svg>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontWeight: 900, fontSize: '24px' }}>{v}%</div>
      </div>
      <input type="range" value={v} onChange={e => setV(+e.target.value)} style={{ width: '100%', accentColor: '#10b981' }} />
      <p style={{ fontSize: '13px', color: '#64748b', marginTop: '10px' }}>Work in progress...</p>
    </div>
  );
};`
  },
  {
    id: 'lorem_pro',
    cat: 'prod',
    name: 'Lorem Ipsum Pro',
    nameFr: 'Générateur Lorem',
    icon: '📑',
    tags: ['Tool', 'Developer'],
    code: `const App = () => {
  const [p, setP] = React.useState(1);
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ";
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <span>Paragraphs: {p}</span>
        <input type="range" min="1" max="5" value={p} onChange={e => setP(+e.target.value)} />
      </div>
      <div style={{ fontSize: '13px', color: '#64748b', maxHeight: '150px', overflow: 'auto', padding: '10px', background: '#f8fafc', borderRadius: '8px' }}>
        {Array(p).fill(text).join('\\n\\n')}
      </div>
      <button onClick={() => alert('Copied!')} style={{ width: '100%', marginTop: '10px', padding: '10px', background: '#000', color: '#fff', border: 'none', borderRadius: '8px' }}>Copy Text</button>
    </div>
  );
};`
  },
  {
    id: 'text_diff',
    cat: 'prod',
    name: 'Text Diff Checker',
    nameFr: 'Comparateur de Texte',
    icon: '↔️',
    tags: ['Tool', 'Developer'],
    code: `const App = () => {
  const [t1, setT1] = React.useState('Hello world');
  const [t2, setT2] = React.useState('Hello AuraGen');
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <textarea value={t1} onChange={e => setT1(e.target.value)} style={{ height: '60px', padding: '8px', borderRadius: '8px' }} />
      <textarea value={t2} onChange={e => setT2(e.target.value)} style={{ height: '60px', padding: '8px', borderRadius: '8px' }} />
      <div style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', fontSize: '14px' }}>
        {t1 === t2 ? '✅ Texts match!' : '❌ Texts differ'}
      </div>
    </div>
  );
};`
  },
  {
    id: 'step_counter',
    cat: 'prod',
    name: 'Step Counter Simulator',
    nameFr: 'Compteur de Pas',
    icon: '👣',
    tags: ['Health', 'Progress'],
    code: `const App = () => {
  const [steps, setSteps] = React.useState(6400);
  const goal = 10000;
  const pct = (steps / goal * 100).toFixed(0);
  return (
    <div style={{ padding: '24px', background: '#f0fdf4', borderRadius: '24px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px' }}>👣</div>
      <div style={{ fontSize: '40px', fontWeight: 900, color: '#166534' }}>{steps.toLocaleString()}</div>
      <p style={{ color: '#15803d', fontWeight: 600 }}>Steps Today</p>
      <div style={{ height: '8px', background: '#dcfce7', borderRadius: '4px', margin: '20px 0', overflow: 'hidden' }}>
        <div style={{ width: pct+'%', height: '100%', background: '#22c55e' }} />
      </div>
      <div style={{ fontSize: '12px', color: '#15803d' }}>{pct}% of your 10k goal</div>
    </div>
  );
};`
  },
  {
    id: 'qr_gen',
    cat: 'prod',
    name: 'QR Code Simulator',
    nameFr: 'Simulateur Code QR',
    icon: '📱',
    tags: ['Utility', 'Marketing'],
    code: `const App = () => {
  const [url, setUrl] = React.useState('https://auragen.ai');
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', textAlign: 'center' }}>
      <h3 style={{ margin: '0 0 16px' }}>📱 QR Generator</h3>
      <input value={url} onChange={e => setUrl(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px' }} />
      <div style={{ width: '150px', height: '150px', background: '#111', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '1px', padding: '5px' }}>
        {Array(100).fill(0).map((_, i) => <div key={i} style={{ background: Math.random() > 0.5 ? '#fff' : '#000' }} />)}
      </div>
      <button style={{ marginTop: '20px', padding: '10px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px' }}>Download SVG</button>
    </div>
  );
};`
  },
  {
    id: 'shortener_ui',
    cat: 'prod',
    name: 'URL Shortener UI',
    nameFr: 'Raccourcisseur URL',
    icon: '🔗',
    tags: ['Utility', 'Web'],
    code: `const App = () => {
  const [url, setUrl] = React.useState('');
  const [res, setRes] = React.useState('');
  const short = () => setRes('aura.gen/' + Math.random().toString(36).substr(2, 5));
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 16px' }}>🔗 URL Shortener</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="Paste long URL..." style={{ flex: 1, padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }} />
        <button onClick={short} style={{ padding: '12px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700 }}>Shorten</button>
      </div>
      {res && <div style={{ marginTop: '16px', padding: '12px', background: '#eff6ff', color: '#2563eb', borderRadius: '10px', textAlign: 'center', fontWeight: 700 }}>{res}</div>}
    </div>
  );
};`
  },
  {
    id: 'unit_pro',
    cat: 'prod',
    name: 'Unit Converter Pro',
    nameFr: 'Convertisseur Pro',
    icon: '⚖️',
    tags: ['Tool', 'Utility'],
    code: `const App = () => {
  const [kg, setKg] = React.useState(1);
  const lb = (kg * 2.20462).toFixed(2);
  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px' }}>
      <h4 style={{ margin: '0 0 12px' }}>Weight Converter</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input type="number" value={kg} onChange={e => setKg(+e.target.value)} style={{ width: '80px', padding: '8px', borderRadius: '8px' }} />
        <span>KG = </span>
        <span style={{ fontWeight: 900, color: '#6366f1' }}>{lb} LBS</span>
      </div>
    </div>
  );
};`
  },
  // ─── HEALTH & FITNESS ───
  {
    id: 'calorie_count',
    cat: 'health',
    name: 'Daily Calorie Counter',
    nameFr: 'Compteur Calories',
    icon: '🍎',
    tags: ['Health', 'Data'],
    code: `const App = () => {
  const [items, setItems] = React.useState([{ n: 'Breakfast', c: 450 }, { n: 'Lunch', c: 650 }]);
  const total = items.reduce((s, x) => s + x.c, 0);
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 16px', color: '#0f172a' }}>🍎 Nutrition Log</h3>
      <div style={{ fontSize: '32px', fontWeight: 900, textAlign: 'center', marginBottom: '16px' }}>{total} <span style={{ fontSize: '14px', fontWeight: 600, color: '#64748b' }}>kcal</span></div>
      {items.map((it, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#f8fafc', borderRadius: '8px', marginBottom: '6px' }}>
          <span>{it.n}</span>
          <span style={{ fontWeight: 700, color: '#ef4444' }}>{it.c}</span>
        </div>
      ))}
    </div>
  );
};`
  },
  {
    id: 'workout_timer',
    cat: 'health',
    name: 'HIIT Workout Timer',
    nameFr: 'Chrono Entraînement',
    icon: '💪',
    tags: ['Fitness', 'Live'],
    code: `const App = () => {
  const [sec, setSec] = React.useState(30);
  const [run, setRun] = React.useState(false);
  React.useEffect(() => {
    let iv; if(run && sec > 0) iv = setInterval(() => setSec(s => s - 1), 1000);
    return () => clearInterval(iv);
  }, [run, sec]);
  return (
    <div style={{ padding: '30px', background: '#000', color: '#fff', borderRadius: '24px', textAlign: 'center' }}>
      <div style={{ fontSize: '14px', color: '#10b981', fontWeight: 800, textTransform: 'uppercase' }}>Work Hard!</div>
      <div style={{ fontSize: '80px', fontWeight: 900, color: '#10b981' }}>{sec}s</div>
      <button onClick={() => setRun(!run)} style={{ padding: '12px 30px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 900, cursor: 'pointer' }}>
        {run ? 'PAUSE' : 'GO!'}
      </button>
    </div>
  );
};`
  },
  {
    id: 'mood_journal',
    cat: 'health',
    name: 'Mood & Energy Journal',
    nameFr: 'Journal de l\'Humeur',
    icon: '🌈',
    tags: ['Mindfulness', 'State'],
    code: `const App = () => {
  const [mood, setMood] = React.useState(3);
  const [energy, setEnergy] = React.useState(4);
  const faces = ['😞', '😐', '🙂', '😊', '🤩'];
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
      <h3 style={{ margin: '0 0 20px' }}>🌈 How are you?</h3>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Mood</p>
        <div style={{ display: 'flex', gap: '10px', fontSize: '24px' }}>
          {faces.map((f, i) => <span key={i} onClick={() => setMood(i)} style={{ cursor: 'pointer', opacity: mood === i ? 1 : 0.3 }}>{f}</span>)}
        </div>
      </div>
      <div>
        <p style={{ fontSize: '12px', color: '#64748b' }}>Energy Level</p>
        <input type="range" min="1" max="5" value={energy} onChange={e => setEnergy(+e.target.value)} style={{ width: '100%', accentColor: '#6366f1' }} />
      </div>
    </div>
  );
};`
  },
  {
    id: 'yoga_finder',
    cat: 'health',
    name: 'Yoga Pose Finder',
    nameFr: 'Découverte Yoga',
    icon: '🧘',
    tags: ['Fitness', 'Education'],
    code: `const App = () => {
  const poses = [{ n: 'Lotus', d: 'Focus & Calm' }, { n: 'Warrior', d: 'Strength & Fire' }, { n: 'Tree', d: 'Balance' }];
  const [idx, setIdx] = React.useState(0);
  return (
    <div style={{ padding: '24px', background: '#f5f3ff', borderRadius: '24px', textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>🧘</div>
      <h3 style={{ margin: 0, color: '#6d28d9' }}>{poses[idx].n}</h3>
      <p style={{ color: '#7c3aed', opacity: 0.8 }}>{poses[idx].d}</p>
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px' }}>
        <button onClick={() => setIdx(i => (i+1)%poses.length)} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: '#7c3aed', color: '#fff' }}>Next Pose</button>
      </div>
    </div>
  );
};`
  },
  {
    id: 'medicine_rem',
    cat: 'health',
    name: 'Medicine Reminder',
    nameFr: 'Rappel Médicaments',
    icon: '💊',
    tags: ['Utility', 'Healthcare'],
    code: `const App = () => {
  const [meds, setMeds] = React.useState([{ n: 'Vitamin C', t: '08:00', d: true }, { n: 'Omega 3', t: '13:00', d: false }]);
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ margin: '0 0 16px' }}>💊 Reminders</h3>
      {meds.map((m, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: m.d ? '#f0fdf4' : '#fff', borderRadius: '10px', marginBottom: '8px' }}>
          <div><div style={{ fontWeight: 700 }}>{m.n}</div><div style={{ fontSize: '11px', color: '#64748b' }}>{m.t}</div></div>
          <button style={{ border: 'none', background: m.d ? '#22c55e' : '#f1f5f9', color: m.d ? '#fff' : '#64748b', borderRadius: '6px', padding: '4px 10px' }}>{m.d ? 'Taken' : 'Take'}</button>
        </div>
      ))}
    </div>
  );
};`
  },
  // ─── CREATIVE ARTS ───
  {
    id: 'color_gen',
    cat: 'creative',
    name: 'Instant Color Palette',
    nameFr: 'Palette de Couleurs',
    icon: '🎨',
    tags: ['Creative', 'Design'],
    code: `const App = () => {
  const [cols, setCols] = React.useState(['#6366f1', '#ec4899', '#f59e0b', '#10b981']);
  const gen = () => setCols(cols.map(() => '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')));
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '20px', textAlign: 'center' }}>
      <div style={{ display: 'flex', height: '120px', borderRadius: '12px', overflow: 'hidden', marginBottom: '16px' }}>
        {cols.map(c => <div key={c} style={{ flex: 1, background: c }} />)}
      </div>
      <button onClick={gen} style={{ padding: '12px 24px', background: '#000', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 800 }}>SURPRISE ME</button>
    </div>
  );
};`
  },
  {
    id: 'sketch_pad',
    cat: 'creative',
    name: 'Simple Drawing Pad',
    nameFr: 'Bloc à Dessin',
    icon: '🖌️',
    tags: ['Canvas', 'Interactive'],
    code: `const App = () => {
  const [pts, setPts] = React.useState([]);
  const draw = (e) => { if(e.buttons !== 1) return; const rect = e.currentTarget.getBoundingClientRect(); setPts([...pts, { x: e.clientX-rect.left, y: e.clientY-rect.top }]); };
  return (
    <div onMouseMove={draw} style={{ width: '100%', height: '240px', background: '#fff', border: '1px solid #ddd', cursor: 'crosshair', position: 'relative', overflow: 'hidden', borderRadius: '12px' }}>
      {pts.map((p, i) => <div key={i} style={{ position: 'absolute', left: p.x, top: p.y, width: '4px', height: '4px', background: '#000', borderRadius: '50%' }} />)}
      <button onClick={() => setPts([])} style={{ position: 'absolute', bottom: '10px', right: '10px' }}>Clear</button>
    </div>
  );
};`
  },
  {
    id: 'glass_gen',
    cat: 'creative',
    name: 'Glassmorphism Tool',
    nameFr: 'Éditeur Glassmorphism',
    icon: '🫧',
    tags: ['Design', 'CSS'],
    code: `const App = () => {
  const [blur, setBlur] = React.useState(10);
  const [op, setOp] = React.useState(0.2);
  return (
    <div style={{ padding: '40px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ padding: '30px', background: 'rgba(255,255,255,'+op+')', backdropFilter: 'blur('+blur+'px)', borderRadius: '20px', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>Glass Preview</h3>
        <p style={{ fontSize: '12px' }}>Glassmorphism style</p>
      </div>
      <div style={{ marginTop: '20px', background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '10px' }}>
        <input type="range" value={blur} onChange={e => setBlur(e.target.value)} />
        <input type="range" min="0" max="1" step="0.1" value={op} onChange={e => setOp(e.target.value)} />
      </div>
    </div>
  );
};`
  },
  {
    id: 'avatar_maker',
    cat: 'creative',
    name: 'SVG Avatar Maker',
    nameFr: 'Créateur Avatar',
    icon: '👤',
    tags: ['Design', 'Visual'],
    code: `const App = () => {
  const [bg, setBg] = React.useState('#6366f1');
  const [eye, setEye] = React.useState(5);
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', textAlign: 'center' }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill={bg} />
        <circle cx={40} cy="45" r={eye} fill="#fff" />
        <circle cx={60} cy="45" r={eye} fill="#fff" />
        <path d="M 35 65 Q 50 80 65 65" stroke="#fff" fill="none" strokeWidth="3" />
      </svg>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button onClick={() => setBg('#ec4899')}>Pink</button>
        <button onClick={() => setBg('#10b981')}>Green</button>
        <button onClick={() => setEye(e => e === 5 ? 8 : 5)}>Blink</button>
      </div>
    </div>
  );
};`
  },
  {
    id: 'filter_sim',
    cat: 'creative',
    name: 'Image Filter Sim',
    nameFr: 'Filtres Image',
    icon: '🖼️',
    tags: ['Visual', 'Interactive'],
    code: `const App = () => {
  const [f, setF] = React.useState('none');
  const filters = ['grayscale', 'sepia', 'invert', 'hue-rotate(90deg)'];
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', textAlign: 'center' }}>
      <div style={{ width: '100%', height: '140px', background: '#eee', borderRadius: '8px', marginBottom: '16px', filter: f, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>🏔️</div>
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filters.map(x => <button key={x} onClick={() => setF(x)} style={{ fontSize: '10px' }}>{x.split('(')[0]}</button>)}
        <button onClick={() => setF('none')}>Clear</button>
      </div>
    </div>
  );
};`
  },
  {
    id: 'gradient_tool',
    cat: 'creative',
    name: 'Radial Gradient Tool',
    nameFr: 'Générateur Radial',
    icon: '🌈',
    tags: ['Design', 'CSS'],
    code: `const App = () => {
  const [c1, setC1] = React.useState('#6366f1');
  const [c2, setC2] = React.useState('#06b6d4');
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', textAlign: 'center' }}>
      <div style={{ height: '120px', borderRadius: '12px', background: 'radial-gradient(circle, '+c1+', '+c2+')', marginBottom: '16px' }} />
      <div style={{ display: 'flex', gap: '10px' }}>
        <input type="color" value={c1} onChange={e => setC1(e.target.value)} style={{ flex: 1 }} />
        <input type="color" value={c2} onChange={e => setC2(e.target.value)} style={{ flex: 1 }} />
      </div>
    </div>
  );
};`
  },
  {
    id: 'pattern_gen',
    cat: 'creative',
    name: 'Polka Pattern Gen',
    nameFr: 'Motif Polka',
    icon: '💠',
    tags: ['Design', 'CSS'],
    code: `const App = () => {
  const [sz, setSz] = React.useState(20);
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', textAlign: 'center' }}>
      <div style={{ height: '120px', borderRadius: '12px', background: 'radial-gradient(#6366f1 2px, transparent 0)', backgroundSize: sz+'px '+sz+'px', marginBottom: '16px', border: '1px solid #eee' }} />
      <input type="range" min="10" max="50" value={sz} onChange={e => setSz(e.target.value)} />
      <p style={{ fontSize: '12px' }}>Pattern Density: {sz}</p>
    </div>
  );
};`
  },
  {
    id: 'typo_tester',
    cat: 'creative',
    name: 'Typography Tester',
    nameFr: 'Testeur Typo',
    icon: 'Aa',
    tags: ['Design', 'Visual'],
    code: `const App = () => {
  const [sz, setSz] = React.useState(32);
  const [ls, setLs] = React.useState(0);
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px' }}>
      <div style={{ fontSize: sz+'px', letterSpacing: ls+'px', fontWeight: 900, whiteSpace: 'nowrap', overflow: 'hidden', textAlign: 'center', marginBottom: '20px' }}>AuraGen Design</div>
      <div style={{ display: 'grid', gap: '10px' }}>
        <input type="range" min="12" max="64" value={sz} onChange={e => setSz(e.target.value)} />
        <input type="range" min="-2" max="10" value={ls} onChange={e => setLs(e.target.value)} />
      </div>
    </div>
  );
};`
  },
  {
    id: 'particle_play',
    cat: 'creative',
    name: 'Mini Particle Play',
    nameFr: 'Mini Particules',
    icon: '✨',
    tags: ['Animation', 'Visual'],
    code: `const App = () => {
  const [dots] = React.useState(Array(20).fill(0));
  return (
    <div style={{ width: '100%', height: '200px', background: '#000', borderRadius: '16px', position: 'relative', overflow: 'hidden' }}>
      {dots.map((_, i) => (
        <div key={i} style={{ 
          position: 'absolute', 
          width: '4px', height: '4px', background: '#fff', borderRadius: '50%',
          left: Math.random()*100+'%', top: Math.random()*100+'%',
          animation: 'pulse '+(1+Math.random()*2)+'s infinite ease-in-out'
        }} />
      ))}
      <style>{"@keyframes pulse { 0%,100%{opacity:0.2;transform:scale(1)} 50%{opacity:1;transform:scale(2)} }"}</style>
    </div>
  );
};`
  },
  {
    id: 'neumorphism_gen',
    cat: 'creative',
    name: 'Neumorphism Gen',
    nameFr: 'Éditeur Neumorphism',
    icon: '🔘',
    tags: ['Design', 'CSS'],
    code: `const App = () => {
  const [dist, setDist] = React.useState(10);
  return (
    <div style={{ padding: '40px', background: '#e0e5ec', borderRadius: '24px', textAlign: 'center' }}>
      <div style={{ 
        width: '100px', height: '100px', background: '#e0e5ec', margin: '0 auto 20px', borderRadius: '20px',
        boxShadow: dist+'px '+dist+'px '+(dist*2)+'px #a3b1c6, -'+dist+'px -'+dist+'px '+(dist*2)+'px #ffffff'
      }} />
      <input type="range" min="2" max="20" value={dist} onChange={e => setDist(e.target.value)} />
    </div>
  );
};`
  },
  // ─── GAMES & FUN ───
  {
    id: 'click_speed',
    cat: 'game',
    name: 'Click Speed Test',
    nameFr: 'Test de Vitesse Clique',
    icon: '🖱️',
    tags: ['Game', 'Interactive'],
    code: `const App = () => {
  const [c, setC] = React.useState(0);
  const [time, setTime] = React.useState(5);
  const start = () => { setC(0); setTime(5); };
  React.useEffect(() => {
    let iv; if(time > 0) iv = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(iv);
  }, [time]);
  return (
    <div style={{ padding: '30px', background: '#111', color: '#fff', borderRadius: '24px', textAlign: 'center' }}>
      <div style={{ fontSize: '14px', color: '#ff4757' }}>Time: {time}s</div>
      <div style={{ fontSize: '60px', fontWeight: 900 }}>{c}</div>
      <button 
        disabled={time === 0}
        onClick={() => setC(v => v + 1)}
        style={{ width: '120px', height: '120px', borderRadius: '60px', background: '#ff4757', border: '5px solid #fff', color: '#fff', fontSize: '20px', fontWeight: 900, cursor: 'pointer', margin: '20px 0' }}
      >CLICK!</button>
      {time === 0 && <button onClick={start} style={{ display: 'block', margin: '0 auto', background: 'none', border: '1px solid #fff', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>Restart</button>}
    </div>
  );
};`
  },
  {
    id: 'memory_game',
    cat: 'game',
    name: 'Memory Emoji Cards',
    nameFr: 'Jeu de Mémoire',
    icon: '🧠',
    tags: ['Game', 'Logic'],
    code: `const App = () => {
  const [cards] = React.useState(['🍕','🍕','🚀','🚀','⭐','⭐','🎮','🎮'].sort(() => Math.random()-0.5));
  const [flipped, setFlipped] = React.useState([]);
  return (
    <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {cards.map((c, i) => (
        <div key={i} onClick={() => setFlipped([...flipped, i])} style={{ height: '70px', background: flipped.includes(i) ? '#fff' : '#6366f1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', cursor: 'pointer', border: '2px solid #6366f1' }}>
          {flipped.includes(i) ? c : '?'}
        </div>
      ))}
    </div>
  );
};`
  },
  {
    id: 'rock_paper',
    cat: 'game',
    name: 'Rock Paper Scissors',
    nameFr: 'Chifoumi',
    icon: '✊',
    tags: ['Game', 'Fun'],
    code: `const App = () => {
  const [p, setP] = React.useState(null);
  const [c, setC] = React.useState(null);
  const play = (opt) => {
    const opts = ['Rock', 'Paper', 'Scissors'];
    const comp = opts[Math.floor(Math.random()*3)];
    setP(opt); setC(comp);
  };
  return (
    <div style={{ padding: '24px', textAlign: 'center', background: '#f8fafc', borderRadius: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '40px', marginBottom: '20px' }}>
        <div>{p || '👤'}</div><div>vs</div><div>{c || '🤖'}</div>
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {['Rock', 'Paper', 'Scissors'].map(o => <button key={o} onClick={() => play(o)} style={{ padding: '10px', borderRadius: '8px', background: '#6366f1', color: '#fff', border: 'none' }}>{o}</button>)}
      </div>
    </div>
  );
};`
  },
  {
    id: 'dice_roller',
    cat: 'game',
    name: 'Lucky Dice Roller',
    nameFr: 'Lanceur de Dés',
    icon: '🎲',
    tags: ['Game', 'Random'],
    code: `const App = () => {
  const [v, setV] = React.useState(6);
  const roll = () => {
    let count = 0;
    const iv = setInterval(() => {
      setV(Math.floor(Math.random()*6)+1);
      if(++count > 10) clearInterval(iv);
    }, 50);
  };
  return (
    <div style={{ padding: '30px', textAlign: 'center', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
      <div style={{ fontSize: '100px', lineHeight: 1, marginBottom: '20px' }}>
        {['','⚀','⚁','⚂','⚃','⚄','⚅'][v]}
      </div>
      <button onClick={roll} style={{ padding: '12px 24px', background: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 900 }}>ROLL DICE</button>
    </div>
  );
};`
  },
  {
    id: 'emoji_catch',
    cat: 'game',
    name: 'Catch the Emoji',
    nameFr: 'Attrape l\'Emoji',
    icon: '🎾',
    tags: ['Game', 'Animation'],
    code: `const App = () => {
  const [pos, setPos] = React.useState({ x: 50, y: 50 });
  const [score, setScore] = React.useState(0);
  const move = () => {
    setPos({ x: Math.random()*80+10, y: Math.random()*80+10 });
    setScore(s => s + 1);
  };
  return (
    <div style={{ height: '240px', background: '#f0f9ff', position: 'relative', borderRadius: '16px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', fontWeight: 900 }}>Score: {score}</div>
      <div onClick={move} style={{ position: 'absolute', left: pos.x+'%', top: pos.y+'%', fontSize: '40px', cursor: 'pointer', transition: 'all 0.2s' }}>🎾</div>
    </div>
  );
};`
  },
  // ─── DATA & SCIENCE ───
  {
    id: 'stock_sim',
    cat: 'data',
    name: 'Stock Price Simulator',
    nameFr: 'Simulateur Bourse',
    icon: '📈',
    tags: ['Data', 'Real-time'],
    code: `const App = () => {
  const [price, setPrice] = React.useState(150.25);
  const [hist, setHist] = React.useState([150, 151, 149, 150.25]);
  React.useEffect(() => {
    const iv = setInterval(() => {
      const delta = (Math.random()-0.5) * 2;
      setPrice(p => { const newP = +(p + delta).toFixed(2); setHist(h => [...h.slice(-19), newP]); return newP; });
    }, 1000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ padding: '20px', background: '#0f172a', color: '#fff', borderRadius: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <span>AURA Tech Inc.</span>
        <span style={{ color: '#10b981', fontWeight: 900 }}>${price}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '60px' }}>
        {hist.map((v, i) => <div key={i} style={{ flex: 1, background: '#6366f1', height: (v-140)*5+'px', borderRadius: '1px' }} />)}
      </div>
    </div>
  );
};`
  },
  {
    id: 'prime_check',
    cat: 'data',
    name: 'Prime Number Checker',
    nameFr: 'Vérificateur de Premiers',
    icon: '🔢',
    tags: ['Math', 'Utility'],
    code: `const App = () => {
  const [num, setNum] = React.useState(17);
  const isPrime = (n) => {
    for(let i = 2, s = Math.sqrt(n); i <= s; i++) if(n % i === 0) return false; 
    return n > 1;
  };
  return (
    <div style={{ padding: '24px', textAlign: 'center', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
      <input type="number" value={num} onChange={e => setNum(+e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '20px', textAlign: 'center', marginBottom: '16px' }} />
      <div style={{ padding: '20px', background: isPrime(num) ? '#dcfce7' : '#fee2e2', borderRadius: '12px', color: isPrime(num) ? '#166534' : '#991b1b', fontWeight: 900 }}>
        {isPrime(num) ? '✨ PRIME NUMBER' : '❌ NOT PRIME'}
      </div>
    </div>
  );
};`
  },
  {
    id: 'periodic_table',
    cat: 'data',
    name: 'Atom Previewer',
    nameFr: 'Aperçu Atome',
    icon: '⚛️',
    tags: ['Science', 'Data'],
    code: `const App = () => {
  const elements = [
    { s: 'H', n: 'Hydrogen', a: 1, c: '#fff' },
    { s: 'He', n: 'Helium', a: 2, c: '#fecaca' },
    { s: 'Li', n: 'Lithium', a: 3, c: '#fed7aa' }
  ];
  const [idx, setIdx] = React.useState(0);
  const e = elements[idx];
  return (
    <div style={{ padding: '24px', background: '#1e293b', color: '#fff', borderRadius: '20px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', border: '4px solid '+e.c, margin: '0 auto 16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '12px' }}>{e.a}</div>
        <div style={{ fontSize: '30px', fontWeight: 900 }}>{e.s}</div>
      </div>
      <h3>{e.n}</h3>
      <button onClick={() => setIdx(i => (i+1)%elements.length)} style={{ marginTop: '10px', color: '#94a3b8', background: 'none', border: '1px solid #334155', padding: '5px 10px' }}>Next Element</button>
    </div>
  );
};`
  },
  {
    id: 'weather_stats',
    cat: 'data',
    name: 'Weather Stats UI',
    nameFr: 'Stats Météo',
    icon: '🌤️',
    tags: ['Data', 'Visual'],
    code: `const App = () => {
  const stats = [ { l: 'Humidity', v: '45%' }, { l: 'Wind', v: '12km/h' }, { l: 'UV Index', v: 'Low' } ];
  return (
    <div style={{ padding: '24px', background: 'linear-gradient(to bottom, #38bdf8, #0ea5e9)', color: '#fff', borderRadius: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div><div style={{ fontSize: '40px', fontWeight: 900 }}>24°C</div><div>New York, US</div></div>
        <div style={{ fontSize: '40px' }}>🌤️</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(255,255,255,0.2)', padding: '12px', borderRadius: '12px' }}>
        {stats.map(s => <div key={s.l} style={{ textAlign: 'center' }}><div style={{ fontSize: '10px', opacity: 0.8 }}>{s.l}</div><div style={{ fontWeight: 700 }}>{s.v}</div></div>)}
      </div>
    </div>
  );
};`
  },
  {
    id: 'crypto_feed',
    cat: 'data',
    name: 'Crypto Price Feed',
    nameFr: 'Flux Crypto',
    icon: '🪙',
    tags: ['Crypto', 'Real-time'],
    code: `const App = () => {
  const [btc, setBtc] = React.useState(64200);
  React.useEffect(() => {
    const iv = setInterval(() => setBtc(v => v + (Math.random()-0.5)*100), 2000);
    return () => clearInterval(iv);
  }, []);
  return (
    <div style={{ padding: '20px', background: '#000', color: '#fff', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '15px' }}>
      <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>₿</div>
      <div>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Bitcoin / USD</div>
        <div style={{ fontSize: '20px', fontWeight: 900 }}>${btc.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'data_table_pro',
    cat: 'data',
    name: 'Searchable Data Table',
    nameFr: 'Tableau Cherchable',
    icon: '📋',
    tags: ['Data', 'Utility'],
    code: `const App = () => {
  const [q, setQ] = React.useState('');
  const data = [ { n: 'Admin', e: 'admin@site.com' }, { n: 'User1', e: 'u1@site.com' }, { n: 'Editor', e: 'ed@site.com' } ];
  const filtered = data.filter(x => x.n.toLowerCase().includes(q.toLowerCase()));
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
      <input placeholder="Search..." onChange={e => setQ(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
      <div style={{ display: 'grid', gap: '5px' }}>
        {filtered.map(x => (
          <div key={x.n} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px', background: '#f8fafc' }}>
            <span style={{ fontWeight: 700 }}>{x.n}</span><span>{x.e}</span>
          </div>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'pie_gen',
    cat: 'data',
    name: 'Quick Pie Chart',
    nameFr: 'Graphique Camembert',
    icon: '🍰',
    tags: ['Data', 'Visual'],
    code: `const App = () => {
  const [val, setVal] = React.useState(70);
  return (
    <div style={{ padding: '24px', background: '#fff', borderRadius: '20px', textAlign: 'center' }}>
      <svg width="100" height="100" viewBox="0 0 32 32">
        <circle r="16" cx="16" cy="16" fill="#f1f5f9" />
        <circle r="16" cx="16" cy="16" fill="none" stroke="#6366f1" strokeWidth="32" strokeDasharray={val+' 100'} />
      </svg>
      <div style={{ marginTop: '16px' }}>
        <input type="range" value={val} onChange={e => setVal(e.target.value)} />
        <div style={{ fontWeight: 900, color: '#6366f1' }}>{val}% Usage</div>
      </div>
    </div>
  );
};`
  },
  // ─── DEV TOOLS ───
  {
    id: 'regex_check',
    cat: 'dev',
    name: 'Regex Playground',
    nameFr: 'Testeur Regex',
    icon: '⚙️',
    tags: ['Developer', 'Utility'],
    code: `const App = () => {
  const [re, setRe] = React.useState('auragen');
  const [txt, setTxt] = React.useState('Welcome to auragen!');
  let match = false; try { match = new RegExp(re).test(txt); } catch(e) {}
  return (
    <div style={{ padding: '20px', background: '#1e293b', color: '#fff', borderRadius: '16px' }}>
      <input value={re} onChange={e => setRe(e.target.value)} placeholder="Pattern..." style={{ width: '100%', background: '#334155', border: 'none', color: '#fff', padding: '10px', borderRadius: '8px', marginBottom: '10px' }} />
      <textarea value={txt} onChange={e => setTxt(e.target.value)} placeholder="Test string..." style={{ width: '100%', background: '#334155', border: 'none', color: '#fff', padding: '10px', borderRadius: '8px', height: '60px' }} />
      <div style={{ marginTop: '15px', color: match ? '#10b981' : '#f43f5e', fontWeight: 900 }}>{match ? '✅ MATCH FOUND' : '❌ NO MATCH'}</div>
    </div>
  );
};`
  },
  {
    id: 'http_status',
    cat: 'dev',
    name: 'HTTP Status Codes',
    nameFr: 'Codes HTTP',
    icon: '🌐',
    tags: ['Developer', 'Manual'],
    code: `const App = () => {
  const codes = { '200': 'OK', '404': 'Not Found', '500': 'Server Error', '403': 'Forbidden' };
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
        {Object.entries(codes).map(([k,v]) => (
          <div key={k} style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontWeight: 900, color: '#6366f1' }}>{k}</div>
            <div style={{ fontSize: '12px' }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'base64_tool',
    cat: 'dev',
    name: 'Base64 Tool',
    nameFr: 'Convertisseur Base64',
    icon: '🔢',
    tags: ['Developer', 'Utility'],
    code: `const App = () => {
  const [val, setVal] = React.useState('AuraGen');
  const enc = btoa(val);
  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px' }}>
      <input value={val} onChange={e => setVal(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px' }} />
      <div style={{ padding: '10px', background: '#000', color: '#22c55e', borderRadius: '8px', fontSize: '12px', wordBreak: 'break-all' }}>{enc}</div>
    </div>
  );
};`
  },
  {
    id: 'json_beauty',
    cat: 'dev',
    name: 'JSON Beautifier',
    nameFr: 'Embellisseur JSON',
    icon: '✨',
    tags: ['Developer', 'Tool'],
    code: `const App = () => {
  const [txt, setTxt] = React.useState('{"id":1,"name":"Aura"}');
  let res = ''; try { res = JSON.stringify(JSON.parse(txt), null, 2); } catch(e) { res = 'Invalid JSON'; }
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <textarea value={txt} onChange={e => setTxt(e.target.value)} style={{ height: '60px', padding: '10px' }} />
      <pre style={{ padding: '10px', background: '#f1f5f9', borderRadius: '8px', fontSize: '11px', whiteSpace: 'pre-wrap' }}>{res}</pre>
    </div>
  );
};`
  },
  {
    id: 'flex_play',
    cat: 'dev',
    name: 'Flexbox Playground',
    nameFr: 'Testeur Flexbox',
    icon: '📦',
    tags: ['Design', 'CSS'],
    code: `const App = () => {
  const [j, setJ] = React.useState('center');
  const opts = ['start', 'center', 'end', 'space-between'];
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px' }}>
      <select onChange={e => setJ(e.target.value)} style={{ width: '100%', marginBottom: '16px' }}>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
      <div style={{ display: 'flex', justifyContent: j, background: '#eee', padding: '10px', borderRadius: '8px', gap: '5px' }}>
        <div style={{ width: '30px', height: '30px', background: '#6366f1' }} />
        <div style={{ width: '30px', height: '30px', background: '#ec4899' }} />
        <div style={{ width: '30px', height: '30px', background: '#10b981' }} />
      </div>
    </div>
  );
};`
  },
  // ─── E-COMMERCE & SOCIAL ───
  {
    id: 'product_card',
    cat: 'ec',
    name: 'Premium Product Card',
    nameFr: 'Fiche Produit Pro',
    icon: '👟',
    tags: ['E-commerce', 'UI'],
    code: `const App = () => {
  return (
    <div style={{ padding: '16px', background: '#fff', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0.1,0.1)' }}>
      <div style={{ background: '#f3f4f6', height: '140px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '60px' }}>👟</div>
      <div style={{ marginTop: '16px' }}>
        <h4 style={{ margin: 0 }}>Aura Runner G1</h4>
        <div style={{ fontSize: '12px', color: '#64748b' }}>Performance & Style</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontSize: '20px', fontWeight: 900 }}>$129</span>
          <button style={{ padding: '8px 16px', background: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 700 }}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'cart_drawer',
    cat: 'ec',
    name: 'Cart Sidebar Sim',
    nameFr: 'Panier Latéral',
    icon: '🛒',
    tags: ['E-commerce', 'UI'],
    code: `const App = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ height: '300px', background: '#f8fafc', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
      <button onClick={() => setOpen(true)} style={{ position: 'absolute', top: '10px', right: '10px', padding: '10px', background: '#6366f1', color: '#fff', borderRadius: '50%', border: 'none' }}>🛒</button>
      {open && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10 }}>
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '70%', background: '#fff', padding: '20px', animation: 'slideIn 0.3s forwards' }}>
            <button onClick={() => setOpen(false)} style={{ border: 'none', background: 'none' }}>✕ Close</button>
            <h3 style={{ marginTop: '20px' }}>Your Cart</h3>
            <p style={{ color: '#64748b' }}>No items yet.</p>
          </div>
        </div>
      )}
      <style>{"@keyframes slideIn { from{transform:translateX(100%)} to{transform:translateX(0)} }"}</style>
    </div>
  );
};`
  },
  {
    id: 'price_track',
    cat: 'ec',
    name: 'Price Tracker UI',
    nameFr: 'Suivi de Prix',
    icon: '🏷️',
    tags: ['E-commerce', 'Utility'],
    code: `const App = () => {
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ fontSize: '30px' }}>📸</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>Camera 4K Ultra</div>
          <div style={{ fontSize: '12px', color: '#10b981' }}>📉 Dropped by 12% today!</div>
        </div>
        <div style={{ fontSize: '18px', fontWeight: 900 }}>$449</div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'social_post',
    cat: 'ec',
    name: 'Twitter Post Preview',
    nameFr: 'Aperçu Post Twitter',
    icon: '🐦',
    tags: ['Social', 'Visual'],
    code: `const App = () => {
  return (
    <div style={{ padding: '16px', background: '#fff', border: '1px solid #eff3f4', borderRadius: '12px', maxWidth: '300px' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <div style={{ width: '40px', height: '40px', background: '#ccc', borderRadius: '50%' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700 }}>AuraGen AI <span style={{ fontWeight: 400, color: '#64748b' }}>@auragen</span></div>
          <div style={{ fontSize: '14px', marginTop: '4px' }}>Building the future of coding with AI! 🚀 #genai #coding</div>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'linkedin_card',
    cat: 'ec',
    name: 'LinkedIn Profile Card',
    nameFr: 'Carte Profil LinkedIn',
    icon: '👔',
    tags: ['Social', 'Professional'],
    code: `const App = () => {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
      <div style={{ height: '60px', background: 'linear-gradient(45deg, #0a66c2, #004182)' }} />
      <div style={{ padding: '16px', marginTop: '-30px' }}>
        <div style={{ width: '60px', height: '60px', background: '#fff', borderRadius: '50%', padding: '4px' }}>
          <div style={{ width: '100%', height: '100%', background: '#eee', borderRadius: '50%' }} />
        </div>
        <div style={{ marginTop: '10px' }}>
          <div style={{ fontWeight: 700 }}>Andrei Dev</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>Full Stack Engineer @ AuraGen</div>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'msg_bubbles',
    cat: 'ec',
    name: 'Chat Bubbles UI',
    nameFr: 'Bulles de Chat',
    icon: '💬',
    tags: ['Social', 'UI'],
    code: `const App = () => {
  return (
    <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div style={{ alignSelf: 'flex-start', background: '#fff', padding: '10px', borderRadius: '12px 12px 12px 0', border: '1px solid #eee', fontSize: '13px' }}>Hey, how's it going?</div>
      <div style={{ alignSelf: 'flex-end', background: '#6366f1', color: '#fff', padding: '10px', borderRadius: '12px 12px 0 12px', fontSize: '13px' }}>Working on the new Code Vault! 🚀</div>
    </div>
  );
};`
  },
  // ─── ADVANCED UI ───
  {
    id: 'hover_3d',
    cat: 'ui',
    name: '3D Hover Card',
    nameFr: 'Carte 3D Hover',
    icon: '🃏',
    tags: ['Animation', 'CSS'],
    code: `const App = () => {
  const [rot, setRot] = React.useState({ x: 0, y: 0 });
  const move = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
    setRot({ x, y });
  };
  return (
    <div style={{ perspective: '1000px', padding: '40px', textAlign: 'center' }}>
      <div 
        onMouseMove={move} onMouseLeave={() => setRot({x:0,y:0})}
        style={{ width: '200px', height: '280px', margin: '0 auto', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '20px', transform: 'rotateX('+rot.y+'deg) rotateY('+rot.x+'deg)', transition: 'transform 0.1s', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '24px', fontWeight: 900 }}
      >3D PRO</div>
    </div>
  );
};`
  },
  {
    id: 'skeleton_load',
    cat: 'ui',
    name: 'Skeleton Loader',
    nameFr: 'Chargement Squelette',
    icon: '💀',
    tags: ['UI', 'Animation'],
    code: `const App = () => {
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', animation: 'shimmer 2s infinite linear' }} />
        <div style={{ flex: 1 }}>
          <div style={{ width: '60%', height: '12px', background: '#f1f5f9', borderRadius: '4px', animation: 'shimmer 2s infinite linear' }} />
          <div style={{ width: '40%', height: '10px', background: '#f1f5f9', borderRadius: '4px', marginTop: '8px', animation: 'shimmer 2s infinite linear' }} />
        </div>
      </div>
      <div style={{ width: '100%', height: '120px', background: '#f1f5f9', borderRadius: '12px', animation: 'shimmer 2s infinite linear' }} />
      <style>{"@keyframes shimmer { 0%{opacity:0.5} 50%{opacity:1} 100%{opacity:0.5} }"}</style>
    </div>
  );
};`
  },
  {
    id: 'tab_system',
    cat: 'ui',
    name: 'Animated Tab System',
    nameFr: 'Onglets Animés',
    icon: '📑',
    tags: ['UI', 'State'],
    code: `const App = () => {
  const [active, setActive] = React.useState(0);
  const tabs = ['Profile', 'Settings', 'Security'];
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '20px' }}>
      <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: active*33.33+'%', top: '4px', bottom: '4px', width: '33.33%', background: '#fff', borderRadius: '8px', transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }} />
        {tabs.map((t, i) => (
          <button key={t} onClick={() => setActive(i)} style={{ flex: 1, position: 'relative', zIndex: 1, padding: '8px', border: 'none', background: 'none', fontSize: '13px', fontWeight: 600, color: active === i ? '#000' : '#64748b', cursor: 'pointer' }}>{t}</button>
        ))}
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center', color: '#64748b' }}>{tabs[active]} Content Loaded.</div>
    </div>
  );
};`
  },
  {
    id: 'accordion_pro',
    cat: 'ui',
    name: 'Accordion Pro',
    nameFr: 'Accordéon Pro',
    icon: '↕️',
    tags: ['UI', 'Animation'],
    code: `const App = () => {
  const [open, setOpen] = React.useState(null);
  const items = [{ q: 'What is AuraGen?', a: 'The best AI IDE.' }, { q: 'Is it free?', a: 'Check plans.' }];
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px' }}>
      {items.map((it, i) => (
        <div key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
          <button onClick={() => setOpen(open === i ? null : i)} style={{ width: '100%', padding: '16px 0', border: 'none', background: 'none', textAlign: 'left', fontWeight: 700, display: 'flex', justifyContent: 'space-between' }}>
            {it.q} <span>{open === i ? '-' : '+'}</span>
          </button>
          <div style={{ height: open === i ? 'auto' : 0, overflow: 'hidden', color: '#64748b', fontSize: '14px', paddingBottom: open === i ? '16px' : 0 }}>{it.a}</div>
        </div>
      ))}
    </div>
  );
};`
  },
  // ─── EDUCATION & SCIENCE ───
  {
    id: 'math_plot',
    cat: 'edu',
    name: 'Math Wave Plotter',
    nameFr: 'Traceur de Vagues',
    icon: '📉',
    tags: ['Math', 'Visual'],
    code: `const App = () => {
  const [freq, setFreq] = React.useState(2);
  const pts = Array(100).fill(0).map((_, i) => ({ x: i, y: 50 + Math.sin(i * freq * 0.1) * 30 }));
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '20px', textAlign: 'center' }}>
      <svg width="200" height="100" viewBox="0 0 100 100">
        <polyline points={pts.map(p => p.x+','+p.y).join(' ')} fill="none" stroke="#6366f1" strokeWidth="2" />
      </svg>
      <input type="range" min="1" max="10" value={freq} onChange={e => setFreq(+e.target.value)} style={{ width: '100%', marginTop: '20px' }} />
      <div style={{ fontSize: '12px', color: '#64748b' }}>Frequency: {freq}</div>
    </div>
  );
};`
  },
  {
    id: 'flashcards',
    cat: 'edu',
    name: 'Flashcards Pro',
    nameFr: 'Cartes Mémoire',
    icon: '🃏',
    tags: ['Education', 'State'],
    code: `const App = () => {
  const cards = [{ q: 'H2O', a: 'Water' }, { q: 'CO2', a: 'Carbon Dioxide' }];
  const [idx, setIdx] = React.useState(0);
  const [rev, setRev] = React.useState(false);
  return (
    <div style={{ padding: '24px', textAlign: 'center' }}>
      <div onClick={() => setRev(!rev)} style={{ height: '140px', background: '#fff', border: '2px solid #6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, cursor: 'pointer', transition: 'all 0.3s', transform: rev ? 'rotateY(180deg)' : 'none' }}>
        <div style={{ transform: rev ? 'rotateY(-180deg)' : 'none' }}>{rev ? cards[idx].a : cards[idx].q}</div>
      </div>
      <button onClick={() => {setIdx((idx+1)%cards.length); setRev(false);}} style={{ marginTop: '20px', padding: '10px 20px', background: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px' }}>Next Card</button>
    </div>
  );
};`
  },
  {
    id: 'solar_sim',
    cat: 'edu',
    name: 'Solar System Sim',
    nameFr: 'Mini Système Solaire',
    icon: '☀️',
    tags: ['Science', 'Animation'],
    code: `const App = () => {
  return (
    <div style={{ height: '200px', background: '#000', borderRadius: '20px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: '30px', height: '30px', background: '#f59e0b', borderRadius: '50%', transform: 'translate(-50%,-50%)', boxShadow: '0 0 20px #f59e0b' }} />
      <div style={{ position: 'absolute', left: '50%', top: '50%', width: '120px', height: '120px', border: '1px solid #334155', borderRadius: '50%', transform: 'translate(-50%,-50%)' }}>
        <div style={{ position: 'absolute', left: 'calc(100% - 10px)', top: '50%', width: '10px', height: '10px', background: '#38bdf8', borderRadius: '50%', animation: 'orbit 4s infinite linear' }} />
      </div>
      <style>{"@keyframes orbit { from{transform:rotate(0) translateX(60px) rotate(0)} to{transform:rotate(360deg) translateX(60px) rotate(-360deg)} }"}</style>
    </div>
  );
};`
  },
  // ─── AI & FUTURE ───
  {
    id: 'prompt_gen',
    cat: 'api',
    name: 'AI Prompt Builder',
    nameFr: 'Bâtisseur de Prompt',
    icon: '🤖',
    tags: ['AI', 'Utility'],
    code: `const App = () => {
  const [role, setRole] = React.useState('Coder');
  const [task, setTask] = React.useState('debug');
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', border: '1px solid #6366f1' }}>
      <h3 style={{ margin: '0 0 12px' }}>🤖 Prompt Gen</h3>
      <select onChange={e => setRole(e.target.value)} style={{ width: '100%', marginBottom: '10px' }}>
        <option>Coder</option><option>Writer</option><option>Designer</option>
      </select>
      <input placeholder="Task..." onChange={e => setTask(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }} />
      <div style={{ marginTop: '16px', padding: '10px', background: '#f5f3ff', fontSize: '12px', borderRadius: '8px' }}>
        "Act as a professional {role} and help me {task}..."
      </div>
    </div>
  );
};`
  },
  {
    id: 'bot_chat',
    cat: 'api',
    name: 'AI Chat Preview',
    nameFr: 'Aperçu Chat IA',
    icon: '💬',
    tags: ['AI', 'UI'],
    code: `const App = () => {
  const [msg, setMsg] = React.useState([{ t: 'bot', txt: 'Hello! I am AuraGen AI.' }]);
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: '16px', height: '240px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {msg.map((m, i) => (
          <div key={i} style={{ alignSelf: m.t === 'bot' ? 'flex-start' : 'flex-end', background: m.t === 'bot' ? '#f1f5f9' : '#6366f1', color: m.t === 'bot' ? '#000' : '#fff', padding: '8px 12px', borderRadius: '12px', fontSize: '12px' }}>{m.txt}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
        <input style={{ flex: 1, padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }} />
        <button style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 10px' }}>Send</button>
      </div>
    </div>
  );
};`
  },
  {
    id: 'vision_demo',
    cat: 'api',
    name: 'AI Vision Simulator',
    nameFr: 'Simulateur Vision IA',
    icon: '👁️',
    tags: ['AI', 'Visual'],
    code: `const App = () => {
  return (
    <div style={{ padding: '20px', background: '#000', borderRadius: '16px', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '200px', height: '140px', margin: '0 auto', background: '#333', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20px', left: '30px', border: '1px solid #0f0', width: '50px', height: '50px' }} />
        <div style={{ position: 'absolute', top: '5px', left: '32px', color: '#0f0', fontSize: '10px' }}>[OBJECT: CHAIR 98%]</div>
        <div style={{ position: 'absolute', bottom: '0', left: 0, right: 0, height: '2px', background: '#0f0', animation: 'scan 2s infinite linear' }} />
      </div>
      <style>{"@keyframes scan { from{top:0} to{top:100%} }"}</style>
      <div style={{ color: '#0f0', fontSize: '12px', marginTop: '10px', fontFamily: 'monospace' }}>Processing visual feed...</div>
    </div>
  );
};`
  },
  // ─── FINAL FILLERS (REACHING 100) ───
  {
    id: 'f_1', cat: 'util', name: 'Stopwatch Pro', nameFr: 'Chronomètre Pro', icon: '⏱️', tags: ['Utility'],
    code: `const App = () => {
  const [s, setS] = React.useState(0);
  const [run, setRun] = React.useState(false);
  React.useEffect(() => { let iv; if(run) iv = setInterval(()=>setS(v=>v+1), 100); return ()=>clearInterval(iv); }, [run]);
  return <div style={{padding:20,textAlign:'center',background:'#fff',borderRadius:16}}><h3>{(s/10).toFixed(1)}s</h3><button onClick={()=>setRun(!run)}>{run?'Stop':'Start'}</button></div>
};`
  },
  {
    id: 'f_2', cat: 'util', name: 'Binary Clock', nameFr: 'Horloge Binaire', icon: '⌚', tags: ['Dev'],
    code: `const App = () => {
  const [t, setT] = React.useState(new Date());
  React.useEffect(() => { const iv = setInterval(()=>setT(new Date()), 1000); return ()=>clearInterval(iv); }, []);
  return <div style={{padding:20,background:'#000',color:'#0f0',fontFamily:'monospace',borderRadius:12}}>H: {t.getHours().toString(2)}<br/>M: {t.getMinutes().toString(2)}</div>
};`
  },
  {
    id: 'f_3', cat: 'util', name: 'Zodiac Finder', nameFr: 'Signe du Zodiaque', icon: '♋', tags: ['Fun'],
    code: `const App = () => {
  return <div style={{padding:20,background:'#fef2f2',borderRadius:16,textAlign:'center'}}>Choose your month...<br/>♋ Leo (July-Aug)</div>
};`
  },
  {
    id: 'f_4', cat: 'biz', name: 'Project Roadmap', nameFr: 'Feuille de Route', icon: '🗺️', tags: ['Biz'],
    code: `const App = () => {
  return <div style={{padding:20,background:'#fff',borderRadius:16}}>Q1: MVP Launch ✅<br/>Q2: Pro Features 🚀</div>
};`
  },
  {
    id: 'f_5', cat: 'biz', name: 'Quote of Day', nameFr: 'Citation du Jour', icon: '💭', tags: ['Fun'],
    code: `const App = () => {
  return <div style={{padding:20,fontStyle:'italic',textAlign:'center'}}>"The best way to predict the future is to invent it."</div>
};`
  },
  {
    id: 'f_6', cat: 'prod', name: 'Task Board', nameFr: 'Tableau de Bord', icon: '📋', tags: ['Prod'],
    code: `const App = () => {
  return <div style={{display:'flex',gap:10,padding:10}}><div style={{background:'#eee',padding:10}}>Todo</div><div style={{background:'#eee',padding:10}}>Done</div></div>
};`
  },
  {
    id: 'f_7', cat: 'util', name: 'Ruler Tool', nameFr: 'Règle Digitale', icon: '📏', tags: ['Design'],
    code: `const App = () => {
  return <div style={{width:'100%',height:40,background:'gold',border:'1px solid #777',display:'flex',alignItems:'flex-end'}}>||||||||||||||||||||||||||||||</div>
};`
  },
  {
    id: 'f_8', cat: 'util', name: 'Color Picker Pro', nameFr: 'Sélecteur Couleur', icon: '💉', tags: ['Design'],
    code: `const App = () => {
  const [c, setC] = React.useState('#6366f1');
  return <div style={{padding:20,background:c,borderRadius:16}}><input type="color" value={c} onChange={e=>setC(e.target.value)}/></div>
};`
  },
  {
    id: 'f_9', cat: 'game', name: 'Coin Flip', nameFr: 'Pile ou Face', icon: '🪙', tags: ['Game'],
    code: `const App = () => {
  const [v, setV] = React.useState('H');
  return <div style={{textAlign:'center',padding:20}}><div style={{fontSize:40}}>{v}</div><button onClick={()=>setV(Math.random()>0.5?'H':'T')}>FLIP</button></div>
};`
  },
  {
    id: 'f_10', cat: 'data', name: 'Bar Chart Lite', nameFr: 'Histogramme', icon: '📊', tags: ['Data'],
    code: `const App = () => {
  return <div style={{display:'flex',gap:5,alignItems:'flex-end',height:100}}><div style={{height:30,width:20,background:'blue'}}/><div style={{height:80,width:20,background:'blue'}}/></div>
};`
  },
];

export default VAULT_PRO;
