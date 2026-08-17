'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

type Section = 'galleries' | 'workshops' | 'drag'

const galleryImages = [
  { id: 1, url: '/Poker With Life.JPG', date: 'August 2020', style: 'Chalk on paper 33.1 x 46.8 in', title: 'Poker With Life', about: 'We get told that in life we get handed certain cards and it’s “what we do with them”. We are given life, but who hands the cards? Who’s hands control the cards? The game is rigged for majority of the minority and sometimes even when you think you are about to beat the dealer win the house - it goes up in flames. And you watch it fall into pieces and all you can do is smile. Poker with life becomes a reminder that there is nothing promised and only one thing that is sure.' },
  { id: 2, url: '/I Hope what you did to me haunts you.JPG', date: 'October 2020', style: 'Mixed media 33.1 x 46.8 in', title: 'I Hope what you did to me haunts you', about: 'What happens when your world is plagued, conflicted and abused. What obligations do you have? Do you see that it is warped? That it is made. Do you stay stuck in a fictional land and a paused future? I hope what you did to me haunts you invites the viewer to reflect on what this phrase brings up for them, to explore whether they think of someone, something or some system. To asks themselves what haunts them.' },
  { id: 3, url: '/Seeing in Black and White .JPG', date: 'February 2021', style: 'Mixed media 33.1 x 46.8 in', title: 'Seeing in Black and White', about: 'Every single thing influences, every single thing creates the whole. There’s black and there’s white all entangled, all relational. Seeing in black and white positions itself within relations to whiteness as a controlling and extractive concept that is essentially attached to being Black. It examines the ways in which ideas of Blackness can be shaped by white spaces and attachment to them. It evokes the uncomfort of those realizations by feeling incomplete, like a part is missing. That there is a part that must be rediscovered.' },
  { id: 4, url: '/Deconstructed Self.JPG', date: 'June 2023', style: 'Mixed media 33.1 x 46.8 in', title: 'Deconstructed Self', about: 'The process of deconstruction is a continuation of the Black radical experience to liberate oneself not only physically but mentally too. It calls for an identification of who’s conversation is happening internally. The colonial project\'s aim is to capture one\'s thoughts, to erase experience and plague knowledge systems. Epistemic justice is a concern with fairness in knowledge making, practising and prioritising, its about whose thoughts get to matter. Deconstructed self is a document of decolonizing the idea of self and shifting/aligning to one that inspires to be an authentic, evolving entity that is actively created and nurtured through self-love, critical awareness, and resistance to oppresive, dominator culture.' },
  { id: 5, url: '/Red.JPG', date: 'December 2025', style: 'Acrylic 20 x 20 in', title: 'Do you know what they say about Black bodies in the moonlight?', about: 'They glow' },
]

const workshops = [
  {
    id: 1,
    title: 'BIPOC Gallery Day',
    description: 'A day dedicated to showcasing the work of BIPOC artists, with gallery tours, artist talks, and networking opportunities.',
    location: 'Art Space, 378 Alymer St N, Peterborough',
    date: 'July 19, 2025',
    status: 'Past',
  },
  {
    id: 2,
    title: 'Paint it Black',
    description: 'A workshop designed for co-creation, arts and crafts  in a closed Black space. This workshop was hosted in support of Community Race Relations Committee Peterborough, Trent Center for Gender and Social Justice, BLMNogo, TCSA, OPIRIG and Artspace ptbo.',
    location: 'Art Space, 378 Alymer St N, Peterborough',
    date: 'February 28, 2026',
    status: 'past',
  },
  {
    id: 3,
    title: 'EXPLOITATION OF IMMIGRANTS: A COUNTER PUBLIC CONVERSATION',
    description: 'A series of workshops designed to counter public dominated discourse that centers topics important to marginalized groups that seeks to activate public spaces, critical dialogue and decolonise knowledge making to center oral tradition. The topic of this conversation explored the exploitation of immigrants in so called Canada. Opened by Mauricio Interiano and Dr Kate Norlock TPS Coffee House, Philosophy Department ',
    location: 'TPS Coffee House.',
    date: 'March 13, 2025',
    status: 'past',
  },
  { id: 4,
    title: 'Gender Affirming  Care: A Counter Public Conversation',
    description: 'A series of workshops designed to counter public dominated discourse that centers topics important to marginalized groups that seeks to activate public spaces, critical dialogue and decolonise knowledge making to center oral tradition. The topic of this conversation explored what gender affirming care is and how necessary free and low barrier access to services of gender affirming care remain. Opened by Dr.Byron Stoyles and Dr. Nicole Fice TPS Coffee House, Philosophy Department ',
    location: 'TPS Coffee House.',
    date: 'March 15, 2025',
    status: 'upcoming',
  },
  { id: 5,
    title: 'Intersections of Indigenous Sovereignty, Black Liberation, reparations and allyship: A Counter Public Conversation ',
    description: 'A series of workshops designed to counter public dominated discourse that centers topics important to marginalized groups that seeks to activate public spaces, critical dialogue and decolonise knowledge making to center oral tradition. The topic of this conversation explored Intersections of Indigenous Sovereignty, Black Liberation, reparations and allyship. This exposed the interstices  of oppression that are connected under racial capitalism that calls for repair and reimaging. Opened by Mshkiki Gitigaan Kwe TPS Coffee House, Philosophy Department ',
    location: 'TPS Coffee House.',
    date: 'March 17, 2025',
    status: 'upcoming',
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
  const [lightboxImage, setLightboxImage] = useState<typeof galleryImages[0] | null>(null)

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

        {/* {activeSection === 'workshops' && (
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
                    <span className={`text-sm px-3 py-1 rounded-full ${workshop.status === 'upcoming'
                        ? 'bg-gold/20 text-gold'
                        : 'bg-cream/10 text-cream/50'
                      }`}>
                      {workshop.status === 'upcoming' ? 'Upcoming' : 'Past'}
                    </span>
                  </div>
                  <p className="text-cream/70 mb-4 text-justify">{workshop.description}</p>
                  <p className="text-cream/50 text-sm mb-6">{workshop.location}</p>
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
        )} */}

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
