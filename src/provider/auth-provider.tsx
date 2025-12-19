'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

import { useRouter } from 'next/navigation';

import Cookies from 'js-cookie';
import { useTranslation } from 'react-i18next';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import { authApi } from '@/lib/api/auth';
import { userApi } from '@/lib/api/user';
import type { AuthResponse } from '@/types/auth';
import type { User } from '@/types/user';
import { showToast } from '@/utils/toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  register: (data: AuthResponse) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { t } = useTranslation('translation');
  // State
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeUntilExpiry, setTimeUntilExpiry] = useState<number | null>(null);
  const [isRehydrated, setIsRehydrated] = useState(false);

  const router = useRouter();

  const isAuthenticated = useMemo(() => !!user, [user]);

  const fetchUser = async () => {};

  fetchUser();

  useEffect(() => {
    const cookieData = Cookies.get(`${STORAGE_KEYS.AUTH_COOKIE}`);
    const parsed = JSON.parse(cookieData ?? '{}');
    const { token } = parsed;

    const rehydrate = async () => {
      try {
        if (!token) {
          console.warn('No token found in cookies');
          setUser(null);
          setLoading(false);
          return;
        }

        const user = await userApi.getCurrentUser();
        setUser(user);
      } catch (error: any) {
        setUser(null);
        await logout();
        setError('Failed to rehydrate user');
      } finally {
        setIsRehydrated(true);
        setLoading(false);
      }
    };

    rehydrate();
  }, []);

  const register = useCallback(async (data: AuthResponse) => {
    try {
      setLoading(true);
      setError(null);

      const { admin: newUser, accessToken } = data;
      Cookies.set(STORAGE_KEYS.AUTH_COOKIE, accessToken, {
        secure: true,
        sameSite: 'strict',
      });

      setUser(newUser);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message ?? 'Registration failed';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);

      await authApi.logout();

      Cookies.remove(STORAGE_KEYS.AUTH_COOKIE);
      setUser(null);
      setError(null);
      setTimeUntilExpiry(null);
      router.push('/auth');
      showToast('success', t('modal.success'), t('logout.toastMessage'));
    } catch (error) {
      console.error('Logout error');
    } finally {
      setLoading(false);
    }
  }, [router, t]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue = useMemo<AuthContextType>(
    () => ({
      user,
      loading,
      error,
      isAuthenticated,
      timeUntilExpiry,
      register,
      logout,
      clearError,
    }),
    [
      user,
      loading,
      error,
      isAuthenticated,
      timeUntilExpiry,
      register,
      logout,
      clearError,
    ]
  );

  if (!isRehydrated) return null;

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
