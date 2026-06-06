// remove_fallback2_and_clocktobook_guard.js
// Targeted fix for remaining issues in sketch-extruder.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sketch-extruder.js');
const src = fs.readFileSync(filePath, 'utf8');
const lines = src.split('\n');

console.log(`Total lines: ${lines.length}`);

// ─── FIX 1: Remove Fallback 2 block ───────────────────────────────────────────
// Find the line with "// Fallback 2: use screen position"
let fb2Start = -1, fb2End = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('// Fallback 2: use screen position relative to clock center')) {
        fb2Start = i;
        console.log(`Found Fallback 2 at line ${i + 1}: "${lines[i].trimEnd()}"`);
        break;
    }
}

if (fb2Start !== -1) {
    // Find the matching closing brace
    // The block is:  if (hour === null) { ... }
    // We look for "if (hour === null)" after fb2Start
    let ifLine = -1;
    for (let i = fb2Start; i < fb2Start + 3; i++) {
        if (lines[i].includes('if (hour === null)')) {
            ifLine = i;
            break;
        }
    }

    if (ifLine !== -1) {
        // Count braces to find the end
        let depth = 0;
        let started = false;
        for (let i = ifLine; i < lines.length; i++) {
            for (const ch of lines[i]) {
                if (ch === '{') { depth++; started = true; }
                else if (ch === '}') { depth--; }
            }
            if (started && depth === 0) {
                fb2End = i;
                break;
            }
        }
    }
    
    if (fb2End !== -1) {
        console.log(`Fallback 2 spans lines ${fb2Start + 1}–${fb2End + 1}`);
        // Also capture the preceding empty line
        const actualStart = (fb2Start > 0 && lines[fb2Start - 1].trim() === '') ? fb2Start - 1 : fb2Start;
        lines.splice(actualStart, fb2End - actualStart + 1);
        console.log(`✅ FIX 1: Removed Fallback 2 block (${fb2End - actualStart + 1} lines)`);
    } else {
        console.log('❌ FIX 1: Could not find end of Fallback 2 block');
    }
} else {
    console.log('⚠️  FIX 1: Fallback 2 not found (may already be removed)');
}

// ─── FIX 2: Remove "if (sp.clockToBookEnabled) {" guard around _bookOverlay ─
// Find the guard line
let ctbGuardLine = -1;
for (let i = 0; i < lines.length; i++) {
    // We want the one that guards the overlay CREATION (not the click handler check)
    // It should be near the navOverlay code and followed by "const customStyle = document.createElement"
    if (lines[i].includes('if (sp.clockToBookEnabled) {') &&
        i + 1 < lines.length && lines[i + 1].includes('const customStyle = document.createElement')) {
        ctbGuardLine = i;
        console.log(`Found clockToBook guard at line ${i + 1}: "${lines[i].trimEnd()}"`);
        break;
    }
}

if (ctbGuardLine !== -1) {
    // Remove just the guard line
    lines.splice(ctbGuardLine, 1);
    console.log(`✅ FIX 2: Removed clockToBook guard line at ${ctbGuardLine + 1}`);
    
    // Now find the closing brace of this block
    // The block ends with "      }" followed by empty line then next section
    // Let's look for the specific area: find "if (sp.teamMembersEnabled)" or 
    // "// ── Team Members overlay" that follows
    let blockEnd = -1;
    for (let i = ctbGuardLine + 50; i < Math.min(ctbGuardLine + 600, lines.length); i++) {
        const trimmed = lines[i].trimEnd();
        // Look for a lone closing brace at the same indentation level (6 spaces)
        if (/^      }$/.test(trimmed)) {
            // Check what follows
            const nextNonEmpty = lines.slice(i + 1).find(l => l.trim() !== '');
            if (nextNonEmpty && (
                nextNonEmpty.includes('// ── Team Members') ||
                nextNonEmpty.includes('if (sp.teamMembersEnabled)') ||
                nextNonEmpty.includes('// ── World Clock') ||
                nextNonEmpty.includes('// World Clock overlay')
            )) {
                blockEnd = i;
                console.log(`Found clockToBook block end at line ${i + 1}: "${trimmed}"`);
                break;
            }
        }
    }
    
    if (blockEnd !== -1) {
        lines.splice(blockEnd, 1);
        console.log(`✅ FIX 2: Removed clockToBook block closing brace`);
    } else {
        console.log(`⚠️  FIX 2: Could not find clockToBook block closing brace`);
        // Dump the area for diagnostics
        for (let i = ctbGuardLine; i < Math.min(ctbGuardLine + 20, lines.length); i++) {
            console.log(`  ${i + 1}: ${lines[i]}`);
        }
    }
} else {
    console.log('⚠️  FIX 2: clockToBook guard not found (may already be removed)');
}

// ─── Write file ───────────────────────────────────────────────────────────────
const result = lines.join('\n');
fs.writeFileSync(filePath, result, 'utf8');
console.log(`\n📝 Written. New size: ${result.length} bytes`);

// ─── Verify ──────────────────────────────────────────────────────────────────
console.log('\n🔍 Verification:');
const verify = [
    { pattern: '// Fallback 2: use screen position', label: 'Fallback 2 comment' },
    { pattern: 'clockPos.project(camera);', label: 'clockPos.project (screen angle code)' },
];
for (const { pattern, label } of verify) {
    console.log(`  ${result.includes(pattern) ? '❌ STILL PRESENT' : '✅ REMOVED'}: ${label}`);
}
