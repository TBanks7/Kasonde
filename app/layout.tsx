import type { Metadata } from 'next'
import './globals.css'
import SpotifyWidget from '@/components/SpotifyWidget'
import BackToHome from '@/components/BackToHome'

export const metadata: Metadata = {
  title: 'Kasonde — Artist, Writer, Broadcaster',
  description: 'Multidisciplinary creative exploring art, writing, and broadcasting. Galleries, essays, radio shows, and more.',
  keywords: 'artist, writer, broadcaster, creative, galleries, essays, radio, vlogs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <BackToHome />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
