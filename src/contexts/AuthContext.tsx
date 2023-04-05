import { createContext, useState, ReactNode } from 'react';
import { setCookie } from 'nookies';
import { useRouter } from 'next/router';

import { ACCESS_TOKEN, getApiClient } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

interface SignInProps {
  username: string;
  password: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (props: SignInProps) => Promise<void>;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;
  const api = getApiClient();

  async function signIn({ username, password }: SignInProps) {
    const response = await api.post('/sign-in', {
      username,
      password,
    });

    const { access_token, user: responseUser } = response.data;

    setCookie(undefined, ACCESS_TOKEN, access_token, {
      maxAge: 60 * 60 * 24, // 1 hour
    });

    setUser(responseUser);

    router.push('/dashboard');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
