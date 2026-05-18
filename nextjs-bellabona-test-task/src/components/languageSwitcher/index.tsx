'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';

import { type Locale, routing } from '@/i18n/routing';

import { Typography } from '../typography';
import styles from './languageSwitcher.module.scss';

const LABELS: Record<Locale, string> = {
  en: 'EN',
  de: 'DU',
};

function stripLocale(pathname: string): string {
  for (const loc of routing.locales) {
    if (pathname === `/${loc}`) return '/';
    if (pathname.startsWith(`/${loc}/`)) return pathname.slice(loc.length + 1);
  }
  return pathname || '/';
}

function buildHref(locale: Locale, basePath: string): string {
  if (locale === routing.defaultLocale) return basePath;
  return basePath === '/' ? `/${locale}` : `/${locale}${basePath}`;
}

function detectActive(pathname: string): Locale {
  for (const loc of routing.locales) {
    if (loc === routing.defaultLocale) continue;
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) return loc;
  }
  return routing.defaultLocale;
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const base = stripLocale(pathname);
  const active = detectActive(pathname);

  return (
    <div className={styles.switcher}>
      {routing.locales.map((loc) => {
        const href = buildHref(loc, base);
        const isActive = loc === active;
        return (
          <a
            key={loc}
            href={href}
            hrefLang={loc}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(styles.item, isActive && styles.active)}
          >
            <Typography variant="p" extraClassName={styles.label}>
              {LABELS[loc]}
            </Typography>
          </a>
        );
      })}
    </div>
  );
}
