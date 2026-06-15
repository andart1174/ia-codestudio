// fix_overlay_structure.js
// Fixes the structural issues after the conditional guard removal:
// 1) Team and WC overlays are created on every click → add "if not exists" guard
// 2) Navigator section has no sp.navigatorMenuEnabled guard → add it back

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sketch-extruder.js');
let lines = fs.readFileSync(filePath, 'utf8').split('\n');

console.log(`Total lines: ${lines.length}`);

// ─── FIX 1: Guard team overlay creation with "if not already exists" ──────────
// Find: first "const customStyle = document.createElement" after line 13000
// that precedes "#team-section-overlay" CSS
let teamStyleLine = -1;
for (let i = 13000; i < 13200; i++) {
    if (lines[i] && lines[i].includes("const customStyle = document.createElement('style')") &&
        lines[i + 1] && lines[i + 1].includes('innerHTML') &&
        lines[i + 2] && lines[i + 2].includes('#team-section-overlay')) {
        teamStyleLine = i;
        break;
    }
}

if (teamStyleLine === -1) {
    // Try alternate check
    for (let i = 13000; i < 13200; i++) {
        if (lines[i] && lines[i].includes("const customStyle = document.createElement")) {
            // Check if within 30 lines we see team-section-overlay
            for (let j = i; j < Math.min(i + 30, lines.length); j++) {
                if (lines[j] && lines[j].includes('#team-section-overlay {')) {
                    teamStyleLine = i;
                    break;
                }
            }
            if (teamStyleLine !== -1) break;
        }
    }
}

if (teamStyleLine !== -1) {
    console.log(`Found team overlay creation at line ${teamStyleLine + 1}: ${lines[teamStyleLine].trimEnd()}`);
    // Insert guard before it
    const indent = lines[teamStyleLine].match(/^(\s*)/)[1];
    lines.splice(teamStyleLine, 0, `${indent}if (!document.getElementById('team-section-overlay')) {`);
    console.log(`✅ FIX 1a: Inserted team overlay existence guard at line ${teamStyleLine + 1}`);
} else {
    console.log('❌ FIX 1a: Could not find team overlay creation line');
}

// Re-read line numbers (shifted by 1 now)
// Find where the team overlay creation ends (window._showTeamMember function closes)
// The end of team overlay block is where _showTeamMember function closes
let teamBlockEnd = -1;
for (let i = teamStyleLine + 1; i < Math.min(teamStyleLine + 200, lines.length); i++) {
    if (lines[i] && lines[i].includes('window._showTeamMember = function') ) {
        // Find the closing brace of this function
        let depth = 0, started = false;
        for (let j = i; j < i + 100; j++) {
            for (const ch of (lines[j] || '')) {
                if (ch === '{') { depth++; started = true; }
                else if (ch === '}') { depth--; }
            }
            if (started && depth === 0) {
                teamBlockEnd = j;
                break;
            }
        }
        break;
    }
}

if (teamBlockEnd !== -1) {
    console.log(`Found team overlay block end at line ${teamBlockEnd + 1}: ${lines[teamBlockEnd].trimEnd()}`);
    // After window._showTeamMember closes, there's a "};" or similar
    // We need to find the actual end of the team block (closing of the if(!exists) guard we just added)
    // Look for "      }" line just after teamBlockEnd
    let insertPos = teamBlockEnd + 1;
    // Skip empty lines
    while (insertPos < lines.length && lines[insertPos].trim() === '') insertPos++;
    
    const indent = lines[teamStyleLine].match(/^(\s*)/)[1];
    lines.splice(insertPos, 0, `${indent}}`);
    console.log(`✅ FIX 1b: Inserted closing brace for team overlay guard at line ${insertPos + 1}`);
} else {
    console.log('❌ FIX 1b: Could not find team overlay block end');
}

// ─── FIX 2: Guard WC overlay creation with "if not already exists" ───────────
let wcStyleLine = -1;
for (let i = teamStyleLine + 100; i < teamStyleLine + 400; i++) {
    if (lines[i] && lines[i].includes("const customStyle = document.createElement('style')") &&
        lines[i + 1] && lines[i + 1].includes('innerHTML')) {
        // Check nearby for worldclock-section-overlay
        for (let j = i; j < Math.min(i + 30, lines.length); j++) {
            if (lines[j] && lines[j].includes('#worldclock-section-overlay {')) {
                wcStyleLine = i;
                break;
            }
        }
        if (wcStyleLine !== -1) break;
    }
}

if (wcStyleLine === -1) {
    for (let i = teamStyleLine + 100; i < teamStyleLine + 400; i++) {
        if (lines[i] && lines[i].includes("const customStyle = document.createElement")) {
            for (let j = i; j < Math.min(i + 30, lines.length); j++) {
                if (lines[j] && lines[j].includes('worldclock-section-overlay')) {
                    wcStyleLine = i;
                    break;
                }
            }
            if (wcStyleLine !== -1) break;
        }
    }
}

if (wcStyleLine !== -1) {
    console.log(`Found WC overlay creation at line ${wcStyleLine + 1}: ${lines[wcStyleLine].trimEnd()}`);
    const indent = lines[wcStyleLine].match(/^(\s*)/)[1];
    lines.splice(wcStyleLine, 0, `${indent}if (!document.getElementById('worldclock-section-overlay')) {`);
    console.log(`✅ FIX 2a: Inserted WC overlay existence guard at line ${wcStyleLine + 1}`);
} else {
    console.log('❌ FIX 2a: Could not find WC overlay creation line');
}

