import type {
  ReviewResponse,
  TopDriverResponse,
} from '@/types/interfaces/reviews';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const fetchReviewAndTopDrivers = async (
  rating: number
): Promise<{ reviews: ReviewResponse; topDrivers: TopDriverResponse }> => {
  const [reviewRes, topDriversRes] = await Promise.all([
    apiClient.get<ReviewResponse>(`${BASE_URL}/ratings/drivers/detailed`, {
      params: { rating },
    }),
    apiClient.get<TopDriverResponse>(`${BASE_URL}/ratings/drivers/top`),
  ]);

  return {
    reviews: reviewRes.data,
    topDrivers: topDriversRes.data,
  };
};
