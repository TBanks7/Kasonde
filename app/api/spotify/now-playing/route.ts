import { NextResponse } from 'next/server'

const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: process.env.REFRESH_TOKEN!,
      client_id: process.env.CLIENT_ID!,
      client_secret: process.env.CLIENT_SECRET!,
    }),
  })
  const data = await response.json()
  return data.access_token
}

export async function GET() {
  const accessToken = await getAccessToken()

  // Try currently playing first
  const nowPlayingRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })

  if (nowPlayingRes.status === 200) {
    const data = await nowPlayingRes.json()
    if (data?.item) {
      return NextResponse.json({
        name: data.item.name,
        artist: data.item.artists.map((a: any) => a.name).join(', '),
        album: data.item.album.name,
        imageUrl: data.item.album.images[0]?.url,
        isPlaying: data.is_playing,
      })
    }
  }

  // Fall back to recently played
  const recentRes = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: 'no-store',
  })
  const recentData = await recentRes.json()
  const track = recentData.items[0].track

  return NextResponse.json({
    name: track.name,
    artist: track.artists.map((a: any) => a.name).join(', '),
    album: track.album.name,
    imageUrl: track.album.images[0]?.url,
    isPlaying: false,
  })
}