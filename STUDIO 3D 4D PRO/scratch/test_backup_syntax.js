const fs = require('fs');
const path = require('path');

// Mock browser globals needed by sketch-extruder.js on load
global.window = global;
global.ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
global.alert = () => {};
global.document = {
    head: { appendChild: () => {} },
    getElementById: (id) => {
        return {
            addEventListener: () => {},
            appendChild: () => {},
            style: {},
            querySelector: () => ({ style: {}, textContent: '' }),
            querySelectorAll: () => [],
            dataset: {},
            classList: { add: () => {}, remove: () => {} },
            value: '',
            innerHTML: ''
        };
    },
    createElement: () => ({
        style: {},
        addEventListener: () => {},
        appendChild: () => {},
        dispatchEvent: () => {},
        classList: { add: () => {}, remove: () => {} }
    }),
    querySelectorAll: () => [],
    addEventListener: () => {},
};
global.navigator = {
    userAgent: 'node',
    getBattery: () => Promise.resolve({ level: 1.0, addEventListener: () => {} })
};
global.THREE = {
    Group: function() {
        this.add = () => {};
        this.children = [];
        this.position = { set: () => {} };
        this.getObjectByName = () => null;
        this.rotation = { x: 0, y: 0, z: 0 };
        this.scale = { x: 1, y: 1, z: 1 };
    },
    Color: function() { this.set = () => {}; },
    Vector3: function() { this.set = () => {}; },
    Euler: function() {},
    Plane: function() { this.intersectPlane = () => {}; },
    AudioContext: function() {},
    OscillatorNode: function() {},
    GainNode: function() {},
};

// Load sketch-extruder.js from the BACKUP
const filePath = 'c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js';
const code = fs.readFileSync(filePath, 'utf8');
eval(code);

// Mock models list
const mockModel = {
    id: 12345,
    name: 'Clock Ultra Test',
    type: '3d-model',
    format: 'clock-ultra',
    points: [],
    canvasW: 500,
    canvasH: 500,
    rawText: '',
    depth: 10,
    scale: 1.0,
    bevelVal: 0,
    metalness: 0.1,
    roughness: 0.5,
    colorHex: '#6366f1',
    emissiveHex: '#000000',
    opacity: 1.0,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    groupScale: { x: 1, y: 1, z: 1 },
    clockParts: [{
        format: 'clock-ultra',
        timeTravelEnabled: true,
        timeTravelAutoReturn: true,
        cursorMagnetismEnabled: true,
        ambientTickEnabled: true,
        hourlyChimeEnabled: true,
        countdownTarget: '2026-12-31T23:59',
        themePreset: 'custom',
        alarmEnabled: true,
        alarmTime: '12:00',
        chronoEnabled: true
    }],
    clockStyle: 'gold'
};

const dummyContainer = { dispatchEvent: () => {}, appendChild: () => {} };
const dummyBtn = { addEventListener: () => {} };
global.SketchExtruder.init(dummyContainer, dummyBtn);
global.SketchExtruder.addExtraModule('clock-ultra', mockModel);

// Mock editor DOM element value output
const editorVal = { value: '', dispatchEvent: () => {} };
global.document.getElementById = (id) => {
    if (id === 'code-editor') return editorVal;
    if (id === 'btn-export') return { innerHTML: '', dispatchEvent: () => {} };
    return {
        addEventListener: () => {},
        appendChild: () => {},
        style: {},
        querySelector: () => ({ style: {}, textContent: '' }),
        querySelectorAll: () => [],
        dataset: {},
        classList: { add: () => {}, remove: () => {} },
        value: '',
        innerHTML: ''
    };
};

try {
    // Run the export scene logic
    global.SketchExtruder.exportScene();
    console.log("SUCCESS! Backup exports fine.");
} catch (e) {
    console.error("Backup Export failed:", e);
}
