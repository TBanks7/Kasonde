import { getPayloadClient } from '../../payload/getPayloadClient'
import HomePageClient from './HomePageClient'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const payload = await getPayloadClient()
  const homepage = await payload.findGlobal({ slug: 'homepage', depth: 1 })

  const heroImages = (homepage.heroImages ?? [])
    .filter((entry: any) => entry.image && typeof entry.image === 'object')
    .map((entry: any) => ({
      src: (entry.image as { url: string }).url,
      alt: entry.alt || 'Kasonde',
    }))

  const aboutParagraphs = (homepage.aboutParagraphs ?? []).map((entry: any) => entry.text as string)

  return (
    <HomePageClient
      heroName={homepage.heroName || 'Kasonde Mutale'}
      heroTagline={homepage.heroTagline || 'Artist · Philosopher · Storyteller'}
      heroImages={heroImages}
      aboutParagraphs={aboutParagraphs}
    />
  )
}
