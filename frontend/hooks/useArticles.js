// useArticles.js — Hook personnalisé pour gérer les articles côté admin
'use client'

import { useState, useEffect, useCallback } from 'react'
import { articleService, categoryService } from '../services/api'

export function useArticles() {
  const [articles,   setArticles]   = useState([])
  const [categories, setCategories] = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState(null)

  // Charge tous les articles et catégories
  // useCallback évite de recréer la fonction à chaque render
  const loadData = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      // Lance les deux appels en parallèle (plus rapide)
      const [articlesData, categoriesData] = await Promise.all([
        articleService.getAdmin(),
        categoryService.getAll(),
      ])

      setArticles(articlesData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Impossible de charger les données. Backend démarré ?')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Charge les données au montage du composant
  useEffect(() => {
    loadData()
  }, [loadData])

  // Crée un article et recharge la liste
  const createArticle = async (data) => {
    const newArticle = await articleService.create(data)
    await loadData()
    return newArticle
  }

  // Met à jour un article et recharge la liste
  const updateArticle = async (id, data) => {
    const updated = await articleService.update(id, data)
    await loadData()
    return updated
  }

  // Supprime un article et recharge la liste
  const deleteArticle = async (id) => {
    await articleService.delete(id)
    await loadData()
  }

  return {
    articles,
    categories,
    loading,
    error,
    createArticle,
    updateArticle,
    deleteArticle,
    reload: loadData,
  }
}