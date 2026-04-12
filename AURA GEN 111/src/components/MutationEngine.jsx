import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, Wand2 } from 'lucide-react';

const MutationEngine = ({ code, onUpdate, isFr }) => {
    const [intensity, setIntensity] = useState(50);
    const [mood, setMood] = useState(50);
    const [animation, setAnimation] = useState(50);

    const t = {
        title: isFr ? 'Mutation Engine 🧬' : 'Mutation Engine 🧬',
        desc: isFr ? 'Sculptez votre code visuellement.' : 'Sculpt your code visually without typing.',
        apply: isFr ? 'Appliquer Mutation' : 'Apply Mutation',
        intensity: isFr ? 'Minimaliste ↔ Complexe' : 'Minimal ↔ Complex',
        mood: isFr ? 'Sombre&Froid ↔ Vif&Chaud' : 'Dark&Cold ↔ Bright&Warm',
        anim: isFr ? 'Statique ↔ Dynamique' : 'Static ↔ Dynamic',
    };

    const handleMutate = () => {
        let newCode = code;

        // Apply Mood (Colors)
        if (mood < 30) {
            newCode = newCode.replace(/#ffffff|#fff/gi, '#0f172a')
                             .replace(/#f8fafc|#f1f5f9/gi, '#1e293b')
                             .replace(/color:\s*['"]#0f172a['"]/gi, "color: '#f8fafc'")
                             .replace(/#6366f1|#3b82f6/gi, '#3b82f6'); // Cold blues
        } else if (mood > 70) {
            newCode = newCode.replace(/#0f172a|#1e293b/gi, '#ffffff')
                             .replace(/color:\s*['"]#f8fafc['"]/gi, "color: '#0f172a'")
                             .replace(/#6366f1|#3b82f6/gi, '#ec4899'); // Warm pink/reds
        }

        // Apply Intensity (Padding, borderRadius, Shadows)
        if (intensity < 30) {
            newCode = newCode.replace(/borderRadius:\s*['"][^'"]+['"]/g, "borderRadius: '0px'")
                             .replace(/boxShadow:\s*['"][^'"]+['"]/g, "boxShadow: 'none'")
                             .replace(/padding:\s*['"](?:24|32|40)px['"]/g, "padding: '12px'");
        } else if (intensity > 70) {
            newCode = newCode.replace(/borderRadius:\s*['"](?:4|8)px['"]/g, "borderRadius: '24px'")
                             .replace(/boxShadow:\s*['"]none['"]/g, "boxShadow: '0 20px 40px rgba(0,0,0,0.2)'")
                             .replace(/padding:\s*['"](?:8|12)px['"]/g, "padding: '32px'");
        }

        // Apply Animation (Transitions, transform)
        if (animation > 70 && !newCode.includes('transition:')) {
            newCode = newCode.replace(/style=\{\{/g, "style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer', hover: { transform: 'scale(1.05)', filter: 'brightness(1.2)' }, ");
        }

        onUpdate(newCode);
    };

    return (
        <div style={{ padding: '16px', color: '#e2e8f0', fontFamily: 'system-ui' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                {t.desc}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px' }}>
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#a5b4fc', marginBottom: '8px' }}>
                        <span>{t.intensity.split(' ↔ ')[0]}</span>
                        <span>{t.intensity.split(' ↔ ')[1]}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={intensity} 
                        onChange={e => setIntensity(+e.target.value)} 
                        style={{ width: '100%', accentColor: '#6366f1', cursor: 'grab' }}
                    />
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#fca5a5', marginBottom: '8px' }}>
                        <span>{t.mood.split(' ↔ ')[0]}</span>
                        <span>{t.mood.split(' ↔ ')[1]}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={mood} 
                        onChange={e => setMood(+e.target.value)} 
                        style={{ width: '100%', accentColor: '#ef4444', cursor: 'grab' }}
                    />
                </div>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 'bold', color: '#6ee7b7', marginBottom: '8px' }}>
                        <span>{t.anim.split(' ↔ ')[0]}</span>
                        <span>{t.anim.split(' ↔ ')[1]}</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" max="100" 
                        value={animation} 
                        onChange={e => setAnimation(+e.target.value)} 
                        style={{ width: '100%', accentColor: '#10b981', cursor: 'grab' }}
                    />
                </div>
            </div>

            <button 
                onClick={handleMutate}
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 800, 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(236,72,153,0.3)'
                }}
            >
                <Wand2 size={16} /> {t.apply}
            </button>
        </div>
    );
};

export default MutationEngine;
