import React, { useState } from 'react';
import { Wand2, Copy } from 'lucide-react';

const ANIMATIONS = [
    { id: 'fadeIn', label: 'Fade In', frames: 'from { opacity: 0; } to { opacity: 1; }' },
    { id: 'slideUp', label: 'Slide Up', frames: 'from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }' },
    { id: 'slideLeft', label: 'Slide Left', frames: 'from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); }' },
    { id: 'slideRight', label: 'Slide Right', frames: 'from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); }' },
    { id: 'scaleUp', label: 'Scale Up', frames: 'from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); }' },
    { id: 'bounce', label: 'Bounce', frames: '0%{transform:translateY(0)} 30%{transform:translateY(-20px)} 50%{transform:translateY(0)} 70%{transform:translateY(-10px)} 100%{transform:translateY(0)}' },
    { id: 'pulse', label: 'Pulse', frames: '0%{transform:scale(1)} 50%{transform:scale(1.08)} 100%{transform:scale(1)}' },
    { id: 'rotate', label: 'Rotate', frames: 'from { transform: rotate(0deg); } to { transform: rotate(360deg); }' },
    { id: 'shake', label: 'Shake', frames: '0%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-8px)} 80%{transform:translateX(8px)} 100%{transform:translateX(0)}' },
    { id: 'flip', label: 'Flip', frames: 'from { transform: perspective(400px) rotateY(90deg); opacity: 0; } to { transform: perspective(400px) rotateY(0deg); opacity: 1; }' },
];

const EASINGS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];

const AnimationBuilder = ({ onInsert }) => {
    const [anim, setAnim] = useState('fadeIn');
    const [duration, setDuration] = useState(0.6);
    const [delay, setDelay] = useState(0);
    const [iterations, setIterations] = useState('1');
    const [easing, setEasing] = useState('ease-out');
    const [copied, setCopied] = useState(false);
    const isFr = document.documentElement.lang === 'fr';

    const selected = ANIMATIONS.find(a => a.id === anim);

    const cssCode = `@keyframes ${anim} {
  ${selected?.frames}
}

/* Apply this style to your element: */
.animated-element {
  animation: ${anim} ${duration}s ${easing} ${delay}s ${iterations === 'inf' ? 'infinite' : iterations};
}`;

    const inlineStyle = `style={{ animation: '${anim} ${duration}s ${easing} ${delay}s ${iterations === 'inf' ? 'infinite' : iterations}' }}`;

    const snippetCode = `<style>{\`@keyframes ${anim} { ${selected?.frames} }\`}</style>
<div ${inlineStyle}>
  Your animated content here
</div>`;

    const handleInsert = () => {
        onInsert(JSON.stringify({ name: `${selected?.label} Animation`, snippet: snippetCode, logic: '' }));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px dashed rgba(16,185,129,0.3)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: '#10b981', textAlign: 'center', fontWeight: 600 }}>
                <Wand2 size={14} style={{ display: 'inline', marginRight: '6px' }} />
                {isFr ? 'Construisez vos animations visuellement' : 'Build animations visually'}
            </div>

            {/* Animation Type */}
            <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                    {isFr ? 'Type d\'animation' : 'Animation Type'}
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {ANIMATIONS.map(a => (
                        <button key={a.id} onClick={() => setAnim(a.id)} style={{ padding: '6px 11px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 600, background: anim === a.id ? 'var(--primary)' : 'var(--glass-bg)', color: anim === a.id ? '#fff' : 'var(--text-muted)', transition: 'all 0.15s' }}>
                            {a.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Duration */}
            <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>{isFr ? 'Durée' : 'Duration'}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{duration}s</span>
                </label>
                <input type="range" min="0.1" max="3" step="0.1" value={duration} onChange={e => setDuration(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
            </div>

            {/* Delay */}
            <div>
                <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>{isFr ? 'Délai' : 'Delay'}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>{delay}s</span>
                </label>
                <input type="range" min="0" max="2" step="0.1" value={delay} onChange={e => setDelay(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary)' }} />
            </div>

            {/* Easing + Iterations */}
            <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Easing</label>
                    <select value={easing} onChange={e => setEasing(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--glass-bg)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}>
                        {EASINGS.map(e => <option key={e} value={e}>{e}</option>)}
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>{isFr ? 'Répétitions' : 'Iterations'}</label>
                    <select value={iterations} onChange={e => setIterations(e.target.value)} style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--glass-border)', borderRadius: '8px', background: 'var(--glass-bg)', color: 'var(--text-primary)', fontSize: '12px', outline: 'none' }}>
                        {['1', '2', '3', '5', 'inf'].map(v => <option key={v} value={v}>{v === 'inf' ? '∞ Infinite' : v}</option>)}
                    </select>
                </div>
            </div>

            {/* Live Preview */}
            <div style={{ border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80px', background: 'var(--glass-bg)', overflow: 'hidden' }}>
                <style>{`@keyframes ${anim}_preview { ${selected?.frames} }`}</style>
                <div style={{
                    width: '60px', height: '60px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, var(--primary), #8b5cf6)',
                    animation: `${anim}_preview ${duration}s ${easing} ${delay}s ${iterations === 'inf' ? 'infinite' : iterations}`,
                }} />
            </div>

            {/* Code preview */}
            <div style={{ background: '#0f172a', borderRadius: '8px', padding: '10px 12px', fontSize: '10px', fontFamily: 'monospace', color: '#7dd3fc', maxHeight: '80px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                {`animation: ${anim} ${duration}s ${easing} ${delay}s ${iterations === 'inf' ? 'infinite' : iterations}`}
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleCopy} style={{ flex: 1, padding: '10px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '9px', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Copy size={12} />
                    {copied ? 'Copied!' : (isFr ? 'Copier CSS' : 'Copy CSS')}
                </button>
                <button onClick={handleInsert} style={{ flex: 1, padding: '10px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '9px', fontWeight: 700, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Wand2 size={12} />
                    {isFr ? 'Insérer' : 'Insert JSX'}
                </button>
            </div>
        </div>
    );
};

export default AnimationBuilder;
