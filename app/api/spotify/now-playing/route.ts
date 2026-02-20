import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const accessToken = process.env.ACCESS_TOKEN!

    // 1. Try currently playing
    const nowPlayingRes = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
    { 
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
    }
    )

    if (nowPlayingRes.status === 200) {
      const data = await nowPlayingRes.json()
      if (data?.item) {
        return NextResponse.json({
          name: data.item.name,
          artist: data.item.artists.map((a: any) => a.name).join(', '),
          album: data.item.album.name,
          imageUrl: data.item.album.images[0]?.url ?? null,
          isPlaying: data.is_playing,
        })
      }
    }

    // 2. Fall back to recently played
    const recentRes = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=1',
      { headers: { Authorization: `Bearer ${accessToken}` }, cache: 'no-store', }
    )
    const recentData = await recentRes.json()

    // Log so you can see exactly what Spotify returned
    console.log('recently-played response:', JSON.stringify(recentData, null, 2))

    if (!recentRes.ok) {
      console.error('recently-played error:', recentData)
      return NextResponse.json(
        { error: recentData.error?.message ?? 'Spotify error' },
        { status: recentRes.status }
      )
    }

    const item = recentData?.items?.[0]?.track
    if (!item) {
      return NextResponse.json(
        { error: 'No listening history found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      name: item.name,
      artist: item.artists.map((a: any) => a.name).join(', '),
      album: item.album.name,
      imageUrl: item.album.images[0]?.url ?? null,
      isPlaying: false,
    })
  } catch (err: any) {
    console.error('now-playing route error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}