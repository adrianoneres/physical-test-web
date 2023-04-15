import { ReactNode } from 'react';
import Head from 'next/head';

import { Header } from '@/components/Header';

export interface PrivateLayoutProps {
  title: string;
  children: ReactNode;
}

export function PrivateLayout({ title, children }: PrivateLayoutProps) {
  return (
    <>
      <Head>
        <title>Avaliações Físicas | {title}</title>
      </Head>

      <div className="w-full min-h-screen bg-slate-100">
        <Header />
        <main className="w-full max-w-5xl m-auto">
          <h1 className="mt-4 mb-6 text-xl text-slate-800 font-bold">
            {title}
          </h1>

          {children}
        </main>
      </div>
    </>
  );
}
