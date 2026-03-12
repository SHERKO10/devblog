// routes/articles.js — Définit les URLs de l'API articles

const express           = require('express')
const router            = express.Router()
const articleController = require('../controllers/articleController')

// 💡 express.Router() = un mini-serveur Express pour organiser les routes

// GET  /api/articles          → liste des articles publiés
router.get('/',          articleController.getAll)

// GET  /api/articles/admin    → liste complète (admin)
// ⚠️  Cette route DOIT être avant /:slug pour ne pas être capturée par elle
router.get('/admin',     articleController.getAdmin)

// GET  /api/articles/:slug    → un article par son slug
router.get('/:slug',     articleController.getBySlug)

// POST /api/articles          → créer un article
router.post('/',         articleController.create)

// PUT  /api/articles/:id      → modifier un article
router.put('/:id',       articleController.update)

// DELETE /api/articles/:id    → supprimer un article
router.delete('/:id',    articleController.delete)

module.exports = router