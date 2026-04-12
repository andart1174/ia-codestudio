import React, { useState } from 'react';
import { Download, Check, FileArchive } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { downloadProjectZip } from '../utils/ExportEngine';
import StripeModal from './StripeModal';

// Basic transpilers for each framework
const convertToVue = (code) => {
    const templateMatch = code.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*\};\s*$/m);
    const template = templateMatch ? templateMatch[1].trim() : '<div>App</div>';
    // Convert JSX class to Vue template style
    const vueTemplate = template
        .replace(/className=/g, 'class=')
        .replace(/\{([^}]+)\}/g, (m, inner) => {
            if (inner.includes('=>')) return m; // keep event handlers
            return `{{ ${inner} }}`;
        });

    return `<template>\n  ${vueTemplate}\n</template>\n\n<script>\nexport default {\n  name: 'App',\n  data() {\n    return {};\n  },\n};\n</script>\n\n<style scoped>\n/* Add your styles here */\n</style>\n`;
};

const convertToSvelte = (code) => {
    const templateMatch = code.match(/return\s*\(\s*([\s\S]*?)\s*\);?\s*\};\s*$/m);
    const template = templateMatch ? templateMatch[1].trim() : '<div>App</div>';
    const svelteTemplate = template.replace(/className=/g, 'class=');

    return `<script>\n  // Svelte component logic here\n</script>\n\n${svelteTemplate}\n\n<style>\n  /* Add your styles here */\n</style>\n`;
};

const convertToTailwind = (code) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AuraGen Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white font-sans">
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    ${code}
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`;
};

const FRAMEWORKS = [
    { id: 'react', label: 'React JSX', icon: '⚛️', ext: 'App.jsx', color: '#61dafb' },
    { id: 'zip', label: 'Professional ZIP', icon: '📦', ext: '.zip', color: '#f59e0b' },
    { id: 'vue', label: 'Vue 3', icon: '💚', ext: 'App.vue', color: '#42b883' },
    { id: 'svelte', label: 'Svelte', icon: '🔥', ext: 'App.svelte', color: '#ff3e00' },
    { id: 'html', label: 'Tailwind HTML', icon: '🌀', ext: 'index.html', color: '#38bdf8' },
];

const MultiExport = ({ code, files = [] }) => {
    const { t, i18n } = useTranslation();
    const [selected, setSelected] = useState('react');
    const [copied, setCopied] = useState(false);
    const [stripeAction, setStripeAction] = useState(null);
    const isFr = i18n.language.startsWith('fr');

    const getConvertedCode = (framework) => {
        switch (framework) {
            case 'vue': return convertToVue(code);
            case 'svelte': return convertToSvelte(code);
            case 'html': return convertToTailwind(code);
            case 'zip': return isFr ? 'Génère un package complet (index.html, manifest, style.css...)' : 'Generates a full package (index.html, manifest, style.css...)';
            default: return code;
        }
    };

    const handleDownloadOriginal = async () => {
        if (selected === 'zip') {
            await downloadProjectZip(code, files, { title: 'AuraGen Project', filename: 'auragen-project.zip' });
            return;
        }
        const fw = FRAMEWORKS.find(f => f.id === selected);
        const content = getConvertedCode(selected);
        const blob = new Blob([content], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fw.ext;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    const handleDownload = () => {
        setStripeAction({ name: 'Export Framework / Download', cost: '$2.00', action: handleDownloadOriginal });
    };

    const handleCopy = () => {
        if (selected === 'zip') return;
        setStripeAction({ name: 'Copy Framework Code', cost: '$2.00', action: () => {
            navigator.clipboard.writeText(getConvertedCode(selected));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }});
    };

    const fw = FRAMEWORKS.find(f => f.id === selected);

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px dashed rgba(99,102,241,0.3)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: 'var(--primary)', textAlign: 'center' }}>
                {isFr ? 'Exportez votre code vers n\'importe quel framework' : 'Export your code to any framework'}
            </div>

            {/* Framework selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {FRAMEWORKS.map(f => (
                    <button
                        key={f.id}
                        onClick={() => setSelected(f.id)}
                        style={{
                            padding: '10px 8px', borderRadius: '10px', border: selected === f.id ? `2px solid ${f.color}` : '1px solid var(--glass-border)',
                            background: selected === f.id ? `${f.color}18` : 'var(--glass-bg)',
                            cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                            transition: 'all 0.2s',
                        }}
                    >
                        <span style={{ fontSize: '22px' }}>{f.icon}</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: selected === f.id ? f.color : 'var(--text-muted)' }}>{f.label}</span>
                    </button>
                ))}
            </div>

            {/* Preview of converted code */}
            <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{isFr ? 'Aperçu de l\'export' : 'Export preview'}</span>
                    <span style={{ color: fw.color }}>{fw.ext}</span>
                </label>
                <div style={{
                    background: '#0f172a', borderRadius: '10px', padding: '12px',
                    fontSize: '11px', fontFamily: 'monospace', color: '#bae6fd',
                    maxHeight: '140px', overflowY: 'auto', whiteSpace: 'pre', overflowX: 'auto',
                }}>
                    {selected === 'zip' ? getConvertedCode(selected) : getConvertedCode(selected).substring(0, 600) + (getConvertedCode(selected).length > 600 ? '...' : '')}
                </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
                {selected !== 'zip' && (
                    <button
                        onClick={handleCopy}
                        style={{ flex: 1, padding: '10px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    >
                        {copied ? <Check size={13} style={{ color: '#10b981' }} /> : null}
                        {copied ? (isFr ? 'Copié!' : 'Copied!') : (isFr ? 'Copier' : 'Copy')}
                    </button>
                )}
                <button
                    onClick={handleDownload}
                    style={{ flex: 1, padding: '10px', background: selected === 'zip' ? 'linear-gradient(135deg, #f59e0b, #d97706)' : 'var(--primary)', border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                >
                    {selected === 'zip' ? <FileArchive size={13} /> : <Download size={13} />}
                    {isFr ? 'Télécharger' : 'Download'} {fw.ext}
                </button>
            </div>
            {stripeAction && (
                <StripeModal
                    isFr={isFr}
                    actionName={stripeAction.name}
                    cost={stripeAction.cost}
                    onConfirm={() => {
                        window.open("https://checkout.stripe.com/pay/test", "_blank");
                        if (stripeAction.action) stripeAction.action();
                        setStripeAction(null);
                    }}
                    onClose={() => setStripeAction(null)}
                />
            )}
        </div>
    );
};

export default MultiExport;
