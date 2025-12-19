import { useQuery } from '@tanstack/react-query';

import { fetchTransactions } from '@/lib/api/transaction';

export const useFetchTransactions = (
  page: number,
  limit: number,
  searchTerm?: string,
  status?: string,
  startDate?: string,
  endDate?: string,
  paymentMethod?: string
) => {
  return useQuery({
    queryKey: [
      'transactions',
      page,
      limit,
      searchTerm,
      status,
      startDate,
      endDate,
      paymentMethod,
    ],
    queryFn: () =>
      fetchTransactions({
        page,
        limit,
        searchTerm,
        status,
        startDate,
        endDate,
        paymentMethod,
      }),
    placeholderData: prev => prev,
  });
};
