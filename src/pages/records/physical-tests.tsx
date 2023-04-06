import { GetServerSideProps } from 'next';

import { hasToken, rootPage } from '@/helpers/auth.helper';
import { Header } from '@/components/Header';

export default function PhysicalTests() {
  return (
    <main className="bg-slate-100 min-h-screen">
      <Header />
      <h1>PhysicalTests Records</h1>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  if (!hasToken(context)) {
    return rootPage;
  }

  return {
    props: {},
  };
};
