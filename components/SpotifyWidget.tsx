'use client'

import { useState, useEffect } from 'react'
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

export default function SpotifyWidget() {
  const [track, setTrack] = useState<Track>(DEFAULT_TRACK)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setTrack(data)
      } catch (error) {
        console.error('Error fetching Spotify data:', error)
        // Keep showing default/last known track on error
      } finally {
        setLoading(false)
      }
    }

    fetchNowPlaying()

    // Poll every 30 seconds
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed top-6 right-6 z-50 hidden md:block">
      <div className="bg-surface/80 backdrop-blur-md border border-cream/10 rounded-lg p-3 max-w-[280px] shadow-2xl hover:border-gold/30 transition-all duration-300">
        <div className="flex items-center gap-3">
          {/* Album Art */}
          <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
            {loading ? (
              <div className="w-full h-full bg-cream/10 animate-pulse rounded" />
            ) : (
              <Image
                src={track.imageUrl}
                alt={track.album}
                fill
                sizes="48px"
                className="object-cover"
              />
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <div className="text-xs text-gold/60 mb-0.5 tracking-wider uppercase">
              {loading ? (
                <span className="inline-block w-16 h-2.5 bg-cream/10 animate-pulse rounded" />
              ) : track.isPlaying ? (
                'Now Playing'
              ) : (
                'Last Played'
              )}
            </div>
            <div className="text-sm text-cream font-medium truncate">
              {loading ? (
                <span className="inline-block w-28 h-3 bg-cream/10 animate-pulse rounded" />
              ) : (
                track.name
              )}
            </div>
            <div className="text-xs text-cream/50 truncate">
              {loading ? (
                <span className="inline-block w-20 h-2.5 bg-cream/10 animate-pulse rounded mt-0.5" />
              ) : (
                track.artist
              )}
            </div>
          </div>

          {/* Equalizer / Pause icon */}
          <div className="flex items-end gap-0.5 h-4 flex-shrink-0">
            {track.isPlaying && !loading ? (
              <>
                <div className="w-0.5 bg-gold equalizer-bar rounded-full" />
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