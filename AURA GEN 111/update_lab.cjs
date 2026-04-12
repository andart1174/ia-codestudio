const fs = require('fs');

const NEW_FIGURES_LIST = [
    { id: 'robot',     cat: 'chars',    icon: '🤖', en: 'Dancing Robot',       fr: 'Robot Dansant',            tech: 'CSS 3D', tc: '#6366f1' },
    { id: 'alien',     cat: 'chars',    icon: '👽', en: 'Living Alien',         fr: 'Extraterrestre Vivant',    tech: 'CSS 3D', tc: '#10b981' },
    { id: 'dragon',    cat: 'chars',    icon: '🐉', en: 'Cosmic Dragon',        fr: 'Dragon Cosmique',          tech: 'CSS 3D', tc: '#ef4444' },
    { id: 'astro',     cat: 'chars',    icon: '🚀', en: 'Floating Astronaut',   fr: 'Astronaute Flottant',      tech: 'CSS',    tc: '#94a3b8' },
    { id: 'cyberdrone',cat: 'chars',    icon: '🛸', en: 'Cyber Drone',          fr: 'Drone Cybernétique',       tech: 'CSS 3D', tc: '#38bdf8' },
    { id: 'jellyfish', cat: 'chars',    icon: '🪼', en: 'Glowing Medusa',       fr: 'Méduse Lumineuse',         tech: 'CSS 3D', tc: '#c084fc' },
    { id: 'cyberheart',cat: 'chars',    icon: '🫀', en: 'Cyber Heart',          fr: 'Coeur Cybernétique',       tech: 'CSS 3D', tc: '#ef4444' },
    { id: 'statue',    cat: 'chars',    icon: '👤', en: 'Phasing Statue',       fr: 'Statue de Phase',          tech: 'CSS 3D', tc: '#94a3b8' },
    { id: 'tesseract', cat: 'geo4d',   icon: '🔷', en: '4D Tesseract',         fr: 'Tesseract 4D',             tech: 'CSS 3D', tc: '#6366f1' },
    { id: 'crystal',   cat: 'geo4d',   icon: '💎', en: 'Crystal Fractal',      fr: 'Cristal Fractal',          tech: 'CSS 3D', tc: '#a78bfa' },
    { id: 'weaver',    cat: 'geo4d',   icon: '🕸️', en: 'Quantum Weaver',       fr: 'Tisseur Quantique',        tech: 'Canvas', tc: '#a78bfa' },
    { id: 'prism',     cat: 'geo4d',   icon: '🌈', en: 'Light Prism',          fr: 'Prisme de Lumière',        tech: 'CSS 3D', tc: '#fff' },
    { id: 'molecule',  cat: 'geo4d',   icon: '🧪', en: 'Molecular Bond',       fr: 'Liaison Moléculaire',      tech: 'CSS 3D', tc: '#4ade80' },
    { id: 'solar',     cat: 'space',    icon: '🪐', en: 'Solar System',         fr: 'Système Solaire',          tech: 'CSS',    tc: '#f59e0b' },
    { id: 'galaxy',    cat: 'space',    icon: '🌌', en: 'Particle Galaxy',      fr: 'Galaxie de Particules',    tech: 'Canvas', tc: '#818cf8' },
    { id: 'nebula',    cat: 'space',    icon: '🌠', en: 'Cosmic Nebula',        fr: 'Nébuleuse Cosmique',       tech: 'CSS',    tc: '#c084fc' },
    { id: 'blackhole', cat: 'space',    icon: '🌑', en: 'Singularity',          fr: 'Singularité',              tech: 'Canvas', tc: '#f8fafc' },
    { id: 'vortex',    cat: 'space',    icon: '🌀', en: 'Time Vortex',          fr: 'Vortex Temporel',          tech: 'Canvas', tc: '#6366f1' },
    { id: 'galaxy2',   cat: 'space',    icon: '🔯', en: 'Stellar Core',         fr: 'Coeur Stellaire',          tech: 'Canvas', tc: '#fde047' },
    { id: 'dna',       cat: 'space',    icon: '🧬', en: 'DNA Helix 3D',         fr: 'Hélice ADN 3D',            tech: 'CSS 3D', tc: '#34d399' },
    { id: 'blob',      cat: 'interact', icon: '🫧', en: 'Morphing Blob',        fr: 'Blob Morphant',            tech: 'CSS',    tc: '#c026d3' },
    { id: 'matrix3d',  cat: 'interact', icon: '💠', en: '3D Matrix',            fr: 'Matrice 3D',               tech: 'Canvas', tc: '#4ade80' },
    { id: 'cube',      cat: 'interact', icon: '🎲', en: 'Exploding Cube',       fr: 'Cube Explosé',             tech: 'CSS 3D', tc: '#fb923c' },
    { id: 'portal',    cat: 'interact', icon: '🌀', en: 'Cosmic Portal',        fr: 'Portail Cosmique',         tech: 'CSS',    tc: '#e879f9' },
    { id: 'gears',     cat: 'interact', icon: '⚙️', en: 'Steampunk Tech',       fr: 'Tech Steampunk',           tech: 'CSS 3D', tc: '#fbbf24' },
    { id: 'hyperspace',cat: 'interact', icon: '🏎️', en: 'Hyper Tunnel',         fr: 'Tunnel Hyper-espace',      tech: 'Canvas', tc: '#60a5fa' },
    { id: 'cave',      cat: 'interact', icon: '🛖', en: 'Crystal Cave',         fr: 'Caverne de Cristal',       tech: 'CSS 3D', tc: '#22d3ee' },
    { id: 'plasma',    cat: 'interact', icon: '🔮', en: 'Plasma Sphere',        fr: 'Sphère de Plasma',         tech: 'Canvas', tc: '#e879f9' },
    { id: 'neuralweb', cat: 'interact', icon: '🧠', en: 'Neural Web',           fr: 'Toile Neuronale',          tech: 'Canvas', tc: '#06b6d4' },
];

