const fs = require('fs');
const path = require('path');

const logPath = 'C:\\Users\\andre\\.gemini\\antigravity\\brain\\d965ccf6-e03e-495e-95b1-f24c77271e50\\.system_generated\\logs\\transcript.jsonl';
if (fs.existsSync(logPath)) {
    const lines = fs.readFileSync(logPath, 'utf8').split('\n');
    const edits = [];
    lines.forEach((line, idx) => {
        if (!line.trim()) return;
        try {
            const data = JSON.parse(line);
            if (data.tool_calls) {
                data.tool_calls.forEach(tc => {
                    if (tc.name === 'replace_file_content' || tc.name === 'multi_replace_file_content') {
                        const args = tc.args;
                        const targetFile = args.TargetFile || args.targetFile;
                        if (targetFile && targetFile.includes('sketch-extruder.js') && data.step_index < 1800) {
                            edits.push({
                                step: data.step_index,
                                tool: tc.name,
                                description: args.Description || args.description,
                                args: args
                            });
                        }
                    }
                });
            }
        } catch(e) {}
    });
    fs.writeFileSync('scratch/previous_edits.json', JSON.stringify(edits, null, 2), 'utf8');
    console.log('Saved', edits.length, 'edits to scratch/previous_edits.json');
} else {
    console.log('Log file does not exist.');
}
