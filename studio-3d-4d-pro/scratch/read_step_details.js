const fs = require('fs');

if (fs.existsSync('scratch/previous_edits.json')) {
    const edits = JSON.parse(fs.readFileSync('scratch/previous_edits.json', 'utf8'));
    const targetSteps = [1452, 1520];
    targetSteps.forEach(stepNum => {
        const edit = edits.find(e => e.step === stepNum);
        if (edit) {
            console.log(`\n======================================================`);
            console.log(`STEP ${stepNum} | Tool: ${edit.tool}`);
            console.log(`Description: ${edit.description}`);
            console.log(`======================================================`);
            
            const args = edit.args;
            let chunks = args.ReplacementChunks;
            if (chunks && typeof chunks === 'string') {
                try {
                    // Use eval to parse it as a JS expression
                    const parsed = eval(chunks);
                    parsed.forEach((chunk, cIdx) => {
                        console.log(`\n--- Chunk ${cIdx + 1} ---`);
                        console.log(`Target (Lines ${chunk.StartLine}-${chunk.EndLine}):`);
                        console.log(chunk.TargetContent);
                        console.log(`\nReplacement:`);
                        console.log(chunk.ReplacementContent);
                    });
                } catch (e) {
                    console.log("eval failed: " + e.message);
                    // Let's print the raw string characters or dump to a file
                    const dumpPath = `scratch/step_${stepNum}_raw_chunks.txt`;
                    fs.writeFileSync(dumpPath, chunks, 'utf8');
                    console.log(`Wrote raw chunks to ${dumpPath}`);
                }
            } else if (chunks && Array.isArray(chunks)) {
                chunks.forEach((chunk, cIdx) => {
                    console.log(`\n--- Chunk ${cIdx + 1} ---`);
                    console.log(`Target (Lines ${chunk.StartLine}-${chunk.EndLine}):`);
                    console.log(chunk.TargetContent);
                    console.log(`\nReplacement:`);
                    console.log(chunk.ReplacementContent);
                });
            }
        }
    });
} else {
    console.log('previous_edits.json does not exist.');
}
