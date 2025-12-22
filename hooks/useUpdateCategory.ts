import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateCategory } from '@/lib/api/categories';

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: { basePrice: number; pricePerKm: number; minimumFare: number };
    }) => updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};
