import Image from 'next/image';

import { Button } from '@/components/button';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';

import styles from './homeHeroBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type HomeHeroBlockData = Extract<HomeBlocks[number], { _type: 'homeHeroBlock' }>;

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

export function HomeHeroBlock({ data, locale }: { data: HomeHeroBlockData; locale: Locale }) {
  const title = pickLocale(data.title, locale);
  const subtitle = pickLocale(data.subtitle, locale);
  const ctaText = pickLocale(data.cta?.text, locale);
  const ctaLink = data.cta?.link;
  const ctaColor = (data.cta?.color as ButtonColor | undefined) ?? 'lightGreen';
  const imgUrl = data.image?.asset?.url;
  const imgAlt = data.image?.alt || title || '';

  return (
    <section className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.left}>
          <Typography variant="h1" color="light_green">
            {title}
          </Typography>

          <div className={styles.bottom}>
            {subtitle && (
              <Typography variant="p" color="light_green">
                {subtitle}
              </Typography>
            )}

            {ctaText && ctaLink && (
              <a href={ctaLink} className={styles.ctaLink}>
                <Button text={ctaText} color={ctaColor} />
              </a>
            )}
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.imageCard}>
            {imgUrl && (
              <Image
                src={imgUrl}
                alt={imgAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.image}
                priority
              />
            )}
          </div>

          {data.linksImgs && data.linksImgs.length > 0 && (
            <div className={styles.badges}>
              {data.linksImgs.map((item) => {
                const url = item.image?.asset?.url;
                const alt = item.image?.alt || '';
                if (!url) return null;
                const content = (
                  <span className={styles.badge}>
                    <Image
                      src={url}
                      alt={alt}
                      width={140}
                      height={42}
                      className={styles.badgeImg}
                    />
                  </span>
                );
                return item.link ? (
                  <a
                    key={item._key}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.badgeLink}
                    aria-label={alt}
                  >
                    {content}
                  </a>
                ) : (
                  <span key={item._key} className={styles.badgeLink}>
                    {content}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
