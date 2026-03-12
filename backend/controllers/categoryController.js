// categoryController.js

const slugify  = require('slugify')
const Category = require('../models/Category')

const categoryController = {

  // GET /api/categories
  getAll(req, res) {
    try {
      const categories = Category.findAll()
      res.json({ success: true, data: categories })
    } catch (error) {
      console.error('Erreur getAll categories:', error)
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  },

  // POST /api/categories
  create(req, res) {
    try {
      const { name, color } = req.body

      if (!name?.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Le nom est obligatoire'
        })
      }

      const slug = slugify(name, { lower: true, strict: true, locale: 'fr' })

      const result = Category.create({
        name:  name.trim(),
        slug,
        color: color || '#3B82F6'
      })

      res.status(201).json({
        success: true,
        data: { id: result.lastInsertRowid, name, slug, color }
      })
    } catch (error) {
      // Erreur si le nom existe déjà (contrainte UNIQUE)
      if (error.message.includes('UNIQUE')) {
        return res.status(409).json({
          success: false,
          message: 'Cette catégorie existe déjà'
        })
      }
      res.status(500).json({ success: false, message: 'Erreur serveur' })
    }
  }
}

module.exports = categoryController