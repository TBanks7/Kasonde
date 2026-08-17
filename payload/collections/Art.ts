import type { CollectionConfig } from 'payload'

export const Art: CollectionConfig = {
  slug: 'art',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'order'],
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'gallery',
      options: [
        { label: 'Galleries', value: 'gallery' },
        { label: 'Drag', value: 'drag' },
      ],
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        condition: (data) => data?.category === 'gallery',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'date',
      type: 'text',
      admin: {
        condition: (data) => data?.category === 'gallery',
        description: 'Free-text date, e.g. "August 2020"',
      },
    },
    {
      name: 'style',
      type: 'text',
      admin: {
        condition: (data) => data?.category === 'gallery',
        description: 'e.g. "Chalk on paper 33.1 x 46.8 in"',
      },
    },
    {
      name: 'about',
      type: 'textarea',
      admin: {
        condition: (data) => data?.category === 'gallery',
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
