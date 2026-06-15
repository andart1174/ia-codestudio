const fs = require('fs');
let c = fs.readFileSync('scratch/check_export_syntax.js', 'utf8');
c = c.replace("'custom'", "'cyber_hud'");
fs.writeFileSync('scratch/test_cyber_hud_run.js', c);
require('./test_cyber_hud_run.js');
