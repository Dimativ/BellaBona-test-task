'use client';

import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type FadeInProps<T extends ElementType = 'div'> = {
  children: ReactNode;
  y?: number;
  duration?: number;
  delay?: number;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'children'>;

export const FadeIn = <T extends ElementType = 'div'>({
  children,
  y = 40,
  duration = 0.8,
  delay = 0,
  className,
  as,
  ...rest
}: FadeInProps<T>) => {
  const Tag = (as ?? 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [skipAnim, setSkipAnim] = useState(false);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setSkipAnim(true);
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-50px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      ref={ref}
      className={className ?? 'contents'}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateY(${y}px)`,
        transition: skipAnim
          ? 'none'
          : `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
