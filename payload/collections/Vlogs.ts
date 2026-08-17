import type { CollectionConfig } from 'payload'

export const Vlogs: CollectionConfig = {
  slug: 'vlogs',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date'],
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'youtubeId',
      type: 'text',
      required: true,
      admin: {
        description: 'The YouTube video ID (the part after "v=" in the URL).',
      },
    },
  ],
}
