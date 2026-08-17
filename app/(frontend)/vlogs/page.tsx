import { getPayloadClient } from '../../../payload/getPayloadClient'
import VlogsPageClient from './VlogsPageClient'

export const dynamic = 'force-dynamic'

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function VlogsPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'vlogs',
    sort: '-date',
    depth: 1,
    limit: 200,
  })

  const vlogs = docs.map((doc) => ({
    id: doc.id,
    title: doc.title || '',
    date: formatDate(doc.date),
    thumbnail: doc.thumbnail && typeof doc.thumbnail === 'object' ? (doc.thumbnail as { url: string }).url : '',
    youtubeId: doc.youtubeId || '',
  }))

  return <VlogsPageClient vlogs={vlogs} />
}
