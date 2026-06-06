const fs = require('fs');
const path = 'js/sketch-extruder.js';
let code = fs.readFileSync(path, 'utf8');

// Replace the buggy pattern that uses cuLangSelect (out-of-scope variable)
// with a safe DOM-based lookup
const old = `(typeof cuLangSelect !== 'undefined' && cuLangSelect && cuLangSelect.value) || lang`;
const rep = `(document.getElementById('cu-lang-select') && document.getElementById('cu-lang-select').value) || (window.currentLang) || lang`;

let count = 0;
while (code.includes(old)) {
    code = code.replace(old, rep);
    count++;
}

// Also fix the 'en' fallback variants
const oldEn = `(typeof cuLangSelect !== 'undefined' && cuLangSelect && cuLangSelect.value) || 'en'`;
const repEn = `(document.getElementById('cu-lang-select') && document.getElementById('cu-lang-select').value) || (window.currentLang) || 'en'`;
while (code.includes(oldEn)) {
    code = code.replace(oldEn, repEn);
    count++;
}

fs.writeFileSync(path, code);
console.log('Fixed', count, 'occurrences of cuLangSelect scope bug');
