const fs = require('fs');
const data = JSON.parse(fs.readFileSync('public/figure_data.json', 'utf8'));

// Fix Klein: add z to pts so sort by z works
const klein = data.find(f => f.id === 'klein');
if (klein) {
    klein.code = klein.code.replace(
        'pts.push({x:cx+x*sc*p,y:cy+y*sc*p,hue:',
        'pts.push({x:cx+x*sc*p,y:cy+y*sc*p,z:z,hue:'
    );
    console.log('Klein z-fix applied');
}

// Fix Tesseract: replace useEffect keyframe injection with inline <style> tag
const tes = data.find(f => f.id === 'tesseract');
if (tes) {
    // Remove the useEffect that injects styles
    tes.code = tes.code.replace(
        /React\.useEffect\(\(\)=>\{var s=document\.createElement\('style'\);[\s\S]*?document\.head\.appendChild\(s\);\},\[\]\);/,
        ''
    );
    // Wrap return with style tag
    tes.code = tes.code.replace(
        "return(<div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#030712',perspective:700}}>",
        "return(<><style>{'@keyframes tO{from{transform:rotateX(0) rotateY(0) rotateZ(0)}to{transform:rotateX(360deg) rotateY(360deg) rotateZ(180deg)}}@keyframes tI{from{transform:rotateX(0) rotateY(0) rotateZ(0)}to{transform:rotateX(-360deg) rotateY(-180deg) rotateZ(360deg)}}'}</style><div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#030712',perspective:700}}>"
    );
    tes.code = tes.code.replace(
        /\);$/,
        ')</>'
    );
    console.log('Tesseract inline-style applied');
}

// Fix Torus: verify App alias will work (regex fix handles it, just verify code)
const torus = data.find(f => f.id === 'torus');
if (torus) {
    console.log('Torus component name:', torus.code.match(/const ([A-Z][A-Za-z0-9]+)\s*=\s*\(/)?.[1]);
}

// Fix Matrice3D
const mat = data.find(f => f.id === 'matrix3d');
if (mat) {
    console.log('Matrix component name:', mat.code.match(/const ([A-Z][A-Za-z0-9]+)\s*=\s*\(/)?.[1]);
}

fs.writeFileSync('public/figure_data.json', JSON.stringify(data, null, 2));
console.log('Done. File saved.');
