import {defineType, defineField} from 'sanity'

export const splitCtaBlock = defineType({
  name: 'splitCtaBlock',
  title: 'Split CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'localeText',
    }),
    defineField({
      name: 'bgColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'Light Pink', value: 'lightPink'},
          {title: 'Light Green', value: 'lightGreen'},
        ],
        layout: 'radio',
      },
      initialValue: 'lightPink',
    }),
    defineField({
      name: 'cta',
      title: 'CTA',
      type: 'cta',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Bake any background into the asset itself.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
  ],
  preview: {
    select: {en: 'title.en', media: 'image'},
    prepare: ({en, media}) => ({
      title: en || 'Split CTA Block',
      subtitle: 'Split CTA Block',
      media,
    }),
  },
})
