// fix_team_world_export.js
// Fixes two bugs in sketch-extruder.js:
// 1) Removes the "Fallback 2" screen-angle click handler so empty-canvas clicks don't open modals
// 2) Removes if(sp.teamMembersEnabled) and if(sp.worldClockEnabled) guards around overlay creation
//    so modals are ALWAYS created in the exported HTML, regardless of export-time settings

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sketch-extruder.js');
let src = fs.readFileSync(filePath, 'utf8');
const originalLen = src.length;

// ─────────────────────────────────────────────────────────────
// FIX 1: Remove Fallback 2 (screen-angle click) block
// The block starts with "// Fallback 2: use screen position relative to clock center"
// and ends after "if (hour === 0) hour = 12;\n                   }"
// We want to remove ONLY the fallback 2 section so that `hour` stays null when no mesh is hit.
// ─────────────────────────────────────────────────────────────

const fallback2Start = `\r\n                   // Fallback 2: use screen position relative to clock center\r\n                   if (hour === null) {\r\n                       // Project clock center to screen and compute angle from click\r\n                       const clockPos = new THREE.Vector3();\r\n                       if (hasClockUltra.runtimeGroup) hasClockUltra.runtimeGroup.getWorldPosition(clockPos);\r\n                       clockPos.project(camera);\r\n                       const screenCX = (clockPos.x + 1) / 2 * rect.width + rect.left;\r\n                       const screenCY = (-clockPos.y + 1) / 2 * rect.height + rect.top;\r\n                       const dx = e.clientX - screenCX;\r\n                       const dy = e.clientY - screenCY;\r\n                       const angle = Math.atan2(dx, -dy); // top = 12 o'clock\r\n                       let deg = angle * (180 / Math.PI);\r\n                       if (deg < 0) deg += 360;\r\n                       hour = Math.round(deg / 30);\r\n                       if (hour === 0) hour = 12;\r\n                   }`;

if (src.includes(fallback2Start)) {
    src = src.replace(fallback2Start, '');
    console.log('✅ FIX 1: Removed Fallback 2 (screen-angle click handler)');
} else {
    // Try with LF only
    const fallback2StartLF = fallback2Start.replace(/\r\n/g, '\n');
    if (src.includes(fallback2StartLF)) {
        src = src.replace(fallback2StartLF, '');
        console.log('✅ FIX 1: Removed Fallback 2 (LF variant)');
    } else {
        console.log('⚠️  FIX 1: Could not find Fallback 2 block - checking line by line...');
        const idx = src.indexOf('// Fallback 2: use screen position relative to clock center');
        if (idx !== -1) {
            // Find from here to the closing brace
            const endMarker = 'if (hour === 0) hour = 12;\n                   }';
            const endIdx = src.indexOf(endMarker, idx);
            if (endIdx !== -1) {
                src = src.slice(0, idx - 20) + src.slice(endIdx + endMarker.length);
                console.log('✅ FIX 1: Removed Fallback 2 (manual slice)');
            } else {
                const endMarkerCRLF = 'if (hour === 0) hour = 12;\r\n                   }';
                const endIdxCRLF = src.indexOf(endMarkerCRLF, idx);
                if (endIdxCRLF !== -1) {
                    src = src.slice(0, idx - 20) + src.slice(endIdxCRLF + endMarkerCRLF.length);
                    console.log('✅ FIX 1: Removed Fallback 2 (manual CRLF slice)');
                } else {
                    console.log('❌ FIX 1: FAILED to find end of Fallback 2');
                }
            }
        }
    }
}

// ─────────────────────────────────────────────────────────────
// FIX 2a: Remove "if (sp.teamMembersEnabled) {" guard from overlay creation
// (in exported HTML template - around line 13038)
// Keep the body, just remove the condition and its closing brace
// ─────────────────────────────────────────────────────────────

// The block starts: "\r\n      if (sp.teamMembersEnabled) {\r\n          const customStyle"
// The block ends at: "\r\n      }\r\n\r\n      if (sp.worldClockEnabled) {"
// We need to keep the body and remove just the guard

function removeConditionalGuard(source, openGuard, closeGuardBeforeNext) {
    // Find the openGuard
    const startIdx = source.indexOf(openGuard);
    if (startIdx === -1) {
        console.log(`  ⚠️  Could not find: "${openGuard.substring(0, 60)}..."`);
        return { source, found: false };
    }
    // Remove the openGuard line
    let result = source.slice(0, startIdx) + source.slice(startIdx + openGuard.length);
    // Find and remove the closing brace marker
    const closeIdx = result.indexOf(closeGuardBeforeNext);
    if (closeIdx === -1) {
        console.log(`  ⚠️  Could not find closing: "${closeGuardBeforeNext.substring(0, 60)}..."`);
        return { source: result, found: false };
    }
    // Remove only the closing brace part (first group before the "next" marker)
    result = result.slice(0, closeIdx) + result.slice(closeIdx + closeGuardBeforeNext.length);
    return { source: result, found: true };
}

