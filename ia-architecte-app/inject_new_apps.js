const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'js', 'ia-ultra-engine.js');
let content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

// Find the start of the new app types block (after multipage ends)
// We need to find the pattern: `}` followed by the default else block
// The multipage scriptJS ends with `; and then we want to insert before `} else {`
// Find the last `} else {` before the default workspace block

let elseLineIdx = -1;
for (let i = lines.length - 1; i >= 0; i--) {
    const trimmed = lines[i].trim();
    if (trimmed === '} else {' || trimmed === '          } else {') {
        // Check if the next few lines contain "bodyHTML" and "logo" and "Workspace" (the default)
        const nextBlock = lines.slice(i, i+5).join('\n');
        if (nextBlock.includes('Workspace') || nextBlock.includes('Add Record')) {
            elseLineIdx = i;
            break;
        }
    }
}

if (elseLineIdx === -1) {
    console.error('Could not find the default else block');
    // Let's look for specific patterns
    for (let i = 0; i < lines.length; i++) {
        if (lines[i] && lines[i].includes('Workspace') && lines[i].includes('bodyHTML')) {
            console.log('Found Workspace at line:', i+1, ':', lines[i].substring(0, 80));
        }
    }
    process.exit(1);
}

console.log('Found else block at line:', elseLineIdx + 1);
console.log('Line content:', lines[elseLineIdx]);

// Now, remove everything between the found else line and find the multipage closing
// First let's check if there's already new type code that was injected incorrectly
// We need to find where the PURE clean multipage template string ends
// and remove any bad new-type code that got injected between multipage and the default else

// Find the multipage scriptJS closing (look backwards from elseLineIdx)
let mpEndIdx = -1;
for (let i = elseLineIdx - 1; i >= 0; i--) {
    if (lines[i].trim() === '`;' && i < elseLineIdx) {
        // Check if we're inside the multipage block
        const prevLines = lines.slice(Math.max(0, i-3), i+1).join('\n');
        if (prevLines.includes('document.head.appendChild') || prevLines.includes('showPage') || prevLines.includes('scrollTo')) {
            mpEndIdx = i;
            break;
        }
    }
}

if (mpEndIdx === -1) {
    // Heuristic: look for the scriptJS = ` ... `; of multipage
    for (let i = elseLineIdx - 1; i >= elseLineIdx - 50; i--) {
        if (lines[i] && (lines[i].includes('document.head.appendChild(s)') || lines[i].trim() === '`' + ';')) {
            mpEndIdx = i;
            break;
        }
    }
}

console.log('Multipage end at line:', mpEndIdx + 1);

// If there are lines between mpEndIdx and elseLineIdx that are bad (new type code), remove them
if (mpEndIdx !== -1 && elseLineIdx - mpEndIdx > 3) {
    console.log(`Removing ${elseLineIdx - mpEndIdx - 1} bad lines between line ${mpEndIdx + 2} and ${elseLineIdx}`);
    lines.splice(mpEndIdx + 1, elseLineIdx - mpEndIdx - 1);
    elseLineIdx = mpEndIdx + 1;
    console.log('New else line at:', elseLineIdx + 1);
}

