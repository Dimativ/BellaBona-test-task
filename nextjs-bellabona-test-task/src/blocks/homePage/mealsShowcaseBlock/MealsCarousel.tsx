'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Locale } from '@/i18n/routing';

import { MealCard, type MealCardData } from './MealCard';
import styles from './mealsShowcaseBlock.module.scss';

export function MealsCarousel({
  meals,
  locale,
}: {
  meals: (MealCardData | null)[] | null | undefined;
  locale: Locale;
}) {
  if (!meals?.length) return null;

  return (
    <div className={styles.carousel}>
      <Swiper slidesPerView={1.15} spaceBetween={12} loop>
        {meals.map((meal) => {
          if (!meal) return null;
          return (
            <SwiperSlide key={meal._id} className={styles.slide}>
              <MealCard meal={meal} locale={locale} sizes="90vw" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
