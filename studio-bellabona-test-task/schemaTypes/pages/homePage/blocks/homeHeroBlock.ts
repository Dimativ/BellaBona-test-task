import {defineType, defineField, defineArrayMember} from 'sanity'

export const homeHeroBlock = defineType({
  name: 'homeHeroBlock',
  title: 'Home Hero Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'localeText',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'linksImgs',
      title: 'Links With Images',
      type: 'array',
      description: 'App store / rating badges at the bottom of the image.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'linkImg',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
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
            select: {media: 'image', link: 'link'},
            prepare: ({media, link}) => ({title: link || 'Link', media}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Home Hero', subtitle: 'Home Hero Block'}),
  },
})
