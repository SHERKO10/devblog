// app/blog/[slug]/page.jsx — Page de lecture d'un article
// Server Component : fetch les données côté serveur

import Link from 'next/link'
import { notFound } from 'next/navigation'
import MarkdownRenderer from '../../../components/MarkdownRenderer'
import { articleService } from '../../../services/api'
import ShareButton from '../../../components/ShareButton'

// Formate une date en français
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  })
}

// generateMetadata → Next.js appelle cette fonction pour générer
// les balises <title> et <meta> dynamiquement selon l'article
export async function generateMetadata({ params }) {
    
  const { slug } = await params
  try {
    const article = await articleService.getBySlug(params.slug)
    if (!article) return { title: 'Article introuvable' }

    return {
      title:       `${article.title} — DevBlog`,
      description: article.excerpt,
    }
  } catch {
    return { title: 'DevBlog' }
  }
}

// Le composant principal de la page
export default async function ArticlePage({ params }) {
  // params.slug contient la valeur de l'URL
  // Ex: /blog/les-bases-de-react → params.slug = "les-bases-de-react"
  const { slug } = await params

  let article = null
  
  try {
    article = await articleService.getBySlug(slug)
  } catch (error) {
    console.error('Erreur chargement article:', error)
  }

  // Si l'article n'existe pas → page 404 automatique de Next.js
  if (!article) {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">

      {/* Bouton retour */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Retour aux articles
      </Link>

      {/* En-tête de l'article */}
      <header className="mb-10">

        {/* Badge catégorie */}
        {article.category_name && (
          <span
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
            style={{
              backgroundColor: article.category_color + '22',
              color:           article.category_color,
            }}
          >
            {article.category_name}
          </span>
        )}

        {/* Titre principal */}
        <h1 className="text-4xl font-extrabold text-white leading-tight mb-4">
          {article.title}
        </h1>

        {/* Extrait / sous-titre */}
        <p className="text-xl text-gray-400 leading-relaxed mb-6">
          {article.excerpt}
        </p>

        {/* Métadonnées : date + vues */}
        <div className="flex items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-800">
          <span>📅 {formatDate(article.created_at)}</span>
          <span>👁️ {article.views} vue{article.views !== 1 ? 's' : ''}</span>

          {/* Dernière mise à jour si différente de la création */}
          {article.updated_at !== article.created_at && (
            <span>✏️ Mis à jour le {formatDate(article.updated_at)}</span>
          )}
        </div>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {article.tags.map(tag => (
              <span
                key={tag.id}
                className="text-xs bg-gray-800 text-gray-400 px-3 py-1 rounded-full border border-gray-700"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Contenu Markdown de l'article */}
      <article>
        <MarkdownRenderer content={article.content} />
      </article>

      {/* Footer de l'article */}
      <footer className="mt-16 pt-8 border-t border-gray-800">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Tous les articles
          </Link>

          {/* Bouton partage (copie l'URL) */}
          <ShareButton title={article.title} />
        </div>
      </footer>

    </div>
  )
}

