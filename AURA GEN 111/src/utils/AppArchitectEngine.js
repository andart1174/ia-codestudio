/**
 * AuraGen App Architect Engine
 * Transforms single-page templates into full-scale multi-page applications.
 */

export const transformToFullApp = (originalCode) => {
    // 1. Extract the content of the original App component
    // We look for everything inside the return (...) of the App constant.
    const appMatch = originalCode.match(/const App = \(\) => \{([\s\S]*?)return \(([\s\S]*?)\);?\s*\}\s*;?/);
    
    if (!appMatch) {
        // Fallback: simple wrap if regex fails
        return wrapSimple(originalCode);
    }

    const logic = appMatch[1].trim();
    const view = appMatch[2].trim();

    // 2. Define the Professional Multi-Page Shell
    const sidebarCode = `const Sidebar = ({ active, onChange }) => {
  const menu = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div style={{ width: '260px', background: '#0f172a', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', padding: '24px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
        <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', borderRadius: '8px' }} />
        <span style={{ fontSize: '20px', fontWeight: 900, letterSpacing: '-0.5px' }}>Nexus <span style={{ color: '#818cf8' }}>OS</span></span>
      </div>
      
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        {menu.map(item => (
          <button 
            key={item.id}
            onClick={() => onChange(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: active === item.id ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: active === item.id ? '#818cf8' : '#94a3b8',
              fontWeight: 600, transition: 'all 0.2s', textAlign: 'left'
            }}
          >
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span>{item.label}</span>
            {active === item.id && <div style={{ marginLeft: 'auto', width: '4px', height: '4px', borderRadius: '50%', background: '#818cf8' }} />}
          </button>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Logged in as</div>
        <div style={{ fontWeight: 600, fontSize: '14px' }}>Admin User</div>
      </div>
    </div>
  );
};`;

    const headerCode = `const Header = ({ title }) => (
  <header style={{ padding: '20px 40px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
       <span style={{ color: '#94a3b8' }}>Apps</span>
       <span style={{ color: '#cbd5e1' }}>/</span>
       <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>{title}</h2>
     </div>
     <div style={{ display: 'flex', gap: '16px' }}>
       <button style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f8fafc', border: '1px solid #e2e8f0', cursor: 'pointer' }}>🔔</button>
       <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#6366f1' }} />
     </div>
  </header>
);`;

    const pagesCode = `const DashboardView = () => (
  <div style={{ padding: '40px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
       {['Active Users', 'Monthly Revenue', 'Support Tickets'].map((l, i) => (
         <div key={i} style={{ background: '#fff', padding: '24px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
           <div style={{ color: '#64748b', fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>{l}</div>
           <div style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>{i === 1 ? '$24.5k' : i === 0 ? '1,280' : '42'}</div>
         </div>
       ))}
    </div>
    <div style={{ marginTop: '32px', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
       Charts and tables will appear here
    </div>
  </div>
);

const AnalyticsView = () => (
  <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
    <div style={{ fontSize: '48px', marginBottom: '20px' }}>📈</div>
    <h2>Analytics & Insights</h2>
    <p>Detailed performance reporting is being prepared.</p>
  </div>
);

const UsersView = () => (
  <div style={{ padding: '40px' }}>
    <h3 style={{ margin: '0 0 24px' }}>Team Members</h3>
    <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', border: '1px solid #f1f5f9' }}>
       {['Alice Martin', 'Bob Chen', 'Claire Dubois'].map((u, i) => (
         <div key={i} style={{ padding: '16px 20px', borderBottom: i < 2 ? '1px solid #f1f5f9' : 'none', display: 'flex', justifyContent: 'space-between' }}>
           <div style={{ fontWeight: 600 }}>{u}</div>
           <div style={{ color: '#6366f1' }}>{i === 0 ? 'Admin' : 'Editor'}</div>
         </div>
       ))}
    </div>
  </div>
);

const SettingsView = () => (
  <div style={{ padding: '40px' }}>
    <h3 style={{ margin: '0 0 24px' }}>Application Settings</h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
       {['Dark Mode', 'Push Notifications', 'API Access'].map((s, i) => (
         <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: '#f8fafc', borderRadius: '12px' }}>
           <span>{s}</span>
           <div style={{ width: '40px', height: '20px', background: i === 1 ? '#6366f1' : '#e2e8f0', borderRadius: '10px' }} />
         </div>
       ))}
    </div>
  </div>
);`;

    const mainAppCode = `const MainView = () => {
  ${logic}
  return (
    <div style={{ flex: 1, overflowY: 'auto', background: '#f8fafc' }}>
      ${view}
    </div>
  );
};

const App = () => {
  const [activePage, setActivePage] = React.useState('dashboard');

  const renderContent = () => {
    switch(activePage) {
      case 'dashboard': return <MainView />;
      case 'analytics': return <AnalyticsView />;
      case 'users': return <UsersView />;
      case 'settings': return <SettingsView />;
      default: return <MainView />;
    }
  };

  const getTitle = () => {
     const item = { dashboard: 'Dashboard', analytics: 'Analytics', users: 'Users', settings: 'Settings' }[activePage];
     return item || 'Enterprise App';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      <Sidebar active={activePage} onChange={setActivePage} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header title={getTitle()} />
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};`;

    return [sidebarCode, headerCode, pagesCode, mainAppCode].join('\n\n');
};

const wrapSimple = (code) => {
    return `${code}\n\n// Architect Wrap Fallback\nconst OriginalApp = App;\nconst App = () => <div style={{background:'#f8fafc', minHeight:'100vh'}}><OriginalApp /></div>;`;
};
