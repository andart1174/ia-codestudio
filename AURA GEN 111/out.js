import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  Trash2
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import SidebarItem from "./components/SidebarItem";
import Modal from "./components/Modal";
import TemplateExplorer from "./components/TemplateExplorer";
import VisualToolbox from "./components/VisualToolbox";
import VisualToolboxPro from "./components/VisualToolboxPro";
import TransformerList from "./components/TransformerList";
import ThemeList from "./components/ThemeList";
import StyleTuner from "./components/StyleTuner";
import AIStudio from "./components/AIStudio";
import SnapshotManager from "./components/SnapshotManager";
import ExplainPanel from "./components/ExplainPanel";
import Walkthrough from "./components/Walkthrough";
import MockDataManager from "./components/MockDataManager";
import MultiExport from "./components/MultiExport";
import MicroAI from "./components/MicroAI";
import DeployPanel from "./components/DeployPanel";
import ColorPaletteAI from "./components/ColorPaletteAI";
import SmartTemplates from "./components/SmartTemplates";
import ResponsiveComparator from "./components/ResponsiveComparator";
import ComponentMarketplace from "./components/ComponentMarketplace";
import AnimationBuilder from "./components/AnimationBuilder";
import CodeInspector from "./components/CodeInspector";
import CodeVaultUI from "./components/CodeVaultUI";
import DependencyManager from "./components/DependencyManager";
import { transformCode, generateStandaloneHtml } from "./utils/TransformationEngine";
import { generateFromPrompt } from "./utils/AIEngine";
import { runAudit, autoFixAudit } from "./utils/AuditEngine";
import JSZip from "jszip";
import { saveAs } from "file-saver";
const App = () => {
  const { t, i18n } = useTranslation();
  const [openCompartment, setOpenCompartment] = useState("ready");
  const [code, setCode] = useState('const App = () => {\n  return (\n    <div style={{ padding: "40px", textAlign: "center", fontFamily: "sans-serif", background: "#ffffff", minHeight: "100vh" }}>\n      <h1 style={{ color: "#6366f1" }}>Hello AuraGen!</h1>\n      <p style={{ color: "#1e293b" }}>Start building your professional app here.</p>\n    </div>\n  );\n};');
  const [showInstructions, setShowInstructions] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [previewWidth, setPreviewWidth] = useState("100%");
  const [showExplainer, setShowExplainer] = useState(false);
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [showWalkthrough, setShowWalkthrough] = useState(!localStorage.getItem("aura_tour_done"));
  const [editorRef, setEditorRef] = useState(null);
  const [audit, setAudit] = useState({ score: 100, issues: [] });
  const [runtimeError, setRuntimeError] = useState(null);
  const [snapshots, setSnapshots] = useState([]);
  const [showComparator, setShowComparator] = useState(false);
  const [dependencies, setDependencies] = useState([]);
  const [consoleLogs, setConsoleLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  useEffect(() => {
    setAudit(runAudit(code));
    setRuntimeError(null);
  }, [code]);
  const handleSaveSnapshot = () => {
    const newSnap = {
      id: Date.now(),
      name: i18n.language === "fr" ? `Version ${snapshots.length + 1}` : `Version ${snapshots.length + 1}`,
      code,
      timestamp: /* @__PURE__ */ new Date()
    };
    setSnapshots([newSnap, ...snapshots]);
  };
  const handleDeleteSnapshot = (id) => {
    setSnapshots(snapshots.filter((s) => s.id !== id));
  };
  const handleEditorMount = (editor) => {
    setEditorRef(editor);
  };
  const handleUndo = () => {
    if (editorRef) editorRef.trigger("keyboard", "undo", null);
  };
  const handleRedo = () => {
    if (editorRef) editorRef.trigger("keyboard", "redo", null);
  };
  const handlePreviewClick = (line) => {
    if (editorRef) {
      editorRef.revealLineInCenter(line);
      editorRef.setSelection({
        startLineNumber: line,
        startColumn: 1,
        endLineNumber: line,
        endColumn: 1e3
      });
    }
  };
  const handleTemplateSelect = (newCode) => {
    setCode(newCode);
  };
  const handleTransform = (type) => {
    const transformed = transformCode(code, type);
    setCode(transformed);
  };
  const handleExport = async () => {
    const zip = new JSZip();
    zip.file("src/App.jsx", code);
    const htmlShell = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AuraGen Preview</title>
    <style>body { margin: 0; font-family: sans-serif; }</style>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"><\/script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"><\/script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${code}
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
    <\/script>
</body>
</html>`;
    zip.file("index.html", htmlShell);
    const readme = `AuraGen Project Export

To view your app locally, just double-click 'index.html'.
Your source code is safely stored in 'src/App.jsx'.`;
    zip.file("README.txt", readme);
    const blob = await zip.generateAsync({ type: "blob" });
    saveAs(blob, `AuraGen_Project_${(/* @__PURE__ */ new Date()).getTime()}.zip`);
  };
  const handleSave = () => {
    localStorage.setItem("aura_gen_save", code);
  };
  const handleLoad = () => {
    const saved = localStorage.getItem("aura_gen_save");
    if (saved) setCode(saved);
  };
  const handleApplyPalette = (palette) => {
    let newCode = code;
    newCode = newCode.replace(/#6366f1|#4f46e5|#3b82f6|#2563eb/g, palette.primary);
    newCode = newCode.replace(/#8b5cf6|#7c3aed/g, palette.secondary);
    newCode = newCode.replace(/color: "#10b981"|color: '#10b981'/g, `color: "${palette.accent}"`);
    setCode(newCode);
  };
  const handleInsertSnippet = (dataString) => {
    let snippet = dataString;
    let logic = "";
    try {
      const parsed = JSON.parse(dataString);
      if (parsed.snippet) snippet = parsed.snippet;
      if (parsed.logic) logic = parsed.logic;
    } catch (e) {
    }
    let newCode = code;
    if (logic) {
      const returnPoint = newCode.indexOf("return (");
      if (returnPoint !== -1) {
        newCode = newCode.slice(0, returnPoint) + "  " + logic + "\n  " + newCode.slice(returnPoint);
      }
    }
    const insertPoint = newCode.lastIndexOf("</div>");
    if (insertPoint !== -1) {
      newCode = newCode.slice(0, insertPoint) + "  " + snippet + "\n    " + newCode.slice(insertPoint);
    } else {
      newCode = newCode + "\n\n// " + snippet;
    }
    setCode(newCode);
  };
  const handleStyleTweak = (property, value) => {
    let newCode = code;
    if (property === "padding") {
      newCode = code.replace(/padding:\s*['"](\d+)px['"]/g, `padding: "${value}"`);
    } else if (property === "borderRadius") {
      newCode = code.replace(/borderRadius:\s*['"](\d+)px['"]/g, `borderRadius: "${value}"`);
    } else if (property === "gap") {
      newCode = code.replace(/gap:\s*['"](\d+)px['"]/g, `gap: "${value}"`);
    } else if (property === "primary") {
      newCode = code.replace(/#6366f1/g, value).replace(/#4f46e5/g, value).replace(/#60a5fa/g, value);
    } else if (property === "background") {
      newCode = code.replace(/(<div[^>]*style=\{\{[\s\S]*?background:\s*['"])(#[0-9a-fA-F]+|[^'"]+)(['"])/, `$1${value}$3`);
    } else if (property === "fontFamily") {
      if (/fontFamily:\s*['"][^'"]+['"]/g.test(newCode)) {
        newCode = newCode.replace(/fontFamily:\s*['"][^'"]+['"]/g, `fontFamily: "${value}"`);
      } else {
        newCode = newCode.replace(/<div style={{/g, `<div style={{ fontFamily: "${value}", `);
      }
    }
    setCode(newCode);
  };
  const handleAIGenerate = (prompt) => {
    const generatedCode = generateFromPrompt(prompt, i18n.language);
    if (generatedCode) {
      setCode(generatedCode);
    }
  };
  const handleAutoFix = () => {
    const fixed = autoFixAudit(code);
    setCode(fixed);
  };
  const handleInjectMockData = (dataCode) => {
    const componentStart = code.indexOf("const App");
    if (componentStart !== -1) {
      setCode(dataCode + "\n\n" + code);
    } else {
      setCode(dataCode + "\n\n" + code);
    }
  };
  const toggleLanguage = () => {
    const nextLng = i18n.language.startsWith("en") ? "fr" : "en";
    i18n.changeLanguage(nextLng);
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "s") e.preventDefault();
      if (e.ctrlKey && e.key === "i") {
        e.preventDefault();
        setShowInstructions(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return /* @__PURE__ */ React.createElement("div", { className: "app-container" }, /* @__PURE__ */ React.createElement("aside", { className: "sidebar" }, /* @__PURE__ */ React.createElement("div", { className: "logo-container" }, /* @__PURE__ */ React.createElement("div", { className: "logo-icon" }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-5 h-5 text-white" })), /* @__PURE__ */ React.createElement("span", { className: "logo-text" }, "AuraGen")), /* @__PURE__ */ React.createElement("nav", { className: "sidebar-nav" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-item", style: { borderBottom: "2px solid rgba(99, 102, 241, 0.2)" } }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "ai" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "ai" ? "" : "ai") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "var(--primary)" } }, /* @__PURE__ */ React.createElement(Sparkles, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 800, color: "var(--primary)" } }, "AI STUDIO")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "ai" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(AIStudio, { onGenerate: handleAIGenerate, lang: i18n.language }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item", style: { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" } }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "history" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "history" ? "" : "history") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "var(--primary)" } }, /* @__PURE__ */ React.createElement(History, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, "Snapshots")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "history" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(
    SnapshotManager,
    {
      snapshots,
      onSave: handleSaveSnapshot,
      onLoad: (c) => setCode(c),
      onDelete: handleDeleteSnapshot,
      lang: i18n.language
    }
  ))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "ready" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "ready" ? "" : "ready") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap" }, /* @__PURE__ */ React.createElement(Briefcase, { size: 16 })), /* @__PURE__ */ React.createElement("span", null, t("readyMade"))), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "ready" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content" }, /* @__PURE__ */ React.createElement(TemplateExplorer, { type: "ready", onSelect: handleTemplateSelect }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "apps" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "apps" ? "" : "apps") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap" }, /* @__PURE__ */ React.createElement(Box, { size: 16 })), /* @__PURE__ */ React.createElement("span", null, t("apps"))), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "apps" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content" }, /* @__PURE__ */ React.createElement(TemplateExplorer, { type: "apps", onSelect: handleTemplateSelect }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "sites" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "sites" ? "" : "sites") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap" }, /* @__PURE__ */ React.createElement(Layout, { size: 16 })), /* @__PURE__ */ React.createElement("span", null, t("sites"))), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "sites" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content" }, /* @__PURE__ */ React.createElement(TemplateExplorer, { type: "sites", onSelect: handleTemplateSelect }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "tuner" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "tuner" ? "" : "tuner") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap" }, /* @__PURE__ */ React.createElement(Sliders, { size: 16 })), /* @__PURE__ */ React.createElement("span", null, t("styleTuner") || "Style Tuner")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "tuner" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(StyleTuner, { code, onTweak: handleStyleTweak }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "tools" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "tools" ? "" : "tools") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap" }, /* @__PURE__ */ React.createElement(Component, { size: 16 })), /* @__PURE__ */ React.createElement("span", null, t("tools"))), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "tools" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(VisualToolbox, { onInsert: handleInsertSnippet }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "toolspro" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "toolspro" ? "" : "toolspro") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#6366f1,#8b5cf6)" } }, /* @__PURE__ */ React.createElement(Zap, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, "Toolbox Pro \u26A1")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "toolspro" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(VisualToolboxPro, { onInsert: handleInsertSnippet }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "palette" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "palette" ? "" : "palette") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#ec4899,#8b5cf6)" } }, /* @__PURE__ */ React.createElement(Palette, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Palette IA \u{1F3A8}" : "AI Palette \u{1F3A8}")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "palette" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(ColorPaletteAI, { onApply: handleApplyPalette }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "smart" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "smart" ? "" : "smart") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#f59e0b,#ef4444)" } }, /* @__PURE__ */ React.createElement(Wand2, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Templates Smart \u2728" : "Smart Templates \u2728")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "smart" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(SmartTemplates, { onInsert: handleInsertSnippet }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "vault" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "vault" ? "" : "vault") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#1d4ed8,#7c3aed)" } }, /* @__PURE__ */ React.createElement(Package2, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Code Vault \u{1F9F0}" : "Code Vault \u{1F9F0}")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "vault" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(CodeVaultUI, { onSelect: handleTemplateSelect }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "npm" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "npm" ? "" : "npm") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#ec4899,#f43f5e)" } }, /* @__PURE__ */ React.createElement(Package2, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Pachete NPM \u{1F4E6}" : "NPM Packages \u{1F4E6}")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "npm" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(
    DependencyManager,
    {
      dependencies,
      onAdd: (dep) => setDependencies((d) => [...d, dep]),
      onRemove: (name) => setDependencies((d) => d.filter((x) => x.name !== name))
    }
  ))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: "accordion-header", onClick: () => setShowComparator(true) }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#0ea5e9,#10b981)" } }, /* @__PURE__ */ React.createElement(Monitor, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Responsive 3 \xC9crans \u{1F4D0}" : "Responsive Compare \u{1F4D0}")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron", style: { transform: "rotate(-90deg)" } }))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "marketplace" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "marketplace" ? "" : "marketplace") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#f59e0b,#d97706)" } }, /* @__PURE__ */ React.createElement(BookMarked, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Ma Biblioth\xE8que \u{1F4DA}" : "My Library \u{1F4DA}")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "marketplace" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(ComponentMarketplace, { code, onInsert: handleInsertSnippet }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "anim" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "anim" ? "" : "anim") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#10b981,#0ea5e9)" } }, /* @__PURE__ */ React.createElement(Sparkles, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Animation Builder \u{1F39E}\uFE0F" : "Animation Builder \u{1F39E}\uFE0F")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "anim" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(AnimationBuilder, { onInsert: handleInsertSnippet }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "inspector" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "inspector" ? "" : "inspector") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#6366f1,#0ea5e9)" } }, /* @__PURE__ */ React.createElement(ShieldCheck, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Code Inspector \u{1F50D}" : "Code Inspector \u{1F50D}")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "inspector" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(CodeInspector, { code }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "transform" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "transform" ? "" : "transform") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap" }, /* @__PURE__ */ React.createElement(RefreshCw, { size: 16 })), /* @__PURE__ */ React.createElement("span", null, "Transform")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "transform" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(TransformerList, { onTransform: handleTransform }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "mockdata" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "mockdata" ? "" : "mockdata") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "#10b981" } }, /* @__PURE__ */ React.createElement(Database, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Mock Data" : "Mock Data")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "mockdata" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(MockDataManager, { onInjectData: handleInjectMockData }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "multiexport" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "multiexport" ? "" : "multiexport") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "#6366f1" } }, /* @__PURE__ */ React.createElement(Download, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Export Framework" : "Framework Export")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "multiexport" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(MultiExport, { code }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "deploy" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "deploy" ? "" : "deploy") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap", style: { background: "linear-gradient(135deg,#4f46e5,#7c3aed)" } }, /* @__PURE__ */ React.createElement(Rocket, { size: 16 })), /* @__PURE__ */ React.createElement("span", { style: { fontWeight: 700 } }, i18n.language.startsWith("fr") ? "Publier (Deploy)" : "Deploy App")), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "deploy" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(DeployPanel, { code }))))), /* @__PURE__ */ React.createElement("div", { className: "accordion-item" }, /* @__PURE__ */ React.createElement("button", { className: `accordion-header ${openCompartment === "themes" ? "active" : ""}`, onClick: () => setOpenCompartment(openCompartment === "themes" ? "" : "themes") }, /* @__PURE__ */ React.createElement("div", { className: "accordion-title-container" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-icon-wrap" }, /* @__PURE__ */ React.createElement(Palette, { size: 16 })), /* @__PURE__ */ React.createElement("span", null, t("themes"))), /* @__PURE__ */ React.createElement(ChevronDown, { size: 16, className: "accordion-chevron" })), /* @__PURE__ */ React.createElement(AnimatePresence, null, openCompartment === "themes" && /* @__PURE__ */ React.createElement(motion.div, { initial: { height: 0 }, animate: { height: "auto" }, exit: { height: 0 }, className: "accordion-body" }, /* @__PURE__ */ React.createElement("div", { className: "accordion-content", style: { padding: 0 } }, /* @__PURE__ */ React.createElement(ThemeList, { onTransform: handleTransform }))))))), /* @__PURE__ */ React.createElement("div", { className: "sidebar-footer" }, /* @__PURE__ */ React.createElement("button", { className: "footer-btn", onClick: toggleLanguage }, /* @__PURE__ */ React.createElement(Globe, { size: 18 }), /* @__PURE__ */ React.createElement("span", { style: { textTransform: "uppercase" } }, i18n.language)), /* @__PURE__ */ React.createElement("button", { className: "footer-btn", onClick: () => setShowInstructions(true) }, /* @__PURE__ */ React.createElement(HelpCircle, { size: 18 }), /* @__PURE__ */ React.createElement("span", null, t("instructions"))))), /* @__PURE__ */ React.createElement("main", { className: "main-content" }, /* @__PURE__ */ React.createElement("header", { className: "app-header" }, /* @__PURE__ */ React.createElement("h2", { style: { fontSize: "14px", fontWeight: 600, color: "var(--text-muted)" } }, openCompartment === "ready" ? t("readyMade") : openCompartment === "apps" ? t("apps") : openCompartment === "sites" ? t("sites") : t("tools")), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "12px", alignItems: "center" } }, /* @__PURE__ */ React.createElement("div", { className: "header-btn-group", style: { marginRight: "8px" } }, /* @__PURE__ */ React.createElement("button", { className: "secondary-btn", onClick: handleUndo, title: t("undo"), style: { padding: "8px 12px" } }, /* @__PURE__ */ React.createElement(Undo2, { size: 16 })), /* @__PURE__ */ React.createElement("button", { className: "secondary-btn", onClick: handleRedo, title: t("redo"), style: { padding: "8px 12px" } }, /* @__PURE__ */ React.createElement(Redo2, { size: 16 }))), /* @__PURE__ */ React.createElement("div", { className: "header-btn-group" }, /* @__PURE__ */ React.createElement("button", { className: "secondary-btn", onClick: handleAutoFix, title: i18n.language === "fr" ? "Polir le code" : "Polish Code", style: { color: "var(--accent-emerald)", border: "1px solid rgba(16, 185, 129, 0.3)" } }, /* @__PURE__ */ React.createElement(Sparkles, { size: 16 })), /* @__PURE__ */ React.createElement("button", { className: "secondary-btn", onClick: handleSave, title: t("save") }, /* @__PURE__ */ React.createElement(Save, { size: 16 })), /* @__PURE__ */ React.createElement("button", { className: "secondary-btn", onClick: handleLoad, title: t("load") }, /* @__PURE__ */ React.createElement(FolderOpen, { size: 16 }))), /* @__PURE__ */ React.createElement("button", { className: "primary-btn" }, /* @__PURE__ */ React.createElement(Sparkles, { size: 16 }), t("generate")), /* @__PURE__ */ React.createElement("button", { className: "secondary-btn", onClick: handleExport, title: t("advancedExport") || t("export") }, /* @__PURE__ */ React.createElement(Download, { size: 16 }), t("export")))), /* @__PURE__ */ React.createElement("div", { className: "split-pane" }, /* @__PURE__ */ React.createElement("div", { className: "pane", style: { borderRight: "1px solid var(--glass-border)" } }, /* @__PURE__ */ React.createElement("div", { className: "pane-header" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React.createElement(Code, { size: 14, style: { color: "var(--primary)" } }), /* @__PURE__ */ React.createElement("span", { className: "pane-label" }, t("code"))), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: `pane-tool-btn ${showExplainer ? "active" : ""}`,
      onClick: () => setShowExplainer(!showExplainer),
      title: t("explain")
    },
    /* @__PURE__ */ React.createElement(Info, { size: 14 })
  )), /* @__PURE__ */ React.createElement("div", { className: "editor-layout" }, /* @__PURE__ */ React.createElement("div", { className: "editor-container" }, /* @__PURE__ */ React.createElement(Editor, { code, onChange: setCode, onMount: handleEditorMount })), /* @__PURE__ */ React.createElement(AnimatePresence, null, showExplainer && /* @__PURE__ */ React.createElement(ExplainPanel, { code, onClose: () => setShowExplainer(false) })))), /* @__PURE__ */ React.createElement("div", { className: "pane" }, /* @__PURE__ */ React.createElement("div", { className: "pane-header" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px" } }, /* @__PURE__ */ React.createElement(Eye, { size: 14, style: { color: "var(--accent-emerald)" } }), /* @__PURE__ */ React.createElement("span", { className: "pane-label" }, t("preview"))), /* @__PURE__ */ React.createElement("div", { className: "viewport-toggles" }, /* @__PURE__ */ React.createElement("button", { className: `view-btn ${previewWidth === "100%" ? "active" : ""}`, onClick: () => setPreviewWidth("100%"), title: t("desktop") }, /* @__PURE__ */ React.createElement(Monitor, { size: 14 })), /* @__PURE__ */ React.createElement("button", { className: `view-btn ${previewWidth === "768px" ? "active" : ""}`, onClick: () => setPreviewWidth("768px"), title: t("tablet") }, /* @__PURE__ */ React.createElement(Tablet, { size: 14 })), /* @__PURE__ */ React.createElement("button", { className: `view-btn ${previewWidth === "375px" ? "active" : ""}`, onClick: () => setPreviewWidth("375px"), title: t("mobile") }, /* @__PURE__ */ React.createElement(Smartphone, { size: 14 }))), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: `pane-tool-btn ${showBlueprint ? "active" : ""}`,
      onClick: () => setShowBlueprint(!showBlueprint),
      title: "Blueprint Mode",
      style: { marginLeft: "8px" }
    },
    /* @__PURE__ */ React.createElement(Layers, { size: 14 })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      className: `pane-tool-btn ${showConsole ? "active" : ""}`,
      onClick: () => setShowConsole(!showConsole),
      title: "Toggle Console",
      style: { marginLeft: "8px" }
    },
    /* @__PURE__ */ React.createElement(TerminalSquare, { size: 14 })
  )), /* @__PURE__ */ React.createElement("div", { className: "preview-scroll-area", style: { position: "relative", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { className: "preview-container", style: {
    width: previewWidth,
    resize: "horizontal",
    overflow: "hidden",
    minWidth: "320px",
    maxWidth: "100%",
    margin: "0 auto",
    borderRight: "2px solid rgba(99, 102, 241, 0.3)",
    paddingBottom: "10px",
    flex: 1
  } }, /* @__PURE__ */ React.createElement(
    Preview,
    {
      code,
      blueprint: showBlueprint,
      dependencies,
      onPreviewClick: handlePreviewClick,
      onDropSnippet: handleInsertSnippet,
      onConsoleLog: (log) => setConsoleLogs((logs) => [...logs, log].slice(-50))
    }
  )), /* @__PURE__ */ React.createElement(MicroAI, { code, onApply: setCode }), showConsole && /* @__PURE__ */ React.createElement("div", { style: { height: "30%", borderTop: "2px solid var(--glass-border)", background: "#0f172a", display: "flex", flexDirection: "column" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "6px 12px", background: "#1e293b", borderBottom: "1px solid #334155" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: "12px", fontWeight: 700, color: "#f8fafc", display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React.createElement(TerminalSquare, { size: 14 }), " Console"), /* @__PURE__ */ React.createElement("button", { onClick: () => setConsoleLogs([]), style: { background: "none", border: "none", color: "#94a3b8", cursor: "pointer" } }, /* @__PURE__ */ React.createElement(Trash2, { size: 14 }))), /* @__PURE__ */ React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "10px", fontFamily: "monospace", fontSize: "13px" } }, consoleLogs.length === 0 ? /* @__PURE__ */ React.createElement("div", { style: { color: "#64748b", fontStyle: "italic" } }, "No logs yet...") : consoleLogs.map((log) => /* @__PURE__ */ React.createElement("div", { key: log.id, style: {
    padding: "4px 0",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    color: log.level === "error" ? "#ef4444" : log.level === "warn" ? "#f59e0b" : log.level === "info" ? "#3b82f6" : "#e2e8f0"
  } }, "> ", log.args.join(" "))))))))), /* @__PURE__ */ React.createElement(AnimatePresence, null, showInstructions && /* @__PURE__ */ React.createElement(Modal, { title: t("instructions"), onClose: () => setShowInstructions(false) }, /* @__PURE__ */ React.createElement("div", { style: { color: "var(--text-muted)", lineHeight: "1.8" } }, /* @__PURE__ */ React.createElement("p", null, "1. ", t("instr_1")), /* @__PURE__ */ React.createElement("p", null, "2. ", t("instr_2")), /* @__PURE__ */ React.createElement("p", null, "3. ", t("instr_3")), /* @__PURE__ */ React.createElement("p", null, "4. ", t("instr_4")))), showWalkthrough && /* @__PURE__ */ React.createElement(Walkthrough, { onComplete: () => setShowWalkthrough(false) }), showComparator && /* @__PURE__ */ React.createElement(
    ResponsiveComparator,
    {
      code,
      onClose: () => setShowComparator(false),
      isFr: i18n.language.startsWith("fr")
    }
  )));
};
export default App;
