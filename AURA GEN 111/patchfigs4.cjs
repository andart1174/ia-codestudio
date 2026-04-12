const fs = require('fs');

// 1. Patch figure_data.json: remove torus/klein + fix Romanian text
const data = JSON.parse(fs.readFileSync('public/figure_data.json', 'utf8'));

// Remove torus and klein
const cleaned = data.filter(f => f.id !== 'torus' && f.id !== 'klein');

// Fix Romanian text in alien injectable code
const alien = cleaned.find(f => f.id === 'alien');
if (alien && alien.code) {
    alien.code = alien.code
        .replace('EXTRATERESTRU VIU', 'EXTRATERRESTRE VIVANT')
        .replace('AlienViu', 'ExtraterrestreVivant');
    console.log('Alien: Romanian text fixed');
}

// Fix Romanian text in astro injectable code
const astro = cleaned.find(f => f.id === 'astro');
if (astro && astro.code) {
    astro.code = astro.code
        .replace('ASTRONAUT FLOTANT', 'ASTRONAUTE FLOTTANT')
        .replace('AstronautFlotant', 'AstronauteFlottant');
    console.log('Astro: Romanian text fixed');
}

fs.writeFileSync('public/figure_data.json', JSON.stringify(cleaned, null, 2));
console.log('Remaining figures:', cleaned.map(f => f.id).join(', '));
