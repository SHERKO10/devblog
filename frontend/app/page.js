// app/page.jsx — Page d'accueil du blog
// Server Component : fetch les données côté serveur (meilleur pour le SEO)

import ArticleCard from '../components/ArticleCard'
import { articleService } from '../services/api'

// Métadonnées SEO spécifiques à cette page
export const metadata = {
  title:       'DevBlog — Accueil',
  description: 'Tous les articles du blog technique DevBlog',
}

// Cette fonction s'exécute côté SERVEUR à chaque requête
// Elle fetch les articles depuis notre API backend
export default async function HomePage() {

  let articles = []
  let error    = null

  try {
    articles = await articleService.getAll()
  } catch (err) {
    console.error('Erreur chargement articles:', err)
    error = 'Impossible de charger les articles. Le backend est-il démarré ?'
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* Hero / En-tête */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-white mb-4">
          {'<DevBlog />'}
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Articles techniques sur le développement web fullstack —
          Node.js, React, Next.js et bien plus.
        </p>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-6 mb-8 text-center">
          <p className="text-red-400 font-medium">⚠️ {error}</p>
          <p className="text-red-500 text-sm mt-1">
            Vérifie que le backend tourne sur http://localhost:5000
          </p>
        </div>
      )}

      {/* Grille des articles */}
      {articles.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold text-white mb-8">
            📝 Derniers articles
            <span className="ml-3 text-sm font-normal text-gray-500">
              ({articles.length} article{articles.length > 1 ? 's' : ''})
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      ) : (
        // Aucun article
        !error && (
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
        )
      )}

    </div>
  )
}
