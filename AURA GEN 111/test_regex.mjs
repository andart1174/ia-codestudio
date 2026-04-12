const testRegex = (code) => {
    const regex = /,?\s*minHeight:\s*['"]100vh['"]\s*,?/g;
    return code.replace(regex, '');
};

const examples = [
    "style={{display:'flex',minHeight:'100vh',background:'red'}}",
    "style={{minHeight:'100vh',background:'red'}}",
    "style={{display:'flex',minHeight:'100vh'}}",
    "style={{ minHeight: '100vh' }}",
    "style={{display:'flex', minHeight: '100vh' , background:'red'}}"
];

examples.forEach(ex => {
    console.log(`Original: ${ex}`);
    console.log(`Modified: ${testRegex(ex)}`);
    console.log('---');
});
