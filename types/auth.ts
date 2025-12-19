import type { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterInputs {
  fullNamne: string;
  email: string;
  password: string;
  phone: string;
}

export interface ChangePasswordInputs {
  currentPassword: string;
  newPassword: string;
}

export interface AuthResponse {
  admin: User;
  accessToken: string;
}
