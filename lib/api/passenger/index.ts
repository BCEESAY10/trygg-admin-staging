import type { GetDriversInput } from '@/types/driver';
import type { PassengerDetailsResponse } from '@/types/interfaces/passenger-details';
import type { PassengerStatsResponse } from '@/types/interfaces/passengers';
import type { User, UsersResponse } from '@/types/user';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const fetchAllPassengers = async ({
  page = 0,
  limit = 15,
  searchTerm,
  status,
}: GetDriversInput): Promise<UsersResponse> => {
  const { data } = await apiClient.get<UsersResponse>(`${BASE_URL}/users`, {
    params: { page, limit, q: searchTerm, status },
  });
  return data;
};

export const getPassengerByUserId = async (
  userId: string
): Promise<PassengerDetailsResponse> => {
  const { data } = await apiClient.get<PassengerDetailsResponse>(
    `${BASE_URL}/users/${userId}`
  );
  return data;
};

export const updatePassengerStatus = async ({ id, status }: User) => {
  const { data } = await apiClient.patch(`${BASE_URL}/${id}/users/${id}`, {
    status,
  });
  return data;
};

export const fetchPassengerStats =
  async (): Promise<PassengerStatsResponse> => {
    const { data } = await apiClient.get(`${BASE_URL}/users/dashboard/stats`);
    return data;
  };
