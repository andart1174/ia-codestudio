const fs = require('fs');

// =============================================
// STEP 1: Add event handlers to clock-ultra-3d.js
// =============================================
{
    const file = 'js/clock-ultra-3d.js';
    let c = fs.readFileSync(file, 'utf8');

    // Add team/world handlers after soundscape binaural handler
    const marker1 = "sldSoundscapeBinaural.oninput = (e) => {\n                soundscapeBinauralVol = parseInt(e.target.value);\n                const valDisp = document.getElementById('cu3-soundscape-binaural-val');\n                if (valDisp) valDisp.textContent = soundscapeBinauralVol + '%';\n                updateSoundscapeVolumes();\n                syncProModel();\n            };\n        }";

    const addition1 = "\n\n        const optTeamMembers = document.getElementById('cu3-opt-teammembers');\n        if (optTeamMembers) {\n            optTeamMembers.onchange = (e) => {\n                teamMembersEnabled = e.target.checked;\n                if (teamMembersEnabled) {\n                    worldClockEnabled = false;\n                    const optWC = document.getElementById('cu3-opt-worldclock');\n                    if (optWC) optWC.checked = false;\n                }\n                syncProModel();\n            };\n        }\n\n        const optWorldClock = document.getElementById('cu3-opt-worldclock');\n        if (optWorldClock) {\n            optWorldClock.onchange = (e) => {\n                worldClockEnabled = e.target.checked;\n                if (worldClockEnabled) {\n                    teamMembersEnabled = false;\n                    const optTM = document.getElementById('cu3-opt-teammembers');\n                    if (optTM) optTM.checked = false;\n                }\n                syncProModel();\n            };\n        }";

    if (c.includes(marker1)) {
        c = c.replace(marker1, marker1 + addition1);
        console.log('OK step1a: handlers added');
    } else {
        console.log('MISS step1a');
    }

    // Fix loadFromModel for team/world
    const marker2 = "clockToBookEnabled = p0.clockToBookEnabled !== undefined ? p0.clockToBookEnabled : false;\n        businessHoursRingEnabled = p0.businessHoursRingEnabled !== undefined ? p0.businessHoursRingEnabled : false;\n        businessHoursStart = p0.businessHoursStart !== undefined ? p0.businessHoursStart : 9;\n        businessHoursEnd = p0.businessHoursEnd !== undefined ? p0.businessHoursEnd : 18;";
    const addition2 = "\n        teamMembersEnabled = p0.teamMembersEnabled !== undefined ? p0.teamMembersEnabled : false;\n        if (p0.teamMembers && Array.isArray(p0.teamMembers)) teamMembers = JSON.parse(JSON.stringify(p0.teamMembers));\n        worldClockEnabled = p0.worldClockEnabled !== undefined ? p0.worldClockEnabled : false;";

    if (c.includes(marker2)) {
        c = c.replace(marker2, marker2 + addition2);
        console.log('OK step1b: loadFromModel updated');
    } else {
        console.log('MISS step1b');
    }

    fs.writeFileSync(file, c, 'utf8');
}

