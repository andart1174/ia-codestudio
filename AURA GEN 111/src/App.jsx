import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Code,
    Eye,
    Box,
    Layout,
    HelpCircle,
    Keyboard,
    Globe,
    Sparkles,
    Download,
    Palette,
    Type,
    Briefcase,
    Component,
    RefreshCw,
    ChevronDown,
    Save,
    FolderOpen,
    Monitor,
    Tablet,
    Smartphone,
    Info,
    Layers,
    Sliders,
    Zap,
    ShieldCheck,
    History,
    Undo2,
    Redo2,
    Database,
    Rocket,
    Wand2,
    BookMarked,
    Package2,
    TerminalSquare,
    Trash2,
    FolderClosed,
    CheckCircle,
    Image as ImageIcon,
    Film,
    Upload
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import StripeModal from './components/StripeModal';
import Editor from './components/Editor';
import Preview from './components/Preview';
import SidebarItem from './components/SidebarItem';
import Modal from './components/Modal';
import TemplateExplorer from './components/TemplateExplorer';
import VisualToolbox from './components/VisualToolbox';
import VisualToolboxPro from './components/VisualToolboxPro';
import TransformerList from './components/TransformerList';
import ThemeList from './components/ThemeList';
import StyleTuner from './components/StyleTuner';
import AIStudio from './components/AIStudio';
import SnapshotManager from './components/SnapshotManager';
import ExplainPanel from './components/ExplainPanel';
import Walkthrough from './components/Walkthrough';
import MockDataManager from './components/MockDataManager';
import MultiExport from './components/MultiExport';
import MicroAI from './components/MicroAI';
import DeployPanel from './components/DeployPanel';
import AppArchitect from './components/AppArchitect';
import AuraLogicNodes from './components/AuraLogicNodes';
import AuraMockDB from './components/AuraMockDB';
import TimeTravelDebugger from './components/TimeTravelDebugger';
import MutationEngine from './components/MutationEngine';
import ColorPaletteAI from './components/ColorPaletteAI';
import SmartTemplates from './components/SmartTemplates';
import ResponsiveComparator from './components/ResponsiveComparator';
import ComponentMarketplace from './components/ComponentMarketplace';
import AnimationBuilder from './components/AnimationBuilder';
import CodeInspector from './components/CodeInspector';
import CodeVaultUI from './components/CodeVaultUI';
import CodeVaultProUI from './components/CodeVaultProUI';
import DependencyManager from './components/DependencyManager';
import FileManager from './components/FileManager';
import AICopilot from './components/AICopilot';
import BackEndManager from './components/BackendManager';
import ProjectManager from './components/ProjectManager';
import MediaManager from './components/MediaManager';
import CommandCenter from './components/CommandCenter';
import HealthDashboard from './components/HealthDashboard';
import AuraOmniAgent from './components/AuraOmniAgent';
import { FIGURES } from './data/figures';
import Universe3DLab from './components/Universe3DLab';
import { transformCode, generateStandaloneHtml } from './utils/TransformationEngine';
import { generateFromPrompt } from './utils/AIEngine';
import { runAudit, autoFixAudit } from './utils/AuditEngine';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const App = () => {
    const { t, i18n } = useTranslation();
    const [openCompartment, setOpenCompartment] = useState('ready');
    const [files, setFiles] = useState([
        { 
            name: 'App.jsx', 
            content: 'const App = () => {\n  return (\n    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif", background: "#ffffff", minHeight: "100vh" }}>\n      <h1 style={{ color: "#6366f1" }}>Hello AuraGen!</h1>\n      <p style={{ color: "#1e293b" }}>Start building your professional app here.</p>\n    </div>\n  );\n};' 
        }
    ]);
    const [activeFileName, setActiveFileName] = useState('App.jsx');
    const [stripeAction, setStripeAction] = useState(null);
    const [showCopilot, setShowCopilot] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [previewWidth, setPreviewWidth] = useState('100%');
    const [showExplainer, setShowExplainer] = useState(false);
    const [showBlueprint, setShowBlueprint] = useState(false);
    const [showWalkthrough, setShowWalkthrough] = useState(!localStorage.getItem('aura_tour_done'));
    const [editorRef, setEditorRef] = useState(null);
    const [audit, setAudit] = useState({ score: 100, issues: [] });
    const [runtimeError, setRuntimeError] = useState(null);
    const [snapshots, setSnapshots] = useState([]);
    const [showComparator, setShowComparator] = useState(false);
    const [dependencies, setDependencies] = useState([]);
    const [consoleLogs, setConsoleLogs] = useState([]);
    const [showConsole, setShowConsole] = useState(false);
    const [showPreview, setShowPreview] = useState(true);
    const [showCommandCenter, setShowCommandCenter] = useState(false);
    
    // Premium Logic
    const [premiumDaysLeft, setPremiumDaysLeft] = useState(null);

    useEffect(() => {
        const checkPremium = () => {
            // 1. Check legacy timestamp
            const subDate = localStorage.getItem('ia_premium_sub_date');
            if (subDate) {
                const daysPassed = Math.floor((Date.now() - parseInt(subDate)) / (1000 * 60 * 60 * 24));
                const left = 30 - daysPassed;
                if (left > 0) {
                    setPremiumDaysLeft(left);
                    return;
                } else {
                    localStorage.removeItem('ia_premium_sub_date');
                }
            }

            // 2. Check Database list (Cloud Sync)
            try {
                const session = JSON.parse(localStorage.getItem('genius_session') || '{}');
                const premiumUsers = JSON.parse(localStorage.getItem('ia_premium_users') || '[]');
                const userEmail = session.email ? session.email.toLowerCase() : '';
                
                const record = premiumUsers.find(u => u.email.toLowerCase() === userEmail);
                if (record) {
                    const expiry = (record.addedAt || 0) + (record.days || 0) * 86400000;
                    if (record.days === 9999 || expiry > Date.now()) {
                        setPremiumDaysLeft(record.days === 9999 ? '∞' : Math.ceil((expiry - Date.now()) / 86400000));
                        return;
                    }
                }
            } catch(e) {}

            setPremiumDaysLeft(null);
        };
        checkPremium();
        window.addEventListener('storage', checkPremium);
        return () => window.removeEventListener('storage', checkPremium);
    }, []);

    const currentCode = useMemo(() => {
        return files.find(f => f.name === activeFileName)?.content || '';
    }, [files, activeFileName]);

    const updateCurrentCode = (newContent) => {
        setFiles(prev => prev.map(f => f.name === activeFileName ? { ...f, content: newContent } : f));
    };

    useEffect(() => {
        setAudit(runAudit(currentCode));
        setRuntimeError(null);
    }, [currentCode]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowCommandCenter(v => !v);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSaveSnapshot = () => {
        const newSnap = {
            id: Date.now(),
            name: i18n.language === 'fr' ? `Version ${snapshots.length + 1}` : `Version ${snapshots.length + 1}`,
            code: currentCode,
            timestamp: new Date()
        };
        setSnapshots([newSnap, ...snapshots]);
    };

    const handleDeleteSnapshot = (id) => {
        setSnapshots(snapshots.filter(s => s.id !== id));
    };

    const handleEditorMount = (editor) => {
        setEditorRef(editor);
    };

    useEffect(() => {
        const handleCopy = (e) => {
            let selectedText = window.getSelection().toString();
            if (editorRef) {
                const selection = editorRef.getSelection();
                if (selection && !selection.isEmpty()) {
                    selectedText = editorRef.getModel().getValueInRange(selection);
                }
            }
            if (!selectedText) {
                selectedText = window.getSelection().toString() || '';
            }
            const lineCount = selectedText.split('\n').length;
            if (lineCount > 10) {
                e.preventDefault();
                e.stopPropagation();
                
                const isFr = i18n && i18n.language && i18n.language.startsWith('fr');
                const warningMsg = isFr
                    ? "/*\n 🔒 AURA SÉCURITÉ 🔒\n La copie massive est désactivée.\n Voulez-vous tout le projet?\n Appuyez sur le bouton 'EXPORT ALL' (qui nécessite un paiement).\n*/"
                    : "/*\n 🔒 AURA SECURITY 🔒\n Mass copying is disabled.\n Want the whole project?\n Press the 'EXPORT ALL' button (which requires payment).\n*/";
                
                if (e.clipboardData) {
                    e.clipboardData.setData('text/plain', warningMsg);
                } else {
                    navigator.clipboard.writeText(warningMsg);
                }
                
                setStripeAction({ name: 'Export All (Copy Protected)', cost: '$2.00', url: 'https://buy.stripe.com/test_...' });
                // alert(isFr ? "Voulez-vous tout le projet? Appuyez sur le bouton 'EXPORT ALL' (qui nécessite un paiement)." : "Want the whole project? Press the 'EXPORT ALL' button (which requires payment).");
            }
        };
        document.addEventListener('copy', handleCopy, true);
        return () => document.removeEventListener('copy', handleCopy, true);
    }, [editorRef, i18n]);

    const handleUndo = () => {
        if (editorRef) editorRef.trigger('keyboard', 'undo', null);
    };

    const handleRedo = () => {
        if (editorRef) editorRef.trigger('keyboard', 'redo', null);
    };

    const handlePreviewClick = (line) => {
        if (editorRef) {
            editorRef.revealLineInCenter(line);
            editorRef.setSelection({
                startLineNumber: line,
                startColumn: 1,
                endLineNumber: line,
                endColumn: 1000
            });
        }
    };

    const handleTemplateSelect = (newCode) => {
        updateCurrentCode(newCode);
    };

    const handleTransform = (type) => {
        const transformed = transformCode(currentCode, type);
        updateCurrentCode(transformed);
    };

    const handleExport = async () => {
        setStripeAction({ name: 'Project Export', cost: '$2.00', url: 'https://buy.stripe.com/test_...', action: async () => {
            const zip = new JSZip();
            
            // Export project with all files
        files.forEach(file => {
            zip.file('src/' + file.name, file.content);
        });

        const packageJson = {
            name: "auragen-pro-export",
            version: "1.0.0",
            description: "Exported from AuraGen IDE",
            dependencies: dependencies.reduce((acc, dep) => {
                acc[dep.name] = dep.version;
                return acc;
            }, {})
        };
        zip.file("package.json", JSON.stringify(packageJson, null, 2));

        const isFr = i18n && i18n.language && i18n.language.startsWith('fr');
        const readmeContent = isFr
            ? "AURA GEN 111 - EXPORTATION DE PROJET\n====================\n\nCe dossier contient le code source brut de votre projet.\n\nMerci d'avoir utilisé notre application."
            : "AURA GEN 111 - PROJECT EXPORT\n====================\n\nThis folder contains the raw source code of your project.\n\nThank you for using our application.";
        zip.file("README.txt", readmeContent);

        const blob = await zip.generateAsync({ type: 'blob' });
            saveAs(blob, `AuraGen_Project_${new Date().getTime()}.zip`);
        }});
    };

    const handleSave = () => {
        localStorage.setItem('aura_gen_save_project', JSON.stringify(files));
    };

    const handleLoad = () => {
        const saved = localStorage.getItem('aura_gen_save_project');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setFiles(parsed);
                    setActiveFileName('App.jsx');
                }
            } catch(e) {}
        }
    };

    const handleCommandAction = (action) => {
        if (action.type === 'figure') {
            const fig = action.fig;
            fetch('./figure_data.json')
                .then(res => res.json())
                .then(data => {
                    let code = data[fig.id];
                    if (code) {
                        const match = code.match(/const ([A-Z][A-Za-z0-9]+)\s*=\s*\(/);
                        const compName = match ? match[1] : null;
                        if (compName && compName !== 'App') {
                            code = code + `\nconst App = ${compName};`;
                        }
                        updateCurrentCode(code);
                    }
                });
        } else if (action.cmd === '/ai') {
            setOpenCompartment('ready');
            setShowCopilot(true);
        } else if (action.cmd === '/fix') {
            handleAutoFix();
        } else if (action.cmd === 'export') {
            handleExport();
        } else if (action.cmd === 'audit') {
            setOpenCompartment('audit');
        } else if (action.cmd === 'templates') {
            setOpenCompartment('sites');
        } else if (action.cmd === '3d') {
            setOpenCompartment('universe3d');
        }
    };

    const handleLoadProject = (newFiles) => {
        setFiles(newFiles);
        const appFile = newFiles.find(f => f.name === 'App.jsx');
        if (appFile) setActiveFileName('App.jsx');
    };

    const handleApplyPalette = (palette) => {
        let newCode = currentCode;
        // Replace common primary colors
        newCode = newCode.replace(/#6366f1|#4f46e5|#3b82f6|#2563eb/g, palette.primary);
        newCode = newCode.replace(/#8b5cf6|#7c3aed/g, palette.secondary);
        newCode = newCode.replace(/color: "#10b981"|color: '#10b981'/g, `color: "${palette.accent}"`);
        updateCurrentCode(newCode);
    };

    const handleInsertSnippet = (dataString) => {
        let snippet = dataString;
        let logic = "";
        try {
            const parsed = JSON.parse(dataString);
            if (parsed.snippet) snippet = parsed.snippet;
            if (parsed.logic) logic = parsed.logic;
        } catch (e) { } 

        let newCode = currentCode;

        if (logic && newCode.includes('return (')) {
            const returnPoint = newCode.indexOf('return (');
            newCode = newCode.slice(0, returnPoint) + '  ' + logic + '\n  ' + newCode.slice(returnPoint);
        }

        if (newCode.includes('</div>')) {
            const insertPoint = newCode.lastIndexOf('</div>');
            newCode = newCode.slice(0, insertPoint) + '  ' + snippet + '\n    ' + newCode.slice(insertPoint);
        } else {
            // Fallback for non-JSX or missing div
            newCode = newCode + '\n\n' + snippet;
        }

        updateCurrentCode(newCode);
    };

    const handleStyleTweak = (property, value) => {
        let newCode = currentCode;
        if (property === 'padding') {
            newCode = currentCode.replace(/padding:\s*['"](\d+)px['"]/g, `padding: "${value}"`);
        } else if (property === 'borderRadius') {
            newCode = currentCode.replace(/borderRadius:\s*['"](\d+)px['"]/g, `borderRadius: "${value}"`);
        } else if (property === 'gap') {
            newCode = currentCode.replace(/gap:\s*['"](\d+)px['"]/g, `gap: "${value}"`);
        } else if (property === 'primary') {
             // Basic replacement of common colors
             newCode = currentCode.replace(/#6366f1/g, value)
                           .replace(/#4f46e5/g, value)
                           .replace(/#60a5fa/g, value);
        } else if (property === 'background') {
             newCode = currentCode.replace(/(<div[^>]*style=\{\{[\s\S]*?background:\s*['"])(#[0-9a-fA-F]+|[^'"]+)(['"])/, `$1${value}$3`);
        } else if (property === 'fontFamily') {
             if (/fontFamily:\s*['"][^'"]+['"]/g.test(newCode)) {
                  newCode = newCode.replace(/fontFamily:\s*['"][^'"]+['"]/g, `fontFamily: "${value}"`);
             } else {
                  newCode = newCode.replace(/<div style={{/g, `<div style={{ fontFamily: "${value}", `);
             }
        }
        updateCurrentCode(newCode);
    };

    const handleAIGenerate = (prompt) => {
        const generatedCode = generateFromPrompt(prompt, i18n.language);
        if (generatedCode) {
            updateCurrentCode(generatedCode);
        }
    };

    const handleAutoFix = () => {
        const fixed = autoFixAudit(currentCode);
        updateCurrentCode(fixed);
    };

    const handleInject3D = (fig, modelCode) => {
        // 1) Extract and rename the component
        const match = modelCode.match(/const ([A-Z][A-Za-z0-9]+)\s*=\s*[\(({]/);
        const origName = match ? match[1] : 'Model3D';
        const embedName = `${origName}Embed`;

        // 2) Clean model code: rename, replace 100vh with a container-friendly 400px, strip trailing App alias
        let componentDef = modelCode
            .replace(`const ${origName}`, `const ${embedName}`)
            .replace(/\bminHeight\s*:\s*['"]100vh['"]/g, "minHeight: '400px'")
            .replace(new RegExp(`\\nconst App\\s*=\\s*${origName};`), '');

        const block = `// -- 3D Embed: ${fig.en} ------------------
// AURA GEN PRO - SECURED BLOCK
// DO NOT COPY
//
//
//
//
//
//
//
//
//
${componentDef}
// ------------------------------------------`;
        const jsxTag = `<${embedName} />`;

        let newCode = currentCode;

        // 4) Convert alias "const App = SomeName;" to a proper JSX wrapper if needed (Auto-fix legacy/load)
        const aliasMatch = newCode.match(/const App\s*=\s*([A-Z][A-Za-z0-9]+)\s*;/);
        if (aliasMatch) {
            const aliasTarget = aliasMatch[1];
            newCode = newCode.replace(
                `const App = ${aliasTarget};`,
                `const App = () => (\n  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh' }}>\n    <${aliasTarget} />\n  </div>\n);`
            );
        }

        // 5) Define the component before "const App"
        const appIdx = newCode.indexOf('const App');
        const defText = block + '\n\n';
        let shift = 0;

        if (appIdx !== -1) {
            newCode = newCode.slice(0, appIdx) + defText + newCode.slice(appIdx);
            shift = defText.length;
        } else {
            newCode = defText + '\n' + newCode;
            shift = defText.length + 1;
        }

        // 6) Insert JSX tag (Cursor-based or Auto-append)
        let injectedWithTag = false;
        if (editorRef) {
            const selection = editorRef.getSelection();
            const model = editorRef.getModel();
            if (selection && !selection.isEmpty()) {
                const cursorOffset = model.getOffsetAt(selection.getStartPosition());
                // Only inject at cursor if cursor is AFTER the place where we injected the definition (i.e., inside or after App)
                // AND we are not at the very top of the file
                const appPosInNewCode = appIdx !== -1 ? appIdx + shift : shift;
                
                if (cursorOffset >= (appIdx !== -1 ? appIdx : 0) && cursorOffset > 0) {
                   const adjustedOffset = cursorOffset + shift;
                   newCode = newCode.slice(0, adjustedOffset) + jsxTag + newCode.slice(adjustedOffset);
                   injectedWithTag = true;
                }
            }
        }

        if (!injectedWithTag) {
            // Fallback: Insert at the end of App's return
            newCode = insertAt3DInApp(newCode, jsxTag);
        }

        updateCurrentCode(newCode);
    };

    // Fallback helper used when there is no marker and no cursor.
    // Inserts jsxTag safely inside App's return by wrapping with React.Fragment.
    // Approach: find "const App", wrap the return statement with <React.Fragment>
    // so multiple children are always valid, then append jsxTag at the end.
    const insertAt3DInApp = (code, jsxTag) => {
        // Find where "const App" lives in the (already-modified) code
        const appStart = code.lastIndexOf('const App');
        if (appStart === -1) return code + '\n' + jsxTag;

        const appSlice = code.slice(appStart);

        // Detect if App's return is already wrapped in Fragment
        const alreadyWrappedFragment = appSlice.includes('<React.Fragment>');
        const alreadyWrappedShorthand = appSlice.includes('<>');

        if (alreadyWrappedFragment) {
            // Just append before </React.Fragment> (the last one in the whole file, which should be App's)
            const fragCloseIdx = code.lastIndexOf('</React.Fragment>');
            if (fragCloseIdx === -1) return code + '\n' + jsxTag;
            return (
                code.slice(0, fragCloseIdx) +
                `    ${jsxTag}\n      ` +
                code.slice(fragCloseIdx)
            );
        }

        if (alreadyWrappedShorthand) {
            // Just append before </>
            const fragCloseIdx = code.lastIndexOf('</>');
            if (fragCloseIdx === -1) return code + '\n' + jsxTag;
            return (
                code.slice(0, fragCloseIdx) +
                `    ${jsxTag}\n      ` +
                code.slice(fragCloseIdx)
            );
        }

        // Not yet wrapped — find the return statement or arrow body
        // 1) Arrow function with shorthand return: App = () => ( <div>...</div> )
        // 2) Functional component: return ( <div>...</div> )
        const retMatch = appSlice.match(/(return\s*\(\s*)|(=>\s*\(\s*)/);
        
        if (retMatch) {
            const matchStr = retMatch[0];
            const matchStartInCode = appStart + retMatch.index;
            const parenOpen = matchStartInCode + matchStr.indexOf('(');
            
            // Find matching closing )
            let depth = 0;
            let parenClose = -1;
            for (let i = parenOpen; i < code.length; i++) {
                if (code[i] === '(') depth++;
                else if (code[i] === ')') {
                    depth--;
                    if (depth === 0) { parenClose = i; break; }
                }
            }
            
            if (parenClose !== -1) {
                const innerJSX = code.slice(parenOpen + 1, parenClose).trim();
                // Wrap in Fragment shorthand to ensure multiple children validity
                const newReturn = `(\n    <>\n      ${innerJSX}\n      ${jsxTag}\n    </>\n  )`;
                return code.slice(0, parenOpen) + newReturn + code.slice(parenClose + 1);
            }
        }

        // If no parentheses found, look for simple return <div>...</div>
        const simpleRetMatch = appSlice.match(/return\s+(<[a-zA-Z0-9_.]+[^>]*>[\s\S]*?<\/[a-zA-Z0-9_.]+>)/);
        if (simpleRetMatch) {
            const innerJSX = simpleRetMatch[1];
            const startIdx = appStart + simpleRetMatch.index;
            const replacedReturn = `return (\n    <>\n      ${innerJSX}\n      ${jsxTag}\n    </>\n  )`;
            return code.slice(0, startIdx) + replacedReturn + code.slice(startIdx + simpleRetMatch[0].length);
        }

        // Last resort: append at the end of the file
        return code + '\n' + jsxTag;
    };

    const handleInjectMockData = (dataCode) => {
        // Inject data const before the component function
        const componentStart = currentCode.indexOf('const App');
        if (componentStart !== -1) {
            updateCurrentCode(dataCode + '\n\n' + currentCode);
        } else {
            updateCurrentCode(dataCode + '\n\n' + currentCode);
        }
    };

    const handleAddFile = (name) => {
        if (!files.some(f => f.name === name)) {
            const isCss = name.endsWith('.css');
            const newFile = {
                name,
                content: isCss ? '/* CSS for ' + name + ' */' : '/* Component ' + name + ' */\nconst ' + name.replace(/\.[^/.]+$/, "") + ' = () => {\n  return <div>' + name + '</div>;\n};'
            };
            setFiles([...files, newFile]);
            setActiveFileName(name);
        }
    };

    const handleRemoveFile = (name) => {
        if (name === 'App.jsx') return;
        const newFiles = files.filter(f => f.name !== name);
        setFiles(newFiles);
        if (activeFileName === name) setActiveFileName('App.jsx');
    };

    const handleInjectBackendFile = (name, content) => {
        if (!files.some(f => f.name === name)) {
            setFiles([...files, { name, content }]);
        } else {
            setFiles(files.map(f => f.name === name ? { ...f, content } : f));
        }
        setActiveFileName(name);

        // Also add dependencies if needed
        const depName = name === 'supabase.js' ? '@supabase/supabase-js' : 'firebase';
        if (!dependencies.some(d => d.name === depName)) {
            setDependencies([...dependencies, { name: depName, version: 'latest' }]);
        }
    };

    const handleInjectMedia = (item) => {
        const snippet = item.snippet;
        let newCode = currentCode;

        // Use the smart injection logic: check cursor first
        let injectedWithTag = false;
        if (editorRef) {
            const selection = editorRef.getSelection();
            const model = editorRef.getModel();
            if (selection && !selection.isEmpty()) {
                const cursorOffset = model.getOffsetAt(selection.getStartPosition());
                // Simple check for "inside a component" by looking for App function index
                const appIdx = newCode.indexOf('const App');
                if (cursorOffset >= (appIdx !== -1 ? appIdx : 0) && cursorOffset > 0) {
                    newCode = newCode.slice(0, cursorOffset) + snippet + newCode.slice(cursorOffset);
                    injectedWithTag = true;
                }
            }
        }

        if (!injectedWithTag) {
            // Fallback: Use our robust insertAt3DInApp (works for any JSX snippet)
            newCode = insertAt3DInApp(newCode, snippet);
        }

        updateCurrentCode(newCode);
    };

    const toggleLanguage = () => {
        const nextLng = i18n.language.startsWith('en') ? 'fr' : 'en';
        i18n.changeLanguage(nextLng);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === 's') e.preventDefault();
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                setShowInstructions(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="app-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-container">
                    <div className="logo-icon">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="logo-text">AuraGen</span>
                </div>

                <nav className="sidebar-nav">
                    <div className="accordion-container">
                        {/* Projects Section */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <button 
                                className={`accordion-header ${openCompartment === 'projects' ? 'active' : ''}`}
                                onClick={() => setOpenCompartment(openCompartment === 'projects' ? null : 'projects')}
                            >
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: openCompartment === 'projects' ? '#f59e0b' : 'rgba(255,255,255,0.05)' }}>
                                        <FolderClosed size={14} />
                                    </div>
                                    <span>{i18n.language === 'fr' ? 'Mes Projets 📂' : 'My Projects 📂'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'projects' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <ProjectManager 
                                                currentFiles={files} 
                                                onLoadProject={handleLoadProject} 
                                                isFr={i18n.language.startsWith('fr')} 
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* IA PRO (OmniAgent) Section */}
                        <div className="accordion-item" style={{ borderBottom: '2px solid rgba(168, 85, 247, 0.2)' }}>
                            <button className={`accordion-header ${openCompartment === 'iapro' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'iapro' ? '' : 'iapro')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)', animation: 'gradMove 3s linear infinite' }}>
                                        <Sparkles size={16} />
                                    </div>
                                    <span style={{ fontWeight: 800, color: '#a855f7', textShadow: '0 0 10px rgba(168,85,247,0.4)' }}>
                                        AURA IA PRO ✨
                                    </span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'iapro' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: '500px' }} exit={{ height: 0 }} className="accordion-body" style={{ overflow: 'hidden' }}>
                                        <div className="accordion-content" style={{ padding: 0, height: '100%' }}>
                                            <AuraOmniAgent onUpdateCode={updateCurrentCode} isFr={i18n.language.startsWith('fr')} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* AI Studio */}
                        <div className="accordion-item" style={{ borderBottom: '2px solid rgba(99, 102, 241, 0.2)' }}>
                            <button className={`accordion-header ${openCompartment === 'ai' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'ai' ? '' : 'ai')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'var(--primary)' }}><Sparkles size={16} /></div>
                                    <span style={{ fontWeight: 800, color: 'var(--primary)' }}>AI STUDIO</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'ai' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <AIStudio onGenerate={handleAIGenerate} lang={i18n.language} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Media Manager Compartment */}
                        <div className="accordion-item" style={{ borderBottom: '2px solid rgba(236, 72, 153, 0.2)' }}>
                            <button className={`accordion-header ${openCompartment === 'media' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'media' ? '' : 'media')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}><ImageIcon size={16} /></div>
                                    <span style={{ fontWeight: 800, color: '#ec4899' }}>
                                        {i18n.language.startsWith('fr') ? 'MÉDIAS 📂' : 'MEDIA 📂'}
                                    </span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'media' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <MediaManager 
                                                onInject={handleInjectMedia} 
                                                isFr={i18n.language.startsWith('fr')} 
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* 3D Universe Lab */}
                        <div className="accordion-item" style={{ borderBottom: '2px solid rgba(99,102,241,.15)' }}>
                            <button className={`accordion-header ${openCompartment === 'universe3d' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'universe3d' ? '' : 'universe3d')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#6366f1,#06b6d4,#a78bfa)', backgroundSize: '200%', animation: 'gradMove 3s linear infinite' }}>🌌</div>
                                    <span style={{ fontWeight: 800, background: 'linear-gradient(90deg,#818cf8,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                        {i18n.language.startsWith('fr') ? 'Univers 3D/4D 🚀' : '3D/4D Universe 🚀'}
                                    </span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'universe3d' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <Universe3DLab
                                                onSelect={updateCurrentCode}
                                                onInject={handleInject3D}
                                                currentCode={currentCode}
                                                editorRef={editorRef}
                                                isFr={i18n.language.startsWith('fr')}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Audit Pro Section */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <button 
                                className={`accordion-header ${openCompartment === 'audit' ? 'active' : ''}`}
                                onClick={() => setOpenCompartment(openCompartment === 'audit' ? null : 'audit')}
                            >
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: openCompartment === 'audit' ? '#6366f1' : 'rgba(255,255,255,0.05)' }}>
                                        <ShieldCheck size={14} />
                                    </div>
                                    <span>{i18n.language === 'fr' ? 'Audit Pro 🚀' : 'Pro Audit 🚀'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'audit' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <HealthDashboard 
                                                audit={audit} 
                                                onAutoFix={handleAutoFix} 
                                                currentCode={currentCode}
                                                isFr={i18n.language.startsWith('fr')} 
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* App Architect 🚀 */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <button 
                                className={`accordion-header ${openCompartment === 'architect' ? 'active' : ''}`} 
                                onClick={() => setOpenCompartment(openCompartment === 'architect' ? null : 'architect')}
                            >
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                                        <Rocket size={16} />
                                    </div>
                                    <span style={{ fontWeight: 800 }}>App Architect 🚀</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'architect' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <AppArchitect 
                                                currentCode={currentCode}
                                                updateCurrentCode={updateCurrentCode}
                                                onSelect={(snippet) => {
                                                    updateCurrentCode(currentCode + "\n\n" + snippet);
                                                }}
                                                isFr={i18n.language.startsWith('fr')}
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Aura Logic Nodes 🧠 */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <button className={`accordion-header ${openCompartment === 'logicnodes' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'logicnodes' ? null : 'logicnodes')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}><Layers size={16} /></div>
                                    <span style={{ fontWeight: 800, color: '#10b981' }}>{i18n.language.startsWith('fr') ? 'Nœuds Logiques 🧠' : 'Logic Nodes 🧠'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'logicnodes' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <AuraLogicNodes onInject={handleInsertSnippet} isFr={i18n.language.startsWith('fr')} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Aura MockDB 🗄️ */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <button className={`accordion-header ${openCompartment === 'mockdb' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'mockdb' ? null : 'mockdb')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg, #3ecf8e, #10b981)' }}><Database size={16} /></div>
                                    <span style={{ fontWeight: 800, color: '#3ecf8e' }}>{i18n.language.startsWith('fr') ? 'MockDB API 🗄️' : 'MockDB API 🗄️'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'mockdb' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <AuraMockDB onInject={handleInsertSnippet} isFr={i18n.language.startsWith('fr')} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Time Travel Debugger ⏳ */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <button className={`accordion-header ${openCompartment === 'timetravel' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'timetravel' ? null : 'timetravel')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}><History size={16} /></div>
                                    <span style={{ fontWeight: 800, color: '#8b5cf6' }}>{i18n.language.startsWith('fr') ? 'Débogueur Temp. ⏳' : 'Time Travel ⏳'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'timetravel' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <TimeTravelDebugger onInject={handleInsertSnippet} isFr={i18n.language.startsWith('fr')} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mutation Engine 🧬 */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <button className={`accordion-header ${openCompartment === 'mutation' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'mutation' ? null : 'mutation')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg, #ec4899, #8b5cf6)' }}><Sparkles size={16} /></div>
                                    <span style={{ fontWeight: 800, color: '#ec4899' }}>{i18n.language.startsWith('fr') ? 'Moteur Mutation 🧬' : 'Mutation Engine 🧬'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'mutation' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <MutationEngine code={currentCode} onUpdate={updateCurrentCode} isFr={i18n.language.startsWith('fr')} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Snapshots History */}
                        <div className="accordion-item" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                            <button className={`accordion-header ${openCompartment === 'history' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'history' ? '' : 'history')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'var(--primary)' }}>
                                        <History size={16} />
                                    </div>
                                    <span style={{ fontWeight: 700 }}>Snapshots</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'history' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <SnapshotManager 
                                                snapshots={snapshots} 
                                                onSave={handleSaveSnapshot} 
                                                onLoad={(c) => updateCurrentCode(c)} 
                                                onDelete={handleDeleteSnapshot} 
                                                lang={i18n.language} 
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        {/* Ready Made */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'ready' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'ready' ? '' : 'ready')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap"><Briefcase size={16} /></div>
                                    <span>{t('readyMade')}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'ready' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content">
                                            <TemplateExplorer type="ready" onSelect={handleTemplateSelect} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Apps */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'apps' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'apps' ? '' : 'apps')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap"><Box size={16} /></div>
                                    <span>{t('apps')}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'apps' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content">
                                            <TemplateExplorer type="apps" onSelect={handleTemplateSelect} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sites */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'sites' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'sites' ? '' : 'sites')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap"><Layout size={16} /></div>
                                    <span>{t('sites')}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'sites' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content">
                                            <TemplateExplorer type="sites" onSelect={handleTemplateSelect} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Style Tuner */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'tuner' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'tuner' ? '' : 'tuner')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap"><Sliders size={16} /></div>
                                    <span>{t('styleTuner') || 'Style Tuner'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'tuner' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <StyleTuner code={currentCode} onTweak={handleStyleTweak} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'tools' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'tools' ? '' : 'tools')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap"><Component size={16} /></div>
                                    <span>{t('tools')}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'tools' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <VisualToolbox onInsert={handleInsertSnippet} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Toolbox Pro */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'toolspro' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'toolspro' ? '' : 'toolspro')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}><Zap size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>Toolbox Pro ⚡</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'toolspro' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <VisualToolboxPro onInsert={handleInsertSnippet} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* AI Color Palette */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'palette' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'palette' ? '' : 'palette')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#ec4899,#8b5cf6)' }}><Palette size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Palette IA 🎨' : 'AI Palette 🎨'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'palette' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <ColorPaletteAI onApply={handleApplyPalette} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Smart Templates */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'smart' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'smart' ? '' : 'smart')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#f59e0b,#ef4444)' }}><Wand2 size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Templates Smart ✨' : 'Smart Templates ✨'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'smart' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <SmartTemplates onInsert={handleInsertSnippet} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Code Vault */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'vault' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'vault' ? '' : 'vault')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)' }}><Package2 size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Code Vault 🧰' : 'Code Vault 🧰'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'vault' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <CodeVaultUI onSelect={handleTemplateSelect} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Code Vault Pro 💎 */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'vault_pro' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'vault_pro' ? '' : 'vault_pro')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' }}><Sparkles size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Code Vault Pro 💎' : 'Code Vault Pro 💎'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'vault_pro' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <CodeVaultProUI onSelect={handleTemplateSelect} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* NPM PackageManager */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'npm' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'npm' ? '' : 'npm')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#ec4899,#f43f5e)' }}><Package2 size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Pachete NPM 📦' : 'NPM Packages 📦'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'npm' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <DependencyManager 
                                                dependencies={dependencies} 
                                                onAdd={dep => setDependencies(d => [...d, dep])} 
                                                onRemove={name => setDependencies(d => d.filter(x => x.name !== name))} 
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Responsive Comparator */}
                        <div className="accordion-item">
                            <button className="accordion-header" onClick={() => setShowComparator(true)}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#0ea5e9,#10b981)' }}><Monitor size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Responsive 3 Écrans 📐' : 'Responsive Compare 📐'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" style={{ transform: 'rotate(-90deg)' }} />
                            </button>
                        </div>

                        {/* Component Marketplace */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'marketplace' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'marketplace' ? '' : 'marketplace')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}><BookMarked size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Ma Bibliothèque 📚' : 'My Library 📚'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'marketplace' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <ComponentMarketplace code={currentCode} onInsert={handleInsertSnippet} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Animation Builder */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'anim' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'anim' ? '' : 'anim')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#10b981,#0ea5e9)' }}><Sparkles size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Animation Builder 🎞️' : 'Animation Builder 🎞️'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'anim' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <AnimationBuilder onInsert={handleInsertSnippet} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Code Inspector */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'inspector' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'inspector' ? '' : 'inspector')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#6366f1,#0ea5e9)' }}><ShieldCheck size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Code Inspector 🔍' : 'Code Inspector 🔍'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'inspector' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <CodeInspector code={currentCode} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Transform */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'transform' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'transform' ? '' : 'transform')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap"><RefreshCw size={16} /></div>
                                    <span>Transform</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'transform' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <TransformerList onTransform={handleTransform} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Mock Data Manager */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'mockdata' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'mockdata' ? '' : 'mockdata')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: '#10b981' }}><Database size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Mock Data' : 'Mock Data'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'mockdata' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <MockDataManager onInjectData={handleInjectMockData} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Multi Export */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'multiexport' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'multiexport' ? '' : 'multiexport')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: '#6366f1' }}><Download size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Export Framework' : 'Framework Export'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'multiexport' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <MultiExport code={currentCode} files={files} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Deploy Panel */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'deploy' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'deploy' ? '' : 'deploy')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap" style={{ background: 'linear-gradient(135deg,#4f46e5,#7c3aed)' }}><Rocket size={16} /></div>
                                    <span style={{ fontWeight: 700 }}>{i18n.language.startsWith('fr') ? 'Publier (Deploy)' : 'Deploy App'}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'deploy' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <DeployPanel files={files} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Themes */}
                        <div className="accordion-item">
                            <button className={`accordion-header ${openCompartment === 'themes' ? 'active' : ''}`} onClick={() => setOpenCompartment(openCompartment === 'themes' ? '' : 'themes')}>
                                <div className="accordion-title-container">
                                    <div className="accordion-icon-wrap"><Palette size={16} /></div>
                                    <span>{t('themes')}</span>
                                </div>
                                <ChevronDown size={16} className="accordion-chevron" />
                            </button>
                            <AnimatePresence>
                                {openCompartment === 'themes' && (
                                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="accordion-body">
                                        <div className="accordion-content" style={{ padding: 0 }}>
                                            <ThemeList onTransform={handleTransform} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </nav>

                <div className="sidebar-footer">
                    <button className="footer-btn" onClick={toggleLanguage}>
                        <Globe size={18} />
                        <span style={{ textTransform: 'uppercase' }}>{i18n.language}</span>
                    </button>
                    <button className="footer-btn" onClick={() => setShowInstructions(true)}>
                        <HelpCircle size={18} />
                        <span>{t('instructions')}</span>
                    </button>
                </div>
            </aside>

            {/* Main Area */}
            <main className="main-content">
                <header className="app-header">
                    <h2 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)' }}>
                        {openCompartment === 'ready' ? t('readyMade') : openCompartment === 'apps' ? t('apps') : openCompartment === 'sites' ? t('sites') : t('tools')}
                    </h2>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div className="header-btn-group" style={{ marginRight: '8px' }}>
                            <button className="secondary-btn" onClick={handleUndo} title={t('undo')} style={{ padding: '8px 12px' }}>
                                <Undo2 size={16} />
                            </button>
                            <button className="secondary-btn" onClick={handleRedo} title={t('redo')} style={{ padding: '8px 12px' }}>
                                <Redo2 size={16} />
                            </button>
                        </div>
                        <div className="header-btn-group">
                            <button className="secondary-btn" onClick={handleAutoFix} title={i18n.language === 'fr' ? 'Polir le code' : 'Polish Code'} style={{ color: 'var(--accent-emerald)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                                <Sparkles size={16} />
                            </button>
                            <button className="secondary-btn" onClick={handleSave} title={t('save')}>
                                <Save size={16} />
                            </button>
                            <button className="secondary-btn" onClick={handleLoad} title={t('load')}>
                                <FolderOpen size={16} />
                            </button>
                        </div>
                        
                        {premiumDaysLeft !== null ? (
                            <button className="premium-btn active-sub" disabled style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', color: '#10b981', fontWeight: 700, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                💎 Premium Active ({premiumDaysLeft} d left)
                            </button>
                        ) : (
                            <button className="premium-btn" onClick={() => setStripeAction({ name: 'Abonnement Premium (1 Mois)', cost: '$30/mo', isSub: true })} style={{ padding: '8px 14px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #f59e0b, #d946ef)', color: '#fff', fontWeight: 800, fontSize: '13px', boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transform: 'scale(1)', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform='scale(1.03)'} onMouseOut={(e) => e.currentTarget.style.transform='scale(1)'}>
                                💎 Become Premium ($30/mo)
                            </button>
                        )}
                        <button className="primary-btn">
                            <Sparkles size={16} />
                            {t('generate')}
                        </button>
                        <button className="secondary-btn" onClick={handleExport} style={{ background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff', border: 'none' }} title="EXPORT ALL">
                            <Download size={16} />
                            EXPORT ALL
                        </button>
                        <button
                            className={`secondary-btn live-preview-btn ${showPreview ? 'live-preview-active' : ''}`}
                            onClick={() => setShowPreview(v => !v)}
                            title={showPreview ? 'Masque le Preview' : 'Affiche le Live Preview'}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 14px',
                                background: showPreview
                                    ? 'linear-gradient(135deg, #10b981, #059669)'
                                    : 'rgba(255,255,255,0.06)',
                                border: showPreview
                                    ? '1px solid #10b981'
                                    : '1px solid rgba(255,255,255,0.12)',
                                color: showPreview ? '#fff' : '#94a3b8',
                                borderRadius: '8px',
                                fontWeight: 700,
                                fontSize: '13px',
                                cursor: 'pointer',
                                transition: 'all 0.25s ease',
                                boxShadow: showPreview ? '0 0 12px rgba(16,185,129,0.35)' : 'none',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <Eye size={15} />
                            Live Preview
                        </button>
                    </div>
                </header>

                <div className="split-pane">
                    {/* Editor Pane */}
                    <div className="pane" style={{ borderRight: showPreview ? '1px solid var(--glass-border)' : 'none', flex: showPreview ? undefined : '1 1 100%' }}>
                        <div className="pane-header">
                            <FileManager 
                                files={files.filter(f => f.name !== 'App.jsx')} 
                                extraFiles={files.filter(f => f.name !== 'App.jsx')}
                                activeTab={activeFileName}
                                onSelectTab={setActiveFileName}
                                onAddFile={handleAddFile}
                                onRemoveFile={handleRemoveFile}
                            />
                            <button 
                                className={`pane-tool-btn ${showCopilot ? 'active' : ''}`} 
                                onClick={() => setShowCopilot(!showCopilot)}
                                title="AI Copilot"
                                style={{ marginLeft: 'auto' }}
                            >
                                <Wand2 size={14} color={showCopilot ? '#6366f1' : '#94a3b8'} />
                            </button>
                            <button 
                                className={`pane-tool-btn ${showExplainer ? 'active' : ''}`} 
                                onClick={() => setShowExplainer(!showExplainer)}
                                title={t('explain')}
                            >
                                <Info size={14} />
                            </button>
                        </div>
                        <div className="editor-layout">
                            <div className="editor-container">
                                <Editor code={currentCode} onChange={updateCurrentCode} onMount={handleEditorMount} />
                            </div>
                            <AnimatePresence>
                                {showExplainer && (
                                    <ExplainPanel code={currentCode} onClose={() => setShowExplainer(false)} />
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {showCopilot && (
                                    <AICopilot 
                                        code={currentCode} 
                                        onApply={updateCurrentCode} 
                                        isFr={i18n.language.startsWith('fr')} 
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Preview Pane */}
                    <div className="pane" style={{ display: showPreview ? undefined : 'none' }}>
                        <div className="pane-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Eye size={14} style={{ color: 'var(--accent-emerald)' }} />
                                <span className="pane-label">{t('preview')}</span>
                            </div>
                            <div className="viewport-toggles">
                                <button className={`view-btn ${previewWidth === '100%' ? 'active' : ''}`} onClick={() => setPreviewWidth('100%')} title={t('desktop')}>
                                    <Monitor size={14} />
                                </button>
                                <button className={`view-btn ${previewWidth === '768px' ? 'active' : ''}`} onClick={() => setPreviewWidth('768px')} title={t('tablet')}>
                                    <Tablet size={14} />
                                </button>
                                <button className={`view-btn ${previewWidth === '375px' ? 'active' : ''}`} onClick={() => setPreviewWidth('375px')} title={t('mobile')}>
                                    <Smartphone size={14} />
                                </button>
                            </div>
                            <button 
                                className={`pane-tool-btn ${showBlueprint ? 'active' : ''}`}
                                onClick={() => setShowBlueprint(!showBlueprint)}
                                title="Blueprint Mode"
                                style={{ marginLeft: '8px' }}
                            >
                                <Layers size={14} />
                            </button>
                            <button 
                                className={`pane-tool-btn ${showConsole ? 'active' : ''}`}
                                onClick={() => setShowConsole(!showConsole)}
                                title="Toggle Console"
                                style={{ marginLeft: '8px' }}
                            >
                                <TerminalSquare size={14} />
                            </button>
                        </div>
                        <div className="preview-scroll-area" style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
                            <div className="preview-container" style={{ 
                                width: previewWidth, 
                                resize: 'horizontal', 
                                overflow: 'hidden', 
                                minWidth: '320px', 
                                maxWidth: '100%', 
                                margin: '0 auto', 
                                borderRight: '2px solid rgba(99, 102, 241, 0.3)',
                                paddingBottom: '10px',
                                flex: 1
                            }}>
                                <Preview 
                                    files={files}
                                    blueprint={showBlueprint} 
                                    dependencies={dependencies}
                                    onPreviewClick={handlePreviewClick} 
                                    onDropSnippet={handleInsertSnippet}
                                    onConsoleLog={log => setConsoleLogs(logs => [...logs, log].slice(-50))}
                                />
                            </div>
                            <MicroAI code={currentCode} onApply={updateCurrentCode} />
                            {showConsole && (
                                <div style={{ height: '30%', borderTop: '2px solid var(--glass-border)', background: '#0f172a', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 12px', background: '#1e293b', borderBottom: '1px solid #334155' }}>
                                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                            <TerminalSquare size={14} /> Console
                                        </div>
                                        <button onClick={() => setConsoleLogs([])} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><Trash2 size={14} /></button>
                                    </div>
                                    <div style={{ flex: 1, overflowY: 'auto', padding: '10px', fontFamily: 'monospace', fontSize: '13px' }}>
                                        {consoleLogs.length === 0 ? (
                                            <div style={{ color: '#64748b', fontStyle: 'italic' }}>No logs yet...</div>
                                        ) : (
                                            consoleLogs.map(log => (
                                                <div key={log.id} style={{ 
                                                    padding: '4px 0', 
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                    color: log.level === 'error' ? '#ef4444' : log.level === 'warn' ? '#f59e0b' : log.level === 'info' ? '#3b82f6' : '#e2e8f0'
                                                }}>
                                                    &gt; {log.args.join(' ')}
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Modals */}
            <AnimatePresence>
                {showInstructions && (
                    <Modal title={t('instructions')} onClose={() => setShowInstructions(false)}>
                        <div style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                            <p>1. {t('instr_1')}</p>
                            <p>2. {t('instr_2')}</p>
                            <p>3. {t('instr_3')}</p>
                            <p>4. {t('instr_4')}</p>
                        </div>
                    </Modal>
                )}
                {showWalkthrough && (
                    <Walkthrough onComplete={() => setShowWalkthrough(false)} />
                )}
                {showComparator && (
                    <ResponsiveComparator
                        code={currentCode}
                        onClose={() => setShowComparator(false)}
                        isFr={i18n.language.startsWith('fr')}
                    />
                )}
                <CommandCenter 
                    isOpen={showCommandCenter} 
                    onClose={() => setShowCommandCenter(false)}
                    onAction={handleCommandAction}
                    figures={FIGURES}
                    isFr={i18n.language.startsWith('fr')}
                />
            </AnimatePresence>
            <div className="aura-bg-overlay" />
            <a href="../../index.html" style={{ position: "fixed", top: "12px", left: "12px", zIndex: 999999, background: "linear-gradient(135deg, #10B981, #059669)", color: "white", padding: "7px 14px", borderRadius: "8px", textDecoration: "none", fontFamily: '"Inter", sans-serif', fontWeight: 700, fontSize: "13px", boxShadow: "0 4px 15px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", gap: "6px" }}>
                ← Back
            </a>
            {stripeAction && (
                <StripeModal
                    isFr={i18n && i18n.language && i18n.language.startsWith('fr')}
                    actionName={stripeAction.name}
                    cost={stripeAction.cost}
                    isSub={stripeAction.isSub}
                    onConfirm={() => {
                        if (stripeAction.action) stripeAction.action();
                        setStripeAction(null);
                    }}
                    onClose={() => setStripeAction(null)}
                />
            )}
        </div>
    );
};

export default App;