// Find where _showWorldClock function closes
let wcBlockEnd = -1;
if (wcStyleLine !== -1) {
    for (let i = wcStyleLine + 1; i < Math.min(wcStyleLine + 250, lines.length); i++) {
        if (lines[i] && lines[i].includes('window._showWorldClock = function')) {
            let depth = 0, started = false;
            for (let j = i; j < i + 150; j++) {
                for (const ch of (lines[j] || '')) {
                    if (ch === '{') { depth++; started = true; }
                    else if (ch === '}') { depth--; }
                }
                if (started && depth === 0) {
                    wcBlockEnd = j;
                    break;
                }
            }
            break;
        }
    }
    
    if (wcBlockEnd !== -1) {
        console.log(`Found WC overlay block end at line ${wcBlockEnd + 1}`);
        let insertPos = wcBlockEnd + 1;
        while (insertPos < lines.length && lines[insertPos].trim() === '') insertPos++;
        const indent = lines[wcStyleLine].match(/^(\s*)/)[1];
        lines.splice(insertPos, 0, `${indent}}`);
        console.log(`✅ FIX 2b: Inserted closing brace for WC overlay guard at line ${insertPos + 1}`);
    } else {
        console.log('❌ FIX 2b: Could not find WC overlay block end');
    }
}

// ─── FIX 3: Re-add sp.navigatorMenuEnabled guard around navigator section ─────
// Find the navigator comment "// ── Navigator Menu section (always injected) ──"
let navCommentLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i] && lines[i].includes('Navigator Menu section (always injected)')) {
        navCommentLine = i;
        break;
    }
}

// Alternatively find "const anchorMap = {" that precedes "12: 'home'"
if (navCommentLine === -1) {
    for (let i = 13200; i < 13700; i++) {
        if (lines[i] && lines[i].includes('const anchorMap = {') &&
            lines[i + 1] && lines[i + 1].includes("'home'")) {
            navCommentLine = i - 1; // the line before
            break;
        }
    }
}

if (navCommentLine !== -1) {
    console.log(`Found navigator section at line ${navCommentLine + 1}: ${lines[navCommentLine].trimEnd()}`);
    
    // Find the start of the anchorMap code (first code line of navigator section)
    let navCodeStart = navCommentLine;
    while (navCodeStart < lines.length && !lines[navCodeStart].includes('const anchorMap')) navCodeStart++;
    
    if (navCodeStart < lines.length) {
        const indent = lines[navCodeStart].match(/^(\s*)/)[1];
        // Insert else-if guard before anchorMap
        lines.splice(navCodeStart, 0,
            `${indent}if (sp.navigatorMenuEnabled) {`
        );
        console.log(`✅ FIX 3a: Inserted navigatorMenuEnabled guard at line ${navCodeStart + 1}`);
        
        // Now find the end of the navigator section
        // It ends with the closing braces "}  }  }  }  });"
        // Look for the specific pattern: window.dispatchEvent('clock-menu-click')
        let dispatchLine = -1;
        for (let i = navCodeStart; i < Math.min(navCodeStart + 60, lines.length); i++) {
            if (lines[i] && lines[i].includes("'clock-menu-click'") && lines[i].includes('postMessage')) {
                dispatchLine = i;
                break;
            }
        }
        
        if (dispatchLine !== -1) {
            // After the postMessage line, insert a closing brace for our if(sp.navigatorMenuEnabled)
            lines.splice(dispatchLine + 1, 0, `${indent}}`);
            console.log(`✅ FIX 3b: Inserted closing brace for navigatorMenuEnabled at line ${dispatchLine + 2}`);
        } else {
            // Try another approach: find "window.parent.postMessage" near navigator section
            for (let i = navCodeStart; i < Math.min(navCodeStart + 60, lines.length); i++) {
                if (lines[i] && lines[i].includes('window.parent.postMessage') && 
                    lines[i].includes('clock-menu')) {
                    lines.splice(i + 1, 0, `${indent}}`);
                    console.log(`✅ FIX 3b: Inserted closing brace at line ${i + 2}`);
                    break;
                }
            }
        }
    }
} else {
    console.log('❌ FIX 3: Could not find navigator section');
}

// ─── Write and verify ─────────────────────────────────────────────────────────
const result = lines.join('\n');
fs.writeFileSync(filePath, result, 'utf8');
console.log(`\n📝 Written. New size: ${result.length} bytes, ${lines.length} lines`);

// Quick verification
const checks = [
    { pattern: "if (!document.getElementById('team-section-overlay'))", label: 'Team exists-guard' },
    { pattern: "if (!document.getElementById('worldclock-section-overlay'))", label: 'WC exists-guard' },
    { pattern: "if (sp.navigatorMenuEnabled) {", label: 'Navigator guard (in handler)' },
    { pattern: "// Fallback 2", label: 'Fallback 2 comment (should be ABSENT)' },
];
console.log('\n🔍 Verification:');
for (const { pattern, label } of checks) {
    const found = result.includes(pattern);
    // For fallback 2 we WANT it absent
    if (label.includes('ABSENT')) {
        console.log(`  ${found ? '❌ STILL PRESENT' : '✅ CORRECTLY ABSENT'}: ${label}`);
    } else {
        console.log(`  ${found ? '✅ PRESENT' : '❌ MISSING'}: ${label}`);
    }
}
