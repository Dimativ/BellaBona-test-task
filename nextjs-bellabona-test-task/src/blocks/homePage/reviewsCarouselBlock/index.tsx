import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';

import { ReviewsCarousel } from './ReviewsCarousel';
import styles from './reviewsCarouselBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type ReviewsCarouselBlockData = Extract<HomeBlocks[number], { _type: 'reviewsCarouselBlock' }>;

export function ReviewsCarouselBlock({
  data,
  locale,
}: {
  data: ReviewsCarouselBlockData;
  locale: Locale;
}) {
  const title = pickLocale(data.title, locale);
  const reviews = data.reviews ?? [];
  if (!title && reviews.length === 0) return null;

  return (
    <section className={styles.section}>
      {title && (
        <div className={styles.titleWrap}>
          <Typography
            variant="h2"
            color="black"
            weight="semiBold"
            centered
            extraClassName={styles.title}
          >
            {title}
          </Typography>
        </div>
      )}
      <ReviewsCarousel reviews={reviews} locale={locale} />
    </section>
  );
}
