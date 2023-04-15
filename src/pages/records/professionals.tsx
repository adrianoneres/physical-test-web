import { GetServerSideProps } from 'next';

import { isAuthenticated } from '@/helpers/auth.helper';
import { PrivateLayout } from '@/layouts/PrivateLayout';

export default function Professionals() {
  return (
    <PrivateLayout title="Listagem de Avaliadores">
      <p>Content</p>
    </PrivateLayout>
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
