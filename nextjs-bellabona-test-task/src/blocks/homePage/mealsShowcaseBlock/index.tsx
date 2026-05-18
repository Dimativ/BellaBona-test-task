import { Button } from '@/components/button';
import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';

import { MealCard } from './MealCard';
import { MealsCarousel } from './MealsCarousel';
import styles from './mealsShowcaseBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type MealsShowcaseBlockData = Extract<HomeBlocks[number], { _type: 'mealsShowcaseBlock' }>;

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

export function MealsShowcaseBlock({
  data,
  locale,
}: {
  data: MealsShowcaseBlockData;
  locale: Locale;
}) {
  const title = pickLocale(data.title, locale);
  const meals = data.meals ?? [];
  const ctaText = pickLocale(data.cta?.text, locale);
  const fileUrl = data.cta?.file?.asset?.url;
  const ctaColor = (data.cta?.color as ButtonColor | undefined) ?? 'green';

  if (!title && meals.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {title && (
          <FadeIn>
            <Typography variant="h2" color="green" centered className={styles.title}>
              {title}
            </Typography>
          </FadeIn>
        )}

        <div className={styles.grid}>
          {meals.map((meal, i) =>
            meal ? (
              <FadeIn key={meal._id} delay={0.1 + i * 0.05}>
                <MealCard meal={meal} locale={locale} sizes="33vw" />
              </FadeIn>
            ) : null,
          )}
        </div>

        <div className={styles.carouselWrap}>
          <MealsCarousel meals={meals} locale={locale} />
        </div>

        {ctaText && fileUrl && (
          <FadeIn delay={0.2}>
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className={styles.ctaLink}
            >
              <Button text={ctaText} color={ctaColor} />
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
