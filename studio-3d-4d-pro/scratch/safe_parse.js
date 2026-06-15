const fs = require('fs');

function cleanAndParse(filePath) {
    const raw = fs.readFileSync(filePath, 'utf8');
    // The issue is that the string contains raw newlines in string values, which is invalid in JSON.
    // In JSON, newlines in string values must be escaped as \n.
    // Let's write a parser that parses JSON-like array/objects using eval() after escaping raw newlines,
    // or parse it dynamically.
    // Let's do eval("(" + raw + ")") but we must make sure backslashes are handled.
    try {
        const parsed = eval("(" + raw + ")");
        return parsed;
    } catch (e) {
        console.error(`eval failed for ${filePath}: ${e.message}`);
        // Let's try parsing manually or with a regex
        // Each chunk looks like {"AllowMultiple":..., "EndLine":..., "ReplacementContent":..., "StartLine":..., "TargetContent":...}
        // Let's find matches of {...}
        return null;
    }
}

const steps = [1452, 1520];
steps.forEach(step => {
    const parsed = cleanAndParse(`scratch/step_${step}_raw_chunks.txt`);
    if (parsed) {
        console.log(`Successfully parsed step ${step}`);
        let out = '';
        parsed.forEach((chunk, idx) => {
            out += `\n======================================================\n`;
            out += `CHUNK ${idx + 1}\n`;
            out += `Lines: ${chunk.StartLine} - ${chunk.EndLine}\n`;
            out += `AllowMultiple: ${chunk.AllowMultiple}\n`;
            out += `======================================================\n`;
            out += `--- TARGET CONTENT ---\n${chunk.TargetContent}\n`;
            out += `--- REPLACEMENT CONTENT ---\n${chunk.ReplacementContent}\n`;
        });
        fs.writeFileSync(`scratch/step_${step}_parsed.txt`, out, 'utf8');
        console.log(`Wrote parsed content to scratch/step_${step}_parsed.txt`);
    } else {
        // Let's try to parse via JSON.parse after fixing backslashes
        const raw = fs.readFileSync(`scratch/step_${step}_raw_chunks.txt`, 'utf8');
        // Let's replace control characters
        // A control character error usually means there is a literal tab or newline in the string.
        // We can replace raw newlines within quotes with \n
        let inQuote = false;
        let charEscaped = false;
        let result = '';
        for (let i = 0; i < raw.length; i++) {
            const char = raw[i];
            if (char === '"' && !charEscaped) {
                inQuote = !inQuote;
                result += char;
            } else if (char === '\\' && !charEscaped) {
                charEscaped = true;
                result += char;
            } else {
                if (charEscaped) {
                    charEscaped = false;
                }
                if (inQuote) {
                    if (char === '\n') {
                        result += '\\n';
                    } else if (char === '\r') {
                        result += '\\r';
                    } else if (char === '\t') {
                        result += '\\t';
                    } else {
                        result += char;
                    }
                } else {
                    result += char;
                }
            }
        }
        try {
            const parsed2 = JSON.parse(result);
            console.log(`Successfully parsed step ${step} with manual string character escape`);
            let out = '';
            parsed2.forEach((chunk, idx) => {
                out += `\n======================================================\n`;
                out += `CHUNK ${idx + 1}\n`;
                out += `Lines: ${chunk.StartLine} - ${chunk.EndLine}\n`;
                out += `AllowMultiple: ${chunk.AllowMultiple}\n`;
                out += `======================================================\n`;
                out += `--- TARGET CONTENT ---\n${chunk.TargetContent}\n`;
                out += `--- REPLACEMENT CONTENT ---\n${chunk.ReplacementContent}\n`;
            });
            fs.writeFileSync(`scratch/step_${step}_parsed.txt`, out, 'utf8');
            console.log(`Wrote parsed content to scratch/step_${step}_parsed.txt`);
        } catch (e2) {
            console.error(`manual parse failed for step ${step}: ${e2.message}`);
        }
    }
});
