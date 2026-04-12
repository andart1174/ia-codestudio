import React, { useState, useMemo } from 'react';
import { Search, Play, Eye, X, Crown, Zap, Sparkles } from 'lucide-react';
import VAULT_PRO from './CodeVaultPro';

const CATS = [
  { id: 'all', emoji: '💎', label: 'All Pro' },
  { id: 'biz', emoji: '💼', label: 'Business' },
  { id: 'prod', emoji: '🚀', label: 'Productivity' },
  { id: 'health', emoji: '🍏', label: 'Health' },
  { id: 'creative', emoji: '🎨', label: 'Creative' },
  { id: 'game', emoji: '🎮', label: 'Games' },
  { id: 'data', emoji: '📊', label: 'Data' },
  { id: 'dev', emoji: '⚙️', label: 'Dev Tools' },
  { id: 'ec', emoji: '🛒', label: 'Commerce' },
  { id: 'ui', emoji: '🪄', label: 'UI Pro' },
  { id: 'edu', emoji: '📚', label: 'Education' },
  { id: 'api', emoji: '🤖', label: 'AI/Smart' },
];

const TAG_COLORS = {
  Professional: '#3b82f6', Advanced: '#8b5cf6', Premium: '#f59e0b',
  Functional: '#10b981', Business: '#6366f1', creative: '#ec4899',
  Interactive: '#0ea5e9', CSS: '#f43f5e', Data: '#f97316',
};

