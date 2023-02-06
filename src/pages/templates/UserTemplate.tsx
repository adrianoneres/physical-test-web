import { ReactNode } from 'react';

import { Header } from '../../components/Header';

interface UserTemplateProps {
  children: ReactNode;
}

export function UserTemplate({ children }: UserTemplateProps) {
  return (
    <div className="w-full min-h-screen h-full bg-slate-100 pb-36">
      <Header />
      <main className="max-w-[960px] m-auto p-3">{children}</main>
    </div>
  );
}
