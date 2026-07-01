import { fallbackMatches, flag } from './data.js';
const ESPN_SCOREBOARD = 'https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard';
const nameMap = {'Germany':'Allemagne','Paraguay':'Paraguay','Brazil':'Brésil','Japan':'Japon','Netherlands':'Pays-Bas','Morocco':'Maroc','South Africa':'Afrique du Sud','Canada':'Canada','France':'France','Sweden':'Suède','Ivory Coast':'Côte d’Ivoire','Norway':'Norvège','Mexico':'Mexique','Ecuador':'Équateur','England':'Angleterre','Congo DR':'RD Congo','DR Congo':'RD Congo','Belgium':'Belgique','Senegal':'Sénégal','United States':'États-Unis','USA':'États-Unis','Bosnia and Herzegovina':'Bosnie-Herzégovine','Spain':'Espagne','Austria':'Autriche','Portugal':'Portugal','Croatia':'Croatie','Switzerland':'Suisse','Algeria':'Algérie','Australia':'Australie','Egypt':'Égypte','Argentina':'Argentine','Cape Verde':'Cap-Vert','Colombia':'Colombie','Ghana':'Ghana'};
function frName(v){ return nameMap[v] || v || 'Équipe'; }
function ymd(d){ const p=n=>String(n).padStart(2,'0'); return `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}`; }
function dateRange(){ const a=new Date(); a.setDate(a.getDate()-5); const b=new Date(); b.setDate(b.getDate()+10); return `${ymd(a)}-${ymd(b)}`; }
async function fetchJson(url, timeout=10000){ const ctrl=new AbortController(); const t=setTimeout(()=>ctrl.abort(),timeout); try{ const r=await fetch(`${url}${url.includes('?')?'&':'?'}_=${Date.now()}`,{cache:'no-store',signal:ctrl.signal}); if(!r.ok) throw new Error(`HTTP ${r.status}`); return await r.json(); } finally{ clearTimeout(t); } }
function normalizeEvent(e, i){ const c=e.competitions?.[0] || {}; const comps=c.competitors || []; const homeC=comps.find(x=>x.homeAway==='home') || comps[0] || {}; const awayC=comps.find(x=>x.homeAway==='away') || comps[1] || {}; const home=frName(homeC.team?.displayName || homeC.team?.name || homeC.team?.shortDisplayName); const away=frName(awayC.team?.displayName || awayC.team?.name || awayC.team?.shortDisplayName); const state=(e.status?.type?.state || '').toLowerCase(); const done=!!e.status?.type?.completed; const status=done||state==='post'?'finished':state==='in'?'live':'upcoming'; const dateObj=e.date?new Date(e.date):null; const date=dateObj&&!isNaN(dateObj)?dateObj.toLocaleDateString('fr-FR',{day:'2-digit',month:'2-digit'}):''; const winnerComp=comps.find(x=>x.winner); return {id:String(e.id||`espn-${i}`),round:e.season?.type?.name || e.week?.text || 'Coupe du Monde',date,home,away,hf:flag(home),af:flag(away),hs:homeC.score===''||homeC.score==null?null:Number(homeC.score),as:awayC.score===''||awayC.score==null?null:Number(awayC.score),status,minute:state==='in'?Number(String(e.status?.displayClock||'').match(/\d+/)?.[0])||null:null,winner:winnerComp?frName(winnerComp.team?.displayName||winnerComp.team?.name):null,notes:e.name || ''}; }
export async function loadLiveMatches(){ const payload=await fetchJson(`${ESPN_SCOREBOARD}?dates=${dateRange()}&limit=100`); const events=Array.isArray(payload.events)?payload.events:[]; if(!events.length) throw new Error('Aucun événement ESPN retourné'); return {source:'ESPN public scoreboard',official:false,matches:events.map(normalizeEvent)}; }
export function loadFallback(){ return {source:'Secours local intégré',official:false,matches:fallbackMatches.map(m=>({...m,hf:flag(m.home),af:flag(m.away)}))}; }


export async function loadScorers(){
  try{
    const payload = await fetchJson('./assets/data/scorers.json', 7000);
    const rows = Array.isArray(payload.scorers) ? payload.scorers : [];
    if(!rows.length) throw new Error('scorers.json vide');
    return {
      source: payload.source || 'assets/data/scorers.json',
      updatedAt: payload.updatedAt || new Date().toISOString().slice(0,10),
      scorers: rows.map(x => [x.player, x.team, Number(x.goals)||0, x.flag || flag(x.team)])
    };
  }catch(err){
    const mod = await import('./data.js');
    return {source:`Secours local intégré (${err.message})`, updatedAt:'2026-06-30', scorers:mod.scorersFallback};
  }
}