// The team members guard opens with this exact text:
const tmOpenGuard = `\r\n      if (sp.teamMembersEnabled) {\r\n          const customStyle = document.createElement('style');`;
const tmCloseGuard = `\r\n      }\r\n\r\n      if (sp.worldClockEnabled) {`;
// After removal, the worldClock section should NOT have a guard anymore:
const tmCloseReplacement = `\r\n\r\n      // World Clock overlay (always created)`;

// Let's do a simpler targeted approach - find specific markers
function fixTeamMembersGuard(source) {
    // Find opening
    const openMarker = '      if (sp.teamMembersEnabled) {\r\n          const customStyle = document.createElement';
    const openMarkerLF = '      if (sp.teamMembersEnabled) {\n          const customStyle = document.createElement';
    
    let lineEnding = '\r\n';
    let openIdx = source.indexOf(openMarker);
    if (openIdx === -1) {
        openIdx = source.indexOf(openMarkerLF);
        lineEnding = '\n';
    }
    
    if (openIdx === -1) {
        console.log('⚠️  FIX 2a: Could not find teamMembersEnabled guard');
        return source;
    }
    
    // Remove "      if (sp.teamMembersEnabled) {\r\n" (the guard line only)
    // Keep everything else (the body)
    const guardLine = `      if (sp.teamMembersEnabled) {${lineEnding}`;
    source = source.slice(0, openIdx) + source.slice(openIdx + guardLine.length);
    
    // Now find the closing "      }" that ends the teamMembers block
    // It's followed by "\r\n\r\n      if (sp.worldClockEnabled)"
    const closeAndNext = `      }${lineEnding}${lineEnding}      if (sp.worldClockEnabled) {`;
    const closeIdx = source.indexOf(closeAndNext, openIdx);
    
    if (closeIdx !== -1) {
        // Replace the closing brace + next guard with just the next section (no guard)
        const replacement = `${lineEnding}      // ── World Clock overlay (always injected) ──`;
        source = source.slice(0, closeIdx) + replacement + source.slice(closeIdx + closeAndNext.length);
        console.log('✅ FIX 2a: Removed teamMembersEnabled guard');
    } else {
        // Try without CRLF for next guard
        const closeAndNextLF = `      }\n\n      if (sp.worldClockEnabled) {`;
        const closeIdxLF = source.indexOf(closeAndNextLF, openIdx);
        if (closeIdxLF !== -1) {
            const replacement = `\n      // ── World Clock overlay (always injected) ──`;
            source = source.slice(0, closeIdxLF) + replacement + source.slice(closeIdxLF + closeAndNextLF.length);
            console.log('✅ FIX 2a: Removed teamMembersEnabled guard (LF)');
        } else {
            console.log('⚠️  FIX 2a: Could not find closing brace + worldClock guard');
        }
    }
    return source;
}

// ─────────────────────────────────────────────────────────────
// FIX 2b: Remove "if (sp.worldClockEnabled) {" guard from overlay creation
// The block ends with "}\n else {" (the navigator else branch)
// We need to keep BOTH the world clock body AND the else body (remove the if/else structure)
// ─────────────────────────────────────────────────────────────
function fixWorldClockGuard(source) {
    // The worldClock guard (now without the prefix since fix 2a removed it) ends with:
    // "      }\r\n else {\r\n"
    // After the world clock closing brace comes the "else { navigator code }"
    
    // Find the closing "      }\r\n else {" of the worldClock block
    const elseMarkerCRLF = `      }\r\n else {\r\n`;
    const elseMarkerLF = `      }\n else {\n`;
    
    let elseIdx = source.indexOf(elseMarkerCRLF);
    let lineEnding = '\r\n';
    if (elseIdx === -1) {
        elseIdx = source.indexOf(elseMarkerLF);
        lineEnding = '\n';
    }
    
    if (elseIdx === -1) {
        console.log('⚠️  FIX 2b: Could not find worldClock closing } else {');
        // Try alternate form
        const alt = `\r\n }\r\n else {`;
        elseIdx = source.indexOf(alt);
        if (elseIdx !== -1) {
            // Remove just the "} else {" and keep both bodies
            source = source.slice(0, elseIdx) + source.slice(elseIdx + alt.length);
            console.log('✅ FIX 2b: Removed worldClock else-guard (alt)');
        }
        return source;
    }
    
    // Replace "      }\r\n else {\r\n" with just a separator comment
    const replacement = `${lineEnding}      // ── Navigator Menu section (always injected) ──${lineEnding}`;
    source = source.slice(0, elseIdx) + replacement + source.slice(elseIdx + elseMarkerCRLF.length);
    console.log('✅ FIX 2b: Removed worldClock else-guard');
    return source;
}

