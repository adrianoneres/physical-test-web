import axios from 'axios';
import { parseCookies } from 'nookies';

export const ACCESS_TOKEN = 'physical-test.access_token';

export function getApiClient(context?: any) {
  const cookies = parseCookies(context);
  const token = cookies[ACCESS_TOKEN];

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
  });

  api.interceptors.request.use(config => config);

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }

  return api;
}
