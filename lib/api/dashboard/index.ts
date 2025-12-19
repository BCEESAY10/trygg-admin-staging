import type { DashboardStatsResponse } from '@/types/interfaces/admin-layout';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const fetchDashboardStats =
  async (): Promise<DashboardStatsResponse> => {
    const response = await apiClient.get(`${BASE_URL}/dashboard/stats`);
    return response.data;
  };
