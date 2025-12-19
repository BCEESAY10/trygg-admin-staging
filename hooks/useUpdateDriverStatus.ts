import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateDriverStatus } from '@/lib/api/driver';

export const useUpdateDriverStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDriverStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      queryClient.invalidateQueries({ queryKey: ['driver'] });
    },
  });
};
