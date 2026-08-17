'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

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
    size: 'col-span-1 sm:col-span-1 lg:col-span-1 row-span-1',
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Say hello',
    href: '/contact',
    image: '/contact.webp',
    size: 'col-span-1 row-span-1 sm:col-span-2 row-span-1 lg:col-span-1 row-span-1', // Full width on sm, normal on lg
  },
]

interface HeroImage {
  src: string
  alt: string
}

function HeroCarousel({ images }: { images: HeroImage[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length < 2) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="absolute inset-0">
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  )
}

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

interface HomePageClientProps {
  heroName: string
  heroTagline: string
  heroImages: HeroImage[]
  aboutParagraphs: string[]
}

export default function HomePageClient({
  heroName,
  heroTagline,
  heroImages,
  aboutParagraphs,
}: HomePageClientProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="min-h-screen flex flex-col lg:flex-row-reverse">

      {/* <SpotifyWidget /> */}
      {/* LEFT HALF - Photo & Info */}
      <div className="lg:w-1/2 relative h-[90vh] lg:h-screen lg:sticky lg:top-0 perspective-1500">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          onClick={() => setIsFlipped((prev) => !prev)}
          className="w-full h-full relative cursor-pointer"
          style={{ transformStyle: 'preserve-3d', touchAction: 'pan-y' }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
              pointerEvents: isFlipped ? 'none' : 'auto',
            }}
          >
            <HeroCarousel images={heroImages} />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-serif text-6xl lg:text-8xl font-bold text-cream mb-4 tracking-wide"
              >
                {heroName}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="text-gold tracking-[0.3em] uppercase text-sm mb-6"
              >
                {heroTagline}
              </motion.p>
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 rounded-none bg-background/95 p-6 overflow-auto"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              pointerEvents: isFlipped ? 'auto' : 'none',
            }}
          >
            <div className="h-fit w-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-cream mb-4">About Kasonde</h2>
              {aboutParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-cream/80 ${index < aboutParagraphs.length - 1 ? 'mb-3' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div style={{ backfaceVisibility: 'hidden' }} />
        </motion.div>
      </div>

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
