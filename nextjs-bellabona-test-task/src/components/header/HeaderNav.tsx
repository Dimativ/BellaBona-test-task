'use client';

import clsx from 'clsx';
import { useRef, useState } from 'react';

import { ChevronIcon } from '@/assets';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HeaderQueryResult } from '@/sanity/sanity.types';

import { Typography } from '../typography';
import styles from './header.module.scss';

type NavItems = NonNullable<HeaderQueryResult>['navItems'];

const CLOSE_DELAY_MS = 120;

export function HeaderNav({ items, locale }: { items: NavItems; locale: Locale }) {
  const [openKey, setOpenKey] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenKey(null), CLOSE_DELAY_MS);
  };

  const openNow = (idx: number) => {
    cancelClose();
    setOpenKey(idx);
  };

  if (!items?.length) return null;

  return (
    <nav className={styles.nav}>
      {items.map((item, idx) => {
        const title = pickLocale(item.title, locale);
        const isMega = item.isMegaMenu && (item.subItems?.length ?? 0) > 0;
        const isOpen = openKey === idx;

        if (isMega) {
          return (
            <div
              key={idx}
              className={styles.navItemWrap}
              onMouseEnter={() => openNow(idx)}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                className={clsx(styles.navItem, styles.navTrigger)}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => (isOpen ? scheduleClose() : openNow(idx))}
              >
                <Typography variant="nav_link" color="side_black">
                  {title}
                </Typography>
                <ChevronIcon className={clsx(styles.chevron, isOpen && styles.chevronOpen)} />
              </button>

              <div
                className={clsx(styles.dropdown, isOpen && styles.dropdownOpen)}
                role="menu"
                aria-hidden={!isOpen}
                onMouseEnter={() => openNow(idx)}
                onMouseLeave={scheduleClose}
              >
                <div className={styles.dropdownInner}>
                  {item.subItems?.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={sub.href || '/'}
                      className={styles.dropdownItem}
                      role="menuitem"
                      tabIndex={isOpen ? 0 : -1}
                      onClick={() => setOpenKey(null)}
                    >
                      <Typography variant="nav_link" color="side_black">
                        {pickLocale(sub.title, locale)}
                      </Typography>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link key={idx} href={item.href || '/'} className={styles.navItem}>
            <Typography variant="nav_link" color="side_black">
              {title}
            </Typography>
          </Link>
        );
      })}
    </nav>
  );
}
