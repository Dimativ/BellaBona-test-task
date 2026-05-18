import {defineType, defineField, defineArrayMember} from 'sanity'

export const navItem = defineType({
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'string',
      description: 'e.g. /daily-lunch. Leave empty for a non-clickable mega menu trigger.',
    }),
    defineField({
      name: 'isMegaMenu',
      title: 'Mega Menu',
      description: 'Show dropdown with sub-items.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'subItems',
      title: 'Sub-items',
      description: 'Manual sub-items shown in dropdown.',
      type: 'array',
      hidden: ({parent}) => !parent?.isMegaMenu,
      of: [
        defineArrayMember({
          type: 'object',
          name: 'subNavLink',
          fields: [
            defineField({
              name: 'title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {en: 'title.en', subtitle: 'href'},
            prepare: ({en, subtitle}) => ({title: en || 'Sub-item', subtitle}),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {en: 'title.en', href: 'href', isMega: 'isMegaMenu'},
    prepare: ({en, href, isMega}) => ({
      title: en || 'Nav Item',
      subtitle: `${href || '—'}${isMega ? ' (mega)' : ''}`,
    }),
  },
})
