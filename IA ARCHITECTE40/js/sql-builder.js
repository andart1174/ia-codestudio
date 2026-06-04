/**
 * SQL Query Builder v1.0 — EN/FR
 */
(function(){
'use strict';
var TX={
  en:{tab:'SQL',title:'🗃️ SQL Query Builder',sub:'Build queries visually → export SQL',
      table:'Table Name:',tablePh:'users',selectAll:'SELECT *',
      addCol:'+ Column',addWhere:'+ WHERE',addJoin:'+ JOIN',
      orderBy:'ORDER BY:',limit:'LIMIT:',
      btnGen:'⚡ Generate SQL',btnCopy:'📋 Copy',btnMock:'🎲 Mock Data',
      copied:'📋 Copied!',col:'Column',op:'Operator',val:'Value',
      joinType:'Type',joinTable:'Join Table',joinOn:'ON',
      ops:['=','!=','>','<','>=','<=','LIKE','IN','IS NULL'],
      joins:['INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN']},
  fr:{tab:'SQL',title:'🗃️ Constructeur SQL',sub:'Construisez des requêtes visuellement',
      table:'Nom de Table :',tablePh:'utilisateurs',selectAll:'SELECT *',
      addCol:'+ Colonne',addWhere:'+ WHERE',addJoin:'+ JOIN',
      orderBy:'ORDER BY :',limit:'LIMITE :',
      btnGen:'⚡ Générer SQL',btnCopy:'📋 Copier',btnMock:'🎲 Données Mock',
      copied:'📋 Copié !',col:'Colonne',op:'Opérateur',val:'Valeur',
      joinType:'Type',joinTable:'Table',joinOn:'ON',
      ops:['=','!=','>','<','>=','<=','LIKE','IN','IS NULL'],
      joins:['INNER JOIN','LEFT JOIN','RIGHT JOIN','FULL JOIN']}
};
function gl(){return window.lang||'en';}
function t(k){return(TX[gl()]||TX.en)[k]||k;}

var state={table:'users',cols:['*'],wheres:[],joins:[],orderBy:'',limit:'',orderDir:'ASC'};
var lastSQL='';

var MOCK_DATA={users:[{id:1,name:'Alice Martin',email:'alice@example.com',age:28,role:'admin'},{id:2,name:'Bob Dupont',email:'bob@example.com',age:34,role:'user'},{id:3,name:'Carol Smith',email:'carol@example.com',age:22,role:'user'}],products:[{id:1,name:'Widget Pro',price:49.99,category:'tech',stock:150},{id:2,name:'Gadget X',price:129.99,category:'tech',stock:43}],orders:[{id:1,user_id:1,product_id:2,quantity:2,total:259.98,date:'2024-01-15'}]};

function buildSQL(){
  var cols=state.cols.filter(function(c){return c.trim();}).join(', ')||'*';
  var sql='SELECT '+cols+'\nFROM '+state.table;
  state.joins.forEach(function(j){if(j.type&&j.table&&j.on)sql+='\n'+j.type+' '+j.table+' ON '+j.on;});
  if(state.wheres.length){
    var conditions=state.wheres.filter(function(w){return w.col&&w.op;}).map(function(w){
      if(w.op==='IS NULL')return w.col+' IS NULL';
      if(w.op==='IN')return w.col+' IN ('+w.val+')';
      if(w.op==='LIKE')return w.col+" LIKE '%"+w.val+"%'";
      var isNum=!isNaN(w.val)&&w.val!=='';
      return w.col+' '+w.op+' '+(isNum?w.val:"'"+w.val+"'");
    });
    if(conditions.length)sql+='\nWHERE '+conditions.join('\n  AND ');
  }
  if(state.orderBy)sql+='\nORDER BY '+state.orderBy+' '+state.orderDir;
  if(state.limit)sql+='\nLIMIT '+state.limit;
  sql+=';';
  return sql;
}

function getMockData(){
  var tbl=state.table.toLowerCase();
  var data=MOCK_DATA[tbl]||[{id:1,name:'Sample Row',value:'Example',created_at:'2024-01-01'}];
  return'-- Mock data for: '+state.table+'\n'+JSON.stringify(data,null,2);
}

function renderTab(){
  var parent=document.getElementById('left-body');if(!parent)return;
  parent.innerHTML='';
  var wrap=document.createElement('div');wrap.style='display:flex;flex-direction:column;height:100%;overflow:hidden;background:#0c0f1a;';
  var hdr=document.createElement('div');hdr.style='padding:12px 14px 10px;border-bottom:1px solid rgba(16,185,129,0.3);flex-shrink:0;background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(6,182,212,0.06));';
  hdr.innerHTML='<div style="font-size:13px;font-weight:900;color:#34d399;">'+t('title')+'</div><div style="font-size:10px;color:#64748b;margin-top:2px;">'+t('sub')+'</div>';
  wrap.appendChild(hdr);
  var body=document.createElement('div');body.style='flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:7px;';

  function mkInp(ph,val,style){var i=document.createElement('input');i.type='text';i.placeholder=ph||'';i.value=val||'';i.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(16,185,129,0.18);padding:6px 8px;border-radius:6px;font-size:10px;font-family:"JetBrains Mono",monospace;outline:none;'+(style||'');return i;}
  function mkSel(opts,val,style){var s=document.createElement('select');s.style='background:#0f172a;color:#e2e8f0;border:1px solid rgba(16,185,129,0.18);padding:6px;border-radius:6px;font-size:9px;cursor:pointer;outline:none;'+(style||'');opts.forEach(function(o){var op=document.createElement('option');op.value=o;op.textContent=o;op.selected=val===o;s.appendChild(op);});return s;}
  function mkLabel(txt){var l=document.createElement('div');l.style='font-size:10px;color:#64748b;font-weight:600;';l.textContent=txt;return l;}

  // Table name
  body.appendChild(mkLabel(t('table')));
  var tblInp=mkInp(t('tablePh'),state.table,'width:100%;box-sizing:border-box;');
  tblInp.oninput=function(){state.table=this.value;};body.appendChild(tblInp);

  // Columns
  body.appendChild(mkLabel(gl()==='fr'?'Colonnes :':'Columns:'));
  var colsWrap=document.createElement('div');colsWrap.style='display:flex;flex-direction:column;gap:4px;';
  state.cols.forEach(function(c,i){
    var cr=document.createElement('div');cr.style='display:flex;gap:4px;';
    var ci=mkInp('column name, alias...',c,'flex:1;');
    ci.onchange=(function(idx){return function(){state.cols[idx]=this.value;};})(i);
    var rm=document.createElement('button');rm.textContent='✕';rm.style='background:transparent;color:#64748b;border:none;cursor:pointer;font-size:11px;';
    rm.onclick=(function(idx){return function(){if(state.cols.length>1){state.cols.splice(idx,1);renderTab();}};})(i);
    if(state.cols.length<=1)rm.style.display='none';
    cr.appendChild(ci);cr.appendChild(rm);colsWrap.appendChild(cr);
  });
  var addColBtn=document.createElement('button');addColBtn.textContent=t('addCol');
  addColBtn.style='font-size:9px;padding:5px;background:rgba(16,185,129,0.08);color:#34d399;border:1px dashed rgba(16,185,129,0.25);border-radius:6px;cursor:pointer;width:100%;';
  addColBtn.onclick=function(){state.cols.push('');renderTab();};
  colsWrap.appendChild(addColBtn);body.appendChild(colsWrap);

  // WHERE
  if(state.wheres.length){
    body.appendChild(mkLabel('WHERE:'));
    state.wheres.forEach(function(w,i){
      var wr=document.createElement('div');wr.style='display:flex;gap:3px;align-items:center;';
      var ci=mkInp('col',w.col,'flex:1;');ci.onchange=function(){w.col=this.value;};
      var si=mkSel(t('ops'),w.op,'flex-shrink:0;');si.onchange=function(){w.op=this.value;};
      var vi=mkInp('value',w.val,'flex:1;');vi.onchange=function(){w.val=this.value;};
      var rm=document.createElement('button');rm.textContent='✕';rm.style='background:transparent;color:#ef4444;border:none;cursor:pointer;font-size:11px;';
      rm.onclick=function(){state.wheres.splice(i,1);renderTab();};
      wr.appendChild(ci);wr.appendChild(si);wr.appendChild(vi);wr.appendChild(rm);body.appendChild(wr);
    });
  }

  // JOIN
  if(state.joins.length){
    body.appendChild(mkLabel('JOIN:'));
    state.joins.forEach(function(j,i){
      var jr=document.createElement('div');jr.style='display:flex;flex-direction:column;gap:3px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:7px;padding:7px;';
      var jt=mkSel(t('joins'),j.type,'width:100%;');jt.onchange=function(){j.type=this.value;};
      var jtr=mkInp('join_table',j.table,'width:100%;box-sizing:border-box;');jtr.onchange=function(){j.table=this.value;};
      var jon=mkInp('table.id = other.table_id',j.on,'width:100%;box-sizing:border-box;');jon.onchange=function(){j.on=this.value;};
      var rm=document.createElement('button');rm.textContent='Remove JOIN';rm.style='font-size:9px;color:#ef4444;background:transparent;border:none;cursor:pointer;text-align:left;';
      rm.onclick=function(){state.joins.splice(i,1);renderTab();};
      jr.appendChild(jt);jr.appendChild(jtr);jr.appendChild(jon);jr.appendChild(rm);body.appendChild(jr);
    });
  }

  // ORDER + LIMIT
  var olRow=document.createElement('div');olRow.style='display:grid;grid-template-columns:1fr auto 1fr;gap:5px;align-items:end;';
  var obDiv=document.createElement('div');obDiv.style='display:flex;flex-direction:column;gap:2px;';obDiv.appendChild(mkLabel(t('orderBy')));
  var obInp=mkInp('column',state.orderBy,'width:100%;box-sizing:border-box;');obInp.onchange=function(){state.orderBy=this.value;};obDiv.appendChild(obInp);
  var dirSel=mkSel(['ASC','DESC'],state.orderDir);dirSel.onchange=function(){state.orderDir=this.value;};dirSel.style+='height:31px;margin-top:15px;';
  var limDiv=document.createElement('div');limDiv.style='display:flex;flex-direction:column;gap:2px;';limDiv.appendChild(mkLabel(t('limit')));
  var limInp=mkInp('100',state.limit,'width:100%;box-sizing:border-box;');limInp.type='number';limInp.onchange=function(){state.limit=this.value;};limDiv.appendChild(limInp);
  olRow.appendChild(obDiv);olRow.appendChild(dirSel);olRow.appendChild(limDiv);body.appendChild(olRow);

  // Add WHERE / JOIN buttons
  var addRow=document.createElement('div');addRow.style='display:flex;gap:5px;';
  [t('addWhere'),t('addJoin')].forEach(function(label,isJoin){
    var b=document.createElement('button');b.textContent=label;
    b.style='flex:1;font-size:9px;padding:6px;background:rgba(16,185,129,0.08);color:#34d399;border:1px solid rgba(16,185,129,0.2);border-radius:6px;cursor:pointer;font-weight:700;';
    b.onclick=function(){if(isJoin){state.joins.push({type:'INNER JOIN',table:'',on:''});}else{state.wheres.push({col:'',op:'=',val:''});}renderTab();};
    addRow.appendChild(b);
  });
  body.appendChild(addRow);

  // Generate
  var genBtn=document.createElement('button');genBtn.innerHTML=t('btnGen');
  genBtn.style='width:100%;background:linear-gradient(135deg,#064e3b,#10b981);color:#fff;border:none;padding:11px;border-radius:10px;font-weight:900;font-size:12px;cursor:pointer;box-shadow:0 4px 20px rgba(16,185,129,0.3);';
  genBtn.onclick=function(){state.table=tblInp.value||'users';lastSQL=buildSQL();var pre=document.getElementById('sql-output');if(pre){pre.textContent=lastSQL;pre.parentElement.style.display='block';}};
  body.appendChild(genBtn);

  // Output
  var outWrap=document.createElement('div');outWrap.style='display:'+(lastSQL?'block':'none')+';';
  var pre=document.createElement('pre');pre.id='sql-output';
  pre.style='background:#0d1117;border:1px solid rgba(16,185,129,0.2);border-radius:8px;padding:10px;font-size:9px;color:#c9d1d9;overflow:auto;max-height:140px;white-space:pre;margin:0;font-family:"JetBrains Mono",monospace;line-height:1.5;';
  pre.textContent=lastSQL;outWrap.appendChild(pre);
  var actRow=document.createElement('div');actRow.style='display:flex;gap:5px;margin-top:5px;';
  var cpBtn=document.createElement('button');cpBtn.innerHTML=t('btnCopy');cpBtn.style='flex:1;background:rgba(16,185,129,0.12);color:#34d399;border:1px solid rgba(16,185,129,0.3);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  cpBtn.onclick=function(){navigator.clipboard.writeText(lastSQL).then(function(){if(window.showToast)window.showToast(t('copied'));});};
  var mockBtn=document.createElement('button');mockBtn.innerHTML=t('btnMock');mockBtn.style='flex:1;background:rgba(99,102,241,0.12);color:#818cf8;border:1px solid rgba(99,102,241,0.3);padding:8px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;';
  mockBtn.onclick=function(){pre.textContent=getMockData();};
  actRow.appendChild(cpBtn);actRow.appendChild(mockBtn);outWrap.appendChild(actRow);body.appendChild(outWrap);
  wrap.appendChild(body);parent.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',function(){
  var oAL=window.applyLang;window.applyLang=function(){if(typeof oAL==='function')oAL();var el=document.getElementById('lbl-tab-sqlbuilder');if(el)el.textContent=t('tab');if(window.activeTab==='sqlbuilder')renderTab();};
  var oRT=window.renderTab;window.renderTab=function(tab){if(tab==='sqlbuilder'){window.activeTab='sqlbuilder';document.querySelectorAll('.ltab').forEach(function(b){b.classList.remove('active');});var btn=document.getElementById('tab-sqlbuilder');if(btn)btn.classList.add('active');renderTab();return;}if(typeof oRT==='function')oRT(tab);};
});
})();
