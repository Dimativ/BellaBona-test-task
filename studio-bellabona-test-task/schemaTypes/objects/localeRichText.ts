import {defineArrayMember, defineType, defineField} from 'sanity'

export const localeRichText = defineType({
  name: 'localeRichText',
  title: 'Localized Rich Text',
  type: 'object',
  fields: [
    defineField({
      name: 'en',
      title: 'EN',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      //@ts-ignore
      options: {language: 'en'},
    }),
    defineField({
      name: 'de',
      title: 'DE',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
      //@ts-ignore
      options: {language: 'de'},
    }),
  ],
})
