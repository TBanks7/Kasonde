'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type Section = 'galleries' | 'drag'

interface GalleryImage {
  id: string | number
  url: string
  date: string
  style: string
  title: string
  about: string
}

interface DragImage {
  id: string | number
  url: string
}

interface ArtPageClientProps {
  galleryImages: GalleryImage[]
  dragImages: DragImage[]
}

export default function ArtPageClient({ galleryImages, dragImages }: ArtPageClientProps) {
  const [activeSection, setActiveSection] = useState<Section>('galleries')
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null)

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h1 className="font-serif text-7xl lg:text-9xl font-bold text-cream mb-6">
          Art
        </h1>
        <p className="text-cream/60 text-lg max-w-4xl">
          I explore Black radical existentialism through visual storytelling, positioning myself as the subject, object, and verb of the work. I examine my position as a multiple and evolving being, using absurdity and self-obsession. This practice becomes a vehicle through which I document experience as a cycle of descent, introspection, and transcendence.
        </p>
      </motion.div>

      {/* Section Tabs */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex gap-6 border-b border-cream/10">
          {(['galleries', 'drag'] as Section[]).map((section) => (
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
                  layoutId="activeTab"
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
        {activeSection === 'galleries' && (
          <motion.div
            key="galleries"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {/* Masonry Grid */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="break-inside-avoid"
                >
                  <div
                    className="relative overflow-hidden rounded-lg cursor-pointer group"
                    onClick={() => setLightboxImage(image)}
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      width={800}
                      height={1000}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/0 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-cream font-medium">{image.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'drag' && (
          <motion.div
            key="drag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto"
          >
            {/* Editorial Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {dragImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={index === 0 ? 'md:col-span-2' : ''}
                >
                  <div className="relative overflow-hidden rounded-lg group cursor-pointer">
                    <Image
                      src={image.url}
                      alt={`Drag performance ${image.id}`}
                      width={1200}
                      height={800}
                      className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col items-center md:flex-row overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-background/60 border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold text-cream transition-colors"
                onClick={() => setLightboxImage(null)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Side */}
              <div className="md:w-1/2 flex items-center justify-center overflow-hidden">
                <Image
                  src={lightboxImage.url}
                  alt={lightboxImage.title}
                  width={1600}
                  height={1200}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[90vh]"
                />
              </div>

              {/* Info Side */}
              <div className="md:w-1/2 flex flex-col justify-between items-center p-8 overflow-y-auto max-h-[40vh] md:max-h-[90vh]">
                <div>
                  <p className="text-gold text-xs uppercase tracking-widest mb-3 font-medium">
                    {lightboxImage.date} · {lightboxImage.style}
                  </p>
                  <h2 className="font-serif text-3xl text-cream font-bold mb-6 leading-snug">
                    {lightboxImage.title}
                  </h2>
                  <p className="text-cream/70 text-base text-justify leading-relaxed">
                    {lightboxImage.about}
                  </p>
                </div>

                {/* Optional: navigation hint */}
                <button className="inline-block text-cream/30 text-xs mt-8 md:hidden" onClick={() => setLightboxImage(null)}>
                  Click to close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
