'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type Section = 'galleries' | 'workshops' | 'drag'

const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=1000&fit=crop', title: 'Abstract Emotion I' },
  { id: 2, url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600&h=800&fit=crop', title: 'Urban Dreams' },
  { id: 3, url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=600&fit=crop', title: 'Color Theory' },
  { id: 4, url: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=900&fit=crop', title: 'Fluid Forms' },
  { id: 5, url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=900&h=600&fit=crop', title: 'Texture Study' },
  { id: 6, url: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=700&h=900&fit=crop', title: 'Movement' },
  { id: 7, url: 'https://images.unsplash.com/photo-1577083300597-dca35f07cc52?w=800&h=1000&fit=crop', title: 'Canvas Dreams' },
  { id: 8, url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop', title: 'Bold Strokes' },
]

const workshops = [
  {
    id: 1,
    title: 'Acrylic Fundamentals',
    description: 'Learn the basics of acrylic painting in this hands-on workshop. Perfect for beginners.',
    date: 'March 15, 2024',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Abstract Expression',
    description: 'Explore abstract techniques and find your unique artistic voice.',
    date: 'April 22, 2024',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Color Theory Masterclass',
    description: 'Deep dive into color relationships, harmony, and contrast.',
    date: 'January 10, 2024',
    status: 'past',
  },
]

const dragImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&h=800&fit=crop' },
  { id: 2, url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=1200&fit=crop' },
  { id: 3, url: 'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=1000&h=800&fit=crop' },
  { id: 4, url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=1000&fit=crop' },
]

export default function ArtPage() {
  const [activeSection, setActiveSection] = useState<Section>('galleries')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

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
        <p className="text-cream/60 text-lg max-w-2xl">
          Visual expression through painting, performance, and transformation. 
          Galleries, workshops, and drag artistry.
        </p>
      </motion.div>

      {/* Section Tabs */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex gap-6 border-b border-cream/10">
          {(['galleries', 'workshops', 'drag'] as Section[]).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`pb-4 text-lg font-medium capitalize transition-all duration-300 relative ${
                activeSection === section
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
                    onClick={() => setLightboxImage(image.url)}
                  >
                    <Image
                      src={image.url}
                      alt={image.title}
                      width={800}
                      height={1000}
                      className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-cream font-medium">{image.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'workshops' && (
          <motion.div
            key="workshops"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-6">
              {workshops.map((workshop, index) => (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-surface/50 border-l-4 border-gold rounded-lg p-8 hover:bg-surface/80 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h3 className="font-serif text-2xl text-cream font-bold">
                      {workshop.title}
                    </h3>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      workshop.status === 'upcoming'
                        ? 'bg-gold/20 text-gold'
                        : 'bg-cream/10 text-cream/50'
                    }`}>
                      {workshop.status === 'upcoming' ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                  <p className="text-cream/70 mb-4">{workshop.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-cream/50 text-sm">{workshop.date}</span>
                    {workshop.status === 'upcoming' && (
                      <button className="px-6 py-2 bg-gold/10 border border-gold text-gold rounded-full hover:bg-gold hover:text-background transition-all duration-300">
                        Book a Spot
                      </button>
                    )}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-surface/80 border border-cream/20 flex items-center justify-center hover:border-gold transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="relative max-w-5xl max-h-[90vh]"
            >
              <Image
                src={lightboxImage}
                alt="Gallery image"
                width={1600}
                height={1200}
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
