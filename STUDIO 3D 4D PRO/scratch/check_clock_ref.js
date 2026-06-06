const fs = require('fs');
const files = ['index.html', 'js/sketch-extruder.js', 'js/export-zip-pro.js'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        if (content.includes('clock-ultra-3d.js')) {
            console.log(`Found in: ${file}`);
        }
    }
});
