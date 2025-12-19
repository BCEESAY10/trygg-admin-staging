export interface User {
  id: string;
  email: string;
  token?: string;
  fullName: string;
  role: 'SUB' | 'SUPER' | string;
  profilePicture: string;
  phone: string;
  lastLogin?: string;
  status: 'ACTIVE' | 'SUSPENDED' | string;
  createdAt: string;
  updatedAt: string;
}

export interface UsersResponse {
  status: string;
  data: {
    users: User[];
    hasMore: boolean;
    totalUsers: number;
    filters: { searchQuery: string };
  };
}

export interface UserProfileUpdateInputs {
  fullName?: string;
  email?: string;
  phone?: string;
}

export interface SweetAlertProps {
  title: string;
  text?: string;
  html?: string; // Optional if you want to support HTML
  icon: 'success' | 'error' | 'warning' | 'info' | 'question';
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface PageProps {
  user: User;
}
