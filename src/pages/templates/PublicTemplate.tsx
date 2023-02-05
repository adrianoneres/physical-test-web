import { ReactNode } from 'react';

interface PublicTemplateProps {
  children: ReactNode;
}

export function PublicTemplate({ children }: PublicTemplateProps) {
  return <main className="h-screen bg-slate-100">{children}</main>;
}
