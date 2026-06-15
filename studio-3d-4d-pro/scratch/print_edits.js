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
            let chunks = args.ReplacementChunks;
            if (chunks) {
                if (typeof chunks === 'string') {
                    // Try parsing or clean up control characters
                    try {
                        chunks = JSON.parse(chunks);
                    } catch (e) {
                        console.log("Could not parse chunks as JSON directly, trying to clean up newlines.");
                        // Replace raw newlines and carriage returns inside string
                        const cleaned = chunks.replace(/\r/g, '').replace(/\n/g, '\\n');
                        try {
                            chunks = JSON.parse(cleaned);
                        } catch (e2) {
                            console.log("Cleanup failed: " + e2.message);
                            console.log("Raw chunks string:");
                            console.log(chunks);
                            return;
                        }
                    }
                }
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
