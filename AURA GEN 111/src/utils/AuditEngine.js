export const checkStructuralIntegrity = (code) => {
    const issues = [];
    
    // 1. Check for Balanced Brackets
    const stack = [];
    const pairs = { '{': '}', '(': ')', '[': ']' };
    for (let char of code) {
        if (pairs[char]) {
            stack.push(char);
        } else if (Object.values(pairs).includes(char)) {
            const last = stack.pop();
            if (pairs[last] !== char) {
                issues.push({
                    type: 'SYNTAX',
                    severity: 'CRITICAL',
                    message: 'Mismatched brackets detected. Code structure is broken.',
                    code: 'Mismatched ' + char
                });
                break;
            }
        }
    }
    if (stack.length > 0 && issues.length === 0) {
        issues.push({
            type: 'SYNTAX',
            severity: 'CRITICAL',
            message: 'Unclosed brackets detected. Check your functions and objects.',
            code: 'Unclosed ' + stack[stack.length - 1]
        });
    }

    // 2. Check for Basic Tag Balance (very simple regex check)
    const tags = code.match(/<[a-zA-Z0-9]+|>/g) || [];
    let openTags = 0;
    for (let tag of tags) {
        if (tag.startsWith('<')) openTags++;
        if (tag === '>') openTags--;
    }
    if (openTags !== 0) {
        issues.push({
            type: 'JSX_STRUCTURE',
            severity: 'CRITICAL',
            message: 'Detected unclosed or malformed HTML/JSX tags.',
            code: 'Tag Mismatch'
        });
    }

    // 3. Check for valid React component export
    if (!code.includes('const App =') && !code.includes('function App')) {
        issues.push({
            type: 'SYSTEM',
            severity: 'CRITICAL',
            message: 'Missing "App" component entry point.',
            code: 'Missing App Component'
        });
    }

    // 4. Gibberish Detection (simple heuristic: long strings without spaces/punctuation)
    if (code.match(/[bcdfghjklmnpqrstvwxyz]{7,}/gi)) {
        issues.push({
            type: 'VALIDITY',
            severity: 'CRITICAL',
            message: 'Detected irregular character sequences (Gibberish).',
            code: 'Non-semantic text'
        });
    }

    return issues;
};

export const runAudit = (code) => {
    const issues = [];
    let score = 100;

    // --- PHASE 0: CRITICAL FOUNDATION CHECK ---
    const structuralIssues = checkStructuralIntegrity(code);
    if (structuralIssues.length > 0) {
        return {
            score: 0,
            issues: structuralIssues
        };
    }

    // --- PHASE 1: SEMANTIC AUDIT (Only runs if foundation is solid) ---
    
    // 1. Accessibility: Missing alt on img
    const imgMatches = code.match(/<img(?![^>]*alt=)[^>]*>/gi) || [];
    imgMatches.forEach(match => {
        issues.push({
            type: 'ACCESSIBILITY',
            severity: 'HIGH',
            message: 'Image is missing an "alt" attribute for screen readers.',
            code: match
        });
        score -= 10;
    });

    // 2. Accessibility: Missing aria-label on buttons
    const btnMatches = code.match(/<button(?![^>]*aria-label=)(?![^>]*title=)[^>]*>/gi) || [];
    btnMatches.forEach(match => {
        issues.push({
            type: 'ACCESSIBILITY',
            severity: 'MEDIUM',
            message: 'Button should have an "aria-label" or "title" if it only contains an icon.',
            code: match
        });
        score -= 5;
    });

    // 3. Security: dangerouslySetInnerHTML
    if (code.includes('dangerouslySetInnerHTML')) {
        issues.push({
            type: 'SECURITY',
            severity: 'CRITICAL',
            message: 'Avoid "dangerouslySetInnerHTML" as it can lead to XSS vulnerabilities.',
            code: 'dangerouslySetInnerHTML'
        });
        score -= 20;
    }

    // 4. Security: rel="noopener" on target="_blank"
    const linkMatches = code.match(/<a[^>]*target=["']_blank["'](?![^>]*rel=[^>]*noopener)[^>]*>/gi) || [];
    linkMatches.forEach(match => {
        issues.push({
            type: 'SECURITY',
            severity: 'MEDIUM',
            message: 'Links with target="_blank" should include rel="noopener noreferrer".',
            code: match
        });
        score -= 5;
    });

    // 5. Best Practice: console.log
    if (code.includes('console.log')) {
        issues.push({
            type: 'BEST_PRACTICE',
            severity: 'LOW',
            message: 'Remove "console.log" statements before production.',
            code: 'console.log'
        });
        score -= 2;
    }

    return {
        score: Math.max(0, score),
        issues
    };
};

export const autoFixAudit = (code) => {
    let fixedCode = code;
    fixedCode = fixedCode.replace(/<img(?![^>]*alt=)([^>]*?)>/gi, '<img alt="Descriptive image" $1>');
    fixedCode = fixedCode.replace(/<button(?![^>]*aria-label=)(?![^>]*title=)([^>]*?)>/gi, '<button aria-label="Action" $1>');
    fixedCode = fixedCode.replace(/(<a[^>]*target=["']_blank["'])(?![^>]*rel=)([^>]*?)>/gi, '$1 rel="noopener noreferrer" $2>');
    fixedCode = fixedCode.replace(/console\.log\(.*?\);?/g, '');
    return fixedCode;
};
