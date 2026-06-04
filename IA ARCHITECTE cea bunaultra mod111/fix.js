const fs = require('fs');
let text = fs.readFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/deep-tech-pro.js', 'utf8');
text = text.replace(/d\\\\\\'Antimatière/g, "d\\'Antimatière")
           .replace(/d\\\\\\'ADN/g, "d\\'ADN")
           .replace(/l\\\\\\'animation/g, "l\\'animation")
           .replace(/d\\\\\\'épissage/g, "d\\'épissage")
           .replace(/l\\\\\\'antimatière/g, "l\\'antimatière")
           .replace(/d\\\\\\'une/g, "d\\'une")
           .replace(/d\\\\'Antimatière/g, "d\\'Antimatière")
           .replace(/d\\\\'ADN/g, "d\\'ADN")
           .replace(/l\\\\'animation/g, "l\\'animation")
           .replace(/d\\\\'épissage/g, "d\\'épissage")
           .replace(/l\\\\'antimatière/g, "l\\'antimatière")
           .replace(/d\\\\'une/g, "d\\'une");
fs.writeFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/deep-tech-pro.js', text);
