## Objectif

Renforcer le tableau de bord `/admin/$token` avec de vrais outils de suivi des RSVP pour donner envie aux organisateurs de revenir et de réutiliser le site pour leurs prochains événements.

## Ce que je vais ajouter

### 1. Export CSV des réponses (1-clic)

Bouton "Exporter en CSV" qui télécharge la liste des invités avec : Nom, Statut (Oui/Non/Peut-être), Nombre d'invités, Message, Date de réponse. Génération côté client, aucune dépendance.

### 2. Statistiques visuelles

En haut du dashboard, remplacer les 4 chiffres bruts par un bloc enrichi :

- **Taux de réponse** (% des invités ayant répondu, si nombre total connu — sinon total réponses)
- **Barre de progression Oui / Non / Peut-être** (proportions colorées)
- **Évolution dans le temps** : mini-graphique (sparkline SVG natif, sans lib) montrant les réponses cumulées par jour
- **Dernière réponse reçue** (il y a X minutes/heures)

### 3. Recherche & filtres sur la liste des invités

Champ recherche par nom + filtres par statut (Tous / Oui / Non / Peut-être) + tri (date, nom, nb invités).

### 4. Rappel WhatsApp pour les non-répondants

Bouton "Envoyer un rappel" qui ouvre WhatsApp avec un message pré-rempli incluant le lien de l'invitation. Pratique pour relancer les invités qui n'ont pas encore répondu.

### 5. Notes privées par invité

Petit champ texte (localStorage côté admin) pour annoter chaque RSVP : "Allergique aux fruits de mer", "Vient avec sa femme", etc. Visible uniquement par l'organisateur, jamais publié.

### 6. Compteur en temps quasi-réel

Auto-refresh de la liste RSVP toutes les 30s (via `router.invalidate()`) pour voir les nouvelles réponses sans recharger la page.

## Détails techniques

- Toutes les nouveautés vivent dans `src/routes/admin.$token.tsx` + 1 ou 2 petits composants extraits dans `src/components/admin/` (stats-panel, rsvp-table).
- Export CSV : utilitaire pur JS dans `src/lib/csv-export.ts` (génération Blob + `URL.createObjectURL`).
- Notes privées : extension de `src/lib/my-invitations.ts` avec un map `{ rsvpId: note }` par invitation, dans localStorage.
- Auto-refresh : `useEffect` avec `setInterval` + `router.invalidate()`.
- Sparkline : composant SVG inline (~30 lignes), pas de Chart.js.
- Aucune modification du schéma base de données → 100% gratuit, zéro impact serveur.

## Ce que je ne touche PAS

- Pas de modification des templates ni de la page publique `/i/$slug`.
- Pas de système de paiement, pas de premium.
- Pas d'envoi d'emails (nécessiterait un service tiers).

## Résultat attendu

Le tableau de bord devient un vrai outil de gestion d'événement que l'organisateur consulte plusieurs fois entre la création et le jour J — favorisant le retour sur le site et le bouche-à-oreille pour de futures invitations.
