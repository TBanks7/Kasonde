'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const audioEpisodes = [
  {
    id: 1,
    title: 'All the Wins',
    description: 'A conversation about the small victories in the creative process and how they fuel our passion and perseverance.',
    duration: '18:26',
    audioUrl: '/audio/All the Winss.mp3',
    posterUrl: '/All the wins.webp',
  },
  {
    id: 2,
    title: 'Celebrities',
    description: 'Today, we’re diving deep into a topic that’s both fascinating and complex: the influence of celebrities in our lives. Why do we find ourselves so captivated by these figures who are, in many ways, famous for simply being famous? What does our admiration say about our values and desires?',
    duration: '30:16',
    audioUrl: '/audio/Celebrities.mp3',
    posterUrl: '/Celebrities.webp',
  },
  {
    id: 3,
    title: 'I Like To Think with Tapchinn - Part 1',
    description: 'How performance artists are using their bodies as sites of resistance and reclamation.',
    duration: '28:04',
    audioUrl: '/audio/ILiketoThinkwithTapspt1.mp3',
    posterUrl: '/Tapchin.webp',
  },
  {
    id: 4,
    title: 'I Like To Think with Tapchinn - Part 2',
    description: 'How performance artists are using their bodies as sites of resistance and reclamation.',
    duration: '30:24',
    audioUrl: '/audio/ILike2ThinkwithTapspt2.mp3',
    posterUrl: '/Tapchin.webp',
  },
  {
    id: 5,
    title: 'I Like To Think with Audrey',
    description: 'I like to think with my friend Audrey Gwiza. Audrey is a speaker, writer, and youth advocate. On this episode we reflect on digital consumerism and asking, is there pressure to perform for this machine we call the algorithm?  We talk about everything from monetizing your gift, to whether that sacrifice is worth it and at what point you do recognize that gift. Come sit with us and think all these big questions through. A fan favourite episode, enjoy folks.',
    duration: '25:42',
    audioUrl: '/audio/ILiketoThinkwithAudrey.mp3',
    posterUrl: '/Audrey.webp',
  },
  {
    id: 6,
    title: 'I Like To Think with Patricia & Amal',
    description: '',
    duration: '28:04',
    audioUrl: '/audio/I like to think with Kasonde - Patricia & Amal - Jeff Leal.mp3',
    posterUrl: '/Celebrities.webp',
  },
  {
    id: 7,
    title: 'I Like To Think with Sunny Malik',
    description: '',
    duration: '30:24',
    audioUrl: '/audio/I like to think with Kasonde - Sunny Malik.mp3',
    posterUrl: '/Sunny.webp',
  }
]



export default function RadioPage() {
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


      {/* Content Sections */}
      <AnimatePresence mode="wait">

          <motion.div
            key="audio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {audioEpisodes.map((episode, index) => (
                <motion.div
                  key={episode.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg bg-surface/50 border border-cream/10 hover:border-gold/30 transition-all duration-300"
                >
                  {/* Poster Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={episode.posterUrl}
                      alt={episode.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => {
                        if (playingId === episode.id) {
                          audioRef.current?.pause();
                          setPlayingId(null);
                        } else {
                          setPlayingId(episode.id);
                        }
                      }}
                      className="absolute inset-0 flex items-center justify-center group/play"
                    >
                      <div className="w-20 h-20 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center group-hover/play:bg-gold group-hover/play:scale-110 transition-all duration-300">
                        {playingId === episode.id ? (
                          <svg className="w-8 h-8 text-background" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-background ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-cream text-sm font-medium">{episode.duration}</span>
                    </div>

                    {/* Playing Indicator */}
                    {playingId === episode.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute top-4 left-4 flex items-center gap-2 bg-gold/90 backdrop-blur-sm px-3 py-1 rounded-full"
                      >
                        <div className="flex items-center gap-0.5">
                          <div className="w-0.5 bg-background equalizer-bar rounded-full"></div>
                          <div className="w-0.5 bg-background equalizer-bar rounded-full"></div>
                          <div className="w-0.5 bg-background equalizer-bar rounded-full"></div>
                        </div>
                        <span className="text-background text-xs font-semibold uppercase tracking-wide">Playing</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Episode Info */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-cream font-bold mb-2 group-hover:text-gold transition-colors">
                      {episode.title}
                    </h3>
                    <p className="text-cream/60 text-sm leading-relaxed mb-4">
                      {episode.description}
                    </p>

                    {/* Audio Player (when playing) */}
                    {playingId === episode.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-cream/10"
                      >
                        <audio
                          ref={audioRef}
                          controls
                          autoPlay
                          className="w-full"
                          onEnded={() => setPlayingId(null)}
                        >
                          <source src={episode.audioUrl} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>


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
