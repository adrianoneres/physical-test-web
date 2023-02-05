import { ReactNode } from 'react';

import { Header } from '../../components/Header';

interface UserTemplateProps {
  children: ReactNode;
}

export function UserTemplate({ children }: UserTemplateProps) {
  return (
    <div className="w-full h-screen bg-slate-100">
      <Header />
      {children}
    </div>
  );
}
