import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface TextProps {
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
  children: ReactNode;
}

export function Text({ size = 'md', asChild, children }: TextProps) {
  const Tag = asChild ? 'span' : 'span';

  return (
    <Tag
      className={clsx('font-sans', {
        'text-xs': size === 'sm',
        'text-sm': size === 'md',
        'text-md': size === 'lg',
      })}
    >
      {children}
    </Tag>
  );
}
