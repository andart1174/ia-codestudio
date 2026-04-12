import React from 'react';
import { Sliders, Palette, Maximize, Circle, Type } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const StyleTuner = ({ code, onTweak }) => {
    const { t } = useTranslation();
    const controls = [
        { id: 'padding', label: 'Padding', icon: <Maximize size={14} />, min: 0, max: 80, unit: 'px', regex: /padding:\s*['"](\d+)px['"]/g },
        { id: 'borderRadius', label: 'Rounding', icon: <Circle size={14} />, min: 0, max: 40, unit: 'px', regex: /borderRadius:\s*['"](\d+)px['"]/g },
        { id: 'gap', label: 'Spacing (Gap)', icon: <Sliders size={14} />, min: 0, max: 60, unit: 'px', regex: /gap:\s*['"](\d+)px['"]/g }
    ];

    const colors = [
        { id: 'primary', label: 'Brand Color', icon: <Palette size={14} />, regex: /color:\s*['"](#\w+)['"]/g },
        { id: 'background', label: 'Background', icon: <Palette size={14} />, regex: /background:\s*['"](#\w+)['"]/g }
    ];

    return (
        <div className="style-tuner">
            <div style={{ padding: '16px', borderBottom: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Layout Adjustments
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {controls.map(ctrl => (
                        <div key={ctrl.id} className="tuner-item">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <span style={{ color: 'var(--primary)' }}>{ctrl.icon}</span>
                                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{ctrl.label}</span>
                                </div>
                                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{ctrl.unit}</span>
                            </div>
                            <input 
                                type="range" 
                                min={ctrl.min} 
                                max={ctrl.max} 
                                className="tuner-slider"
                                onChange={(e) => onTweak(ctrl.id, e.target.value + ctrl.unit)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Color Palette
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map(color => (
                        <button 
                            key={color}
                            onClick={() => onTweak('primary', color)}
                            style={{ 
                                height: '32px', 
                                background: color, 
                                borderRadius: '8px', 
                                border: 'none', 
                                cursor: 'pointer',
                                transition: 'transform 0.2s'
                            }}
                            className="color-swatch-btn"
                        />
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-main)', padding: '4px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <input type="color" onChange={(e) => onTweak('primary', e.target.value)} style={{ border: 'none', background: 'transparent', width: '24px', height: '24px', cursor: 'pointer', outline: 'none', padding: 0 }} title={t('brandColor')} />
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('brandColor') || 'Brand'}</span>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--bg-main)', padding: '4px 12px', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
                        <input type="color" onChange={(e) => onTweak('background', e.target.value)} style={{ border: 'none', background: 'transparent', width: '24px', height: '24px', cursor: 'pointer', outline: 'none', padding: 0 }} title={t('bgColor')} />
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('bgColor') || 'BG'}</span>
                    </div>
                </div>
            </div>

            <div style={{ padding: '16px', borderTop: '1px solid var(--glass-border)' }}>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {t('fonts') || 'Typography (Fonts)'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Type size={16} className="text-primary" style={{ color: 'var(--primary)' }} />
                    <select 
                        onChange={(e) => onTweak('fontFamily', e.target.value)}
                        style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', fontSize: '13px' }}
                    >
                        <option value="">-- Choose --</option>
                        <option value="Inter, sans-serif">Inter</option>
                        <option value="Roboto, sans-serif">Roboto</option>
                        <option value="'Playfair Display', serif">Playfair Display</option>
                        <option value="'Outfit', sans-serif">Outfit</option>
                        <option value="monospace">Monospace</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default StyleTuner;
