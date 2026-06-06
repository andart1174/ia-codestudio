const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\andre\\.gemini\\antigravity\\brain\\d965ccf6-e03e-495e-95b1-f24c77271e50\\.system_generated\\logs\\transcript.jsonl';
if (fs.existsSync(logPath)) {
    const lines = fs.readFileSync(logPath, 'utf8').split('\n');
    lines.forEach((line, idx) => {
        if (!line.trim()) return;
        try {
            const data = JSON.parse(line);
            if (data.tool_calls) {
                data.tool_calls.forEach(tc => {
                    if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content' || tc.name === 'write_to_file') {
                        const args = tc.args;
                        const targetFile = args.TargetFile || args.targetFile;
                        if (targetFile && targetFile.includes('sketch-extruder.js')) {
                            console.log(`=== Step ${data.step_index} | Tool: ${tc.name} ===`);
                            console.log(JSON.stringify(args, null, 2).substring(0, 1000));
                            console.log('...\n');
                        }
                    }
                });
            }
        } catch(e) {}
    });
} else {
    console.log('Log file does not exist.');
}
