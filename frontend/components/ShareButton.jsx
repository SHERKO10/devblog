// ShareButton.jsx — Bouton pour copier le lien de l'article
'use client'

import { useState } from 'react'

export default function ShareButton({ title }) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      // Copie l'URL actuelle dans le presse-papier
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      // Remet le texte normal après 2 secondes
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback si le clipboard API n'est pas disponible
      alert(`Lien à partager : ${window.location.href}`)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-all"
    >
      {copied ? '✅ Lien copié !' : '🔗 Partager'}
    </button>
  )
}