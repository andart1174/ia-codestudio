import React, { useState, useRef } from 'react';
import { 
    Image as ImageIcon, 
    Film, 
    Upload, 
    Search, 
    Plus, 
    Check, 
    X,
    FolderOpen,
    Trash2
} from 'lucide-react';
import { STOCK_MEDIA } from '../data/mediaData';

const MediaManager = ({ onInject, isFr }) => {
    const [activeTab, setActiveTab] = useState('library');
    const [myMedia, setMyMedia] = useState([]);
    const [injectedId, setInjectedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newMedia = {
                    id: 'local-' + Date.now() + Math.random(),
                    type: file.type.startsWith('video') ? 'video' : 'image',
                    name: file.name,
                    url: event.target.result, // Base64 Data URL
                    category: 'Uploads'
                };
                setMyMedia(prev => [newMedia, ...prev]);
            };
            reader.readAsDataURL(file);
        });
    };

    const inject = (item) => {
        let snippet = '';
        if (item.type === 'image') {
            snippet = `<img src="${item.url}" alt="${item.name}" style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'block', margin: '10px 0' }} />`;
        } else {
            // Added muted, autoPlay, loop, playsInline for modern browser compatibility
            snippet = `<video src="${item.url}" muted autoPlay loop playsInline controls style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', display: 'block', margin: '10px 0' }} />`;
        }
        
        onInject({ snippet, name: item.name });
        setInjectedId(item.id);
        setTimeout(() => setInjectedId(null), 2000);
    };

    const removeMyMedia = (id) => {
        setMyMedia(myMedia.filter(m => m.id !== id));
    };

    const filteredStock = STOCK_MEDIA.filter(m => 
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        m.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ padding: '16px', color: '#f8fafc', background: '#0f172a', minHeight: '100%' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImageIcon size={18} color="white" />
                </div>
                <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>{isFr ? 'Gestionnaire Média' : 'Media Manager'}</h3>
                    <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>{isFr ? 'Gérez vos visuels' : 'Manage your visuals'}</p>
                </div>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', padding: '4px', marginBottom: 20 }}>
                <button 
                    onClick={() => setActiveTab('library')}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: activeTab === 'library' ? '#1e293b' : 'transparent', color: activeTab === 'library' ? '#fff' : '#64748b', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    {isFr ? 'Bibliothèque' : 'Library'}
                </button>
                <button 
                    onClick={() => setActiveTab('uploads')}
                    style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: activeTab === 'uploads' ? '#1e293b' : 'transparent', color: activeTab === 'uploads' ? '#fff' : '#64748b', fontSize: '11px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    {isFr ? 'Mes Fichiers' : 'Uploads'}
                </button>
            </div>

            {activeTab === 'library' && (
                <>
                    {/* Search */}
                    <div style={{ position: 'relative', marginBottom: 20 }}>
                        <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
                        <input 
                            type="text" 
                            placeholder={isFr ? 'Rechercher...' : 'Search assets...'}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '100%', padding: '10px 12px 10px 36px', background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '10px', color: '#fff', fontSize: '12px', outline: 'none' }}
                        />
                    </div>

                    {/* Stock Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        {filteredStock.map(item => (
                            <div key={item.id} className="template-card" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', height: '110px', group: 'hover' }}>
                                {item.type === 'image' ? (
                                    <img src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.name} />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Film size={24} color="#6366f1" />
                                    </div>
                                )}
                                
                                {/* Overlay on Hover (simplified for this container) */}
                                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', opacity: 0, transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', hover: { opacity: 1 } }} onMouseEnter={(e) => e.currentTarget.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.style.opacity = 0}>
                                    <button 
                                        onClick={() => inject(item)}
                                        style={{ width: '32px', height: '32px', borderRadius: '50%', background: injectedId === item.id ? '#10b981' : '#6366f1', border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}
                                    >
                                        {injectedId === item.id ? <Check size={16} /> : <Plus size={16} />}
                                    </button>
                                </div>

                                {/* Label */}
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '6px 8px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', fontSize: '9px', fontWeight: 600 }}>
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {activeTab === 'uploads' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Upload Dropzone */}
                    <div 
                        onClick={() => fileInputRef.current.click()}
                        style={{ padding: '30px', border: '2px dashed rgba(99, 102, 241, 0.3)', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.03)', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.6)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)'}
                    >
                        <Upload size={32} color="#6366f1" style={{ marginBottom: '12px' }} />
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', margin: '0 0 4px 0' }}>{isFr ? 'Cliquez pour uploader' : 'Click to upload'}</p>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{isFr ? 'Images ou Vidéos' : 'Images or Videos'}</p>
                        <input 
                            type="file" 
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            multiple
                            accept="image/*,video/*"
                            onChange={handleFileUpload}
                        />
                    </div>

                    {/* My Media List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        {myMedia.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                                <FolderOpen size={32} style={{ marginBottom: 12, opacity: 0.3 }} />
                                <p style={{ fontSize: '12px' }}>{isFr ? 'Aucun fichier uploadé' : 'No files uploaded yet'}</p>
                            </div>
                        ) : (
                            myMedia.map(item => (
                                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px', background: '#1e293b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                                        {item.type === 'image' ? (
                                            <img src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                                        ) : (
                                            <div style={{ width: '100%', height: '100%', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <Film size={18} color="#6366f1" />
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <p style={{ fontSize: '11px', fontWeight: 600, color: '#f1f5f9', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</p>
                                        <p style={{ fontSize: '9px', color: '#64748b', margin: 0, textTransform: 'uppercase' }}>{item.type}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 4 }}>
                                        <button 
                                            onClick={() => inject(item)}
                                            style={{ padding: '6px', borderRadius: '8px', border: 'none', background: injectedId === item.id ? '#10b981' : 'rgba(99,102,241,0.2)', color: injectedId === item.id ? '#fff' : '#818cf8', cursor: 'pointer' }}
                                        >
                                            {injectedId === item.id ? <Check size={14} /> : <Plus size={14} />}
                                        </button>
                                        <button 
                                            onClick={() => removeMyMedia(item.id)}
                                            style={{ padding: '6px', borderRadius: '8px', border: 'none', background: 'rgba(239,68,68,0.1)', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Footer Tip */}
            <div style={{ marginTop: 'auto', paddingTop: '20px', fontSize: '10px', color: '#475569', textAlign: 'center' }}>
                <p>💡 {isFr ? 'Vous pouvez aussi faire glisser les fichiers ici' : 'You can also drag files here'}</p>
            </div>
        </div>
    );
};

export default MediaManager;
