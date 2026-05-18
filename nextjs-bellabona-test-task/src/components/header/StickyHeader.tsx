'use client';

import clsx from 'clsx';
import { type ReactNode, useEffect, useRef, useState } from 'react';

import styles from './header.module.scss';

export function StickyHeader({ children }: { children: ReactNode }) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (document.body.dataset.menuOpen === 'true') {
        setHidden(false);
        return;
      }
      const currentScrollY = window.scrollY;
      setHidden(currentScrollY > lastScrollY.current && currentScrollY > 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const isOpen = document.body.dataset.menuOpen === 'true';
      setMenuOpen(isOpen);
      if (isOpen) setHidden(false);
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-menu-open'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={clsx(styles.sticky, hidden && !menuOpen && styles.stickyHidden)}>
      {children}
    </div>
  );
}