const PREVIEWS_EXT = `
const DroneP = () => (
    <div style={{ height: 130, background: '#020617', display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: 400 }}>
        <div style={{ position: 'relative', width: 40, height: 40, background: 'rgba(56,189,248,.1)', border: '1px solid #38bdf8', animation: 'u-rAn 2s ease-in-out infinite' }}>
            {[...Array(4)].map((_,i)=><div key={i} style={{ position:'absolute', width:15, height:2, background:'#38bdf8', left:i%2?40:-15, top:i<2?-5:45 }} />)}
        </div>
    </div>
);
const WeaverP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#030712'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    for(let i=0; i<30; i++) {
        const a=t*.02+i*.4, r=20+Math.sin(t*.05+i)*20;
        ctx.fillStyle = i%2?'#a78bfa':'#6366f1';
        ctx.beginPath(); ctx.arc(cx+Math.cos(a)*r, cy+Math.sin(a)*r, 1.5, 0, Math.PI*2); ctx.fill();
    }
}} />;
const BlackHoleP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(cx,cy,20,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(cx,cy,18,0,Math.PI*2); ctx.fill();
    for(let i=0; i<40; i++) {
        const a=t*.01+i*.5, r=22+i*0.8;
        ctx.fillStyle='rgba(255,255,255,'+(1-i/40)+')';
        ctx.fillRect(cx+Math.cos(a)*r, cy+Math.sin(a)*r*.4, 1.5, 1.5);
    }
}} />;
const JellyP = () => (
    <div style={{ height: 130, background: '#020617', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 40, height: 25, background: 'rgba(192,132,252,.4)', borderRadius: '20px 20px 5px 5px', animation: 'u-asF 2s infinite' }} />
    </div>
);
const GearsP = () => (
    <div style={{ height: 130, background: '#1c1917', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 50, height: 50, borderRadius:'50%', border:'4px dashed #fbbf24', animation: 'u-o1 3s linear infinite' }} />
    </div>
);
const PrismP = () => (
    <div style={{ height: 130, background: '#050505', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 0, height: 0, borderLeft:'25px solid transparent', borderRight:'25px solid transparent', borderBottom:'45px solid rgba(255,255,255,.3)', animation: 'u-o1 4s linear infinite' }} />
    </div>
);
const MoleculeP = () => (
    <div style={{ height: 130, background: '#064e3b', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 30, height: 30, borderRadius:'50%', background: '#ef4444', animation: 'u-aPu 1.5s infinite' }} />
    </div>
);
const VortexP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    for(let i=0; i<15; i++) {
        const r= (i*8 + t)%100;
        ctx.strokeStyle = \`rgba(99,102,241,\${1-r/100})\`;
        ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.stroke();
    }
}} />;
const HeartP = () => (
    <div style={{ height: 130, background: '#111', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: 40, animation: 'u-aPu .6s infinite' }}>🫀</div>
    </div>
);
const HyperP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#000'; ctx.fillRect(0,0,cv.width,cv.height);
    for(let i=0; i<50; i++) {
        const x= (Math.sin(i)*1000 + t*20)%cv.width, y = (Math.cos(i)*1000)%cv.height;
        ctx.fillStyle='#60a5fa'; ctx.fillRect(x,y,2,1);
    }
}} />;
const CaveP = () => (
    <div style={{ height: 130, background: '#083344', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 60, height: 20, background: '#22d3ee', transform:'rotateX(45deg)' }} />
    </div>
);
const PlasmaP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#111'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    ctx.strokeStyle = '#e879f9'; ctx.beginPath(); ctx.arc(cx,cy,40,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+Math.cos(t*.1)*40, cy+Math.sin(t*.1)*40); ctx.stroke();
}} />;
const Galaxy2P = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#020617'; ctx.fillRect(0,0,cv.width,cv.height);
    const cx=cv.width/2, cy=cv.height/2;
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,30); g.addColorStop(0,'#fff'); g.addColorStop(1,'transparent');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,30,0,Math.PI*2); ctx.fill();
}} />;
const StatueP = () => (
    <div style={{ height: 130, background: '#0f172a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: 30, height: 50, background: '#94a3b8', borderRadius: '40% 40% 5% 5%', animation: 'u-tw 2s infinite' }} />
    </div>
);
const NeuralP = () => <CV draw={(ctx, cv, t) => {
    ctx.fillStyle = '#0f172a'; ctx.fillRect(0,0,cv.width,cv.height);
    for(let i=0; i<10; i++) {
        const x= (Math.sin(i*2)*100+100), y = (Math.cos(i*3)*60+65);
        ctx.fillStyle='#06b6d4'; ctx.beginPath(); ctx.arc(x,y,2,0,Math.PI*2); ctx.fill();
    }
}} />;

const PREVIEWS_MAP = { 
    robot: RobotP, alien: AlienP, dragon: DragonP, astro: AstroP, 
    cyberdrone: DroneP, jellyfish: JellyP, cyberheart: HeartP, statue: StatueP,
    tesseract: TesseractP, crystal: CrystalP, weaver: WeaverP, prism: PrismP, molecule: MoleculeP,
    solar: SolarP, galaxy: GalaxyP, nebula: NebulaP, blackhole: BlackHoleP, vortex: VortexP, galaxy2: Galaxy2P, dna: DNAP, 
    blob: BlobP, matrix3d: MatriceP, cube: CubeExP, portal: PortalP, 
    gears: GearsP, hyperspace: HyperP, cave: CaveP, plasma: PlasmaP, neuralweb: NeuralP
};
`;

const labPath = 'src/components/Universe3DLab.jsx';
let content = fs.readFileSync(labPath, 'utf8');

// 1. Insert new preview components before PREVIEWS definition
content = content.replace(/const PREVIEWS = \{[^}]*\};/s, PREVIEWS_EXT);

// 2. Update FIGURES array
const figuresStr = 'const FIGURES = ' + JSON.stringify(NEW_FIGURES_LIST, null, 4) + ';';
content = content.replace(/const FIGURES = \[[\s\S]*?\];/s, figuresStr);

// 3. Update count label logic just in case
content = content.replace(/\{FIGURES\.length\} \{isFr \? 'figures' : 'figures'\}/g, "{FIGURES.length} {isFr ? 'Modèles 3D' : '3D Models'}");

fs.writeFileSync(labPath, content);
console.log('Updated Universe3DLab.jsx with 15 new figures and previews.');
