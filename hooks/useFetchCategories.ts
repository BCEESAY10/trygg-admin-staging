import { useQuery } from '@tanstack/react-query';

import { fetchRideCategories } from '@/lib/api/categories';

export const useFetchAllCategories = (
  page: number,
  limit: number,
  searchTerm?: string,
  preferredLanguage?: string
) => {
  return useQuery({
    queryKey: ['categories', page, limit, searchTerm, preferredLanguage],
    queryFn: () =>
      fetchRideCategories({ page, limit, searchTerm, preferredLanguage }),
    placeholderData: prev => prev,
  });
};
