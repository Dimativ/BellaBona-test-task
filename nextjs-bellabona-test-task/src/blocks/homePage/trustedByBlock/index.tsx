import Image from 'next/image';

import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';

import styles from './trustedByBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type TrustedByBlockData = Extract<HomeBlocks[number], { _type: 'trustedByBlock' }>;

export function TrustedByBlock({ data, locale }: { data: TrustedByBlockData; locale: Locale }) {
  const title = pickLocale(data.title, locale);
  const logos = data.logos ?? [];

  if (!title && logos.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        {title && (
          <FadeIn>
            <Typography color="partners_black" centered className={styles.title}>
              {title}
            </Typography>
          </FadeIn>
        )}

        {logos.length > 0 && (
          <div className={styles.logos}>
            {logos.map((logo, i) => {
              const url = logo.image?.asset?.url;
              const alt = logo.image?.alt || '';
              if (!url) return null;
              const img = (
                <Image src={url} alt={alt} width={120} height={32} className={styles.logoImg} />
              );
              const content = logo.link ? (
                <a
                  href={logo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.logoLink}
                  aria-label={alt}
                >
                  {img}
                </a>
              ) : (
                <span className={styles.logoLink}>{img}</span>
              );
              return (
                <FadeIn key={logo._key} delay={0.1 + i * 0.05}>
                  {content}
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
