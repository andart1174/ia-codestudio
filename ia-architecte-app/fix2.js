const fs = require('fs');
let text = fs.readFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', 'utf8');
text = text.replace(/d\\\\\\'un/g, "d\\'un").replace(/d\\\\'un/g, "d\\'un");
fs.writeFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', text);
