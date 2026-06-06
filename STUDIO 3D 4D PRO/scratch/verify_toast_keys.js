const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Count all occurrences of section_toast
const allOccurrences = [];
let idx = 0;
while (true) {
    idx = code.indexOf('section_toast', idx);
    if (idx === -1) break;
    const lineNum = code.substring(0, idx).split('\n').length;
    const lineStart = code.lastIndexOf('\n', idx) + 1;
    const lineText = code.substring(lineStart, code.indexOf('\n', idx)).trim();
    allOccurrences.push({ line: lineNum, text: lineText });
    idx += 'section_toast'.length;
}

console.log(`Total occurrences of section_toast: ${allOccurrences.length}`);
allOccurrences.forEach(o => console.log(`  Line ${o.line}: ${o.text}`));

// Also verify all lang blocks have it:
const langs = ['en', 'fr', 'ro', 'de', 'es', 'it'];
for (const lang of langs) {
    // Find the section for this lang
    const langKey = `\n          ${lang}: {\n`;
    const langStart = code.indexOf(langKey);
    if (langStart === -1) {
        console.log(`\n${lang}: block NOT found!`);
        continue;
    }
    // Find end of this lang block
    const nextLangStart = code.indexOf('\n          },\n', langStart + langKey.length);
    const langBlock = code.substring(langStart, nextLangStart === -1 ? langStart + 2000 : nextLangStart + 20);
    const hasToast = langBlock.includes('section_toast');
    console.log(`\n${lang}: section_toast present = ${hasToast}`);
}
