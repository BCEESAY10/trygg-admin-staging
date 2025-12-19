import { useQuery } from '@tanstack/react-query';

import { fetchDriversAndStats } from '@/lib/api/driver';

export const useFetchAllDrivers = (
  page: number,
  limit: number,
  searchTerm?: string,
  ratings?: number,
  status?: string
) => {
  return useQuery({
    queryKey: ['drivers', page, limit, searchTerm, ratings, status],
    queryFn: () =>
      fetchDriversAndStats({ page, limit, searchTerm, ratings, status }),
    placeholderData: prev => prev,
  });
};