// Now insert the 10 new app type handlers before the else block
const newAppTypes = `          } else if(type === 'restaurant') {
              const _cats = [this.getL('Starters','Entr\\u00e9es'),this.getL('Mains','Plats'),this.getL('Desserts','Desserts'),this.getL('Drinks','Boissons')];
              const _dishesDef = [
                  [{n:'Caesar Salad',p:'$12.50',e:'\\u{1F957}'},{n:'Soup du Jour',p:'$9.00',e:'\\u{1F35C}'},{n:'Bruschetta',p:'$8.50',e:'\\u{1F956}'}],
                  [{n:this.getL('Grilled Salmon','Saumon Grill\\u00e9'),p:'$28.00',e:'\\u{1F41F}'},{n:this.getL('Beef Tenderloin','Filet de Boeuf'),p:'$38.00',e:'\\u{1F969}'},{n:this.getL('Mushroom Risotto','Risotto aux Champignons'),p:'$22.00',e:'\\u{1F344}'}],
                  [{n:'Cr\\u00e8me Brul\\u00e9e',p:'$9.50',e:'\\u{1F36E}'},{n:'Tiramisu',p:'$8.00',e:'\\u2615'},{n:this.getL('Choc Fondant','Fondant Choc'),p:'$10.00',e:'\\u{1F36B}'}],
                  [{n:'Bordeaux Rouge',p:'$14/gl',e:'\\u{1F377}'},{n:this.getL('Craft Beer','Bi\\u00e8re Art.'),p:'$8.00',e:'\\u{1F37A}'},{n:'Espresso',p:'$4.50',e:'\\u2615'}]
              ];
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\\uD83C\\uDF7D\\uFE0F ' + brand + '</div></div><button id="view-order-btn">\\uD83D\\uDED2 ' + this.getL('Order','Commande') + ' (<span id="order-count">0</span>)</button></header>'
                + '<div style="margin:20px 0; display:flex; gap:8px; flex-wrap:wrap;" id="cat-row">' + _cats.map((c,i) => '<button class="cat-btn" data-cat="' + i + '" style="padding:8px 16px;border-radius:20px;font-size:12px;background:' + (i===0?'var(--primary)':'transparent') + ';border:1px solid var(--primary);color:' + (i===0?'#fff':'var(--primary)') + ';cursor:pointer;transition:0.2s;">' + c + '</button>').join('') + '</div>'
                + '<div id="menu-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px;"></div>'
                + '<div id="order-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.9);z-index:1000;align-items:center;justify-content:center;backdrop-filter:blur(10px);">'
                + '<div class="card" style="width:95%;max-width:440px;max-height:80vh;overflow-y:auto;">'
                + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;"><h2 style="margin:0;">\\uD83D\\uDED2 ' + this.getL('Your Order','Votre Commande') + '</h2><button id="close-order" style="background:transparent;font-size:24px;border:none;color:var(--text);cursor:pointer;">&times;</button></div>'
                + '<div id="order-items"></div>'
                + '<div style="border-top:1px solid rgba(255,255,255,0.1);margin-top:20px;padding-top:20px;"><div style="display:flex;justify-content:space-between;font-size:20px;font-weight:900;margin-bottom:20px;"><span>Total:</span><span id="order-total">$0.00</span></div>'
                + '<button style="width:100%;" onclick="placeOrder()">&#10003; ' + this.getL('Place Order','Passer la Commande') + '</button></div></div></div>';
              scriptJS = 'var _cart=[]; var _dishesData=' + JSON.stringify(_dishesDef) + ';'
                + 'function renderMenu(cat){ document.getElementById("menu-grid").innerHTML=_dishesData[cat].map(function(d){ return "<div class=\\'card\\' style=\\'text-align:center;\\'><div style=\\'font-size:60px;margin-bottom:15px;\\'>" + d.e + "</div><h3 style=\\'margin:0 0 5px;\\'>" + d.n + "</h3><p style=\\'color:var(--primary);font-weight:900;font-size:22px;margin:10px 0;\\'>" + d.p + "</p><button onclick=\\'addCart(\\\\\\"" + d.n.replace(/\\"/g,\'\') + "\\\\\\",\\\\\\"" + d.p + "\\\\\\")\\' style=\\'width:100%;\\'>Add</button></div>"; }).join(""); }'
                + 'function addCart(n,p){ _cart.push({n:n,p:p}); document.getElementById("order-count").innerText=_cart.length; showToast(n+" ' + this.getL('added!','ajout\u00e9!') + '"); }'
                + 'function placeOrder(){ showToast("' + this.getL('Order placed!','Commande pass\u00e9e !') + '"); }'
                + 'document.getElementById("view-order-btn").onclick=function(){ var oi=document.getElementById("order-items"); oi.innerHTML=_cart.length?_cart.map(function(i){ return "<div style=\\'display:flex;justify-content:space-between;padding:12px;background:rgba(255,255,255,0.05);border-radius:8px;margin-bottom:8px;\\'><span>"+i.n+"</span><span>"+i.p+"</span></div>"; }).join(""):"<p style=\\'text-align:center;opacity:0.5;\\'>Empty</p>"; document.getElementById("order-modal").style.display="flex"; };'
                + 'document.getElementById("close-order").onclick=function(){ document.getElementById("order-modal").style.display="none"; };'
                + 'document.querySelectorAll(".cat-btn").forEach(function(b,i){ b.onclick=function(){ document.querySelectorAll(".cat-btn").forEach(function(x){ x.style.background="transparent"; x.style.color="var(--primary)"; }); b.style.background="var(--primary)"; b.style.color="#fff"; renderMenu(Number(b.dataset.cat)); }; });'
                + 'renderMenu(0);';
          } else if(type === 'habit_tracker') {
              const _htDays = (isFrPrompt?['L','M','M','J','V','S','D']:['Mo','Tu','We','Th','Fr','Sa','Su']);
              bodyHTML = '<header><div class="logo-area"><div class="logo">\\uD83C\\uDFAF ' + brand + ' ' + this.getL('Habits','Habitudes') + '</div></div><div class="badge">' + this.getL('STREAK TRACKER','SUIVI DE STREAK') + '</div></header>'
                + '<div class="container" style="padding:30px 0;">'
                + '<div style="display:flex;gap:15px;margin-bottom:30px;flex-wrap:wrap;">'
                + '<div class="card" style="text-align:center;flex:1;min-width:120px;"><h1 id="streak-ct" style="margin:0;color:var(--primary);font-size:48px;">0</h1><p style="margin:0;opacity:0.6;">' + this.getL('Day Streak','Jours de suite') + '</p></div>'
                + '<div class="card" style="text-align:center;flex:1;min-width:120px;"><h1 id="total-ct" style="margin:0;color:#10b981;font-size:48px;">0</h1><p style="margin:0;opacity:0.6;">' + this.getL('Total Done','Total Fait') + '</p></div>'
                + '</div>'
                + '<div class="card" style="margin-bottom:20px;"><h3 style="margin-top:0;">' + this.getL('Add Habit','Ajouter Habitude') + '</h3>'
                + '<div style="display:flex;gap:10px;"><input type="text" id="habit-inp" placeholder="' + this.getL('E.g. Exercise 30min...','Ex: Sport 30min...') + '" style="flex:1;"><button id="add-habit-btn">' + this.getL('Add','Ajouter') + '</button></div></div>'
                + '<div id="habits-grid" style="display:flex;flex-direction:column;gap:15px;"></div></div>';
              scriptJS = 'var _hdb=JSON.parse(localStorage.getItem("habits_' + brand.toLowerCase().replace(/\s/g,'_') + '")||"[]");'
                + 'var _htDays=' + JSON.stringify(_htDays) + ';'
                + 'function saveH(){ localStorage.setItem("habits_' + brand.toLowerCase().replace(/\s/g,'_') + '",JSON.stringify(_hdb)); }'
                + 'function renderH(){ var total=0,maxStr=0; document.getElementById("habits-grid").innerHTML=_hdb.map(function(h,hi){ var done=h.log.filter(Boolean).length; total+=done; var s=""; h.log.forEach(function(v,di){ s+="<div onclick=\\'toggleD("+hi+","+di+")\' style=\\'width:36px;height:36px;border-radius:8px;background:"+(v?"var(--primary)":"rgba(255,255,255,0.08)")+";display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;font-weight:700;transition:0.2s;\\'>" +_htDays[di]+"</div>"; }); return "<div class=\\'card\\' style=\\'display:flex;align-items:center;gap:15px;flex-wrap:wrap;\\'><div style=\\'flex:1;\\'><div style=\\'font-weight:900;\\'>" +h.name+"</div><div style=\\'font-size:12px;opacity:0.5;\\'>" +done+"/7</div></div><div style=\\'display:flex;gap:6px;flex-wrap:wrap;\\'>" +s+"</div><button onclick=\\'delH("+hi+")\' style=\\'background:#ef4444;padding:4px 10px;font-size:11px;\\'>Del</button></div>"; }).join(""); document.getElementById("total-ct").innerText=total; document.getElementById("streak-ct").innerText=_hdb.length?Math.max.apply(null,_hdb.map(function(h){ return h.log.filter(Boolean).length; })):0; }'
                + 'window.toggleD=function(hi,di){ _hdb[hi].log[di]=!_hdb[hi].log[di]; saveH(); renderH(); };'
                + 'window.delH=function(hi){ _hdb.splice(hi,1); saveH(); renderH(); };'
                + 'document.getElementById("add-habit-btn").onclick=function(){ var v=document.getElementById("habit-inp").value; if(!v) return; _hdb.push({name:v,log:[false,false,false,false,false,false,false]}); saveH(); renderH(); document.getElementById("habit-inp").value=""; showToast("' + this.getL('Habit added!','Habitude ajout\u00e9e!') + '"); };'
                + 'renderH();';
          } else if(type === 'photo_gallery') {
              const _gImgs = [{e:'\\uD83C\\uDFD4',c:'Nature'},{e:'\\uD83C\\uDFD9',c:'Urban'},{e:'\\uD83C\\uDF0A',c:'Ocean'},{e:'\\uD83E\\uDD8B',c:'Wildlife'},{e:'\\uD83C\\uDF08',c:'Abstract'},{e:'\\uD83C\\uDF03',c:'Night'},{e:'\\uD83C\\uDFE1',c:'Architecture'},{e:'\\uD83E\\uDD41',c:'Minimal'},{e:'\\uD83C\\uDFA8',c:'Art'}];
              const _gData = _gImgs.concat(_gImgs).slice(0,12).map(function(x,i){ return {e:x.e,c:x.c,title:'Photo '+(i+1)}; });
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">' + brand + ' Gallery</div></div>'
                + '<div style="display:flex;gap:8px;">' + ['All','Nature','Urban','Ocean','Wildlife'].map(c => '<button class="gf-btn" data-cat="' + c + '" style="padding:6px 14px;border-radius:20px;font-size:12px;background:' + (c==='All'?'var(--primary)':'transparent') + ';border:1px solid var(--primary);color:' + (c==='All'?'#fff':'var(--primary)') + ';cursor:pointer;">' + c + '</button>').join('') + '</div></header>'
                + '<div class="container" style="padding:30px 0;"><div id="gallery-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:15px;"></div></div>'
                + '<div id="lb-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.95);z-index:1000;align-items:center;justify-content:center;cursor:pointer;" onclick="document.getElementById(\\'lb-modal\\').style.display=\\'none\\'">'
                + '<div style="text-align:center;"><div id="lb-img" style="font-size:180px;user-select:none;"></div><div id="lb-cap" style="color:#fff;margin-top:20px;font-size:20px;font-weight:700;"></div></div></div>';
              scriptJS = 'var _gdata=' + JSON.stringify(_gData) + '; var _gcat="All"; var _filtered=_gdata;'
                + 'function renderGal(){ _filtered=_gcat==="All"?_gdata:_gdata.filter(function(x){ return x.c===_gcat; }); document.getElementById("gallery-grid").innerHTML=_filtered.map(function(x,i){ return "<div onclick=\\'openLB("+i+")\' style=\\'background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;cursor:pointer;transition:0.3s;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:80px;\\'>" +x.e+"</div>"; }).join(""); }'
                + 'window.openLB=function(i){ var x=_filtered[i]; document.getElementById("lb-img").innerText=x.e; document.getElementById("lb-cap").innerText=x.title+" - "+x.c; document.getElementById("lb-modal").style.display="flex"; };'
                + 'document.querySelectorAll(".gf-btn").forEach(function(b){ b.onclick=function(){ _gcat=b.dataset.cat; document.querySelectorAll(".gf-btn").forEach(function(x){ x.style.background="transparent"; x.style.color="var(--primary)"; }); b.style.background="var(--primary)"; b.style.color="#fff"; renderGal(); }; });'
                + 'renderGal();';
          } else if(type === 'budget_planner') {
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\\uD83D\\uDCC9 ' + brand + ' Budget</div></div><div class="badge">' + this.getL('PERSONAL FINANCE','FINANCE PERSO') + '</div></header>'
                + '<div class="container" style="padding:30px 0;display:grid;grid-template-columns:1fr 1fr;gap:30px;">'
                + '<div>'
                + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;margin-bottom:25px;">'
                + '<div class="card" style="text-align:center;border-left:4px solid #10b981;"><div style="font-size:11px;opacity:0.6;margin-bottom:5px;">' + this.getL('INCOME','REVENUS') + '</div><h2 id="inc-total" style="margin:0;color:#10b981;">$0.00</h2></div>'
                + '<div class="card" style="text-align:center;border-left:4px solid #ef4444;"><div style="font-size:11px;opacity:0.6;margin-bottom:5px;">' + this.getL('EXPENSES','D\\u00c9PENSES') + '</div><h2 id="exp-total" style="margin:0;color:#ef4444;">$0.00</h2></div>'
                + '</div>'
                + '<div class="card" style="margin-bottom:20px;border:2px solid var(--primary);"><div style="font-size:11px;opacity:0.6;margin-bottom:5px;">' + this.getL('BALANCE','SOLDE') + '</div><h1 id="balance" style="margin:0;font-size:36px;">$0.00</h1></div>'
                + '</div>'
                + '<div><div class="card" style="margin-bottom:20px;"><h3 style="margin-top:0;">' + this.getL('Add Entry','Ajouter une Entr\u00e9e') + '</h3>'
                + '<div style="display:flex;flex-direction:column;gap:12px;">'
                + '<input type="text" id="b-desc" placeholder="' + this.getL('Description...','Description...') + '">'
                + '<input type="number" id="b-amt" placeholder="' + this.getL('Amount ($)','Montant ($)') + '">'
                + '<select id="b-type"><option value="income">' + this.getL('Income','Revenu') + '</option><option value="expense">' + this.getL('Expense','D\u00e9pense') + '</option></select>'
                + '<button id="b-add-btn" style="width:100%;">' + this.getL('Add Entry','Ajouter') + '</button></div></div>'
                + '<div id="b-list" style="display:flex;flex-direction:column;gap:8px;"></div></div></div>';
              scriptJS = 'var bItems=JSON.parse(localStorage.getItem("budget_' + brand.toLowerCase().replace(/\s/g,'_') + '")||"[]");'
                + 'function saveBudget(){ localStorage.setItem("budget_' + brand.toLowerCase().replace(/\s/g,'_') + '",JSON.stringify(bItems)); }'
                + 'function renderBudget(){ var inc=0,exp=0; bItems.forEach(function(i){ if(i.t==="income") inc+=parseFloat(i.a||0); else exp+=parseFloat(i.a||0); }); var bal=inc-exp; document.getElementById("inc-total").innerText="$"+inc.toFixed(2); document.getElementById("exp-total").innerText="$"+exp.toFixed(2); document.getElementById("balance").innerText=(bal>=0?"+":"-")+"$"+Math.abs(bal).toFixed(2); document.getElementById("balance").style.color=bal>=0?"#10b981":"#ef4444"; document.getElementById("b-list").innerHTML=bItems.slice(0,8).map(function(i){ return "<div style=\\'display:flex;justify-content:space-between;align-items:center;padding:10px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid "+(i.t==="income"?"#10b981":"#ef4444")+";\\'><div><div style=\\'font-weight:700;font-size:13px;\\'>" +i.d+"</div></div><span style=\\'font-weight:900;color:"+(i.t==="income"?"#10b981":"#ef4444")+";\\'>" +(i.t==="income"?"+":"-")+"$"+parseFloat(i.a).toFixed(2)+"</span></div>"; }).join(""); }'
                + 'document.getElementById("b-add-btn").onclick=function(){ var d=document.getElementById("b-desc").value,a=document.getElementById("b-amt").value,t=document.getElementById("b-type").value; if(!d||!a) return; bItems.unshift({d:d,a:a,t:t,id:Date.now()}); saveBudget(); renderBudget(); document.getElementById("b-desc").value=""; document.getElementById("b-amt").value=""; showToast("' + this.getL('Entry added!','Entr\u00e9e ajout\u00e9e!') + '"); };'
                + 'renderBudget();';
          } else if(type === 'translator') {
              const _trDict = {hello:{fr:'Bonjour',es:'Hola',de:'Hallo',it:'Ciao'},'thank you':{fr:'Merci',es:'Gracias',de:'Danke',it:'Grazie'},goodbye:{fr:'Au revoir',es:'Adios',de:'Auf Wiedersehen',it:'Arrivederci'},yes:{fr:'Oui',es:'Si',de:'Ja',it:'Si'},no:{fr:'Non',es:'No',de:'Nein',it:'No'},please:{fr:'S.v.p.',es:'Por favor',de:'Bitte',it:'Per favore'},'good morning':{fr:'Bonjour',es:'Buenos dias',de:'Guten Morgen',it:'Buongiorno'}};
              bodyHTML = '<header style="justify-content:center;flex-direction:column;gap:8px;padding:20px;">'
                + '<div class="logo">\\uD83C\\uDF0D ' + brand + ' ' + this.getL('Translator','Traducteur') + '</div>'
                + '<div style="font-size:12px;opacity:0.6;">' + this.getL('Smart bilingual interface','Interface bilingue intelligente') + '</div></header>'
                + '<div class="container" style="max-width:900px;padding:30px 0;">'
                + '<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:15px;align-items:start;">'
                + '<div class="card"><div style="display:flex;justify-content:space-between;margin-bottom:12px;align-items:center;"><select id="lang-from" style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.2);color:var(--text);border-radius:8px;padding:6px 10px;font-size:13px;cursor:pointer;"><option value="en">EN English</option><option value="fr">FR Fran\u00e7ais</option><option value="es">ES Espa\u00f1ol</option><option value="de">DE Deutsch</option></select><span style="font-size:12px;opacity:0.5;">' + this.getL('Source','Source') + '</span></div>'
                + '<textarea id="tr-input" style="height:200px;resize:none;" placeholder="' + this.getL('Type text to translate...','Saisissez le texte...') + '"></textarea></div>'
                + '<div style="display:flex;flex-direction:column;gap:10px;padding-top:50px;"><button id="tr-swap" style="padding:12px;border-radius:12px;font-size:20px;">&#8644;</button><button id="tr-go" style="padding:12px;border-radius:12px;font-size:16px;">&#8594;</button></div>'
                + '<div class="card"><div style="display:flex;justify-content:space-between;margin-bottom:12px;align-items:center;"><select id="lang-to" style="background:rgba(0,0,0,0.2);border:1px solid rgba(255,255,255,0.2);color:var(--text);border-radius:8px;padding:6px 10px;font-size:13px;cursor:pointer;"><option value="fr">FR Fran\u00e7ais</option><option value="en">EN English</option><option value="es">ES Espa\u00f1ol</option><option value="de">DE Deutsch</option></select>'
                + '<button id="tr-speak" style="background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:4px 10px;font-size:12px;cursor:pointer;">\\uD83D\\uDD0A</button></div>'
                + '<textarea id="tr-output" style="height:200px;resize:none;background:rgba(255,255,255,0.02);" placeholder="' + this.getL('Translation appears here...','La traduction appara\u00eet ici...') + '" readonly></textarea></div></div>'
                + '<div class="card" style="margin-top:20px;"><div style="font-size:12px;opacity:0.6;margin-bottom:10px;">' + this.getL('Quick Phrases','Phrases Rapides') + '</div><div style="display:flex;gap:8px;flex-wrap:wrap;" id="phrase-btns"></div></div></div>';
              scriptJS = 'var _trd=' + JSON.stringify(_trDict) + ';'
                + 'function doTranslate(){ var t=document.getElementById("tr-input").value.toLowerCase().trim(); var to=document.getElementById("lang-to").value; var found=Object.keys(_trd).find(function(k){ return t.includes(k); }); var res=found&&_trd[found][to]?_trd[found][to]:"["+to.toUpperCase()+"]: "+t.split("").reverse().join("").substring(0,60); document.getElementById("tr-output").value=res; showToast("' + this.getL('Translation ready!','Traduction pr\u00eate!') + '"); }'
                + 'document.getElementById("tr-go").onclick=doTranslate;'
                + 'document.getElementById("tr-swap").onclick=function(){ var a=document.getElementById("lang-from"),b=document.getElementById("lang-to"),t=a.value; a.value=b.value; b.value=t; };'
                + 'document.getElementById("tr-speak").onclick=function(){ var t=document.getElementById("tr-output").value; if(t&&window.speechSynthesis){ var u=new SpeechSynthesisUtterance(t); u.lang=document.getElementById("lang-to").value; window.speechSynthesis.speak(u); } };'
                + 'var _phrases=["Hello","Thank you","Please","Yes","No","Good morning"];'
                + 'document.getElementById("phrase-btns").innerHTML=_phrases.map(function(ph){ return "<button onclick=\\'document.getElementById(\\'tr-input\\').value=\\'"+ph+"\\';doTranslate();\' style=\\'background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.3);color:#a78bfa;border-radius:8px;padding:5px 12px;font-size:12px;cursor:pointer;\\'>" +ph+"</button>"; }).join("");';
          } else if(type === 'podcast') {
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\\uD83C\\uDF99\\uFE0F ' + brand + '</div></div><button onclick="showToast(\'' + this.getL('Subscribed!','Abonn\u00e9!') + '\')">' + this.getL('+ Subscribe','+ S\'abonner') + '</button></header>'
                + '<div class="container" style="display:grid;grid-template-columns:1fr 320px;gap:30px;margin-top:30px;">'
                + '<div><h2>' + this.getL('Latest Episodes','Derniers \u00c9pisodes') + '</h2><div id="ep-list" style="display:flex;flex-direction:column;gap:15px;"></div></div>'
                + '<div><div class="card" id="player-card" style="position:sticky;top:20px;">'
                + '<div style="text-align:center;padding:20px 0;">'
                + '<div id="pl-thumb" style="font-size:80px;margin-bottom:15px;">\\uD83C\\uDF99\\uFE0F</div>'
                + '<div id="pl-title" style="font-weight:900;font-size:16px;margin-bottom:5px;">' + this.getL('Select an episode','S\u00e9lectionnez') + '</div>'
                + '<div id="pl-ep" style="font-size:12px;opacity:0.6;margin-bottom:20px;">' + brand + '</div></div>'
                + '<div style="height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin-bottom:15px;overflow:hidden;"><div id="pl-prog" style="width:0%;height:100%;background:var(--primary);transition:width 0.3s;border-radius:2px;"></div></div>'
                + '<div style="display:flex;justify-content:center;gap:20px;">'
                + '<button style="background:transparent;font-size:22px;border:none;color:var(--text);cursor:pointer;padding:8px;" onclick="skipPod(-1)">&#9194;</button>'
                + '<button id="pl-btn" style="width:54px;height:54px;border-radius:50%;font-size:20px;padding:0;" onclick="togglePod()">&#9654;</button>'
                + '<button style="background:transparent;font-size:22px;border:none;color:var(--text);cursor:pointer;padding:8px;" onclick="skipPod(1)">&#9193;</button>'
                + '</div></div></div></div>';
              scriptJS = 'var _eps=[{e:"\\uD83E\\uDD16",t:"' + this.getL('The Future of AI','L\'avenir de l\'IA') + '",d:"48 min"},{e:"\\uD83D\\uDE80",t:"' + this.getL('Build Startups Fast','Startups Rapides') + '",d:"34 min"},{e:"\\uD83D\\uDCA1",t:"' + this.getL('Creative Workflows','Workflows Cr\u00e9atifs') + '",d:"27 min"},{e:"\\uD83C\\uDF0D",t:"' + this.getL('Remote Work Culture','Culture Remote') + '",d:"41 min"},{e:"\\uD83D\\uDCCA",t:"' + this.getL('Data-Driven Decisions','D\u00e9cisions Data') + '",d:"36 min"}];'
                + 'var _curEp=null,_playing=false,_progVal=0,_progInt;'
                + 'document.getElementById("ep-list").innerHTML=_eps.map(function(ep,i){ return "<div onclick=\\'loadEp("+i+")\' class=\\'card\\' style=\\'display:flex;gap:15px;align-items:center;cursor:pointer;transition:0.2s;\\'><div style=\\'font-size:40px;flex-shrink:0;\\'>" +ep.e+"</div><div style=\\'flex:1;\\'><div style=\\'font-weight:700;font-size:14px;margin-bottom:4px;\\'>" +ep.t+"</div><div style=\\'font-size:12px;opacity:0.5;\\'>" +ep.d+"</div></div><button style=\\'padding:8px 14px;font-size:12px;\\'>&#9654;</button></div>"; }).join("");'
                + 'window.loadEp=function(i){ _curEp=i; document.getElementById("pl-thumb").innerText=_eps[i].e; document.getElementById("pl-title").innerText=_eps[i].t; document.getElementById("pl-ep").innerText="Ep."+(i+1)+" · "+_eps[i].d; _progVal=0; document.getElementById("pl-prog").style.width="0%"; showToast("Now playing: "+_eps[i].t); };'
                + 'window.togglePod=function(){ _playing=!_playing; document.getElementById("pl-btn").innerHTML=_playing?"&#9646;&#9646;":"&#9654;"; if(_playing){ _progInt=setInterval(function(){ _progVal=Math.min(100,_progVal+0.3); document.getElementById("pl-prog").style.width=_progVal+"%"; if(_progVal>=100){ clearInterval(_progInt); _playing=false; document.getElementById("pl-btn").innerHTML="&#9654;"; } },300); } else { clearInterval(_progInt); } };'
                + 'window.skipPod=function(d){ if(_curEp!==null){ var ni=_curEp+d; if(ni>=0&&ni<_eps.length) loadEp(ni); } };';
          } else if(type === 'calendar') {
              const _months = isFrPrompt?['Janvier','F\u00e9vrier','Mars','Avril','Mai','Juin','Juillet','Ao\u00fbt','Septembre','Octobre','Novembre','D\u00e9cembre']:['January','February','March','April','May','June','July','August','September','October','November','December'];
              const _dayHeaders = isFrPrompt?['L','M','M','J','V','S','D']:['Su','Mo','Tu','We','Th','Fr','Sa'];
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\\uD83D\\uDCC5 ' + brand + ' ' + this.getL('Calendar','Calendrier') + '</div></div><button id="add-ev-btn">+ ' + this.getL('Add Event','Ajouter') + '</button></header>'
                + '<div class="container" style="padding:30px 0;display:grid;grid-template-columns:1fr 300px;gap:30px;">'
                + '<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">'
                + '<button id="prev-mo" style="background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 12px;color:var(--text);cursor:pointer;">&#8592;</button>'
                + '<h2 id="cal-title" style="margin:0;font-size:20px;"></h2>'
                + '<button id="next-mo" style="background:transparent;border:1px solid rgba(255,255,255,0.2);border-radius:8px;padding:6px 12px;color:var(--text);cursor:pointer;">&#8594;</button></div>'
                + '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:10px;">' + _dayHeaders.map(d => '<div style="text-align:center;font-size:11px;font-weight:700;opacity:0.5;padding:8px 0;">' + d + '</div>').join('') + '</div>'
                + '<div id="cal-grid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;"></div></div>'
                + '<div><div class="card" id="ev-form" style="display:none;margin-bottom:20px;"><h3 style="margin-top:0;">' + this.getL('New Event','Nouvel \u00c9v\u00e9nement') + '</h3>'
                + '<input type="text" id="ev-title" placeholder="' + this.getL('Title...','Titre...') + '" style="margin-bottom:10px;">'
                + '<input type="date" id="ev-date" style="margin-bottom:10px;">'
                + '<div style="display:flex;gap:8px;"><button id="ev-save" style="flex:1;">' + this.getL('Save','Sauver') + '</button><button id="ev-cancel" style="background:transparent;border:1px solid rgba(255,255,255,0.2);color:var(--text);flex:1;cursor:pointer;">' + this.getL('Cancel','Annuler') + '</button></div></div>'
                + '<div class="card"><h3 style="margin-top:0;">' + this.getL('Events','\u00c9v\u00e9nements') + '</h3><div id="ev-list" style="display:flex;flex-direction:column;gap:8px;max-height:400px;overflow-y:auto;"></div></div></div></div>';
              scriptJS = 'var _calEvs=JSON.parse(localStorage.getItem("cal_' + brand.toLowerCase().replace(/\s/g,'_') + '")||"[]");'
                + 'var _calDate=new Date();'
                + 'var _calMonths=' + JSON.stringify(_months) + ';'
                + 'function saveCalEvs(){ localStorage.setItem("cal_' + brand.toLowerCase().replace(/\s/g,'_') + '",JSON.stringify(_calEvs)); }'
                + 'function renderCal(){ var y=_calDate.getFullYear(),m=_calDate.getMonth(); document.getElementById("cal-title").innerText=_calMonths[m]+" "+y; var first=new Date(y,m,1).getDay(),days=new Date(y,m+1,0).getDate(),html=""; for(var i=0;i<first;i++) html+="<div></div>"; for(var d=1;d<=days;d++){ var ds=y+"-"+String(m+1).padStart(2,"0")+"-"+String(d).padStart(2,"0"); var evs=_calEvs.filter(function(e){ return e.date===ds; }); html+="<div style=\\'border-radius:8px;background:rgba(255,255,255,0.04);padding:6px;min-height:50px;cursor:pointer;border:1px solid rgba(255,255,255,0.05);transition:0.2s;\\' onclick=\\'quickAdd(\\""+ds+"\\");\\'><div style=\\'font-size:12px;font-weight:700;margin-bottom:3px;\\'>" +d+"</div>" +evs.map(function(e){ return "<div style=\\'font-size:9px;background:#8b5cf622;color:#a78bfa;padding:2px 4px;border-radius:3px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;\\'>" +e.t+"</div>"; }).join("") +"</div>"; } document.getElementById("cal-grid").innerHTML=html; renderEvList(); }'
                + 'function renderEvList(){ document.getElementById("ev-list").innerHTML=_calEvs.length?_calEvs.map(function(e){ return "<div style=\\'display:flex;justify-content:space-between;align-items:center;padding:8px;background:rgba(255,255,255,0.04);border-radius:8px;border-left:3px solid #8b5cf6;\\'><div><div style=\\'font-weight:700;font-size:12px;\\'>" +e.t+"</div><div style=\\'font-size:10px;opacity:0.5;\\'>" +e.date+"</div></div><button onclick=\\'delEv("+e.id+")\' style=\\'background:#ef4444;padding:4px 8px;font-size:10px;\\'>Del</button></div>"; }).join(""):"<p style=\\'text-align:center;opacity:0.4;font-size:12px;\\'>No events</p>"; }'
                + 'window.delEv=function(id){ _calEvs=_calEvs.filter(function(e){ return e.id!==id; }); saveCalEvs(); renderCal(); };'
                + 'window.quickAdd=function(ds){ document.getElementById("ev-date").value=ds; document.getElementById("ev-form").style.display="block"; };'
                + 'document.getElementById("add-ev-btn").onclick=function(){ document.getElementById("ev-form").style.display="block"; };'
                + 'document.getElementById("ev-cancel").onclick=function(){ document.getElementById("ev-form").style.display="none"; };'
                + 'document.getElementById("ev-save").onclick=function(){ var t=document.getElementById("ev-title").value,date=document.getElementById("ev-date").value; if(!t||!date) return; _calEvs.push({t:t,date:date,id:Date.now()}); saveCalEvs(); document.getElementById("ev-form").style.display="none"; document.getElementById("ev-title").value=""; renderCal(); showToast("' + this.getL('Event added!','\u00c9v\u00e9nement ajout\u00e9!') + '"); };'
                + 'document.getElementById("prev-mo").onclick=function(){ _calDate.setMonth(_calDate.getMonth()-1); renderCal(); };'
                + 'document.getElementById("next-mo").onclick=function(){ _calDate.setMonth(_calDate.getMonth()+1); renderCal(); };'
                + 'renderCal();';
          } else if(type === 'quiz') {
              bodyHTML = '<header style="justify-content:center;"><div class="logo">\\u2753 ' + brand + ' Quiz</div></header>'
                + '<div style="min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:30px;">'
                + '<div id="quiz-start" style="text-align:center;"><div style="font-size:80px;margin-bottom:30px;">\\uD83E\\uDDE0</div>'
                + '<h1 style="font-size:42px;margin-bottom:10px;">' + this.getL('Ready to test your knowledge?','Pr\u00eat \u00e0 tester vos connaissances ?') + '</h1>'
                + '<p style="opacity:0.7;font-size:18px;margin-bottom:40px;">' + this.getL('10 questions · 15 sec each','10 questions · 15 sec chacune') + '</p>'
                + '<button id="start-quiz" style="padding:18px 50px;font-size:20px;border-radius:30px;">' + this.getL('Start Quiz','D\u00e9marrer le Quiz') + '</button></div>'
                + '<div id="quiz-game" style="display:none;width:100%;max-width:650px;">'
                + '<div style="display:flex;justify-content:space-between;margin-bottom:20px;"><span id="q-num" style="font-size:14px;opacity:0.6;">1/10</span><span id="q-timer" style="font-size:16px;font-weight:900;color:var(--primary);">15</span><span id="q-score" style="font-size:14px;opacity:0.6;">Score: 0</span></div>'
                + '<div style="height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin-bottom:30px;"><div id="timer-bar" style="height:100%;background:var(--primary);border-radius:2px;transition:width 1s linear;"></div></div>'
                + '<div class="card" style="margin-bottom:20px;"><h2 id="q-text" style="font-size:20px;line-height:1.4;margin:0;">...</h2></div>'
                + '<div id="q-opts" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;"></div></div>'
                + '<div id="quiz-end" style="display:none;text-align:center;"><div style="font-size:80px;margin-bottom:20px;">\\uD83C\\uDFC6</div>'
                + '<h1 id="end-score" style="font-size:56px;margin-bottom:10px;color:var(--primary);">0</h1>'
                + '<p style="font-size:20px;opacity:0.7;margin-bottom:30px;">' + this.getL('out of 10 correct!','bonnes r\u00e9ponses sur 10 !') + '</p>'
                + '<button id="restart-quiz" style="padding:15px 40px;border-radius:20px;">' + this.getL('Play Again','Rejouer') + '</button></div></div>';
              scriptJS = 'var _Qs=[{q:"' + this.getL('What does HTML stand for?','Que signifie HTML ?') + '",opts:["HyperText Markup Language","High Tech Modern Language","Home Tool Markup","Hyperlink Text Mode"],a:0},'
                + '{q:"' + this.getL('Which planet is closest to the Sun?','Quelle plan\u00e8te est la plus proche du Soleil ?') + '",opts:["Venus","Mercury","Mars","Earth"],a:1},'
                + '{q:"' + this.getL('What is 12 x 12?','Combien font 12 x 12 ?') + '",opts:["132","144","124","154"],a:1},'
                + '{q:"' + this.getL('Sides of a hexagon?','C\u00f4t\u00e9s d\'un hexagone ?') + '",opts:["5","6","7","8"],a:1},'
                + '{q:"' + this.getL('Which gas do plants absorb?','Quel gaz les plantes absorbent ?') + '",opts:["Oxygen","Nitrogen","CO2","Helium"],a:2},'
                + '{q:"' + this.getL('JavaScript was created in?','JavaScript cr\u00e9\u00e9 en ?') + '",opts:["1992","1995","1998","2000"],a:1},'
                + '{q:"' + this.getL('Capital of France?','Capitale de la France ?') + '",opts:["Lyon","Marseille","Paris","Bordeaux"],a:2},'
                + '{q:"' + this.getL('Bytes in a kilobyte?','Octets dans un kilo-octet ?') + '",opts:["512","1024","2048","256"],a:1},'
                + '{q:"' + this.getL('Speed of light (approx)?','Vitesse de la lumi\u00e8re (approx) ?') + '",opts:["300,000 km/s","150,000 km/s","450,000 km/s","600,000 km/s"],a:0},'
                + '{q:"' + this.getL('CSS stands for?','CSS signifie ?') + '",opts:["Cascading Style Sheets","Creative Style System","Computer Style Syntax","Colorful Style Sheets"],a:0}];'
                + 'var _qi=0,_score=0,_qtimer,_qtv=15;'
                + 'function startQuiz(){ _qi=0;_score=0; document.getElementById("quiz-start").style.display="none"; document.getElementById("quiz-end").style.display="none"; document.getElementById("quiz-game").style.display="block"; showQ(); }'
                + 'function showQ(){ if(_qi>=_Qs.length){ endQuiz(); return; } clearInterval(_qtimer); _qtv=15; var q=_Qs[_qi]; document.getElementById("q-num").innerText=(_qi+1)+"/10"; document.getElementById("q-text").innerText=q.q; document.getElementById("q-score").innerText="Score: "+_score; document.getElementById("q-opts").innerHTML=q.opts.map(function(o,i){ return "<button onclick=\\'answerQ("+i+")\' style=\\'padding:14px;border-radius:12px;background:rgba(255,255,255,0.05);border:2px solid rgba(255,255,255,0.1);color:var(--text);cursor:pointer;font-size:14px;transition:0.2s;\\'>" +o+"</button>"; }).join(""); var bar=document.getElementById("timer-bar"); bar.style.transition="none"; bar.style.width="100%"; setTimeout(function(){ bar.style.transition="width 15s linear"; bar.style.width="0%"; },50); _qtimer=setInterval(function(){ _qtv--; document.getElementById("q-timer").innerText=_qtv; if(_qtv<=0){ clearInterval(_qtimer); document.querySelectorAll("#q-opts button").forEach(function(b){ b.disabled=true; }); setTimeout(function(){ _qi++; showQ(); },1000); } },1000); }'
                + 'window.answerQ=function(i){ clearInterval(_qtimer); var correct=_Qs[_qi].a===i; if(correct){ _score+=100; document.querySelectorAll("#q-opts button")[i].style.background="#10b98133"; document.querySelectorAll("#q-opts button")[i].style.borderColor="#10b981"; } else { document.querySelectorAll("#q-opts button")[i].style.background="#ef444433"; document.querySelectorAll("#q-opts button")[i].style.borderColor="#ef4444"; } document.querySelectorAll("#q-opts button").forEach(function(b){ b.disabled=true; }); setTimeout(function(){ _qi++; showQ(); },1200); };'
                + 'function endQuiz(){ document.getElementById("quiz-game").style.display="none"; document.getElementById("quiz-end").style.display="block"; document.getElementById("end-score").innerText=_score; showToast("' + this.getL('Quiz complete! ','Quiz termin\u00e9 ! ') + '"+_score+"pts"); }'
                + 'document.getElementById("start-quiz").onclick=startQuiz;'
                + 'document.getElementById("restart-quiz").onclick=startQuiz;';
          } else if(type === 'landing_premium') {
              bodyHTML = '<header style="position:sticky;top:0;z-index:100;background:rgba(0,0,0,0.6);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.08);padding:12px 0;">'
                + '<div class="container" style="display:flex;justify-content:space-between;align-items:center;padding:0 20px;">'
                + '<div class="logo-area">' + logoIcon + '<div class="logo">' + brand + '</div></div>'
                + '<nav style="display:flex;gap:25px;align-items:center;">'
                + '<a href="#features" style="color:var(--text);text-decoration:none;font-size:14px;opacity:0.7;">' + this.getL('Features','Fonctionnalit\u00e9s') + '</a>'
                + '<a href="#pricing" style="color:var(--text);text-decoration:none;font-size:14px;opacity:0.7;">' + this.getL('Pricing','Tarifs') + '</a>'
                + '<button style="padding:8px 20px;font-size:14px;">' + this.getL('Get Started Free','Commencer Gratuitement') + '</button></nav></div></header>'
                + '<div style="min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 20px;position:relative;overflow:hidden;">'
                + '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,' + primary + '22,transparent 70%);border-radius:50%;pointer-events:none;"></div>'
                + '<div class="badge" style="font-size:14px;padding:8px 20px;margin-bottom:30px;background:' + primary + '22;color:' + primary + ';border:1px solid ' + primary + '44;">' + this.getL('Launching 2026 · Early Access','Lancement 2026 · Acc\u00e8s Anticip\u00e9') + '</div>'
                + '<h1 style="font-size:72px;line-height:1.1;margin:0 0 25px;letter-spacing:-3px;max-width:900px;">' + this.getL('The Future of','L\'Avenir de la') + ' <span style="color:' + primary + ';">' + brand + '</span> ' + this.getL('Starts Here','Commence Ici') + '</h1>'
                + '<p style="font-size:22px;opacity:0.7;max-width:600px;line-height:1.6;margin:0 0 50px;">' + this.getL('Join thousands of innovators building the next generation of digital experiences.','Rejoignez des milliers d\'innovateurs construisant la prochaine g\u00e9n\u00e9ration.') + '</p>'
                + '<div style="display:flex;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:16px;overflow:hidden;">'
                + '<input type="email" id="waitlist-email" placeholder="' + this.getL('Enter your email...','Entrez votre email...') + '" style="border:none;background:transparent;width:280px;border-radius:0;box-shadow:none;">'
                + '<button id="join-btn" style="border-radius:0px;white-space:nowrap;">' + this.getL('Join Waitlist','Rejoindre') + '</button></div>'
                + '<p style="font-size:12px;opacity:0.4;margin-top:20px;">&#128274; ' + this.getL('No spam. Unsubscribe anytime.','Pas de spam.') + '</p></div>'
                + '<div id="features" style="padding:100px 0;background:rgba(0,0,0,0.2);"><div class="container"><h2 style="text-align:center;font-size:48px;margin-bottom:60px;">' + this.getL('Everything you need','Tout ce dont vous avez besoin') + '</h2>'
                + '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:30px;">'
                + '<div class="card" style="text-align:center;"><div style="font-size:48px;margin-bottom:20px;">&#9889;</div><h3>' + this.getL('Lightning Fast','Ultra Rapide') + '</h3></div>'
                + '<div class="card" style="text-align:center;"><div style="font-size:48px;margin-bottom:20px;">&#128737;</div><h3>' + this.getL('Enterprise Security','S\u00e9curit\u00e9 Entreprise') + '</h3></div>'
                + '<div class="card" style="text-align:center;"><div style="font-size:48px;margin-bottom:20px;">&#129302;</div><h3>' + this.getL('AI-Powered','Propuls\u00e9 par l\'IA') + '</h3></div>'
                + '</div></div></div>'
                + '<div id="pricing" style="padding:100px 0;"><div class="container"><h2 style="text-align:center;font-size:48px;margin-bottom:60px;">' + this.getL('Simple Pricing','Tarifs Simples') + '</h2>'
                + '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:25px;max-width:900px;margin:0 auto;">'
                + '<div class="card" style="text-align:center;"><div class="badge">' + this.getL('STARTER','D\u00c9BUTANT') + '</div><h2 style="font-size:42px;margin:20px 0;">Free</h2><button style="width:100%;background:transparent;border:1px solid var(--primary);color:var(--primary);">' + this.getL('Get Started','Commencer') + '</button></div>'
                + '<div class="card" style="text-align:center;border:2px solid ' + primary + ';transform:scale(1.05);box-shadow:0 0 30px ' + primary + '33;"><div class="badge">PRO &#11088;</div><h2 style="font-size:42px;margin:20px 0;color:' + primary + ';">$29<span style="font-size:16px;opacity:0.7;">/mo</span></h2><button style="width:100%;">' + this.getL('Start Free Trial','Essai Gratuit') + '</button></div>'
                + '<div class="card" style="text-align:center;"><div class="badge">ENTERPRISE</div><h2 style="font-size:42px;margin:20px 0;">$99<span style="font-size:16px;opacity:0.7;">/mo</span></h2><button style="width:100%;">' + this.getL('Contact Sales','Contacter') + '</button></div>'
                + '</div></div></div>';
              scriptJS = 'document.getElementById("join-btn").onclick=function(){ var e=document.getElementById("waitlist-email").value; if(!e||!e.includes("@")) return; showToast("' + this.getL("You're on the list!","Vous \u00eates sur la liste !") + '"); document.getElementById("waitlist-email").value=""; };';
          } else if(type === 'resume_builder') {
              bodyHTML = '<header><div class="logo-area">' + logoIcon + '<div class="logo">\\uD83D\\uDCC4 ' + brand + ' ' + this.getL('Resume Builder','G\u00e9n\u00e9rateur de CV') + '</div></div><button id="dl-cv">' + this.getL('Download CV','T\u00e9l\u00e9charger CV') + '</button></header>'
                + '<div class="container" style="display:grid;grid-template-columns:1fr 1fr;gap:30px;padding:30px 0;">'
                + '<div style="display:flex;flex-direction:column;gap:20px;">'
                + '<div class="card"><h3 style="margin-top:0;">&#128100; ' + this.getL('Personal Info','Informations Personnelles') + '</h3><div style="display:flex;flex-direction:column;gap:12px;">'
                + '<input type="text" id="cv-name" placeholder="' + this.getL('Full Name','Nom Complet') + '" oninput="updateCV()">'
                + '<input type="text" id="cv-title" placeholder="' + this.getL('Job Title','Titre Professionnel') + '" oninput="updateCV()">'
                + '<input type="email" id="cv-email" placeholder="Email" oninput="updateCV()">'
                + '<textarea id="cv-summary" style="height:80px;" placeholder="' + this.getL('Professional summary...','R\u00e9sum\u00e9 professionnel...') + '" oninput="updateCV()"></textarea></div></div>'
                + '<div class="card"><h3 style="margin-top:0;">&#128188; ' + this.getL('Experience','Exp\u00e9rience') + '</h3><div id="exp-list" style="display:flex;flex-direction:column;gap:10px;"></div>'
                + '<button id="add-exp" style="width:100%;margin-top:15px;background:transparent;border:1px dashed var(--primary);color:var(--primary);">+ ' + this.getL('Add Experience','Ajouter Exp\u00e9rience') + '</button></div>'
                + '<div class="card"><h3 style="margin-top:0;">&#128295; ' + this.getL('Skills','Comp\u00e9tences') + '</h3><div style="display:flex;gap:8px;margin-bottom:10px;">'
                + '<input type="text" id="skill-inp" placeholder="' + this.getL('Add skill...','Ajouter comp\u00e9tence...') + '" style="flex:1;"><button id="add-skill">+</button></div>'
                + '<div id="skills-cloud" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div></div>'
                + '<div><div class="card" id="cv-preview" style="min-height:600px;background:#ffffff;color:#0f172a;padding:40px;font-family:Inter,sans-serif;">'
                + '<div id="cv-head" style="border-bottom:3px solid ' + primary + ';padding-bottom:20px;margin-bottom:25px;">'
                + '<h1 id="p-name" style="font-size:28px;margin:0;color:' + primary + ';">' + this.getL('Your Name','Votre Nom') + '</h1>'
                + '<div id="p-title" style="font-size:16px;opacity:0.7;margin:5px 0;">' + this.getL('Your Title','Votre Titre') + '</div>'
                + '<div id="p-contact" style="font-size:12px;opacity:0.6;margin-top:8px;">email@example.com</div></div>'
                + '<div id="p-summary" style="margin-bottom:25px;font-size:13px;line-height:1.6;opacity:0.8;"></div>'
                + '<div id="p-exp-section" style="display:none;margin-bottom:25px;"><h3 style="color:' + primary + ';border-bottom:1px solid ' + primary + '44;padding-bottom:8px;">' + this.getL('EXPERIENCE','EXP\u00c9RIENCE') + '</h3><div id="p-exp"></div></div>'
                + '<div id="p-skills-section" style="display:none;"><h3 style="color:' + primary + ';border-bottom:1px solid ' + primary + '44;padding-bottom:8px;">' + this.getL('SKILLS','COMP\u00c9TENCES') + '</h3><div id="p-skills" style="display:flex;flex-wrap:wrap;gap:8px;"></div></div>'
                + '</div></div></div>';
              scriptJS = 'var _exps=[{role:"' + this.getL('Software Developer','D\u00e9veloppeur Logiciel') + '",company:"Tech Corp",dates:"2022-' + this.getL('Present','Pr\u00e9sent') + '",desc:"' + this.getL('Built scalable web apps.','Applications web \u00e9volutives.') + '"}];'
                + 'var _skills=["JavaScript","HTML/CSS","React"];'
                + 'function renderExpList(){ document.getElementById("exp-list").innerHTML=_exps.map(function(e,i){ return "<div class=\\'card\\' style=\\'padding:12px;margin-bottom:5px;\\'><div style=\\'font-weight:700;\\'>" +e.role+"</div><div style=\\'font-size:12px;opacity:0.6;\\'>" +e.company+" \u00b7 "+e.dates+"</div><button onclick=\\'_exps.splice("+i+",1);renderExpList();updateCV();\' style=\\'background:#ef4444;padding:3px 8px;font-size:10px;margin-top:5px;\\'>' + this.getL('Remove','Supprimer') + '</button></div>"; }).join(""); updateCV(); }'
                + 'function renderSkillCloud(){ document.getElementById("skills-cloud").innerHTML=_skills.map(function(s,i){ return "<span style=\\'background:' + primary + '22;border:1px solid ' + primary + '44;color:' + primary + ';border-radius:20px;padding:4px 12px;font-size:12px;cursor:pointer;\\' onclick=\\'_skills.splice("+i+",1);renderSkillCloud();\\'>" +s+" \u00d7</span>"; }).join(""); updateCV(); }'
                + 'window.updateCV=function(){ var n=document.getElementById("cv-name").value||"' + this.getL('Your Name','Votre Nom') + '",t=document.getElementById("cv-title").value||"' + this.getL('Your Title','Votre Titre') + '",em=document.getElementById("cv-email").value||"email@example.com",s=document.getElementById("cv-summary").value; document.getElementById("p-name").innerText=n; document.getElementById("p-title").innerText=t; document.getElementById("p-contact").innerText=em; document.getElementById("p-summary").innerText=s; document.getElementById("p-exp-section").style.display=_exps.length?"block":"none"; document.getElementById("p-exp").innerHTML=_exps.map(function(e){ return "<div style=\\'margin-bottom:15px;\\'><div style=\\'font-weight:700;font-size:14px;\\'>" +e.role+"</div><div style=\\'font-size:12px;opacity:0.6;margin-bottom:5px;\\'>" +e.company+" \u00b7 "+e.dates+"</div><div style=\\'font-size:13px;opacity:0.8;\\'>" +e.desc+"</div></div>"; }).join(""); document.getElementById("p-skills-section").style.display=_skills.length?"block":"none"; document.getElementById("p-skills").innerHTML=_skills.map(function(s){ return "<span style=\\'background:' + primary + '22;color:' + primary + ';border:1px solid ' + primary + '44;border-radius:4px;padding:4px 10px;font-size:12px;\\'>" +s+"</span>"; }).join(""); };'
                + 'document.getElementById("add-exp").onclick=function(){ var r=prompt("' + this.getL('Role Title:','Titre du Poste :') + '"); var c=prompt("' + this.getL('Company:','Entreprise :') + '"); if(r&&c){ _exps.push({role:r,company:c,dates:"2023-' + this.getL('Present','Pr\u00e9sent') + '",desc:"' + this.getL('Key responsibilities.','Responsabilit\u00e9s cl\u00e9s.') + '"}); renderExpList(); } };'
                + 'document.getElementById("add-skill").onclick=function(){ var s=document.getElementById("skill-inp").value; if(s){ _skills.push(s); document.getElementById("skill-inp").value=""; renderSkillCloud(); } };'
                + 'document.getElementById("dl-cv").onclick=function(){ var cv=document.getElementById("cv-preview").outerHTML; var html="<!DOCTYPE html><html><head><link href=\\"https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap\\" rel=\\"stylesheet\\"><style>body{font-family:Inter,sans-serif;padding:40px;background:#fff;color:#0f172a;}</style></head><body>"+cv+"</body></html>"; var a=document.createElement("a"); a.href=URL.createObjectURL(new Blob([html],{type:"text/html"})); a.download="cv.html"; a.click(); showToast("' + this.getL('CV downloaded!','CV t\u00e9l\u00e9charg\u00e9!') + '"); };'
                + 'renderExpList(); renderSkillCloud(); updateCV();';
`;

// Insert the new app types before the else block
lines.splice(elseLineIdx, 0, newAppTypes);

const newContent = lines.join('\n');
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Inserted new app types. New total lines:', newContent.split('\n').length);
