const base64 = Buffer.from(encodeURIComponent(JSON.stringify([{name:"test.js", icon:"X", code:"console.log('hi');"}]))).toString("base64");
const testScript = `
const files = JSON.parse(decodeURIComponent(atob('${base64}')));
let cur=0;
function hl(code,name){
  let c=code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  if(name.endsWith(".json")){
    c=c.replace(/"([^"]+)":/g,'<span class="str">"$1"</span>:').replace(/: "([^"]+)"/g,': <span class="val">"$1"</span>');
  }else if(name.endsWith(".html")){
    c=c.replace(/&lt;(\/?)([a-zA-Z0-9]+)/g,'&lt;$1<span class="tag">$2</span>').replace(/([a-zA-Z0-9-]+)=/g,'<span class="attr">$1</span>=').replace(/"([^"]*)"/g,'<span class="str">"$1"</span>');
  }else{
    c=c.replace(/(import|export|from|const|let|async|await|return|function|default|null|false|true|chrome|console|document|window|alert|if|else|switch|case|break)\\b/g,'<span class="kw">$1</span>');
    c=c.replace(/\\/\\/.*$/gm,'<span class="cm">$&</span>');
    c=c.replace(/\\'([^\\']*)\\'/g,'<span class="str">\\'$1\\'</span>').replace(/"([^"]*)"/g,'<span class="str">"$1"</span>');
  }
  return c;
}
console.log("No syntax errors. Files:", files);
`;

require('fs').writeFileSync("test_syntax.js", testScript);
