import {defineType, defineField, defineArrayMember} from 'sanity'

export const stepsBlock = defineType({
  name: 'stepsBlock',
  title: 'Steps Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({
              name: 'tagline',
              title: 'Tagline',
              type: 'localeString',
              description: 'e.g. "Step 01"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              description: 'Bake any background into the asset.',
              options: {hotspot: true},
              fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localeString',
            }),
          ],
          preview: {
            select: {tag: 'tagline.en', en: 'title.en', media: 'image'},
            prepare: ({tag, en, media}) => ({title: en || 'Step', subtitle: tag || '', media}),
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Steps Block', subtitle: 'Steps Block'}),
  },
})
