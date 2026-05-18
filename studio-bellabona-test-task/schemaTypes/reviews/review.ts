import {defineType, defineField} from 'sanity'

export const review = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'richText',
      title: 'Quote',
      type: 'localeRichText',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'localeString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Author Position',
      type: 'localeString',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {author: 'author.en', position: 'position.en', media: 'photo'},
    prepare: ({author, position, media}) => ({
      title: author || 'Review',
      subtitle: position || '',
      media,
    }),
  },
})
