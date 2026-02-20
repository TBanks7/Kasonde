import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code!,
      redirect_uri: 'http://127.0.0.1:3000/api/spotify/callback',
      client_id: process.env.CLIENT_ID!,
      client_secret: process.env.CLIENT_SECRET!,
    }),
  })

  const data = await response.json()
  // Log the refresh token — copy it into your .env!
  console.log('REFRESH TOKEN:', data.refresh_token)
  console.log('Access Token:', data.access_token)

  return NextResponse.json(data)
}