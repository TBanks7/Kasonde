import { getPayloadClient } from '../../../payload/getPayloadClient'
import RadioPageClient from './RadioPageClient'

export const dynamic = 'force-dynamic'

export default async function RadioPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'radio-episodes',
    sort: 'order',
    depth: 1,
    limit: 200,
  })

  const audioEpisodes = docs.map((doc) => ({
    id: doc.id,
    title: doc.title || '',
    description: doc.description || '',
    duration: doc.duration || '',
    audioUrl: doc.audio && typeof doc.audio === 'object' ? (doc.audio as { url: string }).url : '',
    posterUrl: doc.poster && typeof doc.poster === 'object' ? (doc.poster as { url: string }).url : '',
  }))

  return <RadioPageClient audioEpisodes={audioEpisodes} />
}
