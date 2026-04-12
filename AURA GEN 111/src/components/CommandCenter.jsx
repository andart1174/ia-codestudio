import React, { useState, useEffect, useRef } from 'react';
import { 
    Search, Command, Sparkles, Box, Layout, 
    Download, ShieldCheck, Trash2, X, ChevronRight,
    Rocket, Wand2, Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandCenter = ({ isOpen, onClose, onAction, figures, isFr }) => {
    const [query, setQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);

    const ACTIONS = [
        // AI
        { id: 'ai_gen', cat: 'AI', icon: Sparkles, en: 'Generate with AI', fr: 'Générer avec l\'IA', cmd: '/ai', color: '#8b5cf6' },
        { id: 'ai_fix', cat: 'AI', icon: Wand2, en: 'Auto-Fix Code', fr: 'Auto-Correction', cmd: '/fix', color: '#10b981' },
        
        // System
        { id: 'sys_exp', cat: 'System', icon: Download, en: 'Export Project (ZIP)', fr: 'Exporter le Projet (ZIP)', cmd: 'export', color: '#6366f1' },
        { id: 'sys_aud', cat: 'System', icon: ShieldCheck, en: 'Run Audit v2', fr: 'Lancer l\'Audit v2', cmd: 'audit', color: '#38bdf8' },
        { id: 'sys_cln', cat: 'System', icon: Trash2, en: 'Clean Code', fr: 'Nettoyer le Code', cmd: 'clean', color: '#ef4444' },

        // Modules
        { id: 'nav_3d', cat: 'Module', icon: Box, en: 'Go to 3D Lab', fr: 'Aller au Lab 3D', cmd: '3d', color: '#f59e0b' },
        { id: 'nav_tmp', cat: 'Module', icon: Layout, en: 'Explore Templates', fr: 'Explorer les Templates', cmd: 'templates', color: '#ec4899' },
    ];

    // Combine system actions with 3D figures for unified search
    const allOptions = [
        ...ACTIONS,
        ...(figures || []).map(f => ({
            id: `fig_${f.id}`,
            cat: '3D Figure',
            icon: Box,
            en: `Inject ${f.en}`,
            fr: `Injecter ${f.fr}`,
            cmd: f.id,
            color: f.tc || '#6366f1',
            type: 'figure',
            fig: f
        }))
    ];

    const filtered = allOptions.filter(opt => {
        const searchStr = `${opt.en} ${opt.fr} ${opt.cat} ${opt.cmd}`.toLowerCase();
        return searchStr.includes(query.toLowerCase());
    }).slice(0, 8);

    useEffect(() => {
        if (isOpen) {
            setQuery('');
            setSelectedIndex(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % Math.max(1, filtered.length));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filtered.length) % Math.max(1, filtered.length));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filtered[selectedIndex]) {
                onAction(filtered[selectedIndex]);
                onClose();
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="command-center-overlay" style={{
                    position: 'fixed', inset: 0, zIndex: 9999,
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
                    paddingTop: '15vh', backgroundColor: 'rgba(2, 6, 23, 0.75)',
                    backdropFilter: 'blur(12px)'
                }} onClick={onClose}>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="command-palette"
                        style={{
                            width: '100%', maxWidth: '640px',
                            backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            overflow: 'hidden'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div style={{
                            display: 'flex', alignItems: 'center', padding: '16px 20px',
                            borderBottom: '1px solid rgba(255,255,255,0.06)'
                        }}>
                            <Search size={22} color="#6366f1" style={{ marginRight: '16px' }} />
                            <input 
                                ref={inputRef}
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={isFr ? "Rechercher une commande ou une figure..." : "Search commands or figures..."}
                                style={{
                                    flex: 1, background: 'transparent', border: 'none',
                                    color: '#fff', fontSize: '18px', outline: 'none',
                                    fontWeight: '500'
                                }}
                            />
                            <div style={{
                                padding: '4px 8px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)',
                                color: '#64748b', fontSize: '11px', fontWeight: '800', display: 'flex', gap: '4px'
                            }}>
                                <Command size={11} /> <span>K</span>
                            </div>
                        </div>

                        {/* Results */}
                        <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '8px' }}>
                            {filtered.length > 0 ? (
                                filtered.map((opt, i) => {
                                    const Icon = opt.icon;
                                    const isSelected = i === selectedIndex;
                                    return (
                                        <div 
                                            key={opt.id}
                                            onMouseEnter={() => setSelectedIndex(i)}
                                            onClick={() => { onAction(opt); onClose(); }}
                                            style={{
                                                padding: '12px 16px', borderRadius: '10px', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', gap: '12px',
                                                backgroundColor: isSelected ? 'rgba(99,102,241,0.15)' : 'transparent',
                                                border: `1px solid ${isSelected ? 'rgba(99,102,241,0.2)' : 'transparent'}`,
                                                transition: 'all 0.15s ease'
                                            }}
                                        >
                                            <div style={{
                                                width: '32px', height: '32px', borderRadius: '8px',
                                                backgroundColor: `${opt.color}15`, color: opt.color,
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: isSelected ? `0 0 12px ${opt.color}30` : 'none'
                                            }}>
                                                {opt.type === 'figure' ? <span style={{fontSize: 14}}>{opt.fig.icon}</span> : <Icon size={18} />}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ color: isSelected ? '#fff' : '#cbd5e1', fontSize: '14px', fontWeight: '600' }}>
                                                    {isFr ? opt.fr : opt.en}
                                                </div>
                                                <div style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                    {opt.cat}
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <ChevronRight size={14} color="#6366f1" />
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={{ padding: '40px 20px', textAlign: 'center' }}>
                                    <Terminal size={32} color="#1e293b" style={{ margin: '0 auto 12px' }} />
                                    <div style={{ color: '#64748b', fontSize: '14px' }}>
                                        {isFr ? "Aucun résultat trouvé pour" : "No results found for"} "{query}"
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div style={{
                            padding: '12px 20px', background: 'rgba(0,0,0,0.2)',
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', gap: '20px', color: '#475569', fontSize: '11px'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ padding: '2px 5px', borderRadius: '4px', background: '#1e293b' }}>↑↓</span>
                                <span>{isFr ? 'Naviguer' : 'Navigate'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ padding: '2px 5px', borderRadius: '4px', background: '#1e293b' }}>Enter</span>
                                <span>{isFr ? 'Séléctionner' : 'Select'}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ padding: '2px 5px', borderRadius: '4px', background: '#1e293b' }}>Esc</span>
                                <span>{isFr ? 'Fermer' : 'Close'}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandCenter;
