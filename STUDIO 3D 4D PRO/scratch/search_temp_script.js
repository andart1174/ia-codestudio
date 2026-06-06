const fs = require('fs');

if (fs.existsSync('scratch/temp_script_1.js')) {
    const code = fs.readFileSync('scratch/temp_script_1.js', 'utf8');
    const terms = ['ondes', 'accueil', 'orologio', 'avanguardia'];
    terms.forEach(term => {
        const idx = code.indexOf(term);
        if (idx !== -1) {
            console.log(`Found "${term}" in temp_script_1.js:`);
            console.log(code.substring(idx - 40, idx + 100));
        } else {
            console.log(`"${term}" NOT found in temp_script_1.js`);
        }
    });
} else {
    console.log("temp_script_1.js not found");
}
