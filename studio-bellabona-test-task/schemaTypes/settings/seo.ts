import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'string',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description:
        "Leave empty to use this page's URL as the canonical. Fill in to set a different canonical URL.",
    }),
    defineField({
      name: 'follow',
      title: 'Follow',
      type: 'string',
      options: {
        list: [
          {title: '🟢 Follow', value: 'follow'},
          {title: '🔴 No Follow', value: 'nofollow'},
        ],
        layout: 'radio',
      },
      initialValue: 'follow',
    }),
    defineField({
      name: 'index',
      title: 'Index',
      type: 'string',
      options: {
        list: [
          {title: '🟢 Index', value: 'index'},
          {title: '🔴 No Index', value: 'noindex'},
        ],
        layout: 'radio',
      },
      initialValue: 'index',
    }),
  ],
})
