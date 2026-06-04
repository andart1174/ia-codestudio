const fs = require('fs');

const d1 = fs.readFileSync('d1.html', 'utf8');
const d2 = fs.readFileSync('d2.html', 'utf8');
const d3 = fs.readFileSync('d3.html', 'utf8');
const d4 = fs.readFileSync('d4.html', 'utf8');

function b64Inject(funcName, htmlContent) {
  let b64 = Buffer.from(htmlContent, 'utf8').toString('base64');
  return `function ${funcName}() { return decodeURIComponent(escape(atob("${b64}"))); }`;
}

let newDockerCode = b64Inject('getDockerCode', d1);
let newDockerfileCode = b64Inject('getDockerfileCode', d2);
let newCicdCode = b64Inject('getCicdCode', d3);
let newNginxCode = b64Inject('getNginxCode', d4);

const path = "c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/devops-studio.js";
let code = fs.readFileSync(path, 'utf8');

// Find the boundaries
let dStart = code.indexOf('function getHTML(');
if (dStart === -1) {
  dStart = code.indexOf('function getDockerCode');
}
let envStart = code.indexOf('function getEnvCode');

if (dStart !== -1 && envStart !== -1) {
  let newCode = code.substring(0, dStart) + 
    newDockerCode + "\n\n" + 
    newDockerfileCode + "\n\n" + 
    newCicdCode + "\n\n" + 
    newNginxCode + "\n\n" + 
    code.substring(envStart);
  
  fs.writeFileSync(path, newCode);
  console.log("Successfully transformed DevOps Studio to pristine Interactive HTML Base64 applications.");
} else {
  console.error("Could not find function indices.");
}
