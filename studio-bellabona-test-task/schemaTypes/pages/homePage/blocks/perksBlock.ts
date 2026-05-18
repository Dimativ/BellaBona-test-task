import {defineType, defineField, defineArrayMember} from 'sanity'

export const perksBlock = defineType({
  name: 'perksBlock',
  title: 'Perks Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cards',
      title: 'Stat Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'perkCard',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'localeString',
              description: 'e.g. "30-40%", "7,50 €", "92%"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'valueLabel',
              title: 'Value Label',
              type: 'localeString',
              description: 'Short label under the value.',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'localeString',
            }),
          ],
          preview: {
            select: {value: 'value.en', label: 'valueLabel.en'},
            prepare: ({value, label}) => ({title: value || 'Card', subtitle: label || ''}),
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'feature',
          fields: [
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
            select: {en: 'title.en'},
            prepare: ({en}) => ({title: en || 'Feature'}),
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Perks Block', subtitle: 'Perks Block'}),
  },
})
