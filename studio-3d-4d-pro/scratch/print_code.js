const fs = require('fs');

function parseMatch(fileName) {
    if (!fs.existsSync(fileName)) return;
    const data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
    console.log("=== MATCH IN FILE:", fileName, "===");
    console.log("Step:", data.step_index);
    console.log("Source:", data.source);
    console.log("Type:", data.type);
    
    function findCode(obj) {
        if (typeof obj === 'string') {
            if (obj.includes('11835:') && obj.includes('11840:')) {
                console.log("Found text block (length " + obj.length + "):");
                console.log(obj);
            }
        } else if (Array.isArray(obj)) {
            obj.forEach(findCode);
        } else if (obj && typeof obj === 'object') {
            for (const key in obj) {
                findCode(obj[key]);
            }
        }
    }
    findCode(data);
}

parseMatch('scratch/code_match_0.json');
parseMatch('scratch/code_match_1.json');
parseMatch('scratch/code_match_2.json');
