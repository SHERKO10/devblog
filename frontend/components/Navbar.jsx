// Navbar.jsx — Barre de navigation
// "use client" car elle a un état pour le menu mobile
'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  // useState → mémorise si le menu mobile est ouvert ou fermé
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo / Titre du blog */}
        <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
          {'<DevBlog />'}
        </Link>

        {/* Navigation desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/"       className="text-gray-300 hover:text-white transition-colors">
            Accueil
          </Link>
          <Link href="/admin"  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            ✏️ Admin
          </Link>
        </div>

        {/* Bouton menu mobile */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 border-t border-gray-800 px-4 py-3 flex flex-col gap-3">
          <Link href="/"      className="text-gray-300 hover:text-white" onClick={() => setMenuOpen(false)}>
            Accueil
          </Link>
          <Link href="/admin" className="text-blue-400 hover:text-blue-300" onClick={() => setMenuOpen(false)}>
            ✏️ Admin
          </Link>
        </div>
      )}
    </nav>
  )
}