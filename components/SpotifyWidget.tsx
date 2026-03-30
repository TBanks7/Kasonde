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

// Gold-themed Spotify icon
function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  )
}

function SpotifyWidget() {
  const [track, setTrack] = useState<Track>(DEFAULT_TRACK)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing')
        if (!response.ok) throw new Error('Failed to fetch')
        const data = await response.json()
        setTrack(data)
      } catch (error) {
        console.error('Error fetching Spotify data:', error)
      }
    }

    const timer = setTimeout(fetchNowPlaying, 100)
    const interval = setInterval(fetchNowPlaying, 30000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="fixed top-6 right-6 z-50">

      {/* ── DESKTOP (md+): always full widget ── */}
      <div className="hidden md:block">
        <FullWidget track={track} />
      </div>

      {/* ── MOBILE: collapsed pill → expanded on tap ── */}
      <div className="md:hidden">
        {expanded ? (
          <div
            className="animate-in fade-in slide-in-from-top-2 duration-200"
            // Collapse when tapping outside
            onBlur={() => setExpanded(false)}
          >
            <FullWidget track={track} onClose={() => setExpanded(false)} />
          </div>
        ) : (
          <button
            onClick={() => setExpanded(true)}
            aria-label="Expand now playing"
            className="flex items-center gap-2 bg-surface/80 backdrop-blur-md border border-cream/10 rounded-full px-3 py-2 shadow-2xl hover:border-gold/30 active:scale-95 transition-all duration-200"
          >
            <SpotifyIcon className="w-4 h-4 text-gold" />

            {/* Mini equalizer / pause */}
            <div className="flex items-end gap-0.5 h-3.5 flex-shrink-0">
              {track.isPlaying ? (
                <>
                  <div className="w-0.5 bg-gold equalizer-bar rounded-full" />
                  <div className="w-0.5 bg-gold equalizer-bar rounded-full" />
                  <div className="w-0.5 bg-gold equalizer-bar rounded-full" />
                </>
              ) : (
                <svg
                  className="w-4 h-4 text-gold/40"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                </svg>
              )}
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

// ── Shared full widget ──────────────────────────────────────────────────────
function FullWidget({
  track,
  onClose,
}: {
  track: Track
  onClose?: () => void
}) {
  return (
    <div
      className="bg-surface/80 backdrop-blur-md border border-cream/10 rounded-lg p-3 max-w-[280px] shadow-2xl hover:border-gold/30 transition-all duration-300"
      // On mobile, tapping anywhere on the expanded card collapses it
      onClick={onClose}
    >
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
          <div className="flex items-center gap-1.5 mb-0.5">
            <SpotifyIcon className="w-3 h-3 text-gold/60 flex-shrink-0" />
            <span className="text-xs text-gold/60 tracking-wider uppercase">
              {track.isPlaying ? 'Now Playing' : 'Last Played'}
            </span>
          </div>
          <div className="text-sm text-cream font-medium truncate">
            {track.name}
          </div>
          <div className="text-xs text-cream/50 truncate">{track.artist}</div>
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
            <svg
              className="w-4 h-4 text-gold/40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(SpotifyWidget)