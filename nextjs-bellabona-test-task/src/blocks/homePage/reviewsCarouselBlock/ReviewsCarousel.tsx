'use client';

import { PortableText, type PortableTextBlock, type PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';
import { getImageProps } from '@/sanity/sanityImg';

import styles from './reviewsCarouselBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type ReviewsCarouselBlockData = Extract<HomeBlocks[number], { _type: 'reviewsCarouselBlock' }>;
type Reviews = ReviewsCarouselBlockData['reviews'];

const portableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <Typography variant="label_xl" color="light_white" weight="medium">
        {children}
      </Typography>
    ),
  },
};

function pickRichText(
  rich: { en?: PortableTextBlock[] | null; de?: PortableTextBlock[] | null } | null | undefined,
  locale: Locale,
): PortableTextBlock[] {
  if (!rich) return [];
  return (rich[locale] ?? rich.en ?? []) as PortableTextBlock[];
}

const MIN_SOURCE_SLIDES = 8;

export function ReviewsCarousel({ reviews, locale }: { reviews: Reviews; locale: Locale }) {
  if (!reviews?.length) return null;

  const items: NonNullable<Reviews> = [];
  while (items.length < MIN_SOURCE_SLIDES) {
    items.push(...reviews);
  }

  return (
    <div className={styles.carousel}>
      <Swiper slidesPerView="auto" centeredSlides loop spaceBetween={24}>
        {items.map((review, idx) => {
          if (!review) return null;
          const author = pickLocale(review.author, locale);
          const position = pickLocale(review.position, locale);
          const rich = pickRichText(
            review.richText as
              | { en?: PortableTextBlock[] | null; de?: PortableTextBlock[] | null }
              | null
              | undefined,
            locale,
          );
          const { src: photoUrl, style: photoStyle } = getImageProps(review.photo);
          const photoAlt = review.photo?.alt || author;

          return (
            <SwiperSlide key={idx}>
              <div className={styles.cardInner}>
                <div className={`${styles.face} ${styles.faceFront}`}>
                  {photoUrl && (
                    <Image
                      src={photoUrl}
                      alt={photoAlt}
                      fill
                      sizes="(max-width: 1024px) 90vw, 33vw"
                      className={styles.photo}
                      style={photoStyle}
                      unoptimized
                    />
                  )}
                </div>

                <div className={`${styles.face} ${styles.faceBack}`}>
                  <div className={styles.quote}>
                    <PortableText value={rich} components={portableComponents} />
                  </div>
                  <div className={styles.author}>
                    <Typography variant="label_md" color="light_white" weight="semiBold">
                      {author}
                    </Typography>
                    {position && (
                      <Typography variant="label_sm" color="light_white">
                        {position}
                      </Typography>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