const buildPreviewHtml = (code) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; background: #fbfcfe; }
    #root { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; box-sizing: border-box; }
  </style>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    ${code}
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>`;

const CodeVaultProUI = ({ onSelect }) => {
  const isFr = document.documentElement.lang === 'fr';
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [previewItem, setPreviewItem] = useState(null);

  const items = useMemo(() =>
    VAULT_PRO.filter(i =>
      (cat === 'all' || i.cat === cat) &&
      (!q || ((i.name || '') + (i.nameFr || '') + (i.tags?.join(' ') || '')).toLowerCase().includes(q.toLowerCase()))
    ), [cat, q]);

  const load = (item) => {
    if (typeof onSelect === 'function') {
      onSelect(item.code);
    }
    setPreviewItem(null);
  };

  return (
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(59,130,246,0.02)', borderRadius: '16px' }}>
      {/* Premium Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))', 
        border: '1px solid rgba(59,130,246,0.3)', 
        borderRadius: '12px', 
        padding: '12px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}><Crown size={60} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Crown size={16} color="#3b82f6" />
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#1e40af', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Code Vault Pro
          </span>
        </div>
        <div style={{ fontSize: '11px', color: '#1e40af', opacity: 0.8, fontWeight: 600 }}>
          {isFr ? VAULT_PRO.length + ' Applications Premium' : VAULT_PRO.length + ' Premium Applications'}
        </div>
      </div>

      {/* Search Pro */}
      <div style={{ position: 'relative' }}>
        <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6' }} />
        <input
          value={q} onChange={e => setQ(e.target.value)}
          placeholder={isFr ? 'Rechercher dans le Vault Pro...' : 'Search Pro Vault...'}
          style={{ 
            width: '100%', boxSizing: 'border-box', padding: '10px 10px 10px 34px', 
            border: '2px solid rgba(59,130,246,0.1)', borderRadius: '10px', 
            background: '#fff', color: 'var(--text-primary)', fontSize: '12px', 
            outline: 'none', transition: 'border-color 0.2s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
          }}
          onFocus={e => e.target.style.borderColor = '#3b82f6'}
          onBlur={e => e.target.style.borderColor = 'rgba(59,130,246,0.1)'}
        />
      </div>

      {/* Enhanced Category tabs */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <button 
            key={c.id} 
            onClick={() => setCat(c.id)} 
            style={{ 
              padding: '6px 10px', borderRadius: '8px', border: '1px solid ' + (cat === c.id ? '#3b82f6' : 'transparent'), 
              background: cat === c.id ? '#3b82f6' : '#fff', 
              color: cat === c.id ? '#fff' : '#475569', 
              fontWeight: 700, fontSize: '11px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '4px',
              boxShadow: cat === c.id ? '0 4px 6px -1px rgba(59,130,246,0.3)' : '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.2s'
            }}
          >
            <span>{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      {/* Count Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Sparkles size={12} color="#f59e0b" />
          {items.length} {isFr ? 'apps trouvées' : 'apps available'}
        </div>
      </div>

      {/* Live Preview Panel */}
      {previewItem && (
        <div style={{ 
          border: '2px solid #3b82f6', borderRadius: '14px', overflow: 'hidden', 
          background: '#fff', boxShadow: '0 10px 25px -5px rgba(59,130,246,0.2)' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '18px' }}>{previewItem.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: 800 }}>{isFr ? previewItem.nameFr : previewItem.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => load(previewItem)}
                style={{ padding: '6px 12px', background: '#fff', color: '#3b82f6', border: 'none', borderRadius: '8px', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
              >
                {isFr ? '✓ Charger' : '✓ Load'}
              </button>
              <button
                onClick={() => setPreviewItem(null)}
                style={{ padding: '6px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>
          </div>
          <iframe
            key={previewItem.id}
            srcDoc={buildPreviewHtml(previewItem.code)}
            style={{ width: '100%', height: '380px', border: 'none', display: 'block', background: '#f8fafc' }}
            sandbox="allow-scripts"
            title={previewItem.name}
          />
        </div>
      )}

      {/* Pro Items List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => setPreviewItem(previewItem?.id === item.id ? null : item)}
            style={{
              border: `1px solid ${previewItem?.id === item.id ? '#3b82f6' : 'rgba(59,130,246,0.1)'}`,
              borderRadius: '12px',
              padding: '12px',
              background: previewItem?.id === item.id ? 'rgba(59,130,246,0.05)' : '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: previewItem?.id === item.id ? '0 4px 12px rgba(59,130,246,0.1)' : '0 1px 3px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={e => { if(previewItem?.id !== item.id) e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)'; }}
            onMouseLeave={e => { if(previewItem?.id !== item.id) e.currentTarget.style.borderColor = 'rgba(59,130,246,0.1)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '10px', 
                background: 'rgba(59,130,246,0.1)', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', fontSize: '20px' 
              }}>
                {item.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: '#1e293b', lineHeight: 1.3 }}>
                  {isFr ? item.nameFr : item.name}
                </div>
                <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                  {(item.tags || []).map(t => (
                    <span key={t} style={{ 
                      fontSize: '9px', fontWeight: 700, padding: '2px 6px', borderRadius: '5px', 
                      background: (TAG_COLORS[t] || '#94a3b8') + '15', color: TAG_COLORS[t] || '#64748b' 
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
              <button
                onClick={(e) => { e.stopPropagation(); setPreviewItem(previewItem?.id === item.id ? null : item); }}
                style={{ 
                  padding: '8px', background: previewItem?.id === item.id ? '#3b82f6' : 'rgba(59,130,246,0.1)', 
                  color: previewItem?.id === item.id ? '#fff' : '#3b82f6', border: 'none', 
                  borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' 
                }}
              >
                <Eye size={14} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); load(item); }}
                style={{ 
                  padding: '8px 12px', background: '#1e293b', color: '#fff', 
                  border: 'none', borderRadius: '10px', fontWeight: 800, 
                  fontSize: '11px', cursor: 'pointer', display: 'flex', 
                  alignItems: 'center', gap: '5px' 
                }}
              >
                <Zap size={12} fill="currentColor" />
                {isFr ? 'Charger' : 'Import'}
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', fontSize: '13px' }}>
            🔍 {isFr ? 'Aucune application Pro trouvée' : 'No Pro apps matched your search'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeVaultProUI;
