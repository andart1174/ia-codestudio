const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Fix check 3: look for actual occurrence pattern
const check3 = code.indexOf('ro: {') !== -1 || code.indexOf("ro:") !== -1;
console.log('Check 3 (ro: translations)', check3, '-> occurrences at:', code.indexOf('ro: {'), code.indexOf("'ro':"), code.indexOf('"ro":'));

// Fix check 14: look for actual occurrence pattern
const check14 = code.indexOf('Bun Venit') !== -1;
console.log('Check 14 (ro section title)', check14, '-> occurrences at:', code.indexOf('Bun Venit'));
