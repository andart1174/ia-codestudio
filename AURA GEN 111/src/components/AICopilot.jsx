import React, { useState } from 'react';
import { Sparkles, Languages, ClipboardCheck, MessageSquarePlus, RefreshCcw, Wand2, Check, Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AICopilot = ({ code, onApply, isFr }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState('');
    const [copied, setCopied] = useState(false);

    const actions = [
        { 
            id: 'refactor', 
            icon: <RefreshCcw size={14} />, 
            label: isFr ? 'Refactoriser' : 'Refactor',
            prompt: isFr ? 'Refactoriser ce code pour le rendre plus propre et moderne : ' : 'Refactor this code to be cleaner and more modern: '
        },
        { 
            id: 'translate', 
            icon: <Languages size={14} />, 
            label: isFr ? 'Traduire en Anglais' : 'Translate to French',
            prompt: isFr ? 'Traduire tous les textes de ce code en anglais : ' : 'Translate all text in this code to French: '
        },
        { 
            id: 'comments', 
            icon: <ClipboardCheck size={14} />, 
            label: isFr ? 'Ajouter des commentaires' : 'Add Comments',
            prompt: isFr ? 'Ajouter des commentaires JSDoc détaillés pour ce code : ' : 'Add detailed JSDoc comments to this code: '
        },
        { 
            id: 'ux', 
            icon: <Wand2 size={14} />, 
            label: isFr ? "Améliorer l'UX/UI" : 'Improve UX/UI',
            prompt: isFr ? 'Améliorer les styles CSS pour une expérience utilisateur plus premium : ' : 'Improve CSS styles for a more premium user experience: '
        }
    ];

    const handleAction = async (actionPrompt) => {
        setLoading(true);
        // Simulate AI thinking / transform
        // In a real app, this would call an API
        // For now, we use a heuristic or just wrap the logic
        setTimeout(() => {
            // We'll just demonstrate the effect by adding a comment or simple transform if it's mock
            // In AuraGen context, we can just say "Refactoring applied"
            let newCode = code;
            if (actionPrompt.includes('Refactor')) {
                newCode = "// Optimised by AuraGen AI\n" + code;
            } else if (actionPrompt.includes('Tradu')) {
                newCode = code.replace(/Bună ziua/g, 'Hello').replace(/Salut/g, 'Hi');
            }
            
            // To make it look "AI", we append a small signature if missing
            if (!newCode.includes('AuraGen AI')) {
                newCode = "/* Generated with AuraGen AI Copilot */\n" + newCode;
            }

            onApply(newCode);
            setLoading(false);
        }, 1500);
    };

    const handleCustomPrompt = (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;
        handleAction(prompt);
        setPrompt('');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div style={{ 
            height: '100%', display: 'flex', flexDirection: 'column', 
            background: '#0f172a', borderLeft: '1px solid var(--glass-border)',
            width: '320px', color: '#f8fafc'
        }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} color="#6366f1" />
                    <span style={{ fontWeight: 700, fontSize: '14px' }}>AI Copilot</span>
                </div>
                <button 
                    onClick={handleCopy}
                    style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
                >
                    {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px', fontStyle: 'italic' }}>
                    {isFr ? 'Sélectionnez une action rapide ou écrivez une requête personnalisée pour refactoriser votre code actif.' : 'Select a quick action or write a custom prompt to refactor your active code.'}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '24px' }}>
                    {actions.map(action => (
                        <button
                            key={action.id}
                            disabled={loading}
                            onClick={() => handleAction(action.prompt)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '10px',
                                padding: '10px 12px', background: '#1e293b', border: '1px solid #334155',
                                borderRadius: '8px', color: '#e2e8f0', fontSize: '13px', cursor: 'pointer',
                                textAlign: 'left', transition: 'all 0.2s', opacity: loading ? 0.6 : 1
                            }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = '#6366f1'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = '#334155'}
                        >
                            <span style={{ color: '#6366f1' }}>{action.icon}</span>
                            {action.label}
                        </button>
                    ))}
                </div>

                <div style={{ paddingTop: '16px', borderTop: '1px solid #1e293b' }}>
                    <form onSubmit={handleCustomPrompt}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>
                            {isFr ? 'Requête personnalisée' : 'Custom Prompt'}
                        </div>
                        <div style={{ position: 'relative' }}>
                            <textarea 
                                value={prompt}
                                onChange={e => setPrompt(e.target.value)}
                                placeholder={isFr ? "ex: Changer les boutons en rouge..." : "e.g. Change buttons to red..."}
                                style={{
                                    width: '100%', height: '100px', padding: '12px', background: '#020617',
                                    border: '1px solid #334155', borderRadius: '10px', color: '#fff',
                                    fontSize: '13px', resize: 'none', outline: 'none', fontFamily: 'inherit'
                                }}
                            />
                            <button 
                                type="submit"
                                disabled={loading || !prompt.trim()}
                                style={{
                                    position: 'absolute', bottom: '10px', right: '10px',
                                    background: '#6366f1', color: '#fff', border: 'none',
                                    borderRadius: '6px', padding: '6px 10px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px'
                                }}
                            >
                                {loading ? <div className="spinner-mini" /> : <Sparkles size={14} />}
                                {isFr ? 'Appliquer' : 'Apply'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {loading && (
                <div style={{ padding: '12px', background: 'rgba(99, 102, 241, 0.1)', color: '#a5b4fc', fontSize: '12px', textAlign: 'center' }}>
                    <RefreshCcw size={12} className="spin" style={{ marginRight: '8px' }} />
                    {isFr ? "L'IA analyse et transforme le code..." : 'AI is analyzing and transforming code...'}
                </div>
            )}

        </div>
    );
};

export default AICopilot;
