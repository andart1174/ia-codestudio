export const transformCode = (code, type) => {
    let newCode = code;

    switch (type) {
        case 'DARK_MODE':
            // Basic replacement for standard light colors to dark equivalents
            newCode = newCode.replace(/#ffffff/gi, '#0f172a');
            newCode = newCode.replace(/#f8fafc/gi, '#020617');
            newCode = newCode.replace(/#000000/gi, '#f1f5f9');
            newCode = newCode.replace(/#1e293b/gi, '#f1f5f9');
            newCode = newCode.replace(/background: "#fff"/gi, 'background: "#0f172a", color: "#fff"');
            break;

        case 'LIGHT_MODE':
            newCode = newCode.replace(/#0f172a/gi, '#ffffff');
            newCode = newCode.replace(/#020617/gi, '#f8fafc');
            newCode = newCode.replace(/#f1f5f9/gi, '#1e293b');
            newCode = newCode.replace(/background: "#000"/gi, 'background: "#fff", color: "#000"');
            break;

        case 'CLEANUP':
            // Remove comments and extra whitespace
            newCode = newCode.replace(/\/\/.*/g, '');
            newCode = newCode.replace(/\/\*[\s\S]*?\*\//g, '');
            newCode = newCode.replace(/\n\s*\n/g, '\n');
            break;

        case 'MODERNIZE':
            // Example: replace var with const (if any)
            newCode = newCode.replace(/\bvar\b/g, 'const');
            // Add a professional shadow to the main container if it exists
            if (newCode.includes('style={{')) {
                newCode = newCode.replace('style={{', 'style={{ boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",');
            }
            break;

        case 'ADD_GLASS':
            newCode = newCode.replace(/background: "#ffffff"/gi, 'background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.2)"');
            newCode = newCode.replace(/background: "#fff"/gi, 'background: "rgba(255, 255, 255, 0.1)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.2)"');
            newCode = newCode.replace(/background: "#0f172a"/gi, 'background: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.1)"');
            newCode = newCode.replace(/background: "#f8fafc"/gi, 'background: "rgba(248, 250, 252, 0.5)", backdropFilter: "blur(16px)", border: "1px solid rgba(255, 255, 255, 0.3)"');
            break;
            
        case 'THEME_CYBERPUNK':
            newCode = newCode.replace(/#6366f1/gi, '#bc13fe');
            newCode = newCode.replace(/#ffffff/gi, '#0f172a');
            newCode = newCode.replace(/#f8fafc/gi, '#1e293b');
            newCode = newCode.replace(/borderRadius: ".*?"/g, 'borderRadius: "0px"');
            break;

        case 'THEME_MINIMALIST':
            newCode = newCode.replace(/#6366f1/gi, '#000000');
            newCode = newCode.replace(/#bc13fe/gi, '#000000');
            newCode = newCode.replace(/#0ea5e9/gi, '#000000');
            newCode = newCode.replace(/borderRadius: ".*?"/g, 'borderRadius: "2px"');
            newCode = newCode.replace(/boxShadow: ".*?"/g, 'boxShadow: "none"');
            break;

        case 'THEME_NEON':
            newCode = newCode.replace(/#6366f1/gi, '#39ff14');
            newCode = newCode.replace(/#ffffff/gi, '#000000');
            newCode = newCode.replace(/color: "#1e293b"/gi, 'color: "#39ff14"');
            newCode = newCode.replace(/color: "#0f172a"/gi, 'color: "#39ff14"');
            break;

        case 'THEME_OCEAN':
            newCode = newCode.replace(/#6366f1/gi, '#0ea5e9');
            newCode = newCode.replace(/#ffffff/gi, '#f0f9ff');
            break;

        case 'SMART_TEXT_EN':
            newCode = newCode.replace(/Hello AuraGen!/g, 'Experience the Future of Digital Excellence');
            newCode = newCode.replace(/Start building your professional app here./g, 'Unleash your creativity with our high-performance AI engine. Scale your vision instantly.');
            newCode = newCode.replace(/Ready for the future\?/g, 'Elevate Your Enterprise Workflow');
            newCode = newCode.replace(/Looks premium./g, 'Engineered for conversion and speed.');
            break;

        case 'SMART_TEXT_FR':
            newCode = newCode.replace(/Hello AuraGen!/g, 'Découvrez l\'Avenir de l\'Excellence Digitale');
            newCode = newCode.replace(/Start building your professional app here./g, 'Libérez votre créativité avec notre moteur IA haute performance. Donnez vie à votre vision instantanément.');
            newCode = newCode.replace(/Ready for the future\?/g, 'Optimisez vos Flux de Travail d\'Entreprise');
            newCode = newCode.replace(/Looks premium./g, 'Conçu pour la conversion et la rapidité.');
            break;

        case 'HOVER_EFFECTS':
            newCode = newCode.replace(/<button style={{/g, '<button onMouseOver={(e)=>e.target.style.transform="scale(1.05)"} onMouseOut={(e)=>e.target.style.transform="scale(1)"} style={{ transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",');
            break;

        default:
            break;
    }

    return newCode;
};

export const generateStandaloneHtml = (code) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuraGen Exported App</title>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <style>
        body { margin: 0; font-family: 'Inter', sans-serif; background: #f8fafc; }
        #root { min-height: 100vh; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        ${code}

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<App />);
  `.trim();
};

export const injectTrackingAttributes = (code) => {
    return code.split('\n').map((line, i) => {
        // Find JSX opening tags and inject a data-loc attribute
        // Match standard tags and component names, including dot notations like Context.Provider
        return line.replace(/<([a-zA-Z][a-zA-Z0-9_.]*)\b(?![^>]*data-loc)/g, (match, tag) => {
            // Do not inject tracking into Fragments
            if (tag === 'Fragment' || tag === 'React.Fragment') return match;
            return `<${tag} data-loc="${i + 1}"`;
        });
    }).join('\n');
};
