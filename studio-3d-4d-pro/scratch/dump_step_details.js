const fs = require('fs');

if (fs.existsSync('scratch/previous_edits.json')) {
    const edits = JSON.parse(fs.readFileSync('scratch/previous_edits.json', 'utf8'));
    const targetSteps = [1452, 1492, 1520, 1682];
    targetSteps.forEach(stepNum => {
        const edit = edits.find(e => e.step === stepNum);
        if (edit) {
            console.log(`\n======================================================`);
            console.log(`STEP ${stepNum} | Tool: ${edit.tool}`);
            console.log(`Description: ${edit.description}`);
            console.log(`======================================================`);
            
            const args = edit.args;
            if (args.ReplacementChunks) {
                const chunks = JSON.parse(args.ReplacementChunks);
                chunks.forEach((chunk, cIdx) => {
                    console.log(`\n--- Chunk ${cIdx + 1} ---`);
                    console.log(`Target (Lines ${chunk.StartLine}-${chunk.EndLine}):`);
                    console.log(chunk.TargetContent);
                    console.log(`\nReplacement:`);
                    console.log(chunk.ReplacementContent);
                });
            } else {
                console.log(`\nTarget (Lines ${args.StartLine}-${args.EndLine}):`);
                console.log(args.TargetContent);
                console.log(`\nReplacement:`);
                console.log(args.ReplacementContent);
            }
        } else {
            console.log(`Step ${stepNum} not found in edits log.`);
        }
    });
} else {
    console.log('previous_edits.json does not exist.');
}
