import type {StructureResolver} from 'sanity/structure'
import {CogIcon, MenuIcon, HomeIcon, DocumentsIcon, TagIcon} from '@sanity/icons'

const MealsIcon = () => '🍽️'
const ReviewsIcon = () => '⭐'

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(async () => {
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = await client.fetch<string>(
            `*[_type == "siteSettings" && !(_id in path("drafts.**"))][0]._id`,
          )
          return S.document()
            .schemaType('siteSettings')
            .documentId(id ?? 'siteSettings')
            .title('Site Settings')
        }),

      S.listItem()
        .title('Header')
        .icon(MenuIcon)
        .child(async () => {
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = await client.fetch<string>(
            `*[_type == "header" && !(_id in path("drafts.**"))][0]._id`,
          )
          return S.document()
            .schemaType('header')
            .documentId(id ?? 'header')
            .title('Header')
        }),

      S.listItem()
        .title('Footer')
        .icon(() => '↓')
        .child(async () => {
          const client = context.getClient({apiVersion: '2024-01-01'})
          const id = await client.fetch<string>(
            `*[_type == "footer" && !(_id in path("drafts.**"))][0]._id`,
          )
          return S.document()
            .schemaType('footer')
            .documentId(id ?? 'footer')
            .title('Footer')
        }),

      S.divider(),

      S.listItem()
        .title('Pages')
        .icon(DocumentsIcon)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(async () => {
                  const client = context.getClient({apiVersion: '2024-01-01'})
                  const id = await client.fetch<string>(
                    `*[_type == "homePage" && !(_id in path("drafts.**"))][0]._id`,
                  )
                  return S.document()
                    .schemaType('homePage')
                    .documentId(id ?? 'homePage')
                    .title('Home Page')
                }),
            ]),
        ),

      S.listItem()
        .title('Meals')
        .icon(MealsIcon)
        .child(
          S.list()
            .title('Meals')
            .items([
              S.listItem()
                .title('All Meals')
                .icon(MealsIcon)
                .schemaType('meal')
                .child(S.documentTypeList('meal').title('All Meals')),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .schemaType('mealCategory')
                .child(S.documentTypeList('mealCategory').title('Meal Categories')),
            ]),
        ),

      S.listItem()
        .title('Reviews')
        .icon(ReviewsIcon)
        .schemaType('review')
        .child(S.documentTypeList('review').title('Reviews')),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) =>
          ![
            'siteSettings',
            'header',
            'footer',
            'homePage',
            'meal',
            'mealCategory',
            'review',
          ].includes(item.getId() ?? ''),
      ),
    ])
