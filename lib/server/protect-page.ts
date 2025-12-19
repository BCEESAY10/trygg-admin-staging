import type { GetServerSidePropsContext } from 'next';

import { parseCookies } from 'nookies';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import type { User } from '@/types/user';

import { userApi } from '../api/user';

const roleAccessMap: Record<string, (path: string) => boolean> = {
  SUB: path => path.startsWith('/sub-admin'),
  SUPER: path => path.startsWith('/super-admin'),
};

const roleRedirectMap: Record<string, string> = {
  SUB: '/sub-admin',
  SUPER: '/super-admin',
};

const redirectTo = (destination: string) => ({
  redirect: {
    destination,
    permanent: false,
  },
});

export const protectPage = async (context: GetServerSidePropsContext) => {
  const cookies = parseCookies(context);
  const rawCookie = cookies[STORAGE_KEYS.AUTH_COOKIE];

  if (!rawCookie || rawCookie === 'undefined') {
    return redirectTo('/auth');
  }

  let parsed: { token?: string };
  try {
    parsed = JSON.parse(rawCookie);
  } catch (err) {
    return redirectTo('/auth');
  }

  const { token } = parsed;

  if (!token || token === 'undefined') {
    return redirectTo('/auth');
  }

  try {
    const user: User = await userApi.getCurrentUserByToken(token);

    const userRole: string | null = user.role || null;

    if (!userRole) {
      return redirectTo('/unauthorized');
    }

    if (!['SUB', 'SUPER'].includes(userRole)) {
      return redirectTo('/unauthorized');
    }

    const hasAccess = roleAccessMap[userRole]?.(context.resolvedUrl) || false;

    if (!hasAccess) {
      const userDashboard = roleRedirectMap[userRole];
      return redirectTo(userDashboard);
    }

    return {
      props: {
        user,
      },
    };
  } catch (error: any) {
    if (error?.response?.status === 401 || error?.message === 'Token expired') {
      return redirectTo('/auth');
    }

    return redirectTo('/404');
  }
};

export const protectSubAdminPage = async (
  context: GetServerSidePropsContext
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (userRole !== 'SUB') {
      return redirectTo(roleRedirectMap[userRole] || '/unauthorized');
    }
  }

  return result;
};

export const protectSuperAdminPage = async (
  context: GetServerSidePropsContext
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (userRole !== 'SUPER') {
      return redirectTo(roleRedirectMap[userRole] || '/unauthorized');
    }
  }

  return result;
};

export const protectAnyAdminPage = async (
  context: GetServerSidePropsContext
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (!['SUB', 'SUPER'].includes(userRole)) {
      return redirectTo('/unauthorized');
    }
  }

  return result;
};

export const protectPageWithRoles = async (
  context: GetServerSidePropsContext,
  allowedRoles: string[],
  customRedirect?: string
) => {
  const result = await protectPage(context);

  if ('props' in result) {
    const { user } = result.props;
    const userRole = user.role;

    if (!allowedRoles.includes(userRole)) {
      const redirectPath =
        customRedirect ?? (roleRedirectMap[userRole] || '/unauthorized');
      return redirectTo(redirectPath);
    }
  }

  return result;
};
