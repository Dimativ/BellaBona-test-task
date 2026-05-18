import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';

import styles from './statsBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type StatsBlockData = Extract<HomeBlocks[number], { _type: 'statsBlock' }>;

export function StatsBlock({ data, locale }: { data: StatsBlockData; locale: Locale }) {
  const items = data.items ?? [];
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((item, i) => {
          const value = pickLocale(item.value, locale);
          const label = pickLocale(item.label, locale);
          return (
            <FadeIn key={item._key} delay={i * 0.1} className={styles.cardWrap}>
              <div className={styles.card}>
                <Typography seo="h3" color="side_black" className={styles.value} weight="medium">
                  {value}
                </Typography>
                <Typography variant="label_md" color="black">
                  {label}
                </Typography>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
