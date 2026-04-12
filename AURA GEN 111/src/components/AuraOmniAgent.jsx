import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, TerminalSquare, Search, Send, Clock, Play } from 'lucide-react';
import { synthesizeApp } from '../utils/OmniAgentEngine';

const AuraOmniAgent = ({ onUpdateCode, isFr }) => {
    const [prompt, setPrompt] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [logs, setLogs] = useState([]);
    const [currentStep, setCurrentStep] = useState(null);
    const logsEndRef = useRef(null);

    const scrollToBottom = () => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [logs, currentStep]);

    const handleGenerate = async () => {
        if (!prompt.trim() || isThinking) return;

        setIsThinking(true);
        setLogs([]);
        setCurrentStep(null);
        
        // Push initial log
        setLogs([{ text: isFr ? "Initialisation de l'OmniAgent Engine..." : 'Initializing OmniAgent Engine...', status: 'init' }]);

        const handleProgress = (message, status) => {
            setCurrentStep(message);
            setLogs(prev => [...prev, { text: message, status }]);
        };

        const generatedCode = await synthesizeApp(prompt, handleProgress, isFr);
        
        onUpdateCode(generatedCode);
        
        setCurrentStep(isFr ? 'Synthèse terminée ! Le code a été injecté.' : 'Synthesis complete! Code injected.');
        setPrompt('');
        setIsThinking(false);
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', height: '100%',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2))',
            padding: '16px', boxSizing: 'border-box'
        }}>
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.15))',
                    padding: '8px 16px', borderRadius: '99px',
                    border: '1px solid rgba(168,85,247,0.3)',
                    color: '#a855f7', fontWeight: 700, fontSize: '13px',
                    boxShadow: '0 0 15px rgba(168,85,247,0.2)'
                }}>
                    <Sparkles size={14} /> OmniAware Core Active
                </div>
            </div>

            {/* Logs Area / Thought Process UI */}
            <div style={{ 
                flex: 1, 
                background: '#0f172a', 
                borderRadius: '16px', 
                padding: '16px', 
                overflowY: 'auto',
                border: '1px solid #1e293b',
                marginBottom: '16px',
                fontFamily: 'monospace',
                fontSize: '13px',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
            }}>
                {logs.length === 0 && !isThinking ? (
                    <div style={{ color: '#64748b', textAlign: 'center', marginTop: 'auto', marginBottom: 'auto', fontStyle: 'italic' }}>
                        {isFr ? "En attente d'une commande pour synthétiser l'application..." : 'Awaiting prompt to synthesize application...'}
                    </div>
                ) : null}

                {logs.map((log, i) => (
                    <div key={i} style={{ 
                        color: log.status === 'done' ? '#10b981' : log.status === 'search' ? '#0ea5e9' : '#e2e8f0',
                        display: 'flex', gap: '8px', alignItems: 'flex-start'
                    }}>
                        <span style={{ color: '#64748b', whiteSpace: 'nowrap' }}>[{new Date().toLocaleTimeString().split(' ')[0]}]</span>
                        <div style={{ 
                            animation: 'fadeIn 0.3s ease-in-out'
                        }}>
                            {log.status === 'search' && '🔍 '}
                            {log.status === 'extract' && '📦 '}
                            {log.status === 'combine' && '🔗 '}
                            {log.status === 'inject' && '💉 '}
                            {log.status === 'assemble' && '⚙️ '}
                            {log.status === 'done' && '✅ '}
                            {log.status === 'init' && '⚡ '}
                            {log.text}
                        </div>
                    </div>
                ))}
                
                {isThinking && currentStep && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#a855f7', marginTop: '4px' }}>
                        <div className="aura-loading-spinner" style={{ width: '14px', height: '14px', border: '2px solid transparent', borderTopColor: '#a855f7', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                        <span style={{ animation: 'pulse 1.5s infinite' }}>{currentStep}</span>
                    </div>
                )}
                
                <div ref={logsEndRef} />
            </div>

            {/* Prompt Bar (Glow) */}
            <div style={{
                position: 'relative',
                borderRadius: '16px',
                padding: '2px', // for border gradient
                background: 'linear-gradient(135deg, rgba(99,102,241,0.5), rgba(168,85,247,0.5), rgba(236,72,153,0.5))',
                backgroundSize: '200% auto',
                animation: isThinking ? 'gradMove 3s linear infinite' : 'none',
                boxShadow: isThinking ? '0 0 20px rgba(168,85,247,0.3)' : '0 4px 15px rgba(0,0,0,0.2)'
            }}>
                <div style={{
                    display: 'flex',
                    background: '#1e293b',
                    borderRadius: '14px',
                    overflow: 'hidden'
                }}>
                    <input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => { if(e.key === 'Enter') handleGenerate(); }}
                        disabled={isThinking}
                        placeholder={isFr ? 'Ex: Une application de santé avec bloc-notes et mockdb...' : 'Ex: A health app with notepad and mockdb...'}
                        style={{
                            flex: 1, padding: '16px 20px', border: 'none', background: 'transparent',
                            color: '#fff', outline: 'none', fontSize: '14px',
                            opacity: isThinking ? 0.5 : 1
                        }}
                    />
                    <button 
                        onClick={handleGenerate}
                        disabled={isThinking || !prompt.trim()}
                        style={{
                            padding: '0 20px', background: 'transparent', border: 'none',
                            color: isThinking || !prompt.trim() ? '#64748b' : '#a855f7',
                            cursor: isThinking || !prompt.trim() ? 'default' : 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'color 0.2s'
                        }}
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
            
            {/* Styles for animations */}
            <style>{`
                @keyframes gradMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes spin { 100% { transform: rotate(360deg); } }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>
        </div>
    );
};

export default AuraOmniAgent;
