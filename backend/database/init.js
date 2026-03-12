// init.js — Crée et configure la base de données SQLite

const Database = require('better-sqlite3')
const path = require('path')

// Le fichier de la DB sera créé ici : backend/database/devblog.sqlite
const DB_PATH = path.join(__dirname, 'devblog.sqlite')

// Ouvre (ou crée) la base de données
const db = new Database(DB_PATH)

// Active le mode WAL : améliore les performances en lecture/écriture
db.pragma('journal_mode = WAL')

// ---------------------------------------------------------------
// CRÉATION DES TABLES
// "CREATE TABLE IF NOT EXISTS" = crée seulement si elle n'existe pas
// → On peut relancer ce fichier sans tout effacer !
// ---------------------------------------------------------------

db.exec(`

  -- Table des catégories
  CREATE TABLE IF NOT EXISTS categories (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL UNIQUE,
    slug       TEXT    NOT NULL UNIQUE,
    color      TEXT    NOT NULL DEFAULT '#3B82F6',
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  -- Table des articles
  CREATE TABLE IF NOT EXISTS articles (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    slug        TEXT    NOT NULL UNIQUE,
    content     TEXT    NOT NULL DEFAULT '',
    excerpt     TEXT    NOT NULL DEFAULT '',
    category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
    published   INTEGER NOT NULL DEFAULT 0,
    views       INTEGER NOT NULL DEFAULT 0,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  );

  -- Table des tags
  CREATE TABLE IF NOT EXISTS tags (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL UNIQUE,
    slug       TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- Table de liaison articles <-> tags (relation N-N)
  CREATE TABLE IF NOT EXISTS article_tags (
    article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    tag_id     INTEGER NOT NULL REFERENCES tags(id)     ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
  );

`)

// ---------------------------------------------------------------
// DONNÉES DE DÉMONSTRATION
// On insère des données seulement si la table est vide
// ---------------------------------------------------------------

const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get()

if (categoryCount.count === 0) {
  console.log('📦 Insertion des données de démonstration...')

  // Insère les catégories
  const insertCategory = db.prepare(
    'INSERT INTO categories (name, slug, color) VALUES (?, ?, ?)'
  )

  insertCategory.run('JavaScript', 'javascript', '#F7DF1E')
  insertCategory.run('React',      'react',      '#61DAFB')
  insertCategory.run('Node.js',    'nodejs',     '#339933')
  insertCategory.run('CSS',        'css',        '#1572B6')
  insertCategory.run('Tutoriels',  'tutoriels',  '#8B5CF6')

  // Insère les tags
  const insertTag = db.prepare(
    'INSERT INTO tags (name, slug) VALUES (?, ?)'
  )
  insertTag.run('débutant',    'debutant')
  insertTag.run('avancé',      'avance')
  insertTag.run('best-practice','best-practice')
  insertTag.run('performance', 'performance')

  // Insère des articles de démonstration
  const insertArticle = db.prepare(`
    INSERT INTO articles (title, slug, content, excerpt, category_id, published)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const r1 = insertArticle.run(
    'Bienvenue sur DevBlog',
    'bienvenue-sur-devblog',
    `# Bienvenue sur DevBlog 🎉

Ceci est mon premier article sur **DevBlog**, une plateforme construite avec Node.js, React et Next.js.

## Pourquoi ce blog ?

J'ai créé ce blog pour documenter mon apprentissage du développement web fullstack.

## Ce que tu trouveras ici

- Des tutoriels sur JavaScript et ses frameworks
- Des articles sur les bonnes pratiques
- Des retours d'expérience sur mes projets

Bonne lecture !`,
    'Bienvenue sur DevBlog, une plateforme construite avec Node.js et Next.js.',
    5, // category_id = Tutoriels
    1  // published = true
  )

  const r2 = insertArticle.run(
    'Les bases de React expliquées simplement',
    'les-bases-de-react',
    `# Les bases de React expliquées simplement

React est une bibliothèque JavaScript pour construire des interfaces utilisateur.

## Les composants

Un composant React est comme une **brique LEGO** : une pièce réutilisable de ton interface.

\`\`\`jsx
function Bouton({ label }) {
  return <button>{label}</button>
}
\`\`\`

## Le State (état)

Le state permet à un composant de **mémoriser des informations** et de se re-afficher quand elles changent.

\`\`\`jsx
const [count, setCount] = useState(0)
\`\`\`

C'est tout pour aujourd'hui !`,
    'Découvre les concepts fondamentaux de React : composants, props et state.',
    2, // category_id = React
    1  // published = true
  )

  // Lie les articles à des tags
  const linkTag = db.prepare(
    'INSERT INTO article_tags (article_id, tag_id) VALUES (?, ?)'
  )
  linkTag.run(r1.lastInsertRowid, 1) // article 1 → tag "débutant"
  linkTag.run(r2.lastInsertRowid, 1) // article 2 → tag "débutant"
  linkTag.run(r2.lastInsertRowid, 3) // article 2 → tag "best-practice"

  console.log('✅ Données de démonstration insérées !')
}

console.log('✅ Base de données prête :', DB_PATH)

// On exporte db pour l'utiliser dans les autres fichiers
module.exports = db