import { ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useAuth } from '@/contexts/AuthContext';

export interface PrivateLayoutProps {
  title: string;
  children: ReactNode;
}

export function PrintLayout({ title, children }: PrivateLayoutProps) {
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

      <div className="print">
        <main>{children}</main>
      </div>
    </>
  );
}
