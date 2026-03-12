// BlogClient.jsx — Partie interactive de la page d'accueil
'use client'

import { useState, useMemo } from 'react'
import ArticleCard from './ArticleCard'

export default function BlogClient({ articles, categories }) {
  const [search,          setSearch]          = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)

  // useMemo → recalcule seulement quand articles, search ou selectedCategory change
  // Évite de refiltrer à chaque render inutile
  const filtered = useMemo(() => {
    return articles.filter(article => {

      // Filtre par recherche (titre + extrait)
      const matchSearch = search.trim() === '' ||
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(search.toLowerCase())

      // Filtre par catégorie
      const matchCategory = !selectedCategory ||
        article.category_slug === selectedCategory

      return matchSearch && matchCategory
    })
  }, [articles, search, selectedCategory])

  return (
    <div>

      {/* Barre de recherche + filtres */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">

        {/* Champ de recherche */}
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            🔍
          </span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher un article..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
          {/* Bouton effacer la recherche */}
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>

        {/* Filtres catégories */}
        <div className="flex flex-wrap gap-2">
          {/* Bouton "Tous" */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              !selectedCategory
                ? 'bg-blue-600 text-white'
                : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            Tous
          </button>

          {/* Un bouton par catégorie */}
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(
                selectedCategory === cat.slug ? null : cat.slug
              )}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedCategory === cat.slug
                  ? 'text-white border'
                  : 'bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'
              }`}
              style={selectedCategory === cat.slug ? {
                backgroundColor: cat.color + '33',
                borderColor:     cat.color,
                color:           cat.color,
              } : {}}
            >
              {cat.name}
              {/* Compteur d'articles par catégorie */}
              <span className="ml-2 text-xs opacity-60">
                {cat.article_count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Résultats */}
      {filtered.length > 0 ? (
        <>
          {/* Nombre de résultats */}
          {(search || selectedCategory) && (
            <p className="text-gray-500 text-sm mb-6">
              {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
              {search && <span> pour "<span className="text-white">{search}</span>"</span>}
              {selectedCategory && (
                <span> dans{' '}
                  <span className="text-white">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                  </span>
                </span>
              )}
            </p>
          )}

          {/* Grille des articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </>
      ) : (
        /* Aucun résultat */
        <div className="text-center py-20 text-gray-600">
          <p className="text-5xl mb-4">🔍</p>
          <p className="text-lg text-gray-400">Aucun article trouvé</p>
          {search && (
            <p className="text-sm mt-2">
              Essaie avec d'autres mots-clés ou{' '}
              <button
                onClick={() => setSearch('')}
                className="text-blue-400 hover:underline"
              >
                efface la recherche
              </button>
            </p>
          )}
        </div>
      )}
    </div>
  )
}