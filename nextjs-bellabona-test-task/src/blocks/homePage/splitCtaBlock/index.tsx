import clsx from 'clsx';
import Image from 'next/image';

import { Button } from '@/components/button';
import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';
import { getImageProps } from '@/sanity/sanityImg';

import styles from './splitCtaBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type SplitCtaBlockData = Extract<HomeBlocks[number], { _type: 'splitCtaBlock' }>;

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';
type BgColor = 'lightPink' | 'lightGreen';

export function SplitCtaBlock({ data, locale }: { data: SplitCtaBlockData; locale: Locale }) {
  const title = pickLocale(data.title, locale);
  const description = pickLocale(data.description, locale);
  const ctaText = pickLocale(data.cta?.text, locale);
  const ctaLink = data.cta?.link;
  const bgColor = (data.bgColor as BgColor | undefined) ?? 'lightPink';
  const isLightGreen = bgColor === 'lightGreen';
  const ctaColor = (data.cta?.color as ButtonColor | undefined) ?? (isLightGreen ? 'green' : 'red');
  const titleColor = isLightGreen ? 'green' : 'red';
  const descColor = isLightGreen ? 'green' : 'red';
  const { src: imgUrl, style: imgStyle } = getImageProps(data.image);
  const imgAlt = data.image?.alt || title || '';

  if (!title && !imgUrl) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={clsx(styles.card, isLightGreen && styles.cardLightGreen)}>
          <div className={styles.left}>
            {title && (
              <FadeIn>
                <Typography variant="h2" color={titleColor}>
                  {title}
                </Typography>
              </FadeIn>
            )}

            {description && (
              <FadeIn delay={0.1} className={styles.description}>
                <Typography variant="p" color={descColor}>
                  {description}
                </Typography>
              </FadeIn>
            )}

            {ctaText && ctaLink && (
              <FadeIn delay={0.15} className={styles.ctaLink}>
                <a href={ctaLink} className={styles.ctaAnchor}>
                  <Button text={ctaText} color={ctaColor} />
                </a>
              </FadeIn>
            )}
          </div>

          {imgUrl && (
            <FadeIn delay={0.1} className={styles.right}>
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
        </div>
      </div>
    </section>
  );
}
