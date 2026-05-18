import {defineType, defineField} from 'sanity'

export const faq = defineType({
  name: 'faq',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'localeText',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {q: 'question.en'},
    prepare: ({q}) => ({title: q || 'FAQ Item'}),
  },
})
