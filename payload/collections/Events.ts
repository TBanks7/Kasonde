import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location'],
  },
  defaultSort: 'date',
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
      name: 'location',
      type: 'text',
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly' },
        description: 'Upcoming vs. past is worked out automatically from this date.',
      },
    },
    {
      name: 'time',
      type: 'text',
      admin: {
        description: 'Free-text time range, e.g. "2:00 PM - 6:00 PM"',
      },
    },
  ],
}
