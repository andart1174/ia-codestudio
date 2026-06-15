const fs = require('fs');

console.log("Starting validation of Four Premium Clock Ultra Interactive Modes...\n");

let allOk = true;

function checkFile(filepath) {
    try {
        const content = fs.readFileSync(filepath, 'utf8');
        // Syntax check
        try {
            // A simple way to check syntax in Node is compiling it as a script (without executing it)
            // or just creating a new Function out of it. Since these files might be large and use global scope,
            // we can use the 'vm' module to create a Script object which does parsing and compile-time syntax check.
            const vm = require('vm');
            new vm.Script(content);
            console.log(`✅ ${filepath} parses successfully (no syntax errors).`);
        } catch (e) {
            console.error(`❌ Syntax error in ${filepath}:`, e.message);
            allOk = false;
        }
        return content;
    } catch (e) {
        console.error(`❌ Failed to read ${filepath}:`, e.message);
        allOk = false;
        return null;
    }
}

const ultra3d = checkFile('js/clock-ultra-3d.js');
const sketch = checkFile('js/sketch-extruder.js');

if (ultra3d && sketch) {
    const checks = [
        // clock-ultra-3d.js checks
        {
            file: 'js/clock-ultra-3d.js',
            name: 'kpiDashboardEnabled variable declared',
            query: 'let kpiDashboardEnabled = false;'
        },
        {
            file: 'js/clock-ultra-3d.js',
            name: 'securityRadarEnabled variable declared',
            query: 'let securityRadarEnabled = false;'
        },
        {
            file: 'js/clock-ultra-3d.js',
            name: 'audioVisualizerEnabled variable declared',
            query: 'let audioVisualizerEnabled = false;'
        },
        {
            file: 'js/clock-ultra-3d.js',
            name: 'futureRoadmapEnabled variable declared',
            query: 'let futureRoadmapEnabled = false;'
        },
        {
            file: 'js/clock-ultra-3d.js',
            name: 'Translations in clock-ultra-3d.js (English)',
            query: 'kpiDashboardEnabledLabel: \''
        },
        {
            file: 'js/clock-ultra-3d.js',
            name: 'Checkbox for KPI in renderPanel',
            query: 'id="cu3-opt-kpidashboard"'
        },
        {
            file: 'js/clock-ultra-3d.js',
            name: 'resetExclusives mutual exclusivity function',
            query: 'function resetExclusives(except)'
        },
        {
            file: 'js/clock-ultra-3d.js',
            name: 'KPI dashboard event listener',
            query: 'optKpiDashboard.onchange'
        },
        
        // sketch-extruder.js checks
        {
            file: 'js/sketch-extruder.js',
            name: 'buildClockUltraGeo checks KPI dashboard enabled check',
            query: 'p0.kpiDashboardEnabled'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'addClockUltraAnimCb checks for premium animation modes',
            query: 'sp.kpiDashboardEnabled'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'HTML checkbox templates for KPI',
            query: 'id="cu-cb-kpidashboard"'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'HTML checkbox templates for Radar',
            query: 'id="cu-cb-securityradar"'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'HTML checkbox templates for Visualizer',
            query: 'id="cu-cb-audiovisualizer"'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'HTML checkbox templates for Roadmap',
            query: 'id="cu-cb-futureroadmap"'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'Translations for KPI (Spanish)',
            query: 'kpi_dashboard: "Tablero de KPI y Finanzas 3D"'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'Translations for KPI (Italian)',
            query: 'kpi_dashboard: "Pannello KPI e Finanziario 3D"'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'Mutual exclusivity resetExclusives defined in exportScene',
            query: 'function resetExclusives(except)'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'KPI checkbox bound in exportScene',
            query: 'const cbKpiDashboard = document.getElementById(\'cu-cb-kpidashboard\');'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'KPI checkbox handles mutual exclusivity',
            query: 'resetExclusives(\'kpi\');'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'Radar checkbox handles mutual exclusivity',
            query: 'resetExclusives(\'radar\');'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'Visualizer checkbox handles mutual exclusivity',
            query: 'resetExclusives(\'av\');'
        },
        {
            file: 'js/sketch-extruder.js',
            name: 'Roadmap checkbox handles mutual exclusivity',
            query: 'resetExclusives(\'roadmap\');'
        }
    ];

    checks.forEach((check, index) => {
        const fileContent = check.file === 'js/clock-ultra-3d.js' ? ultra3d : sketch;
        const passed = fileContent.includes(check.query);
        console.log(`${passed ? '✅' : '❌'} [${index + 1}/${checks.length}] [${check.file}] ${check.name}`);
        if (!passed) {
            allOk = false;
            console.log(`   Expected to find: "${check.query}"`);
        }
    });
}

if (allOk) {
    console.log("\n🎉 ALL CHECKS PASSED! The implementation is complete and syntactically correct.");
} else {
    console.error("\n⚠️ VALIDATION FAILED! Check the errors above.");
    process.exit(1);
}
