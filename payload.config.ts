import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './payload/collections/Users'
import { Media } from './payload/collections/Media'
import { Art } from './payload/collections/Art'
import { RadioEpisodes } from './payload/collections/RadioEpisodes'
import { Vlogs } from './payload/collections/Vlogs'
import { Events } from './payload/collections/Events'
import { Essays } from './payload/collections/Essays'
import { InstagramPosts } from './payload/collections/InstagramPosts'
import { Homepage } from './payload/globals/Homepage'
import { SiteSettings } from './payload/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || '',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  routes: {
    admin: '/admin',
    api: '/payload-api',
  },
  graphQL: {
    disable: true,
  },
  collections: [Users, Media, Art, RadioEpisodes, Vlogs, Events, Essays, InstagramPosts],
  globals: [Homepage, SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
