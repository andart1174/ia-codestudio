import React, { useState } from 'react';
import { Database, Plus, Trash2, Code, Play } from 'lucide-react';

const AuraMockDB = ({ onInject, isFr }) => {
    const [tables, setTables] = useState([
        { id: 1, name: 'users', data: '[{"id":1,"name":"Alice"},{"id":2,"name":"Bob"}]' }
    ]);

    const t = {
        title: isFr ? 'MockDB Virtual 🗄️' : 'Virtual MockDB 🗄️',
        desc: isFr ? 'Génère une fausse API connectée à IndexedDB.' : 'Generate a fake REST API connected via IndexedDB.',
        add: isFr ? 'Nouvelle Table' : 'New Table',
        gen: isFr ? 'Connecter au Code' : 'Wire to Code',
    };

    const addTable = () => {
        setTables([...tables, { id: Date.now(), name: 'new_table', data: '[]' }]);
    };

    const removeTable = (id) => {
        setTables(tables.filter(t => t.id !== id));
    };

    const updateTable = (id, key, val) => {
        setTables(tables.map(t => t.id === id ? { ...t, [key]: val } : t));
    };

    const generateInjection = () => {
        let code = `// --- Aura MockDB Auto-Generated API ---\n`;
        code += `// These functions intercept logic to act as a real DB.\n`;
        
        tables.forEach(tbl => {
            const cap = tbl.name.charAt(0).toUpperCase() + tbl.name.slice(1);
            code += `
const use${cap}DB = () => {
    const [data, setData] = React.useState(${tbl.data || '[]'});
    
    const addRecord = (record) => {
        setData(prev => [...prev, { id: Date.now(), ...record }]);
    };
    
    const removeRecord = (id) => {
        setData(prev => prev.filter(r => r.id !== id));
    };

    return { ${tbl.name}: data, addRecord, removeRecord };
};
`;
        });

        const snippetObj = JSON.stringify({
            logic: code,
            snippet: ''
        });

        onInject(snippetObj);
    };

    return (
        <div style={{ padding: '16px', color: '#e2e8f0', fontFamily: 'system-ui' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                {t.desc}
            </div>

            <button onClick={addTable} style={{ width: '100%', padding: '10px', background: '#0f172a', border: '1px dashed #3ecf8e', color: '#3ecf8e', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: 'bold', marginBottom: '16px' }}>
                <Plus size={16} /> {t.add}
            </button>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {tables.map(tbl => (
                    <div key={tbl.id} style={{ background: '#1e293b', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #3ecf8e' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <input 
                                value={tbl.name} 
                                onChange={e => updateTable(tbl.id, 'name', e.target.value)} 
                                style={{ background: '#0f172a', border: '1px solid #334155', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold' }} 
                            />
                            <button onClick={() => removeTable(tbl.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={14} /></button>
                        </div>
                        <textarea 
                            value={tbl.data} 
                            onChange={e => updateTable(tbl.id, 'data', e.target.value)} 
                            rows={3} 
                            style={{ width: '100%', boxSizing: 'border-box', background: '#0f172a', border: '1px solid #334155', color: '#a5b4fc', padding: '8px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace', resize: 'vertical' }}
                            placeholder="Initial JSON data..."
                        />
                    </div>
                ))}
            </div>

            <button 
                onClick={generateInjection} 
                disabled={tables.length === 0}
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: tables.length > 0 ? '#3ecf8e' : '#334155', 
                    color: tables.length > 0 ? '#0f172a' : '#fff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 800, 
                    cursor: tables.length > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                }}
            >
                <Code size={16} /> {t.gen}
            </button>
        </div>
    );
};

export default AuraMockDB;
