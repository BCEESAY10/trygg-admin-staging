import type { GetDriversInput } from '@/types/driver';
import type {
  RidesResponse,
  RidesStatsResponse,
} from '@/types/interfaces/rides';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const fetchAllRides = async ({
  page = 0,
  limit = 15,
  searchTerm,
  status,
  startDate,
  endDate,
}: GetDriversInput): Promise<RidesResponse> => {
  const { data } = await apiClient.get<RidesResponse>(`${BASE_URL}/rides`, {
    params: {
      page,
      limit,
      q: searchTerm,
      status,
      from: startDate,
      to: endDate,
    },
  });
  return data;
};

export const fetchRidesStats = async (): Promise<RidesStatsResponse> => {
  const { data } = await apiClient.get(`${BASE_URL}/rides/dashboard/stats`);
  return data;
};
