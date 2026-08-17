import type { CollectionConfig } from 'payload'

export const InstagramPosts: CollectionConfig = {
  slug: 'instagram-posts',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'image',
    defaultColumns: ['image', 'order'],
    description: '"Latest on Instagram" grid on the Socials page — upload a photo here whenever you post to Instagram.',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      filterOptions: {
        mimeType: { contains: 'image' },
      },
    },
    {
      name: 'link',
      type: 'text',
      admin: {
        description: 'Optional: link to the actual Instagram post.',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Controls display order (lower shows first).',
      },
    },
  ],
}
