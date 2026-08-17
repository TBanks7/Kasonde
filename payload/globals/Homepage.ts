import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'heroName',
      type: 'text',
      defaultValue: 'Kasonde Mutale',
    },
    {
      name: 'heroTagline',
      type: 'text',
      defaultValue: 'Artist · Philosopher · Storyteller',
    },
    {
      name: 'heroImages',
      type: 'array',
      labels: { singular: 'Hero Photo', plural: 'Hero Photos' },
      admin: {
        description: 'The crossfading photo carousel on the homepage. Drag to reorder.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alt',
          type: 'text',
        },
      ],
    },
    {
      name: 'aboutParagraphs',
      type: 'array',
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      admin: {
        description: 'The "About Kasonde" bio shown on the back of the flip-card. Drag to reorder.',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
