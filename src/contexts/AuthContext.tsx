import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from 'react';
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';

import { ACCESS_TOKEN, getApiClient } from '@/services/api';

export interface User {
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
  getUser: () => User | null;
  signIn: (props: SignInProps) => Promise<void>; // eslint-disable-line no-unused-vars
  signOut: () => Promise<void>;
};

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const api = getApiClient();

  const getUser = useCallback(() => {
    if (user) {
      return user;
    }

    const cookies = parseCookies();
    const token = cookies?.[ACCESS_TOKEN];

    if (token) {
      const { sub, name, email, username } = jwtDecode<any>(token);

      const tokenUser = {
        id: sub,
        name,
        email,
        username,
      } as User;

      setUser(tokenUser);

      return tokenUser;
    }

    return null;
  }, [user]);

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

  async function signOut() {
    destroyCookie(undefined, ACCESS_TOKEN);
    setUser(null);

    router.push('/signin');
  }

  return (
    <AuthContext.Provider value={{ getUser, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
