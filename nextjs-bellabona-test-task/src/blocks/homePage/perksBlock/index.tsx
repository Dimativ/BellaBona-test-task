import Image from 'next/image';

import { CheckedIcon } from '@/assets';
import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';
import { getImageProps } from '@/sanity/sanityImg';

import styles from './perksBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type PerksBlockData = Extract<HomeBlocks[number], { _type: 'perksBlock' }>;

export function PerksBlock({ data, locale }: { data: PerksBlockData; locale: Locale }) {
  const title = pickLocale(data.title, locale);
  const cards = data.cards ?? [];
  const features = data.features ?? [];
  const { src: imgUrl, style: imgStyle } = getImageProps(data.image);
  const imgAlt = data.image?.alt || title || '';

  if (!title && cards.length === 0 && features.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {title && (
          <FadeIn>
            <Typography variant="h2" color="black" weight="semiBold" centered>
              {title}
            </Typography>
          </FadeIn>
        )}

        {cards.length > 0 && (
          <div className={styles.cards}>
            {cards.map((card, i) => {
              const value = pickLocale(card.value, locale);
              const valueLabel = pickLocale(card.valueLabel, locale);
              const description = pickLocale(card.description, locale);
              return (
                <FadeIn key={card._key} delay={0.1 + i * 0.08} className={styles.cardWrap}>
                  <div className={styles.card}>
                    <div className={styles.cardTop}>
                      <Typography seo="h3" color="light_white" className={styles.cardValue}>
                        {value}
                      </Typography>
                      {valueLabel && (
                        <Typography variant="label_xl" color="light_white">
                          {valueLabel}
                        </Typography>
                      )}
                    </div>
                    {description && (
                      <Typography variant="p" color="light_white">
                        {description}
                      </Typography>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}

        {(imgUrl || features.length > 0) && (
          <div className={styles.featuresRow}>
            {imgUrl && (
              <FadeIn>
                <div className={styles.imageWrap}>
                  <Image
                    src={imgUrl}
                    alt={imgAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className={styles.image}
                    style={imgStyle}
                    unoptimized
                  />
                </div>
              </FadeIn>
            )}

            {features.length > 0 && (
              <div className={styles.features}>
                {features.map((f, i) => {
                  const ftitle = pickLocale(f.title, locale);
                  const fdesc = pickLocale(f.description, locale);
                  return (
                    <FadeIn key={f._key} delay={0.1 + i * 0.08}>
                      <div className={styles.feature}>
                        <CheckedIcon className={styles.checkIcon} />
                        <div className={styles.featureBody}>
                          <Typography variant="label_md" color="side_black" weight="semiBold">
                            {ftitle}
                          </Typography>
                          {fdesc && (
                            <Typography variant="p" color="partners_black">
                              {fdesc}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
