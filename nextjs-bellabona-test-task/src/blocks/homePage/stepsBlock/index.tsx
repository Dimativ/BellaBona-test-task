import Image from 'next/image';

import { Button } from '@/components/button';
import { FadeIn } from '@/components/fadeIn';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';
import { getImageProps } from '@/sanity/sanityImg';

import styles from './stepsBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type StepsBlockData = Extract<HomeBlocks[number], { _type: 'stepsBlock' }>;

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

export function StepsBlock({ data, locale }: { data: StepsBlockData; locale: Locale }) {
  const title = pickLocale(data.title, locale);
  const steps = data.steps ?? [];
  const ctaText = pickLocale(data.cta?.text, locale);
  const ctaLink = data.cta?.link;
  const ctaColor = (data.cta?.color as ButtonColor | undefined) ?? 'green';

  if (!title && steps.length === 0) return null;

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

        {steps.length > 0 && (
          <div className={styles.grid}>
            {steps.map((step, i) => {
              const tagline = pickLocale(step.tagline, locale);
              const stepTitle = pickLocale(step.title, locale);
              const stepDesc = pickLocale(step.description, locale);
              const { src: imgUrl, style: imgStyle } = getImageProps(step.image);
              const imgAlt = step.image?.alt || stepTitle || '';

              return (
                <FadeIn key={step._key} delay={0.1 + i * 0.1}>
                  <div className={styles.step}>
                    {imgUrl && (
                      <div className={styles.imageWrap}>
                        <Image
                          src={imgUrl}
                          alt={imgAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className={styles.image}
                          style={imgStyle}
                          unoptimized
                        />
                      </div>
                    )}

                    <div className={styles.body}>
                      {tagline && (
                        <span className={styles.tagline}>
                          <Typography variant="label_sm" color="side_black">
                            {tagline}
                          </Typography>
                        </span>
                      )}
                      <div className={styles.textGroup}>
                        <Typography
                          variant="label_md"
                          color="black"
                          weight="semiBold"
                          extraClassName={styles.stepTitle}
                        >
                          {stepTitle}
                        </Typography>
                        {stepDesc && (
                          <Typography variant="p" color="black">
                            {stepDesc}
                          </Typography>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}

        {ctaText && ctaLink && (
          <FadeIn delay={0.2}>
            <a href={ctaLink} className={styles.ctaLink}>
              <Button text={ctaText} color={ctaColor} />
            </a>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
