const stages = ['Groupes','32es','16es','8es','Quarts','Demi','Finale','Champion'];
const currentStageIndex = 2;
const teams = [
  {name:'France', flag:'🇫🇷', status:'qualified', power:91}, {name:'Brésil', flag:'🇧🇷', status:'qualified', power:90},
  {name:'Allemagne', flag:'🇩🇪', status:'qualified', power:86}, {name:'Paraguay', flag:'🇵🇾', status:'qualified', power:75},
  {name:'Japon', flag:'🇯🇵', status:'eliminated', power:72}, {name:'Canada', flag:'🇨🇦', status:'qualified', power:77},
  {name:'Afrique du Sud', flag:'🇿🇦', status:'eliminated', power:68}, {name:'Maroc', flag:'🇲🇦', status:'qualified', power:79},
  {name:'Pays-Bas', flag:'🇳🇱', status:'qualified', power:85}, {name:'Suède', flag:'🇸🇪', status:'qualified', power:76},
  {name:'Argentine', flag:'🇦🇷', status:'qualified', power:88}, {name:'Espagne', flag:'🇪🇸', status:'qualified', power:89}
];
let matches = [
  {home:'Allemagne', away:'Paraguay', hf:'🇩🇪', af:'🇵🇾', hs:1, as:1, minute:73, status:'live', round:'16e de finale', goals:2, yellow:3, red:0},
  {home:'Brésil', away:'Japon', hf:'🇧🇷', af:'🇯🇵', hs:2, as:1, minute:90, status:'finished', round:'16e de finale', goals:3, yellow:4, red:0},
  {home:'France', away:'Suède', hf:'🇫🇷', af:'🇸🇪', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', goals:0, yellow:0, red:0},
  {home:'Pays-Bas', away:'Maroc', hf:'🇳🇱', af:'🇲🇦', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', goals:0, yellow:0, red:0},
  {home:'Canada', away:'Maroc', hf:'🇨🇦', af:'🇲🇦', hs:null, as:null, minute:null, status:'upcoming', round:'8e de finale', goals:0, yellow:0, red:0}
];
const scorers = [
  ['Mbappé', 'France', 6], ['Vinicius Jr', 'Brésil', 5], ['Kane', 'Angleterre', 4], ['Musiala', 'Allemagne', 4], ['Messi', 'Argentine', 3], ['Gakpo', 'Pays-Bas', 3], ['Yamal', 'Espagne', 3], ['David', 'Canada', 2], ['Hakimi', 'Maroc', 2], ['Isak', 'Suède', 2]
];
const yellowCards = [['Rodri','Espagne',4],['Romero','Argentine',3],['Casemiro','Brésil',3],['Xhaka','Suisse',3],['Ugarte','Uruguay',2],['Konaté','France',2],['Davies','Canada',2],['Dumfries','Pays-Bas',2],['Kimmich','Allemagne',2],['Amrabat','Maroc',2]];
const redCards = [['Romero','Argentine',1],['Otamendi','Argentine',1],['Koulibaly','Sénégal',1],['Richarlison','Brésil',1],['Hernández','Mexique',1]];
const teamPower = Object.fromEntries(teams.map(t => [t.name, t.power]));
function probability(m){
  const hp = teamPower[m.home] || 75, ap = teamPower[m.away] || 75;
  let home = hp / (hp + ap) * 100;
  if(m.status === 'live'){
    const diff = (m.hs||0) - (m.as||0);
    home += diff * (12 + (m.minute||45)/10);
    if(m.minute > 70 && diff > 0) home += 10;
    if(m.minute > 70 && diff < 0) home -= 10;
  }
  home = Math.max(5, Math.min(95, Math.round(home)));
  return [home, 100-home];
}
function analysis(m){
  const [h,a] = probability(m);
  const fav = h >= a ? m.home : m.away;
  const pct = Math.max(h,a);
  if(m.status === 'live') return `IA : ${fav} est légèrement favori à ${pct} %. Le score actuel, la minute et la puissance estimée des équipes influencent la prédiction.`;
  if(m.status === 'finished') return `Match terminé : l'analyse IA conserve ${fav} comme équipe la plus performante sur cette rencontre.`;
  return `Avant-match : ${fav} possède ${pct} % de chances estimées selon le niveau global, la dynamique et la profondeur d'effectif.`;
}
function renderStages(){
  document.getElementById('currentStage').textContent = '16e de finale';
  document.getElementById('progressPercent').textContent = `${Math.round((currentStageIndex+1)/stages.length*100)}%`;
  document.getElementById('stageProgress').innerHTML = stages.map((s,i)=>`<div class="stage ${i<currentStageIndex?'done':''} ${i===currentStageIndex?'current':''}">${i<currentStageIndex?'✓ ':i===currentStageIndex?'● ':''}${s}</div>`).join('');
}
function matchCard(m){
  const [h,a] = probability(m); const score = m.status === 'upcoming' ? 'VS' : `${m.hs} - ${m.as}`;
  const label = m.status === 'live' ? `LIVE ${m.minute}'` : m.status === 'finished' ? 'TERMINÉ' : 'À VENIR';
  return `<article class="match-card"><div class="match-top"><span class="pill">${m.round}</span><span class="status ${m.status}">${label}</span></div><div class="teams"><div class="team"><span class="flag">${m.hf}</span>${m.home}</div><div class="score">${score}</div><div class="team"><span>${m.away}</span><span class="flag">${m.af}</span></div></div><div class="ai-bar"><div class="ai-row"><span>IA ${m.home} ${h}%</span><span>${m.away} ${a}%</span></div><div class="bar"><span style="width:${h}%"></span></div></div><p class="analysis">${analysis(m)}</p></article>`;
}
function renderMatches(filter='all'){
  let list = matches.filter(m => filter==='all' || (filter==='today' ? true : m.status===filter));
  document.getElementById('matchesList').innerHTML = list.map(matchCard).join('');
  document.getElementById('featuredMatches').innerHTML = matches.slice(0,3).map(matchCard).join('');
}
function renderStats(){
  const make = (arr) => arr.map(([p,t,n])=>`<li>${p} <small class="muted">${t}</small><span>${n}</span></li>`).join('');
  document.getElementById('scorersList').innerHTML = make(scorers);
  document.getElementById('yellowList').innerHTML = make(yellowCards);
  document.getElementById('redList').innerHTML = make(redCards);
  document.getElementById('todayMatches').textContent = matches.length;
  document.getElementById('todayGoals').textContent = matches.reduce((s,m)=>s+(m.goals||0),0);
  document.getElementById('yellowCards').textContent = matches.reduce((s,m)=>s+(m.yellow||0),0) + 18;
  document.getElementById('redCards').textContent = matches.reduce((s,m)=>s+(m.red||0),0) + 2;
  document.getElementById('aiFavorite').textContent = teams.sort((a,b)=>b.power-a.power)[0].name;
}
function renderTeams(status='qualified'){
  const list = teams.filter(t => status==='all' || t.status===status);
  document.getElementById('teamsGrid').innerHTML = list.map(t=>`<div class="team-card"><span><span class="flag">${t.flag}</span> <strong>${t.name}</strong></span><span class="pill">${t.status==='qualified'?'Qualifiée':'Éliminée'}</span></div>`).join('');
}
function renderBracket(){
  const rounds = { '16es':['Allemagne 1-1 Paraguay','Brésil 2-1 Japon','France - Suède','Pays-Bas - Maroc'], '8es':['Canada - TBD','Brésil - TBD'], 'Quarts':['TBD - TBD','TBD - TBD'], 'Demi':['TBD - TBD'], 'Finale':['TBD - TBD'] };
  document.getElementById('bracketGrid').innerHTML = Object.entries(rounds).map(([r,ms])=>`<div class="round"><h4>${r}</h4>${ms.map(x=>`<div class="bracket-match">${x}</div>`).join('')}</div>`).join('');
}
function navigate(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  document.getElementById(view).classList.add('active-view');
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  const titles = {home:'GamePulse V8 Ultimate',matches:'Matchs Coupe du Monde',bracket:'Tableau final',stats:'Statistiques',teams:'Équipes',assistant:'Assistant IA'};
  document.getElementById('pageTitle').textContent = titles[view] || 'GamePulse';
  window.scrollTo({top:0,behavior:'smooth'});
}
function botAnswer(q){
  q = q.toLowerCase();
  if(q.includes('favori') || q.includes('gagner')) return `Le favori IA actuel est ${teams.sort((a,b)=>b.power-a.power)[0].name}. L'estimation tient compte du niveau d'équipe, de la forme simulée, des résultats et de la progression du tableau.`;
  if(q.includes('buteur')) return `Le meilleur buteur actuel est ${scorers[0][0]} avec ${scorers[0][2]} buts. Le top 10 est disponible dans l'onglet Statistiques.`;
  if(q.includes('serré')) return `Le match le plus serré est Allemagne - Paraguay : 1-1 en live. L'IA estime une probabilité proche de l'équilibre.`;
  if(q.includes('progression') || q.includes('étape')) return `La compétition est actuellement en 16e de finale. Les groupes et les 32es sont terminés, les 8es puis les quarts suivront automatiquement.`;
  return `Analyse IA : GamePulse compare score, minute, niveau des équipes, dynamique et statut du tournoi. Cette estimation reste indicative, pas une certitude.`;
}
function addMsg(txt,type='bot'){ const box=document.getElementById('chatBox'); box.insertAdjacentHTML('beforeend',`<div class="msg ${type}">${txt}</div>`); box.scrollTop=box.scrollHeight; }
function updateTime(){ document.getElementById('lastUpdate').textContent = 'Mise à jour ' + new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}); }
function init(){
  renderStages(); renderMatches(); renderStats(); renderTeams(); renderBracket(); updateTime(); addMsg('Bienvenue sur GamePulse IA. Je peux analyser les matchs, les qualifiés, les buteurs et la progression du tournoi.');
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
  document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMatches(b.dataset.filter)}));
  document.getElementById('teamStatusSelect').addEventListener('change',e=>renderTeams(e.target.value));
  document.getElementById('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');document.getElementById('themeBtn').textContent=document.body.classList.contains('light')?'🌙 Mode sombre':'☀️ Mode clair'});
  document.getElementById('refreshBtn').addEventListener('click',()=>{updateTime(); renderMatches(document.querySelector('.filter.active')?.dataset.filter||'all')});
  document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>addMsg(botAnswer(b.dataset.question))));
  document.getElementById('assistantForm').addEventListener('submit',e=>{e.preventDefault();const input=document.getElementById('assistantInput'); if(!input.value.trim()) return; addMsg(input.value,'user'); setTimeout(()=>addMsg(botAnswer(input.value)),300); input.value='';});
  setInterval(()=>{updateTime(); if(matches[0].status==='live' && matches[0].minute<90) matches[0].minute++; renderMatches(document.querySelector('.filter.active')?.dataset.filter||'all');},30000);
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
  let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('installBtn').classList.remove('hidden')});
  document.getElementById('installBtn').addEventListener('click',async()=>{ if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;document.getElementById('installBtn').classList.add('hidden')} });
}
init();
