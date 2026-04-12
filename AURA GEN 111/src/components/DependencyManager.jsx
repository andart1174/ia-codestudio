import React, { useState } from 'react';
import { Package, Search, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DependencyManager = ({ dependencies = [], onAdd, onRemove }) => {
    const { i18n } = useTranslation();
    const isFr = i18n.language.startsWith('fr');
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const searchNpm = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`https://registry.npmjs.org/-/v1/search?text=${encodeURIComponent(query)}&size=5`);
            const data = await res.json();
            setResults(data.objects || []);
        } catch (err) {
            setError(isFr ? 'Erreur de recherche' : 'Search error');
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = (pkgName, version) => {
        if (!dependencies.some(d => d.name === pkgName)) {
            onAdd({ name: pkgName, version });
        }
    };

    return (
        <div style={{ padding: '16px', background: '#0f172a', color: '#f8fafc', borderRadius: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Package size={18} color="#6366f1" />
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>
                    {isFr ? 'Manager Pachete NPM' : 'NPM Package Manager'}
                </h3>
            </div>

            <form onSubmit={searchNpm} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                    <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#64748b' }} />
                    <input 
                        type="text" 
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder={isFr ? "Căutați pachete (ex: lodash)" : "Search packages (e.g. lodash)"}
                        style={{
                            width: '100%', boxSizing: 'border-box', padding: '8px 10px 8px 30px', 
                            background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', 
                            color: '#fff', fontSize: '13px', outline: 'none'
                        }}
                    />
                </div>
                <button type="submit" disabled={loading} style={{
                    padding: '8px 14px', background: '#6366f1', border: 'none', borderRadius: '8px',
                    color: '#fff', fontWeight: 600, cursor: 'pointer', fontSize: '13px'
                }}>
                    {loading ? '...' : (isFr ? 'Caută' : 'Search')}
                </button>
            </form>

            {error && (
                <div style={{ fontSize: '12px', color: '#ef4444', marginBottom: '12px', display: 'flex', gap: '6px' }}>
                    <AlertCircle size={14} /> {error}
                </div>
            )}

            {results.length > 0 && (
                <div style={{ marginBottom: '20px', background: '#1e293b', borderRadius: '8px', overflow: 'hidden' }}>
                    <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 700, color: '#94a3b8', background: '#0f172a', borderBottom: '1px solid #334155' }}>
                        {isFr ? 'Rezultate Căutare' : 'Search Results'}
                    </div>
                    {results.map((res, i) => {
                        const pkg = res.package;
                        const isAdded = dependencies.some(d => d.name === pkg.name);
                        return (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderBottom: '1px solid #334155' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '13px', color: '#e2e8f0', marginBottom: '2px' }}>{pkg.name}</div>
                                    <div style={{ fontSize: '11px', color: '#64748b' }}>v{pkg.version}</div>
                                </div>
                                <button 
                                    onClick={() => handleAdd(pkg.name, pkg.version)}
                                    disabled={isAdded}
                                    style={{
                                        background: isAdded ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                        color: isAdded ? '#10b981' : '#a5b4fc',
                                        border: 'none', borderRadius: '6px', padding: '6px', cursor: isAdded ? 'default' : 'pointer'
                                    }}
                                >
                                    {isAdded ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase' }}>
                {isFr ? 'Pachete Instalate' : 'Installed Packages'} ({dependencies.length})
            </div>
            
            {dependencies.length === 0 ? (
                <div style={{ padding: '20px', textAlign: 'center', background: '#1e293b', borderRadius: '8px', color: '#64748b', fontSize: '13px' }}>
                    {isFr ? 'Niciun pachet adăugat.' : 'No packages added yet.'}
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {dependencies.map((dep, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#1e293b', borderRadius: '8px', border: '1px solid #334155' }}>
                            <div>
                                <span style={{ fontWeight: 700, fontSize: '13px', color: '#fff', marginRight: '6px' }}>{dep.name}</span>
                                <span style={{ fontSize: '11px', color: '#64748b' }}>v{dep.version}</span>
                            </div>
                            <button onClick={() => onRemove(dep.name)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}>
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '12px', fontStyle: 'italic', lineHeight: 1.5 }}>
                ⚠️ {isFr ? 'Pachetele sunt adăugate via Unpkg CDN. Ele depind de suportul UMD.' : 'Packages are injected via Unpkg CDN. They rely on UMD build availability.'}
            </div>
        </div>
    );
};

export default DependencyManager;
