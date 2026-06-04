try {
  eval("let c = ''; c=c.replace(/&lt;(\/?)([a-zA-Z0-9]+)/g, 'test')");
  console.log("No syntax error.");
} catch(e) {
  console.log("Syntax Error: " + e.message);
}
