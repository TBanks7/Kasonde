import type { CollectionConfig } from 'payload'

export const Essays: CollectionConfig = {
  slug: 'essays',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'group', 'date'],
    description: 'Static essays only. Medium-sourced "Think Pieces" are pulled live from the Medium RSS feed and are not managed here.',
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'group',
      type: 'select',
      required: true,
      defaultValue: 'academia',
      options: [
        { label: 'Think Piece', value: 'think-pieces' },
        { label: 'Academia', value: 'academia' },
      ],
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'date',
      type: 'date',
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'readTime',
      type: 'text',
      admin: {
        description: 'e.g. "15 min"',
      },
    },
    {
      name: 'linkType',
      type: 'select',
      required: true,
      defaultValue: 'pdf',
      options: [
        { label: 'PDF upload', value: 'pdf' },
        { label: 'External URL', value: 'url' },
      ],
    },
    {
      name: 'file',
      type: 'upload',
      relationTo: 'media',
      filterOptions: {
        mimeType: { contains: 'pdf' },
      },
      admin: {
        condition: (data) => data?.linkType === 'pdf',
      },
    },
    {
      name: 'externalUrl',
      type: 'text',
      admin: {
        condition: (data) => data?.linkType === 'url',
      },
    },
  ],
}
