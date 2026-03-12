// server.js — Version finale avec toutes les routes

const express = require('express')
const cors    = require('cors')
require('dotenv').config()

// Initialisation de la DB au démarrage
const db = require('./database/init')

// Import des routes
const articleRoutes  = require('./routes/articles')
const categoryRoutes = require('./routes/categories')

const app = express()

// --- MIDDLEWARES ---
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

// --- ROUTES ---
// Toutes les routes /api/articles/* → fichier routes/articles.js
app.use('/api/articles',   articleRoutes)
// Toutes les routes /api/categories/* → fichier routes/categories.js
app.use('/api/categories', categoryRoutes)

// Route de santé
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DevBlog API fonctionne 🚀' })
})

// --- GESTION DES ROUTES INCONNUES ---
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route inconnue : ${req.url}` })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`)
})