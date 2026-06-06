const fs = require('fs');
const files = ['js/sketch-extruder.js', 'js/clock-ultra-3d.js'];

files.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n');
        lines.forEach((line, index) => {
            if (line.toLowerCase().includes('website menu') || line.toLowerCase().includes('naviga') || line.toLowerCase().includes('clock-to-book') || line.toLowerCase().includes('dial_click_toast')) {
                console.log(`${file}:${index + 1}: ${line.trim()}`);
            }
        });
    }
});
