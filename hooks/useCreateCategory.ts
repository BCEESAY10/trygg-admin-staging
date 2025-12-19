import { useMutation } from '@tanstack/react-query';

import { createRideCategory } from '@/lib/api/categories';
import type {
  RideCategory,
  CategoryFormData,
} from '@/types/interfaces/ride-categories';

export const useCreateCategory = () => {
  return useMutation<RideCategory, Error, CategoryFormData>({
    mutationFn: createRideCategory,
  });
};
