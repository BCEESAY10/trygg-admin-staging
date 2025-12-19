import axios from 'axios';

import type { User } from '@/types/user';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get(`${BASE_URL}/profile/me`);
  return response.data.data;
};

const getCurrentUserByToken = async (token: string): Promise<any> => {
  const response = await axios.get(`${BASE_URL}/profile/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    timeout: 10000,
  });
  return response.data.data;
};

const updateUserProfile = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.patch(
    `${BASE_URL}/profile/update`,
    userData
  );
  return response.data.data;
};

export const userApi = {
  getCurrentUser,
  getCurrentUserByToken,
  updateUserProfile,
};