// =============================================
// STEP 2: Update sketch-extruder.js
// =============================================
{
    const file = 'js/sketch-extruder.js';
    let c = fs.readFileSync(file, 'utf8');

    // 2a. Widen pointer condition
    const ptrOld = "(sp.navigatorMenuEnabled || sp.clockToBookEnabled) && e.target === renderer.domElement";
    const ptrNew = "(sp.navigatorMenuEnabled || sp.clockToBookEnabled || sp.teamMembersEnabled || sp.worldClockEnabled) && e.target === renderer.domElement";
    if (c.includes(ptrOld)) { c = c.replace(ptrOld, ptrNew); console.log('OK 2a: pointer condition'); }
    else console.log('MISS 2a');

    // 2b. Add click routing BEFORE clockToBook check
    const clickOld = "                  if (sp.clockToBookEnabled) {\n                          if (window._showBookSection) {\n                              window._showBookSection(hour);";
    const clickNew = "                  if (sp.teamMembersEnabled && window._showTeamMember) {\n                          window._showTeamMember(hour);\n                      } else if (sp.worldClockEnabled && window._showWorldClock) {\n                          window._showWorldClock(hour);\n                      } else if (sp.clockToBookEnabled) {\n                          if (window._showBookSection) {\n                              window._showBookSection(hour);";
    if (c.includes(clickOld)) { c = c.replace(clickOld, clickNew); console.log('OK 2b: click routing'); }
    else console.log('MISS 2b');

    // 2c. Add checkbox UI in exported control panel
    const uiOld = "<!-- Business Hours Ring -->\n               <label style=\"display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;\">\n                   <input type=\"checkbox\" id=\"cu-cb-businesshours\" \\${sp.businessHoursRingEnabled ? 'checked' : ''} />";
    const uiNew = uiOld + "\n\n               <!-- Team Members per Hour -->\n               <label style=\"display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;\">\n                   <input type=\"checkbox\" id=\"cu-cb-teammembers\" \\${sp.teamMembersEnabled ? 'checked' : ''} />\n                   <span data-key=\"teammembers\"></span>\n               </label>\n\n               <!-- World Clock Mode -->\n               <label style=\"display:flex;align-items:center;gap:6px;cursor:pointer;font-size:11px;color:#cbd5e1;margin-bottom:4px;\">\n                   <input type=\"checkbox\" id=\"cu-cb-worldclock\" \\${sp.worldClockEnabled ? 'checked' : ''} />\n                   <span data-key=\"worldclock\"></span>\n               </label>";
    if (c.includes(uiOld)) { c = c.replace(uiOld, uiNew); console.log('OK 2c: UI checkboxes'); }
    else console.log('MISS 2c');

    // 2d. Load UI state for team/world
    const loadOld = "if (cbClockToBook) cbClockToBook.checked = !!sp.clockToBookEnabled;";
    const loadNew = loadOld + "\n      const cbTeamMembers2 = ui.querySelector('#cu-cb-teammembers');\n      const cbWorldClock2 = ui.querySelector('#cu-cb-worldclock');\n      if (cbTeamMembers2) cbTeamMembers2.checked = !!sp.teamMembersEnabled;\n      if (cbWorldClock2) cbWorldClock2.checked = !!sp.worldClockEnabled;";
    if (c.includes(loadOld)) { c = c.replace(loadOld, loadNew); console.log('OK 2d: load UI state'); }
    else console.log('MISS 2d');

    // 2e. Exported event handlers for team/world checkboxes
    const evtOld = "sp.businessHoursRingEnabled = e.target.checked;\n          if (divBusinessHours) divBusinessHours.style.display = sp.businessHoursRingEnabled ? 'block' : 'none';";
    const evtNew = evtOld + "\n\n      const cbTM2 = ui.querySelector('#cu-cb-teammembers');\n      const cbWC2 = ui.querySelector('#cu-cb-worldclock');\n      if (cbTM2) {\n          cbTM2.onchange = (e) => {\n              sp.teamMembersEnabled = e.target.checked;\n              if (sp.teamMembersEnabled) { sp.worldClockEnabled = false; if (cbWC2) cbWC2.checked = false; }\n              rebuildClockUltraGeo();\n          };\n      }\n      if (cbWC2) {\n          cbWC2.onchange = (e) => {\n              sp.worldClockEnabled = e.target.checked;\n              if (sp.worldClockEnabled) { sp.teamMembersEnabled = false; if (cbTM2) cbTM2.checked = false; }\n              rebuildClockUltraGeo();\n          };\n      }";
    if (c.includes(evtOld)) { c = c.replace(evtOld, evtNew); console.log('OK 2e: event handlers'); }
    else console.log('MISS 2e');

    fs.writeFileSync(file, c, 'utf8');
}

console.log('\nAll wiring done.');
