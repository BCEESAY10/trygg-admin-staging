import { useQuery } from '@tanstack/react-query';

import { getPassengerByUserId } from '@/lib/api/passenger';

export const useFetchPassenger = (id: string) => {
  return useQuery({
    queryKey: ['passenger', id],
    queryFn: () => getPassengerByUserId(id),
    enabled: !!id,
  });
};
