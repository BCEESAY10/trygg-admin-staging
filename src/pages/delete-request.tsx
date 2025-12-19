import { useState } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import styles from '@/src/styles/ErrorPage.module.css';

const DeleteConfirmation = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');

  const { t } = useTranslation('translation');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please email field is required.');
      return;
    }

    // TODO: Send delete request to your backend
    console.log('Deleting user:', { email, reason });
    toast.success(
      'Your account deletion request has been submitted successfully.'
    );
    handleBack();
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <>
      <Head>
        <title>{t('public.deleteYourAccount')} | Trygg Admin</title>
        <meta
          name="description"
          content="Request to delete your Trygg account and associated data."
        />
      </Head>

      <div className={styles.container}>
        <div className={styles.delete__content}>
          <div
            className={`${styles.icon__wrapper} ${styles.delete__icon__wrapper}`}
          >
            <Image
              width={80}
              height={80}
              src="/icon.png"
              alt="Trygg Logo"
              className={styles.logo}
            />
          </div>

          <div className={styles.info__section}>
            <h2 className={styles.page__title}>{t('public.deletionTitle')}</h2>
            <p className={styles.page__description}>
              {t('public.deletionDescription')}
              <strong> {t('public.deletionTime')} </strong>.
            </p>

            <div className={styles.deletion__notice}>
              <p className={styles.notice__title}>{t('public.noticeTitle')}</p>
              <ul className={styles.notice__list}>
                <li>{t('public.noticeList1')}</li>
                <li>{t('public.noticeList2')}</li>
                <li>{t('public.noticeList3')}</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.form__group}>
              <label htmlFor="email">
                {t('public.email')} <span className={styles.required}>*</span>
              </label>

              <input
                type="email"
                placeholder={t('public.enterEmail')}
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.form__group}>
              <label htmlFor="reason">{t('public.reason')}</label>
              <textarea
                placeholder={t('public.reasonPlaceholder')}
                value={reason}
                onChange={e => setReason(e.target.value)}
                className={styles.textarea}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="button"
                onClick={handleBack}
                className={styles.btn__secondary}
              >
                {t('public.cancel')}
              </button>
              <button type="submit" className={styles.btn__primary}>
                {t('public.submitRequest')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmation;
