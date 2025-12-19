import axios from 'axios';
import Cookies from 'js-cookie';
import { setCookie } from 'nookies';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import type {
  AuthResponse,
  LoginCredentials,
  RegisterInputs,
} from '@/types/auth';
import { handleAxiosError } from '@/utils/error';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, credentials, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  Cookies.set(STORAGE_KEYS.ACCESS_TOKEN, response.data.data.accessToken, {
    secure: true,
    sameSite: 'strict',
  });

  const cookieOptions = {
    maxAge: 60 * 60,
    path: '/',
    httpOnly: false,
    secure: false,
    sameSite: 'strict' as const,
  };

  setCookie(
    null,
    STORAGE_KEYS.ACCESS_TOKEN,
    response.data.data.accessToken,
    cookieOptions
  );

  return response.data.data;
};

const register = async (inputs: RegisterInputs): Promise<AuthResponse> => {
  const response = await apiClient.post('/register', inputs);

  return response.data.data;
};

const logout = async (): Promise<void> => {
  try {
    await apiClient.post(`${BASE_URL}/auth/logout`);
  } catch (error) {
    const { message, status } = handleAxiosError(error);
    // eslint-disable-next-line no-console
    console.warn(`Logout API call failed: ${message} (${status})`);
  }
};

export const authApi = {
  login,
  register,
  logout,
};
