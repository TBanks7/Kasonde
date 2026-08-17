import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*', 'audio/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: {
        condition: (_data, siblingData) =>
          typeof siblingData?.mimeType === 'string' && siblingData.mimeType.startsWith('image/'),
      },
    },
  ],
}
