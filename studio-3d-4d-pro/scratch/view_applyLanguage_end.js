const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');
console.log(code.substring(648900, 649500));
