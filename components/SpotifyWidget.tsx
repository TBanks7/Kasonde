'use client'

import { useState, useEffect, memo } from 'react'
import Image from 'next/image'

interface Track {
  name: string
  artist: string
  album: string
  imageUrl: string
  isPlaying: boolean
}

const DEFAULT_TRACK: Track = {
  name: 'Sunset Drive',
  artist: 'Midnight Colors',
  album: 'Urban Dreams',
  imageUrl: '/sunset.webp',
  isPlaying: false,
}

function SpotifyWidget() {
  const [track, setTrack] = useState<Track>(DEFAULT_TRACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false) // Don't block initial render
    
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setTrack(data)
      } catch (error) {
        console.error('Error fetching Spotify data:', error)
        // Keep showing default/last known track on error
      }
    }

    // Fetch after initial render to avoid blocking
    const timer = setTimeout(fetchNowPlaying, 100)

    // Poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed top-6 right-6 z-50 hidden md:block">
      <div className="bg-surface/80 backdrop-blur-md border border-cream/10 rounded-lg p-3 max-w-[280px] shadow-2xl hover:border-gold/30 transition-all duration-300">
        <div className="flex items-center gap-3">
          {/* Album Art */}
          <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
            <Image
              src={track.imageUrl}
              alt={track.album}
              fill
              sizes="48px"
              className="object-cover"
              loading="lazy"
            />
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gold/60 mb-0.5 tracking-wider uppercase">
              {track.isPlaying ? (
                'Now Playing'
              ) : (
                'Last Played'
              )}
            </div>
            <div className="text-sm text-cream font-medium truncate">
              {track.name}
            </div>
            <div className="text-xs text-cream/50 truncate">
              {track.artist}
            </div>
          </div>

          {/* Equalizer / Pause icon */}
          <div className="flex items-end gap-0.5 h-4 flex-shrink-0">
            {track.isPlaying ? (
              <>
                <div className="w-0.5 bg-gold equalizer-bar rounded-full" />
                <div className="w-0.5 bg-gold equalizer-bar rounded-full" />
                <div className="w-0.5 bg-gold equalizer-bar rounded-full" />
              </>
            ) : (
              <svg className="w-4 h-4 text-gold/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(SpotifyWidget)