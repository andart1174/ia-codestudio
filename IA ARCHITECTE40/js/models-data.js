'use strict';
/* IA Architecte — 3D Models Data (15 Complex Three.js Models) */

const MODELS_DATA = [

/* 1 ── AURA BOT (ROBOT) ────────────────────────────── */
{icon:'🤖', en:'Aura Bot', fr:'Aura Bot',
 desc_en:'Futuristic hover-bot with glowing eyes and hovering parts',
 desc_fr:'Robot volant futuriste avec yeux porteurs et pièces flottantes',
 code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Aura Bot</title>
<style>body{margin:0;overflow:hidden;background:#030712}canvas{display:block}</style>
<script src="js/three.min.js"></script></head><body><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const g=new THREE.Group();s.add(g);
const body=new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshStandardMaterial({color:0x3b82f6,metalness:0.8,roughness:0.2}));g.add(body);
const eyeL=new THREE.Mesh(new THREE.SphereGeometry(0.12,16,16),new THREE.MeshBasicMaterial({color:0x60a5fa}));eyeL.position.set(0.4,0.3,0.8);body.add(eyeL);
const eyeR=eyeL.clone();eyeR.position.set(-0.4,0.3,0.8);body.add(eyeR);
const ring=new THREE.Mesh(new THREE.TorusGeometry(1.4,0.05,16,100),new THREE.MeshStandardMaterial({color:0x1d4ed8,emissive:0x1e40af}));ring.rotation.x=Math.PI/2;g.add(ring);
const light=new THREE.PointLight(0x60a5fa,2,10);light.position.set(2,2,2);s.add(light);s.add(new THREE.AmbientLight(0x404040));
c.position.z=5;
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);g.rotation.y+=0.01;body.position.y=Math.sin(Date.now()*0.002)*0.2;ring.rotation.z+=0.05;r.render(s,c);}anim();
</script></body></html>`},

/* 2 ── ZORGON ALIAN (ALIEN) ────────────────────────── */
{icon:'👽', en:'Zorgon Alian', fr:'Alien Zorgon',
 desc_en:'Slim extraterrestrial with long limbs and fluid motion',
 desc_fr:'Extraterrestre svelte avec longs membres et mouvement fluide',
 code:`<!DOCTYPE html><html><head><meta charset="UTF-8"/><title>Zorgon Alian</title>
<style>body{margin:0;overflow:hidden;background:#050505}canvas{display:block}</style>
<script src="js/three.min.js"></script></head><body><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0x10b981,emissive:0x064e3b,roughness:0,metalness:0.5});
const head=new THREE.Group(); s.add(head);
const hMain=new THREE.Mesh(new THREE.SphereGeometry(0.5,16,16),mat); hMain.scale.set(1,1.5,0.8); head.add(hMain);
const eye=new THREE.Mesh(new THREE.SphereGeometry(0.6,16,16),new THREE.MeshBasicMaterial({color:0x000}));eye.scale.set(1.1,0.3,0.5);eye.position.set(0,0.4,0.3);head.add(eye);
const arms=[];for(let i=0;i<4;i++){const a=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.08,2.2),mat);a.position.y=-0.5;s.add(a);arms.push(a);}
s.add(new THREE.PointLight(0x10b981,5,15));s.add(new THREE.AmbientLight(0x222));c.position.z=6;
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  head.rotation.y=Math.sin(Date.now()*0.001)*0.5;
  arms.forEach((a,i)=>{a.position.x=Math.cos(i*Math.PI/2+Date.now()*0.001)*1.5;a.position.z=Math.sin(i*Math.PI/2+Date.now()*0.001)*1.5;a.rotation.z=Math.sin(Date.now()*0.002+i)*0.8;});
  r.render(s,c);
}anim();
</script></body></html>`},

/* 3 ── CYBER TITAN (MECHA) ─────────────────────────── */
{icon:'🦾', en:'Cyber Titan', fr:'Cyber Titan',
 desc_en:'Mechanical giant with moving plates and industrial lighting',
 desc_fr:'Géant mécanique avec plaques mobiles et éclairage industriel',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#111"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const iron=new THREE.MeshStandardMaterial({color:0x888888,metalness:1,roughness:0.3});
const body=new THREE.Mesh(new THREE.BoxGeometry(1.5,2,1),iron);s.add(body);
const head=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.8,0.8),iron);head.position.y=1.5;body.add(head);
const shoulderL=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.8,0.8),iron);shoulderL.position.set(1.5,0.5,0);body.add(shoulderL);
const shoulderR=shoulderL.clone();shoulderR.position.set(-1.5,0.5,0);body.add(shoulderR);
s.add(new THREE.DirectionalLight(0xff0000,5));s.add(new THREE.AmbientLight(0x444));c.position.set(0,2,8);c.lookAt(0,1,0);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  body.rotation.y+=0.005;shoulderL.rotation.x+=0.02;shoulderR.rotation.x-=0.02;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 4 ── BLOB HERO (CARTOON) ─────────────────────────── */
{icon:'💧', en:'Blob Hero', fr:'Blob Héros',
 desc_en:'Soft-body physics character with squash and stretch motion',
 desc_fr:'Personnage à physique "soft-body" avec rebond et étirement',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#fee2e2"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({alpha:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const blob=new THREE.Mesh(new THREE.IcosahedronGeometry(1,4),new THREE.MeshPhongMaterial({color:0xf43f5e,shininess:100}));s.add(blob);
const eyeL=new THREE.Mesh(new THREE.SphereGeometry(0.15),new THREE.MeshBasicMaterial({color:0xfff}));eyeL.position.set(0.4,0.3,0.8);blob.add(eyeL);
const pupilL=new THREE.Mesh(new THREE.SphereGeometry(0.07),new THREE.MeshBasicMaterial({color:0x000}));pupilL.position.set(0,0,0.1);eyeL.add(pupilL);
const eyeR=eyeL.clone();eyeR.position.set(-0.4,0.3,0.8);blob.add(eyeR);
s.add(new THREE.PointLight(0xffffff,5,15));c.position.z=5;
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  const time = Date.now() * 0.005;
  blob.scale.y = 1 + Math.sin(time) * 0.2;
  blob.scale.x = blob.scale.z = 1 - Math.sin(time) * 0.1;
  blob.position.y = Math.abs(Math.sin(time*0.5)) * 2 - 1;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 5 ── NEON KNIGHT (HERO) ──────────────────────────── */
{icon:'⚔️', en:'Neon Knight', fr:'Chevalier Néon',
 desc_en:'Glowing armored hero with an energy sword effect',
 desc_fr:'Héros en armure lumineuse avec effet épée laser',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0x222,emissive:0x3b82f6,emissiveIntensity:0.5});
const body=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.4,2),mat);s.add(body);
const sword=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,3),new THREE.MeshBasicMaterial({color:0x60a5fa}));
sword.position.set(1.5,0.5,1);sword.rotation.z=Math.PI/4;s.add(sword);
s.add(new THREE.PointLight(0x3b82f6,10,20));c.position.set(0,1,6);c.lookAt(0,0,0);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  sword.position.y=0.5+Math.sin(Date.now()*0.01)*0.2;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 6 ── SPIDER DRONE (ROBOT) ────────────────────────── */
{icon:'🕷️', en:'Spider Drone', fr:'Drone Araignée',
 desc_en:'Multi-legged security robot with walking animation',
 desc_fr:'Robot de sécurité multi-pattes avec animation de marche',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#0a0a0a"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0xff7e00,metalness:0.9,roughness:0.1});
const core=new THREE.Mesh(new THREE.SphereGeometry(0.8,16,16),mat);s.add(core);
const legs=[];for(let i=0;i<6;i++){
  const l=new THREE.Group();s.add(l);const seg1=new THREE.Mesh(new THREE.BoxGeometry(0.2,1,0.2),mat);seg1.position.y=-0.5;l.add(seg1);
  l.rotation.y=(i/6)*Math.PI*2;legs.push(l);
}
  const pLight=new THREE.PointLight(0xffffff,20,50);pLight.position.set(5,10,5);s.add(pLight);c.position.set(0,3,7);c.lookAt(0,0,0);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  legs.forEach((l,i)=>{l.rotation.x=Math.sin(Date.now()*0.005+i)*0.5;});
  r.render(s,c);
}anim();
</script></body></html>`},

