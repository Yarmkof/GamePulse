# GamePulse 2.0

Application PWA Coupe du Monde avec mise à jour internet toutes les 45 secondes.

## Nouveautés 2.0
- Connexion à une API football gratuite sans clé : `https://worldcup26.ir/get/games`, `/get/teams`.
- Rafraîchissement automatique toutes les 45 secondes.
- Bouton Actualiser connecté à une vraie tentative de récupération internet.
- Mode secours local si l’API est indisponible ou bloquée par le navigateur.
- Cache PWA corrigé pour ne pas mettre en cache les appels API.

## Important
La source gratuite intégrée est open source / publique, mais elle n’est pas une source officielle FIFA. Pour une donnée officiellement licenciée FIFA/Sportradar/Opta, il faut généralement une API payante ou un accord de données.


## V2.0.1 - API live réelle
- Source internet gratuite sans clé : ESPN public scoreboard (`site.api.espn.com`).
- Rafraîchissement automatique toutes les 45 secondes.
- Bouton Actualiser = nouvel appel réseau réel (`fetch`, `cache: no-store`).
- Secours local automatique si l'API est indisponible ou modifie son format.
- Les données ESPN sont publiques et gratuites, mais non officielles FIFA et non garanties contractuellement.
