// ArticleForm.jsx — Formulaire création/édition d'article
'use client'

import { useState, useEffect } from 'react'
import MarkdownRenderer from './MarkdownRenderer'

// Valeurs par défaut d'un article vide
const EMPTY_FORM = {
  title:       '',
  content:     '',
  excerpt:     '',
  category_id: '',
  published:   false,
}

export default function ArticleForm({ article, categories, onSubmit, onCancel }) {
  // Si "article" est fourni → mode édition, sinon → mode création
  const isEditing = !!article

  const [form,    setForm]    = useState(EMPTY_FORM)
  const [preview, setPreview] = useState(false) // bascule éditeur/prévisualisation
  const [saving,  setSaving]  = useState(false)
  const [error,   setError]   = useState(null)

  // Quand on édite, on remplit le formulaire avec les données existantes
  useEffect(() => {
    if (article) {
      setForm({
        title:       article.title       || '',
        content:     article.content     || '',
        excerpt:     article.excerpt     || '',
        category_id: article.category_id || '',
        published:   article.published   === 1,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [article])

  // Met à jour un champ du formulaire
  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // Soumet le formulaire
  const handleSubmit = async () => {
    if (!form.title.trim())   return setError('Le titre est obligatoire')
    if (!form.content.trim()) return setError('Le contenu est obligatoire')

    try {
      setSaving(true)
      setError(null)
      await onSubmit({
        ...form,
        category_id: form.category_id || null,
        published:   form.published ? 1 : 0,
      })
    } catch (err) {
      setError(err.message || 'Une erreur est survenue')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">

      {/* En-tête du formulaire */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          {isEditing ? '✏️ Modifier l\'article' : '📝 Nouvel article'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          ✕ Annuler
        </button>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="bg-red-900/30 border border-red-700 rounded-lg p-3 mb-4 text-red-400 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Champ Titre */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Titre *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={e => handleChange('title', e.target.value)}
          placeholder="Mon super article..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Champ Catégorie */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Catégorie
        </label>
        <select
          value={form.category_id}
          onChange={e => handleChange('category_id', e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
        >
          <option value="">— Sans catégorie —</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Champ Contenu avec onglets Éditeur/Prévisualisation */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="text-sm font-medium text-gray-400">
            Contenu * (Markdown)
          </label>
          {/* Bascule Éditeur / Prévisualisation */}
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setPreview(false)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                !preview
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ✏️ Éditeur
            </button>
            <button
              onClick={() => setPreview(true)}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                preview
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              👁️ Aperçu
            </button>
          </div>
        </div>

        {/* Éditeur Markdown */}
        {!preview ? (
          <textarea
            value={form.content}
            onChange={e => handleChange('content', e.target.value)}
            placeholder={`# Titre de l'article\n\nÉcris ton contenu en Markdown...\n\n## Section\n\nDu texte avec **gras** et \`code\`.`}
            rows={16}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors font-mono text-sm resize-y"
          />
        ) : (
          /* Prévisualisation Markdown */
          <div className="min-h-64 bg-gray-800 border border-gray-700 rounded-lg px-6 py-4">
            {form.content
              ? <MarkdownRenderer content={form.content} />
              : <p className="text-gray-500 italic">Rien à prévisualiser...</p>
            }
          </div>
        )}
      </div>

      {/* Champ Extrait */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Extrait
          <span className="ml-2 text-gray-600 font-normal">
            (généré automatiquement si vide)
          </span>
        </label>
        <textarea
          value={form.excerpt}
          onChange={e => handleChange('excerpt', e.target.value)}
          placeholder="Courte description de l'article (160 caractères max)..."
          rows={2}
          maxLength={200}
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm resize-none"
        />
      </div>

      {/* Footer : Publié + Bouton soumettre */}
      <div className="flex items-center justify-between">

        {/* Toggle Publié / Brouillon */}
        <label className="flex items-center gap-3 cursor-pointer">
          <div
            onClick={() => handleChange('published', !form.published)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              form.published ? 'bg-green-500' : 'bg-gray-600'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
              form.published ? 'translate-x-7' : 'translate-x-1'
            }`} />
          </div>
          <span className="text-sm text-gray-400">
            {form.published ? '🟢 Publié' : '🟡 Brouillon'}
          </span>
        </label>

        {/* Bouton soumettre */}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          {saving
            ? '⏳ Enregistrement...'
            : isEditing ? '✅ Mettre à jour' : '🚀 Publier'
          }
        </button>
      </div>
    </div>
  )
}