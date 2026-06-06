const fs = require('fs');

if (fs.existsSync('scratch/temp_script_1.js')) {
    const code = fs.readFileSync('scratch/temp_script_1.js', 'utf8');
    const query = 'margin-bottom:15px';
    const idx = code.indexOf(query);
    if (idx !== -1) {
        console.log("Found query in temp_script_1.js. Context:");
        console.log(code.substring(idx - 200, idx + 500));
    } else {
        console.log("Query not found in temp_script_1.js");
        // Let's print around line 11660
        const lines = code.split('\n');
        console.log("Lines 1640 to 1680:");
        for (let i = 1640; i <= 1680; i++) {
            if (lines[i-1] !== undefined) {
                console.log(`${i}: ${lines[i-1]}`);
            }
        }
    }
} else {
    console.log("temp_script_1.js does not exist");
}
