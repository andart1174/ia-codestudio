const fs = require('fs');
const path = require('path');

global.window = global;
global.navigator = { userAgent: 'node', getBattery: () => Promise.resolve({ level: 1.0, addEventListener: () => {} }) };

// Extract javascript block from exported_test.html
const html = fs.readFileSync('scratch/exported_test.html', 'utf8');
const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
let match;
let scriptCode = '';
while ((match = scriptRegex.exec(html)) !== null) {
    if (match[1].includes('window._showTeamMember')) {
        scriptCode = match[1];
        break;
    }
}

if (!scriptCode) {
    console.error('Could not find script block with window._showTeamMember');
    process.exit(1);
}

// Set up mock DOM
const mockElements = {};
const getMockElement = (id) => {
    if (!mockElements[id]) {
        mockElements[id] = {
            id,
            style: {},
            classList: {
                add: (cls) => { console.log(`ClassList ADD on #${id}: ${cls}`); },
                remove: (cls) => { console.log(`ClassList REMOVE on #${id}: ${cls}`); }
            },
            appendChild: () => {},
            addEventListener: () => {}
        };
    }
    return mockElements[id];
};

global.document = {
    head: { appendChild: () => {} },
    body: { appendChild: (el) => { console.log('Appended to body:', el.id); } },
    getElementById: getMockElement,
    createElement: (tag) => {
        const el = {
            tag,
            style: {},
            classList: {
                add: (cls) => { console.log(`ClassList ADD: ${cls}`); },
                remove: (cls) => { console.log(`ClassList REMOVE: ${cls}`); }
            },
            addEventListener: () => {}
        };
        return el;
    },
    addEventListener: () => {}
};

global.THREE = {
    Group: function() { this.add = () => {}; this.children = []; this.position = { set: () => {} }; this.getObjectByName = () => null; },
    Color: function() {},
    Vector3: function() {},
    Euler: function() {},
    Plane: function() {},
    AudioContext: function() {},
    OscillatorNode: function() {},
    GainNode: function() {},
};

// Run the script code in global scope
try {
    eval(scriptCode);
    console.log('Script block successfully evaluated!');
    
    // Call _showTeamMember(12)
    console.log('\n--- Calling window._showTeamMember(12) ---');
    window._showTeamMember(12);
    console.log('Resulting element states:');
    console.log('Name text:', mockElements['team-member-name'].textContent);
    console.log('Role text:', mockElements['team-member-role'].textContent);
    console.log('Email text:', mockElements['team-member-email'].textContent);
    console.log('Avatar background:', mockElements['team-member-avatar'].style.background);
    console.log('Avatar initials:', mockElements['team-member-avatar'].textContent);
    
} catch (e) {
    console.error('CRASH DURING EVALUATION / CALL:', e);
}
