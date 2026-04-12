import { appTemplates, siteTemplates, readyMadeTemplates } from '../data/templates';
import { modules } from '../data/modules';

export const generateFromPrompt = (prompt, currentLang = 'en') => {
    const p = prompt.toLowerCase();
    
    // Normalize language (handle en-US, fr-FR etc)
    let lang = currentLang.split('-')[0]; 
    if (p.match(/(français|french|fr\b)/i)) lang = 'fr';
    if (p.match(/(english|anglais|en\b)/i)) lang = 'en';

    // 1. Check for specific template IDs first (Backward Compatibility)
    if (p.includes('nexus')) return findTemplateById('project-nexus');
    if (p.includes('vitality')) return findTemplateById('vitality-hub');
    if (p.includes('crypto')) return findTemplateById('crypto-tracker');

    // 2. Intelligent Composition Logic
    // Extract Brand Name
    let brandName = "AuraGen";
    const brandMatch = prompt.match(/\b([A-Z][a-zA-Z0-9]+)\b/);
    if (brandMatch && !['AI', 'STUDIO', 'AURA', 'APP', 'THE', 'AND'].includes(brandMatch[1].toUpperCase())) {
        brandName = brandMatch[1];
    }

    // Extract Industry
    let industry = lang === 'fr' ? 'votre secteur' : 'your industry';
    if (p.includes('tech')) industry = lang === 'fr' ? 'technologique' : 'tech';
    if (p.includes('health') || p.includes('santé')) industry = lang === 'fr' ? 'santé' : 'health';
    if (p.includes('photo')) industry = lang === 'fr' ? 'photographie' : 'photography';
    if (p.includes('market')) industry = 'marketing';

    // Determine Hero Type
    let selectedHero = modules.heroes.saas[lang];
    if (p.includes('login') || p.includes('auth') || p.includes('connexion') || p.includes('sign in')) {
        selectedHero = modules.heroes.auth[lang];
    } else if (p.includes('portfolio') || p.includes('resume') || p.includes('perso')) {
        selectedHero = modules.heroes.portfolio[lang];
    }

    // Build the App string
    let sections = [];
    sections.push(modules.headers.minimal[lang]);
    sections.push(selectedHero);
    
    if (p.includes('price') || p.includes('tarif') || p.includes('cost')) {
        sections.push(modules.pricing.modern[lang]);
    }
    
    // Feature grid only if not a login page
    if (!p.includes('login') && !p.includes('connexion')) {
        sections.push(modules.features.grid[lang]);
    }
    
    sections.push(modules.footers.minimal[lang]);

    // Concatenate and Inject Variables
    let fullCode = `const App = () => {
  return (
    <div style={{ background: "#020617", color: "#f8fafc", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      ${sections.join('\n      ')}
    </div>
  );
};`;

    fullCode = fullCode.replace(/{{BRAND_NAME}}/g, brandName);
    fullCode = fullCode.replace(/{{INDUSTRY}}/g, industry);

    return fullCode;
};

const findTemplateById = (id) => {
    const all = [...appTemplates, ...siteTemplates, ...readyMadeTemplates];
    const found = all.find(t => t.id === id);
    return found ? found.code : null;
};

export const getAIsuggestions = (lang) => {
    if (lang === 'fr') {
        return [
            "Créer un formulaire de connexion moderne",
            "Dashboard pour application crypto",
            "Page de destination SaaS premium",
            "Portofolio pour photographe"
        ];
    }
    return [
        "Create a modern login form",
        "Crypto dashboard application",
        "Premium SaaS landing page",
        "Photography portfolio"
    ];
};
