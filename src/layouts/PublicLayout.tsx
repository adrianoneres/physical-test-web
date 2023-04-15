import { ReactNode } from 'react';
import Head from 'next/head';

export interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      <Head>
        <title>Avaliações Físicas</title>
      </Head>
      <main className="w-full h-screen flex flex-col bg-slate-100 items-center justify-center">
        <section className="w-full max-w-sm">
          <h1 className="text-2xl text-center font-bold">
            🫀 Avaliações Físicas
          </h1>
          <div className="mt-8">{children}</div>
        </section>
      </main>
    </>
  );
}
