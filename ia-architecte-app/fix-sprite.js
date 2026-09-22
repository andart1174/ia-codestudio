const fs = require('fs');
let fileContent = fs.readFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', 'utf8');

fileContent = fileContent.replace(
  /\.sprite-box \{ width:64px; height:64px; background:url\('data:image\/svg\+xml;utf8,[^']+'\) left center;/g,
  ".sprite-box { width:64px; height:64px; background:url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 256 64\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"16\" y=\"32\" width=\"32\" height=\"32\" fill=\"%23ef4444\"/><rect x=\"80\" y=\"20\" width=\"32\" height=\"44\" fill=\"%23ef4444\"/><rect x=\"144\" y=\"10\" width=\"32\" height=\"54\" fill=\"%23ef4444\"/><rect x=\"208\" y=\"32\" width=\"32\" height=\"32\" fill=\"%23ef4444\"/></svg>') left center; background-size: 256px 64px;"
);

fs.writeFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', fileContent);
