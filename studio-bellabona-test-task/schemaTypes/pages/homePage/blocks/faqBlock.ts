import {defineType, defineField, defineArrayMember} from 'sanity'

export const faqBlock = defineType({
  name: 'faqBlock',
  title: 'FAQ Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [defineArrayMember({type: 'faq'})],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'FAQ', subtitle: 'FAQ Block'}),
  },
})
