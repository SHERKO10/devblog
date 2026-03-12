// not-found.jsx — Page affichée quand un article n'existe pas
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-32 text-center">
      <p className="text-8xl mb-6">🔍</p>
      <h1 className="text-4xl font-bold text-white mb-4">
        Page introuvable
      </h1>
      <p className="text-gray-400 mb-8">
        Cet article n'existe pas ou a été supprimé.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        ← Retour à l'accueil
      </Link>
    </div>
  )
}
