import React, { useState } from 'react';
import { Wand2, Copy, Palette } from 'lucide-react';

const PALETTES = [
    { keywords: ['dark', 'tech', 'professional', 'saas', 'noir'], label: 'Professional Dark', colors: { primary: '#6366f1', secondary: '#8b5cf6', bg: '#0f172a', surface: '#1e293b', text: '#f8fafc', accent: '#10b981' } },
    { keywords: ['startup', 'modern', 'clean', 'blue', 'corporate'], label: 'Startup Blue', colors: { primary: '#3b82f6', secondary: '#06b6d4', bg: '#ffffff', surface: '#f8fafc', text: '#0f172a', accent: '#f59e0b' } },
    { keywords: ['warm', 'bakery', 'food', 'cozy', 'orange', 'coffee'], label: 'Warm Bakery', colors: { primary: '#d97706', secondary: '#b45309', bg: '#fef3c7', surface: '#fffbeb', text: '#1c1917', accent: '#dc2626' } },
    { keywords: ['health', 'fitness', 'green', 'nature', 'eco', 'wellness'], label: 'Health & Fitness', colors: { primary: '#10b981', secondary: '#059669', bg: '#f0fdf4', surface: '#ffffff', text: '#0f172a', accent: '#f59e0b' } },
    { keywords: ['luxury', 'gold', 'premium', 'elegant', 'vip'], label: 'Luxury Gold', colors: { primary: '#d4af37', secondary: '#a0892a', bg: '#0a0a0a', surface: '#1a1a1a', text: '#fafafa', accent: '#c0392b' } },
    { keywords: ['minimal', 'simple', 'white', 'light', 'clean'], label: 'Minimal Clean', colors: { primary: '#0f172a', secondary: '#334155', bg: '#ffffff', surface: '#f8fafc', text: '#0f172a', accent: '#6366f1' } },
    { keywords: ['creative', 'artist', 'pink', 'purple', 'portfolio', 'design'], label: 'Creative Studio', colors: { primary: '#ec4899', secondary: '#8b5cf6', bg: '#fdfdff', surface: '#fdf4ff', text: '#1e0a2e', accent: '#f59e0b' } },
    { keywords: ['ecommerce', 'shop', 'store', 'cart', 'retail'], label: 'E-Commerce', colors: { primary: '#f97316', secondary: '#ea580c', bg: '#ffffff', surface: '#fff7ed', text: '#1c1917', accent: '#0ea5e9' } },
    { keywords: ['medical', 'health', 'clinic', 'hospital', 'care', 'doctor'], label: 'Medical Care', colors: { primary: '#0ea5e9', secondary: '#0284c7', bg: '#f0f9ff', surface: '#ffffff', text: '#0c4a6e', accent: '#10b981' } },
    { keywords: ['finance', 'bank', 'money', 'invest', 'crypto'], label: 'Finance Pro', colors: { primary: '#1e3a5f', secondary: '#2563eb', bg: '#f8fafc', surface: '#ffffff', text: '#0f172a', accent: '#10b981' } },
];

const findPalette = (input) => {
    const lower = input.toLowerCase();
    let best = null, bestScore = -1;
    for (const p of PALETTES) {
        const score = p.keywords.filter(k => lower.includes(k)).length;
        if (score > bestScore) { bestScore = score; best = p; }
    }
    return bestScore > 0 ? best : PALETTES[Math.floor(Math.random() * PALETTES.length)];
};

const ColorPaletteAI = ({ onApply }) => {
    const [prompt, setPrompt] = useState('');
    const [palette, setPalette] = useState(null);
    const [applied, setApplied] = useState(false);

    const isFr = document.documentElement.lang === 'fr';

    const handleGenerate = () => {
        const found = findPalette(prompt || 'professional');
        setPalette(found);
        setApplied(false);
    };

    const handleApply = () => {
        if (palette && onApply) {
            onApply(palette.colors);
            setApplied(true);
            setTimeout(() => setApplied(false), 2000);
        }
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(236,72,153,0.08)', border: '1px dashed rgba(236,72,153,0.3)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: '#ec4899', textAlign: 'center', fontWeight: 600 }}>
                <Palette size={14} style={{ display: 'inline', marginRight: '6px' }} />
                {isFr ? 'Décrivez votre style, l\'IA génère la palette' : 'Describe your style, AI generates the palette'}
            </div>

            <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    {isFr ? 'Décrivez l\'ambiance' : 'Describe the mood'}
                </label>
                <input
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                    placeholder={isFr ? 'ex: dark tech professional, warm bakery...' : 'e.g. dark tech professional, warm bakery...'}
                    style={{ width: '100%', boxSizing: 'border-box', padding: '10px 14px', border: '1px solid var(--glass-border)', borderRadius: '10px', background: 'var(--glass-bg)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }}
                />
            </div>

            <button onClick={handleGenerate} style={{ padding: '11px', background: 'linear-gradient(135deg,#ec4899,#8b5cf6)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px' }}>
                <Wand2 size={15} />
                {isFr ? 'Générer la palette' : 'Generate Palette'}
            </button>

            {palette && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
                        {palette.label}
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                        {Object.entries(palette.colors).map(([key, val]) => (
                            <div key={key} title={`${key}: ${val}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div style={{ width: '100%', height: '36px', borderRadius: '8px', background: val, border: '1px solid rgba(0,0,0,0.1)' }} />
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{val}</span>
                                <span style={{ fontSize: '10px', color: 'var(--text-muted)', opacity: 0.6 }}>{key}</span>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={handleApply}
                        style={{ padding: '11px', background: applied ? '#10b981' : 'var(--primary)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', fontSize: '13px', transition: 'background 0.3s' }}
                    >
                        {applied ? (isFr ? '✓ Appliqué!' : '✓ Applied!') : (isFr ? 'Appliquer au code' : 'Apply to Code')}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ColorPaletteAI;
