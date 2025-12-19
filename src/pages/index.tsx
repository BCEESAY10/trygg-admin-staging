import React from 'react';

import type { NextApiRequest } from 'next';

import type { User } from '@/types/user';
import { isLoggedIn } from '@/utils/auth';

const PageRoot = () => {
  return <div />;
};

export default PageRoot;

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const userData = isLoggedIn(req);

  if (!userData) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  }

  const user = userData as User;

  if (user.role === 'SUB') {
    return {
      redirect: {
        destination: '/sub-admin',
        permanent: false,
      },
    };
  } else if (user.role === 'SUPER') {
    return {
      redirect: {
        destination: '/super-admin',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
