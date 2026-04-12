import React, { useMemo } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/TransformationEngine';

const VIEWPORTS = [
    { label: 'Mobile', labelFr: 'Mobile', icon: Smartphone, width: 375, scale: 0.55 },
    { label: 'Tablet', labelFr: 'Tablette', icon: Tablet, width: 768, scale: 0.48 },
    { label: 'Desktop', labelFr: 'Bureau', icon: Monitor, width: 1280, scale: 0.38 },
];

const buildSrcdoc = (code) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}</style>
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

const ResponsiveComparator = ({ code, onClose, isFr }) => {
    const srcdoc = useMemo(() => buildSrcdoc(code), [code]);

    return (
        <div style={{
            position: 'fixed', inset: 0, background: 'rgba(2,6,23,0.92)',
            backdropFilter: 'blur(8px)', zIndex: 2000,
            display: 'flex', flexDirection: 'column',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Monitor size={16} color="#fff" />
                    </div>
                    <div>
                        <div style={{ color: '#f8fafc', fontWeight: 800, fontSize: '16px' }}>
                            {isFr ? 'Comparateur Responsive' : 'Responsive Comparator'}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '12px' }}>
                            {isFr ? 'Aperçu sur 3 écrans simultanément' : 'Preview on 3 screens simultaneously'}
                        </div>
                    </div>
                </div>
                <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', color: '#94a3b8', cursor: 'pointer', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={18} />
                </button>
            </div>

            {/* Viewports */}
            <div style={{ flex: 1, display: 'flex', gap: '0', overflow: 'hidden' }}>
                {VIEWPORTS.map((vp, i) => {
                    const Icon = vp.icon;
                    return (
                        <div key={vp.label} style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRight: i < VIEWPORTS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            overflow: 'hidden',
                        }}>
                            {/* VP Header */}
                            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                                <Icon size={14} color="#6366f1" />
                                <span style={{ color: '#e2e8f0', fontSize: '13px', fontWeight: 700 }}>
                                    {isFr ? vp.labelFr : vp.label}
                                </span>
                                <span style={{ color: '#475569', fontSize: '11px', marginLeft: 'auto' }}>
                                    {vp.width}px
                                </span>
                            </div>

                            {/* Scaled iframe wrapper */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', overflow: 'hidden', background: '#0f1629' }}>
                                <div style={{
                                    width: `${vp.width}px`,
                                    height: `${Math.round((1 / vp.scale) * 100)}%`,
                                    transform: `scale(${vp.scale})`,
                                    transformOrigin: 'top center',
                                    flexShrink: 0,
                                    border: '1px solid rgba(99,102,241,0.2)',
                                    borderRadius: '8px',
                                    overflow: 'hidden',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                                }}>
                                    <iframe
                                        srcDoc={srcdoc}
                                        style={{ width: '100%', height: '100%', border: 'none', display: 'block', background: '#fff' }}
                                        sandbox="allow-scripts"
                                        title={`${vp.label} preview`}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ResponsiveComparator;
