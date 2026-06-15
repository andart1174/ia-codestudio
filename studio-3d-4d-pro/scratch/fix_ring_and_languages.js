const fs = require('fs');

console.log("=== FIXING RING VISIBILITY AND LANGUAGES ===");

if (fs.existsSync('js/sketch-extruder.js')) {
    let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

    // 1. Fix Ring Geometry scale and Z position to prevent bezel clipping
    const torusOld = `          // Outer glowing ring
          const ringGeo = new THREE.TorusGeometry(37.3, 0.45, 8, 48, arcLength);`;
    const torusNew = `          // Outer glowing ring
          const ringGeo = new THREE.TorusGeometry(38.5, 0.6, 12, 64, arcLength);`;
    
    if (code.includes(torusOld)) {
        code = code.replace(torusOld, torusNew);
        console.log("✔ Updated TorusGeometry radius to 38.5 and tube to 0.6 for outer bezel placement");
    } else {
        console.warn("✘ TorusGeometry old block not found!");
    }

    const posOld = `          bhRingMesh.position.z = 0.55; // just above bezel`;
    const posNew = `          bhRingMesh.position.z = 1.0; // aligned with bezel front`;
    if (code.includes(posOld)) {
        code = code.replace(posOld, posNew);
        console.log("✔ Set bhRingMesh position.z to 1.0 to clear bezel clipping");
    } else {
        console.warn("✘ bhRingMesh position.z old block not found!");
    }

    // 2. Limit languages to ONLY English and French in editor's cu-lang-select dropdown
    const langSelectOld = `               <select id="cu-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">
                   <option value="en">English</option>
                   <option value="fr">Français</option>
                   <option value="ro">Română</option>
                   <option value="de">Deutsch</option>
                   <option value="es">Español</option>
                   <option value="it">Italiano</option>
               </select>`;
    
    const langSelectNew = `               <select id="cu-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">
                   <option value="en">English</option>
                   <option value="fr">Français</option>
               </select>`;

    if (code.includes(langSelectOld)) {
        code = code.replace(langSelectOld, langSelectNew);
        console.log("✔ Limited editor cu-lang-select languages to English and French");
    } else {
        // Let's try matching with different indentations
        const regexLang = /<select id="cu-lang-select"[^>]*>[\s\S]*?<\/select>/;
        const match = code.match(regexLang);
        if (match) {
            code = code.replace(regexLang, `select id="cu-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">\n                   <option value="en">English</option>\n                   <option value="fr">Français</option>\n               </select>`);
            console.log("✔ Limited editor cu-lang-select using regex");
        } else {
            console.warn("✘ Editor cu-lang-select not found!");
        }
    }

    // 3. Limit languages to ONLY English and French in Steampunk's st-lang-select dropdown
    const stLangSelectOld = `<select id="st-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">\n<option value="en">English</option>\n<option value="fr">Français</option>\n<option value="ro">Română</option>\n<option value="de">Deutsch</option>\n<option value="es">Español</option>\n<option value="it">Italiano</option>`;
    
    const stLangSelectNew = `<select id="st-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">\n<option value="en">English</option>\n<option value="fr">Français</option>`;

    if (code.includes(stLangSelectOld)) {
        code = code.replace(stLangSelectOld, stLangSelectNew);
        console.log("✔ Limited st-lang-select languages to English and French");
    } else {
        // Try regex
        const regexSt = /<select id="st-lang-select"[^>]*>[\s\S]*?<\/select>/;
        const matchSt = code.match(regexSt);
        if (matchSt) {
            code = code.replace(regexSt, `<select id="st-lang-select" style="width:100%;background:#070a13;color:#e2e8f0;border:1px solid #1e293b;border-radius:6px;padding:5px;font-size:11px;outline:none;">\n<option value="en">English</option>\n<option value="fr">Français</option>\n</select>`);
            console.log("✔ Limited st-lang-select using regex");
        } else {
            console.warn("✘ st-lang-select not found!");
        }
    }

    fs.writeFileSync('js/sketch-extruder.js', code, 'utf8');
    console.log("✔ SUCCESSFULLY WRITTEN js/sketch-extruder.js");
}

console.log("=== COMPLETED RING VISIBILITY AND LANGUAGES ===");
