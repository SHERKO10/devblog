// services/api.js — Toutes les fonctions d'appel à notre backend

import axios from 'axios'

// L'URL de base du backend
// process.env.NEXT_PUBLIC_API_URL → variable d'environnement (optionnel)
// || 'http://localhost:5000/api'  → valeur par défaut
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// On crée une instance axios configurée une fois pour toutes
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Abandonne après 10 secondes
})

// ---------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------

export const articleService = {

  // Récupère tous les articles publiés
  async getAll() {
    const response = await api.get('/articles')
    return response.data.data  // { success: true, data: [...] } → [...]
  },

  // Récupère tous les articles pour l'admin
  async getAdmin() {
    const response = await api.get('/articles/admin')
    return response.data.data
  },

  // Récupère un article par son slug
  async getBySlug(slug) {
    const response = await api.get(`/articles/${slug}`)
    return response.data.data
  },

  // Crée un article
  async create(articleData) {
    const response = await api.post('/articles', articleData)
    return response.data.data
  },

  // Modifie un article
  async update(id, articleData) {
    const response = await api.put(`/articles/${id}`, articleData)
    return response.data.data
  },

  // Supprime un article
  async delete(id) {
    const response = await api.delete(`/articles/${id}`)
    return response.data
  }
}

// ---------------------------------------------------------------
// CATÉGORIES
// ---------------------------------------------------------------

export const categoryService = {

  async getAll() {
    const response = await api.get('/categories')
    return response.data.data
  },

  async create(categoryData) {
    const response = await api.post('/categories', categoryData)
    return response.data.data
  }
}