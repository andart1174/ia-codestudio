import React, { useState, useMemo } from 'react';
import { Search, Play, Eye, X } from 'lucide-react';
import VAULT_ITEMS from './CodeVault';

const CATS = [
  { id: 'all', emoji: '🧰', label: 'All' },
  { id: 'calc', emoji: '🧮', label: 'Calc' },
  { id: 'anim', emoji: '🎨', label: 'Anim' },
  { id: 'data', emoji: '📊', label: 'Data' },
  { id: 'util', emoji: '🔧', label: 'Utils' },
  { id: 'game', emoji: '🎮', label: 'Games' },
  { id: 'api', emoji: '🌐', label: 'Smart' },
];

const TAG_COLORS = {
  Functional: '#10b981', State: '#6366f1', Animated: '#ec4899',
  Interactive: '#f59e0b', CSS: '#0ea5e9', Live: '#ef4444',
};

// Build a self-contained HTML page for the preview iframe
const buildPreviewHtml = (code) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>body { margin: 0; font-family: system-ui, sans-serif; }</style>
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

const CodeVaultUI = ({ onSelect }) => {
  const isFr = document.documentElement.lang === 'fr';
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [previewItem, setPreviewItem] = useState(null);

  const items = useMemo(() =>
    VAULT_ITEMS.filter(i =>
      (cat === 'all' || i.cat === cat) &&
      (!q || ((i.name || '') + (i.nameFr || '')).toLowerCase().includes(q.toLowerCase()))
    ), [cat, q]);

  // Load the full widget code into the editor (replaces current code)
  const load = (item) => {
    if (typeof onSelect === 'function') {
      onSelect(item.code);
    }
    setPreviewItem(null);
  };

  return (
    <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,rgba(29,78,216,0.12),rgba(124,58,237,0.12))', border: '1px dashed rgba(99,102,241,0.3)', borderRadius: '12px', padding: '10px 12px', fontSize: '12px', color: 'var(--primary)', fontWeight: 700, textAlign: 'center' }}>
        🧰 {isFr ? 'Applications complètes — cliquez pour charger' : 'Complete apps — click to load into editor'}
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          value={q} onChange={e => setQ(e.target.value)}
          placeholder={isFr ? 'Rechercher...' : 'Search apps...'}
          style={{ width: '100%', boxSizing: 'border-box', padding: '8px 10px 8px 30px', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--glass-bg)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}
        />
      </div>

      {/* Category tabs */}
      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {CATS.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{ padding: '5px 9px', borderRadius: '7px', border: 'none', background: cat === c.id ? 'var(--primary)' : 'var(--glass-bg)', color: cat === c.id ? '#fff' : 'var(--text-muted)', fontWeight: 700, fontSize: '11px', cursor: 'pointer' }}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
        {items.length} {isFr ? 'applications' : 'apps'}
      </div>

      {/* Live Preview Panel */}
      {previewItem && (
        <div style={{ border: '1px solid rgba(99,102,241,0.4)', borderRadius: '12px', overflow: 'hidden', background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', color: '#fff' }}>
            <span style={{ fontSize: '12px', fontWeight: 700 }}>{previewItem.icon} {isFr ? previewItem.nameFr : previewItem.name}</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => load(previewItem)}
                style={{ padding: '5px 10px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
              >
                {isFr ? '✓ Charger dans l\'éditeur' : '✓ Load into Editor'}
              </button>
              <button
                onClick={() => setPreviewItem(null)}
                style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                <X size={12} />
              </button>
            </div>
          </div>
          <iframe
            key={previewItem.id}
            srcDoc={buildPreviewHtml(previewItem.code)}
            style={{ width: '100%', height: '340px', border: 'none', display: 'block' }}
            sandbox="allow-scripts"
            title={previewItem.name}
          />
        </div>
      )}

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map(item => (
          <div
            key={item.id}
            style={{
              border: `1px solid ${previewItem?.id === item.id ? 'rgba(99,102,241,0.5)' : 'var(--glass-border)'}`,
              borderRadius: '10px',
              padding: '10px 12px',
              background: previewItem?.id === item.id ? 'rgba(99,102,241,0.06)' : 'var(--glass-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <span style={{ fontSize: '18px', lineHeight: 1, flexShrink: 0 }}>{item.icon}</span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {isFr ? item.nameFr : item.name}
                </div>
                <div style={{ display: 'flex', gap: '3px', marginTop: '3px', flexWrap: 'wrap' }}>
                  {item.tags.map(t => (
                    <span key={t} style={{ fontSize: '9px', fontWeight: 700, padding: '1px 5px', borderRadius: '4px', background: (TAG_COLORS[t] || '#6366f1') + '22', color: TAG_COLORS[t] || '#6366f1' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
              <button
                onClick={() => setPreviewItem(previewItem?.id === item.id ? null : item)}
                title={isFr ? 'Aperçu' : 'Preview'}
                style={{ padding: '6px 8px', background: previewItem?.id === item.id ? 'rgba(99,102,241,0.2)' : 'var(--glass-bg)', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: '7px', fontWeight: 700, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
              >
                <Eye size={11} />
              </button>
              <button
                onClick={() => load(item)}
                title={isFr ? 'Charger dans l\'éditeur' : 'Load into Editor'}
                style={{ padding: '6px 10px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
              >
                <Play size={11} />
                {isFr ? 'Charger' : 'Load'}
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
            {isFr ? 'Aucune application trouvée' : 'No apps found'}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeVaultUI;
