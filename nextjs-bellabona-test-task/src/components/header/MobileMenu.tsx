'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useState } from 'react';
import { createPortal } from 'react-dom';

import { ChevronIcon } from '@/assets';
import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { pickLocale } from '@/lib/locale';
import type { HeaderQueryResult } from '@/sanity/sanity.types';

import { Button } from '../button';
import { LanguageSwitcher } from '../languageSwitcher';
import { Typography } from '../typography';
import styles from './mobileMenu.module.scss';

type Header = NonNullable<HeaderQueryResult>;
type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

interface MobileMenuProps {
  navItems: Header['navItems'];
  menuButton: Header['menuButton'] | undefined;
  cta: Header['cta'] | undefined;
  locale: Locale;
}

export function MobileMenu({ navItems, menuButton, cta, locale }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  const open = () => {
    if (typeof document !== 'undefined') {
      document.body.dataset.menuOpen = 'true';
    }
    setIsOpen(true);
  };

  const close = () => {
    if (typeof document !== 'undefined') {
      delete document.body.dataset.menuOpen;
    }
    setIsOpen(false);
    setExpandedIndex(null);
  };

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isOpen) {
      html.style.overflow = 'hidden';
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
      body.dataset.menuOpen = 'true';
    } else {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      delete body.dataset.menuOpen;
    }
    return () => {
      html.style.overflow = '';
      body.style.overflow = '';
      body.style.touchAction = '';
      delete body.dataset.menuOpen;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  useEffect(() => {
    close();
  }, [pathname]);

  const menuText = pickLocale(menuButton?.text, locale);
  const pdfUrl = menuButton?.pdf?.asset?.url;
  const ctaText = pickLocale(cta?.text, locale);
  const ctaColor = (cta?.color as ButtonColor | undefined) ?? 'darkGreen';

  const overlay = (
    <div
      id={panelId}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
      className={clsx(styles.overlay, isOpen && styles.overlayOpen)}
    >
      <nav className={styles.nav} aria-label="Mobile">
        {(navItems ?? []).map((item, i) => {
          const title = pickLocale(item.title, locale);
          const isMega = item.isMegaMenu && (item.subItems?.length ?? 0) > 0;
          const isExpanded = expandedIndex === i;
          const subListId = `${panelId}-sub-${i}`;

          if (isMega) {
            return (
              <div key={i} className={styles.navRow}>
                <div className={styles.navButtonRow}>
                  {item.href ? (
                    <Link href={item.href} className={styles.navButtonLink} onClick={close}>
                      <Typography variant="nav_link" color="side_black">
                        {title}
                      </Typography>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className={styles.navButtonLink}
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      aria-expanded={isExpanded}
                      aria-controls={subListId}
                    >
                      <Typography variant="nav_link" color="side_black">
                        {title}
                      </Typography>
                    </button>
                  )}
                  <button
                    type="button"
                    className={styles.chevronButton}
                    onClick={() => setExpandedIndex(isExpanded ? null : i)}
                    aria-label={isExpanded ? 'Collapse submenu' : 'Expand submenu'}
                    aria-expanded={isExpanded}
                    aria-controls={subListId}
                  >
                    <ChevronIcon
                      className={clsx(styles.chevron, isExpanded && styles.chevronOpen)}
                    />
                  </button>
                </div>

                <div
                  id={subListId}
                  className={clsx(styles.subItems, isExpanded && styles.subItemsOpen)}
                >
                  <div className={styles.subItemsInner}>
                    {item.subItems?.map((sub, j) => (
                      <Link
                        key={j}
                        href={sub.href || '/'}
                        className={styles.subLink}
                        onClick={close}
                        tabIndex={isExpanded ? 0 : -1}
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
            <Link key={i} href={item.href || '/'} className={styles.navLink} onClick={close}>
              <Typography variant="nav_link" color="side_black">
                {title}
              </Typography>
            </Link>
          );
        })}

        {pdfUrl && menuText && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className={styles.navLink}
            onClick={close}
          >
            <Typography variant="nav_link" color="side_black">
              {menuText}
            </Typography>
          </a>
        )}
      </nav>

      <div className={styles.footer}>
        {ctaText && cta?.link && (
          <a href={cta.link} className={styles.ctaLink} onClick={close}>
            <Button text={ctaText} color={ctaColor} className={styles.ctaButton} />
          </a>
        )}
        <LanguageSwitcher />
      </div>
    </div>
  );

  return (
    <>
      <button
        type="button"
        className={styles.burger}
        onClick={() => (isOpen ? close() : open())}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className={clsx(styles.burgerLine, isOpen && styles.burgerLineTop)} />
        <span className={clsx(styles.burgerLine, isOpen && styles.burgerLineMiddle)} />
        <span className={clsx(styles.burgerLine, isOpen && styles.burgerLineBottom)} />
      </button>

      {mounted ? createPortal(overlay, document.body) : null}
    </>
  );
}
