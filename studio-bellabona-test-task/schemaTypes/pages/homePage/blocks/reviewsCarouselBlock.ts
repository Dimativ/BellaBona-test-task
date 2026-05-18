import {defineType, defineField, defineArrayMember} from 'sanity'

export const reviewsCarouselBlock = defineType({
  name: 'reviewsCarouselBlock',
  title: 'Reviews Carousel Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'review'}],
        }),
      ],
      validation: (Rule) => Rule.min(1).max(20),
    }),
  ],
  preview: {
    select: {en: 'title.en'},
    prepare: ({en}) => ({title: en || 'Reviews Carousel', subtitle: 'Reviews Carousel Block'}),
  },
})
