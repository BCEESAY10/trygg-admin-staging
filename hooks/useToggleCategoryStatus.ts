import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toggleCategory } from '@/lib/api/categories';

export const useToggleCategoryStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
