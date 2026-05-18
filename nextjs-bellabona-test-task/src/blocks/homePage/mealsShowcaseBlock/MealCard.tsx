import Image from 'next/image';

import { CloseIcon, ThumbIcon } from '@/assets';
import { Typography } from '@/components/typography';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';
import { getImageProps } from '@/sanity/sanityImg';

import styles from './mealsShowcaseBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type Meals = Extract<HomeBlocks[number], { _type: 'mealsShowcaseBlock' }>['meals'];
export type MealCardData = NonNullable<Meals>[number];

export function MealCard({
  meal,
  locale,
  sizes,
}: {
  meal: MealCardData;
  locale: Locale;
  sizes?: string;
}) {
  if (!meal) return null;
  const name = pickLocale(meal.name, locale);
  const reviews = pickLocale(meal.cardReviewString, locale);
  const categoryTitle = pickLocale(meal.category?.title, locale);
  const { src: imgUrl, style: imgStyle } = getImageProps(meal.cardImage);
  const imgAlt = meal.cardImage?.alt || name;
  const slug = meal.slug?.current;

  return (
    <Link href={slug ? `/meals/${slug}` : '/'} className={styles.card}>
      <div className={styles.imageWrap}>
        {categoryTitle && (
          <span className={styles.categoryPill}>
            <Typography variant="label_sm" weight="medium" className={styles.pillText}>
              {categoryTitle}
            </Typography>
            <CloseIcon className={styles.pillClose} />
          </span>
        )}
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={imgAlt}
            fill
            sizes={sizes ?? '(max-width: 1024px) 90vw, 33vw'}
            className={styles.image}
            style={imgStyle}
            unoptimized
          />
        )}
      </div>

      <div className={styles.cardBody}>
        <Typography
          variant="label_md"
          color="black"
          weight="semiBold"
          extraClassName={styles.mealName}
        >
          {name}
        </Typography>
        {reviews && (
          <span className={styles.reviewRow}>
            <ThumbIcon className={styles.thumbIcon} />
            <Typography variant="p" color="side_black">
              {reviews}
            </Typography>
          </span>
        )}
      </div>
    </Link>
  );
}