/* 7 ── CRYSTAL GOLEM (MYTHICAL) ────────────────────── */
{icon:'💎', en:'Crystal Golem', fr:'Golem de Cristal',
 desc_en:'Floating crystalline shards forming a powerful humanoid entity',
 desc_fr:'Éclats de cristal flottants formant une entité humanoïde',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#020617"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshPhongMaterial({color:0x0ea5e9,transparent:true,opacity:0.8,shininess:100});
const shards=[];for(let i=0;i<30;i++){
  const sh=new THREE.Mesh(new THREE.BoxGeometry(Math.random(),Math.random(),Math.random()),mat);
  sh.position.set(Math.random()*4-2,Math.random()*4-2,Math.random()*4-2);s.add(sh);shards.push(sh);
}
s.add(new THREE.PointLight(0x0ea5e9,10,20));c.position.z=7;
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  shards.forEach(sh=>{sh.rotation.x+=0.01;sh.rotation.y+=0.02;sh.position.y+=Math.sin(Date.now()*0.001)*0.005;});
  r.render(s,c);
}anim();
</script></body></html>`},

/* 8 ── COSMIC VOYAGER (ASTRONAUT) ──────────────────── */
{icon:'👨‍🚀', en:'Cosmic Voyager', fr:'Voyageur Cosmique',
 desc_en:'Astronaut with a rotating helmet and jetpack particle flames',
 desc_fr:'Astronaute avec casque rotatif et flammes de jetpack',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const suit=new THREE.Mesh(new THREE.BoxGeometry(1.5,2,1),new THREE.MeshStandardMaterial({color:0xffffff}));s.add(suit);
const helm=new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshStandardMaterial({color:0xdddddd,metalness:1}));helm.position.y=1.5;s.add(helm);
const visor=new THREE.Mesh(new THREE.SphereGeometry(0.8,16,16),new THREE.MeshBasicMaterial({color:0x222}));visor.scale.set(1.1,0.6,0.6);visor.position.z=0.4;helm.add(visor);
s.add(new THREE.DirectionalLight(0xffffff,2));c.position.set(0,2,8);c.lookAt(0,1,0);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  helm.rotation.y=Math.sin(Date.now()*0.001);
  suit.position.y=Math.sin(Date.now()*0.002)*0.1;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 9 ── BIO-BEAST (CREATURE) ────────────────────────── */
{icon:'🐉', en:'Bio-Beast', fr:'Bio-Bête',
 desc_en:'Quadrupedal organism with pulsing scales and organic motion',
 desc_fr:'Organisme quadrupède avec écailles pulsantes et mouvement organique',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#062006"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.CylinderGeometry(0.8,0.8,3,16),new THREE.MeshStandardMaterial({color:0x334411}));body.rotation.z=Math.PI/2;s.add(body);
for(let i=0;i<4;i++){const l=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.1,2),new THREE.MeshStandardMaterial({color:0x223300}));l.position.set(i<2?1.2:-1.2,-1,i%2?0.8:-0.8);s.add(l);}
s.add(new THREE.PointLight(0x55ff00,10,20));c.position.set(5,3,8);c.lookAt(0,0,0);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  body.rotation.x=Math.sin(Date.now()*0.002)*0.1;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 10 ── STEAM GUARD (STEAMPUNK) ────────────────────── */
{icon:'⚙️', en:'Steam Guard', fr:'Garde Vapeur',
 desc_en:'Brass robot with rotating gears and high-pressure steam pipes',
 desc_fr:'Robot en laiton avec engrenages rotatifs et tuyaux à vapeur',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#1e1b18"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0xa16207,metalness:1,roughness:0.3});
const body=new THREE.Mesh(new THREE.BoxGeometry(2,2.5,1.5),mat);s.add(body);
const gear=new THREE.Mesh(new THREE.CylinderGeometry(0.8,0.8,0.2,12),mat);gear.position.z=0.8;body.add(gear);
const pLight=new THREE.PointLight(0xff9900,30,50);pLight.position.set(5,5,5);s.add(pLight);c.position.set(4,3,8);c.lookAt(0,0,0);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  gear.rotation.y+=0.05;body.rotation.y+=0.005;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 11 ── SHADOW STALKER (HERO) ──────────────────────── */
{icon:'👤', en:'Shadow Stalker', fr:'Rôdeur d\'Ombre',
 desc_en:'Dark, semi-transparent hero with a mysterious trail effect',
 desc_fr:'Héros sombre et semi-transparent avec effet de traînée mystérieux',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshBasicMaterial({color:0x333,transparent:true,opacity:0.5}));s.add(body);
const core=new THREE.Mesh(new THREE.SphereGeometry(0.4),new THREE.MeshBasicMaterial({color:0x6366f1}));body.add(core);
c.position.z=5;
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  const t=Date.now()*0.002;
  body.position.set(Math.cos(t)*2,Math.sin(t)*1.5,Math.sin(t*0.5)*2);
  r.render(s,c);
}anim();
</script></body></html>`},

