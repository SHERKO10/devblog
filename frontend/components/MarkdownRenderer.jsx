// MarkdownRenderer.jsx — Affiche du Markdown formaté en HTML
'use client'

import ReactMarkdown from 'react-markdown'

export default function MarkdownRenderer({ content }) {
  return (
    // La classe "prose-content" vient de globals.css (étape 4)
    <div className="prose-content">
      <ReactMarkdown
        components={{
          // On personnalise le rendu de chaque élément Markdown

          // Titres
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-white border-b border-gray-700 pb-2">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-bold mt-4 mb-2 text-white">
              {children}
            </h3>
          ),

          // Paragraphe
          p: ({ children }) => (
            <p className="mb-4 text-gray-300 leading-relaxed">
              {children}
            </p>
          ),

          // Code inline : `monCode`
          code: ({ inline, children }) =>
            inline ? (
              <code className="bg-gray-800 text-blue-300 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            ) : (
              // Bloc de code : ```monCode```
              <code className="block bg-gray-800 text-green-300 p-4 rounded-lg text-sm font-mono overflow-x-auto mb-4">
                {children}
              </code>
            ),

          // Bloc pre (conteneur du code)
          pre: ({ children }) => (
            <pre className="bg-gray-800 rounded-lg mb-4 overflow-x-auto">
              {children}
            </pre>
          ),

          // Citation blockquote
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-400 bg-blue-950/20 py-2 rounded-r-lg">
              {children}
            </blockquote>
          ),

          // Listes
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-1">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="ml-2">{children}</li>
          ),

          // Liens
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {children}
            </a>
          ),

          // Séparateur horizontal
          hr: () => <hr className="border-gray-700 my-8" />,

          // Texte en gras
          strong: ({ children }) => (
            <strong className="text-white font-semibold">{children}</strong>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}