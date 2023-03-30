import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface HeadingProps {
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children: ReactNode;
}

export function Heading({ size = 'md', asChild, children }: HeadingProps) {
  const Tag = asChild ? 'span' : 'h2';

  return (
    <Tag
      className={clsx('font-sans font-bold', {
        'text-lg': size === 'sm',
        'text-xl': size === 'md',
        'text-2xl': size === 'lg',
      })}
    >
      {children}
    </Tag>
  );
}