/* 12 ── ELECTRO SPRITE (SPARK) ─────────────────────── */
{icon:'⚡', en:'Electro Sprite', fr:'Sprite Électro',
 desc_en:'Buzzing lightning spark with dynamic electricity arcs',
 desc_fr:'Étincelle électrique bourdonnante avec arcs dynamiques',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#080c14;overflow:hidden;"><script>
(function init(){
  if(!window.THREE && window.parent && window.parent.THREE) window.THREE = window.parent.THREE;
  if(!window.THREE){ setTimeout(init, 50); return; }
  const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight||1,0.1,1000);
  const r=new THREE.WebGLRenderer({antialias:true});r.setSize(window.innerWidth||800,window.innerHeight||600);document.body.appendChild(r.domElement);
  const star=new THREE.Mesh(new THREE.IcosahedronGeometry(0.5,1),new THREE.MeshBasicMaterial({color:0xfde047}));s.add(star);
  const light=new THREE.PointLight(0xfde047,50,30);light.position.set(2,2,2);s.add(light);
  s.add(new THREE.AmbientLight(0xffffff,0.8));c.position.z=5;
  function anim(){requestAnimationFrame(anim);star.scale.setScalar(1 + Math.random()*0.3);r.render(s,c);}anim();
  window.onresize=()=>{ const nw=window.innerWidth||800,nh=window.innerHeight||600;c.aspect=nw/nh;c.updateProjectionMatrix();r.setSize(nw,nh); };
})();
</script></body></html>`},

/* 13 ── AQUA SENTINEL (WATER) ──────────────────────── */
{icon:'🌊', en:'Aqua Sentinel', fr:'Sentinelle Aqua',
 desc_en:'Liquid humanoid with internal wave simulations and reflections',
 desc_fr:'Humanoïde liquide avec simulations de vagues internes',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#083344"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const water=new THREE.Mesh(new THREE.SphereGeometry(1.5,64,64),new THREE.MeshPhongMaterial({color:0x0ea5e9,transparent:true,opacity:0.6,shininess:150}));s.add(water);
const pLight=new THREE.PointLight(0xffffff,30,50);pLight.position.set(0,5,5);s.add(pLight);c.position.z=6;
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  water.rotation.y+=0.01; water.scale.y=1+Math.sin(Date.now()*0.002)*0.05;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 14 ── DRAKE MINI (DRAGON) ────────────────────────── */
{icon:'🐲', en:'Drake Mini', fr:'Mini Drake',
 desc_en:'Small dragon that flaps its wings and breathes fire particles',
 desc_fr:'Petit dragon qui bat des ailes et crache des particules de feu',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#1a0000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.4,2.5,16),new THREE.MeshStandardMaterial({color:0x991b1b}));s.add(body);
const wingL=new THREE.Mesh(new THREE.PlaneGeometry(2,1.5),new THREE.MeshBasicMaterial({color:0x7f1d1d,side:THREE.DoubleSide}));wingL.position.set(1,0.5,0);s.add(wingL);
const wingR=wingL.clone();wingR.position.set(-1,0.5,0);s.add(wingR);
s.add(new THREE.PointLight(0xff0000,10,25));c.position.set(0,2,7);c.lookAt(0,0,0);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  const t=Date.now()*0.01; wingL.rotation.y=Math.sin(t)*0.8; wingR.rotation.y=-Math.sin(t)*0.8;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 15 ── HOLO GUARDIAN (HOLOGRAM) ───────────────────── */
{icon:'📺', en:'Holo Guardian', fr:'Gardien Holo',
 desc_en:'Glitchy holographic warrior with scan-line effects and flickers',
 desc_fr:'Guerrier holographique glitché avec effets de lignes',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshBasicMaterial({color:0x22d3ee,wireframe:true,transparent:true,opacity:0.6});
const body=new THREE.Mesh(new THREE.CylinderGeometry(1,0.5,3,8),mat);s.add(body);
const head=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),mat);head.position.y=2;body.add(head);
c.position.set(0,1,7);
window.onresize=()=>{c.aspect=window.innerWidth/window.innerHeight;c.updateProjectionMatrix();r.setSize(window.innerWidth,window.innerHeight);};
function anim(){requestAnimationFrame(anim);
  body.rotation.y+=0.02; mat.opacity=0.3+Math.random()*0.4;
  r.render(s,c);
}anim();
</script></body></html>`},

