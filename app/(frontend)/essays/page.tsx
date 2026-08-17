import { getPayloadClient } from '../../../payload/getPayloadClient'
import EssaysPageClient, { type Essay } from './EssaysPageClient'

export const dynamic = 'force-dynamic'

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function EssaysPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'essays',
    sort: '-date',
    depth: 1,
    limit: 200,
  })

  const staticEssays: Essay[] = docs.map((doc) => ({
    id: String(doc.id),
    title: doc.title || '',
    group: doc.group,
    tags: doc.tags || [],
    excerpt: doc.excerpt || '',
    date: formatDate(doc.date),
    readTime: doc.readTime || '',
    link:
      doc.linkType === 'pdf'
        ? doc.file && typeof doc.file === 'object'
          ? (doc.file as { url: string }).url
          : ''
        : doc.externalUrl || '',
    linkType: doc.linkType,
  }))

  return <EssaysPageClient initialEssays={staticEssays} />
}
