// app/admin/page.jsx — Interface d'administration
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useArticles } from '../../hooks/useArticles'
import ArticleForm from '../../components/ArticleForm'

export default function AdminPage() {
  const { articles, categories, loading, error, createArticle, updateArticle, deleteArticle } = useArticles()

  // null = pas de formulaire ouvert
  // 'new' = formulaire de création
  // { ...article } = formulaire d'édition
  const [editingArticle, setEditingArticle] = useState(null)
  const [showForm,       setShowForm]       = useState(false)
  const [successMsg,     setSuccessMsg]     = useState(null)

  // Affiche un message de succès temporaire
  const showSuccess = (msg) => {
    setSuccessMsg(msg)
    setTimeout(() => setSuccessMsg(null), 3000)
  }

  // Soumet le formulaire (création ou édition)
  const handleSubmit = async (formData) => {
    if (editingArticle) {
      await updateArticle(editingArticle.id, formData)
      showSuccess('✅ Article mis à jour avec succès !')
    } else {
      await createArticle(formData)
      showSuccess('✅ Article créé avec succès !')
    }
    setShowForm(false)
    setEditingArticle(null)
  }

  // Ouvre le formulaire d'édition
  const handleEdit = (article) => {
    setEditingArticle(article)
    setShowForm(true)
    // Scroll vers le haut pour voir le formulaire
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Demande confirmation avant suppression
  const handleDelete = async (article) => {
    const confirmed = window.confirm(
      `Supprimer "${article.title}" ?\n\nCette action est irréversible.`
    )
    if (!confirmed) return

    await deleteArticle(article.id)
    showSuccess('🗑️ Article supprimé.')
  }

  // Annule le formulaire
  const handleCancel = () => {
    setShowForm(false)
    setEditingArticle(null)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">

      {/* En-tête */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">⚙️ Administration</h1>
          <p className="text-gray-400 mt-1">Gérer les articles du blog</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            ← Voir le blog
          </Link>
          {!showForm && (
            <button
              onClick={() => { setEditingArticle(null); setShowForm(true) }}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              + Nouvel article
            </button>
          )}
        </div>
      </div>

      {/* Message de succès */}
      {successMsg && (
        <div className="bg-green-900/30 border border-green-700 rounded-xl p-4 mb-6 text-green-400 font-medium">
          {successMsg}
        </div>
      )}

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-xl p-4 mb-6 text-red-400">
          ⚠️ {error}
        </div>
      )}

      {/* Formulaire création/édition */}
      {showForm && (
        <div className="mb-8">
          <ArticleForm
            article={editingArticle}
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}

      {/* Statistiques rapides */}
      {!loading && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-white">{articles.length}</p>
            <p className="text-gray-500 text-sm mt-1">Total articles</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-green-400">
              {articles.filter(a => a.published).length}
            </p>
            <p className="text-gray-500 text-sm mt-1">Publiés</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
            <p className="text-3xl font-bold text-yellow-400">
              {articles.filter(a => !a.published).length}
            </p>
            <p className="text-gray-500 text-sm mt-1">Brouillons</p>
          </div>
        </div>
      )}

      {/* Liste des articles */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-4xl mb-4 animate-pulse">⏳</p>
          <p>Chargement...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          <p className="text-5xl mb-4">📭</p>
          <p>Aucun article. Crée le premier !</p>
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-300 mb-4">
            📋 Tous les articles
          </h2>
          {articles.map(article => (
            <div
              key={article.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between gap-4 hover:border-gray-700 transition-colors"
            >
              {/* Infos article */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  {/* Badge publié/brouillon */}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    article.published
                      ? 'bg-green-900/50 text-green-400'
                      : 'bg-yellow-900/50 text-yellow-400'
                  }`}>
                    {article.published ? '🟢 Publié' : '🟡 Brouillon'}
                  </span>

                  {/* Badge catégorie */}
                  {article.category_name && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: article.category_color + '22',
                        color: article.category_color
                      }}
                    >
                      {article.category_name}
                    </span>
                  )}
                </div>

                {/* Titre */}
                <h3 className="text-white font-medium truncate">
                  {article.title}
                </h3>
                <p className="text-gray-500 text-xs mt-1">
                  {article.views} vue{article.views !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {/* Voir l'article (si publié) */}
                {article.published === 1 && (
                  <Link
                    href={`/blog/${article.slug}`}
                    target="_blank"
                    className="text-xs text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    👁️ Voir
                  </Link>
                )}

                {/* Modifier */}
                <button
                  onClick={() => handleEdit(article)}
                  className="text-xs text-blue-400 hover:text-white bg-blue-900/30 hover:bg-blue-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  ✏️ Modifier
                </button>

                {/* Supprimer */}
                <button
                  onClick={() => handleDelete(article)}
                  className="text-xs text-red-400 hover:text-white bg-red-900/30 hover:bg-red-600 px-3 py-1.5 rounded-lg transition-colors"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}