// Footer.jsx — Pied de page

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="max-w-5xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
        <p>
          {'<DevBlog />'} — Construit avec Next.js, Node.js & ❤️
        </p>
        <p className="mt-1 text-xs text-gray-600">
            Un projet d apprentissage fullstack
        </p>
      </div>
    </footer>
  )
}