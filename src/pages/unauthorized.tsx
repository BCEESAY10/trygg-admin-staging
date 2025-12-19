import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/ErrorPage.module.css';

const Unauthorized = () => {
  const router = useRouter();

  const { t } = useTranslation('translation');

  const handleBack = () => router.back();
  const handleLogin = () => router.push('/auth');

  return (
    <>
      <Head>
        <title>{t('public.unauthorized')} | Trygg Admin</title>
        <meta name="description" content="Unauthorized access" />
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
            <h1 className={styles.error__code}>401</h1>
            <h2 className={styles.error__title}>{t('unauthorizedTitle')}</h2>
            <p className={styles.error__description}>
              {t('public.unauthorizedDescription')}
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

export default Unauthorized;
