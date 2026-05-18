import {defineType, defineField} from 'sanity'

export const meal = defineType({
  name: 'meal',
  title: 'Meal',
  type: 'document',
  fields: [
    defineField({
      name: 'cardImage',
      title: 'Card Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => (doc as {name?: {en?: string}}).name?.en || '',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'mealCategory'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cardReviewString',
      title: 'Card Review String',
      type: 'localeString',
      description: 'e.g. "94% (171 reviews)"',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      en: 'name.en',
      media: 'cardImage',
      cat: 'category.title.en',
      seoIndex: 'seo.index',
      seoFollow: 'seo.follow',
    },
    prepare: ({en, media, cat, seoIndex, seoFollow}) => {
      const idx = seoIndex === 'noindex' ? '🔴' : '🟢'
      const fol = seoFollow === 'nofollow' ? '🔴' : '🟢'
      const parts = [cat, `${idx} index · ${fol} follow`].filter(Boolean)
      return {title: en || 'Meal', subtitle: parts.join(' · '), media}
    },
  },
})
