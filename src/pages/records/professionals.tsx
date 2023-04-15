import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { isAuthenticated } from '@/helpers/auth.helper';
import { Header } from '@/components/Header';

export default function Professionals() {
  return (
    <>
      <Head>
        <title>Avaliações Físicas | Listagem de Avaliadores</title>
      </Head>
      <main className="bg-slate-100 min-h-screen">
        <Header />
        <h1>Professionals Records</h1>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (!isAuthenticated(context)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
