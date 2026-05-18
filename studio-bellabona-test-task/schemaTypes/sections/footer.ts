import {defineType, defineField, defineArrayMember} from 'sanity'

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({
      name: 'foreColumnTitle',
      title: 'First Column Title',
      type: 'localeString',
      description: 'e.g. "Folge uns!"',
    }),
    defineField({
      name: 'foreColumnText',
      title: 'First Column Text',
      type: 'localeText',
    }),
    defineField({
      name: 'columns',
      title: 'Navigation Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'localeString',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'footerLink',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'localeString',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {label: 'label.en', href: 'href'},
                    prepare: ({label, href}) => ({title: label || href || 'Link'}),
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'title.en'},
            prepare: ({title}) => ({title: title || 'Column'}),
          },
        }),
      ],
    }),
    defineField({
      name: 'bigLogoImage',
      title: 'Big Logo Image',
      type: 'image',
      description: 'Full-width brand mark image (BELLABONA wordmark).',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'localeString',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Footer'}),
  },
})
