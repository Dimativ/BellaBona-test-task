'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

import { Typography } from '../typography';
import styles from './button.module.scss';

export type ButtonColor = 'green' | 'darkGreen' | 'lightGreen' | 'red';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  text?: string | null;
  type?: 'button' | 'submit' | 'reset';
  color?: ButtonColor;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  textClassname?: string;
}

export const Button: FC<ButtonProps> = ({
  text,
  type = 'button',
  color = 'green',
  disabled,
  icon,
  iconPosition = 'right',
  className,
  textClassname,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, className, {
        [styles.darkGreen]: color === 'darkGreen',
        [styles.lightGreen]: color === 'lightGreen',
        [styles.red]: color === 'red',
      })}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === 'left' && icon}
      <Typography variant="nav_link" className={clsx(styles.text, textClassname)}>
        {text}
      </Typography>
      {icon && iconPosition === 'right' && icon}
    </button>
  );
};
