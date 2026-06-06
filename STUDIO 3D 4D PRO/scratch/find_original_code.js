const fs = require('fs');
const readline = require('readline');

const logFile = 'C:\\\\Users\\\\andre\\\\.gemini\\\\antigravity\\\\brain\\\\e78bfdf3-953c-4f3c-b590-371c35852c1c\\\\.system_generated\\\\logs\\\\transcript.jsonl';

async function searchLog() {
    const fileStream = fs.createReadStream(logFile);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    for await (const line of rl) {
        if (line.includes('extractOriginal') || line.includes('find_original_code') || line.includes('print_code')) continue;

        const data = JSON.parse(line);
        if (data.step_index < 5200 && line.includes('sentimentGroup') && line.includes('weatherGroup')) {
            console.log("Found early match at step:", data.step_index, "length:", line.length);
            
            function findText(obj) {
                if (typeof obj === 'string') {
                    if (obj.includes('sentimentGroup') && obj.includes('weatherGroup') && obj.includes('11')) {
                        fs.writeFileSync('scratch/original_recovered_lines.txt', obj, 'utf8');
                        console.log("Successfully extracted original lines to scratch/original_recovered_lines.txt");
                        process.exit(0);
                    }
                } else if (Array.isArray(obj)) {
                    obj.forEach(findText);
                } else if (obj && typeof obj === 'object') {
                    for (const key in obj) {
                        findText(obj[key]);
                    }
                }
            }
            findText(data);
        }
    }
    console.log("No early matches found.");
}

searchLog().catch(console.error);
