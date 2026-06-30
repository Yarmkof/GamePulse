
const APP_VERSION = 'V9.4.0';
const LAST_DATA_UPDATE = '30/06/2026 10:35';
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
  ['L. Messi', 'Argentine', 6, '🇦🇷'],
  ['E. Haaland', 'Norvège', 4, '🇳🇴'],
  ['O. Dembélé', 'France', 4, '🇫🇷'],
  ['Vinícius Júnior', 'Brésil', 4, '🇧🇷'],
  ['K. Mbappé', 'France', 4, '🇫🇷'],
  ['D. Undav', 'Allemagne', 3, '🇩🇪'],
  ['J. Manzambi', 'Suisse', 3, '🇨🇭'],
  ['B. Brobbey', 'Pays-Bas', 3, '🇳🇱'],
  ['Matheus Cunha', 'Brésil', 3, '🇧🇷'],
  ['I. Saibari', 'Maroc', 3, '🇲🇦'],
  ['I. Sarr', 'Sénégal', 3, '🇸🇳'],
  ['H. Kane', 'Angleterre', 3, '🏴'],
  ['E. Just', 'Nouvelle-Zélande', 3, '🇳🇿'],
  ['Y. Wissa', 'RD Congo', 3, '🇨🇩'],
  ['J. David', 'Canada', 3, '🇨🇦'],
  ['E. Mahmić', 'Bosnie', 2, '🇧🇦'],
  ['M. Arnautović', 'Autriche', 2, '🇦🇹'],
  ['A. Elanga', 'Suède', 2, '🇸🇪'],
  ['C. Summerville', 'Pays-Bas', 2, '🇳🇱'],
  ['N. Pépé', 'Côte d’Ivoire', 2, '🇨🇮']
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
  if($('matchesList')) $('matchesList').innerHTML = list.map(matchCard).join('');
  if($('featuredMatches')) $('featuredMatches').innerHTML = matches.filter(m=>m.status!=='finished').slice(0,4).map(matchCard).join('');
  renderResults();
}
function renderResults(){
  const finished = matches.filter(m => m.status === 'finished');
  const html = finished.map(matchCard).join('') || '<div class="empty-state">Aucun résultat disponible.</div>';
  if($('resultsList')) $('resultsList').innerHTML = html;
  if($('homeResultsList')) $('homeResultsList').innerHTML = finished.slice(0,3).map(matchCard).join('');
}
function renderStats(){
  const make = (arr) => arr.map(([p,t,n,f])=>`<li><strong>${escapeHtml(p)}</strong> <small class="muted">${f || ''} ${escapeHtml(t)}</small><span>${n} but${n>1?'s':''}</span></li>`).join('');
  const limit = Number($('scorersLimit')?.value || 20);
  if($('scorersList')) $('scorersList').innerHTML = make(scorers.slice(0, limit));
  if($('yellowList')) $('yellowList').innerHTML = make(yellowCards);
  if($('redList')) $('redList').innerHTML = make(redCards);
  if($('todayMatches')) $('todayMatches').textContent = matches.filter(m=>m.date===todayFr()).length;
  if($('todayGoals')) $('todayGoals').textContent = matches.filter(m=>m.date===todayFr()).reduce((s,m)=>s+(m.goals||0),0);
  if($('yellowCards')) $('yellowCards').textContent = matches.reduce((s,m)=>s+(m.yellow||0),0) + 18;
  if($('redCards')) $('redCards').textContent = matches.reduce((s,m)=>s+(m.red||0),0) + 2;
  if($('aiFavorite')) $('aiFavorite').textContent = [...teams].sort((a,b)=>b.power-a.power)[0].name;
}
function renderTeams(status='all'){
  const list = [...teams].filter(t => status==='all' || t.status===status).sort((a,b)=>a.group.localeCompare(b.group) || a.name.localeCompare(b.name));
  $('teamsGrid').innerHTML = list.map(t=>`<div class="team-card"><span><span class="flag">${t.flag}</span> <strong>${t.name}</strong><small>Groupe ${t.group}</small></span><span class="pill">${t.status==='qualified'?'Qualifiée':'Éliminée'}</span></div>`).join('');
}