/* 16 ── CYBER NINJA (HERO) ─────────────────────────── */
{icon:'🥷', en:'Cyber Ninja', fr:'Ninja Cyber',
 desc_en:'Agile hero with neon katanas and high-speed motion trails',
 desc_fr:'Héros agile cuit avec katanas néon et traînées de vitesse',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#030712"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0x111,roughness:0,metalness:1});
const body=new THREE.Mesh(new THREE.BoxGeometry(0.8,2,0.4),mat);s.add(body);
const l1=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,2.5),new THREE.MeshBasicMaterial({color:0x3b82f6}));l1.position.set(0.6,0,0);l1.rotation.z=0.4;body.add(l1);
const l2=l1.clone();l2.position.set(-0.6,0,0);l2.rotation.z=-0.4;body.add(l2);
const pLight=new THREE.PointLight(0xff7e00,50,50);pLight.position.set(5,10,5);s.add(pLight);s.add(new THREE.AmbientLight(0x222,2));c.position.set(5,4,10);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);body.rotation.y+=0.05;body.position.y=Math.sin(Date.now()*0.01)*0.2;r.render(s,c);}anim();
</script></body></html>`},

/* 17 ── TITAN MECH (ROBOT) ─────────────────────────── */
{icon:'🏗️', en:'Titan Mech', fr:'Titan Mech',
 desc_en:'Heavy industrial walker with hydraulic pistons and rotating saws',
 desc_fr:'Marcheur industriel lourd avec pistons et scies rotatives',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#1e1b18"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const iron=new THREE.MeshStandardMaterial({color:0x444,metalness:1,roughness:0.3});
const core=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),iron);s.add(core);
const armL=new THREE.Mesh(new THREE.BoxGeometry(0.5,3,0.5),iron);armL.position.set(2,0,0);core.add(armL);
const armR=armL.clone();armR.position.set(-2,0,0);core.add(armR);
s.add(new THREE.DirectionalLight(0xff7e00,5));s.add(new THREE.AmbientLight(0x222));c.position.set(5,4,10);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);core.rotation.y+=0.01;armL.rotation.x+=0.02;armR.rotation.x-=0.02;r.render(s,c);}anim();
</script></body></html>`},

/* 18 ── GREY ALIEN (ALIEN) ─────────────────────────── */
{icon:'🛸', en:'Grey Visitor', fr:'Visiteur Gris',
 desc_en:'Classic extraterrestrial with large black eyes and silver skin',
 desc_fr:'Extraterrestre classique avec grands yeux noirs et peau argentée',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const skin=new THREE.MeshStandardMaterial({color:0xcccccc,roughness:0.2});
const head=new THREE.Mesh(new THREE.SphereGeometry(1,32,32),skin);head.scale.set(1,1.3,0.9);s.add(head);
const eyeL=new THREE.Mesh(new THREE.SphereGeometry(0.5,16,16),new THREE.MeshBasicMaterial({color:0x000}));eyeL.position.set(0.4,0.3,0.7);head.add(eyeL);
const eyeR=eyeL.clone();eyeR.position.set(-0.4,0.3,0.7);head.add(eyeR);
const pLight=new THREE.PointLight(0xffffff,30,50);pLight.position.set(2,2,5);s.add(pLight);c.position.z=5;
function anim(){requestAnimationFrame(anim);head.rotation.y=Math.sin(Date.now()*0.001);r.render(s,c);}anim();
</script></body></html>`},

/* 19 ── HOVER BIKE (VEHICLE) ───────────────────────── */
{icon:'🏍️', en:'Hover Bike', fr:'Moto Volante',
 desc_en:'Sleek futuristic bike with blue anti-gravity glow rings',
 desc_fr:'Moto futuriste avec anneaux bleus anti-gravité',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#050505"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.BoxGeometry(3,0.8,0.8),new THREE.MeshStandardMaterial({color:0x111}));s.add(body);
const engine=new THREE.Mesh(new THREE.TorusGeometry(0.6,0.1,16,100),new THREE.MeshBasicMaterial({color:0x00f}));engine.rotation.y=Math.PI/2;engine.position.x=-1.5;body.add(engine);
const pLight=new THREE.PointLight(0x00f,50,50);pLight.position.set(0,10,10);s.add(pLight);c.position.set(4,2,6);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);body.position.y=Math.sin(Date.now()*0.003)*0.2;engine.rotation.z+=0.1;r.render(s,c);}anim();
</script></body></html>`},

