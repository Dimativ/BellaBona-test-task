import Image from 'next/image';

import { MailIcon } from '@/assets';
import { Typography } from '@/components/typography';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import { sanityFetch } from '@/sanity/live';
import { footerQuery, siteSettingsQuery } from '@/sanity/queries';
import { getImageProps } from '@/sanity/sanityImg';

import styles from './footer.module.scss';

export async function Footer({ locale }: { locale: Locale }) {
  const [{ data: footer }, { data: settings }] = await Promise.all([
    sanityFetch({ query: footerQuery, tags: ['footer'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ]);

  if (!footer && !settings) return null;

  const foreTitle = pickLocale(footer?.foreColumnTitle, locale);
  const foreText = pickLocale(footer?.foreColumnText, locale);
  const copyright = pickLocale(footer?.copyright, locale);
  const email = settings?.contactEmail?.value as string | undefined;
  const socials = settings?.socials ?? [];
  const { src: bigLogoUrl, style: bigLogoStyle } = getImageProps(footer?.bigLogoImage);
  const bigLogoAlt = footer?.bigLogoImage?.alt || 'BellaBona';

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          <div className={styles.foreColumn}>
            {foreTitle && (
              <Typography
                variant="label_xl"
                color="light_white"
                weight="semiBold"
                extraClassName={styles.foreTitle}
              >
                {foreTitle}
              </Typography>
            )}
            {foreText && (
              <Typography variant="p" color="light_white" extraClassName={styles.foreText}>
                {foreText}
              </Typography>
            )}
            {email && (
              <a href={`mailto:${email}`} className={styles.emailLink}>
                <MailIcon className={styles.emailIcon} />
                <Typography variant="p" color="light_white">
                  {email}
                </Typography>
              </a>
            )}
            {socials.length > 0 && (
              <div className={styles.socials}>
                {socials.map((s) => {
                  const url = s?.svgIcon?.asset?.url;
                  const link = s?.link;
                  const name = s?.name || '';
                  if (!link) return null;
                  return (
                    <a
                      key={s._key}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.social}
                      aria-label={name}
                    >
                      {url ? (
                        <Image
                          src={url}
                          alt={name}
                          width={32}
                          height={32}
                          className={styles.socialIcon}
                          unoptimized
                        />
                      ) : (
                        <span>{name}</span>
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {(footer?.columns ?? []).map((col) => {
            const title = pickLocale(col.title, locale);
            return (
              <div key={col._key} className={styles.column}>
                {title && (
                  <Typography
                    variant="label_md"
                    color="light_white"
                    weight="semiBold"
                    extraClassName={styles.columnTitle}
                  >
                    {title}
                  </Typography>
                )}
                <div className={styles.columnItems}>
                  {(col.items ?? []).map((item) => {
                    const label = pickLocale(item.label, locale);
                    if (!label || !item.href) return null;
                    return (
                      <a key={item._key} href={item.href} className={styles.columnLink}>
                        <Typography variant="p" color="light_white">
                          {label}
                        </Typography>
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {bigLogoUrl && (
        <div className={styles.bigLogo}>
          <Image
            src={bigLogoUrl}
            alt={bigLogoAlt}
            width={1920}
            height={400}
            style={bigLogoStyle}
            sizes="100vw"
            priority={false}
            unoptimized
          />
        </div>
      )}

      <div className={styles.bottomWrap}>
        <div className={styles.divider} />
        {copyright && (
          <Typography variant="label_sm" color="light_white" extraClassName={styles.copyright}>
            {copyright}
          </Typography>
        )}
      </div>
    </footer>
  );
}
