import { GetServerSideProps } from 'next';

import { isAuthenticated } from '@/helpers/auth.helper';
import { PrivateLayout } from '@/layouts/PrivateLayout';

export default function PhysicalTests() {
  return (
    <PrivateLayout title="Relatório de Avaliações Físicas">
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
