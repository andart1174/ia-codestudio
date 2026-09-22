/**
 * 🖼️ Ad Banner Pro — EN/FR
 * Generates banners with HTML, PNG, and Video export capabilities.
 */
(function(){
'use strict';
var TX={
  en:{
    tab:'Ad Banner', title:'🖼️ Ad Banner Pro', sub:'Genius Ad Creator with Photo/Video Export',
    company:'Company Name', companyP:'e.g. Acme Corp',
    headline:'Headline', headlineP:'e.g. Super Sale 50% Off!',
    cta:'CTA Text', ctaP:'e.g. Shop Now',
    colorBg:'Background Color', colorText:'Text Color', colorAccent:'Accent Color',
    format:'Banner Shape', image:'Import Photo', imageUpload:'Choose Image...',
    style:'Design Style',
    styles:{ 'glass':'Glassmorphism', 'neon':'Cyber Neon', 'minimal':'Minimalist', 'brutal':'Brutalism' },
    formats:{ '300x250':'Medium Rectangle', '728x90':'Leaderboard', '160x600':'Skyscraper', '1080x1080':'Insta Square', '1920x1080':'Full HD Video' },
    btnGen:'🚀 Generate HTML', btnPhoto:'📸 Export HD Photo', btnVideo:'🎥 Export Video',
    msgSuccess:'✅ Banner generated!', inject:'💉 Inject HTML'
  },
  fr:{
    tab:'Pub Banner', title:'🖼️ Pub Banner Pro', sub:'Créateur de Bannières de Génie avec Export Photo/Vidéo',
    company:'Nom de l\'Entreprise', companyP:'ex. Acme Corp',
    headline:'Titre Principal', headlineP:'ex. Super Promo -50% !',
    cta:'Texte Bouton', ctaP:'ex. Acheter',
    colorBg:'Couleur Fond', colorText:'Couleur Texte', colorAccent:'Couleur Accent',
    format:'Format de la Bannière', image:'Importer une Photo', imageUpload:'Choisir une Image...',
    style:'Style de Design',
    styles:{ 'glass':'Glassmorphisme', 'neon':'Cyber Néon', 'minimal':'Minimaliste', 'brutal':'Brutalisme' },
    formats:{ '300x250':'Rectangle Moyen', '728x90':'Leaderboard', '160x600':'Skyscraper', '1080x1080':'Carré Insta', '1920x1080':'Full HD Vidéo' },
    btnGen:'🚀 Générer Code HTML', btnPhoto:'📸 Exporter Photo HD', btnVideo:'🎥 Exporter Vidéo',
    msgSuccess:'✅ Bannière générée !', inject:'💉 Injecter HTML'
  }
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var st={
  company:'Acme Corp', headline:'Super Sale 50% Off!', cta:'Shop Now',
  colorBg:'#0f172a', colorText:'#ffffff', colorAccent:'#ec4899',
  format:'1080x1080', style:'glass', imageBase64:''
};

function generateBannerHTML() {
    var fParts = st.format.split('x');
    var w = fParts[0], h = fParts[1];
    var isVert = parseInt(h) > parseInt(w) * 1.5;
    
    var cssStyle = '';
    var animCss = '';
    
    if(st.style === 'glass') {
        cssStyle = 'background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 8px 32px rgba(0,0,0,0.3); border-radius: 16px;';
        animCss = '@keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } } .banner-content { animation: float 4s ease-in-out infinite; }';
    } else if(st.style === 'neon') {
        cssStyle = 'background: #000; border: 2px solid ' + st.colorAccent + '; box-shadow: 0 0 20px ' + st.colorAccent + ', inset 0 0 20px ' + st.colorAccent + '; border-radius: 12px;';
        animCss = '@keyframes pulseGlow { 0% { box-shadow: 0 0 15px ' + st.colorAccent + ', inset 0 0 15px ' + st.colorAccent + '; } 50% { box-shadow: 0 0 40px ' + st.colorAccent + ', inset 0 0 40px ' + st.colorAccent + '; } 100% { box-shadow: 0 0 15px ' + st.colorAccent + ', inset 0 0 15px ' + st.colorAccent + '; } } .banner { animation: pulseGlow 2s infinite; }';
    } else if(st.style === 'minimal') {
        cssStyle = 'background: ' + st.colorBg + '; border: 1px solid rgba(0,0,0,0.1); border-radius: 8px;';
        animCss = '@keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } } .banner-content > * { animation: slideIn 0.8s ease forwards; opacity: 0; } .banner-content h2 { animation-delay: 0.2s; } .banner-content p { animation-delay: 0.4s; } .banner-content button { animation-delay: 0.6s; }';
    } else if(st.style === 'brutal') {
        cssStyle = 'background: ' + st.colorBg + '; border: 6px solid #000; box-shadow: 12px 12px 0px #000; border-radius: 0px;';
        animCss = '@keyframes pop { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } } .cta-btn { animation: pop 1s infinite alternate; }';
    }

    var flexDir = isVert ? 'column' : (st.format==='728x90' ? 'row' : 'column');
    var align = st.format==='728x90' ? 'center' : 'center';
    var justify = st.format==='728x90' ? 'space-between' : 'center';
    var textCenter = st.format==='728x90' ? 'left' : 'center';

    var imageHtml = '';
    var bgOverlay = '';
    if(st.imageBase64) {
        if(st.style==='glass' || st.style==='minimal'){
             bgOverlay = '<div style="position:absolute; inset:0; background: url(\''+st.imageBase64+'\') center/cover; opacity: 0.6; z-index: 0; transition: transform 5s;"></div>';
        } else {
             var imgW = st.format==='728x90' ? '80px' : (parseInt(w)>500 ? '400px' : '100%');
             var imgH = st.format==='728x90' ? '80px' : (parseInt(w)>500 ? '400px' : '200px');
             imageHtml = '<img src="' + st.imageBase64 + '" style="width: '+imgW+'; height: '+imgH+'; object-fit: cover; border-radius: 12px; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);" />';
        }
    }

    var headlineSize = '32px';
    if(st.format==='728x90') headlineSize = '24px';
    if(parseInt(w)>=1080) headlineSize = '80px';
    if(parseInt(w)===1920) headlineSize = '120px';

    var html = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>Ad Banner Pro</title>\n';
    html += '<style>\n';
    html += 'body { margin: 0; padding: 20px; background: #0f172a; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; font-family: "Inter", system-ui, sans-serif; }\n';
    html += '.banner-wrapper { position: relative; width: ' + w + 'px; height: ' + h + 'px; overflow: hidden; background: ' + st.colorBg + '; display: flex; flex-direction: ' + flexDir + '; align-items: ' + align + '; justify-content: ' + justify + '; padding: 40px; box-sizing: border-box; color: ' + st.colorText + '; text-align: '+textCenter+'; ' + cssStyle + ' }\n';
    html += '.banner-content { position: relative; z-index: 10; display: flex; flex-direction: ' + flexDir + '; align-items: ' + align + '; gap: 15px; width: 100%; }\n';
    html += '.company { font-size: '+(parseInt(w)>=1080?'30px':'14px')+'; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; color: ' + st.colorAccent + '; margin:0; }\n';
    html += '.headline { font-size: '+headlineSize+'; font-weight: 900; margin: 0; line-height: 1.1; text-shadow: 0 4px 20px rgba(0,0,0,0.5); }\n';
    html += '.cta-btn { background: ' + st.colorAccent + '; color: #fff; border: none; padding: '+(parseInt(w)>=1080?'20px 50px':'12px 24px')+'; font-weight: 800; font-size: '+(parseInt(w)>=1080?'28px':'16px')+'; cursor: pointer; border-radius: '+(st.style==='brutal'?'0px':'50px')+'; box-shadow: 0 10px 25px '+st.colorAccent+'66; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); white-space:nowrap; margin-top: 10px; '+ (st.style==='brutal'?'border:4px solid #000; box-shadow: 8px 8px 0 #000;':'') +' }\n';
    html += '.cta-btn:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 15px 35px '+st.colorAccent+'99; }\n';
    html += animCss + '\n';
    html += '/* Tools UI */\n';
    html += '.tools { margin-top: 30px; display: flex; gap: 15px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); }\n';
    html += '.tools button { padding: 12px 24px; cursor: pointer; border: none; border-radius: 8px; font-weight: 800; color: white; font-size: 14px; transition: transform 0.2s; }\n';
    html += '.tools button:hover { transform: scale(1.05); }\n';
    html += '.btn-photo { background: linear-gradient(135deg, #10b981, #059669); box-shadow: 0 4px 15px rgba(16,185,129,0.4); }\n';
    html += '.btn-video { background: linear-gradient(135deg, #ef4444, #dc2626); box-shadow: 0 4px 15px rgba(239,68,68,0.4); }\n';
    html += '</style>\n';
    html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"><\/script>\n';
    html += '</head>\n<body>\n';

    html += '<div class="banner-wrapper banner" id="adBanner">\n';
    html += bgOverlay;
    html += '<div class="banner-content">\n';
    html += imageHtml;
    html += '<div style="display:flex; flex-direction:column; gap: 10px; align-items: '+align+';">\n';
    html += '<p class="company">' + st.company + '</p>\n';
    html += '<h2 class="headline">' + st.headline + '</h2>\n';
    html += '</div>\n';
    html += '<button class="cta-btn">' + st.cta + '</button>\n';
    html += '</div>\n';
    html += '</div>\n';

    html += '<div class="tools">\n';
    html += '  <button class="btn-photo" onclick="exportPhoto()">📸 Export HD Photo</button>\n';
    html += '  <button class="btn-video" id="btnRec" onclick="exportVideo()">🎥 Export Video (5s)</button>\n';
    html += '</div>\n';

    html += '<script>\n';
    html += 'function exportPhoto() {\n';
    html += '  if(typeof html2canvas === "undefined") { alert("html2canvas is loading, please wait a second."); return; }\n';
    html += '  const banner = document.getElementById("adBanner");\n';
    html += '  html2canvas(banner, { scale: 2, useCORS: true, backgroundColor: null }).then(canvas => {\n';
    html += '    const a = document.createElement("a");\n';
    html += '    a.download = "banner-hq.png";\n';
    html += '    a.href = canvas.toDataURL("image/png");\n';
    html += '    a.click();\n';
    html += '  });\n';
    html += '}\n';
    html += 'function exportVideo() {\n';
    html += '  if(typeof html2canvas === "undefined") { alert("html2canvas is loading, please wait a second."); return; }\n';
    html += '  const banner = document.getElementById("adBanner");\n';
    html += '  const btn = document.getElementById("btnRec");\n';
    html += '  const width = banner.offsetWidth * 2;\n';
    html += '  const height = banner.offsetHeight * 2;\n';
    html += '  const canvas = document.createElement("canvas");\n';
    html += '  canvas.width = width; canvas.height = height;\n';
    html += '  const ctx = canvas.getContext("2d");\n';
    html += '  \n';
    html += '  const stream = canvas.captureStream(30);\n';
    html += '  const recorder = new MediaRecorder(stream, { mimeType: "video/webm;codecs=vp9" });\n';
    html += '  const chunks = [];\n';
    html += '  recorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };\n';
    html += '  recorder.onstop = () => {\n';
    html += '    const a = document.createElement("a");\n';
    html += '    a.download = "banner_video.webm";\n';
    html += '    a.href = URL.createObjectURL(new Blob(chunks, {type: "video/webm"}));\n';
    html += '    a.click();\n';
    html += '    btn.innerText = "🎥 Export Video (5s)";\n';
    html += '    btn.style.opacity = "1";\n';
    html += '  };\n';
    html += '  btn.innerText = "🔴 Recording..."; btn.style.opacity = "0.5";\n';
    html += '  recorder.start();\n';
    html += '  \n';
    html += '  let frames = 0;\n';
    html += '  const maxFrames = 150;\n';
    html += '  function captureFrame() {\n';
    html += '    html2canvas(banner, { scale: 2, useCORS: true, backgroundColor: null }).then(c => {\n';
    html += '      ctx.clearRect(0,0,width,height);\n';
    html += '      ctx.drawImage(c, 0, 0);\n';
    html += '      frames++;\n';
    html += '      if(frames < maxFrames) {\n';
    html += '        requestAnimationFrame(captureFrame);\n';
    html += '      } else {\n';
    html += '        recorder.stop();\n';
    html += '      }\n';
    html += '    });\n';
    html += '  }\n';
    html += '  captureFrame();\n';
    html += '}\n';
    html += '<\/script>\n';
    html += '</body>\n</html>';
    return html;
}

function render() {
  var p=document.getElementById('left-body');if(!p)return;p.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(255,0,128,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(255,0,128,0.12),rgba(128,0,255,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#ff4da6;">'+t('title')+'</div><div style="font-size:10px;color:#cbd5e1;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);

  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:10px;';

  function createInput(key, label, placeholder) {
      var d=document.createElement('div');
      var l=document.createElement('div');l.style='font-size:10px;color:#cbd5e1;font-weight:700;margin-bottom:4px;';l.textContent=label;
      var i=document.createElement('input');i.value=st[key];i.placeholder=placeholder;
      i.style='width:100%;background:#1e293b;color:#f8fafc;border:1px solid rgba(255,0,128,0.3);border-radius:6px;padding:8px 10px;font-size:11px;outline:none;box-sizing:border-box;transition:0.2s;';
      i.onfocus=function(){this.style.borderColor='#ff0080';this.style.boxShadow='0 0 8px rgba(255,0,128,0.3)';};
      i.onblur=function(){this.style.borderColor='rgba(255,0,128,0.3)';this.style.boxShadow='none';};
      i.oninput=function(){st[key]=this.value;};
      d.appendChild(l);d.appendChild(i);
      return d;
  }
  
  function createColor(key, label) {
      var d=document.createElement('div');
      var l=document.createElement('div');l.style='font-size:10px;color:#cbd5e1;font-weight:700;margin-bottom:4px;';l.textContent=label;
      var i=document.createElement('input');i.type='color';i.value=st[key];
      i.style='width:100%;height:36px;background:#1e293b;border:1px solid rgba(255,0,128,0.3);border-radius:6px;cursor:pointer;padding:2px;';
      i.oninput=function(){st[key]=this.value;};
      d.appendChild(l);d.appendChild(i);
      return d;
  }

  body.appendChild(createInput('company', t('company'), t('companyP')));
  body.appendChild(createInput('headline', t('headline'), t('headlineP')));
  body.appendChild(createInput('cta', t('cta'), t('ctaP')));

  var colorsRow = document.createElement('div');colorsRow.style='display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;';
  colorsRow.appendChild(createColor('colorBg', t('colorBg')));
  colorsRow.appendChild(createColor('colorText', t('colorText')));
  colorsRow.appendChild(createColor('colorAccent', t('colorAccent')));
  body.appendChild(colorsRow);

  var imgWrap = document.createElement('div');
  var imgLbl = document.createElement('div');imgLbl.style='font-size:10px;color:#cbd5e1;font-weight:700;margin-bottom:4px;';imgLbl.textContent=t('image');
  var imgIn = document.createElement('input');imgIn.type='file';imgIn.accept='image/*';
  imgIn.style='width:100%;background:#1e293b;color:#f8fafc;border:1px dashed rgba(255,0,128,0.5);border-radius:6px;padding:10px;font-size:10px;cursor:pointer;';
  imgIn.onchange = function(e){
      if(e.target.files && e.target.files[0]){
          var reader = new FileReader();
          reader.onload = function(re){ st.imageBase64 = re.target.result; };
          reader.readAsDataURL(e.target.files[0]);
      }
  };
  imgWrap.appendChild(imgLbl); imgWrap.appendChild(imgIn);
  body.appendChild(imgWrap);

  var fmtWrap = document.createElement('div');
  var fmtLbl = document.createElement('div');fmtLbl.style='font-size:10px;color:#cbd5e1;font-weight:700;margin-bottom:4px;';fmtLbl.textContent=t('format');
  var fmtSelect = document.createElement('select');
  fmtSelect.style='width:100%;background:#1e293b;color:#f8fafc;border:1px solid rgba(255,0,128,0.3);border-radius:6px;padding:8px;font-size:11px;outline:none;cursor:pointer;';
  var formats = t('formats');
  for(var k in formats) {
      var opt = document.createElement('option'); opt.value = k; opt.textContent = k + ' (' + formats[k] + ')';
      if(st.format === k) opt.selected = true;
      fmtSelect.appendChild(opt);
  }
  fmtSelect.onchange = function(){ st.format = this.value; };
  fmtWrap.appendChild(fmtLbl); fmtWrap.appendChild(fmtSelect);
  body.appendChild(fmtWrap);

  var stlWrap = document.createElement('div');
  var stlLbl = document.createElement('div');stlLbl.style='font-size:10px;color:#cbd5e1;font-weight:700;margin-bottom:4px;';stlLbl.textContent=t('style');
  var stlSelect = document.createElement('select');
  stlSelect.style='width:100%;background:#1e293b;color:#f8fafc;border:1px solid rgba(255,0,128,0.3);border-radius:6px;padding:8px;font-size:11px;outline:none;cursor:pointer;';
  var styles = t('styles');
  for(var k2 in styles) {
      var opt2 = document.createElement('option'); opt2.value = k2; opt2.textContent = styles[k2];
      if(st.style === k2) opt2.selected = true;
      stlSelect.appendChild(opt2);
  }
  stlSelect.onchange = function(){ st.style = this.value; };
  stlWrap.appendChild(stlLbl); stlWrap.appendChild(stlSelect);
  body.appendChild(stlWrap);

  var btn = document.createElement('button');
  btn.innerHTML = t('inject');
  btn.style='width:100%;background:linear-gradient(135deg,#ff0080,#8000ff);color:#fff;border:none;padding:14px;border-radius:8px;font-size:13px;font-weight:900;cursor:pointer;margin-top:15px;box-shadow:0 6px 20px rgba(255,0,128,0.4);transition:0.3s;';
  btn.onmouseover=function(){this.style.transform='scale(1.02)';};
  btn.onmouseout=function(){this.style.transform='scale(1)';};
  body.appendChild(btn);

  btn.onclick=function(){
      var html = generateBannerHTML();
      var inj = window.injectCode || (window.parent && window.parent.injectCode);
      if(typeof inj==='function'){
          inj(html);
          if(window.showToast) window.showToast(t('msgSuccess'));
      }
  };

  wrap.appendChild(body);
  p.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oRT=window.renderTab;
  window.renderTab=function(tab){
      if(tab==='adbannerpro'){
          window.activeTab='adbannerpro';
          document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});
          var b=document.getElementById('tab-adbannerpro');if(b)b.classList.add('active');
          render();
          return;
      }
      if(typeof oRT==='function') oRT(tab);
  };
  var oAL=window.applyLang;
  window.applyLang=function(){
      if(typeof oAL==='function') oAL();
      var el=document.getElementById('lbl-tab-adbannerpro');if(el)el.textContent=t('tab');
      if(window.activeTab==='adbannerpro') render();
  };
});
})();
