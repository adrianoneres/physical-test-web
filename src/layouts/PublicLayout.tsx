import { ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useAuth } from '@/contexts/AuthContext';

export interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  const router = useRouter();
  const { getUser } = useAuth();

  const checkAuthentication = useCallback(() => {
    const isAuthenticated = !!getUser();

    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [getUser, router]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <>
      <Head>
        <title>Avaliações Físicas</title>
      </Head>
      <main className="w-full h-screen flex flex-col bg-slate-100 items-center justify-center">
        <section className="w-full max-w-sm px-4">
          <h1 className="text-2xl text-center font-bold">
            🫀 Avaliações Físicas
          </h1>
          <div className="mt-8">{children}</div>
        </section>
      </main>
    </>
  );
}
