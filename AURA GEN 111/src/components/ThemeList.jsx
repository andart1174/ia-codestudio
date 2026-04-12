import React from 'react';
import { useTranslation } from 'react-i18next';
import { Palette, Zap, Shield, Droplets, Sun } from 'lucide-react';

const ThemeList = ({ onTransform }) => {
    const { t } = useTranslation();
    
    const themes = [
        { 
            id: 'THEME_CYBERPUNK', 
            name: 'Cyberpunk', 
            icon: <Zap size={18} />, 
            desc: 'Neon purples, sharp edges, and digital grit.',
            color: '#bc13fe'
        },
        { 
            id: 'THEME_MINIMALIST', 
            name: 'Minimalist', 
            icon: <Shield size={18} />, 
            desc: 'Pure grayscale, high whitespace, thin lines.',
            color: '#64748b'
        },
        { 
            id: 'THEME_NEON', 
            name: 'Neon Night', 
            icon: <Sun size={18} />, 
            desc: 'Deep black with glowing electric accents.',
            color: '#39ff14'
        },
        { 
            id: 'THEME_OCEAN', 
            name: 'Ocean Breeze', 
            icon: <Droplets size={18} />, 
            desc: 'Deep blues and soft aquatic gradients.',
            color: '#0ea5e9'
        }
    ];

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h5 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                {t('themes')}
            </h5>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                {themes.map((theme) => (
                    <button
                        key={theme.id}
                        onClick={() => onTransform(theme.id)}
                        className="template-card"
                        style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            gap: '8px', 
                            padding: '12px',
                            borderLeft: `4px solid ${theme.color}`
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ color: theme.color }}>{theme.icon}</div>
                            <h4 style={{ margin: 0, fontSize: '14px' }}>{theme.name}</h4>
                        </div>
                        <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                            {theme.desc}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeList;
