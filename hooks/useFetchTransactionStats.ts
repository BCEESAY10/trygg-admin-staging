import { useQuery } from '@tanstack/react-query';

import { fetchTransactionStats } from '@/lib/api/transaction';

export const useTransactionStats = () => {
  return useQuery({
    queryKey: ['transactionStats'],
    queryFn: fetchTransactionStats,
  });
};
