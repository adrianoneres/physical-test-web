import { ReactNode } from 'react';

import { Header } from '../../components/Header';

interface UserTemplateProps {
  children: ReactNode;
}

export function UserTemplate({ children }: UserTemplateProps) {
  return (
    <div className="w-full h-screen bg-slate-100">
      <Header />
      <main className="max-w-[960px] m-auto p-3">{children}</main>
    </div>
  );
}
