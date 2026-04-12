import React, { useState } from 'react';
import { Sparkles, Send, Lightbulb, Zap, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIsuggestions } from '../utils/AIEngine';

const AIStudio = ({ onGenerate, lang }) => {
    const [prompt, setPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const suggestions = getAIsuggestions(lang);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        // Simulate "AI Thinking" process for premium feel
        await new Promise(resolve => setTimeout(resolve, 1800));
        onGenerate(prompt);
        setIsGenerating(false);
        setPrompt('');
    };

    return (
        <div className="ai-studio-container" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="ai-input-wrap">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <div className="sparkle-icon">
                        <Sparkles size={16} className="text-primary" />
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {lang === 'fr' ? 'Aura Studio AI' : 'Aura AI Studio'}
                    </span>
                </div>

                <div className="prompt-textarea-wrap">
                    <textarea 
                        className="prompt-textarea"
                        placeholder={lang === 'fr' ? 'Décrivez votre application...' : 'Describe your application...'}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        disabled={isGenerating}
                    />
                    <button 
                        className={`ai-generate-btn ${isGenerating ? 'loading' : ''}`}
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt.trim()}
                    >
                        {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </div>
            </div>

            <div className="suggestions-section">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: 'var(--text-muted)' }}>
                    <Lightbulb size={12} />
                    <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
                        {lang === 'fr' ? 'Suggestions' : 'Suggestions'}
                    </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            className="suggestion-chip"
                            onClick={() => setPrompt(s)}
                            disabled={isGenerating}
                        >
                            <Zap size={10} style={{ marginRight: '4px' }} />
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {isGenerating && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="generating-overlay"
                    >
                         <div className="magic-ring"></div>
                         <div className="generating-text">
                            <Sparkles size={24} className="magic-sparkle" />
                            <span>{lang === 'fr' ? 'Incantation de votre code...' : 'Summoning your code...'}</span>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIStudio;
