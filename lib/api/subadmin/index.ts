import type {
  SubAdmin,
  AdminFormData,
  SubAdminResponse,
} from '@/types/interfaces/sub-admin';
import { BASE_URL } from '@/utils/url';

import apiClient from '../client';

export const createSubAdmin = async (
  payload: AdminFormData
): Promise<SubAdmin> => {
  const { data } = await apiClient.post<SubAdmin>(
    `${BASE_URL}/auth/register`,
    payload
  );
  return data;
};

export const fetchSubAdmins = async ({
  role,
}: {
  role: string;
}): Promise<SubAdminResponse> => {
  const { data } = await apiClient.get(`${BASE_URL}/`, {
    params: { role },
  });
  return data;
};

export const updateAdminStatus = async ({ id }: { id: string }) => {
  const { data } = await apiClient.patch(
    `${BASE_URL}/${id}/toggle-suspend-or-activate`
  );
  return data;
};
