import { ReactNode } from 'react';

export interface RowProps {
  children: ReactNode;
}

export function Row({ children }: RowProps) {
  return <div className="flex items-center gap-4">{children}</div>;
}
