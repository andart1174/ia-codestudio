import React, { useState, useEffect } from 'react';
import { BookMarked, Save, Trash2, Play, Plus } from 'lucide-react';

const STORAGE_KEY = 'aura_marketplace';

const ComponentMarketplace = ({ code, onInsert }) => {
    const [snippets, setSnippets] = useState([]);
    const [saveName, setSaveName] = useState('');
    const [saving, setSaving] = useState(false);
    const isFr = document.documentElement.lang === 'fr';

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            setSnippets(stored);
        } catch { setSnippets([]); }
    }, []);

    const persist = (list) => {
        setSnippets(list);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    };

    const handleSave = () => {
        if (!saveName.trim()) return;
        const entry = {
            id: Date.now(),
            name: saveName.trim(),
            code: code || '',
            date: new Date().toLocaleDateString(),
            lines: (code || '').split('\n').length,
        };
        persist([entry, ...snippets]);
        setSaveName('');
        setSaving(false);
    };

    const handleDelete = (id) => persist(snippets.filter(s => s.id !== id));

    const handleLoad = (s) => {
        onInsert(JSON.stringify({ name: s.name, snippet: s.code, logic: '' }));
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: 'rgba(245,158,11,0.08)', border: '1px dashed rgba(245,158,11,0.35)', borderRadius: '12px', padding: '12px', fontSize: '13px', color: '#f59e0b', textAlign: 'center', fontWeight: 600 }}>
                <BookMarked size={14} style={{ display: 'inline', marginRight: '6px' }} />
                {isFr ? 'Votre bibliothèque de composants' : 'Your personal component library'}
            </div>

            {/* Save current code */}
            {!saving ? (
                <button onClick={() => setSaving(true)} style={{ padding: '11px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '13px' }}>
                    <Plus size={14} />
                    {isFr ? 'Sauvegarder le code actuel' : 'Save Current Code'}
                </button>
            ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                        autoFocus
                        value={saveName}
                        onChange={e => setSaveName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSave()}
                        placeholder={isFr ? 'Nom du composant...' : 'Component name...'}
                        style={{ flex: 1, padding: '9px 12px', border: '1px solid var(--glass-border)', borderRadius: '9px', background: 'var(--glass-bg)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none' }}
                    />
                    <button onClick={handleSave} style={{ padding: '9px 14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '9px', fontWeight: 700, cursor: 'pointer', fontSize: '13px' }}>
                        <Save size={14} />
                    </button>
                </div>
            )}

            {/* Saved snippets */}
            {snippets.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)', fontSize: '13px' }}>
                    {isFr ? 'Aucun composant sauvegardé' : 'No saved components yet'}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {snippets.map(s => (
                        <div key={s.id} style={{ border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '12px', background: 'var(--glass-bg)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>{s.name}</span>
                                <button onClick={() => handleDelete(s.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '2px', display: 'flex' }}>
                                    <Trash2 size={13} />
                                </button>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                {s.date} · {s.lines} {isFr ? 'lignes' : 'lines'}
                            </div>
                            <button onClick={() => handleLoad(s)} style={{ width: '100%', padding: '8px', background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                                <Play size={12} />
                                {isFr ? 'Insérer' : 'Insert'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ComponentMarketplace;
