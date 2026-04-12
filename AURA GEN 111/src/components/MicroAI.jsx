import React, { useState, useEffect, useRef } from 'react';
import { Wand2, X, Loader } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const MICRO_PRESETS = {
    en: [
        'Make it Apple style — rounded, light gray',
        'Make it bold and dark',
        'Add a gradient background',
        'Make it minimal and transparent',
        'Increase font size and weight',
    ],
    fr: [
        'Style Apple — arrondi, gris clair',
        'Texte en gras, couleur sombre',
        'Ajouter un fond dégradé',
        'Style minimaliste et transparent',
        'Augmenter la taille et le poids de la police',
    ],
};

// Simulate a micro AI fix by applying style keywords to a code snippet
const applyMicroFix = (snippet, instruction) => {
    let result = snippet;
    const lower = instruction.toLowerCase();

    if (lower.includes('apple') || lower.includes('rounded') || lower.includes('arrondi')) {
        result = result.replace(/borderRadius:\s*["'][^"']*["']/g, 'borderRadius: "20px"');
        result = result.replace(/background:\s*["'][^"']*["']/g, 'background: "#f5f5f7"');
        result = result.replace(/color:\s*["'][^"']*["']/g, 'color: "#1d1d1f"');
        if (!result.includes('borderRadius')) {
            result = result.replace('style={{', 'style={{ borderRadius: "20px", background: "#f5f5f7", color: "#1d1d1f",');
        }
    }
    if (lower.includes('gradient') || lower.includes('dégradé')) {
        result = result.replace(/background:\s*["'][^"']*["']/g, 'background: "linear-gradient(135deg, #6366f1, #a855f7)"');
        result = result.replace(/color:\s*["'][^"']*["']/g, 'color: "#fff"');
    }
    if (lower.includes('bold') || lower.includes('dark') || lower.includes('gras') || lower.includes('sombre')) {
        result = result.replace(/background:\s*["'][^"']*["']/g, 'background: "#0f172a"');
        result = result.replace(/color:\s*["'][^"']*["']/g, 'color: "#f8fafc"');
        result = result.replace(/fontWeight:\s*["']\w+["']/g, 'fontWeight: "900"');
    }
    if (lower.includes('minimal') || lower.includes('transparent')) {
        result = result.replace(/background:\s*["'][^"']*["']/g, 'background: "transparent"');
        result = result.replace(/boxShadow:\s*["'][^"']*["']/g, 'boxShadow: "none"');
        result = result.replace(/border:\s*["'][^"']*["']/g, 'border: "1px solid #e2e8f0"');
    }
    if (lower.includes('font') || lower.includes('police')) {
        result = result.replace(/fontSize:\s*["'][^"']*["']/g, 'fontSize: "18px"');
        result = result.replace(/fontWeight:\s*["']\w+["']/g, 'fontWeight: "800"');
    }

    return result;
};

const MicroAI = ({ code, onApply }) => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLine, setSelectedLine] = useState(null);
    const [snippet, setSnippet] = useState('');
    const [instruction, setInstruction] = useState('');
    const [loading, setLoading] = useState(false);
    const isFr = i18n.language.startsWith('fr');
    const presets = isFr ? MICRO_PRESETS.fr : MICRO_PRESETS.en;

    const handleSelectSnippet = () => {
        // Let user paste or type which element they want to target
        const lines = code.split('\n');
        // Default to the longest JSX line as an example
        const jsxLines = lines.filter(l => l.includes('<') && l.includes('>'));
        const biggest = jsxLines.sort((a, b) => b.length - a.length)[0] || '';
        setSnippet(biggest.trim());
        setIsOpen(true);
    };

    const handleApply = () => {
        if (!snippet || !instruction) return;
        setLoading(true);
        setTimeout(() => {
            const fixed = applyMicroFix(snippet, instruction);
            // Replace the snippet in the full code
            const newCode = code.replace(snippet.trim(), fixed);
            onApply(newCode);
            setLoading(false);
            setIsOpen(false);
            setInstruction('');
        }, 800);
    };

    return (
        <>
            {/* Floating trigger button */}
            <button
                onClick={handleSelectSnippet}
                title={isFr ? 'Micro-ajustement IA (sélection intelligente)' : 'AI Micro-Adjust (smart selection)'}
                style={{
                    position: 'absolute', bottom: '16px', right: '16px',
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed, #c026d3)',
                    border: 'none', color: '#fff', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
                    zIndex: 10, transition: 'transform 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
                <Wand2 size={18} />
            </button>

            {/* Micro-AI panel */}
            {isOpen && (
                <div style={{
                    position: 'absolute', bottom: '72px', right: '16px',
                    width: '320px', background: 'var(--sidebar-bg)',
                    border: '1px solid var(--glass-border)', borderRadius: '16px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    zIndex: 20, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg,#7c3aed,#c026d3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Wand2 size={14} color="#fff" />
                            </div>
                            <span style={{ fontWeight: 800, fontSize: '14px', color: 'var(--text-primary)' }}>
                                {isFr ? 'Micro-Ajustement IA' : 'AI Micro-Adjust'}
                            </span>
                        </div>
                        <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                            <X size={16} />
                        </button>
                    </div>

                    {/* Target snippet */}
                    <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                            {isFr ? 'Élément ciblé' : 'Target Element'}
                        </label>
                        <textarea
                            value={snippet}
                            onChange={e => setSnippet(e.target.value)}
                            rows={3}
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                background: '#0f172a', border: '1px solid var(--glass-border)',
                                borderRadius: '8px', padding: '10px', color: '#bae6fd',
                                fontSize: '11px', fontFamily: 'monospace', resize: 'vertical',
                            }}
                        />
                    </div>

                    {/* Presets */}
                    <div>
                        <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                            {isFr ? 'Suggestions rapides' : 'Quick Presets'}
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {presets.map((p, i) => (
                                <button key={i} onClick={() => setInstruction(p)} style={{
                                    padding: '7px 10px', borderRadius: '8px', border: '1px solid var(--glass-border)',
                                    background: instruction === p ? 'rgba(124,58,237,0.15)' : 'var(--glass-bg)',
                                    color: instruction === p ? '#a78bfa' : 'var(--text-muted)',
                                    textAlign: 'left', cursor: 'pointer', fontSize: '12px', fontWeight: 500,
                                }}>
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom instruction */}
                    <input
                        type="text"
                        placeholder={isFr ? 'Ou écrivez votre instruction...' : 'Or type your instruction...'}
                        value={instruction}
                        onChange={e => setInstruction(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleApply()}
                        style={{
                            padding: '10px 12px', borderRadius: '10px',
                            border: '1px solid var(--glass-border)', background: 'var(--glass-bg)',
                            color: 'var(--text-primary)', fontSize: '13px', outline: 'none',
                        }}
                    />

                    <button
                        onClick={handleApply}
                        disabled={loading || !instruction || !snippet}
                        style={{
                            padding: '12px', borderRadius: '10px',
                            background: loading || !instruction || !snippet ? '#475569' : 'linear-gradient(135deg, #7c3aed, #c026d3)',
                            border: 'none', color: '#fff', fontWeight: 700, cursor: loading ? 'wait' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '14px',
                        }}
                    >
                        {loading ? <Loader size={15} style={{ animation: 'spin 1s linear infinite' }} /> : <Wand2 size={15} />}
                        {loading ? (isFr ? 'Application...' : 'Applying...') : (isFr ? 'Appliquer' : 'Apply Fix')}
                    </button>
                </div>
            )}
        </>
    );
};

export default MicroAI;