/* 20 ── ANCIENT GOLEM (MYTH) ───────────────────────── */
{icon:'🪨', en:'Ancient Golem', fr:'Golem Ancien',
 desc_en:'Living monolith made of floating rocks with lava glowing cracks',
 desc_fr:'Monolithe vivant de roche flottante avec fissures de lave',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const rocks=[];for(let i=0;i<10;i++){
  const b=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshStandardMaterial({color:0x333,emissive:0xff4400,emissiveIntensity:0.2}));
  b.position.set(Math.random()*2-1,i*1.2-5,Math.random()*2-1);s.add(b);rocks.push(b);
}
s.add(new THREE.PointLight(0xff4400,10,20));c.position.set(8,0,12);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);rocks.forEach((b,i)=>{b.rotation.x+=0.01;b.rotation.y+=0.02;b.position.x+=Math.sin(Date.now()*0.001+i)*0.01;});r.render(s,c);}anim();
</script></body></html>`},

/* 21 ── KRAKEN (CREATURE) ──────────────────────────── */
{icon:'🦑', en:'Abyssal Kraken', fr:'Kraken Abyssal',
 desc_en:'Giant bioluminescent squid with multiple waving tentacles',
 desc_fr:'Poulpe géant bioluminescent avec tentacules ondulants',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#001"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const head=new THREE.Mesh(new THREE.SphereGeometry(1.5,32,32),new THREE.MeshStandardMaterial({color:0x004,emissive:0x00f}));s.add(head);
const tents=[];for(let i=0;i<8;i++){const t=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.01,6),new THREE.MeshStandardMaterial({color:0x004}));t.position.y=-3.5;const g=new THREE.Group();g.rotation.z=i*Math.PI/4;g.add(t);s.add(g);tents.push(t);}
const pLight=new THREE.PointLight(0x00f,50,50);pLight.position.set(5,5,5);s.add(pLight);c.position.z=12;
function anim(){requestAnimationFrame(anim);tents.forEach((t,i)=>{t.rotation.x=Math.sin(Date.now()*0.002+i)*0.5;});r.render(s,c);}anim();
</script></body></html>`},

/* 22 ── VOID WALKER (ENTITY) ───────────────────────── */
{icon:'🌌', en:'Void Walker', fr:'Rôdeur du Vide',
 desc_en:'Dark entity surrounded by swirling space dust and particles',
 desc_fr:'Entité sombre entourée de poussière spatiale tourbillonnante',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const pG=new THREE.BufferGeometry();const pos=[];for(let i=0;i<2000;i++)pos.push(Math.random()*10-5,Math.random()*10-5,Math.random()*10-5);pG.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));
const part=new THREE.Points(pG,new THREE.PointsMaterial({color:0x8b5cf6,size:0.05}));s.add(part);
const core=new THREE.Mesh(new THREE.SphereGeometry(1,32,32),new THREE.MeshBasicMaterial({color:0x000}));s.add(core);
c.position.z=8;
function anim(){requestAnimationFrame(anim);part.rotation.y+=0.01;part.rotation.z+=0.005;r.render(s,c);}anim();
</script></body></html>`},

/* 23 ── SOLAR PHOENIX (CREATURE) ───────────────────── */
{icon:'🦅', en:'Solar Phoenix', fr:'Phénix Solaire',
 desc_en:'Majestic fire bird with glowing wings and particle trails',
 desc_fr:'Oiseau de feu majestueux avec ailes luminescentes',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#100"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.SphereGeometry(0.8),new THREE.MeshBasicMaterial({color:0xff7e00}));s.add(body);
const wingL=new THREE.Mesh(new THREE.PlaneGeometry(3,1.5),new THREE.MeshBasicMaterial({color:0xff4400,side:2,transparent:true,opacity:0.8}));wingL.position.set(2,0,0);s.add(wingL);
const wingR=wingL.clone();wingR.position.set(-2,0,0);s.add(wingR);
s.add(new THREE.PointLight(0xff7e00,10,20));c.position.z=8;
function anim(){requestAnimationFrame(anim);const t=Date.now()*0.005;wingL.rotation.y=Math.sin(t)*0.8;wingR.rotation.y=-Math.sin(t)*0.8;body.position.y=Math.sin(t*0.5)*0.5;r.render(s,c);}anim();
</script></body></html>`},

/* 24 ── IRON KNIGHT (HERO) ─────────────────────────── */
{icon:'🛡️', en:'Iron Knight', fr:'Chevalier de Fer',
 desc_en:'Classic armored warrior with a glowing blue visor',
 desc_fr:'Guerrier médiéval en armure avec visière bleue lumineuse',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#222"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0x888,metalness:1,roughness:0.2});
const body=new THREE.Mesh(new THREE.CylinderGeometry(0.7,0.7,2.5,16),mat);s.add(body);
const helm=new THREE.Mesh(new THREE.BoxGeometry(1,1,1),mat);helm.position.y=1.8;s.add(helm);
const eye=new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.1),new THREE.MeshBasicMaterial({color:0x00ffff}));eye.position.set(0,2,0.51);s.add(eye);
s.add(new THREE.DirectionalLight(0xffffff,2));c.position.set(0,1,7);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);s.rotation.y+=0.01;r.render(s,c);}anim();
</script></body></html>`},

/* 25 ── TOXIC SLIME (CREATURE) ─────────────────────── */
{icon:'🧪', en:'Toxic Slime', fr:'Blob Toxique',
 desc_en:'Green pulsing blob with bubbles and acid drop effects',
 desc_fr:'Blob vert pulsant cuit avec bulles et gouttes d\'acide',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#011"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({alpha:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const slime=new THREE.Mesh(new THREE.SphereGeometry(1.5,32,32),new THREE.MeshPhongMaterial({color:0x22c55e,shininess:150}));s.add(slime);
s.add(new THREE.PointLight(0x22c55e,10,15));c.position.z=5;
function anim(){requestAnimationFrame(anim);const t=Date.now()*0.004;slime.scale.set(1+Math.sin(t)*0.1,1+Math.cos(t)*0.1,1);r.render(s,c);}anim();
</script></body></html>`},

