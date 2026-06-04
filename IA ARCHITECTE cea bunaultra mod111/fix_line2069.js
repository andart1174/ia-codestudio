const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'ia-ultra-engine.js');
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find the gigantic single line (2069 in 1-indexed = index 2068)
// It starts with `               \`;\\ ` and contains all the new app types
let badLineIdx = -1;
for (let i = 2060; i < 2080; i++) {
    if (lines[i] && lines[i].trim().startsWith('`;\\ ') || (lines[i] && lines[i].length > 10000)) {
        badLineIdx = i;
        break;
    }
    if (lines[i] && lines[i].includes("} else if(type === 'restaurant')") && lines[i].length > 500) {
        badLineIdx = i;
        break;
    }
}

if (badLineIdx === -1) {
    // Try to find by content length
    for (let i = 2060; i < 2085; i++) {
        if (lines[i] && lines[i].length > 5000) {
            badLineIdx = i;
            break;
        }
    }
}

if (badLineIdx === -1) {
    console.error('Could not find the bad line. Searching all lines...');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] && lines[i].includes("} else if(type === 'restaurant')") && lines[i].length > 500) {
            badLineIdx = i;
            console.log('Found at line:', i+1);
            break;
        }
    }
}

if (badLineIdx === -1) {
    console.error('FATAL: Bad line not found');
    process.exit(1);
}

console.log(`Found bad line at index ${badLineIdx} (line ${badLineIdx + 1}), length: ${lines[badLineIdx].length}`);

// The bad line looks like:  `;\n          } else if(...) {...all code}
// We need to:
// 1. Remove the opening `; (which is actually the tail of the previous template string that got duplicated)
// 2. Decode the \n escaped content into real newlines  
// 3. Insert it properly

let badLine = lines[badLineIdx];

// Strip the leading `; artifact if present
// The line starts with "               `;\\" in the bad case
// Replace literal \n sequences with real newlines, and \\ with \
let fixedContent = badLine
    .replace(/^[\s]*`;\s*\\n\s+/, '')  // remove leading `;\n garbage
    .replace(/^[\s]*`;\s*/, '')         // also try plain
    .replace(/\\n/g, '\n')              // literal \n -> newlines
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, code) => String.fromCharCode(parseInt(code, 16)));  // decode unicode

// Replace the bad line with the fixed multi-line content
lines.splice(badLineIdx, 1, fixedContent);

const newContent = lines.join('\n');
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('File written. New total lines:', newContent.split('\n').length);
