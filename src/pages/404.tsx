import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/ErrorPage.module.css';

const Error404Page = () => {
  const router = useRouter();

  const { t } = useTranslation('translation');

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  const handleLogin = () => {
    try {
      document.cookie = 'token=; Max-Age=0; path=/;';
    } catch (e) {
      console.warn('Error clearing auth state', e);
    }

    router.push('/auth');
  };

  return (
    <>
      <Head>
        <title>404 - {t('public.notFound')} | Trygg Admin</title>
        <meta name="description" content="Page not found" />
      </Head>

      <div className={styles.container}>
        {/*==================== Error Content ====================*/}
        <div className={styles.content}>
          <div className={styles.icon__wrapper}>
            <Image
              width={80}
              height={80}
              src="/icon.png"
              alt="Trygg Logo"
              className={styles.logo}
            />
          </div>

          <div className={styles.error__info}>
            <h1 className={styles.error__code}>404</h1>
            <h2 className={styles.error__title}>{t('public.notFound')}</h2>
            <p className={styles.error__description}>
              {t('public.errorDescription')}
            </p>
          </div>

          <div className={styles.actions}>
            <button onClick={handleBack} className={styles.btn__secondary}>
              {t('public.goBack')}
            </button>
            <button onClick={handleLogin} className={styles.btn__primary}>
              {t('public.toLogin')}
            </button>
          </div>
        </div>
        {/*==================== End of Error Content ====================*/}
      </div>
    </>
  );
};

export default Error404Page;
