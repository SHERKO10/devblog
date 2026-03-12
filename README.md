# <DevBlog /> — Plateforme de blog fullstack

Un blog technique moderne construit avec **Next.js**, **Node.js** et **SQLite**.
Projet d'apprentissage fullstack : API REST, React, routing, gestion d'état.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![SQLite](https://img.shields.io/badge/SQLite-3-lightblue?logo=sqlite)

---

## ✨ Fonctionnalités

- 📝 Création et édition d'articles en **Markdown** avec prévisualisation
- 🗂️ Catégories et tags pour organiser les articles
- 🔍 Recherche en temps réel et filtres par catégorie
- 👁️ Compteur de vues par article
- 🌙 Interface sombre moderne (dark mode)
- 📱 Responsive mobile
- ⚙️ Interface d'administration complète

---

## 🛠️ Technologies

| Couche     | Technologie              |
|------------|--------------------------|
| Frontend   | Next.js 15, React 19     |
| Styles     | Tailwind CSS             |
| Backend    | Node.js, Express         |
| Base de données | SQLite (better-sqlite3) |
| HTTP Client | Fetch API natif         |

---

## 🚀 Lancer le projet en local

### Prérequis
- Node.js v18+
- Git

### Installation
```bash
# 1. Clone le projet
git clone https://github.com/TON_USERNAME/devblog.git
cd devblog

# 2. Installe et lance le backend
cd backend
npm install
npm run dev
# → http://localhost:5000

# 3. Dans un nouveau terminal, installe et lance le frontend
cd frontend
npm install
npm run dev
# → http://localhost:3000
```

### URLs

| URL | Description |
|-----|-------------|
| http://localhost:3000 | Page d'accueil du blog |
| http://localhost:3000/admin | Interface d'administration |
| http://localhost:5000/api/articles | API articles |
| http://localhost:5000/api/categories | API catégories |

---

## 📁 Structure du projet
```
devblog/
├── backend/
│   ├── controllers/    # Logique métier
│   ├── database/       # SQLite + initialisation
│   ├── models/         # Requêtes SQL
│   ├── routes/         # Endpoints API
│   └── server.js       # Point d'entrée
└── frontend/
    ├── app/            # Pages Next.js (App Router)
    ├── components/     # Composants React
    ├── hooks/          # Hooks personnalisés
    └── services/       # Appels API
```

---

## 📚 Ce que j'ai appris

- Architecture **fullstack** séparée frontend/backend
- Création d'une **API REST** avec Express
- **Routing dynamique** Next.js (App Router)
- Différence **Server Components** vs **Client Components**
- Gestion d'état React avec **useState** et **useEffect**
- Hooks personnalisés React
- Base de données **SQLite** avec requêtes SQL
- Rendu **Markdown** côté client
- Bonnes pratiques Git (**Conventional Commits**)

---

## 🗺️ Améliorations futures

- [ ] Authentification (JWT)
- [ ] Recherche full-text SQLite
- [ ] Mode clair / sombre
- [ ] Déploiement (Vercel + Railway)
- [ ] Flux RSS

---

*Projet réalisé pour apprendre le développement fullstack avec Node.js et Next.js.*