import { ReactNode } from 'react';

export interface TitleProps {
  children: ReactNode;
  legend?: string;
  className?: string;
}

export function Title({ children, legend, className }: TitleProps) {
  return (
    <h3
      className={`mt-4 flex items-center justify-between border-b border-solid border-gray-300 ${className}`}
    >
      <span className="`pb-2 my-2 text-lg text-slate-600 font-bold">
        {children}
      </span>
      <span className="text-sm text-gray-500">{legend}</span>
    </h3>
  );
}
