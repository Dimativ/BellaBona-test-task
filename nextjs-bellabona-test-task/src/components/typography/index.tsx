'use client';

import clsx from 'clsx';
import { forwardRef } from 'react';

import { BaseTypography, BaseTypographyProps, BaseTypographyVariants } from '../baseTypography';
import styles from './typography.module.scss';

export type TypographyVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'label_sm'
  | 'label_md'
  | 'label_xl'
  | 'nav_link'
  | 'sup';

type TypographyColors =
  | 'white'
  | 'light_white'
  | 'red'
  | 'black'
  | 'side_black'
  | 'partners_black'
  | 'green'
  | 'light_green';

type TypographyWeight = 'bold' | 'semiBold' | 'medium' | 'regular';

export type TypographyFont = 'figtree' | 'inter';

export interface TypographyProps extends BaseTypographyProps {
  variant?: TypographyVariants;
  color?: TypographyColors;
  weight?: TypographyWeight;
  font?: TypographyFont;
}

const typographyTagMap: Record<TypographyVariants, BaseTypographyVariants> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  label_sm: 'p',
  label_md: 'p',
  label_xl: 'p',
  nav_link: 'p',
  sup: 'sup',
};

const fontClassMap: Record<TypographyFont, string> = {
  figtree: styles.font_figtree,
  inter: styles.font_inter,
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(function Typography(
  { variant = 'p', color, weight, font = 'figtree', className, children, ...rest },
  ref,
) {
  return (
    <BaseTypography
      ref={ref}
      variant={typographyTagMap[variant]}
      colorClassName={color ? styles[color] : undefined}
      weightClassName={weight ? styles[weight] : undefined}
      variantClassName={styles[variant]}
      className={clsx(fontClassMap[font], className)}
      {...rest}
    >
      {children}
    </BaseTypography>
  );
});
