const fs = require('fs');
const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/devops-studio.js";
let code = fs.readFileSync(path, 'utf8');

// The syntax error is at ${{ github.repository }} and other ${{ env... }} variables inside getCicdCode
code = code.replace(/\$\{\{ /g, "\\${{ ");

fs.writeFileSync(path, code);
console.log("Fixed escaping of ${ in template literals.");
