const fs = require('fs');

if (fs.existsSync('scratch/previous_edits.json')) {
    const edits = JSON.parse(fs.readFileSync('scratch/previous_edits.json', 'utf8'));
    let truncatedCount = 0;
    edits.forEach(edit => {
        const str = JSON.stringify(edit);
        const isTruncated = str.toLowerCase().includes('truncated');
        if (isTruncated) {
            truncatedCount++;
            console.log(`Step ${edit.step} is TRUNCATED! Desc:`, edit.description);
        }
    });
    console.log('Total verified truncated edits:', truncatedCount);
} else {
    console.log('File does not exist.');
}
