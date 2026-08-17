import { getPayloadClient } from '../../../payload/getPayloadClient'
import ContactPageClient from './ContactPageClient'

export const dynamic = 'force-dynamic'

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const siteSettings = await payload.findGlobal({ slug: 'site-settings', depth: 0 })

  return <ContactPageClient contactEmail={siteSettings.contactEmail || ''} />
}
