import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateAdminStatus } from '@/lib/api/subadmin';

export const useUpdateAdminStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAdminStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};
