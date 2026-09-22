const template = `c=c.replace(/&lt;(\\\\\\/?)([a-zA-Z0-9]+)/g, 'test')`;
console.log("Template evaluates to:", template);
try {
  eval("let c = ''; " + template);
  console.log("No syntax error.");
} catch(e) {
  console.log("Syntax Error: " + e.message);
}
