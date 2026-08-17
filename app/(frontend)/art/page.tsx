import { getPayloadClient } from '../../../payload/getPayloadClient'
import ArtPageClient from './ArtPageClient'

export const dynamic = 'force-dynamic'

export default async function ArtPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'art',
    sort: 'order',
    depth: 1,
    limit: 200,
  })

  const galleryImages = docs
    .filter((doc) => doc.category === 'gallery' && doc.image && typeof doc.image === 'object')
    .map((doc) => ({
      id: doc.id,
      url: (doc.image as { url: string }).url,
      date: doc.date || '',
      style: doc.style || '',
      title: doc.title || '',
      about: doc.about || '',
    }))

  const dragImages = docs
    .filter((doc) => doc.category === 'drag' && doc.image && typeof doc.image === 'object')
    .map((doc) => ({
      id: doc.id,
      url: (doc.image as { url: string }).url,
    }))

  return <ArtPageClient galleryImages={galleryImages} dragImages={dragImages} />
}
