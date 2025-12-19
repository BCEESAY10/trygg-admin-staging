import { useQuery } from '@tanstack/react-query';

import { fetchAllRides } from '@/lib/api/rides';
import type { RidesResponse } from '@/types/interfaces/rides';

export const useFetchAllRides = (
  page: number,
  limit: number,
  searchTerm?: string,
  status?: string,
  startDate?: string,
  endDate?: string
) => {
  return useQuery<RidesResponse>({
    queryKey: ['allRides', page, limit, searchTerm, status, startDate, endDate],
    queryFn: async () =>
      await fetchAllRides({
        page,
        limit,
        searchTerm,
        status,
        startDate,
        endDate,
      }),
    placeholderData: prev => prev,
  });
};
