const fs = require('fs');
const path = require('path');

// Set up mock DOM elements
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
            addEventListener: () => {},
            textContent: '',
            value: ''
        };
    }
    return mockElements[id];
};

global.window = global;
global.innerWidth = 1920;
global.innerHeight = 1080;
global.navigator = { userAgent: 'node', getBattery: () => Promise.resolve({ level: 1.0, addEventListener: () => {} }) };
global.document = {
    head: { appendChild: () => {} },
    body: {
        appendChild: (el) => {
            console.log('Appended to document.body:', el.id);
            // If the element has children/innerHTML, we can mock querySelector for it
            el.querySelector = (sel) => {
                const cleanId = sel.replace('#', '');
                return getMockElement(cleanId);
            };
        }
    },
    getElementById: getMockElement,
    createElement: (tag) => {
        const el = {
            tag,
            style: {},
            classList: {
                add: (cls) => { console.log(`Element classList ADD: ${cls}`); },
                remove: (cls) => { console.log(`Element classList REMOVE: ${cls}`); }
            },
            addEventListener: () => {},
            appendChild: () => {},
            innerHTML: ''
        };
        return el;
    },
    addEventListener: () => {}
};
global.lang = 'en';

// Mock THREE
global.THREE = {
    Group: function() { this.add = () => {}; this.children = []; this.position = { set: () => {} }; this.getObjectByName = () => null; },
    Color: function() { this.set = () => {}; },
    Vector3: function() { this.set = () => {}; },
    Euler: function() {},
    Plane: function() {},
    AudioContext: function() {},
    OscillatorNode: function() {},
    GainNode: function() {},
    WebGLRenderer: function() { this.domElement = { getBoundingClientRect: () => ({ left: 0, top: 0, width: 500, height: 500 }), addEventListener: () => {} }; this.setSize = () => {}; this.setClearColor = () => {}; this.shadowMap = {}; },
    PerspectiveCamera: function() { this.position = { set: () => {} }; this.rotation = { set: () => {} }; },
    Scene: function() { this.add = () => {}; },
    AmbientLight: function() {},
    DirectionalLight: function() {},
    PointLight: function() {},
    BoxGeometry: function() {},
    MeshPhongMaterial: function() {},
    Mesh: function() { this.position = { set: () => {} }; this.rotation = { set: () => {} }; },
    TextureLoader: function() { this.load = () => {}; }, OrbitControls: function() { this.update = () => {}; }, PCFSoftShadowMap: 1
};

const scriptCode = fs.readFileSync('scratch/temp_script_1.js', 'utf8');

try {
    eval(scriptCode);
    console.log('Script code executed successfully!');
    
    // Call window._showTeamMember(12)
    console.log('\n--- Running window._showTeamMember(12) ---');
    if (typeof window._showTeamMember === 'function') {
        window._showTeamMember(12);
        
        console.log('\nResults for Team Member 12:');
        console.log('Name text:', mockElements['team-member-name'].textContent);
        console.log('Role text:', mockElements['team-member-role'].textContent);
        console.log('Bio text:', mockElements['team-member-bio'].textContent);
        console.log('Email text:', mockElements['team-member-email'].textContent);
        console.log('Avatar initials:', mockElements['team-member-avatar'].textContent);
    } else {
        console.log('window._showTeamMember is not defined!');
    }
    
    // Call window._showWorldClock(2)
    console.log('\n--- Running window._showWorldClock(2) ---');
    if (typeof window._showWorldClock === 'function') {
        window._showWorldClock(2);
        console.log('Results for World Clock 2:');
        console.log('City name:', mockElements['wc-city-name'].textContent);
        console.log('Country name:', mockElements['wc-country'].textContent);
        console.log('Local time:', mockElements['wc-local-time'].textContent);
    } else {
        console.log('window._showWorldClock is not defined!');
    }
} catch (e) {
    console.error('Error during execution:', e);
}
