const API_KEY = '123';
const BASE = `https://www.thesportsdb.com/api/v1/json/${API_KEY}`;
const content = document.getElementById('content');
const statusBox = document.getElementById('status');
const navs = [...document.querySelectorAll('.nav[data-view]')];
const themeBtn = document.getElementById('themeBtn');
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('teamSearch');

let currentView = 'live';

const leagues = [
  { id: '4328', name: 'Premier League' },
  { id: '4334', name: 'Ligue 1' },
  { id: '4335', name: 'La Liga' },
  { id: '4331', name: 'Bundesliga' },
  { id: '4332', name: 'Serie A' },
  { id: '4480', name: 'FIFA World Cup' }
];

document.body.classList.toggle('light', localStorage.getItem('theme') === 'light');
themeBtn.textContent = document.body.classList.contains('light') ? '🌙 Mode sombre' : '☀️ Mode clair';

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  themeBtn.textContent = document.body.classList.contains('light') ? '🌙 Mode sombre' : '☀️ Mode clair';
});

navs.forEach(btn => btn.addEventListener('click', () => {
  navs.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentView = btn.dataset.view;
  loadView(currentView);
}));

searchBtn.addEventListener('click', () => searchTeam());
searchInput.addEventListener('keydown', e => { if(e.key === 'Enter') searchTeam(); });

async function fetchJson(url){
  const res = await fetch(url);
  if(!res.ok) throw new Error('Erreur API');
  return res.json();
}

function setStatus(text, ok = true){
  statusBox.textContent = text;
  statusBox.style.display = ok ? 'block' : 'block';
}
function clear(){ content.innerHTML = ''; }
function card(html){ return `<article class="card">${html}</article>`; }
function esc(v){ return (v || '').toString().replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s])); }

function formatDate(d){ return d ? new Date(d).toLocaleDateString('fr-FR', {weekday:'short', day:'2-digit', month:'short'}) : 'Date inconnue'; }

async function loadLiveLike(){
  setStatus('Chargement des matchs depuis TheSportsDB...');
  clear();
  const urls = leagues.slice(0,5).map(l => fetchJson(`${BASE}/eventsnextleague.php?id=${l.id}`).then(data => ({league:l, events:data.events || []})).catch(() => ({league:l, events:[]})) );
  const results = await Promise.all(urls);
  const events = results.flatMap(r => r.events.slice(0,3).map(e => ({...e, leagueName:r.league.name})));
  document.getElementById('statEvents').textContent = events.length;
  document.getElementById('statLeagues').textContent = leagues.length;
  if(!events.length){ content.innerHTML = `<div class="card empty">Aucun match récupéré pour le moment. Essaie le calendrier ou la recherche d'équipe.</div>`; setStatus('Données API chargées, mais aucun événement trouvé.'); return; }
  content.innerHTML = events.map(e => card(`
    <span class="badge">${esc(e.leagueName)}</span>
    <h3>${esc(e.strEvent || 'Match')}</h3>
    <div class="teams">
      <div class="team">${e.strHomeTeamBadge ? `<img src="${e.strHomeTeamBadge}"/>` : ''}<strong>${esc(e.strHomeTeam)}</strong></div>
      <div class="score">VS</div>
      <div class="team">${e.strAwayTeamBadge ? `<img src="${e.strAwayTeamBadge}"/>` : ''}<strong>${esc(e.strAwayTeam)}</strong></div>
    </div>
    <p class="muted">📅 ${formatDate(e.dateEvent)} · ⏰ ${esc(e.strTimeLocal || e.strTime || '')}</p>
    <p class="muted">🏟️ ${esc(e.strVenue || 'Stade à confirmer')}</p>
  `)).join('');
  setStatus('Matchs à venir chargés avec l’API gratuite TheSportsDB.');
}

