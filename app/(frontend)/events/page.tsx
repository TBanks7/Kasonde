import { getPayloadClient } from '../../../payload/getPayloadClient'
import EventsPageClient from './EventsPageClient'

export const dynamic = 'force-dynamic'

function formatDate(dateStr?: string | null): string {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function EventsPage() {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'events',
    sort: 'date',
    depth: 0,
    limit: 200,
  })

  const events = docs.map((doc) => ({
    id: doc.id,
    title: doc.title || '',
    description: doc.description || '',
    location: doc.location || '',
    date: formatDate(doc.date),
    time: doc.time || '',
  }))

  return <EventsPageClient events={events} />
}
