import {defineType, defineField} from 'sanity'

export const social = defineType({
  name: 'social',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'svgIcon',
      title: 'Icon',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'URL',
      type: 'url',
      description: 'Full URL to the social profile.',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'link',
    },
  },
})
