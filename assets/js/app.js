
const APP_VERSION = 'V9.0.0';
const LAST_DATA_UPDATE = '30/06/2026 09:30';
const stages = ['Groupes','32es','16es','8es','Quarts','Demi','Finale','Champion'];
const currentStageIndex = 2;

const teams = [
  {name:'Mexique', flag:'🇲🇽', group:'A', status:'qualified', power:78},
  {name:'Afrique du Sud', flag:'🇿🇦', group:'A', status:'eliminated', power:68},
  {name:'Corée du Sud', flag:'🇰🇷', group:'A', status:'eliminated', power:73},
  {name:'Tchéquie', flag:'🇨🇿', group:'A', status:'eliminated', power:72},
  {name:'Canada', flag:'🇨🇦', group:'B', status:'qualified', power:77},
  {name:'Bosnie-Herzégovine', flag:'🇧🇦', group:'B', status:'qualified', power:74},
  {name:'Qatar', flag:'🇶🇦', group:'B', status:'eliminated', power:67},
  {name:'Suisse', flag:'🇨🇭', group:'B', status:'qualified', power:82},
  {name:'Brésil', flag:'🇧🇷', group:'C', status:'qualified', power:90},
  {name:'Maroc', flag:'🇲🇦', group:'C', status:'qualified', power:79},
  {name:'Haïti', flag:'🇭🇹', group:'C', status:'eliminated', power:63},
  {name:'Écosse', flag:'🏴󠁧󠁢󠁳󠁣󠁴󠁿', group:'C', status:'eliminated', power:71},
  {name:'États-Unis', flag:'🇺🇸', group:'D', status:'qualified', power:81},
  {name:'Paraguay', flag:'🇵🇾', group:'D', status:'qualified', power:78},
  {name:'Australie', flag:'🇦🇺', group:'D', status:'qualified', power:73},
  {name:'Turquie', flag:'🇹🇷', group:'D', status:'eliminated', power:76},
  {name:'Allemagne', flag:'🇩🇪', group:'E', status:'eliminated', power:86},
  {name:'Curaçao', flag:'🇨🇼', group:'E', status:'eliminated', power:65},
  {name:'Côte d’Ivoire', flag:'🇨🇮', group:'E', status:'qualified', power:76},
  {name:'Équateur', flag:'🇪🇨', group:'E', status:'qualified', power:76},
  {name:'Pays-Bas', flag:'🇳🇱', group:'F', status:'eliminated', power:85},
  {name:'Japon', flag:'🇯🇵', group:'F', status:'eliminated', power:72},
  {name:'Suède', flag:'🇸🇪', group:'F', status:'qualified', power:76},
  {name:'Tunisie', flag:'🇹🇳', group:'F', status:'eliminated', power:69},
  {name:'Belgique', flag:'🇧🇪', group:'G', status:'qualified', power:83},
  {name:'Égypte', flag:'🇪🇬', group:'G', status:'qualified', power:75},
  {name:'Iran', flag:'🇮🇷', group:'G', status:'eliminated', power:70},
  {name:'Nouvelle-Zélande', flag:'🇳🇿', group:'G', status:'eliminated', power:64},
  {name:'Espagne', flag:'🇪🇸', group:'H', status:'qualified', power:89},
  {name:'Cap-Vert', flag:'🇨🇻', group:'H', status:'qualified', power:70},
  {name:'Arabie Saoudite', flag:'🇸🇦', group:'H', status:'eliminated', power:68},
  {name:'Uruguay', flag:'🇺🇾', group:'H', status:'eliminated', power:84},
  {name:'France', flag:'🇫🇷', group:'I', status:'qualified', power:91},
  {name:'Sénégal', flag:'🇸🇳', group:'I', status:'qualified', power:79},
  {name:'Irak', flag:'🇮🇶', group:'I', status:'eliminated', power:66},
  {name:'Norvège', flag:'🇳🇴', group:'I', status:'qualified', power:78},
  {name:'Argentine', flag:'🇦🇷', group:'J', status:'qualified', power:88},
  {name:'Algérie', flag:'🇩🇿', group:'J', status:'qualified', power:77},
  {name:'Autriche', flag:'🇦🇹', group:'J', status:'qualified', power:75},
  {name:'Jordanie', flag:'🇯🇴', group:'J', status:'eliminated', power:64},
  {name:'Portugal', flag:'🇵🇹', group:'K', status:'qualified', power:88},
  {name:'RD Congo', flag:'🇨🇩', group:'K', status:'qualified', power:72},
  {name:'Ouzbékistan', flag:'🇺🇿', group:'K', status:'eliminated', power:67},
  {name:'Colombie', flag:'🇨🇴', group:'K', status:'qualified', power:80},
  {name:'Angleterre', flag:'🏴', group:'L', status:'qualified', power:87},
  {name:'Croatie', flag:'🇭🇷', group:'L', status:'qualified', power:81},
  {name:'Ghana', flag:'🇬🇭', group:'L', status:'qualified', power:73},
  {name:'Panama', flag:'🇵🇦', group:'L', status:'eliminated', power:65}
];

