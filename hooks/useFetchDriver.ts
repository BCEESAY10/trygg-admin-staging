import { useQuery } from '@tanstack/react-query';

import { getDriverByUserId } from '@/lib/api/driver';

export const useFetchDriver = (driverId: string) => {
  return useQuery({
    queryKey: ['driver', driverId],
    queryFn: () => getDriverByUserId(driverId),
    enabled: !!driverId,
  });
};
