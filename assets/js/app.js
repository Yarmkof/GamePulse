const DATA={
 teams:[
  ['Canada','qualified'],['Brazil','qualified'],['Germany','pending'],['Paraguay','pending'],['South Africa','eliminated'],['Japan','eliminated'],['Netherlands','pending'],['Morocco','pending'],['Ivory Coast','pending'],['Norway','pending'],['France','pending'],['Sweden','pending'],['Mexico','pending'],['Ecuador','pending'],['England','pending'],['DR Congo','pending'],['Belgium','pending'],['Senegal','pending'],['Argentina','pending'],['Cape Verde','pending']
 ],
 matches:[
  {round:'32e de finale',home:'South Africa',away:'Canada',hs:0,as:1,status:'finished',time:'dim. 28 juin, 21:00',place:'MetLife Stadium',events:['⚽ Canada 74\''],ai:[1,99]},
  {round:'32e de finale',home:'Brazil',away:'Japan',hs:2,as:1,status:'finished',time:'lun. 29 juin, 19:00',place:'Dallas',events:['⚽ Vinicius Jr 22\'','⚽ Rodrygo 61\'','⚽ Japan 79\''],ai:[99,1]},
  {round:'32e de finale',home:'Germany',away:'Paraguay',hs:0,as:0,status:'live',minute:58,time:'58\'',place:'Houston',events:['🟨 Paraguay 34\'','🔁 Germany change 55\''],ai:[69,31]},
  {round:'32e de finale',home:'Netherlands',away:'Morocco',status:'upcoming',time:'mar. 30 juin, 03:00',place:'Miami',events:['Aucun événement pour l’instant'],ai:[56,44]},
  {round:'32e de finale',home:'Ivory Coast',away:'Norway',status:'upcoming',time:'mar. 30 juin, 19:00',place:'Atlanta',events:['Aucun événement pour l’instant'],ai:[49,51]},
  {round:'32e de finale',home:'France',away:'Sweden',status:'upcoming',time:'mar. 30 juin, 23:00',place:'New York',events:['Aucun événement pour l’instant'],ai:[64,36]},
  {round:'32e de finale',home:'Mexico',away:'Ecuador',status:'upcoming',time:'mer. 1 juillet, 03:00',place:'Los Angeles',events:['Aucun événement pour l’instant'],ai:[52,48]},
  {round:'32e de finale',home:'England',away:'DR Congo',status:'upcoming',time:'mer. 1 juillet, 18:00',place:'Kansas City',events:['Aucun événement pour l’instant'],ai:[72,28]},
  {round:'32e de finale',home:'Belgium',away:'Senegal',status:'upcoming',time:'mer. 1 juillet, 22:00',place:'Toronto',events:['Aucun événement pour l’instant'],ai:[58,42]}
 ],
 scorers:[['Rodrygo',5,'Brazil'],['Vinicius Jr',4,'Brazil'],['Mbappé',4,'France'],['Kane',3,'England'],['Lautaro Martínez',3,'Argentina'],['Bellingham',2,'England'],['Musiala',2,'Germany'],['De Bruyne',2,'Belgium'],['David',2,'Canada'],['Hakimi',1,'Morocco']],
 cards:{yellow:[['Paraguay',7],['Germany',5],['Brazil',4],['Japan',4],['France',3],['Canada',3]],red:[['Uruguay',1],['South Africa',1],['Paraguay',0],['France',0],['Brazil',0]]}
};
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
let filter='all';
function pctBar(a,b){return `<div class="bar"><span style="width:${a}%"></span></div><div class="aiText">🤖 IA : ${a}% - ${b}% · Confiance ${Math.max(a,b)-5}%</div>`}
function render(){
 const shown=DATA.matches.filter(m=>filter==='all'||m.status===filter);
 $('#kpiMatches').textContent=DATA.matches.length; $('#kpiQualified').textContent=DATA.teams.filter(t=>t[1]==='qualified').length; $('#kpiEliminated').textContent=DATA.teams.filter(t=>t[1]==='eliminated').length; $('#kpiCards').textContent=DATA.cards.yellow.reduce((a,b)=>a+b[1],0)+DATA.cards.red.reduce((a,b)=>a+b[1],0);
 $('#matchGrid').innerHTML=shown.map(card).join('');
 $('#calendarList').innerHTML=DATA.matches.map(m=>`<div class="row"><b>${m.home} vs ${m.away}</b><span>${m.time} · ${m.place}</span></div>`).join('');
 $('#bracketList').innerHTML=DATA.matches.map(m=>`<article class="card"><b>${m.round}</b><p>${m.home} vs ${m.away}</p><span class="status ${m.status}">${label(m.status)}</span></article>`).join('');
 $('#aiList').innerHTML=DATA.matches.map(m=>`<article class="card"><h3>${m.home} vs ${m.away}</h3>${pctBar(m.ai[0],m.ai[1])}<p class="meta">Analyse : score, minute, dynamique, niveau estimé et événements du match.</p></article>`).join('');
 $('#teamList').innerHTML=DATA.teams.map(t=>`<span class="chip ${t[1]==='eliminated'?'out':t[1]==='pending'?'wait':''}">${t[0]} · ${fr(t[1])}</span>`).join('');
 $('#scorerList').innerHTML=DATA.scorers.map(s=>`<li>${s[0]} · ${s[2]} — <b>${s[1]}</b> buts</li>`).join('');
 $('#yellowCards').innerHTML=DATA.cards.yellow.map(c=>`<div>🟨 ${c[0]} — <b>${c[1]}</b></div>`).join(''); $('#redCards').innerHTML=DATA.cards.red.map(c=>`<div>🟥 ${c[0]} — <b>${c[1]}</b></div>`).join('');
 updateStatusList(); $('#lastUpdate').textContent=new Date().toLocaleString('fr-FR');
}
function card(m){const score=m.status==='upcoming'?'<b>VS</b>':`<b>${m.hs} - ${m.as}</b>`;return `<article class="card"><span class="status ${m.status}">${label(m.status)}</span><h3>${m.round}</h3><div class="score"><span>${m.home}</span>${score}<span>${m.away}</span></div><div class="meta">⏱ ${m.minute?m.minute+'’':m.time} · 📍 ${m.place}</div><div class="events">${m.events.join('<br>')}</div>${pctBar(m.ai[0],m.ai[1])}</article>`}
function label(s){return s==='live'?'● LIVE':s==='finished'?'TERMINÉ':'À VENIR'}function fr(s){return s==='qualified'?'qualifiée':s==='eliminated'?'éliminée':'en attente'}
function updateStatusList(){const v=$('#teamStatusSelect').value;const list=DATA.teams.filter(t=>v==='all'||t[1]===v);$('#statusList').innerHTML=list.map(t=>`<span class="chip ${t[1]==='eliminated'?'out':t[1]==='pending'?'wait':''}">${t[0]} · ${fr(t[1])}</span>`).join('')}
$$('.nav[data-view]').forEach(b=>b.onclick=()=>{$$('.nav').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.view').forEach(v=>v.classList.remove('active'));$('#'+b.dataset.view).classList.add('active')});
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()});
$('#teamStatusSelect').onchange=updateStatusList;$('#themeBtn').onclick=()=>document.body.classList.toggle('dark');$('#refreshBtn').onclick=render;$('#searchBtn').onclick=()=>{const q=$('#searchInput').value.toLowerCase();filter='all';render();if(q){$('#matchGrid').innerHTML=DATA.matches.filter(m=>(m.home+m.away).toLowerCase().includes(q)).map(card).join('')||'<div class="panel">Aucun résultat.</div>'}};
setInterval(render,60000);render();

const homeBtn=document.querySelector('#homeBtn');
if(homeBtn){homeBtn.onclick=()=>{document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active'));const first=document.querySelector('.nav[data-view="matches"]');if(first)first.classList.add('active');document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.querySelector('#matches')?.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});};}
let deferredPrompt;const installBtn=document.querySelector('#installBtn');
window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();deferredPrompt=e;if(installBtn)installBtn.hidden=false;});
if(installBtn){installBtn.onclick=async()=>{if(!deferredPrompt){alert('Sur iPhone : Partager → Sur l’écran d’accueil. Sur Android : menu Chrome → Installer l’application.');return;} deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; installBtn.hidden=true;};}
