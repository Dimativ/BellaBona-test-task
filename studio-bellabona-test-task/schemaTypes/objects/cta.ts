import {defineType, defineField} from 'sanity'

export const cta = defineType({
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
      name: 'link',
      title: 'Link',
      type: 'string',
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
})
