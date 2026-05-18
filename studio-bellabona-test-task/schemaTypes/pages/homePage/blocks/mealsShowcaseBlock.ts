import {defineType, defineField, defineArrayMember} from 'sanity'

export const mealsShowcaseBlock = defineType({
  name: 'mealsShowcaseBlock',
  title: 'Meals Showcase Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'meals',
      title: 'Meals',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'meal'}],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'localeString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'file',
          title: 'File (PDF)',
          type: 'file',
          options: {accept: 'application/pdf'},
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'color',
          title: 'Button Color',
          type: 'string',
          options: {
            list: [
              {title: 'Green', value: 'green'},
              {title: 'Dark Green', value: 'darkGreen'},
              {title: 'Light Green', value: 'lightGreen'},
              {title: 'Red', value: 'red'},
            ],
            layout: 'radio',
          },
          initialValue: 'green',
        }),
      ],
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Meals Showcase', subtitle: 'Meals Showcase Block'}),
  },
})
