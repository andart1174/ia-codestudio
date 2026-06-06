const fs = require('fs');

const originalCode = fs.readFileSync('js/sketch-extruder.js', 'utf8');

const startStr = 'const code = `<!DOCTYPE html>';
const startIdx = originalCode.indexOf(startStr);
if (startIdx === -1) {
    console.error("Could not find template start!");
    process.exit(1);
}

let endIdx = originalCode.indexOf('</html>`', startIdx);
if (endIdx === -1) {
    endIdx = originalCode.indexOf('</html>`;', startIdx);
}
if (endIdx === -1) {
    console.error("Could not find template end!");
    process.exit(1);
}
endIdx += 8;

console.log(`Template range: index ${startIdx} to ${endIdx}`);

const allowedPatterns = [
    'configJSON',
    'currentEnv',
    'customMediaDataUrl',
    'customMediaType',
    'currentBgEffect',
    'window._cuGlowIntensity',
    'pointInPoly',
    'getConvexHull',
    'crossProduct',
    'getSilhouetteContour',
    'getDxfSilhouette',
    'getRayHullIntersection',
    'buildEnv',
    'buildHeroForgeGeo',
    'addHeroAnimCb',
    'buildSteampunkChronoGeo',
    'addSteampunkAnimCb',
    'buildSteampunkChronoProGeo',
    'addSteampunkProAnimCb',
    'createProceduralDialTexture',
    'buildClockUltraGeo',
    'addClockUltraAnimCb',
    'createGeometryFromModel',
    'window.currentLang',
    "'script'"
];

let fixedCode = originalCode.substring(0, startIdx);
let segment = originalCode.substring(startIdx, endIdx);
let lastIdx = 0;
let newSegment = '';
let idx = 0;

while (true) {
    idx = segment.indexOf('${', idx);
    if (idx === -1) break;
    
    // Find consecutive backslashes preceding idx
    let p = idx - 1;
    while (p >= 0 && segment[p] === '\\') {
        p--;
    }
    const bsCount = idx - 1 - p;
    const isEscaped = (bsCount % 2 === 1);
    
    let endIdxOfInterp = segment.indexOf('}', idx);
    if (endIdxOfInterp === -1) {
        idx += 2;
        continue;
    }
    
    const content = segment.substring(idx + 2, endIdxOfInterp);
    
    let isAllowed = false;
    for (const pattern of allowedPatterns) {
        if (content.includes(pattern)) {
            isAllowed = true;
            break;
        }
    }
    
    if (!isEscaped && !isAllowed) {
        // Escape it correctly by replacing all preceding backslashes + ${ with \${
        // p+1 is the start index of the backslashes
        newSegment += segment.substring(lastIdx, p + 1) + '\\${';
        lastIdx = idx + 2;
        const lineNum = originalCode.substring(0, startIdx + idx).split('\n').length;
        console.log(`Escaped Line ${lineNum} (index ${startIdx + idx}): \${${content}} (had ${bsCount} backslashes)`);
    } else {
        // If it is allowed but was escaped, or if it is not allowed but was already escaped,
        // we keep it as-is.
    }
    
    idx = endIdxOfInterp + 1;
}
newSegment += segment.substring(lastIdx);
fixedCode += newSegment + originalCode.substring(endIdx);

fs.writeFileSync('scratch/sketch-extruder-fixed.js', fixedCode, 'utf8');
console.log("Wrote fixed code to scratch/sketch-extruder-fixed.js");