const bracketRounds = [
  {id:'r32', title:'16e de finale', matches:[
    {a:'Canada', af:'🇨🇦', as:'2', b:'Nouvelle-Zélande', bf:'🇳🇿', bs:'0', winner:'Canada'},
    {a:'Chili', af:'🇨🇱', as:'1', b:'Japon', bf:'🇯🇵', bs:'2', winner:'Japon'},
    {a:'Colombie', af:'🇨🇴', as:'2', b:'Australie', bf:'🇦🇺', bs:'1', winner:'Colombie'},
    {a:'Portugal', af:'🇵🇹', as:'3', b:'Ukraine', bf:'🇺🇦', bs:'1', winner:'Portugal'},
    {a:'France', af:'🇫🇷', as:'3', b:'Maroc', bf:'🇲🇦', bs:'1', winner:'France'},
    {a:'États-Unis', af:'🇺🇸', as:'2', b:'Suisse', bf:'🇨🇭', bs:'1', winner:'États-Unis'},
    {a:'Angleterre', af:'🏴', as:'2', b:'Sénégal', bf:'🇸🇳', bs:'0', winner:'Angleterre'},
    {a:'Mexique', af:'🇲🇽', as:'1', b:'Corée du Sud', bf:'🇰🇷', bs:'2', winner:'Corée du Sud'},
    {a:'Brésil', af:'🇧🇷', as:'3', b:'Arabie Saoudite', bf:'🇸🇦', bs:'0', winner:'Brésil'},
    {a:'Équateur', af:'🇪🇨', as:'1', b:'Pays-Bas', bf:'🇳🇱', bs:'2', winner:'Pays-Bas'},
    {a:'Argentine', af:'🇦🇷', as:'2', b:'Pologne', bf:'🇵🇱', bs:'0', winner:'Argentine'},
    {a:'Croatie', af:'🇭🇷', as:'2', b:'Danemark', bf:'🇩🇰', bs:'1', winner:'Croatie'},
    {a:'Espagne', af:'🇪🇸', as:'2', b:'Qatar', bf:'🇶🇦', bs:'0', winner:'Espagne'},
    {a:'Belgique', af:'🇧🇪', as:'1', b:'Allemagne', bf:'🇩🇪', bs:'2', winner:'Allemagne'},
    {a:'Italie', af:'🇮🇹', as:'2', b:'Turquie', bf:'🇹🇷', bs:'0', winner:'Italie'},
    {a:'Uruguay', af:'🇺🇾', as:'2', b:'Autriche', bf:'🇦🇹', bs:'1', winner:'Uruguay'}
  ]},
  {id:'r16', title:'8e de finale', matches:[
    {a:'Canada', af:'🇨🇦', as:'1', b:'Japon', bf:'🇯🇵', bs:'0', winner:'Canada'},
    {a:'Colombie', af:'🇨🇴', as:'1', b:'Portugal', bf:'🇵🇹', bs:'2', winner:'Portugal'},
    {a:'France', af:'🇫🇷', as:'2', b:'États-Unis', bf:'🇺🇸', bs:'0', winner:'France'},
    {a:'Angleterre', af:'🏴', as:'2', b:'Corée du Sud', bf:'🇰🇷', bs:'1', winner:'Angleterre'},
    {a:'Brésil', af:'🇧🇷', as:'3', b:'Pays-Bas', bf:'🇳🇱', bs:'1', winner:'Brésil'},
    {a:'Argentine', af:'🇦🇷', as:'2', b:'Croatie', bf:'🇭🇷', bs:'1', winner:'Argentine'},
    {a:'Espagne', af:'🇪🇸', as:'1', b:'Allemagne', bf:'🇩🇪', bs:'0', winner:'Espagne'},
    {a:'Italie', af:'🇮🇹', as:'2', b:'Uruguay', bf:'🇺🇾', bs:'0', winner:'Italie'}
  ]},
  {id:'qf', title:'Quarts de finale', matches:[
    {a:'Canada', af:'🇨🇦', as:'0', b:'Portugal', bf:'🇵🇹', bs:'1', winner:'Portugal'},
    {a:'France', af:'🇫🇷', as:'2', b:'Angleterre', bf:'🏴', bs:'1', winner:'France'},
    {a:'Brésil', af:'🇧🇷', as:'2', b:'Argentine', bf:'🇦🇷', bs:'3', winner:'Argentine'},
    {a:'Espagne', af:'🇪🇸', as:'1', b:'Italie', bf:'🇮🇹', bs:'0', winner:'Espagne'}
  ]},
  {id:'sf', title:'Demi-finales', matches:[
    {a:'Portugal', af:'🇵🇹', as:'0', b:'France', bf:'🇫🇷', bs:'2', winner:'France'},
    {a:'Argentine', af:'🇦🇷', as:'1', b:'Espagne', bf:'🇪🇸', bs:'2', winner:'Espagne'}
  ]},
  {id:'final', title:'Finale', matches:[
    {a:'France', af:'🇫🇷', as:'2', b:'Espagne', bf:'🇪🇸', bs:'1', winner:'France'}
  ]}
];
const bracketMeta = {
  champion:{team:'France', flag:'🇫🇷'},
  third:{team:'Argentine', flag:'🇦🇷'},
  subtitle:'Liseré vert : équipe qualifiée • liseré rouge : équipe arrêtée'
};
function bracketMatch(m, roundIndex, matchIndex){
  const winA = m.winner === m.a;
  const winB = m.winner === m.b;
  const delay = (roundIndex * 120 + matchIndex * 35);
  return `<button class="bracket-match animated" style="--delay:${delay}ms" data-bracket="${escapeHtml(m.a)} ${escapeHtml(m.as)} - ${escapeHtml(m.bs)} ${escapeHtml(m.b)}" data-winner="${escapeHtml(m.winner)}">
    <span class="bm-team ${winA?'winner still-in':''} ${!winA?'stopped':''}"><em>${m.af}</em><strong>${escapeHtml(m.a)}</strong><b>${escapeHtml(m.as)}</b></span>
    <span class="bm-team ${winB?'winner still-in':''} ${!winB?'stopped':''}"><em>${m.bf}</em><strong>${escapeHtml(m.b)}</strong><b>${escapeHtml(m.bs)}</b></span>
  </button>`;
}
function renderBracket(){
  const rounds = bracketRounds.map((round, i)=>`<section class="bracket-round ${round.id}" style="--round:${i}"><h4>${round.title}</h4><div class="round-stack">${round.matches.map((m, mi)=>bracketMatch(m,i,mi)).join('')}</div></section>`).join('');
  const markup = `<div class="prediction-bracket">
    <div class="bracket-hero">
      <p class="eyebrow">2026 FIFA World Cup</p>
      <h3>Tableau interactif</h3>
      <span class="pill">${bracketMeta.subtitle}</span><div class="bracket-legend"><span class="legend-item"><i class="legend-dot green"></i> encore en course</span><span class="legend-item"><i class="legend-dot red"></i> parcours arrêté</span></div>
    </div>
    <div class="bracket-scroll">${rounds}</div>
    <aside class="champion-card">
      <span class="trophy">🏆</span>
      <p>Champion</p>
      <strong>${bracketMeta.champion.flag} ${bracketMeta.champion.team}</strong>
      <small>Troisième place : ${bracketMeta.third.flag} ${bracketMeta.third.team}</small>
    </aside>
  </div>`;
  $('bracketGrid').innerHTML = markup;
  if($('homeBracket')) $('homeBracket').innerHTML = markup;
}
function navigate(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  $(view).classList.add('active-view');
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  const titles = {home:'GamePulse V9.4 Premium',matches:'Matchs Coupe du Monde',results:'Résultats',bracket:'Tableau interactif',scorers:'Classement des buteurs',stats:'Statistiques',teams:'Équipes',assistant:'Assistant IA'};
  $('pageTitle').textContent = titles[view] || 'GamePulse';
  window.scrollTo({top:0,behavior:'smooth'});
}
function botAnswer(q){
  q = q.toLowerCase();
  if(q.includes('allemagne') || q.includes('paraguay')) return `Allemagne - Paraguay est terminé : 1-1, puis Paraguay qualifié 4-3 aux tirs au but. Le blocage à la 76e a été corrigé en V9.`;
  if(q.includes('favori') || q.includes('gagner')) return `Le favori IA actuel est ${[...teams].sort((a,b)=>b.power-a.power)[0].name}. L'estimation tient compte du niveau d'équipe, des résultats et de la progression du tableau.`;
  if(q.includes('buteur')) return `Le meilleur buteur actuel est ${scorers[0][0]} avec ${scorers[0][2]} buts. Le top 20 est disponible dans le bouton Buteurs via le menu déroulant.`;
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


// V9.3 — tuiles déplaçables et redimensionnables
const layoutKey = 'gamepulse-v93-tile-layout';
const sizeCycle = ['small','side','wide','large','hero','full'];
function getTileBoard(){ return $('tileBoard'); }
function saveTileLayout(){
  const board = getTileBoard(); if(!board) return;
  const layout = [...board.querySelectorAll('.dashboard-tile')].map(tile => ({id: tile.dataset.tile, size: tile.dataset.size || 'side'}));
  localStorage.setItem(layoutKey, JSON.stringify(layout));
}
function applyTileLayout(){
  const board = getTileBoard(); if(!board) return;
  try{
    const layout = JSON.parse(localStorage.getItem(layoutKey) || '[]');
    if(!Array.isArray(layout) || !layout.length) return;
    const tiles = new Map([...board.querySelectorAll('.dashboard-tile')].map(tile => [tile.dataset.tile, tile]));
    layout.forEach(item => {
      const tile = tiles.get(item.id);
      if(tile){ tile.dataset.size = item.size || tile.dataset.size || 'side'; board.appendChild(tile); }
    });
  }catch(e){ localStorage.removeItem(layoutKey); }
}
function resetTileLayout(){
  localStorage.removeItem(layoutKey);
  location.reload();
}
function initTileLayout(){
  const board = getTileBoard(); if(!board) return;
  applyTileLayout();
  let dragged = null;
  board.addEventListener('dragstart', e => {
    const tile = e.target.closest('.dashboard-tile');
    if(!tile || !document.body.classList.contains('layout-editing')) { e.preventDefault(); return; }
    dragged = tile;
    tile.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', tile.dataset.tile);
  });
  board.addEventListener('dragend', () => {
    if(dragged) dragged.classList.remove('dragging');
    board.querySelectorAll('.drop-target').forEach(t=>t.classList.remove('drop-target'));
    dragged = null;
    saveTileLayout();
  });
  board.addEventListener('dragover', e => {
    if(!dragged) return;
    e.preventDefault();
    const target = e.target.closest('.dashboard-tile');
    board.querySelectorAll('.drop-target').forEach(t=>t.classList.remove('drop-target'));
    if(target && target !== dragged){ target.classList.add('drop-target'); }
  });
  board.addEventListener('drop', e => {
    if(!dragged) return;
    e.preventDefault();
    const target = e.target.closest('.dashboard-tile');
    if(target && target !== dragged){
      const rect = target.getBoundingClientRect();
      const after = e.clientY > rect.top + rect.height / 2 || e.clientX > rect.left + rect.width / 2;
      board.insertBefore(dragged, after ? target.nextSibling : target);
    }
    board.querySelectorAll('.drop-target').forEach(t=>t.classList.remove('drop-target'));
    saveTileLayout();
  });
  board.addEventListener('click', e => {
    const btn = e.target.closest('.tile-size');
    if(!btn) return;
    e.preventDefault();
    e.stopPropagation();
    const tile = btn.closest('.dashboard-tile');
    const current = tile.dataset.size || 'side';
    const next = sizeCycle[(sizeCycle.indexOf(current) + 1) % sizeCycle.length];
    tile.dataset.size = next;
    saveTileLayout();
  });
  $('editLayoutBtn')?.addEventListener('click', () => {
    document.body.classList.toggle('layout-editing');
    const active = document.body.classList.contains('layout-editing');
    $('editLayoutBtn').textContent = active ? '✅ Mode édition actif' : '✋ Déplacer / redimensionner';
  });
  $('resetLayoutBtn')?.addEventListener('click', resetTileLayout);
}

function init(){
  renderStages(); renderMatches(); renderStats(); renderTeams('all'); renderBracket(); updateTime();
  addMsg('Bienvenue sur GamePulse V9.4. Le dashboard fixe est rétabli, les buteurs sont dans leur menu, les résultats ont leur page et le tableau affiche les parcours en vert/rouge.');
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
  document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMatches(b.dataset.filter)}));
  $('teamStatusSelect').value='all';
  $('teamStatusSelect').addEventListener('change',e=>renderTeams(e.target.value));
  if($('scorersLimit')) $('scorersLimit').addEventListener('change', renderStats);
  $('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');$('themeBtn').textContent=document.body.classList.contains('light')?'🌙 Mode sombre':'☀️ Mode clair'});
  $('refreshBtn').addEventListener('click',refreshData);
  document.body.addEventListener('click', e => { const card=e.target.closest('.match-card'); if(card) showMatchDetails(card.dataset.matchId); const bm=e.target.closest('.bracket-match'); if(bm) alert('Tableau interactif : ' + bm.dataset.bracket); });
  document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>addMsg(botAnswer(b.dataset.question))));
  $('assistantForm').addEventListener('submit',e=>{e.preventDefault();const input=$('assistantInput'); if(!input.value.trim()) return; addMsg(input.value,'user'); setTimeout(()=>addMsg(botAnswer(input.value)),250); input.value='';});
  setInterval(refreshData,30000);
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js?v=94').catch(()=>{});
  let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('installBtn').classList.remove('hidden')});
  $('installBtn').addEventListener('click',async()=>{ if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;$('installBtn').classList.add('hidden')} });
}
init();
