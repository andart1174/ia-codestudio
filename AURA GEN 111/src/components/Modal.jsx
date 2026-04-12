import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ title, children, onClose }) => {
    return (
        <div className="modal-overlay">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="modal-content"
            >
                <div className="modal-header">
                    <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#fff' }}>{title}</h3>
                    <button onClick={onClose} className="modal-close">
                        <X size={20} />
                    </button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </motion.div>
        </div>
    );
};

export default Modal;
