const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\andre\\.gemini\\antigravity\\brain\\d965ccf6-e03e-495e-95b1-f24c77271e50\\.system_generated\\logs\\transcript.jsonl';
if (fs.existsSync(logPath)) {
    const lines = fs.readFileSync(logPath, 'utf8').split('\n');
    console.log('Total log lines:', lines.length);
    let count = 0;
    lines.forEach((line, idx) => {
        if (!line.trim()) return;
        try {
            const data = JSON.parse(line);
            // Search for tool calls to write_to_file or replace_file_content or multi_replace_file_content on sketch-extruder.js
            if (JSON.stringify(data).includes('sketch-extruder.js')) {
                count++;
                console.log(`Match ${count} | Step ${data.step_index} | Type: ${data.type}`);
            }
        } catch(e) {}
    });
} else {
    console.log('Log file does not exist at', logPath);
}
