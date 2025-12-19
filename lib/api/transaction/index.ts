import type { GetDriversInput } from '@/types/driver';
import type {
  RevenueDashboardResponse,
  TransactionResponse,
} from '@/types/interfaces/transactions';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const fetchTransactions = async ({
  page = 1,
  limit = 15,
  searchTerm,
  status,
  startDate,
  endDate,
  paymentMethod,
}: GetDriversInput): Promise<TransactionResponse> => {
  const { data } = await apiClient.get<TransactionResponse>(
    `${BASE_URL}/transactions`,
    {
      params: {
        page,
        limit,
        q: searchTerm,
        status,
        from: startDate,
        to: endDate,
        paymentMethod,
      },
    }
  );
  return data;
};

export const fetchTransactionStats =
  async (): Promise<RevenueDashboardResponse> => {
    const { data } = await apiClient.get(
      `${BASE_URL}/transactions/dashboard/stats`
    );
    return data;
  };
