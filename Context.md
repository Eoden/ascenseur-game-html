# Contexte Global du Projet

Ce dépôt contient plusieurs mini-jeux et une architecture expérimentale d’orchestration entre un agent Git autonome et une interface web.

## 🎮 Jeux présents dans le projet
- Mini-jeu Zelda-like (canvas, sprites, ennemis, donjon, énigmes)
- Systèmes de déplacements mobiles
- Gestion d’écrans multiples
- Tests d’animations et systèmes d'assets

## 🤖 Fonctionnement technique du projet
L’agent Git autonome est responsable de :
- lire les fichiers existants (full-text ou tree)
- appliquer des opérations atomiques via `/command`
- commiter et pousser automatiquement sur `main`

Chaque opération doit être déterministe, traçable et isolée.

## 🧱 Architecture clé
- `/zelda/` → contient le jeu Zelda-like (sprites, JS, assets)
- `index.html`, `style.css`, `script.js` → noyau de l’interface
- Système de sprites → actuellement en évolution, amélioration visuelle nécessaire
- Endpoints back-end → exposés par l'agent pour lecture/écriture Git

## 🎨 Sprites
Deux types d’entités :
- **Hero** : animations de marche, combat, idle
- **Slime ennemi** : animation idle + attaque future

Les sprites actuels sont des placeholders et doivent être remplacés par des versions plus détaillées.

## 🚀 Objectif du projet
- Explorer la capacité d’un agent autonome à gérer un dépôt complet
- Générer et mettre à jour du code front-end et des assets automatiquement
- Développer un petit jeu complet entièrement piloté par IA

## 📌 Règles essentielles pour modifications futures
- Toujours lire avant d’écrire
- Ne jamais inventer un fichier non confirmé
- Utiliser commit atomiques
- Proposer les changements AVANT de les pousser
- Après validation → exécuter `/command`
