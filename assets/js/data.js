export const APP_VERSION = '2.0.2';
export const REFRESH_MS = 45000;

export const scorersFallback = [
  ['L. Messi','Argentine',6,'🇦🇷'],['E. Haaland','Norvège',4,'🇳🇴'],['O. Dembélé','France',4,'🇫🇷'],['Vinícius Júnior','Brésil',4,'🇧🇷'],['K. Mbappé','France',4,'🇫🇷'],['D. Undav','Allemagne',3,'🇩🇪'],['J. Manzambi','Suisse',3,'🇨🇭'],['B. Brobbey','Pays-Bas',3,'🇳🇱'],['Matheus Cunha','Brésil',3,'🇧🇷'],['I. Saibari','Maroc',3,'🇲🇦'],['I. Sarr','Sénégal',3,'🇸🇳'],['H. Kane','Angleterre',3,'🏴'],['E. Just','Nouvelle-Zélande',3,'🇳🇿'],['Y. Wissa','RD Congo',3,'🇨🇩'],['J. David','Canada',3,'🇨🇦'],['E. Mahmić','Bosnie',2,'🇧🇦'],['M. Arnautović','Autriche',2,'🇦🇹'],['A. Elanga','Suède',2,'🇸🇪'],['C. Summerville','Pays-Bas',2,'🇳🇱'],['N. Pépé','Côte d’Ivoire',2,'🇨🇮']
];

export const groups = {
  A:['Mexique','Afrique du Sud','Corée du Sud','Tchéquie'], B:['Canada','Bosnie-Herzégovine','Qatar','Suisse'], C:['Brésil','Maroc','Haïti','Écosse'], D:['États-Unis','Paraguay','Australie','Turquie'], E:['Allemagne','Curaçao','Côte d’Ivoire','Équateur'], F:['Pays-Bas','Japon','Suède','Tunisie'], G:['Belgique','Égypte','Iran','Nouvelle-Zélande'], H:['Espagne','Cap-Vert','Arabie Saoudite','Uruguay'], I:['France','Sénégal','Irak','Norvège'], J:['Argentine','Algérie','Autriche','Jordanie'], K:['Portugal','RD Congo','Ouzbékistan','Colombie'], L:['Angleterre','Croatie','Ghana','Panama']
};

export const teamFlags = {'Mexique':'🇲🇽','Afrique du Sud':'🇿🇦','Corée du Sud':'🇰🇷','Tchéquie':'🇨🇿','Canada':'🇨🇦','Bosnie-Herzégovine':'🇧🇦','Bosnie':'🇧🇦','Qatar':'🇶🇦','Suisse':'🇨🇭','Brésil':'🇧🇷','Maroc':'🇲🇦','Haïti':'🇭🇹','Écosse':'🏴󠁧󠁢󠁳󠁣󠁴󠁿','États-Unis':'🇺🇸','Paraguay':'🇵🇾','Australie':'🇦🇺','Turquie':'🇹🇷','Allemagne':'🇩🇪','Curaçao':'🇨🇼','Côte d’Ivoire':'🇨🇮','Équateur':'🇪🇨','Pays-Bas':'🇳🇱','Japon':'🇯🇵','Suède':'🇸🇪','Tunisie':'🇹🇳','Belgique':'🇧🇪','Égypte':'🇪🇬','Iran':'🇮🇷','Nouvelle-Zélande':'🇳🇿','Espagne':'🇪🇸','Cap-Vert':'🇨🇻','Arabie Saoudite':'🇸🇦','Uruguay':'🇺🇾','France':'🇫🇷','Sénégal':'🇸🇳','Irak':'🇮🇶','Norvège':'🇳🇴','Argentine':'🇦🇷','Algérie':'🇩🇿','Autriche':'🇦🇹','Jordanie':'🇯🇴','Portugal':'🇵🇹','RD Congo':'🇨🇩','Ouzbékistan':'🇺🇿','Colombie':'🇨🇴','Angleterre':'🏴','Croatie':'🇭🇷','Ghana':'🇬🇭','Panama':'🇵🇦'};

export const fallbackMatches = [
  {id:'rsa-can',round:'16es',date:'28/06',home:'Afrique du Sud',away:'Canada',hs:0,as:1,status:'finished',winner:'Canada',notes:'Canada qualifié.'},
  {id:'bra-jpn',round:'16es',date:'29/06',home:'Brésil',away:'Japon',hs:2,as:1,status:'finished',winner:'Brésil',notes:'Brésil qualifié.'},
  {id:'ger-par',round:'16es',date:'29/06',home:'Allemagne',away:'Paraguay',hs:1,as:1,status:'finished',winner:'Paraguay',pens:'3-4',notes:'Paraguay qualifié aux tirs au but.'},
  {id:'ned-mar',round:'16es',date:'29/06',home:'Pays-Bas',away:'Maroc',hs:1,as:1,status:'finished',winner:'Maroc',pens:'2-3',notes:'Maroc qualifié aux tirs au but.'},
  {id:'civ-nor',round:'16es',date:'30/06',home:'Côte d’Ivoire',away:'Norvège',hs:null,as:null,status:'upcoming'},
  {id:'fra-swe',round:'16es',date:'30/06',home:'France',away:'Suède',hs:null,as:null,status:'upcoming'},
  {id:'mex-ecu',round:'16es',date:'30/06',home:'Mexique',away:'Équateur',hs:null,as:null,status:'upcoming'},
  {id:'eng-cod',round:'16es',date:'01/07',home:'Angleterre',away:'RD Congo',hs:null,as:null,status:'upcoming'},
  {id:'bel-sen',round:'16es',date:'01/07',home:'Belgique',away:'Sénégal',hs:null,as:null,status:'upcoming'},
  {id:'usa-bih',round:'16es',date:'01/07',home:'États-Unis',away:'Bosnie-Herzégovine',hs:null,as:null,status:'upcoming'},
  {id:'esp-aut',round:'16es',date:'02/07',home:'Espagne',away:'Autriche',hs:null,as:null,status:'upcoming'},
  {id:'por-cro',round:'16es',date:'02/07',home:'Portugal',away:'Croatie',hs:null,as:null,status:'upcoming'}
];

export function flag(name){ return teamFlags[name] || '🏳️'; }
