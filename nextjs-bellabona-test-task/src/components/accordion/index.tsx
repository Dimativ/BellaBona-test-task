'use client';

import clsx from 'clsx';
import { useId, useState } from 'react';

import { Typography } from '@/components/typography';

import styles from './accordion.module.scss';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

export function Accordion({
  items,
  allowMultiple = false,
}: {
  items: AccordionItem[];
  allowMultiple?: boolean;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());
  const baseId = useId();

  if (!items?.length) return null;

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id} className={styles.item}>
            <button
              type="button"
              className={styles.trigger}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(item.id)}
            >
              <Typography variant="label_md" color="side_black" weight="semiBold">
                {item.question}
              </Typography>
              <span className={clsx(styles.iconWrap, isOpen && styles.iconWrapOpen)} aria-hidden>
                <span className={clsx(styles.iconBar, styles.iconBarH)} />
                <span
                  className={clsx(styles.iconBar, styles.iconBarV, isOpen && styles.iconBarVOpen)}
                />
              </span>
            </button>

            <div
              id={panelId}
              className={clsx(styles.body, isOpen && styles.bodyOpen)}
              aria-hidden={!isOpen}
            >
              <div className={styles.bodyInner}>
                <div className={clsx(styles.bodyContent, isOpen && styles.bodyContentOpen)}>
                  <Typography variant="p" color="partners_black">
                    {item.answer}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