// Apply fixes
src = fixTeamMembersGuard(src);
src = fixWorldClockGuard(src);

// ─────────────────────────────────────────────────────────────
// FIX 3: Remove "if (sp.clockToBookEnabled) {" guard around _bookOverlay creation
// Similar to above but for the Clock-to-Book overlay (around line 11160)
// ─────────────────────────────────────────────────────────────
function fixClockToBookGuard(source) {
    const openMarkerCRLF = `      if (sp.clockToBookEnabled) {\r\n          const customStyle = document.createElement`;
    const openMarkerLF = `      if (sp.clockToBookEnabled) {\n          const customStyle = document.createElement`;
    
    let openIdx = source.indexOf(openMarkerCRLF);
    let lineEnding = '\r\n';
    if (openIdx === -1) {
        openIdx = source.indexOf(openMarkerLF);
        lineEnding = '\n';
    }
    
    if (openIdx === -1) {
        console.log('⚠️  FIX 3: Could not find clockToBookEnabled guard');
        return source;
    }
    
    // Remove just the guard line
    const guardLine = `      if (sp.clockToBookEnabled) {${lineEnding}`;
    source = source.slice(0, openIdx) + source.slice(openIdx + guardLine.length);
    
    // Find closing brace of this block - it's followed by "\r\n\r\n      if (sp.teamMembersEnabled)"
    // After fix 2a, teamMembersEnabled guard was already removed; closing now followed by "\n      // ── World Clock"
    // So look for the closing brace that was the original end of clockToBook block:
    // "      }\r\n\r\n      if (sp.teamMembersEnabled) {"
    const closeAndNext = `      }${lineEnding}${lineEnding}      if (sp.teamMembersEnabled) {`;
    const closeIdx = source.indexOf(closeAndNext, openIdx);
    
    if (closeIdx !== -1) {
        const replacement = `${lineEnding}      // ── Team Members overlay (always injected) ──`;
        source = source.slice(0, closeIdx) + replacement + source.slice(closeIdx + closeAndNext.length);
        console.log('✅ FIX 3: Removed clockToBookEnabled guard');
    } else {
        // After fix 2a already applied, try finding the comment we inserted
        const closeAndNextAlt = `      }${lineEnding}${lineEnding}      // ── World Clock overlay (always injected) ──`;
        const closeIdxAlt = source.indexOf(closeAndNextAlt, openIdx);
        if (closeIdxAlt !== -1) {
            const replacement = `${lineEnding}      // ── Team Members overlay (always injected) ──${lineEnding}`;
            source = source.slice(0, closeIdxAlt) + replacement + source.slice(closeIdxAlt + closeAndNextAlt.length);
            console.log('✅ FIX 3: Removed clockToBookEnabled guard (alt path)');
        } else {
            console.log('⚠️  FIX 3: Could not find clockToBook closing brace - skipping');
        }
    }
    return source;
}

src = fixClockToBookGuard(src);

// ─────────────────────────────────────────────────────────────
// Write output
// ─────────────────────────────────────────────────────────────
const newLen = src.length;
fs.writeFileSync(filePath, src, 'utf8');
console.log(`\n📝 Written ${filePath}`);
console.log(`   Original: ${originalLen} bytes → New: ${newLen} bytes (Δ ${newLen - originalLen})`);

// Verify key patterns are gone
const checks = [
    { pattern: 'if (sp.teamMembersEnabled) {\n          const customStyle', label: 'teamMembers guard' },
    { pattern: 'if (sp.teamMembersEnabled) {\r\n          const customStyle', label: 'teamMembers guard (CRLF)' },
    { pattern: 'if (sp.worldClockEnabled) {\n          const customStyle', label: 'worldClock guard' },
    { pattern: 'if (sp.worldClockEnabled) {\r\n          const customStyle', label: 'worldClock guard (CRLF)' },
    { pattern: '// Fallback 2: use screen position', label: 'Fallback 2' },
];

console.log('\n🔍 Verification:');
for (const { pattern, label } of checks) {
    const found = src.includes(pattern);
    console.log(`  ${found ? '❌ STILL PRESENT' : '✅ REMOVED'}: ${label}`);
}
