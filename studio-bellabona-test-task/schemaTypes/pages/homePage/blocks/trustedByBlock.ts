import {defineType, defineField, defineArrayMember} from 'sanity'

export const trustedByBlock = defineType({
  name: 'trustedByBlock',
  title: 'Trusted By Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      description: 'e.g. "Loved by +X00 customers".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'logo',
          fields: [
            defineField({
              name: 'image',
              title: 'Logo',
              type: 'image',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'url',
              validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
            }),
          ],
          preview: {
            select: {media: 'image', link: 'link', alt: 'image.alt'},
            prepare: ({media, link, alt}) => ({title: alt || link || 'Logo', media}),
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Trusted By', subtitle: 'Trusted By Block'}),
  },
})
