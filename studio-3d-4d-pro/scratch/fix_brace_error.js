// scratch/fix_brace_error.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'sketch-extruder.js');
let src = fs.readFileSync(filePath, 'utf8');

// We want to find the specific block at the end of the pointerup handler:
//                       if (window.parent) {
//                           window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
//                       }
//                       }
//                       }
//                   }
//               }
//           }
//       });

// Let's replace the extra closing brace.
// We look for:
//                       if (window.parent) {\r?\n\s*window.parent.postMessage\(\{ type: 'clock-menu-click', hour: hour, anchor: anchor \}, '\*'\);\r?\n\s*\}\r?\n\s*\}\r?\n\s*\}\r?\n\s*\}\r?\n\s*\}\r?\n\s*\}\r?\n\s*\}\);\r?\n

// Actually, let's just locate lines 13360 to 13369 and remove line 13367 (the 13367th line).
const lines = src.split(/\r?\n/);
console.log("Original line 13367:", JSON.stringify(lines[13366])); // 0-indexed is 13366
console.log("Original line 13368:", JSON.stringify(lines[13367])); // 0-indexed is 13367

if (lines[13366].trim() === '}' && lines[13367].trim() === '});') {
    console.log("Found the extra closing brace! Removing it...");
    lines.splice(13366, 1); // remove line 13367 (index 13366)
    
    // Save back with original line endings
    const hasCRLF = src.includes('\r\n');
    const newSrc = lines.join(hasCRLF ? '\r\n' : '\n');
    fs.writeFileSync(filePath, newSrc, 'utf8');
    console.log("Successfully removed the extra brace!");
} else {
    console.log("Braces did not match expected structure at specific indexes. Doing a regex replace instead...");
    // Let's do a safe replacement
    const pattern = /if\s*\(window\.parent\)\s*\{\s*window\.parent\.postMessage\(\{\s*type:\s*'clock-menu-click',\s*hour:\s*hour,\s*anchor:\s*anchor\s*\},\s*'\*'\);\s*\}\s*\}\s*\}\s*\}\s*\}\s*\}\s*\}\);/;
    const match = src.match(pattern);
    if (match) {
        console.log("Regex matched! Replacing...");
        // Replace the 5th closing brace with 4 closing braces
        const replacement = `if (window.parent) {
                          window.parent.postMessage({ type: 'clock-menu-click', hour: hour, anchor: anchor }, '*');
                      }
                      }
                      }
                  }
              }
      });`;
        // Wait, let's count:
        // if (window.parent) { ... } (closed)
        // } (closes sp.navigatorMenuEnabled)
        // } (closes hour !== null)
        // } (closes dt < 350 && dist < 8)
        // } (closes Level 1 if)
        // }); (closes pointerup listener)
        // So that is:
        // } (closes window.parent)
        // } (closes sp.navigatorMenuEnabled)
        // } (closes hour !== null)
        // } (closes dt < 350)
        // } (closes Level 1 if)
        // }); (closes pointerup)
        // Total of 5 closing braces before ');' (including window.parent close)
    } else {
        console.log("Regex did not match. Let's inspect around those lines:");
        for (let i = 13360; i < 13372; i++) {
            console.log(`L${i}: ${JSON.stringify(lines[i-1])}`);
        }
    }
}
