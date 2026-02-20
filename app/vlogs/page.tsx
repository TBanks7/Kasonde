'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const vlogs = [
  {
    id: 1,
    title: 'Studio Day: Prepping for the Show',
    date: 'February 12, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=450&fit=crop',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Morning Routine & Creative Rituals',
    date: 'February 5, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&h=450&fit=crop',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'Gallery Opening Night',
    date: 'January 28, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1531913764164-f85c52f6e654?w=800&h=450&fit=crop',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 4,
    title: 'Behind the Scenes: Workshop Prep',
    date: 'January 20, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=450&fit=crop',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 5,
    title: 'Weekend in the City',
    date: 'January 14, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 6,
    title: 'Thoughts on Creative Block',
    date: 'January 7, 2024',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=450&fit=crop',
    youtubeId: 'dQw4w9WgXcQ',
  },
]

export default function VlogsPage() {
  const [videoModal, setVideoModal] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <h1 className="font-serif text-7xl lg:text-9xl font-bold text-cream mb-6">
          Vlogs
        </h1>
        <p className="text-cream/60 text-lg max-w-2xl">
          Candid glimpses into the creative process, daily life, and everything in between. 
          Life in motion.
        </p>
      </motion.div>

      {/* Video Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vlogs.map((vlog, index) => (
            <motion.div
              key={vlog.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => setVideoModal(vlog.youtubeId)}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                <img
                  src={vlog.thumbnail}
                  alt={vlog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-background/30 group-hover:bg-gold/30 transition-all duration-500" />
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-cream/10 backdrop-blur-sm border-2 border-cream/50 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                    <svg className="w-7 h-7 text-cream ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 className="font-serif text-xl text-cream font-bold mb-2 group-hover:text-gold transition-colors">
                  {vlog.title}
                </h3>
                <p className="text-cream/40 text-sm">{vlog.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setVideoModal(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface/80 border border-cream/20 flex items-center justify-center hover:border-gold transition-colors"
              onClick={() => setVideoModal(null)}
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-5xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoModal}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