/* 26 ── ASTRAL WHALE (CREATURE) ────────────────────── */
{icon:'🐋', en:'Astral Whale', fr:'Baleine Astrale',
 desc_en:'Space giant swimming through nebulas with cosmic trails',
 desc_fr:'Géant de l\'espace nageant à travers les nébuleuses',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.CapsuleGeometry(1,4,16,32),new THREE.MeshStandardMaterial({color:0x3b82f6}));body.rotation.z=Math.PI/2;s.add(body);
const starG=new THREE.BufferGeometry();const sp=[];for(let i=0;i<500;i++)sp.push(Math.random()*20-10,Math.random()*20-10,Math.random()*20-10);starG.setAttribute('position',new THREE.Float32BufferAttribute(sp,3));
s.add(new THREE.Points(starG,new THREE.PointsMaterial({color:0xfff,size:0.02})));
const pLight=new THREE.PointLight(0xffffff,50,50);pLight.position.set(10,10,10);s.add(pLight);c.position.set(10,5,10);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);body.position.y=Math.sin(Date.now()*0.001)*1.5;body.rotation.x+=0.01;r.render(s,c);}anim();
</script></body></html>`},

/* 27 ── CLOCKWORK OWL (ROBOT) ──────────────────────── */
{icon:'🦉', en:'Steam Owl', fr:'Chouette Vapeur',
 desc_en:'Mechanical bird with rotating brass gears and glowing eyes',
 desc_fr:'Oiseau mécanique avec engrenages de laiton rotatifs',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#1a1100"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0xa16207,metalness:1});
const head=new THREE.Mesh(new THREE.SphereGeometry(1),mat);s.add(head);
const gearL=new THREE.Mesh(new THREE.CylinderGeometry(0.4,0.4,0.2,12),mat);gearL.position.set(0.6,0,0.8);gearL.rotation.x=Math.PI/2;head.add(gearL);
const gearR=gearL.clone();gearR.position.x=-0.6;head.add(gearR);
s.add(new THREE.PointLight(0xff9900,5,15));c.position.z=5;
function anim(){requestAnimationFrame(anim);gearL.rotation.y+=0.1;gearR.rotation.y-=0.1;r.render(s,c);}anim();
</script></body></html>`},

/* 28 ── CRYSTAL DRAGON (MYTH) ──────────────────────── */
{icon:'💎', en:'Shards Drake', fr:'Drake d\'Éclats',
 desc_en:'Translucent crystalline beast with refraction and sparkles',
 desc_fr:'Bête cristalline translucide avec réfraction et éclats',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#051"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({antialias:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshPhongMaterial({color:0x00ffff,transparent:true,opacity:0.6,shininess:200});
const body=new THREE.Mesh(new THREE.IcosahedronGeometry(1.5,1),mat);s.add(body);
const spikes=[];for(let i=0;i<10;i++){const sp=new THREE.Mesh(new THREE.CylinderGeometry(0,0.3,2),mat);sp.position.y=1.5;const g=new THREE.Group();g.rotation.z=i;g.add(sp);s.add(g);spikes.push(g);}
s.add(new THREE.DirectionalLight(0xffffff,3));c.position.z=7;
function anim(){requestAnimationFrame(anim);body.rotation.y+=0.01;spikes.forEach(g=>g.rotation.y+=0.02);r.render(s,c);}anim();
</script></body></html>`},

/* 29 ── PLASMA SPECTRE (ENTITY) ────────────────────── */
{icon:'👻', en:'Plasma Spectre', fr:'Spectre Plasma',
 desc_en:'Electric energy phantom with pulsing arcs and sparks',
 desc_fr:'Fantôme d\'énergie électrique cuit cuit avec arcs pulsants',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const core=new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshBasicMaterial({color:0x8b5cf6}));s.add(core);
const rings=[];for(let i=0;i<3;i++){const ri=new THREE.Mesh(new THREE.TorusGeometry(1.5+i*0.5,0.05,8,50),new THREE.MeshBasicMaterial({color:0x3b82f6}));ri.rotation.x=Math.PI/2;s.add(ri);rings.push(ri);}
s.add(new THREE.PointLight(0x8b5cf6,20,15));c.position.z=8;
function anim(){requestAnimationFrame(anim);rings.forEach((ri,i)=>{ri.rotation.x+=0.05+i*0.02;ri.rotation.y+=0.03;});core.scale.setScalar(0.8+Math.random()*0.4);r.render(s,c);}anim();
</script></body></html>`},

