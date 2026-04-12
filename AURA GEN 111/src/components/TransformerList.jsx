import React from 'react';
import {
    RefreshCw,
    Moon,
    Sun,
    Sparkles,
    Scissors,
    Type
} from 'lucide-react';

const TransformerList = ({ onTransform }) => {
    const options = [
        { id: 'DARK_MODE', name: 'Switch to Dark Mode', icon: <Moon size={16} />, desc: 'Transforms light backgrounds to dark and text to light.' },
        { id: 'LIGHT_MODE', name: 'Switch to Light Mode', icon: <Sun size={16} />, desc: 'Transforms dark backgrounds to light and text to dark.' },
        { id: 'MODERNIZE', name: 'Modernize Aesthetics', icon: <Sparkles size={16} />, desc: 'Adds professional shadows and modernizes variables.' },
        { id: 'ADD_GLASS', name: 'Apply Glassmorphism', icon: <Sparkles size={16} />, desc: 'Converts solid panels into elegant glass layers.' },
        { id: 'HOVER_EFFECTS', name: 'Auto Hover FX', icon: <Sparkles size={16} />, desc: 'Injects smooth transitions into buttons.' },
        { id: 'SMART_TEXT_EN', name: 'Smart Text (EN)', icon: <Type size={16} />, desc: 'Replaces dummy text with professional English copy.' },
        { id: 'SMART_TEXT_FR', name: 'Smart Text (FR)', icon: <Type size={16} />, desc: 'Remplace le texte factice par une copie pro en français.' },
        { id: 'CLEANUP', name: 'Cleanup Code', icon: <Scissors size={16} />, desc: 'Removes comments and excessive whitespace.' }
    ];

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h5 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>Smart Transformers</h5>
            {options.map((opt) => (
                <button
                    key={opt.id}
                    onClick={() => onTransform(opt.id)}
                    className="template-card"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '16px' }}
                >
                    <div style={{ color: 'var(--primary)', marginTop: '2px' }}>{opt.icon}</div>
                    <div style={{ textAlign: 'left' }}>
                        <h4 style={{ margin: 0, fontSize: '14px' }}>{opt.name}</h4>
                        <p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{opt.desc}</p>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default TransformerList;
