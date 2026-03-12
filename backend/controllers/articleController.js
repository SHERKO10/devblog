// articleController.js — Logique métier pour les articles

const slugify = require('slugify')
const Article  = require('../models/Article')
const Category = require('../models/Category')

// Fonction utilitaire pour générer un slug propre
// Ex: "Mon Article !" → "mon-article"
function makeSlug(title) {
  return slugify(title, {
    lower:     true,   // tout en minuscules
    strict:    true,   // supprime les caractères spéciaux
    locale:    'fr'    // gère les accents français
  })
}

const articleController = {

  // GET /api/articles
  // Retourne tous les articles publiés
  getAll(req, res) {
    try {
      const articles = Article.findAllPublished()
      res.json({ success: true, data: articles })
    } catch (error) {
      console.error('Erreur getAll articles:', error)
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  },

  // GET /api/articles/admin
  // Retourne TOUS les articles (publiés + brouillons) pour l'admin
  getAdmin(req, res) {
    try {
      const articles = Article.findAll()
      res.json({ success: true, data: articles })
    } catch (error) {
      console.error('Erreur getAdmin articles:', error)
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  },

  // GET /api/articles/:slug
  // Retourne un article par son slug + incrémente les vues
  getBySlug(req, res) {
    try {
      const article = Article.findBySlug(req.params.slug)

      // Si l'article n'existe pas → erreur 404
      if (!article) {
        return res.status(404).json({
          success: false,
          message: 'Article introuvable'
        })
      }

      // Incrémente les vues (seulement si publié)
      if (article.published) {
        Article.incrementViews(article.id)
        article.views += 1
      }

      res.json({ success: true, data: article })
    } catch (error) {
      console.error('Erreur getBySlug:', error)
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  },

  // POST /api/articles
  // Crée un nouvel article
  create(req, res) {
    try {
      const { title, content, excerpt, category_id, published } = req.body

      // --- Validation ---
      if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Le titre est obligatoire'
        })
      }
      if (!content || content.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Le contenu est obligatoire'
        })
      }

      // Génère le slug depuis le titre
      let slug = makeSlug(title)

      // Si le slug existe déjà, on ajoute un timestamp pour le rendre unique
      // Ex: "mon-article" → "mon-article-1709123456789"
      if (Article.slugExists(slug)) {
        slug = `${slug}-${Date.now()}`
      }

      // Génère un extrait automatique si non fourni
      // Prend les 160 premiers caractères du contenu (sans le markdown)
      const autoExcerpt = excerpt?.trim() ||
        content.replace(/[#*`>\-_]/g, '').substring(0, 160).trim() + '...'

      const result = Article.create({
        title:       title.trim(),
        slug,
        content:     content.trim(),
        excerpt:     autoExcerpt,
        category_id: category_id || null,
        published:   published ? 1 : 0
      })

      // Récupère l'article complet pour le retourner
      const newArticle = Article.findBySlug(slug)

      res.status(201).json({ success: true, data: newArticle })
    } catch (error) {
      console.error('Erreur create article:', error)
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  },

  // PUT /api/articles/:id
  // Modifie un article existant
  update(req, res) {
    try {
      const id = parseInt(req.params.id)
      const { title, content, excerpt, category_id, published } = req.body

      // Validation
      if (!title?.trim() || !content?.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Titre et contenu sont obligatoires'
        })
      }

      // Génère un nouveau slug si le titre a changé
      let slug = makeSlug(title)
      if (Article.slugExists(slug, id)) {
        slug = `${slug}-${Date.now()}`
      }

      const autoExcerpt = excerpt?.trim() ||
        content.replace(/[#*`>\-_]/g, '').substring(0, 160).trim() + '...'

      Article.update(id, {
        title:       title.trim(),
        slug,
        content:     content.trim(),
        excerpt:     autoExcerpt,
        category_id: category_id || null,
        published:   published ? 1 : 0
      })

      const updated = Article.findBySlug(slug)

      res.json({ success: true, data: updated })
    } catch (error) {
      console.error('Erreur update article:', error)
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  },

  // DELETE /api/articles/:id
  // Supprime un article
  delete(req, res) {
    try {
      const id = parseInt(req.params.id)
      const result = Article.delete(id)

      if (result.changes === 0) {
        return res.status(404).json({
          success: false,
          message: 'Article introuvable'
        })
      }

      res.json({ success: true, message: 'Article supprimé avec succès' })
    } catch (error) {
      console.error('Erreur delete article:', error)
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  }
}

module.exports = articleController