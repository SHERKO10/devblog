// ArticleCard.jsx — Carte d'aperçu d'un article
// Pas de "use client" → c'est un Server Component (juste de l'affichage)

import Link from 'next/link'

// Formate une date ISO en français
// Ex: "2024-03-01T10:00:00" → "1 mars 2024"
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year:  'numeric',
    month: 'long',
    day:   'numeric'
  })
}

export default function ArticleCard({ article }) {
  return (
    <article className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 group">

      {/* Catégorie */}
      {article.category_name && (
        <span
          className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
          style={{
            backgroundColor: article.category_color + '22', // couleur avec opacité
            color: article.category_color
          }}
        >
          {article.category_name}
        </span>
      )}

      {/* Titre */}
      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
        <Link href={`/blog/${article.slug}`}>
          {article.title}
        </Link>
      </h2>

      {/* Extrait */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
        {article.excerpt}
      </p>

      {/* Footer de la carte */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{formatDate(article.created_at)}</span>
        <span>{article.views} vue{article.views !== 1 ? 's' : ''}</span>
      </div>

      {/* Lien "Lire la suite" */}
      <Link
        href={`/blog/${article.slug}`}
        className="mt-4 inline-block text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
      >

      </Link>

    </article>
  )
}