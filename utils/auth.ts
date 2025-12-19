import type { NextApiRequest } from 'next';

import { parse } from 'cookie';

import type { User } from '@/types/user';

export const isLoggedIn = (req: NextApiRequest): boolean | User => {
  if (!req?.headers?.cookie) {
    return false;
  }

  const cookies = parse(req.headers.cookie || '');

  if (cookies?.trygg_admin) return JSON.parse(cookies.trygg_admin) as User;

  return false;
};
