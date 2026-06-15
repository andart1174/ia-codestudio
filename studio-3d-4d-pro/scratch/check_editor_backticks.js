const fs = require('fs');

const backupCode = fs.readFileSync('c:/Users/andre/OneDrive/Bureau/html cod3 buna ultimul 2model2 NU MERGE EXPORT/js/sketch-extruder.js', 'utf8');
const query = "isEN ? 'Rotate'";
const idx = backupCode.indexOf(query);
if (idx !== -1) {
    console.log("Backup snippet:");
    console.log(backupCode.substring(idx - 50, idx + 100));
} else {
    console.log("Not found in backup");
}
