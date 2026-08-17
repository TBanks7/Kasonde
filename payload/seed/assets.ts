import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

const MIME_TYPES: Record<string, string> = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.mp3': 'audio/mpeg',
  '.pdf': 'application/pdf',
}

function mimeTypeFor(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  return MIME_TYPES[ext] || 'application/octet-stream'
}

/** Builds a case-insensitive index of every file under public/, so references like
 * "/audio/ILike2ThinkwithTapspt2.mp3" resolve even when the real file on disk is
 * cased differently (a real bug found in the original hardcoded data — Windows dev
 * is case-insensitive, Vercel's Linux filesystem is not). */
function buildFileIndex(): Map<string, string> {
  const index = new Map<string, string>()

  function walk(dir: string, prefix: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), rel)
      } else {
        index.set(rel.toLowerCase(), rel)
      }
    }
  }

  walk(PUBLIC_DIR, '')
  return index
}

const fileIndex = buildFileIndex()
const mediaCache = new Map<string, { id: number | string; url: string }>()

/** Resolves a path as referenced in the old hardcoded data (e.g. "/audio/Foo.mp3")
 * against the real, correctly-cased file on disk. Returns null if genuinely missing. */
export function resolvePublicFile(referencedPath: string): string | null {
  const normalized = referencedPath.replace(/^\//, '')
  const match = fileIndex.get(normalized.toLowerCase())
  if (!match) return null
  return path.join(PUBLIC_DIR, match)
}

export type UploadResult = { id: number | string; url: string } | null

/** Uploads a local public/ file into the media collection, resolving case-insensitively
 * and reusing an existing media doc if the same file was already uploaded this run. */
export async function uploadLocalCached(
  payload: Payload,
  referencedPath: string,
  alt: string,
): Promise<UploadResult> {
  const cacheKey = referencedPath.toLowerCase()
  if (mediaCache.has(cacheKey)) return mediaCache.get(cacheKey)!

  const absPath = resolvePublicFile(referencedPath)
  if (!absPath) {
    console.warn(`[seed] MISSING FILE — no match on disk for "${referencedPath}", skipping.`)
    return null
  }

  const data = fs.readFileSync(absPath)
  const name = path.basename(absPath)
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data, mimetype: mimeTypeFor(name), name, size: data.length },
  })

  const result = { id: doc.id, url: doc.url as string }
  mediaCache.set(cacheKey, result)
  return result
}

/** Fetches a remote image (used for the drag-tab images, currently hotlinked from
 * Unsplash) and uploads it into the media collection so it's fully self-hosted. */
export async function uploadRemoteCached(
  payload: Payload,
  url: string,
  name: string,
  alt: string,
): Promise<UploadResult> {
  const cacheKey = url.toLowerCase()
  if (mediaCache.has(cacheKey)) return mediaCache.get(cacheKey)!

  const res = await fetch(url)
  if (!res.ok) {
    console.warn(`[seed] Failed to fetch remote image "${url}" (${res.status}), skipping.`)
    return null
  }
  const buf = Buffer.from(await res.arrayBuffer())
  const mimetype = res.headers.get('content-type') || 'image/jpeg'

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buf, mimetype, name, size: buf.length },
  })

  const result = { id: doc.id, url: doc.url as string }
  mediaCache.set(cacheKey, result)
  return result
}
