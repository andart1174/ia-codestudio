const fs = require('fs');

let code = fs.readFileSync('js/sketch-extruder.js', 'utf8');

// We remove the bad dialNumber_ logic we just inserted.
code = code.replace(`              if (obj.name && obj.name.startsWith('dialNumber_')) {
                  const hour = parseInt(obj.name.split('_')[1]);
                  const model = models.find(m => m.format === 'clock-ultra');
                  const sp = model && model.clockParts ? model.clockParts[0] : null;
                  if (sp) {
                      if (sp.teamMembersEnabled && window._showTeamMember) {
                          window._showTeamMember(hour);
                          return;
                      } else if (sp.worldClockEnabled && window._showWorldClock) {
                          window._showWorldClock(hour);
                          return;
                      } else if (sp.clockToBookEnabled && window._showBookSection) {
                          window._showBookSection(hour);
                          return;
                      }
                  }
              }`, '');

// Inject the correct angle-based click listener for the Editor
const newClickLogic = `
      // Editor dial click logic (similar to exportScene)
      let _editorClickStartX = 0;
      let _editorClickStartY = 0;
      let _editorClickStartTime = 0;
      
      window.addEventListener('pointerdown', (e) => {
          if (e.target !== renderer.domElement) return;
          _editorClickStartX = e.clientX;
          _editorClickStartY = e.clientY;
          _editorClickStartTime = Date.now();
      });
      
      window.addEventListener('pointerup', (e) => {
          if (e.target !== renderer.domElement) return;
          if (transformControl && transformControl.dragging) return;
          
          const dt = Date.now() - _editorClickStartTime;
          const dist = Math.hypot(e.clientX - _editorClickStartX, e.clientY - _editorClickStartY);
          if (dt < 350 && dist < 8) {
              const model = models.find(m => m.format === 'clock-ultra');
              const sp = model && model.clockParts ? model.clockParts[0] : null;
              
              if (!sp) return;
              if (!sp.teamMembersEnabled && !sp.worldClockEnabled && !sp.clockToBookEnabled) return;
              
              const rayc = new THREE.Raycaster();
              const mouse2d = new THREE.Vector2();
              const rect = renderer.domElement.getBoundingClientRect();
              mouse2d.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
              mouse2d.y = -((e.clientY - rect.top) / rect.height) * 2 - 1; // Wait, standard is +1, but let's use the common one
              mouse2d.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
              rayc.setFromCamera(mouse2d, camera);
              
              let faceMesh = null;
              globalGroup.traverse((child) => {
                  if (child.name === 'faceMesh') faceMesh = child;
              });
              
              let hour = null;
              
              if (faceMesh) {
                  const intersects = rayc.intersectObject(faceMesh);
                  if (intersects.length > 0) {
                      const localPt = faceMesh.worldToLocal(intersects[0].point.clone());
                      const angle = Math.atan2(localPt.x, localPt.y);
                      let deg = angle * (180 / Math.PI);
                      if (deg < 0) deg += 360;
                      hour = Math.round(deg / 30);
                      if (hour === 0) hour = 12;
                  }
              }
              
              if (hour === null) {
                  const allIntersects = rayc.intersectObjects(globalGroup.children, true);
                  if (allIntersects.length > 0) {
                      const hit = allIntersects[0];
                      let clockGrp = null;
                      globalGroup.traverse((child) => {
                          if (child.name === 'ClockUltraGroup' || child.name === 'meshGroup') clockGrp = child;
                      });
                      if (clockGrp) {
                          const localPt = clockGrp.worldToLocal(hit.point.clone());
                          const angle = Math.atan2(localPt.x, localPt.y);
                          let deg = angle * (180 / Math.PI);
                          if (deg < 0) deg += 360;
                          hour = Math.round(deg / 30);
                          if (hour === 0) hour = 12;
                      }
                  }
              }
              
              if (hour !== null) {
                  if (sp.teamMembersEnabled && typeof window._showTeamMember === 'function') {
                      window._showTeamMember(hour);
                  } else if (sp.worldClockEnabled && typeof window._showWorldClock === 'function') {
                      window._showWorldClock(hour);
                  } else if (sp.clockToBookEnabled && typeof window._showBookSection === 'function') {
                      window._showBookSection(hour);
                  }
              }
          }
      });
`;

if (!code.includes('_editorClickStartX')) {
    // Append it before the exportScene definition or just anywhere in global scope.
    // I will append it near the end of the file before my previous modals.
    code = code.replace('function ensureEditorTeamModal()', newClickLogic + '\nfunction ensureEditorTeamModal()');
}

fs.writeFileSync('js/sketch-extruder.js', code);
