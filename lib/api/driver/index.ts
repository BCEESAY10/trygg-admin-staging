import type {
  DriversResponse,
  DriverStatsResponse,
  GetDriversInput,
  PartialDriver,
} from '@/types/driver';
import type { DriverDetails } from '@/types/interfaces/driver-details';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const fetchDriversAndStats = async ({
  page = 0,
  limit = 15,
  searchTerm,
  ratings,
  status,
}: GetDriversInput): Promise<{
  drivers: DriversResponse;
  driversStats: DriverStatsResponse;
}> => {
  const [driversRes, statsRes] = await Promise.all([
    apiClient.get<DriversResponse>(`${BASE_URL}/drivers`, {
      params: { page, limit, q: searchTerm, ratings, status },
    }),
    apiClient.get<DriverStatsResponse>(`${BASE_URL}/drivers/dashboard/stats`),
  ]);

  return {
    drivers: driversRes.data,
    driversStats: statsRes.data,
  };
};

export const getDriverByUserId = async (
  userId: string
): Promise<DriverDetails> => {
  const { data } = await apiClient.get(`${BASE_URL}/users/${userId}`);
  return data.data;
};

export const updateDriverStatus = async ({
  id,
  applicationStatus,
  reason,
}: PartialDriver) => {
  const { data } = await apiClient.patch(
    `${BASE_URL}/drivers/${id}/update-driver-status`,
    {
      applicationStatus,
      reason,
    }
  );
  return data;
};
