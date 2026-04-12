import React from 'react';
import { Rocket, Layout, Globe, Settings, Users, BarChart3, Zap, ShieldCheck } from 'lucide-react';
import { transformToFullApp } from '../utils/AppArchitectEngine';

const AppArchitect = ({ currentCode, updateCurrentCode, onSelect, isFr }) => {
    const handleBuildShell = () => {
        const transformed = transformToFullApp(currentCode);
        updateCurrentCode(transformed);
    };

    const handleAddPage = (type) => {
        // Logic to specifically add a page snippet (Dashboard, Users, etc.)
        const snippets = {
            dashboard: `<div style={{padding:'40px',background:'#fff',borderRadius:'24px',border:'1px solid #e2e8f0'}}>
  <h3 style={{margin:'0 0 16px',color:'#1e293b'}}>Custom Analytics View</h3>
  <div style={{height:'200px',background:'#f8fafc',borderRadius:'16px',display:'flex',alignItems:'center',justifyContent:'center',border:'1px dashed #cbd5e1'}}>
    Charts Content Placeholder
  </div>
</div>`,
            users: `<div style={{padding:'32px',background:'#fff',borderRadius:'20px',border:'1px solid #e2e8f0'}}>
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'24px'}}>
    <h3 style={{margin:0}}>Team Management</h3>
    <button style={{background:'#6366f1',color:'#fff',border:'none',padding:'8px 16px',borderRadius:'8px',fontWeight:700}}>+ Invite Member</button>
  </div>
  <table style={{width:'100%',borderCollapse:'collapse'}}>
    <thead><tr style={{textAlign:'left',color:'#64748b',fontSize:'12px'}}><th>Name</th><th>Role</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td style={{padding:'12px 0',fontWeight:600}}>John Doe</td><td>Admin</td><td style={{color:'#10b981'}}>Active</td></tr>
      <tr><td style={{padding:'12px 0',fontWeight:600}}>Jane Smith</td><td>Editor</td><td style={{color:'#10b981'}}>Active</td></tr>
    </tbody>
  </table>
</div>`
        };

        const snippet = snippets[type] || '';
        if (snippet) {
           // We can treat this as a standard selection or a specialized injection
           onSelect(snippet);
        }
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid rgba(99,102,241,0.2)',
                textAlign: 'center'
            }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>🏗️</div>
                <h4 style={{ margin: '0 0 8px', fontSize: '15px', fontWeight: 800, color: 'var(--primary)' }}>
                    {isFr ? 'App Architect Pro' : 'App Architect Pro'}
                </h4>
                <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                    {isFr ? 'Transforme ton template simple en une application métier complète avec architecture multi-page.' : 'Transform your simple template into a full-scale professional app with multi-page architecture.'}
                </p>
            </div>

            <button 
                onClick={handleBuildShell}
                className="template-card"
                style={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: '#fff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '13px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 10px 15px -3px rgba(99,102,241,0.3)',
                    transition: 'all 0.2s'
                }}
            >
                <Rocket size={18} />
                {isFr ? 'Générer l\'Architecture d\'App' : 'Build Full App Architecture'}
            </button>

            <div style={{ marginTop: '10px' }}>
                <h5 style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '12px', height: '1px', background: 'var(--primary)', opacity: 0.4 }} />
                    {isFr ? 'Composants de Structure' : 'Structural Components'}
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {[
                        { id: 'dashboard', name: 'Dashboard View', icon: <BarChart3 size={16} />, color: '#6366f1' },
                        { id: 'users', name: 'Users Management', icon: <Users size={16} />, color: '#10b981' },
                        { id: 'settings', name: 'Settings Bundle', icon: <Settings size={16} />, color: '#f59e0b' },
                        { id: 'security', name: 'Security & Auth', icon: <ShieldCheck size={16} />, color: '#ef4444' }
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleAddPage(item.id)}
                            className="template-card"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', textAlign: 'left',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}
                        >
                            <div style={{ color: item.color }}>{item.icon}</div>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.name}</span>
                            <Zap size={12} style={{ marginLeft: 'auto', opacity: 0.3 }} />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AppArchitect;
