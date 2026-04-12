import React from 'react';
import { appTemplates, siteTemplates, readyMadeTemplates } from '../data/templates';
import { Search } from 'lucide-react';

const TemplateExplorer = ({ type, onSelect }) => {
    const templates = React.useMemo(() => {
        if (type === 'apps') return appTemplates;
        if (type === 'sites') return siteTemplates;
        if (type === 'ready') return readyMadeTemplates;
        return [];
    }, [type]);

    const [search, setSearch] = React.useState('');

    const filtered = templates.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div className="search-box">
                <Search className="search-icon" size={16} />
                <input
                    type="text"
                    placeholder="Search templates..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="template-list-inner" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '24px' }}>
                {filtered.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => onSelect(t.code)}
                        className="template-card"
                    >
                        <h4>{t.title}</h4>
                        <p>{t.description}</p>
                    </button>
                ))}
            </div>
        </>
    );
};

export default TemplateExplorer;
