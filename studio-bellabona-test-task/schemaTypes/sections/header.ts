import {defineType, defineField} from 'sanity'

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'document',
  fields: [
    defineField({
      name: 'navItems',
      title: 'Nav Items',
      type: 'array',
      of: [{type: 'navItem'}],
    }),
    defineField({
      name: 'menuButton',
      title: 'Menu Download Button',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'localeString',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'pdf',
          title: 'PDF File',
          type: 'file',
          options: {accept: 'application/pdf'},
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Header'}),
  },
})
