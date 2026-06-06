const fs = require('fs');

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

global.window = global;
global.document = {
    head: { appendChild: () => {} },
    body: { appendChild: (el) => { console.log('Appended to body:', el.id); } },
    getElementById: getMockElement,
    createElement: (tag) => {
        return {
            tag,
            style: {},
            classList: {
                add: (cls) => { console.log(`ClassList ADD: ${cls}`); },
                remove: (cls) => { console.log(`ClassList REMOVE: ${cls}`); }
            },
            addEventListener: () => {}
        };
    },
    addEventListener: () => {}
};
global.lang = 'en';

// Read exported script
const html = fs.readFileSync('scratch/exported_test.html', 'utf8');

// Extract _showTeamMember definition
const start = html.indexOf('window._showTeamMember = function');
const end = html.indexOf('window._showWorldClock = function', start);
const fnCode = html.slice(start, end !== -1 ? end : start + 3000);

// We need _teamOverlay variable to be defined in closure
const overlayCode = `
var _teamOverlay = {
    classList: {
        add: (cls) => { console.log('Overlay classList ADD:', cls); }
    }
};
` + fnCode;

try {
    eval(overlayCode);
    console.log('Function successfully compiled!');
    
    console.log('\n--- Running _showTeamMember(12) ---');
    window._showTeamMember(12);
    
    console.log('\nResults:');
    console.log('Avatar text:', mockElements['team-member-avatar'].textContent);
    console.log('Avatar bg:', mockElements['team-member-avatar'].style.background);
    console.log('Name:', mockElements['team-member-name'].textContent);
    console.log('Role:', mockElements['team-member-role'].textContent);
    console.log('Bio:', mockElements['team-member-bio'].textContent);
    console.log('Email:', mockElements['team-member-email'].textContent);
} catch (e) {
    console.error('Crash during execution:', e);
}
