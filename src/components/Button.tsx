import React, { ButtonHTMLAttributes } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'default' | 'fluid';
  color?: 'default' | 'ghost';
  loading?: boolean;
  icon?: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
}

export function Button({
  disabled,
  loading,
  children,
  size = 'default',
  color = 'default',
  className,
  ...rest
}: ButtonProps) {
  const isLoading = !!loading;

  return (
    <button
      {...rest}
      disabled={isLoading}
      className={clsx(
        `h-9 px-3 flex items-center justify-center gap-1 rounded-lg bg-blue-500 text-sm transition-colors ${className}`,
        {
          'w-full': size === 'fluid',
          'opacity-80': disabled || loading,
          'hover:bg-blue-500': disabled || loading,
          'cursor-not-allowed': disabled || loading,
          'text-white': color === 'default',
          'text-blue-500': color === 'ghost',
          ' hover:bg-blue-600': color === 'default',
          'bg-transparent': color === 'ghost',
          'border-transparent': color === 'ghost',
          'hover:bg-blue-200': color === 'ghost',
        },
      )}
    >
      {isLoading && (
        <span className="w-full flex items-center justify-center animate-spin">
          <Image
            priority
            src="/loader.svg"
            height={24}
            width={24}
            alt="Loader"
            className="text-white"
          />
        </span>
      )}

      {!isLoading && children}
    </button>
  );
}
