const fs = require('fs');

const files = ['js/sketch-extruder.js', 'js/clock-ultra-3d.js'];

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        // We will try parsing the javascript content. Since these files might be browser scripts, 
        // they might run in global scope or have browser globals, but syntactically they should be valid JS.
        // We can use the 'vm' module to check syntax.
        const vm = require('vm');
        new vm.Script(content);
        console.log(`✔ ${file}: SYNTAX OK`);
    } catch (err) {
        console.error(`✘ ${file}: SYNTAX ERROR!`);
        console.error(err);
        process.exit(1);
    }
});
