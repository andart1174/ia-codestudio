import React from 'react';
import { useTranslation } from 'react-i18next';
import {
    Type,
    MousePointer2,
    Square,
    Layout,
    CreditCard,
    CheckCircle2,
    Image as ImageIcon
} from 'lucide-react';
import { getToolboxCategories } from '../data/toolbox.jsx';

const VisualToolbox = ({ onInsert }) => {
    const { t } = useTranslation();
    const categories = getToolboxCategories(t);

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '12px', borderRadius: '12px', fontSize: '13px', textAlign: 'center', border: '1px dashed rgba(99, 102, 241, 0.3)' }}>
                {t('dragToAdd') || 'Drag to add to Preview'}
            </div>
            {categories.map((cat, idx) => (
                <div key={idx}>
                    <h5 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '12px' }}>{cat.name}</h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                        {cat.items.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => onInsert(JSON.stringify({ name: item.name, snippet: item.snippet, logic: item.logic || '' }))}
                                draggable
                                onDragStart={(e) => {
                                    e.dataTransfer.setData('text/plain', JSON.stringify({ name: item.name, snippet: item.snippet, logic: item.logic || '' }));
                                    e.dataTransfer.effectAllowed = 'copy';
                                }}
                                className="template-card"
                                style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', cursor: 'grab' }}
                            >
                                <div style={{ color: 'var(--primary)' }}>{item.icon}</div>
                                <span style={{ fontSize: '13px', fontWeight: 500 }}>{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VisualToolbox;
