import { useQuery } from '@tanstack/react-query';

import { fetchPassengerStats } from '@/lib/api/passenger';

export const usePassengerStats = () => {
  return useQuery({
    queryKey: ['passengerStats'],
    queryFn: fetchPassengerStats,
  });
};
