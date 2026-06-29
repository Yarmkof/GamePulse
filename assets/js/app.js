let DATA={teams:[],matches:[],scorers:[],cards:{yellow:[],red:[]}};
const DATA_URL='assets/data/worldcup-live.json';
const $=s=>document.querySelector(s);const $$=s=>document.querySelectorAll(s);
let filter='all';

async function loadData(showToast=true){
  try{
    setLoading(true);
    const res=await fetch(`${DATA_URL}?t=${Date.now()}`,{cache:'no-store'});
    if(!res.ok) throw new Error('Données indisponibles');
    DATA=await res.json();
    if(showToast) flash('Données actualisées');
  }catch(e){
    console.warn(e);
    flash('Impossible de récupérer les données en ligne pour le moment');
  }finally{
    setLoading(false);
    render();
  }
}
function setLoading(v){const b=$('#globalRefreshBtn'); if(b){b.disabled=v; b.textContent=v?'Actualisation…':'↻ Actualiser';}}
function flash(msg){const t=$('#toast'); if(!t)return; t.textContent=msg; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),1800)}
function pctBar(a,b){return `<div class="bar"><span style="width:${a}%"></span></div><div class="aiText">🤖 IA : ${a}% - ${b}% · Confiance ${Math.max(50,Math.max(a,b)-5)}%</div>`}
function render(){
 const shown=DATA.matches.filter(m=>filter==='all'||m.status===filter);
 $('#kpiMatches').textContent=DATA.matches.length; $('#kpiQualified').textContent=DATA.teams.filter(t=>t[1]==='qualified').length; $('#kpiEliminated').textContent=DATA.teams.filter(t=>t[1]==='eliminated').length; $('#kpiCards').textContent=(DATA.cards.yellow||[]).reduce((a,b)=>a+b[1],0)+(DATA.cards.red||[]).reduce((a,b)=>a+b[1],0);
 $('#matchGrid').innerHTML=shown.map(card).join('')||'<div class="panel">Aucun match pour ce filtre.</div>';
 $('#calendarList').innerHTML=DATA.matches.map(m=>`<div class="row"><b>${m.home} vs ${m.away}</b><span>${m.time} · ${m.place}</span></div>`).join('');
 $('#bracketList').innerHTML=DATA.matches.map(m=>`<article class="card"><b>${m.round}</b><p>${m.home} vs ${m.away}</p><span class="status ${m.status}">${label(m.status)}</span></article>`).join('');
 $('#aiList').innerHTML=DATA.matches.map(m=>`<article class="card"><h3>${m.home} vs ${m.away}</h3>${pctBar(m.ai[0],m.ai[1])}<p class="meta">Analyse : score, minute, dynamique, niveau estimé et événements du match.</p></article>`).join('');
 $('#teamList').innerHTML=DATA.teams.map(t=>`<span class="chip ${t[1]==='eliminated'?'out':t[1]==='pending'?'wait':''}">${t[0]} · ${fr(t[1])}</span>`).join('');
 $('#scorerList').innerHTML=DATA.scorers.map(s=>`<li>${s[0]} · ${s[2]} — <b>${s[1]}</b> buts</li>`).join('');
 $('#yellowCards').innerHTML=(DATA.cards.yellow||[]).map(c=>`<div>🟨 ${c[0]} — <b>${c[1]}</b></div>`).join(''); $('#redCards').innerHTML=(DATA.cards.red||[]).map(c=>`<div>🟥 ${c[0]} — <b>${c[1]}</b></div>`).join('');
 updateStatusList(); $('#lastUpdate').textContent=new Date().toLocaleString('fr-FR');
}
function card(m){const score=m.status==='upcoming'?'<b>VS</b>':`<b>${m.hs} - ${m.as}</b>`;return `<article class="card"><span class="status ${m.status}">${label(m.status)}</span><h3>${m.round}</h3><div class="score"><span>${m.home}</span>${score}<span>${m.away}</span></div><div class="meta">⏱ ${m.minute?m.minute+'’':m.time} · 📍 ${m.place}</div><div class="events">${m.events.join('<br>')}</div>${pctBar(m.ai[0],m.ai[1])}</article>`}
function label(s){return s==='live'?'● LIVE':s==='finished'?'TERMINÉ':'À VENIR'}function fr(s){return s==='qualified'?'qualifiée':s==='eliminated'?'éliminée':'en attente'}
function updateStatusList(){const v=$('#teamStatusSelect').value;const list=DATA.teams.filter(t=>v==='all'||t[1]===v);$('#statusList').innerHTML=list.map(t=>`<span class="chip ${t[1]==='eliminated'?'out':t[1]==='pending'?'wait':''}">${t[0]} · ${fr(t[1])}</span>`).join('')}
$$('.nav[data-view]').forEach(b=>b.onclick=()=>{$$('.nav').forEach(x=>x.classList.remove('active'));b.classList.add('active');$$('.view').forEach(v=>v.classList.remove('active'));$('#'+b.dataset.view).classList.add('active')});
$$('.filter').forEach(b=>b.onclick=()=>{$$('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');filter=b.dataset.filter;render()});
$('#teamStatusSelect').onchange=updateStatusList;$('#themeBtn').onclick=()=>document.body.classList.toggle('dark');
$('#refreshBtn').onclick=()=>loadData(true); $('#globalRefreshBtn').onclick=()=>loadData(true);
$('#searchBtn').onclick=()=>{const q=$('#searchInput').value.toLowerCase();filter='all';render();if(q){$('#matchGrid').innerHTML=DATA.matches.filter(m=>(m.home+m.away).toLowerCase().includes(q)).map(card).join('')||'<div class="panel">Aucun résultat.</div>'}};
setInterval(()=>loadData(false),30000);
const homeBtn=document.querySelector('#homeBtn');
if(homeBtn){homeBtn.onclick=()=>{document.querySelectorAll('.nav').forEach(x=>x.classList.remove('active'));const first=document.querySelector('.nav[data-view="matches"]');if(first)first.classList.add('active');document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.querySelector('#matches')?.classList.add('active');window.scrollTo({top:0,behavior:'smooth'});};}
let deferredPrompt;const installBtn=document.querySelector('#installBtn');
window.addEventListener('beforeinstallprompt',(e)=>{e.preventDefault();deferredPrompt=e;if(installBtn)installBtn.hidden=false;});
if(installBtn){installBtn.onclick=async()=>{if(!deferredPrompt){alert('Sur iPhone : Partager → Sur l’écran d’accueil. Sur Android : menu Chrome → Installer l’application.');return;} deferredPrompt.prompt(); await deferredPrompt.userChoice; deferredPrompt=null; installBtn.hidden=true;};}

