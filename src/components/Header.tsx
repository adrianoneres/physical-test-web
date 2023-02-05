import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/auth';

import { Heading } from './Heading';
import { Text } from './Text';

export function Header() {
  const { getUser } = useAuth();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = getUser();
    setUserName(loggedInUser?.name || '');
  }, [getUser]);

  return (
    <nav className="bg-black">
      <div className="max-w-[960px] m-auto p-3 flex items-center justify-between">
        <Heading asChild size="lg">
          <h1 className="text-white">🫀 Avaliação física</h1>
        </Heading>
        <Text asChild size="lg">
          <span className="text-white">{userName}</span>
        </Text>
      </div>
    </nav>
  );
}
