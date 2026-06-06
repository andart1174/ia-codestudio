const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Check the structure around the IIFE
const iifeStart = 664710;
console.log("Context around IIFE at 664710:");
console.log(code.substring(iifeStart - 100, iifeStart + 200));
