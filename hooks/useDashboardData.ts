import { useQuery } from '@tanstack/react-query';

import { fetchDashboardStats } from '@/lib/api/dashboard';
import type { DashboardStatsResponse } from '@/types/interfaces/admin-layout';

export const useDashboardStats = () => {
  return useQuery<DashboardStatsResponse>({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });
};
