import { getPayloadClient } from '../../../payload/getPayloadClient'
import SocialsPageClient from './SocialsPageClient'

export const dynamic = 'force-dynamic'

export default async function SocialsPage() {
  const payload = await getPayloadClient()
  const [siteSettings, instagramResult] = await Promise.all([
    payload.findGlobal({ slug: 'site-settings', depth: 0 }),
    payload.find({ collection: 'instagram-posts', sort: 'order', depth: 1, limit: 200 }),
  ])

  const socials = (siteSettings.socialLinks ?? []).map((entry: any) => ({
    platform: entry.platform,
    handle: entry.handle,
    url: entry.url,
  }))

  const instagramPosts = instagramResult.docs
    .filter((doc) => doc.image && typeof doc.image === 'object')
    .map((doc) => ({
      id: doc.id,
      url: (doc.image as { url: string }).url,
      link: doc.link || 'https://instagram.com/kasonde_m',
    }))

  return <SocialsPageClient socials={socials} instagramPosts={instagramPosts} />
}
