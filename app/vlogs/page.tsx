'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const vlogs: any[] = [

  // {
  //   id: 1,
  //   title: 'Studio Day: Prepping for the Show',
  //   date: 'February 12, 2024',
  //   thumbnail: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=450&fit=crop',
  //   youtubeId: 'dQw4w9WgXcQ',
  // },
  // {
  //   id: 2,
  //   title: 'Morning Routine & Creative Rituals',
  //   date: 'February 5, 2024',
  //   thumbnail: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?w=800&h=450&fit=crop',
  //   youtubeId: 'dQw4w9WgXcQ',
  // },
  // {
  //   id: 3,
  //   title: 'Gallery Opening Night',
  //   date: 'January 28, 2024',
  //   thumbnail: 'https://images.unsplash.com/photo-1531913764164-f85c52f6e654?w=800&h=450&fit=crop',
  //   youtubeId: 'dQw4w9WgXcQ',
  // },
  // {
  //   id: 4,
  //   title: 'Behind the Scenes: Workshop Prep',
  //   date: 'January 20, 2024',
  //   thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=450&fit=crop',
  //   youtubeId: 'dQw4w9WgXcQ',
  // },
  // {
  //   id: 5,
  //   title: 'Weekend in the City',
  //   date: 'January 14, 2024',
  //   thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=450&fit=crop',
  //   youtubeId: 'dQw4w9WgXcQ',
  // },
  // {
  //   id: 6,
  //   title: 'Thoughts on Creative Block',
  //   date: 'January 7, 2024',
  //   thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=450&fit=crop',
  //   youtubeId: 'dQw4w9WgXcQ',
  // },
]

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-40 gap-0">
    {/* Floating character */}
    <div className="animate-[float_3.8s_ease-in-out_infinite]">
      <svg width="220" height="220" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">

        {/* Shadow */}
        <ellipse cx="110" cy="198" rx="42" ry="7" fill="rgba(212,175,55,0.1)" />

        {/* Camera body */}
        <rect x="72" y="120" width="76" height="60" rx="10" fill="#1a1f30" />
        <rect x="78" y="126" width="64" height="48" rx="7" fill="#0d1020" />
        <rect x="82" y="130" width="56" height="40" rx="5" fill="#d4af37" opacity="0.08" />
        <rect x="84" y="132" width="52" height="36" rx="4" fill="#101525" />

        {/* Lens */}
        <circle cx="110" cy="150" r="14" fill="#0a0e1a" stroke="#d4af37" strokeWidth="1.5" />
        <circle cx="110" cy="150" r="9" fill="#111825" />
        <circle cx="110" cy="150" r="5" fill="#d4af37" opacity="0.15" />
        <circle cx="110" cy="150" r="2" fill="#d4af37" opacity="0.5" />
        <circle cx="114" cy="146" r="2.5" fill="white" opacity="0.5" style={{ animation: 'lensflare 2.2s ease-in-out infinite' }} />

        {/* Tripod */}
        <rect x="96" y="180" width="28" height="6" rx="3" fill="#1a1f30" />
        <rect x="105" y="183" width="10" height="12" rx="2" fill="#1a1f30" />

        {/* Side grips */}
        <rect x="55" y="132" width="18" height="10" rx="3" fill="#1a1f30" />
        <rect x="147" y="132" width="18" height="10" rx="3" fill="#1a1f30" />
        <line x1="73" y1="137" x2="78" y2="137" stroke="#d4af37" strokeWidth="1.5" opacity="0.6" />
        <line x1="142" y1="137" x2="147" y2="137" stroke="#d4af37" strokeWidth="1.5" opacity="0.6" />

        {/* Head */}
        <circle cx="110" cy="82" r="38" fill="#1c2235" />
        <circle cx="110" cy="82" r="35" fill="#151a2a" />

        {/* Eyes */}
        <g style={{ animation: 'blink 4s ease-in-out infinite', transformOrigin: 'center 80px' }}>
          <ellipse cx="97" cy="80" rx="5" ry="6" fill="#f5ead8" />
          <circle cx="98" cy="81" r="3" fill="#1a1020" />
          <circle cx="99" cy="80" r="1" fill="white" />
          <ellipse cx="123" cy="80" rx="5" ry="6" fill="#f5ead8" />
          <circle cx="124" cy="81" r="3" fill="#1a1020" />
          <circle cx="125" cy="80" r="1" fill="white" />
        </g>

        {/* Smile */}
        <path d="M100 94 Q110 100 120 94" stroke="#d4af37" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Rosy cheeks */}
        <circle cx="84" cy="82" r="5" fill="#cc6677" opacity="0.3" />
        <circle cx="136" cy="82" r="5" fill="#cc6677" opacity="0.3" />

        {/* Headphones */}
        <path d="M82 60 Q88 44 110 42 Q132 44 138 60" stroke="#d4af37" strokeWidth="1.5" fill="none" opacity="0.7" />
        <circle cx="82" cy="60" r="3" fill="#d4af37" opacity="0.7" />
        <circle cx="138" cy="60" r="3" fill="#d4af37" opacity="0.7" />

        {/* Antenna */}
        <circle cx="110" cy="42" r="6" fill="#d4af37" opacity="0.5" />
        <line x1="110" y1="36" x2="110" y2="26" stroke="#d4af37" strokeWidth="1.5" opacity="0.5" />
        <line x1="106" y1="28" x2="114" y2="28" stroke="#d4af37" strokeWidth="1.5" opacity="0.5" />

        {/* Neck */}
        <rect x="76" y="117" width="68" height="6" rx="3" fill="#d4af37" opacity="0.15" />
        <rect x="90" y="113" width="40" height="6" rx="3" fill="#d4af37" opacity="0.1" />
      </svg>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-center mt-8"
    >
      <p className="text-gold/70 text-xs tracking-[0.22em] uppercase mb-3">
        Life in motion
      </p>
      <h2 className="font-serif text-4xl font-bold text-cream mb-3">
        Vlogs coming soon
      </h2>
      <p className="text-cream/45 text-sm max-w-sm leading-relaxed mx-auto">
        She's out there living the story. Check back — the camera's never far away.
      </p>
    </motion.div>
  </div>
)



export default function VlogsPage() {
  const [videoModal, setVideoModal] = useState<string | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      {/* Hero Header */}
      {vlogs.length === 0 ? <EmptyState /> : (
              /* Title & Description */
      <div>
          {/* Title & Description */}
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
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-background/30 group-hover:bg-gold/30 transition-all duration-500" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-cream/10 backdrop-blur-sm border-2 border-cream/50 flex items-center justify-center group-hover:bg-gold group-hover:border-gold transition-all duration-300">
                        <svg className="w-7 h-7 text-cream ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
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
          </div>
      )}




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