/* 30 ── WAR DROID (ROBOT) ──────────────────────────── */
{icon:'🤖', en:'War Droid', fr:'Droïde de Guerre',
 desc_en:'Combat robot with heavy armor and red laser targeting system',
 desc_fr:'Robot de combat avec blindage lourd et laser rouge',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#0a0a05"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const camo=new THREE.MeshStandardMaterial({color:0x2d3a1f});
const trunk=new THREE.Mesh(new THREE.BoxGeometry(2,2,2),camo);s.add(trunk);
const head=new THREE.Mesh(new THREE.CylinderGeometry(0.8,0.8,1,16),camo);head.position.y=1.5;s.add(head);
const laser=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,10),new THREE.MeshBasicMaterial({color:0xff0000}));laser.rotation.z=Math.PI/2;laser.position.set(5.5,1.5,0);head.add(laser);
s.add(new THREE.PointLight(0xff0000,5,20));c.position.set(6,4,10);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);head.rotation.y=Math.sin(Date.now()*0.002);r.render(s,c);}anim();
</script></body></html>`},

/* 31 ── VENOM SPIDER (CREATURE) ────────────────────── */
{icon:'🕷️', en:'Shadow Spider', fr:'Araignée de l\'Ombre',
 desc_en:'Giant lurking arachnid with glowing red eyes and fast legs',
 desc_fr:'Arachnide géant tapis avec yeux rouges et pattes rapides',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0x111});
const core=new THREE.Mesh(new THREE.SphereGeometry(1,16,16),mat);s.add(core);
const legs=[];for(let i=0;i<8;i++){const l=new THREE.Group();const s1=new THREE.Mesh(new THREE.BoxGeometry(0.2,2,0.2),mat);s1.position.y=-1;l.add(s1);l.rotation.y=i*Math.PI/4;s.add(l);legs.push(l);}
const pLight=new THREE.PointLight(0xff0000,50,50);pLight.position.set(5,5,10);s.add(pLight);c.position.set(0,5,10);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);legs.forEach((l,i)=>{l.rotation.x=Math.sin(Date.now()*0.01+i)*0.8;});r.render(s,c);}anim();
</script></body></html>`},

/* 32 ── GALACTIC SENTINEL (HERO) ───────────────────── */
{icon:'⚔️', en:'Star Guardian', fr:'Gardien d\'Étoile',
 desc_en:'Ancient stone hero with a glowing heart and starfields',
 desc_fr:'Héros ancien de pierre avec coeur lumineux et constellations',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#002"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const stone=new THREE.MeshStandardMaterial({color:0x444,metalness:0.3});
const body=new THREE.Mesh(new THREE.CylinderGeometry(1,0.8,4,16),stone);s.add(body);
const head=new THREE.Mesh(new THREE.SphereGeometry(1),stone);head.position.y=3;s.add(head);
const heart=new THREE.Mesh(new THREE.SphereGeometry(0.3),new THREE.MeshBasicMaterial({color:0x0ff}));heart.position.set(0,1.5,0.8);body.add(heart);
s.add(new THREE.PointLight(0x0ff,15,10));c.position.set(10,5,15);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);s.rotation.y+=0.005;heart.scale.setScalar(0.8+Math.sin(Date.now()*0.01)*0.4);r.render(s,c);}anim();
</script></body></html>`},

/* 33 ── ICE ELEMENTAL (CREATURE) ───────────────────── */
{icon:'❄️', en:'Ice Golem', fr:'Golem de Glace',
 desc_en:'Creature of frozen spikes and swirling snow particles',
 desc_fr:'Créature de pics gelés et flocons de neige tourbillonnants',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#def"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer({alpha:true});r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const core=new THREE.Mesh(new THREE.IcosahedronGeometry(2,1),new THREE.MeshPhongMaterial({color:0xffffff,transparent:true,opacity:0.8,shininess:100}));s.add(core);
c.position.z=8;
function anim(){requestAnimationFrame(anim);core.rotation.y+=0.01;core.rotation.x+=0.005;core.scale.setScalar(1+Math.sin(Date.now()*0.001)*0.1);r.render(s,c);}anim();
</script></body></html>`},

/* 34 ── STEAM CRAWLER (VEHICLE) ────────────────────── */
{icon:'🚂', en:'Steam Crawler', fr:'Chenille Vapeur',
 desc_en:'Brass locomotive with multiple mechanical legs and pipes',
 desc_fr:'Locomotive en laiton avec plusieurs pattes mécaniques',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#1e1a10"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.BoxGeometry(4,2,2.5),new THREE.MeshStandardMaterial({color:0xa16207,metalness:1}));s.add(body);
const pipe=new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,2),new THREE.MeshStandardMaterial({color:0x444}));pipe.position.set(1.5,1.5,0);body.add(pipe);
for(let i=0;i<6;i++){const l=new THREE.Mesh(new THREE.BoxGeometry(0.3,2,0.3),new THREE.MeshStandardMaterial({color:0x333}));l.position.set(i<3?-2:2,-1,(i%3-1)*1.5);s.add(l);}
s.add(new THREE.PointLight(0xffaa00,10,30));c.position.set(10,5,12);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);body.position.y=Math.sin(Date.now()*0.005)*0.5;r.render(s,c);}anim();
</script></body></html>`},

/* 35 ── NEBULA BUTTERFLY (CREATURE) ────────────────── */
{icon:'🦋', en:'Space Morph', fr:'Space Morph',
 desc_en:'Ethereal insect with wings reflecting stellar nebulas',
 desc_fr:'Insecte éthéré avec ailes reflétant les nébuleuses',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const wL=new THREE.Mesh(new THREE.PlaneGeometry(3,4),new THREE.MeshBasicMaterial({color:0xec4899,side:2,transparent:true,opacity:0.7}));wL.position.set(1.5,0,0);const gL=new THREE.Group();gL.add(wL);s.add(gL);
const wR=wL.clone();wR.position.x=-1.5;const gR=new THREE.Group();gR.add(wR);s.add(gR);
s.add(new THREE.PointLight(0xec4899,10,20));c.position.z=8;
function anim(){requestAnimationFrame(anim);const t=Date.now()*0.005;gL.rotation.y=Math.sin(t);gR.rotation.y=-Math.sin(t);r.render(s,c);}anim();
</script></body></html>`},

