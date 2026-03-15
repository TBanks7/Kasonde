'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import SpotifyWidget from '@/components/SpotifyWidget'

interface Tile {
  id: string
  title: string
  subtitle: string
  href: string
  image: string
  size: string // grid size classes
}

const tiles: Tile[] = [
  {
    id: 'art',
    title: 'Art',
    subtitle: 'Galleries · Drag',
    href: '/art',
    image: '/art.webp',
    size: 'col-span-2 row-span-2', // Largest - 2x2
  },
  {
    id: 'thoughts',
    title: 'Thoughts',
    subtitle: 'Think pieces · Academia',
    href: '/essays',
    image: '/essay.webp',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 'radio',
    title: 'I like to think',
    subtitle: 'Storytelling · interviews · reflections',
    href: '/radio',
    image: '/iliketothink.webp',
    size: 'col-span-1 row-span-1',
  },
  {
    id: 'vlogs',
    title: 'Vlogs',
    subtitle: 'Life in motion',
    href: '/vlogs',
    image: '/vlog.webp',
    size: 'col-span-2 row-span-1 lg:col-span-1 lg:row-span-2', // Tall on lg, full width on smaller
  },
  {
    id: 'events',
    title: 'Events',
    subtitle: 'What\'s coming up',
    href: '/events',
    image: '/events.webp',
    size: 'sm:col-span-1 row-span-1 col-span-2 row-span-1 lg:col-span-2 lg:row-span-1', // Wide
  },
  {
    id: 'socials',
    title: 'Socials',
    subtitle: 'Find me everywhere',
    href: '/socials',
    image: '/socials.webp',
    size: 'col-span-2 sm:col-span-1 lg:col-span-2 row-span-1',
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Say hello',
    href: '/contact',
    image: '/contact.webp',
    size: 'col-span-1 row-span-1',
  },
]

function NavigationTile({ tile, index }: { tile: Tile; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className={tile.size}
    >
      <Link
        href={tile.href}
        className="block relative h-full min-h-[200px] overflow-hidden rounded-lg group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={tile.image}
            alt={tile.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        {/* Dark Overlay */}
        <div 
          className="absolute inset-0 bg-background/60 transition-all duration-500"
          style={{
            backgroundColor: isHovered ? 'rgba(79, 112, 255, 0.3)' : 'rgba(10, 14, 26, 0.6)',
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-cream mb-2 relative inline-block">
            {tile.title}
            <span 
              className="absolute bottom-0 left-0 h-0.5 bg-gold transition-all duration-500"
              style={{ width: isHovered ? '100%' : '0%' }}
            />
          </h3>
          <p className="text-cream/70 text-sm tracking-wide uppercase">
            {tile.subtitle}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse">
      
      <SpotifyWidget />
      {/* LEFT HALF - Photo & Info */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="lg:w-1/2 relative h-[70vh] lg:h-screen lg:sticky lg:top-0"
      >
        {/* Photo */}
        <div className="absolute inset-0">
          <Image
            src="/kas.webp"
            alt="Kasonde"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Text Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-6xl lg:text-8xl font-bold text-cream mb-4 tracking-wide"
          >
            Kasonde Mutale
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gold tracking-[0.3em] uppercase text-sm mb-6"
          >
            Artist · Philosopher  · Storyteller 
          </motion.p>

            <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-cream/70 text-base max-w-md leading-relaxed space-y-4"
            >
            {/*<p>Kasonde Mutale is a Bemba artist, philosopher and storyteller from Zambia. A multidisciplinary artist working across audio, visual, and performance art, her practice is grounded in Black radical existentialism. Her work unfolds through visual storytelling, embodied performance, and philosophical inquiry, asking what it means to live, refuse, and become in the wake of Black negation.</p>
            
             <p>Resisting erasure, Mutale insists on presence, memory, and radical possibility, using palettes, whimsical distortions, and meticulous detail to explore the tensions of Black existence, self-fashioning, survival, and joy. She holds an Honours degree in Philosophy and draws from Black existential and feminist thinkers such as bell hooks, Frantz Fanon, and other radical theorists to inform both her conceptual frameworks and aesthetic choices. Her primary visual mediums include oil and acrylic painting, mixed-media collage, pen, and pencil.</p>
            
            <p>Her storytelling includes hosting the radio show I Like To Think, an ongoing platform for collective and personal reflection spanning social, political, and intimate terrains. Through laughing, listening, and critique, she explores what it means to exist, extending an ubuntu-influenced lens that recognizes the self through others. She invites friends and community to think and share alongside her.</p>
            
            <p>In performance, she explores identity through drag, curating the persona PuSsay—a destabilizing figure that disrupts gender norms while honoring Black digital creators who shaped her imagination. As a community engagement specialist, Mutale is committed to collective practice and facilitates community workshops centred on shared making, anti-consumerist values, and art as trade, dialogue, and connection.</p>
            
            <p>Loyal to being "a jack of all trades," she offers everything from service, research, and transformational development to volunteering, consulting, programming, and creative vision. A small universe with many suns.</p>
            
            <p>Hi friend..</p> */}
            </motion.p>
        </div>
      </motion.div>

      {/* RIGHT HALF - Tile Grid */}
      <div className="lg:w-1/2 p-6 lg:p-12 flex items-center">
        <div className="w-full max-w-3xl mx-auto">
          {/* Grid Container */}
          <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-dense gap-4 auto-rows-[200px]">
            {tiles.map((tile, index) => (
              <NavigationTile key={tile.id} tile={tile} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
