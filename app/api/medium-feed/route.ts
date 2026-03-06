import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { XMLParser } from 'fast-xml-parser'

// Simple interface for medium items
interface MediumItem {
    title: string
    link: string
    category?: string[]
    pubDate: string
    creator?: string
    content?: string
}

export async function GET(req: NextRequest) {
    try {
        const res = await fetch('https://medium.com/feed/@tbanks200110')
        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch Medium feed' }, { status: 502 })
        }

        const xml = await res.text()
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' })
        const json = parser.parse(xml)

        // RSS structure: rss.channel.item[]
        const items = json?.rss?.channel?.item
        const normalizedItems = items ? (Array.isArray(items) ? items : [items]) : []

        const feed: MediumItem[] = normalizedItems.map((it: any) => ({
            title: it.title,
            link: it.link,
            pubDate: it.pubDate,
            category: it.category ? (Array.isArray(it.category) ? it.category : [it.category]) : [],
            creator: it['dc:creator'],
            content: it['content:encoded'],
        }))


        return NextResponse.json({ feed })
    } catch (err) {
        console.error('Error parsing Medium feed', err)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
