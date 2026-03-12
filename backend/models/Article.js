// Article.js — Toutes les opérations sur la table "articles"

const db = require('../database/init')

const Article = {

  // --- LIRE ---

  // Récupère tous les articles publiés (pour la page d'accueil)
  findAllPublished() {
    return db.prepare(`
      SELECT
        a.id, a.title, a.slug, a.excerpt,
        a.views, a.created_at,
        c.name  AS category_name,
        c.slug  AS category_slug,
        c.color AS category_color
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.published = 1
      ORDER BY a.created_at DESC
    `).all()  -- .all() retourne un tableau de résultats
  },

  // Récupère TOUS les articles (pour l'interface admin)
  findAll() {
    return db.prepare(`
      SELECT
        a.id, a.title, a.slug, a.excerpt,
        a.published, a.views, a.created_at,
        c.name AS category_name,
        c.color AS category_color
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      ORDER BY a.created_at DESC
    `).all()
  },

  // Récupère un article par son slug (ex: "les-bases-de-react")
  findBySlug(slug) {
    const article = db.prepare(`
      SELECT
        a.*,
        c.name  AS category_name,
        c.slug  AS category_slug,
        c.color AS category_color
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.slug = ?
    `).get(slug)  -- .get() retourne un seul résultat (ou undefined)

    if (!article) return null

    // Récupère aussi les tags de cet article
    article.tags = db.prepare(`
      SELECT t.id, t.name, t.slug
      FROM tags t
      JOIN article_tags at ON t.id = at.tag_id
      WHERE at.article_id = ?
    `).all(article.id)

    return article
  },

  // Incrémente le compteur de vues
  incrementViews(id) {
    return db.prepare(
      'UPDATE articles SET views = views + 1 WHERE id = ?'
    ).run(id)
  },

  // --- CRÉER ---

  create({ title, slug, content, excerpt, category_id, published = 0 }) {
    return db.prepare(`
      INSERT INTO articles (title, slug, content, excerpt, category_id, published)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(title, slug, content, excerpt, category_id, published)
    // .run() retourne { lastInsertRowid, changes }
  },

  // --- MODIFIER ---

  update(id, { title, slug, content, excerpt, category_id, published }) {
    return db.prepare(`
      UPDATE articles
      SET title       = ?,
          slug        = ?,
          content     = ?,
          excerpt     = ?,
          category_id = ?,
          published   = ?,
          updated_at  = datetime('now')
      WHERE id = ?
    `).run(title, slug, content, excerpt, category_id, published, id)
  },

  // --- SUPPRIMER ---

  delete(id) {
    return db.prepare('DELETE FROM articles WHERE id = ?').run(id)
  },

  // --- UTILITAIRE ---

  // Vérifie si un slug est déjà utilisé (pour éviter les doublons)
  slugExists(slug, excludeId = null) {
    if (excludeId) {
      return db.prepare(
        'SELECT id FROM articles WHERE slug = ? AND id != ?'
      ).get(slug, excludeId)
    }
    return db.prepare(
      'SELECT id FROM articles WHERE slug = ?'
    ).get(slug)
  }
}

module.exports = Article