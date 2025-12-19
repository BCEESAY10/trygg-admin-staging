import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

import { getErrorMessage } from '@/utils/error';
import { BASE_URL } from '@/utils/url';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/request-otp`, {
        email,
      });

      res.json(data);
    } catch (error) {
      const { message, statusCode } = getErrorMessage(error);
      res.status(statusCode).json({ message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
