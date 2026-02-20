'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

type Category = 'think-pieces' | 'academia'

interface Essay {
  id: string
  title: string
  category: Category
  excerpt: string
  date: string
  readTime: string
  slug: string
}

const essays: Essay[] = [
  {
    id: '1',
    title: 'The Politics of Color in Contemporary Art',
    category: 'think-pieces',
    excerpt: 'An exploration of how color choices in modern art reflect and challenge social hierarchies, identity politics, and cultural narratives.',
    date: 'February 10, 2024',
    readTime: '8 min',
    slug: 'politics-of-color',
  },
  {
    id: '2',
    title: 'Reclaiming Space: Art as Activism',
    category: 'think-pieces',
    excerpt: 'How marginalized artists are using their work to reclaim physical and cultural spaces, transforming galleries into sites of resistance.',
    date: 'January 28, 2024',
    readTime: '12 min',
    slug: 'reclaiming-space',
  },
  {
    id: '3',
    title: 'Deconstructing the Canon: A Postcolonial Perspective',
    category: 'academia',
    excerpt: 'A critical examination of Western art history curricula and the systematic exclusion of non-Western artistic traditions.',
    date: 'January 15, 2024',
    readTime: '15 min',
    slug: 'deconstructing-canon',
  },
  {
    id: '4',
    title: 'Performance, Identity, and the Body Politic',
    category: 'academia',
    excerpt: 'An academic inquiry into how performance art engages with questions of identity, power, and embodiment in contemporary culture.',
    date: 'December 20, 2023',
    readTime: '18 min',
    slug: 'performance-identity',
  },
  {
    id: '5',
    title: 'On Creating When the World is Burning',
    category: 'think-pieces',
    excerpt: 'Reflections on the artist\'s responsibility in times of crisis, and whether creating beauty is an act of resistance or escapism.',
    date: 'December 5, 2023',
    readTime: '10 min',
    slug: 'creating-in-crisis',
  },
]

export default function EssaysPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')

  const filteredEssays = activeCategory === 'all' 
    ? essays 
    : essays.filter(essay => essay.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mb-16"
      >
        <h1 className="font-serif text-7xl lg:text-9xl font-bold text-cream mb-6">
          Essays
        </h1>
        <p className="text-cream/60 text-lg max-w-2xl">
          Thoughtful explorations of art, culture, identity, and power. 
          From personal reflections to academic inquiry.
        </p>
      </motion.div>

      {/* Category Filters */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex gap-4 flex-wrap">
          {[
            { value: 'all', label: 'All Essays' },
            { value: 'think-pieces', label: 'Think Pieces' },
            { value: 'academia', label: 'Academia' },
          ].map((category) => (
            <button
              key={category.value}
              onClick={() => setActiveCategory(category.value as Category | 'all')}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === category.value
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface/50 text-cream/70 border-cream/20 hover:border-gold/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Essays List */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {filteredEssays.map((essay, index) => (
              <motion.article
                key={essay.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/essays/${essay.slug}`}
                  className="block bg-surface/30 border border-cream/10 rounded-lg p-8 hover:border-primary/50 hover:bg-surface/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wide ${
                      essay.category === 'think-pieces'
                        ? 'bg-primary/20 text-primary'
                        : 'bg-gold/20 text-gold'
                    }`}>
                      {essay.category === 'think-pieces' ? 'Think Piece' : 'Academia'}
                    </span>
                    <span className="text-cream/40 text-sm">·</span>
                    <span className="text-cream/40 text-sm">{essay.date}</span>
                    <span className="text-cream/40 text-sm">·</span>
                    <span className="text-cream/40 text-sm">{essay.readTime} read</span>
                  </div>

                  <h2 className="font-serif text-3xl font-bold text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                    {essay.title}
                  </h2>

                  <p className="text-cream/60 leading-relaxed mb-4">
                    {essay.excerpt}
                  </p>

                  <div className="flex items-center text-primary group-hover:text-gold transition-colors">
                    <span className="text-sm font-medium">Read more</span>
                    <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredEssays.length === 0 && (
          <div className="text-center py-20">
            <p className="text-cream/40 text-lg">No essays found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
