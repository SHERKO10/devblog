// server.js — Point d'entrée de notre application backend

// On importe les bibliothèques installées
const express = require('express')  // Le framework web
const cors = require('cors')        // Pour autoriser les requêtes cross-origin
require('dotenv').config()          // Pour lire le fichier .env

// On crée l'application Express
const app = express()

// --- MIDDLEWARES ---
// Un middleware = une fonction qui s'exécute sur chaque requête

// Autorise le frontend (port 3000) à appeler notre API (port 5000)
app.use(cors({
  origin: 'http://localhost:3000'
}))

// Permet à Express de lire le JSON dans les requêtes (ex: body d'un POST)
app.use(express.json())

// --- ROUTES ---
// On définira nos routes API ici (articles, catégories, etc.)
// On les ajoutera au fur et à mesure

// Route de test pour vérifier que le serveur fonctionne
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'DevBlog API fonctionne correctement 🚀' 
  })
})

// --- DÉMARRAGE DU SERVEUR ---
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`)
})