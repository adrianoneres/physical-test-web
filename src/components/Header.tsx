import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleOutlineIcon,
  HeartIcon as HeartOutlineIcon,
  HomeModernIcon as HomeModernOutlineIcon,
  UserCircleIcon as UserCircleOutlineIcon,
} from '@heroicons/react/24/outline';
import {
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleSolidIcon,
  HeartIcon as HeartSolidIcon,
  HomeModernIcon as HomeModernSolidIcon,
  UserCircleIcon as UserCircleSolidIcon,
} from '@heroicons/react/24/solid';

import { AuthContext, User } from '@/contexts/AuthContext';
import { Dropdown } from './Dropdown';

export function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { getUser, signOut } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = getUser();
    setUser(storedUser);
  }, [getUser, setUser]);

  return (
    <header className="px-2 bg-slate-800">
      <div className="w-full max-w-5xl py-2 mx-auto flex justify-between items-center">
        <a
          onClick={() => router.push('/dashboard')}
          className="text-lg text-white cursor-pointer"
        >
          🫀 Avaliações Físicas
        </a>
        <nav className="flex gap-4">
          <Dropdown
            label="Cadastros"
            items={[
              {
                name: 'basic',
                items: [
                  {
                    label: 'Avaliadores',
                    action: () => router.push('/records/professionals'),
                    icon: UserCircleOutlineIcon,
                    iconHover: UserCircleSolidIcon,
                  },
                  {
                    label: 'Polos',
                    action: () => router.push('/records/institutions'),
                    icon: HomeModernOutlineIcon,
                    iconHover: HomeModernSolidIcon,
                  },
                ],
              },
              {
                name: 'tests',
                items: [
                  {
                    label: 'Avaliações Físicas',
                    action: () => router.push('/records/physical-tests'),
                    icon: HeartOutlineIcon,
                    iconHover: HeartSolidIcon,
                  },
                ],
              },
            ]}
          />
          <Dropdown
            label="Relatórios"
            showArrow={false}
            items={[
              {
                name: 'default',
                items: [
                  {
                    label: 'Avaliações Físicas',
                    action: () => router.push('/reports/physical-tests'),
                    icon: HeartOutlineIcon,
                    iconHover: HeartSolidIcon,
                  },
                ],
              },
            ]}
          />
          <div className="border-l border-l-slate-600 ml-2 mr-2"></div>
          <Dropdown
            label={user?.name || ''}
            showArrow
            items={[
              {
                name: 'default',
                items: [
                  {
                    label: 'Sair',
                    action: signOut,
                    icon: ArrowLeftOnRectangleOutlineIcon,
                    iconHover: ArrowLeftOnRectangleSolidIcon,
                  },
                ],
              },
            ]}
          />
        </nav>
      </div>
    </header>
  );
}
