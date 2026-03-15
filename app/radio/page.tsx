'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Section = 'audio' | 'video'

const audioEpisodes = [
  {
    id: 1,
    title: 'All the Wins',
    description: 'A conversation about the small victories in the creative process and how they fuel our passion and perseverance.',
    duration: '18:26',
    audioUrl: '/audio/All the Winss.mp3',
  },
  {
    id: 2,
    title: 'Celebrities',
    description: 'Today, we’re diving deep into a topic that’s both fascinating and complex: the influence of celebrities in our lives. Why do we find ourselves so captivated by these figures who are, in many ways, famous for simply being famous? What does our admiration say about our values and desires?',
    duration: '30:16',
    audioUrl: '/audio/Celebrities.mp3',
  },
  {
    id: 3,
    title: 'I Like To Think with Tapchinn - Part 1',
    description: 'How performance artists are using their bodies as sites of resistance and reclamation.',
    duration: '28:04',
    audioUrl: '/audio/ILiketoThinkwithTapspt1.mp3',
  },
  {
    id: 4,
    title: 'I Like To Think with Tapchinn - Part 2',
    description: 'How performance artists are using their bodies as sites of resistance and reclamation.',
    duration: '30:24',
    audioUrl: '/audio/ILike2ThinkwithTapspt2.mp3',
  },
]

const videoEpisodes = [
  {
    id: 1,
    title: 'Studio Sessions: Abstract Process',
    thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=450&fit=crop',
    duration: '15:42',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 2,
    title: 'Gallery Walk: New Perspectives',
    thumbnail: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=450&fit=crop',
    duration: '22:18',
    youtubeId: 'dQw4w9WgXcQ',
  },
  {
    id: 3,
    title: 'In Conversation: Art & Activism',
    thumbnail: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&h=450&fit=crop',
    duration: '34:55',
    youtubeId: 'dQw4w9WgXcQ',
  },
]

export default function RadioPage() {
  const [activeSection, setActiveSection] = useState<Section>('audio')
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [videoModal, setVideoModal] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto mb-16"
      >
        <h1 className="font-serif text-7xl lg:text-9xl font-bold text-cream mb-6">
          Radio
        </h1>
        <p className="text-cream/60 text-lg max-w-2xl">
          Long-form conversations, studio sessions, and visual stories.
          Audio essays and video explorations.
        </p>
      </motion.div>

      {/* Section Tabs */}
      <div className="max-w-5xl mx-auto mb-12">
        <div className="flex gap-6 border-b border-cream/10">
          {(['audio', 'video'] as Section[]).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`pb-4 text-lg font-medium capitalize transition-all duration-300 relative ${activeSection === section
                ? 'text-gold'
                : 'text-cream/50 hover:text-cream/80'
                }`}
            >
              {section}
              {activeSection === section && (
                <motion.div
                  layoutId="radioTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'audio' && (
          <motion.div
            key="audio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <div className="space-y-6">
              {audioEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-surface/50 border border-cream/10 rounded-lg p-6 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    {/* Play Button */}
                    <button
                      onClick={() => {
                        if (playingId === episode.id) {
                          // Pause current episode
                          audioRef.current?.pause();
                          setPlayingId(null);
                        } else {
                          // Switch to new episode
                          setPlayingId(episode.id);
                        }
                      }}
                      className="flex-shrink-0 w-16 h-16 rounded-full bg-gold/20 border border-gold flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 group"
                    >
                      {playingId === episode.id ? (
                        <svg className="w-6 h-6 text-gold group-hover:text-background" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6 text-gold group-hover:text-background ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>

                    {/* Episode Info */}
                    <div className="flex-1">
                      <h3 className="font-serif text-2xl text-cream font-bold mb-2">
                        {episode.title}
                      </h3>
                      <p className="text-cream/60 mb-4">{episode.description}</p>
                      <span className="text-cream/40 text-sm">{episode.duration}</span>
                    </div>
                  </div>

                  {/* Audio Player (when playing) */}
                  {playingId === episode.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-cream/10"
                    >
                      <audio
                        ref={audioRef}
                        controls
                        autoPlay                              // ✅ auto-plays when mounted
                        className="w-full"
                        onEnded={() => setPlayingId(null)}    // ✅ resets state when audio ends
                      >
                        <source src={episode.audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoEpisodes.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                  onClick={() => setVideoModal(video.youtubeId)}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-primary/40 transition-all duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold/80 flex items-center justify-center group-hover:bg-gold transition-all duration-300">
                        <svg className="w-7 h-7 text-background ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-background/80 px-2 py-1 rounded text-xs text-cream">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-serif text-xl text-cream font-bold group-hover:text-gold transition-colors">
                    {video.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
