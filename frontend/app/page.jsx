// app/page.jsx — Page d'accueil (Server Component)

import BlogClient from '../components/BlogClient'
import { articleService, categoryService } from '../services/api'

export const metadata = {
  title:       'DevBlog — Accueil',
  description: 'Articles techniques sur le développement web fullstack',
}

export default async function HomePage() {
  let articles   = []
  let categories = []
  let error      = null

  try {
    // Charge articles ET catégories en parallèle
    ;[articles, categories] = await Promise.all([
      articleService.getAll(),
      categoryService.getAll(),
    ])
  } catch (err) {
    console.error('Erreur chargement:', err)
    error = 'Impossible de charger les articles. Le backend est-il démarré ?'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          {'<DevBlog />'}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Articles techniques sur le développement web fullstack —
          Node.js, React, Next.js et bien plus.
        </p>
      </div>

      {/* Erreur backend */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 mb-8 text-center">
          <p className="text-red-400 font-medium">⚠️ {error}</p>
          <p className="text-red-500 text-sm mt-1">
            Vérifie que le backend tourne sur http://localhost:5000
          </p>
        </div>
      )}

      {/* Titre section */}
      {articles.length > 0 && (
        <h2 className="text-2xl font-bold text-white mb-8">
          📝 Derniers articles
          <span className="ml-3 text-sm font-normal text-gray-500">
            ({articles.length} article{articles.length > 1 ? 's' : ''})
          </span>
        </h2>
      )}

      {/* Partie interactive : recherche + filtres + grille */}
      {!error && (
        <BlogClient articles={articles} categories={categories} />
      )}

      {/* Aucun article du tout */}
      {!error && articles.length === 0 && (
        <div className="text-center py-20 text-gray-600">
          <p className="text-6xl mb-4">📭</p>
          <p className="text-xl">Aucun article publié pour l'instant.</p>
          <p className="text-sm mt-2">
            Va dans{' '}
            <a href="/admin" className="text-blue-400 hover:underline">
              l'interface admin
            </a>{' '}
            pour créer ton premier article !
          </p>
        </div>
      )}

    </div>
  )
}