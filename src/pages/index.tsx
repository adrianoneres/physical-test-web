import { useContext, useEffect } from 'react';

import { AuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  }, [isAuthenticated]);

  return;
}
