import React, { useState } from 'react';
import { History, Play, Rewind, FastForward, SkipBack, Info, Code } from 'lucide-react';

const TimeTravelDebugger = ({ onInject, isFr }) => {
    const t = {
        title: isFr ? 'Débogueur Temporel ⏳' : 'Time Travel Debugger ⏳',
        desc: isFr ? 'Génère un Hook pour espionner et voyager dans le temps des variables d\'état.' : 'Generate a hook to spy and time-travel through state variables.',
        gen: isFr ? 'Injecter le Hook Temporel' : 'Inject Time Hook',
    };

    const generateHook = () => {
        const code = `// --- Aura Time-Travel Debugger Hook ---\n` +
`const useAuraTimeTravel = (initialState) => {
    const [state, setState] = React.useState(initialState);
    const [history, setHistory] = React.useState([initialState]);
    const [index, setIndex] = React.useState(0);

    const setTravelState = (val) => {
        const resolved = typeof val === 'function' ? val(state) : val;
        const newHistory = history.slice(0, index + 1);
        newHistory.push(resolved);
        setHistory(newHistory);
        setIndex(newHistory.length - 1);
        setState(resolved);
    };

    const undo = () => {
        if (index > 0) {
            setIndex(index - 1);
            setState(history[index - 1]);
        }
    };

    const redo = () => {
        if (index < history.length - 1) {
            setIndex(index + 1);
            setState(history[index + 1]);
        }
    };

    return [state, setTravelState, undo, redo, history, index];
};
// ----------------------------------------
`;
        
        onInject(JSON.stringify({ logic: code, snippet: '' }));
    };

    return (
        <div style={{ padding: '16px', color: '#e2e8f0', fontFamily: 'system-ui' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                {t.desc}
            </div>

            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#8b5cf6', fontWeight: 'bold' }}>
                    <Info size={16} /> Comment l'utiliser / How to use:
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#cbd5e1', lineHeight: '1.6' }}>
                    <li>Cliquez sur "Injecter" pour ajouter <code style={{ color: '#e2e8f0', background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>useAuraTimeTravel</code>.</li>
                    <li>Remplacez votre <code style={{ color: '#e2e8f0', background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>useState</code> par <code style={{ color: '#e2e8f0', background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>useAuraTimeTravel</code>.</li>
                    <li>Appelez <code style={{ color: '#e2e8f0', background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>undo()</code> ou <code style={{ color: '#e2e8f0', background: '#1e293b', padding: '2px 4px', borderRadius: '4px' }}>redo()</code> dans votre UI !</li>
                </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', background: '#1e293b', padding: '16px', borderRadius: '12px', marginBottom: '24px' }}>
                 <button style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'not-allowed' }}><SkipBack size={20} /></button>
                 <button style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'not-allowed' }}><Rewind size={20} /></button>
                 <button style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'not-allowed' }}><Play size={20} /></button>
                 <button style={{ background: 'none', border: 'none', color: '#8b5cf6', cursor: 'not-allowed' }}><FastForward size={20} /></button>
            </div>

            <button 
                onClick={generateHook}
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    background: 'linear-gradient(135deg, #8b5cf6, #6366f1)', 
                    color: '#fff', 
                    border: 'none', 
                    borderRadius: '8px', 
                    fontWeight: 800, 
                    cursor: 'pointer',
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

export default TimeTravelDebugger;
