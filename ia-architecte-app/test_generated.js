const fStr = `[{"name":"manifest.json","icon":"📄","code":"{\n  \"manifest_version\": 3,\n  \"name\": \"My Extension\",\n  \"version\": \"1.0.0\",\n  \"description\": \"A powerful Chrome extension built with Extension Forge\",\n  \"permissions\": [\"activeTab\", \"storage\", \"contextMenus\", \"notifications\"],\n  \"host_permissions\": [\"<all_urls>\"],\n  \"action\": {\n    \"default_popup\": \"popup/popup.html\",\n    \"default_icon\": {\n      \"16\": \"icons/icon16.png\",\n      \"48\": \"icons/icon48.png\",\n      \"128\": \"icons/icon128.png\"\n    },\n    \"default_title\": \"My Extension\"\n  },\n  \"background\": {\n    \"service_worker\": \"background/background.js\"\n  },\n  \"content_scripts\": [\n    {\n      \"matches\": [\"<all_urls>\"],\n      \"js\": [\"content/content.js\"],\n      \"css\": [\"content/content.css\"],\n      \"run_at\": \"document_idle\"\n    }\n  ],\n  \"options_page\": \"options/options.html\",\n  \"icons\": {\n    \"16\": \"icons/icon16.png\",\n    \"48\": \"icons/icon48.png\",\n    \"128\": \"icons/icon128.png\"\n  }\n}"},{"name":"background.js","icon":"⚙️","code":"chrome.runtime.onInstalled.addListener(() => {\n  console.log('Extension installed!');\n  chrome.storage.sync.set({\n    enabled: true,\n    theme: 'dark',\n    notifications: true\n  });\n  chrome.contextMenus.create({\n    id: 'myExtension',\n    title: 'My Extension Action',\n    contexts: ['selection']\n  });\n});\n\nchrome.runtime.onMessage.addListener((message, sender, sendResponse) => {\n  if (message.type === 'GET_DATA') {\n    sendResponse({ data: 'Hello from background!' });\n  }\n  return true;\n});\n\nchrome.contextMenus.onClicked.addListener((info, tab) => {\n  if (info.menuItemId === 'myExtension') {\n    chrome.tabs.sendMessage(tab.id, {\n      type: 'CONTEXT_ACTION',\n      selectedText: info.selectionText\n    });\n  }\n});"}]`;

const b64 = Buffer.from(encodeURIComponent(fStr)).toString('base64');
console.log("b64 built successfully. Length: " + b64.length);

const generatedJS = `
const files = JSON.parse(decodeURIComponent(atob('${b64}')));
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
`;
console.log(generatedJS);
