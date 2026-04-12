import React from 'react';

const SidebarItem = ({ icon, label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`footer-btn ${active ? 'active' : ''}`}
            style={active ? { background: 'var(--glass)', color: '#fff', border: '1px solid var(--glass-border)' } : {}}
        >
            <div style={{ display: 'flex', alignItems: 'center', transition: 'transform 0.2s', transform: active ? 'scale(1.1)' : 'scale(1)' }}>
                {React.cloneElement(icon, { size: 18 })}
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{label}</span>
        </button>
    );
};

export default SidebarItem;
