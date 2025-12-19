import { useQuery } from '@tanstack/react-query';

import { fetchAllPassengers } from '@/lib/api/passenger';
import type { UsersResponse } from '@/types/user';

export const useFetchAllPassengers = (
  page: number,
  limit: number,
  searchTerm?: string,
  status?: string
) => {
  return useQuery<UsersResponse>({
    queryKey: ['users', page, limit, searchTerm, status],
    queryFn: async () =>
      await fetchAllPassengers({
        page,
        limit,
        searchTerm,
        status,
      }),
    placeholderData: prev => prev,
  });
};
