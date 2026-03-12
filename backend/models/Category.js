// Category.js — Opérations sur la table "categories"

const db = require('../database/init')

const Category = {

  findAll() {
    return db.prepare(`
      SELECT
        c.*,
        COUNT(a.id) AS article_count
      FROM categories c
      LEFT JOIN articles a
        ON a.category_id = c.id AND a.published = 1
      GROUP BY c.id
      ORDER BY c.name ASC
    `).all()
  },

  findBySlug(slug) {
    return db.prepare(
      'SELECT * FROM categories WHERE slug = ?'
    ).get(slug)
  },

  create({ name, slug, color }) {
    return db.prepare(
      'INSERT INTO categories (name, slug, color) VALUES (?, ?, ?)'
    ).run(name, slug, color)
  }
}

module.exports = Category