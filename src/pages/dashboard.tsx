import { GetServerSideProps } from 'next';

import { hasToken, rootPage } from '@/helpers/auth.helper';

export default function SignIn() {
  return (
    <main>
      <h1>Dashboard</h1>
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
