import React, { useState } from 'react';
import { FileCode2, FilePlus, X, Hash } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FileManager = ({ extraFiles, activeTab, onSelectTab, onAddFile, onRemoveFile }) => {
    const { i18n } = useTranslation();
    const isFr = i18n.language.startsWith('fr');
    const [isAdding, setIsAdding] = useState(false);
    const [newFileName, setNewFileName] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (newFileName.trim()) {
            let name = newFileName.trim();
            if (!name.endsWith('.jsx') && !name.endsWith('.js') && !name.endsWith('.css')) {
                name += '.jsx';
            }
            onAddFile(name);
            setNewFileName('');
            setIsAdding(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            setIsAdding(false);
            setNewFileName('');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, overflowX: 'auto', paddingRight: '8px' }}>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '100%'} }>
                <button
                    onClick={() => onSelectTab('App.jsx')}
                    style={{
                        background: activeTab === 'App.jsx' ? '#1e293b' : 'transparent',
                        color: activeTab === 'App.jsx' ? '#f8fafc' : '#94a3b8',
                        border: 'none', padding: '6px 12px', fontSize: '13px', fontWeight: activeTab === 'App.jsx' ? 600 : 400,
                        borderTopLeftRadius: '6px', borderTopRightRadius: '6px', cursor: 'pointer',
                        borderBottom: activeTab === 'App.jsx' ? '2px solid #6366f1' : '2px solid transparent',
                        display: 'flex', alignItems: 'center', gap: '6px',
                        transition: 'all 0.2s'
                    }}
                >
                    <FileCode2 size={13} style={{ color: '#6366f1' }} /> App.jsx
                </button>

                {extraFiles.map((file) => {
                    const isCss = file.name.endsWith('.css');
                    return (
                        <div key={file.name} style={{ display: 'flex', alignItems: 'center', background: activeTab === file.name ? '#1e293b' : 'transparent', borderBottom: activeTab === file.name ? '2px solid #6366f1' : '2px solid transparent', borderTopLeftRadius: '6px', borderTopRightRadius: '6px' }}>
                            <button
                                onClick={() => onSelectTab(file.name)}
                                style={{
                                    background: 'none',
                                    color: activeTab === file.name ? '#f8fafc' : '#94a3b8',
                                    border: 'none', padding: '6px 8px 6px 12px', fontSize: '13px', fontWeight: activeTab === file.name ? 600 : 400,
                                    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {isCss ? <Hash size={13} style={{ color: '#ec4899' }} /> : <FileCode2 size={13} style={{ color: '#10b981' }} />} {file.name}
                            </button>
                            <button 
                                onClick={(e) => { e.stopPropagation(); onRemoveFile(file.name); }}
                                style={{
                                    background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', 
                                    padding: '4px', borderRadius: '4px', display: 'flex', alignItems: 'center', marginRight: '4px'
                                }}
                                title={isFr ? "Supprimer le fichier" : "Delete file"}
                            >
                                <X size={12} />
                            </button>
                        </div>
                    );
                })}

                {isAdding ? (
                    <form onSubmit={handleAdd} style={{ display: 'flex', alignItems: 'center', marginLeft: '4px' }}>
                        <input
                            autoFocus
                            type="text"
                            value={newFileName}
                            onChange={(e) => setNewFileName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onBlur={() => { if(!newFileName.trim()) setIsAdding(false); }}
                            placeholder="Component.jsx"
                            style={{
                                background: '#0f172a', border: '1px solid #334155', color: '#fff', 
                                padding: '4px 8px', fontSize: '13px', borderRadius: '4px', width: '120px', outline: 'none'
                            }}
                        />
                    </form>
                ) : (
                    <button 
                        onClick={() => setIsAdding(true)}
                        style={{
                            background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', 
                            padding: '6px', display: 'flex', alignItems: 'center', marginLeft: '4px',
                            transition: 'color 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        title={isFr ? "Ajouter un nouveau fichier" : "Add New File"}
                    >
                        <FilePlus size={14} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default FileManager;