async function loadCalendar(){
  setStatus('Chargement du calendrier...');
  clear();
  const data = await fetchJson(`${BASE}/eventsnextleague.php?id=4328`).catch(() => ({events:[]}));
  const events = data.events || [];
  content.innerHTML = events.length ? events.map(e => card(`
    <span class="badge">Calendrier</span>
    <h3>${esc(e.strEvent)}</h3>
    <p class="muted">📅 ${formatDate(e.dateEvent)} · ⏰ ${esc(e.strTimeLocal || e.strTime || '')}</p>
    <p>${esc(e.strLeague)} · Saison ${esc(e.strSeason)}</p>
  `)).join('') : `<div class="card empty">Calendrier indisponible actuellement.</div>`;
  setStatus('Calendrier chargé. Par défaut : Premier League, modifiable ensuite.');
}

function loadCompetitions(){
  setStatus('Compétitions disponibles dans GamePulse.');
  clear();
  content.innerHTML = leagues.map(l => card(`
    <span class="badge">Compétition</span>
    <h3>${esc(l.name)}</h3>
    <p class="muted">ID API : ${l.id}</p>
    <button class="primary" onclick="loadLeague('${l.id}','${esc(l.name)}')">Voir les prochains matchs</button>
  `)).join('');
}

window.loadLeague = async (id, name) => {
  setStatus(`Chargement : ${name}`); clear();
  const data = await fetchJson(`${BASE}/eventsnextleague.php?id=${id}`).catch(()=>({events:[]}));
  const events = data.events || [];
  content.innerHTML = events.map(e => card(`<h3>${esc(e.strEvent)}</h3><p class="muted">${formatDate(e.dateEvent)} · ${esc(e.strTime || '')}</p>`)).join('') || `<div class="card empty">Aucun match trouvé.</div>`;
};

async function searchTeam(){
  const q = searchInput.value.trim();
  if(!q) return;
  navs.forEach(b => b.classList.remove('active'));
  currentView = 'teams';
  setStatus(`Recherche de l'équipe : ${q}`);
  clear();
  const data = await fetchJson(`${BASE}/searchteams.php?t=${encodeURIComponent(q)}`).catch(()=>({teams:[]}));
  const teams = data.teams || [];
  content.innerHTML = teams.length ? teams.map(t => card(`
    <div class="team">${t.strTeamBadge ? `<img src="${t.strTeamBadge}"/>` : ''}<h3>${esc(t.strTeam)}</h3></div>
    <p><strong>${esc(t.strLeague || 'Compétition inconnue')}</strong></p>
    <p class="muted">${esc(t.strCountry || '')} · ${esc(t.strStadium || '')}</p>
    <p>${esc((t.strDescriptionFR || t.strDescriptionEN || '').slice(0,180))}${(t.strDescriptionFR || t.strDescriptionEN) ? '...' : ''}</p>
  `)).join('') : `<div class="card empty">Aucune équipe trouvée pour “${esc(q)}”.</div>`;
  setStatus(`${teams.length} résultat(s) trouvé(s).`);
}

function loadAlerts(){
  setStatus('Alertes démo — la notification navigateur sera ajoutée dans une prochaine version.');
  content.innerHTML = card(`
    <span class="badge">Bientôt</span>
    <h3>Alertes GamePulse</h3>
    <p>Dans la prochaine version : favoris, alertes de buts, début de match et résultats.</p>
    <button class="primary" onclick="alert('Démo : les alertes seront activées avec les favoris.')">Tester une alerte</button>
  `);
}

async function loadView(view){
  try{
    if(view === 'live') return loadLiveLike();
    if(view === 'calendar') return loadCalendar();
    if(view === 'competitions') return loadCompetitions();
    if(view === 'teams') { searchInput.focus(); clear(); setStatus('Tape une équipe dans la barre de recherche.'); return; }
    if(view === 'alerts') return loadAlerts();
  }catch(e){
    setStatus('Erreur de chargement API. La limite gratuite est peut-être atteinte ou le navigateur bloque la requête.', false);
    content.innerHTML = `<div class="card empty">Impossible de charger les données pour le moment.</div>`;
  }
}

loadView('live');
