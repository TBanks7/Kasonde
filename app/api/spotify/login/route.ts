import { redirect } from 'next/navigation'

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.CLIENT_ID!,
    response_type: 'code',
    redirect_uri: 'http://127.0.0.1:3000/api/spotify/callback',
    scope: 'user-read-recently-played user-read-currently-playing',
  })
  redirect(`https://accounts.spotify.com/authorize?${params}`)
}