const fs = require('fs');
const file = 'js/clock-ultra-3d.js';
let c = fs.readFileSync(file, 'utf8');
const lines = c.split('\n');

// Find the line with cu3-soundscape-binaural-val closing div (the </div> after it)
let insertAfter = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('cu3-soundscape-binaural-val') && lines[i+1] && lines[i+1].trim() === '</div>' && lines[i+2] && lines[i+2].includes('</div>')) {
        insertAfter = i + 2; // after the closing </div> of soundscape-controls
        break;
    }
}

if (insertAfter === -1) {
    console.log('Could not find insert point. Searching differently...');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('cu3-soundscape-binaural-val')) {
            console.log('Found binaural val at line', i+1, ':', lines[i].trim().substring(0,80));
            console.log('  Next:', lines[i+1] && lines[i+1].trim().substring(0,60));
            console.log('  Next+1:', lines[i+2] && lines[i+2].trim().substring(0,60));
            console.log('  Next+2:', lines[i+3] && lines[i+3].trim().substring(0,60));
        }
    }
    process.exit(1);
}

console.log('Inserting after line', insertAfter + 1, ':', lines[insertAfter].trim());

const newLines = [
    '',
    '                    <!-- Team Members per Hour -->',
    '                    <label class="cb-row" style="border-top: 1px solid rgba(255,255,255,0.04); margin-top: 6px; padding-top: 6px;">',
    '                        <input type="checkbox" id="cu3-opt-teammembers" ${teamMembersEnabled?"checked":""} />',
    '                        <span>${l.teamMembersEnabledLabel}</span>',
    '                    </label>',
    '',
    '                    <!-- World Clock Mode -->',
    '                    <label class="cb-row">',
    '                        <input type="checkbox" id="cu3-opt-worldclock" ${worldClockEnabled?"checked":""} />',
    '                        <span>${l.worldClockEnabledLabel}</span>',
    '                    </label>'
];

lines.splice(insertAfter + 1, 0, ...newLines);
fs.writeFileSync(file, lines.join('\n'), 'utf8');
console.log('Done. Total lines now:', lines.length);
