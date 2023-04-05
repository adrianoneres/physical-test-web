import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import { ACCESS_TOKEN } from '@/services/api';

export function hasToken(context: GetServerSidePropsContext): boolean {
  const { [ACCESS_TOKEN]: token } = parseCookies(context);

  return !!token;
}

export const rootPage = {
  redirect: {
    destination: '/',
    permanent: false,
  },
};
