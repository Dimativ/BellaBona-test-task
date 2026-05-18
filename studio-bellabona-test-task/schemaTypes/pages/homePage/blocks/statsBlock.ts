import {defineType, defineField, defineArrayMember} from 'sanity'

export const statsBlock = defineType({
  name: 'statsBlock',
  title: 'Stats Block',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'statItem',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'localeString',
              description: 'e.g. "9/10", "30-40%", "1.2 MM"',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'localeString',
              description: 'e.g. "Employee Satisfaction"',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {value: 'value.en', label: 'label.en'},
            prepare: ({value, label}) => ({title: value || 'Stat', subtitle: label || ''}),
          },
        }),
      ],
      validation: (Rule) => Rule.min(1).max(6),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Stats Block'}),
  },
})
