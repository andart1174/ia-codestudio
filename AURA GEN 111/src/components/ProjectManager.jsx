import React, { useState, useEffect } from 'react';
import { 
    FolderClosed, FolderOpen, Plus, 
    Save, Trash2, FileText, ChevronRight,
    Clock, Database, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DB_NAME = 'AuraGenDB';
const STORE_NAME = 'projects';

const ProjectManager = ({ currentFiles, onLoadProject, isFr }) => {
    const [projects, setProjects] = useState([]);
    const [newName, setNewName] = useState('');
    const [lastSaved, setLastSaved] = useState(null);
    const [db, setDb] = useState(null);

    useEffect(() => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
            }
        };
        request.onsuccess = (e) => {
            setDb(e.target.result);
            loadProjects(e.target.result);
        };
    }, []);

    const loadProjects = (database) => {
        const tx = database.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => setProjects(request.result.sort((a, b) => b.updated - a.updated));
    };

    const handleCreate = () => {
        if (!newName.trim() || !db) return;
        const project = {
            name: newName,
            files: JSON.parse(JSON.stringify(currentFiles)), // Deep copy
            updated: Date.now()
        };
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.add(project);
        tx.oncomplete = () => {
            setNewName('');
            loadProjects(db);
            setLastSaved(Date.now());
        };
    };

    const handleDelete = (id, e) => {
        e.stopPropagation();
        if (!db) return;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        store.delete(id);
        tx.oncomplete = () => loadProjects(db);
    };

    const handleSaveCurrent = (id) => {
        if (!db) return;
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const getReq = store.get(id);
        getReq.onsuccess = () => {
            const project = getReq.result;
            project.files = JSON.parse(JSON.stringify(currentFiles));
            project.updated = Date.now();
            store.put(project);
            tx.oncomplete = () => {
                loadProjects(db);
                setLastSaved(Date.now());
            };
        };
    };

    return (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'rgba(15, 23, 42, 0.4)', minHeight: '100%' }}>
            
            {/* Create Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>
                    <Plus size={14} /> {isFr ? 'Nouveau Projet' : 'New Project'}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder={isFr ? "Nom du projet..." : "Project name..."}
                        style={{
                            flex: 1, background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '8px', padding: '8px 12px', color: '#fff', fontSize: '13px', outline: 'none'
                        }}
                    />
                    <button 
                        onClick={handleCreate}
                        disabled={!newName.trim()}
                        style={{
                            padding: '8px 12px', borderRadius: '8px', border: 'none',
                            background: newName.trim() ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.05)',
                            color: '#fff', cursor: newName.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.2s'
                        }}
                    >
                        {isFr ? 'Créer' : 'Create'}
                    </button>
                </div>
            </div>

            {/* Project List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                    <FolderOpen size={14} /> {isFr ? 'Mes Sauvegardes' : 'My Saved Projects'}
                    <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                        {projects.length}
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {projects.length === 0 ? (
                        <div style={{ padding: '30px 10px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', color: '#475569', fontSize: '12px' }}>
                            <Database size={24} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
                            {isFr ? 'Conservez vos codes ici localement' : 'Store your codes locally here'}
                        </div>
                    ) : (
                        projects.map(p => (
                            <div 
                                key={p.id}
                                onClick={() => onLoadProject(p.files)}
                                style={{
                                    padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                                    borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', position: 'relative',
                                    display: 'flex', alignItems: 'center', gap: '12px'
                                }}
                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                            >
                                <div style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', padding: '8px', borderRadius: '8px' }}>
                                    <FileText size={16} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 700, marginBottom: '2px' }}>{p.name}</div>
                                    <div style={{ color: '#475569', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={10} /> {new Date(p.updated).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleSaveCurrent(p.id); }}
                                        title={isFr ? 'Écraser avec le code actuel' : 'Overwrite with current code'}
                                        style={{ background: 'none', border: 'none', color: '#64748b', padding: '6px', cursor: 'pointer', borderRadius: '6px' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#10b981'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                                    >
                                        <Save size={14} />
                                    </button>
                                    <button 
                                        onClick={(e) => handleDelete(p.id, e)}
                                        title={isFr ? 'Supprimer' : 'Delete'}
                                        style={{ background: 'none', border: 'none', color: '#64748b', padding: '6px', cursor: 'pointer', borderRadius: '6px' }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                <ChevronRight size={14} style={{ color: '#1e293b' }} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            {lastSaved && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ position: 'fixed', bottom: 20, right: 20, background: '#10b981', color: '#fff', padding: '10px 20px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '12px', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', zIndex: 1000 }}
                >
                    <Check size={16} /> {isFr ? 'Projet Sauvegardé' : 'Project Saved'}
                </motion.div>
            )}
        </div>
    );
};

export default ProjectManager;
