// server.js

const express = require('express')
const cors    = require('cors')
require('dotenv').config()

// 🆕 On importe la DB — ça déclenche l'initialisation au démarrage
const db = require('./database/init')

const app = express()

app.use(cors({ origin: 'http://localhost:3000' }))
app.use(express.json())

// Route de test
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'DevBlog API fonctionne correctement 🚀' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`)
})