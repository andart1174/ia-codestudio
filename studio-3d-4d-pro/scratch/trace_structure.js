// trace_structure.js
// Traces brace depth around the pointerup handler and overlay creation to understand structure
const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'sketch-extruder.js'), 'utf8');
const lines = src.split('\n');

// Find the pointerup addEventListener line
let puLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes("window.addEventListener('pointerup'")) {
        // make sure it's inside the exportScene context (after line 12000)
        if (i > 12000) {
            puLine = i;
            break;
        }
    }
}
console.log(`pointerup handler starts at line ${puLine + 1}`);
console.log(`  content: ${lines[puLine].trimEnd()}`);

// Now trace brace depth from pointerup to find where it closes
let depth = 0;
let started = false;
let closingLine = -1;
for (let i = puLine; i < Math.min(puLine + 1000, lines.length); i++) {
    for (const ch of lines[i]) {
        if (ch === '{') { depth++; started = true; }
        else if (ch === '}') { depth--; }
    }
    if (started && depth === 0) {
        closingLine = i;
        console.log(`pointerup handler closes at line ${i + 1}`);
        console.log(`  content: ${lines[i].trimEnd()}`);
        break;
    }
}

// Check what's between: find key landmarks
const teamOverlayLine = lines.findIndex((l, i) => i > puLine && l.includes("_teamOverlay.id = 'team-section-overlay'"));
const wcOverlayLine = lines.findIndex((l, i) => i > puLine && l.includes("_wcOverlay.id = 'worldclock-section-overlay'"));
const customStyleTeamLine = lines.findIndex((l, i) => i > 12900 && i < 13500 && l.includes("const customStyle = document.createElement('style')"));

console.log(`\nteamOverlay.id line: ${teamOverlayLine + 1}`);
console.log(`wcOverlay.id line: ${wcOverlayLine + 1}`);
console.log(`1st customStyle after line 12900: ${customStyleTeamLine + 1}`);

// Print context around team overlay creation to see what depth it's at
if (teamOverlayLine !== -1) {
    console.log('\n--- Context around team overlay creation ---');
    for (let i = Math.max(puLine, teamOverlayLine - 20); i <= Math.min(teamOverlayLine + 5, lines.length - 1); i++) {
        // Track brace depth
        let d = 0;
        for (let j = puLine; j <= i; j++) {
            for (const ch of lines[j]) {
                if (ch === '{') d++;
                else if (ch === '}') d--;
            }
        }
        const marker = (i === teamOverlayLine) ? '<<<' : '   ';
        console.log(`${marker} L${i+1} [depth=${d}]: ${lines[i].trimEnd().substring(0, 120)}`);
    }
}
