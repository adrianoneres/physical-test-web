import axios from 'axios';
import { parseCookies } from 'nookies';

export const ACCESS_TOKEN = 'physical-test.access_token';

export function getApiClient(context?: any) {
  const { ACCESS_TOKEN: token } = parseCookies(context);

  const api = axios.create({
    baseURL: 'http://localhost:5000',
  });

  api.interceptors.request.use(config => {
    return config;
  });

  if (token) {
    api.defaults.headers['Authorization'] = `Beared ${token}`;
  }

  return api;
}
