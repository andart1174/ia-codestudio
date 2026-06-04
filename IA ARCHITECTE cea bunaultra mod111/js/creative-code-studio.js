(function(){
'use strict';
const TX={en:{title:'CREATIVE CODE STUDIO',sub:'Generative Art & Visual Effects',back:'<- Back',injected:'Injected!',tools:{
  p5forge:{name:'p5.js Canvas Forge',desc:'Generate procedural art: spirals, fractals, Perlin noise and more.',injectBtn:'Generate p5.js Art'},
  shader:{name:'GLSL Shader Editor',desc:'WebGL fragment shaders with live preview — plasma, waves, mandelbrot.',injectBtn:'Generate WebGL Shader'},
  svg:{name:'SVG Art Generator',desc:'Generate complex animated SVG patterns: mandalas, geometric grids.',injectBtn:'Generate SVG Art'},
  particles:{name:'Particle System Designer',desc:'Configure gravity, wind, color and emit thousands of particles.',injectBtn:'Generate Particle System'},
  ascii:{name:'ASCII Art Converter',desc:'Transform any text into animated ASCII art with glow effects.',injectBtn:'Generate ASCII Art'}
}},fr:{title:'STUDIO CODE CREATIF',sub:'Art Generatif & Effets Visuels',back:'<- Retour',injected:'Injecte!',tools:{
  p5forge:{name:'Forge Canvas p5.js',desc:'Generez art procedurale: spirales, fractales, bruit de Perlin.',injectBtn:'Generer Art p5.js'},
  shader:{name:'Editeur Shader GLSL',desc:'Shaders WebGL avec apercu live — plasma, vagues, mandelbrot.',injectBtn:'Generer Shader WebGL'},
  svg:{name:'Generateur Art SVG',desc:'Generez des patterns SVG animes: mandalas, grilles geometriques.',injectBtn:'Generer Art SVG'},
  particles:{name:'Concepteur Particules',desc:'Configurez gravite, vent, couleur et emettez des milliers de particules.',injectBtn:'Generer Systeme Particules'},
  ascii:{name:'Convertisseur Art ASCII',desc:'Transformez du texte en art ASCII anime avec effets lumineux.',injectBtn:'Generer Art ASCII'}
}}};
function gl(){return window.appLang||'en';}
window._injectCreativeCode=function(c){if(window.editor){window.editor.setValue(c);if(window.runPreview)window.runPreview();if(window.showToast)window.showToast((TX[gl()]||TX.en).injected);}};
const _o=window.renderTab;
window.renderTab=function(tab){if(tab==='creativecode'){window.activeTab='creativecode';document.querySelectorAll('.ltab').forEach(b=>b.classList.remove('active'));const b=document.getElementById('tab-creativecode');if(b)b.classList.add('active');window.initCreativeCode(gl());return;}if(typeof _o==='function')_o(tab);};
window.initCreativeCode=function(lang){
  const el=document.getElementById('left-body');if(!el)return;
  const t=TX[lang]||TX.en;
  const tools=[{id:'p5forge',icon:'🌀',color:'#ec4899'},{id:'shader',icon:'✨',color:'#f97316'},{id:'svg',icon:'🔷',color:'#8b5cf6'},{id:'particles',icon:'💫',color:'#06b6d4'},{id:'ascii',icon:'🔡',color:'#10b981'}];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;overflow-y:auto;height:100%;box-sizing:border-box;background:#020617;"><div style="background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(219,39,119,0.1));border-radius:14px;padding:16px;border:1px solid rgba(236,72,153,0.3);margin-bottom:20px;display:flex;align-items:center;gap:12px;"><span style="font-size:32px;filter:drop-shadow(0 0 10px #ec4899);">🎨</span><div><h2 style="margin:0;color:#f9a8d4;font-size:16px;font-weight:900;">'+t.title+'</h2><p style="margin:4px 0 0;color:#94a3b8;font-size:11px;">'+t.sub+'</p></div></div><div style="display:flex;flex-direction:column;gap:10px;">'+tools.map(tool=>'<div onclick="window.handleCreativeTool(\''+tool.id+'\')" style="background:rgba(15,23,42,0.8);border:1px solid '+tool.color+'44;border-radius:12px;padding:14px;cursor:pointer;transition:all 0.25s;display:flex;align-items:center;gap:12px;" onmouseover="this.style.borderColor=\''+tool.color+'\';this.style.boxShadow=\'0 0 15px '+tool.color+'33\';" onmouseout="this.style.borderColor=\''+tool.color+'44\';this.style.boxShadow=\'none\';"><div style="font-size:24px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:'+tool.color+'18;border-radius:10px;">'+tool.icon+'</div><div style="flex:1;"><div style="color:'+tool.color+';font-weight:800;font-size:13px;">'+t.tools[tool.id].name+'</div><div style="color:#64748b;font-size:10px;margin-top:3px;">'+t.tools[tool.id].desc+'</div></div></div>').join('')+'</div></div>';
};
window.handleCreativeTool=function(toolId){
  const el=document.getElementById('left-body');if(!el)return;
  const lang=gl();const t=TX[lang]||TX.en;
  const colors={p5forge:'#ec4899',shader:'#f97316',svg:'#8b5cf6',particles:'#06b6d4',ascii:'#10b981'};
  const icons={p5forge:'🌀',shader:'✨',svg:'🔷',particles:'💫',ascii:'🔡'};
  const codeMap={p5forge:getP5Code(),shader:getShaderCode(),svg:getSvgCode(),particles:getParticleCode(),ascii:getAsciiCode()};
  const color=colors[toolId],icon=icons[toolId],tx=t.tools[toolId];
  el.innerHTML='<div style="padding:15px;font-family:Inter,sans-serif;height:100%;overflow-y:auto;box-sizing:border-box;background:#020617;"><button onclick="window.initCreativeCode(\''+lang+'\')" style="background:rgba(255,255,255,0.05);color:#94a3b8;border:1px solid rgba(255,255,255,0.1);padding:8px 14px;border-radius:8px;cursor:pointer;margin-bottom:15px;font-size:11px;font-weight:700;">'+t.back+'</button><h3 style="color:'+color+';margin:0 0 5px;font-size:15px;font-weight:800;">'+icon+' '+tx.name+'</h3><p style="color:#64748b;font-size:11px;margin:0 0 20px;">'+tx.desc+'</p><div style="background:#0f172a;border:1px dashed '+color+';border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;"><div style="font-size:40px;margin-bottom:10px;">'+icon+'</div><div style="color:#94a3b8;font-size:12px;">'+(lang==='fr'?'Pret a injecter dans l editeur':'Ready to inject into the editor')+'</div></div><button id="btnInjectCC'+toolId+'" style="width:100%;padding:12px;border-radius:8px;background:'+color+';border:none;color:#fff;font-weight:900;font-size:13px;cursor:pointer;box-shadow:0 4px 15px '+color+'55;">'+tx.injectBtn+'</button></div>';
  document.getElementById('btnInjectCC'+toolId).addEventListener('click',()=>window._injectCreativeCode(codeMap[toolId]));
};
function getP5Code(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>p5.js Generative Art</title>
<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"><\/script>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}
.controls{padding:12px 15px;background:#1e293b;border-bottom:1px solid #334155;display:flex;gap:10px;flex-wrap:wrap;align-items:center}
button{padding:7px 14px;border:none;border-radius:7px;font-weight:bold;cursor:pointer;font-size:12px}
select{background:#0f172a;border:1px solid #475569;color:#fff;padding:7px 10px;border-radius:7px;font-size:12px}
#canvas-container{flex:1}</style></head>
<body>
<div class="controls">
  <select id="mode" onchange="changeMode()"><option value="spiral">Golden Spiral</option><option value="fractal">Lissajous</option><option value="noise">Perlin Noise Field</option><option value="mandala">Mandala</option></select>
  <button onclick="saveCanvas('artwork','png')" style="background:#ec4899;color:#fff">Save PNG</button>
  <button onclick="clearSketch()" style="background:#334155;color:#fff">Clear</button>
</div>
<div id="canvas-container"></div>
<script>
let t=0,mode='spiral',particles=[];
function changeMode(){mode=document.getElementById('mode').value;t=0;particles=[];background('#0f172a');}
new p5(function(s){
  s.setup=function(){const c=s.createCanvas(s.windowWidth,s.windowHeight-50);c.parent('canvas-container');s.background('#0f172a');s.colorMode(s.HSB,360,100,100,100);};
  s.draw=function(){
    if(mode==='noise'){
      s.noStroke();
      for(let i=0;i<5;i++){
        const x=s.random(s.width),y=s.random(s.height);
        const n=s.noise(x*0.005,y*0.005,t*0.01);
        const h=n*360;
        s.fill(h,80,100,30);
        s.ellipse(x,y,3,3);
      }
      t++;
    } else if(mode==='spiral'){
      s.translate(s.width/2,s.height/2);
      s.noFill();
      for(let i=0;i<5;i++){
        const angle=t*0.02+i;
        const r=angle*3;
        const x=r*s.cos(angle),y=r*s.sin(angle);
        s.stroke((t+i*50)%360,80,100,80);
        s.strokeWeight(1.5);
        s.point(x,y);
      }
      t++;if(t>5000){t=0;s.background('#0f172a');}
    } else if(mode==='fractal'){
      s.translate(s.width/2,s.height/2);
      s.noFill();s.strokeWeight(1);
      const x=200*s.sin(3*t*0.01),y=200*s.sin(2*t*0.01+s.PI/4);
      s.stroke(t%360,80,100,60);s.point(x,y);
      t++;if(t>10000){t=0;s.background('#0f172a');}
    } else if(mode==='mandala'){
      s.translate(s.width/2,s.height/2);
      const petals=12;
      for(let i=0;i<petals;i++){
        s.push();s.rotate((s.TWO_PI/petals)*i);
        s.noFill();s.stroke((t+i*30)%360,80,100,70);s.strokeWeight(1.5);
        s.beginShape();
        for(let a=0;a<s.TWO_PI;a+=0.05){
          const r=80+40*s.cos(6*a+t*0.02);
          s.vertex(r*s.cos(a),r*s.sin(a));
        }s.endShape(s.CLOSE);s.pop();
      }
      t+=0.5;
    }
  };
  s.windowResized=function(){s.resizeCanvas(s.windowWidth,s.windowHeight-50);};
});
<\/script></body></html>`;}

function getShaderCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>GLSL Shader Editor</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f172a;color:#fff;font-family:monospace;display:grid;grid-template-columns:1fr 1fr;height:100vh}
.editor-panel{display:flex;flex-direction:column;border-right:1px solid #334155}
.toolbar{background:#1e293b;padding:10px 15px;display:flex;gap:8px;align-items:center;border-bottom:1px solid #334155}
.toolbar select{background:#0f172a;border:1px solid #475569;color:#fff;padding:6px;border-radius:6px;font-size:12px}
button{padding:7px 14px;border:none;border-radius:7px;font-weight:bold;cursor:pointer;font-size:12px}
textarea{flex:1;background:#020617;color:#a5f3fc;border:none;padding:15px;font-family:monospace;font-size:12px;resize:none;outline:none;line-height:1.6}
canvas{width:100%;height:100%}</style></head>
<body>
<div class="editor-panel">
  <div class="toolbar">
    <select id="preset" onchange="loadPreset()"><option value="plasma">Plasma</option><option value="mandelbrot">Mandelbrot</option><option value="waves">Ocean Waves</option></select>
    <button onclick="compileShader()" style="background:#f97316;color:#000">Run Shader</button>
  </div>
  <textarea id="fragSrc"></textarea>
</div>
<canvas id="c"></canvas>
<script>
const presets={
plasma:'precision mediump float;\nuniform float u_time;\nuniform vec2 u_resolution;\nvoid main(){\n  vec2 uv=(gl_FragCoord.xy/u_resolution)*2.0-1.0;\n  float t=u_time*0.5;\n  float v=sin(uv.x*10.0+t)+sin(uv.y*10.0+t)+sin((uv.x+uv.y)*10.0+t)+sin(sqrt(uv.x*uv.x+uv.y*uv.y)*10.0);\n  vec3 c=vec3(sin(v*3.14),sin(v*3.14+2.094),sin(v*3.14+4.188))*0.5+0.5;\n  gl_FragColor=vec4(c,1.0);\n}',
mandelbrot:'precision mediump float;\nuniform float u_time;uniform vec2 u_resolution;\nvoid main(){\n  vec2 uv=(gl_FragCoord.xy/u_resolution-0.5)*3.5;\n  uv.x-=0.5;vec2 c=uv,z=vec2(0.0);float i=0.0;\n  for(int n=0;n<100;n++){if(dot(z,z)>4.0)break;z=vec2(z.x*z.x-z.y*z.y,2.0*z.x*z.y)+c;i++;}\n  float t=i/100.0;\n  gl_FragColor=vec4(t*0.2,t*0.8,t,1.0);\n}',
waves:'precision mediump float;\nuniform float u_time;uniform vec2 u_resolution;\nvoid main(){\n  vec2 uv=gl_FragCoord.xy/u_resolution;\n  float wave=sin(uv.x*20.0-u_time*3.0)*0.5+0.5;\n  float wave2=sin(uv.x*15.0+uv.y*8.0-u_time*2.0)*0.3;\n  float d=abs(uv.y-0.5-wave*0.2-wave2);\n  float glow=0.02/d;\n  gl_FragColor=vec4(0.0,glow*0.3,glow,1.0);\n}'};
function loadPreset(){document.getElementById('fragSrc').value=presets[document.getElementById('preset').value];compileShader();}
const canvas=document.getElementById('c');const gl=canvas.getContext('webgl');let prog,startTime=Date.now();
function compileShader(){
  const src=document.getElementById('fragSrc').value;
  const vs=gl.createShader(gl.VERTEX_SHADER);gl.shaderSource(vs,'attribute vec2 p;void main(){gl_Position=vec4(p,0,1);}');gl.compileShader(vs);
  const fs=gl.createShader(gl.FRAGMENT_SHADER);gl.shaderSource(fs,src);gl.compileShader(fs);
  if(!gl.getShaderParameter(fs,gl.COMPILE_STATUS)){console.error(gl.getShaderInfoLog(fs));return;}
  prog=gl.createProgram();gl.attachShader(prog,vs);gl.attachShader(prog,fs);gl.linkProgram(prog);gl.useProgram(prog);
  const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),gl.STATIC_DRAW);
  const pos=gl.getAttribLocation(prog,'p');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
  render();
}
function render(){if(!prog)return;canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;gl.viewport(0,0,canvas.width,canvas.height);const t=(Date.now()-startTime)/1000;gl.uniform1f(gl.getUniformLocation(prog,'u_time'),t);gl.uniform2f(gl.getUniformLocation(prog,'u_resolution'),canvas.width,canvas.height);gl.drawArrays(gl.TRIANGLE_STRIP,0,4);requestAnimationFrame(render);}
loadPreset();
<\/script></body></html>`;}
function getSvgCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>SVG Art Generator</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}.toolbar{background:#1e293b;padding:12px 15px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-bottom:1px solid #334155}select,input[type=range]{background:#0f172a;border:1px solid #475569;color:#fff;padding:6px 10px;border-radius:6px;font-size:12px}button{padding:7px 14px;border:none;border-radius:7px;font-weight:bold;cursor:pointer;font-size:12px}label{color:#64748b;font-size:11px}#stage{flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden}</style></head>
<body>
<div class="toolbar">
  <select id="pattern"><option value="mandala">Mandala</option><option value="grid">Geometric Grid</option><option value="spiral">SVG Spiral</option><option value="flower">Flower of Life</option></select>
  <label>Petals: <input type="range" id="n" min="3" max="24" value="8" oninput="generate()"></label>
  <label>Size: <input type="range" id="sz" min="50" max="300" value="150" oninput="generate()"></label>
  <button onclick="generate()" style="background:#8b5cf6;color:#fff">Generate</button>
  <button onclick="saveSVG()" style="background:#10b981;color:#000">Export SVG</button>
</div>
<div id="stage"></div>
<script>
function generate(){
  const p=document.getElementById('pattern').value,n=+document.getElementById('n').value,sz=+document.getElementById('sz').value;
  const W=800,H=600,cx=W/2,cy=H/2;
  let paths='';
  if(p==='mandala'){
    for(let i=0;i<n;i++){const a=(Math.PI*2/n)*i;const x1=cx+sz*Math.cos(a),y1=cy+sz*Math.sin(a);const x2=cx+sz*0.5*Math.cos(a+Math.PI/n),y2=cy+sz*0.5*Math.sin(a+Math.PI/n);const h=Math.round((360/n)*i);paths+='<path d="M '+cx+' '+cy+' Q '+x2+' '+y2+' '+x1+' '+y1+'" stroke="hsl('+h+',80%,60%)" stroke-width="1.5" fill="none" opacity="0.8"><animateTransform attributeName="transform" type="rotate" from="0 '+cx+' '+cy+'" to="360 '+cx+' '+cy+'" dur="'+(8+i)+'s" repeatCount="indefinite"/></path>';}
    for(let r=30;r<=sz;r+=30)paths+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" stroke="rgba(255,255,255,0.1)" stroke-width="1" fill="none"/>';
  } else if(p==='grid'){
    for(let x=50;x<W;x+=sz/3)for(let y=50;y<H;y+=sz/3){const h=Math.round(((x+y)/(W+H))*360);paths+='<rect x="'+(x-sz/6)+'" y="'+(y-sz/6)+'" width="'+(sz/3-5)+'" height="'+(sz/3-5)+'" rx="5" fill="none" stroke="hsl('+h+',70%,55%)" stroke-width="1.5" opacity="0.8"><animate attributeName="opacity" values="0.3;1;0.3" dur="'+(1+Math.random()*3).toFixed(1)+'s" repeatCount="indefinite"/></rect>';}
  } else if(p==='spiral'){
    for(let i=0;i<300;i++){const a=i*0.2,r=i*(sz/300)*3,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a),h=Math.round((i/300)*360);paths+='<circle cx="'+x+'" cy="'+y+'" r="2" fill="hsl('+h+',80%,65%)" opacity="0.9"/>'; }
  } else if(p==='flower'){
    for(let i=0;i<6;i++){const a=(Math.PI/3)*i,x=cx+sz*0.5*Math.cos(a),y=cy+sz*0.5*Math.sin(a),h=i*60;paths+='<circle cx="'+x+'" cy="'+y+'" r="'+(sz*0.5)+'" fill="none" stroke="hsl('+h+',70%,55%)" stroke-width="1.5" opacity="0.7"><animate attributeName="r" values="'+(sz*0.4)+';'+(sz*0.6)+';'+(sz*0.4)+'" dur="'+(2+i)+'s" repeatCount="indefinite"/></circle>';}
    paths+='<circle cx="'+cx+'" cy="'+cy+'" r="'+(sz*0.5)+'" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.5"/>';
  }
  const svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" style="background:#0f172a">'+paths+'</svg>';
  document.getElementById('stage').innerHTML=svg;
}
function saveSVG(){const svg=document.getElementById('stage').innerHTML;const blob=new Blob([svg],{type:'image/svg+xml'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='generative-art.svg';a.click();}
generate();
<\/script></body></html>`;}

function getParticleCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Particle System</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}.toolbar{background:#1e293b;padding:10px 15px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;border-bottom:1px solid #334155}label{color:#94a3b8;font-size:11px;display:flex;align-items:center;gap:5px}input[type=range]{width:80px}input[type=color]{width:30px;height:24px;border:none;border-radius:4px;cursor:pointer}button{padding:7px 14px;border:none;border-radius:7px;font-weight:bold;cursor:pointer;font-size:12px}canvas{flex:1}</style></head>
<body>
<div class="toolbar">
  <label>Gravity <input type="range" id="grav" min="0" max="10" value="2" step="0.1"></label>
  <label>Count <input type="range" id="cnt" min="1" max="50" value="10"></label>
  <label>Speed <input type="range" id="spd" min="1" max="20" value="8"></label>
  <label>Size <input type="range" id="sz" min="1" max="20" value="5"></label>
  <label>Color <input type="color" id="col" value="#06b6d4"></label>
  <label>Mode <select id="mode" style="background:#0f172a;border:1px solid #475569;color:#fff;padding:5px;border-radius:6px"><option>Fountain</option><option>Explosion</option><option>Rain</option><option>Fireworks</option></select></label>
  <button onclick="particles=[]" style="background:#334155;color:#fff">Clear</button>
</div>
<canvas id="c"></canvas>
<script>
const canvas=document.getElementById('c'),ctx=canvas.getContext('2d');let particles=[],animId,mouseX=canvas.width/2,mouseY=canvas.height/2;
function resize(){canvas.width=canvas.offsetWidth;canvas.height=canvas.offsetHeight;}
resize();window.addEventListener('resize',resize);
canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();mouseX=e.clientX-r.left;mouseY=e.clientY-r.top;});
canvas.addEventListener('click',()=>{if(document.getElementById('mode').value==='Explosion')explode(mouseX,mouseY);});
function rand(a,b){return a+Math.random()*(b-a);}
function hsla(h,s,l,a){return 'hsla('+h+','+s+'%,'+l+'%,'+a+')';}
function explode(x,y){const spd=+document.getElementById('spd').value,sz=+document.getElementById('sz').value;for(let i=0;i<80;i++){const a=rand(0,Math.PI*2),s=rand(1,spd);particles.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life:1,hue:rand(0,360),sz:rand(2,sz)});}}
function emit(){
  const mode=document.getElementById('mode').value,cnt=+document.getElementById('cnt').value,spd=+document.getElementById('spd').value,sz=+document.getElementById('sz').value,col=document.getElementById('col').value;
  for(let i=0;i<cnt;i++){
    if(mode==='Fountain')particles.push({x:canvas.width/2,y:canvas.height-10,vx:rand(-spd,spd),vy:-rand(5,spd*2),life:1,color:col,sz:rand(2,sz),isColor:true});
    else if(mode==='Rain')particles.push({x:rand(0,canvas.width),y:0,vx:rand(-1,1),vy:rand(3,spd),life:1,color:col,sz:rand(1,sz/2),isColor:true});
    else if(mode==='Fireworks'&&Math.random()<0.02)explode(rand(50,canvas.width-50),rand(50,canvas.height/2));
  }
}
function animate(){
  const grav=+document.getElementById('grav').value;
  ctx.fillStyle='rgba(2,6,23,0.15)';ctx.fillRect(0,0,canvas.width,canvas.height);
  emit();
  particles=particles.filter(p=>{
    p.x+=p.vx;p.y+=p.vy;p.vy+=grav*0.1;p.life-=0.008;
    if(p.life<=0)return false;
    ctx.beginPath();ctx.arc(p.x,p.y,p.sz,0,Math.PI*2);
    ctx.fillStyle=p.isColor?p.color.replace(')',','+p.life+')').replace('rgb','rgba'):hsla(p.hue,90,60,p.life);
    ctx.fill();return true;
  });
  requestAnimationFrame(animate);
}
animate();
<\/script></body></html>`;}

function getAsciiCode(){return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>ASCII Art Studio</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0f172a;color:#fff;font-family:Inter,sans-serif;display:flex;flex-direction:column;height:100vh}.toolbar{background:#1e293b;padding:12px 15px;display:flex;gap:10px;align-items:center;flex-wrap:wrap;border-bottom:1px solid #334155}input[type=text]{background:#0f172a;border:1px solid #475569;color:#fff;padding:8px 12px;border-radius:7px;font-size:14px;width:250px}button{padding:7px 14px;border:none;border-radius:7px;font-weight:bold;cursor:pointer;font-size:12px}select{background:#0f172a;border:1px solid #475569;color:#fff;padding:7px;border-radius:7px;font-size:12px}#output{flex:1;padding:20px;font-family:monospace;font-size:10px;line-height:1.2;overflow:auto;text-align:center;display:flex;align-items:center;justify-content:center}pre{white-space:pre}</style></head>
<body>
<div class="toolbar">
  <input type="text" id="txt" value="HELLO WORLD" placeholder="Enter text...">
  <select id="style"><option value="block">Block</option><option value="shadow">Shadow</option><option value="neon">Neon</option><option value="matrix">Matrix Rain</option></select>
  <select id="font"><option value="big">Big</option><option value="banner">Banner</option><option value="doom">Doom</option></select>
  <button onclick="generate()" style="background:#10b981;color:#000">Generate</button>
  <button onclick="stopAnim()" style="background:#334155;color:#fff">Stop</button>
</div>
<div id="output"></div>
<script>
let animId=null;
const CHARS="@#$%&*()+=[]{}|;:,.<>?/~!^-_abcdefghijklmnopqrstuvwxyz0123456789 ";
const FONTS={
  big:{H:["  █  ","  █  ","  █  ","  █  ","  █  "],E:["█████","█    ","████ ","█    ","█████"],L:["█    ","█    ","█    ","█    ","█████"],O:["█████","█   █","█   █","█   █","█████"],W:["█   █","█   █","█ █ █","██ ██","█   █"],R:["████ ","█   █","████ ","█  █ ","█   █"],D:["████ ","█   █","█   █","█   █","████ "]},
};
function letterToAscii(ch){return FONTS.big[ch.toUpperCase()]||["     ","  █  ","  █  ","  █  ","     "];}
function generate(){
  stopAnim();const txt=document.getElementById('txt').value.toUpperCase().slice(0,12);const style=document.getElementById('style').value;
  if(style==='matrix'){matrixRain();return;}
  const letters=txt.split('').map(letterToAscii);const rows=[];
  for(let r=0;r<5;r++){rows.push(letters.map(l=>l[r]||'     ').join(' '));}
  const art=rows.join('\n');
  const colors={block:'#10b981',shadow:'#f59e0b',neon:'#ec4899'};const c=colors[style]||'#10b981';
  const shadow=style==='shadow'?'text-shadow:3px 3px 0 rgba(0,0,0,0.5)':'';
  const anim=style==='neon'?'animation:glow 1.5s infinite alternate':'';
  document.getElementById('output').innerHTML='<style>@keyframes glow{from{text-shadow:0 0 5px '+c+',0 0 10px '+c+'}to{text-shadow:0 0 15px '+c+',0 0 30px '+c+',0 0 60px '+c+'}}</style><pre style="color:'+c+';font-size:14px;'+shadow+';'+anim+'">'+art+'</pre>';
}
function matrixRain(){
  document.getElementById('output').innerHTML='<canvas id="mc" style="display:block"></canvas>';
  const c=document.getElementById('mc'),ctx=c.getContext('2d');
  c.width=document.getElementById('output').offsetWidth;c.height=document.getElementById('output').offsetHeight;
  const cols=Math.floor(c.width/14),drops=Array(cols).fill(1);
  function draw(){ctx.fillStyle='rgba(2,6,23,0.05)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#10b981';ctx.font='14px monospace';drops.forEach((y,i)=>{const ch=CHARS[Math.floor(Math.random()*CHARS.length)];ctx.fillText(ch,i*14,y*14);if(y*14>c.height&&Math.random()>0.975)drops[i]=0;drops[i]++;});}
  animId=setInterval(draw,50);
}
function stopAnim(){if(animId){clearInterval(animId);animId=null;}}
generate();
<\/script></body></html>`;}

const _oa=window.applyLang;
window.applyLang=function(){if(typeof _oa==='function')_oa();const l=document.getElementById('lbl-tab-creativecode');if(l)l.textContent=gl()==='fr'?'Studio Code Creatif':'Creative Code Studio';if(window.activeTab==='creativecode')window.initCreativeCode(gl());};
console.log('Creative Code Studio loaded!');
})();
