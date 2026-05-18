import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HeaderQueryResult } from '@/sanity/sanity.types';

import { Button } from '../button';
import { Typography } from '../typography';
import styles from './header.module.scss';

type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

export function HeaderActions({
  menuButton,
  cta,
  locale,
}: {
  menuButton: NonNullable<HeaderQueryResult>['menuButton'] | undefined;
  cta: NonNullable<HeaderQueryResult>['cta'] | undefined;
  locale: Locale;
}) {
  const menuText = pickLocale(menuButton?.text, locale);
  const pdfUrl = menuButton?.pdf?.asset?.url;
  const ctaText = pickLocale(cta?.text, locale);
  const ctaColor = (cta?.color as ButtonColor | undefined) ?? 'darkGreen';

  return (
    <div className={styles.actions}>
      {pdfUrl && menuText && (
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
          className={styles.downloadLink}
        >
          <Typography variant="nav_link" color="side_black">
            {menuText}
          </Typography>
        </a>
      )}

      {ctaText && cta?.link && (
        <a href={cta.link} className={styles.ctaLink}>
          <Button text={ctaText} color={ctaColor} />
        </a>
      )}
    </div>
  );
}
