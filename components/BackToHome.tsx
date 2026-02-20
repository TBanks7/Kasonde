'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BackToHome() {
  const pathname = usePathname()
  
  // Don't show on homepage
  if (pathname === '/') return null

  return (
    <Link 
      href="/"
      className="fixed top-6 left-6 z-50 group"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md border border-cream/10 flex items-center justify-center group-hover:border-gold/50 transition-all duration-300">
          <svg 
            className="w-5 h-5 text-cream/70 group-hover:text-gold transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </div>
        <div className="font-serif text-xl text-cream/80 group-hover:text-gold transition-colors tracking-wide hidden md:block">
          Kasonde
        </div>
      </div>
    </Link>
  )
}
