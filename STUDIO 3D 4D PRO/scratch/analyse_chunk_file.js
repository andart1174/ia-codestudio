const fs = require('fs');

const f1 = fs.readFileSync('scratch/step_1452_raw_chunks.txt', 'utf8');
console.log("File length:", f1.length);
console.log("First 300 chars:");
console.log(f1.substring(0, 300));
console.log("Last 300 chars:");
console.log(f1.substring(f1.length - 300));

// Let's check why JSON.parse fails.
// Let's run JSON.parse on it and print the error stack
try {
    JSON.parse(f1);
} catch (e) {
    console.error("JSON.parse error:", e);
    // Find where the error is
    const match = e.message.match(/at position (\d+)/);
    if (match) {
        const pos = parseInt(match[1], 10);
        console.log("Error context (around pos " + pos + "):");
        console.log(f1.substring(Math.max(0, pos - 50), Math.min(f1.length, pos + 50)));
    }
}
