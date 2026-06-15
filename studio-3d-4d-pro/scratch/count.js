const fs = require('fs');
const paths = [
    'js/sketch-extruder.js',
    '../html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js',
    '../html cod3 buna ultimul 2model2 vece2/js/sketch-extruder.js'
];
paths.forEach(p => {
    if (fs.existsSync(p)) {
        const content = fs.readFileSync(p, 'utf8');
        let count = 0;
        for (let i = 0; i < content.length; i++) {
            if (content[i] === '\\') count++;
        }
        console.log(p, 'Size:', content.length, 'Backslashes:', count);
    } else {
        console.log(p, 'does not exist');
    }
});
