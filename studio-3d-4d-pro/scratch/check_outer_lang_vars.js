const fs = require('fs');

const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');
const query = 'window.isFR = isFR;';
const idx = code.indexOf(query);
if (idx !== -1) {
    console.log("Found window.isFR = isFR. Printing context:");
    console.log(code.substring(idx - 400, idx + 400));
} else {
    console.log("window.isFR = isFR not found");
}
