// services/api.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Fonction utilitaire fetch avec gestion d'erreur
async function fetchAPI(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    cache: 'no-store', // Toujours fetch les données fraîches
  })
  if (!response.ok) throw new Error(`Erreur API : ${response.status}`)
  const data = await response.json()
  return data.data
}

async function postAPI(endpoint, body, method = 'POST') {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!response.ok) throw new Error(`Erreur API : ${response.status}`)
  const data = await response.json()
  return data.data
}

// ---------------------------------------------------------------
// ARTICLES
// ---------------------------------------------------------------
export const articleService = {
  getAll:        ()         => fetchAPI('/articles'),
  getAdmin:      ()         => fetchAPI('/articles/admin'),
  getBySlug:     (slug)     => fetchAPI(`/articles/${slug}`),
  create:        (data)     => postAPI('/articles', data),
  update:        (id, data) => postAPI(`/articles/${id}`, data, 'PUT'),

  async delete(id) {
    const response = await fetch(`${BASE_URL}/articles/${id}`, { method: 'DELETE' })
    if (!response.ok) throw new Error(`Erreur API : ${response.status}`)
    return response.json()
  }
}

// ---------------------------------------------------------------
// CATÉGORIES
// ---------------------------------------------------------------
export const categoryService = {
  getAll:  ()     => fetchAPI('/categories'),
  create:  (data) => postAPI('/categories', data),
}
