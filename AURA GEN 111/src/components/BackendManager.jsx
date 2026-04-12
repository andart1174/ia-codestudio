import React, { useState } from 'react';
import { Database, Link2, ShieldCheck, Zap, Plus, Check, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const BackendManager = ({ onInjectFile }) => {
    const { i18n } = useTranslation();
    const isFr = i18n.language.startsWith('fr');
    const [service, setService] = useState('supabase'); // supabase | firebase
    const [config, setConfig] = useState({
        url: '',
        key: '',
        projectId: '',
        appId: ''
    });
    const [injected, setInjected] = useState(false);

    const handleInject = () => {
        let fileName = service === 'supabase' ? 'supabase.js' : 'firebase.js';
        let content = '';

        if (service === 'supabase') {
            content = `import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '${config.url || 'YOUR_SUPABASE_URL'}';
const supabaseKey = '${config.key || 'YOUR_SUPABASE_ANON_KEY'}';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Example Usage:
// const { data, error } = await supabase.from('your_table').select('*');
`;
        } else {
            content = `import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "${config.key || 'YOUR_API_KEY'}",
  projectId: "${config.projectId || 'YOUR_PROJECT_ID'}",
  appId: "${config.appId || 'YOUR_APP_ID'}"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
`;
        }

        onInjectFile(fileName, content);
        setInjected(true);
        setTimeout(() => setInjected(false), 3000);
    };

    return (
        <div style={{ padding: '16px', background: '#0f172a', borderRadius: '12px', color: '#f8fafc' }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                <button 
                    onClick={() => setService('supabase')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid',
                        borderColor: service === 'supabase' ? '#3ecf8e' : '#334155',
                        background: service === 'supabase' ? 'rgba(62, 207, 142, 0.1)' : 'transparent',
                        color: service === 'supabase' ? '#3ecf8e' : '#94a3b8',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                >
                    <Zap size={14} /> Supabase
                </button>
                <button 
                    onClick={() => setService('firebase')}
                    style={{
                        flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid',
                        borderColor: service === 'firebase' ? '#ffca28' : '#334155',
                        background: service === 'firebase' ? 'rgba(255, 202, 40, 0.1)' : 'transparent',
                        color: service === 'firebase' ? '#ffca28' : '#94a3b8',
                        cursor: 'pointer', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                    }}
                >
                    <Database size={14} /> Firebase
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {service === 'supabase' ? 'Project URL' : 'Project ID'}
                    </label>
                    <input 
                        type="text" 
                        value={service === 'supabase' ? config.url : config.projectId}
                        onChange={e => setConfig({...config, [service === 'supabase' ? 'url' : 'projectId']: e.target.value})}
                        placeholder={service === 'supabase' ? 'https://xyz.supabase.co' : 'my-project-123'}
                        style={{
                            width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155',
                            borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none'
                        }}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 700, textTransform: 'uppercase' }}>
                        {service === 'supabase' ? 'Anon Key' : 'API Key'}
                    </label>
                    <input 
                        type="password" 
                        value={config.key}
                        onChange={e => setConfig({...config, key: e.target.value})}
                        placeholder="••••••••••••••••"
                        style={{
                            width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155',
                            borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none'
                        }}
                    />
                </div>

                {service === 'firebase' && (
                    <div>
                        <label style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: 700, textTransform: 'uppercase' }}>App ID</label>
                        <input 
                            type="text" 
                            value={config.appId}
                            onChange={e => setConfig({...config, appId: e.target.value})}
                            placeholder="1:123456789:web:abc123"
                            style={{
                                width: '100%', padding: '10px', background: '#1e293b', border: '1px solid #334155',
                                borderRadius: '8px', color: '#fff', fontSize: '13px', outline: 'none'
                            }}
                        />
                    </div>
                )}

                <div style={{ marginTop: '8px', padding: '10px', background: 'rgba(99, 102, 241, 0.05)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px', display: 'flex', gap: '8px' }}>
                    <Info size={14} style={{ color: '#818cf8', flexShrink: 0, marginTop: '2px' }} />
                    <div style={{ fontSize: '11px', color: '#94a3b8', lineHeight: 1.5 }}>
                        {isFr 
                            ? "L'injection va créer un nouveau fichier dans votre projet et ajoutera automatiquement les dépendances requises." 
                            : 'Injecting will create a new file in your project and automatically handle the required dependencies.'}
                    </div>
                </div>

                <button 
                    onClick={handleInject}
                    style={{
                        marginTop: '12px', padding: '12px', background: injected ? '#10b981' : '#6366f1',
                        border: 'none', borderRadius: '8px', color: '#fff', fontWeight: 700,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        transition: 'all 0.2s'
                    }}
                >
                    {injected ? <Check size={16} /> : <Plus size={16} />}
                    {injected ? (isFr ? 'Client Injecté !' : 'Client Injected!') : (isFr ? 'Injecter le client backend' : 'Inject Backend Client')}
                </button>
            </div>
        </div>
    );
};

export default BackendManager;
