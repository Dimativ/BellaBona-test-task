import Image from 'next/image';

import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HomePageQueryResult } from '@/sanity/sanity.types';
import { getImageProps } from '@/sanity/sanityImg';

import { ContactForm } from './ContactForm';
import styles from './contactFormBlock.module.scss';

type HomeBlocks = NonNullable<NonNullable<HomePageQueryResult>['blocks']>;
type ContactFormBlockData = Extract<HomeBlocks[number], { _type: 'contactFormBlock' }>;

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

export function ContactFormBlock({ data, locale }: { data: ContactFormBlockData; locale: Locale }) {
  const title = pickLocale(data.title, locale);
  const description = pickLocale(data.description, locale);
  const formTitle = pickLocale(data.formTitle, locale);
  const ctaText = pickLocale(data.cta?.text, locale);
  const ctaColor = (data.cta?.color as ButtonColor | undefined) ?? 'darkGreen';

  const person = data.contactPerson;
  const { src: photoUrl, style: photoStyle } = getImageProps(person?.photo);
  const photoAlt = person?.photo?.alt || person?.name || '';

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.leftTop}>
            {title && (
              <Typography variant="h2" color="light_white" weight="semiBold">
                {title}
              </Typography>
            )}
            {description && (
              <Typography variant="label_md" color="light_white">
                {description}
              </Typography>
            )}
          </div>

          {person && (
            <div className={styles.contactPerson}>
              {photoUrl && (
                <div className={styles.personPhoto}>
                  <Image
                    src={photoUrl}
                    alt={photoAlt}
                    fill
                    sizes="120px"
                    className={styles.personPhotoImg}
                    style={photoStyle}
                    unoptimized
                  />
                </div>
              )}
              <div className={styles.personInfo}>
                {person.name && (
                  <Typography variant="label_md" color="light_white" weight="semiBold">
                    {person.name}
                  </Typography>
                )}
                {person.email && (
                  <a href={`mailto:${person.email}`} className={styles.personLink}>
                    <Typography variant="label_sm" color="light_white">
                      {person.email}
                    </Typography>
                  </a>
                )}
                {person.phone && (
                  <a href={`tel:${person.phone}`} className={styles.personLink}>
                    <Typography variant="label_sm" color="light_white">
                      {person.phone}
                    </Typography>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>

        <div className={styles.right}>
          {formTitle && (
            <Typography variant="h3" color="green" weight="semiBold">
              {formTitle}
            </Typography>
          )}
          <ContactForm
            labels={data.labels}
            companySizeOptions={data.companySizeOptions}
            ctaText={ctaText}
            ctaColor={ctaColor}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
