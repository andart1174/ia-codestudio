import React, { useState } from 'react';
import { Plus, Trash2, Code, Zap, Database, Play } from 'lucide-react';

const AuraLogicNodes = ({ onInject, isFr }) => {
    const [nodes, setNodes] = useState([]);

    const t = {
        title: isFr ? 'Nœuds Logiques 🧠' : 'Logic Nodes 🧠',
        desc: isFr ? 'Construisez visuellement votre logique.' : 'Visually construct your logic flow.',
        addNode: isFr ? 'Ajouter Nœud' : 'Add Node',
        gen: isFr ? 'Générer Code' : 'Generate Code',
        typeState: isFr ? 'Variables d\'état' : 'State Variable',
        typeEffect: isFr ? 'Effet (useEffect)' : 'Side Effect',
        typeRender: isFr ? 'Rendu Visuel' : 'Visual Render',
        typeFetch: isFr ? 'Requête API' : 'API Fetch',
    };

    const addNode = (type) => {
        const id = Date.now().toString();
        let defaultData = {};
        if (type === 'state') defaultData = { name: 'myVar', val: '0' };
        if (type === 'effect') defaultData = { code: 'console.log("Mounted!");', deps: '[]' };
        if (type === 'render') defaultData = { jsx: '<div>Hello Node</div>' };
        if (type === 'fetch') defaultData = { url: 'https://api.example.com/data' };
        
        setNodes([...nodes, { id, type, data: defaultData }]);
    };

    const removeNode = (id) => {
        setNodes(nodes.filter(n => n.id !== id));
    };

    const updateNode = (id, key, val) => {
        setNodes(nodes.map(n => n.id === id ? { ...n, data: { ...n.data, [key]: val } } : n));
    };

    const generateCode = () => {
        let snippet = `// --- Generated via Aura Logic Nodes ---\n`;
        let states = [];
        let effects = [];
        let fetches = [];
        let renders = [];

        nodes.forEach(n => {
            if (n.type === 'state') {
                const cap = n.data.name.charAt(0).toUpperCase() + n.data.name.slice(1);
                states.push(`const [${n.data.name}, set${cap}] = React.useState(${n.data.val});`);
            }
            if (n.type === 'effect') {
                effects.push(`React.useEffect(() => {\n  ${n.data.code}\n}, ${n.data.deps});`);
            }
            if (n.type === 'fetch') {
                const funcName = `fetchData_${n.id.slice(-4)}`;
                fetches.push(`const ${funcName} = async () => {\n  const res = await fetch('${n.data.url}');\n  const data = await res.json();\n  console.log(data);\n};\nReact.useEffect(() => { ${funcName}(); }, []);`);
            }
            if (n.type === 'render') {
                renders.push(n.data.jsx);
            }
        });

        if (states.length > 0) snippet += states.join('\n') + '\n\n';
        if (fetches.length > 0) snippet += fetches.join('\n\n') + '\n\n';
        if (effects.length > 0) snippet += effects.join('\n\n') + '\n\n';
        
        let logic = snippet;
        let finalOutput = '';

        if (renders.length > 0) {
             finalOutput = JSON.stringify({
                 logic: logic,
                 snippet: renders.join('\n')
             });
        } else {
             finalOutput = JSON.stringify({ logic, snippet: '' });
        }

        onInject(finalOutput);
    };

    return (
        <div style={{ padding: '16px', color: '#e2e8f0', fontFamily: 'system-ui' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                {t.desc}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                <button onClick={() => addNode('state')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', border: '1px solid #3b82f6', color: '#3b82f6', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    <Database size={14} /> STATE
                </button>
                <button onClick={() => addNode('effect')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', border: '1px solid #10b981', color: '#10b981', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    <Zap size={14} /> EFFECT
                </button>
                <button onClick={() => addNode('fetch')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', border: '1px solid #f59e0b', color: '#f59e0b', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    <Play size={14} /> FETCH
                </button>
                <button onClick={() => addNode('render')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#0f172a', border: '1px solid #ec4899', color: '#ec4899', padding: '8px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    <Code size={14} /> UI BLOCK
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {nodes.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#64748b', fontSize: '12px', padding: '24px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed #334155' }}>
                        {isFr ? 'Aucun nœud. Ajoutez-en un au-dessus.' : 'No nodes added yet. Use toolbar above.'}
                    </div>
                )}
                
                {nodes.map((n, index) => (
                    <div key={n.id} style={{
                        position: 'relative',
                        background: '#1e293b',
                        borderLeft: `4px solid ${n.type === 'state' ? '#3b82f6' : n.type === 'effect' ? '#10b981' : n.type === 'fetch' ? '#f59e0b' : '#ec4899'}`,
                        borderRadius: '0 8px 8px 0',
                        padding: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', color: n.type === 'state' ? '#3b82f6' : n.type === 'effect' ? '#10b981' : n.type === 'fetch' ? '#f59e0b' : '#ec4899' }}>
                                {n.type} Node
                            </div>
                            <button onClick={() => removeNode(n.id)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><Trash2 size={14} /></button>
                        </div>
                        
                        {n.type === 'state' && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input value={n.data.name} onChange={e => updateNode(n.id, 'name', e.target.value)} placeholder="name" style={{ flex: 1, padding: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px', fontSize: '12px' }}/>
                                <input value={n.data.val} onChange={e => updateNode(n.id, 'val', e.target.value)} placeholder="initial value" style={{ flex: 1, padding: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px', fontSize: '12px' }}/>
                            </div>
                        )}

                        {n.type === 'effect' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <input value={n.data.code} onChange={e => updateNode(n.id, 'code', e.target.value)} placeholder="console.log('hi')" style={{ width: '100%', boxSizing: 'border-box', padding: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px', fontSize: '12px' }}/>
                                <input value={n.data.deps} onChange={e => updateNode(n.id, 'deps', e.target.value)} placeholder="[]" style={{ width: '100%', boxSizing: 'border-box', padding: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px', fontSize: '12px' }}/>
                            </div>
                        )}

                        {n.type === 'fetch' && (
                            <input value={n.data.url} onChange={e => updateNode(n.id, 'url', e.target.value)} placeholder="https://api..." style={{ width: '100%', boxSizing: 'border-box', padding: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px', fontSize: '12px' }}/>
                        )}

                        {n.type === 'render' && (
                            <textarea value={n.data.jsx} onChange={e => updateNode(n.id, 'jsx', e.target.value)} rows="2" style={{ width: '100%', boxSizing: 'border-box', padding: '6px', background: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px', fontSize: '12px', resize: 'none' }}/>
                        )}
                        
                        {index < nodes.length - 1 && (
                            <div style={{ position: 'absolute', bottom: '-15px', left: '24px', width: '2px', height: '15px', background: '#334155' }} />
                        )}
                    </div>
                ))}
            </div>

            <button 
                onClick={generateCode} 
                disabled={nodes.length === 0}
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: nodes.length > 0 ? 'linear-gradient(135deg, #10b981, #059669)' : '#334155', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 800, 
                    cursor: nodes.length > 0 ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s'
                }}
            >
                <Plus size={16} /> {t.gen}
            </button>
        </div>
    );
};

export default AuraLogicNodes;
