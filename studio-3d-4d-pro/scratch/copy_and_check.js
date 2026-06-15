const fs = require('fs');
const { execSync } = require('child_process');

try {
    fs.copyFileSync('scratch/sketch-extruder-fixed.js', 'js/sketch-extruder.js');
    console.log("Copied fixed file to js/sketch-extruder.js");
    
    console.log("Running export syntax check...");
    const out = execSync('node scratch/check_export_syntax.js', { encoding: 'utf8' });
    console.log("Check Output:");
    console.log(out);
} catch (e) {
    console.error("Failed copy or check:", e.message);
    if (e.stdout) console.log("Stdout:", e.stdout);
    if (e.stderr) console.error("Stderr:", e.stderr);
}
