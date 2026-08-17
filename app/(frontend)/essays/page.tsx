'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

type Group = 'think-pieces' | 'academia'

interface Essay {
  id: string
  title: string
  group: Group
  tags: string[]
  excerpt: string
  date: string
  readTime: string
  link: string
  linkType: 'medium' | 'pdf'
}

interface MediumPost {
  title: string
  link: string
  pubDate: string
  creator?: string
  content?: string
  category?: string[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

function estimateReadTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min`
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function getExcerpt(content: string): string {
  const text = stripHtml(content).trim()
  return text.length > 220 ? text.slice(0, 220) + '…' : text
}

// ─── Static (non-Medium) essays ───────────────────────────────────────────────

const staticEssays: Essay[] = [
  {
    id: 'static-1',
    title: 'Echo Chambers, Systemic Distrust, and Misinformation: A Critical Examination of Black Twitter as a Digital Counterpublic',
    group: 'academia',
    tags: ['social media', 'digital counterpublics', 'misinformation'],
    excerpt: 'This paper reconceptualizes Black Twitter as an epistemically virtuous echo chamber and digital counterpublic. While echo chambers are often seen as isolating and harmful, Black Twitter fosters critical engagement, collective verification, and the amplification of marginalized voices.',
    date: 'January 15, 2024',
    readTime: '15 min',
    link: '/Echo Chambers.pdf',
    linkType: 'pdf',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function EssaysPage() {
  const [activeGroup, setActiveGroup] = useState<Group | 'all'>('all')
  const [essays, setEssays] = useState<Essay[]>(staticEssays)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/medium-feed')
      .then(res => res.json())
      .then(data => {
        if (data?.feed) {
          const mediumEssays: Essay[] = (data.feed as MediumPost[])
            .map(post => {
              const tags: string[] = post.category ?? []
              const isAcademia = tags.some(t =>
                ['academia', 'academic', 'research', 'theory'].includes(t.toLowerCase())
              )
              return {
                id: post.link,
                title: post.title,
                group: isAcademia ? 'academia' : 'think-pieces',
                tags,
                excerpt: post.content ? getExcerpt(post.content) : '',
                date: formatDate(post.pubDate),
                readTime: estimateReadTime(post.content ?? ''),
                link: post.link,
                linkType: 'medium' as const,
              }
            })
          setEssays([...mediumEssays, ...staticEssays])
        }
      })
      .catch(err => console.error('Failed to load Medium feed', err))
      .finally(() => setLoading(false))
  }, [])

  const filtered =
    activeGroup === 'all'
      ? essays
      : essays.filter(e => e.group === activeGroup)

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
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

      {/* ── Group Filters ──────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex gap-4 flex-wrap">
          {([
            { value: 'all', label: 'All Essays' },
            { value: 'think-pieces', label: 'Think Pieces' },
            { value: 'academia', label: 'Academia' },
          ] as const).map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveGroup(cat.value)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 ${
                activeGroup === cat.value
                  ? 'bg-gold text-background border-gold'
                  : 'bg-surface/50 text-cream/70 border-cream/20 hover:border-gold/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Essay List ────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto">

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map(i => (
              <div
                key={i}
                className="bg-surface/30 border border-cream/10 rounded-lg p-8 animate-pulse"
              >
                <div className="h-4 bg-cream/10 rounded w-32 mb-4" />
                <div className="h-8 bg-cream/10 rounded w-3/4 mb-4" />
                <div className="h-4 bg-cream/10 rounded w-full mb-2" />
                <div className="h-4 bg-cream/10 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {filtered.map((essay, index) => (
                <motion.article
                  key={essay.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <a
                    href={essay.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-surface/30 border border-cream/10 rounded-lg p-8 hover:border-primary/50 hover:bg-surface/50 transition-all duration-300 group"
                  >
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span
                        className={`text-xs px-3 py-1 rounded-full uppercase tracking-wide ${
                          essay.group === 'think-pieces'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-gold/20 text-gold'
                        }`}
                      >
                        {essay.group === 'think-pieces' ? 'Think Piece' : 'Academia'}
                      </span>

                      {essay.linkType === 'pdf' && (
                        <span className="text-xs px-3 py-1 rounded-full uppercase tracking-wide bg-cream/10 text-cream/50 border border-cream/20">
                          PDF
                        </span>
                      )}

                      <span className="text-cream/40 text-sm">·</span>
                      <span className="text-cream/40 text-sm">{essay.date}</span>
                      <span className="text-cream/40 text-sm">·</span>
                      <span className="text-cream/40 text-sm">{essay.readTime} read</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif text-3xl font-bold text-cream mb-4 group-hover:text-gold transition-colors duration-300">
                      {essay.title}
                    </h2>

                    {/* Excerpt */}
                    {essay.excerpt && (
                      <p className="text-cream/60 leading-relaxed mb-4">
                        {essay.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {essay.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap mb-4">
                        {essay.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs text-cream/30 border border-cream/10 rounded-full px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Read more */}
                    <div className="flex items-center text-primary group-hover:text-gold transition-colors">
                      <span className="text-sm font-medium">
                        {essay.linkType === 'pdf' ? 'View PDF' : 'Read on Medium'}
                      </span>
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </a>
                </motion.article>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-cream/40 text-lg">No essays found in this group.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}