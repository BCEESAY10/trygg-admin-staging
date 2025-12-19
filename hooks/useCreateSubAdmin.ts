import { useMutation } from '@tanstack/react-query';

import { createSubAdmin } from '@/lib/api/subadmin';
import { queryClient } from '@/lib/query-client';
import type { AdminFormData, SubAdmin } from '@/types/interfaces/sub-admin';

export const useCreateSubAdmin = () => {
  return useMutation<SubAdmin, Error, AdminFormData>({
    mutationFn: createSubAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admins'] });
    },
  });
};
