import {defineType, defineField} from 'sanity'

export const localeText = defineType({
  name: 'localeText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    //@ts-ignore
    defineField({name: 'en', type: 'text', rows: 4, title: 'EN', options: {language: 'en'}}),
    //@ts-ignore
    defineField({name: 'de', type: 'text', rows: 4, title: 'DE', options: {language: 'de'}}),
  ],
  preview: {
    select: {en: 'en', de: 'de'},
    prepare({en, de}) {
      const truncate = (value?: string) => {
        if (!value) return undefined
        const normalized = value.replace(/\s+/g, ' ').trim()
        return normalized.length > 60 ? `${normalized.slice(0, 57)}...` : normalized
      }
      return {
        title: truncate(en) || 'EN is empty',
        subtitle: truncate(de) || 'DE is empty',
      }
    },
  },
})
