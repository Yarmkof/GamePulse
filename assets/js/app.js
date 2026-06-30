
const APP_VERSION = '2.0.1';
const LAST_DATA_UPDATE = 'ESPN public scoreboard + secours local';
const stages = ['Groupes','32es','16es','8es','Quarts','Demi','Finale','Champion'];
const currentStageIndex = 2;


const LIVE_API = {
  // API publique ESPN, sans clé. Elle n'est pas une API officielle FIFA.
  // Elle sert de source internet gratuite pour scores, statuts et calendriers.
  provider: 'ESPN public scoreboard',
  scoreboardUrl: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard',
  summaryUrl: 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary',
  refreshMs: 45_000,
  timeoutMs: 10_000,
  summaryLimit: 16
};
let apiState = {
  mode: 'secours local',
  lastOk: null,
  lastError: null,
  loading: false
};
const fallbackData = { teams: null, matches: null };

let teams = [
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

const fallbackScorers = [
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
let scorers = [...fallbackScorers];
const yellowCards = [['Rodri','Espagne',4],['Romero','Argentine',3],['Casemiro','Brésil',3],['Xhaka','Suisse',3],['Ugarte','Uruguay',2],['Konaté','France',2],['Davies','Canada',2],['Dumfries','Pays-Bas',2],['Kimmich','Allemagne',2],['Amrabat','Maroc',2]];
const redCards = [['Romero','Argentine',1],['Otamendi','Argentine',1],['Koulibaly','Sénégal',1],['Richarlison','Brésil',1],['Hernández','Mexique',1]];
function getTeamPower(){ return Object.fromEntries(teams.map(t => [t.name, t.power || 75])); }

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
  const powers = getTeamPower(); const hp = powers[m.home] || 75, ap = powers[m.away] || 75;
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

function pick(obj, keys){
  for(const k of keys){
    if(obj && obj[k] !== undefined && obj[k] !== null && obj[k] !== '') return obj[k];
  }
  return null;
}
function firstObject(v){
  if(Array.isArray(v)) return v[0] || null;
  return v && typeof v === 'object' ? v : null;
}
function unwrapArray(payload){
  if(Array.isArray(payload)) return payload;
  if(!payload || typeof payload !== 'object') return [];
  return payload.data || payload.games || payload.matches || payload.fixtures || payload.result || payload.results || payload.items || [];
}
function withTimeout(promise, ms){
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  return { signal: ctrl.signal, run: promise(ctrl.signal).finally(() => clearTimeout(timer)) };
}
async function apiGetUrl(url){
  const sep = url.includes('?') ? '&' : '?';
  const wrapped = withTimeout((signal)=>fetch(`${url}${sep}_=${Date.now()}`, { cache:'no-store', signal }), LIVE_API.timeoutMs);
  const res = await wrapped.run;
  if(!res.ok) throw new Error(`API ${res.status} sur ${url}`);
  return res.json();
}
function espnDateWindow(){
  const pad = n => String(n).padStart(2,'0');
  const fmt = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}`;
  const start = new Date(); start.setDate(start.getDate() - 4);
  const end = new Date(); end.setDate(end.getDate() + 8);
  return `${fmt(start)}-${fmt(end)}`;
}
function frenchTeamName(name){
  const map = {
    'Germany':'Allemagne','Paraguay':'Paraguay','Brazil':'Brésil','Japan':'Japon','Netherlands':'Pays-Bas','Morocco':'Maroc','South Africa':'Afrique du Sud','Canada':'Canada','France':'France','Sweden':'Suède','Ivory Coast':'Côte d’Ivoire','Côte d\'Ivoire':'Côte d’Ivoire','Norway':'Norvège','Mexico':'Mexique','Ecuador':'Équateur','England':'Angleterre','Congo DR':'RD Congo','DR Congo':'RD Congo','Democratic Republic of the Congo':'RD Congo','Belgium':'Belgique','Senegal':'Sénégal','United States':'États-Unis','USA':'États-Unis','Bosnia and Herzegovina':'Bosnie-Herzégovine','Spain':'Espagne','Austria':'Autriche','Portugal':'Portugal','Croatia':'Croatie','Switzerland':'Suisse','Algeria':'Algérie','Australia':'Australie','Egypt':'Égypte','Argentina':'Argentine','Cape Verde':'Cap-Vert','Colombia':'Colombie','Ghana':'Ghana','South Korea':'Corée du Sud','Czechia':'Tchéquie','Qatar':'Qatar','Haiti':'Haïti','Scotland':'Écosse','Turkey':'Turquie','Curacao':'Curaçao','Curaçao':'Curaçao','Tunisia':'Tunisie','Iran':'Iran','New Zealand':'Nouvelle-Zélande','Saudi Arabia':'Arabie Saoudite','Uruguay':'Uruguay','Iraq':'Irak','Jordan':'Jordanie','Uzbekistan':'Ouzbékistan','Panama':'Panama'
  };
  return map[name] || name;
}
function flagFromEspnTeam(team, fallbackName){
  const name = frenchTeamName(team?.displayName || team?.name || fallbackName || '');
  return normalizeFlag(name) || normalizeFlag(fallbackName) || '';
}
function normalizeEspnStatus(event){
  const type = event?.status?.type || {};
  const state = String(type.state || '').toLowerCase();
  const completed = Boolean(type.completed);
  if(completed || state === 'post') return 'finished';
  if(state === 'in') return 'live';
  return 'upcoming';
}
function normalizeEspnMatch(event, index=0){
  const comp = event?.competitions?.[0] || {};
  const competitors = comp.competitors || [];
  const homeC = competitors.find(c => c.homeAway === 'home') || competitors[0] || {};
  const awayC = competitors.find(c => c.homeAway === 'away') || competitors[1] || {};
  const homeRaw = homeC.team?.displayName || homeC.team?.name || homeC.team?.shortDisplayName || 'Équipe domicile';
  const awayRaw = awayC.team?.displayName || awayC.team?.name || awayC.team?.shortDisplayName || 'Équipe extérieure';
  const home = frenchTeamName(homeRaw);
  const away = frenchTeamName(awayRaw);
  const dateObj = event.date ? new Date(event.date) : null;
  const validDate = dateObj && !Number.isNaN(dateObj.getTime());
  const status = normalizeEspnStatus(event);
  const displayClock = event?.status?.displayClock || comp?.status?.displayClock || '';
  const minuteNum = Number(String(displayClock).match(/\d+/)?.[0]) || null;
  const winner = status === 'finished' ? frenchTeamName((competitors.find(c => c.winner)?.team?.displayName) || '') : null;
  const round = event?.season?.type?.name || event?.week?.text || event?.league?.name || 'Coupe du Monde';
  return {
    id: String(event.id || `espn-${index}`),
    home, away,
    hf: flagFromEspnTeam(homeC.team, home),
    af: flagFromEspnTeam(awayC.team, away),
    hs: homeC.score === undefined || homeC.score === '' ? null : Number(homeC.score),
    as: awayC.score === undefined || awayC.score === '' ? null : Number(awayC.score),
    minute: status === 'live' ? minuteNum : null,
    status,
    round: String(round).replace('FIFA World Cup', 'Coupe du Monde'),
    date: validDate ? dateObj.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}) : '—',
    goals: (Number(homeC.score)||0) + (Number(awayC.score)||0),
    yellow: 0,
    red: 0,
    scorers: [],
    winner: winner || null,
    notes: 'Donnée récupérée depuis ESPN public scoreboard.'
  };
}
function extractScorersFromEspnSummary(summary, match){
  const found = [];
  const push = (name, team, minute) => {
    const clean = frenchTeamName(name || '').trim();
    if(!clean) return;
    const label = `${clean}${minute ? ' ' + minute : ''}`;
    found.push({ player: clean, team: frenchTeamName(team || ''), label });
  };
  const details = summary?.header?.competitions?.[0]?.details || summary?.details || [];
  (Array.isArray(details) ? details : []).forEach(d => {
    const txt = `${d?.type?.text || ''} ${d?.type?.abbreviation || ''} ${d?.text || ''}`.toLowerCase();
    if(!(txt.includes('goal') || txt.includes('but') || txt.includes('penalty'))) return;
    const athlete = d?.athletes?.[0] || d?.participants?.[0] || {};
    const team = d?.team?.displayName || d?.team?.name || '';
    const minute = d?.clock?.displayValue || d?.time?.displayValue || d?.displayClock || '';
    push(athlete.displayName || athlete.shortName || athlete.name || d?.text, team, minute);
  });
  const scoringPlays = summary?.scoringPlays || summary?.scoringplays || [];
  (Array.isArray(scoringPlays) ? scoringPlays : []).forEach(p => {
    const athlete = p?.athletes?.[0] || p?.participants?.[0] || {};
    const team = p?.team?.displayName || p?.team?.name || '';
    const minute = p?.clock?.displayValue || p?.time?.displayValue || p?.displayClock || '';
    push(athlete.displayName || athlete.shortName || athlete.name || p?.text, team, minute);
  });
  const seen = new Set();
  const labels = [];
  found.forEach(x => { if(!seen.has(x.label)){ seen.add(x.label); labels.push(x.label); } });
  return { labels, raw: found };
}
async function fetchEspnSummaries(apiMatches){
  const targets = apiMatches.filter(m => m.status !== 'upcoming').slice(0, LIVE_API.summaryLimit);
  const summaries = await Promise.allSettled(targets.map(m => apiGetUrl(`${LIVE_API.summaryUrl}?event=${encodeURIComponent(m.id)}`)));
  const allGoals = [];
  summaries.forEach((res, i) => {
    if(res.status !== 'fulfilled') return;
    const match = targets[i];
    const extracted = extractScorersFromEspnSummary(res.value, match);
    if(extracted.labels.length) match.scorers = extracted.labels;
    extracted.raw.forEach(g => allGoals.push(g));
  });
  if(allGoals.length){
    const map = new Map();
    allGoals.forEach(g => {
      const key = `${g.player}|${g.team || ''}`;
      const item = map.get(key) || { player:g.player, team:g.team || '', goals:0 };
      item.goals += 1;
      map.set(key, item);
    });
    scorers = [...map.values()]
      .sort((a,b)=>b.goals-a.goals || a.player.localeCompare(b.player))
      .map(g => [g.player, g.team || '—', g.goals, normalizeFlag(g.team) || '']);
    if(scorers.length < 5) scorers = [...fallbackScorers];
  }else{
    scorers = [...fallbackScorers];
  }
}
async function loadEspnScoreboard(){
  const url = `${LIVE_API.scoreboardUrl}?limit=200&dates=${espnDateWindow()}`;
  const payload = await apiGetUrl(url);
  const events = Array.isArray(payload?.events) ? payload.events : [];
  const apiMatches = events.map(normalizeEspnMatch).filter(m => m.home && m.away);
  if(!apiMatches.length) throw new Error('Aucun match ESPN dans la fenêtre demandée');
  await fetchEspnSummaries(apiMatches).catch(()=>{ scorers = [...fallbackScorers]; });
  return apiMatches;
}
function normalizeTeamName(value){
  if(!value) return '';
  if(typeof value === 'string') return value;
  return pick(value, ['name_fr','name_en','name','team','country','country_en','fifa_name']) || '';
}
function normalizeFlag(name){
  return (teams.find(t => t.name === name)?.flag) || '';
}
function normalizeStatus(raw){
  const status = String(pick(raw, ['status','state','match_status','game_status','status_short','status_en']) || '').toLowerCase();
  const minute = Number(pick(raw, ['minute','elapsed','time','current_minute']));
  if(status.includes('finish') || status.includes('complete') || status.includes('ended') || status.includes('ft') || status.includes('full')) return 'finished';
  if(status.includes('live') || status.includes('playing') || status.includes('progress') || status.includes('half') || (minute > 0 && minute < 130)) return 'live';
  return 'upcoming';
}
function normalizeApiMatch(raw, index=0){
  const homeObj = firstObject(pick(raw, ['homeTeam','home_team','home','team_home','localteam','team1']));
  const awayObj = firstObject(pick(raw, ['awayTeam','away_team','away','team_away','visitorteam','team2']));
  const home = normalizeTeamName(homeObj) || pick(raw, ['home_name','homeTeamName','home_team_name','team1_name']) || 'Équipe domicile';
  const away = normalizeTeamName(awayObj) || pick(raw, ['away_name','awayTeamName','away_team_name','team2_name']) || 'Équipe extérieure';
  const scoreObj = firstObject(pick(raw, ['score','scores','result'])) || raw;
  const hs = pick(scoreObj, ['home','home_score','homeScore','score_home','team1_score','home_goals','goals_home']);
  const as = pick(scoreObj, ['away','away_score','awayScore','score_away','team2_score','away_goals','goals_away']);
  const dateRaw = pick(raw, ['date','match_date','kickoff','start_time','datetime','utcDate','scheduled_at']);
  const d = dateRaw ? new Date(dateRaw) : null;
  const validDate = d && !Number.isNaN(d.getTime());
  const status = normalizeStatus(raw);
  const events = unwrapArray(pick(raw, ['events','goals','scorers','incidents']));
  const scorers = events.map(e => pick(e, ['player','player_name','name','scorer','athlete']) || normalizeTeamName(e)).filter(Boolean).slice(0,8);
  const round = pick(raw, ['round','stage','phase','matchday','group']) || 'Coupe du Monde';
  return {
    id: String(pick(raw, ['id','game_id','match_id','fixture_id']) || `api-${index}`),
    home, away,
    hf: normalizeFlag(home), af: normalizeFlag(away),
    hs: hs === null ? null : Number(hs),
    as: as === null ? null : Number(as),
    minute: Number(pick(raw, ['minute','elapsed','time','current_minute'])) || null,
    status,
    round: String(round),
    date: validDate ? d.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}) : (pick(raw, ['date_fr','dateLabel']) || '—'),
    goals: (Number(hs)||0) + (Number(as)||0),
    yellow: Number(pick(raw, ['yellow','yellow_cards']) || 0),
    red: Number(pick(raw, ['red','red_cards']) || 0),
    scorers,
    winner: pick(raw, ['winner','winner_name']) || null,
    notes: 'Donnée récupérée depuis l’API internet.'
  };
}
function normalizeApiTeam(raw){
  const name = normalizeTeamName(raw);
  if(!name) return null;
  const group = pick(raw, ['group','group_name','group_letter']) || '';
  const existing = teams.find(t => t.name === name) || {};
  return {
    name,
    flag: existing.flag || pick(raw, ['flag','emoji']) || '',
    group: String(group).replace('Group ','').replace('Groupe ',''),
    status: existing.status || 'qualified',
    power: existing.power || 75
  };
}
async function loadInternetData(){
  if(apiState.loading) return false;
  apiState.loading = true;
  try{
    if(!fallbackData.matches) fallbackData.matches = matches.map(m => ({...m, scorers:[...(m.scorers||[])]}));
    if(!fallbackData.teams) fallbackData.teams = teams.map(t => ({...t}));
    const apiMatches = await loadEspnScoreboard();
    matches = apiMatches;
    // On conserve les 48 équipes de secours pour éviter une liste incomplète,
    // puis on ajoute/actualise les équipes vues dans le flux ESPN.
    const merged = new Map((fallbackData.teams || teams).map(t => [t.name, {...t}]));
    apiMatches.forEach(m => {
      [[m.home,m.hf],[m.away,m.af]].forEach(([name,flag]) => {
        if(!merged.has(name)) merged.set(name, {name, flag, group:'—', status:'qualified', power:75});
      });
    });
    teams = [...merged.values()];
    apiState.mode = 'internet';
    apiState.provider = LIVE_API.provider;
    apiState.lastOk = new Date();
    apiState.lastError = null;
    return true;
  }catch(err){
    apiState.mode = 'secours local';
    apiState.provider = 'secours local';
    apiState.lastError = err?.message || String(err);
    scorers = [...fallbackScorers];
    if(fallbackData.matches) matches = fallbackData.matches.map(m => ({...m, scorers:[...(m.scorers||[])]}));
    if(fallbackData.teams) teams = fallbackData.teams.map(t => ({...t}));
    return false;
  }finally{
    apiState.loading = false;
  }
}
function updateSourcePill(){
  const source = apiState.mode === 'internet' ? 'ESPN public' : 'secours local';
  const err = apiState.lastError ? ` • ${apiState.lastError}` : '';
  const time = new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
  $('lastUpdate').textContent = `${source} • ${time}${err ? ' • hors ligne' : ''}`;
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
  return `<button class="bracket-match animated dynamic-node" style="--delay:${delay}ms" data-round="${roundIndex}" data-index="${matchIndex}" data-bracket="${escapeHtml(m.a)} ${escapeHtml(m.as)} - ${escapeHtml(m.bs)} ${escapeHtml(m.b)}" data-winner="${escapeHtml(m.winner)}">
    <span class="bm-team ${winA?'winner still-in':''} ${!winA?'stopped':''}" data-team="${escapeHtml(m.a)}"><em>${m.af}</em><strong>${escapeHtml(m.a)}</strong><b>${escapeHtml(m.as)}</b></span>
    <span class="bm-team ${winB?'winner still-in':''} ${!winB?'stopped':''}" data-team="${escapeHtml(m.b)}"><em>${m.bf}</em><strong>${escapeHtml(m.b)}</strong><b>${escapeHtml(m.bs)}</b></span>
  </button>`;
}
function renderBracket(){
  const rounds = bracketRounds.map((round, i)=>`<section class="bracket-round ${round.id}" style="--round:${i}"><h4>${round.title}</h4><div class="round-stack">${round.matches.map((m, mi)=>bracketMatch(m,i,mi)).join('')}</div></section>`).join('');
  const markup = `<div class="prediction-bracket dynamic-bracket">
    <div class="bracket-hero">
      <div><p class="eyebrow">2026 FIFA World Cup</p><h3>Tableau dynamique</h3></div>
      <div class="bracket-actions"><span class="pill">Version officielle 1.0.10</span><button class="link-btn" id="centerBracketBtn" type="button">Recentrer</button></div>
    </div>
    <div class="bracket-legend"><span class="legend-item"><i class="legend-dot green"></i> encore en course</span><span class="legend-item"><i class="legend-dot red"></i> parcours arrêté</span><span class="legend-item"><i class="legend-dot blue"></i> raccord dynamique</span></div>
    <div class="bracket-viewport" id="bracketViewport"><div class="bracket-scroll dynamic-scroll" id="bracketScroll"><svg class="bracket-lines" id="bracketLines" aria-hidden="true"></svg>${rounds}</div></div>
    <aside class="champion-card">
      <span class="trophy">🏆</span>
      <p>Champion</p>
      <strong>${bracketMeta.champion.flag} ${bracketMeta.champion.team}</strong>
      <small>Troisième place : ${bracketMeta.third.flag} ${bracketMeta.third.team}</small>
    </aside>
  </div>`;
  $('bracketGrid').innerHTML = markup;
  $('centerBracketBtn')?.addEventListener('click', () => { const vp=$('bracketViewport'); if(vp){ vp.scrollTo({left:0, top:0, behavior:'smooth'}); } });
  requestAnimationFrame(drawDynamicBracketPaths);
  setTimeout(drawDynamicBracketPaths, 120);
}
function drawDynamicBracketPaths(){
  const svg = $('bracketLines');
  const scroll = $('bracketScroll');
  if(!svg || !scroll || !scroll.offsetWidth || !scroll.offsetHeight) return;
  const scrollRect = scroll.getBoundingClientRect();
  const w = Math.max(scroll.scrollWidth, scroll.offsetWidth);
  const h = Math.max(scroll.scrollHeight, scroll.offsetHeight);
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  svg.innerHTML = '';
  const nodes = [...scroll.querySelectorAll('.bracket-match.dynamic-node')];
  const byKey = new Map(nodes.map(n => [`${n.dataset.round}-${n.dataset.index}`, n]));
  function point(node, side='right'){
    const r = node.getBoundingClientRect();
    const x = (side === 'left' ? r.left : r.right) - scrollRect.left + scroll.scrollLeft;
    const y = r.top + r.height/2 - scrollRect.top + scroll.scrollTop;
    return {x,y};
  }
  function addPath(from, to, cls){
    const gap = Math.max(22, Math.min(54, (to.x - from.x) / 2));
    const d = `M ${from.x} ${from.y} C ${from.x + gap} ${from.y}, ${to.x - gap} ${to.y}, ${to.x} ${to.y}`;
    const path = document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d', d);
    path.setAttribute('class', `bracket-path ${cls}`);
    svg.appendChild(path);
  }
  for(let r=0; r<bracketRounds.length-1; r++){
    bracketRounds[r].matches.forEach((m, i) => {
      const from = byKey.get(`${r}-${i}`);
      const to = byKey.get(`${r+1}-${Math.floor(i/2)}`);
      if(!from || !to) return;
      addPath(point(from,'right'), point(to,'left'), 'path-live');
    });
  }
}
function navigate(view){
  document.querySelectorAll('.view').forEach(v=>v.classList.remove('active-view'));
  $(view).classList.add('active-view');
  document.querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  const titles = {home:'GamePulse 2.0 Live',matches:'Matchs Coupe du Monde',results:'Résultats',bracket:'Tableau interactif',scorers:'Classement des buteurs',stats:'Statistiques',teams:'Équipes',assistant:'Assistant IA'};
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
  return `Analyse IA : GamePulse compare score, statut, niveau des équipes, buteurs et tableau. Les données sportives sont maintenant tentées depuis l’API internet avec secours local si la source est indisponible.`;
}
function addMsg(txt,type='bot'){ const box=$('chatBox'); box.insertAdjacentHTML('beforeend',`<div class="msg ${type}">${txt}</div>`); box.scrollTop=box.scrollHeight; }
function updateTime(){ updateSourcePill(); }
async function refreshData(){
  const btn = $('refreshBtn');
  if(btn){ btn.disabled = true; btn.textContent = '↻ Mise à jour...'; }
  await loadInternetData();
  renderStages();
  renderMatches(document.querySelector('.filter.active')?.dataset.filter||'all');
  renderStats();
  renderTeams($('teamStatusSelect')?.value || 'all');
  renderBracket();
  updateTime();
  if(btn){ btn.disabled = false; btn.textContent = '↻ Actualiser'; }
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
  renderStages(); renderMatches(); renderStats(); renderTeams('all'); renderBracket(); updateTime(); refreshData();
  addMsg("Bienvenue sur GamePulse 2.0. Les matchs tentent maintenant de se mettre à jour depuis ESPN public toutes les 45 secondes. Si la source est indisponible, l'app bascule en secours local.");
  document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
  window.addEventListener('resize', () => requestAnimationFrame(drawDynamicBracketPaths));
  document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMatches(b.dataset.filter)}));
  $('teamStatusSelect').value='all';
  $('teamStatusSelect').addEventListener('change',e=>renderTeams(e.target.value));
  if($('scorersLimit')) $('scorersLimit').addEventListener('change', renderStats);
  $('themeBtn').addEventListener('click',()=>{document.body.classList.toggle('light');$('themeBtn').textContent=document.body.classList.contains('light')?'🌙 Mode sombre':'☀️ Mode clair'});
  $('refreshBtn').addEventListener('click',refreshData);
  document.body.addEventListener('click', e => { const card=e.target.closest('.match-card'); if(card) showMatchDetails(card.dataset.matchId); const bm=e.target.closest('.bracket-match'); if(bm) alert('Tableau interactif : ' + bm.dataset.bracket); });
  document.querySelectorAll('[data-question]').forEach(b=>b.addEventListener('click',()=>addMsg(botAnswer(b.dataset.question))));
  $('assistantForm').addEventListener('submit',e=>{e.preventDefault();const input=$('assistantInput'); if(!input.value.trim()) return; addMsg(input.value,'user'); setTimeout(()=>addMsg(botAnswer(input.value)),250); input.value='';});
  setInterval(refreshData, LIVE_API.refreshMs);
  if('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js?v=201').catch(()=>{});
  let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('installBtn').classList.remove('hidden')});
  $('installBtn').addEventListener('click',async()=>{ if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null;$('installBtn').classList.add('hidden')} });
}
init();
