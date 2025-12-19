import axios from 'axios';
import Cookies from 'js-cookie';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import { BASE_URL } from '@/utils/url';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

apiClient.interceptors.request.use(
  async config => {
    try {
      const rawToken = Cookies.get(`${STORAGE_KEYS.AUTH_COOKIE}`);

      if (!rawToken) {
        throw new Error('Auth token is missing');
      }

      const parsedToken = JSON.parse(rawToken);
      const { token } = parsedToken;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  error => Promise.reject(normalizeError(error))
);

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      return Promise.reject(
        new Error('The request timed out. Please try again.')
      );
    }

    const status = error?.response?.status;

    if (status === 401) {
      return Promise.reject(new Error('Session expired, please log in again'));
    }

    if (status === 403) {
      return Promise.reject(new Error('Unauthorized account'));
    }

    return Promise.reject(normalizeError(error));
  }
);

const normalizeError = (error: unknown): Error => {
  if (error instanceof Error) return error;
  return new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export default apiClient;
