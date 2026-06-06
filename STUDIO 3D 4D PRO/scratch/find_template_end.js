const fs = require('fs');

const activePath = 'js/sketch-extruder.js';
const activeCode = fs.readFileSync(activePath, 'utf8');

const backupPath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const backupCode = fs.readFileSync(backupPath, 'utf8');

function findTemplateEnd(code, name) {
    const startIdx = code.indexOf('const code = `<!DOCTYPE html>');
    if (startIdx === -1) {
        console.log(`${name}: template start not found`);
        return;
    }
    // Find matching backtick after startIdx
    // We have to scan char by char, keeping track of escaped backticks
    let inEscape = false;
    let endIdx = -1;
    for (let i = startIdx + 14; i < code.length; i++) {
        const char = code[i];
        if (inEscape) {
            inEscape = false;
        } else if (char === '\\') {
            inEscape = true;
        } else if (char === '`') {
            // Found a raw backtick! Wait, is this the end of const code?
            // In the file, after the closing backtick, it usually has a semicolon and then return code or editorVal.value = code
            if (code.substring(i + 1, i + 20).includes('return code') || code.substring(i + 1, i + 50).includes('editorVal.value')) {
                endIdx = i;
                break;
            }
        }
    }
    console.log(`${name}: template starts at ${startIdx}, ends at ${endIdx}. Length: ${endIdx - startIdx}`);
    if (endIdx !== -1) {
        console.log(`Context after end: "${code.substring(endIdx + 1, endIdx + 100)}"`);
    }
}

findTemplateEnd(backupCode, 'Backup');
findTemplateEnd(activeCode, 'Active');