/* 36 ── CYBER DRONE (ROBOT) ────────────────────────── */
{icon:'🛸', en:'Tech Drone', fr:'Drone Tech',
 desc_en:'High-speed scouting drone with rotating rotors and LEDs',
 desc_fr:'Drone de reconnaissance rapide cuit avec rotors rotatifs',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#111"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const mat=new THREE.MeshStandardMaterial({color:0x333});const core=new THREE.Mesh(new THREE.BoxGeometry(1,0.2,1),mat);s.add(core);
const rots=[];for(let i=0;i<4;i++){const ro=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.02,0.1),mat);ro.position.set(i<2?0.8:-0.8,0,i%2?0.8:-0.8);s.add(ro);rots.push(ro);}
s.add(new THREE.PointLight(0x3b82f6,10,10));c.position.set(3,2,5);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);rots.forEach(ro=>ro.rotation.y+=0.5);core.position.y=1+Math.sin(Date.now()*0.01)*0.1;r.render(s,c);}anim();
</script></body></html>`},

/* 37 ── SPIRIT FOX (MYTH) ──────────────────────────── */
{icon:'🦊', en:'Fire Kitsune', fr:'Kitsune de Feu',
 desc_en:'Mythical fox with multiple blue flaming tails and aura',
 desc_fr:'Renard mythique avec plusieurs queues de feu bleu',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#001"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.CapsuleGeometry(0.5,1,8,16),new THREE.MeshStandardMaterial({color:0xffffff}));body.rotation.z=Math.PI/2;s.add(body);
const tails=[];for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.4,2.5),new THREE.MeshBasicMaterial({color:0x3b82f6}));t.position.set(-1,1.2,0);const g=new THREE.Group();g.rotation.z=i*0.4-0.8;g.add(t);s.add(g);tails.push(g);}
const pLight=new THREE.PointLight(0x3b82f6,50,50);pLight.position.set(5,5,5);s.add(pLight);c.position.set(5,2,8);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);tails.forEach((g,i)=>g.rotation.y=Math.sin(Date.now()*0.002+i)*0.5);r.render(s,c);}anim();
</script></body></html>`},

/* 38 ── VOLCANO DEMON (ENTITY) ─────────────────────── */
{icon:'👹', en:'Magma Fiend', fr:'Démon de Magma',
 desc_en:'Entity made of molten rocks and pulsing lava heart',
 desc_fr:'Entité de roche en fusion avec coeur de lave pulsant',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#100"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.IcosahedronGeometry(2,0),new THREE.MeshStandardMaterial({color:0x222,emissive:0xff0000,emissiveIntensity:2}));s.add(body);
s.add(new THREE.PointLight(0xff4400,20,30));c.position.z=8;
function anim(){requestAnimationFrame(anim);body.rotation.y+=0.01;body.scale.setScalar(0.9+Math.sin(Date.now()*0.005)*0.1);r.render(s,c);}anim();
</script></body></html>`},

/* 39 ── ZEN MASTER (HERO) ──────────────────────────── */
{icon:'🧘', en:'Zen Master', fr:'Maître Zen',
 desc_en:'Meditating mystic with rotating energy orbs and aura field',
 desc_fr:'Mystique méditant cuit cuit avec orbes d\'énergie rotatives',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#050510"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const body=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.7,2.5,8),new THREE.MeshStandardMaterial({color:0x4338ca}));s.add(body);
const orb=new THREE.Mesh(new THREE.SphereGeometry(0.2),new THREE.MeshBasicMaterial({color:0x818cf8}));
for(let i=0;i<4;i++){const o=orb.clone();const g=new THREE.Group();g.add(o);o.position.x=2;g.rotation.y=i*Math.PI/2;s.add(g);o.anim=g;}
s.add(new THREE.PointLight(0x818cf8,10,15));c.position.set(5,3,8);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);s.children.forEach(c=>{if(c.children[0]?.anim)c.rotation.y+=0.02;});body.position.y=Math.sin(Date.now()*0.002)*0.5;r.render(s,c);}anim();
</script></body></html>`},

/* 40 ── STARFIGHTER (VEHICLE) ──────────────────────── */
{icon:'🚀', en:'Stellar Scout', fr:'Éclaireur Stellaire',
 desc_en:'Advanced space fighter with rotating wings and engine glow',
 desc_fr:'Chasseur spatial avancé avec ailes rotatives',
 code:`<!DOCTYPE html><html><head><script src="js/three.min.js"></script></head><body style="margin:0;background:#000"><script>
const s=new THREE.Scene(),c=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const r=new THREE.WebGLRenderer();r.setSize(window.innerWidth,window.innerHeight);document.body.appendChild(r.domElement);
const ship=new THREE.Mesh(new THREE.BoxGeometry(4,0.5,1.5),new THREE.MeshStandardMaterial({color:0xffffff}));s.add(ship);
const eng=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,1),new THREE.MeshBasicMaterial({color:0x0ff}));eng.position.x=-2.2;eng.rotation.z=Math.PI/2;ship.add(eng);
s.add(new THREE.PointLight(0x0ff,20,10));c.position.set(8,4,10);c.lookAt(0,0,0);
function anim(){requestAnimationFrame(anim);ship.rotation.x=Math.sin(Date.now()*0.001)*0.2;ship.rotation.z=Math.sin(Date.now()*0.002)*0.1;r.render(s,c);}anim();
</script></body></html>`}

];

window.MODELS_DATA = MODELS_DATA;
