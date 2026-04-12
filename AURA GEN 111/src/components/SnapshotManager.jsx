import React, { useState } from 'react';
import { Save, RotateCcw, Trash2, History, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SnapshotManager = ({ snapshots, onSave, onLoad, onDelete, lang }) => {
    const formatTime = (date) => {
        return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    };

    return (
        <div className="snapshot-manager-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header / Save Action */}
            <div style={{ textAlign: 'center' }}>
                <button 
                    className="primary-btn w-full" 
                    onClick={onSave}
                    style={{ background: 'var(--primary)', height: '42px', fontSize: '13px', fontWeight: '700' }}
                >
                    <Save size={16} />
                    {lang === 'fr' ? 'Sauvegarder l\'État Actuel' : 'Save Current State'}
                </button>
                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--text-muted)' }}>
                    <History size={12} />
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '800' }}>
                        {lang === 'fr' ? 'Historique des Versions' : 'Version History'}
                    </span>
                </div>
            </div>

            {/* List */}
            <div className="snapshots-list" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <AnimatePresence mode="popLayout">
                    {snapshots.length === 0 ? (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            style={{ padding: '30px 20px', textAlign: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.1)' }}
                        >
                            <Clock size={24} style={{ color: 'var(--text-muted)', margin: '0 auto 12px', display: 'block', opacity: 0.3 }} />
                            <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                {lang === 'fr' ? 'Aucun instantané enregistré.' : 'No snapshots saved yet.'}
                            </p>
                        </motion.div>
                    ) : (
                        snapshots.map((snap, i) => (
                            <motion.div 
                                key={snap.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ delay: i * 0.05 }}
                                className="snapshot-card"
                                style={{ 
                                    padding: '12px', 
                                    background: 'rgba(255,255,255,0.03)', 
                                    border: '1px solid rgba(255,255,255,0.05)', 
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '12px'
                                }}
                            >
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff' }}>
                                        {snap.name || `Snapshot #${snapshots.length - i}`}
                                    </div>
                                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                        <Clock size={10} />
                                        {formatTime(snap.timestamp)}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button 
                                        className="icon-btn-lite" 
                                        onClick={() => onLoad(snap.code)}
                                        title={lang === 'fr' ? 'Restaurer' : 'Restore'}
                                        style={{ color: 'var(--primary)', background: 'rgba(99,102,241,0.1)' }}
                                    >
                                        <RotateCcw size={14} />
                                    </button>
                                    <button 
                                        className="icon-btn-lite" 
                                        onClick={() => onDelete(snap.id)}
                                        title={lang === 'fr' ? 'Supprimer' : 'Delete'}
                                        style={{ color: 'var(--accent-rose)', background: 'rgba(239,68,68,0.1)' }}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
            
            {snapshots.length > 0 && (
                <p style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-muted)', margin: 0 }}>
                    {lang === 'fr' ? 'Les versions sont conservées pour cette session.' : 'Snapshots are kept for this session.'}
                </p>
            )}
        </div>
    );
};

export default SnapshotManager;
