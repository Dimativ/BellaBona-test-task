import {defineType, defineField} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryDomain',
      title: 'Primary Domain',
      type: 'url',
      description:
        'Canonical base URL. Primary source for SEO/JSON-LD. Fallback: NEXT_PUBLIC_SITE_URL or SITE_URL.',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orgLegalName',
      title: 'Organization Legal Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'orgDescription',
      title: 'Organization Description',
      type: 'text',
      rows: 3,
      description: 'Used in JSON-LD structured data (Organization schema.org).',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'object',
      fields: [
        defineField({
          name: 'icon',
          title: 'Email Icon',
          type: 'image',
          options: {hotspot: true},
        }),
        defineField({
          name: 'value',
          title: 'Email Address',
          type: 'string',
          validation: (Rule) => Rule.email(),
        }),
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [{type: 'social'}],
      options: {
        modal: {type: 'dialog', width: 5},
      },
    }),
  ],
  preview: {
    select: {
      title: 'orgName',
      media: 'logo',
    },
    prepare(selection) {
      const {title, media} = selection
      return {
        title: title || 'Site Settings',
        media,
      }
    },
  },
})
