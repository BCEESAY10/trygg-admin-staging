import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';
import { serialize } from 'cookie';

import { STORAGE_KEYS } from '@/constants/storage-keys';
import type { User } from '@/types/user';
import { getErrorMessage } from '@/utils/error';
import { BASE_URL } from '@/utils/url';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { code, userId } = req.body;

    try {
      const { data } = await axios.post(
        `${BASE_URL}/auth/verify-otp`,
        {
          code,
          userId,
        },
        { withCredentials: true }
      );

      const token: string = data.data.accessToken;
      const { role } = data.data.admin;

      const cookieData: Partial<User> = {
        token,
        role,
      };

      const tokenCookie = serialize(
        STORAGE_KEYS.AUTH_COOKIE,
        JSON.stringify(cookieData),
        {
          httpOnly: false,
          secure: true,
          maxAge: 60 * 60 * 24 * 3, // 3 days (259,200 seconds)
          sameSite: 'lax',
          path: '/',
        }
      );

      res.setHeader('Set-Cookie', [tokenCookie]);
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      res.json({ token, role });
    } catch (error) {
      const { message, statusCode } = getErrorMessage(error);
      res.status(statusCode).json({ message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
