import {defineType, defineField} from 'sanity'

export const localeString = defineType({
  name: 'localeString',
  title: 'Localized String',
  type: 'object',
  fields: [
    //@ts-ignore
    defineField({name: 'en', type: 'string', title: 'EN', options: {language: 'en'}}),
    //@ts-ignore
    defineField({name: 'de', type: 'string', title: 'DE', options: {language: 'de'}}),
  ],
  preview: {
    select: {en: 'en', de: 'de'},
    prepare({en, de}) {
      return {
        title: en || 'EN is empty',
        subtitle: de || 'DE is empty',
      }
    },
  },
})
