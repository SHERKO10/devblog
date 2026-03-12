// layout.jsx — Layout racine : s'applique à TOUTES les pages
// C'est ici qu'on met ce qui est commun : Navbar, Footer, polices...

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Charge la police Inter de Google Fonts (optimisé par Next.js)
const inter = Inter({ subsets: ['latin'] })

// Métadonnées SEO par défaut (peuvent être surchargées par chaque page)
export const metadata = {
  title:       'DevBlog — Blog technique',
  description: 'Un blog technique sur le développement web fullstack',
}

export default function RootLayout({ children }) {
  // children = le contenu de la page courante
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Navbar />

        {/* Le contenu de chaque page s'affiche ici */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}