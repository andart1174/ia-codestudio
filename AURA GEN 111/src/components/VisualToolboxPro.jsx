import React from 'react';
import { useTranslation } from 'react-i18next';
import { getToolboxProCategories } from '../data/toolboxPro.jsx';

const VisualToolboxPro = ({ onInsert }) => {
    const { t } = useTranslation();
    const categories = getToolboxProCategories(t);

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                color: 'var(--primary)',
                padding: '12px',
                borderRadius: '12px',
                fontSize: '13px',
                textAlign: 'center',
                border: '1px dashed rgba(99, 102, 241, 0.4)',
                fontWeight: 600,
            }}>
                ⚡ Pro Components — Click to insert
            </div>
            {categories.map((cat, idx) => (
                <div key={idx}>
                    <h5 style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--text-muted)',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                    }}>
                        <span style={{ width: '16px', height: '1px', background: 'var(--primary)', display: 'inline-block', opacity: 0.4 }} />
                        {cat.name}
                    </h5>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
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
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px',
                                    padding: '10px 12px',
                                    cursor: 'grab',
                                    border: '1px solid rgba(99,102,241,0.15)',
                                }}
                            >
                                <div style={{ color: 'var(--primary)', flexShrink: 0 }}>{item.icon}</div>
                                <span style={{ fontSize: '13px', fontWeight: 500, textAlign: 'left' }}>{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VisualToolboxPro;
