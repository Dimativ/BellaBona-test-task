import { Accordion, type AccordionItem } from '@/components/accordion';
import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';
import { JsonLd } from '@/seo/JsonLdScript';
import { buildFaqJsonLd } from '@/seo/jsonld';

import styles from './faqBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type FaqBlockData = Extract<HomeBlocks[number], { _type: 'faqBlock' }>;

export function FaqBlock({ data, locale }: { data: FaqBlockData; locale: Locale }) {
  const title = pickLocale(data.title, locale);
  const items: AccordionItem[] = (data.items ?? [])
    .map((item) => ({
      id: item._key,
      question: pickLocale(item.question, locale),
      answer: pickLocale(item.answer, locale),
    }))
    .filter((i) => i.question);

  if (!title && items.length === 0) return null;

  const jsonLd = buildFaqJsonLd(items);

  return (
    <section className={styles.section}>
      <JsonLd data={jsonLd} />
      <div className={styles.inner}>
        {title && (
          <FadeIn>
            <Typography variant="h2" color="side_black" weight="semiBold" centered>
              {title}
            </Typography>
          </FadeIn>
        )}
        {items.length > 0 && (
          <FadeIn delay={0.1} style={{ width: '100%' }}>
            <Accordion items={items} allowMultiple />
          </FadeIn>
        )}
      </div>
    </section>
  );
}
