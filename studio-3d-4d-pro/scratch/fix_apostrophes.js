const fs = require('fs');

const filePath = 'js/sketch-extruder.js';
let code = fs.readFileSync(filePath, 'utf8');

// List of target replacements for apostrophes
const replacements = [
    { target: "l'orologio", replacement: "l\\'orologio" },
    { target: "dell'orologio", replacement: "dell\\'orologio" },
    { target: "d'ondes", replacement: "d\\'ondes" },
    { target: "d'accueil", replacement: "d\\'accueil" },
    { target: "l'intégration", replacement: "l\\'intégration" },
    { target: "L'intégration", replacement: "L\\'intégration" },
    { target: "d'un CDN", replacement: "d\\'un CDN" },
    { target: "d'impulsion", replacement: "d\\'impulsion" },
    { target: "all'avanguardia", replacement: "all\\'avanguardia" },
    { target: "dell'orologio", replacement: "dell\\'orologio" },
    { target: "l'horloge", replacement: "l\\'horloge" }
];

let count = 0;
replacements.forEach(r => {
    // We want to be careful with double backslashes in search and replacement.
    // If the file currently has the target (e.g. l'orologio), we replace it.
    let idx = 0;
    while (true) {
        idx = code.indexOf(r.target, idx);
        if (idx === -1) break;
        // Check if it is already escaped: i.e. code[idx - 1] === '\\'
        if (code[idx - 1] !== '\\') {
            // Replace it!
            const before = code.substring(0, idx);
            const after = code.substring(idx + r.target.length);
            code = before + r.replacement + after;
            console.log(`Replaced unescaped "${r.target}" at index ${idx}`);
            count++;
        }
        idx += r.replacement.length;
    }
});

if (count > 0) {
    fs.writeFileSync(filePath, code, 'utf8');
    console.log(`Successfully fixed ${count} unescaped apostrophes!`);
} else {
    console.log("No unescaped apostrophes found!");
}
