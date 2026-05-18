import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {languageFilter} from '@sanity/language-filter'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'BellaBona test task',

  projectId: '88x9yj92',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    languageFilter({
      supportedLanguages: [
        {id: 'en', title: 'English'},
        {id: 'de', title: 'German'},
      ],
      defaultLanguages: ['en'],
      documentTypes: [
        'siteSettings',
        'header',
        'footer',
        'homePage',
        'meal',
        'mealCategory',
        'review',
      ],
      filterField: (enclosingType, member, selectedLanguageIds) =>
        !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(member.name),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
