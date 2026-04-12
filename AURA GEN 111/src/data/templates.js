export const appTemplates = [
  {
    id: 'project-nexus',
    title: 'Project Nexus (Kanban)',
    description: 'Enterprise task management with drag-drop aesthetics and priority tracking.',
    code: `const App = () => {
  const columns = [
    { id: 'todo', title: 'To Do', items: ['Authentication flow', 'Stripe integration', 'User dashboard'], color: '#6366f1' },
    { id: 'progress', title: 'In Progress', items: ['Modal refactoring', 'CSS optimization'], color: '#f59e0b' },
    { id: 'review', title: 'Review', items: ['Landing page assets'], color: '#10b981' },
    { id: 'done', title: 'Done', items: ['Setup CI/CD', 'Initial repo'], color: '#94a3b8' }
  ];

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#f8fafc", padding: "40px", fontFamily: "'Inter', sans-serif" }}>
      <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "28px", margin: 0, fontWeight: "800" }}>Project Nexus</h1>
          <p style={{ color: "#94a3b8", margin: "4px 0 0" }}>Internal Sprint v4.2</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ background: "#1e293b", color: "#fff", border: "1px solid #334155", padding: "10px 20px", borderRadius: "8px", fontWeight: "600" }}>Filters</button>
          <button style={{ background: "#6366f1", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600" }}>+ New Task</button>
        </div>
      </header>

      <div style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "20px" }}>
        {columns.map(col => (
          <div key={col.id} style={{ width: "300px", flexShrink: 0, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: col.color }} />
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>{col.title}</h3>
              </div>
              <span style={{ fontSize: "12px", color: "#64748b", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: "10px" }}>{col.items.length}</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {col.items.map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)", padding: "16px", borderRadius: "12px", cursor: "grab" }}>
                  <p style={{ margin: "0 0 12px", fontSize: "14px", lineHeight: "1.5" }}>{item}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: "11px", color: col.color, fontWeight: "bold", textTransform: "uppercase" }}>High Priority</div>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#475569", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>JD</div>
                  </div>
                </div>
              ))}
              <button style={{ width: "100%", background: "transparent", border: "2px dashed rgba(255,255,255,0.1)", color: "#94a3b8", padding: "12px", borderRadius: "12px", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}>+ Add item</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'vitality-hub',
    title: 'Vitality Health Hub',
    description: 'A comprehensive medical and fitness dashboard with data rings and charts.',
    code: `const App = () => {
  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", padding: "40px", fontFamily: "'Outfit', sans-serif" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h1 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", margin: 0 }}>Good morning, Alex.</h1>
            <p style={{ color: "#64748b", margin: "8px 0 0" }}>You've recovered well. Ready for your 5km run?</p>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "16px", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e2e8f0" }}>🔔</div>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(45deg, #6366f1, #d946ef)" }} />
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginBottom: "40px" }}>
          {[
            { label: 'Activity', val: '85%', unit: 'Daily Goal', color: '#6366f1', icon: '⚡' },
            { label: 'Heart Rate', val: '72', unit: 'bpm', color: '#ef4444', icon: '❤️' },
            { label: 'Sleep Score', val: '92', unit: 'Optimal', color: '#8b5cf6', icon: '🌙' }
          ].map(stat => (
            <div key={stat.label} style={{ background: "#fff", padding: "32px", borderRadius: "24px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <span style={{ fontSize: "24px" }}>{stat.icon}</span>
                <div style={{ fontSize: "12px", color: stat.color, fontWeight: "bold", background: \`\${stat.color}15\`, padding: "4px 12px", borderRadius: "20px" }}>Active</div>
              </div>
              <div style={{ fontSize: "40px", fontWeight: "900", color: "#0f172a" }}>{stat.val}<span style={{ fontSize: "16px", color: "#94a3b8", fontWeight: "normal", marginLeft: "4px" }}>{stat.unit}</span></div>
              <div style={{ color: "#64748b", fontSize: "14px", marginTop: "8px" }}>{stat.label} Overview</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
          <div style={{ background: "#fff", padding: "32px", borderRadius: "24px", border: "1px solid #e2e8f0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
              <h3 style={{ margin: 0, fontSize: "20px" }}>Performance History</h3>
            </div>
            <div style={{ height: "200px", display: "flex", alignItems: "flex-end", gap: "12px" }}>
              {Array.from({length: 12}).map((_, i) => (
                <div key={i} style={{ flex: 1, background: "#f1f5f9", borderRadius: "4px", position: "relative", height: \`\${Math.random() * 100 + 20}%\` }}>
                  <div style={{ position: "absolute", bottom: 0, width: "100%", height: "40%", background: "#6366f1", borderRadius: "4px" }} />
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#0f172a", padding: "32px", borderRadius: "24px", color: "#fff" }}>
            <h3 style={{ margin: "0 0 24px", fontSize: "18px" }}>Today's Plan</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {['Mountain Biking', 'Stretching Session', 'Evening Medit.'].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "16px", borderRadius: "16px", display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: i === 0 ? "#60a5fa" : "#334155" }} />
                  <span style={{ fontSize: "15px", fontWeight: "600" }}>{item}</span>
                </div>
              ))}
            </div>
            <button style={{ width: "100%", marginTop: "32px", padding: "16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "12px", fontWeight: "bold" }}>Launch Workout</button>
          </div>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'codeflux-ide',
    title: 'CodeFlux Pro IDE',
    description: 'Professional development environment with a file tree and dark editor layout.',
    code: `const App = () => {
  return (
    <div style={{ background: "#0d1117", display: "flex", height: "100vh", fontFamily: "'Fira Code', monospace", color: "#c9d1d9" }}>
      <div style={{ width: "240px", borderRight: "1px solid #30363d", padding: "20px", display: "flex", flexDirection: "column" }}>
        <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "#8b949e", marginBottom: "20px", letterSpacing: "1px" }}>Explorer</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
          <div style={{ padding: "8px", background: "rgba(255,255,255,0.05)", borderRadius: "4px", color: "#58a6ff" }}>📄 App.jsx</div>
          <div style={{ padding: "8px", color: "#8b949e" }}>📁 components</div>
          <div style={{ padding: "8px", color: "#8b949e" }}>📁 store</div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "12px 20px", background: "#161b22", borderBottom: "1px solid #30363d", display: "flex", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "#58a6ff", borderBottom: "2px solid #58a6ff", paddingBottom: "10px" }}>App.jsx</span>
        </div>
        <div style={{ flex: 1, padding: "32px", fontSize: "15px", lineHeight: "1.6" }}>
          <div><span style={{ color: "#ff7b72" }}>import</span> React <span style={{ color: "#ff7b72" }}>from</span> <span style={{ color: "#a5d6ff" }}>'react'</span>;</div>
          <div style={{ color: "#8b949e" }}>// Building the future...</div>
        </div>
        
        <div style={{ height: "180px", background: "#010409", borderTop: "1px solid #30363d", padding: "20px" }}>
          <div style={{ color: "#7ee787" }}>$ npm run dev</div>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'atmo-weather',
    title: 'AtmoWeather Pro',
    description: 'Dynamic weather dashboard with atmospheric animations and 7-day forecast.',
    code: `const App = () => {
  return (
    <div style={{ background: "linear-gradient(180deg, #3b82f6 0%, #2563eb 100%)", minHeight: "100vh", color: "#fff", padding: "40px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "48px", fontWeight: "800", margin: 0 }}>London</h1>
        <div style={{ fontSize: "120px", fontWeight: "900", margin: "20px 0" }}>18°</div>
        <p style={{ fontSize: "24px", fontWeight: "500" }}>Mostly Cloudy</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "20px", marginTop: "60px" }}>
          {['Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
            <div key={day} style={{ background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: "20px" }}>
              <div style={{ fontSize: "14px" }}>{day}</div>
              <div style={{ fontSize: "24px", margin: "12px 0" }}>{i % 2 === 0 ? '☀️' : '🌧️'}</div>
              <div style={{ fontWeight: "bold" }}>{20 - i}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'domus-home',
    title: 'Domus Smart Home',
    description: 'Control your smart devices, lighting, and security from a sleek central hub.',
    code: `const App = () => {
  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "#fff", padding: "40px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "40px" }}>Welcome Home</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
        {['Living Room', 'Kitchen', 'Security', 'Bedroom', 'Garage', 'Garden'].map(item => (
          <div key={item} style={{ background: "#18181b", padding: "32px", borderRadius: "24px", border: "1px solid #27272a" }}>
            <h3 style={{ margin: 0 }}>{item}</h3>
            <div style={{ color: "#6366f1", marginTop: "12px" }}>Active</div>
          </div>
        ))}
      </div>
    </div>
  );
};`
  },
  {
    id: 'novatrade-exchange',
    title: 'NovaTrade Exchange',
    description: 'High-performance crypto trading terminal with dark mode analytics.',
    code: `const App = () => {
  return (
    <div style={{ background: "#09090b", minHeight: "100vh", color: "#fff", display: "flex" }}>
      <div style={{ width: "80px", borderRight: "1px solid #27272a", textAlign: "center", padding: "40px 0" }}>📊</div>
      <div style={{ flex: 1, padding: "40px" }}>
        <div style={{ color: "#10b981", fontSize: "24px", fontWeight: "900" }}>BTC $64,230</div>
        <div style={{ background: "#18181b", borderRadius: "24px", height: "400px", marginTop: "40px" }} />
      </div>
    </div>
  );
};`
  },
  {
    id: 'zenith-finance',
    title: 'Zenith Personal Finance',
    description: 'Track your wealth, monthly budgets, and savings goals in a clean interface.',
    code: `const App = () => {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "40px", color: "#1a1a1a" }}>
      <h1 style={{ color: "#6366f1", fontWeight: "900" }}>Zenith Finance</h1>
      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", padding: "40px", borderRadius: "24px", color: "#fff", margin: "40px 0" }}>
        <h3>Total Wealth</h3>
        <div style={{ fontSize: "40px", fontWeight: "900" }}>$84,250.40</div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'gourmet-guide',
    title: 'Gourmet Guide (Recipes)',
    description: 'Beautiful culinary app for exploring recipes and meal plans.',
    code: `const App = () => {
  return (
    <div style={{ background: "#fff", minHeight: "100vh", padding: "40px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "900" }}>Gourmet Guide</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "40px" }}>
        {[1,2,3].map(i => <div key={i} style={{ background: "#f3f4f6", height: "200px", borderRadius: "16px" }} />)}
      </div>
    </div>
  );
};`
  },
  {
    id: 'metricpulse',
    title: 'MetricPulse Analytics',
    description: 'Data dashboard for monitoring engagement and growth metrics.',
    code: `const App = () => {
  return (
    <div style={{ background: "#f4f7fe", minHeight: "100vh", padding: "40px" }}>
      <h1>MetricPulse</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", marginTop: "40px" }}>
        {['Users', 'Revenue', 'CTR', 'Growth'].map(l => <div key={l} style={{ background: "#fff", padding: "24px", borderRadius: "20px" }}>{l}</div>)}
      </div>
    </div>
  );
};`
  },
  {
    id: 'inkwell-notes',
    title: 'Inkwell (Notes)',
    description: 'Minimalist note-taking app with a focus on typography and clarity.',
    code: `const App = () => {
  return (
    <div style={{ background: "#fff", height: "100vh", display: "flex", fontFamily: "serif" }}>
      <div style={{ width: "260px", background: "#f9f9f9", padding: "40px" }}>Inkwell</div>
      <div style={{ flex: 1, padding: "80px" }}>
        <h1 style={{ fontSize: "40px" }}>My thoughts</h1>
        <p style={{ color: "#666" }}>Focus today.</p>
      </div>
    </div>
  );
};`
  }
];

export const siteTemplates = [
  {
    id: 'portfolio',
    title: 'Creative Portfolio',
    description: 'A dark, bold portfolio for designers and developers.',
    code: `const App = () => {
  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", fontFamily: "Helvetica, Arial, sans-serif" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "120px 20px" }}>
        <h1 style={{ fontSize: "72px", fontWeight: "900", lineHeight: "1", marginBottom: "40px" }}>
          I am Aura.<br/><span style={{ color: "#6366f1" }}>Designer Extraordinaire.</span>
        </h1>
        <p style={{ fontSize: "20px", color: "#888", maxWidth: "400px", lineHeight: "1.6" }}>
          Crafting digital experiences that bridge the gap between imagination and reality.
        </p>
        <div style={{ marginTop: "60px", display: "flex", gap: "20px" }}>
          <button style={{ background: "#6366f1", border: "none", color: "#fff", padding: "16px 32px", fontSize: "18px", fontWeight: "bold", borderRadius: "8px" }}>View Work</button>
          <button style={{ background: "transparent", border: "1px solid #333", color: "#fff", padding: "16px 32px", fontSize: "18px", fontWeight: "bold", borderRadius: "8px" }}>Contact Me</button>
        </div>
      </div>
    </div>
  );
};`
  }
];

export const readyMadeTemplates = [
  {
    id: 'crm-full',
    title: 'Complete Enterprise CRM',
    description: 'Full CRM suite with lead management, sales pipeline, and teammate chat.',
    code: `const App = () => {
  const [leads, setLeads] = React.useState([
    { name: "Acme Corp", status: "Negotiation", value: "$45,000" },
    { name: "Global Tech", status: "Discovery", value: "$12,000" },
    { name: "Z-Systems", status: "Closed", value: "$89,000" }
  ]);

  return (
    <div style={{ background: "#f1f5f9", height: "100vh", display: "flex", fontFamily: "Inter, sans-serif" }}>
      <div style={{ width: "240px", background: "#0f172a", color: "#fff", padding: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "30px" }}>Nexus CRM</h2>
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {["Dashboard", "Leads", "Analytics", "Settings"].map(item => (
            <div key={item} style={{ padding: "10px", borderRadius: "8px", cursor: "pointer", background: item === "Leads" ? "#1e293b" : "transparent" }}>{item}</div>
          ))}
        </nav>
      </div>
      <div style={{ flex: 1, padding: "40px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "24px", color: "#0f172a" }}>Sales Pipeline</h1>
          <button style={{ background: "#6366f1", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold" }}>+ New Lead</button>
        </header>
        <div style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead style={{ background: "#f8fafc" }}>
              <tr>
                <th style={{ textAlign: "left", padding: "20px", color: "#64748b" }}>Company</th>
                <th style={{ textAlign: "left", padding: "20px", color: "#64748b" }}>Status</th>
                <th style={{ textAlign: "left", padding: "20px", color: "#64748b" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, i) => (
                <tr key={i} style={{ borderTop: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "20px", fontWeight: "600" }}>{lead.name}</td>
                  <td style={{ padding: "20px" }}><span style={{ 
                    padding: "4px 12px", borderRadius: "20px", fontSize: "12px",
                    background: lead.status === "Closed" ? "#dcfce7" : "#fef9c3",
                    color: lead.status === "Closed" ? "#166534" : "#854d0e"
                  }}>{lead.status}</span></td>
                  <td style={{ padding: "20px" }}>{lead.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};`
  },
  {
    id: 'fitness-app',
    title: 'Fitness Tracker Plus',
    description: 'Complete workout tracking app with calorie counters and session history.',
    code: `const App = () => {
  return (
    <div style={{ background: "#000", color: "#fff", height: "100vh", fontFamily: "system-ui" }}>
      <header style={{ padding: "20px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #222" }}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>VigorAI</span>
        <div style={{ width: "32px", height: "32px", background: "linear-gradient(to bottom, #d946ef, #6366f1)", borderRadius: "50%" }}></div>
      </header>
      <div style={{ padding: "30px" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "30px" }}>Stay hard,<br/>Alexander.</h1>
        <div style={{ background: "#111", padding: "24px", borderRadius: "24px", marginBottom: "20px" }}>
          <div style={{ color: "#aaa", fontSize: "14px" }}>Today's Goal</div>
          <div style={{ fontSize: "48px", fontWeight: "bold" }}>85%</div>
          <div style={{ height: "6px", background: "#333", borderRadius: "3px", marginTop: "12px" }}>
            <div style={{ width: "85%", height: "100%", background: "#d946ef", borderRadius: "3px" }}></div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
          <div style={{ background: "#6366f1", padding: "20px", borderRadius: "24px" }}>
            <div style={{ fontSize: "14px" }}>Calories</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>2,150</div>
          </div>
          <div style={{ background: "#222", padding: "20px", borderRadius: "24px" }}>
            <div style={{ fontSize: "14px", color: "#aaa" }}>Active Time</div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>1h 45m</div>
          </div>
        </div>
      </div>
    </div>
  );
};`
  }
];

readyMadeTemplates.push({
  id: 'ecommerce',
  title: 'E-Commerce Storefront',
  description: 'A sleek product grid with a shopping cart sidebar and Add to Cart logic.',
  code: `const App = () => {
  const [cart, setCart] = React.useState([]);
  const products = [
    { id: 1, name: "Premium Wireless Headphones", price: 299, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400" },
    { id: 2, name: "Minimalist Watch", price: 149, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400" },
    { id: 3, name: "Smart Camera", price: 599, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400" },
    { id: 4, name: "Mechanical Keyboard", price: 199, img: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <div style={{ display: "flex", fontFamily: "Inter, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <div style={{ flex: 1, padding: "40px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "40px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "28px", color: "#0f172a" }}>Discover Products</h1>
            <p style={{ margin: "8px 0 0", color: "#64748b" }}>Summer collection 2026 is here.</p>
          </div>
          <button style={{ border: "none", background: "#fff", padding: "12px 24px", borderRadius: "12px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", fontWeight: "bold", cursor: "pointer" }}>Filter ↓</button>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "32px" }}>
          {products.map(p => (
            <div key={p.id} style={{ background: "#fff", borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)", transition: "transform 0.2s" }} onMouseOver={(e)=>e.currentTarget.style.transform="translateY(-5px)"} onMouseOut={(e)=>e.currentTarget.style.transform="translateY(0)"}>
              <div style={{ height: "240px", backgroundImage: \`url(\${p.img})\`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: "24px" }}>
                <h3 style={{ margin: "0 0 8px", fontSize: "18px", color: "#1e293b" }}>{p.name}</h3>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "20px", fontWeight: "900", color: "#6366f1" }}>\${p.price}</span>
                  <button onClick={() => setCart([...cart, p])} style={{ background: "#0f172a", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ width: "350px", background: "#fff", borderLeft: "1px solid #e2e8f0", padding: "40px", display: "flex", flexDirection: "column" }}>
        <h2 style={{ margin: "0 0 32px", color: "#0f172a" }}>Your Cart ({cart.length})</h2>
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {cart.length === 0 ? <p style={{ color: "#94a3b8" }}>Cart is empty.</p> : cart.map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "16px", alignItems: "center", borderBottom: "1px solid #f1f5f9", paddingBottom: "16px" }}>
              <div style={{ width: "60px", height: "60px", borderRadius: "12px", backgroundImage: \`url(\${item.img})\`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div>
                <div style={{ fontWeight: "600", color: "#1e293b", fontSize: "14px" }}>{item.name}</div>
                <div style={{ color: "#6366f1", fontWeight: "bold", marginTop: "4px" }}>\${item.price}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "2px dashed #e2e8f0", paddingTop: "24px", marginTop: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "24px", fontSize: "18px", fontWeight: "bold", color: "#0f172a" }}>
            <span>Total</span>
            <span>\${cart.reduce((sum, item) => sum + item.price, 0)}</span>
          </div>
          <button style={{ width: "100%", background: "#4f46e5", color: "#fff", padding: "16px", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Checkout Now</button>
        </div>
      </div>
    </div>
  );
};`
});

readyMadeTemplates.push({
  id: 'kanban',
  title: 'Kanban Task Board',
  description: 'Trello-style board with columns and interactive-looking cards.',
  code: `const App = () => {
  const board = [
    { title: "To Do", color: "#94a3b8", tasks: ["Research competitor pricing", "Design new landing page hero", "Write blog post draft"] },
    { title: "In Progress", color: "#3b82f6", tasks: ["Develop checkout API", "Fix navigation bug on mobile"] },
    { title: "Review", color: "#f59e0b", tasks: ["Update user documentation"] },
    { title: "Done", color: "#10b981", tasks: ["Setup CI/CD pipeline", "Deploy staging environment", "Weekly team sync"] }
  ];

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", padding: "32px", fontFamily: "sans-serif", color: "#f8fafc" }}>
      <header style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "28px", letterSpacing: "-0.025em" }}>Project Alpha</h1>
          <p style={{ margin: "8px 0 0", color: "#94a3b8" }}>Sprint 12 • 4 days remaining</p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold" }}>Filter</button>
          <button style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "bold" }}>+ New Task</button>
        </div>
      </header>

      <div style={{ display: "flex", gap: "24px", overflowX: "auto", paddingBottom: "24px" }}>
        {board.map((col, i) => (
          <div key={i} style={{ width: "320px", flexShrink: 0, background: "rgba(255,255,255,0.03)", borderRadius: "16px", padding: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: col.color }} />
                <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600" }}>{col.title}</h3>
              </div>
              <span style={{ background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: "12px", fontSize: "12px", color: "#cbd5e1" }}>{col.tasks.length}</span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {col.tasks.map((task, j) => (
                <div key={j} style={{ background: "rgba(255,255,255,0.08)", padding: "16px", borderRadius: "12px", cursor: "grab", border: "1px solid rgba(255,255,255,0.05)", transition: "all 0.2s" }} onMouseOver={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.12)"} onMouseOut={(e)=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                    <span style={{ width: "32px", height: "4px", borderRadius: "2px", background: col.color, opacity: 0.6 }} />
                  </div>
                  <p style={{ margin: 0, fontSize: "14px", lineHeight: "1.5", color: "#e2e8f0" }}>{task}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px" }}>
                    <div style={{ fontSize: "12px", color: "#64748b", display: "flex", alignItems: "center", gap: "4px" }}>
                      📅 Oct 24
                    </div>
                    <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#475569", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: "bold" }}>JD</div>
                  </div>
                </div>
              ))}
              <button style={{ background: "transparent", border: "2px dashed rgba(255,255,255,0.1)", color: "#94a3b8", padding: "12px", borderRadius: "12px", marginTop: "8px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s" }} onMouseOver={(e)=>e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"} onMouseOut={(e)=>e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"}>+ Add Card</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};`
});

readyMadeTemplates.push({
  id: 'real-estate',
  title: 'Real Estate Explorer',
  description: 'High-end property listing app with image cards and pricing.',
  code: `const App = () => {
  const properties = [
    { id: 1, title: "Modern Glass Villa", loc: "Beverly Hills, CA", price: "$4.5M", beds: 5, baths: 6, sqft: "6,200", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600" },
    { id: 2, title: "Downtown Penthouse", loc: "Manhattan, NY", price: "$2.8M", beds: 3, baths: 3, sqft: "2,800", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600" },
    { id: 3, title: "Lakeside Retreat", loc: "Lake Tahoe, NV", price: "$1.9M", beds: 4, baths: 4, sqft: "3,500", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui", background: "#f9fafb", minHeight: "100vh" }}>
      <nav style={{ background: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6" }}>
        <h1 style={{ margin: 0, fontSize: "24px", color: "#111827", letterSpacing: "-1px" }}>Luxe<span style={{ color: "#3b82f6" }}>Estates</span></h1>
        <div style={{ display: "flex", gap: "24px", color: "#4b5563", fontWeight: "500" }}>
          <span>Buy</span><span>Rent</span><span>Sell</span><span>Agents</span>
        </div>
        <button style={{ background: "#111827", color: "#fff", padding: "10px 24px", borderRadius: "999px", border: "none", fontWeight: "bold" }}>Sign In</button>
      </nav>

      <div style={{ padding: "60px 40px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div style={{ maxWidth: "600px" }}>
            <h2 style={{ fontSize: "48px", fontWeight: "800", color: "#111827", lineHeight: "1.1", margin: "0 0 16px" }}>Find your next perfect place.</h2>
            <p style={{ fontSize: "18px", color: "#6b7280", margin: 0 }}>Explore the most premium properties available on the market right now.</p>
          </div>
          <div style={{ display: "flex", background: "#fff", borderRadius: "12px", border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
            <input type="text" placeholder="Location, City, Zip" style={{ border: "none", padding: "16px 20px", width: "250px", outline: "none", fontSize: "16px" }} />
            <button style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "0 24px", fontWeight: "bold", fontSize: "16px", cursor: "pointer" }}>Search</button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "32px" }}>
          {properties.map(p => (
            <div key={p.id} style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #f3f4f6", transition: "box-shadow 0.3s" }} onMouseOver={(e)=>e.currentTarget.style.boxShadow="0 20px 25px -5px rgba(0,0,0,0.1)"} onMouseOut={(e)=>e.currentTarget.style.boxShadow="none"}>
              <div style={{ position: "relative" }}>
                <div style={{ height: "260px", backgroundImage: \`url(\${p.img})\`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <span style={{ position: "absolute", top: "16px", left: "16px", background: "#fff", color: "#111827", padding: "6px 12px", borderRadius: "8px", fontWeight: "bold", fontSize: "14px" }}>Featured</span>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ color: "#3b82f6", fontWeight: "800", fontSize: "24px" }}>{p.price}</span>
                  <span style={{ color: "#9ca3af", fontSize: "14px" }}>{p.sqft} sqft</span>
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: "20px", color: "#111827" }}>{p.title}</h3>
                <p style={{ margin: "0 0 20px", color: "#6b7280", fontSize: "15px" }}>{p.loc}</p>
                <div style={{ display: "flex", gap: "16px", borderTop: "1px solid #f3f4f6", paddingTop: "20px", color: "#4b5563", fontSize: "14px", fontWeight: "500" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>🛏️ {p.beds} Beds</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>🛁 {p.baths} Baths</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`
});

readyMadeTemplates.push({
  id: 'music-player',
  title: 'Music Streaming Player',
  description: 'Elegant audio player interface with queue and controls.',
  code: `const App = () => {
  const songs = [
    { title: "Midnight City", artist: "M83", time: "4:03", active: true },
    { title: "Blinding Lights", artist: "The Weeknd", time: "3:20", active: false },
    { title: "Walking On A Dream", artist: "Empire of the Sun", time: "3:18", active: false },
    { title: "Electric Feel", artist: "MGMT", time: "3:49", active: false }
  ];

  return (
    <div style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 100%)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px", fontFamily: "sans-serif" }}>
      <div style={{ width: "100%", maxWidth: "900px", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)", borderRadius: "32px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
        
        {/* Left: Player */}
        <div style={{ flex: 1, padding: "48px", display: "flex", flexDirection: "column", alignItems: "center", borderRight: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ width: "280px", height: "280px", borderRadius: "24px", background: "linear-gradient(45deg, #f43f5e, #8b5cf6)", boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)", marginBottom: "32px", position: "relative" }}>
            <div style={{ position: "absolute", inset: "0", background: "url('https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400') center/cover", borderRadius: "24px", mixBlendMode: "overlay", opacity: 0.8 }} />
          </div>
          <h2 style={{ color: "#fff", margin: "0 0 8px", fontSize: "28px", fontWeight: "800", letterSpacing: "-1px" }}>Midnight City</h2>
          <p style={{ color: "#a78bfa", margin: "0 0 40px", fontSize: "16px" }}>M83 • Hurry Up, We're Dreaming</p>
          
          <div style={{ width: "100%", maxWidth: "320px", marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "#8b5cf6", fontSize: "12px", fontWeight: "bold", marginBottom: "8px" }}>
              <span>1:42</span><span>4:03</span>
            </div>
            <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.1)", borderRadius: "3px" }}>
              <div style={{ width: "45%", height: "100%", background: "#f43f5e", borderRadius: "3px", position: "relative" }}>
                <div style={{ position: "absolute", right: "-6px", top: "-4px", width: "14px", height: "14px", background: "#fff", borderRadius: "50%", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }} />
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <button style={{ background: "transparent", border: "none", color: "#a78bfa", fontSize: "24px", cursor: "pointer" }}>⏮</button>
            <button style={{ width: "72px", height: "72px", borderRadius: "50%", background: "#fff", border: "none", color: "#f43f5e", fontSize: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}>▶</button>
            <button style={{ background: "transparent", border: "none", color: "#a78bfa", fontSize: "24px", cursor: "pointer" }}>⏭</button>
          </div>
        </div>
        
        {/* Right: Queue */}
        <div style={{ width: "380px", padding: "40px", background: "rgba(0,0,0,0.2)" }}>
          <h3 style={{ color: "#fff", margin: "0 0 24px", fontSize: "20px" }}>Up Next</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {songs.map((song, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px", padding: "16px", borderRadius: "16px", background: song.active ? "rgba(244,63,94,0.1)" : "transparent", border: song.active ? "1px solid rgba(244,63,94,0.2)" : "1px solid transparent", cursor: "pointer", transition: "background 0.2s" }} onMouseOver={(e)=>!song.active && (e.currentTarget.style.background="rgba(255,255,255,0.05)")} onMouseOut={(e)=>!song.active && (e.currentTarget.style.background="transparent")}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: song.active ? "linear-gradient(45deg, #f43f5e, #8b5cf6)" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px" }}>
                  {song.active ? "♪" : i+1}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: song.active ? "#f43f5e" : "#e2e8f0", fontWeight: "bold", fontSize: "15px", marginBottom: "4px" }}>{song.title}</div>
                  <div style={{ color: "#94a3b8", fontSize: "13px" }}>{song.artist}</div>
                </div>
                <div style={{ color: "#64748b", fontSize: "13px" }}>{song.time}</div>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};`
});

readyMadeTemplates.push({
  id: 'email-client',
  title: 'Modern Email Client',
  description: 'Split-pane email interface with inbox list and reading pane.',
  code: `const App = () => {
  const emails = [
    { sender: "Design Team", subject: "Review: Q3 Marketing Assets", preview: "Hi there, I've attached the latest marketing concepts for the upcoming...", time: "10:42 AM", unread: true },
    { sender: "Sarah Jenkins", subject: "Lunch on Friday?", preview: "Are you free to grab lunch this Friday? We need to discuss the...", time: "Yesterday", unread: true },
    { sender: "GitHub", subject: "[Security Alert] Deprecated dependencies", preview: "We found standard security vulnerabilities in your repository...", time: "Oct 12", unread: false },
    { sender: "Amazon", subject: "Your order has been shipped", preview: "Great news! Your package is on its way and will arrive by Thursday.", time: "Oct 10", unread: false }
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "system-ui, sans-serif", background: "#f1f5f9" }}>
      {/* Sidebar */}
      <div style={{ width: "240px", background: "#f8fafc", borderRight: "1px solid #e2e8f0", padding: "20px", display: "flex", flexDirection: "column" }}>
        <button style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", marginBottom: "24px", cursor: "pointer" }}>Compose New</button>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {["Inbox", "Sent", "Drafts", "Spam", "Trash"].map((item, i) => (
            <div key={item} style={{ padding: "10px 12px", borderRadius: "8px", background: i === 0 ? "#e0e7ff" : "transparent", color: i === 0 ? "#4f46e5" : "#475569", fontWeight: i === 0 ? "600" : "normal", cursor: "pointer", display: "flex", justifyContent: "space-between" }}>
              <span>{item}</span>
              {i === 0 && <span style={{ background: "#4f46e5", color: "#fff", fontSize: "12px", padding: "2px 8px", borderRadius: "12px" }}>2</span>}
            </div>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ width: "350px", background: "#fff", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0, fontSize: "20px", color: "#0f172a" }}>Inbox</h2>
          <button style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer" }}>↻</button>
        </div>
        <div style={{ flex: 1, overflowY: "auto" }}>
          {emails.map((email, i) => (
            <div key={i} style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", cursor: "pointer", background: i === 0 ? "#f8fafc" : "transparent", borderLeft: i === 0 ? "3px solid #4f46e5" : "3px solid transparent" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontWeight: email.unread ? "bold" : "600", color: "#1e293b", fontSize: "15px" }}>{email.sender}</span>
                <span style={{ color: "#94a3b8", fontSize: "12px" }}>{email.time}</span>
              </div>
              <div style={{ fontWeight: email.unread ? "600" : "normal", color: "#334155", fontSize: "14px", marginBottom: "4px" }}>{email.subject}</div>
              <div style={{ color: "#64748b", fontSize: "13px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{email.preview}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pane */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", padding: "32px" }}>
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#4f46e5", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold" }}>DT</div>
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: "24px", color: "#0f172a" }}>Review: Q3 Marketing Assets</h1>
            <div style={{ color: "#64748b", fontSize: "14px" }}>From: <span style={{ color: "#1e293b", fontWeight: "500" }}>Design Team</span> &lt;design@acme.com&gt;</div>
          </div>
        </div>
        <div style={{ color: "#334155", lineHeight: "1.6", fontSize: "15px", flex: 1 }}>
          <p>Hi there,</p>
          <p>I've attached the latest marketing concepts for the upcoming Q4 campaign. We focused on a lighter, more vibrant color palette as discussed in last week's sync.</p>
          <p>Please review and provide your feedback by EOD Friday so we can finalize the deliverables.</p>
          <div style={{ display: "flex", gap: "16px", marginTop: "32px" }}>
            <div style={{ padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc" }}>
              <span style={{ fontSize: "24px" }}>📄</span>
              <div>
                <div style={{ fontWeight: "600", fontSize: "14px", color: "#1e293b" }}>q3-presentation.pdf</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>2.4 MB</div>
              </div>
            </div>
            <div style={{ padding: "12px 16px", border: "1px solid #e2e8f0", borderRadius: "8px", display: "flex", alignItems: "center", gap: "12px", background: "#f8fafc" }}>
              <span style={{ fontSize: "24px" }}>🖼️</span>
              <div>
                <div style={{ fontWeight: "600", fontSize: "14px", color: "#1e293b" }}>social-banners.zip</div>
                <div style={{ fontSize: "12px", color: "#64748b" }}>14.1 MB</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "24px" }}>
          <button style={{ background: "#f1f5f9", color: "#475569", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", marginRight: "12px", cursor: "pointer" }}>Reply</button>
          <button style={{ background: "#f1f5f9", color: "#475569", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Forward</button>
        </div>
      </div>
    </div>
  );
};`
});

readyMadeTemplates.push({
  id: 'crypto-dashboard',
  title: 'Financial Crypto Tracker',
  description: 'Dark-mode dashboard showing coin prices and portfolio balance.',
  code: `const App = () => {
  const coins = [
    { name: "Bitcoin", sym: "BTC", price: "$64,230.50", change: "+2.4%", up: true },
    { name: "Ethereum", sym: "ETH", price: "$3,410.20", change: "+1.8%", up: true },
    { name: "Solana", sym: "SOL", price: "$145.80", change: "-0.5%", up: false },
    { name: "Polkadot", sym: "DOT", price: "$18.40", change: "+4.2%", up: true }
  ];

  return (
    <div style={{ background: "#09090b", color: "#fafafa", minHeight: "100vh", fontFamily: "Inter, sans-serif", padding: "40px" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h1 style={{ fontSize: "24px", margin: 0, fontWeight: "800", letterSpacing: "-0.5px" }}>Nova<span style={{ color: "#10b981" }}>Fi</span></h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ background: "#18181b", padding: "8px 16px", borderRadius: "20px", fontSize: "14px" }}>Pro Account</div>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(45deg, #10b981, #3b82f6)", borderRadius: "50%" }}></div>
        </div>
      </header>

      <div style={{ display: "flex", gap: "40px" }}>
        {/* Left: Balance */}
        <div style={{ width: "380px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ background: "linear-gradient(135deg, #18181b 0%, #09090b 100%)", border: "1px solid #27272a", borderRadius: "24px", padding: "32px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
            <div style={{ color: "#a1a1aa", fontSize: "14px", marginBottom: "8px" }}>Total Portfolio Value</div>
            <div style={{ fontSize: "48px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "16px" }}>$124,500<span style={{ fontSize: "24px", color: "#52525b" }}>.80</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "#10b981", fontWeight: "bold", background: "rgba(16,185,129,0.1)", padding: "6px 16px", borderRadius: "12px", width: "fit-content" }}>
              ↑ $3,240.50 (2.4%) Today
            </div>
            
            <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
              <button style={{ flex: 1, background: "#fafafa", color: "#09090b", padding: "14px", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" }}>Deposit</button>
              <button style={{ flex: 1, background: "#27272a", color: "#fafafa", padding: "14px", border: "none", borderRadius: "12px", fontWeight: "bold", cursor: "pointer" }}>Withdraw</button>
            </div>
          </div>
          
          <div style={{ background: "#18181b", borderRadius: "24px", padding: "32px", border: "1px solid #27272a" }}>
            <h3 style={{ margin: "0 0 24px", fontSize: "18px" }}>Recent Activity</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { type: "Bought BTC", date: "Today, 10:24 AM", amt: "+0.15 BTC" },
                { type: "Sold ETH", date: "Yesterday, 4:10 PM", amt: "-2.0 ETH" },
                { type: "Deposit", date: "Oct 12, 09:00 AM", amt: "+$5,000" }
              ].map((act, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "15px", marginBottom: "4px" }}>{act.type}</div>
                    <div style={{ color: "#71717a", fontSize: "13px" }}>{act.date}</div>
                  </div>
                  <div style={{ fontWeight: "bold", color: act.amt.startsWith("+") ? "#10b981" : "#fafafa" }}>{act.amt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Markets */}
        <div style={{ flex: 1, background: "#18181b", borderRadius: "24px", padding: "32px", border: "1px solid #27272a" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            <h2 style={{ margin: 0, fontSize: "20px" }}>Market Watch</h2>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ background: "#27272a", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>1H</span>
              <span style={{ background: "#fafafa", color: "#09090b", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "bold", cursor: "pointer" }}>24H</span>
              <span style={{ background: "#27272a", padding: "6px 12px", borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>1W</span>
            </div>
          </div>
          
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ color: "#71717a", fontSize: "14px" }}>
                <th style={{ paddingBottom: "20px", fontWeight: "normal" }}>Asset</th>
                <th style={{ paddingBottom: "20px", fontWeight: "normal" }}>Price</th>
                <th style={{ paddingBottom: "20px", fontWeight: "normal" }}>24h Change</th>
                <th style={{ paddingBottom: "20px", fontWeight: "normal" }}>Chart 7d</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin, i) => (
                <tr key={i} style={{ borderTop: "1px solid #27272a" }}>
                  <td style={{ padding: "20px 0" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "32px", height: "32px", background: "#3f3f46", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "12px" }}>{coin.sym[0]}</div>
                      <div>
                        <div style={{ fontWeight: "bold", fontSize: "16px" }}>{coin.name}</div>
                        <div style={{ color: "#71717a", fontSize: "13px" }}>{coin.sym}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "20px 0", fontWeight: "600", fontSize: "16px" }}>{coin.price}</td>
                  <td style={{ padding: "20px 0", fontWeight: "bold", color: coin.up ? "#10b981" : "#ef4444" }}>{coin.change}</td>
                  <td style={{ padding: "20px 0" }}>
                    <div style={{ width: "100px", height: "30px", background: "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 30%22%3E%3Cpath fill=%22none%22 stroke=%22%2310b981%22 stroke-width=%222%22 d=%22M0,20 Q10,10 20,25 T40,15 T60,5 T80,20 T100,10%22/%3E%3C/svg%3E') no-repeat center" }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};`
});

readyMadeTemplates.push({
  id: 'social-feed',
  title: 'Social Media Feed',
  description: 'Clean feed with posts, like buttons, and comments section.',
  code: `const App = () => {
  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh", padding: "40px", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
        
        {/* Create Post */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#3b82f6", flexShrink: 0 }} />
            <textarea placeholder="What's on your mind today?" style={{ width: "100%", height: "80px", border: "none", outline: "none", resize: "none", fontSize: "18px", paddingTop: "8px" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f3f4f6", paddingTop: "16px" }}>
            <div style={{ display: "flex", gap: "16px", color: "#6b7280", fontWeight: "600", fontSize: "14px" }}>
              <span style={{ cursor: "pointer" }}>📷 Photo</span>
              <span style={{ cursor: "pointer" }}>🎥 Video</span>
              <span style={{ cursor: "pointer" }}>📍 Location</span>
            </div>
            <button style={{ background: "#111827", color: "#fff", border: "none", padding: "10px 24px", borderRadius: "999px", fontWeight: "bold", cursor: "pointer" }}>Post</button>
          </div>
        </div>

        {/* Post */}
        <div style={{ background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "#10b981" }} />
            <div>
              <div style={{ fontWeight: "bold", fontSize: "16px", color: "#111827" }}>Sarah Jenkins</div>
              <div style={{ color: "#6b7280", fontSize: "13px" }}>2 hours ago</div>
            </div>
          </div>
          
          <p style={{ fontSize: "16px", color: "#374151", margin: "0 0 16px", lineHeight: "1.6" }}>
            Just finished a massive design overhaul for our core product. Here's a quick sneak peek! The team has done an incredible job leveraging the new design system. 🚀✨
          </p>
          
          <div style={{ width: "100%", height: "300px", borderRadius: "12px", backgroundImage: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800')", backgroundSize: "cover", backgroundPosition: "center", marginBottom: "16px" }} />
          
          <div style={{ display: "flex", gap: "24px", borderTop: "1px solid #f3f4f6", paddingTop: "16px", color: "#6b7280", fontWeight: "600" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", color: "#ef4444" }}>❤️ 125</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>💬 24</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}>↗️ Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};`
});

readyMadeTemplates.push({
  id: 'calendar',
  title: 'Calendar & Scheduling',
  description: 'Sleek calendar view with upcoming events and meetings.',
  code: `const App = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif", background: "#fff" }}>
      <div style={{ width: "280px", borderRight: "1px solid #e5e7eb", padding: "24px", display: "flex", flexDirection: "column" }}>
        <button style={{ width: "100%", background: "#111827", color: "#fff", padding: "12px", border: "none", borderRadius: "8px", fontWeight: "bold", marginBottom: "32px", fontSize: "15px" }}>+ Add Event</button>
        <div style={{ marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px", fontWeight: "bold" }}>
            <span>October 2026</span>
            <span style={{ color: "#6b7280" }}>&lt; &gt;</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "8px", textAlign: "center", fontSize: "14px" }}>
            <span style={{color: "#9ca3af"}}>S</span><span style={{color: "#9ca3af"}}>M</span><span style={{color: "#9ca3af"}}>T</span><span style={{color: "#9ca3af"}}>W</span><span style={{color: "#9ca3af"}}>T</span><span style={{color: "#9ca3af"}}>F</span><span style={{color: "#9ca3af"}}>S</span>
            {Array.from({length: 31}).map((_,i)=><span key={i} style={{ padding: "6px", background: i===23 ? "#3b82f6" : "transparent", color: i===23 ? "#fff" : "#374151", borderRadius: "50%" }}>{i+1}</span>)}
          </div>
        </div>
        <h3 style={{ fontSize: "14px", textTransform: "uppercase", color: "#6b7280", letterSpacing: "1px", marginBottom: "16px" }}>My Calendars</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", color: "#374151", fontSize: "15px", fontWeight: "500" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><input type="checkbox" defaultChecked /> Work</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><input type="checkbox" defaultChecked /> Personal</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><input type="checkbox" /> Birthdays</div>
        </div>
      </div>
      
      <div style={{ flex: 1, padding: "32px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h1 style={{ margin: 0, fontSize: "28px" }}>Oct 24, Thursday</h1>
          <div style={{ display: "flex", background: "#f3f4f6", padding: "4px", borderRadius: "8px" }}>
            <button style={{ background: "transparent", border: "none", padding: "6px 16px", borderRadius: "6px", fontWeight: "600" }}>Day</button>
            <button style={{ background: "#fff", border: "none", padding: "6px 16px", borderRadius: "6px", fontWeight: "600", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>Week</button>
            <button style={{ background: "transparent", border: "none", padding: "6px 16px", borderRadius: "6px", fontWeight: "600" }}>Month</button>
          </div>
        </div>
        
        <div style={{ flex: 1, border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
            {["Mon 21", "Tue 22", "Wed 23", "Thu 24", "Fri 25"].map((day,i) => (
              <div key={day} style={{ padding: "16px", textAlign: "center", fontWeight: "600", color: i===3 ? "#3b82f6" : "#4b5563" }}>{day}</div>
            ))}
          </div>
          
          {/* Mock Grid Lines & Event */}
          <div style={{ position: "relative", height: "600px" }}>
            <div style={{ position: "absolute", top: "120px", left: "60%", width: "18%", background: "rgba(59, 130, 246, 0.1)", borderLeft: "4px solid #3b82f6", padding: "12px", borderRadius: "0 8px 8px 0" }}>
              <div style={{ fontWeight: "bold", color: "#1e3a8a", fontSize: "14px" }}>Design Sync</div>
              <div style={{ color: "#3b82f6", fontSize: "12px", marginTop: "4px" }}>10:00 AM - 11:30 AM</div>
            </div>
            
            <div style={{ position: "absolute", top: "300px", left: "60%", width: "18%", background: "rgba(16, 185, 129, 0.1)", borderLeft: "4px solid #10b981", padding: "12px", borderRadius: "0 8px 8px 0" }}>
              <div style={{ fontWeight: "bold", color: "#065f46", fontSize: "14px" }}>Lunch c/ Client</div>
              <div style={{ color: "#10b981", fontSize: "12px", marginTop: "4px" }}>1:00 PM - 2:00 PM</div>
            </div>
            
            <div style={{ position: "absolute", top: "200px", left: "20%", width: "18%", background: "rgba(245, 158, 11, 0.1)", borderLeft: "4px solid #f59e0b", padding: "12px", borderRadius: "0 8px 8px 0" }}>
              <div style={{ fontWeight: "bold", color: "#92400e", fontSize: "14px" }}>Marketing Meeting</div>
              <div style={{ color: "#f59e0b", fontSize: "12px", marginTop: "4px" }}>11:30 AM - 1:00 PM</div>
            </div>
            
            {/* Grid background placeholder */}
            <div style={{ width: "100%", height: "100%", backgroundImage: "linear-gradient(#f3f4f6 1px, transparent 1px)", backgroundSize: "100% 60px" }} />
          </div>
        </div>
      </div>
    </div>
  );
};`
});


siteTemplates.push({
  id: 'saas-landing',
  title: 'SaaS Startup Landing Page',
  description: 'Modern tech-startup hero section with trust badges and feature grid.',
  code: `const App = () => {
  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", backgroundColor: "#0f172a", color: "#f8fafc", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 60px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "-1px" }}>Aura<span style={{ color: "#3b82f6" }}>Cloud</span></div>
        <div style={{ display: "flex", gap: "32px", fontWeight: "500", color: "#cbd5e1" }}>
          <span style={{ cursor: "pointer" }}>Product</span>
          <span style={{ cursor: "pointer" }}>Solutions</span>
          <span style={{ cursor: "pointer" }}>Pricing</span>
          <span style={{ cursor: "pointer" }}>Docs</span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <button style={{ background: "transparent", color: "#f8fafc", border: "none", fontWeight: "600", cursor: "pointer" }}>Login</button>
          <button style={{ background: "#3b82f6", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)" }}>Start Free Trial</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "120px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(15, 23, 42, 0) 70%)", zIndex: 0, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(59, 130, 246, 0.1)", color: "#60a5fa", padding: "6px 16px", borderRadius: "999px", fontSize: "14px", fontWeight: "600", marginBottom: "24px", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
            ✨ Introducing Version 2.0
          </div>
          <h1 style={{ fontSize: "64px", fontWeight: "900", lineHeight: "1.1", margin: "0 0 24px", letterSpacing: "-2px" }}>
            The infrastructure for your next <span style={{ color: "transparent", WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, #3b82f6, #a855f7)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>big idea.</span>
          </h1>
          <p style={{ fontSize: "20px", color: "#94a3b8", margin: "0 0 40px", lineHeight: "1.6" }}>
            AuraCloud provides scalable, secure, and lightning-fast APIs to build modern web applications without the backend hassle.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "16px" }}>
            <button style={{ background: "#f8fafc", color: "#0f172a", border: "none", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Get Started for Free</button>
            <button style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#f8fafc", padding: "16px 32px", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>Read the Docs</button>
          </div>
        </div>
        
        {/* Dashboard Mockup */}
        <div style={{ marginTop: "80px", position: "relative", zIndex: 1, maxWidth: "1000px", margin: "80px auto 0" }}>
          <div style={{ background: "#1e293b", borderRadius: "24px", padding: "8px", border: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}>
            <div style={{ height: "400px", background: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000')", backgroundSize: "cover", backgroundPosition: "top", borderRadius: "16px", opacity: 0.8 }} />
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div style={{ padding: "60px 20px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.02)" }}>
        <p style={{ color: "#64748b", fontWeight: "600", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "32px" }}>Trusted by innovative teams worldwide</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "60px", flexWrap: "wrap", opacity: 0.5 }}>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Google</span>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Amazon</span>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Stripe</span>
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>Spotify</span>
        </div>
      </div>
    </div>
  );
};`
});

siteTemplates.push({
  id: 'agency-corporate',
  title: 'Corporate Agency',
  description: 'Digital agency site with elegant typography and portfolio showcase.',
  code: `const App = () => {
  return (
    <div style={{ fontFamily: "'Playfair Display', serif", backgroundColor: "#fefae0", color: "#283618", minHeight: "100vh" }}>
      <nav style={{ padding: "30px 50px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "1px" }}>STUDIO AURA</div>
        <div style={{ display: "flex", gap: "40px", fontFamily: "system-ui, sans-serif", fontSize: "15px", fontWeight: "500", textTransform: "uppercase", letterSpacing: "2px" }}>
          <span>Work</span><span>Services</span><span>About</span><span>Contact</span>
        </div>
      </nav>

      <div style={{ padding: "100px 50px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "100px", lineHeight: "1", margin: "0 0 40px", fontWeight: "400", letterSpacing: "-2px" }}>
          We craft digital<br/>experiences that<br/><span style={{ fontStyle: "italic" }}>inspire.</span>
        </h1>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "18px", color: "#606c38", maxWidth: "400px", lineHeight: "1.6", margin: 0 }}>
            An award-winning design and development studio based in New York. We help brands stand out in the digital landscape.
          </p>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: "1px solid #283618", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui, sans-serif", fontSize: "12px", textTransform: "uppercase", cursor: "pointer" }}>
            Scroll
          </div>
        </div>
      </div>

      <div style={{ padding: "0 50px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          <div style={{ marginTop: "100px" }}>
            <div style={{ height: "600px", background: "url('https://images.unsplash.com/photo-1600607687981-a957b447476e?auto=format&fit=crop&q=80&w=800')", backgroundSize: "cover", backgroundPosition: "center", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "24px", margin: "0 0 8px" }}>The Modern Home</h3>
            <p style={{ fontFamily: "system-ui", color: "#606c38", margin: 0 }}>Branding • Web Design</p>
          </div>
          <div>
            <div style={{ height: "500px", background: "url('https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&q=80&w=800')", backgroundSize: "cover", backgroundPosition: "center", marginBottom: "20px" }} />
            <h3 style={{ fontSize: "24px", margin: "0 0 8px" }}>Essential Skincare</h3>
            <p style={{ fontFamily: "system-ui", color: "#606c38", margin: 0 }}>E-Commerce • Packaging</p>
          </div>
        </div>
      </div>
      
      <div style={{ background: "#283618", color: "#fefae0", padding: "100px 50px", textAlign: "center" }}>
        <h2 style={{ fontSize: "64px", margin: "0 0 40px", fontStyle: "italic" }}>Let's work together.</h2>
        <button style={{ fontFamily: "system-ui", background: "#fefae0", color: "#283618", border: "none", padding: "20px 40px", fontSize: "18px", textTransform: "uppercase", letterSpacing: "2px", cursor: "pointer" }}>Start a Project</button>
      </div>
    </div>
  );
};`
});

siteTemplates.push({
  id: 'elearning',
  title: 'E-Learning Platform',
  description: 'Clean course catalog with instructor profiles and enroll buttons.',
  code: `const App = () => {
  const courses = [
    { title: "Advanced React Patterns", inst: "Sarah Drasner", price: "$149", rating: "4.9 (2.1k)", img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=600", tag: "Engineering" },
    { title: "UI/UX Masterclass", inst: "Gary Simon", price: "$99", rating: "4.8 (3.4k)", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600", tag: "Design" },
    { title: "Data Science with Python", inst: "Dr. Angela Yu", price: "$199", rating: "5.0 (8.2k)", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600", tag: "Data" }
  ];

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      <header style={{ background: "#fff", padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
        <div style={{ fontSize: "24px", fontWeight: "800", color: "#111827" }}>Skill<span style={{ color: "#4f46e5" }}>Forge</span></div>
        <div style={{ display: "flex", background: "#f3f4f6", borderRadius: "8px", padding: "8px 16px", width: "300px" }}>
          <span style={{ color: "#9ca3af", marginRight: "8px" }}>🔍</span>
          <input type="text" placeholder="Search courses..." style={{ border: "none", background: "transparent", outline: "none", width: "100%" }} />
        </div>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <span style={{ color: "#4b5563", fontWeight: "500", cursor: "pointer" }}>Teach</span>
          <span style={{ color: "#4b5563", fontWeight: "500", cursor: "pointer" }}>Log In</span>
          <button style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Sign Up</button>
        </div>
      </header>

      <div style={{ background: "#111827", color: "#fff", padding: "80px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "56px", fontWeight: "900", lineHeight: "1.1", margin: "0 0 24px" }}>Master the skills of tomorrow, today.</h1>
            <p style={{ fontSize: "20px", color: "#d1d5db", margin: "0 0 32px", lineHeight: "1.6" }}>Join over 2 million students learning programming, design, and business from industry experts.</p>
            <button style={{ background: "#4f46e5", color: "#fff", border: "none", padding: "16px 32px", borderRadius: "8px", fontSize: "18px", fontWeight: "bold", cursor: "pointer" }}>Explore Courses</button>
          </div>
          <div style={{ flex: 1, height: "400px", background: "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "24px" }} />
        </div>
      </div>

      <div style={{ padding: "80px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#111827", margin: "0 0 8px" }}>Featured Courses</h2>
            <p style={{ color: "#6b7280", margin: 0 }}>Highly rated by students around the world.</p>
          </div>
          <span style={{ color: "#4f46e5", fontWeight: "600", cursor: "pointer" }}>View All →</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "32px" }}>
          {courses.map((c, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", border: "1px solid #f3f4f6" }}>
              <div style={{ height: "200px", backgroundImage: \`url(\${c.img})\`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <div style={{ padding: "24px" }}>
                <span style={{ padding: "4px 12px", background: "#e0e7ff", color: "#4f46e5", borderRadius: "16px", fontSize: "12px", fontWeight: "bold", display: "inline-block", marginBottom: "12px" }}>{c.tag}</span>
                <h3 style={{ fontSize: "20px", margin: "0 0 8px", color: "#111827", lineHeight: "1.4" }}>{c.title}</h3>
                <div style={{ color: "#6b7280", fontSize: "14px", marginBottom: "16px" }}>By {c.inst}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px", fontSize: "14px" }}>
                  <span style={{ color: "#fbbf24" }}>★</span>
                  <span style={{ fontWeight: "bold", color: "#374151" }}>{c.rating}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f3f4f6", paddingTop: "20px" }}>
                  <span style={{ fontSize: "24px", fontWeight: "800", color: "#111827" }}>{c.price}</span>
                  <button style={{ background: "transparent", border: "1px solid #d1d5db", padding: "8px 16px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`
});

siteTemplates.push({
  id: 'fitness-gym',
  title: 'Fitness & Health Studio',
  description: 'High-energy landing page for a gym with pricing and classes.',
  code: `const App = () => {
  return (
    <div style={{ fontFamily: "Anton, Impact, sans-serif", backgroundColor: "#000", color: "#fff", minHeight: "100vh" }}>
      {/* Navigation */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 40px", position: "absolute", top: 0, width: "100%", zIndex: 10, boxSizing: "border-box" }}>
        <div style={{ fontSize: "32px", letterSpacing: "2px", color: "#e1ff00" }}>IRON<span style={{ color: "#fff" }}>CLAD</span></div>
        <div style={{ display: "flex", gap: "30px", fontFamily: "system-ui", fontSize: "14px", fontWeight: "bold", textTransform: "uppercase" }}>
          <span>Classes</span><span>Trainers</span><span>Pricing</span>
        </div>
        <button style={{ background: "#e1ff00", color: "#000", border: "none", padding: "12px 24px", fontFamily: "system-ui", fontWeight: "bold", textTransform: "uppercase" }}>Join Now</button>
      </nav>

      {/* Hero */}
      <div style={{ height: "90vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1600')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.6 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "800px" }}>
          <h1 style={{ fontSize: "120px", margin: "0 0 -20px", lineHeight: "1", textTransform: "uppercase", letterSpacing: "4px" }}>Push your</h1>
          <h1 style={{ fontSize: "120px", margin: 0, lineHeight: "1", textTransform: "uppercase", letterSpacing: "4px", color: "transparent", WebkitTextStroke: "2px #e1ff00" }}>Limits</h1>
          <p style={{ fontFamily: "system-ui", fontSize: "20px", color: "#ccc", margin: "40px auto", maxWidth: "500px", lineHeight: "1.6", fontWeight: "500" }}>The premier training facility for those who demand excellence from themselves.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <button style={{ background: "#e1ff00", color: "#000", border: "none", padding: "16px 40px", fontFamily: "system-ui", fontSize: "18px", fontWeight: "900", textTransform: "uppercase" }}>Get Membership</button>
            <button style={{ background: "transparent", color: "#fff", border: "2px solid #fff", padding: "16px 40px", fontFamily: "system-ui", fontSize: "18px", fontWeight: "900", textTransform: "uppercase" }}>View Classes</button>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: "100px 40px", background: "#111" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h2 style={{ fontSize: "64px", margin: 0, textTransform: "uppercase", letterSpacing: "2px" }}>Choose your <span style={{ color: "#e1ff00" }}>Plan</span></h2>
        </div>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "30px", fontFamily: "system-ui" }}>
          {[{name:"Standard", price:"$49", f:["Access to Gym Equipment", "Locker Room Access", "1 Free PT Session"], hl:false},
            {name:"Pro", price:"$89", f:["All Standard Features", "Unlimited Group Classes", "Sauna Access", "Monthly Body Scan"], hl:true},
            {name:"Elite", price:"$149", f:["All Pro Features", "Dedicated Trainer", "Nutrition Plan", "Free Supplements"], hl:false}].map((plan, i) => (
            <div key={i} style={{ width: "350px", background: plan.hl ? "#e1ff00" : "#222", color: plan.hl ? "#000" : "#fff", padding: "40px", transform: plan.hl ? "scale(1.05)" : "none", border: plan.hl ? "none" : "1px solid #333" }}>
              <div style={{ fontSize: "24px", fontWeight: "900", textTransform: "uppercase", marginBottom: "20px" }}>{plan.name}</div>
              <div style={{ fontSize: "64px", fontWeight: "900", marginBottom: "40px", fontFamily: "Anton" }}>{plan.price}<span style={{ fontSize: "16px", fontWeight: "normal", fontFamily: "system-ui" }}>/mo</span></div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px" }}>
                {plan.f.map((f, j) => <li key={j} style={{ padding: "10px 0", borderBottom: plan.hl ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)", fontWeight: "500" }}>✓ {f}</li>)}
              </ul>
              <button style={{ width: "100%", background: plan.hl ? "#000" : "#fff", color: plan.hl ? "#fff" : "#000", border: "none", padding: "16px", fontWeight: "900", textTransform: "uppercase", fontSize: "16px" }}>Select Plan</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};`
});

siteTemplates.push({
  id: 'restaurant-luxury',
  title: 'Luxury Restaurant & Cafe',
  description: 'Elegant serif landing page with full-bleed food photography and reservation CTA.',
  code: `const App = () => {
  return (
    <div style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif", backgroundColor: "#0f0e0c", color: "#f8f3e6", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ padding: "30px 60px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "absolute", top: 0, width: "100%", zIndex: 10, boxSizing: "border-box" }}>
        <div style={{ fontSize: "28px", letterSpacing: "4px", textTransform: "uppercase" }}>L'Aura</div>
        <div style={{ display: "flex", gap: "40px", fontSize: "16px", letterSpacing: "2px", textTransform: "uppercase" }}>
          <span style={{ cursor: "pointer", borderBottom: "1px solid #f8f3e6" }}>Menu</span>
          <span style={{ cursor: "pointer" }}>Story</span>
          <span style={{ cursor: "pointer" }}>Journal</span>
          <span style={{ cursor: "pointer" }}>Contact</span>
        </div>
        <button style={{ background: "transparent", color: "#f8f3e6", border: "1px solid #c8b99d", padding: "12px 24px", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}>Reservations</button>
      </nav>

      {/* Hero */}
      <div style={{ height: "100vh", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=1600')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0f0e0c 0%, transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 1, padding: "0 20px" }}>
          <div style={{ fontSize: "16px", letterSpacing: "4px", textTransform: "uppercase", color: "#c8b99d", marginBottom: "20px" }}>A Culinary Journey</div>
          <h1 style={{ fontSize: "96px", margin: "0 0 20px", fontWeight: "normal", fontStyle: "italic", lineHeight: "1" }}>Taste the Extraordinary</h1>
          <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "15px", letterSpacing: "1px", maxWidth: "500px", margin: "0 auto", opacity: 0.8, lineHeight: "1.8" }}>Where modern techniques meet timeless traditions in the heart of the city.</p>
        </div>
      </div>

      {/* Menu Highlight */}
      <div style={{ padding: "120px 60px", maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "80px", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "14px", letterSpacing: "3px", textTransform: "uppercase", color: "#c8b99d", marginBottom: "20px" }}>Tasting Menu</div>
          <h2 style={{ fontSize: "56px", margin: "0 0 40px", fontWeight: "normal" }}>Spring Collection</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {[
              { n: "Wild Mushroom Tart", d: "Black truffle, aged parmesan, micro herbs", p: "24" },
              { n: "Pan-Seared Scallops", d: "Cauliflower purée, brown butter caper sauce", p: "32" },
              { n: "Dry-Aged Duck Breast", d: "Cherry reduction, parsnip crisp, fondant potato", p: "48" },
              { n: "Dark Chocolate Delice", d: "Gold leaf, raspberry coulis, vanilla bean ice cream", p: "18" }
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <span style={{ fontSize: "24px", letterSpacing: "1px" }}>{item.n}</span>
                  <div style={{ flex: 1, borderBottom: "1px dotted rgba(248, 243, 230, 0.3)", margin: "0 16px" }} />
                  <span style={{ fontSize: "20px", color: "#c8b99d" }}>{item.p}</span>
                </div>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: "14px", color: "rgba(248, 243, 230, 0.6)" }}>{item.d}</div>
              </div>
            ))}
          </div>
          <button style={{ marginTop: "50px", background: "#c8b99d", color: "#0f0e0c", border: "none", padding: "16px 32px", fontSize: "14px", letterSpacing: "2px", textTransform: "uppercase", cursor: "pointer", fontWeight: "bold" }}>View Full Menu</button>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ width: "100%", paddingBottom: "130%", background: "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800')", backgroundSize: "cover", backgroundPosition: "center", borderRadius: "100px 100px 0 0" }} />
        </div>
      </div>
    </div>
  );
};`
});

siteTemplates.push({
  id: 'app-showcase',
  title: 'Mobile App Showcase',
  description: 'Clean promotion site highlighting app features and Apple/Play store badges.',
  code: `const App = () => {
  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif", backgroundColor: "#fff", color: "#1d1d1f", minHeight: "100vh" }}>
      {/* Navbar */}
      <nav style={{ padding: "16px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)", borderBottom: "1px solid #f5f5f7", zIndex: 100 }}>
        <div style={{ fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)", borderRadius: "8px" }}></div>
          Flow
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "14px", fontWeight: "500", color: "#86868b" }}>
          <span style={{ color: "#1d1d1f" }}>Overview</span><span>Features</span><span>Security</span><span>Support</span>
        </div>
        <button style={{ background: "#0071e3", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>Download App</button>
      </nav>

      {/* Hero */}
      <div style={{ padding: "100px 20px 0", textAlign: "center", overflow: "hidden" }}>
        <h1 style={{ fontSize: "72px", fontWeight: "700", letterSpacing: "-3px", margin: "0 0 16px", background: "linear-gradient(90deg, #1d1d1f, #86868b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Find your focus.
        </h1>
        <p style={{ fontSize: "28px", color: "#86868b", fontWeight: "500", maxWidth: "600px", margin: "0 auto 40px", letterSpacing: "-0.5px" }}>The completely redesigned meditation app that actually fits into your daily routine.</p>
        
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "80px" }}>
          <div style={{ background: "#000", color: "#fff", padding: "12px 24px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <span style={{ fontSize: "24px" }}>🍎</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "10px", color: "#86868b" }}>Download on the</div>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>App Store</div>
            </div>
          </div>
          <div style={{ background: "#000", color: "#fff", padding: "12px 24px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
            <span style={{ fontSize: "24px" }}>▶️</span>
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "10px", color: "#86868b" }}>GET IT ON</div>
              <div style={{ fontSize: "16px", fontWeight: "600" }}>Google Play</div>
            </div>
          </div>
        </div>

        <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "800px", height: "500px", background: "linear-gradient(180deg, #f5f5f7 0%, #fff 100%)", borderRadius: "40px 40px 0 0", position: "relative", border: "1px solid #e5e5ea", borderBottom: "none" }}>
            {/* Phone Mockup Placeholder */}
            <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "320px", height: "600px", background: "#000", borderRadius: "40px 40px 0 0", border: "8px solid #1d1d1f", borderBottom: "none", boxShadow: "0 -20px 40px rgba(0,0,0,0.1)", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", background: "url('https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=400')", backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div style={{ background: "#f5f5f7", padding: "120px 40px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          <div style={{ background: "#fff", padding: "48px", borderRadius: "32px", gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: "48px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "36px", fontWeight: "700", letterSpacing: "-1px", margin: "0 0 16px" }}>Guided by intelligence.</h3>
              <p style={{ fontSize: "18px", color: "#86868b", margin: 0, lineHeight: "1.5" }}>Our AI engine tracks your biofeedback to recommend the perfect session depending on whether you need to wake up, find focus, or fall asleep.</p>
            </div>
            <div style={{ width: "300px", height: "300px", background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)", borderRadius: "50%", opacity: 0.1 }} />
          </div>
        </div>
      </div>
    </div>
  );
};`
});

siteTemplates.push({
  id: 'event-conference',
  title: 'Event / Conference Hub',
  description: 'Dynamic event promos with live countdown and speaker grid.',
  code: `const App = () => {
  return (
    <div style={{ fontFamily: "Space Grotesk, sans-serif", background: "#000", color: "#fff", minHeight: "100vh" }}>
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Background Gradients */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", zIndex: 0 }}>
          <div style={{ position: "absolute", top: "-20%", left: "-10%", width: "500px", height: "500px", background: "#ff00aa", borderRadius: "50%", filter: "blur(150px)", opacity: 0.4 }} />
          <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: "600px", height: "600px", background: "#00ffcc", borderRadius: "50%", filter: "blur(150px)", opacity: 0.3 }} />
        </div>

        <nav style={{ padding: "30px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10 }}>
          <div style={{ fontSize: "24px", fontWeight: "900", letterSpacing: "2px", textTransform: "uppercase" }}>SYNTHESIS_26</div>
          <div style={{ display: "flex", gap: "40px", fontSize: "14px", fontWeight: "bold" }}>
            <span style={{ color: "#00ffcc" }}>Speakers</span><span>Schedule</span><span>Location</span>
          </div>
        </nav>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", position: "relative", zIndex: 10, padding: "0 20px" }}>
          <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", padding: "10px 24px", borderRadius: "999px", fontSize: "14px", fontWeight: "600", letterSpacing: "2px", marginBottom: "40px" }}>
            TOKYO, JAPAN • OCT 12-14, 2026
          </div>
          <h1 style={{ fontSize: "10vw", fontWeight: "900", lineHeight: "1", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "-4px" }}>
            The Future <br/>is <span style={{ color: "transparent", WebkitTextStroke: "2px #00ffcc" }}>Now.</span>
          </h1>
          <p style={{ fontSize: "20px", color: "#ccc", maxWidth: "600px", margin: "0 auto 60px", lineHeight: "1.6" }}>
            Join 5,000+ developers, designers, and creators for 3 days of intensive learning, networking, and creative coding.
          </p>
          
          {/* Countdown */}
          <div style={{ display: "flex", gap: "30px", marginBottom: "60px" }}>
            {[
              { label: "DAYS", val: "42" },
              { label: "HOURS", val: "14" },
              { label: "MINUTES", val: "29" },
              { label: "SECONDS", val: "55" }
            ].map((unit, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ fontSize: "64px", fontWeight: "900", lineHeight: "1", color: i === 3 ? "#ff00aa" : "#fff" }}>{unit.val}</div>
                <div style={{ fontSize: "12px", letterSpacing: "3px", color: "#888", marginTop: "8px" }}>{unit.label}</div>
              </div>
            ))}
          </div>

          <button style={{ background: "#fff", color: "#000", border: "none", padding: "20px 48px", fontSize: "18px", fontWeight: "900", textTransform: "uppercase", letterSpacing: "2px", borderRadius: "8px", cursor: "pointer", transition: "transform 0.2s" }} onMouseOver={(e)=>e.currentTarget.style.transform="scale(1.05)"} onMouseOut={(e)=>e.currentTarget.style.transform="scale(1)"}>
            Secure Your Pass
          </button>
        </div>
      </div>
    </div>
  );
};`
});

siteTemplates.push({
  id: 'link-in-bio',
  title: 'Link-in-Bio / Biolink Page',
  description: 'Animated personal links page with social avatars and gradient background.',
  code: `const App = () => {
  const profile = {
    name: "Alex Rivera",
    bio: "Digital Creator & Tech Reviewer 📸🕹️",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
  };
  
  const links = [
    { title: "Watch my latest YouTube Video", url: "#", icon: "▶️", highlight: true },
    { title: "Get my Lightroom Presets", url: "#", icon: "🎨", highlight: false },
    { title: "My Complete Desk Setup", url: "#", icon: "💻", highlight: false },
    { title: "Join the Discord Community", url: "#", icon: "👾", highlight: false }
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", minHeight: "100vh", display: "flex", justifyContent: "center", padding: "60px 20px", background: "linear-gradient(45deg, #1e1b4b 0%, #172554 100%)", color: "#fff" }}>
      <div style={{ width: "100%", maxWidth: "480px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        
        {/* Avatar & Info */}
        <div style={{ width: "120px", height: "120px", borderRadius: "50%", padding: "4px", background: "linear-gradient(45deg, #ec4899, #8b5cf6)", marginBottom: "24px" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: "4px solid #1e1b4b", backgroundImage: \`url(\${profile.avatar})\`, backgroundSize: "cover", backgroundPosition: "center", boxSizing: "border-box" }} />
        </div>
        
        <h1 style={{ margin: "0 0 8px", fontSize: "24px", fontWeight: "800", letterSpacing: "-0.5px" }}>{profile.name}</h1>
        <p style={{ margin: "0 0 32px", fontSize: "16px", color: "#cbd5e1", textAlign: "center", lineHeight: "1.5" }}>{profile.bio}</p>

        {/* Links */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "16px" }}>
          {links.map((link, i) => (
            <a key={i} href={link.url} style={{ textDecoration: "none" }}>
              <div style={{ background: link.highlight ? "linear-gradient(90deg, #ec4899, #8b5cf6)" : "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: link.highlight ? "none" : "1px solid rgba(255,255,255,0.2)", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", transition: "all 0.2s", transform: "scale(1)" }} onMouseOver={(e)=>e.currentTarget.style.transform="scale(1.02)"} onMouseOut={(e)=>e.currentTarget.style.transform="scale(1)"}>
                <span style={{ fontSize: "24px", marginRight: "16px" }}>{link.icon}</span>
                <span style={{ flex: 1, fontSize: "16px", fontWeight: "600", color: "#fff", textAlign: "center" }}>{link.title}</span>
                <span style={{ width: "24px" }}></span> {/* Spacer for centering */}
              </div>
            </a>
          ))}
        </div>

        {/* Social Icons Footer */}
        <div style={{ display: "flex", gap: "24px", marginTop: "48px", fontSize: "24px" }}>
          <span style={{ cursor: "pointer", opacity: 0.8 }} onMouseOver={(e)=>e.currentTarget.style.opacity="1"} onMouseOut={(e)=>e.currentTarget.style.opacity="0.8"}>📸</span>
          <span style={{ cursor: "pointer", opacity: 0.8 }} onMouseOver={(e)=>e.currentTarget.style.opacity="1"} onMouseOut={(e)=>e.currentTarget.style.opacity="0.8"}>🐦</span>
          <span style={{ cursor: "pointer", opacity: 0.8 }} onMouseOver={(e)=>e.currentTarget.style.opacity="1"} onMouseOut={(e)=>e.currentTarget.style.opacity="0.8"}>🎥</span>
          <span style={{ cursor: "pointer", opacity: 0.8 }} onMouseOver={(e)=>e.currentTarget.style.opacity="1"} onMouseOut={(e)=>e.currentTarget.style.opacity="0.8"}>✉️</span>
        </div>
        
        <div style={{ marginTop: "40px", fontSize: "12px", color: "rgba(255,255,255,0.4)" }}>
          Powered by Aura
        </div>
      </div>
    </div>
  );
};`
});
