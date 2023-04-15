import { GetServerSideProps } from 'next';

import { isAuthenticated } from '@/helpers/auth.helper';
import { PrivateLayout } from '@/layouts/PrivateLayout';

export default function Dashboard() {
  return (
    <PrivateLayout title="Dashboard">
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
