import { useQuery } from '@tanstack/react-query';

import { fetchReviewAndTopDrivers } from '@/lib/api/review';

export const useFetchReviews = (rating: number) => {
  return useQuery({
    queryKey: ['reviews', rating],
    queryFn: () => fetchReviewAndTopDrivers(rating),
  });
};
