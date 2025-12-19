import { useQuery } from '@tanstack/react-query';

import { fetchSubAdmins } from '@/lib/api/subadmin';

export const useFetchAdmins = (role: string) => {
  return useQuery({
    queryKey: ['admins', role],
    queryFn: async () => await fetchSubAdmins({ role }),
  });
};
