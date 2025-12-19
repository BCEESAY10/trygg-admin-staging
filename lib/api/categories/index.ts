import type {
  RideCategory,
  CategoryFormData,
  RideCategoryResponse,
  CategoryFilters,
} from '@/types/interfaces/ride-categories';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const createRideCategory = async (
  payload: CategoryFormData
): Promise<RideCategory> => {
  const { data } = await apiClient.post<RideCategory>(
    `${BASE_URL}/ride-categories`,
    payload
  );
  return data;
};

export const fetchRideCategories = async ({
  page = 0,
  limit = 15,
  searchTerm,
  preferredLanguage,
}: CategoryFilters): Promise<RideCategoryResponse> => {
  const { data } = await apiClient.get<RideCategoryResponse>(
    'https://api.trygg.nga.gm/api/v1/rides/categories',
    {
      params: { page, limit, q: searchTerm, preferredLanguage },
    }
  );
  return data;
};

export const updateCategory = async ({ id }: { id: string }) => {
  const { data } = await apiClient.put(`${BASE_URL}/ride-categories/${id}`);
  return data;
};

export const toggleCategory = async ({ id }: { id: string }) => {
  const { data } = await apiClient.patch(
    `${BASE_URL}/ride-categories/${id}/toggle-status`
  );
  return data;
};
