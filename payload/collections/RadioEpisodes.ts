import type { CollectionConfig } from 'payload'

export const RadioEpisodes: CollectionConfig = {
  slug: 'radio-episodes',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'duration', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'duration',
      type: 'text',
      admin: {
        description: 'Free-text display duration, e.g. "18:26"',
      },
    },
    {
      name: 'audio',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'audio' },
      },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'image' },
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
