import {defineType, defineField} from 'sanity'

export const mealCategory = defineType({
  name: 'mealCategory',
  title: 'Meal Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => (doc as {title?: {en?: string}}).title?.en || '',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {en: 'title.en', seoIndex: 'seo.index', seoFollow: 'seo.follow'},
    prepare: ({en, seoIndex, seoFollow}) => {
      const idx = seoIndex === 'noindex' ? '🔴' : '🟢'
      const fol = seoFollow === 'nofollow' ? '🔴' : '🟢'
      return {title: en || 'Meal Category', subtitle: `${idx} index · ${fol} follow`}
    },
  },
})
