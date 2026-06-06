const fs = require('fs');
const code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// Check EN translations for section_toast and dial_click_toast
const idx = code.indexOf('section_toast');
if (idx !== -1) {
    console.log("Context around first section_toast:");
    console.log(code.substring(idx - 200, idx + 200));
} else {
    console.log("section_toast NOT found in translations!");
}

// Also check what's in the EN translations section
const enStart = code.indexOf('en: {\n              theme_preset:');
if (enStart !== -1) {
    const enEnd = code.indexOf('\n          },\n          fr:', enStart);
    console.log("\n---EN translations---");
    console.log(code.substring(enStart, enEnd + 10));
}
