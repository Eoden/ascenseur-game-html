# Contexte Global du Projet

Ce dépôt contient plusieurs mini-jeux et une architecture expérimentale d’orchestration entre un agent Git autonome et une interface web.

## 🎮 Jeux présents dans le projet
- Mini-jeu Zelda-like (canvas, sprites, ennemis, donjon, énigmes)
- Systèmes de déplacements mobiles
- Gestion d’écrans multiples
- Tests d’animations et systèmes d'assets

## 🤖 Fonctionnement technique du projet
L’agent Git autonome est responsable de :
- lire les fichiers existants (tree puis lecture ciblée fichier par fichier)
- appliquer des opérations atomiques via `/command`
- commiter et pousser automatiquement sur `main`

Chaque opération doit être déterministe, traçable et isolée.

---

## 🧱 Architecture clé
- `/zelda/` → contient le jeu Zelda-like (sprites, JS, assets)
- `index.html`, `style.css`, `script.js` → noyau de l’interface
- Système de sprites → actuellement en évolution, amélioration visuelle nécessaire
- Endpoints back-end → exposés par l'agent pour lecture/écriture Git

---

## 🎨 Sprites
Deux types d’entités :
- **Hero** : animations de marche, combat, idle
- **Slime ennemi** : animation idle + attaque future

Les sprites actuels sont des placeholders et doivent être remplacés par des versions plus détaillées.

---

## 🚀 Objectif du projet
- Explorer la capacité d’un agent autonome à gérer un dépôt complet
- Générer et mettre à jour du code front-end et des assets automatiquement
- Développer un petit jeu complet entièrement piloté par IA

---

# 📌 Règles essentielles pour modifications futures

- Toujours lire avant d’écrire
- Ne jamais inventer un fichier non confirmé
- Utiliser des commits atomiques
- Toujours fournir le contenu COMPLET des fichiers modifiés
- Re-check obligatoire avant toute modification multi-fichiers
- Après validation → exécuter `/command`

---

# 📖 Règles de lecture obligatoires (Version 3.0)

1. Toujours utiliser `/repo/tree` comme source de vérité structurelle.
2. Ne jamais utiliser `/repo/full-text` sauf cas exceptionnel (risque ResponseTooLarge).
3. Lire les fichiers texte un par un via `/repo/file?path=...`.
4. Ne jamais supposer le contenu d’un fichier.
5. Toute modification doit être précédée d’une lecture ciblée du ou des fichiers concernés.
6. Si doute sur l’état du repo → relire via `/repo/tree`.
7. Aucune modification ne doit être effectuée sans vérification préalable.

---

# 🖼 Spécificité PNG

L’agent est autorisé à générer des fichiers PNG placeholders contenant :
- une grille de pixels arbitraires
- des couleurs simples
- des patterns générés textuellement

Même si le PNG exact ne provient pas d’un moteur graphique, l’agent a le droit d’en produire un tant qu’il est valide au format PNG.

L’objectif est d’avoir des assets temporaires, non définitifs.

---

# 🔄 PNG fournis par un modèle externe

L’agent est explicitement autorisé à accepter des PNG en base64 fournis par un autre modèle
ou une autre source, même s’il ne peut pas vérifier leur cohérence interne.

Si le fichier est valide une fois écrit dans le repo, l’opération est considérée comme déterministe.

---

# 🧠 Principe directeur

Exactitude > Rapidité
Atomicité > Multiples commits
Vérifier si doute
Ne jamais agir à l’aveugle
Limiter les deltas
