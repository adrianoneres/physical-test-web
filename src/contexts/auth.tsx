import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';

const STORAGE_USER = '@physical-test:user';
const STORAGE_ACCESS_TOKEN = '@physical-test:access_token';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface SignInProps {
  username: string;
  password: string;
}

interface AuthContextProps {
  getUser(): UserProps | null;
  signIn(props: SignInProps): Promise<void>; // eslint-disable-line
  signOut(): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps); // eslint-disable-line
  const [accessToken, setAccessToken] = useState(''); // eslint-disable-line

  function getUser(): UserProps | null {
    const storedUser = localStorage.getItem(STORAGE_USER);

    if (storedUser) {
      return JSON.parse(storedUser);
    }

    return null;
  }

  async function signIn({ username, password }: SignInProps) {
    const response = await api.post('/sign-in', {
      username,
      password,
    });

    localStorage.setItem(STORAGE_USER, JSON.stringify(response.data.user));
    localStorage.setItem(STORAGE_ACCESS_TOKEN, response.data.access_token);

    api.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;

    setUser(response.data.user);
  }

  async function signOut() {
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);

    setUser({} as UserProps);
  }

  useEffect(() => {
    async function loadUserStorageData(): Promise<void> {
      const storedUser = localStorage.getItem(STORAGE_USER);
      const storedAccessToken = localStorage.getItem(STORAGE_ACCESS_TOKEN);

      if (storedUser) {
        const storedUserData = JSON.parse(storedUser);
        setUser(storedUserData);
      }

      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }

    async function setInterceptors(): Promise<void> {
      api.interceptors.response.use(
        response => response,
        async error => {
          if (error.response && error.response.status === 401) {
            signOut();
          }

          return Promise.reject(error);
        },
      );
    }

    loadUserStorageData();
    setInterceptors();
  }, []);

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
