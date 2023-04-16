import { ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { Header } from '@/components/Header';
import { useAuth } from '@/contexts/AuthContext';

export interface PrivateLayoutProps {
  title: string;
  children: ReactNode;
}

export function PrivateLayout({ title, children }: PrivateLayoutProps) {
  const router = useRouter();
  const { getUser } = useAuth();

  const titleContent = `Avaliações Físicas | ${title}`;

  const checkAuthentication = useCallback(() => {
    const isAuthenticated = !!getUser();

    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [getUser, router]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <>
      <Head>
        <title>{titleContent}</title>
      </Head>

      <div className="w-full min-h-screen pb-12 bg-slate-100">
        <Header />
        <main className="w-full max-w-5xl m-auto px-4">
          <h1 className="mt-4 mb-6 text-xl text-slate-800 font-bold">
            {title}
          </h1>

          {children}
        </main>
      </div>
    </>
  );
}
