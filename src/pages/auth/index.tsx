import React, { useEffect, useState } from 'react';

import type { NextApiRequest } from 'next';

import Image from 'next/image';

import axios from 'axios';
import { useTranslation } from 'react-i18next';

import VerificationCodeModal from '@/src/components/modals/VerificationCodeModal';
import styles from '@/src/styles/SignIn.module.css';
import type { User } from '@/types/user';
import { isLoggedIn } from '@/utils/auth';
import { getErrorMessage } from '@/utils/error';
import { showAlert } from '@/utils/sweet-alert';

const SignIn = () => {
  const { t } = useTranslation('translation');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const emailValue = formData.get('email') as string;
      setEmail(emailValue);

      const { data } = await axios.post('/api/request-otp', {
        email: emailValue,
      });

      if (data.data?.userId) {
        setUserId(data.data.userId);
        setIsModalOpen(true);
      }
    } catch (error) {
      const { message } = getErrorMessage(error);
      showAlert({
        title: t('modal.error'),
        text: message,
        icon: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.title = 'Trygg Admin | Sign In';
  }, []);

  return (
    <>
      <div className={styles.container}>
        {/*==================== Left Side - Form Section ====================*/}
        <div className={styles.form__section}>
          <div className={styles.login__card}>
            <div className={styles.logo__section}>
              <div className={styles.logo__placeholder}>
                <Image
                  priority
                  alt="Logo"
                  width={64}
                  height={64}
                  src="/icon.png"
                  className={styles.logo__image}
                />
              </div>
            </div>

            <div className={styles.welcome}>
              <h1 className={styles.title}>{t('login.welcome')}</h1>
              <p className={styles.subtitle}>{t(t('login.enterEmail'))}</p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.input__group}>
                <label htmlFor="email" className={styles.label}>
                  {t('login.email')}
                </label>
                <input
                  required
                  id="email"
                  type="email"
                  name="email"
                  disabled={isLoading}
                  className={styles.input}
                  placeholder={t('login.placeholder')}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`${styles.submit__button} ${isLoading ? styles.disabledButton : ''}`}
              >
                {isLoading ? t('login.sending') : t('login.code')}
              </button>
            </form>
          </div>
        </div>
        {/*==================== End of Left Side - Form Section ====================*/}

        {/*==================== Right Side - Visual Content ====================*/}
        <div className={styles.visual__section}>
          <div className={styles.visual__content}>
            <Image
              priority
              width={450}
              height={450}
              src="/liquid-cheese.svg"
              alt="Sign in illustration"
            />
          </div>
        </div>
        {/*==================== End of Right Side - Visual Content ====================*/}
      </div>

      {/*==================== Verification Code Modal ====================*/}
      <VerificationCodeModal
        email={email}
        userId={userId}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
      {/*==================== End of Verification Code Modal ====================*/}
    </>
  );
};

export default SignIn;

export const getServerSideProps = async ({ req }: { req: NextApiRequest }) => {
  const userData = isLoggedIn(req);

  if (userData) {
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
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
