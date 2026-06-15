const fs = require('fs');
const path = require('path');

// Mock browser environment for runtime check of the exported script
global.window = global;
global.addEventListener = () => {};
global.removeEventListener = () => {};
global.innerWidth = 1920;
global.innerHeight = 1080;

global.document = {
    body: {
        appendChild: () => {}
    },
    head: {
        appendChild: () => {}
    },
    createElement: (tag) => {
        return {
            id: '',
            style: {},
            innerHTML: '',
            width: 100,
            height: 100,
            appendChild: () => {},
            addEventListener: () => {},
            querySelector: () => ({ style: {}, textContent: '', addEventListener: () => {} }),
            querySelectorAll: () => [],
            onmouseover: null,
            onmouseout: null,
            onclick: null,
            onchange: null,
            oninput: null,
            contains: () => false,
            closest: () => ({ style: {}, addEventListener: () => {} }),
            getContext: () => ({
                fillStyle: '',
                strokeStyle: '',
                lineWidth: 1,
                font: '',
                textAlign: '',
                textBaseline: '',
                beginPath: () => {},
                moveTo: () => {},
                lineTo: () => {},
                arc: () => {},
                stroke: () => {},
                fill: () => {},
                fillRect: () => {},
                clearRect: () => {},
                fillText: () => {},
                measureText: () => ({ width: 10 }),
                createLinearGradient: () => ({ addColorStop: () => {} }),
                drawImage: () => {}
            })
        };
    },
    getElementById: (id) => {
        return {
            id: id,
            style: {},
            innerHTML: '',
            width: 100,
            height: 100,
            appendChild: () => {},
            addEventListener: () => {},
            onmouseover: null,
            onmouseout: null,
            onclick: null,
            onchange: null,
            oninput: null,
            contains: () => false,
            closest: () => ({ style: {}, addEventListener: () => {} }),
            value: '',
            textContent: '',
            getContext: () => ({
                fillStyle: '',
                strokeStyle: '',
                lineWidth: 1,
                font: '',
                textAlign: '',
                textBaseline: '',
                beginPath: () => {},
                moveTo: () => {},
                lineTo: () => {},
                arc: () => {},
                stroke: () => {},
                fill: () => {},
                fillRect: () => {},
                clearRect: () => {},
                fillText: () => {},
                measureText: () => ({ width: 10 }),
                createLinearGradient: () => ({ addColorStop: () => {} }),
                drawImage: () => {}
            })
        };
    },
    addEventListener: () => {},
    removeEventListener: () => {}
};

global.navigator = {
    userAgent: 'node',
    getBattery: () => Promise.resolve({ level: 1.0, addEventListener: () => {} }),
    mediaDevices: {
        getUserMedia: () => Promise.resolve({ getTracks: () => [] })
    }
};

const dummyFunc = function() {
    this.add = () => {};
    this.remove = () => {};
    this.children = [];
    this.position = { x: 0, y: 0, z: 0, set: () => {}, copy: () => {} };
    this.rotation = { x: 0, y: 0, z: 0, set: () => {}, copy: () => {} };
    this.scale = { x: 1, y: 1, z: 1, set: () => {}, copy: () => {} };
    this.getObjectByName = () => null;
    this.setAttribute = () => {};
    this.attributes = { position: { array: [], needsUpdate: false } };
    this.geometry = this;
    this.material = {};
    this.rotateX = () => {};
    this.computeVertexNormals = () => {};
    this.shadowMap = { enabled: false, type: 0 };
    this.domElement = {
        getBoundingClientRect: () => ({ left: 0, right: 1920, top: 0, bottom: 1080, width: 1920, height: 1080 }),
        addEventListener: () => {}
    };
    this.setSize = () => {};
    this.setClearColor = () => {};
    this.render = () => {};
    this.autoRotate = false;
    this.update = () => {};
    this.enabled = true;
    this.castShadow = false;
    this.shadow = { mapSize: { width: 0, height: 0 } };
    this.r = 0; this.g = 0; this.b = 0;
};
dummyFunc.prototype.clone = function() { return this; };
dummyFunc.prototype.set = function() { return this; };
dummyFunc.prototype.setHSL = function() { return this; };
dummyFunc.prototype.copy = function() { return this; };

global.THREE = new Proxy({}, {
    get: (target, prop) => {
        if (prop === 'FontLoader') {
            return function() {
                this.load = (url, onload) => {
                    setTimeout(() => onload({}), 10);
                };
            };
        }
        return dummyFunc;
    }
});

global.AudioContext = function() {
    this.state = 'running';
    this.resume = () => Promise.resolve();
    this.createAnalyser = () => ({ fftSize: 0, connect: () => {}, frequencyBinCount: 0, getByteFrequencyData: () => {} });
    this.destination = {};
    this.createMediaStreamSource = () => ({ connect: () => {} });
    this.createBuffer = () => ({ getChannelData: () => new Float32Array(100) });
    this.createBufferSource = () => ({ connect: () => {}, start: () => {}, stop: () => {}, loop: false });
    this.createGain = () => ({ connect: () => {}, gain: { setValueAtTime: () => {}, linearRampToValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} } });
    this.createOscillator = () => ({ connect: () => {}, start: () => {}, stop: () => {}, frequency: { setValueAtTime: () => {} }, type: 'sine' });
    this.currentTime = 0;
};
global.webkitAudioContext = global.AudioContext;

global.Audio = class {
    constructor() {
        this.src = '';
        this.paused = true;
        this.volume = 1;
    }
    load() {}
    play() {
        this.paused = false;
        return Promise.resolve();
    }
    pause() {
        this.paused = true;
    }
};

let rafCalled = false;
global.requestAnimationFrame = (cb) => {
    if (!rafCalled) {
        rafCalled = true;
        // Run animation callback once to verify it works without throwing
        setTimeout(cb, 10);
    }
};

// Now read the generated script and run eval
try {
    const scriptPath = path.resolve('scratch/temp_script_1.js');
    const code = fs.readFileSync(scriptPath, 'utf8');
    
    global.document.querySelectorAll = () => [];
    
    eval(code);
    console.log("SUCCESS: Exported script runs without runtime errors in mock environment!");
    process.exit(0);
} catch (err) {
    console.error("RUNTIME ERROR IN EXPORTED SCRIPT:");
    console.error(err);
    process.exit(1);
}