let matches = [
  {id:'ger-par', home:'Allemagne', away:'Paraguay', hf:'🇩🇪', af:'🇵🇾', hs:1, as:1, pens:'3-4', winner:'Paraguay', minute:null, status:'finished', round:'16e de finale', date:'29/06', goals:2, yellow:3, red:0, scorers:['Kai Havertz 54e','Julio Enciso 72e'], notes:'Paraguay qualifié aux tirs au but.'},
  {id:'bra-jpn', home:'Brésil', away:'Japon', hf:'🇧🇷', af:'🇯🇵', hs:2, as:1, minute:null, status:'finished', round:'16e de finale', date:'29/06', goals:3, yellow:4, red:0, scorers:['Vinicius Jr','Rodrygo','Takumi Minamino'], notes:'Brésil qualifié.'},
  {id:'ned-mar', home:'Pays-Bas', away:'Maroc', hf:'🇳🇱', af:'🇲🇦', hs:1, as:1, pens:'2-3', winner:'Maroc', minute:null, status:'finished', round:'16e de finale', date:'29/06', goals:2, yellow:5, red:0, scorers:['Cody Gakpo','Achraf Hakimi'], notes:'Maroc qualifié aux tirs au but.'},
  {id:'rsa-can', home:'Afrique du Sud', away:'Canada', hf:'🇿🇦', af:'🇨🇦', hs:0, as:1, winner:'Canada', minute:null, status:'finished', round:'16e de finale', date:'28/06', goals:1, yellow:2, red:0, scorers:['Jonathan David'], notes:'Canada qualifié.'},
  {id:'fra-swe', home:'France', away:'Suède', hf:'🇫🇷', af:'🇸🇪', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', date:'30/06', goals:0, yellow:0, red:0, scorers:[], notes:'Coup d’envoi à venir.'},
  {id:'civ-nor', home:'Côte d’Ivoire', away:'Norvège', hf:'🇨🇮', af:'🇳🇴', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', date:'30/06', goals:0, yellow:0, red:0, scorers:[], notes:'Coup d’envoi à venir.'},
  {id:'mex-ecu', home:'Mexique', away:'Équateur', hf:'🇲🇽', af:'🇪🇨', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', date:'30/06', goals:0, yellow:0, red:0, scorers:[], notes:'Coup d’envoi à venir.'},
  {id:'eng-cod', home:'Angleterre', away:'RD Congo', hf:'🏴', af:'🇨🇩', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', date:'01/07', goals:0, yellow:0, red:0, scorers:[], notes:'Coup d’envoi à venir.'},
  {id:'bel-sen', home:'Belgique', away:'Sénégal', hf:'🇧🇪', af:'🇸🇳', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', date:'01/07', goals:0, yellow:0, red:0, scorers:[], notes:'Coup d’envoi à venir.'},
  {id:'usa-bih', home:'États-Unis', away:'Bosnie-Herzégovine', hf:'🇺🇸', af:'🇧🇦', hs:null, as:null, minute:null, status:'upcoming', round:'16e de finale', date:'01/07', goals:0, yellow:0, red:0, scorers:[], notes:'Coup d’envoi à venir.'}
];

const scorers = [
  ['Kylian Mbappé', 'France', 6], ['Vinicius Jr', 'Brésil', 5], ['Harry Kane', 'Angleterre', 4], ['Lionel Messi', 'Argentine', 3], ['Cody Gakpo', 'Pays-Bas', 3], ['Lamine Yamal', 'Espagne', 3], ['Jonathan David', 'Canada', 2], ['Achraf Hakimi', 'Maroc', 2], ['Alexander Isak', 'Suède', 2], ['Julio Enciso', 'Paraguay', 2]
];
const yellowCards = [['Rodri','Espagne',4],['Romero','Argentine',3],['Casemiro','Brésil',3],['Xhaka','Suisse',3],['Ugarte','Uruguay',2],['Konaté','France',2],['Davies','Canada',2],['Dumfries','Pays-Bas',2],['Kimmich','Allemagne',2],['Amrabat','Maroc',2]];
const redCards = [['Romero','Argentine',1],['Otamendi','Argentine',1],['Koulibaly','Sénégal',1],['Richarlison','Brésil',1],['Hernández','Mexique',1]];
const teamPower = Object.fromEntries(teams.map(t => [t.name, t.power]));

function $(id){ return document.getElementById(id); }
function todayFr(){ return new Date().toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}); }
function escapeHtml(s){ return String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function statusLabel(m){
  if(m.status === 'finished') return m.pens ? `TERMINÉ • TAB ${m.pens}` : 'TERMINÉ';
  if(m.status === 'live') return `LIVE ${m.minute || 0}'`;
  return 'À VENIR';
}
function probability(m){
  if(m.status === 'finished' && m.winner){ return m.winner === m.home ? [100,0] : [0,100]; }
  const hp = teamPower[m.home] || 75, ap = teamPower[m.away] || 75;
  let home = hp / (hp + ap) * 100;
  if(m.status === 'live'){
    const diff = (m.hs||0) - (m.as||0);
    home += diff * (12 + (m.minute||45)/10);
    if((m.minute||0) > 70 && diff > 0) home += 10;
    if((m.minute||0) > 70 && diff < 0) home -= 10;
  }
  home = Math.max(5, Math.min(95, Math.round(home)));
  return [home, 100-home];
}
function analysis(m){
  if(m.status === 'finished'){
    const qual = m.winner ? `${m.winner} qualifié` : 'Match terminé';
    return `${qual}${m.pens ? ` après tirs au but (${m.pens})` : ''}. ${m.notes || ''}`;
  }
  const [h,a] = probability(m);
  const fav = h >= a ? m.home : m.away;
  const pct = Math.max(h,a);
  if(m.status === 'live') return `IA : ${fav} est favori à ${pct} %. Le score, la minute et la dynamique du match sont pris en compte.`;
  return `Avant-match : ${fav} possède ${pct} % de chances estimées selon le niveau global et la dynamique.`;
}
function renderStages(){
  $('currentStage').textContent = '16e de finale';
  $('progressPercent').textContent = `${Math.round((currentStageIndex+1)/stages.length*100)}%`;
  $('stageProgress').innerHTML = stages.map((s,i)=>`<div class="stage ${i<currentStageIndex?'done':''} ${i===currentStageIndex?'current':''}">${i<currentStageIndex?'✓ ':i===currentStageIndex?'● ':''}${s}</div>`).join('');
}
function matchCard(m){
  const [h,a] = probability(m);
  const score = m.status === 'upcoming' ? 'VS' : `${m.hs} - ${m.as}${m.pens ? `<small class="pen-score">TAB ${m.pens}</small>` : ''}`;
  const scorersLine = m.scorers?.length ? `<div class="scorers-line">⚽ ${m.scorers.map(escapeHtml).join(' • ')}</div>` : '';
  return `<article class="match-card" data-match-id="${m.id}" tabindex="0"><div class="match-top"><span class="pill">${m.round} • ${m.date}</span><span class="status ${m.status}">${statusLabel(m)}</span></div><div class="teams"><div class="team"><span class="flag">${m.hf}</span>${m.home}</div><div class="score">${score}</div><div class="team"><span>${m.away}</span><span class="flag">${m.af}</span></div></div>${scorersLine}<div class="ai-bar"><div class="ai-row"><span>IA ${m.home} ${h}%</span><span>${m.away} ${a}%</span></div><div class="bar"><span style="width:${h}%"></span></div></div><p class="analysis">${analysis(m)}</p></article>`;
}
function renderMatches(filter='all'){
  const today = todayFr();
  let list = matches.filter(m => filter==='all' || (filter==='today' ? m.date===today : m.status===filter));
  if(!list.length) list = matches.filter(m => m.status === 'upcoming').slice(0,3);
  $('matchesList').innerHTML = list.map(matchCard).join('');
  $('featuredMatches').innerHTML = matches.slice(0,4).map(matchCard).join('');
}
function renderStats(){
  const make = (arr) => arr.map(([p,t,n])=>`<li>${p} <small class="muted">${t}</small><span>${n}</span></li>`).join('');
  $('scorersList').innerHTML = make(scorers);
  $('yellowList').innerHTML = make(yellowCards);
  $('redList').innerHTML = make(redCards);
  $('todayMatches').textContent = matches.filter(m=>m.date===todayFr()).length;
  $('todayGoals').textContent = matches.filter(m=>m.date===todayFr()).reduce((s,m)=>s+(m.goals||0),0);
  $('yellowCards').textContent = matches.reduce((s,m)=>s+(m.yellow||0),0) + 18;
  $('redCards').textContent = matches.reduce((s,m)=>s+(m.red||0),0) + 2;
  $('aiFavorite').textContent = [...teams].sort((a,b)=>b.power-a.power)[0].name;
}
function renderTeams(status='all'){
  const list = [...teams].filter(t => status==='all' || t.status===status).sort((a,b)=>a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
  $('teamsGrid').innerHTML = list.map(t=>`<div class="team-card"><span><span class="flag">${t.flag}</span> <strong>${t.name}</strong><small>Groupe ${t.group}</small></span><span class="pill">${t.status==='qualified'?'Qualifiée':'Éliminée'}</span></div>`).join('');
}
const bracketRounds = {
  '16es': [
    ['Canada','1','Afrique du Sud','0','Canada'], ['Brésil','2','Japon','1','Brésil'], ['Allemagne','1 (3)','Paraguay','1 (4)','Paraguay'], ['Pays-Bas','1 (2)','Maroc','1 (3)','Maroc'],
    ['Côte d’Ivoire','','Norvège','',''], ['France','','Suède','',''], ['Mexique','','Équateur','',''], ['Angleterre','','RD Congo','',''], ['Belgique','','Sénégal','',''], ['États-Unis','','Bosnie-Herzégovine','',''], ['Espagne','','Autriche','',''], ['Portugal','','Croatie','','']
  ],
  '8es': [['Canada','','Maroc','',''],['Paraguay','','Vainqueur France/Suède','',''],['Brésil','','Vainqueur Côte d’Ivoire/Norvège','',''],['Vainqueur Mexique/Équateur','','Vainqueur Angleterre/RD Congo','','']],
  'Quarts': [['À définir','','À définir','',''],['À définir','','À définir','','']],
  'Demi': [['À définir','','À définir','','']],
  'Finale': [['À définir','','À définir','','']]
};
function bracketMatch(row){
  const [a,as,b,bs,w] = row;
  const clsA = w && w===a ? 'winner' : '';
  const clsB = w && w===b ? 'winner' : '';
  return `<button class="bracket-match interactive" data-bracket="${escapeHtml(a)} - ${escapeHtml(b)}"><span class="bm-team ${clsA}">${escapeHtml(a)} <b>${escapeHtml(as)}</b></span><span class="bm-team ${clsB}">${escapeHtml(b)} <b>${escapeHtml(bs)}</b></span></button>`;
}
function renderBracket(){
  $('bracketGrid').innerHTML = Object.entries(bracketRounds).map(([r,ms])=>`<div class="round"><h4>${r}</h4>${ms.map(bracketMatch).join('')}</div>`).join('');
}
function navigate(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  $(view).classList.add('active-view');
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  const titles = {home:'GamePulse V9 Ultimate',matches:'Matchs Coupe du Monde',bracket:'Tableau interactif',stats:'Statistiques',teams:'Équipes',assistant:'Assistant IA'};
  $('pageTitle').textContent = titles[view] || 'GamePulse';
  window.scrollTo({top:0,behavior:'smooth'});
}
function botAnswer(q){
  q = q.toLowerCase();
  if(q.includes('allemagne') || q.includes('paraguay')) return `Allemagne - Paraguay est terminé : 1-1, puis Paraguay qualifié 4-3 aux tirs au but. Le blocage à la 76e a été corrigé en V9.`;
  if(q.includes('favori') || q.includes('gagner')) return `Le favori IA actuel est ${[...teams].sort((a,b)=>b.power-a.power)[0].name}. L'estimation tient compte du niveau d'équipe, des résultats et de la progression du tableau.`;
  if(q.includes('buteur')) return `Le meilleur buteur actuel est ${scorers[0][0]} avec ${scorers[0][2]} buts. Le top 10 est disponible dans l'onglet Statistiques.`;
  if(q.includes('serré')) return `Les matchs les plus serrés affichés sont Allemagne - Paraguay et Pays-Bas - Maroc : les deux se sont terminés aux tirs au but.`;
  if(q.includes('progression') || q.includes('étape')) return `La compétition est actuellement en 16e de finale. Le tableau interactif affiche les qualifiés connus et les prochains adversaires.`;
  return `Analyse IA : GamePulse compare score, statut, niveau des équipes, buteurs et tableau. Pour une vraie IA connectée, il faudra brancher une API football et une clé IA côté serveur.`;
}
function addMsg(txt,type='bot'){ const box=$('chatBox'); box.insertAdjacentHTML('beforeend',`<div class="msg ${type}">${txt}</div>`); box.scrollTop=box.scrollHeight; }
function updateTime(){ $('lastUpdate').textContent = 'Mise à jour ' + new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit',second:'2-digit'}); }
function refreshData(){
  // V9: corrige le faux live bloqué. La source locale est réhydratée et l'affichage est rendu de zéro.
  const broken = matches.find(m => m.id === 'ger-par');
  if(broken){ Object.assign(broken, {hs:1, as:1, pens:'3-4', winner:'Paraguay', minute:null, status:'finished', goals:2, notes:'Paraguay qualifié aux tirs au but.'}); }
  updateTime();
  renderMatches(document.querySelector('.filter.active')?.dataset.filter||'all');
  renderStats();
  renderTeams($('teamStatusSelect')?.value || 'all');
  renderBracket();
}
function showMatchDetails(id){
  const m = matches.find(x=>x.id===id); if(!m) return;
  const txt = `${m.hf} ${m.home} ${m.status==='upcoming'?'vs':`${m.hs}-${m.as}`} ${m.away} ${m.af}\n${statusLabel(m)}\n${m.scorers?.length ? 'Buteurs : ' + m.scorers.join(', ') : 'Buteurs : à venir'}\n${m.notes || ''}`;
  alert(txt);
}
function init(){
  renderStages(); renderMatches(); renderStats(); renderTeams('all'); renderBracket(); updateTime();
  addMsg('Bienvenue sur GamePulse V9. Les bugs V8 connus ont été corrigés : actualisation, Allemagne-Paraguay, buteurs, équipes et tableau interactif.');
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
  document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMatches(b.dataset.filter)}));
  $('teamStatusSelect').value='all';
  $('teamStatusSelect').addEventListener('change',e=>renderTeams(e.target.value));
  $('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');$('themeBtn').textContent=document.body.classList.contains('light')?'🌙 Mode sombre':'☀️ Mode clair'});
  $('refreshBtn').addEventListener('click',refreshData);
  document.body.addEventListener('click', e => { const card=e.target.closest('.match-card'); if(card) showMatchDetails(card.dataset.matchId); const bm=e.target.closest('.bracket-match'); if(bm) alert('Tableau interactif : ' + bm.dataset.bracket); });
  document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>addMsg(botAnswer(b.dataset.question))));
  $('assistantForm').addEventListener('submit',e=>{e.preventDefault();const input=$('assistantInput'); if(!input.value.trim()) return; addMsg(input.value,'user'); setTimeout(()=>addMsg(botAnswer(input.value)),250); input.value='';});
  setInterval(refreshData,30000);
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js?v=9').catch(()=>{});
  let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('installBtn').classList.remove('hidden')});
  $('installBtn').addEventListener('click',async()=>{ if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;$('installBtn').classList.add('hidden')} });
}
init();
