const fs = require('fs');

const filePath = 'js/sketch-extruder.js';
let code = fs.readFileSync(filePath, 'utf8');

const target = `      if (cuLangSelect) {
          cuLangSelect.value = lang;
          cuLangSelect.onchange = (e) => {
              applyLanguage(e.target.value);
          };
      }`;

const replacement = `      if (cuLangSelect) {
          cuLangSelect.value = lang;
          cuLangSelect.onchange = (e) => {
              applyLanguage(e.target.value);
          };
      }
      applyLanguage(lang);`;

if (code.includes(target)) {
    code = code.split(target).join(replacement);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log("Successfully added applyLanguage(lang); to startup of Clock Ultra in sketch-extruder.js!");
} else {
    console.error("Target block not found in sketch-extruder.js!");
}
