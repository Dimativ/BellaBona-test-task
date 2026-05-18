import type { Locale } from '@/i18n/routing';

import { ContactFormBlock } from './homePage/contactFormBlock';
import { FaqBlock } from './homePage/faqBlock';
import { HomeHeroBlock } from './homePage/homeHeroBlock';
import { MealsShowcaseBlock } from './homePage/mealsShowcaseBlock';
import { PerksBlock } from './homePage/perksBlock';
import { QuoteCalculatorBlock } from './homePage/quoteCalculatorBlock';
import { ReviewsCarouselBlock } from './homePage/reviewsCarouselBlock';
import { SplitCtaBlock } from './homePage/splitCtaBlock';
import { StatsBlock } from './homePage/statsBlock';
import { StepsBlock } from './homePage/stepsBlock';
import { TrustedByBlock } from './homePage/trustedByBlock';

type AnyBlock = { _type: string; _key: string } & Record<string, unknown>;

export function BlockRenderer({
  blocks,
  locale,
}: {
  blocks: AnyBlock[] | null | undefined;
  locale: Locale;
}) {
  if (!blocks?.length) return null;

  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case 'homeHeroBlock':
            return (
              <HomeHeroBlock
                key={block._key}
                data={block as Parameters<typeof HomeHeroBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'trustedByBlock':
            return (
              <TrustedByBlock
                key={block._key}
                data={block as Parameters<typeof TrustedByBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'statsBlock':
            return (
              <StatsBlock
                key={block._key}
                data={block as Parameters<typeof StatsBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'mealsShowcaseBlock':
            return (
              <MealsShowcaseBlock
                key={block._key}
                data={block as Parameters<typeof MealsShowcaseBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'perksBlock':
            return (
              <PerksBlock
                key={block._key}
                data={block as Parameters<typeof PerksBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'splitCtaBlock':
            return (
              <SplitCtaBlock
                key={block._key}
                data={block as Parameters<typeof SplitCtaBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'stepsBlock':
            return (
              <StepsBlock
                key={block._key}
                data={block as Parameters<typeof StepsBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'quoteCalculatorBlock':
            return (
              <QuoteCalculatorBlock
                key={block._key}
                data={block as Parameters<typeof QuoteCalculatorBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'reviewsCarouselBlock':
            return (
              <ReviewsCarouselBlock
                key={block._key}
                data={block as Parameters<typeof ReviewsCarouselBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'contactFormBlock':
            return (
              <ContactFormBlock
                key={block._key}
                data={block as Parameters<typeof ContactFormBlock>[0]['data']}
                locale={locale}
              />
            );
          case 'faqBlock':
            return (
              <FaqBlock
                key={block._key}
                data={block as Parameters<typeof FaqBlock>[0]['data']}
                locale={locale}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
