import { useQuery } from '@tanstack/react-query';

import { fetchRidesStats } from '@/lib/api/rides';

export const useRidesStats = () => {
  return useQuery({
    queryKey: ['rideStats'],
    queryFn: fetchRidesStats,
  });
};
