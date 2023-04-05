import { useContext, useEffect } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Home() {
  const routes = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    console.log(isAuthenticated);
    if (isAuthenticated) {
      routes.push('/dashboard');
    } else {
      routes.push('/signin');
    }
  }, [isAuthenticated]);

  return;
}
