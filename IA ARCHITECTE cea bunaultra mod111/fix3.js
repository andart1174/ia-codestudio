const fs = require('fs');
let fileContent = fs.readFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', 'utf8');

fileContent = fileContent.replace(
  /lb.style.transform = `translateX\(\$\{-percent \* 20\}px\)`/g,
  "lb.style.transform = 'translateX(' + (-percent * 20) + 'px)'"
);
fileContent = fileContent.replace(
  /lm.style.transform = `translateX\(\$\{-percent \* 60\}px\)`/g,
  "lm.style.transform = 'translateX(' + (-percent * 60) + 'px)'"
);
fileContent = fileContent.replace(
  /lf.style.transform = `translateX\(\$\{-percent \* 150\}px\)`/g,
  "lf.style.transform = 'translateX(' + (-percent * 150) + 'px)'"
);

fs.writeFileSync('c:/Users/andre/OneDrive/Bureau/IA ARCHITECTE cea bunaultra/js/game-dev-pro.js', fileContent);