function teamStrength(name){
  const n=name.toLowerCase();
  const elite=['france','brazil','brésil','argentina','argentine','england','spain','espagne','germany','allemagne','portugal','netherlands','pays-bas'];
  const strong=['belgium','belgique','croatia','croatie','morocco','maroc','canada','japan','japon','senegal','suède','sweden','norway','norvège','ivory coast','côte d’ivoire','cote d’ivoire'];
  if(elite.some(x=>n.includes(x))) return 88;
  if(strong.some(x=>n.includes(x))) return 74;
  return 58;
}
function getFavoriteMatch(){
  return DATA.matches.slice().sort((a,b)=>Math.max(b.ai[0],b.ai[1])-Math.max(a.ai[0],a.ai[1]))[0];
}
function explainMatch(m){
  if(!m) return 'Je ne trouve pas ce match dans les données chargées.';
  const homeLead = m.ai[0] >= m.ai[1];
  const fav = homeLead ? m.home : m.away;
  const pct = homeLead ? m.ai[0] : m.ai[1];
  const other = homeLead ? m.away : m.home;
  const scoreTxt = m.status==='upcoming' ? 'match à venir' : `${m.hs}-${m.as} à ${m.minute || 'FT'}’`;
  return `<b>${m.home} vs ${m.away}</b><br>Score/statut : ${scoreTxt}.<br>Mon estimation donne <b>${fav}</b> devant avec <b>${pct}%</b> contre ${other}.<div class="aiReason">Facteurs utilisés : score actuel, minute, dynamique des événements, niveau estimé des équipes et avantage psychologique.</div><span class="confidence">Confiance IA : ${Math.max(55, Math.max(m.ai[0],m.ai[1])-4)}%</span>`;
}
function assistantAnswer(q){
  const text=(q||'').toLowerCase();
  if(!text.trim()) return 'Pose-moi une question sur les matchs, les qualifiés, les buteurs, les cartons ou une équipe.';
  if(text.includes('live') || text.includes('direct')){
    const live=DATA.matches.filter(m=>m.status==='live');
    return live.length ? 'Matchs en direct :<br>'+live.map(explainMatch).join('<hr>') : 'Aucun match live dans les données actuellement chargées.';
  }
  if(text.includes('buteur') || text.includes('top')){
    return 'Top buteurs :<br>'+DATA.scorers.slice(0,10).map((s,i)=>`${i+1}. <b>${s[0]}</b> (${s[2]}) — ${s[1]} buts`).join('<br>');
  }
  if(text.includes('carton')){
    return 'Cartons :<br><b>Jaunes</b><br>'+DATA.cards.yellow.map(c=>`🟨 ${c[0]} — ${c[1]}`).join('<br>')+'<br><br><b>Rouges</b><br>'+DATA.cards.red.map(c=>`🟥 ${c[0]} — ${c[1]}`).join('<br>');
  }
  if(text.includes('qualifi')){
    const ql=DATA.teams.filter(t=>t[1]==='qualified').map(t=>t[0]);
    return 'Équipes qualifiées :<br>'+ql.map(x=>'✅ '+x).join('<br>');
  }
  if(text.includes('élim') || text.includes('elim')){
    const el=DATA.teams.filter(t=>t[1]==='eliminated').map(t=>t[0]);
    return 'Équipes éliminées :<br>'+el.map(x=>'❌ '+x).join('<br>');
  }
  if(text.includes('coupe du monde') || text.includes('gagner') || text.includes('favori')){
    const teams=DATA.teams.filter(t=>t[1]!=='eliminated').map(t=>t[0]).sort((a,b)=>teamStrength(b)-teamStrength(a)).slice(0,5);
    return 'Favoris IA actuels pour aller loin :<br>'+teams.map((t,i)=>`${i+1}. <b>${t}</b> — indice ${teamStrength(t)}%`).join('<br>')+'<div class="aiReason">Estimation indicative : elle doit être recalculée avec les vraies statistiques, blessures, forme récente et scores live.</div>';
  }
  const match=DATA.matches.find(m=>text.includes(m.home.toLowerCase()) || text.includes(m.away.toLowerCase()) || (text.includes('germany')&&m.home.toLowerCase().includes('germany')) || (text.includes('paraguay')&&m.away.toLowerCase().includes('paraguay')));
  if(match) return explainMatch(match);
  return 'Je peux t’aider sur : matchs live, qualifiés, éliminés, top buteurs, cartons, ou analyse d’un match. Exemple : “Analyse France Suède”.';
}
function addMsg(role,html){
  const box=document.querySelector('#chatMessages'); if(!box) return;
  const div=document.createElement('div'); div.className=`msg ${role}`; div.innerHTML=html; box.appendChild(div); box.scrollTop=box.scrollHeight;
}
function initAssistant(){
  const form=document.querySelector('#assistantForm');
  if(!form) return;
  if(!document.querySelector('#chatMessages .msg')) addMsg('bot','Bonjour 👋 Je suis l’assistant GamePulse IA. Demande-moi une analyse de match, les qualifiés, les buteurs ou les cartons.');
  form.onsubmit=(e)=>{e.preventDefault(); const input=document.querySelector('#assistantInput'); const q=input.value.trim(); if(!q) return; addMsg('user',q); input.value=''; setTimeout(()=>addMsg('bot',assistantAnswer(q)),250);};
  document.querySelectorAll('.quickQuestions button').forEach(b=>b.onclick=()=>{const q=b.dataset.q; addMsg('user',q); setTimeout(()=>addMsg('bot',assistantAnswer(q)),250);});
  const clear=document.querySelector('#clearChatBtn'); if(clear) clear.onclick=()=>{document.querySelector('#chatMessages').innerHTML=''; addMsg('bot','Discussion effacée. Quelle analyse souhaites-tu ?');};
}

initAssistant();
loadData(false);
