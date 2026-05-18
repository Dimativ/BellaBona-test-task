import {defineType, defineField} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'blocks',
      title: 'Blocks',
      type: 'array',
      of: [
        {type: 'homeHeroBlock'},
        {type: 'trustedByBlock'},
        {type: 'statsBlock'},
        {type: 'mealsShowcaseBlock'},
        {type: 'perksBlock'},
        {type: 'splitCtaBlock'},
        {type: 'stepsBlock'},
        {type: 'quoteCalculatorBlock'},
        {type: 'reviewsCarouselBlock'},
        {type: 'contactFormBlock'},
        {type: 'faqBlock'},
      ],
    }),
  ],
  preview: {
    select: {seoIndex: 'seo.index', seoFollow: 'seo.follow'},
    prepare: ({seoIndex, seoFollow}) => {
      const idx = seoIndex === 'noindex' ? '🔴' : '🟢'
      const fol = seoFollow === 'nofollow' ? '🔴' : '🟢'
      return {title: 'Home Page', subtitle: `${idx} index · ${fol} follow`}
    },
  },
})
